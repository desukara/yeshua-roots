"use client";
import Link from "next/link";
import {Menu,X} from "lucide-react";
import {useState} from "react";
import {usePathname} from "next/navigation";
import {useLanguage} from "./language-provider";
import LanguageSwitcher from "./language-switcher";
import {t} from "../lib/translations";
export default function SiteHeader(){
 const {locale}=useLanguage();const c=t(locale);const [open,setOpen]=useState(false);const pathname=usePathname();
 const he = locale === "he";
 const links = [
  { href: "/start-here", label: he ? "התחילו כאן" : "Start Here" },
  { href: "/torah", label: he ? "לימוד כתבי הקודש" : "Study Scripture" },
  { href: "/about", label: he ? "אודות" : "About" },
 ];
 const navigation = links.map(({ href, label }) => (
  <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>
   {label}
  </Link>
 ));
 return <><a className="skip-to-content" href="#main-content">{locale==="he"?"דילוג לתוכן":"Skip to content"}</a><header className="site-header">
  <Link className="brand" href="/" aria-label={locale==="he"?"ישוע רוטס — עמוד הבית":"Yeshua Roots home"} onClick={()=>setOpen(false)}><img className="brand-emblem" src="/brand/star-of-david.svg" alt="" width={36} height={36}/><span>YESHUA <b>ROOTS</b><small>{c.brand}</small></span></Link>
  <nav className="site-nav" aria-label={locale==="he"?"ניווט ראשי":"Main navigation"}>{navigation}</nav>
  <div className="header-actions"><LanguageSwitcher/><Link className="site-connect" href="/start-here">{locale==="he"?"התחילו כאן":"Start Here"}</Link><button className="mobile-menu-toggle" type="button" aria-label={open?(locale==="he"?"סגירת תפריט":"Close menu"):(locale==="he"?"פתיחת תפריט":"Open menu")} aria-expanded={open} aria-controls="mobile-site-nav" onClick={()=>setOpen(v=>!v)}>{open?<X size={24}/>:<Menu size={24}/>}</button></div>
  <nav id="mobile-site-nav" className={"mobile-site-nav"+(open?" is-open":"")} aria-label={locale==="he"?"ניווט לנייד":"Mobile navigation"} hidden={!open}>{navigation}</nav>
 </header></>
}