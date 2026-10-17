export type LearningStep = {slug:string;en:string;he:string;reference:string};
export type LearningPath = {id:string;titleEn:string;titleHe:string;introEn:string;introHe:string;steps:LearningStep[]};
export const learningPaths:LearningPath[]=[
 {id:"scripture-roots",titleEn:"Begin with the Scriptures",titleHe:"מתחילים בכתובים",introEn:"Follow creation, rest, and the testimony of Yeshua through the Jewish context of Scripture.",introHe:"לומדים על הבריאה, המנוחה ועדות ישוע בהקשר היהודי של הכתובים.",steps:[
  {slug:"beginning-with-the-word",en:"The Word and the Light",he:"הדבר והאור",reference:"Genesis 1:1–5 · John 1:1–14"},
  {slug:"the-blessing-of-shabbat",en:"The Gift of Shabbat",he:"מתנת השבת",reference:"Genesis 2:1–3 · Exodus 20:8–11"}
 ]},
 {id:"faith-and-belonging",titleEn:"Faith and Belonging",titleHe:"אמונה ושייכות",introEn:"Explore grace and covenantal belonging without replacing Israel or separating faith from faithful living.",introHe:"לומדים על חסד ושייכות לברית, ללא החלפת ישראל וללא הפרדת האמונה מן החיים.",steps:[
  {slug:"one-olive-tree",en:"The Olive Tree",he:"עץ הזית",reference:"Romans 11:17–24 · Ephesians 2:11–22"},
  {slug:"grace-and-faithfulness",en:"Grace and Faithfulness",he:"חסד ונאמנות",reference:"Ephesians 2:8–10 · Ezekiel 36:26–27"}
 ]}
];
