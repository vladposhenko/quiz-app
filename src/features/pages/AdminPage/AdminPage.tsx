import React, {useEffect} from 'react';
import QuizForm from "../../components/QuizForm/QuizForm";
import QuizInfo from "../../components/QuizInfo/QuizInfo";
import './admin.css'
import {Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getQuestions} from "../../../app/app-reducers/quizSlice";
import Loader from "../../components/Loader/Loader";
const AdminPage = () => {
    const dispatch = useAppDispatch()
    const questions = useAppSelector(state => state.quiz.questions)
    const isLoading = useAppSelector(state => state.quiz.isLoading)
    useEffect(() => {
        dispatch(getQuestions())
    },[])
    return (
        <div className="admin-page" >
            <Container  className="admin-page__container">
                {isLoading
                ? <Loader/>
                : (<>
                            <QuizForm/>
                            <QuizInfo questions={questions}/>
                    </>
                    )}
            </Container>
        </div>
    );
};

export default AdminPage;