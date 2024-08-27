'use client'
import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader'
import Table from '@/components/Table'
import { fetchData } from '@/services/api';

const Pronostico = () => {
    const [data, setData] = useState([])
    const columns=['unidad', 'denominacion_del_cultivar', 'periodo_favorable', 'plazo_primeros_sintomas', 'tipo_de_mensaje', 'total_grados_dias', 'fase_fenologica']
    const formattedColumns=[
        {title: 'Unidad'}, 
        {title: 'Denominación del cultivar'}, 
        {title: 'Período favorable'}, 
        {title: 'Plazo de primeros sìntomas'}, 
        {title: 'Tipo de mensaje'}, 
        {title: 'Total de grados días (GDD) (°C)'}, 
        {title: 'Fase fenológica'}
    ]
    const ruta = 'pronosticos/';

    const fetchDataAsync = async () => {
        const result = await fetchData(ruta);
        setData(result);
    };

    useEffect(() => {
        fetchDataAsync();
    }, [ruta]);


    return (
        <div className="relative overflow-x-clip scroll-mx-0 px-10 text-maiz">
            <PageHeader
                title={<>Pronósticos climáticos de la mancha de asfalto</>}
                content={<>Aquí puede consultar los pronósticos sobre la incidencia de la enfermedad emitidos por el sistema.</>}
            />

            <Table
                className="px-4"
                deleteUrl={'pronostico'}
                columns={columns}
                formattedColumns={formattedColumns}
                onFetchData={() => fetchDataAsync()}
                compositeHeader={false}
            />
        </div>
    )
}

export default Pronostico