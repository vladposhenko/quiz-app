import React, {Dispatch, FC, SetStateAction, useContext} from 'react';
import {Box, IconButton, Theme, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import './header.css'
import Typography from '@mui/material/Typography';
interface HeaderProps {

}


const Header:FC<HeaderProps> = () => {
    const { palette } = useTheme()
    return (
        <>
            <Box className="header"  sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                justifyContent:'center',
                borderBottom: palette.mode === 'light' ? '1px solid #000' : null
            }}>
                <div className="header__links">
                    <Link to="admin" ><Typography variant='overline' sx={{color:'text.primary'}}>Admin Page</Typography></Link>
                    <Link to="" ><Typography variant='overline' sx={{color:'text.primary'}}>Home</Typography></Link>
                </div>
            </Box>
        </>
    );
};

export default Header;