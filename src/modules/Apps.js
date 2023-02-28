import sortArray from '../../node_modules/sort-array/dist/index.mjs';

export default class Todo {
  constructor() {
    this.items = [
      {
        index: 1,
        description: 'To Do One',
        completed: true,
      },
      {
        index: 3,
        description: 'To Do Three',
        completed: true,
      },
      {
        index: 2,
        description: 'To Do Two',
        completed: false,
      },
    ];
  }

  show = () => {
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
        <input type="checkbox" class="todo_check">
        <input type="text" class="todo_input" value="${item.description}">
        <a href="#" data-id="${item.index}" class="trashImg"><i class="fa-regular fa-trash-can"></i></a>
        `;
    list.appendChild(li);
  }
}