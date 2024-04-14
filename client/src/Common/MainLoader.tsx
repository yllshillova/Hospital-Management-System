import ClipLoader from "react-spinners/ClipLoader";

function MainLoader({ color = "teal", size = 150 }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",  // This makes the container full height of the viewport
            }}
        >
            <ClipLoader color={color} size={size} />
        </div>
    );
}

export default MainLoader;