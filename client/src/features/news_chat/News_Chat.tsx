import withAuthorization from "../../app/hoc/withAuthorization";
import { Header, SidePanel } from "../../app/layout";
import { SD_Roles } from "../../app/utility/SD";
import ChatPanel from "./components/ChatPanel";
import NewsSection from "./components/NewsSection";

function News_Chat() {
    return (
        <>
            <Header />
            <SidePanel />
            <NewsSection />
            <ChatPanel />
        </>
    );
}
export default withAuthorization(News_Chat, [SD_Roles.DOCTOR, SD_Roles.NURSE]);