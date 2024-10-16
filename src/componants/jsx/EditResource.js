import React, { useState, useRef } from 'react';
import jsonData from '../../testData/r4b/profiles-types.json';

import '../css/FhirApp.css';
import Sidebar from './Sidebar';
import EditResourceDetails from './EditResourceDetails';

const EditResource = () => {
    const [selectedType, setSelectedType] = useState('');

    const detailsRef = useRef(null);

    const extractDataTypes = () => {
        return jsonData.entry.map(entry => entry.resource.id);
    };

    const fhirDataTypes = extractDataTypes();

    const getTypeDetails = (type) => {
        const entry = jsonData.entry.find(entry => entry.resource.id === type);
        return entry ? entry.resource : {};
    };

    const handleSelectType = (type) => {
        setSelectedType(type);

        if (detailsRef.current) {
            detailsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <h1 style={{ textAlign: "center", color: "#0056b3" }}>Edit a FHIR Resource</h1>

            <div className="fhir-app">
                <Sidebar dataTypes={fhirDataTypes} onSelectType={handleSelectType} />

                <div className='details-background' ref={detailsRef}>
                    <EditResourceDetails
                        selectedType={selectedType}
                        fhirData={getTypeDetails(selectedType)}
                    />
                </div>
            </div>
        </>
    );
};

export default EditResource;
