import React, {FC} from 'react';
import {Alert} from "@mui/material";

interface AlertInfoProps {

}

const AlertInfo:FC<AlertInfoProps> = () => {
    return (
        <div>
            <Alert></Alert>
        </div>
    );
};

export default AlertInfo;