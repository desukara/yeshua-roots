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
const torahBreakdowns:Partial<Record<string,Record<number,Record<number,PlainVerseStudy>>>>={Genesis:{1:plainGenesisOne,2:plainGenesisTwo,3:plainGenesisThree,4:plainGenesisFour,5:plainGenesisFive,6:plainGenesisSix}};
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