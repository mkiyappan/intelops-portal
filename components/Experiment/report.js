import React, { useEffect, useState } from "react";
import { ScatterPlot } from 'react-d3-components';
import IterationsList from './iterationsList';

const ModalReportShower = ({ reportTitle, content, id, iterationsData }) => {
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

    useEffect(()=> {
        if(iterationsData && iterationsData.length > 0) {
            const suggested = iterationsData.filter((item)=>(item.isSuggested)) 
            const nonsuggested = iterationsData.filter((item)=>(!item.isSuggested)) 
            setSuggestedList(suggested);
            setNonSuggestedList(nonsuggested);
        }
    }, [iterationsData])
    return (
        <div className="modal fade show" id={id} tabIndex="-1" role="dialog" aria-labelledby="modal-default" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered exp-report" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-default">Experiment - Report for {reportTitle}</h6>
                        <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
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
                        <div className="card my-2">
                            <div className="card-header pb-0 text-start">
                                <h5 className="font-weight-bolder">Suggested Iterations</h5>
                                <div className="table-responsive" style={{ overflow: "hidden" }}>
                                   <IterationsList data={suggestedList}/>
                                </div>
                            </div>
                        </div>
                        <div className="card my-2">
                            <div className="card-header pb-0 text-start">
                                <h5 className="font-weight-bolder">Iterations List</h5>
                                <div className="table-responsive" style={{ overflow: "hidden" }}>
                                <IterationsList data={nonsuggestedList}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-link  ml-auto" data-bs-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalReportShower;