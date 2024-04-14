import { Routes, Route } from 'react-router-dom';
import PatientList from '../../features/patient/List';
import PatientUpsert from '../../features/patient/Upsert';
import Dashboard from '../../features/dashboard/Dashboard';

function App() {

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/patientList" element={<PatientList />}></Route>
                    <Route path="/patientUpsert" element={<PatientUpsert />}></Route>


                </Routes>
            </div>
        </div>
    );
}

export default App;