/** ****************************************
 * Project: js-todo-list
 * File: edit.test.js
 * Created: 3/9/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Apps from './modules/Apps';
import Todo from './modules/Todo';

const mockLi = () => {
  const $ul = document.createElement('ul');
  $ul.className = 'todo_list';
  $ul.id = 'items';
  document.querySelector('body').appendChild($ul);

  const $li = document.createElement('li');
  $li.className = 'todo_input';
  document.getElementById('items').appendChild($li);

  const $checkbox = document.createElement('input');
  $checkbox.id = 'complete';
  $checkbox.className = 'checkbox';
  $checkbox.type = 'checkbox';
  $checkbox.dataset.id = '1';
  $li.appendChild($checkbox);

  const $input = document.createElement('input');
  $input.className = 'todo_input';
  $input.id = 'todo_input';
  $input.type = 'text';
  $input.value = 'Jest Test';
  $input.dataset.id = '1';
  $li.appendChild($input);

  const $i = document.createElement('i');
  $i.className = 'fa-regular fa-trash-can delete';
  $i.dataset.id = '1';
  $li.appendChild($i);

  const $button = document.createElement('button');
  $button.type = 'button';
  $button.id = 'clearall';
  $button.className = 'clear_completed';
  $button.textContent = 'Clear all completed';
  document.querySelector('body').appendChild($button);
};

beforeAll(() => {
  window.localStorage.clear();
  mockLi();
});

describe('Edit function', () => {
  it('Edit Stored item', () => {
    const apps = new Apps();
    const desc = 'This is changed item';
    const $item = new Todo('Jest Test', false, 1);
    apps.saveItems($item);
    const $inputs = document.getElementById('todo_input');
    $inputs.addEventListener('click', (e) => {
      apps.update(desc, parseInt(e.target.dataset.id, 16));
    });
    $inputs.dispatchEvent(new Event('click', { bubbles: true }));
    const $items = apps.getItems();
    expect($items[0].description).toBe(desc);
  });
});