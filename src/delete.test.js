/** ****************************************
 * Project: js-todo-list
 * File: delete.test.js
 * Created: 3/8/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Apps from './modules/Apps';
import Todo from './modules/Todo';

describe('delete item', () => {
  const apps = new Apps();
  const desc = 'Jest Test';
  const $item = new Todo(desc, false, 1);
  apps.saveItems($item);
  it('delete item', () => {
    apps.deleteItem(1);
    expect(apps.getItems()).toEqual([]);
  });
});