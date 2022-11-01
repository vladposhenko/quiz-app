import axios from "axios";
import {IQuestion} from "../models/questions";
import {BASE_URL} from "../constants/constants";

export function fetchQuestions () {
    return axios.get<IQuestion>(BASE_URL)
}

export function createNewQuestion (question: IQuestion) {
    debugger;
    return axios.post(BASE_URL,question)
}

export function deleteListQuestion (id: number) {
    return axios.delete(BASE_URL + id)
}

export function editListQuestion (id: number, body:any) {
    debugger;
    return axios.put(BASE_URL + id, body)
}