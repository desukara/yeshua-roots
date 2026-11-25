import type {Metadata} from "next";
import {notFound} from "next/navigation";import SectionClient from "../../components/section-client";const slugs=["torah","news","community","about","contact"] as const;export function generateStaticParams(){return slugs.map(slug=>({slug}))}export default async function Section({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!slugs.some(s=>s===slug))notFound();return <SectionClient slug={slug as typeof slugs[number]}/>}

const pageMetadata:Record<(typeof slugs)[number],{title:string;description:string}>={
torah:{title:"Torah Study",description:"Study Torah and the Scriptures in their Jewish context with Yeshua, the living Jewish Messiah of Israel, at the center."},

news:{title:"News — In Development",description:"Yeshua Roots news resources are being developed. No live news reporting is currently available."},
community:{title:"Community — In Development",description:"Yeshua Roots fellowship and congregation resources are planned and not yet live."},
about:{title:"About James Simmons & Yeshua Roots",description:"Meet James Simmons, an American in Tokyo who created Yeshua Roots for verse-by-verse Hebrew word study and Messianic commentary."},
contact:{title:"Contact — In Development",description:"Yeshua Roots contact services are still being prepared; an active contact inbox is not yet available."}
};
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
const {slug}=await params;
if(!slugs.some(s=>s===slug))return {};
const details=pageMetadata[slug as (typeof slugs)[number]];
return {title:details.title,description:details.description,openGraph:{title:details.title,description:details.description}};
}
