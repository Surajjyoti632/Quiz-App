import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { QuizService } from './quiz.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRouteGuardService implements CanActivate{

  constructor(private quizService:QuizService,private router:Router) { }

  canActivate(): boolean {
    
    if (this.quizService.userCred.name && this.quizService.userCred.email) {
      return true; // Proceed if username and email are available

    } else {
      this.router.navigate(['user']); // Redirect if username or email are not available
      return false;
    }
  }
}
