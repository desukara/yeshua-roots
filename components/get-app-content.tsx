"use client";
import Link from "next/link";
import InstallAppButton from "./install-app-button";
import {useLanguage} from "./language-provider";

export default function GetAppContent(){
 const {locale}=useLanguage();
 const he=locale==="he";
 return <div className="install-shell">
  <img className="install-logo" src="/brand/app-icon.svg" alt={he?"סמל מגן דוד מוזהב של שורשי ישוע":"Yeshua Roots gold Star of David app icon"} width="110" height="110"/>
  <span className="install-eyebrow">{he?"משיח אחד · תורה אחת · משפחה אחת":"ONE MESSIAH · ONE TORAH · ONE FAMILY"}</span>
  <h1>{he?"קחו את שורשי ישוע איתכם.":"Take Yeshua Roots with you."}</h1>
  <p className="install-lead">{he?"שורשי ישוע מביא את לימוד כתבי הקודש לטלפון, לטאבלט ולמחשב שלכם. התקינו את האפליקציה לגישה מהירה.":"Yeshua Roots brings Scripture study to your phone, tablet, and computer. Install the app for quick access."}</p>
  <InstallAppButton/>
  <div className="install-home-link"><Link href="/">{he?"חזרה לעמוד הבית":"← Return Home"}</Link></div>
 </div>;
}
