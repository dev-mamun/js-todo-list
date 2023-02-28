/******************************************
 * Project: js-todo-list
 * File: index.js
 * Created: 2/28/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 *******************************************/
import _ from 'lodash';
import './style.css';
import UI from './modules/Apps.js';
import Todo from "./modules/Apps.js";

// function component() {
//   const element = document.createElement('div');
//   // Lodash, now imported by this script
//   return element;
// }
// document.body.appendChild(component());

const todo = new Todo;
todo.show();