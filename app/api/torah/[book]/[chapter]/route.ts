import {NextResponse} from "next/server";
import strongs from "../../../../../data/torah/strongs-hebrew.json";
import genesis from "../../../../../data/torah/genesis.json";
import exodus from "../../../../../data/torah/exodus.json";
import leviticus from "../../../../../data/torah/leviticus.json";
import numbers from "../../../../../data/torah/numbers.json";
import deuteronomy from "../../../../../data/torah/deuteronomy.json";

export const revalidate=86400;
type Corpus=typeof genesis;
const BOOKS:Record<string,Corpus>={Genesis:genesis,Exodus:exodus,Leviticus:leviticus,Numbers:numbers,Deuteronomy:deuteronomy};
export async function GET(_request:Request,{params}:{params:Promise<{book:string;chapter:string}>}){
 const {book,chapter:rawChapter}=await params;
 const corpus=Object.prototype.hasOwnProperty.call(BOOKS,book)?BOOKS[book]:undefined;
 const chapter=Number(rawChapter);
 if(!corpus||!Number.isInteger(chapter)||chapter<1||chapter>corpus.chapters.length)
  return NextResponse.json({error:"Invalid Torah reference"},{status:400});
 const chapterVerses=corpus.chapters[chapter-1];
 const dictionary=strongs.entries as Record<string,string[]>;
 const words=chapterVerses.map(verse=>verse.map(([hebrew,lemma,morph],index)=>{
  const lemmaParts=lemma.split("/");
  const lexicalPart=lemmaParts[lemmaParts.length-1]||"";
  const numericLemma=/^(\d{1,5})(?:\s+[a-z])?$/i.exec(lexicalPart);
  const strong=numericLemma?"H"+Number(numericLemma[1]):null;
  const entry=strong?dictionary[strong]:undefined;
  return {index:index+1,hebrew,lemma,morph,strong,transliteration:entry?.[0]||null,gloss:entry?.[1]||null,pronunciation:entry?.[2]||null};
 }));
 const verses=chapterVerses.map(verse=>verse.map(word=>word[0]).join(" "));
 return NextResponse.json({book,chapter,verses,words,source:"Open Scriptures Hebrew Bible (OSHB), Westminster Leningrad Codex",sourceUrl:"https://github.com/openscriptures/morphhb",version:"WLC / OSHB",sourceAttribution:"Hebrew text: public domain WLC; lemma and morphology: OSHB CC BY 4.0; dictionary: Open Scriptures Strong’s Hebrew Dictionary CC BY-SA"});
}
