'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchCampos } from '../services/api';

const FieldsTable = () => {
    const [campos, setCampos] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const getCampos = async () => {
            try {
                const data = await fetchCampos();
                setCampos(data);
            } catch (error) {
                console.error('Failed to fetch campos:', error);
            }
        };

        getCampos();
    }, []);

    const handleRowClick = (id) => {
        setSelectedId(id);
    };

    const handleDelete = async () => {
        if (selectedId) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/campos/${selectedId}/`);
                setCampos(campos.filter(campo => campo.id !== selectedId));
                setSelectedId(null);
            } catch (error) {
                console.error('Failed to delete campo:', error);
            }
        }
    };

    return (
        <div className="w-full overflow-x-auto my-7">
            <table className="w-full border-collapse border border-maiz-dark">
                <thead>
                    <tr>
                        <th className="border border-maiz-dark p-2">Nombre del Campo</th>
                        <th className="border border-maiz-dark p-2">Municipio</th>
                        <th className="border border-maiz-dark p-2">Forma Productiva</th>
                        <th className="border border-maiz-dark p-2">Cultivar</th>
                        <th className="border border-maiz-dark p-2">Tipo de Suelo</th>
                        <th className="border border-maiz-dark p-2">Sistema de Riego</th>
                        <th className="border border-maiz-dark p-2">Altura SNM</th>
                        <th className="border border-maiz-dark p-2">Método de Siembra</th>
                        <th className="border border-maiz-dark p-2">Tipo de Fertilización</th>
                        <th className="border border-maiz-dark p-2">Tipo de Labor Cultural</th>
                        <th className="border border-maiz-dark p-2">Distancia de Siembra</th>
                        <th className="border border-maiz-dark p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {campos.map((campo) => (
                        <tr
                            key={campo.id}
                            onClick={() => handleRowClick(campo.id)}
                            className={selectedId === campo.id ? 'bg-gray-200' : ''}
                        >
                            <td className="border border-maiz p-2">{campo.nombre_del_campo}</td>
                            <td className="border border-maiz p-2">{campo.municipio}</td>
                            <td className="border border-maiz p-2">{campo.forma_productiva}</td>
                            <td className="border border-maiz p-2">{campo.cultivar}</td>
                            <td className="border border-maiz p-2">{campo.tipo_de_suelo}</td>
                            <td className="border border-maiz p-2">{campo.sistema_de_riego}</td>
                            <td className="border border-maiz p-2">{campo.altura_snm}</td>
                            <td className="border border-maiz p-2">{campo.metodo_de_siembra}</td>
                            <td className="border border-maiz p-2">{campo.tipo_de_fertilizacion}</td>
                            <td className="border border-maiz p-2">{campo.tipo_de_labor_cultural}</td>
                            <td className="border border-maiz p-2">{campo.distancia_de_siembra}</td>
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

export default FieldsTable;
