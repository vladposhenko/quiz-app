import React, {useState} from 'react';
import {Box, Button} from "@mui/material";
import QuizForm from "../QuizForm/QuizForm";
import Loader from "../Loader/Loader";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {logOutFromAdmin} from "../../../app/app-reducers/loginSlice";
import {useNavigate} from "react-router-dom";



const AdminPanel = () => {
    const status = useAppSelector(state => state.quiz.createStatus)
    const notifyInfo = useAppSelector(state => state.quiz.notifyInfo)
    const [isFormOpened, setFormOpened] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Box sx={{ bgcolor:'primary.dark', marginTop:'-50px', marginBottom:'50px', p:1}}>
            <Button
                    onClick={() => setFormOpened(!isFormOpened) }
                    size="small"
                    color="secondary"
                    variant="contained">Create New Question
            </Button>
            <Button style={{marginLeft: '30px'}} size="small" color="secondary" variant="contained"
                    onClick={() => {
                        dispatch(logOutFromAdmin())
                        navigate('../login')
                    }}
            >Logout</Button>
            {status === 'creating'
                ? <Loader toDarkBg={'creating'}/>
                : <QuizForm active={isFormOpened} setActive={setFormOpened}/>
            }
        </Box>
    );
};

export default AdminPanel;