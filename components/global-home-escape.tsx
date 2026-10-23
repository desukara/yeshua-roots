"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
export default function GlobalHomeEscape(){const pathname=usePathname();if(pathname==="/")return null;return <div className="global-home-escape-wrap"><Link href="/" aria-label="Back to Yeshua Roots main page" className="global-home-escape">← Home / ראשי</Link></div>}
