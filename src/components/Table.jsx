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
            const confirmDelete = window.confirm('¿Está seguro de que desea eliminar esta fila?');
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
        <div className="table-container w-full overflow-x-auto h-auto mt-7 mb-2">
            <div className="w-full overflow-x-auto h-auto mt-7 mb-2">
                <div className="container border-2 h-auto max-h-[500px] w-full overflow-y-scroll border-maiz-dark">
                    <table className="w-full h-auto table-auto">
                        <thead className="bg-white sticky top-0 ">
                            <tr>
                                {formattedColumns.map((column) => (
                                    <th key={column.title} colSpan={column.subColumns ? column.subColumns.length : 1} className='border-r-2 border-l-2 border-maiz-dark p-2'>
                                        {column.title}
                                    </th>
                                ))}
                            </tr>
                            {compositeHeader && (
                                <tr>
                                    {formattedColumns.map((column) => (
                                        column.subColumns ? column.subColumns.map((subColumn) => (
                                            <th key={subColumn} className="border-r-2 border-l-2 border-maiz-dark p-2">{subColumn}</th>
                                        )) : <th key={column.title} className="border-r-2 border-l-2 border-maiz-dark p-2"></th>
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
                                        <td key={column} className="border-l-2 border-r-2 border-maiz p-2">
                                            {row[column] === true || row[column] === false ? (row[column] ? 'Sí' : 'No') : row[column]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {data.length == 0 &&
                    (<div className="w-full border-collapse border border-maiz-dark">
                        <div className="items-center justify-center text-center p-2 text-xl w-full">
                            No hay datos aún
                        </div>
                    </div>
                    )
                }


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
        </div>
    );
};

export default Table;
