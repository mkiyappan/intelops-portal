import React, { useEffect, useState } from "react";
import Script from 'next/script'
import { useRouter } from "next/router";
import CreateAgent from "./createAgent";
import { getExperimentsListData } from '../helper/getExperiments';
import { getSetupListData } from '../helper/getSetupList';
import ExperimentList from "./experimentList";
import SetupExperiment from "./setupExperiment";

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

  const getExperimentBucket = async () => {
    const data = await getExperimentsListData();
    setExperimentList(data);
  }

  const getSetupBucket = async () => {
    const data = await getSetupListData();
    setSetupList(data);
  }

  useEffect(() => {
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
      <Script type="text/javascript"  src="../assets/js/plugins/sweetalert.min.js"/>
      <CreateAgent callback={handleAgentInfo} />
      <SetupExperiment agentInfo={agentInfo} callback={handleSetupExpRes} />
      <div className="row">
        <ExperimentList list={experimentList} setupDataList={setupList} />
      </div>
    </>
  );
};
export default ExperimentPage;
