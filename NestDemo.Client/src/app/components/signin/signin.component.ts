import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

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
    });
  }

  submit() {
    const body = { ...this.form.value };
    this._httpService.post('users/login', body, { 'Content-type': 'application/json' })
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
