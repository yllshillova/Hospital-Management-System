import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from "../../app/utility/SD";
import PlanetForm from "./PlanetForm";

function PlanetInsert() {
    return (
        <PlanetForm />
    );
}

export default withAuthorization(PlanetInsert, [SD_Roles.ADMINISTRATOR]);