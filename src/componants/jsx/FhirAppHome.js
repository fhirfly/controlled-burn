import React, { useState, useRef } from 'react';
import jsonData from '../../testData/r4b/profiles-types.json';
import '../css/FhirApp.css';
import Sidebar from './Sidebar';
import ResourceDetails from './ResourceDetails';

const FhirAppHome = () => {
    const [selectedType, setSelectedType] = useState('');


    const detailsRef = useRef(null);


    const extractDataTypes = () => {
        return jsonData.entry.map(entry => entry.resource.id);
    };

    const fhirDataTypes = extractDataTypes();

    // Function to get details of selected type
    const getTypeDetails = (type) => {
        const entry = jsonData.entry.find(entry => entry.resource.id === type);
        return entry ? entry.resource : {};
    };

    // Handle sidebar item selection
    const handleSelectType = (type) => {
        setSelectedType(type);


        if (detailsRef.current) {
            detailsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#0056b3" }}>View a FHIR Resource</h1>

            <div className="fhir-app">
                <Sidebar dataTypes={fhirDataTypes} onSelectType={handleSelectType} />
                <div className='details-background' ref={detailsRef}> {/* Attach the ref here */}
                    <ResourceDetails
                        selectedType={selectedType}
                        fhirData={getTypeDetails(selectedType)}
                    />
                </div>
            </div>
        </>
    );
};

export default FhirAppHome;
