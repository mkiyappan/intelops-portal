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
          <div className="col-4 my-2">
            <label className="form-label">Agent Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Agent Name"
              aria-label="agentName"
              name="agentName"
              id="agentName"
              required=""
              value={agentDetails.agentName || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-4 my-2 agent-submit">
            <button
              type="submit"
              className={`btn bg-gradient-info w-100 my-4 ${disabled}`}
              disabled={disabled === 'disabled'}
              onClick={() => handleSubmitAgent()}
              data-bs-dismiss="modal"
            >
              Submit
            </button>
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
      <CreateAgentForm title={agentFormTitle} content={agentContent} id={'modal-agentForm'} />
      <div className="col-xl-12 main-agent-creation">
        <div className="col-xl-3">
          <select onChange={(e)=>handleAgentNameChange(e)} className="form-control" name="agentName" id="choices-button" placeholder="Departure">
            <option value="select">Select Agent</option>
            { getAgentList() }
          </select>
        </div>
        <div className="col-xl-6"></div>
        <div className="col-xl-3 agent-creation">
          <PlusCircleIcon
            className={`h-8 text-orange-500 pointer`}
            data-bs-toggle="modal"
            data-bs-target="#modal-agentForm"
          />
          Create Agent
        </div>
      </div>
    </>
  );
};

export default CreateAgent;
