import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import BuildingForm from "./BuildingForm";

function BuildingInsert() {
    return (
        <BuildingForm />
    );
}

export default withAuthorization(BuildingInsert, [SD_Roles.ADMINISTRATOR]);