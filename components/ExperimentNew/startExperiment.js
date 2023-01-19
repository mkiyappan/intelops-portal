import React, { useEffect, useState } from "react";
const { ExperimentHandlerClient } = require("../../ml/ml_server_interface_grpc_web_pb");
const { ExperimentSetupRequest, Limit, GitParams, ResourceLimits, Cpu, Memory } = require("../../ml/ml_server_interface_pb.js");
var client = new ExperimentHandlerClient(process.env.NEXT_PUBLIC_ML_SERVER_DOMAIN_PORT, null, null);
import ModalShower from "./popup";

const StartExperiment = (props) => { 
  const [setupExperiment, setSetupExperiment] = useState({});
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState("disabled");
  const InitColors = {
    cpu: "bg-gradient-info",
    kustom: "btn-outline-warning",
    test: "btn-outline-warning",
  };
  const nonactiveColors = {
    cpu: "btn-outline-warning",
    kustom: "btn-outline-warning",
    test: "btn-outline-warning",
  };
  const [tabColor, setTabColor] = useState(InitColors);
  const [selectedTab, setSelectedTab] = useState("cpu");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetupExperiment({ ...setupExperiment, ...{ [name]: value } });
  };
  useEffect(() => {
    if (props.agentInfo && props.agentInfo.agentId) {
      setDisabled("");
      setSetupExperiment({
        AgentID: "",
        ClientID: "",
        appName: "",
        noOfIterations: "5",
        cpuMin: "64",
        cpuMax: "128",
        memoryMin: "128",
        memoryMax: "512",
        AgentAddress: "",
        kustomLabel: ''
      })
    } else {
      setDisabled("disabled");
    }
  }, [props.agentInfo]);
  const handleTabClick = (tab) => {
    setTabColor({ ...nonactiveColors, [tab]: "bg-gradient-info" });
    setSelectedTab(tab);
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleStartClick = (e) => {
    try {
      const {
        appName,
        cpuMin,
        cpuMax,
        memoryMin,
        memoryMax,
        AgentAddress,
        noOfIterations,
        kustomBranch,
        kustomPath,
        kustomToken,
        kustomUrl,
        kustomUser,
        testBranch,
        testPath,
        testToken,
        testUrl,
        testUser,
        kustomLabel,
        setupName
      } = setupExperiment;
      const emailId = window.localStorage.getItem('USER_EMAIL');
      const requestPayload = {
        AgentID: (props.agentInfo && props.agentInfo.agentId) || "",
        ClientID: (props.agentInfo && props.agentInfo.clientId) || ""
      };

      const request = new ExperimentSetupRequest();
      const cpuLimit = new Limit();
      const memoryLimit = new Limit();

      const gitKustomParams = new GitParams();
      const gitTestParams = new GitParams();

      const cpu = new Cpu();
      cpu.setLimit('50m');
      cpu.setRequest('50m');

      const memory = new Memory();
      memory.setLimit('100Mi');
      memory.setRequest('100Mi');

      const resourceLimits = new ResourceLimits();
      resourceLimits.setCpu(cpu);
      resourceLimits.setMemory(memory);
      request.setInitiallimits(resourceLimits);

      request.getAgentdetailsMap().set("AgentID", requestPayload.AgentID);
      request.getAgentdetailsMap().set("ClientID", requestPayload.ClientID);
      request.getApplicationdetailsMap().set("Name", appName);
      request.getApplicationdetailsMap().set("label", kustomLabel);

      request.setNoofiterations(noOfIterations);
      request.setAgentaddress(AgentAddress);

      cpuLimit.setMin(cpuMin);
      cpuLimit.setMax(cpuMax);

      request.setCpu(cpuLimit);

      gitKustomParams.setUrl(kustomUrl);
      gitKustomParams.setUser(kustomUser);
      gitKustomParams.setToken(kustomToken);
      gitKustomParams.setBranch(kustomBranch);
      gitKustomParams.setPath(kustomPath);
      request.setKustomizationparams(gitKustomParams);

      gitTestParams.setUrl(testUrl);
      gitTestParams.setUser(testUser);
      gitTestParams.setToken(testToken);
      gitTestParams.setBranch(testBranch);
      gitTestParams.setPath(testPath);
      request.setTestparams(gitTestParams);

      memoryLimit.setMin(memoryMin);
      memoryLimit.setMax(memoryMax);
      request.setMemory(memoryLimit);
      request.setSetupname(setupName);
      request.setEmail(emailId);
      client.setup(request, {}, (err, response) => {
        if (response == null) {
          console.log(err);
          setTitle('Error -Setup Experiment');
          setContent(<><p>There is some error while Setup Experiment !!!</p></>)
        } else {
          const setUpData = {};
          const date = new Date();
          const startedOn = date.toLocaleString();
          setUpData.expId = response.getExpId();
          setUpData.startedOn = startedOn;
          setUpData.appName = appName;
          setUpData.setupName = setupName;
          setUpData.trailCount = noOfIterations;
          setUpData.status = response.getStatus();
          setUpData.actionType = 'Start';
          props.callback(setUpData);
          setTitle('Success - Setup Experiment');
          setContent(<><p>You have successfully done the Setup Experiment !!!</p>
            <span><b>Experiment Id - {response.getExpId()}</b> <br/></span>
            <span><b>Status - {response.getStatus()}</b></span></>)
          setDisabled("disabled");
          
          setSetupExperiment({});
        }
      });
    } catch (err) {
      setTitle('Error - Setup Experiment');
      setContent(<><p>{err}</p></>)
    }
  };

  return (
    <>
      {/* <ModalShower title={title} content={content} id={'modal-default'}/> */}
      <div class="w-full p-6 pt-4 mx-auto">
        <div class="flex flex-wrap -mx-3">
          <div class="w-full max-w-full px-3 lg:flex-0 shrink-0 lg:w-12/12">
            <div class="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border" id="basic-info">
              <div class="p-6 mb-0 rounded-t-2xl">
                <h4 class="dark:text-white">Setup Experiment
                {props.agentInfo &&
                props.agentInfo.agentName &&
                props.agentInfo.agentId && (
                  <> - for Agent {capitalizeFirstLetter(props.agentInfo.agentName)}</>
                )}
                </h4>
              </div>
              <div class="flex-auto p-6 pt-0">
                <div class="flex flex-wrap -mx-3">
                  <div class="w-3/12 max-w-full px-3 flex-0">
                    <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Setup Name">Setup Name</label>
                    <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                      <input
                        type="text"
                        className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                        placeholder="Setup Name"
                        aria-label="setupName"
                        name="setupName"
                        value={setupExperiment.setupName || ''}
                        id="setupName"
                        required=""
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div class="w-3/12 max-w-full px-3 flex-0">
                    <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Application Name">Application Name</label>
                    <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                    <input
                      type="text"
                      className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                      placeholder="Application Name"
                      aria-label="appName"
                      name="appName"
                      value={setupExperiment.appName || ''}
                      id="appName"
                      required=""
                      onChange={handleChange}
                    />
                    </div>
                  </div>
                  <div class="w-2/12 max-w-full px-3 flex-0">
                    <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Trial Count">Trial Count</label>
                    <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                    <input
                      type="text"
                      className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                      placeholder="Trial Count"
                      aria-label="trialcount"
                      name="noOfIterations"
                      value={setupExperiment.noOfIterations || ''}
                      id="trialCount"
                      required=""
                      onChange={handleChange}
                    />
                    </div>
                  </div>
                  <div class="w-2/12 max-w-full px-3 flex-0">
                    <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Agent Address">Agent Address</label>
                    <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                    <input
                      type="text"
                      className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                      placeholder="Agent Address"
                      aria-label="optiAgent"
                      name="AgentAddress"
                      value={setupExperiment.AgentAddress || ''}
                      id="optiAgent"
                      required=""
                      onChange={handleChange}
                    />
                    </div>
                  </div>
              </div>
              <div multisteps-form="true" class="mb-12">
                <div class="flex flex-wrap -mx-3">
                  <div class="w-full max-w-full px-3 mx-auto mt-12 flex-0 lg:w-10/12">
                    <div class="grid grid-cols-3">
                      <button aria-controls="about" type="button" class="before:w-3.4 before:h-3.4 before:rounded-circle before:scale-120 rounded-0 -indent-330 relative m-0 cursor-pointer border-none bg-transparent px-1.5 pb-0.5 pt-5 text-slate-700 outline-none transition-all ease-linear before:absolute before:top-0 before:left-1/2 before:z-30 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current before:bg-current before:transition-all before:ease-linear before:content-[''] sm:indent-0" title="About"><span class="text-slate-400">CPU & Memory</span></button>
                      <button aria-controls="account" type="button" class="before:w-3.4 before:h-3.4 before:rounded-circle after:top-1.25 rounded-0 -indent-330 relative m-0 cursor-pointer border-none bg-transparent px-1.5 pb-0.5 pt-5 text-slate-100 outline-none transition-all ease-linear before:absolute before:top-0 before:left-1/2 before:z-30 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current before:bg-white before:transition-all before:ease-linear before:content-[''] after:absolute after:left-[calc(-50%-13px/2)] after:z-10 after:block after:h-0.5 after:w-full after:bg-current after:transition-all after:ease-linear after:content-[''] sm:indent-0" title="Account">Kustomization Param</button>
                      <button aria-controls="address" type="button" class="before:w-3.4 before:h-3.4 before:rounded-circle after:top-1.25 rounded-0 -indent-330 relative m-0 cursor-pointer border-none bg-transparent px-1.5 pb-0.5 pt-5 text-slate-100 outline-none transition-all ease-linear before:absolute before:top-0 before:left-1/2 before:z-30 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current before:bg-white before:transition-all before:ease-linear before:content-[''] after:absolute after:left-[calc(-50%-13px/2)] after:z-10 after:block after:h-0.5 after:w-full after:bg-current after:transition-all after:ease-linear after:content-[''] sm:indent-0" title="Address">Test Param</button>
                    </div>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3">
                  <div class="w-full max-w-full px-3 m-auto flex-0 lg:w-8/12">
                    <form class="relative mb-10">
                      <div active form="about" class="absolute top-0 left-0 flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white border-0 opacity-100 dark:bg-gray-950 dark:shadow-soft-dark-xl rounded-2xl bg-clip-border">
                        <div class="flex flex-wrap -mx-3 text-center">
                          <div class="w-6/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Min CPU">Minimum CPU(m)</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                              <input
                                type="text"
                                className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                placeholder="Min CPU"
                                aria-label="min-cpu"
                                name="cpuMin"
                                id="minCPU"
                                value={setupExperiment.cpuMin || ''}
                                required=""
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div class="w-6/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Max CPU">Maximum CPU(MB)</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                              <input
                                type="text"
                                className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                placeholder="Max CPU"
                                aria-label="max-cpu"
                                name="cpuMax"
                                id="maxCPU"
                                value={setupExperiment.cpuMax || ''}
                                required=""
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 text-center">
                          <div class="w-6/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Min Memory">Minimum Memory(m)</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                              <input
                                type="text"
                                className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                placeholder="Min Memory"
                                aria-label="minimumMemory"
                                name="memoryMin"
                                id="minmemory"
                                value={setupExperiment.memoryMin || ''}
                                required=""
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div class="w-6/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Max Memory">Maximum Memory(MB)</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                              <input
                                type="text"
                                className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                                placeholder="Max Memory"
                                aria-label="maximumemory"
                                name="memoryMax"
                                id="maxmemory"
                                value={setupExperiment.memoryMax || ''}
                                required=""
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div form="account" class="absolute top-0 left-0 flex flex-col invisible w-full h-0 min-w-0 p-4 break-words bg-white border-0 opacity-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
                        
                        <div class="flex flex-wrap -mx-3 text-center">
                        <div class="w-4/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="URL">URL</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                          <input
                            type="text"
                            className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            name="kustomUrl"
                            id="kustomUrl"
                            placeholder="URL"
                            value={setupExperiment.kustomUrl || ''}
                            onChange={handleChange}
                          />
                          </div>
                          </div>
              
                          <div class="w-4/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="User">User</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
              
                          <input
                            type="text"
                            className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            name="kustomUser"
                            id="kustomUser"
                            placeholder="User"
                            value={setupExperiment.kustomUser || ''}
                            onChange={handleChange}
                          />
                          </div>
                          </div>
                          <div class="w-4/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Label">Label</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                          <input
                            type="text"
                            className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            name="kustomLabel"
                            id="kustomLabel"
                            placeholder="app:nginx"
                            value={setupExperiment.kustomLabel || ''}
                            onChange={handleChange}
                          />
                          </div>
                          </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 text-center">
                        <div class="w-4/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Token">Token</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                          <input
                            type="text"
                            className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            name="kustomToken"
                            id="kustomToken"
                            placeholder="Token"
                            value={setupExperiment.kustomToken || ''}
                            onChange={handleChange}
                          />
                          </div>
                          </div>
                          <div class="w-4/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Branch">Branch</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                          <input
                            type="text"
                            className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            name="kustomBranch"
                            id="kustomBranch"
                            placeholder="Branch"
                            value={setupExperiment.kustomBranch || ''}
                            onChange={handleChange}
                          />
                          </div>
                          </div>
                          <div class="w-4/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Path">Path</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                          <input
                            type="text"
                            className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            name="kustomPath"
                            id="kustomPath"
                            placeholder="Path"
                            value={setupExperiment.kustomPath || ''}
                            onChange={handleChange}
                          />
                          </div>
                          </div>
                          </div>
                      </div>

                      <div form="address" class="absolute top-0 left-0 flex flex-col invisible w-full h-0 min-w-0 p-4 break-words bg-white border-0 opacity-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
                        <div class="flex flex-wrap -mx-3 text-center">
                        <div class="w-6/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="URL">URL</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                          <input
                            type="text"
                            className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            name="testUrl"
                            id="testUrl"
                            placeholder="URL"
                            value={setupExperiment.testUrl || ''}
                            onChange={handleChange}
                          />
                          </div>
                          </div>
              
                          <div class="w-6/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="User">User</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
              
                          <input
                            type="text"
                            className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            name="testUser"
                            id="testUser"
                            placeholder="User"
                            value={setupExperiment.testUser || ''}
                            onChange={handleChange}
                          />
                          </div>
                          </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 text-center">
                        <div class="w-4/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Token">Token</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                          <input
                            type="text"
                            className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            name="testToken"
                            id="testToken"
                            placeholder="Token"
                            value={setupExperiment.testToken || ''}
                            onChange={handleChange}
                          />
                        </div>
                          </div>
                          <div class="w-4/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Branch">Branch</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                          <input
                            type="text"
                            className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            name="testBranch"
                            id="testBranch"
                            placeholder="Branch"
                            value={setupExperiment.testBranch || ''}
                            onChange={handleChange}
                          />
                        </div>
                          </div>
                          <div class="w-4/12 max-w-full px-3 flex-0">
                            <label class="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Path">Path</label>
                            <div class="relative flex flex-wrap items-stretch w-full rounded-lg">
                          <input
                            type="text"
                            className="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            name="testPath"
                            id="testPath"
                            placeholder="Path"
                            value={setupExperiment.testPath || ''}
                            onChange={handleChange}
                          />
                          </div>
                          </div>
                          </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 text-center">
                <div class="w-full px-3 flex-0">
                  <button
                    type="button"
                    className={`inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs ${disabled}`}
                    disabled={disabled === "disabled"}
                    onClick={() => handleStartClick()}
                    data-bs-toggle="modal"
                    data-bs-target="#modal-default"
                  >
                  Setup Experiment
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StartExperiment;
