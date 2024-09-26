import React from 'react';
import LineGraph from './LineGraph';

const GraphsCard = ({ title, graphs_data }) => {
    return (
        <div>
            <div className="justify-center border-2 border-maiz-dark rounded-xl">
                <div className="my-4 px-4">
                    <h1 className="text-4xl text-center text-maiz-dark mb-4">
                        {title}
                    </h1>
                    <div className="flex flex-col mx-2 h-full space-y-3">
                        {graphs_data.map((graph, index) => (
                            <div key={index} className="border-2 border-maiz-dark rounded-xl w-full h-[325px] flex flex-col justify-center items-center">
                                <h1 className = "my-2 text-2xl text-maiz text-center">
                                    {graph.titulo}
                                </h1>
                                <LineGraph
                                    horizontal_values={graph.horizontal}
                                    vertical_values={graph.vertical}
                                    className="w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphsCard;
