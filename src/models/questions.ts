export interface IQuestion {
    id?: string | any;
    title: string,
    task: string,
    answers: Array<string>,
    correctAnswer:string
}