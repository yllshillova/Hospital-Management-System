import { toast, TypeOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const toastNotify = (message: string, type: TypeOptions = "success") => {
    toast(message, {
        type: type,
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "foo-bar",

    });
}

export default toastNotify;
