import React, {useState} from 'react';
import './quizform.css'
import {Button, TextField} from "@mui/material";
import {useFormik} from "formik";
import {createQuestion} from "../../../app/app-reducers/quizSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Loader from "../Loader/Loader";
import Divider from "@mui/material/Divider";
import {validate} from "../../utils";
import Typography from "@mui/material/Typography";

const QuizForm = () => {
    const [countOfAnswers, setCountOfAnswers] = useState<number>(2)
    const status = useAppSelector(state => state.quiz.createStatus)
    const dispatch = useAppDispatch()
    let answersCount: any = [];
    for (let i = 0; i < countOfAnswers; i++) {
        answersCount.push(i)
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            task:'',
            correctAnswer:'',
            answers:[]
        },
        validate,
        onSubmit: values => {
            dispatch(createQuestion(values))
        }
    })


    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <Typography variant="h4" sx={{color:'text.primary', marginBottom: '3rem'}}>Add New Question</Typography>
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
                <Divider/>
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
                    <Typography sx={{color:'text.primary'}} variant="overline">Enter correct answer:</Typography>
                    <TextField
                        fullWidth
                        name="correctAnswer"
                        value={formik.values.correctAnswer}
                        onChange={formik.handleChange}
                        variant="filled" type="text" label="correctAnswer"/>
                    {formik.errors.correctAnswer && <div className="form-error"
                                                            onChange={formik.handleChange}
                    >{formik.errors.correctAnswer}</div>}
                </div>
                <Button style={{width: '100%', marginTop:"30px" }} className="submitBtn" variant="contained" type="submit">New Question</Button>
            </div>

            {status === 'creating' &&
                <Loader toDarkBg={'creating'}/>
            }
        </form>
    );
};

export default QuizForm;