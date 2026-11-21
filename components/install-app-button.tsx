"use client";
import {useEffect,useState} from "react";
import {useLanguage} from "./language-provider";
type PromptEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
export default function InstallAppButton(){
 const {locale}=useLanguage();
 const he=locale==="he";
 const [prompt,setPrompt]=useState<PromptEvent|null>(null);
 const [installed,setInstalled]=useState(false);
 const [message,setMessage]=useState<"cancelled"|"failed"|"ios"|"browser"|null>(null);
 useEffect(()=>{
  const m=window.matchMedia("(display-mode: standalone)");
  const check=()=>setInstalled(m.matches||("standalone" in navigator&&(navigator as Navigator&{standalone?:boolean}).standalone===true));
  check();m.addEventListener?.("change",check);
  const onPrompt=(e:Event)=>{e.preventDefault();setPrompt(e as PromptEvent);setMessage(null)};
  const onInstalled=()=>{setInstalled(true);setPrompt(null);setMessage(null)};
  window.addEventListener("beforeinstallprompt",onPrompt);
  window.addEventListener("appinstalled",onInstalled);
  return()=>{m.removeEventListener?.("change",check);window.removeEventListener("beforeinstallprompt",onPrompt);window.removeEventListener("appinstalled",onInstalled)};
 },[]);
 const messages={
  cancelled:he?"ההתקנה בוטלה. אפשר לנסות שוב.":"Installation was cancelled. You can try again.",
  failed:he?"הדפדפן לא הצליח לפתוח את חלון ההתקנה.":"Your browser could not open the install prompt.",
  ios:he?"ב-iPhone יש לפתוח את תפריט השיתוף של Safari ולבחור ״הוספה למסך הבית״. אתרים אינם יכולים להתחיל התקנה זו באופן אוטומטי.":"On iPhone, Apple requires Safari’s Share menu → Add to Home Screen to install. Websites cannot start that installation automatically.",
  browser:he?"הדפדפן אינו מציע כרגע התקנה ישירה. נסו את אפשרות התקנת האפליקציה בתפריט הדפדפן.":"Your browser is not offering a direct installation right now. Try the browser’s Install app option."
 };
 if(installed)return <p className="install-status" role="status">{he?"שורשי ישוע מותקן במכשיר הזה. ברוכים הבאים!":"Yeshua Roots is installed on this device. Welcome home!"}</p>;
 const install=async()=>{
  if(prompt){
   try{await prompt.prompt();const choice=await prompt.userChoice;if(choice.outcome==="accepted")setPrompt(null);else setMessage("cancelled")}catch{setMessage("failed")}
   return;
  }
  const ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1);
  setMessage(ios?"ios":"browser");
 };
 return <><button type="button" className="install-app-action" onClick={install}>{he?"התקנת שורשי ישוע":"Install Yeshua Roots"}</button>{message&&<p className="install-status" role="status">{messages[message]}</p>}</>;
}
