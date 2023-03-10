/** ****************************************
 * Project: js-todo-list
 * File: Complete.js
 * Created: 3/1/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
const Status = ($items, $id, $status) => {
  $items.find((item) => item.index === $id).completed = $status;
  localStorage.setItem('items', JSON.stringify($items));
};

export default Status;