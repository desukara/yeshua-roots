"use client";
import Link from "next/link";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import StudyLibrary from "./study-library";
import {publishedStudies} from "../lib/content";
import {useLanguage} from "./language-provider";

export default function LibraryClient(){
 const {locale}=useLanguage();
 const he=locale==="he";
 return <><SiteHeader/><main id="main-content" tabIndex={-1}>
  <section className="section-hero bm-hero">
   <span className="kicker">{he?"בית מדרש · לימוד יהודי משיחי":"BEIT MIDRASH · MESSIANIC JEWISH STUDY"}</span>
   <h1>{he?"לומדים את הכתובים עם ישוע המשיח":"Study Scripture with Yeshua the Messiah"}</h1>
   <p>{he?"אנו מאמינים שישוע הוא משיח ישראל, בן האלוהים שקם מן המתים, ומושיע כל המאמינים בו. כל לימוד המוצג כאן כפירוש של ישוע רוטס נבחן לאור אמונה זו.":"We confess Yeshua as Israel’s promised Messiah, the risen Son of God and Savior of all who believe in Him. All Yeshua Roots teaching presented here is reviewed in light of this confession."}</p>
   <p>{he?"ספריית הפרשנות הרבנית החיצונית הוסרה כדי שלא להציג עמדות שאינן משיחיות כאמונת האתר.":"The external rabbinic commentary library has been withdrawn so that non-Messianic interpretations are not presented as this ministry’s teaching."}</p>
   <p><Link href="/torah">{he?"קריאת התורה והכתובים":"Read Torah and Scripture"}</Link> · <Link href="/start-here">{he?"הכירו את ישוע":"Meet Yeshua"}</Link></p>
  </section>
  <section className="bm-original-studies"><StudyLibrary studies={publishedStudies}/></section>
 </main><SiteFooter/></>;
}
