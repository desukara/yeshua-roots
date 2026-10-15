/** Yeshua Roots supported languages: US English and contemporary Israeli Hebrew. */
export const supportedLocales=["en","he"] as const;
export type Locale=typeof supportedLocales[number];
export const defaultLocale:Locale="en";
export const languageNames:Record<Locale,string>={en:"English",he:"עברית"};
export const uiMessages={
en:{home:"Home",torah:"Torah Study",teachings:"Teachings",news:"News",community:"Community",about:"About",contact:"Contact",library:"Study Library",welcome:"Shalom, welcome home",study:"Come study with us",language:"Language",motto:"One Messiah. One Torah. One Family."},
he:{home:"בית",torah:"לימוד תורה",teachings:"לימודי יסוד",news:"חדשות",community:"קהילה",about:"אודות",contact:"יצירת קשר",library:"ספריית הלימוד",welcome:"שלום, ברוכים הבאים הביתה",study:"בואו ללמוד איתנו",language:"שפה",motto:"משיח אחד. תורה אחת. משפחה אחת."}
} as const;
export function isLocale(value:string):value is Locale{return supportedLocales.some(l=>l===value)}
