import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../Shared/authResponseData';
import { AuthService } from '../Shared/auth.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {

  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  isLoginMode = true;
  isLoading = false;
  error:string='';

  authResponseData: AuthResponseData = {
    kind: '',
    idToken: '',
    email: '',
    refreshToken: '',
    expiresIn: '',
    localId: '',
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {

    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (!form.valid) {
      return;
    } else {
      const email = form.value.email;
      const password = form.value.password;
      if (this.isLoginMode) {
        authObs = this.authService.login(email,password);
      } else {
        authObs = this.authService.signup(email,password);
      }
      authObs.subscribe(
        resData => {
          console.log("resData",resData);
          this.isLoading = false;
          this.router.navigate(['create-quiz',email])
        },
        errorMessage=>{
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
        );
      }
      form.reset();

  }


}
