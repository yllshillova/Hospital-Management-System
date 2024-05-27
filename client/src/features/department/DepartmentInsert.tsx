import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import DepartmentForm from "./DepartmentForm";

function DepartmentInsert() {
    return (
        <DepartmentForm />
    );
}

export default withAuthorization(DepartmentInsert, [SD_Roles.ADMINISTRATOR]);