import type {Metadata} from "next";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import InstallApp from "../../components/install-app";
export const metadata:Metadata={title:"Get the App",description:"Install Yeshua Roots on your phone, tablet, or desktop for an app-like Scripture study experience."};
export default function GetTheApp(){return <><SiteHeader/><main id="main-content" className="install-page" tabIndex={-1}><div className="install-wrap"><span className="install-kicker">YESHUA ROOTS · ON YOUR DEVICE</span><h1>Get the Yeshua Roots App</h1><p className="install-lead">One Messiah. One Torah. One Family. Keep a place for Scripture and study right on your home screen.</p><InstallApp/></div></main><SiteFooter/></>;}
