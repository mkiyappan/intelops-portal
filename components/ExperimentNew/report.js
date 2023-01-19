import React, { useEffect, useState } from "react";
import { ScatterPlot } from 'react-d3-components';
import IterationsList from './iterationsList';

const ModalReportShower = ({ reportTitle, id, iterationsData }) => {
    const [chartIterationData, setChartIterationData] = useState([]);
    const [suggestedList, setSuggestedList] = useState([]);
    const [nonsuggestedList, setNonSuggestedList] = useState([]);

    if (iterationsData && chartIterationData && chartIterationData.length === 0) {
        const chartData = [];
        iterationsData?.forEach(data => {
            const iteration = [data.iterationNumber, data.latency, data.cpu, data.memory];
            chartData.push(iteration);
        });
        setChartIterationData([{
            customLabel: 'somethingA',
            customValues: chartData
        }]);
    }

    const data = [];
    const labelAccessor = (stack) => { return stack.customLabel; };
    const valuesAccessor = (stack) => { return stack.customValues; };
    const xAccessor = (element) => { return element[0]; };
    const yAccessor = (element) => { return element[1]; };
    const tooltipScatter = (x, y) => {
        const iteration = iterationsData.find((data) => data.iterationNumber === x);
        return (<><span>{`CPU: ${iteration.cpu}`}</span><br /><span>{`Memory: ${iteration.memory}`}</span></>);
    };

    useEffect(() => {
        if (iterationsData && iterationsData.length > 0) {
            const suggested = iterationsData.filter((item) => (item.isSuggested))
            const nonsuggested = iterationsData.filter((item) => (!item.isSuggested))
            setSuggestedList(suggested);
            setNonSuggestedList(nonsuggested);
        }
    }, [iterationsData])
    return (
        <div class="fixed top-0 left-0 hidden w-full h-full overflow-x-hidden overflow-y-auto transition-opacity ease-linear opacity-0 z-sticky outline-0" id={id} aria-hidden="true">
            <div class="relative w-auto m-2 transition-transform duration-300 pointer-events-none sm:m-7 sm:max-w-125 sm:mx-auto ease-soft-out -translate-y-13">
                <div class="relative flex flex-col w-full bg-white border border-solid pointer-events-auto dark:bg-gray-950 bg-clip-padding border-black/20 rounded-xl outline-0">
                    <div class="flex items-center justify-between p-4 border-b border-solid shrink-0 border-slate-100 rounded-t-xl">
                        <h5 class="mb-0 leading-normal dark:text-white" id="ModalLabel">Experiment - Report  {reportTitle}</h5>
                        <button type="button" data-toggle="modal" data-target={`#${id}`} class="fa fa-close w-4 h-4 ml-auto box-content p-2 text-black dark:text-white border-0 rounded-1.5 opacity-50 cursor-pointer -m-2 " data-dismiss="modal"></button>
                    </div>
                    <div class="relative flex-auto p-4">
                        <div class="min-h-6 pl-7 mb-0.5 block">
                            {chartIterationData && chartIterationData.length > 0 && (<ScatterPlot
                                data={chartIterationData || []}
                                width={600}
                                height={400}
                                margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
                                label={labelAccessor}
                                x={xAccessor}
                                y={yAccessor}
                                values={valuesAccessor}
                                tooltipHtml={tooltipScatter}
                                tooltipContained
                                xAxis={{ innerTickSize: 6, label: "Iterations" }}
                                yAxis={{ label: "Durations" }}
                                shapeColor={"red"}
                            />)}
                        </div>
                        <div className="card my-2">
                            <div className="card-header p-6 text-start">
                                <h5 className="font-weight-bolder">Suggested Iterations</h5>
                                <div className="table-responsive" style={{ overflow: "hidden" }}>
                                    <IterationsList data={suggestedList} />
                                </div>
                            </div>
                        </div>

                        <div className="card my-2">
                            <div className="card-header p-6 text-start">
                                <h5 className="font-weight-bolder">Iterations List</h5>
                                <div className="table-responsive" style={{ overflow: "hidden" }}>
                                    <IterationsList data={nonsuggestedList} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center justify-end p-3 border-t border-solid shrink-0 border-slate-100 rounded-b-xl">
                        <button type="button" 
                            data-toggle="modal" 
                            data-target={`#${id}`} 
                            class="inline-block px-8 py-2 m-1 mb-4 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-to-tl from-slate-600 to-slate-300 shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalReportShower;