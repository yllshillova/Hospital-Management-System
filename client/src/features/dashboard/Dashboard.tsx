import styled from "styled-components";
import { Header, SidePanel } from "../../app/layout";
import RecentX from "./components/RecentX";
import RecentZ from "./components/RecentZ";
import Sections from "./components/Sections";
import BottomSection from "./components/BottomSection";

function Dashboard() {
    return (
        <>
            <Header />
            <SidePanel />
            <MainContent>
                <Sections />
                <InlineContainer>
                   <RecentXContainer>
                        <RecentX />
                    </RecentXContainer>
                    <RecentYContainer>
                        <RecentZ />
                    </RecentYContainer>
                </InlineContainer>{" "}
                <BottomSection />
            </MainContent>
        </>
    );
}

const MainContent = styled.div`
  margin-left: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 92vh; /* Set minimum height to 100% of the viewport height */
  margin-top: 50px;
`;

const InlineContainer = styled.div`
  display: flex;
  /* Reduce the gap between components */
  margin: 15px 56px;
`;

const FlexContainer = styled.div`
  flex: 1;
  align-self: stretch; /* Make components stretch to the same height */
`;

const RecentXContainer = styled(FlexContainer)`
  flex: 2; /* Set flex to 2 for RecentOrders */
  margin-right: 5px; /* Adjust the margin */
`;

const RecentYContainer = styled(FlexContainer)`
  flex: 1; /* Set flex to 1 for RecentUsers */
  margin-left: 5px; /* Adjust the margin */
`;

export default Dashboard;