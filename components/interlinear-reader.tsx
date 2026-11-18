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
  "scene": "The heavens and earth, along with everything in them, are finished.",
  "breakdown": "Genesis 1 walked us through God making the world. Now the opening line of chapter 2 says that work has reached its end. Nothing new is being added to the creation account here; we're being told the work is complete before the story turns to the seventh day.",
  "takeaway": "The creation work described so far is finished."
 },
 "2": {
  "scene": "God finishes His work and rests on the seventh day.",
  "breakdown": "When Genesis says God 'rested,' it means He stopped the work He had been doing. It doesn't say He was exhausted. The six days of making and filling the world are over, and the seventh day is different because God ceases that work.",
  "takeaway": "God stops His work of creation on the seventh day."
 },
 "3": {
  "scene": "God blesses the seventh day and makes it holy.",
  "breakdown": "This isn't just another day on the calendar. God blesses it and sets it apart because He rested on it. Later, when the Torah teaches Israel about the Sabbath, it points back to this creation pattern. Here in Genesis, the emphasis is on what God did with the seventh day.",
  "takeaway": "The seventh day is blessed and set apart."
 },
 "4": {
  "scene": "The account shifts from the creation of the whole world to a closer look at the earth and human life.",
  "breakdown": "The phrase 'these are the generations' introduces a new section. We also begin hearing the name 'the LORD God.' The story is about to zoom in on the man, the garden, and the choices that follow. It isn't simply another list of creation days.",
  "takeaway": "Genesis now focuses on the human story."
 },
 "5": {
  "scene": "No field shrub or plant has grown yet; there has been no rain and no human being to work the ground.",
  "breakdown": "Don't miss the words about the field and working the soil. The verse is setting up the situation before the man is formed and before the garden is planted. It isn't necessarily saying there was no vegetation anywhere after Genesis 1; it's describing the ground in this scene and the lack of a worker to tend it.",
  "takeaway": "The story sets up the need for someone to work the ground."
 },
 "6": {
  "scene": "Water rises from the earth and waters the ground.",
  "breakdown": "Verse 5 said rain had not fallen. Now we hear about water coming up and wetting the ground. The Hebrew term for this water source is not entirely certain; translations say 'mist,' 'stream,' or something similar. The important point in the scene is that the soil is being watered.",
  "takeaway": "The ground receives water before the man is formed."
 },
 "7": {
  "scene": "The LORD God forms the man from dust and breathes the breath of life into him.",
  "breakdown": "Here's a picture you can almost see: God forms the man from the ground, then breathes life into him. The Hebrew words for 'man' (adam) and 'ground' (adamah) sound closely related. The man belongs to the earth, but his life comes from God. He isn't alive until God gives him breath.",
  "takeaway": "The man comes from the ground and receives life from God."
 },
 "8": {
  "scene": "The LORD God plants a garden in Eden and puts the man there.",
  "breakdown": "The man doesn't wander into Eden and find a garden on his own. God plants it and places him there. This is the setting where the man will live, work, receive a command, and eventually face a choice.",
  "takeaway": "God prepares a place for the man."
 },
 "9": {
  "scene": "God grows trees that look beautiful and provide food, including the tree of life and the tree of the knowledge of good and evil.",
  "breakdown": "The garden isn't described as bare or miserable. Its trees are attractive and good for food. But two trees get special attention. Remember their names, because the command about one of them and what happens later will drive the story forward.",
  "takeaway": "The garden offers plenty, but two trees matter especially."
 },
 "10": {
  "scene": "A river flows out of Eden to water the garden, then divides into four branches.",
  "breakdown": "The garden has a water source, and Genesis follows that river beyond Eden. The next verses name the four branches and the lands connected with them. We shouldn't pretend we can identify the garden's exact location from this description alone.",
  "takeaway": "The river waters the garden and leads into a description of the surrounding lands."
 },
 "11": {
  "scene": "The first river is called Pishon, and it winds around the land of Havilah.",
  "breakdown": "Genesis starts naming the four rivers. The first is Pishon, connected with Havilah, a land said to have gold. We aren't told exactly where this ancient river ran, so it would be guesswork to draw a confident modern map of it.",
  "takeaway": "Pishon is the first named river, associated with Havilah."
 },
 "12": {
  "scene": "Havilah is described as a land with good gold, bdellium, and a precious stone.",
  "breakdown": "These are details about the land mentioned in the previous verse. Bdellium is usually understood as an aromatic resin, while the Hebrew name of the stone is translated differently in some Bibles. The verse doesn't tell us to turn these materials into hidden spiritual symbols.",
  "takeaway": "The passage describes valuable materials found in Havilah."
 },
 "13": {
  "scene": "The second river is Gihon, which winds around the land of Cush.",
  "breakdown": "Now we get the second river's name. Cush is also a place-name found elsewhere in Scripture, but that doesn't settle exactly where this river was in the garden account. Genesis gives the name and its association without supplying a modern location.",
  "takeaway": "Gihon is named as the second river."
 },
 "14": {
  "scene": "The third river is Tigris, flowing east of Assyria, and the fourth is Euphrates.",
  "breakdown": "These two names may sound more familiar because the Tigris and Euphrates are known rivers of the ancient Near East. The verse gives a directional detail for the Tigris and simply names the Euphrates. That still doesn't give us enough to pinpoint Eden with certainty.",
  "takeaway": "Tigris and Euphrates complete the list of four rivers."
 },
 "15": {
  "scene": "God puts the man in the garden to work it and keep it.",
  "breakdown": "The garden is a gift, but the man isn't placed there to do absolutely nothing. He's given work: tending and keeping the place. The Hebrew verbs can carry the ideas of serving or cultivating and guarding or watching over. Work appears here before the disobedience of Genesis 3.",
  "takeaway": "Caring for the garden is part of the man's calling."
 },
 "16": {
  "scene": "God tells the man he may freely eat from the trees in the garden.",
  "breakdown": "Listen to how the command starts: with permission. God isn't telling the man that everything is off-limits. He's telling him he can eat freely from the garden's trees, before naming the one exception in the next verse.",
  "takeaway": "God gives the man plenty to enjoy."
 },
 "17": {
  "scene": "God tells the man not to eat from the tree of the knowledge of good and evil and warns that death will follow.",
  "breakdown": "Here's the one restriction after the broad permission of verse 16. God names a particular tree and gives a serious warning about eating from it. The Hebrew warning is emphatic, often rendered 'you shall surely die.' Exactly how that warning unfolds becomes part of the story in chapter 3.",
  "takeaway": "The freedom of the garden comes with one clear prohibition."
 },
 "18": {
  "scene": "God says it isn't good for the man to be alone and says He will make a helper suited to him.",
  "breakdown": "All through Genesis 1, we kept hearing that creation was good. Now something is 'not good': the man is alone. The Hebrew expression for 'helper corresponding to him' doesn't mean an inferior servant. It points to someone who can stand alongside him as a fitting counterpart.",
  "takeaway": "The man needs a fitting companion, not just more things around him."
 },
 "19": {
  "scene": "God brings the land animals and birds to the man to see what he will name them.",
  "breakdown": "The animals come before the man, and he gives them names. The verse also connects back to the search for a suitable companion. Naming creatures is meaningful, but being surrounded by animals doesn't solve the man's aloneness.",
  "takeaway": "The animals are named, but the question of a fitting companion remains."
 },
 "20": {
  "scene": "The man names the animals, but no suitable helper is found for him.",
  "breakdown": "The verse mentions livestock, birds, and wild animals. The man can name them all, but none is the matching partner God said he needed. That's why the story doesn't end with the animals. Something else has to happen.",
  "takeaway": "None of the animals is the man's human counterpart."
 },
 "21": {
  "scene": "God puts the man into a deep sleep, takes from his side, and closes the flesh.",
  "breakdown": "The man is asleep while God acts. Many English Bibles say 'rib,' but the Hebrew word can also mean 'side.' The point isn't to give us a medical explanation of the procedure. The story is showing that the woman comes from the man's own body, not from a separate kind of creature.",
  "takeaway": "God begins making the woman from the man's own side."
 },
 "22": {
  "scene": "God makes the woman from what He took from the man and brings her to him.",
  "breakdown": "Now we see the answer to the problem named in verse 18. God makes the woman and brings her to the man. The language presents her as someone who belongs alongside him, not as another animal for him to name.",
  "takeaway": "God provides the fitting human companion the man lacked."
 },
 "23": {
  "scene": "The man welcomes the woman as 'bone of my bones and flesh of my flesh.'",
  "breakdown": "You can hear the excitement in his words: at last, someone like him! 'Bone of my bones' and 'flesh of my flesh' express shared humanity and close kinship. The Hebrew also plays on the words for man (ish) and woman (ishah). This is recognition, not a claim that one is less human than the other.",
  "takeaway": "The man recognizes the woman as his own human counterpart."
 },
 "24": {
  "scene": "The passage says a man leaves his father and mother, holds fast to his wife, and they become one flesh.",
  "breakdown": "The story moves from this first couple to a wider statement about marriage. A new bond is formed, strong enough to be described as leaving one's parents and joining one's spouse. 'One flesh' speaks of a deep union; it isn't saying two people literally turn into one body.",
  "takeaway": "Marriage is described as a new, close family bond."
 },
 "25": {
  "scene": "The man and his wife are both naked, and neither feels shame.",
  "breakdown": "Genesis ends this chapter with a quiet picture of the couple together, uncovered and unashamed. That's worth remembering when chapter 3 begins, because after they disobey, their awareness of being naked changes. The contrast is part of how the story shows what was lost.",
  "takeaway": "The couple begins without shame; chapter 3 will show a change."
 }
};
const plainGenesisThree:Record<number,PlainVerseStudy>={
 "1": {
  "scene": "The serpent questions the woman about what God said they could eat.",
  "breakdown": "The serpent is introduced as crafty, and his first move is a question: did God really forbid eating from every tree? That's not what God said in chapter 2. God gave them plenty to eat, with one tree off-limits. The question makes God's command sound much harsher than it was.",
  "takeaway": "The temptation begins by twisting what God actually said."
 },
 "2": {
  "scene": "The woman answers that they may eat fruit from the garden's trees.",
  "breakdown": "She corrects the serpent's sweeping claim. The trees aren't all forbidden. There is food available throughout the garden, and the woman knows that. The conversation is about to narrow down to the one tree God restricted.",
  "takeaway": "God's permission was broad, not a ban on everything."
 },
 "3": {
  "scene": "The woman says they must not eat from or touch the tree in the middle of the garden, or they will die.",
  "breakdown": "Now she describes the restriction. In chapter 2, God's recorded command was not to eat from the tree of the knowledge of good and evil; it didn't mention touching it. Genesis doesn't explain why she adds that detail, so we shouldn't pretend we know. What matters is that she understands there is a serious boundary.",
  "takeaway": "The woman knows the tree is forbidden, though her wording adds a detail."
 },
 "4": {
  "scene": "The serpent tells the woman, 'You will not surely die.'",
  "breakdown": "This is no longer a question. The serpent directly contradicts God's warning from Genesis 2:17. The story puts two claims in front of the woman: what God said about eating from the tree, and what the serpent now says.",
  "takeaway": "The serpent openly challenges God's warning."
 },
 "5": {
  "scene": "The serpent claims eating the fruit will open their eyes and make them like God, knowing good and evil.",
  "breakdown": "He offers an attractive reason to ignore the command. Instead of talking about the danger God named, he talks about gaining something desirable. The next verses show their eyes opening, but not in the simple, wonderful way his promise suggests.",
  "takeaway": "The serpent makes disobedience sound like a way to gain wisdom."
 },
 "6": {
  "scene": "The woman sees that the tree looks good for food, pleasing to the eyes, and desirable for wisdom; she eats and gives some to her husband, who eats too.",
  "breakdown": "The verse slows down to show the choice. She considers the fruit, takes it, and eats. Then she gives some to the man, who is described as being with her, and he eats. Both people take part in crossing the boundary God gave.",
  "takeaway": "Both the woman and the man eat from the forbidden tree."
 },
 "7": {
  "scene": "Their eyes are opened, they realize they are naked, and they sew fig leaves together.",
  "breakdown": "The serpent promised opened eyes, and that part happens. But the first thing the couple does is cover themselves. At the end of chapter 2 they were naked without shame; now they feel exposed. The story wants us to notice that change.",
  "takeaway": "Their new awareness brings shame, not the freedom they expected."
 },
 "8": {
  "scene": "The man and woman hear the LORD God in the garden and hide among the trees.",
  "breakdown": "Before this, the garden was their home. Now they hide from God there. The verse describes God moving in the garden and the couple trying to stay out of sight. The problem isn't that God suddenly arrived in an unfamiliar place; it's that they no longer want to face Him.",
  "takeaway": "After disobeying, the couple hides from God."
 },
 "9": {
  "scene": "God calls to the man, 'Where are you?'",
  "breakdown": "The question opens a conversation, not a search party we need to explain with guesses about what God knows. The man has hidden, and now he is being called to answer. Watch how the questions that follow bring the choice into the open.",
  "takeaway": "God calls the hiding man to respond."
 },
 "10": {
  "scene": "The man says he was afraid because he was naked, so he hid.",
  "breakdown": "For the first time, the man talks about fear. He connects his hiding to being naked, but he hasn't yet admitted eating the fruit. The shame and fear that appeared after their choice are now shaping how he responds to God.",
  "takeaway": "Fear has replaced the couple's earlier ease in the garden."
 },
 "11": {
  "scene": "God asks who told the man he was naked and whether he ate from the forbidden tree.",
  "breakdown": "God's questions go straight to the issue. The man has talked about being naked, but the command was about eating from a particular tree. The conversation now confronts the action behind his fear.",
  "takeaway": "The question brings the broken command into focus."
 },
 "12": {
  "scene": "The man says the woman God gave him offered the fruit, and he ate.",
  "breakdown": "Notice how he answers. He admits eating, but first points to the woman—and even mentions that God gave her to him. The verse doesn't erase his responsibility; he still says, 'I ate.' It shows how quickly blame enters the conversation.",
  "takeaway": "The man admits what he did while shifting blame."
 },
 "13": {
  "scene": "God asks the woman what she has done, and she says the serpent deceived her, so she ate.",
  "breakdown": "The woman also acknowledges eating, but she points to the serpent's deception. That fits what we've just read: the serpent questioned and contradicted God's command. Still, the woman made a choice to eat. Both deception and responsibility are part of the scene.",
  "takeaway": "The woman says she was deceived, and she admits eating."
 },
 "14": {
  "scene": "God tells the serpent it is cursed and will go on its belly and eat dust.",
  "breakdown": "God addresses the serpent first. The language describes humiliation: crawling and eating dust. The verse doesn't explain the serpent's earlier anatomy, so we shouldn't invent a story about how it used to move. The point here is judgment and disgrace.",
  "takeaway": "The serpent receives a curse."
 },
 "15": {
  "scene": "God speaks of hostility between the serpent and the woman, and between their offspring; her offspring will strike its head while it strikes his heel.",
  "breakdown": "The verse describes an ongoing conflict and a blow to the serpent's head alongside a wound to the offspring's heel. Christians often see a connection here to Yeshua's victory over evil, but Genesis itself doesn't name Yeshua in this line. We can recognize that later reading without pretending the verse spells it all out.",
  "takeaway": "The serpent's conflict with humanity will continue; later believers also see a larger hope here."
 },
 "16": {
  "scene": "God tells the woman that pain in pregnancy and childbirth will increase, and describes tension in her relationship with her husband.",
  "breakdown": "The consequences now reach into family life. Childbearing will involve pain, and the relationship between husband and wife will be marked by a struggle over desire and rule. This is a description within God's judgment, not a command telling husbands to mistreat their wives.",
  "takeaway": "The consequences touch childbirth and the marriage relationship."
 },
 "17": {
  "scene": "God tells Adam that because he ate from the forbidden tree, the ground is cursed and getting food will be painful work.",
  "breakdown": "Adam was placed in the garden to work it before he disobeyed. So work itself isn't introduced as a punishment here. What changes is the hardship: the ground is cursed, and eating from it will now involve toil. God names Adam's disobedience directly.",
  "takeaway": "The ground will no longer yield food without painful struggle."
 },
 "18": {
  "scene": "God says the ground will produce thorns and thistles, and Adam will eat the plants of the field.",
  "breakdown": "The trouble with the soil gets more specific. Adam will still eat from the land, but now weeds and thorns will make growing food difficult. The same ground he was meant to tend will resist him.",
  "takeaway": "Food will come from land that is harder to cultivate."
 },
 "19": {
  "scene": "God says Adam will eat by the sweat of his face until he returns to the ground, because he was taken from dust.",
  "breakdown": "This verse brings the warning of death into sharp focus. Adam will labor for food throughout his life, but that life will end. Genesis 2 said he was formed from dust; now he is told he will return to dust. The words connect his beginning and his mortality.",
  "takeaway": "Human life ends in a return to the dust."
 },
 "20": {
  "scene": "The man names his wife Eve because she is the mother of all living.",
  "breakdown": "After the judgments, Adam gives his wife a name linked in Hebrew to life. The verse explains the name by calling her the mother of all living. The story is still looking ahead to human life continuing beyond the garden.",
  "takeaway": "Eve's name is connected with life and future generations."
 },
 "21": {
  "scene": "The LORD God makes garments of skin for Adam and his wife and clothes them.",
  "breakdown": "Earlier, the couple tried to cover themselves with fig leaves. Now God provides clothing for them. The verse says the garments are made of skin, but it doesn't describe an animal sacrifice or tell us how the skins were obtained. We should stick with what the text actually says.",
  "takeaway": "God clothes the couple after their shame and judgment."
 },
 "22": {
  "scene": "God says the man has become like 'one of us' in knowing good and evil, and speaks of keeping him from the tree of life.",
  "breakdown": "This is a difficult line, and Genesis doesn't explain every part of the phrase 'one of us.' The immediate concern is clear, though: the man must not take from the tree of life and live forever in his present condition. The next verse tells us what God does about that.",
  "takeaway": "Access to the tree of life is now at stake."
 },
 "23": {
  "scene": "God sends the man out of the garden of Eden to work the ground from which he was taken.",
  "breakdown": "The man was placed in the garden to tend it; now he is sent out. He will still work the soil, but outside the place God prepared for him. This is a major turning point: disobedience has changed where the couple can live.",
  "takeaway": "Adam leaves the garden and returns to working the ground outside it."
 },
 "24": {
  "scene": "God drives the man out and stations cherubim and a flaming, turning sword to guard the way to the tree of life.",
  "breakdown": "The chapter ends with a closed entrance. The cherubim and flaming sword guard the way back to the tree of life. Whatever questions we have about the imagery, the main point is plain: the couple cannot simply walk back in and take the fruit. The garden is no longer open to them.",
  "takeaway": "The way back to the tree of life is guarded."
 }
};
const plainGenesisFour:Record<number,PlainVerseStudy>={
 "1": {
  "scene": "Adam and Eve have a son named Cain, and Eve gives credit to the LORD.",
  "breakdown": "After the family is sent out of Eden, life keeps going. Eve becomes pregnant and gives birth to Cain. Her words connect the birth to God's help, though the Hebrew wording is tricky and translations differ on exactly how to phrase it. The main thing is clear: a child has arrived, and Eve speaks about the LORD as she celebrates.",
  "takeaway": "Life continues outside Eden, and Eve acknowledges God at Cain's birth."
 },
 "2": {
  "scene": "Eve gives birth to Abel; Abel becomes a shepherd, while Cain works the ground.",
  "breakdown": "Now we meet the two brothers at the center of this chapter. One tends flocks; the other farms. The verse doesn't call either job better than the other. In fact, working the ground was already part of human life. Their occupations set the scene for the offerings they bring next.",
  "takeaway": "The brothers have different kinds of work, but neither job is condemned."
 },
 "3": {
  "scene": "Cain brings an offering to the LORD from what the ground produces.",
  "breakdown": "Cain is a farmer, so he brings something grown from the soil. That's what the verse tells us. It doesn't say all grain or produce offerings are wrong; later in the Torah, offerings from the land have their place. The question is why God responds differently to the two brothers, and the story hasn't explained that yet.",
  "takeaway": "Cain brings an offering from his harvest."
 },
 "4": {
  "scene": "Abel also brings an offering, from the firstborn of his flock and their fat portions; the LORD regards Abel and his offering.",
  "breakdown": "The wording gives us a little more detail about Abel's gift: firstborn animals and their fat portions, language that suggests something choice and valuable. God looks favorably on Abel and what he brings. But the verse doesn't lay out a complete rule explaining every reason for God's response.",
  "takeaway": "God accepts Abel and his offering; the text highlights what Abel brought."
 },
 "5": {
  "scene": "God does not regard Cain and his offering, and Cain becomes very angry.",
  "breakdown": "Cain's reaction is immediate: he's furious, and his face falls. The story doesn't say God rejected Cain simply because he brought produce rather than an animal. It tells us God regarded Abel and his gift but not Cain and his, then turns our attention to how Cain handles disappointment.",
  "takeaway": "Cain's anger becomes the next danger in the story."
 },
 "6": {
  "scene": "The LORD asks Cain why he is angry and why his face has fallen.",
  "breakdown": "God doesn't ignore Cain's anger. He addresses it directly, giving Cain an opening to think about what's happening inside him. The questions matter because Cain still has a choice about what he does next. Being upset is one thing; letting anger drive him toward harm is another.",
  "takeaway": "God confronts Cain's anger before Cain acts on it."
 },
 "7": {
  "scene": "God warns Cain that sin is crouching at the door and urges him to rule over it.",
  "breakdown": "The Hebrew in the first part of this verse is difficult, and translations differ. But the warning at the end is unmistakable: sin is pictured like something waiting to spring, wanting to control Cain. God tells him he must master it. Cain isn't being told his next move is unavoidable.",
  "takeaway": "Cain is warned that he must not let sin control him."
 },
 "8": {
  "scene": "Cain speaks to Abel, and out in the field Cain attacks and kills his brother.",
  "breakdown": "This is the terrible turn. Some Bible translations include Cain saying, 'Let's go out to the field,' while others leave his words unstated because the ancient manuscripts differ. Either way, the action is clear: Cain takes his anger out on Abel and kills him. The first recorded murder happens between brothers.",
  "takeaway": "Cain chooses violence and kills Abel."
 },
 "9": {
  "scene": "The LORD asks Cain where Abel is, and Cain says he doesn't know.",
  "breakdown": "Cain answers with a lie and then asks, 'Am I my brother's keeper?' It's a cold response after what he has done. The question about being his brother's keeper doesn't excuse him; it exposes how little responsibility he wants to take for Abel's life.",
  "takeaway": "Cain hides the truth and refuses responsibility for his brother."
 },
 "10": {
  "scene": "God says Abel's blood is crying out from the ground.",
  "breakdown": "Abel cannot speak for himself now, but the murder isn't hidden from God. The picture of blood crying from the ground tells us the injustice demands an answer. The ground Cain worked has become the place where his brother's blood was spilled.",
  "takeaway": "Abel's murder has not gone unnoticed."
 },
 "11": {
  "scene": "God says Cain is cursed from the ground that received Abel's blood.",
  "breakdown": "The ground is central to Cain's life as a farmer, and now it is tied to his crime. God says the ground opened its mouth to receive Abel's blood. Cain's relationship with the soil—the source of his livelihood—is about to change.",
  "takeaway": "Cain's violence brings judgment into the very work he depends on."
 },
 "12": {
  "scene": "God says the ground will no longer yield its strength to Cain, and he will be a wanderer.",
  "breakdown": "Cain worked the land, but now that work will no longer provide for him the way it did. He is also told he will live as a fugitive and wanderer. The punishment touches both his livelihood and his sense of having a settled place to belong.",
  "takeaway": "Cain loses the security of his work and his home."
 },
 "13": {
  "scene": "Cain tells the LORD that his punishment is more than he can bear.",
  "breakdown": "Cain finally speaks about the consequences, but notice what he talks about: how hard life will be for him. The verse doesn't record an apology to Abel or a confession of grief for what he did. It shows Cain overwhelmed by the judgment he faces.",
  "takeaway": "Cain is distressed by his punishment."
 },
 "14": {
  "scene": "Cain fears being driven away from the ground and from God's presence, and worries that someone will kill him.",
  "breakdown": "Cain sees himself as exposed and vulnerable. He believes that once he is wandering, anyone who finds him might take revenge. The passage doesn't stop to identify every possible person he fears; it focuses on Cain's fear of being killed.",
  "takeaway": "Cain fears that the violence he committed may come back on him."
 },
 "15": {
  "scene": "The LORD warns against killing Cain and puts a mark on him so others will not strike him.",
  "breakdown": "Even after Cain's crime, God limits the cycle of revenge. The mark is a sign of protection, but Genesis never tells us what it looked like. Claims that it was a particular skin color or physical trait are not supported by this verse. The point is that Cain is not to be killed in retaliation.",
  "takeaway": "God judges Cain but also protects him from revenge killing."
 },
 "16": {
  "scene": "Cain leaves the LORD's presence and settles in the land of Nod, east of Eden.",
  "breakdown": "Cain's departure makes the separation real. The land is called Nod, a name connected with wandering in Hebrew. The story has moved from the garden, to the field where Abel was killed, to a life away from the place Cain knew.",
  "takeaway": "Cain begins life away from his former home."
 },
 "17": {
  "scene": "Cain has a son named Enoch and builds a city, naming it after his son.",
  "breakdown": "The story now follows Cain's family. People are building households and settlements, even after the violence of the earlier verses. This Enoch is Cain's son, not the Enoch who appears later in Seth's family line. The verse doesn't say that building a city was itself sinful.",
  "takeaway": "Cain's family line continues, and a city is named for his son."
 },
 "18": {
  "scene": "The descendants of Cain are listed from Enoch through Irad, Mehujael, Methushael, and Lamech.",
  "breakdown": "This verse moves quickly through generations. The names may feel like a pause in the action, but they show that Cain's story didn't end with his exile. His descendants keep living and forming families. The narrative is leading us toward Lamech, who will speak about violence in a few verses.",
  "takeaway": "Cain's family grows across several generations."
 },
 "19": {
  "scene": "Lamech takes two wives, Adah and Zillah.",
  "breakdown": "The Bible tells us what Lamech did without stopping here to praise or command it. This is the first mention of a man having two wives in Genesis, following the one-man-and-one-woman union described in chapter 2. We should notice the change without pretending this single verse explains everything about marriage.",
  "takeaway": "Lamech's household is introduced with two wives."
 },
 "20": {
  "scene": "Adah gives birth to Jabal, associated with people who live in tents and raise livestock.",
  "breakdown": "The focus shifts to how people live and work. Jabal is described as an ancestor of tent-dwellers who keep livestock. Genesis is showing different ways human communities develop, not just tracing names on a family tree.",
  "takeaway": "Jabal is linked with tent-dwelling and livestock keeping."
 },
 "21": {
  "scene": "Jabal's brother Jubal is associated with people who play the lyre and pipe.",
  "breakdown": "Now we hear about music. Jubal is described as an ancestor of those who play stringed and wind instruments. The same family line that includes serious wrongdoing also includes ordinary human skills and culture. Genesis is not saying music itself is wrong.",
  "takeaway": "Jubal is linked with the development of musical instruments."
 },
 "22": {
  "scene": "Zillah gives birth to Tubal-cain, a worker of bronze and iron, and his sister Naamah is named.",
  "breakdown": "The family list turns to metalworking. Tubal-cain is associated with shaping tools or implements from bronze and iron. Naamah is also named, though this verse doesn't tell us more about her. We don't need to invent a story about her just because her name appears.",
  "takeaway": "The family line includes metalworking, and Naamah is named."
 },
 "23": {
  "scene": "Lamech tells his wives that he has killed a man for wounding him, a young man for striking him.",
  "breakdown": "The tone changes sharply. Lamech addresses his wives in a short poem and boasts—or at least speaks boldly—about killing someone over an injury. The Hebrew wording leaves room for discussion about exactly how to understand the lines, but the picture of escalating violence is hard to miss.",
  "takeaway": "Lamech's words show how violence has grown in Cain's line."
 },
 "24": {
  "scene": "Lamech says that if Cain is avenged sevenfold, he will be avenged seventy-sevenfold.",
  "breakdown": "Back in verse 15, God protected Cain from revenge killing. Lamech now takes that language and pushes it much further. The text records his claim; it doesn't say God promised him this protection. His words sound like a man magnifying the threat of retaliation.",
  "takeaway": "Lamech turns the language of protection into a bigger claim about revenge."
 },
 "25": {
  "scene": "Adam and Eve have another son, Seth, and Eve says God has given her another child in place of Abel.",
  "breakdown": "After following Cain's descendants, Genesis returns to Adam and Eve. Abel is still gone; his murder hasn't been forgotten. Eve names Seth and speaks of him as another offspring given by God in Abel's place. The chapter closes by showing that the family story continues despite its grief.",
  "takeaway": "Seth's birth brings a new beginning after Abel's death."
 },
 "26": {
  "scene": "Seth has a son named Enosh, and people begin calling on the name of the LORD.",
  "breakdown": "The chapter ends with Seth's family and a statement about calling on the LORD's name. That phrase is often understood as worship or prayer, though scholars discuss its exact force here. After a chapter full of anger and violence, this closing line turns our attention to people relating to God.",
  "takeaway": "The chapter closes with a reference to calling on the LORD."
 }
};
const plainGenesisFive:Record<number,PlainVerseStudy>={
 "1": {
  "scene": "Genesis introduces the written account of Adam's family line and reminds us that God made humanity in His likeness.",
  "breakdown": "We're moving from Cain and Abel's story into a family record. Before the names and ages begin, Genesis takes us back to creation: human beings were made in God's likeness. That matters because the people in this family line are more than dates on a timeline. They're human lives connected to the beginning of the story.",
  "takeaway": "The family record begins by reminding us of humanity's God-given origin."
 },
 "2": {
  "scene": "God creates humanity male and female, blesses them, and calls them 'man' or 'humankind.'",
  "breakdown": "The chapter repeats something important from Genesis 1: both male and female are included in God's blessing. The Hebrew word adam can mean the man Adam or humankind, depending on the context. Here the wording looks back to humanity as a whole before the genealogy focuses on Adam's descendants.",
  "takeaway": "God's blessing and the name for humanity include male and female."
 },
 "3": {
  "scene": "Adam is 130 years old when he fathers Seth, a son in his own likeness and image.",
  "breakdown": "The language deliberately echoes the earlier statement that God made humanity in His likeness. Now Adam has a son described as being in Adam's likeness. Seth is the child through whom this particular family record continues; that doesn't mean Adam had no other children.",
  "takeaway": "The family line continues through Seth, who is described as like his father."
 },
 "4": {
  "scene": "After Seth is born, Adam lives another 800 years and has other sons and daughters.",
  "breakdown": "Genesis gives us two details at once: Adam's life continues for many years after Seth, and the family is bigger than the names this chapter lists. The genealogy follows one line, not every child in every generation. That's why we shouldn't treat the named people as the only people alive.",
  "takeaway": "Adam has more children than the genealogy names."
 },
 "5": {
  "scene": "Adam's total lifespan is given as 930 years, and then he dies.",
  "breakdown": "Here's the pattern we'll keep hearing: someone lives, has a son, lives more years, and dies. That last phrase matters. God warned Adam about death in the garden, and now the genealogy says plainly that Adam died. The long lifespan doesn't erase that ending.",
  "takeaway": "Even Adam's long life comes to an end."
 },
 "6": {
  "scene": "Seth is 105 years old when he fathers Enosh.",
  "breakdown": "The family record now moves from Adam to Seth. Genesis isn't telling us every event in Seth's life; it's identifying the next person in the line being traced. Enosh was already mentioned at the end of chapter 4.",
  "takeaway": "The genealogy passes from Seth to Enosh."
 },
 "7": {
  "scene": "After Enosh is born, Seth lives another 807 years and has other sons and daughters.",
  "breakdown": "Once again, the named son isn't the whole family. Seth has other children too. The passage is keeping a steady rhythm so we can follow the generations without getting lost in every branch of the family tree.",
  "takeaway": "Seth's family is larger than the one line being followed."
 },
 "8": {
  "scene": "Seth's total lifespan is 912 years, and then he dies.",
  "breakdown": "The numbers are striking, but the repeated ending is just as important: 'and he died.' Genesis is showing generations continuing while individual lives end. Seth's story, like Adam's, has an ending.",
  "takeaway": "Seth lives a long life, but he also dies."
 },
 "9": {
  "scene": "Enosh is 90 years old when he fathers Kenan.",
  "breakdown": "The genealogy moves another generation forward. We're not given a scene or conversation here, only the age at which Enosh fathers the next named son. That's how this chapter keeps the family line moving toward Noah.",
  "takeaway": "Enosh fathers Kenan, the next person in the line."
 },
 "10": {
  "scene": "After Kenan is born, Enosh lives another 815 years and has other sons and daughters.",
  "breakdown": "Enosh's life includes many more years and more children than the one named here. Genesis is following a particular family line, not giving us a complete list of everyone born in that time.",
  "takeaway": "Enosh has other children beyond Kenan."
 },
 "11": {
  "scene": "Enosh lives 905 years in all, and then he dies.",
  "breakdown": "The same closing words return. Enosh's lifespan is long by our experience, but it still ends. The repetition isn't pointless; it makes death a steady presence in the family record.",
  "takeaway": "Enosh's life ends, just as the earlier generations did."
 },
 "12": {
  "scene": "Kenan is 70 years old when he fathers Mahalalel.",
  "breakdown": "Here's another step in the line from Adam toward Noah. The name Mahalalel may be unfamiliar, but the role of the verse is simple: it tells us who comes next. We don't need to invent a biography for him when Genesis hasn't given one.",
  "takeaway": "Kenan fathers Mahalalel."
 },
 "13": {
  "scene": "After Mahalalel is born, Kenan lives another 840 years and has other sons and daughters.",
  "breakdown": "The pattern continues: a named son, more years of life, and other children. These extra sons and daughters are a reminder that the family history was much wider than the single branch Genesis is choosing to trace.",
  "takeaway": "Kenan's household includes more children than the named successor."
 },
 "14": {
  "scene": "Kenan's total lifespan is 910 years, and then he dies.",
  "breakdown": "The genealogy closes Kenan's entry with the familiar words about his death. This chapter records life being passed on from generation to generation, but nobody so far escapes the end of earthly life.",
  "takeaway": "Kenan's long life also comes to an end."
 },
 "15": {
  "scene": "Mahalalel is 65 years old when he fathers Jared.",
  "breakdown": "Now the family line moves from Mahalalel to Jared. There isn't a hidden lesson we need to force out of every name or number. The verse is doing the straightforward work of preserving the sequence of generations.",
  "takeaway": "Jared is the next named descendant."
 },
 "16": {
  "scene": "After Jared is born, Mahalalel lives another 830 years and has other sons and daughters.",
  "breakdown": "Mahalalel's life doesn't stop when Jared is born. He continues living and has more children. The genealogy is selective because its purpose is to follow one line through the generations.",
  "takeaway": "Mahalalel has additional children."
 },
 "17": {
  "scene": "Mahalalel lives 895 years in all, and then he dies.",
  "breakdown": "Once again, the record gives a total and ends with death. The repetition may feel heavy, but it tells us something about the world outside Eden: families grow, generations pass, and human lives end.",
  "takeaway": "Mahalalel's life ends."
 },
 "18": {
  "scene": "Jared is 162 years old when he fathers Enoch.",
  "breakdown": "This Enoch belongs to Seth's family line. He's not the Enoch mentioned as Cain's son in Genesis 4. The names repeat, but the people are different. Keep an eye on this Enoch, because his entry is about to break the chapter's usual pattern.",
  "takeaway": "Jared fathers the Enoch whose story stands out in this chapter."
 },
 "19": {
  "scene": "After Enoch is born, Jared lives another 800 years and has other sons and daughters.",
  "breakdown": "The record returns briefly to its usual rhythm. Jared has more children, and the family keeps growing. The chapter names Enoch because it's following the line that eventually leads to Noah.",
  "takeaway": "Jared's family continues beyond Enoch."
 },
 "20": {
  "scene": "Jared's total lifespan is 962 years, and then he dies.",
  "breakdown": "Jared has one of the longest lifespans recorded in this chapter, but the ending is still the same: he dies. That familiar phrase makes what happens next with Enoch even more noticeable.",
  "takeaway": "Jared dies despite his very long life."
 },
 "21": {
  "scene": "Enoch is 65 years old when he fathers Methuselah.",
  "breakdown": "Now we come to Enoch himself. At first his entry sounds like everyone else's: his age is given, and the next son is named. But the following verses tell us something different about the way Enoch lived.",
  "takeaway": "Enoch fathers Methuselah, and his account is about to change direction."
 },
 "22": {
  "scene": "After Methuselah is born, Enoch walks with God for 300 years and has other sons and daughters.",
  "breakdown": "Instead of only saying Enoch lived more years, Genesis says he 'walked with God.' That's a way of describing his relationship and way of life, not just where his feet went. He also has other children, so walking with God happens in the middle of ordinary family life.",
  "takeaway": "Enoch's life is marked by walking with God."
 },
 "23": {
  "scene": "Enoch's total years are 365.",
  "breakdown": "This is much shorter than the lifespans of the people around him in the genealogy. But Genesis doesn't immediately follow it with the usual words, 'and he died.' The next verse tells us why Enoch's entry stands apart.",
  "takeaway": "Enoch's years are counted differently from the usual pattern."
 },
 "24": {
  "scene": "Enoch walks with God, and then he is no longer there because God takes him.",
  "breakdown": "Here the familiar ending changes. Instead of saying Enoch died, the text says God took him. Genesis doesn't explain the mechanics of what happened, so we shouldn't make up details. What it does emphasize is Enoch's walk with God and an ending unlike the others in this list.",
  "takeaway": "Enoch's story breaks the repeated pattern of death."
 },
 "25": {
  "scene": "Methuselah is 187 years old when he fathers Lamech.",
  "breakdown": "After Enoch's unusual ending, the genealogy moves on to his son Methuselah and then to Lamech. This Lamech is not the violent speaker from Cain's line in Genesis 4. Same name, different branch of the family.",
  "takeaway": "Methuselah fathers Lamech in Seth's family line."
 },
 "26": {
  "scene": "After Lamech is born, Methuselah lives another 782 years and has other sons and daughters.",
  "breakdown": "The familiar structure returns: Methuselah has the named son, then lives many more years and has other children. Genesis is still tracing the particular family line that will lead to Noah.",
  "takeaway": "Methuselah has more children as the generations continue."
 },
 "27": {
  "scene": "Methuselah's total lifespan is 969 years, and then he dies.",
  "breakdown": "Methuselah is recorded as living 969 years, the longest lifespan listed in the Bible. Even so, the final words are the same as for most of his ancestors: he dies. The number is remarkable, but the chapter doesn't present him as immortal.",
  "takeaway": "Even Methuselah's exceptionally long life ends."
 },
 "28": {
  "scene": "Lamech is 182 years old when he fathers a son.",
  "breakdown": "We're almost at Noah now. The genealogy gives Lamech's age when his son is born, but the next verse does something most entries don't: it tells us what the father says about the child. That speech helps explain why Noah matters to the story ahead.",
  "takeaway": "Lamech's son is about to receive a meaningful name."
 },
 "29": {
  "scene": "Lamech names his son Noah and hopes he will bring relief from the painful work of the cursed ground.",
  "breakdown": "Remember Genesis 3, when the ground was cursed and working it became painful? Lamech remembers that hardship. He gives his son the name Noah and speaks of comfort or relief. The Hebrew connects the naming with a word for comfort, even though the name itself sounds closer to a word for rest. Lamech is expressing hope, not announcing that the curse has already ended.",
  "takeaway": "Noah's name is tied to a father's hope for relief from hard labor."
 },
 "30": {
  "scene": "After Noah is born, Lamech lives another 595 years and has other sons and daughters.",
  "breakdown": "Noah isn't Lamech's only child. Like the earlier generations, Lamech has more sons and daughters. But Genesis follows Noah because his life will be central to the flood story that comes next.",
  "takeaway": "Lamech's family grows beyond Noah."
 },
 "31": {
  "scene": "Lamech's total lifespan is 777 years, and then he dies.",
  "breakdown": "The chapter gives Lamech's total years and closes his life with the usual words. Don't confuse his age of 777 with the boast about revenge from the other Lamech in Genesis 4. These are different men, and this verse is simply recording the end of Noah's father's life.",
  "takeaway": "Lamech dies, and the genealogy moves toward Noah."
 },
 "32": {
  "scene": "Noah is 500 years old and fathers Shem, Ham, and Japheth.",
  "breakdown": "The chapter ends by naming three sons rather than following the usual one-son pattern. That signals a change in focus. These three brothers will matter in the flood account and the story of the nations afterward. The verse doesn't necessarily mean all three were born when Noah turned exactly 500; it introduces this stage of his family life.",
  "takeaway": "The genealogy reaches Noah and introduces his three sons."
 }
};
const plainGenesisSix:Record<number,PlainVerseStudy>={
 "1": {
  "scene": "People begin multiplying across the earth, and daughters are born to them.",
  "breakdown": "The story moves from Noah's family line to what is happening across the wider world. More people are living on the earth, and Genesis is about to describe relationships and behavior that lead into God's judgment. The verse itself doesn't say that having daughters or having more children is a problem. It's simply setting the scene.",
  "takeaway": "Humanity is growing, and the story turns to what people are doing."
 },
 "2": {
  "scene": "The 'sons of God' see that the 'daughters of humans' are beautiful and take wives from among them.",
  "breakdown": "This is one of the Bible's debated passages. Some readers understand the 'sons of God' as heavenly beings; others see powerful rulers or a particular line of men. Genesis doesn't pause to identify them beyond dispute. What it does describe is men seeing women they desire and taking wives, language that raises questions about power and boundaries. We should not build a confident story from details the verse leaves unexplained.",
  "takeaway": "The passage describes troubling unions, but the identity of the 'sons of God' is disputed."
 },
 "3": {
  "scene": "The LORD says His Spirit will not contend with humanity forever and mentions 120 years.",
  "breakdown": "God responds to the direction human life is taking. The Hebrew wording translated 'contend,' 'strive,' or 'remain' is difficult, so Bibles phrase it differently. The 120 years may be understood as a period before judgment or as a limit connected with human life; interpreters disagree. The clear warning is that God will not allow the situation to continue without limit.",
  "takeaway": "God announces a limit, though the exact meaning of the 120 years is debated."
 },
 "4": {
  "scene": "Genesis mentions the Nephilim in those days, alongside the offspring of the unions just described.",
  "breakdown": "People have all kinds of theories about the Nephilim. The Hebrew name is often left untranslated, and the verse associates them with ancient mighty men, men of renown. It does not give us a detailed explanation of their size, appearance, or ancestry that settles every question. We can acknowledge the mystery without turning it into a made-up adventure story.",
  "takeaway": "The Nephilim are mentioned, but the verse leaves major questions unanswered."
 },
 "5": {
  "scene": "The LORD sees that human wickedness is great and that people's thoughts keep turning toward evil.",
  "breakdown": "Now Genesis tells us plainly why judgment is coming. The problem isn't simply that people are numerous or that strange figures have appeared. God sees deep, widespread wickedness: even the intentions forming in people's hearts are described as continually evil. This verse brings the focus back to human choices and corruption.",
  "takeaway": "The central problem is how deeply evil has taken hold of human life."
 },
 "6": {
  "scene": "The LORD is grieved that He made humanity on the earth.",
  "breakdown": "This is strong, personal language. Genesis doesn't picture God looking at evil with indifference. It says He is grieved to His heart. Different theological traditions explain God's 'regret' in different ways, but we shouldn't flatten the verse into 'God made a mistake.' The passage is showing how seriously God regards what humanity has become.",
  "takeaway": "Human wickedness brings deep grief in the way Genesis describes God's response."
 },
 "7": {
  "scene": "The LORD declares that He will wipe out people and land animals, creeping things, and birds from the face of the ground.",
  "breakdown": "The judgment announced here is severe. The destruction reaches beyond people to other living creatures, showing how far the consequences of human corruption spread in the story. This is not a small correction or a harmless warning. Genesis wants us to feel the weight of what is coming.",
  "takeaway": "God announces a devastating judgment on life across the land."
 },
 "8": {
  "scene": "Noah finds favor in the eyes of the LORD.",
  "breakdown": "After the dark announcement, this short sentence changes the direction of the story. One man is singled out as finding God's favor. That doesn't mean the chapter says Noah is flawless. It means the flood account will not be only about destruction; it will also tell how God preserves life.",
  "takeaway": "Noah receives God's favor amid widespread corruption."
 },
 "9": {
  "scene": "Genesis introduces Noah's family account and describes him as righteous, blameless in his generation, and walking with God.",
  "breakdown": "This is a closer introduction to Noah, not a claim that he never made a mistake. 'Blameless' here describes his integrity in the setting of his generation. And 'walked with God' should sound familiar from Enoch in chapter 5. Noah stands out because his life takes a different direction from the violence around him.",
  "takeaway": "Noah is described as a man of integrity who walks with God."
 },
 "10": {
  "scene": "Noah has three sons: Shem, Ham, and Japheth.",
  "breakdown": "We heard these names at the end of chapter 5. Genesis repeats them because the sons and their families are going to matter when the flood comes and when life begins again afterward. For now, the verse makes sure we know who's in Noah's immediate family.",
  "takeaway": "Noah's three sons are part of the family the story will follow."
 },
 "11": {
  "scene": "The earth is corrupt before God and filled with violence.",
  "breakdown": "The chapter has already told us people's hearts are bent toward evil. Now it names what that looks like in the world: corruption and violence. The issue isn't just private thoughts. People are hurting one another, and the whole society is described as damaged.",
  "takeaway": "Violence and corruption have spread across the earth."
 },
 "12": {
  "scene": "God sees that the earth is corrupt because all flesh has corrupted its way.",
  "breakdown": "Genesis repeats the word 'corrupt' so we don't miss how serious the situation is. 'All flesh' is a broad expression in this context, and the verse describes the world's way of life as ruined. Noah has already been singled out, so we shouldn't force the phrase to mean absolutely every individual behaved identically.",
  "takeaway": "God sees how thoroughly the world has gone wrong."
 },
 "13": {
  "scene": "God tells Noah that He has decided to bring an end to all flesh because the earth is full of violence.",
  "breakdown": "This is the moment Noah hears what is coming. God names violence as the reason and announces destruction. The Hebrew can be rendered 'the end of all flesh has come before me.' The next instructions aren't random boat-building tips; they are God's provision in the face of the judgment He has announced.",
  "takeaway": "God tells Noah the reason for the coming destruction."
 },
 "14": {
  "scene": "God tells Noah to make an ark of gopher wood, with rooms, and coat it inside and outside with pitch.",
  "breakdown": "Now the rescue plan becomes practical. Noah is told to build a large vessel, divide it into spaces, and seal it so water cannot easily get in. Nobody knows with certainty what kind of wood the Hebrew word 'gopher' identifies. The important point is that God gives Noah real construction instructions, not just a vague promise of safety.",
  "takeaway": "God gives Noah specific instructions for a vessel that will preserve life."
 },
 "15": {
  "scene": "God gives the ark's measurements: 300 cubits long, 50 cubits wide, and 30 cubits high.",
  "breakdown": "Those numbers tell us this is a massive structure, not a little rowboat. A cubit was an ancient unit based roughly on the length of a forearm, and its exact length could vary. Rather than pretend we know one perfect modern measurement, we can see the proportions Genesis gives: very long, much narrower, and tall enough for several levels.",
  "takeaway": "The ark is described with specific, large-scale dimensions."
 },
 "16": {
  "scene": "God tells Noah to make an opening near the top, put a door in the side, and build three levels.",
  "breakdown": "The instructions continue with how the ark will be arranged. English translations differ on whether the Hebrew describes a roof, a window, or an opening near the top. But the door in the side and the lower, second, and third levels are clear. The vessel is being designed to hold its passengers and supplies.",
  "takeaway": "The ark has an entrance and three levels, with a debated detail near the top."
 },
 "17": {
  "scene": "God says He will bring floodwaters to destroy living creatures under heaven that have the breath of life.",
  "breakdown": "Now God names the disaster: a flood. The verse uses sweeping language about the creatures that breathe and live on the earth. This is the judgment the earlier verses prepared us for. Genesis doesn't describe it as a natural accident that catches God by surprise; in the story, God announces it beforehand.",
  "takeaway": "God tells Noah that a deadly flood is coming."
 },
 "18": {
  "scene": "God promises to establish His covenant with Noah and tells him to enter the ark with his wife, sons, and daughters-in-law.",
  "breakdown": "Here's the promise of preservation alongside the warning of judgment. God says He will establish His covenant with Noah, though the fuller covenant language comes later in the flood story. Noah isn't told to go in alone. His household is named as part of the plan to survive.",
  "takeaway": "God promises a covenant and includes Noah's family in the rescue."
 },
 "19": {
  "scene": "God tells Noah to bring two of every kind of living creature into the ark, male and female.",
  "breakdown": "The goal is to keep living creatures alive through the flood. This verse gives the broad instruction: pairs of animals, male and female. Chapter 7 will add more detailed instructions about some animals, so we shouldn't act as though this verse is the only word on the numbers.",
  "takeaway": "The ark is meant to preserve animal life as well as human life."
 },
 "20": {
  "scene": "Birds, livestock, and ground-moving creatures will come to Noah in pairs to be kept alive.",
  "breakdown": "The verse names different groups of animals so we understand the scope of the rescue. It also says they will come to Noah. The focus isn't on Noah chasing every creature across the world; the text presents their arrival as part of what God has arranged.",
  "takeaway": "Different kinds of creatures are to be kept alive in the ark."
 },
 "21": {
  "scene": "God tells Noah to gather food for himself, his family, and the animals.",
  "breakdown": "A boat full of living creatures will need food. God doesn't skip that ordinary practical need. Noah must collect and store provisions for the people and animals who will be inside. The rescue involves preparation and responsibility, not just waiting for a miracle.",
  "takeaway": "Noah must prepare food for everyone who will be on the ark."
 },
 "22": {
  "scene": "Noah does everything God commands him.",
  "breakdown": "After all the warnings and detailed instructions, Genesis gives us Noah's response. He obeys. The verse doesn't describe every swing of a hammer or every step of gathering supplies; it sums up his response to God's word. That's the note the chapter ends on before the flood story continues.",
  "takeaway": "Noah responds to God's instructions with obedience."
 }
};
const plainGenesisSeven:Record<number,PlainVerseStudy>={
 "1": {
  "scene": "The LORD tells Noah to enter the ark with his household because Noah has been found righteous in his generation.",
  "breakdown": "The ark has been built, and now God tells Noah it's time to go inside. Notice that Noah isn't going in alone: his family is included. God also explains why Noah stands out in this generation. This doesn't mean Noah never made a mistake; it means his way of living is different from the corruption described in chapter 6.",
  "takeaway": "God calls Noah and his household into the ark."
 },
 "2": {
  "scene": "God tells Noah to take seven pairs of every clean animal and one pair of animals that are not clean.",
  "breakdown": "Chapter 6 gave the broad instruction to preserve animals in pairs. Here God gives more detail: the clean animals are to be brought in greater numbers than the others. The Hebrew wording about the sevens has been translated in different ways, but the contrast is clear. We shouldn't pretend this verse contradicts chapter 6 just because it adds detail.",
  "takeaway": "God provides for extra clean animals alongside the other animals."
 },
 "3": {
  "scene": "God tells Noah to take seven pairs of birds so their offspring can continue across the earth.",
  "breakdown": "The instructions extend to birds. More than one pair is to be preserved, and the reason is stated plainly: life must continue after the flood. The point isn't collecting animals for display. It's keeping living creatures from disappearing.",
  "takeaway": "The birds are preserved so they can multiply after the flood."
 },
 "4": {
  "scene": "God says that in seven days He will send rain for forty days and forty nights and wipe out living creatures from the ground.",
  "breakdown": "Now Noah is given a countdown. He has seven days before the rain starts, and the rain will last forty days and nights. The warning is severe: the flood will bring widespread destruction. God is not leaving Noah to guess when to act.",
  "takeaway": "The flood is coming soon, and Noah is given a clear warning."
 },
 "5": {
  "scene": "Noah does everything the LORD commands him.",
  "breakdown": "After hearing what is about to happen, Noah follows God's instructions. The verse is short because the point is simple: Noah responds with obedience. That doesn't make the coming flood easy or pleasant; it shows how Noah acts in the face of God's warning.",
  "takeaway": "Noah obeys the instructions he has received."
 },
 "6": {
  "scene": "Noah is 600 years old when the floodwaters come upon the earth.",
  "breakdown": "Genesis now gives Noah's age when the flood begins. That number anchors the event in the family record we've been following since chapter 5. The story is moving from preparation to the disaster itself.",
  "takeaway": "The flood begins when Noah is 600 years old."
 },
 "7": {
  "scene": "Noah enters the ark with his wife, his sons, and his sons' wives to escape the floodwaters.",
  "breakdown": "This verse shows the family actually doing what God told them to do. Noah's wife, Shem, Ham, Japheth, and their wives are all included. The ark is not only about saving Noah as one individual; his household is being preserved too.",
  "takeaway": "Noah's family enters the ark for safety."
 },
 "8": {
  "scene": "Clean animals, animals that are not clean, birds, and ground-moving creatures are included.",
  "breakdown": "The account names the groups of animals so we understand the range of life being preserved. The clean-and-unclean distinction was already mentioned in the instructions. Here the story is showing those instructions being carried out.",
  "takeaway": "Different kinds of animals are included in the rescue."
 },
 "9": {
  "scene": "Animals come to Noah in male-and-female pairs and enter the ark as God commanded.",
  "breakdown": "Genesis focuses on the creatures coming into the ark, not on Noah chasing them down. Male and female are mentioned because the animals are meant to survive and reproduce. The wording echoes the instructions God gave earlier.",
  "takeaway": "The animals enter the ark according to God's command."
 },
 "10": {
  "scene": "After seven days, the floodwaters come upon the earth.",
  "breakdown": "The waiting period God announced in verse 4 is over. The story has moved from warning and preparation to the arrival of the flood. That short line carries a lot of weight: the disaster Noah was told about is now happening.",
  "takeaway": "The seven-day warning ends, and the flood arrives."
 },
 "11": {
  "scene": "The flood begins on the seventeenth day of the second month in Noah's six-hundredth year; the deep and the heavens release water.",
  "breakdown": "Genesis gives a precise date within Noah's life and describes water coming from below and above. The 'fountains of the great deep' burst open, and the 'windows of heaven' open. That's the language the ancient text uses to picture the flood; it isn't giving us a modern plumbing diagram of the earth.",
  "takeaway": "The floodwaters break out from below and pour down from above."
 },
 "12": {
  "scene": "Rain falls on the earth for forty days and forty nights.",
  "breakdown": "The rain continues for the full period God announced. Forty days and nights is not a quick storm that passes by morning. It's a sustained downpour, and the floodwaters will keep rising as the chapter goes on.",
  "takeaway": "The rain continues for forty days and nights."
 },
 "13": {
  "scene": "On that very day Noah, his wife, their three sons, and their sons' wives enter the ark.",
  "breakdown": "The family is named again, and the phrase 'on that very day' ties their entrance to the flood's arrival. Genesis has already said they entered, so this is a more detailed retelling of the same event, not necessarily a second trip in and out.",
  "takeaway": "The account emphasizes that Noah's whole household is inside the ark."
 },
 "14": {
  "scene": "The animals enter the ark according to their kinds: wild animals, livestock, ground-moving creatures, and birds.",
  "breakdown": "Genesis repeats the different animal groups to show that the ark contains more than one sort of creature. 'According to their kinds' is the text's way of describing the varieties of living things. It isn't a technical lesson in modern biological classification.",
  "takeaway": "The ark receives a wide range of living creatures."
 },
 "15": {
  "scene": "The creatures enter in male-and-female pairs, as God commanded Noah.",
  "breakdown": "The repeated phrase matters because it connects what happens to what God told Noah earlier. The animals are entering in pairs for preservation. The focus is on the instructions being fulfilled as the flood approaches.",
  "takeaway": "The animals enter as God instructed."
 },
 "16": {
  "scene": "The animals enter, and the LORD shuts Noah in.",
  "breakdown": "This is one of the chapter's striking moments. Noah has followed the instructions, and now the LORD closes the ark behind him. The text doesn't describe Noah pulling the door shut himself. It emphasizes God's action at the moment the family and animals are sealed inside.",
  "takeaway": "God shuts the ark, marking the start of their time inside."
 },
 "17": {
  "scene": "The flood continues for forty days, and rising water lifts the ark off the ground.",
  "breakdown": "Now we see the ark doing what it was built to do. As the water rises, the vessel lifts and begins floating. The family and animals are inside while the land they knew disappears beneath the floodwaters.",
  "takeaway": "The rising floodwaters lift the ark."
 },
 "18": {
  "scene": "The waters grow stronger and deeper, and the ark floats on the surface.",
  "breakdown": "The flood is no longer just water collecting around the ark. The waters are rising and prevailing across the earth, and the ark moves on top of them. The same water that destroys life outside carries the vessel holding the survivors.",
  "takeaway": "The ark remains afloat as the waters rise."
 },
 "19": {
  "scene": "The waters rise so high that the mountains under the heavens are covered.",
  "breakdown": "Genesis uses sweeping language to describe the reach of the flood. The account presents the waters as covering even the high mountains. Readers debate how to relate this description to geography and geology today, but we should first let the verse say what it says in the story.",
  "takeaway": "The flood is described as covering even the mountains."
 },
 "20": {
  "scene": "The waters cover the mountains by fifteen cubits.",
  "breakdown": "The verse gives a measurement to show how far the water has risen above the mountains. A cubit was an ancient measure based roughly on a forearm, and its exact length could vary. The point isn't to force a single modern number into the verse; it's that the water has risen beyond the mountain heights described.",
  "takeaway": "The floodwaters are described as rising above the mountains."
 },
 "21": {
  "scene": "Land creatures, birds, livestock, wild animals, crawling creatures, and people die in the flood.",
  "breakdown": "This is the hardest part of the chapter to read. Genesis lists the living things overtaken by the flood, including human beings. The judgment described in chapter 6 is now happening. We shouldn't soften it into a harmless children's story about a boat and some animals.",
  "takeaway": "The flood brings devastating loss of life outside the ark."
 },
 "22": {
  "scene": "Everything on dry land with the breath of life in its nostrils dies.",
  "breakdown": "This verse narrows the picture to creatures that breathe air and live on dry ground. It reinforces how complete the destruction is in the story. The wording doesn't require us to claim that every fish in the sea died; the verse is specifically talking about life on dry land.",
  "takeaway": "Breathing life on dry land is overtaken by the flood."
 },
 "23": {
  "scene": "God wipes out living things from the face of the ground, while Noah and those with him in the ark remain.",
  "breakdown": "The verse brings judgment and preservation together. People and land creatures outside are wiped away, but Noah's household and the creatures in the ark survive. That's the painful contrast running through this chapter: destruction outside, life preserved inside.",
  "takeaway": "Noah and those with him survive while life outside is destroyed."
 },
 "24": {
  "scene": "The floodwaters prevail on the earth for 150 days.",
  "breakdown": "The chapter ends with a longer stretch of time. The rain lasted forty days and nights, but the waters remain dominant for 150 days. Those aren't necessarily two separate periods to add together; Genesis is describing different parts of the flood's timeline. The next chapter will tell how the waters begin to recede.",
  "takeaway": "The floodwaters remain high long after the rain begins."
 }
};
const plainGenesisEight:Record<number,PlainVerseStudy>={
 "1": {
  "scene": "God remembers Noah and the animals with him in the ark, and sends a wind across the earth so the waters begin to go down.",
  "breakdown": "When Genesis says God 'remembered' Noah, it doesn't mean Noah slipped God's mind. In Bible language, remembering often means turning attention toward someone and acting on their behalf. The same God who brought the flood now sends a wind over the waters. After all that time shut inside the ark, the story finally turns toward relief.",
  "takeaway": "God acts to preserve Noah and begin bringing the flood to an end."
 },
 "2": {
  "scene": "The fountains of the deep and the windows of heaven close, and the rain is held back.",
  "breakdown": "Chapter 7 described water bursting up from below and pouring down from above. Now those sources are shut. The rain stops, but that doesn't mean the earth is instantly dry. There is still an enormous amount of water that has to recede.",
  "takeaway": "The sources of the floodwaters are stopped."
 },
 "3": {
  "scene": "The waters steadily retreat from the earth, and after 150 days they have decreased.",
  "breakdown": "The flood isn't undone in a moment. Genesis describes the water gradually pulling back. The 150 days connect with the period mentioned at the end of chapter 7; we shouldn't automatically add them as if the story is talking about two separate stretches of 150 days.",
  "takeaway": "The floodwaters begin a long, gradual retreat."
 },
 "4": {
  "scene": "The ark comes to rest on the mountains of Ararat on the seventeenth day of the seventh month.",
  "breakdown": "At last the ark stops drifting. Notice that Genesis says the 'mountains of Ararat,' not the single modern peak people often call Mount Ararat. Ararat is the name of a wider region in the biblical world. The verse tells us where the ark rests in broad terms, not an exact location we can prove today.",
  "takeaway": "The ark comes to rest in the mountains of Ararat."
 },
 "5": {
  "scene": "The waters keep dropping, and on the first day of the tenth month the mountaintops become visible.",
  "breakdown": "The ark has already come to rest, but the water is still high. Now the tops of mountains begin showing above it. That's another sign of progress, yet it doesn't mean Noah can safely walk out. The land is emerging little by little.",
  "takeaway": "More land appears as the water continues to fall."
 },
 "6": {
  "scene": "After forty days, Noah opens the window he made in the ark.",
  "breakdown": "Noah has been waiting through a long flood and a slow retreat of the waters. Now he opens a window. The verse doesn't say he's leaving the ark yet. He's about to send out birds to find out more about the conditions outside.",
  "takeaway": "Noah begins checking what the world outside is like."
 },
 "7": {
  "scene": "Noah sends out a raven, which keeps going back and forth until the waters dry up.",
  "breakdown": "The raven is the first bird Noah releases. The text says it goes out and moves about as the waters continue to recede. It doesn't give us a detailed account of where the raven lands or what it eats. We don't need to invent those details to understand that Noah is watching for signs of change.",
  "takeaway": "Noah releases a raven while the earth is still drying."
 },
 "8": {
  "scene": "Noah sends out a dove to see whether the waters have gone down from the ground.",
  "breakdown": "The dove has a specific purpose in the story: Noah wants to know whether the water has receded enough for the land to be usable. He can't simply see everything from inside the ark. Sending the bird is one way he checks the conditions.",
  "takeaway": "Noah uses the dove to test whether the land is emerging."
 },
 "9": {
  "scene": "The dove finds nowhere to rest and returns to the ark; Noah brings it back inside.",
  "breakdown": "The dove comes back because water still covers the surface of the ground, leaving no suitable resting place for it. Noah reaches out and takes the bird back into the ark. That's a small, vivid scene: the world outside isn't ready yet, and the dove returns to safety.",
  "takeaway": "The dove's return shows the land is not yet ready."
 },
 "10": {
  "scene": "Noah waits seven more days and sends the dove out again.",
  "breakdown": "Instead of rushing out because the water has started dropping, Noah waits and checks again. The verse gives a seven-day interval between the dove's trips. The story is moving forward, but carefully, one sign at a time.",
  "takeaway": "Noah waits before checking the land again."
 },
 "11": {
  "scene": "The dove returns in the evening with a freshly plucked olive leaf in its beak.",
  "breakdown": "Now Noah receives a different sign. The olive leaf shows that vegetation is accessible outside the ark. It's an encouraging moment, but it doesn't mean the ground is already dry enough for everyone to leave. Noah understands from the leaf that the waters have gone down.",
  "takeaway": "The olive leaf shows that the waters have receded further."
 },
 "12": {
  "scene": "Noah waits another seven days and sends out the dove, which does not return.",
  "breakdown": "This time the bird stays away. That's a stronger sign that conditions outside have changed. Still, Genesis doesn't say Noah immediately opens the door and leads everyone out. The story keeps a distinction between signs of drying land and God's later command to leave.",
  "takeaway": "The dove's failure to return suggests the land can now support it."
 },
 "13": {
  "scene": "In Noah's 601st year, on the first day of the first month, the surface of the ground is drying; Noah removes the ark's covering and looks out.",
  "breakdown": "The date shows how long this whole experience has lasted. Noah removes the covering and sees the ground drying. But there's a difference between the surface looking dry and the earth being fully dry. The next verse gives a later date for that.",
  "takeaway": "Noah sees drying ground, but the time to leave has not yet come."
 },
 "14": {
  "scene": "By the twenty-seventh day of the second month, the earth is dry.",
  "breakdown": "Genesis gives another date, later than the one in verse 13. The drying process is complete enough for the story to move on. The waiting has been long, and now the conditions outside are different from when the ark first came to rest.",
  "takeaway": "The earth has dried after the flood."
 },
 "15": {
  "scene": "God speaks to Noah again.",
  "breakdown": "This short verse matters because Noah doesn't decide everything based only on what he can see through the window. God is about to give the instruction that ends their time inside the ark. After so much waiting, a new command comes.",
  "takeaway": "God speaks at the moment the family is ready to leave."
 },
 "16": {
  "scene": "God tells Noah to come out of the ark with his wife, his sons, and their wives.",
  "breakdown": "The same household that entered together is now told to leave together. The verse makes it clear that surviving the flood isn't the end of their story. They're being sent back into the world to live there again.",
  "takeaway": "God tells Noah and his family to leave the ark."
 },
 "17": {
  "scene": "God tells Noah to bring out the animals so they can spread across the earth and multiply.",
  "breakdown": "The rescue wasn't only about keeping creatures alive inside a boat. It was about life continuing afterward. Birds, livestock, and ground-moving creatures are to come out and reproduce across the earth. The language echoes the blessing of multiplying from the creation account.",
  "takeaway": "The animals are released so life can spread again."
 },
 "18": {
  "scene": "Noah comes out of the ark with his sons, his wife, and his sons' wives.",
  "breakdown": "Noah follows God's command. The family that spent the flood inside the ark steps out into a changed world. Genesis doesn't give us their first conversations or describe every feeling they had. It simply shows them leaving as instructed.",
  "takeaway": "Noah and his household leave the ark."
 },
 "19": {
  "scene": "The animals and birds come out of the ark, each according to its kind.",
  "breakdown": "The living creatures also leave the ark. The repeated mention of their kinds connects the scene back to God's instructions for preserving them. What was kept alive through the flood is now returning to life on the land.",
  "takeaway": "The preserved creatures come out into the world."
 },
 "20": {
  "scene": "Noah builds an altar to the LORD and offers burnt offerings from clean animals and clean birds.",
  "breakdown": "The first action Genesis records from Noah after leaving the ark is worship. He builds an altar and makes offerings from animals described as clean. This also helps explain why chapter 7 included extra clean animals. The text doesn't say Noah is paying God back for rescue; it presents his response through sacrifice.",
  "takeaway": "Noah responds to his survival by offering worship to the LORD."
 },
 "21": {
  "scene": "The LORD smells the pleasing aroma and says in His heart that He will not again curse the ground because of humanity, or strike down every living thing as He has done.",
  "breakdown": "The language of a 'pleasing aroma' describes God's favorable reception of the offering in a way people can understand. But notice something surprising: God says the human heart is inclined toward evil from youth. Humanity hasn't suddenly become perfect. Even so, God declares He will not repeat this kind of sweeping destruction. The wording about cursing the ground needs to be read with the next chapter's covenant, not treated as a promise that all suffering or judgment has ended.",
  "takeaway": "God declares He will not repeat the flood's destruction of living things."
 },
 "22": {
  "scene": "God says that while the earth remains, seedtime and harvest, cold and heat, summer and winter, day and night will not cease.",
  "breakdown": "After the flood disrupted the world, God promises the continuing rhythms people depend on. Planting and harvesting, changing seasons, and day and night will go on while the earth endures. That doesn't mean every harvest will be easy or every season gentle. It means the ordinary cycles of life will continue.",
  "takeaway": "God promises the ongoing rhythms that make life on earth possible."
 }
};
const plainGenesisNine:Record<number,PlainVerseStudy>={
 "1": {
  "scene": "God blesses Noah and his sons and tells them to have children, multiply, and fill the earth.",
  "breakdown": "The flood is over, and God speaks to the family that survived. His words echo the blessing given to humanity in Genesis 1. The world has changed dramatically, but God's purpose for human life to continue hasn't disappeared. Noah's family is being sent into a new beginning.",
  "takeaway": "God blesses Noah's family and calls them to fill the earth."
 },
 "2": {
  "scene": "God says the animals, birds, and fish will fear human beings and be placed in their hands.",
  "breakdown": "The relationship between people and other creatures is described differently from the peaceful picture at the start of Genesis. Fear and dread are now part of it. The phrase about animals being given into human hands speaks of human authority over them, but it doesn't mean cruelty is approved.",
  "takeaway": "Humanity's relationship with animals now includes fear and authority."
 },
 "3": {
  "scene": "God gives people living creatures for food, just as He had given plants.",
  "breakdown": "In Genesis 1, the food instructions emphasized plants. Here God explicitly permits people to eat animals too. That is a change in what the story allows, not a command that everyone must eat meat. The next verse immediately places a boundary on how animal life is treated.",
  "takeaway": "God permits eating animals, with an important restriction to follow."
 },
 "4": {
  "scene": "God forbids eating meat with its lifeblood still in it.",
  "breakdown": "Even when animals may be used for food, their blood is treated with special seriousness because it represents life. The instruction is about not consuming the blood along with the flesh. Later Torah laws will return to this connection between blood and life in greater detail.",
  "takeaway": "Permission to eat meat does not erase respect for life."
 },
 "5": {
  "scene": "God says He will require an accounting for human lifeblood, whether shed by an animal or another person.",
  "breakdown": "The subject shifts from animal blood to human blood. God says the taking of human life will be answered for; neither animals nor people are outside that concern. This is the lead-in to the next verse, which explains why human life must be treated with such seriousness.",
  "takeaway": "God holds the taking of human life accountable."
 },
 "6": {
  "scene": "God declares that whoever sheds human blood will have their blood shed, because God made humanity in His image.",
  "breakdown": "The verse ties the gravity of murder directly to human dignity. Human beings bear God's image, so taking a human life is no small offense. The wording has long been read as establishing a principle of justice for murder, though how societies apply punishment raises further questions. It is not a license for private revenge.",
  "takeaway": "Human life is precious because people are made in God's image."
 },
 "7": {
  "scene": "God again tells Noah and his sons to multiply and spread across the earth.",
  "breakdown": "The command to fill the earth appears again after the warning about bloodshed. God isn't only setting limits on violence; He is also calling this family to build life beyond the ark. The repetition connects Noah's new beginning to humanity's original calling.",
  "takeaway": "God wants human life to continue and spread."
 },
 "8": {
  "scene": "God speaks to Noah and his sons.",
  "breakdown": "This short verse introduces a major promise. The next lines aren't Noah bargaining for safety; God is the one speaking and taking the initiative. That matters because the covenant is presented as something God establishes.",
  "takeaway": "God initiates the covenant that follows."
 },
 "9": {
  "scene": "God says He is establishing His covenant with Noah, his sons, and their descendants.",
  "breakdown": "The promise reaches beyond the people standing there. Noah's future descendants are included too. A covenant is a binding commitment, and here God says He is making one with the family through whom human life will continue.",
  "takeaway": "God's covenant includes future generations."
 },
 "10": {
  "scene": "God extends His covenant to the birds, livestock, wild animals, and every living creature that came out of the ark.",
  "breakdown": "This promise is not only for people. The animals that survived the flood are also named. Genesis treats the living world as part of what God is committing to preserve. That's easy to miss if we think the covenant is only about Noah and his sons.",
  "takeaway": "God includes living creatures in His covenant."
 },
 "11": {
  "scene": "God promises never again to destroy all flesh by flood or send a flood to destroy the earth.",
  "breakdown": "Here is the heart of the promise. God isn't saying there will never be another storm, local flood, or act of judgment. He is promising not to repeat the kind of world-destroying flood described in these chapters. The wording is broad because the judgment just described was broad.",
  "takeaway": "God promises not to repeat the flood's sweeping destruction."
 },
 "12": {
  "scene": "God introduces a sign of the covenant between Himself and every living creature for generations to come.",
  "breakdown": "God doesn't leave the promise as words alone. He announces a visible sign that will point back to the covenant. The sign is meant to matter beyond Noah's lifetime, because the promise itself extends to future generations.",
  "takeaway": "The covenant will have a sign for generations to come."
 },
 "13": {
  "scene": "God says He has set His bow in the clouds as the sign of His covenant with the earth.",
  "breakdown": "The Hebrew word for 'bow' can also mean a weapon used by an archer. Here it refers to the rainbow seen in the clouds. Readers sometimes connect the image to a bow set aside after conflict, but the verse itself focuses on its role as a covenant sign. It reminds us of God's promise concerning the earth.",
  "takeaway": "The rainbow is named as the sign of God's covenant."
 },
 "14": {
  "scene": "God says that when He brings clouds over the earth, the bow will appear in them.",
  "breakdown": "Clouds might remind Noah's family of the flood they survived. God now points to something they can see in the clouds as a sign of His promise. The verse doesn't say rain itself has become harmless; it says the bow will be a reminder of the covenant.",
  "takeaway": "The rainbow appears in the clouds as a covenant sign."
 },
 "15": {
  "scene": "God says He will remember His covenant and the waters will never again become a flood that destroys all flesh.",
  "breakdown": "Just as God 'remembered' Noah in chapter 8, remembering here is not about a forgetful God needing a reminder. It is covenant language: God commits to act consistently with His promise. The rainbow points to that commitment whenever flood fears come to mind.",
  "takeaway": "God commits to keeping His promise not to repeat the great flood."
 },
 "16": {
  "scene": "God says He will see the bow and remember the everlasting covenant with every living creature on earth.",
  "breakdown": "The promise is called everlasting, and its scope is repeated: every living creature. Notice that the sign is described as something God sees. Genesis is stressing God's faithfulness to the covenant, not claiming that the rainbow works like a magical shield against every disaster.",
  "takeaway": "The rainbow points to an enduring promise that includes all living creatures."
 },
 "17": {
  "scene": "God tells Noah that the bow is the sign of the covenant He has established with all flesh on earth.",
  "breakdown": "This verse closes the covenant speech by repeating the main point. The sign belongs to God's promise to the living world. The repetition helps make it unmistakable: the covenant isn't a private agreement with Noah alone.",
  "takeaway": "The rainbow marks God's covenant with all living things."
 },
 "18": {
  "scene": "Noah's sons who leave the ark are Shem, Ham, and Japheth; Ham is identified as Canaan's father.",
  "breakdown": "The story turns from the covenant to Noah's family. The three sons are named again, but now Genesis adds a detail: Ham is the father of Canaan. That detail prepares us for the difficult family incident later in the chapter. It does not make Canaan responsible for something before the story even tells us what happened.",
  "takeaway": "Ham's connection to Canaan prepares us for the next part of the story."
 },
 "19": {
  "scene": "Genesis says these three men are Noah's sons and that the earth's people spread from them.",
  "breakdown": "The focus widens from one household to future populations. Genesis presents the post-flood human family as descending from Noah's three sons. The next chapter will trace their descendants in more detail. This verse is a bridge from the ark story to the family lines that follow.",
  "takeaway": "Noah's sons become the starting point for the post-flood family record."
 },
 "20": {
  "scene": "Noah begins working the soil and plants a vineyard.",
  "breakdown": "Noah's life after the flood includes ordinary work. He becomes a farmer and grows grapes. The verse doesn't condemn farming or vineyards; those details simply set up the incident that follows. After the enormous events of the flood, the story returns to a household and a field.",
  "takeaway": "Noah plants a vineyard as life resumes after the flood."
 },
 "21": {
  "scene": "Noah drinks wine, becomes drunk, and lies uncovered inside his tent.",
  "breakdown": "Genesis doesn't hide Noah's failure, even though it earlier called him righteous in his generation. He drinks enough wine to become drunk and is exposed in his tent. The verse describes what happened without giving us every detail of his intentions. Being favored by God hasn't made Noah incapable of doing something shameful.",
  "takeaway": "Noah becomes drunk and is left exposed in his tent."
 },
 "22": {
  "scene": "Ham, the father of Canaan, sees his father's nakedness and tells his two brothers outside.",
  "breakdown": "The text reports that Ham sees Noah uncovered and then tells his brothers. Some interpreters propose that more happened, but this verse doesn't plainly describe a sexual act, and we shouldn't present one as fact. The contrast with what the brothers do next is important: Ham tells others about his father's exposed condition.",
  "takeaway": "Ham sees Noah's exposure and reports it to his brothers."
 },
 "23": {
  "scene": "Shem and Japheth carry a garment backward into the tent and cover their father without looking at him.",
  "breakdown": "The brothers respond differently from Ham. They take care to cover Noah while avoiding a look at his nakedness. Their actions protect their father's dignity even though he is the one who became drunk. The story shows a concrete response to someone's humiliating situation.",
  "takeaway": "Shem and Japheth cover Noah without looking at his exposure."
 },
 "24": {
  "scene": "Noah wakes from his wine and learns what his youngest son has done to him.",
  "breakdown": "Noah comes to himself and becomes aware of what happened while he was drunk. The Hebrew phrase about what his 'youngest son' did has prompted debate, especially because the next words concern Canaan. Genesis does not spell out every step of how Noah learned about it, so we should resist inventing a hidden scene.",
  "takeaway": "Noah learns of the incident and prepares to speak."
 },
 "25": {
  "scene": "Noah pronounces a curse on Canaan, saying he will be a servant of servants to his brothers.",
  "breakdown": "This is a troubling verse because Ham was the one named in the incident, yet Noah's words target Canaan. Genesis does not explain that shift in a way that settles every question. Most importantly, this is not a curse on all people of African descent, and it gives no support to racial slavery. Those claims have been imposed on the text and have caused terrible harm.",
  "takeaway": "Noah curses Canaan; the verse must not be twisted into a racial claim."
 },
 "26": {
  "scene": "Noah blesses the LORD, the God of Shem, and says Canaan will be a servant to Shem.",
  "breakdown": "Noah's words now turn toward Shem. He praises the LORD as Shem's God, then repeats the statement about Canaan's servitude. This is part of Noah's pronouncement about his descendants; it is not a command telling later readers to enslave anyone.",
  "takeaway": "Noah's words favor Shem and continue the pronouncement about Canaan."
 },
 "27": {
  "scene": "Noah asks God to enlarge Japheth and says he will dwell in Shem's tents, while Canaan will serve.",
  "breakdown": "The language about Japheth being enlarged and dwelling in Shem's tents has been understood in more than one way. It may speak of space, prosperity, or shared dwelling; the Hebrew leaves room for discussion. The verse again mentions Canaan's servitude, but it doesn't authorize people today to use ancestry as an excuse to mistreat others.",
  "takeaway": "Noah speaks about Japheth's future in words that allow more than one interpretation."
 },
 "28": {
  "scene": "Noah lives another 350 years after the flood.",
  "breakdown": "The family incident is over, and Genesis returns to the familiar style of the genealogies. It gives the number of years Noah lives after the flood. The verse doesn't describe everything he did during those years; it simply continues the record of his life.",
  "takeaway": "Noah's life continues for centuries after the flood."
 },
 "29": {
  "scene": "Noah's total lifespan is 950 years, and then he dies.",
  "breakdown": "The chapter ends the way many entries in Genesis 5 ended: with a total age and the words 'and he died.' Noah survived the flood, but he did not escape death forever. The story will now follow the generations that came after him.",
  "takeaway": "Noah's long life comes to an end."
 }
};
const plainGenesisTen:Record<number,PlainVerseStudy>={
 "1": {
  "scene": "Genesis begins the family record of Noah's three sons—Shem, Ham, and Japheth—after the flood.",
  "breakdown": "The flood story has ended, and now Genesis follows the families who come afterward. This chapter is often called the Table of Nations because it connects family names with peoples and places. It isn't a modern map or a complete list of every nation that has ever existed. It shows how the biblical story understands the spread of peoples from Noah's family.",
  "takeaway": "The story turns from one surviving family to the peoples who come after them."
 },
 "2": {
  "scene": "Japheth's sons are named: Gomer, Magog, Madai, Javan, Tubal, Meshech, and Tiras.",
  "breakdown": "This first group belongs to Japheth's branch of Noah's family. Some names are also known from later biblical references to peoples or regions, but identifying every name with a precise modern country would go beyond what this verse says. For now, the point is that Japheth's line branches into several groups.",
  "takeaway": "Japheth's family line begins with seven named sons."
 },
 "3": {
  "scene": "Gomer's sons are Ashkenaz, Riphath, and Togarmah.",
  "breakdown": "Genesis takes one of Japheth's sons, Gomer, and lists three of his descendants. These names also appear in later biblical material, though their exact ancient locations aren't always certain. We don't need to turn each one into a confident modern ethnic label to understand the family record.",
  "takeaway": "Gomer's branch of Japheth's family is traced further."
 },
 "4": {
  "scene": "Javan's sons or associated peoples are Elishah, Tarshish, Kittim, and Dodanim.",
  "breakdown": "The names in this verse point toward groups associated with Javan's line, often connected with the Mediterranean world. The last name has a textual variation: some ancient witnesses read 'Rodanim' rather than 'Dodanim.' That's a manuscript difference, not a reason to invent two separate stories. The passage is mapping relationships among ancient peoples.",
  "takeaway": "Javan's branch includes several groups, with a textual variation in one name."
 },
 "5": {
  "scene": "From these descendants, coastland peoples spread into their lands, each with its own language, clan, and nation.",
  "breakdown": "Now Genesis explains why it's listing names. These families are becoming distinct peoples who live in different places and speak different languages. Chapter 11 will tell the story of Babel, so this chapter is giving us the broad picture before that later explanation. Biblical storytelling doesn't always present events in strict chronological order.",
  "takeaway": "The family lines develop into peoples with their own lands and languages."
 },
 "6": {
  "scene": "Ham's sons are Cush, Egypt, Put, and Canaan.",
  "breakdown": "The record now moves to Ham's family. Some Bible translations use 'Mizraim' for Egypt, preserving the Hebrew name. These names can refer to ancestors and to peoples or regions associated with them. We should read them as part of an ancient family-and-nations record, not as labels for modern racial categories.",
  "takeaway": "Ham's branch is introduced through four named sons."
 },
 "7": {
  "scene": "Cush's sons are Seba, Havilah, Sabtah, Raamah, and Sabteca; Raamah's sons are Sheba and Dedan.",
  "breakdown": "The list follows Cush's line and then takes one more step through Raamah. Several names recur elsewhere in Scripture, sometimes for different people or places, so a matching name doesn't automatically mean the same individual. The verse is showing how one branch divides into smaller branches.",
  "takeaway": "Cush's descendants are listed across two generations."
 },
 "8": {
  "scene": "Cush fathers Nimrod, who becomes a mighty figure on the earth.",
  "breakdown": "The chapter pauses its usual list of names to introduce Nimrod. That tells us the narrator wants us to notice him. The verse calls him mighty, but it doesn't yet tell us exactly what kind of man he was or invite us to invent a full biography from his name.",
  "takeaway": "Nimrod stands out enough for Genesis to pause and describe him."
 },
 "9": {
  "scene": "Nimrod is described as a mighty hunter before the LORD, becoming the subject of a saying.",
  "breakdown": "The Hebrew phrase 'before the LORD' can be understood in more than one way, and readers disagree about whether the description praises Nimrod's strength or carries a darker tone. The verse doesn't settle that debate. What it clearly says is that Nimrod became famous enough for people to use his name in a saying.",
  "takeaway": "Nimrod is remembered for unusual might, though the tone is debated."
 },
 "10": {
  "scene": "The beginning of Nimrod's kingdom includes Babel, Erech, Akkad, and Calneh in the land of Shinar.",
  "breakdown": "Nimrod is now connected with cities and a kingdom, not just hunting. Babel will become especially important in the next chapter. The identification of 'Calneh' is uncertain, and some translations understand that part of the Hebrew differently. The main point is that Genesis places the beginnings of organized rule in this region.",
  "takeaway": "Nimrod's kingdom is associated with major cities in Shinar."
 },
 "11": {
  "scene": "The account connects Assyria and the building of Nineveh, Rehoboth-ir, and Calah with this expanding region.",
  "breakdown": "The Hebrew can be read as saying Nimrod went into Assyria or that Asshur went out and built these cities. Translations differ, so it's best not to claim the builder's identity is beyond question. Nineveh becomes a major city in later biblical history. Here we're watching the record move from families into cities and kingdoms.",
  "takeaway": "The narrative links the region with the rise of important cities, though the Hebrew is debated."
 },
 "12": {
  "scene": "Resen is named between Nineveh and Calah, with a reference to the great city.",
  "breakdown": "The list of cities continues, locating Resen in relation to Nineveh and Calah. The phrase 'the great city' is not completely clear in how it attaches to the names. We don't need to settle that question to understand the verse's role: it finishes this brief look at an important urban region.",
  "takeaway": "The description of Nimrod's region concludes with another city."
 },
 "13": {
  "scene": "Egypt's descendants include the Ludim, Anamim, Lehabim, and Naphtuhim.",
  "breakdown": "This verse uses family language for groups of people. The plural-sounding names are part of how Genesis describes nations and communities developing from earlier ancestors. We aren't given personal stories about each group, and many proposed modern identifications remain uncertain.",
  "takeaway": "Egypt's branch is traced through several named peoples."
 },
 "14": {
  "scene": "The Pathrusim, Casluhim, and Caphtorim are listed, with a note connecting the Philistines to this family line.",
  "breakdown": "This continues the list begun in the previous verse. The Philistines will matter a great deal later in the Bible, so Genesis flags their connection here. The exact relationship among Casluhim, Caphtorim, and the Philistines is discussed because other biblical passages connect the Philistines with Caphtor. We should acknowledge that complexity rather than pretend the wording answers every historical question.",
  "takeaway": "The record introduces peoples connected with Egypt's line, including the Philistines."
 },
 "15": {
  "scene": "Canaan fathers Sidon, his firstborn, and Heth.",
  "breakdown": "Now the focus turns to Canaan, whose name appeared in Noah's words in chapter 9. Sidon is associated with an important coastal city, and Heth is linked with the Hittites in biblical tradition. The verse starts listing the peoples who will be important when Abraham's descendants enter the story.",
  "takeaway": "Canaan's branch begins with Sidon and Heth."
 },
 "16": {
  "scene": "The Jebusites, Amorites, and Girgashites are named among Canaan's descendants.",
  "breakdown": "These are names we'll encounter again when the Bible talks about the land of Canaan. Genesis is introducing them before Israel's later history unfolds. The names identify ancient peoples, not a moral judgment on every individual born among them.",
  "takeaway": "The record names several peoples of Canaan."
 },
 "17": {
  "scene": "The Hivites, Arkites, and Sinites are also listed.",
  "breakdown": "The list continues without telling us personal stories about these groups. That is normal for this chapter: its purpose is to show the spread of peoples, not to describe every culture in detail. Some names are difficult to place precisely on a modern map.",
  "takeaway": "More Canaanite groups are included in the family record."
 },
 "18": {
  "scene": "The Arvadites, Zemarites, and Hamathites are named, and the Canaanite clans later spread out.",
  "breakdown": "Genesis finishes this part of Canaan's family line and says the clans dispersed. That last detail matters: these weren't simply names written in one place forever. The groups spread into different areas as the generations passed.",
  "takeaway": "Canaan's descendants spread into distinct clans and places."
 },
 "19": {
  "scene": "The boundaries of the Canaanites are described from Sidon toward Gerar and Gaza, and toward Sodom, Gomorrah, Admah, Zeboiim, and Lasha.",
  "breakdown": "This verse gives geographical bearings for the Canaanite territory. Some of these places will appear again in Abraham's story, especially Sodom and Gomorrah. The ancient locations of every site aren't equally certain today. The point is to give readers a sense of where these peoples lived in the biblical world.",
  "takeaway": "Genesis places the Canaanite peoples within a described region."
 },
 "20": {
  "scene": "The chapter sums up Ham's descendants by clans, languages, lands, and nations.",
  "breakdown": "This closing line matches the pattern used for Japheth's family. Ham's descendants are not presented as one single undifferentiated people; they are spread among different clans, languages, and lands. The Bible's categories here are about ancient family and people groups, not a hierarchy of human worth.",
  "takeaway": "Ham's family branches into many peoples and places."
 },
 "21": {
  "scene": "Shem is introduced as an ancestor of the children of Eber and as Japheth's brother.",
  "breakdown": "Genesis turns to Shem last, even though he was named first among Noah's sons. This order gives his family line a special place in the story that follows. Eber matters because his descendants will lead toward Abram's family. The Hebrew wording about whether Shem or Japheth is the older brother is debated in translation.",
  "takeaway": "Shem's line is introduced with an emphasis on Eber's descendants."
 },
 "22": {
  "scene": "Shem's sons are Elam, Asshur, Arpachshad, Lud, and Aram.",
  "breakdown": "These names begin the third major branch of Noah's family. Some also name regions or peoples known from the ancient Near East. The genealogy is leading toward Arpachshad's descendants, but the other branches are included too.",
  "takeaway": "Shem's family line begins with five named sons."
 },
 "23": {
  "scene": "Aram's sons are Uz, Hul, Gether, and Mash.",
  "breakdown": "Genesis follows one of Shem's sons, Aram, and names four descendants. Uz may sound familiar from the opening of Job, but a shared name alone doesn't prove we're talking about exactly the same location or person. This is a family record, and the text gives us only the names here.",
  "takeaway": "Aram's branch is traced through four names."
 },
 "24": {
  "scene": "Arpachshad fathers Shelah, and Shelah fathers Eber.",
  "breakdown": "Now we reach the part of Shem's line that Genesis will continue to follow. Eber was mentioned in verse 21, and here we see where he fits in the family sequence. Some ancient textual traditions include an additional name in this line, so genealogies can differ across manuscript traditions. In the Hebrew text followed here, the sequence is Arpachshad, Shelah, then Eber.",
  "takeaway": "The genealogy traces the line leading to Eber."
 },
 "25": {
  "scene": "Eber has two sons, Peleg and Joktan; Peleg's name is connected with a division of the earth in his days.",
  "breakdown": "The name Peleg sounds like a Hebrew word for division, and the verse explains his name through something that happened in his time. What exactly was divided isn't spelled out. Some connect it with the scattering at Babel in chapter 11, but the verse itself doesn't explicitly say so. We can mention that possibility without calling it certain.",
  "takeaway": "Peleg's name is linked to a division whose details are not explained here."
 },
 "26": {
  "scene": "Joktan's descendants include Almodad, Sheleph, Hazarmaveth, and Jerah.",
  "breakdown": "The genealogy now follows Eber's other son, Joktan. These names begin a longer list of his descendants. We aren't given their life stories, so the helpful thing is to keep the family connection clear: these are branches growing out of Joktan's line.",
  "takeaway": "Joktan's descendants begin to be listed."
 },
 "27": {
  "scene": "Hadoram, Uzal, and Diklah are named next among Joktan's descendants.",
  "breakdown": "The list of Joktan's descendants continues. Each name represents another branch in the record, but Genesis doesn't tell us what each person did. Rather than guess, we can follow the sequence and see how broad this family becomes.",
  "takeaway": "More of Joktan's descendants are named."
 },
 "28": {
  "scene": "Obal, Abimael, and Sheba are also listed among Joktan's descendants.",
  "breakdown": "Genesis keeps naming the descendants of Joktan. Sheba also appeared earlier under a different branch in this chapter. Repeated names can refer to different individuals or groups, so we shouldn't assume every occurrence means the same person.",
  "takeaway": "The genealogy continues, including a name that appears elsewhere."
 },
 "29": {
  "scene": "Ophir, Havilah, and Jobab complete the list of Joktan's sons.",
  "breakdown": "These final names close Joktan's branch. Ophir and Havilah will sound familiar from other parts of Scripture, but their exact geographical identifications are debated. The verse's job is to finish the list, not to give a treasure map or modern border chart.",
  "takeaway": "Joktan's family list is brought to a close."
 },
 "30": {
  "scene": "The territory of Joktan's descendants is described from Mesha toward Sephar in the eastern hill country.",
  "breakdown": "After the names, Genesis gives a geographical description. The locations of Mesha and Sephar aren't settled beyond dispute, so we should be cautious about putting a precise modern pin on them. What the verse does show is that Joktan's descendants are associated with a particular stretch of territory.",
  "takeaway": "Joktan's descendants are connected with an eastern region."
 },
 "31": {
  "scene": "The chapter sums up Shem's descendants by families, languages, lands, and nations.",
  "breakdown": "Just as with Japheth and Ham, the record ends by describing clans becoming peoples in different places with different languages. Shem's family is one branch of the larger post-flood world, even though the story will soon focus on his descendants more closely.",
  "takeaway": "Shem's family also spreads into distinct peoples and places."
 },
 "32": {
  "scene": "Genesis concludes that the nations spread across the earth from the families of Noah's sons after the flood.",
  "breakdown": "This is the big picture of the whole chapter. The many names are meant to show how Genesis connects the world's peoples to the family that survived the flood. Chapter 11 will zoom in on Babel and then narrow the family line toward Abram. We don't have to memorize every name to understand the movement: one family becomes many peoples.",
  "takeaway": "The chapter traces the spread of nations from Noah's family."
 }
};
const torahBreakdowns:Partial<Record<string,Record<number,Record<number,PlainVerseStudy>>>>={Genesis:{1:plainGenesisOne,2:plainGenesisTwo,3:plainGenesisThree,4:plainGenesisFour,5:plainGenesisFive,6:plainGenesisSix,7:plainGenesisSeven,8:plainGenesisEight,9:plainGenesisNine,10:plainGenesisTen}};
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