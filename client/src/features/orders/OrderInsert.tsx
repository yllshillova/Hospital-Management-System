import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from '../../app/utility/SD';
import OrderForm from './OrderForm';

function OrderInsert() {
    return (
        <OrderForm />
    );
}

export default withAuthorization(OrderInsert, [SD_Roles.ADMINISTRATOR]);