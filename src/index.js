/** ****************************************
 * Project: js-todo-list
 * File: index.js
 * Created: 2/28/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */

import './style.css';
import Todo from './modules/Apps.js';

/* import _ from 'lodash';
function component() {
  const element = document.createElement('div');
  // Lodash, now imported by this script
  return element;
}
document.body.appendChild(component()); */

window.addEventListener('load', () => {
  const todo = new Todo();
  todo.show();
  todo.events();
});
