import React, {FC, useState} from 'react';
import {Button, useTheme} from "@mui/material";
import {checkAnswer, nextQuestion, previousQuestion} from "../../../app/app-reducers/quizSlice";
import {IQuestion} from "../../../models/questions";
import CodeMirror from '@uiw/react-codemirror'
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface QuizItemProps {
    currentQuestion: IQuestion | null,
    currentQuestionCounter: number,
    dispatch: any,
    questions: IQuestion[],
    hasAnswer:boolean
}


const QuizItem: FC<QuizItemProps> = ({   dispatch,
                                         currentQuestion,
                                         currentQuestionCounter,
                                         questions,
                                         hasAnswer
}) => {
    const [isUserAnswered, setIsUserAnswered] = useState(false)
    const [userAnswers, setUserAnswers] = useState<Array<string>>([])
    const {palette} = useTheme()
    return (
        <div className="quiz">
            <div className="quiz__length">
                <Button style={{ marginRight:'20px' }}
                        disabled={currentQuestionCounter < 1}
                        size="small"
                        onClick={() => dispatch(previousQuestion())}>
                    <ArrowBackIosIcon sx={{ color:'text.primary' }}/>
                </Button>
                <Typography sx={{ color:'text.primary' }} variant="overline">{ currentQuestionCounter + 1 } / {questions.length}</Typography>
                <Button style={{ marginLeft:'20px' }}
                        size="small"
                        disabled={currentQuestionCounter >= questions.length - 1 || !hasAnswer}
                        onClick={() => dispatch(nextQuestion())}>
                    <ArrowForwardIosIcon sx={{ color:'text.primary' }}/>
                </Button>
            </div>
            <Typography sx={{ color:'text.primary' }} variant="overline" className="quiz__question">{currentQuestion?.title}</Typography>
            <div className="quiz__image">
                <CodeMirror
                    theme={palette.mode}
                    value={currentQuestion?.task}
                    height="200px"
                />
            </div>
            <div className="quiz__buttons">
                { currentQuestion?.answers.map((a, i) => <Button
                    key={a}
                    onClick={() => {
                        setUserAnswers([...userAnswers, a])
                        setIsUserAnswered(true)
                    }}
                    disabled={a === userAnswers.find(el => el === a)}
                    className="quiz__btn"
                    variant="contained">{a}</Button>) }
            </div>
            {isUserAnswered &&
                <div className="quiz__next">
                    <Button
                            variant="contained"
                            onClick={() => {
                        dispatch(checkAnswer(userAnswers))
                        setUserAnswers([])
                        dispatch(nextQuestion())
                        setIsUserAnswered(false)
                    }}>Next</Button>
                </div>
            }
        </div>
    );
};

export default QuizItem;