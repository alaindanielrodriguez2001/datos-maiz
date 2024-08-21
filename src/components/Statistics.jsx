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
                        columns={['keyword', 'fase_fenologica', 'humedad_maxima', 'humedad_minima', 'humedad_media', 'temperatura_maxima', 'temperatura_minima', 'temperatura_media', 'precipitacion']}
                        formattedColumns={['', 'Fase fenológica', 'Humedad máxima', 'Humedad mínima', 'Humedad media', 'Temperatura máxima', 'Temperatura mínima', 'Temperatura media', 'Precipitación']}
                        data={statistics}
                    />               
            </div>
        </div>
    );
};

export default Statistics;
