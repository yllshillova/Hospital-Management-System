import { Header, SidePanel } from "../../app/layout";
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
export default News_Chat;