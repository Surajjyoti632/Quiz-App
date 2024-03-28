import { Question } from "./questions";

export interface AdminQuiz{
    userEmail:string;
    quizId: string;
    quizName:string;
    numQuestions: number;
    questions: Question[];
}