/* eslint-disable react-hooks/rules-of-hooks */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteMemberMutation, useGetMembersQuery } from "../../app/APIs/memberApi";
import MainLoader from "../../app/common/MainLoader";
import Member from "../../app/models/Member";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell, TableHead, ErrorTitleRow, ErrorIcon, BackButton, ErrorMessage, ErrorDescription } from "../../app/common/styledComponents/table";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { useLocation, useNavigate } from "react-router-dom";
import toastNotify from "../../app/helpers/toastNotify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import useErrorHandler from "../../app/helpers/useErrorHandler";
import Group from "../../app/models/Group";
import { useGetGroupsQuery } from "../../app/APIs/groupApi";
import MiniLoader from "../../app/common/MiniLoader";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { connectionError } from "../../app/utility/connectionError";


function MemberList() {

    const { data, isLoading, error } = useGetMembersQuery(null);
    const { data: groups, isLoading: isGroupsLoading } = useGetGroupsQuery(null);


    const groupMap = new Map<string, string>();
    groups?.forEach((group: Group) => {
        groupMap.set(group.id, group.name);
    });

    const getGroupName = (GroupId: string) => {
        return groupMap.get(GroupId) || "Group not found!";
    };
    const navigate = useNavigate();
    const location = useLocation();
    const [deleteMember] = useDeleteMemberMutation();
    
    


    const handleMemberDelete = async (id: string,) => {
        const result = await deleteMember(id);

        if ('data' in result) {
            toastNotify("Member has been deleted ", "success");
            navigate('/members');
        }
        else if ('error' in result) {
            const error = result.error as FetchBaseQueryError;
            const { status } = error;

            if (status) {
                useErrorHandler(error, navigate, location.pathname);
            }
        }

    };
    let content;

    if (isLoading ) {
        content = (
            <tbody>
                <tr>
                    <td colSpan={4}>
                        <MainLoader />
                    </td>
                </tr>
            </tbody>
        );
    }
    else if (error) {
        const fetchError = error as FetchBaseQueryError;
        const errorMessage = fetchError?.data as string;
        content = (
            <>
                <Header />
                <SidePanel />
                <ErrorMessage>
                    <ErrorTitleRow>
                        <ErrorIcon icon={faExclamationCircle} />
                        <ErrorDescription>{errorMessage || connectionError("Members")}</ErrorDescription>
                    </ErrorTitleRow>
                    {errorMessage  ? (
                        <BackButton style={{ backgroundColor: "#002147" }}
                            onClick={() => navigate("/member/insert")}>Insert a Member </BackButton>

                    ) : (
                        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
                    )}
                </ErrorMessage>
            </>
        );
    } 
    else {
        content = data.map((member: Member) => {
            return (
                <tbody key={member.id}>
                    <TableRow>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{isGroupsLoading ? (
                            <MiniLoader />
                        ) : getGroupName(member.groupId)} </TableCell>


                         <ActionButton style={{ backgroundColor: "red" }} onClick={() => handleMemberDelete(member.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </ActionButton>       
                    </TableRow>
                </tbody>
            );
        });

        content = (
            <>
                <Header />
                <SidePanel />
                <OrdersTable>
                    <TableNav>
                        <TableHeader>Members List</TableHeader>
                        <AddButton style={{ backgroundColor: "#1a252e" }} onClick={() => navigate("/member/insert")}  >
                            <FontAwesomeIcon icon={faAdd} />
                        </AddButton>
                    </TableNav>
                    <Table>
                        <thead>
                            <TableHead>
                                <TableHeaderCell>Member Name</TableHeaderCell>
                                <TableHeaderCell>Role</TableHeaderCell>
                                <TableHeaderCell>Group</TableHeaderCell>
                            </TableHead>
                        </thead>
                        {content}
                    </Table>
                </OrdersTable>
            </>
        );
            
    }

    return content;

}
export default MemberList;