import React from 'react'

const RegistryTable = () => {
  return (
    <>
        <div className="w-full overflow-x-auto my-7">
                    <table className="w-full border-collapse border border-maiz-dark">
                        <thead>
                            <tr>
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
                            {/* Empty rows */}
                            {Array.from({ length: 7 }).map((_, index) => (
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