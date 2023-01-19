import React from "react";
const CreateAgentForm = ({ title, content, id }) => (
    <div className="row">
        <div className="col-md-4">
            <div className="modal fade show" id={id} tabIndex="-1" role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">{title}</h6>
                            <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                           {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
export default CreateAgentForm;