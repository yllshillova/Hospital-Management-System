import { SD_Roles } from "../utility/SD";
import { jwtDecode } from "jwt-decode";

const withAuthorization = (WrappedComponent: any) => {
    return (props: any) => {
        const accessToken = localStorage.getItem("token") ?? "";
        if (accessToken) {
            const decode: {
                role: string;
            } = jwtDecode(accessToken);
            if (
                decode.role !== SD_Roles.ADMINISTRATOR &&
                decode.role !== SD_Roles.NURSE &&
                decode.role !== SD_Roles.DOCTOR

            ) {
                window.location.replace("/accessDenied");
                return null;
            }
        } else {
            window.location.replace("/login");
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};
export default withAuthorization;
