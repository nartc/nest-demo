import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(private _fb: FormBuilder,
              private _httpService: HttpService) {
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
          return of(err);
        }),
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  getErrorMessage(control: string) {
    return `${control.toUpperCase()} is required`;
  }

  getFormControl(control: string): FormControl {
    return this.form.controls[control] as FormControl;
  }
}
