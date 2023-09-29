import React, { useState, useEffect } from 'react';
import typeDefinitionData from './r4b/profiles-types';


// Mapping FHIR data types to JSX controls
const FHIR_TO_JSX_MAPPING = {
    "http://hl7.org/fhirpath/System.String": <input type="text" />,
    "base64Binary": '<input type="file" />',
    "boolean": '<input type="checkbox" />',
    "canonical": '<input type="url" />',
    "code": '<input type="text" />',
    "date": '<input type="date" />',
    "dateTime": '<input type="datetime-local" />',
    "decimal": '<input type="number" step="any" />',
    "id": '<input type="text" />',
    "instant": '<input type="datetime-local" />',
    "integer": '<input type="number" />',
    "markdown": '<textarea></textarea>',
    "oid": '<input type="text" />',
    "positiveInt": '<input type="number" min="1" />',
    "string": '<input type="text" />',
    "time": '<input type="time" />',
    "unsignedInt": '<input type="number" min="0" />',
    "uri": '<input type="url" />',
    "url": '<input type="url" />',
    "uuid": '<input type="text" />',
};

const generateControlForDataType = (dataType) => {
    // For base types
    if (FHIR_TO_JSX_MAPPING[dataType]) {
        return FHIR_TO_JSX_MAPPING[dataType];
    }

    // For complex types
    let entry = typeDefinitionData.entry.find(entry => entry.resource && entry.resource.type === dataType);

    // Check if no matching entry is found
    if (!entry) {
        console.error(`No entry found for dataType: ${dataType}`);
        return '<div>No matching data type found</div>';
    }


    let complexTypeStructure = entry.resource.property;

    console.log("Mapping complexTypeStructure:", complexTypeStructure);
    const controls = complexTypeStructure.map(prop => {
        // Check the structure of the 'type' field
        if (!prop.type || !Array.isArray(prop.type) || !prop.type[0] || !prop.type[0].code) {
            console.error(`Unexpected type structure for property: ${JSON.stringify(prop)}`);
            return '<div>Error: Unexpected type structure</div>';
        }

        const controlType = prop.type[0].code;
        if (FHIR_TO_JSX_MAPPING[controlType]) {
            return FHIR_TO_JSX_MAPPING[controlType];
        } else {
            // Recursive call for complex types
            return generateControlForDataType(controlType);
        }
    });

    return `<div>\n${controls.join('\n')}\n</div>`;
}

const ControlBurn = () => {
    const [selectedType, setSelectedType] = useState('');
    const [formData, setFormData] = useState({});
    const [renderedControl, setRenderedControl] = useState('');

    console.log("Mapping typeDefinitionData.entry:", typeDefinitionData.entry);
    const dataTypes = typeDefinitionData.entry.map(entry => entry.resource.type);

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        const control = generateControlForDataType(e.target.value, {name: e.target.value, required: true}, setFormData, formData);
        setRenderedControl(control);
    }

    return (
        <div>
            <select onChange={handleTypeChange}>
                <option value="">Select a FHIR data type</option>
                {
                
                dataTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            <div dangerouslySetInnerHTML={{ __html: renderedControl }} />
        </div>
    );
}

export default ControlBurn;
