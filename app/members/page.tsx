"use client";
import {useEffect,useState,type FormEvent} from "react";
import type {User} from "@supabase/supabase-js";
import Link from "next/link";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import {useLanguage} from "../../components/language-provider";
import {getMemberAuthClient} from "../../lib/member-auth";

type Mode="signin"|"signup"|"reset";
export default function MembersPage(){
 const {locale}=useLanguage();const he=locale==="he";
 const [user,setUser]=useState<User|null>(null);
 const [ready,setReady]=useState(false);
 const [mode,setMode]=useState<Mode>("signin");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [busy,setBusy]=useState(false);
 const [notice,setNotice]=useState("");
 const [confirmationPending,setConfirmationPending]=useState(false);
 const auth=getMemberAuthClient();
 useEffect(()=>{
  if(!auth){setReady(true);return;}
  let active=true;
  auth.auth.getUser().then(({data})=>{if(active){setUser(data.user);setReady(true);}}).catch(()=>{if(active)setReady(true);});
  const {data:{subscription}}=auth.auth.onAuthStateChange((_event,session)=>{if(active)setUser(session?.user??null);});
  return()=>{active=false;subscription.unsubscribe();};
 },[auth]);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(!auth||busy)return;
  setBusy(true);setNotice("");
  try{
   if(mode==="reset"){
    const {error}=await auth.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin+"/members/reset-password"});
    if(error)throw error;
    setNotice(he?"אם החשבון קיים, נשלח אליו קישור לאיפוס הסיסמה.":"If the account exists, a password reset link has been sent.");
   }else if(mode==="signup"){
    const {data,error}=await auth.auth.signUp({email,password,options:{emailRedirectTo:window.location.origin+"/members"}});
    if(error)throw error;
    setConfirmationPending(!data.session);
    setNotice(data.session?(he?"החשבון נוצר והתחברת.":"Your account is ready and you are signed in."):(he?"הבקשה התקבלה. בדוק את הדוא״ל, כולל תיקיית הספאם. אם לא הגיע קישור, אל תלחץ שוב ושוב — ייתכן שקיימת הגבלת שליחה זמנית.":"Request received. Check your inbox and spam folder for a confirmation link. Please do not keep resubmitting: email delivery may be temporarily limited."));
   }else{
    const {error}=await auth.auth.signInWithPassword({email,password});
    if(error)throw error;
    setNotice(he?"התחברת בהצלחה.":"Signed in successfully.");
   }
  }catch(error){
   const message=error instanceof Error?error.message:"";
   if(/rate limit|too many|seconds|email limit|429/i.test(message))setNotice(he?"יותר מדי ניסיונות בזמן קצר. אנא המתן מספר דקות לפני ניסיון נוסף. אם הבעיה נמשכת, פנה אלינו.":"Too many attempts in a short time. Please wait a few minutes before trying again. If this continues, contact us.");
   else if(/already registered|user already exists/i.test(message))setNotice(he?"ייתכן שכבר קיים חשבון. נסה להתחבר או לאפס סיסמה.":"An account may already exist. Try signing in or resetting your password.");
   else setNotice(message|| (he?"אירעה שגיאה. נסה שוב מאוחר יותר.":"Something went wrong. Please try again later."));
  }
  finally{setBusy(false);setPassword("");}
 }
 async function signOut(){if(!auth)return;setBusy(true);const {error}=await auth.auth.signOut();setBusy(false);setNotice(error?error.message:(he?"התנתקת.":"Signed out."));}
 return <><SiteHeader/><main id="main-content" tabIndex={-1} className="section" style={{maxWidth:680,margin:"0 auto",padding:"4rem 1.5rem"}} dir={he?"rtl":"ltr"}>
 <p style={{letterSpacing:".12em",opacity:.75}}>{he?"קהילה ושייכות":"COMMUNITY & BELONGING"}</p>
 <h1>{he?"חשבון חברים":"Member account"}</h1>
 <p>{he?"החברות והתפילה תמיד בחינם. אין צורך בתרומה.":"Membership and prayer are always free. No donation is required."}</p>
 {!ready?<p role="status">{he?"טוען...":"Loading..."}</p>:!auth?<p role="status">{he?"ההרשמה אינה מוגדרת כרגע. נסה שוב מאוחר יותר.":"Member sign-in is not configured yet. Please check back later."}</p>:user?
 <section aria-label={he?"החשבון שלך":"Your account"}><h2>{he?"ברוך הבא":"Welcome"}</h2><p>{user.email}</p><p>{he?"בקשות תפילה פרטיות עדיין אינן זמינות.":"Private prayer submissions are not available yet."}</p><button type="button" disabled={busy} onClick={signOut}>{he?"התנתקות":"Sign out"}</button></section>:
 <section>
 <h2>{mode==="signup"?(he?"יצירת חשבון":"Create an account"):mode==="reset"?(he?"איפוס סיסמה":"Reset password"):(he?"התחברות":"Sign in")}</h2>
 {mode==="signup"&&<p>{he?"הזן כתובת דוא״ל וסיסמה, ואז לחץ על הכפתור למטה. לאחר מכן ייתכן שתצטרך לאשר את כתובת הדוא״ל שלך.":"Enter your email and password, then press the Create free account button below. We may ask you to confirm your email before you can sign in."}</p>}
 <form onSubmit={submit} style={{display:"grid",gap:"1rem",maxWidth:440}}>
 <label>{he?"כתובת אימייל":"Email address"}<input style={{display:"block",width:"100%",padding:".7rem"}} type="email" autoComplete="email" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)}/></label>
 {mode!=="reset"&&<label>{he?"סיסמה (לפחות 8 תווים)":"Password (at least 8 characters)"}<input style={{display:"block",width:"100%",padding:".7rem"}} type="password" autoComplete={mode==="signup"?"new-password":"current-password"} minLength={mode==="signup"?8:1} required value={password} onChange={e=>setPassword(e.target.value)}/></label>}
 <button disabled={busy||confirmationPending&&mode==="signup"} type="submit" style={{padding:"1rem 1.25rem",fontWeight:700,cursor:"pointer"}}>{busy?(he?"אנא המתן...":"Please wait..."):mode==="signup"?(he?"הרשמה בחינם":"Create free account"):mode==="reset"?(he?"שליחת קישור איפוס":"Send reset link"):(he?"התחברות":"Sign in")}</button>
 </form>
 <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginTop:"1rem"}}>
 {mode!=="signin"&&<button type="button" onClick={()=>{setMode("signin");setNotice("");}}>{he?"כבר יש חשבון? התחברות":"Already a member? Sign in"}</button>}
 {mode!=="signup"&&<button type="button" onClick={()=>{setMode("signup");setNotice("");}}>{he?"יצירת חשבון":"Create account"}</button>}
 {mode!=="reset"&&<button type="button" onClick={()=>{setMode("reset");setNotice("");}}>{he?"שכחת סיסמה?":"Forgot password?"}</button>}
 </div></section>}
 {notice&&<p role="status" aria-live="polite" style={{padding:"1rem",border:"1px solid currentColor",borderRadius:8}}>{notice}</p>}
 {confirmationPending&&<p><button type="button" onClick={()=>{setMode("signin");setConfirmationPending(false);setNotice("");}}>{he?"אישרתי את הדוא״ל — התחברות":"I confirmed my email — sign in"}</button></p>}
 <p style={{marginTop:"2rem"}}><Link href="/prayer">{he?"מידע על תפילה ופרטיות":"Prayer and privacy information"}</Link></p>
 </main><SiteFooter/></>;
}
