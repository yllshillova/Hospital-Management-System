import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../features/dashboard/Dashboard';
import DepartmentList from '../../features/department/DepartmentList';
import NotFound from '../../features/errors/NotFound';
import PatientList from '../../features/patient/PatientList';
import PatientDetails from '../../features/patient/PatientDetails';
import RoomList from "../../features/rooms/RoomList";
import DoctorList from '../../features/doctors/DoctorList';
import DoctorDetails from '../../features/doctors/DoctorDetails';
import DoctorInsert from '../../features/doctors/DoctorInsert';
import DoctorUpdate from '../../features/doctors/DoctorUpdate';
import RoomDetails from '../../features/rooms/RoomDetails';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import AppointmentList from '../../features/appointment/AppointmentList';
import AppointmentDetails from '../../features/appointment/AppointmentDetails';
import DepartmentUpdate from '../../features/department/DepartmentUpdate';
import DepartmentInsert from '../../features/department/DepartmentInsert';
import PatientInsert from '../../features/patient/PatientInsert';
import PatientUpdate from '../../features/patient/PatientUpdate';
import VisitInsert from '../../features/visit/VisitInsert';
import VisitList from '../../features/visit/VisitList';
import VisitDetails from '../../features/visit/VisitDetails';
import VisitUpdate from '../../features/visit/VisitUpdate';
import AppointmentUpdate from '../../features/appointment/AppointmentUpdate';
import AppointmentInsert from '../../features/appointment/AppointmentInsert';
import NurseList from '../../features/nurses/NurseList';
import NurseDetails from '../../features/nurses/NurseDetails';
import NurseUpdate from '../../features/nurses/NurseUpdate';
import NurseInsert from '../../features/nurses/NurseInsert';
import EmergencyContactInsert from '../../features/emergencyContacts/EmergencyContactInsert';
import EmergencyContactUpdate from '../../features/emergencyContacts/EmergencyContactUpdate';
import News_Chat from '../../features/news_chat/News_Chat';
import RoomInsert from '../../features/rooms/RoomInsert';
import RoomUpdate from '../../features/rooms/RoomUpdate';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setLoggedInUser, setToken } from '../storage/redux/authSlice';
import User from '../models/User';
import DepartmentDetails from '../../features/department/DepartmentDetails';
import EmployeeList from '../../features/employees/EmployeeList';
import EmployeeInsert from '../../features/employees/EmployeeInsert';
import ContractList from '../../features/contracts/ContractList';
import ContractInsert from '../../features/contracts/ContractInsert';
import ContractUpdate from '../../features/contracts/ContractUpdate';
import PlanetList from '../../features/planets/PlanetList';
import PlanetInsert from '../../features/planets/PlanetInsert';
import PlanetUpdate from '../../features/planets/PlanetUpdate';
import SatelliteInsert from '../../features/satellites/SatelliteInsert';
import SatelliteList from '../../features/satellites/SatelliteList';
import ProductList from '../../features/products/ProductList';
import ProductInsert from '../../features/products/ProductInsert';
import OrderList from '../../features/orders/OrderList';
import OrderInsert from '../../features/orders/OrderInsert';
import OrderUpdate from '../../features/orders/OrderUpdate';
import AuthorList from '../../features/authors/AuthorList';
import AuthorInsert from '../../features/authors/AuthorInsert';
import BookList from '../../features/books/BookList';
import BookInsert from '../../features/books/BookInsert';
import BookUpdate from '../../features/books/BookUpdate';
import BuildingList from '../../features/buildings/BuildingList';
import BuildingInsert from '../../features/buildings/BuildingInsert';
import RenovationList from '../../features/renovations/RenovationList';
import RenovationInsert from '../../features/renovations/RenovationInsert';
//import { RootState } from '../storage/redux/store';
import { startNotificationsConnection } from '../utility/notificationService';
import TokenRefreshManager from '../utility/useTokenRefresh';



function App() {

    const dispatch = useDispatch();
    //const userId = useSelector((state: RootState) => state.auth.id); 

    useEffect(() => {
        const localToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (localToken && refreshToken) {
            //const { id, name, lastName, email, role, jwtToken }: User = jwtDecode(localToken);
            const { id, name, lastName, email, role, accessToken }: User = jwtDecode(localToken);
            dispatch(setLoggedInUser({ id, name, lastName, email, role, accessToken }));
            dispatch(setToken({ accessToken, refreshToken }));

        }
    }, []);


    useEffect(() => {
        const initializeNotificationsHub = async () => {
            try {
                await startNotificationsConnection(); // Ensure connection is established}
                console.log('notifications connection Established');
            } catch (error) {
                console.error('Error initializing chat:', error);
            }
        };

        initializeNotificationsHub();
    }, []);
    return (

        <div>
        <TokenRefreshManager/>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />}></Route>

                    <Route path="/patients" element={<PatientList />}></Route>
                    <Route path="/patient/:id" element={<PatientDetails />}></Route>
                    <Route path="/patient/insert" element={<PatientInsert />}></Route>
                    <Route path="/patient/update/:id" element={<PatientUpdate />}></Route>

                    <Route path="/departments" element={<DepartmentList />}></Route>
                    <Route path="/department/insert" element={<DepartmentInsert />}></Route>
                    <Route path="/department/update/:id" element={<DepartmentUpdate />}></Route>
                    <Route path="/department/:id" element={<DepartmentDetails />}></Route>

                    <Route path="/doctors" element={<DoctorList />}></Route>
                    <Route path="/doctor/:id" element={<DoctorDetails />}></Route>
                    <Route path="/doctor/insert" element={<DoctorInsert />}></Route>
                    <Route path="/doctor/update/:id" element={<DoctorUpdate />}></Route>

                    <Route path="/rooms" element={<RoomList />}></Route>
                    <Route path="/room/:id" element={<RoomDetails />}></Route>
                    <Route path="/room/insert" element={<RoomInsert />}></Route>
                    <Route path="/room/update/:id" element={<RoomUpdate />}></Route>

                    <Route path="/nurses" element={<NurseList />}></Route>
                    <Route path="/nurse/:id" element={<NurseDetails />}></Route>
                    <Route path="/nurse/insert" element={<NurseInsert />}></Route>
                    <Route path="/nurse/update/:id" element={<NurseUpdate />}></Route>


                    <Route path="/visits" element={<VisitList />}></Route>
                    <Route path="/visit/:id" element={<VisitDetails />}></Route>
                    <Route path="/visit/insert" element={<VisitInsert />}></Route>
                    <Route path="/visit/update/:id" element={<VisitUpdate />}></Route>

                    <Route path="/appointments" element={<AppointmentList />}></Route>
                    <Route path="/appointment/:id" element={<AppointmentDetails />}></Route>
                    <Route path="/appointment/insert" element={<AppointmentInsert />}></Route>
                    <Route path="/appointment/update/:id" element={<AppointmentUpdate />}></Route>

                    <Route path="/patient/:patientId/emergencyContact/insert" element={<EmergencyContactInsert />} />
                    
                    <Route path="/emergencyContact/update/:id" element={<EmergencyContactUpdate />}></Route>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    
                    <Route path="/news_chat" element={<News_Chat />}></Route>

                    <Route path="/not-found" element={<NotFound />}></Route>
                    <Route path="*" element={<Navigate replace to="/not-found" />} />

                    <Route path="/employees" element={<EmployeeList />}></Route>
                    <Route path="/employee/insert" element={<EmployeeInsert />}></Route>

                    <Route path="/contracts" element={<ContractList />}></Route>
                    <Route path="/contract/insert" element={<ContractInsert />}></Route>
                    <Route path="/contract/update/:id" element={<ContractUpdate />}></Route>

                    <Route path="/planets" element={<PlanetList />}></Route>
                    <Route path="/planet/insert" element={<PlanetInsert />}></Route>
                    <Route path="/planet/update/:id" element={<PlanetUpdate />}></Route>

                    <Route path="/satellites" element={<SatelliteList />}></Route>
                    <Route path="/satellite/insert" element={<SatelliteInsert />}></Route>

                    <Route path="/products" element={<ProductList />}></Route>
                    <Route path="/product/insert" element={<ProductInsert />}></Route>

                    <Route path="/orders" element={<OrderList />}></Route>
                    <Route path="/order/insert" element={<OrderInsert />}></Route>
                    <Route path="/order/update/:id" element={<OrderUpdate />}></Route>

                    <Route path="/authors" element={<AuthorList />}></Route>
                    <Route path="/author/insert" element={<AuthorInsert />}></Route>

                    <Route path="/books" element={<BookList />}></Route>
                    <Route path="/book/insert" element={<BookInsert />}></Route>
                    <Route path="/book/update/:id" element={<BookUpdate />}></Route>


                    <Route path="/buildings" element={<BuildingList />}></Route>
                    <Route path="/building/insert" element={<BuildingInsert />}></Route>

                    <Route path="/renovations" element={<RenovationList />}></Route>
                    <Route path="/renovation/insert" element={<RenovationInsert />}></Route>


                </Routes>
            </div>
    );
}

export default App;