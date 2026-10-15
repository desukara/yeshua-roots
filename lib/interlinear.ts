export type InterlinearWord={hebrew:string;transliteration:string;english:string;note?:string};
export type InterlinearVerse={reference:string;hebrew:string;english:string;words:InterlinearWord[]};
export const interlinearVerses:InterlinearVerse[]=[
{reference:"Genesis 1:1",hebrew:"בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ",english:"In the beginning God created the heavens and the earth.",words:[
{hebrew:"בְּרֵאשִׁית",transliteration:"B'reshit",english:"In the beginning",note:"The opening word of the Torah; בְּ (in) + רֵאשִׁית (beginning)."},
{hebrew:"בָּרָא",transliteration:"bara",english:"created",note:"A masculine singular perfect verb: he created."},
{hebrew:"אֱלֹהִים",transliteration:"Elohim",english:"God",note:"Grammatically plural in form, here governing a singular verb."},
{hebrew:"אֵת",transliteration:"et",english:"[object marker]",note:"Marks the following definite direct object; it is normally untranslated."},
{hebrew:"הַשָּׁמַיִם",transliteration:"ha-shamayim",english:"the heavens",note:"The definite article הַ plus שָׁמַיִם (heavens/sky)."},
{hebrew:"וְאֵת",transliteration:"ve-et",english:"and [object marker]",note:"וְ means 'and'; אֵת marks the definite direct object."},
{hebrew:"הָאָרֶץ",transliteration:"ha-aretz",english:"the earth",note:"The definite article plus אֶרֶץ (earth/land)."}]},
{reference:"Genesis 1:2",hebrew:"וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל־פְּנֵי תְהוֹם וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל־פְּנֵי הַמָּיִם",english:"Now the earth was formless and empty, darkness was over the face of the deep, and the spirit of God was hovering over the face of the waters.",words:[
{hebrew:"וְהָאָרֶץ",transliteration:"ve-ha-aretz",english:"Now the earth"},
{hebrew:"הָיְתָה",transliteration:"hayetah",english:"was"},
{hebrew:"תֹהוּ",transliteration:"tohu",english:"formlessness"},
{hebrew:"וָבֹהוּ",transliteration:"va-vohu",english:"and emptiness"},
{hebrew:"וְחֹשֶׁךְ",transliteration:"ve-choshekh",english:"and darkness"},
{hebrew:"עַל־פְּנֵי",transliteration:"al-penei",english:"over the face of"},
{hebrew:"תְהוֹם",transliteration:"tehom",english:"the deep"},
{hebrew:"וְרוּחַ",transliteration:"ve-ruach",english:"and spirit / wind",note:"Ruach can mean wind, breath, or spirit, depending on context."},
{hebrew:"אֱלֹהִים",transliteration:"Elohim",english:"of God"},
{hebrew:"מְרַחֶפֶת",transliteration:"merachefet",english:"was hovering"},
{hebrew:"עַל־פְּנֵי",transliteration:"al-penei",english:"over the face of"},
{hebrew:"הַמָּיִם",transliteration:"ha-mayim",english:"the waters"}]},
{reference:"Genesis 1:3",hebrew:"וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר",english:"And God said, ‘Let there be light,’ and there was light.",words:[
{hebrew:"וַיֹּאמֶר",transliteration:"va-yomer",english:"and he said",note:"A narrative verb from אמר (to say), introducing God's speech."},
{hebrew:"אֱלֹהִים",transliteration:"Elohim",english:"God"},
{hebrew:"יְהִי",transliteration:"yehi",english:"let there be",note:"A jussive form of היה (to be), expressing a command or wish."},
{hebrew:"אוֹר",transliteration:"or",english:"light"},
{hebrew:"וַיְהִי־אוֹר",transliteration:"va-yehi or",english:"and there was light",note:"The Hebrew joins the verb and noun with a maqqef (־)."}]},
{reference:"Genesis 1:4",hebrew:"וַיַּרְא אֱלֹהִים אֶת־הָאוֹר כִּי־טוֹב וַיַּבְדֵּל אֱלֹהִים בֵּין הָאוֹר וּבֵין הַחֹשֶׁךְ",english:"And God saw that the light was good, and God separated the light from the darkness.",words:[
{hebrew:"וַיַּרְא",transliteration:"va-yar",english:"and he saw",note:"From ראה (to see)."},
{hebrew:"אֱלֹהִים",transliteration:"Elohim",english:"God"},
{hebrew:"אֶת־הָאוֹר",transliteration:"et ha-or",english:"the light [object]",note:"אֶת marks the definite direct object and is normally untranslated."},
{hebrew:"כִּי־טוֹב",transliteration:"ki tov",english:"that [it was] good"},
{hebrew:"וַיַּבְדֵּל",transliteration:"va-yavdel",english:"and he separated",note:"From בדל (to separate or distinguish), in a causative form."},
{hebrew:"אֱלֹהִים",transliteration:"Elohim",english:"God"},
{hebrew:"בֵּין",transliteration:"bein",english:"between"},
{hebrew:"הָאוֹר",transliteration:"ha-or",english:"the light"},
{hebrew:"וּבֵין",transliteration:"u-vein",english:"and between"},
{hebrew:"הַחֹשֶׁךְ",transliteration:"ha-choshekh",english:"the darkness"}]},
{reference:"Genesis 1:5",hebrew:"וַיִּקְרָא אֱלֹהִים לָאוֹר יוֹם וְלַחֹשֶׁךְ קָרָא לָיְלָה וַיְהִי־עֶרֶב וַיְהִי־בֹקֶר יוֹם אֶחָד",english:"And God called the light Day, and the darkness he called Night. And there was evening and there was morning, one day.",words:[
{hebrew:"וַיִּקְרָא",transliteration:"va-yikra",english:"and he called",note:"From קרא (to call, name, or proclaim)."},
{hebrew:"אֱלֹהִים",transliteration:"Elohim",english:"God"},
{hebrew:"לָאוֹר",transliteration:"la-or",english:"the light",note:"Literally 'to the light'; לְ introduces what is being named."},
{hebrew:"יוֹם",transliteration:"yom",english:"day"},
{hebrew:"וְלַחֹשֶׁךְ",transliteration:"ve-la-choshekh",english:"and the darkness"},
{hebrew:"קָרָא",transliteration:"kara",english:"he called"},
{hebrew:"לָיְלָה",transliteration:"laylah",english:"night"},
{hebrew:"וַיְהִי־עֶרֶב",transliteration:"va-yehi erev",english:"and there was evening"},
{hebrew:"וַיְהִי־בֹקֶר",transliteration:"va-yehi voker",english:"and there was morning"},
{hebrew:"יוֹם",transliteration:"yom",english:"day"},
{hebrew:"אֶחָד",transliteration:"echad",english:"one",note:"The phrase יוֹם אֶחָד literally means 'one day'."}]}
];
