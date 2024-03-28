import { Injectable } from '@angular/core';
import { AdminQuiz } from './adminQuiz';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, Subject, exhaustMap, take } from 'rxjs';
import { Participant } from './participant';
import { FetchedQuiz } from './fetchedQuiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  userCred: any = {
    name:'',
    email:''
  }

  finalQuiz = new Subject<any>;

  url: string = "https://quizapp-d1be8-default-rtdb.asia-southeast1.firebasedatabase.app/quizes.json";

  postQuiz(newQuiz:AdminQuiz){
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.httpClient.post(this.url, newQuiz,{
        params:new HttpParams().set('auth',user?.token!)
      });
    }));
  }

  getQuiz(){
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      console.log(user);
      return this.httpClient.get<AdminQuiz[]>(this.url,{
        params:new HttpParams().set('auth',user?.token!)
      })
    }));
  }

  getUserQuiz(){
    return this.httpClient.get<AdminQuiz[]>(this.url)
  }

  urlUser: string = "https://quizapp-d1be8-default-rtdb.asia-southeast1.firebasedatabase.app/userdata.json";

 
  postUserData(userData:any){
        return this.httpClient.post(this.urlUser, userData);
  }

  setUserData(userData:any){
    this.userCred.name = userData.name;
    this.userCred.email = userData.email;
  }

  getUsers(){
    return this.httpClient.get(this.urlUser);
  }
  sendQuiz(data:any){
    this.finalQuiz.next(data);
  }

}
