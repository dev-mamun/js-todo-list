(self["webpackChunkjs_todo_list"] = self["webpackChunkjs_todo_list"] || []).push([["app"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_Apps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Apps */ "./src/modules/Apps.js");
/** ****************************************
 * Project: js-todo-list
 * File: index.js
 * Created: 2/28/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */




/* import _ from 'lodash';
function component() {
  const element = document.createElement('div');
  // Lodash, now imported by this script
  return element;
}
document.body.appendChild(component()); */

window.addEventListener('load', function () {
  var todo = new _modules_Apps__WEBPACK_IMPORTED_MODULE_1__["default"]();
  todo.show();
  todo.events();
});

/***/ }),

/***/ "./src/modules/Apps.js":
/*!*****************************!*\
  !*** ./src/modules/Apps.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Apps)
/* harmony export */ });
/* harmony import */ var _Todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Todo */ "./src/modules/Todo.js");
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Notification */ "./src/modules/Notification.js");
/* harmony import */ var _Status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Status */ "./src/modules/Status.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/** ****************************************
 * Project: js-todo-list
 * File: index.js
 * Created: 2/28/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */



var sortArray = __webpack_require__(/*! sort-array/dist */ "./node_modules/sort-array/dist/index.js");
var Apps = /*#__PURE__*/_createClass(function Apps() {
  var _this = this;
  _classCallCheck(this, Apps);
  _defineProperty(this, "events", function () {
    // Input event to save new task
    var $input = document.getElementById('create');
    $input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.target.value !== '') {
          _this.save(e.target.value);
          e.target.value = '';
        } else {
          _Notification__WEBPACK_IMPORTED_MODULE_1__["default"].show('Please write your task', 'error');
        }
      }
    });
    // Clear all
    var $clearAll = document.getElementById('clearall');
    $clearAll.addEventListener('click', function (e) {
      e.preventDefault();
      var $checked = document.querySelectorAll('.checkbox:checked');
      $checked.forEach(function (input) {
        input.parentNode.remove();
        _this.clearComplete();
      });
    });
    // Delete a task
    _this.deleteEvent();
    // Change item description
    _this.changeEvent();
    // Update task status
    _this.changeStatus();
  });
  _defineProperty(this, "clearComplete", function () {
    _this.items = _this.items.filter(function (item) {
      return item.completed !== true;
    });
    var count = 1;
    _this.items.forEach(function (item) {
      item.index = count;
      count += 1;
    });
    _this.saveStorage(_this.items);
  });
  _defineProperty(this, "deleteEvent", function () {
    _this.controller = new AbortController();
    var $tasks = document.querySelectorAll('.delete');
    $tasks.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        _this["delete"](parseInt(e.target.dataset.id, 16));
        e.target.parentNode.remove();
      }, {
        signal: _this.controller.signal
      });
    });
  });
  _defineProperty(this, "removeEvent", function () {
    _this.controller.abort();
  });
  _defineProperty(this, "changeEvent", function () {
    _this.controller = new AbortController();
    var $inputs = document.querySelectorAll('.todo_input');
    $inputs.forEach(function (input) {
      input.addEventListener('click', function (e) {
        e.target.style.background = '#ffcb0029';
      }, {
        signal: _this.controller.signal
      });
      input.addEventListener('focusout', function (e) {
        e.target.style.background = '';
      }, {
        signal: _this.controller.signal
      });
      input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          e.target.style.background = '';
          _this.update(e.target.value, parseInt(e.target.dataset.id, 16));
        }
      }, {
        signal: _this.controller.signal
      });
    });
  });
  _defineProperty(this, "changeStatus", function () {
    _this.controller = new AbortController();
    var $checkbox = document.querySelectorAll('.checkbox');
    $checkbox.forEach(function (input) {
      input.addEventListener('change', function (e) {
        (0,_Status__WEBPACK_IMPORTED_MODULE_2__["default"])(_this.items, parseInt(e.target.dataset.id, 16), e.target.checked);
      }, {
        signal: _this.controller.signal
      });
    });
  });
  _defineProperty(this, "show", function () {
    document.getElementById('items').innerHTML = '';
    _this.items = _this.getItems();
    var items = sortArray(_this.items, {
      by: 'index'
    });
    if (items != null) {
      items.forEach(function (item) {
        return _this.addItem(item);
      });
    }
  });
  _defineProperty(this, "addItem", function (item) {
    var list = document.getElementById('items');
    var li = document.createElement('li');
    var checked = '';
    if (item.completed) {
      checked = 'checked';
    }
    li.innerHTML = "\n        <input data-id=\"".concat(item.index, "\" type=\"checkbox\" ").concat(checked, " class=\"checkbox\">\n        <input data-id=\"").concat(item.index, "\" type=\"text\" class=\"todo_input\" value=\"").concat(item.description, "\">\n        <i data-id=\"").concat(item.index, "\" class=\"fa-regular fa-trash-can delete\"></i>\n        ");
    list.appendChild(li);
  });
  _defineProperty(this, "getItems", function () {
    var $items = JSON.parse(localStorage.getItem('items'));
    if ($items) {
      return $items;
    }
    return [];
  });
  _defineProperty(this, "saveItems", function ($item) {
    _this.items.push($item);
    _this.saveStorage(_this.items);
  });
  _defineProperty(this, "save", function ($data) {
    var $item = new _Todo__WEBPACK_IMPORTED_MODULE_0__["default"]($data, false, _this.items.length + 1);
    _this.saveItems($item);
    _this.addItem($item);
    _this.removeEvent();
    _this.changeEvent();
    _this.changeStatus();
    _this.deleteEvent();
  });
  _defineProperty(this, "update", function ($desc, $id) {
    _this.items.find(function (item) {
      return item.index === $id;
    }).description = $desc;
    _this.saveStorage(_this.items);
  });
  _defineProperty(this, "delete", function ($id) {
    _this.deleteItem($id);
    _this.show();
    _this.changeEvent();
    _this.changeStatus();
    _this.deleteEvent();
  });
  _defineProperty(this, "deleteItem", function ($id) {
    _this.items = _this.items.filter(function (item) {
      return $id !== item.index;
    });
    _this.items.forEach(function (item) {
      if (item.index >= $id) {
        item.index -= 1;
      }
    });
    _this.saveStorage(_this.items);
  });
  _defineProperty(this, "saveStorage", function ($items) {
    localStorage.setItem('items', JSON.stringify($items));
  });
  this.items = [];
  this.controller = {};
});


/***/ }),

/***/ "./src/modules/Notification.js":
/*!*************************************!*\
  !*** ./src/modules/Notification.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Notification)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/** ****************************************
 * Project: js-todo-list
 * File: Notification.js
 * Created: 3/1/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
var Notification = /*#__PURE__*/_createClass(function Notification() {
  _classCallCheck(this, Notification);
});
_defineProperty(Notification, "show", function ($message, $className) {
  var msg = document.createElement('div');
  msg.className = "alert alert-".concat($className);
  msg.appendChild(document.createTextNode($message));
  var containerELement = document.getElementsByTagName('form');
  var parentDiv = containerELement[0].parentNode;
  parentDiv.insertBefore(msg, parentDiv.lastElementChild);
  setTimeout(function () {
    return document.querySelector('.alert').remove();
  }, 2000);
});


/***/ }),

/***/ "./src/modules/Status.js":
/*!*******************************!*\
  !*** ./src/modules/Status.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** ****************************************
 * Project: js-todo-list
 * File: Complete.js
 * Created: 3/1/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
var Status = function Status($items, $id, $status) {
  $items.find(function (item) {
    return item.index === $id;
  }).completed = $status;
  localStorage.setItem('items', JSON.stringify($items));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Status);

/***/ }),

/***/ "./src/modules/Todo.js":
/*!*****************************!*\
  !*** ./src/modules/Todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/** ****************************************
 * Project: js-todo-list
 * File: todo.js
 * Created: 3/1/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
var Todo = /*#__PURE__*/_createClass(function Todo(description, completed, index) {
  _classCallCheck(this, Todo);
  this.index = index;
  this.description = description;
  this.completed = completed;
});


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/common.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/common.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/**\n * Project: softexpo\n * File: common.css\n * Created: 2/14/23\n * Author: Abdullah Al Mamun <mamun1214@gmail.com>\n */\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: 'Lato', sans-serif;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n  align-items: center;\n}\n\nbutton,\ninput {\n  padding: 5px;\n  outline: none;\n}\n\n.w-90 {\n  width: 90%;\n}\n\n.text-uppercase {\n  text-transform: uppercase;\n}\n\nimg {\n  width: 15vw;\n  height: 8vh;\n}\n\n.btn-success {\n  min-width: 100px;\n  height: 40px;\n  color: #fff;\n  display: inline-block;\n  text-decoration: none;\n  font-style: normal;\n  font-weight: 800;\n  font-size: 15px;\n  line-height: 15px;\n  letter-spacing: 0.03em;\n  padding: 10px;\n  transition: 0.2s all;\n  background: #008552;\n  border-radius: 4px;\n  border: 0;\n  cursor: pointer;\n}\n\n.btn-success::before {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 0%;\n  transition: 0.2s all;\n  left: 0;\n  z-index: -10;\n}\n\n.btn-success:hover {\n  color: #fff;\n  border-color: #36b37f;\n  background: #c5e9da !important;\n}\n\n.btn-success:active {\n  background: #ebf0ee;\n}\n\n.btn-success:hover::before {\n  height: 100%;\n}\n\n.btn-danger {\n  min-width: 100px;\n  height: 40px;\n  color: #fff;\n  display: inline-block;\n  text-decoration: none;\n  font-style: normal;\n  font-weight: 800;\n  font-size: 15px;\n  padding: 10px;\n  transition: 0.2s all;\n  background: #ef523c;\n  border-radius: 4px;\n  border: 0;\n  cursor: pointer;\n}\n\n.btn-danger::before {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 0%;\n  transition: 0.2s all;\n  left: 0;\n  z-index: -10;\n}\n\n.btn-danger:hover {\n  color: #fff;\n  border-color: rgb(239 82 60);\n  background: rgb(239 82 60 / 54%) !important;\n}\n\n.btn-danger:active {\n  background: #e1270d;\n}\n\n.btn-danger:hover::before {\n  height: 100%;\n}\n\n.btn-default {\n  min-width: 100px;\n  height: 40px;\n  color: black;\n  display: inline-block;\n  text-decoration: none;\n  font-style: normal;\n  font-weight: 800;\n  font-size: 15px;\n  line-height: 15px;\n  letter-spacing: 0.03em;\n  padding: 10px;\n  transition: 0.2s all;\n  background: white;\n  border-radius: 4px;\n  border: 1px solid #d3d3d3;\n  cursor: pointer;\n}\n\n.btn-default::before {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 0%;\n  transition: 0.2s all;\n  left: 0;\n  z-index: -10;\n}\n\n.btn-default:hover {\n  color: black;\n  border-color: rgb(181 181 181);\n  background: rgb(253 253 253) !important;\n}\n\n.btn-default:active {\n  background: rgb(155 155 155);\n}\n\n.btn-default:hover::before {\n  height: 100%;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.alert-error {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n  font-size: 20px;\n  padding: 10px;\n  border-radius: 5px;\n}\n\n.alert-success {\n  color: #155724;\n  background-color: #d4edda;\n  border-color: #c3e6cb;\n  font-size: 20px;\n  padding: 10px;\n  border-radius: 5px;\n}\n", "",{"version":3,"sources":["webpack://./src/css/common.css"],"names":[],"mappings":"AAAA;;;;;EAKE;;AAEF;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,+BAA+B;EAC/B,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;;EAEE,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,WAAW;EACX,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,WAAW;EACX,qBAAqB;EACrB,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,iBAAiB;EACjB,sBAAsB;EACtB,aAAa;EACb,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;EAClB,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,UAAU;EACV,oBAAoB;EACpB,OAAO;EACP,YAAY;AACd;;AAEA;EACE,WAAW;EACX,qBAAqB;EACrB,8BAA8B;AAChC;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,WAAW;EACX,qBAAqB;EACrB,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,aAAa;EACb,oBAAoB;EACpB,mBAAmB;EACnB,kBAAkB;EAClB,SAAS;EACT,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,UAAU;EACV,oBAAoB;EACpB,OAAO;EACP,YAAY;AACd;;AAEA;EACE,WAAW;EACX,4BAA4B;EAC5B,2CAA2C;AAC7C;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,YAAY;EACZ,qBAAqB;EACrB,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,iBAAiB;EACjB,sBAAsB;EACtB,aAAa;EACb,oBAAoB;EACpB,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,UAAU;EACV,oBAAoB;EACpB,OAAO;EACP,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,8BAA8B;EAC9B,uCAAuC;AACzC;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,cAAc;EACd,yBAAyB;EACzB,qBAAqB;EACrB,eAAe;EACf,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,yBAAyB;EACzB,qBAAqB;EACrB,eAAe;EACf,aAAa;EACb,kBAAkB;AACpB","sourcesContent":["/**\n * Project: softexpo\n * File: common.css\n * Created: 2/14/23\n * Author: Abdullah Al Mamun <mamun1214@gmail.com>\n */\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: 'Lato', sans-serif;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n  align-items: center;\n}\n\nbutton,\ninput {\n  padding: 5px;\n  outline: none;\n}\n\n.w-90 {\n  width: 90%;\n}\n\n.text-uppercase {\n  text-transform: uppercase;\n}\n\nimg {\n  width: 15vw;\n  height: 8vh;\n}\n\n.btn-success {\n  min-width: 100px;\n  height: 40px;\n  color: #fff;\n  display: inline-block;\n  text-decoration: none;\n  font-style: normal;\n  font-weight: 800;\n  font-size: 15px;\n  line-height: 15px;\n  letter-spacing: 0.03em;\n  padding: 10px;\n  transition: 0.2s all;\n  background: #008552;\n  border-radius: 4px;\n  border: 0;\n  cursor: pointer;\n}\n\n.btn-success::before {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 0%;\n  transition: 0.2s all;\n  left: 0;\n  z-index: -10;\n}\n\n.btn-success:hover {\n  color: #fff;\n  border-color: #36b37f;\n  background: #c5e9da !important;\n}\n\n.btn-success:active {\n  background: #ebf0ee;\n}\n\n.btn-success:hover::before {\n  height: 100%;\n}\n\n.btn-danger {\n  min-width: 100px;\n  height: 40px;\n  color: #fff;\n  display: inline-block;\n  text-decoration: none;\n  font-style: normal;\n  font-weight: 800;\n  font-size: 15px;\n  padding: 10px;\n  transition: 0.2s all;\n  background: #ef523c;\n  border-radius: 4px;\n  border: 0;\n  cursor: pointer;\n}\n\n.btn-danger::before {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 0%;\n  transition: 0.2s all;\n  left: 0;\n  z-index: -10;\n}\n\n.btn-danger:hover {\n  color: #fff;\n  border-color: rgb(239 82 60);\n  background: rgb(239 82 60 / 54%) !important;\n}\n\n.btn-danger:active {\n  background: #e1270d;\n}\n\n.btn-danger:hover::before {\n  height: 100%;\n}\n\n.btn-default {\n  min-width: 100px;\n  height: 40px;\n  color: black;\n  display: inline-block;\n  text-decoration: none;\n  font-style: normal;\n  font-weight: 800;\n  font-size: 15px;\n  line-height: 15px;\n  letter-spacing: 0.03em;\n  padding: 10px;\n  transition: 0.2s all;\n  background: white;\n  border-radius: 4px;\n  border: 1px solid #d3d3d3;\n  cursor: pointer;\n}\n\n.btn-default::before {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 0%;\n  transition: 0.2s all;\n  left: 0;\n  z-index: -10;\n}\n\n.btn-default:hover {\n  color: black;\n  border-color: rgb(181 181 181);\n  background: rgb(253 253 253) !important;\n}\n\n.btn-default:active {\n  background: rgb(155 155 155);\n}\n\n.btn-default:hover::before {\n  height: 100%;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.alert-error {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n  font-size: 20px;\n  padding: 10px;\n  border-radius: 5px;\n}\n\n.alert-success {\n  color: #155724;\n  background-color: #d4edda;\n  border-color: #c3e6cb;\n  font-size: 20px;\n  padding: 10px;\n  border-radius: 5px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_css_common_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!./css/common.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/common.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lato&display=swap);"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_css_common_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/********************************************\n * Project: js-todo-list\n * File: style.css\n * Created: 2/28/23\n * Author: Abdullah Al Mamun <mamun1214@gmail.com>\n ********************************************/\n\nmain {\n  margin-top: 30px;\n  min-height: 350px;\n  display: grid;\n  place-items: center;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 350px;\n  height: auto;\n  border: 0.5px solid #ccc;\n}\n\n.title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 0.5px solid #ccc;\n  height: 45px;\n}\n\n.title a {\n  width: 32px;\n  padding: 5px;\n  margin-right: 15px;\n  color: gray;\n}\n\nform h1 {\n  font-size: 135%;\n  padding: 0 10px;\n}\n\n.data_input_wrapper {\n  display: flex;\n  justify-content: space-between;\n  border-bottom: 0.5px solid #ccc;\n}\n\n#enter {\n  height: 25px;\n  width: 25px;\n  align-self: center;\n  padding: 5px;\n  margin-right: 15px;\n  color: gray;\n}\n\n.data_input {\n  width: 100%;\n  border: none;\n  font-style: italic;\n  padding: 0 10px;\n}\n\n.data_input:focus {\n  outline: none;\n}\n\nform > * {\n  width: 100%;\n  height: 45px;\n}\n\n.todo_list {\n  height: 100%;\n}\n\n.todo_list li {\n  list-style: none;\n  display: flex;\n  justify-content: space-between;\n  height: 45px;\n  border-bottom: 0.5px solid #ccc;\n}\n\n.todo_list .checkbox {\n  margin: auto;\n}\n\n.todo_list li .todo_input {\n  height: 100%;\n  width: 75%;\n  border: none;\n}\n\n.todo_list li .delete {\n  width: 28px;\n  height: 28px;\n  margin: auto;\n  cursor: pointer;\n  padding: 5px;\n  color: gray;\n}\n\n.clear_completed {\n  width: 100%;\n  height: 45px;\n  background-color: #f8f8f8;\n  color: #777676;\n  border: none;\n  cursor: pointer;\n}\n\n.clear_completed:hover {\n  text-decoration: underline;\n}\n\n/* Linter */\n.checkbox:checked + .todo_input {\n  text-decoration: line-through;\n}\n\n.todo_list li .todo_input:focus {\n  border: none;\n  outline: none;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;;;;;6CAK6C;;AAK7C;EACE,gBAAgB;EAChB,iBAAiB;EACjB,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,wBAAwB;AAC1B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,+BAA+B;EAC/B,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,+BAA+B;AACjC;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,8BAA8B;EAC9B,YAAY;EACZ,+BAA+B;AACjC;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,UAAU;EACV,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,cAAc;EACd,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA,WAAW;AACX;EACE,6BAA6B;AAC/B;;AAEA;EACE,YAAY;EACZ,aAAa;AACf","sourcesContent":["/********************************************\n * Project: js-todo-list\n * File: style.css\n * Created: 2/28/23\n * Author: Abdullah Al Mamun <mamun1214@gmail.com>\n ********************************************/\n\n@import url(\"https://fonts.googleapis.com/css2?family=Lato&display=swap\");\n@import \"css/common.css\";\n\nmain {\n  margin-top: 30px;\n  min-height: 350px;\n  display: grid;\n  place-items: center;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 350px;\n  height: auto;\n  border: 0.5px solid #ccc;\n}\n\n.title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  border-bottom: 0.5px solid #ccc;\n  height: 45px;\n}\n\n.title a {\n  width: 32px;\n  padding: 5px;\n  margin-right: 15px;\n  color: gray;\n}\n\nform h1 {\n  font-size: 135%;\n  padding: 0 10px;\n}\n\n.data_input_wrapper {\n  display: flex;\n  justify-content: space-between;\n  border-bottom: 0.5px solid #ccc;\n}\n\n#enter {\n  height: 25px;\n  width: 25px;\n  align-self: center;\n  padding: 5px;\n  margin-right: 15px;\n  color: gray;\n}\n\n.data_input {\n  width: 100%;\n  border: none;\n  font-style: italic;\n  padding: 0 10px;\n}\n\n.data_input:focus {\n  outline: none;\n}\n\nform > * {\n  width: 100%;\n  height: 45px;\n}\n\n.todo_list {\n  height: 100%;\n}\n\n.todo_list li {\n  list-style: none;\n  display: flex;\n  justify-content: space-between;\n  height: 45px;\n  border-bottom: 0.5px solid #ccc;\n}\n\n.todo_list .checkbox {\n  margin: auto;\n}\n\n.todo_list li .todo_input {\n  height: 100%;\n  width: 75%;\n  border: none;\n}\n\n.todo_list li .delete {\n  width: 28px;\n  height: 28px;\n  margin: auto;\n  cursor: pointer;\n  padding: 5px;\n  color: gray;\n}\n\n.clear_completed {\n  width: 100%;\n  height: 45px;\n  background-color: #f8f8f8;\n  color: #777676;\n  border: none;\n  cursor: pointer;\n}\n\n.clear_completed:hover {\n  text-decoration: underline;\n}\n\n/* Linter */\n.checkbox:checked + .todo_input {\n  text-decoration: line-through;\n}\n\n.todo_list li .todo_input:focus {\n  border: none;\n  outline: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/sort-array/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/sort-array/dist/index.js ***!
  \***********************************************/
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, (function () { 'use strict';

  /**
   * Takes any input and guarantees an array back.
   *
   * - Converts array-like objects (e.g. `arguments`, `Set`) to a real array.
   * - Converts `undefined` to an empty array.
   * - Converts any another other, singular value (including `null`, objects and iterables other than `Set`) into an array containing that value.
   * - Ignores input which is already an array.
   *
   * @module array-back
   * @example
   * > const arrayify = require('array-back')
   *
   * > arrayify(undefined)
   * []
   *
   * > arrayify(null)
   * [ null ]
   *
   * > arrayify(0)
   * [ 0 ]
   *
   * > arrayify([ 1, 2 ])
   * [ 1, 2 ]
   *
   * > arrayify(new Set([ 1, 2 ]))
   * [ 1, 2 ]
   *
   * > function f(){ return arrayify(arguments); }
   * > f(1,2,3)
   * [ 1, 2, 3 ]
   */

  function isObject$1 (input) {
    return typeof input === 'object' && input !== null
  }

  function isArrayLike$1 (input) {
    return isObject$1(input) && typeof input.length === 'number'
  }

  /**
   * @param {*} - The input value to convert to an array
   * @returns {Array}
   * @alias module:array-back
   */
  function arrayify (input) {
    if (Array.isArray(input)) {
      return input
    } else if (input === undefined) {
      return []
    } else if (isArrayLike$1(input) || input instanceof Set) {
      return Array.from(input)
    } else {
      return [input]
    }
  }

  /**
   * Isomorphic, functional type-checking for Javascript.
   * @module typical
   * @typicalname t
   * @example
   * const t = require('typical')
   * const allDefined = array.every(t.isDefined)
   */

  /**
   * Returns true if input is a number. It is a more reasonable alternative to `typeof n` which returns `number` for `NaN` and `Infinity`.
   *
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   * @example
   * > t.isNumber(0)
   * true
   * > t.isNumber(1)
   * true
   * > t.isNumber(1.1)
   * true
   * > t.isNumber(0xff)
   * true
   * > t.isNumber(0644)
   * true
   * > t.isNumber(6.2e5)
   * true
   * > t.isNumber(NaN)
   * false
   * > t.isNumber(Infinity)
   * false
   */
  function isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  /**
   * A plain object is a simple object literal, it is not an instance of a class. Returns true if the input `typeof` is `object` and directly decends from `Object`.
   *
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   * @example
   * > t.isPlainObject({ something: 'one' })
   * true
   * > t.isPlainObject(new Date())
   * false
   * > t.isPlainObject([ 0, 1 ])
   * false
   * > t.isPlainObject(/test/)
   * false
   * > t.isPlainObject(1)
   * false
   * > t.isPlainObject('one')
   * false
   * > t.isPlainObject(null)
   * false
   * > t.isPlainObject((function * () {})())
   * false
   * > t.isPlainObject(function * () {})
   * false
   */
  function isPlainObject (input) {
    return input !== null && typeof input === 'object' && input.constructor === Object
  }

  /**
   * An array-like value has all the properties of an array yet is not an array instance. An example is the `arguments` object. Returns `true`` if the input value is an object, not `null`` and has a `length` property set with a numeric value.
   *
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   * @example
   * function sum(x, y){
   *   console.log(t.isArrayLike(arguments))
   *   // prints `true`
   * }
   */
  function isArrayLike (input) {
    return isObject(input) && typeof input.length === 'number'
  }

  /**
   * Returns true if the typeof input is `'object'` but not null.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isObject (input) {
    return typeof input === 'object' && input !== null
  }

  /**
   * Returns true if the input value is defined.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isDefined (input) {
    return typeof input !== 'undefined'
  }

  /**
   * Returns true if the input value is undefined.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isUndefined (input) {
    return !isDefined(input)
  }

  /**
   * Returns true if the input value is null.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isNull (input) {
   return input === null
  }

  /**
   * Returns true if the input value is not one of `undefined`, `null`, or `NaN`.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isDefinedValue (input) {
   return isDefined(input) && !isNull(input) && !Number.isNaN(input)
  }

  /**
   * Returns true if the input value is an ES2015 `class`.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isClass (input) {
    if (typeof input === 'function') {
      return /^class /.test(Function.prototype.toString.call(input))
    } else {
      return false
    }
  }

  /**
   * Returns true if the input is a string, number, symbol, boolean, null or undefined value.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isPrimitive (input) {
    if (input === null) return true
    switch (typeof input) {
      case 'string':
      case 'number':
      case 'symbol':
      case 'undefined':
      case 'boolean':
        return true
      default:
        return false
    }
  }

  /**
   * Returns true if the input is a Promise.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isPromise (input) {
    if (input) {
      const isPromise = isDefined(Promise) && input instanceof Promise;
      const isThenable = input.then && typeof input.then === 'function';
      return !!(isPromise || isThenable)
    } else {
      return false
    }
  }

  /**
   * Returns true if the input is an iterable (`Map`, `Set`, `Array`, Generator etc.).
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   * @example
   * > t.isIterable('string')
   * true
   * > t.isIterable(new Map())
   * true
   * > t.isIterable([])
   * true
   * > t.isIterable((function * () {})())
   * true
   * > t.isIterable(Promise.resolve())
   * false
   * > t.isIterable(Promise)
   * false
   * > t.isIterable(true)
   * false
   * > t.isIterable({})
   * false
   * > t.isIterable(0)
   * false
   * > t.isIterable(1.1)
   * false
   * > t.isIterable(NaN)
   * false
   * > t.isIterable(Infinity)
   * false
   * > t.isIterable(function () {})
   * false
   * > t.isIterable(Date)
   * false
   * > t.isIterable()
   * false
   * > t.isIterable({ then: function () {} })
   * false
   */
  function isIterable (input) {
    if (input === null || !isDefined(input)) {
      return false
    } else {
      return (
        typeof input[Symbol.iterator] === 'function' ||
        typeof input[Symbol.asyncIterator] === 'function'
      )
    }
  }

  /**
   * Returns true if the input value is a string. The equivalent of `typeof input === 'string'` for use in funcitonal contexts.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isString (input) {
    return typeof input === 'string'
  }

  /**
   * Returns true if the input value is a function. The equivalent of `typeof input === 'function'` for use in funcitonal contexts.
   * @param {*} - the input to test
   * @returns {boolean}
   * @static
   */
  function isFunction (input) {
    return typeof input === 'function'
  }

  var t = {
    isNumber,
    isPlainObject,
    isArrayLike,
    isObject,
    isDefined,
    isUndefined,
    isNull,
    isDefinedValue,
    isClass,
    isPrimitive,
    isPromise,
    isIterable,
    isString,
    isFunction
  };

  /**
   * Isomorphic, load-anywhere function to sort an array by scalar, deep or computed values in any standard or custom order.
   *
   * @module sort-array
   * @typicalname sortArray
   * @example
   * const sortArray = require('sort-array')
   */

  /**
   * @param {Array} array - The input array to sort. It is sorted in place.
   * @param {object} [options] - Sort options.
   * @param {string[]} [options.by] - One or more property names or computed fields to sort by. Specifying property names is only relevant when sorting an array of objects.
   * @param {string[]} [options.order] - One or more sort orders. Specify `'asc'`, `'desc'` or a property name from the `options.customOrders` object.
   * @param {object} [options.customOrders] - A dictionary object containing one or more custom orders. Each custom order value must be an array defining the order expected values must be sorted in.
   * @param {object} [options.computed] - A dictionary object containing one or more computed field functions. The function will be invoked once per item in the array. Each invocation will receive the array item as input and must return a primitive value by which the array can be sorted.
   * @param {number} [options.nullRank] - Configures whether `null` values will be sorted before or after defined values. Set to `-1` for before, `1` for after. Defaults to `1`.
   * @param {number} [options.undefinedRank] - Configures whether `undefined` values will be sorted before or after defined values. Set to `-1` for before, `1` for after. Defaults to `1`.
   * @returns {Array} Returns the array that was passed in.
   * @alias module:sort-array
   */
  function sortArray (arr, options = {}) {
    options = Object.assign(
      {
        computed: {},
        customOrders: {},
        nullRank: 1,
        undefinedRank: 1
      },
      options
    );
    arr.sort(getCompareFunc(options));
    return arr
  }

  function getCompareFunc (options = {}) {
    const by = arrayify(options.by);
    const order = arrayify(options.order);
    const { customOrders, computed } = options;
    return function compareFunc (xIn, yIn, byIndex = 0) {
      const currOrder = order[byIndex] || 'asc';
      if (!(currOrder === 'asc' || currOrder === 'desc' || customOrders[currOrder])) {
        return 0
      }

      let result, x, y;
      if (by.length) {
        x = t.isDefined(xIn[by[byIndex]])
          ? xIn[by[byIndex]]
          : computed[by[byIndex]] && computed[by[byIndex]](xIn);
        y = t.isDefined(yIn[by[byIndex]])
          ? yIn[by[byIndex]]
          : computed[by[byIndex]] && computed[by[byIndex]](yIn);
      } else {
        x = xIn;
        y = yIn;
      }

      if (customOrders && customOrders[currOrder]) {
        result = customOrders[currOrder].indexOf(x) - customOrders[currOrder].indexOf(y);
      } else if (x === y) {
        result = 0;
      } else if (t.isNull(x) && t.isUndefined(y)) {
        result = currOrder === 'asc'
          ? 1
          : currOrder === 'desc'
            ? -1
            : 0;
      } else if (t.isUndefined(x) && t.isNull(y)) {
        result = currOrder === 'asc'
          ? -1
          : currOrder === 'desc'
            ? 1
            : 0;
      } else if (t.isNull(x) && t.isDefinedValue(y)) {
        result = options.nullRank;
      } else if (t.isUndefined(x) && t.isDefinedValue(y)) {
        result = options.undefinedRank;
      } else if (t.isNull(y) && t.isDefinedValue(x)) {
        result = -options.nullRank;
      } else if (t.isUndefined(y) && t.isDefinedValue(x)) {
        result = -options.undefinedRank;
      } else {
        result = x < y ? -1 : x > y ? 1 : 0;
        if (currOrder === 'desc') {
          result = result * -1;
        }
      }
      if (result === 0 && t.isDefined(by[byIndex + 1])) {
        result = compareFunc(xIn, yIn, byIndex + 1);
      }
      return result
    }
  }

  return sortArray;

})));


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=app.bundle.js.map