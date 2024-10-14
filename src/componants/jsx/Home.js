import React from 'react';
import "../css/Home.css";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className='home-app'>
                <div>
                    <h2 className='quick-link'>Quick Links</h2>
                    <div className='home-link'>
                        <Link to="/view-resource">View Resource</Link>
                        <Link to="/edit-resource">Edit Resource</Link>
                        <Link to="/add-resource">Add Resource</Link>
                    </div>
                </div>
                <div >
                    <div className='welcome-section'>
                        <h2>Welcome to the FHIR Editor Application </h2>
                        <h3>MIT License</h3>
                        <h3>Copyright © 2024 FHIRFLY</h3>
                        <hr />
                    </div>
                    <div className='welcome-section'>
                        <p>Permission is hereby granted, free of charge, to any person obtaining a copy
                            of this software and associated documentation files (the "Software"), to deal
                            in the Software without restriction, including without limitation the rights
                            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                            copies of the Software, and to permit persons to whom the Software is
                            furnished to do so, subject to the following conditions:</p>
                        <p>The above copyright notice and this permission notice shall be included in all
                            copies or substantial portions of the Software.
                        </p>
                        <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                            SOFTWARE.</p>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Home;
