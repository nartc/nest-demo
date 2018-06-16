import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @ViewChild(MatTabGroup) authTabs: MatTabGroup;
  @Output() onAuthStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  isLoggedIn = false;
  user: any;

  constructor() {
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.isLoggedIn = true;
      this.onAuthStateChanged.emit(true);
    }
  }

  onSignUpSuccessHandler(isSignedUpSuccess: boolean) {
    if (isSignedUpSuccess) {
      this.authTabs.selectedIndex = 1;
    }
  }

  onLoginSuccessHandler(userData: any) {
    if (userData) {
      this.isLoggedIn = true;
      this.user = userData;
      this.onAuthStateChanged.emit(true);
    }
  }

  onSignoutClickHandler(signoutClicked: boolean) {
    if (signoutClicked) {
      this.isLoggedIn = false;
      this.authTabs.selectedIndex = 1;
      this.onAuthStateChanged.emit(false);
    }
  }
}
