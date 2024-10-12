import React, { useState } from 'react';

const CreateComponent = () => {
    const [formData, setFormData] = useState({});

    // Handle input changes
    const handleInputChange = (e, key) => {
        setFormData({
            ...formData,
            [key]: e.target.value
        });
    };

    // Handle adding nested objects dynamically
    const addNestedField = (key) => {
        setFormData({
            ...formData,
            [key]: {}
        });
    };

    // Handle submitting the form (HTTP POST request)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Make POST request with formData to the server
        console.log('Submitted data:', formData);

        // Reset the form
        setFormData({});
    };

    return (
        <div className="create-component">
            <h3>Create New Resource</h3>
            <form onSubmit={handleSubmit}>
                {/* Dynamically generate input fields */}
                {Object.keys(formData).map((key, index) => (
                    <div key={index}>
                        <label>{key}:</label>
                        <input
                            type="text"
                            value={formData[key]}
                            onChange={(e) => handleInputChange(e, key)}
                        />
                    </div>
                ))}
                <div>
                    {/* Example button to add a nested object */}
                    <button type="button" onClick={() => addNestedField('nestedField')}>
                        Add Nested Field
                    </button>
                </div>
                <button type="submit">Create Resource</button>
            </form>
        </div>
    );
};

export default CreateComponent;
