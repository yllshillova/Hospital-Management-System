import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import ProductForm from "./ProductForm";

function ProductInsert() {
    return (
        <ProductForm />
    );
}

export default withAuthorization(ProductInsert, [SD_Roles.ADMINISTRATOR]);