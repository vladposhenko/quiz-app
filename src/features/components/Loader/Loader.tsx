import React, {FC, useEffect} from 'react';
import loader from '../../../images/loader.gif'
import loaderDark from '../../../images/loader-dark.gif'
import './loader.css'
import {useTheme} from "@mui/material";
interface LoaderProps {
    toDarkBg?: string
}

const Loader: FC<LoaderProps> = ({ toDarkBg }) => {
    const {palette } = useTheme()

    return (
        <div className={toDarkBg ? 'loader-all__page' : 'loader'}>
            <img src={palette.mode === 'light' ? loader : loaderDark}/>
            {toDarkBg &&
                <p>{toDarkBg}...</p>
            }
        </div>
    );
};

export default Loader;