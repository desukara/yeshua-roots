import {NextResponse} from "next/server";
export const revalidate=86400;
const BOOKS:Record<string,{sefaria:string;chapters:number}>={
Genesis:{sefaria:"Genesis",chapters:50},Exodus:{sefaria:"Exodus",chapters:40},
Leviticus:{sefaria:"Leviticus",chapters:27},Numbers:{sefaria:"Numbers",chapters:36},
Deuteronomy:{sefaria:"Deuteronomy",chapters:34}};
type SefariaChapter={he?:unknown;heVersionTitle?:string;heVersionSource?:string};
export async function GET(_request:Request,{params}:{params:Promise<{book:string;chapter:string}>}){
 const {book,chapter:rawChapter}=await params;
 const info=BOOKS[book];const chapter=Number(rawChapter);
 if(!info||!Number.isInteger(chapter)||chapter<1||chapter>info.chapters)
  return NextResponse.json({error:"Invalid Torah reference"},{status:400});
 try{
  const ref=info.sefaria+"."+chapter;
  const response=await fetch("https://www.sefaria.org/api/texts/"+ref+"?context=0&commentary=0",{next:{revalidate:86400},headers:{Accept:"application/json"}});
  if(!response.ok)throw new Error("Sefaria unavailable");
  const data=(await response.json()) as SefariaChapter;
  if(!Array.isArray(data.he))throw new Error("Unexpected source format");
  const verses=data.he.map(v=>typeof v==="string"?v.replace(/<[^>]*>/g,"").replace(/\\s+/g," ").trim():"");
  return NextResponse.json({book,chapter,verses,source:"Sefaria",sourceUrl:"https://www.sefaria.org/"+ref,version:data.heVersionTitle||null,sourceAttribution:data.heVersionSource||null});
 }catch{return NextResponse.json({error:"Unable to load Hebrew text right now."},{status:502});}
}
