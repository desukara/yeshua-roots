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
    setNotice(data.session?(he?"החשבון נוצר והתחברת.":"Your account is ready and you are signed in."):(he?"בדוק את תיבת הדואר כדי לאמת את כתובת האימייל.":"Check your email to confirm your address before signing in."));
   }else{
    const {error}=await auth.auth.signInWithPassword({email,password});
    if(error)throw error;
    setNotice(he?"התחברת בהצלחה.":"Signed in successfully.");
   }
  }catch(error){setNotice(error instanceof Error?error.message:(he?"אירעה שגיאה.":"Something went wrong."));}
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
 <form onSubmit={submit} style={{display:"grid",gap:"1rem",maxWidth:440}}>
 <label>{he?"כתובת אימייל":"Email address"}<input style={{display:"block",width:"100%",padding:".7rem"}} type="email" autoComplete="email" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)}/></label>
 {mode!=="reset"&&<label>{he?"סיסמה (לפחות 8 תווים)":"Password (at least 8 characters)"}<input style={{display:"block",width:"100%",padding:".7rem"}} type="password" autoComplete={mode==="signup"?"new-password":"current-password"} minLength={mode==="signup"?8:1} required value={password} onChange={e=>setPassword(e.target.value)}/></label>}
 <button disabled={busy} type="submit">{busy?(he?"אנא המתן...":"Please wait..."):mode==="signup"?(he?"הרשמה בחינם":"Create free account"):mode==="reset"?(he?"שליחת קישור איפוס":"Send reset link"):(he?"התחברות":"Sign in")}</button>
 </form>
 <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginTop:"1rem"}}>
 {mode!=="signin"&&<button type="button" onClick={()=>{setMode("signin");setNotice("");}}>{he?"כבר יש חשבון? התחברות":"Already a member? Sign in"}</button>}
 {mode!=="signup"&&<button type="button" onClick={()=>{setMode("signup");setNotice("");}}>{he?"יצירת חשבון":"Create account"}</button>}
 {mode!=="reset"&&<button type="button" onClick={()=>{setMode("reset");setNotice("");}}>{he?"שכחת סיסמה?":"Forgot password?"}</button>}
 </div></section>}
 {notice&&<p role="status" aria-live="polite">{notice}</p>}
 <p style={{marginTop:"2rem"}}><Link href="/prayer">{he?"מידע על תפילה ופרטיות":"Prayer and privacy information"}</Link></p>
 </main><SiteFooter/></>;
}
