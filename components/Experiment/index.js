import React, { useEffect, useState } from "react";
import ExperimentList from "./experimentList";
import { useRouter } from "next/router";
import StartExperiment from "./startExperiment";
import CreateAgent from "./createAgent";
import { getExperimentsListData } from '../helper/getExperiments';
import { getSetupListData } from '../helper/getSetupList';

const { ExperimentHandlerClient, AgentHandlerClient } = require("../../ml/ml_server_interface_grpc_web_pb");
const { Email } = require("../../ml/ml_server_interface_pb.js");
const client = new ExperimentHandlerClient(process.env.NEXT_PUBLIC_ML_SERVER_DOMAIN_PORT, null, null);

const ExperimentPage = () => {
  const [agentInfo, setAgentInfo] = useState("");
  const [experimentList, setExperimentList] = useState();
  const [setupList, setSetupList] = useState();
  const router = useRouter();
  
  const handleAgentInfo = (data) => {
    setAgentInfo(data);
    
  };

  const getExperimentBucket = async ()=> {
    const data = await getExperimentsListData();
    setExperimentList(data);
  }

  const getSetupBucket = async ()=> {
    const data = await getSetupListData();
    setSetupList(data);
  }
  
  
  useEffect(() => {
    const emailId = window.localStorage.getItem('USER_EMAIL');
    const code = window.localStorage.getItem('USER_CODE');
    // if (!emailId && !code) {
    //   router.push('/sign-in');
    // }
    getExperimentBucket();
    getSetupBucket();
  }, [])
  const handleSetupExpRes = (data) => {
    const updatedData = [...experimentList, data];
    setSetupList([...setupList, {
      appName: data.appName,
      setupName: data.setupName,
    }])
    setExperimentList(updatedData);
  }
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <CreateAgent callback={handleAgentInfo} />
          <StartExperiment agentInfo={agentInfo} callback={handleSetupExpRes} />
        </div>
      </div>
      <div className="row">
        <ExperimentList list={experimentList} setupDataList={setupList}/>
      </div>
    </>
  );
};
export default ExperimentPage;
