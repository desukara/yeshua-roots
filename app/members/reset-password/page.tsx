"use client";
import {useEffect,useState,type FormEvent} from "react";
import Link from "next/link";
import SiteHeader from "../../../components/site-header";
import SiteFooter from "../../../components/site-footer";
import {useLanguage} from "../../../components/language-provider";
import {getMemberAuthClient} from "../../../lib/member-auth";
export default function ResetPasswordPage(){
 const {locale}=useLanguage();const he=locale==="he";
 const [ready,setReady]=useState(false),[password,setPassword]=useState(""),[notice,setNotice]=useState(""),[busy,setBusy]=useState(false);
 const auth=getMemberAuthClient();
 useEffect(()=>{if(!auth){setReady(true);return;}auth.auth.getSession().then(({data})=>setReady(!!data.session)).catch(()=>setReady(false));const {data:{subscription}}=auth.auth.onAuthStateChange((_event,session)=>{if(session)setReady(true);});return()=>subscription.unsubscribe();},[auth]);
 async function submit(e:FormEvent){e.preventDefault();if(!auth)return;setBusy(true);const {error}=await auth.auth.updateUser({password});setBusy(false);setPassword("");setNotice(error?error.message:(he?"הסיסמה עודכנה.":"Password updated. You can now sign in."));}
 return <><SiteHeader/><main id="main-content" tabIndex={-1} className="section" style={{maxWidth:640,margin:"0 auto",padding:"4rem 1.5rem"}} dir={he?"rtl":"ltr"}><h1>{he?"איפוס סיסמה":"Reset your password"}</h1>{ready?<form onSubmit={submit}><label>{he?"סיסמה חדשה":"New password"}<input style={{display:"block",padding:".7rem",margin:".7rem 0"}} type="password" autoComplete="new-password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></label><button disabled={busy} type="submit">{he?"עדכון סיסמה":"Update password"}</button></form>:<p>{he?"פתח את קישור האיפוס שקיבלת באימייל כדי להמשיך.":"Open the password reset link in your email to continue."}</p>}{notice&&<p role="status">{notice}</p>}<p><Link href="/members">{he?"חזרה לחברים":"Back to members"}</Link></p></main><SiteFooter/></>;
}
