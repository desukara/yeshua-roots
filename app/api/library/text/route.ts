import {NextRequest,NextResponse} from "next/server";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){
 const ref=request.nextUrl.searchParams.get("ref")||"";
 if(!ref||ref.length>110||!/^[\p{L}\p{N} ,.:\-–'״׳]+$/u.test(ref))return NextResponse.json({error:"Invalid text reference"},{status:400});
 try{
  const url="https://www.sefaria.org/api/v3/texts/"+encodeURIComponent(ref)+"?version=source&version=translation&return_format=text_only";
  const response=await fetch(url,{next:{revalidate:3600},signal:AbortSignal.timeout(12000),headers:{Accept:"application/json"}});
  if(!response.ok)return NextResponse.json({error:"Text temporarily unavailable"},{status:502});
  const data:unknown=await response.json();
  if(!data||typeof data!=="object"||!("versions" in data)||!Array.isArray(data.versions))return NextResponse.json({error:"Text source returned an invalid response"},{status:502});
  const payload=data as {ref?:unknown;heRef?:unknown;versions:unknown[]};
  const versions=payload.versions.filter((v):v is Record<string,unknown>=>v!==null&&typeof v==="object"&&!Array.isArray(v)).map(v=>({language:typeof v.languageFamilyName==="string"?v.languageFamilyName:typeof v.language==="string"?v.language:undefined,versionTitle:typeof v.versionTitle==="string"?v.versionTitle:undefined,text:typeof v.text==="string"||Array.isArray(v.text)?v.text:undefined,license:typeof v.license==="string"?v.license:undefined})).filter(v=>v.text!==undefined);
  if(!versions.length)return NextResponse.json({error:"No readable text available for this reference"},{status:404});
  return NextResponse.json({ref:typeof payload.ref==="string"?payload.ref:ref,heRef:typeof payload.heRef==="string"?payload.heRef:undefined,versions},{headers:{"Cache-Control":"public, s-maxage=3600, stale-while-revalidate=86400"}});
 }catch{return NextResponse.json({error:"Could not load text right now"},{status:502})}
}
