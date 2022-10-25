import React, {FC} from 'react';
import loader from '../../../images/loader.gif'
import './loader.css'

interface LoaderProps {
    toDarkBg?: string
}

const Loader: FC<LoaderProps> = ({ toDarkBg }) => {
    return (
        <div className={toDarkBg ? 'loader-all__page' : 'loader'}>
            <img src={loader}/>
            {toDarkBg &&
                <p>{toDarkBg}...</p>
            }
        </div>
    );
};

export default Loader;