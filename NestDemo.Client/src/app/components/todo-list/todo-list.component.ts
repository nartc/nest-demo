import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() todos: any[];
  @Output() onRemoveClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() onUpdateClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() onStatusChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  removeClicked(id: string) {
    this.onRemoveClicked.emit(id);
  }

  updateClicked(id: string) {
    this.onUpdateClicked.emit(id);
  }

  changeStatus(id: string) {
    this.onStatusChanged.emit(id);
  }
}
