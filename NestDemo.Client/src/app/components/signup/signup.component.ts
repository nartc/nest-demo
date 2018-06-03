import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { MatSnackBar } from '@angular/material/snack-bar';

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
              private _snackbar: MatSnackBar) {
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
    const body = {
      ...this.form.value,
    };
    this._httpService.post('users/register', body, { 'Content-Type': 'application/json' })
      .pipe(
        catchError((err) => {
          console.error(err);
          this.form.reset();
          this._snackbar.open(err.error.message.message ? err.error.message.message : err.error.message, '', {
            duration: 1000,
          });
          this.onSignupSuccess.emit(false);
          return of(null);
        }),
        filter((data) => !!data),
      )
      .subscribe((data) => {
        this.onSignupSuccess.emit(true);
        this._snackbar.open('Registered successfully', '', {
          duration: 1000,
        });
        this.form.reset();
      });
  }

  getErrorMessage(control: string) {
    return `${control.toUpperCase()} is required`;
  }

  getFormControl(control: string): FormControl {
    return this.form.controls[control] as FormControl;
  }
}
