/******************************************
 * Project: js-todo-list
 * File: index.js
 * Created: 2/28/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 *******************************************/
import _ from 'lodash';
import './style.css';
import Globe from './globe.png';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Globe;
  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());