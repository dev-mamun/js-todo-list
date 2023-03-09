/** ****************************************
 * Project: js-todo-list
 * File: complete.test.js
 * Created: 3/9/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Apps from './modules/Apps';
import Todo from './modules/Todo';
import Status from './modules/Status';

const apps = new Apps();

describe('Mark Completed', () => {
  apps.saveItems(new Todo('Jest Test', false, 1));
  const $items = apps.getItems();
  Status($items, 1, true);
  it('Item mark as complete', () => {
    expect($items[0].completed).toBeTruthy();
  });
});