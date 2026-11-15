"use client";
import Link from "next/link";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import {useLanguage} from "../../components/language-provider";

export default function PrayerPage(){
 const {locale}=useLanguage();const he=locale==="he";
 const questions=he?[
  ["האם הבקשה שלי תהיה ציבורית?","לא. איננו מפרסמים בקשות תפילה באתר. ההגשה הפרטית עדיין אינה פתוחה."],
  ["מי יוכל לקרוא את הבקשה שלי?","עדיין לא נקבע תהליך גישה לצוות התפילה. לא נפתח את השירות לפני שנפרסם כללי גישה, שמירה ומחיקה ברורים."],
  ["האם צריך לשלם או להיות חבר כדי לקבל תפילה?","לעולם לא נגבה תשלום עבור תפילה. החשבון ישמש רק להגנה על בקשות פרטיות כשהשירות ייפתח."],
  ["מה אם אני זקוק לעזרה דחופה?","האתר אינו שירות חירום ואיננו מנטרים בקשות לעזרה דחופה. במקרה של סכנה מיידית, פנה לשירותי החירום המקומיים."]
 ]:[
  ["Will my request appear publicly?","No. We do not publish prayer requests on the website. Private submissions are not open yet."],
  ["Who will be able to read my request?","Access for a prayer-care team has not been finalized. We will not open submissions until access, retention, and deletion rules are clear."],
  ["Does prayer require payment or membership?","Prayer is always free. A member account will only help protect private requests once submissions open."],
  ["What if I need urgent help?","This website is not an emergency response service, and we do not monitor urgent requests. If someone is in immediate danger, contact local emergency services."]
 ];
 return <><SiteHeader/><main id="main-content" tabIndex={-1} className="ministry-page ministry-page--prayer" dir={he?"rtl":"ltr"}>
  <header className="ministry-hero"><div className="ministry-hero__copy"><span className="ministry-eyebrow">{he?"תפילה וקהילה":"PRAYER & COMMUNITY"}</span><h1>{he?"מקום לתפילה בכבוד ובפרטיות":"A place for prayer, with dignity and privacy"}</h1><p>{he?"אנו מכינים דרך בטוחה לשלוח בקשות תפילה אישיות. תפילה תהיה תמיד ללא תשלום, ללא לחץ וללא דרישה לתרומה.":"We are preparing a secure way for members to share personal prayer requests. Prayer will always be free, with no pressure to give or donate."}</p></div><div className="ministry-seal" aria-label={he?"הגשת בקשות עדיין אינה זמינה":"Prayer requests are not open yet"}><div><span>{he?"בקשות פרטיות":"PRIVATE REQUESTS"}</span><strong>{he?"בהקמה":"In preparation"}</strong><small>{he?"ההגשה עדיין סגורה":"SUBMISSIONS ARE CLOSED"}</small></div></div></header>
  <div className="ministry-main"><div className="ministry-notice"><span className="ministry-notice__mark" aria-hidden="true">i</span><div><h2>{he?"הגשת בקשות עדיין לא זמינה":"Submissions are not open yet"}</h2><p>{he?"המערכת עדיין בהקמה. אנא אל תשלחו מידע רפואי או אישי רגיש באמצעות האתר.":"The secure prayer system is still being built. Please do not send medical details or sensitive personal information through this website."}</p></div></div>
   <p className="ministry-intro">{he?"בקשות תפילה לא יפורסמו לציבור. לפני פתיחת השירות נגדיר מי רשאי לקרוא בקשות, כיצד הן מוגנות וכיצד אפשר למשוך בקשה.":"Prayer requests will not be publicly posted. Before submissions open, we will define exactly who can read requests, how they are protected, and how a request can be withdrawn."}</p>
   <section className="ministry-section"><span className="ministry-kicker">{he?"פרטיות לפני הכול":"OUR COMMITMENT"}</span><h2>{he?"תפילה בלי לחץ ובלי חשיפה":"Care without pressure or exposure"}</h2><div className="ministry-grid"><article className="ministry-card"><span className="ministry-card__number">01 / {he?"פרטיות":"PRIVACY"}</span><h3>{he?"הבקשות נשארות פרטיות":"Requests stay private"}</h3><p>{he?"איננו מפרסמים בקשות תפילה באתר. ההגשה הפרטית עדיין אינה פתוחה.":"We do not publish prayer requests on the website. Private submissions are not open yet."}</p></article><article className="ministry-card"><span className="ministry-card__number">02 / {he?"גישה":"ACCESS"}</span><h3>{he?"כללי גישה ברורים":"Clear access rules"}</h3><p>{he?"לא נפתח את השירות עד שכללי גישה, שמירה ומחיקה יהיו ברורים.":"Submissions will remain closed until access, retention, and deletion rules are clear."}</p></article><article className="ministry-card"><span className="ministry-card__number">03 / {he?"ללא תשלום":"ALWAYS FREE"}</span><h3>{he?"תפילה אינה מוצר":"Prayer is never a purchase"}</h3><p>{he?"לעולם לא נגבה תשלום עבור תפילה או נדרוש חברות או תרומה.":"Prayer is always free. No payment, membership, or donation is required."}</p></article></div></section>
   <section className="ministry-section"><span className="ministry-kicker">{he?"תשובות ברורות":"BEFORE YOU ASK"}</span><h2>{he?"שאלות נפוצות":"Common questions"}</h2><div className="ministry-faq">{questions.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
   <Link className="ministry-link" href="/outreach">{he?"מידע על סיוע מעשי":"Explore outreach and mercy"} <span aria-hidden="true">→</span></Link>
  </div>
 </main><SiteFooter/></>;
}
