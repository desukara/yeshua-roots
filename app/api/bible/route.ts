import {NextRequest,NextResponse} from "next/server";
export const dynamic="force-dynamic";
const allowed=new Set(["kjv","web","asv","bbe","darby","dra","oeb-us","oeb-cw","webbe","cuv","bkr"]);
export async function GET(req:NextRequest){
 const book=req.nextUrl.searchParams.get("book")||"Genesis",chapter=Number(req.nextUrl.searchParams.get("chapter")||1),version=req.nextUrl.searchParams.get("version")||"kjv";
 if(!/^[1-3]? ?[A-Za-z ]{2,32}$/.test(book)||!Number.isInteger(chapter)||chapter<1||chapter>150||!allowed.has(version))return NextResponse.json({error:"Invalid Bible selection"},{status:400});
 try{const ref=book+" "+chapter;const response=await fetch("https://bible-api.com/"+encodeURIComponent(ref)+"?translation="+version,{next:{revalidate:86400},signal:AbortSignal.timeout(12000)});if(!response.ok)throw Error("Bible source unavailable");const data=await response.json();return NextResponse.json({reference:data.reference,translation:data.translation_id,verses:data.verses?.map((v:{verse:number;text:string})=>({number:v.verse,text:v.text}))||[]},{headers:{"Cache-Control":"public, s-maxage=3600"}})}catch{return NextResponse.json({error:"Could not load this chapter"},{status:502})}
}
