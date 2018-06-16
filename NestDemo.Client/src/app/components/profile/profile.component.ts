import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() user: any;
  @Output() onSignoutClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _snackbar: MatSnackBar) {
  }

  ngOnInit() {
  }

  signOutClick() {
    localStorage.clear();
    this._snackbar.open('Signed out successfully', '', { duration: 1000 });
    this.onSignoutClick.emit(true);
  }
}
