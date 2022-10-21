import axios from "axios";
import {IQuestion} from "../models/questions";

export function fetchQuestions () {
    return axios.get<IQuestion>('https://634978e9a59874146b20effe.mockapi.io/questions')
}