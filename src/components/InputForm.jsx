'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomButton from './CustomButton';

const InputForm = ({ formFields, fetchUrl, postUrl, buttonText }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(
        formFields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }), {})
    );
    const [campoNames, setCampoNames] = useState([]);

    useEffect(() => {
        if (fetchUrl) {
            const getCampoNames = async () => {
                try {
                    const response = await axios.get(fetchUrl);
                    setCampoNames(response.data);
                } catch (error) {
                    console.error('Error fetching campo names:', error);
                }
            };
            getCampoNames();
        }
    }, [fetchUrl]);

    const handleAdd = () => {
        setShowForm(!showForm);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        const date = new Date(value);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        setFormData({
            ...formData,
            [name]: formattedDate,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(postUrl, formData);
            console.log('Data created:', response.data);
            setFormData(formFields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }), {}));
            setShowForm(false);
        } catch (error) {
            console.error('Error creating data:', error);
        }
    };

    return (
        <div>
            <CustomButton
                customStyle="w-full mt-1 mb-3"
                onClick={handleAdd}
                content={buttonText}
            />
            {showForm && (
                <form className="space-y-3 mb-4" onSubmit={handleSubmit}>
                    {formFields.map((field) => (
                        <div key={field.name} className="border border-maiz p-2 w-full text-gray-400">
                            {field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                >
                                    <option value="">{field.placeholder}</option>
                                    {campoNames.map((campo) => (
                                        <option key={campo.id} value={campo.nombre_del_campo}>{campo.nombre_del_campo}</option>
                                    ))}
                                </select>
                            ) : field.type === 'checkbox' ? (
                                <div className="flex items-center">
                                    <label className="mr-2">{field.placeholder}</label>
                                    <input
                                        type="checkbox"
                                        name={field.name}
                                        checked={formData[field.name]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ) : field.type === 'date' ? (
                                <input
                                    type="date"
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.name]}
                                    onChange={handleDateChange}
                                    onFocus={(e) => e.target.placeholder = ''}
                                    onBlur={(e) => e.target.placeholder = field.placeholder}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    step={field.type === 'number' ? 'any' : undefined}
                                />
                            )}
                        </div>
                    ))}
                    <CustomButton
                        customStyle="w-full mt-3"
                        content="Guardar"
                        type="submit"
                    />
                </form>
            )}
        </div>
    );
};

export default InputForm;
