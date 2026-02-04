import { useState, useRef } from 'react'
import { useCart } from 'context/CartContext'
import emailjs from '@emailjs/browser'

const fieldSections = [
    {
        id: "primaryContact",
        title: "Primary Contact",
        fields: [
            {
                id: "firstName",
                type: "text",
                label: "First Name"
            },
            {
                id: "lastName",
                type: "text",
                label: "Last Name"
            },
            {
                id: "phoneNumber",
                type: "tel",
                label: "Phone Number"
            },
            {
                id: "email",
                type: "email",
                label: "Email Address"
            }
        ]
    },
    {
        id: "rentalAddress",
        title: "Rental Address",
        fields: [
            {
                id: "street",
                type: "text",
                label: "Street Address"
            },
            {
                id: "unit",
                type: "text",
                label: "Unit"
            },
            {
                id: "city",
                type: "text",
                label: "City"
            },
            {
                id: "state",
                type: "text",
                label: "State"
            },
            {
                id: "zip",
                type: "text",
                label: "Zip"
            }
        ]
    },
        {
        id: "schedule",
        title: "Rental Schedule",
        fields: [
            {
                id: "date",
                type: "text",
                label: "Date"
            },
            {
                id: "time",
                type: "text",
                label: "Time"
            },
            {
                id: "duration",
                type: "text",
                label: "Duration"
            }
        ]
    },
    
]

export default function ReviewSection() {
    const [ editingField, setEditingField ] = useState("");
    const { formData, saveFormData } = useCart();

    const handleEdit = (field) => setEditingField(field)

    const handleSave = (section, field, nextVal) => {
        saveFormData(section, field, nextVal);
        setEditingField(false);
    }

    const submitRequest = () => {
        // emailjs.send("test_service", "contact_form", {
        //     formData: {...formData.current},
        //     email: "miguelazamarripar@gmail.com",
        //     name: "Mike"
        // }, "Ng-Hc13eVaX6RDXkP")
    }

    const getFormVal = (section, field) => formData.current[section][field]

    const logFormData = () => {
        console.log("Form Data:");
        console.log(formData.current);
    }

    return (
        <section className="my-12 space-y-12">
            <div className="bg-gray-300 p-8 space-y-16">
                {fieldSections.map(section => (        
                    <div className='space-y-4' key={section}>
                        <h1 className='text-lg'>{section.title}</h1>
                        <div className='space-y-4'>
                            { section.fields.map(field => (
                                <UserInput
                                    key={field.id}
                                    type={field.type}
                                    name={field.id}
                                    label={field.label}
                                    edit={handleEdit}
                                    save={(field, value) => handleSave(section, field, value)}
                                    editingField={editingField}
                                    getFormVal={(field) => getFormVal(section.id, field)}
                                />
                            )) }
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={submitRequest} className="p-4 bg-blue-300">
                Submit Request
            </button>
        </section>
    )
}

function UserInput({ type, name, label, edit, save, editingField, getFormVal }) {
    const [ value, setValue ] = useState(getFormVal(name));
    const lastValue = useRef(getFormVal(name));
    const saveClicked = useRef(false);


    const handleBlur = () => {
        if (!saveClicked.current) {
            setValue(lastValue.current);
        }
        saveClicked.current = false
    }

    return (
        <div className="flex">
            {name === editingField ? (
                <>
                    <div className="flex-9 flex">
                        <label className="flex-1" htmlFor={name}> {label}</label>
                        <div className='flex-1'>
                            <input 
                                className="bg-white"
                                type={type}
                                id={name}
                                onChange={e => setValue(e.target.value)}
                                onFocus={() => lastValue.current = value}
                                onBlur={handleBlur}
                                autoFocus
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="flex-1 bg-red-200"
                        onClick={() => save(name, value)}
                        onMouseDown={() => saveClicked.current = true}
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <div 
                        className="flex-9 flex"
                    >
                        <p className='flex-1'>{label}</p>
                        <p className="flex-1">{value}</p>
                    </div>
                    <button
                        type="button"
                        className="flex-1"
                        onClick={() => edit(name)}
                    >
                        Edit
                    </button>
                </>
            )}
        </div>
    )
}