import React from 'react';

const ResourceDetails = ({ selectedType, fhirData }) => {
    if (!selectedType) return <h2 style={{ textAlign: "center" }}>Please select a metadata item from the left sidebar to view its details.</h2>;

    const renderDetails = (data) => {
        if (typeof data === 'object' && data !== null) {
            if (Array.isArray(data)) {
                return data.map((item, index) => (
                    <div key={index} style={{ marginLeft: '20px' }}>
                        <strong>Item {index + 1}:</strong> {renderDetails(item)}
                    </div>
                ));
            } else {
                return Object.keys(data).map(key => (
                    <div key={key} style={{ marginLeft: '20px' }}>
                        <strong>{key}:</strong> {renderDetails(data[key])}
                    </div>
                ));
            }
        } else if (typeof data === 'boolean') {
            return <span>{data ? 'True' : 'False'}</span>;
        } else if (data === null) {
            return <span>Null</span>;
        } else if (data === undefined) {
            return <span>Undefined</span>;
        } else {
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
