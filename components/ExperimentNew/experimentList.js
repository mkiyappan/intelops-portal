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

import Link from "next/link";
const { ExperimentHandlerClient } = require("../../ml/ml_server_interface_grpc_web_pb");
const { Experiment } = require("../../ml/ml_server_interface_pb.js");
const client = new ExperimentHandlerClient(process.env.NEXT_PUBLIC_ML_SERVER_DOMAIN_PORT, null, null);
import ModalShower from "./popup";
import ModalReportShower from './report';
import { getExperimentsListBySetup } from '../helper/getExperimentsbySetup';

const ExperimentList = (props) => {
  const [expList, setExpList] = useState([]);
  const [setUpList, setSetupList] = useState([]);
  const [expListbySetup, setExpListbySetup] = useState({});
  const [content, setContent] = useState('');
  const [expIterations, setExpIterations] = useState();
  const [title, setTitle] = useState('');
  const [reportTitle, setReportTitle] = useState('');

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
      item.expId === expId ? { ...item, actionType: actionName }
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
        setTitle('Experiment - Stop Error');
        setContent('Could not able to stop Experiment !!!');
        updateList(expId, 'Stop', setupName);
      } else {
        setTitle('Experiment - Stopped');
        setContent('You have stopped experiment successfully !!!');
        updateList(expId, 'Start', setupName);
      }
    });
  }

  const handlePauseClick = (expId, setupName) => {
    updateList(expId, 'Pause', setupName);
  }

  const handleStartClick = (expId, setupName) => {
    const request = new Experiment();
    request.setExpId(expId);
    client.startExperiment(request, {}, (err, response) => {
      if (response === null || (response && response.array && response.array.length === 0)) {
        setTitle('Experiment - Started');
        setContent('You have started experiment successfully !!!');
        updateList(expId, 'Stop', setupName);
      } else {
        setTitle('Experiment - Start Error');
        setContent('Could not able to start Experiment !!!');
        updateList(expId, 'Start', setupName);
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
    const items = expListbySetup[setupName] && expListbySetup[setupName].length > 0 && expListbySetup[setupName].map((exp, expIndex) => (
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
            <span class="font-semibold leading-tight text-xs text-slate-400">{exp.trailCount}</span>
          </td>
          <td class="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
            <h7 class="text-lime-500">{exp.status || ''}</h7>
          </td>

          <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
            <PlayIcon
              className={`h-8 ${exp.actionType === 'Start' ? 'text-orange-500 pointer' : 'text-gray-500 action_none'}`}
              onClick={() => handleStartClick(exp.expId, setupName)}
              data-bs-toggle="modal"
              data-bs-target="#modal-startstop"
            />
            <PauseIcon
              className={`h-8 ${exp.actionType === 'Pause' ? 'text-orange-500 pointer' : 'text-gray-500 action_none'}`}
              onClick={() => handlePauseClick(exp.expId, setupName)}
              data-bs-toggle="modal"
              data-bs-target="#modal-agentForm"
            />
            <StopIcon
              className={`h-8 ${exp.actionType === 'Stop' ? 'text-orange-500 pointer' : 'text-gray-500 action_none'}`}
              onClick={() => handleStopClick(exp.expId, setupName)}
              data-bs-toggle="modal"
              data-bs-target="#modal-startstop"
            />
            <DocumentReportIcon
              data-toggle="modal"
              onClick={() => handleReportClick(exp.expId)}
              data-target={`chatShower`}
              className={`h-8 text-orange-500 pointer`}
            />
            {/* <button 
              type="button" 
              data-toggle="modal" 
              onClick={() => handleReportClick(exp.expId)}
              data-target={`chatShower`}
              class="inline-block px-8 py-2 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer active:opacity-85 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:scale-102 active:shadow-soft-xs border-fuchsia-500 text-fuchsia-500 hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:scale-100 active:border-fuchsia-500 active:bg-fuchsia-500 active:text-white hover:active:border-fuchsia-500 hover:active:bg-transparent hover:active:text-fuchsia-500 hover:active:opacity-75">
                Report
            </button> */}

            {/* <ChartSquareBarIcon
              className={`h-8 text-orange-500 pointer`}
              onClick={() => handleReportClick(exp.expId)}
              data-toggle="modal" 
              data-target={`#chatShower${expIndex}`}
            /> */}

          </td>
        </tr>
      </>
    ));

    if (expListbySetup[setupName] && expListbySetup[setupName].length > 0) {
      return (
        <div class="p-4 leading-normal text-sm opacity-80 ">
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
        <h6 class="mb-0">
          <button
            onClick={() => handleExpandCollapse(exp.setupName)}
            section-trigger="true"
            class="relative flex items-center w-full p-4 font-semibold text-left transition-all border-b border-solid cursor-pointer border-slate-100 ease-soft-in text-slate-700 rounded-t-1"
            aria-expanded="true">
            {exp.setupName} - {exp.appName || ''}
            <i section-open-icon="true" class="absolute right-0 hidden pt-1 mr-4 leading-tight fa fa-plus text-xs"></i>
            <i section-close-icon="true" class="absolute right-0 pt-1 mr-4 leading-tight fa fa-minus text-xs"></i>
          </button>
        </h6>
        <div section-content="true" class="overflow-hidden transition-all ease-soft-in-out duration-350">

          {expListView(exp.setupName, index)}

        </div>
      </>
    ));

    if (setUpList && setUpList.length > 0) {
      return setupItems;
    } else {
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
  };

  return (
    <React.Fragment>
      <ModalShower title={title} content={content} id={'modal-startstop'} />
      <div class="w-full mx-auto">
        <ModalReportShower
          iterationsData={expIterations}
          reportTitle={reportTitle}
          id={`chatShower`}
        />
      </div>
      <div class="w-full p-6 py-4 mx-auto">
        <div class="relative flex flex-col min-w-0 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
          <div class="p-6 mb-0 rounded-t-2xl">
            <h4 className="font-weight-bolder">Setup List</h4>
          </div>
          <div accordion="true">
            <div accordion-section="true" class="mb-4 p-2 rounded-t-1">
              {setupListView()}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ExperimentList;
