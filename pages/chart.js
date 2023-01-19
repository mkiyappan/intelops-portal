import { useState } from 'react';
import { LineChart, Brush,  d3 } from 'react-d3-components';


// var LineChart = ReactD3.LineChart;
// var Brush = ReactD3.Brush;
const CPUChart = () => {
    
    const dataObj =  {
        data: {label: '', values: [
            {x: new Date(2015, 2, 5), y: 1},
            {x: new Date(2015, 2, 6), y: 2},
            {x: new Date(2015, 2, 7), y: 0},
            {x: new Date(2015, 2, 8), y: 3},
            {x: new Date(2015, 2, 9), y: 2},
            {x: new Date(2015, 2, 10), y: 3},
            {x: new Date(2015, 2, 11), y: 4},
            {x: new Date(2015, 2, 12), y: 4},
            {x: new Date(2015, 2, 13), y: 1},
            {x: new Date(2015, 2, 14), y: 5},
            {x: new Date(2015, 2, 15), y: 0},
            {x: new Date(2015, 2, 16), y: 1},
            {x: new Date(2015, 2, 16), y: 1},
            {x: new Date(2015, 2, 18), y: 4},
            {x: new Date(2015, 2, 19), y: 4},
            {x: new Date(2015, 2, 20), y: 5},
            {x: new Date(2015, 2, 21), y: 5},
            {x: new Date(2015, 2, 22), y: 5},
            {x: new Date(2015, 2, 23), y: 1},
            {x: new Date(2015, 2, 24), y: 0},
            {x: new Date(2015, 2, 25), y: 1},
            {x: new Date(2015, 2, 26), y: 1}
        ]},
        xScale: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 400 - 70]),
        xScaleBrush: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 400 - 70])
    };
    const [finaldata, setFinalData] = useState(dataObj);
    const onChange = (extent) => {
        setFinalData({...finaldata}, {xScale: d3.time.scale().domain([extent[0], extent[1]]).range([0, 400 - 70])});
    }
    return (
        <div>
            
        <LineChart
           data={finaldata.data}
           width={800}
           height={400}
           margin={{top: 10, bottom: 50, left: 50, right: 20}}
           xScale={finaldata.xScale}
           xAxis={{tickValues: finaldata.xScale.ticks(d3.time.day, 2), tickFormat: d3.time.format("%m/%d")}}
        />
        <div className="brush" style={{float: 'none'}}>
        <Brush
           width={800}
           height={50}
           margin={{top: 0, bottom: 30, left: 50, right: 20}}
           xScale={finaldata.xScaleBrush}
           extent={[new Date(2015, 2, 10), new Date(2015, 2, 12)]}
           onChange={(extend)=>onChange(extend)}
           xAxis={{tickValues: finaldata.xScaleBrush.ticks(d3.time.day, 2), tickFormat: d3.time.format("%m/%d")}}
        />
        </div>
        </div>
    );
}


// export default SomeComponent;
// export default function AreaChartPanel() {
    // const data = [
    //     {
    //         label: 'Fetch',
    //         values: [{ x: 0, y: 2 }, { x: 1.3, y: 5 }, { x: 3, y: 6 }, { x: 3.5, y: 6.5 }, { x: 4, y: 6 },
    //         { x: 4.5, y: 6 }, { x: 5, y: 7 }, { x: 5.5, y: 8 }]
    //     },
    //     {
    //         label: 'Axios',
    //         values: [{ x: 0, y: 3 }, { x: 1.3, y: 4 }, { x: 3, y: 7 }, { x: 3.5, y: 8 }, { x: 4, y: 7 },
    //         { x: 4.5, y: 7 }, { x: 5, y: 7.8 }, { x: 5.5, y: 9 }]
    //     }
    // ];

    // const chartRef = useRef();
    // const colorScale = d3.scale.ordinal().range(['#cbd5e1', '#94a3b8', '#64748b', '#475569']);

    // const displayLabel = (label) => {
    //     return label;
    // };
    // var BarChart = ReactD3.BarChart;
//  ---------------------------------------------
    // var data = [{
    //     label: 'somethingA',
    //     values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    // }];
     
    // return(
    //     <BarChart
    //         data={data}
    //         width={400}
    //         height={400}
    //         margin={{top: 10, bottom: 50, left: 50, right: 10}}
    //         />
    // );
    //------------------------>
    // return (
    //     <div className="block w-full flex justify-center overflow-x-auto">
    //         <AreaChart
    //             ref={chartRef}
    //             data={data}
    //             width={500}
    //             height={280}
    //             tooltipHtml={displayLabel}
    //             xAxis={{ tickArguments: [5] }}
    //             yAxis={{ tickArguments: [3] }}
    //             colorScale={colorScale}
    //             margin={{ top: 20, bottom: 50, left: 60, right: 40 }} />
    //     </div>
    // );

    // -----------------------------------------------------
    //  var data = [{
    //     label: 'somethingA',
    //     values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    // }];
    // var tooltipScatter = function(x, y) {
    //     return "x: " + x + " y: " + y;
    // };
     
    // return(<ScatterPlot
    //                 data={data}
    //                 width={400}
    //                 height={400}
    //                 margin={{top: 10, bottom: 50, left: 50, right: 10}}
    //                 tooltipHtml={tooltipScatter}
    //                 xAxis={{label: "x-label"}}
    //                 yAxis={{label: "y-label"}}/>
    // );
    //===============================================
// }

export default CPUChart;