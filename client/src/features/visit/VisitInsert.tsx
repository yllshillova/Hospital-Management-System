import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import VisitForm from "./VisitForm";

function VisitInsert() {
    return (
        <VisitForm />
    );
}

export default withAuthorization(VisitInsert, [SD_Roles.DOCTOR]);