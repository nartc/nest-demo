import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  @Output() onLoginSuccess: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private _fb: FormBuilder,
              private _httpService: HttpService,
              private _snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    const body = { ...this.form.value };
    this._httpService.post('users/login', body, { 'Content-type': 'application/json' })
      .pipe(
        catchError((err) => {
          console.error(err);
          this.openSnackbar(err.error.message.message ? err.error.message.message : err.error.message);
          this.onLoginSuccess.emit(null);
          return of(null);
        }),
        filter(data => !!data),
      )
      .subscribe((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.openSnackbar('Login Successfully');
        this.onLoginSuccess.emit(data);
      });
  }

  getErrorMessage(control: string) {
    return `${control.toUpperCase()} is required`;
  }

  getFormControl(control: string): FormControl {
    return this.form.controls[control] as FormControl;
  }

  private openSnackbar(message: string) {
    this._snackbar.open(message, '', { duration: 1000 });
  }
}
