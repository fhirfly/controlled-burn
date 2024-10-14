// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // Optional: for custom styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">FHIR Editor Application</div>
            <div className="navbar-links">
                <Link to="/view-resource">View Resource</Link>
                <Link to="/edit-resource">Edit Resource</Link>
                <Link to="/add-resource">Add Resource</Link>
            </div>
        </nav>
    );
};

export default Navbar;
