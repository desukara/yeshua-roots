import type {Metadata} from "next";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import InterlinearReader from "../../components/interlinear-reader";
export const metadata:Metadata={title:"Torah Interlinear Scripture Reader",description:"Study Scripture through Hebrew text, transliteration, contextual English glosses, and Messianic learning notes."};
export default function InterlinearPage(){return <><SiteHeader/><main className="interlinear-page"><InterlinearReader/></main><SiteFooter/></>}
