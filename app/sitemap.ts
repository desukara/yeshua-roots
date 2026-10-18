import type {MetadataRoute} from "next";
import {studies} from "../lib/content";

const base = "https://yeshuaroots.com";
const routes = ["", "/torah", "/teachings", "/news", "/community", "/about", "/contact", "/library", "/interlinear", "/outreach", "/support"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...studies.map(study => `/study/${study.slug}`)].map(path => ({
    url: base + path,
    changeFrequency: path.startsWith("/study/") ? "monthly" as const : "weekly" as const,
    priority: path === "" ? 1 : 0.6,
  }));
}
