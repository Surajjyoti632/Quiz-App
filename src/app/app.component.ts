import { Component, OnInit,HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './Shared/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'QuizApp';
  hideLink: boolean = false;

  constructor(private authService:AuthService,private router:Router,private activatedRoute:ActivatedRoute){
  }

  toggleLink(){
    this.hideLink = true;
  }

  private userSub: Subscription = new Subscription();
  isAuthenticated = false;


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    // Detect when the user navigates backward or forward in the browser's history
    if (window.location.pathname === '/') {
      // Reset hideContent when navigating to home page
      this.hideLink = false;
    } else {
      // Hide content when navigating away from the home page
      this.hideLink = true;
    }
  }

  
}
