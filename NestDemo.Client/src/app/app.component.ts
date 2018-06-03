import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  name: string;
  isAuth = false;

  constructor() {
  }

  ngOnInit() {
    this.name = 'Guest';
  }

  onAuthStateChangedHandler(authState: boolean) {
    this.isAuth = authState;
    if (authState) {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      this.name = currentUser ? currentUser.fullName : '';
    } else {
      this.name = 'Guest';
    }
  }
}
