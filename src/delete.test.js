/** ****************************************
 * Project: js-todo-list
 * File: delete.test.js
 * Created: 3/8/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
import Todo from './modules/Apps.js';

const todo = new Todo();
describe('delete item', () => {
  it('delete item', () => {
    todo.deleteItem(0);
    expect(todo.getItems()).toEqual([]);
  });
});