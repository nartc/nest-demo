import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sortBy } from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnChanges {
  @Input() authState: boolean;

  form: FormGroup;
  token: string;
  todos: any[];
  currentEditingTodo: any;

  constructor(private _httpService: HttpService,
              private _snackbar: MatSnackBar,
              private _fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.authState) {
      this.token = localStorage.getItem('token');
      this.loadTodos();
    }

    this.initForm();
  }

  private initForm() {
    this.form = this._fb.group({
      content: ['', Validators.required],
    });
  }

  submit() {
    const body = {
      content: this.form.value.content,
    };

    if (this.currentEditingTodo) {
      this.currentEditingTodo.content = this.form.value.content;

      this._httpService.put('todos', this.currentEditingTodo, {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      }).pipe(
        catchError((err) => {
          console.error(err);
          this._snackbar.open(err.error.message, '', { duration: 1000 });
          return of(null);
        }),
        filter(data => !!data),
      ).subscribe((data) => {
        this.todos.splice(this.todos.indexOf(this.todos.find(todo => todo.id === data.id)), 1, data);
        this.form.reset();
        this.form.controls['content'].setValue('');
        this.todos = sortBy(this.todos, ['isCompleted']);
        this.currentEditingTodo = null;
      });
    } else {
      this._httpService.post('todos/create?' + `content=${body.content}`, null, {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      }).pipe(
        catchError((err) => {
          console.error(err);
          this._snackbar.open(err.error.message, '', { duration: 1000 });
          return of(null);
        }),
        filter(data => !!data),
      ).subscribe((data) => {
        this.todos.push(data);
        this.form.reset();
        this.form.controls['content'].setValue('');
        this.todos = sortBy(this.todos, ['isCompleted']);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['authState'].currentValue) {
      this.token = localStorage.getItem('token');
      this.loadTodos();
    }
  }

  loadTodos() {
    this._httpService.get('todos', {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    }).pipe(
      catchError((err) => {
        console.error(err);
        this._snackbar.open(err.error.statusCode === 401 ? err.error.message.error : err.error.message, '', { duration: 1000 });
        return of(null);
      }),
      filter(data => !!data),
    ).subscribe((data) => {
      this.todos = sortBy(data, ['isCompleted']);
    });
  }

  onRemoveClickedHandler(todoId: string) {
    if (confirm('Are you sure?')) {
      this._httpService.delete(`todos/${todoId}`, {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      }).pipe(
        catchError((err) => {
          console.error(err);
          this._snackbar.open(err.error.statusCode === 401 ? err.error.message.error : err.error.message, '', { duration: 1000 });
          return of(null);
        }),
        filter(data => !!data),
      ).subscribe((data) => {
        this.todos.splice(this.todos.indexOf(this.todos.find(todo => todo.id === data.id)), 1);
        this.todos = sortBy(data, ['isCompleted']);
      });
    }
  }

  onCancelClick() {
    this.form.reset();
    this.form.controls['content'].setValue('');

    if (this.currentEditingTodo) {
      this.currentEditingTodo = null;
    }
  }

  onUpdateClickedHandler(todoId: string) {
    this.currentEditingTodo = this.todos.find(todo => todo.id === todoId);
    this.form.controls['content'].setValue(this.currentEditingTodo.content);
  }

  onStatusChangedHandler(todoId: string) {
    this.currentEditingTodo = this.todos.find(todo => todo.id === todoId);
    this.currentEditingTodo.isCompleted = true;
    this._httpService.put('todos', this.currentEditingTodo, {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    }).pipe(
      catchError((err) => {
        console.error(err);
        this._snackbar.open(err.error.message, '', { duration: 1000 });
        return of(null);
      }),
      filter(data => !!data),
    ).subscribe((data) => {
      this.todos.splice(this.todos.indexOf(this.todos.find(todo => todo.id === data.id)), 1, data);
      this.todos = sortBy(this.todos, ['isCompleted']);
      this.currentEditingTodo = null;
    });
  }
}
