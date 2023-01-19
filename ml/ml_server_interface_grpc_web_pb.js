/**
 * @fileoverview gRPC-Web generated client stub for experiment.ml_server
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.experiment = {};
proto.experiment.ml_server = require('./ml_server_interface_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.experiment.ml_server.AgentHandlerClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.experiment.ml_server.AgentHandlerPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.ClientDetails,
 *   !proto.experiment.ml_server.ClientCredentials>}
 */
const methodDescriptor_AgentHandler_RegisterAgent = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.AgentHandler/RegisterAgent',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.ClientDetails,
  proto.experiment.ml_server.ClientCredentials,
  /**
   * @param {!proto.experiment.ml_server.ClientDetails} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.ClientCredentials.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.ClientDetails} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.ClientCredentials)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.ClientCredentials>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.AgentHandlerClient.prototype.registerAgent =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.AgentHandler/RegisterAgent',
      request,
      metadata || {},
      methodDescriptor_AgentHandler_RegisterAgent,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.ClientDetails} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.ClientCredentials>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.AgentHandlerPromiseClient.prototype.registerAgent =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.AgentHandler/RegisterAgent',
      request,
      metadata || {},
      methodDescriptor_AgentHandler_RegisterAgent);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.Null,
 *   !proto.experiment.ml_server.Agents>}
 */
const methodDescriptor_AgentHandler_GetAgents = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.AgentHandler/GetAgents',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.Null,
  proto.experiment.ml_server.Agents,
  /**
   * @param {!proto.experiment.ml_server.Null} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.Agents.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.Null} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.Agents)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.Agents>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.AgentHandlerClient.prototype.getAgents =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.AgentHandler/GetAgents',
      request,
      metadata || {},
      methodDescriptor_AgentHandler_GetAgents,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.Null} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.Agents>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.AgentHandlerPromiseClient.prototype.getAgents =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.AgentHandler/GetAgents',
      request,
      metadata || {},
      methodDescriptor_AgentHandler_GetAgents);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.Email,
 *   !proto.experiment.ml_server.Agents>}
 */
const methodDescriptor_AgentHandler_GetAgentByEmail = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.AgentHandler/GetAgentByEmail',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.Email,
  proto.experiment.ml_server.Agents,
  /**
   * @param {!proto.experiment.ml_server.Email} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.Agents.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.Email} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.Agents)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.Agents>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.AgentHandlerClient.prototype.getAgentByEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.AgentHandler/GetAgentByEmail',
      request,
      metadata || {},
      methodDescriptor_AgentHandler_GetAgentByEmail,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.Email} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.Agents>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.AgentHandlerPromiseClient.prototype.getAgentByEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.AgentHandler/GetAgentByEmail',
      request,
      metadata || {},
      methodDescriptor_AgentHandler_GetAgentByEmail);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.experiment.ml_server.ExperimentHandlerClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.experiment.ml_server.ExperimentHandlerPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.ExperimentSetupRequest,
 *   !proto.experiment.ml_server.ExperimentSetupResponse>}
 */
const methodDescriptor_ExperimentHandler_Setup = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ExperimentHandler/Setup',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.ExperimentSetupRequest,
  proto.experiment.ml_server.ExperimentSetupResponse,
  /**
   * @param {!proto.experiment.ml_server.ExperimentSetupRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.ExperimentSetupResponse.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.ExperimentSetupRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.ExperimentSetupResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.ExperimentSetupResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ExperimentHandlerClient.prototype.setup =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/Setup',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_Setup,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.ExperimentSetupRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.ExperimentSetupResponse>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ExperimentHandlerPromiseClient.prototype.setup =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/Setup',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_Setup);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.Experiment,
 *   !proto.experiment.ml_server.Null>}
 */
const methodDescriptor_ExperimentHandler_StartExperiment = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ExperimentHandler/StartExperiment',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.Experiment,
  proto.experiment.ml_server.Null,
  /**
   * @param {!proto.experiment.ml_server.Experiment} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.Null.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.Experiment} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.Null)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.Null>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ExperimentHandlerClient.prototype.startExperiment =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/StartExperiment',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_StartExperiment,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.Experiment} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.Null>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ExperimentHandlerPromiseClient.prototype.startExperiment =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/StartExperiment',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_StartExperiment);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.Experiment,
 *   !proto.experiment.ml_server.ExperimentSetupResponse>}
 */
const methodDescriptor_ExperimentHandler_StatusExperiment = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ExperimentHandler/StatusExperiment',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.Experiment,
  proto.experiment.ml_server.ExperimentSetupResponse,
  /**
   * @param {!proto.experiment.ml_server.Experiment} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.ExperimentSetupResponse.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.Experiment} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.ExperimentSetupResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.ExperimentSetupResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ExperimentHandlerClient.prototype.statusExperiment =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/StatusExperiment',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_StatusExperiment,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.Experiment} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.ExperimentSetupResponse>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ExperimentHandlerPromiseClient.prototype.statusExperiment =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/StatusExperiment',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_StatusExperiment);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.Experiment,
 *   !proto.experiment.ml_server.TerminationResp>}
 */
const methodDescriptor_ExperimentHandler_StopExperiment = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ExperimentHandler/StopExperiment',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.Experiment,
  proto.experiment.ml_server.TerminationResp,
  /**
   * @param {!proto.experiment.ml_server.Experiment} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.TerminationResp.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.Experiment} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.TerminationResp)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.TerminationResp>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ExperimentHandlerClient.prototype.stopExperiment =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/StopExperiment',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_StopExperiment,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.Experiment} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.TerminationResp>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ExperimentHandlerPromiseClient.prototype.stopExperiment =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/StopExperiment',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_StopExperiment);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.Email,
 *   !proto.experiment.ml_server.Experiments>}
 */
const methodDescriptor_ExperimentHandler_GetAllExperimentByEmail = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ExperimentHandler/GetAllExperimentByEmail',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.Email,
  proto.experiment.ml_server.Experiments,
  /**
   * @param {!proto.experiment.ml_server.Email} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.Experiments.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.Email} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.Experiments)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.Experiments>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ExperimentHandlerClient.prototype.getAllExperimentByEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/GetAllExperimentByEmail',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_GetAllExperimentByEmail,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.Email} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.Experiments>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ExperimentHandlerPromiseClient.prototype.getAllExperimentByEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/GetAllExperimentByEmail',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_GetAllExperimentByEmail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.Email,
 *   !proto.experiment.ml_server.Iterations>}
 */
const methodDescriptor_ExperimentHandler_GetAllIterationsByEmail = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ExperimentHandler/GetAllIterationsByEmail',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.Email,
  proto.experiment.ml_server.Iterations,
  /**
   * @param {!proto.experiment.ml_server.Email} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.Iterations.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.Email} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.Iterations)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.Iterations>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ExperimentHandlerClient.prototype.getAllIterationsByEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/GetAllIterationsByEmail',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_GetAllIterationsByEmail,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.Email} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.Iterations>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ExperimentHandlerPromiseClient.prototype.getAllIterationsByEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/GetAllIterationsByEmail',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_GetAllIterationsByEmail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.Iteration,
 *   !proto.experiment.ml_server.IterationsDetails>}
 */
const methodDescriptor_ExperimentHandler_GetIterationsByID = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ExperimentHandler/GetIterationsByID',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.Iteration,
  proto.experiment.ml_server.IterationsDetails,
  /**
   * @param {!proto.experiment.ml_server.Iteration} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.IterationsDetails.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.Iteration} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.IterationsDetails)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.IterationsDetails>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ExperimentHandlerClient.prototype.getIterationsByID =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/GetIterationsByID',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_GetIterationsByID,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.Iteration} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.IterationsDetails>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ExperimentHandlerPromiseClient.prototype.getIterationsByID =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/GetIterationsByID',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_GetIterationsByID);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.Experiment,
 *   !proto.experiment.ml_server.ExperimentSetupResponse>}
 */
const methodDescriptor_ExperimentHandler_GetIterationsByExpID = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ExperimentHandler/GetIterationsByExpID',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.Experiment,
  proto.experiment.ml_server.ExperimentSetupResponse,
  /**
   * @param {!proto.experiment.ml_server.Experiment} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.ExperimentSetupResponse.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.Experiment} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.ExperimentSetupResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.ExperimentSetupResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ExperimentHandlerClient.prototype.getIterationsByExpID =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/GetIterationsByExpID',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_GetIterationsByExpID,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.Experiment} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.ExperimentSetupResponse>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ExperimentHandlerPromiseClient.prototype.getIterationsByExpID =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/GetIterationsByExpID',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_GetIterationsByExpID);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.Email,
 *   !proto.experiment.ml_server.SetupTemplate>}
 */
const methodDescriptor_ExperimentHandler_GetAllSetupNameByEmail = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ExperimentHandler/GetAllSetupNameByEmail',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.Email,
  proto.experiment.ml_server.SetupTemplate,
  /**
   * @param {!proto.experiment.ml_server.Email} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.SetupTemplate.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.Email} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.SetupTemplate)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.SetupTemplate>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ExperimentHandlerClient.prototype.getAllSetupNameByEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/GetAllSetupNameByEmail',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_GetAllSetupNameByEmail,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.Email} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.SetupTemplate>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ExperimentHandlerPromiseClient.prototype.getAllSetupNameByEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/GetAllSetupNameByEmail',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_GetAllSetupNameByEmail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.SetupName,
 *   !proto.experiment.ml_server.Experiments>}
 */
const methodDescriptor_ExperimentHandler_GetAllExperimentBySetupName = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ExperimentHandler/GetAllExperimentBySetupName',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.SetupName,
  proto.experiment.ml_server.Experiments,
  /**
   * @param {!proto.experiment.ml_server.SetupName} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.Experiments.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.SetupName} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.Experiments)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.Experiments>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ExperimentHandlerClient.prototype.getAllExperimentBySetupName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/GetAllExperimentBySetupName',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_GetAllExperimentBySetupName,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.SetupName} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.Experiments>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ExperimentHandlerPromiseClient.prototype.getAllExperimentBySetupName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ExperimentHandler/GetAllExperimentBySetupName',
      request,
      metadata || {},
      methodDescriptor_ExperimentHandler_GetAllExperimentBySetupName);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.experiment.ml_server.ServerCallBacksHandlerClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.experiment.ml_server.ServerCallBacksHandlerPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.AgentNotification,
 *   !proto.experiment.ml_server.Null>}
 */
const methodDescriptor_ServerCallBacksHandler_MLAgentSetupCallback = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ServerCallBacksHandler/MLAgentSetupCallback',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.AgentNotification,
  proto.experiment.ml_server.Null,
  /**
   * @param {!proto.experiment.ml_server.AgentNotification} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.Null.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.AgentNotification} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.Null)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.Null>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ServerCallBacksHandlerClient.prototype.mLAgentSetupCallback =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ServerCallBacksHandler/MLAgentSetupCallback',
      request,
      metadata || {},
      methodDescriptor_ServerCallBacksHandler_MLAgentSetupCallback,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.AgentNotification} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.Null>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ServerCallBacksHandlerPromiseClient.prototype.mLAgentSetupCallback =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ServerCallBacksHandler/MLAgentSetupCallback',
      request,
      metadata || {},
      methodDescriptor_ServerCallBacksHandler_MLAgentSetupCallback);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.DataCollectorNotification,
 *   !proto.experiment.ml_server.DataCollectorNotificationResponce>}
 */
const methodDescriptor_ServerCallBacksHandler_DataCollectorSetupCallback = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ServerCallBacksHandler/DataCollectorSetupCallback',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.DataCollectorNotification,
  proto.experiment.ml_server.DataCollectorNotificationResponce,
  /**
   * @param {!proto.experiment.ml_server.DataCollectorNotification} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.DataCollectorNotificationResponce.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.DataCollectorNotification} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.DataCollectorNotificationResponce)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.DataCollectorNotificationResponce>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ServerCallBacksHandlerClient.prototype.dataCollectorSetupCallback =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ServerCallBacksHandler/DataCollectorSetupCallback',
      request,
      metadata || {},
      methodDescriptor_ServerCallBacksHandler_DataCollectorSetupCallback,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.DataCollectorNotification} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.DataCollectorNotificationResponce>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ServerCallBacksHandlerPromiseClient.prototype.dataCollectorSetupCallback =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ServerCallBacksHandler/DataCollectorSetupCallback',
      request,
      metadata || {},
      methodDescriptor_ServerCallBacksHandler_DataCollectorSetupCallback);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.IterationsDetails,
 *   !proto.experiment.ml_server.Null>}
 */
const methodDescriptor_ServerCallBacksHandler_DataCollectorIterationStatusCallback = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ServerCallBacksHandler/DataCollectorIterationStatusCallback',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.IterationsDetails,
  proto.experiment.ml_server.Null,
  /**
   * @param {!proto.experiment.ml_server.IterationsDetails} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.Null.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.IterationsDetails} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.Null)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.Null>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ServerCallBacksHandlerClient.prototype.dataCollectorIterationStatusCallback =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ServerCallBacksHandler/DataCollectorIterationStatusCallback',
      request,
      metadata || {},
      methodDescriptor_ServerCallBacksHandler_DataCollectorIterationStatusCallback,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.IterationsDetails} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.Null>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ServerCallBacksHandlerPromiseClient.prototype.dataCollectorIterationStatusCallback =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ServerCallBacksHandler/DataCollectorIterationStatusCallback',
      request,
      metadata || {},
      methodDescriptor_ServerCallBacksHandler_DataCollectorIterationStatusCallback);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.experiment.ml_server.DataCollectorNotification,
 *   !proto.experiment.ml_server.Null>}
 */
const methodDescriptor_ServerCallBacksHandler_DataCollectorExperimentStatusCallback = new grpc.web.MethodDescriptor(
  '/experiment.ml_server.ServerCallBacksHandler/DataCollectorExperimentStatusCallback',
  grpc.web.MethodType.UNARY,
  proto.experiment.ml_server.DataCollectorNotification,
  proto.experiment.ml_server.Null,
  /**
   * @param {!proto.experiment.ml_server.DataCollectorNotification} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.experiment.ml_server.Null.deserializeBinary
);


/**
 * @param {!proto.experiment.ml_server.DataCollectorNotification} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.experiment.ml_server.Null)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.experiment.ml_server.Null>|undefined}
 *     The XHR Node Readable Stream
 */
proto.experiment.ml_server.ServerCallBacksHandlerClient.prototype.dataCollectorExperimentStatusCallback =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/experiment.ml_server.ServerCallBacksHandler/DataCollectorExperimentStatusCallback',
      request,
      metadata || {},
      methodDescriptor_ServerCallBacksHandler_DataCollectorExperimentStatusCallback,
      callback);
};


/**
 * @param {!proto.experiment.ml_server.DataCollectorNotification} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.experiment.ml_server.Null>}
 *     Promise that resolves to the response
 */
proto.experiment.ml_server.ServerCallBacksHandlerPromiseClient.prototype.dataCollectorExperimentStatusCallback =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/experiment.ml_server.ServerCallBacksHandler/DataCollectorExperimentStatusCallback',
      request,
      metadata || {},
      methodDescriptor_ServerCallBacksHandler_DataCollectorExperimentStatusCallback);
};


module.exports = proto.experiment.ml_server;

