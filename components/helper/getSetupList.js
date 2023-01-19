const { ExperimentHandlerClient } = require("../../ml/ml_server_interface_grpc_web_pb");
const { Email } = require("../../ml/ml_server_interface_pb.js");
const client = new ExperimentHandlerClient(process.env.NEXT_PUBLIC_ML_SERVER_DOMAIN_PORT, null, null);

export const getSetupListData = async () => {
    const requestEmail = new Email();
    const emailId = window.localStorage.getItem('USER_EMAIL');
    requestEmail.setEmail(emailId);
    try {
     return new Promise((resolve,reject)=> {
      client.getAllSetupNameByEmail(requestEmail, {}, (err, response) => {
            let setupPool = [];
            const setupList = response.getSetupdetailsList();
            setupList.forEach(data => {
              const setupData = {
                appName: data.getApplicationname(),
                setupName: data.getSetupname()
              }
              setupPool.push(setupData);
            });
            resolve(setupPool);
        })          
     })
    } catch (err) {
      console.log('err---->', err)
    }
}