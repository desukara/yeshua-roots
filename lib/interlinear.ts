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
{hebrew:"הַמָּיִם",transliteration:"ha-mayim",english:"the waters"}]}
];