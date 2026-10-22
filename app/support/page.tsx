"use client";
import Link from "next/link";
import {useLanguage} from "../../components/language-provider";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";

export default function SupportPage(){
 const {locale}=useLanguage();
 const he=locale==="he";
 return <><SiteHeader/><main id="main-content" tabIndex={-1} className="section" style={{maxWidth:850,margin:"0 auto",padding:"4rem 1.5rem"}} dir={he?"rtl":"ltr"}>
 <p style={{letterSpacing:".12em",textTransform:"uppercase",opacity:.7}}>{he?"יושרה ושקיפות":"Stewardship & transparency"}</p>
 <h1>{he?"תמיכה בשירות":"Supporting the Ministry"}</h1>
 <p>{he?"כל הלימוד, התפילה, הקהילה והסיוע של Yeshua Roots ניתנים בחינם, ללא תנאי וללא לחץ לתרום.":"All Yeshua Roots teaching, prayer, fellowship, and practical assistance are free, without conditions or pressure to give."}</p>
 <h2>{he?"נתינה מרצון בלבד":"Voluntary giving only"}</h2>
 <p>{he?"בעתיד נוכל לקבל תרומות מרצון מאנשים שיבחרו לתמוך בעלויות התפעול הלגיטימיות של השירות ובפעילות החסד כאשר תתחיל. תרומה אינה מעניקה גישה מיוחדת, יחס מועדף או השפעה על התוכן.":"In the future, those who freely choose to give will be able to support legitimate ministry operating costs and mercy outreach when it begins. Giving will never buy access, special treatment, or influence over teaching."}</p>
 <h2>{he?"אחריות ושקיפות":"Accountability and transparency"}</h2>
 <p>{he?"אנו מחויבים להסביר כיצד כספים משמשים, לשמור תיעוד מתאים ולפרסם דיווחים ברורים בהתאם להיקף הפעילות. כספי השירות אינם מיועדים להתעשרות אישית.":"We intend to explain how funds are used, keep appropriate records, and publish clear financial reporting proportionate to our operations. Ministry funds are not for personal enrichment."}</p>
 <h2>{he?"אפשרות התרומה עדיין אינה פעילה":"Giving is not open yet"}</h2>
 <p>{he?"איננו מקבלים כרגע תרומות דרך האתר. בהמשך נוכל להוסיף תשלום מאובטח באמצעות Stripe, לאחר שהנהלים והדיווח יהיו מוכנים. לא נבקש פרטי תשלום לפני כן.":"We are not accepting donations through this website yet. A secure Stripe option may be added once payment handling, policies, and reporting are ready. We will not request payment details before then."}</p>
 <p><Link href="/about">{he?"למידע נוסף על השירות":"Learn more about the ministry"}</Link></p>
 </main><SiteFooter/></>;
}
