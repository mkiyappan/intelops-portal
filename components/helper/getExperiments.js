const { ExperimentHandlerClient } = require("../../ml/ml_server_interface_grpc_web_pb");
const { Email } = require("../../ml/ml_server_interface_pb.js");
const client = new ExperimentHandlerClient(process.env.NEXT_PUBLIC_ML_SERVER_DOMAIN_PORT, null, null);

export const getExperimentsListData = async () => {
    const emailId = window.localStorage.getItem('USER_EMAIL');
    const request = new Email();
    request.setEmail(emailId);
    try {
     return new Promise((resolve,reject)=> {
        client.getAllExperimentByEmail(request, {}, (err, response) => {
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