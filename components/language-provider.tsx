"use client";
import {createContext,useContext,useEffect,useState,type ReactNode} from "react";
import {defaultLocale,isLocale,type Locale} from "../lib/locales";
type LanguageContextValue={locale:Locale;setLocale:(locale:Locale)=>void};
const LanguageContext=createContext<LanguageContextValue|undefined>(undefined);
export function LanguageProvider({children}:{children:ReactNode}){const [locale,setLocale]=useState<Locale>(defaultLocale);useEffect(()=>{try{const saved=localStorage.getItem("yeshua-roots-language");if(saved&&isLocale(saved)){setLocale(saved);return}}catch{}},[]);useEffect(()=>{document.documentElement.lang=locale;document.documentElement.dir=locale==="he"?"rtl":"ltr";try{localStorage.setItem("yeshua-roots-language",locale)}catch{}},[locale]);return <LanguageContext.Provider value={{locale,setLocale}}>{children}</LanguageContext.Provider>}
export function useLanguage(){const context=useContext(LanguageContext);if(!context)throw new Error("LanguageProvider missing");return context}
