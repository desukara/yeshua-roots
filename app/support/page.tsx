"use client";
import Link from "next/link";
import {useLanguage} from "../../components/language-provider";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";

export default function SupportPage(){
 const {locale}=useLanguage();
 const he=locale==="he";
 const work=he?[
  {title:"מזון וסיוע מעשי",body:"אנו נערכים לפעילות שתסייע לאנשים רעבים ולחסרי בית בטוקיו, בשיתוף גורמים מקומיים מנוסים."},
  {title:"נוכחות ואכפתיות",body:"המטרה היא להגיע לאנשים המתמודדים עם בדידות ומצוקה, להקשיב ולסייע בדרכים מעשיות ומכבדות."},
  {title:"השלב הנוכחי",body:"הפעילות נמצאת עדיין בשלבי הכנה. חלוקת מזון וקבלת פניות לסיוע טרם החלו."}
 ]:[
  {title:"Food and practical care",body:"We are preparing outreach for people facing hunger and homelessness in Tokyo, working toward partnerships with experienced local organizations."},
  {title:"Showing up for people",body:"The aim is to reach people facing loneliness and hardship, listen, and offer practical care with dignity."},
  {title:"Where things stand",body:"This work is still being prepared. Food distribution and requests for assistance have not started yet."}
 ];
 return <><SiteHeader/><main id="main-content" tabIndex={-1} className="ministry-page ministry-page--support" dir={he?"rtl":"ltr"}>
  <header className="ministry-hero"><div className="ministry-hero__copy"><span className="ministry-eyebrow">{he?"חסד ומעשים":"MERCY IN ACTION"}</span><h1>{he?"לתת בחזרה":"Giving Back"}</h1><p>{he?"Yeshua Roots קיים כדי לשרת אנשים — בלימוד, בתפילה ובמעשים של חסד. אנו לא מבקשים עזרה כספית מאנשים.":"Yeshua Roots is here to serve people through teaching, prayer, and practical care. We do not ask people for financial help."}</p></div></header>
  <div className="ministry-main"><p className="ministry-intro">{he?"הכיוון שלנו פשוט: לזהות צרכים אמיתיים ולהושיט יד כשנוכל, החל מטוקיו.":"Our focus is simple: recognize real needs and respond where we can, beginning in Tokyo."}</p><section className="ministry-grid" aria-label={he?"תחומי פעילות":"Areas of outreach"}>{work.map((item,i)=><article className="ministry-card" key={item.title}><span className="ministry-card__number">0{i+1}</span><h2>{item.title}</h2><p>{item.body}</p></article>)}</section><Link className="ministry-link" href="/outreach">{he?"עוד על פעילות החסד":"Read about our outreach"} <span aria-hidden="true">→</span></Link></div>
 </main><SiteFooter/></>;
}
