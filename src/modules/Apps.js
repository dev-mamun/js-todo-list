/** ****************************************
 * Project: js-todo-list
 * File: index.js
 * Created: 2/28/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Todo from './Todo';
import Notify from './Notification';
import Status from './Status';

const sortArray = require('sort-array/dist');

export default class Apps {
  constructor() {
    this.items = [];
    this.controller = {};
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
    // Clear all
    const $clearAll = document.getElementById('clearall');
    $clearAll.addEventListener('click', (e) => {
      e.preventDefault();
      const $checked = document.querySelectorAll('.checkbox:checked');
      $checked.forEach((input) => {
        input.parentNode.remove();
        this.clearComplete();
      });
    });
    // Delete a task
    this.deleteEvent();
    // Change item description
    this.changeEvent();
    // Update task status
    this.changeStatus();
  };

  clearComplete = () => {
    this.items = this.items.filter((item) => item.completed !== true);
    let count = 1;
    this.items.forEach((item) => {
      item.index = count;
      count += 1;
    });
    this.saveStorage(this.items);
  }

  deleteEvent = () => {
    this.controller = new AbortController();
    const $tasks = document.querySelectorAll('.delete');
    $tasks.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.delete(parseInt(e.target.dataset.id, 16));
        e.target.parentNode.remove();
      }, { signal: this.controller.signal });
    });
  };

  removeEvent = () => {
    this.controller.abort();
  };

  changeEvent = () => {
    this.controller = new AbortController();
    const $inputs = document.querySelectorAll('.todo_input');
    $inputs.forEach((input) => {
      input.addEventListener('click', (e) => {
        e.target.style.background = '#ffcb0029';
      }, { signal: this.controller.signal });
      input.addEventListener('focusout', (e) => {
        e.target.style.background = '';
      }, { signal: this.controller.signal });
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.target.style.background = '';
          this.update(e.target.value, parseInt(e.target.dataset.id, 16));
        }
      }, { signal: this.controller.signal });
    });
  };

  changeStatus = () => {
    this.controller = new AbortController();
    const $checkbox = document.querySelectorAll('.checkbox');
    $checkbox.forEach((input) => {
      input.addEventListener('change', (e) => {
        Status(this.items, parseInt(e.target.dataset.id, 16), e.target.checked);
      }, { signal: this.controller.signal });
    });
  };

  show = () => {
    document.getElementById('items').innerHTML = '';
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
    let checked = '';
    if (item.completed) {
      checked = 'checked';
    }
    li.innerHTML = `
        <input data-id="${item.index}" type="checkbox" ${checked} class="checkbox">
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
  };

  save = ($data) => {
    const $item = new Todo($data, false, this.items.length + 1);
    this.saveItems($item);
    this.addItem($item);
    this.removeEvent();
    this.changeEvent();
    this.changeStatus();
    this.deleteEvent();
  };

  update = ($desc, $id) => {
    this.items.find((item) => item.index === $id).description = $desc;
    this.saveStorage(this.items);
  };

  delete = ($id) => {
    this.deleteItem($id);
    this.show();
    this.changeEvent();
    this.changeStatus();
    this.deleteEvent();
  };

  deleteItem = ($id) => {
    this.items = this.items.filter((item) => $id !== item.index);
    this.items.forEach((item) => {
      if (item.index >= $id) {
        item.index -= 1;
      }
    });
    this.saveStorage(this.items);
  };

  saveStorage = ($items) => {
    localStorage.setItem('items', JSON.stringify($items));
  };
}