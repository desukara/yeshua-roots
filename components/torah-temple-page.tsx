"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {useLanguage} from "./language-provider";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import TorahBibleReader from "./torah-bible-reader";
import "./torah-temple.css";

const books=[
 {he:"בְּרֵאשִׁית",en:"Genesis",trans:"Bereshit",theme:"Creation & covenant"},
 {he:"שְׁמוֹת",en:"Exodus",trans:"Shemot",theme:"Redemption & revelation"},
 {he:"וַיִּקְרָא",en:"Leviticus",trans:"Vayikra",theme:"Holiness & worship"},
 {he:"בְּמִדְבַּר",en:"Numbers",trans:"Bamidbar",theme:"The wilderness journey"},
 {he:"דְּבָרִים",en:"Deuteronomy",trans:"Devarim",theme:"The covenant renewed"}
];
function Palm({flip=false}:{flip?:boolean}){
 // Solid, separated leaf silhouettes avoid the crosshatching of the former line-art palms.
 const leaves=[
  {tip:[24,83],control:[58,27],base:[117,91],width:11},
  {tip:[32,48],control:[65,12],base:[117,91],width:10},
  {tip:[68,19],control:[87,7],base:[119,91],width:9},
  {tip:[105,13],control:[108,2],base:[120,91],width:8},
  {tip:[136,13],control:[132,2],base:[120,91],width:8},
  {tip:[173,19],control:[152,7],base:[121,91],width:9},
  {tip:[208,48],control:[175,12],base:[123,91],width:10},
  {tip:[216,83],control:[182,27],base:[123,91],width:11},
  {tip:[20,119],control:[52,64],base:[117,93],width:12},
  {tip:[220,119],control:[188,64],base:[123,93],width:12},
  {tip:[40,157],control:[55,101],base:[117,96],width:11},
  {tip:[200,157],control:[185,101],base:[123,96],width:11}
 ];
 return <svg className={flip?"torah-sanctuary-palm flipped":"torah-sanctuary-palm"} viewBox="0 0 240 340" fill="none" aria-hidden="true">
  <g fill="currentColor">
   <path d="M116 329 C117 271 119 204 117 94 L124 94 C125 204 122 271 125 329 Z" opacity=".86"/>
   {leaves.map(({tip,control,base,width},i)=>{
    const [bx,by]=base,[cx,cy]=control,[tx,ty]=tip;
    const vx=tx-bx,vy=ty-by,length=Math.hypot(vx,vy);
    const nx=-vy/length*width,ny=vx/length*width;
    return <path key={i} d={`M${bx} ${by} Q${cx+nx} ${cy+ny} ${tx} ${ty} Q${cx-nx} ${cy-ny} ${bx} ${by} Z`} opacity={i>7?".72":".9"}/>;
   })}
  </g>
 </svg>
}
function TempleOrnament(){return <div className="temple-ornament temple-architectural-rule" aria-hidden="true"><span/><i/><span/></div>}
export default function TorahTemplePage(){const {locale}=useLanguage();const he=locale==="he";const [openBook,setOpenBook]=useState<string|null>(null);const readerRef=useRef<HTMLElement>(null);useEffect(()=>{if(openBook)readerRef.current?.scrollIntoView({behavior:"smooth",block:"start"})},[openBook]);const openTorah=(book:string)=>setOpenBook(book);return <><SiteHeader/><main id="main-content" className="torah-temple" tabIndex={-1}>
<section className="temple-portal" aria-labelledby="temple-title"><div className="temple-portal-inner"><Palm/><div className="temple-portal-copy"><p className="temple-supratitle" lang="he" dir="rtl">בית מדרש · ישוע רוטס</p><TempleOrnament/><h1 id="temple-title" lang="he" dir="rtl">תּוֹרָה</h1><p className="temple-english-title">{he?"חֲמִשָּׁה חוּמְשֵׁי תוֹרָה":"THE FIVE BOOKS OF MOSES"}</p><p className="temple-portal-description">{he?"לימוד התורה בעברית ובאנגלית, מתוך כבוד למסורת ישראל ולאור ישוע המשיח.":"Enter the words of Torah. Study the Hebrew, explore the Jewish sources, and discover Yeshua, the living Messiah of Israel."}</p><button type="button" className="temple-primary-link" onClick={()=>openTorah("Genesis")} aria-controls="scripture-reader" aria-expanded={openBook!==null}>{he?"פתחו את התורה":"Open the Torah"} <span aria-hidden="true">↗</span></button><p className="temple-verse-source" lang="en" dir="ltr">“That at that time ye were without Christ, being aliens from the commonwealth of Israel, and strangers from the covenants of promise, having no hope, and without God in the world: But now in Christ Jesus ye who sometimes were far off are made nigh by the blood of Christ.” <span>EPHESIANS 2:12–13 · KJV</span></p></div><Palm flip/></div><div className="temple-portal-foot" aria-hidden="true"><div className="temple-architectural-rule"><span/><i/><span/></div></div></section>
<section className="temple-book-section" aria-labelledby="temple-books-heading"><div className="temple-section-heading"><span className="temple-eyebrow">{he?"חמשת חומשי תורה":"CHAMISHA CHUMSHEI TORAH"}</span><h2 id="temple-books-heading">{he?"חֲמִשָּׁה חוּמְשֵׁי תוֹרָה":"The Five Books of Moses"}</h2><TempleOrnament/></div><div className="temple-book-grid">{books.map((book,i)=><button key={book.en} type="button" onClick={()=>openTorah(book.en)} className="temple-book" aria-label={`Open Torah reader — ${book.en}`} aria-controls="scripture-reader" aria-expanded={openBook===book.en}><span className="temple-book-index">{String(i+1).padStart(2,"0")}</span><span className="temple-book-he" lang="he" dir="rtl">{book.he}</span><strong>{book.trans}</strong><span className="temple-book-en">{book.en}</span><span className="temple-book-theme">{book.theme}</span></button>)}</div><p className="temple-book-note">{he?"בחרו את הספר ואת הפרק בקורא הכתובים להלן.":"Choose your book and chapter in the Scripture reader below."}</p></section>
{openBook!==null&&<section ref={readerRef} id="scripture-reader" className="temple-reader-section" aria-label={he?"קריאה בתורה ובכתובים":"Torah and Scripture reading"}><div className="temple-reader-arch"><div className="temple-reader-heading"><span className="temple-eyebrow">{he?"פתחו את הכתובים":"THE SCRIPTURE READER"}</span><h2 lang="he" dir="rtl">וְהָגִיתָ בּוֹ יוֹמָם וָלַיְלָה</h2><p>{he?"יהושע א׳:ח׳ · קראו, למדו והעמיקו":"JOSHUA 1:8 · Read, contemplate, and study"}</p></div><button type="button" className="temple-close-reader" onClick={()=>setOpenBook(null)}>{he?"סגרו את התורה":"Close the Torah"} ×</button><TorahBibleReader key={openBook} initialBook={openBook}/></div></section>}
<section className="temple-study-section" aria-labelledby="temple-study-heading"><div className="temple-section-heading"><span className="temple-eyebrow">{he?"שערי הלימוד":"PATHS OF STUDY"}</span><h2 id="temple-study-heading">{he?"דַּרְכֵי הַלִּמּוּד":"Explore Scripture Studies"}</h2><TempleOrnament/></div><div className="temple-study-links"><Link href="/interlinear"><span lang="he" dir="rtl">עִבְרִית</span><strong>{he?"לימוד מילה במילה":"Biblical Hebrew"}</strong><small>{he?"לימוד השפה של הכתובים":"Study the language of Scripture, word by word"}</small></Link><Link href="/library"><span lang="he" dir="rtl">כִּתְבֵי הַקֹּדֶשׁ</span><strong>{he?"ספריית הלימוד":"The Study Library"}</strong><small>{he?"מקורות ולימודי עומק":"Explore source texts and study resources"}</small></Link></div><blockquote className="temple-grafting-verse" lang="en" dir="ltr"><h3 className="temple-messiah-speaker">Yeshua (Jesus) the Messiah said:</h3><p><strong>17</strong> Think not that I am come to destroy the law, or the prophets: I am not come to destroy, but to fulfil.</p><p><strong>18</strong> For verily I say unto you, Till heaven and earth pass, one jot or one tittle shall in no wise pass from the law, till all be fulfilled.</p><p><strong>19</strong> Whosoever therefore shall break one of these least commandments, and shall teach men so, he shall be called the least in the kingdom of heaven: but whosoever shall do and teach them, the same shall be called great in the kingdom of heaven.</p><cite>MATTHEW 5:17–19 · KJV</cite></blockquote></section>
<div className="temple-home-return"><Link href="/" className="temple-home-button" aria-label="Back to Yeshua Roots main page">← Home / ראשי</Link></div>
</main><SiteFooter/></>}
