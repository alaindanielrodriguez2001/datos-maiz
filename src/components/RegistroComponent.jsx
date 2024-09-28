'use client'
import React, { useState, useEffect } from 'react';
import TableSelector from './TableSelector';
import Table from './Table';
import Statistics from './Statistics';
import GraphsCard from './GraphsCard';
import InputForm from './InputForm';
import Seccion from './Seccion';
import { fetchData, postData } from '../services/api';

const RegistroComponent = () => {
  const [estacionSeleccionada, setEstacionSeleccionada] = useState(0);
  const [yearSeleccionado, setYearSeleccionado] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);

  const formattedColumns = [
    { title: 'Estación' },
    { title: 'Fecha' },
    { title: 'Temperaturas', subColumns: ['Mínima °C', 'Media °C', 'Máxima °C'] },
    { title: 'Humedad relativa', subColumns: ['Mínima %', 'Media %', 'Máxima %', 'Horas > 90%'] },
    { title: 'Período de HR ≥ 90%', subColumns: ['Mínima °C', 'Media °C', 'Máxima °C'] },
    { title: 'Precipitación mm' },
    { title: 'Velocidad del viento (m seg-1)' }
  ];
  const columns = [
    'estacion_nombre',
    'fecha', 'temperatura_maxima',
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
  ];

  const rutaRegistrosEstacionSeleccionada = `registros_estacion/${estacionSeleccionada}`;
  const rutaOpciones = 'estaciones/';

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData(rutaRegistrosEstacionSeleccionada);
      const filteredData = result.filter(item => new Date(item.fecha).getFullYear() === yearSeleccionado);
      setData(filteredData);
    };
    fetchDataAsync();
  }, [estacionSeleccionada, yearSeleccionado]);

  return (
    <div>
      <TableSelector
        rutaOpciones={rutaOpciones}
        onOpcionChange={setEstacionSeleccionada}
        onYearChange={setYearSeleccionado}
      />

      <Table
        columns={columns}
        formattedColumns={formattedColumns}
        data={data}
        deleteUrl={'registro'}
        onFetchData={async () => {
          const result = await fetchData(rutaRegistrosEstacionSeleccionada);
          const filteredData = result.filter(item => new Date(item.fecha).getFullYear() === yearSeleccionado);
          setData(filteredData);
        }}
        compositeHeader={true}
      />

      <InputForm
        formFields={[
          { name: 'estacion', type: 'select', placeholder: 'Seleccione una estación' },
          { name: 'fecha', type: 'date', placeholder: 'Fecha' },
          { name: 'temperatura_maxima', type: 'number', placeholder: 'Temperatura máxima °C' },
          { name: 'temperatura_minima', type: 'number', placeholder: 'Temperatura mínima °C' },
          { name: 'temperatura_media', type: 'number', placeholder: 'Temperatura media °C' },
          { name: 'humedad_maxima', type: 'number', placeholder: 'Humedad relativa máxima' },
          { name: 'humedad_minima', type: 'number', placeholder: 'Humedad relativa mínima' },
          { name: 'humedad_media', type: 'number', placeholder: 'Humedad relativa media' },
          { name: 'horas_hr_mayor_que_90', type: 'number', placeholder: 'Horas HR ≥ 90 %' },
          { name: 'hr_mayor_que_90_max', type: 'number', placeholder: 'Máxima °C HR ≥ 90 %' },
          { name: 'hr_mayor_que_90_min', type: 'number', placeholder: 'Mínima °C HR ≥ 90 %' },
          { name: 'hr_mayor_que_90_med', type: 'number', placeholder: 'Media °C HR ≥ 90 %' },
          { name: 'precipitacion', type: 'number', placeholder: 'Precipitación mm' },
          { name: 'velocidad_del_viento', type: 'number', placeholder: 'Velocidad del viento m/s' },
        ]}
        fetchUrls={[
          { name: 'estacion', url: 'estaciones/' },
        ]}
        postUrl={'registros/'}
        buttonText="Introducir un nuevo registro"
        onFormSubmit={async () => {
          const result = await fetchData(rutaRegistrosEstacionSeleccionada);
          const filteredData = result.filter(item => new Date(item.fecha).getFullYear() === yearSeleccionado);
          setData(filteredData);
        }}
      />

      <div className="flex flex-col px-4 text-maiz">
        <div className="container flex flex-col">
          <Statistics data={data} />
        </div>
        <Seccion
          title={"Comportamiento de la estación seleccionada en los últimos 7 registros"}
          content={
            <div className="container flex flex-col space-y-4">
              <GraphsCard
                graphs_data={
                  [
                    { horizontal: data.slice(-7).map(item => item.fecha), vertical: data.slice(-7).map(item => item.temperatura_maxima), titulo: 'Máxima' },
                    { horizontal: data.slice(-7).map(item => item.fecha), vertical: data.slice(-7).map(item => item.temperatura_minima), titulo: 'Mínima' },
                    { horizontal: data.slice(-7).map(item => item.fecha), vertical: data.slice(-7).map(item => item.temperatura_media), titulo: 'Media' },
                  ]
                }
                title="Temperatura (°C)"
              />
              <GraphsCard
                graphs_data={
                  [
                    { horizontal: data.slice(-7).map(item => item.fecha), vertical: data.slice(-7).map(item => item.humedad_maxima), titulo: 'Máxima' },
                    { horizontal: data.slice(-7).map(item => item.fecha), vertical: data.slice(-7).map(item => item.humedad_minima), titulo: 'Mínima' },
                    { horizontal: data.slice(-7).map(item => item.fecha), vertical: data.slice(-7).map(item => item.humedad_media), titulo: 'Media' },
                    { horizontal: data.slice(-7).map(item => item.fecha), vertical: data.slice(-7).map(item => item.horas_hr_mayor_que_90), titulo: 'Horas con más del 90%' },
                  ]
                }
                title="Humedad relativa (%)"
              />
              <GraphsCard
                graphs_data={
                  [
                    { horizontal: data.slice(-7).map(item => item.fecha), vertical: data.slice(-7).map(item => item.precipitacion), titulo: 'Precipitación mm' },
                    { horizontal: data.slice(-7).map(item => item.fecha), vertical: data.slice(-7).map(item => item.velocidad_del_viento), titulo: 'Velocidad del viento m/s' },
                  ]
                }
                title="Precipitación y velocidad del viento"
              />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default RegistroComponent;
