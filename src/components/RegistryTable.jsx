import React from 'react'

const RegistryTable = () => {
  return (
    <>
        <div className="w-full overflow-x-auto my-7">
                    <table className="w-full border-collapse border border-maiz-dark">
                        <thead>
                            <tr>
                                <th className="border border-maiz-dark p-2">Fecha</th>
                                <th className="border border-maiz-dark p-2">Día o noche</th>
                                <th className="border border-maiz-dark p-2">Lugar de cultivo</th>
                                <th className="border border-maiz-dark p-2">Variedad</th>
                                <th className="border border-maiz-dark p-2">Fase fenológica</th>
                                <th className="border border-maiz-dark p-2">Humedad relativa</th>
                                <th className="border border-maiz-dark p-2">Temperatura</th>
                                <th className="border border-maiz-dark p-2">Precipitación del día anterior</th>
                                <th className="border border-maiz-dark p-2">Presencia del hongo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Empty rows */}
                            {Array.from({ length: 10 }).map((_, index) => (
                                <tr key={index}>
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
                            ))}
                        </tbody>
                    </table>
                </div>
    </>
  )
}

export default RegistryTable;