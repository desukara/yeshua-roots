"use client";
import Link from "next/link";
import {useState} from "react";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import StudyLibrary from "./study-library";
import {publishedStudies} from "../lib/content";
import {useLanguage} from "./language-provider";

export default function LibraryClient(){
 const {locale}=useLanguage();
 const he=locale==="he";
 const [ref,setRef]=useState("Rashi on Genesis 1:1");
 const [source,setSource]=useState<unknown>(null);
 const [error,setError]=useState("");
 const [loading,setLoading]=useState(false);
 async function loadSource(){setLoading(true);setError("");setSource(null);try{const response=await fetch("/api/library/text?ref="+encodeURIComponent(ref));if(!response.ok)throw Error("Source unavailable");setSource(await response.json());}catch{setError("Could not load this reference.");}finally{setLoading(false)}}
 return <><SiteHeader/><main id="main-content" tabIndex={-1}>
  <section className="section-hero bm-hero">
   <span className="kicker">{he?"בית מדרש · לימוד יהודי משיחי":"BEIT MIDRASH · MESSIANIC JEWISH STUDY"}</span>
   <h1>{he?"לומדים את הכתובים עם ישוע המשיח":"Study Scripture with Yeshua the Messiah"}</h1>
   <p>{he?"אנו מאמינים שישוע הוא משיח ישראל, בן האלוהים שקם מן המתים, ומושיע כל המאמינים בו. כל לימוד המוצג כאן כפירוש של ישוע רוטס נבחן לאור אמונה זו.":"We confess Yeshua as Israel’s promised Messiah, the risen Son of God and Savior of all who believe in Him. All Yeshua Roots teaching presented here is reviewed in light of this confession."}</p>
   <p>{he?"המחקר הרבני היהודי מתקבל כאן כמקור היסטורי. קטעים נבדקים לפני פרסומם, וקטעים השוללים את משיחיותו של ישוע לא יוצגו כלימוד מטעם האתר. ציפיות לעתיד המשיחי יוסברו בנפרד לאור שובו של ישוע, מלכותו הנוכחית באמצעות רוח הקודש ומלכות אלף השנים מירושלים. דברי המחברים ההיסטוריים לא ישוכתבו.":"Jewish rabbinic scholarship is welcome as historical context. Individual excerpts are being reviewed before publication; passages denying or disparaging Yeshua as Messiah will not be featured as ministry study material. References to a future Messiah or Messianic age will be explained separately through Yeshua’s return, His present Kingdom through the Holy Spirit, and His future millennial reign from Jerusalem. Historical authors’ own beliefs will never be rewritten or falsely attributed to them."}</p>
   <p><Link href="/torah">{he?"קריאת התורה והכתובים":"Read Torah and Scripture"}</Link> · <Link href="/start-here">{he?"הכירו את ישוע":"Meet Yeshua"}</Link></p>
  </section>
  <section className="bm-original-studies" style={{maxWidth:900,margin:"2rem auto",padding:"1rem"}}><h2>{he?"ספריית מקורות רבניים":"Rabbinic source library"}</h2><p>{he?"מקורות חיצוניים מוצגים למחקר היסטורי ואינם מלמדים את עמדת ישוע רוטס.":"Browse original rabbinic sources for historical research. External source texts do not represent Yeshua Roots teaching."}</p><form onSubmit={e=>{e.preventDefault();void loadSource()}}><label htmlFor="rabbinic-ref">Sefaria reference</label><input id="rabbinic-ref" value={ref} onChange={e=>setRef(e.target.value)} style={{width:"100%",padding:"0.75rem",margin:"0.5rem 0"}}/><button type="submit" disabled={loading}>{loading?"Loading…":"Read source"}</button></form>{error&&<p role="alert">{error}</p>}{source!==null&&<pre style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere",maxHeight:600,overflowY:"auto",padding:"1rem"}}>{JSON.stringify(source,null,2)}</pre>}</section>
  <section className="bm-original-studies"><StudyLibrary studies={publishedStudies}/></section>
 </main><SiteFooter/></>;
}
