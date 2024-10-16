import React from 'react';

const Sidebar = ({ dataTypes, onSelectType }) => {
    return (
        <div className="sidebar">
            <h3 style={{ textAlign: "center" }}>Select by FHIR Metadata</h3>
            <hr />
            <ul>
                {dataTypes.map(type => (
                    <li key={type} onClick={() => onSelectType(type)}>{type}</li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
