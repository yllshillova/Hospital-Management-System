import withAuthorization from "../../app/hoc/withAuthorization";
import { SD_Roles } from '../../app/utility/SD';
import RoomForm from "./RoomForm";

function RoomInsert() {
    return (
        <RoomForm />
    );
}

export default withAuthorization(RoomInsert, [SD_Roles.NURSE, SD_Roles.ADMINISTRATOR]);