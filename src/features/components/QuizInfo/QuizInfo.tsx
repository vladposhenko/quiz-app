import React, {FC} from 'react';
import {useAppSelector} from "../../../app/hooks";
import {Button, List, ListItem, ListItemText} from "@mui/material";
import {IQuestion} from "../../../models/questions";
import Divider from '@mui/material/Divider';
import CodeMirror from "@uiw/react-codemirror";
interface quizInfoProps {
    questions: IQuestion[]
}

const QuizInfo: FC<quizInfoProps> = ({questions}) => {
    return (
        <div className="quiz__info">
            <h2>Questions</h2>
            <List sx={{ height: "700px", overflowY:'auto' }}>
                {questions?.map((q, i) => (
                        <ListItem sx={{width: '100%', borderBottom: '1px solid #000', display:'flex', flexDirection: 'column'}}>
                            <ListItemText sx={{borderBottom: '1px solid #000', width: '100%'}}>{i+1}. {q.title}
                                <Button>DELETE</Button>
                            </ListItemText>
                            <CodeMirror
                                value={q.task}
                                width="550px"
                            />
                            { q.answers.map(a =>
                                <Button sx={{width: '100%'}} color={a === q.correctAnswer ? 'success' : 'primary'}
                                        variant='contained'>{a}</Button>
                            ) }
                        </ListItem>
                ))}
            </List>
        </div>
    );
};

export default QuizInfo;