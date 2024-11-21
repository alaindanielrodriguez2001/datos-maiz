'use client'
import { useSession } from 'next-auth/react';
import { useRef, useState, useEffect } from 'react';
import { fetchData, postData } from '@/services/api';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import CustomButton from './CustomButton';

const InputForm = ({ formFields, fetchUrls = [], postUrl, buttonText, onFormSubmit, municipios }) => {
    const [showForm, setShowForm] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [formData, setFormData] = useState(
        formFields.reduce((acc, field) => ({ ...acc, [field.name]: field.type === 'checkbox' ? false : '' }), {})
    );
    const [options, setOptions] = useState({});
    const [errors, setErrors] = useState({});
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
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    };

    const handleDateChange = (date, name) => {
        const formattedDate = date ? date.toISOString().split('T')[0] : '';
        setFormData({
            ...formData,
            [name]: formattedDate,
        });
    };

    const validateField = (name, value, type) => {
        let errorMessage = null;
        if (type === 'number') {
            const pattern = /^-?[0-9]*[.,]?[0-9]+$/;
            if (!pattern.test(value) || parseFloat(value) <= 0) {
                errorMessage = 'Por favor, asegúrese de haber entrado un número válido';
            }
        } else if (type === 'text') {
            if (value.trim() === '') {
                errorMessage = 'Por favor, asegúrese de haber entrado una cadena válida';
            }
        }
        return errorMessage;
    };

    const handleBlur = (e) => {
        const { name, value, type } = e.target;
        const errorMessage = validateField(name, value, type);
        if (errorMessage) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
        }
    };

    const isFormValid = () => {
        return formFields.every((field) => {
            const value = formData[field.name];
            const errorMessage = validateField(field.name, value, field.type);
            return !errorMessage && value;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            try {
                await postData(postUrl, formData, {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });
                setFormData(formFields.reduce((acc, field) => ({ ...acc, [field.name]: field.type === 'checkbox' ? false : '' }), {}));
                setShowForm(false);
                onFormSubmit();
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    window.alert("Usted necesita autenticarse para modificar la información guardada en el sistema");
                } else {
                    window.alert("Verifique que su sesión esté activa y que los datos introducidos sean correctos y completos");
                }
                console.error('Error:', error);
            }
        } else {
            window.alert('Por favor, corrija los errores en el formulario antes de enviar.');
        }
    };

    return (
        <div className="form-container w-full">
            <div>
                <CustomButton customStyle="w-full mt-1 mb-3" onClick={handleAdd} content={buttonText} />
                {showForm && (
                    <form className="space-y-3 mb-4" onSubmit={handleSubmit}>
                        {formFields.map((field) => (
                            <div key={field.name} className="border border-maiz p-2 w-full rounded-xl text-gray-400">
                                {field.type === 'select' ? (
                                    <select
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        className="mx-2 px-2 w-[350px]"
                                    >
                                        <option value="" className="font-black">{field.placeholder}</option>
                                        {options[field.name]?.map((opcion) => (
                                            <option key={opcion.id} value={opcion.id} className="mx-2 px-2 w-[350px]">
                                                {opcion.nombre}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === 'municipio' ? (
                                    <select
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        className="mx-2 px-2 w-[350px]"
                                    >
                                        <option value="" className="font-black">{field.placeholder}</option>
                                        {municipios.map((opcion) => (
                                            <option key={opcion} value={opcion} className="mx-2 px-2 w-[350px]">
                                                {opcion}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === 'checkbox' ? (
                                    <div className="flex items-center">
                                        <label className="ml-2 px-2 w-[350px]">{field.placeholder}</label>
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            checked={formData[field.name]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ) : field.type === 'date' ? (
                                    <>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => handleDateChange(date, field.name)}
                                            dateFormat="yyyy/MM/dd"
                                            placeholderText={field.placeholder}
                                            className="mx-2 px-2 w-[350px]"
                                        />
                                        <input type="hidden" name={field.name} value={startDate} readOnly />
                                    </>
                                ) : (
                                    <div className="flex items-center">
                                        <input
                                            className="mx-2 px-2 w-[350px]"
                                            type={field.type}
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors[field.name] && (
                                            <label role="alert" className="text-red-700 font-bold ml-2 px-2 w-full">
                                                {errors[field.name]}
                                            </label>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                        <CustomButton 
                            customStyle={`w-full mt-3 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                            content="Guardar" 
                            type="submit" 
                            disabled={!isFormValid()} 
                        />
                    </form>
                )}
            </div>
        </div>
    );
};

export default InputForm;
