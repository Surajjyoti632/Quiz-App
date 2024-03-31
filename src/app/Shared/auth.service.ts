import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthResponseData } from './authResponseData';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User|null>(null);

  constructor(private httpClient: HttpClient) { }

  signup(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCAo0M7UrBUiUbFEZPo_HDydDKvFQNvjMA',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError), tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn 
          )
        }));
  }


  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCAo0M7UrBUiUbFEZPo_HDydDKvFQNvjMA',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError), tap(resData => {
        console.log(+resData.expiresIn);
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn 
        )
      }));

  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect Password';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid Credentials';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 10000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  logout(){
    this.user.next(null);
    
  }

  

}
