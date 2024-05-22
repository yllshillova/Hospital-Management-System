import { RootState } from './store'; // Adjust the import according to your project structure

// Define a type for the claims
interface ClaimsPrincipal {
    name: string;
    email: string;
    id: string;
    departmentId: string;
    
}

function getClaimsPrincipal(state: RootState): ClaimsPrincipal | null {
    const token = state.auth.token;
    const { jwtDecode } = require("jwt-decode");

    if (token) {
        try {
            const decodedToken: any = jwtDecode(token);

            const claims: ClaimsPrincipal = {
                name: decodedToken[ClaimTypes.Name],
                email: decodedToken[ClaimTypes.Email],
                userId: decodedToken[ClaimTypes.NameIdentifier],
                departmentId: decodedToken.DepartmentId,
                roles: decodedToken[ClaimTypes.Role] ? decodedToken[ClaimTypes.Role].split(',') : []
            };

            return claims;
        } catch (error) {
            console.error('Failed to decode token', error);
        }
    }

    return null;
}
