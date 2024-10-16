import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FhirAppHome from './componants/jsx/FhirAppHome';
import EditResource from './componants/jsx/EditResource';
import AddResources from './componants/jsx/AddResources';
import Navbar from './componants/jsx/Navbar';
import Home from './componants/jsx/Home';
import Footer from './componants/jsx/Footer';
import NotFound from './componants/jsx/NotFound';

import './componants/css/App.css'

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/view-resource" element={<FhirAppHome />} />
                <Route path="/edit-resource" element={<EditResource />} />
                <Route path="/add-resource" element={<AddResources />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
