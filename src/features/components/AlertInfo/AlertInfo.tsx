import React, {FC} from 'react';
import {Alert} from "@mui/material";
import {useAppSelector} from "../../../app/hooks";

interface AlertInfoProps {
    alertInfo:string
}

const AlertInfo:FC<AlertInfoProps> = ({alertInfo}) => {

    return (
        <div>
            <Alert>{alertInfo}</Alert>
        </div>
    );
};

export default AlertInfo;