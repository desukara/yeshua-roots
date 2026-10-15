import type {MetadataRoute} from "next";import {studies} from "../lib/content";
const base="https://yeshuaroots.com";
export default function sitemap():MetadataRoute.Sitemap{return ["","/torah","/teachings","/news","/community","/about","/contact","/library",...studies.map(s=>"/study/"+s.slug)].map(path=>({url:base+path,changeFrequency:path.startsWith("/study/")?"monthly":"weekly",priority:path===""?1:0.6}))}
