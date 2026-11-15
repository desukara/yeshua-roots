"use client";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import {useLanguage} from "./language-provider";

export default function AttributionsPageContent(){
 const {locale}=useLanguage();const he=locale==="he";
 const items=he?[
  {title:"טקסט התורה בעברית",body:"טקסט פרקי הכתובים בעברית בקורא התורה מתקבל מ־Sefaria. לגרסאות טקסט עבריות שונות עשויים להיות תנאי רישוי וייחוס משלהן. אנו מציינים את פרטי הגרסה שמספק המקור ונעדכן כאן את הקרדיטים ככל שהקורא יתפתח."},
  {title:"חומרי לימוד משיחיים",body:"הקדמות לפרקי לימוד, הערות לימוד ופירושים ללימוד מילים נכתבים עבור Yeshua Roots."},
  {title:"הפניות לכתובים",body:"הפניות לקטעים בתנ״ך ובכתבי השליחים ניתנות ללימוד ולהשוואה. ציטוטי הפסוקים מזוהים לפי התרגום והמקור המצוין לידם."}
 ]:[
  {title:"Hebrew Torah text",body:"Hebrew Scripture chapter text in the Torah Reader is retrieved from Sefaria. Individual Hebrew text versions may carry their own licensing and attribution requirements. We acknowledge the version information supplied with the source and will maintain version-specific credits here as the reader develops."},
  {title:"Messianic study material",body:"Messianic chapter introductions, study notes, and word-study commentary are prepared for Yeshua Roots."},
  {title:"Scripture references",body:"References to passages throughout the Tanakh and Apostolic Scriptures are provided for study and comparison. Quoted Scripture is identified by the translation or source named alongside it."}
 ];
 return <><SiteHeader/><main id="main-content" tabIndex={-1} className="ministry-page ministry-page--attributions" dir={he?"rtl":"ltr"}>
  <header className="ministry-hero"><div className="ministry-hero__copy"><span className="ministry-eyebrow">{he?"מקורות, טקסט וייחוס":"TEXT · SOURCES · ACKNOWLEDGMENTS"}</span><h1>{he?"מקורות וקרדיטים":"Sources & Attributions"}</h1><p>{he?"אנו מודים למקורות הכתובים ולמשאבים התומכים בלימוד באתר.":"We gratefully acknowledge the Scripture resources that support our learning and Torah reading experience."}</p></div><div className="ministry-seal" aria-hidden="true"><div><span>{he?"תודה והכרה":"WITH GRATITUDE"}</span><strong>כתובים</strong><small>TEXT · SOURCES</small></div></div></header>
  <div className="ministry-main"><p className="ministry-intro">{he?"שקיפות לגבי מקורות וטקסטים היא חלק מאחריותנו כבית לימוד.":"Clear credit for the texts and sources we use is part of our responsibility as a house of learning."}</p><div className="attribution-list">{items.map((item,i)=><section className="attribution-item" key={item.title}><span className="ministry-card__number">0{i+1} / {he?"מקורות":"SOURCE NOTES"}</span><h2>{item.title}</h2><p>{item.body}</p></section>)}</div></div>
 </main><SiteFooter/></>;
}
