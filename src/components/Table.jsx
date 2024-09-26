'use client'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { deleteData } from '@/services/api';
import CustomButton from './CustomButton';

const Table = ({ columns, formattedColumns, data, deleteUrl, onFetchData, compositeHeader }) => {
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

                    await deleteData(`${deleteUrl}/${selectedId}`, {
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
            <div className="relative h-96 overflow-y-auto">
                <table className="w-full border-collapse border border-maiz-dark">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            {formattedColumns.map((column) => (
                                <th key={column.title} colSpan={column.subColumns ? column.subColumns.length : 1} className={`${column.subColumns ? 'border': 'border-t border-r border-l'} border-maiz-dark p-2`}>
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                        {compositeHeader && (
                            <tr>
                                {formattedColumns.map((column) => (
                                    column.subColumns ? column.subColumns.map((subColumn) => (
                                        <th key={subColumn} className="border border-maiz-dark p-2">{subColumn}</th>
                                    )) : <th key={column.title} className="border-b border-r border-l border-maiz-dark p-2"></th>
                                ))}
                            </tr>
                        )}
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
                                        {row[column] === true || row[column] === false ? (row[column] ? 'Sí' : 'No') : row[column]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="w-full border-collapse border border-maiz-dark">
                {data.length == 0 &&
                    (
                        <div className="items-center justify-center text-center p-2 text-xl w-full">
                            No hay datos aún
                        </div>
                    )
                }
            </div>

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
