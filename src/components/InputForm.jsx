'use client'
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { fetchData, postData } from '@/services/api';
import CustomButton from './CustomButton';

const InputForm = ({ formFields, fetchUrls = [], postUrl, buttonText, onFormSubmit }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(
        formFields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }), {})
    );
    const [options, setOptions] = useState({});
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchOptions = async () => {
            const optionsData = {};
            for (const { name, url } of fetchUrls) {
                const data = await fetchData(url);
                optionsData[name] = data;
            }
            setOptions(optionsData);
        };
        if (fetchUrls.length > 0) {
            fetchOptions();
        }
    }, [fetchUrls]);

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
            await postData(postUrl, formData, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            setFormData(formFields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }), {}));
            setShowForm(false);
            onFormSubmit();
            window.alert("La nueva información fue guardada.");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.alert("Usted necesita autenticarse para modificar la información guardada en el sistema");
            } else {
                window.alert("Verifique que su sesión esté activa y que los datos introducidos sean correctos y completos");
            }
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container w-full">
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
                                        {options[field.name]?.map((option) => (
                                            <option key={option.id} value={option.id}>{option.nombre}</option>
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
                                        type="text"
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={formData[field.name]}
                                        onFocus={(e) => e.target.type = 'date'}
                                        onBlur={(e) => {
                                            if (!e.target.value) e.target.type = 'text';
                                        }}
                                        onChange={handleDateChange}
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
        </div>
    );
};

export default InputForm;
