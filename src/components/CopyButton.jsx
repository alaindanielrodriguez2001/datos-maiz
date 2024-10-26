import React from 'react';
import CustomButton from './CustomButton';

const CopyButton = ({ selectedId, data, columns }) => {
    const handleCopy = () => {
        if (selectedId) {
            const selectedRow = data.find(row => row.id === selectedId);
            const rowData = columns.map(column => `${column}: ${selectedRow[column]}`).join('\n');
            const texto = `AVISO \n En la entidad productiva  ${selectedRow[unidad_nombre]}, sembrada en la fecha ${selectedRow[fecha_de_siembra]}, con denominación del cultivar ${selectedRow[denominacion_del_cultivar]}, el período ${selectedRow[periodo_favorable]} fue favorable a que en el plazo ${selectedRow[plazo_primeros_sintomas]} aparezcan los primeros síntomas de la enfermedad. Este es un mensaje de tipo ${selectedRow[tipo_de_mensaje]}. El total de grados días de la unidad de cultivo es ${selectedRow[total_grados_dias]}`
            navigator.clipboard.writeText(rowData)
                .then(() => {
                    window.alert("Datos copiados al portapapeles.");
                })
                .catch(err => {
                    window.alert("Error al copiar datos al portapapeles.");
                    console.error('Error copying text: ', err);
                });
        } else {
            window.alert("Seleccione una fila para copiar sus datos.");
        }
    };

    return (
        <CustomButton
            onClick={ handleCopy}
            content= {"Copiar reporte"}
        />
    );
};

export default CopyButton;
