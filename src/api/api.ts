import axios from "axios";
import {IQuestion} from "../models/questions";
import {BASE_URL} from "../constants/constants";

export function fetchQuestions () {
    return axios.get<IQuestion>(BASE_URL)
}

export function createNewQuestion (question: IQuestion) {
    return axios.post(BASE_URL,question)
}

export function deleteListQuestion (id: number) {
    return axios.delete(BASE_URL + id)
}