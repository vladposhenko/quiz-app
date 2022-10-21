import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./features/pages/HomePage/HomePage";
import AdminPage from "./features/pages/AdminPage/AdminPage";
import NotFoundPage from "./features/pages/NotFoundPage";
import Header from "./features/components/Header/Header";
import {createTheme, ThemeProvider} from "@mui/material";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="" element={<HomePage/>}/>
                    <Route path="admin" element={<AdminPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </div>
  );
}

export default App;
