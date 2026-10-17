"use client";
import {useEffect,useMemo,useState} from "react";
import {BookOpen,Search,LibraryBig,Languages,ChevronRight} from "lucide-react";
import {useLanguage} from "./language-provider";
type Work={title:string;he:string;ref:string;group:string;description:string};
const works:Work[]=[
{title:"Genesis",he:"בראשית",ref:"Genesis 1",group:"Five Books of Moses",description:"Beginnings, creation and covenant"},
{title:"Exodus",he:"שמות",ref:"Exodus 1",group:"Five Books of Moses",description:"Redemption and the journey from Egypt"},
{title:"Leviticus",he:"ויקרא",ref:"Leviticus 1",group:"Five Books of Moses",description:"Holiness and priestly service"},
{title:"Numbers",he:"במדבר",ref:"Numbers 1",group:"Five Books of Moses",description:"Wilderness and community"},
{title:"Deuteronomy",he:"דברים",ref:"Deuteronomy 1",group:"Five Books of Moses",description:"Covenant teaching"},
{title:"Isaiah",he:"ישעיהו",ref:"Isaiah 53",group:"Prophets",description:"Prophecy and hope"},
{title:"Jeremiah",he:"ירמיהו",ref:"Jeremiah 31",group:"Prophets",description:"Covenant and restoration"},
{title:"Ezekiel",he:"יחזקאל",ref:"Ezekiel 36",group:"Prophets",description:"Renewal and the Spirit"},
{title:"Psalms",he:"תהילים",ref:"Psalms 23",group:"Writings",description:"Prayer and worship"},
{title:"Proverbs",he:"משלי",ref:"Proverbs 3",group:"Writings",description:"Wisdom for life"},
{title:"Ruth",he:"רות",ref:"Ruth 1",group:"Writings",description:"Faithfulness and redemption"},
{title:"Pirkei Avot",he:"פרקי אבות",ref:"Pirkei Avot 1",group:"Mishnah",description:"Ethics of the fathers"},
{title:"Berakhot",he:"ברכות",ref:"Mishnah Berakhot 1",group:"Mishnah",description:"Blessings and daily devotion"},
{title:"Berakhot (Talmud)",he:"תלמוד ברכות",ref:"Berakhot 2a",group:"Talmud",description:"Prayer and rabbinic discussion"},
{title:"Shabbat (Talmud)",he:"תלמוד שבת",ref:"Shabbat 21b",group:"Talmud",description:"Shabbat discussions"},
{title:"Genesis Rabbah",he:"בראשית רבה",ref:"Bereishit Rabbah 1",group:"Midrash",description:"Classical interpretation of Genesis"},
{title:"Rashi on Genesis",he:"רש״י על בראשית",ref:"Rashi on Genesis 1:1",group:"Commentaries",description:"Classical verse commentary"},
{title:"Mishneh Torah",he:"משנה תורה",ref:"Mishneh Torah, Foundations of the Torah 1",group:"Jewish Philosophy",description:"Maimonides on foundations of faith"},
{title:"Kuzari",he:"הכוזרי",ref:"Kuzari 1",group:"Jewish Philosophy",description:"Faith and Jewish thought"}
];
const groups=["All","Five Books of Moses","Prophets","Writings","Mishnah","Talmud","Midrash","Commentaries","Jewish Philosophy"];
const hebrewGroups:Record<string,string>={"Five Books of Moses":"חמשת חומשי תורה",Prophets:"נביאים",Writings:"כתובים",Mishnah:"משנה",Talmud:"תלמוד",Midrash:"מדרש",Commentaries:"פרשנות","Jewish Philosophy":"מחשבת ישראל"};
type Version={language?:string;versionTitle?:string;text?:unknown;license?:string};
type TextResult={ref?:string;heRef?:string;versions?:Version[];error?:string};
function flatten(v:unknown):string[]{if(typeof v==="string")return v.trim()?[v]:[];if(Array.isArray(v))return v.flatMap(flatten);return []}
export default function BeitMidrash(){
 const {locale}=useLanguage(),he=locale==="he";
 const [retryCount,setRetryCount]=useState(0);
 const [group,setGroup]=useState("All"),[query,setQuery]=useState(""),[chosen,setChosen]=useState(works[0]),[reference,setReference]=useState(works[0].ref),[activeRef,setActiveRef]=useState(works[0].ref),[data,setData]=useState<TextResult|null>(null),[loading,setLoading]=useState(false),[error,setError]=useState("");
 const filtered=useMemo(()=>works.filter(w=>(group==="All"||w.group===group)&&[w.title,w.he,w.description,w.group,hebrewGroups[w.group]||""].join(" ").toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())),[group,query]);
 useEffect(()=>{const controller=new AbortController();setLoading(true);setError("");fetch("/api/library/text?ref="+encodeURIComponent(activeRef),{signal:controller.signal}).then(async r=>{const j=await r.json() as TextResult;if(!r.ok)throw new Error(j.error||"Unavailable");return j}).then(j=>{setData(j);setLoading(false)}).catch(e=>{if(e.name!=="AbortError"){setError("load-failed");setData(null);setLoading(false)}});return ()=>controller.abort()},[activeRef,retryCount]);
 const versions=data?.versions||[];const source=versions.find(v=>/hebrew/i.test(v.language||""))||versions.find(v=>!/english/i.test(v.language||""))||versions[0];const translation=versions.find(v=>/english/i.test(v.language||"")&&v!==source);
 const sourceLines=flatten(source?.text).slice(0,120),translationLines=flatten(translation?.text).slice(0,120);
 const sourceLanguage=/hebrew/i.test(source?.language||"")?"he":/aramaic/i.test(source?.language||"")?"arc":/english/i.test(source?.language||"")?"en":undefined;
 return <section className="beit-midrash">
 <div className="bm-heading"><span className="kicker">{he?"בית המדרש · ספרייה חיה":"BEIT MIDRASH · LIVING LIBRARY"}</span><h2>{he?"היכל לימוד הכתובים":"The Study Hall"}</h2><p>{he?"פתחו ספר, בחרו פרק ולמדו ממקורות יהודיים קלאסיים לצד לימוד משיחי. אנו לומדים את התורה בהקשרה לצד הנביאים, הכתובים וכתבי השליחים.":"Open a book, choose a passage, and study primary Jewish texts alongside Messianic Scripture study. We study the Torah in its Jewish context alongside the Prophets, Writings, and Apostolic Scriptures."}</p></div>
 <div className="bm-layout"><aside className="bm-shelves" aria-label={he?"מדפי הספרייה":"Library shelves"}><div className="bm-shelves-title"><LibraryBig size={19}/><strong>{he?"מדפי הספרים":"Explore the shelves"}</strong></div><label className="bm-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={he?"חיפוש ספר או נושא":"Find a book or topic"} aria-label={he?"חיפוש ספר או נושא":"Search books or topics"} type="search"/></label><div className="bm-groups">{groups.map(g=><button key={g} type="button" aria-pressed={group===g} className={group===g?"selected":""} onClick={()=>setGroup(g)}>{g==="All"?(he?"הכול":"All collections"):he?(hebrewGroups[g]||g):g}</button>)}</div><div className="bm-books">{filtered.map(w=><button type="button" className={chosen.title===w.title?"selected":""} key={w.title} onClick={()=>{setChosen(w);setReference(w.ref);setActiveRef(w.ref)}}><BookOpen size={16}/><span><strong>{he?w.he:w.title}</strong><small>{he?(hebrewGroups[w.group]||w.group):w.group}</small></span><ChevronRight size={15}/></button>)}{!filtered.length&&<p>{he?"לא נמצאו ספרים.":"No matching books."}</p>}</div></aside>
 <div className="bm-reader"><div className="bm-reader-head"><span className="kicker">{he?(hebrewGroups[chosen.group]||chosen.group):chosen.group}</span><h3>{he?chosen.he:chosen.title}</h3><p>{he?chosen.he+" · "+(hebrewGroups[chosen.group]||chosen.group):chosen.description}</p><form onSubmit={e=>{e.preventDefault();setActiveRef(reference.trim())}} className="bm-ref-form"><label htmlFor="bm-reference">{he?"מראה מקום":"Passage reference"}</label><div><input id="bm-reference" value={reference} onChange={e=>setReference(e.target.value)} placeholder="Genesis 1" required/><button type="submit">{he?"פתחו":"Open passage"}</button></div></form></div>
 <div className="bm-reading-area" aria-live="polite" aria-busy={loading}>{loading?<p>{he?"טוען טקסט מהספרייה...":"Loading the source text..."}</p>:error?<div role="alert"><p>{he?"לא ניתן לטעון את הטקסט כעת. נסו שוב או בחרו מקור אחר.":"The text could not be loaded. Try again or choose another passage."}</p><button type="button" onClick={()=>setRetryCount(n=>n+1)}>{he?"נסו שוב":"Retry loading"}</button></div>:data?<><div className="bm-passage-title"><Languages size={19}/><strong>{he?(data.heRef||data.ref):(data.ref||activeRef)}</strong></div><div className="bm-text-columns"><div className="bm-text-column"><h4>{he?"טקסט המקור":"Source text"}{source?.language?" · "+source.language:""}</h4><div dir={sourceLanguage==="he"||sourceLanguage==="arc"?"rtl":"ltr"} lang={sourceLanguage} className="bm-original">{sourceLines.length?sourceLines.map((line,i)=><p key={i}>{line}</p>):<p>{he?"אין טקסט זמין.":"No source text available."}</p>}</div></div><div className="bm-text-column"><h4>{he?"תרגום לאנגלית":"English translation"}</h4><div lang="en" dir="ltr">{translationLines.length?translationLines.map((line,i)=><p key={i}><sup>{i+1}</sup> {line}</p>):<p>{he?"אין תרגום זמין למקור זה.":"No English translation available for this selection."}</p>}</div></div></div><p className="bm-edition">{[source?.versionTitle,translation?.versionTitle].filter(Boolean).join(" · ")}</p><p className="bm-edition">{he?"הקטעים מוצגים לפי סדר המקור; מספור הפסוקים אינו מוצג כי המבנה משתנה בין ספרים ומהדורות.":"Passages follow the source order; verse numbers are omitted because numbering varies by work and edition."}</p><p className="bm-edition">{he?"הטקסטים נטענים ממקור חיצוני (ספריא); הזמינות והתרגומים תלויים במקור.":"Texts are retrieved from Sefaria; availability and translations depend on the external source."}</p></>:null}</div>
 <div className="bm-related"><h4>{he?"המשך הלימוד":"Continue studying"}</h4><a href="/interlinear">{he?"לימוד עברית מילה במילה":"Hebrew word-by-word reader"} →</a><a href="/torah">{he?"לימוד תורה משיחי":"Messianic Torah study"} →</a></div>
 </div></div></section>
}
