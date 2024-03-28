import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { ListQuizAdminComponent } from './list-quiz-admin/list-quiz-admin.component';
import { UserComponent } from './user/user.component';
import { ListQuizUserComponent } from './list-quiz-user/list-quiz-user.component';
import { ListParticipantComponent } from './list-participant/list-participant.component';
import { AuthGuardService } from './Shared/auth-guard.service';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'',component:AppComponent},
  {path:'admin-auth',component:AdminAuthComponent},
  {path:'create-quiz/:email',component:CreateQuizComponent,canActivate:[AuthGuardService]},
  {path:'list-quiz/:email',component:ListQuizAdminComponent,canActivate:[AuthGuardService]},
  {path:'user',component:UserComponent},
  {path:'list-quiz-user/:name/:email',component:ListQuizUserComponent},
  {path:'list-participant/:email',component:ListParticipantComponent,canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
