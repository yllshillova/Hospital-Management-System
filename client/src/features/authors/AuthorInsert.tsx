import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import AuthorForm from "./AuthorForm";

function AuthorInsert() {
    return (
        <AuthorForm />
    );
}

export default withAuthorization(AuthorInsert, [SD_Roles.ADMINISTRATOR]);