import NurseForm from './NurseForm';
import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from '../../app/utility/SD';

function NurseInsert() {
    return (
        <NurseForm />
    );
}

export default withAuthorization(NurseInsert, [SD_Roles.NURSE, SD_Roles.ADMINISTRATOR]);