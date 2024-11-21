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
        <div className="container mx-auto px-4">
            <main className="relative overflow-x-clip scroll-mx-0 text-maiz">
                <PageHeader
                    title={<>Estaciones meteorológicas</>}
                    content={<>En la tabla siguiente puede acceder a los datos de las estaciones meteorológicas relevantes.</>}
                />
                <div className="max-w-full">
                    <Table
                        className="w-full"
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
                            { name: 'municipio', type: 'municipio', placeholder: 'Municipio' },
                        ]}
                        postUrl={'estaciones/'}
                        buttonText="Registrar nueva estación"
                        onFormSubmit={fetchDataAsync}
                        municipios={
                            ["Caibarién", "Camajuaní", "Cifuentes", "Corralillo", "Encrucijada", "Manicaragua", "Placetas", "Quemado de Güines", "Ranchuelo", "Remedios", "Sagua La Grande", "Santa Clara", "Santo Domingo"]
                        }
                    />
                </div>
            </main>
        </div>
    );
};

export default Estaciones;
