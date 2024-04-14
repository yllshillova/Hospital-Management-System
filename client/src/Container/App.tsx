import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import PatientList from '../Pages/Patient/PatientList';
import PatientUpsert from '../Pages/Patient/PatientUpsert';

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