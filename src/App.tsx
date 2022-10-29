import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./features/pages/HomePage/HomePage";
import AdminPage from "./features/pages/AdminPage/AdminPage";
import NotFoundPage from "./features/pages/NotFoundPage";
import Header from "./features/components/Header/Header";
import {createTheme, IconButton, ThemeProvider, useTheme} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {amber, purple} from "@mui/material/colors";
import LoginPage from "./features/pages/LoginPage/LoginPage";




const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


function App() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    if(mode === 'dark') {
        document.body.className = 'dark-theme'
    } else {
        document.body.className = 'light-theme'
    }
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'dark')
                    ? {
                        primary: purple
                    }
                    : {

                    }
                },
            }),
        [mode],
    );


  return (
    <div className="App">
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <IconButton className="icon-btn" sx={{ ml: 1, bgcolor: 'background.default', marginTop:'20px' }} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon  /> : <Brightness4Icon  />}
                </IconButton>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="" element={<HomePage/>}/>
                        <Route path="admin" element={<AdminPage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    </div>
  );
}

export default App;
