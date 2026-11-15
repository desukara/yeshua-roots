"use client";
import {useEffect,useState} from "react";
import {Download,Share2,CheckCircle2} from "lucide-react";
type InstallPrompt=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:"accepted"|"dismissed"}>};
export default function InstallApp(){
 const [prompt,setPrompt]=useState<InstallPrompt|null>(null);
 const [installed,setInstalled]=useState(false);
 const [platform,setPlatform]=useState<"ios"|"android"|"other">("other");
 const [status,setStatus]=useState("");
 useEffect(()=>{
  const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  setPlatform(ios?"ios":/Android/i.test(navigator.userAgent)?"android":"other");
  setInstalled(window.matchMedia("(display-mode: standalone)").matches||("standalone" in navigator && Boolean((navigator as Navigator & {standalone?:boolean}).standalone)));
  const onPrompt=(event:Event)=>{event.preventDefault();setPrompt(event as InstallPrompt);};
  const onInstalled=()=>{setInstalled(true);setPrompt(null);setStatus("Yeshua Roots was added to your device.");};
  window.addEventListener("beforeinstallprompt",onPrompt);
  window.addEventListener("appinstalled",onInstalled);
  return ()=>{window.removeEventListener("beforeinstallprompt",onPrompt);window.removeEventListener("appinstalled",onInstalled);};
 },[]);
 const install=async()=>{
  if(!prompt)return;
  try{await prompt.prompt();const result=await prompt.userChoice;if(result.outcome==="accepted")setStatus("Installation accepted. Look for Yeshua Roots on your device.");else setStatus("No problem. You can install it whenever you're ready.");setPrompt(null);}
  catch{setStatus("Your browser couldn't open the installer. Use its menu to install the app.");}
 };
 return <section className="install-panel" aria-labelledby="install-title">
  {installed?<><CheckCircle2 size={32} aria-hidden="true"/><h2 id="install-title">You're already using the app</h2><p>Yeshua Roots is open in its installed app experience.</p></>:
  <><h2 id="install-title">Take Yeshua Roots with you</h2><p>Add Yeshua Roots to your home screen for a focused, app-like way to study and explore the Scriptures. No app-store purchase or account required.</p>
  {prompt?<button className="install-primary" type="button" onClick={install}><Download size={19}/> Install Yeshua Roots</button>:platform==="ios"?<div className="install-steps"><h3>On iPhone or iPad</h3><p>Open this page in <strong>Safari</strong>, tap <strong>Share</strong> <Share2 size={16} aria-label="Share icon" style={{display:"inline",verticalAlign:"middle"}}/>, then choose <strong>Add to Home Screen</strong> and tap <strong>Add</strong>.</p></div>:<div className="install-steps"><h3>{platform==="android"?"On Android":"On desktop or Android"}</h3><p>Open this page in Chrome or another compatible browser, then look for <strong>Install app</strong> or <strong>Add to Home Screen</strong> in the browser menu or address bar. If the option is missing, check that you're using a supported browser.</p></div>}
  <p className="install-note">Internet is needed for most pages and live content. An offline information screen is available if your connection drops.</p></>}
  {status&&<p role="status">{status}</p>}
 </section>;
}
