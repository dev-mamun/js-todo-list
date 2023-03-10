/** ****************************************
 * Project: js-todo-list
 * File: add.test.js
 * Created: 3/8/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Apps from './modules/Apps';
import Todo from './modules/Todo';

describe('Add function', () => {
  const apps = new Apps();
  const desc = 'Jest Test';
  const $item = new Todo(desc, false, 1);
  apps.saveItems($item);
  const $items = apps.getItems();
  it('Store item in local storage', () => {
    expect($items[0].description).toBe(desc);
  });

  it('Get items from local storage', () => {
    expect($items).not.toBeNull();
  });
});