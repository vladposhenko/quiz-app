import React, {useEffect} from 'react';
import QuizInfo from "../../components/QuizInfo/QuizInfo";
import './admin.css'
import {Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getQuestions} from "../../../app/app-reducers/quizSlice";
import Loader from "../../components/Loader/Loader";
import {useNavigate} from "react-router-dom";
import AdminPanel from "../../components/AdminPanel/AdminPanel";
import AlertInfo from "../../components/AlertInfo/AlertInfo";
const AdminPage = () => {
    const dispatch = useAppDispatch()
    const questions = useAppSelector(state => state.quiz.questions)
    const isLoading = useAppSelector(state => state.quiz.isLoading)
    const token = useAppSelector(state => state.login.token)
    const isAlertVisible = useAppSelector(state => state.quiz.isAlertVisible)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getQuestions())
    },[])

    if(!localStorage.getItem('token')) {
        navigate('../login')
    }

    return (
        <div className="admin-page" >
            <AdminPanel/>
            <Container  className="admin-page__container">
                {isLoading
                ? <Loader/>
                : (<>
                            <QuizInfo questions={questions}/>
                    </>
                    )}
            </Container>
        </div>
    );
};

export default AdminPage;