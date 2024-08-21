'use client'
import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import Table from '@/components/Table';
import InputForm from '@/components/InputForm';
import { fetchCampos } from '@/services/api';

const Page = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchCampos();
                setData(result);
            } catch (error) {
                console.error('Failed to fetch campos:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <main className="relative overflow-x-clip scroll-mx-0 px-10 text-maiz">
                <PageHeader
                    title={<>Campos de cultivo</>}
                    content={<>En la tabla siguiente puede acceder a los datos de los campos de cultivo vinculados al estudio.</>}
                />
                <Table
                    className="px-4"
                    data={data}
                    deleteUrl={`${process.env.NEXT_PUBLIC_API_URL}/campo`}
                    columns={['nombre_del_campo', 'municipio', 'forma_productiva', 'cultivar', 'tipo_de_suelo', 'sistema_de_riego', 'altura_snm', 'metodo_de_siembra', 'tipo_de_fertilizacion', 'tipo_de_labor_cultural', 'distancia_de_siembra']}
                    formattedColumns={['Nombre', 'Municipio', 'Forma productiva', 'Cultivar', 'Tipo de suelo', 'Sistema de riego', 'Altura SNM', 'Método de siembra', 'Tipo de fertilización', 'Tipo de laber cultural', 'Distancia de siembra']}
                />
                <InputForm
                    formFields={[
                        { name: 'nombre_del_campo', type: 'text', placeholder: 'Nombre del campo' },
                        { name: 'municipio', type: 'text', placeholder: 'Municipio' },
                        { name: 'forma_productiva', type: 'text', placeholder: 'Forma productiva' },
                        { name: 'cultivar', type: 'text', placeholder: 'Cultivar' },
                        { name: 'tipo_de_suelo', type: 'text', placeholder: 'Tipo de suelo' },
                        { name: 'sistema_de_riego', type: 'text', placeholder: 'Sistema de riego' },
                        { name: 'altura_snm', type: 'number', placeholder: 'Altura SNM' },
                        { name: 'metodo_de_siembra', type: 'text', placeholder: 'Método de siembra' },
                        { name: 'tipo_de_fertilizacion', type: 'text', placeholder: 'Tipo de fertilización' },
                        { name: 'tipo_de_labor_cultural', type: 'text', placeholder: 'Tipo de labor cultural' },
                        { name: 'distancia_de_siembra', type: 'number', placeholder: 'Distancia de siembra' },
                    ]}
                    postUrl={`${process.env.NEXT_PUBLIC_API_URL}/campos/`}
                    buttonText="Registrar nuevo campo"
                />
            </main>
        </div>
    );
};

export default Page;
