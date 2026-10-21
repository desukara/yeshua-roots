import type {MetadataRoute} from "next";
import {publishedStudies} from "../lib/content";

const base = "https://yeshuaroots.com";
const routes = ["", "/start-here", "/torah", "/teachings", "/about", "/library", "/interlinear", "/members", "/history/jewish-roots"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...publishedStudies.map(study => `/study/${study.slug}`)].map(path => ({
    url: base + path,
    changeFrequency: path.startsWith("/study/") ? "monthly" as const : "weekly" as const,
    priority: path === "" ? 1 : 0.6,
  }));
}
