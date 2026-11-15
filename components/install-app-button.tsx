"use client";
import {useEffect,useState} from "react";
type PromptEvent=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
type Device="ios"|"android"|"desktop";
export default function InstallAppButton(){
 const [prompt,setPrompt]=useState<PromptEvent|null>(null);
 const [installed,setInstalled]=useState(false);
 const [device,setDevice]=useState<Device|null>(null);
 const [isSafari,setIsSafari]=useState(false);
 const [showSteps,setShowSteps]=useState(false);
 useEffect(()=>{
  const ua=navigator.userAgent;
  const ios=/iPhone|iPad|iPod/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1);
  const android=/Android/.test(ua);
  setDevice(ios?"ios":android?"android":"desktop");
  setIsSafari(ios&&/Safari/.test(ua)&&!/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua));
  const m=window.matchMedia("(display-mode: standalone)");
  const check=()=>setInstalled(m.matches||("standalone" in navigator&&(navigator as Navigator&{standalone?:boolean}).standalone===true));
  check();m.addEventListener?.("change",check);
  const onPrompt=(e:Event)=>{e.preventDefault();setPrompt(e as PromptEvent)};
  const onInstalled=()=>{setInstalled(true);setPrompt(null)};
  window.addEventListener("beforeinstallprompt",onPrompt);
  window.addEventListener("appinstalled",onInstalled);
  return()=>{m.removeEventListener?.("change",check);window.removeEventListener("beforeinstallprompt",onPrompt);window.removeEventListener("appinstalled",onInstalled)};
 },[]);
 if(installed)return <p className="install-status" role="status">Yeshua Roots is already installed on this device. Welcome home!</p>;
 if(device==="ios")return <section className="install-device-help" aria-label="Install on iPhone or iPad"><h2>Install on your iPhone or iPad</h2><p>Apple installs web apps through the browser. No separate file download is needed.</p>{!isSafari&&<p><strong>First:</strong> open this page directly in Safari. If you are inside another app, copy the address and paste it into Safari.</p>}<ol><li>In Safari, open <strong>yeshuaroots.com/get-app</strong>.</li><li>Tap <strong>Share</strong> (square with an upward arrow). If Share is hidden, open Safari’s page menu first.</li><li>Scroll and select <strong>Add to Home Screen</strong>. If you don't see it, scroll to <strong>Edit Actions</strong> and add it when available.</li><li>Turn on <strong>Open as Web App</strong> if shown, then tap <strong>Add</strong>.</li></ol><p className="install-device-note">Look for the Yeshua Roots gold Star of David icon on your Home Screen. Open it to launch the app.</p></section>;
 if(prompt)return <button type="button" className="install-app-action" onClick={async()=>{try{await prompt.prompt();const choice=await prompt.userChoice;if(choice.outcome==="accepted")setPrompt(null)}catch{setPrompt(null);setShowSteps(true)}}}>Install Yeshua Roots</button>;
 return <section className="install-device-help" aria-label="Install Yeshua Roots"><h2>{device==="android"?"Install on Android":"Install on your computer"}</h2><p>{device==="android"?"Open this page in Chrome, then use the browser menu to select Install app or Add to Home screen.":"Open this page in Chrome or Edge, then choose Install from the browser menu or the install icon in the address bar."}</p><button className="install-help-toggle" type="button" onClick={()=>setShowSteps(v=>!v)} aria-expanded={showSteps}>{showSteps?"Hide installation help":"Need help installing?"}</button>{showSteps&&<p className="install-device-note">If the install option is missing, check that you're using a supported browser and haven't already installed Yeshua Roots. Some browsers and managed devices don't offer web-app installation.</p>}</section>;
}