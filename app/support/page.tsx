"use client";
import Link from "next/link";
import {useLanguage} from "../../components/language-provider";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";

export default function SupportPage(){
 const {locale}=useLanguage();
 const he=locale==="he";
 const content=he?[
  {title:"נתינה מרצון בלבד",body:"בעתיד נוכל לקבל תרומות מרצון מאנשים שיבחרו לתמוך בעלויות התפעול הלגיטימיות של השירות ובפעילות החסד כאשר תתחיל. תרומה אינה מעניקה גישה מיוחדת, יחס מועדף או השפעה על התוכן."},
  {title:"אחריות ושקיפות",body:"אנו מחויבים להסביר כיצד כספים משמשים, לשמור תיעוד מתאים ולפרסם דיווחים ברורים בהתאם להיקף הפעילות. כספי השירות אינם מיועדים להתעשרות אישית."},
  {title:"אפשרות התרומה עדיין אינה פעילה",body:"איננו מקבלים כרגע תרומות דרך האתר. בהמשך נוכל להוסיף תשלום מאובטח באמצעות Stripe, לאחר שהנהלים והדיווח יהיו מוכנים. לא נבקש פרטי תשלום לפני כן."}
 ]:[
  {title:"Voluntary giving only",body:"In the future, those who freely choose to give will be able to support legitimate ministry operating costs and mercy outreach when it begins. Giving will never buy access, special treatment, or influence over teaching."},
  {title:"Accountability and transparency",body:"We intend to explain how funds are used, keep appropriate records, and publish clear financial reporting proportionate to our operations. Ministry funds are not for personal enrichment."},
  {title:"Giving is not open yet",body:"We are not accepting donations through this website yet. A secure Stripe option may be added once payment handling, policies, and reporting are ready. We will not request payment details before then."}
 ];
 return <><SiteHeader/><main id="main-content" tabIndex={-1} className="ministry-page ministry-page--support" dir={he?"rtl":"ltr"}>
  <header className="ministry-hero"><div className="ministry-hero__copy"><span className="ministry-eyebrow">{he?"יושרה ושקיפות":"STEWARDSHIP & TRANSPARENCY"}</span><h1>{he?"תמיכה בשירות":"Supporting the Ministry"}</h1><p>{he?"כל הלימוד, התפילה, הקהילה והסיוע של Yeshua Roots ניתנים בחינם, ללא תנאי וללא לחץ לתרום.":"All Yeshua Roots teaching, prayer, fellowship, and practical assistance are free, without conditions or pressure to give."}</p></div><div className="ministry-seal" aria-label={he?"אין איסוף תרומות":"No donations collected yet"}><div><span>{he?"סטטוס נוכחי":"CURRENT STATUS"}</span><strong>{he?"סגור":"Not open"}</strong><small>{he?"אין איסוף תרומות":"NO GIVING THROUGH THIS SITE"}</small></div></div></header>
  <div className="ministry-main"><p className="ministry-intro">{he?"אנו רוצים שכל אדם יוכל ללמוד, להתפלל ולקבל סיוע מעשי בלי לשלם ובלי לחץ לתרום.":"We want every person to be able to learn, pray, and receive practical care without paying or feeling pressure to give."}</p><section className="ministry-grid" aria-label={he?"מדיניות נתינה":"Giving principles"}>{content.map((item,i)=><article className="ministry-card" key={item.title}><span className="ministry-card__number">0{i+1} / {he?"עקרונות":"MINISTRY PRACTICE"}</span><h2>{item.title}</h2><p>{item.body}</p></article>)}</section><div className="ministry-notice"><span className="ministry-notice__mark" aria-hidden="true">i</span><div><h2>{he?"לא ניתן לתרום בעמוד זה":"No donations are being collected here"}</h2><p>{he?"לימוד, תפילה, קהילה וסיוע ניתנים ללא תשלום. איננו מקבלים כרגע תרומות דרך האתר.":"Teaching, prayer, community, and assistance are free. We are not accepting donations through this website."}</p></div></div><Link className="ministry-link" href="/about">{he?"קראו על השירות":"Learn about Yeshua Roots"} <span aria-hidden="true">→</span></Link></div>
 </main><SiteFooter/></>;
}
