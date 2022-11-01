import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createNewQuestion, deleteListQuestion, editListQuestion, fetchQuestions} from "../../api/api";
import {IQuestion} from "../../models/questions";
import { toast } from 'react-toastify';

export interface quizState {
    isLoading: boolean
    questions: IQuestion[]
    currentQuestion: IQuestion | null
    currentQuestionCounter: number
    score:number,
    hasAnswer:boolean,
    createStatus:string,
    isAlertVisible:boolean,
    notifyInfo:string
}


const initialState: quizState = {
    questions: [],
    currentQuestion: null,
    currentQuestionCounter: 0,
    score: 0,
    hasAnswer:false,
    isLoading:false,
    createStatus:'',
    isAlertVisible:false,
    notifyInfo:'',
};

export const getQuestions = createAsyncThunk(
    'quiz/fetchQuestions',
    async () => {
        const response = await fetchQuestions();
        return response.data;
    }
);

export const createQuestion = createAsyncThunk(
    'quiz/createQuestion',
    async (values: IQuestion) => {
        const response = await createNewQuestion(values)
        return values
    }
)

export const deleteQuestion = createAsyncThunk(
    'quiz/deleteQuestion',
    async (id: number, {dispatch}) => {
        await deleteListQuestion(id)
        return id
    }
)

export const editQuestion = createAsyncThunk(
    'quiz/editQuestion',
    async(values: IQuestion) => {
        const response = await editListQuestion(values.id, values)
        return values
    }
)

// @ts-ignore

export const quizSlice = createSlice({
    name:'quiz',
    initialState,
    reducers: {
        nextQuestion: (state) => {
            state.currentQuestionCounter += 1
            state.currentQuestion = state.questions[state.currentQuestionCounter]
        },
        previousQuestion: (state) => {
            state.currentQuestionCounter -= 1
            state.currentQuestion = state.questions[state.currentQuestionCounter]
            state.hasAnswer = true
        },
        restartQuiz: (state) => {
            state.currentQuestionCounter = 0;
            state.currentQuestion = state.questions[state.currentQuestionCounter]
            state.score = 0
        },
        checkAnswer: (state,action) => {
            let userTrueAnswers = 0;
            let userWrongAnswer = 0;
            for(let i = 0; i < state.currentQuestion?.correctAnswers.length!; i++) {
                for(let j = 0; j < action.payload.length; j++) {
                    if(state.currentQuestion?.correctAnswers[i] === action.payload[j]) {
                        userTrueAnswers++
                    } else {
                        userWrongAnswer++
                    }
                }
            }
            if(userTrueAnswers === state.currentQuestion?.correctAnswers.length!) {
                state.score++
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getQuestions.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getQuestions.fulfilled, (state, {payload}) => {
            // @ts-ignore
            state.questions = payload
            state.isLoading = false
            state.currentQuestion = state.questions[state.currentQuestionCounter]
        })
        builder.addCase(createQuestion.pending, (state) => {
            state.createStatus = 'creating'
        })
        builder.addCase(createQuestion.fulfilled, (state, {payload}) => {
            state.questions.push(payload)
            state.createStatus = 'created'
            state.notifyInfo = 'created successfully'
            toast.success(state.notifyInfo)
        })
        builder.addCase(deleteQuestion.pending, (state, action) => {
            state.createStatus = 'removing'
        })
        builder.addCase(deleteQuestion.fulfilled, (state, action) => {
            state.questions = state.questions.filter(question => question.id !== action.payload)
            state.createStatus = 'completed';
            state.notifyInfo = 'deleted successfully'
            toast.success(state.notifyInfo)
        })
        builder.addCase(editQuestion.pending, (state, action) => {
            state.createStatus = 'editing';
        })
        builder.addCase(editQuestion.fulfilled, (state, {payload}) => {
            state.questions[+payload.id] = payload;
            state.createStatus = 'completed';
        })
    },
});

export const { nextQuestion, previousQuestion, checkAnswer, restartQuiz } = quizSlice.actions
export default quizSlice.reducer;