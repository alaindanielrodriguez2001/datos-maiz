'use client'

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import Table from '@/components/Table';
import Seccion from '@/components/Seccion';
import { fetchData } from '@/services/api';
import CustomButton from '@/components/CustomButton';

const Pronostico = () => {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const columns = [
        'unidad_nombre', 
        'fecha_de_siembra', 
        'denominacion_del_cultivar', 
        'periodo_favorable', 
        'plazo_primeros_sintomas', 
        'tipo_de_mensaje', 
        'total_grados_dias'
    ];
    const formattedColumns = [
        { title: 'Entidad productiva' },
        { title: 'Fecha de siembra' },
        { title: 'Denominación del cultivar' },
        { title: 'Período favorable' },
        { title: 'Plazo de primeros síntomas' },
        { title: 'Tipo de mensaje' },
        { title: 'Total de grados días (GDD) (°C)' },
    ];

    const ruta = 'pronosticos/';
    const fetchDataAsync = async () => {
        const result = await fetchData(ruta);
        setData(result);
    };

    const handleCopy = () => {
        if (selectedId) {
            const selectedRow = data.find(row => row.id === selectedId);
            const texto = `AVISO \n En la entidad productiva  ${selectedRow['unidad_nombre']}, sembrada en la fecha ${selectedRow['fecha_de_siembra']}, con denominación del cultivar ${selectedRow['denominacion_del_cultivar']}, el período ${selectedRow['periodo_favorable']} fue favorable a que en el plazo ${selectedRow['plazo_primeros_sintomas']} aparezcan los primeros síntomas de la enfermedad. Este es un mensaje de tipo ${selectedRow['tipo_de_mensaje']}. El total de grados días de la unidad de cultivo es ${selectedRow['total_grados_dias']}`;
            navigator.clipboard.writeText(texto)
                .then(() => {
                    window.alert("Pronóstico copiado al portapapeles.");
                })
                .catch(err => {
                    window.alert("Error al copiar datos al portapapeles.");
                    console.error('Error copying text: ', err);
                });
        } else {
            window.alert("Seleccione una fila para copiar sus datos.");
        }
    };

    useEffect(() => {
        fetchDataAsync();
    }, [ruta]);

    return (
        <div className="container mx-auto px-4">
            <div className="relative overflow-x-clip scroll-mx-0 px-10 text-maiz">
                <PageHeader
                    title={<>Pronósticos climáticos de la mancha de asfalto</>}
                    content={<>Aquí puede consultar los pronósticos sobre la incidencia de la enfermedad emitidos por el sistema.</>}
                />
                <Table
                    className="px-4"
                    deleteUrl={'pronostico'}
                    data={data}
                    columns={columns}
                    formattedColumns={formattedColumns}
                    onFetchData={() => fetchDataAsync()}
                    compositeHeader={false}
                    onSelectRow={setSelectedId} 
                />
                {selectedId && (
                    <div className="mt-3 w-full">
                        <CustomButton
                            onClick={handleCopy}
                            is_disabled={!selectedId}
                            customStyle={"w-full"}
                            content="Copiar pronóstico"
                        />
                    </div>
                )}
                <Seccion
                    title={"Metodología del pronóstico"}
                    content={
                        <>
                            <p className="text-xl text-gray-500 text-justify mx-5 px-5">
                                A partir del día de siembra se comienza el cálculo diario
                                de la suma térmica. Cuando el acumulado alcance 700 °C,
                                se comienza a tomar un período de 7 días. Si en esos días
                                se registra una temperatura media diaria entre 17 °C y
                                22 °C, una máxima menor que 30 °C, mínima superior a 15 °C,
                                humedad relativa diaria mayor o igual a 90% por más de 7
                                horas, y precipitación mayor que 25 mm, se da lugar a que
                                el día siguiente sea crítico. Es decir, se toma los días
                                1 al 7 después de la suma térmica de 700 °C, y si se
                                cumplen los parámetros meteorológicos anteriores el día
                                8 es crítico y después se va analizando los siguientes 7
                                días corriendo un día hacia adelante, del 2 al 8, y así
                                sucesivamente. Cuando se obtenga 5 días críticos se emite un
                                pronóstico de alerta, y cuando se llegue a 6 días críticos
                                se da uno de peligro máximo (no tienen que ser estrictamente
                                consecutivos, pues si uno o dos días subsiguientes no
                                resultan críticos, se saltan; pero si se pasan de dos días
                                seguidos que no sean críticos, se reinicia la cuenta). La
                                acumulación de calor (grados-días) se calcula restando 10
                                °C del valor medio de las temperaturas máxima y mínima;
                                pero si la temperatura máxima es mayor que 30 °C, se reemplaza
                                por 30 °C; y si la mínima es menor que 10 °C, se reemplaza por 10 °C.
                            </p>
                        </>
                    }
                />
            </div>
        </div>
    );
};

export default Pronostico;
