import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FhirAppHome from './componants/jsx/FhirAppHome';
import EditResource from './componants/jsx/EditResource';
import AddResources from './componants/jsx/AddResources';
import Navbar from './componants/jsx/Navbar';
import Home from './componants/jsx/Home';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/view-resource" element={<FhirAppHome />} />
                <Route path="/edit-resource" element={<EditResource />} />
                <Route path="/add-resource" element={<AddResources />} />
            </Routes>
        </Router>
    );
}

export default App;
