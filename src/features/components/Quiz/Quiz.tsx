import React, {FC} from 'react';
import {IQuestion} from "../../../models/questions";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Box, Button} from "@mui/material";
import "./quiz.css"
import {checkAnswer, nextQuestion, previousQuestion} from "../../../app/app-reducers/quizSlice";
import QuizItem from "../QuizItem/QuizItem";
import Score from "../Score/Score";


interface QuizProps {
    questions: IQuestion[]
}

const Quiz: FC<QuizProps> = ({ questions }) => {
    const currentQuestion = useAppSelector(state => state.quiz.currentQuestion);
    const currentQuestionCounter = useAppSelector(state => state.quiz.currentQuestionCounter);
    const score = useAppSelector(state => state.quiz.score)
    const hasAnswer = useAppSelector(state => state.quiz.hasAnswer)
    const dispatch = useAppDispatch()

    return (
        <div>
            {currentQuestionCounter === questions?.length
               ? <Score questionsLength={questions.length} score={score}/>
                :<QuizItem currentQuestion={currentQuestion}
                           currentQuestionCounter={currentQuestionCounter}
                           dispatch={dispatch}
                           questions={questions}
                           hasAnswer={hasAnswer}
                />
            }
        </div>
    );
};

export default Quiz;