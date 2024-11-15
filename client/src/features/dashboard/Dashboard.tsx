import styled from "styled-components";
import { Header, SidePanel } from "../../app/layout";
//import RecentZ from "./components/RecentZ";
import Sections from "./components/Sections";
import LatestAppointments from "./components/LatestAppointments";
import LatestVisits from "./components/LatestVisits";
//import { SD_Roles } from "../../app/utility/SD";
//import withAuthorization from "../../app/hoc/withAuthorization";

function Dashboard() {
    return (
        <>
            <Header />
            <SidePanel />
            <MainContent>
                <Sections />
                <InlineContainer>
                    <LatestAppointmentsContainer>
                        <LatestAppointments />
                    </LatestAppointmentsContainer>
                </InlineContainer>
                <InlineContainer>
                    <LatestAppointmentsContainer>
                        <LatestVisits />
                    </LatestAppointmentsContainer>
                </InlineContainer>
            </MainContent>
        </>
    );
}

const MainContent = styled.div`
  margin-left: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 92vh; 
  margin-top: 50px;
`;

const InlineContainer = styled.div`
  display: flex;
  /* Reduce the gap between components */
  margin: 15px 56px;
`;

const FlexContainer = styled.div`
  flex: 1;
  align-self: stretch; 
`;

const LatestAppointmentsContainer = styled(FlexContainer)`
  flex: 2; /* Set flex to 2 for RecentOrders */
  margin-right: 5px; /* Adjust the margin */
`;

//const RecentYContainer = styled(FlexContainer)`
//  flex: 1; /* Set flex to 1 for RecentUsers */
//  margin-left: 5px; /* Adjust the margin */
//`;

export default Dashboard;