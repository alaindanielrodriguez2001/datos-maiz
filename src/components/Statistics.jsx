import React from 'react'

const Statistics = () => {
    return (
        <div className="flex flex-col justify-center space-y-5 w-full">

            <h2 className="text-maiz text-4xl text-center">
                Resumen estadístico de los registros filtrados
            </h2>

            <div className="w-full overflow-x-auto my-7">
                <table className="w-full border-collapse border border-maiz-dark">
                    <thead>
                        <tr>
                            <th className="p-2"></th>
                            <th className="border border-maiz-dark p-2">Fecha</th>
                            <th className="border border-maiz-dark p-2">Fase fenológica</th>
                            <th className="border border-maiz-dark p-2">Humedad relativa máxima</th>
                            <th className="border border-maiz-dark p-2">Humedad relativa mínima</th>
                            <th className="border border-maiz-dark p-2">Humedad relativa media</th>
                            <th className="border border-maiz-dark p-2">Temperatura máxima</th>
                            <th className="border border-maiz-dark p-2">Temperatura mínima</th>
                            <th className="border border-maiz-dark p-2">Temperatura media</th>
                            <th className="border border-maiz-dark p-2">Precipitación</th>
                            <th className="border border-maiz-dark p-2">Presencia del hongo</th>
                        </tr>
                    </thead>

                    <tbody>
                        <NewRow keyword="Promedio o moda"/>                        
                        <NewRow keyword="Máximo"/>
                        <NewRow keyword="Mínimo"/>
                        <NewRow keyword="Desviación estándar"/>
                    </tbody>
                </table>
            </div>


        </div>
    )
}



const NewRow = ({ keyword }) => {
    return (
        <tr>
            <td className="border border-maiz p-2">{keyword}</td>
            <td className="border border-maiz p-2"></td>
            <td className="border border-maiz p-2"></td>
            <td className="border border-maiz p-2"></td>
            <td className="border border-maiz p-2"></td>
            <td className="border border-maiz p-2"></td>
            <td className="border border-maiz p-2"></td>
            <td className="border border-maiz p-2"></td>
            <td className="border border-maiz p-2"></td>
            <td className="border border-maiz p-2"></td>
            <td className="border border-maiz p-2"></td>
        </tr>
    )
}

export default Statistics