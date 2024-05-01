import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../app/storage/redux/authSlice';

function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        // Clear local storage
        localStorage.removeItem('token');

        // Clear Redux state
        dispatch(clearToken());

        // Navigate to the login page
        navigate('/login');
    };

    return logout;
}

export default useLogout;