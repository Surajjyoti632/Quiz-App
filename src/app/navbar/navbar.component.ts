import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Shared/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;

  constructor(private authService:AuthService,private router:Router) { 
    // this.isLoggedIn = this.authService.isLoggedIn();
  }
 
  ngOnInit(): void {
   
  }

  onLogOut(){
    this.authService.logout();
    this.router.navigate(['admin-auth']);
  }

}
