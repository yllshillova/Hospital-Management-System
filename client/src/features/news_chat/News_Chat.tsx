import withAuthorization from "../../app/hoc/withAuthorization";
import { Header, SidePanel } from "../../app/layout";
import { SD_Roles } from "../../app/utility/SD";
import ChatPanel from "../chat/ChatPanel";
import NewsSection from "../news/NewsSection";

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