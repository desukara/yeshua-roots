import {NextRequest,NextResponse} from "next/server";
export const dynamic="force-dynamic";
// Restored public Sefaria text access. External source text is not Yeshua Roots teaching.
export async function GET(request:NextRequest){
 const ref=request.nextUrl.searchParams.get("ref")?.trim()||"";
 if(!ref||ref.length>160||!/^[\p{L}\p{N} .,:_()'-]+$/u.test(ref))return NextResponse.json({error:"Invalid text reference"},{status:400});
 try{
  const url="https://www.sefaria.org/api/texts/"+encodeURIComponent(ref)+"?context=0&commentary=0";
  const response=await fetch(url,{signal:AbortSignal.timeout(12000),headers:{Accept:"application/json"},cache:"no-store"});
  if(!response.ok)return NextResponse.json({error:"Source text unavailable"},{status:502});
  const source=await response.json();
  return NextResponse.json(source,{headers:{"Cache-Control":"no-store","X-Content-Source":"Sefaria"}});
 }catch{return NextResponse.json({error:"Unable to load source text"},{status:502});}
}
