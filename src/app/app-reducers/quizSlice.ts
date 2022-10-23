import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createNewQuestion, fetchQuestions} from "../../api/api";
import {IQuestion} from "../../models/questions";


export interface quizState {
    isLoading: boolean
    questions: IQuestion[]
    currentQuestion: IQuestion | null
    currentQuestionCounter: number
    score:number,
    hasAnswer:boolean
}

const initialState: quizState = {
    questions: [],
    currentQuestion: null,
    currentQuestionCounter: 0,
    score: 0,
    hasAnswer:false,
    isLoading:false
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

export const quizSlice = createSlice({
    name:'quiz',
    initialState,
    reducers: {
        nextQuestion: (state) => {
            if(state.hasAnswer) {
                state.currentQuestionCounter += 1
                state.currentQuestion = state.questions[state.currentQuestionCounter]
            }
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
            state.hasAnswer = true
            state.currentQuestionCounter += 1
            state.currentQuestion = state.questions[state.currentQuestionCounter]
            state.hasAnswer = false
            console.log(state.score)
        }
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
        builder.addCase(createQuestion.fulfilled, (state, {payload}) => {
            state.questions.push(payload)
        })
    },
});

export const { nextQuestion, previousQuestion, checkAnswer } = quizSlice.actions
export default quizSlice.reducer;