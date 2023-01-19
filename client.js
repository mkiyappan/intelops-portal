var grpc = require('grpc');
var mlServerProto = grpc.load('./ml/ml_server_interface.proto');

var client = new mlServerProto.experiment.ml_server.AgentHandler('ml-server.intelops.dev:80', grpc.credentials.createInsecure(),
{
    "grpc.initial_reconnect_backoff_ms": 68000,
    "grpc.min_reconnect_backoff_ms": 200,
    "grpc.max_reconnect_backoff_ms": 500
} )

client.registerAgent({name:'testname', email:'test@gmail.com'}, (err, response)=> {
    console.log('err--->', err);
    console.log('respon--->', response);
})
