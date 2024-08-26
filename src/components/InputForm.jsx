'use client'
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomButton from './CustomButton';

const InputForm = ({ formFields, fetchUrl, postUrl, buttonText, onFormSubmit }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(
        formFields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }), {})
    );
    const [estacionNames, setEstacionNames] = useState([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (fetchUrl) {
            const getEstacionNames = async () => {
                try {
                    const response = await axios.get(fetchUrl);
                    setEstacionNames(response.data);
                } catch (error) {
                    console.error('Error fetching estacion names:', error);
                }
            };
            getEstacionNames();
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
        setFormData({
            ...formData,
            [name]: value, 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(postUrl, formData, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            console.log('Data created:', response.data);
            setFormData(formFields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }), {}));
            setShowForm(false);
            onFormSubmit();
            window.alert("La nueva información fue guardada.");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.alert("Usted necesita autenticarse para modificar la información guardada en el sistema");
            } else {
                window.alert("Verifique que los datos introducidos sean correctos y completos");
            }
            console.error('Error:', error);
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
                        <div key={field.name} className="border border-maiz p-2 w-full rounded-xl text-gray-400">
                            {field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                >
                                    <option value="">{field.placeholder}</option>
                                    {estacionNames.map((campo) => (
                                        <option key={campo.id} value={campo.id}>{campo.nombre_del_campo}</option>
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
