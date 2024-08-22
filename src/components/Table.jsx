'use client'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import CustomButton from './CustomButton';

const Table = ({ columns, formattedColumns, data, deleteUrl, onFetchData }) => {
    const [selectedId, setSelectedId] = useState(null);
    const { data: session, status } = useSession();

    const handleRowClick = (id) => {
        setSelectedId(id);
    };

    const handleDelete = async () => {
        if (selectedId) {
            const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta fila?');
            if (confirmDelete) {
                try {
                    await axios.delete(`${deleteUrl}/${selectedId}`, {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`,
                        },
                    });
                    onFetchData();
                    setSelectedId(null);
                    window.alert("La fila fue eliminada.");
                } catch (error) {
                    window.alert("Usted necesita autenticarse para modificar la información guardada en el sistema");
                    console.log(error);
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
                    {data.map((row) => (
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
