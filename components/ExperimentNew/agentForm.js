import React from "react";
const CreateAgentForm = ({ title, content, id, handleSubmitAgent }) => (
    <div class="fixed top-0 left-0 hidden w-full h-full overflow-x-hidden overflow-y-auto transition-opacity ease-linear opacity-0 z-sticky outline-0" id="createAgent" aria-hidden="true">
    <div class="relative w-5/12 m-2 transition-transform duration-300 pointer-events-none sm:m-7 sm:max-w-125 sm:mx-auto lg:mt-48 ease-soft-out -translate-y-13">
      <div class="relative flex flex-col w-full bg-white border border-solid pointer-events-auto dark:bg-gray-950 bg-clip-padding border-black/20 rounded-xl outline-0">
        <div class="flex items-center justify-between p-4 border-b border-solid shrink-0 border-slate-100 rounded-t-xl">
          <h5 class="mb-0 leading-normal dark:text-white" id="ModalLabel">{title}</h5>
          <button type="button" data-toggle="modal" data-target="#createAgent" class="fa fa-close w-4 h-4 ml-auto box-content p-2 text-black dark:text-white border-0 rounded-1.5 opacity-50 cursor-pointer -m-2 " data-dismiss="modal"></button>
        </div>
        <div class="relative flex-auto p-4">
          <div class="min-h-6 pl-7 mb-0.5 block">
             {content}
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-end p-3 border-t border-solid shrink-0 border-slate-100 rounded-b-xl">
          <button type="button" data-toggle="modal" data-target="#createAgent" class="inline-block px-8 py-2 m-1 mb-4 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-to-tl from-slate-600 to-slate-300 shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">Close</button>
          <button type="button" data-toggle="modal" data-target="#createAgent" class="inline-block px-8 py-2 m-1 mb-4 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85" onClick={()=>handleSubmitAgent()}>Create Agent</button>
        </div>
      </div>
    </div>
  </div>
)
export default CreateAgentForm;