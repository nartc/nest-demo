import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {

  token: string;
  todos: any[];

  constructor(private _httpService: HttpService,
              private _snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.loadTodos();
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
}
