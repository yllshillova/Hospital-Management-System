
import ClipLoader from "react-spinners/ClipLoader";

function MiniLoader({ color = "teal", size = 35, asButtonChild = false }) {
    if (asButtonChild) {
        return (
            <ClipLoader color={color} size={size} />
        );
    }

    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ClipLoader color={color} size={size} />
        </div>
    );
}
export default MiniLoader;