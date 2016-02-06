import {Component} from 'angular2/core';
import {ChangeLogStore, TodoStore, Todo} from './services/store';
import {Http} from "angular2/http";
import 'rxjs/operator/map';

@Component({
	selector: 'todo-app',
	templateUrl: 'app/app.html',
	bindings: [ChangeLogStore, TodoStore]
})

export default class TodoApp {
	todoStore: TodoStore;
	changeLogStore: ChangeLogStore;
	newTodoText = '';
	http: Http;


	constructor(todoStore: TodoStore, changeLogStore: ChangeLogStore, http: Http) {
		this.todoStore = todoStore;
		this.changeLogStore = changeLogStore;
		this.http = http;

		// when load get request
		http.get('http://localhost:3000/api')
			.map(res => res.text())
	    .subscribe(
	      data => this.successRequest(data),
	      err => this.errorRequest(err),
	      () => this.alwaysRequest()
	    );

	}

	successRequest(data: string) {
		console.log(data);
	}

	errorRequest(error: string) {
		console.log(error);
	}

	alwaysRequest() {
		console.log('always run')
	}

	stopEditing(todo: Todo, editedTitle: string) {
		todo.title = editedTitle;
		todo.editing = false;
	}

	cancelEditingTodo(todo: Todo) {
		todo.editing = false;
	}

	updateEditingTodo(todo: Todo, editedTitle: string) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoStore.remove(todo);
		}

		todo.title = editedTitle;
	}

	editTodo(todo: Todo) {
		todo.editing = true;
	}

	removeCompleted() {
		this.todoStore.removeCompleted();
	}

	toggleCompletion(todo: Todo) {
		this.todoStore.toggleCompletion(todo);
	}

	remove(todo: Todo){
		this.todoStore.remove(todo);
	}

	addTodo() {
		if (this.newTodoText.trim().length) {
			this.todoStore.add(this.newTodoText);
			this.newTodoText = '';
		}
	}
}
