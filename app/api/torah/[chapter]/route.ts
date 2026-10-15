import {NextResponse} from "next/server";
export const revalidate=86400;
type SefariaChapter={he?:unknown;heVersionTitle?:string;heVersionSource?:string};
export async function GET(_request:Request,{params}:{params:{chapter:string}}){
 const chapter=Number(params.chapter);
 if(!Number.isInteger(chapter)||chapter<1||chapter>50)return NextResponse.json({error:"Invalid chapter"},{status:400});
 try{
  const response=await fetch("https://www.sefaria.org/api/texts/Genesis."+chapter+"?context=0&commentary=0",{next:{revalidate:86400},headers:{"Accept":"application/json"}});
  if(!response.ok)throw new Error("Upstream unavailable");
  const data=(await response.json()) as SefariaChapter;
  if(!Array.isArray(data.he))throw new Error("Unexpected source format");
  const verses=data.he.map(v=>typeof v==="string"?v.replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim():"");
  return NextResponse.json({book:"Genesis",chapter,verses,source:"Sefaria",sourceUrl:"https://www.sefaria.org/Genesis."+chapter,version:data.heVersionTitle||null,sourceAttribution:data.heVersionSource||null});
 }catch{return NextResponse.json({error:"Unable to load Hebrew text right now."},{status:502});}
}
