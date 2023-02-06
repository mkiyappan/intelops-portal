import React, { useEffect, useState } from "react";
import CreateAgentForm from "./agentForm";

const { AgentHandlerClient } = require("../../ml/ml_server_interface_grpc_web_pb");
const agentClient = new AgentHandlerClient(process.env.NEXT_PUBLIC_ML_SERVER_DOMAIN_PORT, null, null);
const {
  ClientDetails
} = require("../../ml/ml_server_interface_pb.js");
import { getAgentListData } from "../helper/getAgents";

const CreateAgent = (props) => {
  const [agentDetails, setAgentDetails] = useState({});
  const [agentContent, setAgentContent] = useState();
  const [agentFormTitle, setAgentFormTitle] = useState();
  const [agentList, setAgentList] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState();
  const [agentError, setAgentError] = useState(true);
  const [agentNameTouched, setAgentNameTouched] = useState(false);

  const handleSubmitAgent = () => {
    const emailId = window.localStorage.getItem('USER_EMAIL');
    const request = new ClientDetails();
    const { agentName } = agentDetails;
    request.setName(agentName);
    request.setEmail(emailId);

    try {
      agentClient.registerAgent(request, {}, (err, response) => {
        if (response == null) {
          console.log(err);
          if (Swal && Object.keys(Swal).length > 0) {
            Swal.fire(
              'Error',
              'There is some error creating agent',
              'error'
            )
          }
        } else {
          const agentData = {};
          agentData.agentId = response.getAgentid();
          agentData.clientId = response.getClientid();
          agentData.clientSecret = response.getClientsecret();
          agentData.token = response.getToken();
          agentData.agentName = agentName;
          props.callback(agentData);
          setSelectedAgent(agentData.agentId);
          setAgentList([...agentList, agentData]);
          if (Swal && Object.keys(Swal).length > 0) {
            Swal.fire(
              'Success',
              'You have successfully created an agent',
              'success'
            )
          }
        }
      });
    }
    catch (err) {
      console.log('register agent err---->', err)
    }
    setAgentDetails({});
  };

  const getAgentBucket = async () => {
    const data = await getAgentListData();
    setAgentList(data);
  }

  useEffect(() => {
    getAgentBucket();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentNameTouched(true)
    if (value !== '') {
      setAgentError(false);
      setAgentDetails({ ...agentDetails, ...{ [name]: value } });
      setAgentContent(contentData);
      setAgentNameTouched(false)
    } else {
      setAgentError(true);
      setAgentDetails({ ...agentDetails, ...{ [name]: value } });
      setAgentContent(contentData);
    }

  };

  const agentTitle = () => (
    <div className="card-header pb-0 text-start">
      <h4 className="font-weight-bolder">Create Agent</h4>
    </div>
  )

  const contentData = () => (
    <>
      <div class="flex-auto pb-0 pt-6 ml-8">
        <div class="flex flex-wrap -mx-3">
          <div class="w-8/12 max-w-full px-3 flex-0">
            <label className="form-label mb-4">Agent Name</label>
            <input
              type="text"
              className={`${agentError && agentNameTouched ? 'errorField' : ''}
              focus:shadow-soft-primary-outline dark:bg-gray-950 
              dark:placeholder:text-white/80 dark:text-white/80 
              text-sm leading-5.6 ease-soft block w-full 
              appearance-none rounded-lg border border-solid 
              border-gray-300 bg-white bg-clip-padding px-3 
              py-2 font-normal text-gray-700 outline-none 
              transition-all placeholder:text-gray-500 
              focus:border-fuchsia-300 focus:outline-none mb-4`}
              placeholder="Agent Name"
              aria-label="agentName"
              name="agentName"
              id="agentName"
              required=""
              value={agentDetails.agentName || ''}
              onChange={handleChange}
              onBlur={handleChange}
            />
            {agentError && agentNameTouched && (<span className="errorText mb-2 mt-2 ml-1 text-xs text-slate-200 dark:text-white/80">
              Please enter agent name
            </span>)}
          </div>
        </div>
      </div>
    </>
  );
  const getAgentList = () => {
    const list = agentList && agentList.map((elmt, key) => (
      <option
        value={elmt.agentId}
        selected={elmt.agentId === selectedAgent}
        key={key}
      >
        {elmt.agentName}
      </option>
    ));
    return list;
  }

  const handleAgentNameChange = (e) => {
    const { value } = e.target;
    if (value !== 'select') {
      setAgentDetails({ ...agentDetails, ...{ [agentName]: value } });
      try {
        const agentData = agentList.find((item) => (item.agentId === value));
        props.callback(agentData);
      } catch (err) {
        console.log('err------------->', err)
      }
    } else {
      props.callback({});
    }
  }

  useEffect(() => {
    setAgentFormTitle(agentTitle);
    setAgentContent(contentData);
  }, [agentDetails]);

  return (
    <>
      <CreateAgentForm
        title={agentFormTitle}
        content={agentContent}
        id={'modal-agentForm'}
        handleSubmitAgent={handleSubmitAgent}
        agentError={agentError}
      />

      <div class="flex-auto pb-0 pt-6 ml-8">
        <div class="flex flex-wrap -mx-3">
          <div class="w-3/12 max-w-full px-3 flex-0">
            <select choice="true" choices-select=""
              onChange={(e) => handleAgentNameChange(e)}
              className="form-control"
              name="agentName" id="choices-button" placeholder="Departure">
              <option value="select">Select Agent</option>
              {getAgentList()}
            </select>
          </div>
          <div class="w-6/12 max-w-full px-3 flex-0">
          </div>
          <div class="w-3/12 max-w-full px-3 flex-0">
            <button
              type="button"
              data-toggle="modal"
              data-target="#createAgent"
              class="inline-block px-8 py-2 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer active:opacity-85 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:scale-102 active:shadow-soft-xs border-slate-500 text-slat-500 hover:text-slate-500 hover:opacity-75 hover:shadow-none active:scale-100 active:border-slate-500 active:bg-slate-500 active:text-white hover:active:border-slate-500 hover:active:bg-transparent hover:active:text-slate-500 hover:active:opacity-75">
              Create Agent
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAgent;
