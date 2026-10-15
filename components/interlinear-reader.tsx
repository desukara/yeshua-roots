"use client";
import {useState} from "react";
import {interlinearVerses} from "../lib/interlinear";
import {useLanguage} from "./language-provider";
export default function InterlinearReader(){
 const {locale}=useLanguage();const he=locale==="he";const [verse,setVerse]=useState(0);const [selected,setSelected]=useState<number|null>(null);const [showTransliteration,setShowTransliteration]=useState(true);
 const current=interlinearVerses[verse];const word=selected===null?null:current.words[selected];
 return <section className="interlinear-reader" aria-label={he?"קריאה בין־שורתית בתורה":"Interlinear Torah reader"}>
 <div className="interlinear-toolbar"><div><span className="kicker">{he?"לימוד עברית מקראית":"BIBLICAL HEBREW STUDY"}</span><h2>{he?"בראשית · לימוד מילה במילה":"Bereshit · Word by Word"}</h2></div><label>{he?"פסוק":"Verse"} <select value={verse} onChange={e=>{setVerse(Number(e.target.value));setSelected(null)}}>{interlinearVerses.map((v,i)=><option value={i} key={v.reference}>{v.reference}</option>)}</select></label></div>
 <p className="interlinear-intro">{he?"לחצו על מילה עברית כדי לראות את משמעותה והערות לימוד.":"Select any Hebrew word to explore its meaning and study notes."}</p>
 <div className="interlinear-options"><label><input type="checkbox" checked={showTransliteration} onChange={e=>setShowTransliteration(e.target.checked)}/> {he?"הצגת תעתיק":"Show transliteration"}</label></div>
 <div className="interlinear-word-grid" dir="rtl" lang="he">{current.words.map((w,i)=><button className={"interlinear-word"+(selected===i?" selected":"")} type="button" aria-pressed={selected===i} key={i} onClick={()=>setSelected(i)}><span className="iw-hebrew">{w.hebrew}</span>{showTransliteration&&<span className="iw-roman" lang="en" dir="ltr">{w.transliteration}</span>}<span className="iw-english" lang="en" dir="ltr">{w.english}</span></button>)}</div>
 <div className="interlinear-verse" lang="en" dir="ltr"><strong>{current.reference}</strong><p>{current.english}</p></div>
 <div className="interlinear-detail" aria-live="polite">{word?<><strong lang="he" dir="rtl">{word.hebrew}</strong><span lang="en" dir="ltr">{word.transliteration} — {word.english}</span><p>{word.note||(he?"משמעות בסיסית של המילה בהקשר הפסוק.":"A contextual gloss for this word in the verse.")}</p></>:<p>{he?"בחרו מילה כדי לפתוח הערת לימוד.":"Choose a word above to open its study note."}</p>}</div>
 <p className="interlinear-disclaimer">{he?"התרגומים כאן הם פירושים מילוליים ללימוד, ולא תרגום מקרא מלא. גרסת לימוד ראשונית הכוללת שני פסוקים.":"These are original study glosses, not a published Bible translation. Initial study edition: Genesis 1:1–2. Some Hebrew particles have no direct English equivalent."}</p>
 </section>
}