import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import Home from './Home/Home';
import Survey from './Survey/Survey';
import Results from './Results/Results'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Survey" element={<Survey />} />
                <Route path="/Results" element={<Results />} /> 
            </Routes>
        </Router>
    );
}

export default App;
