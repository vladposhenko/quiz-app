import React, {FC} from 'react';
import "./score.css"
import {Box, Button} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks";
import {restartQuiz} from "../../../app/app-reducers/quizSlice";
interface ScoreProps  {
    score: number,
    questionsLength:number,
}

const Score: FC<ScoreProps> = ({score,questionsLength }) => {
    const dispatch = useAppDispatch()
    return (
        <Box sx={{ bgcolor:'primary.dark' }} className="score-modal">
            <p>Your Score : {score } / {questionsLength}</p>
            <Button variant="contained" color="success"  onClick={() => dispatch(restartQuiz())}>Start Again</Button>
        </Box>
    );
};

export default Score;