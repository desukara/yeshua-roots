import type {Metadata} from "next";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import InterlinearReader from "../../components/interlinear-reader";
export const metadata:Metadata={title:"Interlinear Hebrew Torah Reader",description:"Study the Hebrew Torah word by word with transliteration, contextual English glosses, and learning notes."};
export default function InterlinearPage(){return <><SiteHeader/><main className="interlinear-page"><InterlinearReader/></main><SiteFooter/></>}
