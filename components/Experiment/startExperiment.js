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
      <ModalShower title={title} content={content} id={'modal-default'}/>
      <div className="card z-index-0">
        <div className="card-header pb-0 text-start">
          <p>
            <span>
              <h4 className="font-weight-bolder">
              Setup Experiment
              {props.agentInfo &&
                props.agentInfo.agentName &&
                props.agentInfo.agentId && (
                  <> - for Agent {capitalizeFirstLetter(props.agentInfo.agentName)}</>
                )}
            </h4>
            </span>
          </p>

        </div>
        <div className="card-body pt-0">
          {/* <form method="POST" action="/api/v1/auth/signin"> */}
          <div>
            <div className="row">
            <div className="col-3 my-2">
                <label className="form-label">Setup Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Setup Name"
                  aria-label="setupName"
                  name="setupName"
                  value={setupExperiment.setupName || ''}
                  id="setupName"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <div className="col-4 my-2">
                <label className="form-label">Application Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Application Name"
                  aria-label="appName"
                  name="appName"
                  value={setupExperiment.appName || ''}
                  id="appName"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <div className="col-2 my-2">
                <label className="form-label">Trial Count</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Trial Count"
                  aria-label="trialcount"
                  name="noOfIterations"
                  value={setupExperiment.noOfIterations || ''}
                  id="trialCount"
                  required=""
                  onChange={handleChange}
                />
              </div>
             
              <div className="col-3 my-2">
                <label className="form-label">Agent Address</label>
                <input
                  type="text"
                  className="form-control"
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
          <div className="row customtabDesign">
            <div className="collapseLink  setup-tab-design">
              <a
                className={`btn ${tabColor.cpu} setup-param-tab border_unset`}
                data-bs-toggle="collapse"
                href="#cpumemory"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={() => {
                  handleTabClick("cpu");
                }}
              >
                CPU & Memory
              </a>
              <a
                className={`btn ${tabColor.kustom} setup-param-tab border_unset`}
                data-bs-toggle="collapse"
                href="#kustomizationParam"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={() => {
                  handleTabClick("kustom");
                }}
              >
                kustomization Params
              </a>
              <a
                className={`btn ${tabColor.test} setup-param-tab border_unset`}
                data-bs-toggle="collapse"
                href="#testParam"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={() => {
                  handleTabClick("test");
                }}
              >
                Test Parameters
              </a>
            </div>
            {selectedTab === "cpu" && (
              <div className="padding-unset" id="cpumemory">
                <div className="card card-body">
                  <div className="row">
                    <div className="col-6 my-2">
                      <label className="form-label">Minimum CPU(m)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Min CPU"
                        aria-label="min-cpu"
                        name="cpuMin"
                        id="minCPU"
                        value={setupExperiment.cpuMin || ''}
                        required=""
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-6 my-2">
                      <label className="form-label">Maximum CPU(MB)</label>
                      <input
                        type="text"
                        className="form-control"
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
                  <div className="row">
                    <div className="col-6 my-2">
                      <label className="form-label">Minimum Memory(m)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Min Memory"
                        aria-label="minimumMemory"
                        name="memoryMin"
                        id="minmemory"
                        value={setupExperiment.memoryMin || ''}
                        required=""
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-6 my-2">
                      <label className="form-label">Maximum Memory(MB)</label>
                      <input
                        type="text"
                        className="form-control"
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
            )}
           
            {selectedTab === "kustom" && (
              <div className="padding-unset" id="kustomizationParam">
                <div className="card card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label">URL</label>
                        <input
                          type="text"
                          className="form-control"
                          name="kustomUrl"
                          id="kustomUrl"
                          placeholder="URL"
                          value={setupExperiment.kustomUrl || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label">User</label>
                        <input
                          type="text"
                          className="form-control"
                          name="kustomUser"
                          id="kustomUser"
                          placeholder="User"
                          value={setupExperiment.kustomUser || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label">Label</label>
                        <input
                          type="text"
                          className="form-control"
                          name="kustomLabel"
                          id="kustomLabel"
                          placeholder="app:nginx"
                          value={setupExperiment.kustomLabel || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label">Token</label>
                        <input
                          type="text"
                          className="form-control"
                          name="kustomToken"
                          id="kustomToken"
                          placeholder="Token"
                          value={setupExperiment.kustomToken || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label">Branch</label>
                        <input
                          type="text"
                          className="form-control"
                          name="kustomBranch"
                          id="kustomBranch"
                          placeholder="Branch"
                          value={setupExperiment.kustomBranch || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label">Path</label>
                        <input
                          type="text"
                          className="form-control"
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
              </div>
            )}
            {selectedTab === "test" && (
              <div className="padding-unset" id="testParam">
                <div className="card card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">URL</label>
                        <input
                          type="text"
                          className="form-control"
                          name="testUrl"
                          id="testUrl"
                          placeholder="URL"
                          value={setupExperiment.testUrl || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">User</label>
                        <input
                          type="text"
                          className="form-control"
                          name="testUser"
                          id="testUser"
                          placeholder="User"
                          value={setupExperiment.testUser || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label">Token</label>
                        <input
                          type="text"
                          className="form-control"
                          name="testToken"
                          id="testToken"
                          placeholder="Token"
                          value={setupExperiment.testToken || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label">Branch</label>
                        <input
                          type="text"
                          className="form-control"
                          name="testBranch"
                          id="testBranch"
                          placeholder="Branch"
                          value={setupExperiment.testBranch || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label">Path</label>
                        <input
                          type="text"
                          className="form-control"
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
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 text-center">
              <button
                type="submit"
                className={`btn bg-gradient-info w-100 my-4 mb-2 ${disabled}`}
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
    </>
  );
};
export default StartExperiment;
