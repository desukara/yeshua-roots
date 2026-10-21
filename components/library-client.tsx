"use client";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import BeitMidrash from "./beit-midrash";
import StudyLibrary from "./study-library";
import {publishedStudies} from "../lib/content";
import {useLanguage} from "./language-provider";
export default function LibraryClient(){const {locale}=useLanguage();const he=locale==="he";return <><SiteHeader/><main id="main-content" tabIndex={-1}><section className="section-hero bm-hero"><span className="kicker">{he?"בית מדרש · ספרייה יהודית משיחית":"BEIT MIDRASH · MESSIANIC JEWISH LIBRARY"}</span><h1>{he?"בית המדרש של ישוע רוטס":"Yeshua Roots Study Hall"}</h1><p>{he?"לומדים את הכתובים ואת מקורות ישראל, פותחים ספרים וקוראים יחד.":"A living place of Scripture, Jewish learning, and thoughtful study—open the books and explore."}</p></section><BeitMidrash/><section className="bm-original-studies"><StudyLibrary studies={publishedStudies}/></section></main><SiteFooter/></>}
