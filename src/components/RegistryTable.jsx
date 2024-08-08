'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchLastObservaciones } from '../services/api';

const RegistryTable = () => {
    const [observaciones, setObservaciones] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const getLastObservaciones = async () => {
            try {
                const data = await fetchLastObservaciones();
                setObservaciones(data);
            } catch (error) {
                console.error('Failed to fetch last observaciones:', error);
            }
        };

        getLastObservaciones();
    }, []);

    const handleRowClick = (id) => {
        setSelectedId(id);
    };

    const handleDelete = async () => {
        if (selectedId) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/observaciones/${selectedId}/`);
                setObservaciones(observaciones.filter(observacion => observacion.id !== selectedId));
                setSelectedId(null);
            } catch (error) {
                console.error('Failed to delete observation:', error);
            }
        }
    };

    return (
        <div className="w-full overflow-x-auto my-7">
            <table className="w-full border-collapse border border-maiz-dark">
                <thead>
                    <tr>
                        <th className="border border-maiz-dark p-2">Campo</th>
                        <th className="border border-maiz-dark p-2">Fecha</th>
                        <th className="border border-maiz-dark p-2">Fase fenológica</th>
                        <th className="border border-maiz-dark p-2">Humedad relativa máxima</th>
                        <th className="border border-maiz-dark p-2">Humedad relativa mínima</th>
                        <th className="border border-maiz-dark p-2">Humedad relativa media</th>
                        <th className="border border-maiz-dark p-2">Temperatura máxima</th>
                        <th className="border border-maiz-dark p-2">Temperatura mínima</th>
                        <th className="border border-maiz-dark p-2">Temperatura media</th>
                        <th className="border border-maiz-dark p-2">Precipitación</th>
                        <th className="border border-maiz-dark p-2">Presencia del hongo</th>
                        <th className="border border-maiz-dark p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {observaciones.map((observacion) => (
                        <tr
                            key={observacion.id}
                            onClick={() => handleRowClick(observacion.id)}
                            className={selectedId === observacion.id ? 'bg-gray-200' : ''}
                        >
                            <td className="border border-maiz p-2">{observacion.campo_nombre}</td>
                            <td className="border border-maiz p-2">{observacion.fecha}</td>
                            <td className="border border-maiz p-2">{observacion.fase_fenologica}</td>
                            <td className="border border-maiz p-2">{observacion.humedad_maxima}</td>
                            <td className="border border-maiz p-2">{observacion.humedad_minima}</td>
                            <td className="border border-maiz p-2">{observacion.humedad_media}</td>
                            <td className="border border-maiz p-2">{observacion.temperatura_maxima}</td>
                            <td className="border border-maiz p-2">{observacion.temperatura_minima}</td>
                            <td className="border border-maiz p-2">{observacion.temperatura_media}</td>
                            <td className="border border-maiz p-2">{observacion.precipitacion}</td>
                            <td className="border border-maiz p-2">{observacion.presencia_del_hongo ? 'Sí' : 'No'}</td>
                            <td className="border border-maiz p-2">
                                <button
                                    onClick={handleDelete}
                                    disabled={!selectedId}
                                    className={`px-4 py-2 text-white ${selectedId ? 'bg-maiz-dark' : 'bg-gray-400'} rounded`}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegistryTable;
