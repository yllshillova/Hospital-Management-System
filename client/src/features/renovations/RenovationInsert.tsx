import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from '../../app/utility/SD';
import RenovationForm from './RenovationForm';

function RenovationInsert() {
    return (
        <RenovationForm />
    );
}

export default withAuthorization(RenovationInsert, [SD_Roles.ADMINISTRATOR]);