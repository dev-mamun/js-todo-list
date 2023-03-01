/** ****************************************
 * Project: js-todo-list
 * File: index.js
 * Created: 2/28/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */

import sortArray from '../../node_modules/sort-array/dist/index.mjs';
import Todo from './todo.js';
import Notify from './Notification.js';

export default class Apps {
  constructor() {
    this.items = [];
  }

  events = () => {
    // Input event to save new task
    const $input = document.getElementById('create');
    $input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.target.value !== '') {
          this.save(e.target.value);
          e.target.value = '';
        } else {
          Notify.show('Please write your task', 'error');
        }
      }
    });
    // Delete a task
    this.deleteEvent();
    // Change item
    this.changeEvent();
  };

  deleteEvent = () => {
    const $tasks = document.querySelectorAll('.delete');
    $tasks.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.delete(parseInt(e.target.dataset.id, 16));
        e.target.parentNode.remove();
      });
    });
  };

  changeEvent = () => {
    const $inputs = document.querySelectorAll('.todo_input');
    $inputs.forEach((input) => {
      input.addEventListener('click', (e) => {
        e.target.style.background = '#ffcb0029';
      });
      input.addEventListener('focusout', (e) => {
        e.target.style.background = '';
      });
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.target.style.background = '';
          this.update(e.target.value, parseInt(e.target.dataset.id, 16));
        }
      });
    });
  };

  show = () => {
    this.items = this.getItems();
    const items = sortArray(this.items, {
      by: 'index',
    });
    if (items != null) {
      items.forEach((item) => this.addItem(item));
    }
  };

  addItem = (item) => {
    const list = document.getElementById('items');
    const li = document.createElement('li');
    li.innerHTML = `
        <input data-id="${item.index}" type="checkbox" class="todo_check">
        <input data-id="${item.index}" type="text" class="todo_input" value="${item.description}">
        <i data-id="${item.index}" class="fa-regular fa-trash-can delete"></i>
        `;
    list.appendChild(li);
  };

  getItems = () => {
    const $items = JSON.parse(localStorage.getItem('items'));
    if ($items) {
      return $items;
    }
    return [];
  };

  saveItems = ($item) => {
    this.items.push($item);
    this.saveStorage(this.items);
  }

  save = ($data) => {
    const $item = new Todo($data, false, this.items.length + 1);
    this.saveItems($item);
    this.addItem($item);
    this.deleteEvent();
    this.changeEvent();
  };

  update = ($desc, $id) => {
    this.items.find((item) => item.index === $id).description = $desc;
    this.saveStorage(this.items);
  }

  delete = ($id) => {
    this.items = this.items.filter((item) => $id !== item.index);
    this.items.forEach((item) => {
      if (item.index > $id) {
        item.index -= 1;
      }
    });
    this.saveStorage(this.items);
  }

  saveStorage = ($items) => {
    localStorage.setItem('items', JSON.stringify($items));
  }
}