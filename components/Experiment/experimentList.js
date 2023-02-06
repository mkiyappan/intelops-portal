import React, { useEffect, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  ChartSquareBarIcon,
  PlusSmIcon,
  MinusSmIcon,
  RefreshIcon,
  NewspaperIcon,
  DocumentReportIcon
} from '@heroicons/react/solid';

const { ExperimentHandlerClient } = require("../../ml/ml_server_interface_grpc_web_pb");
const { Experiment } = require("../../ml/ml_server_interface_pb.js");
const client = new ExperimentHandlerClient(process.env.NEXT_PUBLIC_ML_SERVER_DOMAIN_PORT, null, null);
import ModalReportShower from './report';
import { getExperimentsListBySetup } from '../helper/getExperimentsbySetup';

const ExperimentList = (props) => {
  const [expList, setExpList] = useState([]);
  const [setUpList, setSetupList] = useState([]);
  const [expListbySetup, setExpListbySetup] = useState({});
  const [expIterations, setExpIterations] = useState();
  const [reportTitle, setReportTitle] = useState('');

  const enableStartStausList = [
    "Setup Ready"
  ]
  const enableChartStatusList = [
    "Stopped",
    "Completed"
  ]
  const enableStopStatusList = [
    "Setup Initiated",
    "Setup Ready",
    "Data Collector Ready",
    "Data Collector NotReady",
    "Agent Ready",
    "Agent NotReady",
    "Started",
    "Started Failed",
    "Stopped",
    "Completed",
    "Completed With Error",
    "Ongoing"
  ]

  const enableStartStausFinalList = enableStartStausList.map(exp => {
    return exp.toLowerCase();
  });
  const enableChartStatusFinalList = enableChartStatusList.map(exp => {
    return exp.toLowerCase();
  });
  const enableStopStatusFinalList = enableStopStatusList.map(exp => {
    return exp.toLowerCase();
  });

  useEffect(() => {
    if (props.setupDataList && props.setupDataList.length > 0) {
      setSetupList(props.setupDataList);
    }
  }, [props.setupDataList]);

  const handleExpandCollapse = (setupKey) => {
    getExperimentBucket(setupKey);
  }

  const updateList = (expId, actionName, setupName) => {
    const updatedList = expListbySetup[setupName] && expListbySetup[setupName].length > 0 && expListbySetup[setupName].map(item =>
      item.expId === expId ? { ...item, status: actionName }
        : item
    );
    setExpListbySetup({ [setupName]: updatedList });
    setExpList(updatedList);
  }
  const getExperimentBucket = async (setupKey) => {
    const data = await getExperimentsListBySetup(setupKey);
    setExpListbySetup({ [setupKey]: data });
  }

  const handleStopClick = (expId, setupName) => {
    const request = new Experiment();
    request.setExpId(expId);
    client.stopExperiment(request, {}, (err, response) => {
      if (response == null) {
        if (Swal && Object.keys(Swal).length > 0) {
          Swal.fire(
            'Error',
            'Could not able to stop Experiment !!!',
            'error'
          )
        }
        updateList(expId, 'Stopped', setupName);
      } else {
        if (Swal && Object.keys(Swal).length > 0) {
          Swal.fire(
            'Success',
            'You have stopped experiment successfully !!!',
            'success'
          )
        }
        updateList(expId, 'Stopped', setupName);
      }
    });
  }

  const handlePauseClick = (expId, setupName) => {
    updateList(expId, 'Pause', setupName);
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleStartClick = (expId, setupName) => {
    const request = new Experiment();
    request.setExpId(expId);
    client.startExperiment(request, {}, (err, response) => {
      if (response === null || (response && response.array && response.array.length === 0)) {
        if (Swal && Object.keys(Swal).length > 0) {
          Swal.fire(
            'Success',
            'You have started experiment successfully !!!',
            'success'
          )
        }
        updateList(expId, 'Started', setupName);
      } else {
        if (Swal && Object.keys(Swal).length > 0) {
          Swal.fire(
            'Error',
            'Could not able to start Experiment !!!',
            'error'
          )
        }
        updateList(expId, 'Working', setupName);
      }
    });
  }

  const handleReportClick = (expId) => {
    const particularExp = expList.find((item) => (item.expId === expId));
    setReportTitle(particularExp?.appName || '')
    const request = new Experiment();
    request.setExpId(expId);
    client.getIterationsByExpID(request, {}, (err, response) => {
      const iterations = response.getResultsList();
      let iterationsList = [];
      iterations.forEach(data => {
        const iteration = {};
        const iterationResponse = data.getResponse();
        iteration.cpu = iterationResponse.getCpu();
        iteration.memory = iterationResponse.getMemory();
        iteration.latency = iterationResponse.getLatency();
        iteration.iterationNumber = data.getIterationnumber();
        iteration.experimentNumber = iterationResponse.getExperimentid();
        iteration.status = iterationResponse.getStatus();
        iteration.latency = iterationResponse.getLatency();
        iteration.successRate = iterationResponse.getSuccessrate();
        iteration.isSuggested = data.getIssuggested();
        iterationsList.push(iteration);
      });
      setExpIterations(iterationsList);
    });
    let modal = document.getElementById(`chatShower`);
    let trigger = document.querySelector("[data-target='#chatShower']");
    console.log(modal.getAttribute("aria-hidden"));
    if (modal.getAttribute("aria-hidden") == "true") {
      modal.setAttribute("aria-hidden", "false")
      let modal_backdrop = document.createElement("div")
      modal_backdrop.classList.add("opacity-0", "z-990", "fixed", "bg-black", "top-0", "left-0", "w-screen", "h-screen", "transition-opacity", "ease-linear");
      modal_backdrop.setAttribute("modal-backdrop", trigger.getAttribute("data-target"));
      document.body.appendChild(modal_backdrop);
      modal_backdrop.classList.add("opacity-50");
      modal_backdrop.classList.remove("opacity-0");
    } else {
      modal.setAttribute("aria-hidden", "true")
      let backdrop = document.querySelector("[modal-backdrop='" + trigger.getAttribute("data-target") + "']")
      backdrop.remove();
    }
    modal.classList.toggle("hidden");
    modal.classList.toggle("opacity-0");
    modal.classList.toggle("block");

    modal.firstElementChild.classList.toggle("-translate-y-13");
    modal.firstElementChild.classList.toggle("transform-none");
  }

  const getExpNotFound = () => {
    return (
      <>
        <tr>
          <td></td>
          <td></td>
          <td className="align-middle">
            <div className="d-flex px-2">
              <div className="my-auto">
                <h6 className="mb-0 text-xs">{'Experiments not found !!!'}</h6>
              </div>
            </div>
          </td>
        </tr>
      </>
    )
  }

  const expListView = (setupName, index) => {
    const items = expListbySetup[setupName] && expListbySetup[setupName].length > 0 && expListbySetup[setupName].map((exp, expIndex) => {
      const isStartEnabled = enableStartStausFinalList.includes(exp.status.toLowerCase());
      const isChartEnabled = enableChartStatusFinalList.includes(exp.status.toLowerCase());   
      const isStopEnabled = enableStopStatusFinalList.includes(exp.status.toLowerCase());  
      return (
        <>
          <tr>
            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <div class="flex px-2 py-1">
                <div class="flex flex-col justify-center">
                  <p class="mb-0 font-semibold leading-tight text-xs">{exp.expId}</p>
                </div>
              </div>
            </td>
            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <p class="mb-0 font-semibold leading-tight text-xs">{exp.startedOn}</p>
            </td>
            <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <span class="font-semibold leading-tight text-xs">{exp.trailCount}</span>
            </td>
            <td class="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
              <span class="bg-gradient-to-tl from-green-600 to-lime-400 px-3.6 text-xxs rounded-1.8 py-1.6 inline-block whitespace-nowrap text-center align-baseline font-bold leading-none text-white">{capitalizeFirstLetter(exp.status) || ''}</span>
            </td>
  
            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <PlayIcon
                className={`h-8 ${isStartEnabled ? 'text-slate-400 pointer' : 'text-gray-500 action_none'}`}
                onClick={() => handleStartClick(exp.expId, setupName)}
                data-bs-toggle="modal"
                data-bs-target="#modal-startstop"
              />
              <PauseIcon
                className={`h-8 ${exp.actionType === 'Pause' ? 'text-slate-400 pointer' : 'text-gray-500 action_none'}`}
                onClick={() => handlePauseClick(exp.expId, setupName)}
                data-bs-toggle="modal"
                data-bs-target="#modal-agentForm"
              />
              <StopIcon
                className={`h-8 ${isStopEnabled ? 'text-slate-400 pointer' : 'text-gray-500 action_none'}`}
                onClick={() => handleStopClick(exp.expId, setupName)}
                data-bs-toggle="modal"
                data-bs-target="#modal-startstop"
              />
              <DocumentReportIcon
                data-toggle="modal"
                className={`h-8 ${isChartEnabled ? 'text-slate-400 pointer' : 'text-gray-500'}`}
                onClick={() => handleReportClick(exp.expId)}
                data-target={`chatShower`}
              />
            </td>
          </tr>
        </>
      )
    } );

    if (expListbySetup[setupName] && expListbySetup[setupName].length > 0) {
      return (
        <div class="p-4 leading-normal text-sm opacity-80 listborder_top">
          <div class="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
            <div class="flex-auto px-0 pt-0 pb-2">
              <div class="p-0 overflow-x-auto">
                <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                  <thead class="align-bottom">
                    <tr>
                      <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Experiment ID</th>
                      <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Started</th>
                      <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Trial Count</th>
                      <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Status</th>
                      <th class="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      getExpNotFound();
    }
  };

  const setupListView = () => {

    const setupItems = setUpList && setUpList.length > 0 && setUpList.map((exp, index) => (
      <>
      <div accordion-section="true" className="mb-4 p-2 rounded-t-1 accordian_border">
        <h6 className="mb-0">
          <button
            onClick={() => handleExpandCollapse(exp.setupName)}
            section-trigger="true"
            className="relative flex items-center w-full p-4 font-semibold text-left transition-all cursor-pointer ease-soft-in text-slate-700 rounded-t-1"
            aria-expanded="false">
            <span className="mr-12">{exp.setupName}</span> 
            <span className="mr-12">{exp.appName || ''}</span>
            <RefreshIcon
              className={`h-5 text-gray-500 pointer`}
              onClick={() => getExperimentBucket(exp.setupName)}
            />
            <i section-open-icon="true" className="absolute right-0 hidden pt-1 mr-4 leading-tight fa fa-plus text-xs"></i>
            <i section-close-icon="true" className="absolute right-0 pt-1 mr-4 leading-tight fa fa-minus text-xs"></i>
          </button>
        </h6>

        <div section-content="true" className="overflow-hidden transition-all ease-soft-in-out duration-350">

          {expListView(exp.setupName, index)}

        </div>
        </div>
      </>
    ));

    if (setUpList && setUpList.length > 0) {
      return setupItems;
    } else {
      return ( <div className="w-full mx-auto">{'Experiments not found !!!'} </div>
        //   <tr>
        //     <td></td>
        //     <td></td>
        //     <td className="align-middle">
        //       {/* <div className="d-flex px-2">
        //         <div className="my-auto">
        //           <h6 className="mb-0 text-xs">{'Experiments not found !!!'}</h6>
        //         </div>
        //       </div> */}
        //     </td>
        //   </tr>
        // </>
      )
    }
  };

  return (
    <React.Fragment>
      <div class="w-full mx-auto">
        <ModalReportShower
          iterationsData={expIterations}
          reportTitle={reportTitle}
          id={`chatShower`}
        />
      </div>
      <div className="w-full p-6 py-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="p-6 mb-0 rounded-t-2xl">
            <h4 className="font-weight-bolder">Setup List</h4>
          </div>
          <div accordion="true">
            {setupListView()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ExperimentList;
