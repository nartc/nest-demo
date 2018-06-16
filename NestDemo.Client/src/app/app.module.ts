import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportModule } from './material-import.module';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SocketService } from './services/socket.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    TodosComponent,
    TodoListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialImportModule,
  ],
  providers: [SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
