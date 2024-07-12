'use client'
import React, { useState } from 'react';
import CustomButton from './CustomButton';

const NewObservationForm = () => {
    const [showForm, setShowForm] = useState(false);

    const handleAddObservation = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <CustomButton
                customStyle="w-full mt-8 mb-3"
                onClick={handleAddObservation}
                content="Registrar nueva observación"
            />

            {showForm && (
                <form className="space-y-3 mb-4">

                    <input
                        type="text"
                        placeholder="Fecha"
                        className="border border-maiz p-2 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Día o noche"
                        className="border border-maiz p-2 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Lugar de cultivo"
                        className="border border-maiz p-2 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Variedad"
                        className="border border-maiz p-2 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Fase fenológica"
                        className="border border-maiz p-2 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Humedad relativa"
                        className="border border-maiz p-2 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Temperatura"
                        className="border border-maiz p-2 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Precipitación del día anterior"
                        className="border border-maiz p-2 w-full"
                    />

                    <input
                        type="text"
                        placeholder="Presencia del hongo"
                        className="border border-maiz p-2 w-full"
                    />

                    <CustomButton
                        customStyle="w-full my-3"
                        content="Guardar"
                    />
                </form>
            )}
        </div>
    )
}

export default NewObservationForm