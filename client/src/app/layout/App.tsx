import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../features/dashboard/Dashboard';
import DepartmentList from '../../features/department/DepartmentList';
import DepartmentDetails from '../../features/department/DepartmentDetails';
import NotFound from '../../features/errors/NotFound';
import DepartmentUpsert from '../../features/department/DepartmentUpsert';
import PatientList from '../../features/patient/PatientList';
import PatientDetails from '../../features/patient/PatientDetails';
import PatientUpsert from '../../features/patient/PatientUpsert';
import RoomList from '../../features/rooms/RoomList';
import RoomUpsert from '../../features/rooms/RoomUpsert';
import RoomDetails from '../../features/rooms/RoomDetails';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import AddPatientToRoomForm from '../../features/rooms/AddPatientToRoomForm';
import AppointmentList from '../../features/appointment/AppointmentList';
import AppointmentDetails from '../../features/appointment/AppointmentDetails';


function App() {

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/patients" element={<PatientList />}></Route>
                    <Route path="/patient/:id" element={<PatientDetails />}></Route>
                    <Route path="/patient/insert" element={<PatientUpsert />}></Route>
                    <Route path="/patient/update/:id" element={<PatientUpsert />}></Route>
                    <Route path="/departments" element={<DepartmentList />}></Route>
                    <Route path="/department/:id" element={<DepartmentDetails />}></Route>
                    <Route path="/department/insert" element={<DepartmentUpsert />}></Route>
                    <Route path="/department/update/:id" element={<DepartmentUpsert />}></Route>
                    {/*<Route path="/departmentUpsert" element={<DepartmentUpsert />}></Route>*/}
                    {/*<Route path="/departmentUpsert/:id" element={<DepartmentUpsert />}></Route>*/}
                    <Route path="/rooms" element={<RoomList />}></Route>
                    <Route path="/room/:id" element={<RoomDetails />}></Route>
                    <Route path="/room/insert" element={<RoomUpsert />}></Route>
                    <Route path="/room/update/:id" element={<RoomUpsert />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/addPatientToRoom" element={<AddPatientToRoomForm />}></Route>
                    <Route path="/appointments" element={<AppointmentList />}></Route>
                    <Route path="/appointment/:id" element={<AppointmentDetails />}></Route>
                    {/*<Route path="/appointment/insert" element={<AppointmentUpsert />}></Route>*/}
                    {/*<Route path="/appointment/update/:id" element={<AppointmentUpsert />}></Route>*/}

                    <Route path="/not-found" element={<NotFound />}></Route>
                    <Route path="*" element={<Navigate replace to="/not-found" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;