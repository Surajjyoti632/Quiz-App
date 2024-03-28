import { Component, OnInit } from '@angular/core';
import { QuizService } from '../Shared/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { FetchedQuiz } from '../Shared/fetchedQuiz';

@Component({
  selector: 'app-list-participant',
  templateUrl: './list-participant.component.html',
  styleUrls: ['./list-participant.component.css']
})
export class ListParticipantComponent implements OnInit {

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute, private router: Router) { }

  userEmail: string = '';

  userDetail: any = {
    uniqueid: '',
    quizIdUser: '',
    email: '',
    name: '',
    score: 0,
    totScore:0,
  }

  isLoading = true;
  fetchedQuestions: any[] = [];

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.userEmail = params['email'];
    })
    
    this.quizService.getUsers()
      .pipe(
        map(responseData => {
          const productsArray: any[] = [{
            uniqueId: '',
            quizIdUser: '',
            email: '',
            name: '',
            score: 0,
            adminEmail:'',
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
        this.userDetail = Object.values(x).filter((q: any) => q.adminEmail === this.userEmail);
        // this.fetchedQuestions.forEach(q => {
        //   q.questions = [...q.questions];
        // });
        this.isLoading = false;
        console.log(this.userDetail);
      });


  }

}
