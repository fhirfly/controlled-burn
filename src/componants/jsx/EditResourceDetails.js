import React, { useState, useEffect } from 'react';
import '../css/EditResourceDetails.css';

const EditResourceDetails = ({ selectedType, fhirData }) => {
    const [formData, setFormData] = useState(fhirData || {});

    useEffect(() => {
        setFormData(fhirData || {});
    }, [fhirData]);

    const updateNestedValue = (obj, path, value) => {
        const keys = path.split(/[\.\[\]]+/).filter(Boolean);
        let newObj = { ...obj };
        let current = newObj;

        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                current[key] = value;
            } else {
                if (!current[key]) {
                    current[key] = isNaN(keys[index + 1]) ? {} : [];
                }
                current = current[key];
            }
        });

        return newObj;
    };

    const handleInputChange = (e, path) => {
        const newData = updateNestedValue(formData, path, e.target.value);
        setFormData(newData);
    };

    const isPrimitive = (value) => {
        return (typeof value !== 'object' || value === null);
    };

    const renderDetails = (data, path = '') => {
        if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
            return <p>No details available</p>;
        }

        if (Array.isArray(data)) {
            return data.map((item, index) => (
                <div key={index} style={{ marginLeft: '20px' }}>
                    <strong>Item {index + 1}:</strong> {renderDetails(item, `${path}[${index}]`)}
                </div>
            ));
        } else if (typeof data === 'object' && data !== null) {
            return Object.keys(data).map(key => (
                <div key={key} style={{ marginLeft: '20px' }}>
                    <strong>{key}:</strong>
                    {isPrimitive(data[key]) ? (
                        <input
                            value={data[key] !== undefined ? data[key] : ''}
                            onChange={(e) => handleInputChange(e, path ? `${path}.${key}` : key)}
                            style={{ width: '100%' }}
                        />
                    ) : (
                        <div>{renderDetails(data[key], path ? `${path}.${key}` : key)}</div>
                    )}
                </div>
            ));
        } else {
            return <span>{data.toString()}</span>;
        }
    };

    const saveChanges = () => {
        console.log("Saving changes:", formData);
        const isDatabaseConnected = false;

        if (!isDatabaseConnected) {
            alert("Your form submissions are working fine, but the database is currently not connected. We apologize for the inconvenience.");
            setFormData(fhirData || {});
            return;
        }

        fetch('https://your-api-endpoint/update', {
            method: 'UPDATE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    if (!selectedType) return <h2 style={{ textAlign: "center" }}>Please select a metadata item from the left sidebar to edit its details.</h2>;

    return (
        <div className="details">
            <h3>Details for: {selectedType}</h3>
            <div>{renderDetails(formData)}</div>
            <button onClick={saveChanges}>Save Changes</button>
        </div>
    );
};

export default EditResourceDetails;
