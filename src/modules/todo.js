/** ****************************************
 * Project: js-todo-list
 * File: todo.js
 * Created: 3/1/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
export default class Todo {
  constructor(description, completed, index) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }
}