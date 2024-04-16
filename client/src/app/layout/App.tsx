import { Routes, Route } from 'react-router-dom';
import PatientList from '../../features/patient/List';
import PatientUpsert from '../../features/patient/Upsert';
import Dashboard from '../../features/dashboard/Dashboard';
import DepartmentList from '../../features/department/List';
import DepartmentDetails from '../../features/department/Details';

function App() {

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/patientList" element={<PatientList />}></Route>
                    <Route path="/patientUpsert" element={<PatientUpsert />}></Route>
                    <Route path="/departments" element={<DepartmentList />}></Route>
                    <Route path="/department/details/:id" element={<DepartmentDetails />}></Route>

                </Routes>
            </div>
        </div>
    );
}

export default App;