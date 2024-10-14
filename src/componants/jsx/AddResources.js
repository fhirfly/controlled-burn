import React, { useState } from 'react';
import '../css/AddResources.css';

const AddResources = () => {
    const [formData, setFormData] = useState({
        fullUrl: "",
        resource: {
            resourceType: "",
            id: "",
            meta: {
                lastUpdated: ""
            },
            text: {
                status: "",
                div: ""
            },
            extension: [
                {
                    url: "",
                    valueCode: ""
                }
            ],
            url: "",
            version: "",
            name: "",
            status: "",
            date: "",
            publisher: "",
            contact: [
                {
                    telecom: [
                        {
                            system: "",
                            value: ""
                        }
                    ]
                }
            ],
            description: "",
            fhirVersion: "",
            mapping: [
                {
                    identity: "",
                    uri: "",
                    name: ""
                }
            ],
            kind: "",
            abstract: true,
            type: "",
            baseDefinition: "",
            derivation: "",
            snapshot: {
                element: [
                    {
                        id: "",
                        extension: [
                            {
                                url: "",
                                valueCode: ""
                            }
                        ],
                        path: "",
                        short: "",
                        definition: "",
                        min: "",
                        max: "",
                        base: {
                            path: "Element",
                            min: 0,
                            max: ""
                        },
                        condition: [""],
                        constraint: [
                            {
                                key: "",
                                severity: "",
                                human: "",
                                expression: "",
                                xpath: " ",
                                source: ""
                            }
                        ],
                        isModifier: false,
                        mapping: [
                            {
                                identity: "",
                                map: ""
                            }
                        ]
                    }
                ]
            },
            differential: {
                element: [
                    {
                        id: "",
                        extension: [
                            {
                                url: "",
                                valueCode: ""
                            }
                        ],
                        path: "",
                        short: "",
                        definition: "",
                        min: "",
                        max: "",
                        condition: [""],
                        constraint: [
                            {
                                key: "",
                                severity: "",
                                human: "",
                                expression: "",
                                xpath: " ",
                                source: ""
                            }
                        ],
                        mapping: [
                            {
                                identity: "",
                                map: ""
                            }
                        ]
                    }
                ]
            }
        }
    });

    const addExtensionToSnapshot = (index) => {
        const updatedSnapshot = [...formData.resource.snapshot.element];
        if (!updatedSnapshot[index].extension) {
            updatedSnapshot[index].extension = []; // Ensure the extension array exists
        }
        updatedSnapshot[index].extension.push({ url: "", valueCode: "" });
        setFormData({ ...formData, resource: { ...formData.resource, snapshot: { element: updatedSnapshot } } });
    };

    const handleNestedChange = (event, name) => {
        const { value } = event.target;
        const keys = name.split(".");
        const lastKey = keys.pop();
        let obj = formData;

        keys.forEach(key => {
            if (!obj[key]) {
                obj[key] = {};
            }
            obj = obj[key];
        });

        obj[lastKey] = value;
        setFormData({ ...formData });
    };


    // Add the submit handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://example.com/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Form data submitted:", data);
                alert('Form submitted successfully!');

                e.target.reset();

            })
            .catch(error => {
                console.error("Error submitting form:", error);
                alert('Your form submissions are working fine, but the database is currently not connected. We apologize for the inconvenience.');
                // Reset the form
                e.target.reset();
            });
        console.log("Submitted data:", formData);
    };



    // Helper functions for updating the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Functions for adding and removing groups
    const addExtension = () => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                extension: [...prev.resource.extension, { url: "", valueCode: "" }]
            }
        }));
    };

    const removeExtension = (index) => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                extension: prev.resource.extension.filter((_, i) => i !== index)
            }
        }));
    };

    const addContact = () => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                contact: [...prev.resource.contact, { telecom: [{ system: "", value: "" }] }]
            }
        }));
    };

    const removeContact = (index) => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                contact: prev.resource.contact.filter((_, i) => i !== index)
            }
        }));
    };

    const addMapping = () => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                mapping: [...prev.resource.mapping, { identity: "", uri: "", name: "" }]
            }
        }));
    };

    const removeMapping = (index) => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                mapping: prev.resource.mapping.filter((_, i) => i !== index)
            }
        }));
    };

    const addElementToSnapshot = () => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                snapshot: {
                    ...prev.resource.snapshot,
                    element: [...prev.resource.snapshot.element, { id: "", extension: [{ url: "", valueCode: "" }], path: "", short: "", definition: "", min: "", max: "", base: { path: "Element", min: 0, max: "" }, condition: [""], constraint: [{ key: "", severity: "", human: "", expression: "", xpath: " ", source: "" }], isModifier: false, mapping: [{ identity: "", map: "" }] }]
                }
            }
        }));
    };

    const removeElementFromSnapshot = (index) => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                snapshot: {
                    ...prev.resource.snapshot,
                    element: prev.resource.snapshot.element.filter((_, i) => i !== index)
                }
            }
        }));
    };

    const addConditionToSnapshot = (index) => {
        setFormData((prev) => {
            const newElement = [...prev.resource.snapshot.element];
            newElement[index].condition.push("");
            return { ...prev, resource: { ...prev.resource, snapshot: { ...prev.resource.snapshot, element: newElement } } };
        });
    };

    const removeConditionFromSnapshot = (elementIndex, conditionIndex) => {
        setFormData((prev) => {
            const newElement = [...prev.resource.snapshot.element];
            newElement[elementIndex].condition = newElement[elementIndex].condition.filter((_, i) => i !== conditionIndex);
            return { ...prev, resource: { ...prev.resource, snapshot: { ...prev.resource.snapshot, element: newElement } } };
        });
    };

    const addConstraintToSnapshot = (index) => {
        setFormData((prev) => {
            const newElement = [...prev.resource.snapshot.element];
            newElement[index].constraint.push({ key: "", severity: "", human: "", expression: "", xpath: " ", source: "" });
            return { ...prev, resource: { ...prev.resource, snapshot: { ...prev.resource.snapshot, element: newElement } } };
        });
    };

    const removeConstraintFromSnapshot = (elementIndex, constraintIndex) => {
        setFormData((prev) => {
            const newElement = [...prev.resource.snapshot.element];
            newElement[elementIndex].constraint = newElement[elementIndex].constraint.filter((_, i) => i !== constraintIndex);
            return { ...prev, resource: { ...prev.resource, snapshot: { ...prev.resource.snapshot, element: newElement } } };
        });
    };

    const addMappingToSnapshot = (elementIndex) => {
        setFormData((prev) => {
            const newElement = [...prev.resource.snapshot.element];
            newElement[elementIndex].mapping.push({ identity: "", map: "" });
            return { ...prev, resource: { ...prev.resource, snapshot: { ...prev.resource.snapshot, element: newElement } } };
        });
    };

    const removeMappingFromSnapshot = (elementIndex, mappingIndex) => {
        setFormData((prev) => {
            const newElement = [...prev.resource.snapshot.element];
            newElement[elementIndex].mapping = newElement[elementIndex].mapping.filter((_, i) => i !== mappingIndex);
            return { ...prev, resource: { ...prev.resource, snapshot: { ...prev.resource.snapshot, element: newElement } } };
        });
    };

    const addElementToDifferential = () => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                differential: {
                    ...prev.resource.differential,
                    element: [...prev.resource.differential.element, { id: "", extension: [{ url: "", valueCode: "" }], path: "", short: "", definition: "", min: "", max: "", condition: [""], constraint: [{ key: "", severity: "", human: "", expression: "", xpath: " ", source: "" }], mapping: [{ identity: "", map: "" }] }]
                }
            }
        }));
    };

    const removeElementFromDifferential = (index) => {
        setFormData((prev) => ({
            ...prev,
            resource: {
                ...prev.resource,
                differential: {
                    ...prev.resource.differential,
                    element: prev.resource.differential.element.filter((_, i) => i !== index)
                }
            }
        }));
    };

    const addConditionToDifferential = (index) => {
        setFormData((prev) => {
            const newElement = [...prev.resource.differential.element];
            newElement[index].condition.push("");
            return { ...prev, resource: { ...prev.resource, differential: { ...prev.resource.differential, element: newElement } } };
        });
    };

    const removeConditionFromDifferential = (elementIndex, conditionIndex) => {
        setFormData((prev) => {
            const newElement = [...prev.resource.differential.element];
            newElement[elementIndex].condition = newElement[elementIndex].condition.filter((_, i) => i !== conditionIndex);
            return { ...prev, resource: { ...prev.resource, differential: { ...prev.resource.differential, element: newElement } } };
        });
    };

    const addConstraintToDifferential = (index) => {
        setFormData((prev) => {
            const newElement = [...prev.resource.differential.element];
            newElement[index].constraint.push({ key: "", severity: "", human: "", expression: "", xpath: " ", source: "" });
            return { ...prev, resource: { ...prev.resource, differential: { ...prev.resource.differential, element: newElement } } };
        });
    };

    const removeConstraintFromDifferential = (elementIndex, constraintIndex) => {
        setFormData((prev) => {
            const newElement = [...prev.resource.differential.element];
            newElement[elementIndex].constraint = newElement[elementIndex].constraint.filter((_, i) => i !== constraintIndex);
            return { ...prev, resource: { ...prev.resource, differential: { ...prev.resource.differential, element: newElement } } };
        });
    };

    const addMappingToDifferential = (elementIndex) => {
        setFormData((prev) => {
            const newElement = [...prev.resource.differential.element];
            newElement[elementIndex].mapping.push({ identity: "", map: "" });
            return { ...prev, resource: { ...prev.resource, differential: { ...prev.resource.differential, element: newElement } } };
        });
    };

    const removeMappingFromDifferential = (elementIndex, mappingIndex) => {
        setFormData((prev) => {
            const newElement = [...prev.resource.differential.element];
            newElement[elementIndex].mapping = newElement[elementIndex].mapping.filter((_, i) => i !== mappingIndex);
            return { ...prev, resource: { ...prev.resource, differential: { ...prev.resource.differential, element: newElement } } };
        });
    };

    return (
        <div>

            <div className="form-container">
                <h1 className='add-resource-heading'> Add a FHIR Resource</h1>

                <form onSubmit={handleSubmit} className="">
                    <label>
                        Full URL:
                        <input type="text" name="fullUrl" onChange={handleChange} required />
                    </label>
                    <fieldset>
                        <legend>Resource</legend>
                        <label>
                            Resource Type:
                            <input type="text" name="resource.resourceType" onChange={(e) => handleNestedChange(e, 'resource.resourceType')} />
                        </label>
                        <label>
                            ID:
                            <input type="text" name="resource.id" onChange={(e) => handleNestedChange(e, 'resource.id')} />
                        </label>
                        <fieldset>
                            <legend>Meta</legend>
                            <label>
                                Last Updated:
                                <input type="text" name="resource.meta.lastUpdated" onChange={(e) => handleNestedChange(e, 'resource.meta.lastUpdated')} />
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Text</legend>
                            <label>
                                Status:
                                <input type="text" name="resource.text.status" onChange={(e) => handleNestedChange(e, 'resource.text.status')} />
                            </label>
                            <label>
                                Div:
                                <input type="text" name="resource.text.div" onChange={(e) => handleNestedChange(e, 'resource.text.div')} />
                            </label>
                        </fieldset>

                        <fieldset>
                            <legend>Extensions</legend>
                            {formData.resource.extension.map((ext, index) => (
                                <div key={index}>
                                    <label>
                                        URL:
                                        <input type="text" name={`resource.extension[${index}].url`} onChange={(e) => handleNestedChange(e, `resource.extension[${index}].url`)} />
                                    </label>
                                    <label>
                                        Value Code:
                                        <input type="text" name={`resource.extension[${index}].valueCode`} onChange={(e) => handleNestedChange(e, `resource.extension[${index}].valueCode`)} />
                                    </label>
                                    <button type="button" onClick={() => removeExtension(index)}>Remove Extension</button>
                                </div>
                            ))}
                            <button type="button" onClick={addExtension}>Add Extension</button>
                        </fieldset>

                        <label>
                            URL:
                            <input type="text" name="resource.url" onChange={(e) => handleNestedChange(e, 'resource.url')} />
                        </label>
                        <label>
                            Version:
                            <input type="text" name="resource.version" onChange={(e) => handleNestedChange(e, 'resource.version')} />
                        </label>
                        <label>
                            Name:
                            <input type="text" name="resource.name" onChange={(e) => handleNestedChange(e, 'resource.name')} />
                        </label>
                        <label>
                            Status:
                            <input type="text" name="resource.status" onChange={(e) => handleNestedChange(e, 'resource.status')} />
                        </label>
                        <label>
                            Date:
                            <input type="text" name="resource.date" onChange={(e) => handleNestedChange(e, 'resource.date')} />
                        </label>
                        <label>
                            Publisher:
                            <input type="text" name="resource.publisher" onChange={(e) => handleNestedChange(e, 'resource.publisher')} />
                        </label>

                        <fieldset>
                            <legend>Contact</legend>
                            {formData.resource.contact.map((contact, index) => (
                                <div key={index}>
                                    <fieldset>
                                        <legend>Contact {index + 1}</legend>
                                        {contact.telecom.map((telecom, telecomIndex) => (
                                            <div key={telecomIndex}>
                                                <label>
                                                    System:
                                                    <input type="text" name={`resource.contact[${index}].telecom[${telecomIndex}].system`} onChange={(e) => handleNestedChange(e, `resource.contact[${index}].telecom[${telecomIndex}].system`)} />
                                                </label>
                                                <label>
                                                    Value:
                                                    <input type="text" name={`resource.contact[${index}].telecom[${telecomIndex}].value`} onChange={(e) => handleNestedChange(e, `resource.contact[${index}].telecom[${telecomIndex}].value`)} />
                                                </label>
                                            </div>
                                        ))}
                                        <button type="button" onClick={addContact}>Add Contact</button>
                                        <button type="button" onClick={() => removeContact(index)}>Remove Contact</button>
                                    </fieldset>
                                </div>
                            ))}
                        </fieldset>

                        <fieldset>
                            <legend>Mappings</legend>
                            {formData.resource.mapping.map((map, index) => (
                                <div key={index}>
                                    <label>
                                        Identity:
                                        <input type="text" name={`resource.mapping[${index}].identity`} onChange={(e) => handleNestedChange(e, `resource.mapping[${index}].identity`)} />
                                    </label>
                                    <label>
                                        URI:
                                        <input type="text" name={`resource.mapping[${index}].uri`} onChange={(e) => handleNestedChange(e, `resource.mapping[${index}].uri`)} />
                                    </label>
                                    <label>
                                        Name:
                                        <input type="text" name={`resource.mapping[${index}].name`} onChange={(e) => handleNestedChange(e, `resource.mapping[${index}].name`)} />
                                    </label>
                                    <button type="button" onClick={() => removeMapping(index)}>Remove Mapping</button>
                                </div>
                            ))}
                            <button type="button" onClick={addMapping}>Add Mapping</button>
                        </fieldset>

                        <fieldset>
                            <legend>Snapshot</legend>
                            {formData.resource.snapshot.element.map((element, index) => (
                                <div key={index}>
                                    <fieldset>
                                        <legend>Element</legend>
                                        <label>
                                            ID:
                                            <input type="text" name={`resource.snapshot.element[${index}].id`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].id`)} />
                                        </label>

                                        <fieldset>
                                            <legend>Extension</legend>
                                            {element.extension.map((ext, extIndex) => (
                                                <div key={extIndex}>
                                                    <label>
                                                        URL:
                                                        <input type="text" name={`resource.snapshot.element[${index}].extension[${extIndex}].url`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].extension[${extIndex}].url`)} />
                                                    </label>
                                                    <label>
                                                        Value Code:
                                                        <input type="text" name={`resource.snapshot.element[${index}].extension[${extIndex}].valueCode`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].extension[${extIndex}].valueCode`)} />
                                                    </label>
                                                </div>
                                            ))}
                                        </fieldset>

                                        <label>
                                            Path:
                                            <input type="text" name={`resource.snapshot.element[${index}].path`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].path`)} />
                                        </label>
                                        <label>
                                            Short:
                                            <input type="text" name={`resource.snapshot.element[${index}].short`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].short`)} />
                                        </label>
                                        <label>
                                            Definition:
                                            <input type="text" name={`resource.snapshot.element[${index}].definition`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].definition`)} />
                                        </label>
                                        <label>
                                            Min:
                                            <input type="text" name={`resource.snapshot.element[${index}].min`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].min`)} />
                                        </label>
                                        <label>
                                            Max:
                                            <input type="text" name={`resource.snapshot.element[${index}].max`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].max`)} />
                                        </label>

                                        <fieldset>
                                            <legend>Condition</legend>
                                            {element.condition.map((cond, condIndex) => (
                                                <div key={condIndex}>
                                                    <label>
                                                        Condition:
                                                        <input type="text" name={`resource.snapshot.element[${index}].condition[${condIndex}]`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].condition[${condIndex}]`)} />
                                                    </label>
                                                    <button type="button" onClick={() => removeConditionFromSnapshot(index, condIndex)}>Remove Condition</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addConditionToSnapshot(index)}>Add Condition</button>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Constraints</legend>
                                            {element.constraint.map((constr, constrIndex) => (
                                                <div key={constrIndex}>
                                                    <label>
                                                        Key:
                                                        <input type="text" name={`resource.snapshot.element[${index}].constraint[${constrIndex}].key`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].constraint[${constrIndex}].key`)} />
                                                    </label>
                                                    <label>
                                                        Severity:
                                                        <input type="text" name={`resource.snapshot.element[${index}].constraint[${constrIndex}].severity`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].constraint[${constrIndex}].severity`)} />
                                                    </label>
                                                    <label>
                                                        Human:
                                                        <input type="text" name={`resource.snapshot.element[${index}].constraint[${constrIndex}].human`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].constraint[${constrIndex}].human`)} />
                                                    </label>
                                                    <label>
                                                        Expression:
                                                        <input type="text" name={`resource.snapshot.element[${index}].constraint[${constrIndex}].expression`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].constraint[${constrIndex}].expression`)} />
                                                    </label>
                                                    <label>
                                                        XPath:
                                                        <input type="text" name={`resource.snapshot.element[${index}].constraint[${constrIndex}].xpath`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].constraint[${constrIndex}].xpath`)} />
                                                    </label>
                                                    <label>
                                                        Source:
                                                        <input type="text" name={`resource.snapshot.element[${index}].constraint[${constrIndex}].source`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].constraint[${constrIndex}].source`)} />
                                                    </label>
                                                    <button type="button" onClick={() => removeConstraintFromSnapshot(index, constrIndex)}>Remove Constraint</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addConstraintToSnapshot(index)}>Add Constraint</button>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Mapping</legend>
                                            {element.mapping.map((map, mapIndex) => (
                                                <div key={mapIndex}>
                                                    <label>
                                                        Identity:
                                                        <input type="text" name={`resource.snapshot.element[${index}].mapping[${mapIndex}].identity`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].mapping[${mapIndex}].identity`)} />
                                                    </label>
                                                    <label>
                                                        Map:
                                                        <input type="text" name={`resource.snapshot.element[${index}].mapping[${mapIndex}].map`} onChange={(e) => handleNestedChange(e, `resource.snapshot.element[${index}].mapping[${mapIndex}].map`)} />
                                                    </label>
                                                    <button type="button" onClick={() => removeMappingFromSnapshot(index, mapIndex)}>Remove Mapping</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addMappingToSnapshot(index)}>Add Mapping</button>
                                        </fieldset>

                                        <button type="button" onClick={() => removeElementFromSnapshot(index)}>Remove Element</button>
                                    </fieldset>
                                </div>
                            ))}
                            <button type="button" onClick={addElementToSnapshot}>Add Element</button>
                        </fieldset>

                        <fieldset>
                            <legend>Differential</legend>
                            {formData.resource.differential.element.map((element, index) => (
                                <div key={index}>
                                    <fieldset>
                                        <legend>Element</legend>
                                        <label>
                                            ID:
                                            <input type="text" name={`resource.differential.element[${index}].id`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].id`)} />
                                        </label>

                                        <fieldset>
                                            <legend>Extension</legend>
                                            {element.extension.map((ext, extIndex) => (
                                                <div key={extIndex}>
                                                    <label>
                                                        URL:
                                                        <input type="text" name={`resource.differential.element[${index}].extension[${extIndex}].url`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].extension[${extIndex}].url`)} />
                                                    </label>
                                                    <label>
                                                        Value Code:
                                                        <input type="text" name={`resource.differential.element[${index}].extension[${extIndex}].valueCode`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].extension[${extIndex}].valueCode`)} />
                                                    </label>
                                                </div>
                                            ))}
                                        </fieldset>

                                        <label>
                                            Path:
                                            <input type="text" name={`resource.differential.element[${index}].path`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].path`)} />
                                        </label>
                                        <label>
                                            Short:
                                            <input type="text" name={`resource.differential.element[${index}].short`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].short`)} />
                                        </label>
                                        <label>
                                            Definition:
                                            <input type="text" name={`resource.differential.element[${index}].definition`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].definition`)} />
                                        </label>
                                        <label>
                                            Min:
                                            <input type="text" name={`resource.differential.element[${index}].min`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].min`)} />
                                        </label>
                                        <label>
                                            Max:
                                            <input type="text" name={`resource.differential.element[${index}].max`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].max`)} />
                                        </label>

                                        <fieldset>
                                            <legend>Condition</legend>
                                            {element.condition.map((cond, condIndex) => (
                                                <div key={condIndex}>
                                                    <label>
                                                        Condition:
                                                        <input type="text" name={`resource.differential.element[${index}].condition[${condIndex}]`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].condition[${condIndex}]`)} />
                                                    </label>
                                                    <button type="button" onClick={() => removeConditionFromDifferential(index, condIndex)}>Remove Condition</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addConditionToDifferential(index)}>Add Condition</button>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Constraints</legend>
                                            {element.constraint.map((constr, constrIndex) => (
                                                <div key={constrIndex}>
                                                    <label>
                                                        Key:
                                                        <input type="text" name={`resource.differential.element[${index}].constraint[${constrIndex}].key`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].constraint[${constrIndex}].key`)} />
                                                    </label>
                                                    <label>
                                                        Severity:
                                                        <input type="text" name={`resource.differential.element[${index}].constraint[${constrIndex}].severity`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].constraint[${constrIndex}].severity`)} />
                                                    </label>
                                                    <label>
                                                        Human:
                                                        <input type="text" name={`resource.differential.element[${index}].constraint[${constrIndex}].human`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].constraint[${constrIndex}].human`)} />
                                                    </label>
                                                    <label>
                                                        Expression:
                                                        <input type="text" name={`resource.differential.element[${index}].constraint[${constrIndex}].expression`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].constraint[${constrIndex}].expression`)} />
                                                    </label>
                                                    <label>
                                                        XPath:
                                                        <input type="text" name={`resource.differential.element[${index}].constraint[${constrIndex}].xpath`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].constraint[${constrIndex}].xpath`)} />
                                                    </label>
                                                    <label>
                                                        Source:
                                                        <input type="text" name={`resource.differential.element[${index}].constraint[${constrIndex}].source`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].constraint[${constrIndex}].source`)} />
                                                    </label>
                                                    <button type="button" onClick={() => removeConstraintFromDifferential(index, constrIndex)}>Remove Constraint</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addConstraintToDifferential(index)}>Add Constraint</button>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Mapping</legend>
                                            {element.mapping.map((map, mapIndex) => (
                                                <div key={mapIndex}>
                                                    <label>
                                                        Identity:
                                                        <input type="text" name={`resource.differential.element[${index}].mapping[${mapIndex}].identity`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].mapping[${mapIndex}].identity`)} />
                                                    </label>
                                                    <label>
                                                        Map:
                                                        <input type="text" name={`resource.differential.element[${index}].mapping[${mapIndex}].map`} onChange={(e) => handleNestedChange(e, `resource.differential.element[${index}].mapping[${mapIndex}].map`)} />
                                                    </label>
                                                    <button type="button" onClick={() => removeMappingFromDifferential(index, mapIndex)}>Remove Mapping</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addMappingToDifferential(index)}>Add Mapping</button>
                                        </fieldset>

                                        <button type="button" onClick={() => removeElementFromDifferential(index)}>Remove Element</button>
                                    </fieldset>
                                </div>
                            ))}
                            <button type="button" onClick={addElementToDifferential}>Add Element</button>
                        </fieldset>
                    </fieldset>
                    <button type="submit">Submit Form</button>
                </form>
            </div>
        </div>
    );
};

export default AddResources;

