import React, {FC} from 'react';
import {Alert} from "@mui/material";
import './alertinfo.css'

interface AlertInfoProps {
    alertInfo:string
}

const AlertInfo:FC<AlertInfoProps> = ({alertInfo}) => {
    return (
        <div className="alert">
            <Alert>{alertInfo}</Alert>
        </div>
    );
};

export default AlertInfo;