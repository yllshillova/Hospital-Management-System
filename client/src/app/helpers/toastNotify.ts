import { toast, TypeOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const toastNotify = (message: string, type: TypeOptions = "success") => {
    toast(message, {
        type: type,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export default toastNotify;
