import React, { useEffect, useState } from "react";
import {
  PlusCircleIcon
} from '@heroicons/react/solid';
import CreateAgentForm from "./agentForm";

const { AgentHandlerClient } = require("../../ml/ml_server_interface_grpc_web_pb");
const agentClient = new AgentHandlerClient(process.env.NEXT_PUBLIC_ML_SERVER_DOMAIN_PORT, null, null);
const {
  ClientDetails, 
  Null, 
  Email
} = require("../../ml/ml_server_interface_pb.js");
import { getAgentListData } from "../helper/getAgents";

const CreateAgent = (props) => {
  const [agentDetails, setAgentDetails] = useState({});
  const [disabled, setDisabled] = useState('disabled');
  const [agentContent, setAgentContent] = useState();
  const [agentFormTitle, setAgentFormTitle] = useState();
  const [agentList, setAgentList] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(); 

  const handleSubmitAgent = () => {
    const emailId = window.localStorage.getItem('USER_EMAIL');
    const request = new ClientDetails();
    const { agentName } = agentDetails;
    request.setName(agentName);
    request.setEmail(emailId);

    try{
      agentClient.registerAgent(request, {}, (err, response) => {
        if (response == null) {
          console.log(err);
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
        }
      });
    }
    catch(err){
      console.log('register agent err---->', err)
    }
    setAgentDetails({});
    setDisabled('disabled');
  };

  const getAgentBucket = async ()=> {
    const data = await getAgentListData();
    setAgentList(data);
  }
  
  useEffect(()=>{
    getAgentBucket();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentDetails({ ...agentDetails, ...{ [name]: value } });
    if (value === '') {
      setDisabled('disabled');
    } else {
      setDisabled('');
    }
  };

  const agentTitle = () => (
    <div className="card-header pb-0 text-start">
      <h4 className="font-weight-bolder">Create Agent</h4>
    </div>
  )

  const contentData = () => (
    <>
      <div className="card-body">
        <div className="row">
          <div className="col-3 my-2">
            <label className="form-label">Agent Name</label>
            <input
              type="text"
              className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-slate-300 focus:outline-none"
              placeholder="Agent Name"
              aria-label="agentName"
              name="agentName"
              id="agentName"
              required=""
              value={agentDetails.agentName || ''}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
  const getAgentList = () => {
    const list = agentList && agentList.map((elmt, key)=>(
      <option 
        value={elmt.agentId} 
        selected ={elmt.agentId === selectedAgent} 
        key={key}
      >
          {elmt.agentName}
      </option>
    ));
    return list;
  }

  const handleAgentNameChange = (e)=> {
    const {value} =  e.target;
    if(value !== 'select') {
      setAgentDetails({ ...agentDetails, ...{ [agentName]: value } });
      try{
        const agentData = agentList.find((item)=>(item.agentId === value));
        props.callback(agentData);
      }catch(err){
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
      />
      
      <div class="flex-auto pb-0 pt-6 ml-8">
        <div class="flex flex-wrap -mx-3">
          
            <div class="w-3/12 max-w-full px-3 flex-0">
              
              <div className="w-3/12 choices__inner">
                <select choice="true" choices-select="" 
                onChange={(e)=>handleAgentNameChange(e)} 
                className="form-control" 
                name="agentName" id="choices-button" placeholder="Departure">
                  <option value="select">Select Agent</option>
                  { getAgentList() }
                </select>
              </div>
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
