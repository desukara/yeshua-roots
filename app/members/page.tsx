"use client";
import Link from "next/link";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import {useLanguage} from "../../components/language-provider";

export default function MembersPage(){
 const {locale}=useLanguage();const he=locale==="he";
 return <><SiteHeader/><main id="main-content" tabIndex={-1} className="section" style={{maxWidth:850,margin:"0 auto",padding:"4rem 1.5rem"}} dir={he?"rtl":"ltr"}>
 <p style={{letterSpacing:".12em",opacity:.75}}>{he?"קהילה ושייכות":"COMMUNITY & BELONGING"}</p>
 <h1>{he?"מרחב לחברי הקהילה":"A home for our community"}</h1>
 <p>{he?"אנו מכינים חשבונות חברים מאובטחים כדי לאפשר בקשות תפילה פרטיות וקהילה תומכת. החברות תהיה תמיד בחינם.":"We are preparing secure member accounts for private prayer requests and supportive fellowship. Membership will always be free."}</p>
 <h2>{he?"ההרשמה עדיין לא נפתחה":"Registration is not open yet"}</h2>
 <p>{he?"לא נבקש סיסמאות או פרטים אישיים לפני שהאימות, הגנת הנתונים וכללי הפרטיות יהיו מוכנים ונבדקו.":"We will not ask for passwords or personal details until authentication, data protections, and privacy procedures have been implemented and reviewed."}</p>
 <h2>{he?"ללא תשלום או לחץ":"No fees or pressure"}</h2>
 <p>{he?"השתתפות, לימוד ותפילה אינם מותנים בתרומה או בתשלום.":"Participation, learning, and prayer never depend on donations or payment."}</p>
 <p><Link href="/prayer">{he?"מידע על תפילה ופרטיות":"Read about prayer and privacy"}</Link></p>
 </main><SiteFooter/></>;
}
