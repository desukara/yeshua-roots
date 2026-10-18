import type {Metadata} from "next";
export const metadata:Metadata={
 title:"Member Access",
 description:"Private member account access for Yeshua Roots.",
 robots:{index:false,follow:false,noarchive:true}
};
export default function MembersLayout({children}:{children:React.ReactNode}){return children;}
