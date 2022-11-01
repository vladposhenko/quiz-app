import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import './quizform.css'
import {Box, Button} from "@mui/material";
import {useFormik} from "formik";
import {createQuestion, editQuestion} from "../../../app/app-reducers/quizSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {createPortal} from "react-dom";
import {IQuestion} from "../../../models/questions";
import QuizBox from "./QuizBox/QuizBox";

interface QuizFormProps {
    active:boolean,
    setActive: Dispatch<SetStateAction<boolean>>,
    question?: IQuestion
}

const QuizForm:FC<QuizFormProps> = ({active, setActive, question}) => {
    const [countOfAnswers, setCountOfAnswers] = useState<number>(question?.answers.length! || 2 )
    const [countOfCorrectAnswers, setCountOfCorrectAnswers] = useState(question?.correctAnswers.length! || 1)
    const dispatch = useAppDispatch()
    let answersCount: Array<number> = [];
    let correctAnswers: Array<number> = [];
    const getAnswersArray = (count:number, array: number[]) => {
        for (let i = 0; i < count; i++) {
            array.push(i)
        }
    }
    getAnswersArray(countOfAnswers,answersCount )
    getAnswersArray(countOfCorrectAnswers,correctAnswers )
    const formik = useFormik({
        initialValues: {
            id: question?.id || Math.floor(Math.random() * 100),
            title: question?.title || '',
            task: question?.task || '',
            correctAnswers:question?.correctAnswers || [],
            answers:question?.answers || []
        },
        onSubmit: values => {
            question ? dispatch(editQuestion(values)) : dispatch(createQuestion(values))
        }
    })

    const modal = (
        <>
            <div onClick={() => setActive(false)} className="backdrop"></div>
            <Box sx={{ bgcolor:'primary.dark', position:'absolute', top:'0', width:'60%', left:'18%' }}>
                <form className={active ? 'form active' : 'form'} onSubmit={formik.handleSubmit}>
                    <Typography variant="h4" sx={{color:'text.primary', textAlign:'center', marginBottom: '3rem'
                    }}>{question ? "Edit" : "Add New"}  Question</Typography>
                    <div>
                        <QuizBox value={formik.values.title}
                                 title='Enter name of question'
                                 label='Question'
                                 name='title'
                                 handleChange={formik.handleChange}
                                 errors={formik.errors.title}
                        />
                        <Divider/>
                        <QuizBox value={formik.values.task}
                                 title='Enter name of task'
                                 label='task'
                                 name='task'
                                 handleChange={formik.handleChange}
                                 errors={formik.errors.task}
                                 component="textarea"
                        />
                        <Divider/>
                        <QuizBox value={countOfAnswers}
                                 title='Enter count of answers:'
                                 label='Count of Answers'
                                 name='answers'
                                 handleChange={(e:any) => setCountOfAnswers(+e.target.value)}
                                 errors={false}
                                 type="number"
                        />
                        <div>
                            {answersCount.map((a:any) => (
                                <React.Fragment key={a}>
                                    <QuizBox
                                             value={formik.values?.answers[a]}
                                             title={`Answer ${a + 1}:`}
                                             label={"Answer " +  (a + 1)}
                                             name={"answers[" + a + "]"}
                                             handleChange={formik.handleChange}
                                             errors={false}
                                    />
                                    <Divider/>
                                </React.Fragment>
                            ))}
                        </div>
                        <QuizBox value={countOfCorrectAnswers}
                                 title='Enter count of correct answers:'
                                 label='Count of correct answers'
                                 name='correctAnswer'
                                 handleChange={(e:any) => setCountOfCorrectAnswers(+e.target.value)}
                                 errors={false}
                                 type="number"
                        />
                        <Divider/>
                        {correctAnswers.map((a:any) => (
                            <React.Fragment key={a}>
                                <QuizBox
                                         value={formik.values?.correctAnswers[a]}
                                         title={`Correct Answer ${a + 1}:`}
                                         label={"CorrectAnswer " +  (a + 1)}
                                         name={"correctAnswers[" + a + "]"}
                                         handleChange={formik.handleChange}
                                         errors={false}
                                />
                                <Divider/>
                            </React.Fragment>
                        ))}
                        <Button style={{width: '100%', marginTop:"30px" }}
                                className="submitBtn"
                                variant="contained"
                                type="submit"> {question ? "Edit" : "New"} Question</Button>
                    </div>
                </form>
            </Box>
        </>
    )
    return active ? createPortal(modal,document.getElementById('modal')!) : null
};

export default QuizForm;