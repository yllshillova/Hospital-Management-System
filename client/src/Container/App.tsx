import { Routes, Route } from 'react-router-dom';
import { Dashboard } from "../Pages";

function App() {

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;