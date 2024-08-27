'use client'
import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import Table from '@/components/Table';
import InputForm from '@/components/InputForm';
import { fetchData } from '@/services/api';

const Estaciones = () => {
    const [data, setData] = useState([]);
    const ruta = 'estaciones/';

    const columns = ['codigo', 'nombre', 'municipio'];
    const formattedColumns = [
        { title: 'Código' },
        { title: 'Nombre' },
        { title: 'Municipio' }
    ];

    const fetchDataAsync = async () => {
        const result = await fetchData(ruta);
        setData(result);
    };

    useEffect(() => {
        fetchDataAsync();
    }, [ruta]);

    return (
        <div>
            <main className="relative overflow-x-clip scroll-mx-0 px-10 text-maiz">
                <PageHeader
                    title={<>Estaciones meteorológicas</>}
                    content={<>En la tabla siguiente puede acceder a los datos de las estaciones meteorológicas relevantes.</>}
                />
                <Table
                    className="px-4"
                    data={data}
                    columns={columns}
                    formattedColumns={formattedColumns}
                    deleteUrl={'estacion'}
                    onFetchData={fetchDataAsync}
                    compositeHeader={false}
                />
                <InputForm
                    formFields={[
                        { name: 'codigo', type: 'text', placeholder: 'Código' },
                        { name: 'nombre', type: 'text', placeholder: 'Nombre' },
                        { name: 'municipio', type: 'text', placeholder: 'Municipio' },
                    ]}
                    postUrl={'estaciones/'}
                    buttonText="Registrar nueva estación"
                    onFormSubmit={fetchDataAsync}
                />
            </main>
        </div>
    );
};

export default Estaciones;
