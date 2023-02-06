import React from "react";
import {experimentValidation} from '../../constants/globalConstants';

const ExpError = ({name, valid, touched}) => {
    if(touched && !valid){
        return (
            <span className="errorText mb-2 mt-2 ml-1 text-xs text-slate-200 dark:text-white/80">
                {experimentValidation[name].errorMsg}
            </span>
        )
    } else {
        return <></>
    }
} 

export default ExpError