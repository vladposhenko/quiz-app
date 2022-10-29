import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import './quizform.css'
import {Box, Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {createQuestion} from "../../../app/app-reducers/quizSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Loader from "../Loader/Loader";
import Divider from "@mui/material/Divider";
import {validate} from "../../utils";
import Typography from "@mui/material/Typography";
import {createPortal} from "react-dom";

interface QuizFormProps {
    active:boolean,
    setActive: Dispatch<SetStateAction<boolean>>
}

const QuizForm:FC<QuizFormProps> = ({active, setActive}) => {
    const [countOfAnswers, setCountOfAnswers] = useState<number>(2)
    const [countOfCorrectAnswers, setCountOfCorrectAnswers] = useState(1)
    const questions = useAppSelector(state => state.quiz.questions)
    const dispatch = useAppDispatch()
    let answersCount: any = [];
    let correctAnswers: any = [];
    for (let i = 0; i < countOfAnswers; i++) {
        answersCount.push(i)
    }
    for (let i = 0; i < countOfCorrectAnswers; i++) {
        correctAnswers.push(i)
    }

    const formik = useFormik({
        initialValues: {
            id:questions.length + 1,
            title: '',
            task:'',
            correctAnswers:[],
            answers:[]
        },
        onSubmit: values => {
            dispatch(createQuestion(values))
        }
    })

    const modal = (
        <>
            <div onClick={() => setActive(false)} className="backdrop"></div>
            <Box sx={{ bgcolor:'primary.dark', position:'absolute', top:'0', width:'60%', left:'18%' }}>
                <form className={active ? 'form active' : 'form'} onSubmit={formik.handleSubmit}>
                    <Typography variant="h4" sx={{color:'text.primary', textAlign:'center', marginBottom: '3rem'
                    }}>Add New Question</Typography>
                    <div>
                        <div className="form-box">
                            <Typography sx={{color:'text.primary'}} variant='overline'>Enter name of question:</Typography>
                            <TextField
                                fullWidth
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                placeholder="Enter question"
                                name="title"
                                size="small"
                                label="Question"
                                variant="filled"
                                type="text"/>
                            {formik.errors.title && <div className="form-error">{formik.errors.title}</div>}
                        </div>
                        <Divider/>
                        <div className="form-box box-mirror">
                            <Typography sx={{color:'text.primary'}} variant='overline'>Enter code of question:</Typography>
                            <textarea
                                className="form-task"
                                value={formik.values.task}
                                onChange={formik.handleChange} name="task">
                    </textarea>
                            {formik.errors.task && <div className="form-error">{formik.errors.task}</div>}
                        </div>
                        <Divider/>
                        <div className="form-box">
                            <Typography sx={{color:'text.primary'}} variant='overline'>Enter count of answers:</Typography>
                            <TextField variant="filled" value={countOfAnswers}
                                       onChange={(e) => setCountOfAnswers(+e.target.value)}
                                       type="number"
                                       fullWidth
                            />
                        </div>
                        <div>
                            {answersCount.map((a:any) => (
                                <>
                                    <div className="form-box">
                                        <Typography sx={{color:'text.primary'}} variant='overline'>Answer {a + 1}: </Typography>
                                        <TextField
                                            fullWidth
                                            name={"answers[" + a + "]"}
                                            value={formik.values?.answers[a]}
                                            onChange={formik.handleChange}
                                            label={"Answer " +  (a + 1)}
                                            type="text"
                                            variant="filled"/>

                                    </div>
                                    <Divider/>
                                </>
                            ))}
                        </div>
                        <div className="form-box">
                            <Typography sx={{color:'text.primary'}} variant='overline'>Enter count of correct answers:</Typography>
                            <TextField variant="filled" value={countOfCorrectAnswers}
                                       onChange={(e) => setCountOfCorrectAnswers(+e.target.value)}
                                       type="number"
                                       fullWidth
                            />
                        </div>
                        <Divider/>
                        {correctAnswers.map((a:any) => (
                            <>
                                <div className="form-box">
                                    <Typography sx={{color:'text.primary'}} variant='overline'>Correct Answer {a + 1}: </Typography>
                                    <TextField
                                        fullWidth
                                        name={"correctAnswers[" + a + "]"}
                                        value={formik.values?.correctAnswers[a]}
                                        onChange={formik.handleChange}
                                        label={"correctAnswer " +  (a + 1)}
                                        type="text"
                                        variant="filled"/>

                                </div>
                                <Divider/>
                            </>
                        ))}
                        <Button style={{width: '100%', marginTop:"30px" }}
                                className="submitBtn"
                                variant="contained"
                                type="submit">New Question</Button>
                    </div>
                </form>
            </Box>

        </>
    )
    return active ? createPortal(modal,document.getElementById('modal')!) : null
};

export default QuizForm;