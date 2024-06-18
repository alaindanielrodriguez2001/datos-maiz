'use client'
import React, { useState } from 'react';

const registro = () => {
    const [showForm, setShowForm] = useState(false);

    const handleAddObservation = () => {
        setShowForm(!showForm);
    };

    return (
        <main className="relative">

            <section className="flex flex-col container mx-auto px-4 py-10 text-amber-600">

                <h1 className="text-5xl text-center w-full mb-8">
                    Registro histórico de variables
                </h1>

                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse border border-amber-600">
                        <thead>
                            <tr>
                                <th className="border border-amber-600 p-2">Fecha</th>
                                <th className="border border-amber-600 p-2">Día o noche</th>
                                <th className="border border-amber-600 p-2">Lugar de cultivo</th>
                                <th className="border border-amber-600 p-2">Variedad</th>
                                <th className="border border-amber-600 p-2">Fase fenológica</th>
                                <th className="border border-amber-600 p-2">Humedad relativa</th>
                                <th className="border border-amber-600 p-2">Temperatura</th>
                                <th className="border border-amber-600 p-2">Precipitación del día anterior</th>
                                <th className="border border-amber-600 p-2">Presencia del hongo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Empty rows */}
                            {Array.from({ length: 10 }).map((_, index) => (
                                <tr key={index}>
                                    <td className="border border-amber-600 p-2"></td>
                                    <td className="border border-amber-600 p-2"></td>
                                    <td className="border border-amber-600 p-2"></td>
                                    <td className="border border-amber-600 p-2"></td>
                                    <td className="border border-amber-600 p-2"></td>
                                    <td className="border border-amber-600 p-2"></td>
                                    <td className="border border-amber-600 p-2"></td>
                                    <td className="border border-amber-600 p-2"></td>
                                    <td className="border border-amber-600 p-2"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button
                    className="bg-amber-600 text-white px-4 py-2 mt-4 rounded"
                    onClick={handleAddObservation}
                >
                    Registrar observación
                </button>

                {showForm && (
                    <form className="mt-4">

                        <input
                            type="text"
                            placeholder="Fecha"
                            className="border border-amber-600 p-2 w-full"
                        />

                        <input
                            type="text"
                            placeholder="Día o noche"
                            className="border border-amber-600 p-2 w-full"
                        />

                        <input
                            type="text"
                            placeholder="Lugar de cultivo"
                            className="border border-amber-600 p-2 w-full"
                        />

                        <input
                            type="text"
                            placeholder="Variedad"
                            className="border border-amber-600 p-2 w-full"
                        />

                        <input
                            type="text"
                            placeholder="Fase fenológica"
                            className="border border-amber-600 p-2 w-full"
                        />

                        <input
                            type="text"
                            placeholder="Humedad relativa"
                            className="border border-amber-600 p-2 w-full"
                        />

                        <input
                            type="text"
                            placeholder="Temperatura"
                            className="border border-amber-600 p-2 w-full"
                        />

                        <input
                            type="text"
                            placeholder="Precipitación del día anterior"
                            className="border border-amber-600 p-2 w-full"
                        />

                        <input
                            type="text"
                            placeholder="Presencia del hongo"
                            className="border border-amber-600 p-2 w-full"
                        />

                        <button
                            type="submit"
                            className="bg-amber-600 text-white px-4 py-2 mt-4 rounded"
                        >
                            Guardar
                        </button>
                    </form>
                )}

            </section>
        </main>
    )
}

export default registro;

