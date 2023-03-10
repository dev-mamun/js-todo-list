/** ****************************************
 * Project: js-todo-list
 * File: edit.test.js
 * Created: 3/9/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Apps from './modules/Apps';
import Todo from './modules/Todo';

describe('Edit function', () => {
  const apps = new Apps();
  const desc = 'This is changed item';
  const $item = new Todo('Jest Test', false, 1);
  apps.saveItems($item);
  apps.update(desc, 1);
  it('Edit Stored item', () => {
    expect(apps.getItems()[0].description).toBe(desc);
  });
});