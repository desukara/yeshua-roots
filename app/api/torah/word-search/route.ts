import {NextResponse} from "next/server";
import genesis from "../../../../data/torah/genesis.json";
import exodus from "../../../../data/torah/exodus.json";
import leviticus from "../../../../data/torah/leviticus.json";
import numbers from "../../../../data/torah/numbers.json";
import deuteronomy from "../../../../data/torah/deuteronomy.json";
import strongs from "../../../../data/torah/strongs-hebrew.json";

export const revalidate=86400;
const books=[["Genesis",genesis],["Exodus",exodus],["Leviticus",leviticus],["Numbers",numbers],["Deuteronomy",deuteronomy]] as const;
const LIMIT=60;
function strongNumber(lemma:string){
 const lexical=lemma.split("/").at(-1)||"";
 const match=/^(\d{1,5})(?:\s+[a-z])?$/i.exec(lexical);
 return match?"H"+Number(match[1]):null;
}
export async function GET(request:Request){
 const strong=new URL(request.url).searchParams.get("strong")?.toUpperCase()||"";
 if(!/^H[1-9]\d{0,4}$/.test(strong))return NextResponse.json({error:"Provide a valid Hebrew Strong's number"},{status:400});
 const matches:{book:string;chapter:number;verse:number;hebrew:string;strong:string;gloss:string|null}[]=[];
 let total=0;
 const dictionary=strongs.entries as Record<string,string[]>;
 for(const [book,corpus] of books){
  for(let c=0;c<corpus.chapters.length;c++){
   for(let v=0;v<corpus.chapters[c].length;v++){
    for(const [hebrew,lemma] of corpus.chapters[c][v]){
     if(strongNumber(lemma)!==strong)continue;
     total++;
     if(matches.length<LIMIT)matches.push({book,chapter:c+1,verse:v+1,hebrew,strong,gloss:dictionary[strong]?.[1]||null});
    }
   }
  }
 }
 return NextResponse.json({strong,total,truncated:total>LIMIT,matches,source:"Open Scriptures Hebrew Bible (OSHB)"});
}
