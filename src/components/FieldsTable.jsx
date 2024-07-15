import React from 'react'

const FieldsTable = () => {
  return (
    <>
        <div className="w-full overflow-x-auto my-7 text-maiz">
                    <table className="w-full border-collapse border border-maiz-dark">
                        <thead>
                            <tr>
                                <th className="border border-maiz-dark p-2">Nombre del campo</th>
                                <th className="border border-maiz-dark p-2">Municipio</th>
                                <th className="border border-maiz-dark p-2">Forma productiva</th>
                                <th className="border border-maiz-dark p-2">Cultivar</th>
                                <th className="border border-maiz-dark p-2">Tipo de suelo</th>
                                <th className="border border-maiz-dark p-2">Sistema de riego</th>
                                <th className="border border-maiz-dark p-2">Altura snm</th>
                                <th className="border border-maiz-dark p-2">Método de siembra</th>
                                <th className="border border-maiz-dark p-2">Tipo de fertilización</th>
                                <th className="border border-maiz-dark p-2">Tipo de labor cultural</th>
                                <th className="border border-maiz-dark p-2">Distancia de siembra</th>
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
                                    <td className="border border-maiz p-2"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    </>
  )
}

export default FieldsTable;