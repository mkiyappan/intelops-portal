import React, { useEffect, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  ChartSquareBarIcon,
  PlusSmIcon,
  MinusSmIcon,
  RefreshIcon
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

  const handleExpandCollapse =(setupKey) => {
    getExperimentBucket(setupKey);
  }

  const updateList = (expId, actionName, setupName) => {
    const updatedList = expListbySetup[setupName] && expListbySetup[setupName].length > 0 && expListbySetup[setupName].map(item =>
      item.expId === expId ? { ...item, actionType: actionName }
        : item
    );
    setExpListbySetup({[setupName]:updatedList});
    setExpList(updatedList);
  }
  const getExperimentBucket = async (setupKey)=> {
    const data = await getExperimentsListBySetup(setupKey);
    setExpListbySetup({[setupKey]:data});
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
    const items = expListbySetup[setupName] && expListbySetup[setupName].length > 0 && expListbySetup[setupName].map((exp) => (
      <>
        <tr>
          <td>
            <div className="d-flex px-2">
              <div className="my-auto">
                <h6 className="mb-0 text-xs">{exp.expId}</h6>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex px-2">
              <div className="my-auto">
                <h6 className="mb-0 text-xs">{exp.startedOn}</h6>
              </div>
            </div>
          </td>
          <td>
            <p className="text-xs font-weight-bold mb-0">
              {exp.trailCount || ''}
            </p>
          </td>
          <td>
            <span className="badge badge-dot me-4">
              <i className="bg-info"></i>
              <span className="text-dark text-xs">{exp.status}</span>
            </span>
          </td>
          <td>
            <div className="expList_action_items">
              <PlayIcon
                className={`h-8 ${exp.actionType === 'Start' ? 'text-orange-500 pointer' : 'text-gray-500 action_none'}`}
                onClick={() => handleStartClick(exp.expId, setupName)}
                data-bs-toggle="modal"
                data-bs-target="#expStart"
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
                data-bs-target="#expStart"
              />
              <ChartSquareBarIcon
                className={`h-8 text-orange-500 pointer`}
                onClick={() => handleReportClick(exp.expId)}
                data-bs-toggle="modal"
                data-bs-target="#modal-report"
              />
            </div>
          </td>
        </tr>
      </>
    ));

    if (expListbySetup[setupName] && expListbySetup[setupName].length > 0) {
      return (
        <tr>
          <div className="collapse" id={`test${index}`}>
            <div className="card card-body pl_unset">
              <div className="table-responsive" style={{ overflow: "hidden" }}>
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Experiment Id
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Started at
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Trial Count
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Status
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Action
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </tr>
      );
    } else {
      getExpNotFound();
    }
  };
  
  const setupListView = () => {
    
    const setupItems = setUpList && setUpList.length > 0 && setUpList.map((exp, index) => (
      <>
        <div>
          <td className="width_16">
            <div className="d-flex px-2">
              <div className="my-auto">
                <a data-bs-toggle="collapse" onClick = {()=>handleExpandCollapse(exp.setupName)} href={`#test${index}`} role="button" aria-expanded="false" aria-controls="collapseExample">
                  <h6 className="text_bold text__orange mb-0 text-xs">{exp.setupName || ''}</h6>
                </a>
              </div>
            </div>
          </td>
          <td className="width_35">
            <div className="d-flex px-2">
              <div className="my-auto">
                <h6 className="mb-0 text-xs">{exp.appName || ''}</h6>
              </div>
            </div>
          </td>
          <td>
            <div className="expList_action_items">
              <PauseIcon
                className={`h-8 text-gray-500 action_none `}
                onClick={() => handleStartClick(exp.expId)}
                data-bs-toggle="modal"
                data-bs-target="#expStart"
              />
            </div>
          </td>
        </div>
        {expListView(exp.setupName, index)}
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
      <ModalShower title={title} content={content} id={'expStart'} />
      <div className="row">
        <div className="col-lg-8">
          <ModalReportShower iterationsData={expIterations} reportTitle={reportTitle} content={content} id={'modal-report'} />
        </div>
      </div>
      <div className="card my-6">
        <div className="card-header pb-0 text-start">
          <h4 className="font-weight-bolder">Setup List</h4>
          <div className="table-responsive" style={{ overflow: "hidden" }}>
            <table className="table align-items-center mb-0">
              <thead>
                <div>
                  <th className="width_16 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Setup Name
                  </th>
                  <th className="width_35 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    App Name
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Action
                  </th>
                </div>
              </thead>
              <tbody>
                {setupListView()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ExperimentList;
