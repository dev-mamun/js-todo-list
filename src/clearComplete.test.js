/** ****************************************
 * Project: js-todo-list
 * File: clearComplete.test.js
 * Created: 3/9/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Apps from './modules/Apps';
import Todo from './modules/Todo';

const apps = new Apps();

describe('Clear Complete', () => {
  apps.saveItems(new Todo('Jest Test', false, 1));
  apps.saveItems(new Todo('Jest Test 1', true, 2));
  apps.saveItems(new Todo('Jest Test 3', true, 3));
  apps.clearComplete();
  it('Clear Complete Item', () => {
    expect(apps.getItems().length).toBe(1);
  });
});