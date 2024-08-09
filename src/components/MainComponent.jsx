'use client'
import React, { useState } from 'react';
import TableSelector from './TableSelector';
import Table from './Table';

const MainComponent = () => {
    const [selectedCampo, setSelectedCampo] = useState("Todos");

    return (
        <div>
            <TableSelector onCampoChange={setSelectedCampo} />
            <Table
                columns={['nombre_del_campo', 'fecha', 'fase_fenologica', 'humedad_maxima', 'humedad_minima', 'humedad_media', 'temperatura_maxima', 'temperatura_minima', 'temperatura_media', 'precipitacion', 'presencia_del_hongo']}
                formattedColumns={['Campo', 'Fecha', 'Fase fenológica', 'Humedad máxima', 'Humedad mínima', 'Humedad media', 'Temperatura máxima', 'Temperatura mínima', 'Temperatura media', 'Precipitación', 'Presencia del hongo']}
                fetchUrl={`${process.env.NEXT_PUBLIC_API_URL}/observaciones/`}
                deleteUrl={`${process.env.NEXT_PUBLIC_API_URL}/observaciones`}
                campo={selectedCampo}
            />
        </div>
    );
};

export default MainComponent;
