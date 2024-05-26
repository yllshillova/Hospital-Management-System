const withAuthentication = (WrappedComponent: any) => {
    return (props: any) => {

        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            window.location.replace("/");
            return null;
        }
        return <WrappedComponent {...props} />;

    };
};
export default withAuthentication;