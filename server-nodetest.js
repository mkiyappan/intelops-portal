var grpc = require('grpc');
var mlServerProto = grpc.load('./ml/ml_server_interface.proto');
var server = new grpc.Server();


server.addService(mlServerProto.experiment.ml_server.AgentHandler.service, {
    RegisterAgent: function (call, callback) {
        return callback(null, {
                agentID: '1233',
                clientID: 'CId2323',
                clientSecret: 'CS2323',
                token: 't1233'
        })
    },
    GetAgents: function (call, callback) {
        return callback(null, {agent:{
            agentID: '1233',
            clientID: 'CId2323',
            token: 't1233',
            name: 'Nokia',
            email: 'iyappanmk91@gmail.com'
    }})
    },
    GetAgentByEmail: function (call, callback) {
        return callback(null, [{
                agentID: '1233',
                clientID: 'CId2323',
                token: 't1233',
                name: 'Nokia',
                email: 'iyappanmk91@gmail.com'
        },{
            agentID: '12334',
            clientID: 'CId2323',
            token: 't1233',
            name: 'Micro',
            email: 'iyappanmk91@gmail.com'
    }])
    }
});
    

server.addService(mlServerProto.experiment.ml_server.ExperimentHandler.service, {
    Setup: function (call, callback) {
        return callback(null, {
                exp_id: '1233',
                status: 'Working'
        })
    },
    StopExperiment: function (call, callback) {
        return callback(null, {
                message: 'stopped'
        })
    },
    GetAllExperimentByEmail: function (call, callback) {
        return callback(null, [{
            expId: '123',
            AgentDetails: 'details',
            AgentID: 'agentId',
            ApplicationName: 'Ecommerce Company',
            Status: 'working',
            create_time: 123,
            update_time: 3434,
            TrailCount: 5,
            setupName: 'Test Setup One'
        },{
            expId: '1234',
            AgentDetails: 'details',
            AgentID: 'agentId',
            ApplicationName: 'MicroSoft Excel ',
            Status: 'working',
            create_time: 123,
            update_time: 3434,
            TrailCount: 4,
            setupName: 'Test Setup two'
        }])
        
    },
    GetAllSetupNameByEmail: function (call, callback) {
        return callback(null, [{
            ApplicationName: 'App Name one',
            SetupName: 'Setup Name one'
        },{
            ApplicationName: 'App Name two',
            SetupName: 'Setup Name two'
        }])
    },
    GetAllExperimentBySetupName: function (call, callback) {
        return callback(null, [{
            expId: '123',
            AgentDetails: 'details',
            AgentID: 'agentId',
            ApplicationName: 'Ecommerce Company',
            Status: 'working',
            create_time: 123,
            update_time: 3434,
            TrailCount: 5,
            setupName: 'Test Setup One'
        },{
            expId: '1234',
            AgentDetails: 'details',
            AgentID: 'agentId',
            ApplicationName: 'MicroSoft Excel ',
            Status: 'working',
            create_time: 123,
            update_time: 3434,
            TrailCount: 4,
            setupName: 'Test Setup two'
        }])
    },
    GetIterationsByExpID: function (call, callback) {
        return callback(null, {
            exp_id: '123',
            status: 'details',
            results: [
                {
                  request: {
                    iterationID: "0a8a5c32-0038-461a-8d01-c38d5d8b7560",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    limits: {
                      cpu: {
                        limit: "50m",
                        request: "50m"
                      },
                      memory: {
                        limit: "100Mi",
                        request: "100Mi"
                      }
                    }
                  },
                  response: {
                    status: "Completed",
                    iterationID: "0a8a5c32-0038-461a-8d01-c38d5d8b7560",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    maxLimit: {
                      cpu: "196.130325",
                      memory: "55.894016"
                    },
                    Cpu: 196.13033,
                    Memory: 55.894016,
                    EnvStatus: 1,
                    Latency: 0.9367701,
                    NoOfErrors: 1,
                    NoOfFailures: 1,
                    NoUserPerSec: 44,
                    ResponseTime: 2.5925872,
                    SuccessRate: 100,
                    TotReq: 3239
                  },
                  IterationNumber: 1,
                  IsSuggested: true
                },
                {
                  request: {
                    iterationID: "114cb8e0-d304-48db-9dc2-9bc1d0964242",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    limits: {
                      cpu: {
                        limit: "50m",
                        request: "50m"
                      },
                      memory: {
                        limit: "100Mi",
                        request: "100Mi"
                      },
                      
                    },
                    
                  },
                  response: {
                    status: "Completed",
                    iterationID: "114cb8e0-d304-48db-9dc2-9bc1d0964242",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    maxLimit: {
                      cpu: "223.079910",
                      memory: "56.168449"
                    },
                    Cpu: 223.07991,
                    Memory: 56.16845,
                    EnvStatus: 1,
                    Latency: 0.7594441,
                    NoOfErrors: 1,
                    NoOfFailures: 1,
                    NoUserPerSec: 50,
                    ResponseTime: 2.0925467,
                    SuccessRate: 100,
                    TotReq: 3579
                  },
                  IterationNumber: 40,
                  IsSuggested: false
                },
                {
                  request: {
                    iterationID: "106c5484-1a88-4192-9def-08ba0b3ac64a",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    limits: {
                      cpu: {
                        limit: "50m",
                        request: "50m"
                      },
                      memory: {
                        limit: "100Mi",
                        request: "100Mi"
                      }
                    }
                  },
                  response: {
                    status: "Completed",
                    iterationID: "106c5484-1a88-4192-9def-08ba0b3ac64a",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    maxLimit: {
                      cpu: "298.984253",
                      memory: "56.086529"
                    },
                    Cpu: 298.98425,
                    Memory: 56.08653,
                    EnvStatus: 1,
                    Latency: 0.0095130075,
                    NoOfErrors: 1,
                    NoOfFailures: 1,
                    NoUserPerSec: 86,
                    ResponseTime: 0.100644045,
                    SuccessRate: 100,
                    TotReq: 6028
                  },
                  IterationNumber: 43,
                  IsSuggested: true
                },
                {
                  request: {
                    iterationID: "e7c52e95-869c-4a72-923c-ac71efdf07ea",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    limits: {
                      cpu: {
                        limit: "50m",
                        request: "50m"
                      },
                      memory: {
                        limit: "100Mi",
                        request: "100Mi"
                      }
                    }
                  },
                  response: {
                    status: "Completed",
                    iterationID: "e7c52e95-869c-4a72-923c-ac71efdf07ea",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    maxLimit: {
                      cpu: "83.499100",
                      memory: "55.230465"
                    },
                    Cpu: 83.4991,
                    Memory: 55.230465,
                    EnvStatus: 1,
                    NoOfErrors: 1,
                    NoOfFailures: 1,
                    TotReq: 1
                  },
                  IterationNumber: 25,
                  IsSuggested: false
                },
                {
                  request: {
                    iterationID: "14d1b2cf-a00a-4bad-ba49-c78ed36102c0",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    limits: {
                      cpu: {
                        limit: "50m",
                        request: "50m"
                      },
                      memory: {
                        limit: "100Mi",
                        request: "100Mi"
                      }
                    }
                  },
                  response: {
                    status: "Completed",
                    iterationID: "14d1b2cf-a00a-4bad-ba49-c78ed36102c0",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    maxLimit: {
                      cpu: "132.385101",
                      memory: "55.644161"
                    },
                    Cpu: 132.3851,
                    Memory: 55.64416,
                    EnvStatus: 1,
                    Latency: 1.9411936,
                    NoOfErrors: 1,
                    NoOfFailures: 1,
                    NoUserPerSec: 27,
                    ResponseTime: 4.7908444,
                    SuccessRate: 100,
                    TotReq: 2165
                  },
                  IterationNumber: 4,
                  IsSuggested: true
                },
                {
                  request: {
                    iterationID: "6544eac4-5997-4b69-ae8e-abfd76db4560",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    limits: {
                      cpu: {
                        limit: "50m",
                        request: "50m"
                      },
                      memory: {
                        limit: "100Mi",
                        request: "100Mi"
                      }
                    }
                  },
                  response: {
                    status: "Completed",
                    iterationID: "6544eac4-5997-4b69-ae8e-abfd76db4560",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    maxLimit: {
                      cpu: "153.351105",
                      memory: "55.947266"
                    },
                    Cpu: 153.3511,
                    Memory: 55.947266,
                    EnvStatus: 1,
                    Latency: 1.507175,
                    NoOfErrors: 1,
                    NoOfFailures: 1,
                    NoUserPerSec: 34,
                    ResponseTime: 5.883385,
                    SuccessRate: 100,
                    TotReq: 2532
                  },
                  IterationNumber: 10,
                  IsSuggested: false
                },
                {
                  request: {
                    iterationID: "3c68556d-9baa-48d9-ac2e-a6c65ddc1180",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    limits: {
                      cpu: {
                        limit: "50m",
                        request: "50m"
                      },
                      memory: {
                        limit: "100Mi",
                        request: "100Mi"
                      }
                    }
                  },
                  response: {
                    status: "Completed",
                    iterationID: "3c68556d-9baa-48d9-ac2e-a6c65ddc1180",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    maxLimit: {
                      cpu: "291.547974",
                      memory: "56.131584"
                    },
                    Cpu: 291.54797,
                    Memory: 56.131584,
                    EnvStatus: 1,
                    Latency: 0.15294282,
                    NoOfErrors: 1,
                    NoOfFailures: 1,
                    NoUserPerSec: 75,
                    ResponseTime: 0.68680024,
                    SuccessRate: 100,
                    TotReq: 5291
                  },
                  IterationNumber: 18,
                  IsSuggested: true
                },
                {
                  request: {
                    iterationID: "3cbad1a5-65db-4221-9b47-81a061ffafbe",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    limits: {
                      cpu: {
                        limit: "50m",
                        request: "50m"
                      },
                      memory: {
                        limit: "100Mi",
                        request: "100Mi"
                      }
                    }
                  },
                  response: {
                    status: "Completed",
                    iterationID: "3cbad1a5-65db-4221-9b47-81a061ffafbe",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    maxLimit: {
                      cpu: "316.630676",
                      memory: "55.726082"
                    },
                    Cpu: 316.63068,
                    Memory: 55.72608,
                    EnvStatus: 1,
                    Latency: 0.03914717,
                    NoOfErrors: 1,
                    NoOfFailures: 1,
                    NoUserPerSec: 84,
                    ResponseTime: 0.28212926,
                    SuccessRate: 100,
                    TotReq: 5881
                  },
                  IterationNumber: 44,
                  IsSuggested: false
                },
                {
                  request: {
                    iterationID: "6bbc070c-e6f4-4f8f-8a70-24a6a279bc07",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    limits: {
                      cpu: {
                        limit: "50m",
                        request: "50m"
                      },
                      memory: {
                        limit: "100Mi",
                        request: "100Mi"
                      }
                    }
                  },
                  response: {
                    status: "Completed",
                    iterationID: "6bbc070c-e6f4-4f8f-8a70-24a6a279bc07",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    maxLimit: {
                      cpu: "258.931488",
                      memory: "56.352768"
                    },
                    Cpu: 258.9315,
                    Memory: 56.352768,
                    EnvStatus: 1,
                    Latency: 0.15470572,
                    NoOfErrors: 1,
                    NoOfFailures: 1,
                    NoUserPerSec: 74,
                    ResponseTime: 0.7730591,
                    SuccessRate: 100,
                    TotReq: 5295
                  },
                  IterationNumber: 32,
                  IsSuggested: true
                },
                {
                  request: {
                    iterationID: "aaf1ab78-0787-43c8-8832-79cc51adb942",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    limits: {
                      cpu: {
                        limit: "50m",
                        request: "50m"
                      },
                      memory: {
                        limit: "100Mi",
                        request: "100Mi"
                      }
                    }
                  },
                  response: {
                    status: "Completed",
                    iterationID: "aaf1ab78-0787-43c8-8832-79cc51adb942",
                    experimentID: "cde7757b-3720-4bd9-b806-b88a874f0d07",
                    maxLimit: {
                      cpu: "148.460800",
                      memory: "55.730175"
                    },
                    Cpu: 148.4608,
                    Memory: 55.730175,
                    EnvStatus: 1,
                    Latency: 1.7243112,
                    NoOfErrors: 1,
                    NoOfFailures: 1,
                    NoUserPerSec: 31,
                    ResponseTime: 5.5610824,
                    SuccessRate: 100,
                    TotReq: 2323
                  },
                  IterationNumber: 35,
                  IsSuggested: false
                }
              ]
        })
        
    }
    

});

server.bind('localhost:8080', grpc.ServerCredentials.createInsecure());
server.start();
console.log('server started--->')