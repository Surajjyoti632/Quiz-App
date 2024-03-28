import { Component, OnInit } from '@angular/core';
import { Participant } from '../Shared/participant';
import { NgForm } from '@angular/forms';
import { QuizService } from '../Shared/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  }

  participantCred: Participant = { name: '', email: '', phNum: 0 };

  onSubmit(form: NgForm) {

    if (form.valid) {
      this.participantCred.name = form.value.name;
      this.participantCred.email = form.value.email;
      this.participantCred.phNum = form.value.phNum;
      console.log(this.participantCred);
      
      // this.quizService.setUserData(this.participantCred);
      this.router.navigate(['list-quiz-user',this.participantCred.name,this.participantCred.email])
    }
  }

  goToHome(){
    this.router.navigate([''])
  }
}



