import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getQuestions} from "../../../app/app-reducers/quizSlice";
import Quiz from "../../components/Quiz/Quiz";


const HomePage = () => {
    const dispatch = useAppDispatch()
    const questions = useAppSelector(state => state.quiz.questions)
    useEffect(() => {
        dispatch(getQuestions())
    },[])
    console.log(questions)
    return (
        <div>
            <p>Home</p>
            <Quiz questions={questions}/>
        </div>
    );
};

export default HomePage;