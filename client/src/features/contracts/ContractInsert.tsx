import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from '../../app/utility/SD';
import ContractForm from './ContractForm';

function ContractInsert() {
    return (
        <ContractForm />
    );
}

export default withAuthorization(ContractInsert, [SD_Roles.ADMINISTRATOR]);