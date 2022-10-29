import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Button, List, ListItem, ListItemText, useTheme} from "@mui/material";
import {IQuestion} from "../../../models/questions";
import CodeMirror from "@uiw/react-codemirror";
import {deleteQuestion} from "../../../app/app-reducers/quizSlice";
import Loader from "../Loader/Loader";
import Typography from "@mui/material/Typography";
import './quizinfo.css'
interface quizInfoProps {
    questions: IQuestion[]
}

const QuizInfo: FC<quizInfoProps> = ({questions}) => {
    const dispatch = useAppDispatch()
    const { palette } = useTheme()
    const status = useAppSelector(state => state.quiz.createStatus)
    return (
        <div className="quiz__info">
            <Typography sx={{color:'text.primary', marginBottom: '2rem'}} variant="h4">Questions</Typography>
            <List sx={{ height: "700px", overflowY:'auto', gap:'50px', display:'flex',flexDirection:'column' }}>
                {questions?.map((q, i) => (
                        <ListItem sx={{width: '100%',
                            borderBottom: '1px solid #000',
                            display:'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{borderBottom: '1px solid #000', width: '100%', display:'flex',
                                justifyContent:'space-between', alignItems:'center'}}>
                                <Typography sx={{color: 'text.primary', marginBottom:'20px', textAlign:'center'}}
                                            variant="overline">{i+1}. {q.title}</Typography>
                                <Button
                                        sx={{height: '30px'}}
                                        variant="contained" size="small"
                                        onClick={() => {
                                            window.scrollBy(0,0)
                                            dispatch(deleteQuestion(q.id))
                                        }}>DELETE</Button>
                            </div>
                            <CodeMirror
                                style={{width: '100%', textAlign:'center'}}
                                theme={palette.mode}
                                value={q.task}
                                width="100%"
                            />
                            { q.answers.map((a, i) =>
                                <Button sx={{width: '100%'}}
                                        color={a === q.correctAnswers.find((el) => el === a) ? 'success' : 'primary'}
                                        variant='contained'>{a}</Button>
                            ) }
                        </ListItem>
                ))}
            </List>
            {status === 'removing' &&
                <Loader toDarkBg={status}/>
            }
        </div>
    );
};

export default QuizInfo;