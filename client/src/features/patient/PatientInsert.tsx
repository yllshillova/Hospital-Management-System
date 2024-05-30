import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from '../../app/utility/SD';
import PatientForm from './PatientForm';

function PatientInsert() {
    return (
        <PatientForm />
    );
}

export default withAuthorization(PatientInsert, [SD_Roles.NURSE]);