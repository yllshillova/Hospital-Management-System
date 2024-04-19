import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../features/dashboard/Dashboard';
import DepartmentList from '../../features/department/DepartmentList';
import DepartmentDetails from '../../features/department/DepartmentDetails';
import NotFound from '../../features/errors/NotFound';
import DepartmentUpsert from '../../features/department/DepartmentUpsert';
import RoomList from "../../features/rooms/RoomList";
import RoomDetails from '../../features/rooms/RoomDetails';
import RoomUpsert from '../../features/rooms/RoomUpsert';
import PatientList from '../../features/patient/PatientList';
import PatientUpsert from '../../features/patient/PatientUpsert';
import PatientDetails from '../../features/patient/PatientDetails';


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