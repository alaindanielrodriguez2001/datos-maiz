'use client'

import { useEffect, useState } from 'react';
import { fetchLastObservaciones } from '../services/api';

const RegistryTable = () => {
    const [observaciones, setObservaciones] = useState([]);

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
                    </tr>
                </thead>
                <tbody>
                    {observaciones.map((observacion) => (
                        <tr key={observacion.id}>
                            <td className="border border-maiz p-2">{observacion.campo.nombre_del_campo}</td>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegistryTable;
