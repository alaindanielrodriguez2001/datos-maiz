'use client'

import React, { useState } from 'react';
import axios from 'axios';
import CustomButton from './CustomButton';

const NewFieldForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nombre_del_campo: '',
        municipio: '',
        forma_productiva: '',
        cultivar: '',
        tipo_de_suelo: '',
        sistema_de_riego: '',
        altura_snm: '',
        metodo_de_siembra: '',
        tipo_de_fertilizacion: '',
        tipo_de_labor_cultural: '',
        distancia_de_siembra: '',
    });

    const handleAddCampo = () => {
        setShowForm(!showForm);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/campos/`, formData);
            console.log('Campo created:', response.data);
            // Optionally, reset the form or provide feedback to the user
        } catch (error) {
            console.error('Error creating campo:', error);
        }
    };

    return (
        <div>
            <CustomButton
                customStyle="w-full mt-8 mb-3"
                onClick={handleAddCampo}
                content="Registrar nuevo campo"
            />
            {showForm && (
                <form className="space-y-3 mb-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombre_del_campo"
                        placeholder="Nombre del campo"
                        className="border border-maiz p-2 w-full"
                        value={formData.nombre_del_campo}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="municipio"
                        placeholder="Municipio"
                        className="border border-maiz p-2 w-full"
                        value={formData.municipio}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="forma_productiva"
                        placeholder="Forma productiva"
                        className="border border-maiz p-2 w-full"
                        value={formData.forma_productiva}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="cultivar"
                        placeholder="Cultivar"
                        className="border border-maiz p-2 w-full"
                        value={formData.cultivar}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="tipo_de_suelo"
                        placeholder="Tipo de suelo"
                        className="border border-maiz p-2 w-full"
                        value={formData.tipo_de_suelo}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="sistema_de_riego"
                        placeholder="Sistema de riego"
                        className="border border-maiz p-2 w-full"
                        value={formData.sistema_de_riego}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="altura_snm"
                        placeholder="Altura SNM"
                        className="border border-maiz p-2 w-full"
                        value={formData.altura_snm}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="metodo_de_siembra"
                        placeholder="Método de siembra"
                        className="border border-maiz p-2 w-full"
                        value={formData.metodo_de_siembra}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="tipo_de_fertilizacion"
                        placeholder="Tipo de fertilización"
                        className="border border-maiz p-2 w-full"
                        value={formData.tipo_de_fertilizacion}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="tipo_de_labor_cultural"
                        placeholder="Tipo de labor cultural"
                        className="border border-maiz p-2 w-full"
                        value={formData.tipo_de_labor_cultural}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="distancia_de_siembra"
                        placeholder="Distancia de siembra"
                        className="border border-maiz p-2 w-full"
                        value={formData.distancia_de_siembra}
                        onChange={handleChange}
                    />
                    <CustomButton
                        customStyle="w-full my-3"
                        content="Guardar"
                        type="submit"
                    />
                </form>
            )}
        </div>
    );
};

export default NewFieldForm;
