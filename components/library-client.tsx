"use client";
import Link from "next/link";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import StudyLibrary from "./study-library";
import {publishedStudies} from "../lib/content";
import {useLanguage} from "./language-provider";
export default function LibraryClient(){
 const {locale}=useLanguage();const he=locale==="he";
 return <><SiteHeader/><main id="main-content" tabIndex={-1}>
  <section className="section-hero bm-hero">
   <span className="kicker">{he?"ספריית לימוד כתבי הקודש":"SCRIPTURE STUDY LIBRARY"}</span>
   <h1>{he?"לומדים את הכתובים עם ישוע המשיח":"Study Scripture with Yeshua the Messiah"}</h1>
   <p>{he?"אנו מאמינים שישוע הוא משיח ישראל, בן האלוהים שקם מן המתים, ומושיע כל המאמינים בו.":"We confess Yeshua as Israel’s promised Messiah, the risen Son of God and Savior of all who believe in Him."}</p>
   <p>{he?"לימוד כתבי הקודש כאן מבוסס על התורה, הנביאים, הכתובים והברית החדשה, עם ישוע במרכז.":"Explore the Torah, Prophets, Writings, and Apostolic Scriptures with Yeshua at the center."}</p>
   <p><Link href="/torah">{he?"קריאת התורה והכתובים":"Read Torah and Scripture"}</Link> · <Link href="/start-here">{he?"הכירו את ישוע":"Meet Yeshua"}</Link></p>
  </section>
  <section className="bm-original-studies"><StudyLibrary studies={publishedStudies}/></section>
 </main><SiteFooter/></>;
}
