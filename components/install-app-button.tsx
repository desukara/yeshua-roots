"use client";
import {useEffect,useState} from "react";
type PromptEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
export default function InstallAppButton(){
 const [prompt,setPrompt]=useState<PromptEvent|null>(null);
 const [installed,setInstalled]=useState(false);
 const [ios,setIos]=useState(false);
 useEffect(()=>{
  const ua=navigator.userAgent;
  setIos(/iPhone|iPad|iPod/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1));
  const m=window.matchMedia("(display-mode: standalone)");
  const check=()=>setInstalled(m.matches||("standalone" in navigator&&(navigator as Navigator&{standalone?:boolean}).standalone===true));
  check();m.addEventListener?.("change",check);
  const onPrompt=(e:Event)=>{e.preventDefault();setPrompt(e as PromptEvent)};
  const onInstalled=()=>{setInstalled(true);setPrompt(null)};
  window.addEventListener("beforeinstallprompt",onPrompt);
  window.addEventListener("appinstalled",onInstalled);
  return()=>{m.removeEventListener?.("change",check);window.removeEventListener("beforeinstallprompt",onPrompt);window.removeEventListener("appinstalled",onInstalled)};
 },[]);
 if(installed)return <p className="install-status" role="status">Yeshua Roots is installed. Welcome home!</p>;
 if(prompt)return <button type="button" className="install-app-action" onClick={async()=>{try{await prompt.prompt();await prompt.userChoice;setPrompt(null)}catch{setPrompt(null)}}}>Install Yeshua Roots</button>;
 if(ios)return <p className="install-status">On iPhone and iPad, Apple requires installation through Safari’s Add to Home Screen feature. A direct app download is not available yet.</p>;
 return <p className="install-status">To install Yeshua Roots, use your browser’s Install app option when available.</p>;
}