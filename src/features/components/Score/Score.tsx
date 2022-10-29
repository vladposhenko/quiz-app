import React, {FC} from 'react';
import "./score.css"
import {Box, Button} from "@mui/material";
interface ScoreProps  {
    score: number,
    questionsLength:number,
}

const Score: FC<ScoreProps> = ({score,questionsLength }) => {
    return (
        <Box sx={{ bgcolor:'primary.dark' }} className="score-modal">
            <p>Your Score : {score } / {questionsLength}</p>
            <Button variant="contained" color="success"  onClick={() => window.location.reload()}>Start Again</Button>
        </Box>
    );
};

export default Score;