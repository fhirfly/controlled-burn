import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import fhirlylogo from '../../testData/fhirlylogo.png'
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-header">
                    <div className="navbar-brand">
                        <div className='logoflex'>
                            <img src={fhirlylogo} className='responsive-image' alt="FHIR Editor Logo" />
                            <p>FHIR Editor Application </p>
                        </div>
                    </div>
                    <button className="navbar-toggle" onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                    <Link to="/home">Home</Link>
                    <Link to="/view-resource">View Resource</Link>
                    <Link to="/edit-resource">Edit Resource</Link>
                    <Link to="/add-resource">Add Resource</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
