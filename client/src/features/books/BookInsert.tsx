import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from '../../app/utility/SD';
import BookForm from './BookForm';

function BookInsert() {
    return (
        <BookForm />
    );
}

export default withAuthorization(BookInsert, [SD_Roles.ADMINISTRATOR]);