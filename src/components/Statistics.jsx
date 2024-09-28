import React, { useEffect, useState } from 'react';
import Table from './Table';
import Seccion from './Seccion';
import { computeStatistics } from '../services/statistics';

const Statistics = ({ data }) => {
    const [statistics, setStatistics] = useState([]);

    const formattedColumns = [
        { title: 'Medida estadística' },
        { title: 'Temperaturas', subColumns: ['Mínima °C', 'Media °C', 'Máxima °C'] },
        { title: 'Humedad relativa', subColumns: ['Mínima %', 'Media %', 'Máxima %', 'Horas ≥ 90%'] },
        { title: 'Período de HR ≥ 90%', subColumns: ['Mínima °C', 'Media °C', 'Máxima °C'] },
        { title: 'Precipitación mm' },
        { title: 'Velocidad del viento (m/s)' }
    ]
    const columns = [
        'keyword', 
        'temperatura_maxima', 
        'temperatura_minima', 
        'temperatura_media', 
        'humedad_maxima', 
        'humedad_minima', 
        'humedad_media', 
        'horas_hr_mayor_que_90', 
        'hr_mayor_que_90_max', 
        'hr_mayor_que_90_min', 
        'hr_mayor_que_90_med', 
        'precipitacion', 
        'velocidad_del_viento'
    ]

    useEffect(() => {
        if (data && data.length > 0) {
            const stats = computeStatistics(data);
            setStatistics(stats);
        }
    }, [data]);

    return (
        <div className="flex flex-col justify-center w-full">
            <Seccion
                title={"Resumen estadístico de los registros filtrados"}
                content={
                    <div className="w-full overflow-x-auto mt-7 mb-4">
                        <Table
                            columns={columns}
                            formattedColumns={formattedColumns}
                            data={statistics}
                            compositeHeader={true}
                        />
                    </div>
                }
            />
        </div>
    );
};

export default Statistics;
