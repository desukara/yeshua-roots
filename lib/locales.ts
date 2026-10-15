/** Localization foundation: content remains English until reviewed Japanese translations exist. */
export const supportedLocales=["en","ja"] as const;
export type Locale=typeof supportedLocales[number];
export const defaultLocale:Locale="en";
export const uiMessages={
en:{home:"Home",torah:"Torah Study",teachings:"Teachings",news:"News",community:"Community",about:"About",contact:"Contact",welcome:"Shalom, welcome home",study:"Come study with us"},
ja:{home:"ホーム",torah:"トーラーの学び",teachings:"教え",news:"ニュース",community:"コミュニティ",about:"私たちについて",contact:"お問い合わせ",welcome:"シャローム、ようこそ",study:"一緒に学びましょう"}
} as const;
export function isLocale(value:string):value is Locale{return supportedLocales.some(l=>l===value)}
