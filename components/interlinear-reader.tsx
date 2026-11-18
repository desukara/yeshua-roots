"use client";
import {useEffect,useState} from "react";
import {interlinearVerses} from "../lib/interlinear";
import {genesisStudy} from "../lib/genesis-messianic-study";
import {useLanguage} from "./language-provider";
const books=[{id:"Genesis",he:"בראשית",chapters:50},{id:"Exodus",he:"שמות",chapters:40},{id:"Leviticus",he:"ויקרא",chapters:27},{id:"Numbers",he:"במדבר",chapters:36},{id:"Deuteronomy",he:"דברים",chapters:34}];
type CorpusWord={index:number;hebrew:string;lemma:string;morph:string;strong:string|null;transliteration:string|null;gloss:string|null;pronunciation:string|null};
type ChapterResponse={verses:string[];words:CorpusWord[][];sourceUrl:string;version:string|null;error?:string};
function shortGloss(gloss:string|null,strong:string|null){const simple:Record<string,string>={"H559":"say, speak","H3318":"go out, come forth","H1696":"speak, talk","H3068":"the LORD (God’s name)","H430":"God","H4872":"Moses","H3478":"Israel","H1121":"son, child","H1":"father","H776":"land, earth","H853":"marks the next word as the object"};if(strong&&simple[strong])return simple[strong];if(!gloss)return "Meaning not available";const first=gloss.replace(/\[[^\]]*\]/g,"").replace(/\([^)]*\)/g,"").split(/[;,]/).map(x=>x.trim()).filter(Boolean).slice(0,2).join(", ");return first?first.length>65?first.slice(0,62)+"…":first:"Meaning not available";}
// Short, hand-written explanations. Only verses reviewed here get this feature.
type PlainVerseStudy={scene:string;breakdown:string;takeaway:string};
const plainGenesisOne:Record<number,PlainVerseStudy>={
 1:{scene:"The Bible opens by telling us that God created the heavens and the earth.",breakdown:"Before we hear about people, nations, or anything else, Genesis tells us where everything began. God is the Creator. That's the starting point for the story.",takeaway:"The story starts with God, not with us."},
 2:{scene:"The earth hasn't been shaped and filled yet. Darkness covers the deep, and God's Spirit is moving over the waters.",breakdown:"Picture a world that isn't ready for life as we know it. The land and seas haven't been put in order yet. But God is already there, and the story is about to show what He does next.",takeaway:"God is present even before the world takes the shape we recognize."},
 3:{scene:"God speaks, and light appears.",breakdown:"God says, ‘Let there be light,’ and there is light. Genesis doesn't describe a struggle here. It shows God's command bringing about what He says.",takeaway:"In this passage, God's word has the power to bring light into creation."},
 4:{scene:"God sees that the light is good, and He separates the light from the darkness.",breakdown:"The light has appeared, and now God gives it a place in the world He's making. He calls the light good and separates it from the darkness. The story is showing creation taking shape, one step at a time.",takeaway:"God is bringing order to His creation."},
 5:{scene:"God calls the light Day and the darkness Night. Evening and morning mark the first day.",breakdown:"Now God gives names to what He's separated. Light is called Day, and darkness is called Night. Then Genesis marks the passing of the first day. The story is moving forward in a clear rhythm.",takeaway:"Day and night are part of the order God establishes."},
 6:{scene:"God commands an expanse to separate the waters.",breakdown:"Next, God speaks about the waters. He calls for an expanse between them, making a division. Genesis is describing the world as its first readers understood it, while keeping the focus on God as the one giving creation its order.",takeaway:"The passage presents God as the one who sets boundaries in creation."},
 7:{scene:"God makes the expanse and separates the waters below it from the waters above it.",breakdown:"The command from the verse before is carried out. The waters are divided by the expanse, just as God said. This verse doesn't introduce a new person or a new problem. It keeps showing God's work of arranging the world.",takeaway:"What God commands in the story is brought about."},
 8:{scene:"God names the expanse Heaven, or sky, and the second day comes to a close.",breakdown:"Just as He named Day and Night, God now names the expanse. The second day ends with evening and morning. Notice how the story keeps the same pattern: God speaks, creation takes shape, and the day is marked.",takeaway:"The creation story is unfolding in an orderly pattern."},
 9:{scene:"God tells the waters under the sky to gather together so dry ground can appear.",breakdown:"Up to this point, we've heard about light and sky. Now the land comes into view. God commands the waters to gather in one place, making room for dry ground. The world is becoming a place where life can grow.",takeaway:"God makes room for dry land."},
 10:{scene:"God names the dry ground Earth and the gathered waters Seas, and He calls it good.",breakdown:"The land and seas have their places, and God gives them names. Then the verse tells us that God sees this part of creation as good. Genesis keeps showing us that what God is making has purpose and order.",takeaway:"The land and seas are part of God's good creation."},
 11:{scene:"God commands the land to grow plants, seed-bearing vegetation, and fruit trees.",breakdown:"Now that dry land has appeared, God tells it to produce growing things. The verse talks about plants making seed and trees bearing fruit with seed inside. That means the plants can keep producing after their own kinds.",takeaway:"God fills the land with plants that can keep growing and producing."},
 12:{scene:"The land brings forth plants and trees with seeds, and God sees that it is good.",breakdown:"What God commanded in the verse before now happens. Plants and trees appear, each producing seed according to its kind. And once again, Genesis tells us that God sees His work as good.",takeaway:"The land produces what God commanded."},
 13:{scene:"Evening and morning mark the end of the third day.",breakdown:"This is the closing line for the third day. By now, the story has moved from light and sky to land, seas, and plants. The same evening-and-morning pattern keeps the account moving forward.",takeaway:"The third day of creation is complete."},
 14:{scene:"God commands lights in the sky to separate day from night and mark times, days, and years.",breakdown:"Now the story turns to the lights in the sky. Genesis says they will distinguish day from night and help mark the passing of time. The verse also mentions appointed times, days, and years, showing how these lights serve a purpose in the ordered world.",takeaway:"The lights in the sky help mark time."},
 15:{scene:"God says the lights in the sky will shine on the earth, and it happens.",breakdown:"The verse finishes the command from the line before. These lights aren't just there to mark time; they also give light to the earth. Genesis keeps its focus on God assigning each part of creation its work.",takeaway:"The heavenly lights are given a purpose for the earth."},
 16:{scene:"God makes the greater light to govern the day, the lesser light to govern the night, and the stars.",breakdown:"Genesis now describes the lights that fill the sky. The greater light rules the day, and the lesser light rules the night. The stars are mentioned too. The focus stays on God as the maker of them all.",takeaway:"The lights of the sky are part of God's creation."},
 17:{scene:"God places the lights in the expanse of the sky to shine on the earth.",breakdown:"The lights have been made, and now the story tells us where they belong. They shine from the sky onto the earth. This is another part of Genesis showing how creation is being arranged.",takeaway:"God gives the heavenly lights their place."},
 18:{scene:"The lights govern day and night and separate light from darkness, and God sees that it is good.",breakdown:"These lights have a job: they mark the difference between day and night. The verse closes by saying God sees that this arrangement is good. The creation story keeps connecting order with goodness.",takeaway:"God calls this part of creation good."},
 19:{scene:"Evening and morning mark the fourth day.",breakdown:"The fourth day comes to a close. The account has now described the lights in the sky and the work they do. Evening and morning keep marking the passing days.",takeaway:"The fourth day is complete."},
 20:{scene:"God commands the waters to fill with living creatures and birds to fly above the earth.",breakdown:"The story turns from making spaces to filling them with life. The waters are to teem with creatures, and birds are to fly across the sky. The world is becoming full of movement.",takeaway:"God fills the waters and sky with life."},
 21:{scene:"God creates great sea creatures, other water creatures, and birds, and He sees that it is good.",breakdown:"The creatures God commanded now appear. Genesis includes the great creatures of the sea, the living things moving through the water, and the birds. God looks at what He has made and calls it good.",takeaway:"Living creatures are part of God's good creation."},
 22:{scene:"God blesses the creatures and tells them to multiply and fill the waters and the earth.",breakdown:"God doesn't only create these creatures; He blesses them with the ability to increase. The waters are to fill with life, and birds are to multiply on the earth. Life is meant to continue.",takeaway:"God blesses living creatures with fruitfulness."},
 23:{scene:"Evening and morning mark the fifth day.",breakdown:"The fifth day ends after the creation and blessing of creatures in the waters and birds in the sky. The same pattern of days continues as the account moves toward the land creatures and humanity.",takeaway:"The fifth day is complete."},
 24:{scene:"God commands the land to bring forth living creatures of different kinds.",breakdown:"Now the land is ready to be filled with animals. Genesis names livestock, creatures that move along the ground, and wild animals. Each appears according to its kind.",takeaway:"God calls living creatures to fill the land."},
 25:{scene:"God makes the land animals according to their kinds and sees that it is good.",breakdown:"The animals God commanded are made: wild animals, livestock, and creatures that move along the ground. Once again, the verse says God sees that His work is good.",takeaway:"God calls the animals He made good."},
 26:{scene:"God speaks of making humanity in His image and giving people responsibility over other living creatures.",breakdown:"This is a turning point in the account. People are not described in exactly the same way as the animals. Genesis says humanity is made in God's image and entrusted with responsibility over the living world. The verse is about both human dignity and human responsibility.",takeaway:"People are given dignity and responsibility as God's image-bearers."},
 27:{scene:"God creates humanity in His image, male and female.",breakdown:"The verse repeats that human beings are created in God's image. It specifically includes both male and female. That means the dignity described here belongs to humanity, not just to one group.",takeaway:"Male and female alike bear God's image."},
 28:{scene:"God blesses humanity and tells people to multiply, fill the earth, and exercise responsible rule.",breakdown:"God gives people a blessing and a calling. They are to have families, fill the earth, and care for the world placed under their authority. This responsibility follows the declaration that they bear God's image.",takeaway:"Humanity is blessed with a calling to live and act responsibly."},
 29:{scene:"God gives seed-bearing plants and fruit trees to humanity for food.",breakdown:"After giving people their place in creation, God speaks about what they will eat. He gives them plants that produce seed and trees that bear fruit. The verse shows God's provision for human life.",takeaway:"God provides food for humanity."},
 30:{scene:"God gives green plants as food for land animals and birds.",breakdown:"The provision of food extends beyond people. God also gives green plants to animals and birds. The account shows the Creator providing for the living creatures He has made.",takeaway:"God provides for the creatures of the earth."},
 31:{scene:"God looks at everything He has made and calls it very good. The sixth day ends.",breakdown:"This is the closing judgment over the work described in Genesis 1. Earlier, individual parts of creation were called good. Now God looks at everything together and calls it very good. The sixth day comes to an end.",takeaway:"The whole creation is declared very good."}
};
// Every Torah book uses the same lookup. Add reviewed notes by book, chapter, and verse.
const plainGenesisTwo:Record<number,PlainVerseStudy>={
 "1": {
  "scene": "The heavens and earth and everything in them are finished.",
  "breakdown": "Genesis begins this chapter by saying the work of creation is complete. The world has been formed and filled; the story now turns to what happens after that work.",
  "takeaway": "Creation is presented as complete."
 },
 "2": {
  "scene": "God finishes His work and rests on the seventh day.",
  "breakdown": "Rest here is not about God running out of strength. The passage marks a change from creating to ceasing that work. The seventh day is set apart from the six days before it.",
  "takeaway": "The seventh day marks the end of God's creating work."
 },
 "3": {
  "scene": "God blesses the seventh day and makes it holy.",
  "breakdown": "The seventh day receives a special blessing because God rested from His work of creation on it. This is the foundation for the importance of the seventh day later in the Torah.",
  "takeaway": "God sets apart the seventh day."
 },
 "4": {
  "scene": "The account turns to the generations of the heavens and earth.",
  "breakdown": "This verse introduces a closer look at the earth and human life. It names the LORD God and leads into the story of the garden and the first humans.",
  "takeaway": "The story shifts from the whole world to human beginnings."
 },
 "5": {
  "scene": "The passage describes a time before field plants had grown, when there was no rain and no person to work the ground.",
  "breakdown": "Genesis explains the setting before the garden story unfolds. The focus is on land that has not yet been cultivated and on the absence of a human worker.",
  "takeaway": "The ground is waiting to be worked."
 },
 "6": {
  "scene": "Water rises from the earth and waters the ground.",
  "breakdown": "Although the passage has just said rain had not fallen, it now describes water reaching the ground another way. The scene is being prepared for the forming of the man.",
  "takeaway": "The ground is watered before the man is formed."
 },
 "7": {
  "scene": "The LORD God forms the man from dust and breathes life into him.",
  "breakdown": "The man is formed from the ground, but he becomes living through God's breath. The verse connects human life both to the earth and to the God who gives life.",
  "takeaway": "Human life is a gift from God."
 },
 "8": {
  "scene": "God plants a garden in Eden and places the man there.",
  "breakdown": "The garden is a prepared home for the man God has formed. The man does not make this place for himself; God provides it.",
  "takeaway": "God gives the man a place to live."
 },
 "9": {
  "scene": "God causes beautiful, food-bearing trees to grow, including two specially named trees.",
  "breakdown": "The garden has trees that are pleasing to look at and good for food. The tree of life and the tree of the knowledge of good and evil are singled out because they matter later in the story.",
  "takeaway": "Two trees will become important to the story."
 },
 "10": {
  "scene": "A river flows from Eden to water the garden and then divides.",
  "breakdown": "Genesis describes water flowing through the garden and outward. The next verses give geographical names connected with that river.",
  "takeaway": "The garden is pictured as a well-watered place."
 },
 "11": {
  "scene": "The first river is named Pishon and is linked to Havilah.",
  "breakdown": "The story begins naming the four river branches. Pishon is connected with a land called Havilah, described as having gold.",
  "takeaway": "Genesis places the garden story in a named landscape."
 },
 "12": {
  "scene": "The land of Havilah is described as having good gold, bdellium, and onyx.",
  "breakdown": "These details describe resources associated with Havilah. The verse does not explain their spiritual meaning; it adds texture to the geography being described.",
  "takeaway": "The passage includes details about the land."
 },
 "13": {
  "scene": "The second river is Gihon, associated with the land of Cush.",
  "breakdown": "Genesis continues its list of rivers. Gihon is the second named branch, and Cush is the land mentioned alongside it.",
  "takeaway": "A second river is named."
 },
 "14": {
  "scene": "The third river is Tigris, and the fourth is Euphrates.",
  "breakdown": "The list closes with two more rivers. Tigris is described as flowing east of Assyria, while Euphrates is simply named.",
  "takeaway": "The four rivers have now been listed."
 },
 "15": {
  "scene": "God places the man in the garden to work it and keep it.",
  "breakdown": "The man has a responsibility in the place God has given him. The garden is a gift, but living there includes tending and guarding it.",
  "takeaway": "The man is entrusted with caring for the garden."
 },
 "16": {
  "scene": "God tells the man he may eat freely from the garden's trees.",
  "breakdown": "Before giving a restriction, God speaks of permission. The man is allowed to eat from the trees of the garden, showing the abundance available to him.",
  "takeaway": "God gives generous permission."
 },
 "17": {
  "scene": "God forbids eating from the tree of the knowledge of good and evil and warns of death.",
  "breakdown": "There is one named tree the man must not eat from. The command gives a clear boundary and a serious warning about disobedience. The next chapter will show how this command is tested.",
  "takeaway": "God's command includes a clear boundary."
 },
 "18": {
  "scene": "God says it is not good for the man to be alone and promises a suitable helper.",
  "breakdown": "This is the first time in the creation account that something is called not good. The man needs a corresponding partner; the story now moves toward how that need is answered.",
  "takeaway": "Human aloneness is named as a problem."
 },
 "19": {
  "scene": "God brings the animals and birds to the man to see what he will call them.",
  "breakdown": "The man names the living creatures brought before him. Naming them is part of his role in the garden, but this scene also leads toward the search for a suitable partner.",
  "takeaway": "The man names the creatures."
 },
 "20": {
  "scene": "The man names the animals, but none is found to be a suitable partner for him.",
  "breakdown": "The naming continues through livestock, birds, and wild animals. Yet the passage says none corresponds to the man in the way he needs.",
  "takeaway": "The animals do not meet the man's need for a partner."
 },
 "21": {
  "scene": "God causes the man to sleep and takes from his side, closing the place with flesh.",
  "breakdown": "The man does not make his own partner. The LORD God acts while he sleeps, beginning the creation of the woman from his side.",
  "takeaway": "God acts to provide the man a partner."
 },
 "22": {
  "scene": "God makes a woman from what He took from the man and brings her to him.",
  "breakdown": "The woman is presented to the man after God forms her. The story answers the need for a corresponding partner raised earlier.",
  "takeaway": "The woman is brought to the man."
 },
 "23": {
  "scene": "The man recognizes the woman as bone of his bones and flesh of his flesh.",
  "breakdown": "His words express recognition and kinship. Unlike the animals he named, the woman is someone who shares his human nature.",
  "takeaway": "The man recognizes a true human counterpart."
 },
 "24": {
  "scene": "The passage explains that a man leaves his parents, joins his wife, and they become one flesh.",
  "breakdown": "The story moves from the first man and woman to a statement about marriage. It describes a new family bond in which husband and wife are joined together.",
  "takeaway": "Marriage is described as a close, shared union."
 },
 "25": {
  "scene": "The man and his wife are naked and feel no shame.",
  "breakdown": "The chapter ends by describing the couple without embarrassment or shame. This peaceful condition makes the change in the next chapter especially noticeable.",
  "takeaway": "The couple begins without shame."
 }
};
const torahBreakdowns:Partial<Record<string,Record<number,Record<number,PlainVerseStudy>>>>={Genesis:{1:plainGenesisOne,2:plainGenesisTwo}};
function getTorahBreakdown(book:string,chapter:number,verse:number){return torahBreakdowns[book]?.[chapter]?.[verse];}
export default function InterlinearReader(){
 const {locale}=useLanguage();const he=locale==="he";
 const [book,setBook]=useState("Genesis");const [chapter,setChapter]=useState(1);const [verse,setVerse]=useState(1);const [chapterData,setChapterData]=useState<ChapterResponse|null>(null);const [loading,setLoading]=useState(false);const [error,setError]=useState("");
 const [selected,setSelected]=useState<number|null>(null);const [showTransliteration,setShowTransliteration]=useState(true);
 useEffect(()=>{const controller=new AbortController();setLoading(true);setError("");setChapterData(null);
 fetch("/api/torah/"+book+"/"+chapter,{signal:controller.signal}).then(async r=>{if(!r.ok)throw new Error("Source unavailable");return r.json() as Promise<ChapterResponse>}).then(data=>{setChapterData(data);setLoading(false)}).catch(e=>{if(e.name!=="AbortError"){setError(he?"לא ניתן לטעון את הפרק כעת.":"Could not load this chapter right now.");setLoading(false)}});
 return ()=>controller.abort()},[book,chapter,he]);
 const curated=book==="Genesis"&&chapter===1?interlinearVerses.find(v=>v.reference==="Genesis 1:"+verse):undefined;
 const corpusWords=chapterData?.words?.[verse-1]||[];
 const word=selected===null?null:curated?.words[selected];
 const corpusWord=selected===null?null:corpusWords[selected];

 const breakdown=getTorahBreakdown(book,chapter,verse);
 const study=book==="Genesis"?genesisStudy[chapter]:undefined;
 const messianicNote=study?.notes[verse];
 // Private editorial preview only; no draft is published by default.

 const hebrew=chapterData?.verses[verse-1]||curated?.hebrew||"";
 const count=chapterData?.verses.length||(book==="Genesis"&&chapter===1?31:0);
 function chooseBook(value:string){setBook(value);setChapter(1);setVerse(1);setSelected(null)}
 function chooseChapter(value:number){setChapter(value);setVerse(1);setSelected(null)}
 function chooseVerse(value:number){setVerse(value);setSelected(null)}
 return <section className="interlinear-reader" aria-label={he?"קריאה בין־שורתית בתורה":"Interlinear Torah reader"}>
 <div className="interlinear-toolbar"><div><span className="kicker">{he?"לימוד עברית מקראית":"BIBLICAL HEBREW STUDY"}</span><h2>{he?"תורה · קריאה ולימוד":"Torah · Read and Study"}</h2></div>
 <div className="torah-pickers"><label>{he?"ספר":"Book"} <select value={book} onChange={e=>chooseBook(e.target.value)}>{books.map(b=><option key={b.id} value={b.id}>{he?b.he:b.id}</option>)}</select></label>
 <label>{he?"פרק":"Chapter"} <select value={chapter} onChange={e=>chooseChapter(Number(e.target.value))}>{Array.from({length:books.find(b=>b.id===book)?.chapters||50},(_,i)=><option value={i+1} key={i}>{i+1}</option>)}</select></label>
 <label>{he?"פסוק":"Verse"} <select value={verse} onChange={e=>chooseVerse(Number(e.target.value))}>{Array.from({length:count},(_,i)=><option value={i+1} key={i}>{i+1}</option>)}</select></label></div></div>
 <p className="interlinear-intro">{he?"כאן אפשר לקרוא בעברית את חמשת חומשי משה. התורה היא חמשת חומשי משה, ושאר כתבי הקודש כוללים גם את הנביאים, הכתובים והברית החדשה. לימוד מילים זמין בכל חמשת חומשי התורה.":"Read the first five books of the Bible in Hebrew. Tap a Hebrew word and we'll show you how to say it, what it means, and a little more about it. If you're reading Genesis 1–5, you'll also find notes that help you see how the passage connects to Yeshua."}</p>
 <div className="interlinear-options"><label><input type="checkbox" checked={showTransliteration} onChange={e=>setShowTransliteration(e.target.checked)}/> {he?"הצגת תעתיק":"Show transliteration"}</label></div>
 {loading&&<p role="status">{he?"טוען את הפרק...":"Loading Hebrew chapter..."}</p>}
 {error&&<p role="alert">{error} {curated?(he?"מוצג הטקסט השמור.":"Showing locally curated text where available."):""}</p>}
 {curated?<><div className="interlinear-word-grid" dir="rtl" lang="he">{curated.words.map((w,i)=><button className={"interlinear-word"+(selected===i?" selected":"")} type="button" aria-pressed={selected===i} key={i} onClick={()=>setSelected(i)}><span className="iw-hebrew">{w.hebrew}</span>{showTransliteration&&<span className="iw-roman" lang="en" dir="ltr">{w.transliteration}</span>}<span className="iw-english" lang="en" dir="ltr">{w.english}</span></button>)}</div>
 <div className="interlinear-verse" lang="en" dir="ltr"><strong>{curated.reference}</strong><p>{curated.english}</p></div>
 <div className="interlinear-detail" aria-live="polite">{word?<><strong lang="he" dir="rtl">{word.hebrew}</strong><span lang="en" dir="ltr">{word.transliteration} — {word.english}</span><p>{word.note||(he?"משמעות בסיסית של המילה בהקשר הפסוק.":"Here's what this word means in this verse.")}</p></>:<p>{he?"בחרו מילה כדי לפתוח הערת לימוד.":"Tap a Hebrew word above. We'll help you understand it."}</p>}</div></>:hebrew&&corpusWords.length?<><div className="interlinear-word-grid" dir="rtl" lang="he">{corpusWords.map((w,i)=><button className={"interlinear-word"+(selected===i?" selected":"")} type="button" aria-pressed={selected===i} key={w.index} onClick={()=>setSelected(i)}><span className="iw-hebrew">{w.hebrew}</span>{showTransliteration&&w.transliteration&&<span className="iw-roman" lang="en" dir="ltr">{w.transliteration}</span>}<span className="iw-english" lang="en" dir="ltr">{shortGloss(w.gloss,w.strong)}</span></button>)}</div><div className="interlinear-detail" aria-live="polite">{corpusWord?<><strong lang="he" dir="rtl">{corpusWord.hebrew}</strong><p><strong>What it means:</strong> {shortGloss(corpusWord.gloss,corpusWord.strong)}</p>{corpusWord.transliteration&&<p><strong>How to say it:</strong> {corpusWord.transliteration}</p>}{corpusWord.pronunciation&&<p><strong>Pronunciation guide:</strong> {corpusWord.pronunciation}</p>}<details className="torah-word-more"><summary>Want the word details? Tap here.</summary><p><strong>Strong’s number:</strong> {corpusWord.strong||"Not available"}</p><p><strong>Grammar code:</strong> {corpusWord.morph||"Not available"}</p><p><strong>Hebrew word form:</strong> {corpusWord.lemma}</p></details></>:<p>See a word you want to understand? Tap it. We'll show you how to say it and what it means.</p>}</div><p>These are simple word meanings to help you read along. Sometimes a word means something a little different depending on the sentence. Hebrew text from: <a href={chapterData?.sourceUrl} target="_blank" rel="noopener noreferrer">Open Scriptures Hebrew Bible</a>.</p></>:hebrew?<div className="torah-verse-panel"><span className="kicker">{he?"כתבי הקודש בעברית · לימוד משיחי":"HEBREW SCRIPTURE · MESSIANIC STUDY"}</span><p className="torah-hebrew-verse" dir="rtl" lang="he">{hebrew}</p><p>{he?"טקסט המקרא בעברית. פירוש מוצג רק כאשר קיים לימוד שנבדק בהמשך העמוד.":"Hebrew Scripture text. Commentary is available only where a reviewed study appears below."}</p></div>:!loading&&!error?<p>{he?"אין טקסט זמין לפסוק זה.":"No text available for this verse."}</p>:null}
 {breakdown&&<section className="torah-breakdown" lang="en" dir="ltr" aria-label="Plain English verse explanation"><span className="kicker">LET’S TALK ABOUT THIS VERSE</span><h3>What’s going on here?</h3><p>{breakdown.scene}</p><details key={verse}><summary>Break It Down for Me</summary><p>{breakdown.breakdown}</p><h4>What’s the main point?</h4><p>{breakdown.takeaway}</p><p className="torah-breakdown-note">This is a study explanation, not a Bible translation.</p></details></section>}
 {study&&<article className="torah-verse-panel" style={{marginTop:"1.5rem"}} lang="en" dir="ltr"><span className="kicker">MESSIANIC TORAH STUDY · GENESIS {chapter}</span><h3>{study.title}</h3><p>{study.overview}</p>{messianicNote?<><p><strong>Original Scripture context</strong></p><p>{messianicNote.context}</p><p><strong>Connection to Yeshua · {messianicNote.kind}</strong></p><p>{messianicNote.connection}</p><p><strong>Explore these Scriptures:</strong> {messianicNote.references}</p></>:<p><strong>Verse {verse}:</strong> Explore this verse within the chapter study above.</p>}</article>}
 <div className="torah-reader-pagination"><button type="button" disabled={verse===1} onClick={()=>chooseVerse(verse-1)}>{he?"הפסוק הקודם":"Previous verse"}</button><strong>{he?books.find(b=>b.id===book)?.he:book} {chapter}:{verse}</strong><button type="button" disabled={verse>=count} onClick={()=>chooseVerse(verse+1)}>{he?"הפסוק הבא":"Next verse"}</button></div>
 </section>
}