import {configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';
import quizReducer from './app-reducers/quizSlice';
import loginReducer from './app-reducers/loginSlice';

const rootReducer = combineReducers({ quiz: quizReducer, login: loginReducer })

export const store = configureStore({reducer: rootReducer});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
