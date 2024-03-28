import { Question } from "./questions";

export interface FetchedQuiz{
    uniqueId: string;
    userEmail:string;
    quizId: string;
    quizName: string;
    numQuestions:number;
    questions: Question[];
}