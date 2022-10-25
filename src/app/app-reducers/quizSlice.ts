import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createNewQuestion, deleteListQuestion, fetchQuestions} from "../../api/api";
import {IQuestion} from "../../models/questions";


export interface quizState {
    isLoading: boolean
    questions: IQuestion[]
    currentQuestion: IQuestion | null
    currentQuestionCounter: number
    score:number,
    hasAnswer:boolean,
    createStatus:string
}

const initialState: quizState = {
    questions: [],
    currentQuestion: null,
    currentQuestionCounter: 0,
    score: 0,
    hasAnswer:false,
    isLoading:false,
    createStatus:''
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
        checkAnswer: (state,action) => {
            if(action.payload === state.currentQuestion?.correctAnswer) {
                state.score += 1
            }
            // state.hasAnswer = true
            // state.currentQuestionCounter += 1
            // state.currentQuestion = state.questions[state.currentQuestionCounter]
            // state.hasAnswer = false
            // console.log(state.score)
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
            console.log(state.questions)
        })
        builder.addCase(createQuestion.pending, (state) => {
            state.createStatus = 'creating'
        })
        builder.addCase(createQuestion.fulfilled, (state, {payload}) => {
            state.questions.push(payload)
            state.createStatus = 'created'
        })
        builder.addCase(deleteQuestion.pending, (state, action) => {
            state.createStatus = 'removing'
        })
        builder.addCase(deleteQuestion.fulfilled, (state, action) => {
            state.questions = state.questions.filter(question => question.id !== action.payload)
            state.createStatus = 'completed'
        })
    },
});

export const { nextQuestion, previousQuestion, checkAnswer } = quizSlice.actions
export default quizSlice.reducer;