"use client";
import {useEffect,useState} from "react";
type PromptEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
export default function InstallAppButton(){
 const [prompt,setPrompt]=useState<PromptEvent|null>(null);
 const [installed,setInstalled]=useState(false);
 const [message,setMessage]=useState("");
 useEffect(()=>{
  const m=window.matchMedia("(display-mode: standalone)");
  const check=()=>setInstalled(m.matches||("standalone" in navigator&&(navigator as Navigator&{standalone?:boolean}).standalone===true));
  check();m.addEventListener?.("change",check);
  const onPrompt=(e:Event)=>{e.preventDefault();setPrompt(e as PromptEvent);setMessage("")};
  const onInstalled=()=>{setInstalled(true);setPrompt(null);setMessage("")};
  window.addEventListener("beforeinstallprompt",onPrompt);
  window.addEventListener("appinstalled",onInstalled);
  return()=>{m.removeEventListener?.("change",check);window.removeEventListener("beforeinstallprompt",onPrompt);window.removeEventListener("appinstalled",onInstalled)};
 },[]);
 if(installed)return <p className="install-status" role="status">Yeshua Roots is installed on this device. Welcome home!</p>;
 const install=async()=>{
  if(prompt){
   try{await prompt.prompt();const choice=await prompt.userChoice;if(choice.outcome==="accepted")setPrompt(null);else setMessage("Installation was cancelled. You can try again.")}catch{setMessage("Your browser could not open the install prompt.")}
   return;
  }
  const ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1);
  setMessage(ios?"On iPhone, Apple requires Safari’s Share menu → Add to Home Screen to install. Websites cannot start that installation automatically.":"Your browser is not offering a direct installation right now. Try the browser’s Install app option.");
 };
 return <><button type="button" className="install-app-action" onClick={install}>Install Yeshua Roots</button>{message&&<p className="install-status" role="status">{message}</p>}</>;
}