import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiException, RegisterParams, UserClient, UserVm } from '../../app.api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Output() onSignupSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  form: FormGroup;

  constructor(private _fb: FormBuilder,
              private _httpService: HttpService,
              private _snackbar: MatSnackBar,
              private _userClientService: UserClient) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: [''],
      lastName: [''],
    });
  }

  submit() {
    const registerParams: RegisterParams = new RegisterParams(this.form.value);
    this._userClientService.register(registerParams)
      .pipe(
        catchError((err: ApiException) => {
          console.error(err);
          this.form.reset();
          this.onSignupSuccess.emit(false);
          this.openSnackbar(err.message);
          return of(null);
        }),
        filter(data => !!data),
      ).subscribe((user: UserVm) => {
      console.log(user);
      this.onSignupSuccess.emit(true);
      this.openSnackbar('Registered successfully');
      this.form.reset();
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
