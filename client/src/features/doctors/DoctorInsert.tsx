import DoctorForm from './DoctorForm';
import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from '../../app/utility/SD';

function DoctorInsert() {
    return (
        <DoctorForm />
    );
}

export default withAuthorization(DoctorInsert, [SD_Roles.DOCTOR, SD_Roles.ADMINISTRATOR]);