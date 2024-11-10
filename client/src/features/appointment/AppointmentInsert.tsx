import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import AppointmentForm from "./AppointmentForm";

function AppointmentInsert() {
    return (
        <AppointmentForm />
    );
}

export default withAuthorization( AppointmentInsert, [SD_Roles.NURSE]);