import type {Metadata} from "next";
import {notFound} from "next/navigation";import {studies} from "../../../lib/content";import StudyReader from "../../../components/study-reader";export function generateStaticParams(){return studies.map(s=>({slug:s.slug}))}export default async function StudyPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const study=studies.find(s=>s.slug===slug);if(!study)notFound();return <StudyReader study={study}/>}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;
 const study=studies.find(item=>item.slug===slug);
 if(!study)return {};
 const title=study.title;
 const description=`${study.subtitle}. Introductory Scripture study at Yeshua Roots, centered on Yeshua, the living Jewish Messiah of Israel. References: ${study.reference}.`;
 return {title,description,openGraph:{title,description,type:"article"}};
}
