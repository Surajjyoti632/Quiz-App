import { Component, OnInit } from '@angular/core';
import { AdminQuiz } from '../Shared/adminQuiz';
import { FetchedQuiz } from '../Shared/fetchedQuiz';
import { QuizService } from '../Shared/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';


@Component({
  selector: 'app-list-quiz-admin',
  templateUrl: './list-quiz-admin.component.html',
  styleUrls: ['./list-quiz-admin.component.css']
})
export class ListQuizAdminComponent implements OnInit {

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute) { }

  quiz: FetchedQuiz[] = [{
    uniqueId: '',
    userEmail: '',
    quizId: '',
    quizName: '',
    numQuestions: 0,
    questions: [],
  }]

  fetchedQuestions: any[] = [];

  userEmail: string ='';

  isLoading = false;
  isSelected = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe(params=>{
      this.userEmail = params['email'];
    })
    console.log(this.userEmail);
    this.quizService.getQuiz()
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
        console.log(x);
        this.quiz = x;
        this.fetchedQuestions = Object.values(x).filter((q: any) => q.userEmail === this.userEmail);
        this.fetchedQuestions.forEach(q => {
          q.questions = [...q.questions];
        });

        console.log(this.fetchedQuestions);
        this.isLoading = false
      });
  }

  selectedQue:any;
  selected(q:any){
    console.log(q);
    this.isSelected = true;
    this.selectedQue = q;
  }

  back(){
    this.isSelected = false;
    
  }

}
