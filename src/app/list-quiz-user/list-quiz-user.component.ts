import { Component, OnInit } from '@angular/core';
import { QuizService } from '../Shared/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Participant } from '../Shared/participant';
import { map } from 'rxjs';
import { FetchedQuiz } from '../Shared/fetchedQuiz';
import { Question } from '../Shared/questions';

@Component({
  selector: 'app-list-quiz-user',
  templateUrl: './list-quiz-user.component.html',
  styleUrls: ['./list-quiz-user.component.css']
})
export class ListQuizUserComponent implements OnInit {

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute, private router: Router) { }

  userCredRec: any = {
    name: '',
    email: '',
    score:0,
    quizIdUser:'',
    adminEmail:'',
    totScore:0,
  };

  selected = false;
  submitted = false;
  selectedOption: number;
  selectedOptions: string[] = [];
  score: number = 0;
  indexNumber:number;

  quiz: FetchedQuiz[] = [{
    uniqueId: '',
    userEmail: '',
    quizId: '',
    quizName: '',
    numQuestions: 0,
    questions: [],
  }];

  quizRec: FetchedQuiz = {
    uniqueId: '',
    numQuestions: 0,
    quizId: '',
    quizName: '',
    userEmail: '',
    questions: []
  };

  ngOnInit(): void {


    this.userCredRec.name = this.activatedRoute.snapshot.params['name'];
    this.userCredRec.email = this.activatedRoute.snapshot.params['email'];

    this.quizService.getUserQuiz()
      .pipe(
        map(responseData => {
          const productsArray: FetchedQuiz[] = [{
            uniqueId: '',
            userEmail: '',
            quizId: '',
            numQuestions: 0,
            quizName: '',
            questions: [],
          }];
          productsArray.length = 0;
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              productsArray.push({ ...responseData[key], uniqueId: key, });

            }
          }
          console.log("Product array is", productsArray);
          return productsArray;
        })
      ).subscribe(x => {
        this.quiz = x;
        console.log(this.quiz);
      });
  }

  // getData(id: string,adminEmail:string,index:number) {
  //   this.selected = true;
  //   this.quizRec = this.findQuizById(id);
  //   this.quiz.splice(index,1);
  //   this.userCredRec.quizIdUser = id;
  //   this.userCredRec.adminEmail = adminEmail;
  //   this.userCredRec.totScore = this.quizRec.numQuestions;
  //   console.log(this.quizRec);

  // }

  selectedOpt(id: string,adminEmail:string,index:number){
    console.log("selected",id);
    this.selected = true;
    this.quizRec = this.findQuizById(id);
    // this.quiz.splice(index,1);
    this.indexNumber = index;
    this.userCredRec.quizIdUser = id;
    this.userCredRec.adminEmail = adminEmail;
    this.userCredRec.totScore = this.quizRec.numQuestions;
    console.log(this.quizRec);
  }

  calculateScore() {
    this.score = 0;
    for (let i = 0; i < this.quizRec.numQuestions; i++) {
      const question: Question = this.quizRec.questions[i];
      if (this.selectedOptions[i] === question.options[question.correctOption]) {
        this.score++;
      }
    }
    this.selectedOptions = [];
    console.log('Score:', this.score);
    this.userCredRec.score = this.score;
    console.log(this.userCredRec);
    this.quizService.postUserData(this.userCredRec).subscribe(
      data => {
        console.log(data);
        this.quiz.splice(this.indexNumber,1);
      }
      
    );
    this.submitted = true;

  }

  allQuestionsAnswered(): boolean {
    console.log(this.selectedOptions);
    console.log(this.quizRec.numQuestions,"+",this.selectedOptions.length);
    
    if(this.selectedOptions.length===this.quizRec.numQuestions){
      for (let i = 0; i < this.quizRec.numQuestions; i++) {
          if (!this.selectedOptions[i]) { 
              return false;
          }
      }
      return true; 
    }
    return this.selectedOptions.length === this.quizRec.numQuestions;
  }

  findQuizById(quizId: string) {
    return this.quiz.find(q => q.quizId === quizId);
  }

  anotherQuiz(){
    this.submitted = false;
    this.selected = false;
  }
  goToHome(){
    this.router.navigate(['user']);
  }

  


  exit(){
    this.submitted = false;
    this.selected = false;
    this.selectedOptions = [];
  }
}
