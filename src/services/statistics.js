export const computeStatistics = (data) => {
    const stats = {
        promedio: {},
        maximo: {},
        minimo: {},
    };

    const numericFields = [
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
    ];

    numericFields.forEach(field => {
        const values = data.map(item => item[field]);
        stats.promedio[field] = average(values).toFixed(2);
        stats.maximo[field] = Math.max(...values).toFixed(2);
        stats.minimo[field] = Math.min(...values).toFixed(2);
    });

    return [
        { keyword: 'Promedio', ...stats.promedio },
        { keyword: 'Máximo', ...stats.maximo },
        { keyword: 'Mínimo', ...stats.minimo },
    ];
};

const average = (values) => values.reduce((a, b) => a + b, 0) / values.length;
