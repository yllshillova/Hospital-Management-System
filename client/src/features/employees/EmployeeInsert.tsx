import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import EmployeeForm from "./EmployeeForm";

function EmployeeInsert() {
    return (
        <EmployeeForm />
    );
}

export default withAuthorization(EmployeeInsert, [SD_Roles.ADMINISTRATOR]);