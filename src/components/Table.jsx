'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomButton from './CustomButton';

const Table = ({ columns, formattedColumns, fetchUrl, deleteUrl, campo }) => {
    const [rows, setRows] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [url, setUrl] = useState(fetchUrl);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(campo){
                    const campoUrl = campo === "Todos" ? fetchUrl : `${fetchUrl}?campo=${campo}`;
                    setUrl(campoUrl)
                }
                
                const response = await axios.get(url);
                setRows(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();

        
    }, [fetchUrl, campo]);

    const handleRowClick = (id) => {
        setSelectedId(id);
    };

    const handleDelete = async () => {
        if (selectedId) {
            const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta fila?');
            if (confirmDelete) {
                try {
                    await axios.delete(`${deleteUrl}/${selectedId}/`);
                    setRows(rows.filter(row => row.id !== selectedId));
                    setSelectedId(null);
                } catch (error) {
                    console.error('Failed to delete row:', error);
                    alert('No se pudo eliminar la fila. Por favor, inténtalo de nuevo.');
                }
            }
        }
    };

    return (
        <div className="w-full overflow-x-auto mt-7 mb-2">
            <table className="w-full border-collapse border border-maiz-dark">
                <thead>
                    <tr>
                        {formattedColumns.map((column) => (
                            <th key={column} className="border border-maiz-dark p-2">{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr
                            key={row.id}
                            onClick={() => handleRowClick(row.id)}
                            className={selectedId === row.id ? 'bg-gray-200' : ''}
                        >
                            {columns.map((column) => (
                                <td key={column} className="border border-maiz p-2">
                                    {column === 'presencia_del_hongo' ? (row[column] ? 'Sí' : 'No') : row[column]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedId && (
                <div className="mt-3 w-full">
                    <CustomButton
                        onClick={handleDelete}
                        is_disabled={!selectedId}
                        customStyle={"w-full"}
                        content="Eliminar"
                    />
                </div>
            )}
        </div>
    );
};

export default Table;
