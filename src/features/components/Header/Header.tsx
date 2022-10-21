import React from 'react';
import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import './header.css'
const Header = () => {
    return (
        <>
            <Box className="header"  sx={{
                backgroundColor: 'primary.dark',
            }}>
                <div className="header__links">
                    <Link to="admin" >Admin Page</Link>
                    <Link to="" >Home</Link>
                </div>
            </Box>
        </>
    );
};

export default Header;