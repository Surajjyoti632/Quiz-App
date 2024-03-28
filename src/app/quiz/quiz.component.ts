import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Shared/auth.service';
import { exhaustMap, take } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  url: string = "https://ecmangular-e1b03-default-rtdb.asia-southeast1.firebasedatabase.app/quizs.json";

  addQuiz() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.httpClient.post(this.url,{
        params:new HttpParams().set('auth',user?.token!)
      });
    }));
  }

  ngOnInit(): void {
  }

}
