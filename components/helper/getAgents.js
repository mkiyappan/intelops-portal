const { AgentHandlerClient } = require("../../ml/ml_server_interface_grpc_web_pb");
const agentClient = new AgentHandlerClient(process.env.NEXT_PUBLIC_ML_SERVER_DOMAIN_PORT, null, null);
const {
  ClientDetails, 
  Null, 
  Email
} = require("../../ml/ml_server_interface_pb.js");

export const getAgentListData = async () => {
    const requestEmail = new Email();
    const emailId = window.localStorage.getItem('USER_EMAIL');
    requestEmail.setEmail(emailId);
    try {
     return new Promise((resolve,reject)=> {
        agentClient.getAgentByEmail(requestEmail, {}, (err, response) => {
            let agentPool = [];
            const agentDataList = response.getAgentList();
            agentDataList.forEach(data => {
              const agentData = {
                agentName: data.getName(),
                agentId: data.getAgentid(),
                token: data.getToken(),
                clientId: data.getClientid(),
                email: data.getEmail()
              }
              agentPool.push(agentData);
            });
            resolve(agentPool);
        })          
     })
    } catch (err) {
      console.log('err---->', err)
    }
}