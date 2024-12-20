'use client'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import CustomButton from './CustomButton';

const Table = ({ columns, formattedColumns, data, deleteUrl, onFetchData, compositeHeader, onSelectRow }) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [selectedId, setSelectedId] = useState(null);
    const { data: session, status } = useSession();

    const handleRowClick = (id) => {
        setSelectedId(id);
        if (onSelectRow){
            onSelectRow(id);
        }
    };

    const handleDelete = async () => {
        if (selectedId) {
            const confirmDelete = window.confirm('¿Está seguro de que desea eliminar esta fila?');
            if (confirmDelete) {
                try {
                    const response = await fetch(`${API_URL}/${deleteUrl}/${selectedId}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`,
                        },
                    });
                    if (response.status === 401) {
                        window.alert("Usted necesita autenticarse para modificar la información guardada en el sistema.");
                    }else if (response.status === 422) {
                        window.alert("Un pronóstico no puede ser borrado mientras sea relevante. La unidad de cultivo asociada tiene más de 4 días críticos.");
                    } else if (response.ok) {
                        onFetchData();
                        setSelectedId(null);
                    } 
                } catch (error) {
                    window.alert("No tiene permiso para modificar la información. Verifique que se encuentra autenticado.");
                    console.log(error);
                }
            }
        }
    };
    

    return (
        <div className="table-container w-full overflow-x-auto h-auto mt-2 mb-2">
            <div className="w-full overflow-x-auto h-auto mt-2 mb-2">
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
                                            <th
                                                key={subColumn}
                                                className="border-r-2 border-l-2 border-maiz-dark p-2">
                                                {subColumn}
                                            </th>
                                        )) : <th key={column.title} className="border-r-2 border-l-2 border-maiz-dark p-2"></th>
                                    ))}
                                </tr>
                            )}
                        </thead>
                        {data &&
                            (
                                <tbody className = "text-gray-600">
                                    {data.map((row) => (
                                        <tr
                                            key={row.id}
                                            onClick={() => handleRowClick(row.id)}
                                            className={selectedId === row.id ? 'bg-gray-200' : ''}
                                        >
                                            {columns.map((column) => (
                                                <td
                                                    key={column}
                                                    className={`border-r-2 border-l-2 border-maiz-dark p-2 ${row[column] == "Peligro máximo" ? "text-red-500 font-black" : row[column]=="Alerta"? "text-yellow-950 font-black": ""}`}>
                                                        {row[column] === true || row[column] === false ? (row[column] ? 'Sí' : 'No') : row[column]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            )
                        }
                    </table>
                </div>


                {data && data.length == 0 &&
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
