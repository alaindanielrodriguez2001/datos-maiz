import React, { useEffect, useState } from 'react';
import Table from './Table';
import { computeStatistics } from '../services/statistics';

const Statistics = ({ data }) => {
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            const stats = computeStatistics(data);
            setStatistics(stats);
        }
    }, [data]);

    return (
        <div className="flex flex-col justify-center space-y-5 w-full">
            <h2 className="text-maiz text-4xl text-center">
                Resumen estadístico de los registros filtrados
            </h2>
            <div className="w-full overflow-x-auto my-7">
                <Table
                    columns={['keyword', 'temperatura_maxima', 'temperatura_minima', 'temperatura_media', 'humedad_maxima', 'humedad_minima', 'humedad_media', 'horas_hr_mayor_que_90', 'hr_mayor_que_90_max', 'hr_mayor_que_90_min', 'hr_mayor_que_90_med', 'precipitacion', 'velocidad_del_viento']}
                    formattedColumns={[
                        { title: 'Estación' },
                        { title: 'Fecha' },
                        { title: 'Temperaturas', subColumns: ['Mínima °C', 'Media °C', 'Máxima °C'] },
                        { title: 'Humedad relativa', subColumns: ['Mínima %', 'Media %', 'Máxima %', 'Horas > 90%'] },
                        { title: 'Período de HR ≥ 90%', subColumns: ['Mínima °C', 'Media °C', 'Máxima °C'] },
                        { title: 'Precipitación mm' },
                        { title: 'Velocidad del viento (m seg-1)' }
                    ]}
                    data={statistics}
                    compositeHeader = {true}
                />
            </div>
        </div>
    );
};

export default Statistics;
