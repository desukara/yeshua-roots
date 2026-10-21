// Editorial drafts: deliberately NOT approved for public publication.
// Sources are independently linked; all summaries are original paraphrases.
// Jewish sources are historical interpretations, not endorsements of Yeshua.
export type CommentaryDraft = {
  reference: string;
  status: "founder-review-required";
  jewish: { source: string; url: string; en: string; he: string };
  messianic: { en: string; he: string; scriptures: string[] };
};
export const commentaryDrafts: Record<string, CommentaryDraft> = {
  "Genesis 1:1": {
    reference: "Genesis 1:1", status: "founder-review-required",
    jewish: {
      source: "Rashi on Genesis 1:1, opening comment (citing Rabbi Isaac)",
      url: "https://www.sefaria.org/Rashi_on_Genesis.1.1",
      en: "Rashi asks why the Torah opens with creation rather than Israel's first national commandment in Exodus 12:2. Drawing on Psalm 111:6, he explains that creation establishes God's sovereignty over the earth and frames Israel's inheritance of the land. This is Rashi's historical Jewish interpretation, not a Messianic claim.",
      he: "רש״י שואל מדוע התורה נפתחת בבריאה ולא במצוות קידוש החודש בשמות י״ב:ב׳. בעקבות תהילים קי״א:ו׳ הוא מסביר שסיפור הבריאה מלמד שהארץ כולה שייכת לבורא, והוא המעניק אותה כרצונו. זהו סיכום של פירוש רש״י, ולא ייחוס אמונה משיחית לרש״י."
    },
    messianic: {
      en: "We confess Yeshua as Israel's Messiah and read John 1:1–5 alongside Genesis 1:1: the Word was with God in the beginning, and all things came into being through Him. This is our distinct Messianic reading, not a position attributed to Rashi. The Creator's faithfulness to Israel and His work through Yeshua belong in the same scriptural conversation.",
      he: "אנו מאמינים שישוע הוא משיח ישראל, וקוראים את יוחנן א׳:א׳–ה׳ לצד בראשית א׳:א׳: הדבר היה עם אלוהים בראשית, והכול נהיה על ידו. זוהי קריאה משיחית שלנו, ולא עמדה שאנו מייחסים לרש״י. נאמנות הבורא לישראל ופועלו באמצעות ישוע עומדים יחד בלימוד כתבי הקודש.",
      scriptures: ["Genesis 1:1", "John 1:1–5", "Colossians 1:15–17"]
    }
  },
  "Leviticus 11:10": {
    reference: "Leviticus 11:10", status: "founder-review-required",
    jewish: {
      source: "Mishnah Chullin 3:7, on permitted fish (compare Leviticus 11:9–12)",
      url: "https://www.sefaria.org/Mishnah_Chullin.3.7",
      en: "Leviticus 11:9–12 distinguishes aquatic creatures by fins and scales. Mishnah Chullin 3:7 discusses those identifying signs and records Rabbi Judah's more specific formulation. This passage concerns Israel's dietary discernment; it does not discuss Yeshua.",
      he: "ויקרא י״א:ט׳–י״ב מבחין בין בעלי חיים שבמים לפי סנפיר וקשקשת. משנה חולין ג׳:ז׳ דנה בסימנים האלה ומביאה גם את פירוטו של רבי יהודה. הדיון עוסק בהבחנות המזון של ישראל ואינו עוסק בישוע."
    },
    messianic: {
      en: "As followers of Yeshua, Israel's Messiah, we approach these commandments with respect for their place in Israel's covenant life. Acts 10:28 gives Peter's own explanation of his vision: he must not call any person common or unclean. We should not erase the Torah's actual dietary context or turn Peter's statement about people into a careless quotation about fish.",
      he: "כתלמידי ישוע, משיח ישראל, אנו מכבדים את מקומן של המצוות האלה בחיי הברית של ישראל. במעשי השליחים י׳:כ״ח כיפא מסביר את חזונו: אין לקרוא לאדם טמא או מחולל. אין למחוק את ההקשר התזונתי של התורה או להציג את דברי כיפא על בני אדם כאילו נאמרו על דגים.",
      scriptures: ["Leviticus 11:9–12", "Acts 10:28", "Romans 11:17–24"]
    }
  }
};
