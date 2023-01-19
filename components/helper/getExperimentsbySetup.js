const { ExperimentHandlerClient } = require("../../ml/ml_server_interface_grpc_web_pb");
const { SetupName } = require("../../ml/ml_server_interface_pb.js");
const client = new ExperimentHandlerClient(process.env.NEXT_PUBLIC_ML_SERVER_DOMAIN_PORT, null, null);

export const getExperimentsListBySetup = async (setupKey) => {
    const request = new SetupName();
    request.setSetupname(setupKey);
    try {
     return new Promise((resolve,reject)=> {
        client.getAllExperimentBySetupName(request, {}, (err, response) => {
            const expListData = response.getExperimentsList();
            let expList = [];
            expListData.forEach(data => {
              const experiment = {};
              experiment.expId = data.getExpid();
              experiment.startedOn = data.getCreateTime();
              experiment.appName = data.getApplicationname();
              experiment.trailCount = data.getTrailcount();
              experiment.setupName = data.getSetupname();
              experiment.status = data.getStatus();
              experiment.actionType = 'Start';
              expList.push(experiment);
            });
            resolve(expList);
          });         
     })
    } catch (err) {
      console.log('err---->', err)
    }
}