import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { QuizComponent } from './quiz/quiz.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { ListQuizAdminComponent } from './list-quiz-admin/list-quiz-admin.component';
import { UserComponent } from './user/user.component';
import { ListQuizUserComponent } from './list-quiz-user/list-quiz-user.component';
import { ListParticipantComponent } from './list-participant/list-participant.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminAuthComponent,
    LoadingSpinnerComponent,
    QuizComponent,
    CreateQuizComponent,
    ListQuizAdminComponent,
    UserComponent,
    ListQuizUserComponent,
    ListParticipantComponent,
    NavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
