import { Routes, Route, Navigate } from 'react-router-dom';
import PatientList from '../../features/patient/List';
import PatientUpsert from '../../features/patient/Upsert';
import Dashboard from '../../features/dashboard/Dashboard';
import DepartmentList from '../../features/department/DepartmentList';
import DepartmentDetails from '../../features/department/DepartmentDetails';
import NotFound from '../../features/errors/NotFound';
import DepartmentUpsert from '../../features/department/DepartmentUpsert';
import PatientDetails from '../../features/patient/Details';
import RoomList from '../../features/rooms/RoomList';
import RoomDetails from '../../features/rooms/RoomDetails';
import RoomUpsert from '../../features/rooms/RoomUpsert';


function App() {

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/patientList" element={<PatientList />}></Route>
                    <Route path="/patientUpsert" element={<PatientUpsert />}></Route>
                    <Route path="/patient/:id" element={<PatientDetails />}></Route>
                    <Route path="/departments" element={<DepartmentList />}></Route>
                    <Route path="/department/:id" element={<DepartmentDetails />}></Route>
                    <Route path="/departmentUpsert" element={<DepartmentUpsert />}></Route>
                    <Route path="/departmentUpsert/:id" element={<DepartmentUpsert />}></Route>
                    <Route path="/rooms" element={<RoomList />}></Route>
                    <Route path="/room/:id" element={<RoomDetails />}></Route>
                    <Route path="/roomUpsert" element={<RoomUpsert />}></Route>
                    <Route path="/roomUpsert/:id" element={<RoomUpsert />}></Route>
                    <Route path="/not-found" element={<NotFound />}></Route>
                    <Route path="*" element={<Navigate replace to="/not-found" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;