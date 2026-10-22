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
 <p>{he?"המערכת עדיין בהקמה. אנא אל תשלחו מידע רפואי או אישי רגיש דרך טופס יצירת הקשר הכללי.":"The secure prayer system is still being built. Please do not send medical details or sensitive personal information through this website."}</p>
 <section aria-labelledby="prayer-questions" style={{marginTop:"2.5rem"}}>
 <h2 id="prayer-questions">{he?"שאלות נפוצות":"Common questions"}</h2>
 <h3>{he?"האם הבקשה שלי תהיה ציבורית?":"Will my request appear publicly?"}</h3>
 <p>{he?"לא. איננו מפרסמים בקשות תפילה באתר. ההגשה הפרטית עדיין אינה פתוחה.":"No. We do not publish prayer requests on the website. Private submissions are not open yet."}</p>
 <h3>{he?"מי יוכל לקרוא את הבקשה שלי?":"Who will be able to read my request?"}</h3>
 <p>{he?"עדיין לא נקבע תהליך גישה לצוות התפילה. לא נפתח את השירות לפני שנפרסם כללי גישה, שמירה ומחיקה ברורים.":"Access for a prayer-care team has not been finalized. We will not open submissions until access, retention, and deletion rules are clear."}</p>
 <h3>{he?"האם צריך לשלם או להיות חבר כדי לקבל תפילה?":"Does prayer require payment or membership?"}</h3>
 <p>{he?"לעולם לא נגבה תשלום עבור תפילה. החשבון ישמש רק להגנה על בקשות פרטיות כשהשירות ייפתח.":"Prayer is always free. A member account will only help protect private requests once submissions open."}</p>
 <h3>{he?"מה אם אני זקוק לעזרה דחופה?":"What if I need urgent help?"}</h3>
 <p>{he?"האתר אינו שירות חירום ואיננו מנטרים בקשות לעזרה דחופה. במקרה של סכנה מיידית, פנה לשירותי החירום המקומיים.":"This website is not an emergency response service, and we do not monitor urgent requests. If someone is in immediate danger, contact local emergency services."}</p>
 </section>
 <p><Link href="/members">{he?"למידע על חשבון חברים":"Learn about member accounts"}</Link></p>
 <p><Link href="/community">{he?"חזרה לקהילה":"Explore our community"}</Link></p>
 </main><SiteFooter/></>;
}
