import { SD_Roles } from "../utility/SD";
import { jwtDecode } from "jwt-decode";

type Role = SD_Roles; 

const withAuthorization = (WrappedComponent: React.ComponentType<any>, allowedRoles: Role[]) => {
    return (props: any) => {
        const accessToken = localStorage.getItem("accessToken") ?? "";
        if (accessToken) {
            try {
                const decode: { role: Role } = jwtDecode(accessToken);
                if (!allowedRoles.includes(decode.role)) {
                    window.location.replace("/accessDenied");
                    return null;
                }
            } catch (error) {
                window.location.replace("/login");
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
