import React from 'react';

const ResourceDetails = ({ selectedType, fhirData }) => {
    if (!selectedType) return <h3 style={{ textAlign: "center", fontWeight: 'bold' }}>Please select a metadata to view details form the left sidebar.</h3>;

    // Recursive function to render nested FHIR data elements
    const renderDetails = (data) => {
        if (typeof data === 'object' && data !== null) {
            // Handle both objects and arrays
            if (Array.isArray(data)) {
                // Render arrays by recursively calling renderDetails for each item
                return data.map((item, index) => (
                    <div key={index} style={{ marginLeft: '20px' }}>
                        <strong>Item {index + 1}:</strong> {renderDetails(item)}
                    </div>
                ));
            } else {
                // Render object keys and values
                return Object.keys(data).map(key => (
                    <div key={key} style={{ marginLeft: '20px' }}>
                        <strong>{key}:</strong> {renderDetails(data[key])}
                    </div>
                ));
            }
        } else if (typeof data === 'boolean') {
            // Render boolean values
            return <span>{data ? 'True' : 'False'}</span>;
        } else if (data === null) {
            // Handle null values
            return <span>Null</span>;
        } else if (data === undefined) {
            // Handle undefined values
            return <span>Undefined</span>;
        } else {
            // Render primitive values (string, number, etc.)
            return <span>{data.toString()}</span>;
        }
    };

    return (
        <div className="details" style={{ maxWidth: "100%", overflowX: "auto", padding: "10px" }} >
            <h3>Details for: {selectedType}</h3>
            <div>{renderDetails(fhirData)}</div>
        </div >
    );
};

export default ResourceDetails;
