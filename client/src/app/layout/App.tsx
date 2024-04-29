import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../features/dashboard/Dashboard';
import DepartmentList from '../../features/department/DepartmentList';
import DepartmentDetails from '../../features/department/DepartmentDetails';
import NotFound from '../../features/errors/NotFound';
import PatientList from '../../features/patient/PatientList';
import PatientDetails from '../../features/patient/PatientDetails';
import RoomList from "../../features/rooms/RoomList";
import RoomUpsert from '../../features/rooms/RoomUpsert';
import DoctorList from '../../features/doctors/DoctorList';
import DoctorDetails from '../../features/doctors/DoctorDetails';
import DoctorInsert from '../../features/doctors/DoctorInsert';
import DoctorUpdate from '../../features/doctors/DoctorUpdate';
import RoomDetails from '../../features/rooms/RoomDetails';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
//import Details from '../components/Details';
//import DepartmentUpdate from '../../features/department/DepartmentUpdate';
//import DepartmentInsert from '../../features/department/DepartmentInsert';
import AddPatientToRoomForm from '../../features/rooms/AddPatientToRoomForm';
import AppointmentList from '../../features/appointment/AppointmentList';
import AppointmentDetails from '../../features/appointment/AppointmentDetails';
import DepartmentUpdate from '../../features/department/DepartmentUpdate';
import DepartmentInsert from '../../features/department/DepartmentInsert';
import PatientInsert from '../../features/patient/PatientInsert';
import PatientUpdate from '../../features/patient/PatientUpdate';
import AppointmentUpdate from '../../features/appointment/AppointmentUpdate';
import AppointmentInsert from '../../features/appointment/AppointmentInsert';


function App() {

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/patients" element={<PatientList />}></Route>
                    <Route path="/patient/:id" element={<PatientDetails />}></Route>
                    <Route path="/patient/insert" element={<PatientInsert />}></Route>
                    <Route path="/patient/update/:id" element={<PatientUpdate />}></Route>
                    <Route path="/departments" element={<DepartmentList />}></Route>
                    <Route path="/department/:id" element={<DepartmentDetails />}></Route>
                    <Route path="/department/insert" element={<DepartmentInsert />}></Route>
                    <Route path="/department/update/:id" element={<DepartmentUpdate />}></Route>
                    <Route path="/doctors" element={<DoctorList />}></Route>
                    <Route path="/doctor/:id" element={<DoctorDetails />}></Route>
                    <Route path="/doctor/insert" element={<DoctorInsert />}></Route>
                    <Route path="/doctor/update/:id" element={<DoctorUpdate />}></Route>
                    <Route path="/rooms" element={<RoomList />}></Route>
                    <Route path="/room/:id" element={<RoomDetails />}></Route>
                    <Route path="/room/insert" element={<RoomUpsert />}></Route>
                    <Route path="/room/update/:id" element={<RoomUpsert />}></Route>
                    <Route path="/addPatientToRoom" element={<AddPatientToRoomForm />}></Route>
                    <Route path="/appointments" element={<AppointmentList />}></Route>
                    <Route path="/appointment/:id" element={<AppointmentDetails />}></Route>
                    <Route path="/appointment/insert" element={<AppointmentInsert />}></Route>
                    <Route path="/appointment/update/:id" element={<AppointmentUpdate />}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/register" element={<Register />}></Route>
                   {/* <Route path="/details" element={<Details />}></Route>*/}
                    <Route path="/not-found" element={<NotFound />}></Route>
                    <Route path="*" element={<Navigate replace to="/not-found" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;