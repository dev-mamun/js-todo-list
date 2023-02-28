import './style.css';
import Todo from './modules/Apps.js';
/* import _ from 'lodash';
function component() {
  const element = document.createElement('div');
  // Lodash, now imported by this script
  return element;
}
document.body.appendChild(component()); */

const todo = new Todo();
todo.show();