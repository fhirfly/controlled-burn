import React from 'react';
import '../css/Notfound.css'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <div className='container' >
                <h1 className='heading' >404</h1>
                <p className='message' >Oops! The page you're looking for doesn't exist.</p>
                <Link to="/home">Go Back to Home</Link>
            </div>
        </div>
    );
};

export default NotFound;