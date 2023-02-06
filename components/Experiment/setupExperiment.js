import React, { useEffect, useState } from "react";
const { ExperimentHandlerClient } = require("../../ml/ml_server_interface_grpc_web_pb");
const { ExperimentSetupRequest, Limit, GitParams, ResourceLimits, Cpu, Memory } = require("../../ml/ml_server_interface_pb.js");
var client = new ExperimentHandlerClient(process.env.NEXT_PUBLIC_ML_SERVER_DOMAIN_PORT, null, null);
import { experimentValidation } from '../../constants/globalConstants';
import ExpError from './expError';

const SetupExperiment = (props) => {
  const [setupExperiment, setSetupExperiment] = useState({});
  const [isSetupButtonEnabled, setIsSetupButtonEnabled] = useState(false);
  const [isbanelEnabled, setIsBanelEnabled] = useState(false);
  const [expValidation, setExpValidation] = useState(experimentValidation);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (value != '') {
      value = (name === 'isTrain' ?  e.target.checked : value); 
      setSetupExperiment({ ...setupExperiment, ...{ [name]: value } });
      setExpValidation({
        ...expValidation, ...{
          [name]: {
            ...expValidation[name],
            isTouched: true,
            isValid: true
          }
        }
      });
    } else {
      setSetupExperiment({ ...setupExperiment, ...{ [name]: value } });
      setExpValidation({
        ...expValidation, ...{
          [name]: {
            ...expValidation[name],
            isTouched: true,
            isValid: false
          }
        }
      });
    }
  };
  
  
  useEffect(() => {
    if (props.agentInfo && props.agentInfo.agentId) {
      setIsBanelEnabled(true);
      setSetupExperiment({
        AgentID: "",
        ClientID: "",
        appName: "",
        noOfHits: 0,
        noOfIterations: "5",
        isTrain: false,
        cpuMin: "64",
        cpuMax: "128",
        memoryMin: "128",
        memoryMax: "512",
        agentAddress: "",
        kustomLabel: ''
      })
    } else {
      setIsBanelEnabled(false);
    }
  }, [props.agentInfo]);

 
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    let validateCollection = {};
    Object.keys(expValidation).forEach(function(key) {
      validateCollection[key] = expValidation[key].isValid;
    });
    const isAllfieldValid = Object.values(validateCollection).every((v) => v === true)
    setIsSetupButtonEnabled(isAllfieldValid);
  }, [expValidation])

  const handleStartClick = (e) => {
    try {
      const {
        appName,
        cpuMin,
        cpuMax,
        memoryMin,
        memoryMax,
        isTrain,
        agentAddress,
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
      cpu.setLimit('512m');
      cpu.setRequest('128m');

      const memory = new Memory();
      memory.setLimit('512Mi');
      memory.setRequest('128Mi');

      const resourceLimits = new ResourceLimits();
      resourceLimits.setCpu(cpu);
      resourceLimits.setMemory(memory);
      request.setInitiallimits(resourceLimits);

      request.getAgentdetailsMap().set("AgentID", requestPayload.AgentID);
      request.getAgentdetailsMap().set("ClientID", requestPayload.ClientID);
      request.getApplicationdetailsMap().set("Name", appName);
      request.getApplicationdetailsMap().set("label", kustomLabel);

      request.setNoofhits(parseInt(noOfHits));
      request.setNoofiterations(noOfIterations);
      request.setAgentaddress(agentAddress);

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
      request.setIstrain(isTrain);

      request.setEmail(emailId);
      client.setup(request, {}, (err, response) => {
        if (response == null) {
          console.log(err);
          if (Swal && Object.keys(Swal).length > 0) {
            Swal.fire(
              'Error -Setup Experiment',
              'There is some error while Setup Experiment !!!',
              'error'
            )
          }
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
          if (Swal && Object.keys(Swal).length > 0) {
            Swal.fire(
              'Good job!',
              'You have successfully done the Setup Experiment !!!',
              'error'
            )
          }
          setSetupExperiment({});
        }
      });
    } catch (err) {
      if (Swal && Object.keys(Swal).length > 0) {
        Swal.fire(
          'Error -Setup Experiment',
          err,
          'error'
        )
      }
    }
  };

  const checkFieldValid = (name) => {
    const fieldData = expValidation[name];
    if (fieldData.isTouched && !fieldData.isValid) {
      return false;
    }
    return true;
  }
    
  return (
    <>
      <div className="w-full p-6 pt-4 mx-auto">
        <div className={`flex flex-wrap -mx-3 ${!isbanelEnabled ? 'setup_disable' : ''}`}>
          <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 lg:w-12/12">
            <div className="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border" id="basic-info">
              <div className="p-12 mb-0 rounded-t-2xl">
                <div className="flex flex-wrap -mx-3">
                  <div className="w-10/12 max-w-full px-3 flex-0">
                    <h4 className="dark:text-white">Setup Experiment
                      {props.agentInfo &&
                        props.agentInfo.agentName &&
                        props.agentInfo.agentId && (
                        <> - for Agent {capitalizeFirstLetter(props.agentInfo.agentName)}</>
                      )}
                    </h4>
                  </div>
                  <div className="w-2/12 max-w-full px-3 flex-0">
                  <div class="block min-h-6 pl-7">
                    <label>
                      <input 
                      id="checkbox-1"
                      name="isTrain"
                      onChange={handleChange}
                      class="w-5 h-5 ease-soft text-base -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" 
                      type="checkbox" />
                      <label for="checkbox-1" class="cursor-pointer select-none text-slate-700">Is Train</label>
                    </label>
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="flex-auto p-12 pt-0">
                <div className="flex flex-wrap -mx-3">
                  <div className="w-3/12 max-w-full px-3 flex-0">
                    <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Setup Name">Setup Name</label>
                    <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                      <input
                        type="text"
                        className={`${!checkFieldValid('setupName') ? 'errorField' : ''}
                        focus:shadow-soft-primary-outline dark:bg-gray-950 
                        dark:placeholder:text-white/80 dark:text-white/80 
                        text-sm leading-5.6 ease-soft block w-full 
                        appearance-none rounded-lg border border-solid 
                        border-gray-300 bg-white bg-clip-padding px-3 
                        py-2 font-normal text-gray-700 outline-none 
                        transition-all placeholder:text-gray-500 
                        focus:border-fuchsia-300 focus:outline-none`}
                        placeholder="Setup Name"
                        aria-label="setupName"
                        name="setupName"
                        value={setupExperiment.setupName || ''}
                        id="setupName"
                        required=""
                        onChange={handleChange}
                        onBlur={handleChange}
                      />
                      <ExpError
                        name="setupName"
                        touched={expValidation['setupName'].isTouched}
                        valid={expValidation['setupName'].isValid}
                      />
                    </div>
                  </div>
                  <div className="w-3/12 max-w-full px-3 flex-0">
                    <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Application Name">Application Name</label>
                    <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                      <input
                        type="text"
                        className={`${!checkFieldValid('appName') ? 'errorField' : ''}
                        focus:shadow-soft-primary-outline dark:bg-gray-950 
                        dark:placeholder:text-white/80 dark:text-white/80 
                        text-sm leading-5.6 ease-soft block w-full 
                        appearance-none rounded-lg border border-solid 
                        border-gray-300 bg-white bg-clip-padding px-3 
                        py-2 font-normal text-gray-700 outline-none 
                        transition-all placeholder:text-gray-500 
                        focus:border-fuchsia-300 focus:outline-none`}
                        placeholder="Application Name"
                        aria-label="appName"
                        name="appName"
                        value={setupExperiment.appName || ''}
                        id="appName"
                        required=""
                        onChange={handleChange}
                        onBlur={handleChange}
                      />
                      <ExpError
                        name="appName"
                        touched={expValidation['appName'].isTouched}
                        valid={expValidation['appName'].isValid}
                      />
                    </div>
                  </div>
                  <div className="w-2/12 max-w-full px-3 flex-0">
                    <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="No of Hits">No of Hits</label>
                    <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                      <input
                        type="Number"
                        className={`${!checkFieldValid('noOfHits') ? 'errorField' : ''}
                        focus:shadow-soft-primary-outline dark:bg-gray-950 
                        dark:placeholder:text-white/80 dark:text-white/80 
                        text-sm leading-5.6 ease-soft block w-full 
                        appearance-none rounded-lg border border-solid 
                        border-gray-300 bg-white bg-clip-padding px-3 
                        py-2 font-normal text-gray-700 outline-none 
                        transition-all placeholder:text-gray-500 
                        focus:border-fuchsia-300 focus:outline-none`}
                        placeholder="No of Hits"
                        aria-label="noOfHits"
                        name="noOfHits"
                        value={setupExperiment.noOfHits || ''}
                        id="noOfHits"
                        required=""
                        onChange={handleChange}
                        onBlur={handleChange}
                      />
                     
                    </div>
                    <ExpError
                        name="noOfHits"
                        touched={expValidation['noOfHits'].isTouched}
                        valid={expValidation['noOfHits'].isValid}
                      />
                  </div>
                  <div className="w-1/12 max-w-6/12 px-3 flex-0">
                    <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Trial Count">Trial Count</label>
                    <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                      <input
                        type="text"
                        className={`${!checkFieldValid('noOfIterations') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                        placeholder="Trial Count"
                        aria-label="trialcount"
                        name="noOfIterations"
                        value={setupExperiment.noOfIterations || ''}
                        id="trialCount"
                        required=""
                        onChange={handleChange}
                        onBlur={handleChange}
                      />
                    </div>
                    <ExpError
                      name="noOfIterations"
                      touched={expValidation['noOfIterations'].isTouched}
                      valid={expValidation['noOfIterations'].isValid}
                    />
                  </div>
                  <div className="w-2/12 max-w-full px-3 flex-0">
                    <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Agent Address">Agent Address</label>
                    <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                      <input
                        type="text"
                        className={`${!checkFieldValid('agentAddress') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                        placeholder="Agent Address"
                        aria-label="optiAgent"
                        name="agentAddress"
                        value={setupExperiment.agentAddress || ''}
                        id="optiAgent"
                        required=""
                        onChange={handleChange}
                        onBlur={handleChange}
                      />
                    </div>
                    <ExpError
                      name="agentAddress"
                      touched={expValidation['agentAddress'].isTouched}
                      valid={expValidation['agentAddress'].isValid}
                    />
                  </div>
                </div>
                <div multisteps-form="true" className="mb-32">
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 mx-auto mt-12 flex-0 lg:w-10/12">
                      <div className="grid grid-cols-3">
                        <button aria-controls="about" type="button" className="before:w-3.4 before:h-3.4 before:rounded-circle before:scale-120 rounded-0 -indent-330 relative m-0 cursor-pointer border-none bg-transparent px-1.5 pb-0.5 pt-5 text-slate-700 outline-none transition-all ease-linear before:absolute before:top-0 before:left-1/2 before:z-30 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current before:bg-current before:transition-all before:ease-linear before:content-[''] sm:indent-0" title="About"><span className="text-slate-400">CPU & Memory</span></button>
                        <button aria-controls="account" type="button" className="before:w-3.4 before:h-3.4 before:rounded-circle after:top-1.25 rounded-0 -indent-330 relative m-0 cursor-pointer border-none bg-transparent px-1.5 pb-0.5 pt-5 text-slate-100 outline-none transition-all ease-linear before:absolute before:top-0 before:left-1/2 before:z-30 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current before:bg-white before:transition-all before:ease-linear before:content-[''] after:absolute after:left-[calc(-50%-13px/2)] after:z-10 after:block after:h-0.5 after:w-full after:bg-current after:transition-all after:ease-linear after:content-[''] sm:indent-0" title="Account">Kustomization Param</button>
                        <button aria-controls="address" type="button" className="before:w-3.4 before:h-3.4 before:rounded-circle after:top-1.25 rounded-0 -indent-330 relative m-0 cursor-pointer border-none bg-transparent px-1.5 pb-0.5 pt-5 text-slate-100 outline-none transition-all ease-linear before:absolute before:top-0 before:left-1/2 before:z-30 before:box-border before:block before:-translate-x-1/2 before:border-2 before:border-solid before:border-current before:bg-white before:transition-all before:ease-linear before:content-[''] after:absolute after:left-[calc(-50%-13px/2)] after:z-10 after:block after:h-0.5 after:w-full after:bg-current after:transition-all after:ease-linear after:content-[''] sm:indent-0" title="Address">Test Param</button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 m-auto flex-0 lg:w-8/12">
                      <form className="relative mb-10">
                        <div active form="about" className="absolute top-0 left-0 flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white border-0 opacity-100 dark:bg-gray-950 dark:shadow-soft-dark-xl rounded-2xl bg-clip-border">
                          <div className="flex flex-wrap -mx-3 my-2 text-left">
                            <div className="w-6/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Min CPU">Minimum CPU(m)</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('cpuMin') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  placeholder="Min CPU"
                                  aria-label="min-cpu"
                                  name="cpuMin"
                                  id="minCPU"
                                  value={setupExperiment.cpuMin || ''}
                                  required=""
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                              </div>
                              <ExpError
                                name="cpuMin"
                                touched={expValidation['cpuMin'].isTouched}
                                valid={expValidation['cpuMin'].isValid}
                              />
                            </div>
                            <div className="w-6/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Max CPU">Maximum CPU(MB)</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('cpuMax') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  placeholder="Max CPU"
                                  aria-label="max-cpu"
                                  name="cpuMax"
                                  id="maxCPU"
                                  value={setupExperiment.cpuMax || ''}
                                  required=""
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                <ExpError
                                  name="cpuMax"
                                  touched={expValidation['cpuMax'].isTouched}
                                  valid={expValidation['cpuMax'].isValid}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap -mx-3 my-2 text-left">
                            <div className="w-6/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Min Memory">Minimum Memory(m)</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('memoryMin') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  placeholder="Min Memory"
                                  aria-label="minimumMemory"
                                  name="memoryMin"
                                  id="minmemory"
                                  value={setupExperiment.memoryMin || ''}
                                  required=""
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                 <ExpError
                                  name="memoryMin"
                                  touched={expValidation['memoryMin'].isTouched}
                                  valid={expValidation['memoryMin'].isValid}
                                />
                              </div>
                            </div>
                            <div className="w-6/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Max Memory">Maximum Memory(MB)</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('memoryMax') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  placeholder="Max Memory"
                                  aria-label="maximumemory"
                                  name="memoryMax"
                                  id="maxmemory"
                                  value={setupExperiment.memoryMax || ''}
                                  required=""
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                 <ExpError
                                  name="memoryMax"
                                  touched={expValidation['memoryMax'].isTouched}
                                  valid={expValidation['memoryMax'].isValid}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div form="account" className="absolute top-0 left-0 flex flex-col invisible w-full h-0 min-w-0 p-4 break-words bg-white border-0 opacity-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
                          <div className="flex flex-wrap -mx-3 my-2 text-left">
                            <div className="w-4/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="URL">URL</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('kustomUrl') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  name="kustomUrl"
                                  id="kustomUrl"
                                  placeholder="URL"
                                  value={setupExperiment.kustomUrl || ''}
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                 <ExpError
                                  name="kustomUrl"
                                  touched={expValidation['kustomUrl'].isTouched}
                                  valid={expValidation['kustomUrl'].isValid}
                                />
                              </div>
                            </div>

                            <div className="w-4/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="User">User</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">

                                <input
                                  type="text"
                                  className={`${!checkFieldValid('kustomUser') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  name="kustomUser"
                                  id="kustomUser"
                                  placeholder="User"
                                  value={setupExperiment.kustomUser || ''}
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                 <ExpError
                                  name="kustomUser"
                                  touched={expValidation['kustomUser'].isTouched}
                                  valid={expValidation['kustomUser'].isValid}
                                />
                              </div>
                            </div>
                            <div className="w-4/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Label">Label</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('kustomLabel') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  name="kustomLabel"
                                  id="kustomLabel"
                                  placeholder="app:nginx"
                                  value={setupExperiment.kustomLabel || ''}
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                <ExpError
                                  name="kustomLabel"
                                  touched={expValidation['kustomLabel'].isTouched}
                                  valid={expValidation['kustomLabel'].isValid}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap -mx-3 my-2 text-left">
                            <div className="w-4/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Token">Token</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('kustomToken') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  name="kustomToken"
                                  id="kustomToken"
                                  placeholder="Token"
                                  value={setupExperiment.kustomToken || ''}
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                 <ExpError
                                  name="kustomToken"
                                  touched={expValidation['kustomToken'].isTouched}
                                  valid={expValidation['kustomToken'].isValid}
                                />
                              </div>
                            </div>
                            <div className="w-4/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Branch">Branch</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('kustomBranch') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  name="kustomBranch"
                                  id="kustomBranch"
                                  placeholder="Branch"
                                  value={setupExperiment.kustomBranch || ''}
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                 <ExpError
                                  name="kustomBranch"
                                  touched={expValidation['kustomBranch'].isTouched}
                                  valid={expValidation['kustomBranch'].isValid}
                                />
                              </div>
                            </div>
                            <div className="w-4/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Path">Path</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('kustomPath') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  name="kustomPath"
                                  id="kustomPath"
                                  placeholder="Path"
                                  value={setupExperiment.kustomPath || ''}
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                <ExpError
                                  name="kustomPath"
                                  touched={expValidation['kustomPath'].isTouched}
                                  valid={expValidation['kustomPath'].isValid}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div form="address" className="absolute top-0 left-0 flex flex-col invisible w-full h-0 min-w-0 p-4 break-words bg-white border-0 opacity-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
                          <div className="flex flex-wrap -mx-3 my-2 text-left">
                            <div className="w-6/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="URL">URL</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('testUrl') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  name="testUrl"
                                  id="testUrl"
                                  placeholder="URL"
                                  value={setupExperiment.testUrl || ''}
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                <ExpError
                                  name="testUrl"
                                  touched={expValidation['testUrl'].isTouched}
                                  valid={expValidation['testUrl'].isValid}
                                />
                              </div>
                            </div>

                            <div className="w-6/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="User">User</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">

                                <input
                                  type="text"
                                  className={`${!checkFieldValid('testUser') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  name="testUser"
                                  id="testUser"
                                  placeholder="User"
                                  value={setupExperiment.testUser || ''}
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                <ExpError
                                  name="testUser"
                                  touched={expValidation['testUser'].isTouched}
                                  valid={expValidation['testUser'].isValid}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap -mx-3 my-2 text-left">
                            <div className="w-4/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Token">Token</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('testToken') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  name="testToken"
                                  id="testToken"
                                  placeholder="Token"
                                  value={setupExperiment.testToken || ''}
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                 <ExpError
                                  name="testToken"
                                  touched={expValidation['testToken'].isTouched}
                                  valid={expValidation['testToken'].isValid}
                                />
                              </div>
                            </div>
                            <div className="w-4/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Branch">Branch</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('testBranch') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  name="testBranch"
                                  id="testBranch"
                                  placeholder="Branch"
                                  value={setupExperiment.testBranch || ''}
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                 <ExpError
                                  name="testBranch"
                                  touched={expValidation['testBranch'].isTouched}
                                  valid={expValidation['testBranch'].isValid}
                                />
                              </div>
                            </div>
                            <div className="w-4/12 max-w-full px-3 flex-0">
                              <label className="mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80" for="Path">Path</label>
                              <div className="relative flex flex-wrap items-stretch w-full rounded-lg">
                                <input
                                  type="text"
                                  className={`${!checkFieldValid('testPath') ? 'errorField' : ''} focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none`}
                                  name="testPath"
                                  id="testPath"
                                  placeholder="Path"
                                  value={setupExperiment.testPath || ''}
                                  onChange={handleChange}
                                  onBlur={handleChange}
                                />
                                <ExpError
                                  name="testPath"
                                  touched={expValidation['testPath'].isTouched}
                                  valid={expValidation['testPath'].isValid}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 text-center">
                  <div className="w-full px-3 flex-0">
                    <button
                      type="button"
                      className={`${isSetupButtonEnabled ? 'from-purple-700 to-pink-500':'bg-slate-500 setup_disable'} inline-block px-6 py-3 mr-3 
                      font-bold text-center text-white uppercase
                      align-middle transition-all rounded-lg cursor-pointer 
                      bg-gradient-to-tl  
                      leading-pro text-xs ease-soft-in tracking-tight-soft 
                      shadow-soft-md bg-150 bg-x-25 hover:scale-102 
                      active:opacity-85 hover:shadow-soft-xs`}
                      onClick={() => handleStartClick()}
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
export default SetupExperiment;
