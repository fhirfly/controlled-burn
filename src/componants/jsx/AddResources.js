import React, { useState } from 'react';
import '../css/AddResources.css';

const AddResources = () => {
    const [formData, setFormData] = useState({
        fullUrl: '',
        resource: {
            resourceType: '',
            id: '',
            meta: { lastUpdated: '' },
            text: { status: '', div: '' },
            extension: [{ url: '', valueCode: '' }],
            url: '',
            version: '',
            name: '',
            status: '',
            date: '',
            publisher: '',
            description: '',
            fhirVersion: '',
            kind: '',
            abstract: false,
            type: '',
            baseDefinition: '',
            derivation: '',
            snapshot: {
                element: [{ id: '', path: '', short: '', definition: '', min: '', max: '' }]
            },
            differential: {
                element: [{ id: '', path: '', short: '', definition: '', min: '', max: '' }]
            }
        }
    });

    // Handle changes for top-level fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle changes for nested inputs
    const handleNestedInputChange = (e, path) => {
        const { name, value } = e.target;
        const keys = path.split('.');
        setFormData((prev) => {
            let nestedObj = { ...prev };
            let current = nestedObj;

            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    current[key] = value;
                } else {
                    current = current[key];
                }
            });

            return nestedObj;
        });
    };

    // Add a new extension
    const addExtension = () => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                extension: [...prev.resource.extension, { url: '', valueCode: '' }]
            }
        }));
    };

    // Remove an extension
    const removeExtension = (index) => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                extension: prev.resource.extension.filter((_, i) => i !== index)
            }
        }));
    };

    // Add a new snapshot element
    const addSnapshotElement = () => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                snapshot: {
                    ...prev.resource.snapshot,
                    element: [...prev.resource.snapshot.element, { id: '', path: '', short: '', definition: '', min: '', max: '' }]
                }
            }
        }));
    };

    // Handle changes for snapshot elements
    const handleSnapshotElementChange = (index, e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const newElement = [...prev.resource.snapshot.element];
            newElement[index][name] = value;
            return { ...prev, resource: { ...prev.resource, snapshot: { ...prev.resource.snapshot, element: newElement } } };
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // Here you would send the form data as a POST request to your server
    };

    return (
        <div className="add-resources">
            <h2>Add Resources</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Full URL:
                    <input
                        type="text"
                        name="fullUrl"
                        value={formData.fullUrl}
                        onChange={handleInputChange}
                        placeholder="Enter full URL"
                    />
                </label>

                <label>
                    Resource Type:
                    <input
                        type="text"
                        name="resource.resourceType"
                        value={formData.resource.resourceType}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter resource type"
                    />
                </label>

                <label>
                    Resource ID:
                    <input
                        type="text"
                        name="resource.id"
                        value={formData.resource.id}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter resource ID"
                    />
                </label>

                <label>
                    Last Updated:
                    <input
                        type="datetime-local"
                        name="resource.meta.lastUpdated"
                        value={formData.resource.meta.lastUpdated}
                        onChange={(e) => handleNestedInputChange(e, 'resource.meta')}
                    />
                </label>

                <label>
                    Text Status:
                    <input
                        type="text"
                        name="resource.text.status"
                        value={formData.resource.text.status}
                        onChange={(e) => handleNestedInputChange(e, 'resource.text')}
                        placeholder="Enter text status"
                    />
                </label>

                <label>
                    Text Div:
                    <textarea
                        name="resource.text.div"
                        value={formData.resource.text.div}
                        onChange={(e) => handleNestedInputChange(e, 'resource.text')}
                        placeholder="Enter text div"
                    />
                </label>

                <label>
                    Extensions:
                    <button type="button" className="add-btn" onClick={addExtension}>Add Extension</button>
                    {formData.resource.extension.map((ext, index) => (
                        <div key={index} className="nested-fieldset">
                            <input
                                type="text"
                                placeholder="Extension URL"
                                value={ext.url}
                                onChange={(e) => {
                                    const newExt = [...formData.resource.extension];
                                    newExt[index].url = e.target.value;
                                    setFormData((prev) => ({
                                        ...prev,
                                        resource: {
                                            ...prev.resource,
                                            extension: newExt,
                                        },
                                    }));
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Extension Value Code"
                                value={ext.valueCode}
                                onChange={(e) => {
                                    const newExt = [...formData.resource.extension];
                                    newExt[index].valueCode = e.target.value;
                                    setFormData((prev) => ({
                                        ...prev,
                                        resource: {
                                            ...prev.resource,
                                            extension: newExt,
                                        },
                                    }));
                                }}
                            />
                            <button type="button" className="remove-btn" onClick={() => removeExtension(index)}>Remove</button>
                        </div>
                    ))}
                </label>

                <label>
                    URL:
                    <input
                        type="text"
                        name="resource.url"
                        value={formData.resource.url}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter resource URL"
                    />
                </label>

                <label>
                    Version:
                    <input
                        type="text"
                        name="resource.version"
                        value={formData.resource.version}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter resource version"
                    />
                </label>

                <label>
                    Name:
                    <input
                        type="text"
                        name="resource.name"
                        value={formData.resource.name}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter resource name"
                    />
                </label>

                <label>
                    Status:
                    <input
                        type="text"
                        name="resource.status"
                        value={formData.resource.status}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter resource status"
                    />
                </label>

                <label>
                    Date:
                    <input
                        type="datetime-local"
                        name="resource.date"
                        value={formData.resource.date}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                    />
                </label>

                <label>
                    Publisher:
                    <input
                        type="text"
                        name="resource.publisher"
                        value={formData.resource.publisher}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter publisher name"
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        name="resource.description"
                        value={formData.resource.description}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter resource description"
                    />
                </label>

                <label>
                    FHIR Version:
                    <input
                        type="text"
                        name="resource.fhirVersion"
                        value={formData.resource.fhirVersion}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter FHIR version"
                    />
                </label>

                <label>
                    Kind:
                    <input
                        type="text"
                        name="resource.kind"
                        value={formData.resource.kind}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter kind"
                    />
                </label>

                <label>
                    Abstract:
                    <input
                        type="checkbox"
                        name="resource.abstract"
                        checked={formData.resource.abstract}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                    />
                </label>

                <label>
                    Type:
                    <input
                        type="text"
                        name="resource.type"
                        value={formData.resource.type}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter resource type"
                    />
                </label>

                <label>
                    Base Definition:
                    <input
                        type="text"
                        name="resource.baseDefinition"
                        value={formData.resource.baseDefinition}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter base definition"
                    />
                </label>

                <label>
                    Derivation:
                    <input
                        type="text"
                        name="resource.derivation"
                        value={formData.resource.derivation}
                        onChange={(e) => handleNestedInputChange(e, 'resource')}
                        placeholder="Enter derivation"
                    />
                </label>

                <fieldset>
                    <legend>Snapshot</legend>
                    <button type="button" className="add-btn" onClick={addSnapshotElement}>Add Snapshot Element</button>
                    {formData.resource.snapshot.element.map((element, index) => (
                        <div key={index} className="nested-fieldset">
                            <label>
                                Element ID:
                                <input
                                    type="text"
                                    name="id"
                                    value={element.id}
                                    onChange={(e) => handleSnapshotElementChange(index, e)}
                                    placeholder="Enter element ID"
                                />
                            </label>
                            <label>
                                Element Path:
                                <input
                                    type="text"
                                    name="path"
                                    value={element.path}
                                    onChange={(e) => handleSnapshotElementChange(index, e)}
                                    placeholder="Enter element path"
                                />
                            </label>
                            <label>
                                Element Short:
                                <input
                                    type="text"
                                    name="short"
                                    value={element.short}
                                    onChange={(e) => handleSnapshotElementChange(index, e)}
                                    placeholder="Enter element short"
                                />
                            </label>
                            <label>
                                Element Definition:
                                <textarea
                                    name="definition"
                                    value={element.definition}
                                    onChange={(e) => handleSnapshotElementChange(index, e)}
                                    placeholder="Enter element definition"
                                />
                            </label>
                            <label>
                                Element Min:
                                <input
                                    type="text"
                                    name="min"
                                    value={element.min}
                                    onChange={(e) => handleSnapshotElementChange(index, e)}
                                    placeholder="Enter min value"
                                />
                            </label>
                            <label>
                                Element Max:
                                <input
                                    type="text"
                                    name="max"
                                    value={element.max}
                                    onChange={(e) => handleSnapshotElementChange(index, e)}
                                    placeholder="Enter max value"
                                />
                            </label>
                        </div>
                    ))}
                </fieldset>

                <fieldset>
                    <legend>Differential</legend>
                    <button type="button" className="add-btn" onClick={addSnapshotElement}>Add Differential Element</button>
                    {formData.resource.differential.element.map((element, index) => (
                        <div key={index} className="nested-fieldset">
                            <label>
                                Element ID:
                                <input
                                    type="text"
                                    name="id"
                                    value={element.id}
                                    onChange={(e) => handleSnapshotElementChange(index, e)}
                                    placeholder="Enter element ID"
                                />
                            </label>
                            <label>
                                Element Path:
                                <input
                                    type="text"
                                    name="path"
                                    value={element.path}
                                    onChange={(e) => handleSnapshotElementChange(index, e)}
                                    placeholder="Enter element path"
                                />
                            </label>
                            <label>
                                Element Short:
                                <input
                                    type="text"
                                    name="short"
                                    value={element.short}
                                    onChange={(e) => handleSnapshotElementChange(index, e)}
                                    placeholder="Enter element short"
                                />
                            </label>
                            <label>
                                Element Definition:
                                <textarea
                                    name="definition"
                                    value={element.definition}
                                    onChange={(e) => handleSnapshotElementChange(index, e)}
                                    placeholder="Enter element definition"
                                />
                            </label>
                            <label>
                                Element Min:
                                <input
                                    type="text"
                                    name="min"
                                    value={element.min}
                                    onChange={(e) => handleSnapshotElementChange(index, e)}
                                    placeholder="Enter min value"
                                />
                            </label>
                            <label>
                                Element Max:
                                <input
                                    type="text"
                                    name="max"
                                    value={element.max}
                                    onChange={(e) => handleSnapshotElementChange(index, e)}
                                    placeholder="Enter max value"
                                />
                            </label>
                        </div>
                    ))}
                </fieldset>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default AddResources;
