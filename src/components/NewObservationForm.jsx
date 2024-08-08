import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomButton from './CustomButton';
import { fetchCampoNames } from '../services/api';

const NewObservationForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        campo: '',
        fecha: '',
        fase_fenologica: '',
        humedad_maxima: '',
        humedad_minima: '',
        humedad_media: '',
        temperatura_maxima: '',
        temperatura_minima: '',
        temperatura_media: '',
        precipitacion: '',
        presencia_del_hongo: false,
    });
    const [campoNames, setCampoNames] = useState([]);

    useEffect(() => {
        const getCampoNames = async () => {
            try {
                const names = await fetchCampoNames();
                setCampoNames(names);
            } catch (error) {
                console.error('Error fetching campo names:', error);
            }
        };

        getCampoNames();
    }, []);

    const handleAddObservation = () => {
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/observaciones/`, formData);
            console.log('Observation created:', response.data);
            // Optionally, reset the form or provide feedback to the user
        } catch (error) {
            console.error('Error creating observation:', error);
        }
    };

    return (
        <div>
            <CustomButton
                customStyle="w-full mt-8 mb-3"
                onClick={handleAddObservation}
                content="Registrar nueva observación"
            />
            {showForm && (
                <form className="space-y-3 mb-4 text-maiz" onSubmit={handleSubmit}>
                    <select
                        name="campo"
                        className="border border-maiz p-2 w-full"
                        value={formData.campo}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un campo</option>
                        {campoNames.map((name) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                    <input
                        type="date"
                        name="fecha"
                        placeholder="Fecha"
                        className="border border-maiz p-2 w-full"
                        value={formData.fecha}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="fase_fenologica"
                        placeholder="Fase fenológica"
                        className="border border-maiz p-2 w-full"
                        value={formData.fase_fenologica}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="humedad_maxima"
                        placeholder="Humedad máxima"
                        className="border border-maiz p-2 w-full"
                        value={formData.humedad_maxima}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="humedad_minima"
                        placeholder="Humedad mínima"
                        className="border border-maiz p-2 w-full"
                        value={formData.humedad_minima}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="humedad_media"
                        placeholder="Humedad media"
                        className="border border-maiz p-2 w-full"
                        value={formData.humedad_media}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="temperatura_maxima"
                        placeholder="Temperatura máxima"
                        className="border border-maiz p-2 w-full"
                        value={formData.temperatura_maxima}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="temperatura_minima"
                        placeholder="Temperatura mínima"
                        className="border border-maiz p-2 w-full"
                        value={formData.temperatura_minima}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="temperatura_media"
                        placeholder="Temperatura media"
                        className="border border-maiz p-2 w-full"
                        value={formData.temperatura_media}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="precipitacion"
                        placeholder="Precipitación"
                        className="border border-maiz p-2 w-full"
                        value={formData.precipitacion}
                        onChange={handleChange}
                    />

                    <div className="border border-maiz p-2 w-full flex flex-row">
                        Presencia de la enfermedad
                        <input
                            type="checkbox"
                            name="presencia_del_hongo"
                            className="ml-10"
                            checked={formData.presencia_del_hongo}
                            onChange={(e) => setFormData({ ...formData, presencia_del_hongo: e.target.checked })}
                        />
                    </div>


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

export default NewObservationForm;
