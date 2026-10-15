import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Yeshua Roots | One Messiah. One Torah. One Family.", description: "A worldwide Messianic teaching, Torah study, news, and community hub." };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
