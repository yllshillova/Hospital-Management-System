import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetDepartmentsQuery } from "../../app/APIs/departmentApi";
import MainLoader from "../../app/common/MainLoader";
import Department from "../../app/models/Department";
import { TableCell, TableRow, ActionButton, OrdersTable, TableNav, TableHeader, AddButton, Table, TableHeaderCell } from "../../app/common/table";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { Header, SidePanel } from "../../app/layout";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { useNavigate } from "react-router-dom";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
function DepartmentList() {
    const { data, isLoading, error } = useGetDepartmentsQuery(null);
    const navigate = useNavigate();
    let content;

    if (isLoading) {
        content = <MainLoader />;
    } else if (error) {
        content = <div>Error loading departments.</div>;
    }
    else {
        content = data.map((department: Department) => {
            return (
                <tbody key={department.id}>
                    <TableRow>
                        <TableCell>{department.name}</TableCell>
                        <TableCell>{department.isDeleted}</TableCell>
                        <TableCell>{new Date(department.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(department.updatedAt).toLocaleDateString()}</TableCell>
                        <ActionButton style={{ backgroundColor: "green" }} onClick={() => navigate("/department/details/" + department.id)} >
                            <FontAwesomeIcon icon={faCircle} />
                        </ActionButton>
                        <ActionButton style={{ backgroundColor: "orange" }}>
                            <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        {/*TODO: add handler for delete*/}
                        <ActionButton style={{ backgroundColor: "red" }}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </ActionButton>
                    </TableRow>
                </tbody>
            );
        });
    }

    return (
        <>
            <Header />
            <SidePanel />
            <OrdersTable>
                <TableNav>
                    <TableHeader>Departments List</TableHeader>
                    <AddButton style={{ backgroundColor: "teal" }}>
                        <FontAwesomeIcon icon={faAdd} />
                    </AddButton>
                </TableNav>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>IsDeleted</TableHeaderCell>
                            <TableHeaderCell>CreatedAt</TableHeaderCell>
                            <TableHeaderCell>UpdatedAt</TableHeaderCell>
                        </TableRow>
                    </thead>
                    {content}
                </Table>
            </OrdersTable>
        </>
    );
}

export default DepartmentList;