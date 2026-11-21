import type {Metadata} from "next";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import GetAppContent from "../../components/get-app-content";

export const metadata:Metadata={title:"Get the App",description:"Install Yeshua Roots on your iPhone, Android phone, or desktop. Scripture study, one tap away."};
export default function GetApp(){return <div className="app-download-route"><SiteHeader/><main id="main-content" className="install-page"><GetAppContent/></main><SiteFooter/></div>}
