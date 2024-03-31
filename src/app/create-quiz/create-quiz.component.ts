import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminQuiz } from '../Shared/adminQuiz';
import { Question } from '../Shared/questions';
import { QuizService } from '../Shared/quiz.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {


  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute, private router: Router) { }

  email: string = this.activatedRoute.snapshot.params['email'];

  ngOnInit(): void {

  }

  currentInput: number = 0;
  isFormSubmitted: boolean = false;
  isNumberOfInputsSubmitted: boolean = false;

  newQuiz: AdminQuiz = { userEmail: this.email, quizId: this.generateID(), quizName: '', numQuestions: 0, questions: [] };
  question: Question = { questionDes: '', options: ['', '', '', ''], correctOption: 0 };


  generateForm() {
    if (this.newQuiz.numQuestions > 0 && this.newQuiz.quizName.length > 0) {
      this.isNumberOfInputsSubmitted = true;
    } else {
      alert("Please give proper the inputs");
    }
  }
  exitQuiz() {
    this.isNumberOfInputsSubmitted = false;
    this.newQuiz.quizName = '';
    this.newQuiz.numQuestions = 0;
    this.newQuiz.questions = [];
  }

  getNextInput() {
    if (this.currentInput < this.newQuiz.numQuestions - 1) {
      this.question = { questionDes: '', options: ['', '', '', ''], correctOption: 0 };
      console.log("one question", this.question);
      this.currentInput++;
    }
  }

  saveData() {
    
    if (Object.keys(this.question).length !== 0) {
      this.newQuiz.questions.push(this.question);
      console.log('User input:', this.newQuiz.questions);
    } else {
      alert("Please insert valid input");
    }
    if (this.currentInput < this.newQuiz.numQuestions - 1) {
      console.log("inside if")
      this.getNextInput();
    } else if (this.currentInput == this.newQuiz.numQuestions - 1) {
      this.isFormSubmitted = true;
      console.log(this.currentInput);
      console.log('All inputs submitted:', this.newQuiz);
      this.quizService.postQuiz(this.newQuiz).subscribe(resData => console.log(resData));
      this.router.navigate(['list-quiz', this.email]);
    }

  }

  generateID(): string {
    const randomNum = Math.floor(Math.random() * 1000000);
    const uniqueNum = randomNum + Date.now();
    return uniqueNum.toString();
  }

  goToQuizList() {
    this.router.navigate(['list-quiz', this.email]);
  }

  getParticipant() {
    this.router.navigate(['list-participant', this.email]);
  }
}
