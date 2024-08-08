'use client'

import { useEffect, useState } from 'react';
import { fetchCampos } from '../services/api';

const FieldsTable = () => {
    const [campos, setCampos] = useState([]);

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
                    </tr>
                </thead>
                <tbody>
                    {campos.map((campo) => (
                        <tr key={campo.id}>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FieldsTable;
