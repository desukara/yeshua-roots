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
 "1": {
  "scene": "The Bible opens with God creating the heavens and the earth.",
  "breakdown": "Before we meet Adam, Noah, Abraham, or anybody else, Genesis tells us who everything comes from. The words 'heavens and earth' take in the whole created world. This opening line gives us the big picture; the verses that follow slow down and tell the creation story.",
  "takeaway": "The story begins with God as Creator."
 },
 "2": {
  "scene": "The earth is unformed and empty, darkness covers the deep waters, and God's Spirit is moving over the waters.",
  "breakdown": "Nothing here looks like the world people live in yet. There's no dry land, no plants, and no people. But the darkness and deep waters don't mean God is absent. The story puts God's presence right there before the shaping and filling begin.",
  "takeaway": "Before the world takes shape, God is already present."
 },
 "3": {
  "scene": "God says, 'Let there be light,' and light appears.",
  "breakdown": "Notice how simple the action is: God speaks, and what He says happens. Genesis doesn't tell us where the light comes from or explain the physics. It wants us to see that creation responds to God's command.",
  "takeaway": "God speaks, and light appears."
 },
 "4": {
  "scene": "God sees that the light is good and separates it from the darkness.",
  "breakdown": "Light has appeared, but the story doesn't stop there. God distinguishes light from darkness, giving each its own place in the pattern of day and night. Calling the light 'good' is God's assessment of what He has made.",
  "takeaway": "God calls the light good and gives it a place."
 },
 "5": {
  "scene": "God names the light Day and the darkness Night; evening and morning mark the first day.",
  "breakdown": "God doesn't just separate light and darkness; He names them. Then we hear the first 'evening and morning' refrain. You'll hear that rhythm again as the creation account moves through the days.",
  "takeaway": "Day and night become part of the world's order."
 },
 "6": {
  "scene": "God calls for an expanse between the waters to separate them.",
  "breakdown": "Picture the scene the passage describes: waters below and waters above, with an expanse between them. The Hebrew word is often translated 'expanse' or 'firmament.' Rather than forcing modern science into this line, we should hear it as the ancient text describes the sky and its place in creation.",
  "takeaway": "God establishes a separation between the waters."
 },
 "7": {
  "scene": "God makes the expanse and separates the waters above from the waters below.",
  "breakdown": "This verse tells us that the command from the previous verse happens. The expanse divides the waters just as God said. The emphasis is on God bringing structure to a world that was described as unformed.",
  "takeaway": "The separation God commanded takes place."
 },
 "8": {
  "scene": "God calls the expanse Heaven, or sky, and the second day ends.",
  "breakdown": "The word translated 'heaven' here can refer to the sky. God gives the expanse a name, just as He named Day and Night. Then the account marks the end of day two with evening and morning.",
  "takeaway": "The sky is named, and the second day closes."
 },
 "9": {
  "scene": "God tells the waters below the sky to gather so dry land can appear.",
  "breakdown": "Up to now, the scene has been full of water. God commands the waters to collect, and dry ground comes into view. That's a big change: now there's a place for the plants and land creatures we'll hear about next.",
  "takeaway": "Dry ground appears as the waters gather."
 },
 "10": {
  "scene": "God names the dry ground Earth and the gathered waters Seas, and He sees that it is good.",
  "breakdown": "The land and the seas are no longer one watery scene. Each has its place and its name. God calls this arrangement good, continuing the chapter's pattern of showing creation as ordered and purposeful.",
  "takeaway": "God names the land and seas and calls them good."
 },
 "11": {
  "scene": "God tells the land to produce plants, seed-bearing vegetation, and fruit trees.",
  "breakdown": "Now that land has appeared, life begins growing on it. Pay attention to the repeated mention of seeds. These aren't just plants for one moment; they're plants that can keep producing more plants and fruit.",
  "takeaway": "The land is told to bring forth growing, reproducing life."
 },
 "12": {
  "scene": "The land produces plants and trees with seeds, and God sees that it is good.",
  "breakdown": "Here's the result of God's command in verse 11: vegetation grows, and the plants and trees produce seed according to their kinds. The account doesn't list every species. It highlights that the land now supports life that can continue.",
  "takeaway": "The land brings forth the plant life God commanded."
 },
 "13": {
  "scene": "Evening and morning mark the third day.",
  "breakdown": "This short verse closes a busy day. The waters have gathered, dry land has appeared, and plants are growing. The repeated evening-and-morning line tells us this stage of the creation account is complete.",
  "takeaway": "The third day comes to an end."
 },
 "14": {
  "scene": "God calls for lights in the sky to divide day from night and mark appointed times, days, and years.",
  "breakdown": "These lights have more than one job. They distinguish day from night, and they help people track time. 'Appointed times' can include set occasions or seasons. The verse tells us what the lights are for before the next verses describe them in more detail.",
  "takeaway": "The heavenly lights are assigned to mark time."
 },
 "15": {
  "scene": "God says the lights will shine from the sky onto the earth, and it happens.",
  "breakdown": "Verse 14 talked about marking time. This verse adds another purpose: giving light to the earth. The short phrase 'and it was so' tells us the command takes effect.",
  "takeaway": "The lights are meant to shine on the earth."
 },
 "16": {
  "scene": "God makes the greater light for the day, the lesser light for the night, and the stars.",
  "breakdown": "The passage describes what we know as the sun and moon by their roles rather than naming them. The greater light governs the day; the lesser one governs the night. And the stars are included too. None of them is presented as a god; they are things God made.",
  "takeaway": "The sun, moon, and stars belong to God's creation."
 },
 "17": {
  "scene": "God places the lights in the sky to shine on the earth.",
  "breakdown": "After telling us what the lights are, Genesis says where they are placed and what they do. They shine from above onto the earth. It's a simple line, but it keeps the focus on a world being arranged for life.",
  "takeaway": "The lights are placed to illuminate the earth."
 },
 "18": {
  "scene": "The lights govern day and night, separate light from darkness, and God calls it good.",
  "breakdown": "This verse brings the purpose of the lights together: they mark day and night and keep the two distinct. Then comes God's verdict: it is good. The story treats the lights as servants of a purpose, not powers to be worshiped.",
  "takeaway": "God calls the work of the heavenly lights good."
 },
 "19": {
  "scene": "Evening and morning mark the fourth day.",
  "breakdown": "The account pauses again to close a day. The sky's lights have been described, along with their work of shining and marking time. Now the story moves on to living creatures.",
  "takeaway": "The fourth day is complete."
 },
 "20": {
  "scene": "God commands the waters to teem with living creatures and birds to fly above the earth.",
  "breakdown": "Things are about to get lively. The waters won't just sit there; they'll be full of moving creatures. Birds will cross the sky. The spaces described earlier in the chapter are now being filled with life.",
  "takeaway": "The waters and sky are about to fill with creatures."
 },
 "21": {
  "scene": "God creates the great sea creatures, other water creatures, and birds, and sees that it is good.",
  "breakdown": "Genesis includes the great creatures of the sea, the swarms of living things in the water, and birds of every kind. Even the biggest sea creatures are simply part of what God made. And once again, God calls His work good.",
  "takeaway": "The creatures of the sea and sky are God's creation."
 },
 "22": {
  "scene": "God blesses the sea creatures and birds and tells them to multiply.",
  "breakdown": "This is the first time the chapter explicitly says God blesses living creatures. He tells the creatures in the water to fill the seas and the birds to multiply on the earth. The blessing looks forward to life continuing beyond the first creatures.",
  "takeaway": "God blesses the creatures with the ability to multiply."
 },
 "23": {
  "scene": "Evening and morning mark the fifth day.",
  "breakdown": "The fifth day closes after the waters and skies have been filled with life. The account is getting closer to the creation of land animals and human beings.",
  "takeaway": "The fifth day ends."
 },
 "24": {
  "scene": "God tells the land to bring forth living creatures: livestock, crawling creatures, and wild animals.",
  "breakdown": "Now it's the land's turn to be filled with moving life. The verse groups the animals in broad categories familiar to people: animals kept near humans, creatures that move along the ground, and wild animals. It's describing the spread of animal life, not giving a modern biology lesson.",
  "takeaway": "God calls forth animal life on the land."
 },
 "25": {
  "scene": "God makes the land animals according to their kinds and sees that it is good.",
  "breakdown": "Verse 24 gave the command; this verse shows it carried out. Wild animals, livestock, and ground-moving creatures are all included. God looks at this part of His creation and calls it good.",
  "takeaway": "God makes the land animals and calls them good."
 },
 "26": {
  "scene": "God speaks of making humanity in His image and giving people authority over living creatures.",
  "breakdown": "Here's a major shift. People are described as made in God's image, and they're given a role in relation to the animals and the earth. The verse doesn't spell out everything 'image' means, so we shouldn't pretend it does. But it clearly gives humanity a special responsibility within creation.",
  "takeaway": "Being made in God's image comes with responsibility."
 },
 "27": {
  "scene": "God creates humanity in His image, male and female.",
  "breakdown": "The wording repeats 'image of God' so we don't miss it. Then it says God created them male and female. The point is not that only one kind of person reflects God. Both are included in the dignity this verse gives humanity.",
  "takeaway": "Male and female are both made in God's image."
 },
 "28": {
  "scene": "God blesses humanity and tells people to multiply, fill the earth, and exercise authority over it.",
  "breakdown": "God's first words to humanity here are a blessing and a calling. People are to grow in number, fill the earth, and rule over other living things. Since the passage has just called people God's image-bearers, this authority isn't a blank check for cruelty. It is a serious responsibility.",
  "takeaway": "Humanity receives both blessing and responsibility."
 },
 "29": {
  "scene": "God gives seed-bearing plants and fruit trees to people for food.",
  "breakdown": "After speaking about humanity's role, God addresses a basic need: food. He points to plants that bear seed and trees with fruit. The picture is of a Creator who provides for the people He has made.",
  "takeaway": "God provides food for human life."
 },
 "30": {
  "scene": "God gives green plants as food to land animals and birds.",
  "breakdown": "The provision doesn't stop with human beings. The animals and birds are included too. This verse describes food for the living creatures of the earth within the creation picture of Genesis 1.",
  "takeaway": "God provides for the other living creatures too."
 },
 "31": {
  "scene": "God looks at everything He has made and calls it very good; the sixth day ends.",
  "breakdown": "Earlier in the chapter, God called different parts of creation 'good.' Now He looks at everything together and calls it 'very good.' That doesn't mean the Bible's story is over; it means the work described in this chapter reaches its conclusion with God's approval.",
  "takeaway": "God declares the whole completed creation very good."
 }
};
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