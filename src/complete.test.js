/** ****************************************
 * Project: js-todo-list
 * File: complete.test.js
 * Created: 3/9/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Apps from './modules/Apps';
import Todo from './modules/Todo';
import Status from './modules/Status';

const mockLi = () => {
  const ul = document.createElement('ul');
  ul.className = 'todo_list';
  ul.id = 'items';
  document.querySelector('body').appendChild(ul);

  const li = document.createElement('li');
  li.className = 'todo_input';
  document.getElementById('items').appendChild(li);

  const checkbox = document.createElement('input');
  checkbox.id = 'complete';
  checkbox.className = 'checkbox';
  checkbox.type = 'checkbox';
  checkbox.dataset.id = '1';

  const $input = document.createElement('input');
  $input.className = 'todo_input';
  $input.id = 'todo_input';
  $input.type = 'text';
  $input.value = 'Jest Test';
  $input.dataset.id = '1';

  const $i = document.createElement('i');
  $i.className = 'fa-regular fa-trash-can delete';
  $i.dataset.id = '1';

  li.appendChild(checkbox);
  li.appendChild($input);
  li.appendChild($i);
};

beforeAll(() => {
  window.localStorage.clear();
  mockLi();
});

describe('Mark Completed', () => {
  it('Item mark as complete', () => {
    const apps = new Apps();
    const $item = new Todo('Jest Test', false, 1);
    apps.saveItems($item);
    let $items = apps.getItems();
    const $checkbox = document.getElementById('complete');
    $checkbox.addEventListener('change', (e) => {
      Status($items, parseInt(e.target.dataset.id, 16), true);
    });
    $checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    $items = apps.getItems();
    expect($items[0].completed).toBeTruthy();
  });
});