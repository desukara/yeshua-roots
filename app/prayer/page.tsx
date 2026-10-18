"use client";
import Link from "next/link";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import {useLanguage} from "../../components/language-provider";
export default function PrayerPage(){
 const {locale}=useLanguage();const he=locale==="he";
 return <><SiteHeader/><main id="main-content" tabIndex={-1} className="section" style={{maxWidth:850,margin:"0 auto",padding:"4rem 1.5rem"}} dir={he?"rtl":"ltr"}>
 <p style={{letterSpacing:".12em",opacity:.75}}>{he?"תפילה וקהילה":"PRAYER & COMMUNITY"}</p>
 <h1>{he?"מקום לתפילה בכבוד ובפרטיות":"A place for prayer, with dignity and privacy"}</h1>
 <p>{he?"אנו מכינים דרך בטוחה לשלוח בקשות תפילה אישיות. תפילה תהיה תמיד ללא תשלום, ללא לחץ וללא דרישה לתרומה.":"We are preparing a secure way for members to share personal prayer requests. Prayer will always be free, with no pressure to give or donate."}</p>
 <h2>{he?"פרטיות לפני הכול":"Privacy comes first"}</h2>
 <p>{he?"בקשות תפילה לא יפורסמו לציבור. לפני פתיחת השירות נגדיר מי רשאי לקרוא בקשות, כיצד הן מוגנות וכיצד אפשר למשוך בקשה.":"Prayer requests will not be publicly posted. Before submissions open, we will define exactly who can read requests, how they are protected, and how a request can be withdrawn."}</p>
 <h2>{he?"הגשת בקשות עדיין לא זמינה":"Submissions are not open yet"}</h2>
 <p>{he?"המערכת עדיין בהקמה. אנא אל תשלחו מידע רפואי או אישי רגיש דרך טופס יצירת הקשר הכללי.":"The secure prayer system is still being built. Please do not send medical details or sensitive personal information through the general contact form."}</p>
 <p><Link href="/community">{he?"חזרה לקהילה":"Explore our community"}</Link></p>
 </main><SiteFooter/></>;
}
