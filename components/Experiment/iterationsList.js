import React, { useState } from "react";

const IterationsList = ({ data }) => {
    
    return (
        <>
            <table className="table align-items-center mb-0">
                <thead>
                    <th className="width_16 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Iteration ID
                    </th>
                    <th className="width_35 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Experiment ID
                    </th>
                    <th className="width_35 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        CPU
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Memory
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Success Rate
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Status
                    </th>
                </thead>
                <tbody>
                
                    {data && data.map((iteration, index) => (
                    <tr key={index}>
                        <td>
                            <div className="d-flex px-2">
                                <div className="my-auto">
                                    <h6 className="mb-0 text-xs">{iteration.iterationNumber || ''}</h6>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex px-2">
                                <div className="my-auto">
                                    <h6 className="mb-0 text-xs">{iteration.experimentNumber || ''}</h6>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex px-2">
                                <div className="my-auto">
                                    <h6 className="mb-0 text-xs">
                                        {parseFloat(iteration.cpu).toPrecision(3) || ''}</h6>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex px-2">
                                <div className="my-auto">
                                    <h6 className="mb-0 text-xs">
                                        {parseFloat(iteration.memory)  || ''}</h6>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex px-2">
                                <div className="my-auto">
                                    <h6 className="mb-0 text-xs">
                                    {parseFloat(iteration.successRate).toPrecision(4)  || ''}
                                   </h6>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex px-2">
                                <div className="my-auto">
                                    <h6 className="mb-0 text-xs">{iteration.status || ''}</h6>
                                </div>
                            </div>
                        </td>
                    </tr>

                    ))}
                </tbody>
            </table>
        </>
    )
}
export default IterationsList;