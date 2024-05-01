import useLogout from "./useLogout";

function Logout() {
    const logout = useLogout();

    return (
        <button onClick={logout}>
            Logout
        </button>
    );
}

export default Logout;