import withAuthorization from '../../app/hoc/withAuthorization';
import { SD_Roles } from '../../app/utility/SD';
import SatelliteForm from './SatelliteForm';

function SatelliteInsert() {
    return (
        <SatelliteForm />
    );
}

export default withAuthorization(SatelliteInsert, [SD_Roles.ADMINISTRATOR]);