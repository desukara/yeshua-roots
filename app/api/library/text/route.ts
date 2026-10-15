import {NextRequest,NextResponse} from "next/server";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){
 const ref=request.nextUrl.searchParams.get("ref")||"";
 if(!ref||ref.length>110||!/^[\p{L}\p{N} ,.:\-–'״׳]+$/u.test(ref))return NextResponse.json({error:"Invalid text reference"},{status:400});
 try{
  const url="https://www.sefaria.org/api/v3/texts/"+encodeURIComponent(ref)+"?version=source&version=translation&return_format=text_only";
  const response=await fetch(url,{next:{revalidate:3600},signal:AbortSignal.timeout(12000),headers:{Accept:"application/json"}});
  if(!response.ok)return NextResponse.json({error:"Text temporarily unavailable"},{status:502});
  const data=await response.json();
  const versions=(data.versions||[]).map((v:{languageFamilyName?:string;language?:string;versionTitle?:string;text?:unknown;license?:string})=>({language:v.languageFamilyName||v.language,versionTitle:v.versionTitle,text:v.text,license:v.license}));
  return NextResponse.json({ref:data.ref,heRef:data.heRef,versions},{headers:{"Cache-Control":"public, s-maxage=3600, stale-while-revalidate=86400"}});
 }catch{return NextResponse.json({error:"Could not load text right now"},{status:502})}
}
