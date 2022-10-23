import React, {useState} from 'react';
import './quizform.css'
import {Button, TextField} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import {useFormik} from "formik";
import InputUnstyled from '@mui/base/InputUnstyled';
import {createQuestion} from "../../../app/app-reducers/quizSlice";
import {useAppDispatch} from "../../../app/hooks";

const QuizForm = () => {
    const [countOfAnswers, setCountOfAnswers] = useState<number>(2)
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
        onSubmit: values => {
            dispatch(createQuestion(values))
        }
    })


    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Add New Question</h2>
            <div>
                <div className="form-box">
                    <label>Enter name of question:</label>
                    <TextField
                                value={formik.values.title}
                                onChange={formik.handleChange}
                               placeholder="Enter question"
                                name="title"
                               size="small"
                               label="Question"
                               variant="filled"
                               type="text"/>
                </div>

                <div className="form-box box-mirror">
                    <label>Enter code of question:</label>
                    <textarea value={formik.values.task}
                              onChange={formik.handleChange} name="task">
                    </textarea>
                </div>
                <div className="form-box">
                    <label>Enter count of answers:</label>
                    <TextField variant="filled" value={countOfAnswers}
                               onChange={(e) => setCountOfAnswers(+e.target.value)}
                               type="number"/>
                </div>
                <div>
                    {answersCount.map((a:any) => (
                        <div className="form-box">
                            <label>Answer {a + 1}: </label>
                            <TextField
                                name={"answers[" + a + "]"}
                                value={formik.values?.answers[a]}
                                onChange={formik.handleChange}
                                label={"Answer " +  (a + 1)}
                                type="text"
                                variant="filled"/>
                        </div>
                    ))}
                </div>
                <div className="form-box">
                    <label>Enter correct answer:</label>
                    <TextField
                        name="correctAnswer"
                        value={formik.values.correctAnswer}
                        onChange={formik.handleChange}
                        variant="filled" type="text" label="correctAnswer"/>
                </div>
                <Button style={{width: '100%', marginTop:"30px" }} className="submitBtn" variant="contained" type="submit">New Question</Button>
            </div>
        </form>
    );
};

export default QuizForm;