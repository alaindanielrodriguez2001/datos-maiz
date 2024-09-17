'use client'
import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import Table from '@/components/Table';
import InputForm from '@/components/InputForm';
import { fetchData } from '@/services/api';

const Unidades = () => {
    const [data, setData] = useState([]);
    const ruta = 'unidades/';

    const columns = [
        'nombre', 
        'estacion_codigo', 
        'denominacion_del_cultivar', 
        'tipo_de_suelo', 
        'fecha_de_siembra', 
        'semilla_con_tratamiento_quimico', 
        'area_sembrada',
        'tipo_de_fertilizante', 
        'dosis_de_fertilizante', 
        'marco_de_siembra', 
        'sistema_de_riego',
        'suma_termica',
        'dias_criticos'
    ];

    const formattedColumns = [
        { title: 'Nombre de la entidad productiva' },
        { title: 'Estación' },
        { title: 'Denominación del cultivar' },
        { title: 'Tipo de suelo' },
        { title: 'Fecha de siembra' },
        { title: 'Semilla con tratamiento químico'},
        { title: 'Área sembrada (ha)' },
        { title: 'Tipo de fertilizante' },
        { title: 'Dosis de fertilizante' },
        { title: 'Marco de siembra' },
        { title: 'Sistema de riego' },
        { title: 'Suma térmica acumulada' },
        { title: 'Racha de dias críticos' }
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
                    title={<>Unidades de cultivo</>}
                    content={<>En la tabla siguiente puede acceder a los datos de las unidades de cultivo de las diferentes entidades productivas 
                        asociadas a la investigación.
                    </>}
                />
                <Table
                    className="px-4"
                    data={data}
                    columns={columns}
                    formattedColumns={formattedColumns}
                    deleteUrl={'unidad'}
                    onFetchData={fetchDataAsync}
                    compositeHeader={false}
                />
                <InputForm
                    formFields={[
                        { name: 'nombre', type: 'text', placeholder: 'Nombre de la entidad' },
                        { name: 'estacion_codigo', type: 'select', placeholder: 'Estación' },
                        { name: 'denominacion_del_cultivar', type: 'text', placeholder: 'Denominación del cultivar' },
                        { name: 'tipo_de_suelo', type: 'text', placeholder: 'Tipo de suelo' },
                        { name: 'fecha_de_siembra', type: 'date', placeholder: 'Fecha de siembra' },
                        { name: 'semilla_con_tratamiento_quimico', type: 'checkbox', placeholder: 'Semilla con tratamiento químico' },
                        { name: 'area_sembrada', type: 'number', placeholder: 'Área sembrada (ha)' },
                        { name: 'tipo_de_fertilizante', type: 'text', placeholder: 'Tipo de fertilizante' },
                        { name: 'dosis_de_fertilizante', type: 'number', placeholder: 'Dosis de fertilizante' },
                        { name: 'marco_de_siembra', type: 'number', placeholder: 'Marco de siembra' },
                        { name: 'sistema_de_riego', type: 'text', placeholder: 'Sistema de riego' },

                    ]}
                    fetchUrls={[
                        { name: 'estacion_codigo', url: 'estaciones/' },
                      ]}
                    postUrl={'unidades/'}
                    buttonText="Registrar nueva unidad de cultivo"
                    onFormSubmit={fetchDataAsync}
                />
            </main>
        </div>
    );
};

export default Unidades;
