/** ****************************************
 * Project: js-todo-list
 * File: add.test.js
 * Created: 3/8/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Todo from './modules/Apps';

const todo = new Todo();
describe('Add function', () => {
  it('Store item in local storage', () => {
    todo.saveItems('jest test');
    expect(todo.getItems()).toBeDefined();
  });

  it('Get items from local storage', () => {
    expect(todo.getItems()).not.toBeNull();
  });
});