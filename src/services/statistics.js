export const computeStatistics = (data) => {
    const stats = {
        promedio: {},
        maximo: {},
        minimo: {},
        desviacionEstandar: {}
    };

    const numericFields = ['fase_fenologica', 'humedad_maxima', 'humedad_minima', 'humedad_media', 'temperatura_maxima', 'temperatura_minima', 'temperatura_media', 'precipitacion'];

    numericFields.forEach(field => {
        const values = data.map(item => item[field]);
        stats.promedio[field] = average(values);
        stats.maximo[field] = Math.max(...values);
        stats.minimo[field] = Math.min(...values);
        stats.desviacionEstandar[field] = standardDeviation(values);
    });

    return [
        { keyword: 'Promedio o moda', ...stats.promedio },
        { keyword: 'Máximo', ...stats.maximo },
        { keyword: 'Mínimo', ...stats.minimo },
        { keyword: 'Desviación estándar', ...stats.desviacionEstandar }
    ];
};

const average = (values) => values.reduce((a, b) => a + b, 0) / values.length;

const standardDeviation = (values) => {
    const avg = average(values);
    const squareDiffs = values.map(value => Math.pow(value - avg, 2));
    const avgSquareDiff = average(squareDiffs);
    return Math.sqrt(avgSquareDiff);
};

const mode = (values) => {
    const frequency = {};
    values.forEach(value => {
        frequency[value] = (frequency[value] || 0) + 1;
    });
    let maxFreq = 0;
    let mode = null;
    for (const key in frequency) {
        if (frequency[key] > maxFreq) {
            maxFreq = frequency[key];
            mode = key;
        }
    }
    return mode;
};
