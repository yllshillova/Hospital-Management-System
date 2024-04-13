//import styled from "styled-components";
import { Header, SidePanel, } from "../Components/DashLayout";

function Dashboard() {
    return (
        <>
            <Header />
            <SidePanel />
            {/*<MainContent>
                <Sections />
                <InlineContainer>
                    <RecentOrdersContainer>
                        <RecentOrders />
                    </RecentOrdersContainer>
                    <RecentUsersContainer>
                        <RecentUsers />
                    </RecentUsersContainer>
                </InlineContainer>{" "}
                <MostOrderedProducts />
            </MainContent>*/}
        </>
    );
}

//const MainContent = styled.div`
//  margin-left: 200px;
//  padding: 20px;
//  background-color: #f5f5f5;
//  display: flex;
//  flex-direction: column;
//  min-height: 92vh; /* Set minimum height to 100% of the viewport height */
//  margin-top: 50px;
//`;

//const InlineContainer = styled.div`
//  display: flex;
//  /* Reduce the gap between components */
//  margin: 15px 56px;
//`;

//const FlexContainer = styled.div`
//  flex: 1;
//  align-self: stretch; /* Make components stretch to the same height */
//`;

//const RecentOrdersContainer = styled(FlexContainer)`
//  flex: 2; /* Set flex to 2 for RecentOrders */
//  margin-right: 5px; /* Adjust the margin */
//`;

//const RecentUsersContainer = styled(FlexContainer)`
//  flex: 1; /* Set flex to 1 for RecentUsers */
//  margin-left: 5px; /* Adjust the margin */
//`;

export default Dashboard;