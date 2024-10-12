
import React, { useState } from 'react';
import jsonData from '../../testData/r4b/profiles-types.json';  // Import the JSON file

import '../css/FhirApp.css'; // Import the CSS file

import Sidebar from './Sidebar';
import ResourceDetails from './ResourceDetails';

const FhirAppHome = () => {
    const [selectedType, setSelectedType] = useState('');

    // Extract FHIR resource types from the JSON file
    const extractDataTypes = () => {
        return jsonData.entry.map(entry => entry.resource.id);
    };

    const fhirDataTypes = extractDataTypes();

    // Function to get details of selected type
    const getTypeDetails = (type) => {
        const entry = jsonData.entry.find(entry => entry.resource.id === type);
        return entry ? entry.resource : {};
    };

    return (
        <>
            <h1 style={{ textAlign: "center", color: "2196F3" }}>FHIR Editor Application</h1>

            <div className="fhir-app">
                <Sidebar dataTypes={fhirDataTypes} onSelectType={setSelectedType} />
                <ResourceDetails
                    selectedType={selectedType}
                    fhirData={getTypeDetails(selectedType)}
                />
            </div>
        </>
    );
};

export default FhirAppHome;
