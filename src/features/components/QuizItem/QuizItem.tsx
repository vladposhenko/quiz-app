import React, {FC} from 'react';
import {Button} from "@mui/material";
import {checkAnswer, nextQuestion, previousQuestion} from "../../../app/app-reducers/quizSlice";
import {IQuestion} from "../../../models/questions";
import CodeMirror from '@uiw/react-codemirror'



interface QuizItemProps {
    currentQuestion: IQuestion | null,
    currentQuestionCounter: number,
    dispatch: any,
    questions: IQuestion[],
    hasAnswer:boolean
}


const QuizItem: FC<QuizItemProps> = ({ dispatch,
                                         currentQuestion,
                                         currentQuestionCounter,
                                         questions,
                                         hasAnswer}) => {


    return (
        <div className="quiz">
            <div className="quiz__length">
                <Button disabled={currentQuestionCounter < 1} onClick={() => dispatch(previousQuestion())}>Prev</Button>
                { currentQuestionCounter + 1 } / {questions.length}
                <Button disabled={currentQuestionCounter >= questions.length - 1 || !hasAnswer}
                        onClick={() => dispatch(nextQuestion())}>Next</Button>
            </div>
            <div className="quiz__question">{currentQuestion?.title}</div>
            <div className="quiz__image">
                <CodeMirror
                    value={currentQuestion?.task}
                    height="200px"
                />
            </div>
            <div className="quiz__buttons">
                { currentQuestion?.answers.map((a) => <Button
                    onClick={() => dispatch(checkAnswer(a))}
                    className="quiz__btn" variant="contained">{a}</Button>) }
            </div>

        </div>
    );
};

export default QuizItem;