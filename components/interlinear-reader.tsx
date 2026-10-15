"use client";
import {useEffect,useState} from "react";
import {interlinearVerses} from "../lib/interlinear";
import {useLanguage} from "./language-provider";
type ChapterResponse={verses:string[];sourceUrl:string;version:string|null;error?:string};
export default function InterlinearReader(){
 const {locale}=useLanguage();const he=locale==="he";
 const [chapter,setChapter]=useState(1);const [verse,setVerse]=useState(1);const [chapterData,setChapterData]=useState<ChapterResponse|null>(null);const [loading,setLoading]=useState(false);const [error,setError]=useState("");
 const [selected,setSelected]=useState<number|null>(null);const [showTransliteration,setShowTransliteration]=useState(true);
 useEffect(()=>{const controller=new AbortController();setLoading(true);setError("");setChapterData(null);
 fetch("/api/torah/"+chapter,{signal:controller.signal}).then(async r=>{if(!r.ok)throw new Error("Source unavailable");return r.json() as Promise<ChapterResponse>}).then(data=>{setChapterData(data);setLoading(false)}).catch(e=>{if(e.name!=="AbortError"){setError(he?"לא ניתן לטעון את הפרק כעת.":"Could not load this chapter right now.");setLoading(false)}});
 return ()=>controller.abort()},[chapter,he]);
 const curated=chapter===1?interlinearVerses.find(v=>v.reference==="Genesis 1:"+verse):undefined;
 const word=selected===null?null:curated?.words[selected];
 const hebrew=chapterData?.verses[verse-1]||curated?.hebrew||"";
 const count=chapterData?.verses.length||(chapter===1?31:0);
 function chooseChapter(value:number){setChapter(value);setVerse(1);setSelected(null)}
 function chooseVerse(value:number){setVerse(value);setSelected(null)}
 return <section className="interlinear-reader" aria-label={he?"קריאה בין־שורתית בתורה":"Interlinear Torah reader"}>
 <div className="interlinear-toolbar"><div><span className="kicker">{he?"לימוד עברית מקראית":"BIBLICAL HEBREW STUDY"}</span><h2>{he?"בראשית · לימוד מילה במילה":"Bereshit · Word by Word"}</h2></div>
 <div className="torah-pickers"><label>{he?"ספר":"Book"} <select value="Genesis" disabled><option value="Genesis">{he?"בראשית":"Genesis"}</option></select></label>
 <label>{he?"פרק":"Chapter"} <select value={chapter} onChange={e=>chooseChapter(Number(e.target.value))}>{Array.from({length:50},(_,i)=><option value={i+1} key={i}>{i+1}</option>)}</select></label>
 <label>{he?"פסוק":"Verse"} <select value={verse} onChange={e=>chooseVerse(Number(e.target.value))}>{Array.from({length:count},(_,i)=><option value={i+1} key={i}>{i+1}</option>)}</select></label></div></div>
 <p className="interlinear-intro">{he?"קראו את הפסוקים בעברית. פירוש בין־שורי בדוק זמין כעת לבראשית א׳:א׳–ח׳.":"Read the Hebrew text chapter by chapter. Verified word-by-word annotations currently cover Genesis 1:1–8."}</p>
 <div className="interlinear-options"><label><input type="checkbox" checked={showTransliteration} onChange={e=>setShowTransliteration(e.target.checked)}/> {he?"הצגת תעתיק":"Show transliteration"}</label></div>
 {loading&&<p role="status">{he?"טוען את הפרק...":"Loading Hebrew chapter..."}</p>}
 {error&&<p role="alert">{error} {curated?(he?"מוצג הטקסט השמור.":"Showing locally curated text where available."):""}</p>}
 {curated?<><div className="interlinear-word-grid" dir="rtl" lang="he">{curated.words.map((w,i)=><button className={"interlinear-word"+(selected===i?" selected":"")} type="button" aria-pressed={selected===i} key={i} onClick={()=>setSelected(i)}><span className="iw-hebrew">{w.hebrew}</span>{showTransliteration&&<span className="iw-roman" lang="en" dir="ltr">{w.transliteration}</span>}<span className="iw-english" lang="en" dir="ltr">{w.english}</span></button>)}</div>
 <div className="interlinear-verse" lang="en" dir="ltr"><strong>{curated.reference}</strong><p>{curated.english}</p></div>
 <div className="interlinear-detail" aria-live="polite">{word?<><strong lang="he" dir="rtl">{word.hebrew}</strong><span lang="en" dir="ltr">{word.transliteration} — {word.english}</span><p>{word.note||(he?"משמעות בסיסית של המילה בהקשר הפסוק.":"A contextual gloss for this word in the verse.")}</p></>:<p>{he?"בחרו מילה כדי לפתוח הערת לימוד.":"Choose a word above to open its study note."}</p>}</div></>:hebrew?<div className="torah-verse-panel"><span className="kicker">{he?"טקסט עברי · הערות בין־שוריות בהכנה":"HEBREW TEXT · INTERLINEAR NOTES IN PREPARATION"}</span><p className="torah-hebrew-verse" dir="rtl" lang="he">{hebrew}</p><p>{he?"מיפוי המילים ותרגומן עדיין בבדיקה.":"Word alignment and English glosses for this verse are being prepared and checked."}</p></div>:!loading&&!error?<p>{he?"אין טקסט זמין לפסוק זה.":"No text available for this verse."}</p>:null}
 <div className="torah-reader-pagination"><button type="button" disabled={verse===1} onClick={()=>chooseVerse(verse-1)}>{he?"הפסוק הקודם":"Previous verse"}</button><strong>{he?"בראשית":"Genesis"} {chapter}:{verse}</strong><button type="button" disabled={verse>=count} onClick={()=>chooseVerse(verse+1)}>{he?"הפסוק הבא":"Next verse"}</button></div>
 <p className="interlinear-disclaimer">{he?"טקסט הפרקים מסופק על ידי ספריא, בכפוף לתנאי השימוש והרישיון של הגרסה. פירושי המילים הם חומר לימוד מקורי ואינם תרגום מקרא מלא.":"Hebrew chapter text is provided by Sefaria, subject to its text-version licensing and attribution. Interlinear word glosses are original study notes, not a published Bible translation."} <a href={chapterData?.sourceUrl||"https://www.sefaria.org/Genesis.1"} target="_blank" rel="noopener noreferrer">Sefaria ↗</a>{chapterData?.version?" · "+chapterData.version:""}</p>
 </section>
}