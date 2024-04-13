import { Routes, Route } from 'react-router-dom';
import { Dashboard, PatientList, PatientUpsert } from '../Pages';

function App() {

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/PatientList" element={<PatientList />}></Route>
                    <Route path="/PatientUpsert" element={<PatientUpsert />}></Route>


                </Routes>
            </div>
        </div>
    );
}

export default App;