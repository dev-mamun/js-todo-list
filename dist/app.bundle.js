"use strict";
(self["webpackChunkjs_todo_list"] = self["webpackChunkjs_todo_list"] || []).push([["app"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_Apps_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Apps.js */ "./src/modules/Apps.js");
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
  var todo = new _modules_Apps_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  todo.show();
  todo.events();
});

/***/ }),

/***/ "./src/modules/Apps.js":
/*!*****************************!*\
  !*** ./src/modules/Apps.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Apps)
/* harmony export */ });
/* harmony import */ var _node_modules_sort_array_dist_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/sort-array/dist/index.mjs */ "./node_modules/sort-array/dist/index.mjs");
/* harmony import */ var _Todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Todo.js */ "./src/modules/Todo.js");
/* harmony import */ var _Notification_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Notification.js */ "./src/modules/Notification.js");
/* harmony import */ var _Status_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Status.js */ "./src/modules/Status.js");
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
          _Notification_js__WEBPACK_IMPORTED_MODULE_2__["default"].show('Please write your task', 'error');
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
    });
    // Delete a task
    _this.deleteEvent();
    // Change item description
    _this.changeEvent();
    // Update task status
    _this.changeStatus();
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
        (0,_Status_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_this.items, parseInt(e.target.dataset.id, 16), e.target.checked);
      }, {
        signal: _this.controller.signal
      });
    });
  });
  _defineProperty(this, "show", function () {
    document.getElementById('items').innerHTML = '';
    _this.items = _this.getItems();
    var items = (0,_node_modules_sort_array_dist_index_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(_this.items, {
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
    var $item = new _Todo_js__WEBPACK_IMPORTED_MODULE_1__["default"]($data, false, _this.items.length + 1);
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
    _this.items = _this.items.filter(function (item) {
      return $id !== item.index;
    });
    _this.items.forEach(function (item) {
      if (item.index >= $id) {
        item.index -= 1;
      }
    });
    _this.saveStorage(_this.items);
    _this.show();
    _this.changeEvent();
    _this.changeStatus();
    _this.deleteEvent();
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Status)
/* harmony export */ });
/** ****************************************
 * Project: js-todo-list
 * File: Complete.js
 * Created: 3/1/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 ****************************************** */
function Status($items, $id, $status) {
  $items.find(function (item) {
    return item.index === $id;
  }).completed = $status;
  localStorage.setItem('items', JSON.stringify($items));
}

/***/ }),

/***/ "./src/modules/Todo.js":
/*!*****************************!*\
  !*** ./src/modules/Todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./node_modules/sort-array/dist/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/sort-array/dist/index.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortArray);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxTQUFTLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vanMtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvQXBwcy5qcyIsIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Ob3RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vanMtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvU3RhdHVzLmpzIiwid2VicGFjazovL2pzLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1RvZG8uanMiLCJ3ZWJwYWNrOi8vanMtdG9kby1saXN0Ly4vc3JjL2Nzcy9jb21tb24uY3NzIiwid2VicGFjazovL2pzLXRvZG8tbGlzdC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vanMtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vanMtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2pzLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vanMtdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2pzLXRvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9qcy10b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc29ydC1hcnJheS9kaXN0L2luZGV4Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogUHJvamVjdDoganMtdG9kby1saXN0XG4gKiBGaWxlOiBpbmRleC5qc1xuICogQ3JlYXRlZDogMi8yOC8yM1xuICogQXV0aG9yOiBBYmR1bGxhaCBBbCBNYW11biA8bWFtdW4xMjE0QGdtYWlsLmNvbT5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgVG9kbyBmcm9tICcuL21vZHVsZXMvQXBwcy5qcyc7XG5cbi8qIGltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5mdW5jdGlvbiBjb21wb25lbnQoKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgLy8gTG9kYXNoLCBub3cgaW1wb3J0ZWQgYnkgdGhpcyBzY3JpcHRcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudCgpKTsgKi9cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIGNvbnN0IHRvZG8gPSBuZXcgVG9kbygpO1xuICB0b2RvLnNob3coKTtcbiAgdG9kby5ldmVudHMoKTtcbn0pO1xuIiwiLyoqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFByb2plY3Q6IGpzLXRvZG8tbGlzdFxuICogRmlsZTogaW5kZXguanNcbiAqIENyZWF0ZWQ6IDIvMjgvMjNcbiAqIEF1dGhvcjogQWJkdWxsYWggQWwgTWFtdW4gPG1hbXVuMTIxNEBnbWFpbC5jb20+XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cbmltcG9ydCBzb3J0QXJyYXkgZnJvbSAnLi4vLi4vbm9kZV9tb2R1bGVzL3NvcnQtYXJyYXkvZGlzdC9pbmRleC5tanMnO1xuaW1wb3J0IFRvZG8gZnJvbSAnLi9Ub2RvLmpzJztcbmltcG9ydCBOb3RpZnkgZnJvbSAnLi9Ob3RpZmljYXRpb24uanMnO1xuaW1wb3J0IFN0YXR1cyBmcm9tICcuL1N0YXR1cy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcHMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gICAgdGhpcy5jb250cm9sbGVyID0ge307XG4gIH1cblxuICBldmVudHMgPSAoKSA9PiB7XG4gICAgLy8gSW5wdXQgZXZlbnQgdG8gc2F2ZSBuZXcgdGFza1xuICAgIGNvbnN0ICRpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUnKTtcbiAgICAkaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlICE9PSAnJykge1xuICAgICAgICAgIHRoaXMuc2F2ZShlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgZS50YXJnZXQudmFsdWUgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBOb3RpZnkuc2hvdygnUGxlYXNlIHdyaXRlIHlvdXIgdGFzaycsICdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gQ2xlYXIgYWxsXG4gICAgY29uc3QgJGNsZWFyQWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyYWxsJyk7XG4gICAgJGNsZWFyQWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0ICRjaGVja2VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrYm94OmNoZWNrZWQnKTtcbiAgICAgICRjaGVja2VkLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAgIGlucHV0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jb21wbGV0ZWQgIT09IHRydWUpO1xuICAgICAgICBsZXQgY291bnQgPSAxO1xuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmluZGV4ID0gY291bnQ7XG4gICAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2F2ZVN0b3JhZ2UodGhpcy5pdGVtcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBEZWxldGUgYSB0YXNrXG4gICAgdGhpcy5kZWxldGVFdmVudCgpO1xuICAgIC8vIENoYW5nZSBpdGVtIGRlc2NyaXB0aW9uXG4gICAgdGhpcy5jaGFuZ2VFdmVudCgpO1xuICAgIC8vIFVwZGF0ZSB0YXNrIHN0YXR1c1xuICAgIHRoaXMuY2hhbmdlU3RhdHVzKCk7XG4gIH07XG5cbiAgZGVsZXRlRXZlbnQgPSAoKSA9PiB7XG4gICAgdGhpcy5jb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGNvbnN0ICR0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGUnKTtcbiAgICAkdGFza3MuZm9yRWFjaCgoYnRuKSA9PiB7XG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZGVsZXRlKHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaWQsIDE2KSk7XG4gICAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gICAgICB9LCB7IHNpZ25hbDogdGhpcy5jb250cm9sbGVyLnNpZ25hbCB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZW1vdmVFdmVudCA9ICgpID0+IHtcbiAgICB0aGlzLmNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgfTtcblxuICBjaGFuZ2VFdmVudCA9ICgpID0+IHtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgY29uc3QgJGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvX2lucHV0Jyk7XG4gICAgJGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmNiMDAyOSc7XG4gICAgICB9LCB7IHNpZ25hbDogdGhpcy5jb250cm9sbGVyLnNpZ25hbCB9KTtcbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKGUpID0+IHtcbiAgICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgfSwgeyBzaWduYWw6IHRoaXMuY29udHJvbGxlci5zaWduYWwgfSk7XG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgICAgICB0aGlzLnVwZGF0ZShlLnRhcmdldC52YWx1ZSwgcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pZCwgMTYpKTtcbiAgICAgICAgfVxuICAgICAgfSwgeyBzaWduYWw6IHRoaXMuY29udHJvbGxlci5zaWduYWwgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY2hhbmdlU3RhdHVzID0gKCkgPT4ge1xuICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICBjb25zdCAkY2hlY2tib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlY2tib3gnKTtcbiAgICAkY2hlY2tib3guZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XG4gICAgICAgIFN0YXR1cyh0aGlzLml0ZW1zLCBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmlkLCAxNiksIGUudGFyZ2V0LmNoZWNrZWQpO1xuICAgICAgfSwgeyBzaWduYWw6IHRoaXMuY29udHJvbGxlci5zaWduYWwgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgc2hvdyA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlbXMnKS5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5nZXRJdGVtcygpO1xuICAgIGNvbnN0IGl0ZW1zID0gc29ydEFycmF5KHRoaXMuaXRlbXMsIHtcbiAgICAgIGJ5OiAnaW5kZXgnLFxuICAgIH0pO1xuICAgIGlmIChpdGVtcyAhPSBudWxsKSB7XG4gICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB0aGlzLmFkZEl0ZW0oaXRlbSkpO1xuICAgIH1cbiAgfTtcblxuICBhZGRJdGVtID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW1zJyk7XG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGxldCBjaGVja2VkID0gJyc7XG4gICAgaWYgKGl0ZW0uY29tcGxldGVkKSB7XG4gICAgICBjaGVja2VkID0gJ2NoZWNrZWQnO1xuICAgIH1cbiAgICBsaS5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxpbnB1dCBkYXRhLWlkPVwiJHtpdGVtLmluZGV4fVwiIHR5cGU9XCJjaGVja2JveFwiICR7Y2hlY2tlZH0gY2xhc3M9XCJjaGVja2JveFwiPlxuICAgICAgICA8aW5wdXQgZGF0YS1pZD1cIiR7aXRlbS5pbmRleH1cIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwidG9kb19pbnB1dFwiIHZhbHVlPVwiJHtpdGVtLmRlc2NyaXB0aW9ufVwiPlxuICAgICAgICA8aSBkYXRhLWlkPVwiJHtpdGVtLmluZGV4fVwiIGNsYXNzPVwiZmEtcmVndWxhciBmYS10cmFzaC1jYW4gZGVsZXRlXCI+PC9pPlxuICAgICAgICBgO1xuICAgIGxpc3QuYXBwZW5kQ2hpbGQobGkpO1xuICB9O1xuXG4gIGdldEl0ZW1zID0gKCkgPT4ge1xuICAgIGNvbnN0ICRpdGVtcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2l0ZW1zJykpO1xuICAgIGlmICgkaXRlbXMpIHtcbiAgICAgIHJldHVybiAkaXRlbXM7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfTtcblxuICBzYXZlSXRlbXMgPSAoJGl0ZW0pID0+IHtcbiAgICB0aGlzLml0ZW1zLnB1c2goJGl0ZW0pO1xuICAgIHRoaXMuc2F2ZVN0b3JhZ2UodGhpcy5pdGVtcyk7XG4gIH07XG5cbiAgc2F2ZSA9ICgkZGF0YSkgPT4ge1xuICAgIGNvbnN0ICRpdGVtID0gbmV3IFRvZG8oJGRhdGEsIGZhbHNlLCB0aGlzLml0ZW1zLmxlbmd0aCArIDEpO1xuICAgIHRoaXMuc2F2ZUl0ZW1zKCRpdGVtKTtcbiAgICB0aGlzLmFkZEl0ZW0oJGl0ZW0pO1xuICAgIHRoaXMucmVtb3ZlRXZlbnQoKTtcbiAgICB0aGlzLmNoYW5nZUV2ZW50KCk7XG4gICAgdGhpcy5jaGFuZ2VTdGF0dXMoKTtcbiAgICB0aGlzLmRlbGV0ZUV2ZW50KCk7XG4gIH07XG5cbiAgdXBkYXRlID0gKCRkZXNjLCAkaWQpID0+IHtcbiAgICB0aGlzLml0ZW1zLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaW5kZXggPT09ICRpZCkuZGVzY3JpcHRpb24gPSAkZGVzYztcbiAgICB0aGlzLnNhdmVTdG9yYWdlKHRoaXMuaXRlbXMpO1xuICB9O1xuXG4gIGRlbGV0ZSA9ICgkaWQpID0+IHtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoKGl0ZW0pID0+ICRpZCAhPT0gaXRlbS5pbmRleCk7XG4gICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5pbmRleCA+PSAkaWQpIHtcbiAgICAgICAgaXRlbS5pbmRleCAtPSAxO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc2F2ZVN0b3JhZ2UodGhpcy5pdGVtcyk7XG4gICAgdGhpcy5zaG93KCk7XG4gICAgdGhpcy5jaGFuZ2VFdmVudCgpO1xuICAgIHRoaXMuY2hhbmdlU3RhdHVzKCk7XG4gICAgdGhpcy5kZWxldGVFdmVudCgpO1xuICB9O1xuXG4gIHNhdmVTdG9yYWdlID0gKCRpdGVtcykgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpdGVtcycsIEpTT04uc3RyaW5naWZ5KCRpdGVtcykpO1xuICB9O1xufSIsIi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBQcm9qZWN0OiBqcy10b2RvLWxpc3RcbiAqIEZpbGU6IE5vdGlmaWNhdGlvbi5qc1xuICogQ3JlYXRlZDogMy8xLzIzXG4gKiBBdXRob3I6IEFiZHVsbGFoIEFsIE1hbXVuIDxtYW11bjEyMTRAZ21haWwuY29tPlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RpZmljYXRpb24ge1xuICBzdGF0aWMgc2hvdyA9ICgkbWVzc2FnZSwgJGNsYXNzTmFtZSkgPT4ge1xuICAgIGNvbnN0IG1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1zZy5jbGFzc05hbWUgPSBgYWxlcnQgYWxlcnQtJHskY2xhc3NOYW1lfWA7XG4gICAgbXNnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCRtZXNzYWdlKSk7XG4gICAgY29uc3QgY29udGFpbmVyRUxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJyk7XG4gICAgY29uc3QgcGFyZW50RGl2ID0gY29udGFpbmVyRUxlbWVudFswXS5wYXJlbnROb2RlO1xuICAgIHBhcmVudERpdi5pbnNlcnRCZWZvcmUobXNnLCBwYXJlbnREaXYubGFzdEVsZW1lbnRDaGlsZCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQnKS5yZW1vdmUoKSwgMjAwMCk7XG4gIH1cbn0iLCIvKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogUHJvamVjdDoganMtdG9kby1saXN0XG4gKiBGaWxlOiBDb21wbGV0ZS5qc1xuICogQ3JlYXRlZDogMy8xLzIzXG4gKiBBdXRob3I6IEFiZHVsbGFoIEFsIE1hbXVuIDxtYW11bjEyMTRAZ21haWwuY29tPlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RhdHVzKCRpdGVtcywgJGlkLCAkc3RhdHVzKSB7XG4gICRpdGVtcy5maW5kKChpdGVtKSA9PiBpdGVtLmluZGV4ID09PSAkaWQpLmNvbXBsZXRlZCA9ICRzdGF0dXM7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpdGVtcycsIEpTT04uc3RyaW5naWZ5KCRpdGVtcykpO1xufSIsIi8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBQcm9qZWN0OiBqcy10b2RvLWxpc3RcbiAqIEZpbGU6IHRvZG8uanNcbiAqIENyZWF0ZWQ6IDMvMS8yM1xuICogQXV0aG9yOiBBYmR1bGxhaCBBbCBNYW11biA8bWFtdW4xMjE0QGdtYWlsLmNvbT5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG8ge1xuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBpbmRleCkge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG4gIH1cbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qKlxcbiAqIFByb2plY3Q6IHNvZnRleHBvXFxuICogRmlsZTogY29tbW9uLmNzc1xcbiAqIENyZWF0ZWQ6IDIvMTQvMjNcXG4gKiBBdXRob3I6IEFiZHVsbGFoIEFsIE1hbXVuIDxtYW11bjEyMTRAZ21haWwuY29tPlxcbiAqL1xcblxcbioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6ICdMYXRvJywgc2Fucy1zZXJpZjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5idXR0b24sXFxuaW5wdXQge1xcbiAgcGFkZGluZzogNXB4O1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLnctOTAge1xcbiAgd2lkdGg6IDkwJTtcXG59XFxuXFxuLnRleHQtdXBwZXJjYXNlIHtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcblxcbmltZyB7XFxuICB3aWR0aDogMTV2dztcXG4gIGhlaWdodDogOHZoO1xcbn1cXG5cXG4uYnRuLXN1Y2Nlc3Mge1xcbiAgbWluLXdpZHRoOiAxMDBweDtcXG4gIGhlaWdodDogNDBweDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIGxpbmUtaGVpZ2h0OiAxNXB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB0cmFuc2l0aW9uOiAwLjJzIGFsbDtcXG4gIGJhY2tncm91bmQ6ICMwMDg1NTI7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBib3JkZXI6IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5idG4tc3VjY2Vzczo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDAlO1xcbiAgdHJhbnNpdGlvbjogMC4ycyBhbGw7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogLTEwO1xcbn1cXG5cXG4uYnRuLXN1Y2Nlc3M6aG92ZXIge1xcbiAgY29sb3I6ICNmZmY7XFxuICBib3JkZXItY29sb3I6ICMzNmIzN2Y7XFxuICBiYWNrZ3JvdW5kOiAjYzVlOWRhICFpbXBvcnRhbnQ7XFxufVxcblxcbi5idG4tc3VjY2VzczphY3RpdmUge1xcbiAgYmFja2dyb3VuZDogI2ViZjBlZTtcXG59XFxuXFxuLmJ0bi1zdWNjZXNzOmhvdmVyOjpiZWZvcmUge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uYnRuLWRhbmdlciB7XFxuICBtaW4td2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgY29sb3I6ICNmZmY7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogODAwO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIHRyYW5zaXRpb246IDAuMnMgYWxsO1xcbiAgYmFja2dyb3VuZDogI2VmNTIzYztcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGJvcmRlcjogMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmJ0bi1kYW5nZXI6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAwJTtcXG4gIHRyYW5zaXRpb246IDAuMnMgYWxsO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IC0xMDtcXG59XFxuXFxuLmJ0bi1kYW5nZXI6aG92ZXIge1xcbiAgY29sb3I6ICNmZmY7XFxuICBib3JkZXItY29sb3I6IHJnYigyMzkgODIgNjApO1xcbiAgYmFja2dyb3VuZDogcmdiKDIzOSA4MiA2MCAvIDU0JSkgIWltcG9ydGFudDtcXG59XFxuXFxuLmJ0bi1kYW5nZXI6YWN0aXZlIHtcXG4gIGJhY2tncm91bmQ6ICNlMTI3MGQ7XFxufVxcblxcbi5idG4tZGFuZ2VyOmhvdmVyOjpiZWZvcmUge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uYnRuLWRlZmF1bHQge1xcbiAgbWluLXdpZHRoOiAxMDBweDtcXG4gIGhlaWdodDogNDBweDtcXG4gIGNvbG9yOiBibGFjaztcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA4MDA7XFxuICBmb250LXNpemU6IDE1cHg7XFxuICBsaW5lLWhlaWdodDogMTVweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgdHJhbnNpdGlvbjogMC4ycyBhbGw7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkM2QzZDM7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5idG4tZGVmYXVsdDo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDAlO1xcbiAgdHJhbnNpdGlvbjogMC4ycyBhbGw7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogLTEwO1xcbn1cXG5cXG4uYnRuLWRlZmF1bHQ6aG92ZXIge1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2IoMTgxIDE4MSAxODEpO1xcbiAgYmFja2dyb3VuZDogcmdiKDI1MyAyNTMgMjUzKSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uYnRuLWRlZmF1bHQ6YWN0aXZlIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNTUgMTU1IDE1NSk7XFxufVxcblxcbi5idG4tZGVmYXVsdDpob3Zlcjo6YmVmb3JlIHtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbi5hbGVydC1lcnJvciB7XFxuICBjb2xvcjogIzcyMWMyNDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGQ3ZGE7XFxuICBib3JkZXItY29sb3I6ICNmNWM2Y2I7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4uYWxlcnQtc3VjY2VzcyB7XFxuICBjb2xvcjogIzE1NTcyNDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkNGVkZGE7XFxuICBib3JkZXItY29sb3I6ICNjM2U2Y2I7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY3NzL2NvbW1vbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7O0VBS0U7O0FBRUY7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLCtCQUErQjtFQUMvQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUVBOztFQUVFLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsV0FBVztBQUNiOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixXQUFXO0VBQ1gscUJBQXFCO0VBQ3JCLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsU0FBUztFQUNULFdBQVc7RUFDWCxVQUFVO0VBQ1Ysb0JBQW9CO0VBQ3BCLE9BQU87RUFDUCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0VBQ1gscUJBQXFCO0VBQ3JCLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osV0FBVztFQUNYLHFCQUFxQjtFQUNyQixxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsYUFBYTtFQUNiLG9CQUFvQjtFQUNwQixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsV0FBVztFQUNYLFVBQVU7RUFDVixvQkFBb0I7RUFDcEIsT0FBTztFQUNQLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7RUFDWCw0QkFBNEI7RUFDNUIsMkNBQTJDO0FBQzdDOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixvQkFBb0I7RUFDcEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsU0FBUztFQUNULFdBQVc7RUFDWCxVQUFVO0VBQ1Ysb0JBQW9CO0VBQ3BCLE9BQU87RUFDUCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0VBQ1osOEJBQThCO0VBQzlCLHVDQUF1QztBQUN6Qzs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCx5QkFBeUI7RUFDekIscUJBQXFCO0VBQ3JCLGVBQWU7RUFDZixhQUFhO0VBQ2Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsY0FBYztFQUNkLHlCQUF5QjtFQUN6QixxQkFBcUI7RUFDckIsZUFBZTtFQUNmLGFBQWE7RUFDYixrQkFBa0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqXFxuICogUHJvamVjdDogc29mdGV4cG9cXG4gKiBGaWxlOiBjb21tb24uY3NzXFxuICogQ3JlYXRlZDogMi8xNC8yM1xcbiAqIEF1dGhvcjogQWJkdWxsYWggQWwgTWFtdW4gPG1hbXVuMTIxNEBnbWFpbC5jb20+XFxuICovXFxuXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogJ0xhdG8nLCBzYW5zLXNlcmlmO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbixcXG5pbnB1dCB7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4udy05MCB7XFxuICB3aWR0aDogOTAlO1xcbn1cXG5cXG4udGV4dC11cHBlcmNhc2Uge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuaW1nIHtcXG4gIHdpZHRoOiAxNXZ3O1xcbiAgaGVpZ2h0OiA4dmg7XFxufVxcblxcbi5idG4tc3VjY2VzcyB7XFxuICBtaW4td2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgY29sb3I6ICNmZmY7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogODAwO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgbGluZS1oZWlnaHQ6IDE1cHg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4wM2VtO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIHRyYW5zaXRpb246IDAuMnMgYWxsO1xcbiAgYmFja2dyb3VuZDogIzAwODU1MjtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGJvcmRlcjogMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmJ0bi1zdWNjZXNzOjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMCU7XFxuICB0cmFuc2l0aW9uOiAwLjJzIGFsbDtcXG4gIGxlZnQ6IDA7XFxuICB6LWluZGV4OiAtMTA7XFxufVxcblxcbi5idG4tc3VjY2Vzczpob3ZlciB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJvcmRlci1jb2xvcjogIzM2YjM3ZjtcXG4gIGJhY2tncm91bmQ6ICNjNWU5ZGEgIWltcG9ydGFudDtcXG59XFxuXFxuLmJ0bi1zdWNjZXNzOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kOiAjZWJmMGVlO1xcbn1cXG5cXG4uYnRuLXN1Y2Nlc3M6aG92ZXI6OmJlZm9yZSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5idG4tZGFuZ2VyIHtcXG4gIG1pbi13aWR0aDogMTAwcHg7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA4MDA7XFxuICBmb250LXNpemU6IDE1cHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgdHJhbnNpdGlvbjogMC4ycyBhbGw7XFxuICBiYWNrZ3JvdW5kOiAjZWY1MjNjO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYm9yZGVyOiAwO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYnRuLWRhbmdlcjo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDAlO1xcbiAgdHJhbnNpdGlvbjogMC4ycyBhbGw7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogLTEwO1xcbn1cXG5cXG4uYnRuLWRhbmdlcjpob3ZlciB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJvcmRlci1jb2xvcjogcmdiKDIzOSA4MiA2MCk7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjM5IDgyIDYwIC8gNTQlKSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uYnRuLWRhbmdlcjphY3RpdmUge1xcbiAgYmFja2dyb3VuZDogI2UxMjcwZDtcXG59XFxuXFxuLmJ0bi1kYW5nZXI6aG92ZXI6OmJlZm9yZSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5idG4tZGVmYXVsdCB7XFxuICBtaW4td2lkdGg6IDEwMHB4O1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIGxpbmUtaGVpZ2h0OiAxNXB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB0cmFuc2l0aW9uOiAwLjJzIGFsbDtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2QzZDNkMztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmJ0bi1kZWZhdWx0OjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMCU7XFxuICB0cmFuc2l0aW9uOiAwLjJzIGFsbDtcXG4gIGxlZnQ6IDA7XFxuICB6LWluZGV4OiAtMTA7XFxufVxcblxcbi5idG4tZGVmYXVsdDpob3ZlciB7XFxuICBjb2xvcjogYmxhY2s7XFxuICBib3JkZXItY29sb3I6IHJnYigxODEgMTgxIDE4MSk7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjUzIDI1MyAyNTMpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5idG4tZGVmYXVsdDphY3RpdmUge1xcbiAgYmFja2dyb3VuZDogcmdiKDE1NSAxNTUgMTU1KTtcXG59XFxuXFxuLmJ0bi1kZWZhdWx0OmhvdmVyOjpiZWZvcmUge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxuLmFsZXJ0LWVycm9yIHtcXG4gIGNvbG9yOiAjNzIxYzI0O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZDdkYTtcXG4gIGJvcmRlci1jb2xvcjogI2Y1YzZjYjtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5hbGVydC1zdWNjZXNzIHtcXG4gIGNvbG9yOiAjMTU1NzI0O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q0ZWRkYTtcXG4gIGJvcmRlci1jb2xvcjogI2MzZTZjYjtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzBfX18gZnJvbSBcIi0hLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jc3MvY29tbW9uLmNzc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TGF0byZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcXG4gKiBQcm9qZWN0OiBqcy10b2RvLWxpc3RcXG4gKiBGaWxlOiBzdHlsZS5jc3NcXG4gKiBDcmVhdGVkOiAyLzI4LzIzXFxuICogQXV0aG9yOiBBYmR1bGxhaCBBbCBNYW11biA8bWFtdW4xMjE0QGdtYWlsLmNvbT5cXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuXFxubWFpbiB7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgbWluLWhlaWdodDogMzUwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuZm9ybSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMzUwcHg7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBib3JkZXI6IDAuNXB4IHNvbGlkICNjY2M7XFxufVxcblxcbi50aXRsZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGJvcmRlci1ib3R0b206IDAuNXB4IHNvbGlkICNjY2M7XFxuICBoZWlnaHQ6IDQ1cHg7XFxufVxcblxcbi50aXRsZSBhIHtcXG4gIHdpZHRoOiAzMnB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgY29sb3I6IGdyYXk7XFxufVxcblxcbmZvcm0gaDEge1xcbiAgZm9udC1zaXplOiAxMzUlO1xcbiAgcGFkZGluZzogMCAxMHB4O1xcbn1cXG5cXG4uZGF0YV9pbnB1dF93cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBib3JkZXItYm90dG9tOiAwLjVweCBzb2xpZCAjY2NjO1xcbn1cXG5cXG4jZW50ZXIge1xcbiAgaGVpZ2h0OiAyNXB4O1xcbiAgd2lkdGg6IDI1cHg7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxuICBjb2xvcjogZ3JheTtcXG59XFxuXFxuLmRhdGFfaW5wdXQge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxufVxcblxcbi5kYXRhX2lucHV0OmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbmZvcm0gPiAqIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA0NXB4O1xcbn1cXG5cXG4udG9kb19saXN0IHtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLnRvZG9fbGlzdCBsaSB7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGhlaWdodDogNDVweDtcXG4gIGJvcmRlci1ib3R0b206IDAuNXB4IHNvbGlkICNjY2M7XFxufVxcblxcbi50b2RvX2xpc3QgLmNoZWNrYm94IHtcXG4gIG1hcmdpbjogYXV0bztcXG59XFxuXFxuLnRvZG9fbGlzdCBsaSAudG9kb19pbnB1dCB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogNzUlO1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4udG9kb19saXN0IGxpIC5kZWxldGUge1xcbiAgd2lkdGg6IDI4cHg7XFxuICBoZWlnaHQ6IDI4cHg7XFxuICBtYXJnaW46IGF1dG87XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBjb2xvcjogZ3JheTtcXG59XFxuXFxuLmNsZWFyX2NvbXBsZXRlZCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNDVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmOGY4Zjg7XFxuICBjb2xvcjogIzc3NzY3NjtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmNsZWFyX2NvbXBsZXRlZDpob3ZlciB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLyogTGludGVyICovXFxuLmNoZWNrYm94OmNoZWNrZWQgKyAudG9kb19pbnB1dCB7XFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXG59XFxuXFxuLnRvZG9fbGlzdCBsaSAudG9kb19pbnB1dDpmb2N1cyB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Ozs2Q0FLNkM7O0FBSzdDO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLFlBQVk7RUFDWix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDhCQUE4QjtFQUM5QiwrQkFBK0I7RUFDL0IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsV0FBVztBQUNiOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixZQUFZO0VBQ1osK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFVBQVU7RUFDVixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLFlBQVk7RUFDWixlQUFlO0VBQ2YsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCxZQUFZO0VBQ1osZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDBCQUEwQjtBQUM1Qjs7QUFFQSxXQUFXO0FBQ1g7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxcbiAqIFByb2plY3Q6IGpzLXRvZG8tbGlzdFxcbiAqIEZpbGU6IHN0eWxlLmNzc1xcbiAqIENyZWF0ZWQ6IDIvMjgvMjNcXG4gKiBBdXRob3I6IEFiZHVsbGFoIEFsIE1hbXVuIDxtYW11bjEyMTRAZ21haWwuY29tPlxcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG5cXG5AaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1MYXRvJmRpc3BsYXk9c3dhcFxcXCIpO1xcbkBpbXBvcnQgXFxcImNzcy9jb21tb24uY3NzXFxcIjtcXG5cXG5tYWluIHtcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBtaW4taGVpZ2h0OiAzNTBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBwbGFjZS1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5mb3JtIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAzNTBweDtcXG4gIGhlaWdodDogYXV0bztcXG4gIGJvcmRlcjogMC41cHggc29saWQgI2NjYztcXG59XFxuXFxuLnRpdGxlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYm9yZGVyLWJvdHRvbTogMC41cHggc29saWQgI2NjYztcXG4gIGhlaWdodDogNDVweDtcXG59XFxuXFxuLnRpdGxlIGEge1xcbiAgd2lkdGg6IDMycHg7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxuICBjb2xvcjogZ3JheTtcXG59XFxuXFxuZm9ybSBoMSB7XFxuICBmb250LXNpemU6IDEzNSU7XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxufVxcblxcbi5kYXRhX2lucHV0X3dyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGJvcmRlci1ib3R0b206IDAuNXB4IHNvbGlkICNjY2M7XFxufVxcblxcbiNlbnRlciB7XFxuICBoZWlnaHQ6IDI1cHg7XFxuICB3aWR0aDogMjVweDtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIG1hcmdpbi1yaWdodDogMTVweDtcXG4gIGNvbG9yOiBncmF5O1xcbn1cXG5cXG4uZGF0YV9pbnB1dCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIHBhZGRpbmc6IDAgMTBweDtcXG59XFxuXFxuLmRhdGFfaW5wdXQ6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuZm9ybSA+ICoge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDQ1cHg7XFxufVxcblxcbi50b2RvX2xpc3Qge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4udG9kb19saXN0IGxpIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgaGVpZ2h0OiA0NXB4O1xcbiAgYm9yZGVyLWJvdHRvbTogMC41cHggc29saWQgI2NjYztcXG59XFxuXFxuLnRvZG9fbGlzdCAuY2hlY2tib3gge1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG5cXG4udG9kb19saXN0IGxpIC50b2RvX2lucHV0IHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiA3NSU7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcblxcbi50b2RvX2xpc3QgbGkgLmRlbGV0ZSB7XFxuICB3aWR0aDogMjhweDtcXG4gIGhlaWdodDogMjhweDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGNvbG9yOiBncmF5O1xcbn1cXG5cXG4uY2xlYXJfY29tcGxldGVkIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA0NXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjhmODtcXG4gIGNvbG9yOiAjNzc3Njc2O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uY2xlYXJfY29tcGxldGVkOmhvdmVyIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbn1cXG5cXG4vKiBMaW50ZXIgKi9cXG4uY2hlY2tib3g6Y2hlY2tlZCArIC50b2RvX2lucHV0IHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1xcbn1cXG5cXG4udG9kb19saXN0IGxpIC50b2RvX2lucHV0OmZvY3VzIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8qKlxuICogVGFrZXMgYW55IGlucHV0IGFuZCBndWFyYW50ZWVzIGFuIGFycmF5IGJhY2suXG4gKlxuICogLSBDb252ZXJ0cyBhcnJheS1saWtlIG9iamVjdHMgKGUuZy4gYGFyZ3VtZW50c2AsIGBTZXRgKSB0byBhIHJlYWwgYXJyYXkuXG4gKiAtIENvbnZlcnRzIGB1bmRlZmluZWRgIHRvIGFuIGVtcHR5IGFycmF5LlxuICogLSBDb252ZXJ0cyBhbnkgYW5vdGhlciBvdGhlciwgc2luZ3VsYXIgdmFsdWUgKGluY2x1ZGluZyBgbnVsbGAsIG9iamVjdHMgYW5kIGl0ZXJhYmxlcyBvdGhlciB0aGFuIGBTZXRgKSBpbnRvIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhhdCB2YWx1ZS5cbiAqIC0gSWdub3JlcyBpbnB1dCB3aGljaCBpcyBhbHJlYWR5IGFuIGFycmF5LlxuICpcbiAqIEBtb2R1bGUgYXJyYXktYmFja1xuICogQGV4YW1wbGVcbiAqID4gY29uc3QgYXJyYXlpZnkgPSByZXF1aXJlKCdhcnJheS1iYWNrJylcbiAqXG4gKiA+IGFycmF5aWZ5KHVuZGVmaW5lZClcbiAqIFtdXG4gKlxuICogPiBhcnJheWlmeShudWxsKVxuICogWyBudWxsIF1cbiAqXG4gKiA+IGFycmF5aWZ5KDApXG4gKiBbIDAgXVxuICpcbiAqID4gYXJyYXlpZnkoWyAxLCAyIF0pXG4gKiBbIDEsIDIgXVxuICpcbiAqID4gYXJyYXlpZnkobmV3IFNldChbIDEsIDIgXSkpXG4gKiBbIDEsIDIgXVxuICpcbiAqID4gZnVuY3Rpb24gZigpeyByZXR1cm4gYXJyYXlpZnkoYXJndW1lbnRzKTsgfVxuICogPiBmKDEsMiwzKVxuICogWyAxLCAyLCAzIF1cbiAqL1xuXG5mdW5jdGlvbiBpc09iamVjdCQxIChpbnB1dCkge1xuICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnb2JqZWN0JyAmJiBpbnB1dCAhPT0gbnVsbFxufVxuXG5mdW5jdGlvbiBpc0FycmF5TGlrZSQxIChpbnB1dCkge1xuICByZXR1cm4gaXNPYmplY3QkMShpbnB1dCkgJiYgdHlwZW9mIGlucHV0Lmxlbmd0aCA9PT0gJ251bWJlcidcbn1cblxuLyoqXG4gKiBAcGFyYW0geyp9IC0gVGhlIGlucHV0IHZhbHVlIHRvIGNvbnZlcnQgdG8gYW4gYXJyYXlcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBhbGlhcyBtb2R1bGU6YXJyYXktYmFja1xuICovXG5mdW5jdGlvbiBhcnJheWlmeSAoaW5wdXQpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgcmV0dXJuIGlucHV0XG4gIH0gZWxzZSBpZiAoaW5wdXQgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBbXVxuICB9IGVsc2UgaWYgKGlzQXJyYXlMaWtlJDEoaW5wdXQpIHx8IGlucHV0IGluc3RhbmNlb2YgU2V0KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oaW5wdXQpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtpbnB1dF1cbiAgfVxufVxuXG4vKipcbiAqIElzb21vcnBoaWMsIGZ1bmN0aW9uYWwgdHlwZS1jaGVja2luZyBmb3IgSmF2YXNjcmlwdC5cbiAqIEBtb2R1bGUgdHlwaWNhbFxuICogQHR5cGljYWxuYW1lIHRcbiAqIEBleGFtcGxlXG4gKiBjb25zdCB0ID0gcmVxdWlyZSgndHlwaWNhbCcpXG4gKiBjb25zdCBhbGxEZWZpbmVkID0gYXJyYXkuZXZlcnkodC5pc0RlZmluZWQpXG4gKi9cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgaW5wdXQgaXMgYSBudW1iZXIuIEl0IGlzIGEgbW9yZSByZWFzb25hYmxlIGFsdGVybmF0aXZlIHRvIGB0eXBlb2YgbmAgd2hpY2ggcmV0dXJucyBgbnVtYmVyYCBmb3IgYE5hTmAgYW5kIGBJbmZpbml0eWAuXG4gKlxuICogQHBhcmFtIHsqfSAtIHRoZSBpbnB1dCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBzdGF0aWNcbiAqIEBleGFtcGxlXG4gKiA+IHQuaXNOdW1iZXIoMClcbiAqIHRydWVcbiAqID4gdC5pc051bWJlcigxKVxuICogdHJ1ZVxuICogPiB0LmlzTnVtYmVyKDEuMSlcbiAqIHRydWVcbiAqID4gdC5pc051bWJlcigweGZmKVxuICogdHJ1ZVxuICogPiB0LmlzTnVtYmVyKDA2NDQpXG4gKiB0cnVlXG4gKiA+IHQuaXNOdW1iZXIoNi4yZTUpXG4gKiB0cnVlXG4gKiA+IHQuaXNOdW1iZXIoTmFOKVxuICogZmFsc2VcbiAqID4gdC5pc051bWJlcihJbmZpbml0eSlcbiAqIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyIChuKSB7XG4gIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobilcbn1cblxuLyoqXG4gKiBBIHBsYWluIG9iamVjdCBpcyBhIHNpbXBsZSBvYmplY3QgbGl0ZXJhbCwgaXQgaXMgbm90IGFuIGluc3RhbmNlIG9mIGEgY2xhc3MuIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgYHR5cGVvZmAgaXMgYG9iamVjdGAgYW5kIGRpcmVjdGx5IGRlY2VuZHMgZnJvbSBgT2JqZWN0YC5cbiAqXG4gKiBAcGFyYW0geyp9IC0gdGhlIGlucHV0IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHN0YXRpY1xuICogQGV4YW1wbGVcbiAqID4gdC5pc1BsYWluT2JqZWN0KHsgc29tZXRoaW5nOiAnb25lJyB9KVxuICogdHJ1ZVxuICogPiB0LmlzUGxhaW5PYmplY3QobmV3IERhdGUoKSlcbiAqIGZhbHNlXG4gKiA+IHQuaXNQbGFpbk9iamVjdChbIDAsIDEgXSlcbiAqIGZhbHNlXG4gKiA+IHQuaXNQbGFpbk9iamVjdCgvdGVzdC8pXG4gKiBmYWxzZVxuICogPiB0LmlzUGxhaW5PYmplY3QoMSlcbiAqIGZhbHNlXG4gKiA+IHQuaXNQbGFpbk9iamVjdCgnb25lJylcbiAqIGZhbHNlXG4gKiA+IHQuaXNQbGFpbk9iamVjdChudWxsKVxuICogZmFsc2VcbiAqID4gdC5pc1BsYWluT2JqZWN0KChmdW5jdGlvbiAqICgpIHt9KSgpKVxuICogZmFsc2VcbiAqID4gdC5pc1BsYWluT2JqZWN0KGZ1bmN0aW9uICogKCkge30pXG4gKiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0IChpbnB1dCkge1xuICByZXR1cm4gaW5wdXQgIT09IG51bGwgJiYgdHlwZW9mIGlucHV0ID09PSAnb2JqZWN0JyAmJiBpbnB1dC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0XG59XG5cbi8qKlxuICogQW4gYXJyYXktbGlrZSB2YWx1ZSBoYXMgYWxsIHRoZSBwcm9wZXJ0aWVzIG9mIGFuIGFycmF5IHlldCBpcyBub3QgYW4gYXJyYXkgaW5zdGFuY2UuIEFuIGV4YW1wbGUgaXMgdGhlIGBhcmd1bWVudHNgIG9iamVjdC4gUmV0dXJucyBgdHJ1ZWBgIGlmIHRoZSBpbnB1dCB2YWx1ZSBpcyBhbiBvYmplY3QsIG5vdCBgbnVsbGBgIGFuZCBoYXMgYSBgbGVuZ3RoYCBwcm9wZXJ0eSBzZXQgd2l0aCBhIG51bWVyaWMgdmFsdWUuXG4gKlxuICogQHBhcmFtIHsqfSAtIHRoZSBpbnB1dCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBzdGF0aWNcbiAqIEBleGFtcGxlXG4gKiBmdW5jdGlvbiBzdW0oeCwgeSl7XG4gKiAgIGNvbnNvbGUubG9nKHQuaXNBcnJheUxpa2UoYXJndW1lbnRzKSlcbiAqICAgLy8gcHJpbnRzIGB0cnVlYFxuICogfVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSAoaW5wdXQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGlucHV0KSAmJiB0eXBlb2YgaW5wdXQubGVuZ3RoID09PSAnbnVtYmVyJ1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHlwZW9mIGlucHV0IGlzIGAnb2JqZWN0J2AgYnV0IG5vdCBudWxsLlxuICogQHBhcmFtIHsqfSAtIHRoZSBpbnB1dCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBzdGF0aWNcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QgKGlucHV0KSB7XG4gIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdvYmplY3QnICYmIGlucHV0ICE9PSBudWxsXG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCB2YWx1ZSBpcyBkZWZpbmVkLlxuICogQHBhcmFtIHsqfSAtIHRoZSBpbnB1dCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBzdGF0aWNcbiAqL1xuZnVuY3Rpb24gaXNEZWZpbmVkIChpbnB1dCkge1xuICByZXR1cm4gdHlwZW9mIGlucHV0ICE9PSAndW5kZWZpbmVkJ1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgdmFsdWUgaXMgdW5kZWZpbmVkLlxuICogQHBhcmFtIHsqfSAtIHRoZSBpbnB1dCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBzdGF0aWNcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQgKGlucHV0KSB7XG4gIHJldHVybiAhaXNEZWZpbmVkKGlucHV0KVxufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgdmFsdWUgaXMgbnVsbC5cbiAqIEBwYXJhbSB7Kn0gLSB0aGUgaW5wdXQgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAc3RhdGljXG4gKi9cbmZ1bmN0aW9uIGlzTnVsbCAoaW5wdXQpIHtcbiByZXR1cm4gaW5wdXQgPT09IG51bGxcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IHZhbHVlIGlzIG5vdCBvbmUgb2YgYHVuZGVmaW5lZGAsIGBudWxsYCwgb3IgYE5hTmAuXG4gKiBAcGFyYW0geyp9IC0gdGhlIGlucHV0IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHN0YXRpY1xuICovXG5mdW5jdGlvbiBpc0RlZmluZWRWYWx1ZSAoaW5wdXQpIHtcbiByZXR1cm4gaXNEZWZpbmVkKGlucHV0KSAmJiAhaXNOdWxsKGlucHV0KSAmJiAhTnVtYmVyLmlzTmFOKGlucHV0KVxufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgdmFsdWUgaXMgYW4gRVMyMDE1IGBjbGFzc2AuXG4gKiBAcGFyYW0geyp9IC0gdGhlIGlucHV0IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHN0YXRpY1xuICovXG5mdW5jdGlvbiBpc0NsYXNzIChpbnB1dCkge1xuICBpZiAodHlwZW9mIGlucHV0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIC9eY2xhc3MgLy50ZXN0KEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgaXMgYSBzdHJpbmcsIG51bWJlciwgc3ltYm9sLCBib29sZWFuLCBudWxsIG9yIHVuZGVmaW5lZCB2YWx1ZS5cbiAqIEBwYXJhbSB7Kn0gLSB0aGUgaW5wdXQgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAc3RhdGljXG4gKi9cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlIChpbnB1dCkge1xuICBpZiAoaW5wdXQgPT09IG51bGwpIHJldHVybiB0cnVlXG4gIHN3aXRjaCAodHlwZW9mIGlucHV0KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N5bWJvbCc6XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCBpcyBhIFByb21pc2UuXG4gKiBAcGFyYW0geyp9IC0gdGhlIGlucHV0IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHN0YXRpY1xuICovXG5mdW5jdGlvbiBpc1Byb21pc2UgKGlucHV0KSB7XG4gIGlmIChpbnB1dCkge1xuICAgIGNvbnN0IGlzUHJvbWlzZSA9IGlzRGVmaW5lZChQcm9taXNlKSAmJiBpbnB1dCBpbnN0YW5jZW9mIFByb21pc2U7XG4gICAgY29uc3QgaXNUaGVuYWJsZSA9IGlucHV0LnRoZW4gJiYgdHlwZW9mIGlucHV0LnRoZW4gPT09ICdmdW5jdGlvbic7XG4gICAgcmV0dXJuICEhKGlzUHJvbWlzZSB8fCBpc1RoZW5hYmxlKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCBpcyBhbiBpdGVyYWJsZSAoYE1hcGAsIGBTZXRgLCBgQXJyYXlgLCBHZW5lcmF0b3IgZXRjLikuXG4gKiBAcGFyYW0geyp9IC0gdGhlIGlucHV0IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHN0YXRpY1xuICogQGV4YW1wbGVcbiAqID4gdC5pc0l0ZXJhYmxlKCdzdHJpbmcnKVxuICogdHJ1ZVxuICogPiB0LmlzSXRlcmFibGUobmV3IE1hcCgpKVxuICogdHJ1ZVxuICogPiB0LmlzSXRlcmFibGUoW10pXG4gKiB0cnVlXG4gKiA+IHQuaXNJdGVyYWJsZSgoZnVuY3Rpb24gKiAoKSB7fSkoKSlcbiAqIHRydWVcbiAqID4gdC5pc0l0ZXJhYmxlKFByb21pc2UucmVzb2x2ZSgpKVxuICogZmFsc2VcbiAqID4gdC5pc0l0ZXJhYmxlKFByb21pc2UpXG4gKiBmYWxzZVxuICogPiB0LmlzSXRlcmFibGUodHJ1ZSlcbiAqIGZhbHNlXG4gKiA+IHQuaXNJdGVyYWJsZSh7fSlcbiAqIGZhbHNlXG4gKiA+IHQuaXNJdGVyYWJsZSgwKVxuICogZmFsc2VcbiAqID4gdC5pc0l0ZXJhYmxlKDEuMSlcbiAqIGZhbHNlXG4gKiA+IHQuaXNJdGVyYWJsZShOYU4pXG4gKiBmYWxzZVxuICogPiB0LmlzSXRlcmFibGUoSW5maW5pdHkpXG4gKiBmYWxzZVxuICogPiB0LmlzSXRlcmFibGUoZnVuY3Rpb24gKCkge30pXG4gKiBmYWxzZVxuICogPiB0LmlzSXRlcmFibGUoRGF0ZSlcbiAqIGZhbHNlXG4gKiA+IHQuaXNJdGVyYWJsZSgpXG4gKiBmYWxzZVxuICogPiB0LmlzSXRlcmFibGUoeyB0aGVuOiBmdW5jdGlvbiAoKSB7fSB9KVxuICogZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNJdGVyYWJsZSAoaW5wdXQpIHtcbiAgaWYgKGlucHV0ID09PSBudWxsIHx8ICFpc0RlZmluZWQoaW5wdXQpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiBpbnB1dFtTeW1ib2wuaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICB0eXBlb2YgaW5wdXRbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID09PSAnZnVuY3Rpb24nXG4gICAgKVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCB2YWx1ZSBpcyBhIHN0cmluZy4gVGhlIGVxdWl2YWxlbnQgb2YgYHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZydgIGZvciB1c2UgaW4gZnVuY2l0b25hbCBjb250ZXh0cy5cbiAqIEBwYXJhbSB7Kn0gLSB0aGUgaW5wdXQgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAc3RhdGljXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nIChpbnB1dCkge1xuICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJ1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgdmFsdWUgaXMgYSBmdW5jdGlvbi4gVGhlIGVxdWl2YWxlbnQgb2YgYHR5cGVvZiBpbnB1dCA9PT0gJ2Z1bmN0aW9uJ2AgZm9yIHVzZSBpbiBmdW5jaXRvbmFsIGNvbnRleHRzLlxuICogQHBhcmFtIHsqfSAtIHRoZSBpbnB1dCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBzdGF0aWNcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbiAoaW5wdXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG52YXIgdCA9IHtcbiAgaXNOdW1iZXIsXG4gIGlzUGxhaW5PYmplY3QsXG4gIGlzQXJyYXlMaWtlLFxuICBpc09iamVjdCxcbiAgaXNEZWZpbmVkLFxuICBpc1VuZGVmaW5lZCxcbiAgaXNOdWxsLFxuICBpc0RlZmluZWRWYWx1ZSxcbiAgaXNDbGFzcyxcbiAgaXNQcmltaXRpdmUsXG4gIGlzUHJvbWlzZSxcbiAgaXNJdGVyYWJsZSxcbiAgaXNTdHJpbmcsXG4gIGlzRnVuY3Rpb25cbn07XG5cbi8qKlxuICogSXNvbW9ycGhpYywgbG9hZC1hbnl3aGVyZSBmdW5jdGlvbiB0byBzb3J0IGFuIGFycmF5IGJ5IHNjYWxhciwgZGVlcCBvciBjb21wdXRlZCB2YWx1ZXMgaW4gYW55IHN0YW5kYXJkIG9yIGN1c3RvbSBvcmRlci5cbiAqXG4gKiBAbW9kdWxlIHNvcnQtYXJyYXlcbiAqIEB0eXBpY2FsbmFtZSBzb3J0QXJyYXlcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBzb3J0QXJyYXkgPSByZXF1aXJlKCdzb3J0LWFycmF5JylcbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gVGhlIGlucHV0IGFycmF5IHRvIHNvcnQuIEl0IGlzIHNvcnRlZCBpbiBwbGFjZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gLSBTb3J0IG9wdGlvbnMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBbb3B0aW9ucy5ieV0gLSBPbmUgb3IgbW9yZSBwcm9wZXJ0eSBuYW1lcyBvciBjb21wdXRlZCBmaWVsZHMgdG8gc29ydCBieS4gU3BlY2lmeWluZyBwcm9wZXJ0eSBuYW1lcyBpcyBvbmx5IHJlbGV2YW50IHdoZW4gc29ydGluZyBhbiBhcnJheSBvZiBvYmplY3RzLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gW29wdGlvbnMub3JkZXJdIC0gT25lIG9yIG1vcmUgc29ydCBvcmRlcnMuIFNwZWNpZnkgYCdhc2MnYCwgYCdkZXNjJ2Agb3IgYSBwcm9wZXJ0eSBuYW1lIGZyb20gdGhlIGBvcHRpb25zLmN1c3RvbU9yZGVyc2Agb2JqZWN0LlxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLmN1c3RvbU9yZGVyc10gLSBBIGRpY3Rpb25hcnkgb2JqZWN0IGNvbnRhaW5pbmcgb25lIG9yIG1vcmUgY3VzdG9tIG9yZGVycy4gRWFjaCBjdXN0b20gb3JkZXIgdmFsdWUgbXVzdCBiZSBhbiBhcnJheSBkZWZpbmluZyB0aGUgb3JkZXIgZXhwZWN0ZWQgdmFsdWVzIG11c3QgYmUgc29ydGVkIGluLlxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zLmNvbXB1dGVkXSAtIEEgZGljdGlvbmFyeSBvYmplY3QgY29udGFpbmluZyBvbmUgb3IgbW9yZSBjb21wdXRlZCBmaWVsZCBmdW5jdGlvbnMuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGludm9rZWQgb25jZSBwZXIgaXRlbSBpbiB0aGUgYXJyYXkuIEVhY2ggaW52b2NhdGlvbiB3aWxsIHJlY2VpdmUgdGhlIGFycmF5IGl0ZW0gYXMgaW5wdXQgYW5kIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlIGJ5IHdoaWNoIHRoZSBhcnJheSBjYW4gYmUgc29ydGVkLlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm51bGxSYW5rXSAtIENvbmZpZ3VyZXMgd2hldGhlciBgbnVsbGAgdmFsdWVzIHdpbGwgYmUgc29ydGVkIGJlZm9yZSBvciBhZnRlciBkZWZpbmVkIHZhbHVlcy4gU2V0IHRvIGAtMWAgZm9yIGJlZm9yZSwgYDFgIGZvciBhZnRlci4gRGVmYXVsdHMgdG8gYDFgLlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnVuZGVmaW5lZFJhbmtdIC0gQ29uZmlndXJlcyB3aGV0aGVyIGB1bmRlZmluZWRgIHZhbHVlcyB3aWxsIGJlIHNvcnRlZCBiZWZvcmUgb3IgYWZ0ZXIgZGVmaW5lZCB2YWx1ZXMuIFNldCB0byBgLTFgIGZvciBiZWZvcmUsIGAxYCBmb3IgYWZ0ZXIuIERlZmF1bHRzIHRvIGAxYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgdGhhdCB3YXMgcGFzc2VkIGluLlxuICogQGFsaWFzIG1vZHVsZTpzb3J0LWFycmF5XG4gKi9cbmZ1bmN0aW9uIHNvcnRBcnJheSAoYXJyLCBvcHRpb25zID0ge30pIHtcbiAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXG4gICAge1xuICAgICAgY29tcHV0ZWQ6IHt9LFxuICAgICAgY3VzdG9tT3JkZXJzOiB7fSxcbiAgICAgIG51bGxSYW5rOiAxLFxuICAgICAgdW5kZWZpbmVkUmFuazogMVxuICAgIH0sXG4gICAgb3B0aW9uc1xuICApO1xuICBhcnIuc29ydChnZXRDb21wYXJlRnVuYyhvcHRpb25zKSk7XG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZ2V0Q29tcGFyZUZ1bmMgKG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCBieSA9IGFycmF5aWZ5KG9wdGlvbnMuYnkpO1xuICBjb25zdCBvcmRlciA9IGFycmF5aWZ5KG9wdGlvbnMub3JkZXIpO1xuICBjb25zdCB7IGN1c3RvbU9yZGVycywgY29tcHV0ZWQgfSA9IG9wdGlvbnM7XG4gIHJldHVybiBmdW5jdGlvbiBjb21wYXJlRnVuYyAoeEluLCB5SW4sIGJ5SW5kZXggPSAwKSB7XG4gICAgY29uc3QgY3Vyck9yZGVyID0gb3JkZXJbYnlJbmRleF0gfHwgJ2FzYyc7XG4gICAgaWYgKCEoY3Vyck9yZGVyID09PSAnYXNjJyB8fCBjdXJyT3JkZXIgPT09ICdkZXNjJyB8fCBjdXN0b21PcmRlcnNbY3Vyck9yZGVyXSkpIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCwgeCwgeTtcbiAgICBpZiAoYnkubGVuZ3RoKSB7XG4gICAgICB4ID0gdC5pc0RlZmluZWQoeEluW2J5W2J5SW5kZXhdXSlcbiAgICAgICAgPyB4SW5bYnlbYnlJbmRleF1dXG4gICAgICAgIDogY29tcHV0ZWRbYnlbYnlJbmRleF1dICYmIGNvbXB1dGVkW2J5W2J5SW5kZXhdXSh4SW4pO1xuICAgICAgeSA9IHQuaXNEZWZpbmVkKHlJbltieVtieUluZGV4XV0pXG4gICAgICAgID8geUluW2J5W2J5SW5kZXhdXVxuICAgICAgICA6IGNvbXB1dGVkW2J5W2J5SW5kZXhdXSAmJiBjb21wdXRlZFtieVtieUluZGV4XV0oeUluKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IHhJbjtcbiAgICAgIHkgPSB5SW47XG4gICAgfVxuXG4gICAgaWYgKGN1c3RvbU9yZGVycyAmJiBjdXN0b21PcmRlcnNbY3Vyck9yZGVyXSkge1xuICAgICAgcmVzdWx0ID0gY3VzdG9tT3JkZXJzW2N1cnJPcmRlcl0uaW5kZXhPZih4KSAtIGN1c3RvbU9yZGVyc1tjdXJyT3JkZXJdLmluZGV4T2YoeSk7XG4gICAgfSBlbHNlIGlmICh4ID09PSB5KSB7XG4gICAgICByZXN1bHQgPSAwO1xuICAgIH0gZWxzZSBpZiAodC5pc051bGwoeCkgJiYgdC5pc1VuZGVmaW5lZCh5KSkge1xuICAgICAgcmVzdWx0ID0gY3Vyck9yZGVyID09PSAnYXNjJ1xuICAgICAgICA/IDFcbiAgICAgICAgOiBjdXJyT3JkZXIgPT09ICdkZXNjJ1xuICAgICAgICAgID8gLTFcbiAgICAgICAgICA6IDA7XG4gICAgfSBlbHNlIGlmICh0LmlzVW5kZWZpbmVkKHgpICYmIHQuaXNOdWxsKHkpKSB7XG4gICAgICByZXN1bHQgPSBjdXJyT3JkZXIgPT09ICdhc2MnXG4gICAgICAgID8gLTFcbiAgICAgICAgOiBjdXJyT3JkZXIgPT09ICdkZXNjJ1xuICAgICAgICAgID8gMVxuICAgICAgICAgIDogMDtcbiAgICB9IGVsc2UgaWYgKHQuaXNOdWxsKHgpICYmIHQuaXNEZWZpbmVkVmFsdWUoeSkpIHtcbiAgICAgIHJlc3VsdCA9IG9wdGlvbnMubnVsbFJhbms7XG4gICAgfSBlbHNlIGlmICh0LmlzVW5kZWZpbmVkKHgpICYmIHQuaXNEZWZpbmVkVmFsdWUoeSkpIHtcbiAgICAgIHJlc3VsdCA9IG9wdGlvbnMudW5kZWZpbmVkUmFuaztcbiAgICB9IGVsc2UgaWYgKHQuaXNOdWxsKHkpICYmIHQuaXNEZWZpbmVkVmFsdWUoeCkpIHtcbiAgICAgIHJlc3VsdCA9IC1vcHRpb25zLm51bGxSYW5rO1xuICAgIH0gZWxzZSBpZiAodC5pc1VuZGVmaW5lZCh5KSAmJiB0LmlzRGVmaW5lZFZhbHVlKHgpKSB7XG4gICAgICByZXN1bHQgPSAtb3B0aW9ucy51bmRlZmluZWRSYW5rO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB4IDwgeSA/IC0xIDogeCA+IHkgPyAxIDogMDtcbiAgICAgIGlmIChjdXJyT3JkZXIgPT09ICdkZXNjJykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQgKiAtMTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlc3VsdCA9PT0gMCAmJiB0LmlzRGVmaW5lZChieVtieUluZGV4ICsgMV0pKSB7XG4gICAgICByZXN1bHQgPSBjb21wYXJlRnVuYyh4SW4sIHlJbiwgYnlJbmRleCArIDEpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc29ydEFycmF5O1xuIl0sIm5hbWVzIjpbIlRvZG8iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwidG9kbyIsInNob3ciLCJldmVudHMiLCJzb3J0QXJyYXkiLCJOb3RpZnkiLCJTdGF0dXMiLCJBcHBzIiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCIkaW5wdXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZSIsImtleSIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwidmFsdWUiLCJzYXZlIiwiJGNsZWFyQWxsIiwiJGNoZWNrZWQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImlucHV0IiwicGFyZW50Tm9kZSIsInJlbW92ZSIsIml0ZW1zIiwiZmlsdGVyIiwiaXRlbSIsImNvbXBsZXRlZCIsImNvdW50IiwiaW5kZXgiLCJzYXZlU3RvcmFnZSIsImRlbGV0ZUV2ZW50IiwiY2hhbmdlRXZlbnQiLCJjaGFuZ2VTdGF0dXMiLCJjb250cm9sbGVyIiwiQWJvcnRDb250cm9sbGVyIiwiJHRhc2tzIiwiYnRuIiwicGFyc2VJbnQiLCJkYXRhc2V0IiwiaWQiLCJzaWduYWwiLCJhYm9ydCIsIiRpbnB1dHMiLCJzdHlsZSIsImJhY2tncm91bmQiLCJ1cGRhdGUiLCIkY2hlY2tib3giLCJjaGVja2VkIiwiaW5uZXJIVE1MIiwiZ2V0SXRlbXMiLCJieSIsImFkZEl0ZW0iLCJsaXN0IiwibGkiLCJjcmVhdGVFbGVtZW50IiwiY29uY2F0IiwiZGVzY3JpcHRpb24iLCJhcHBlbmRDaGlsZCIsIiRpdGVtcyIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCIkaXRlbSIsInB1c2giLCIkZGF0YSIsImxlbmd0aCIsInNhdmVJdGVtcyIsInJlbW92ZUV2ZW50IiwiJGRlc2MiLCIkaWQiLCJmaW5kIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImRlZmF1bHQiLCJOb3RpZmljYXRpb24iLCIkbWVzc2FnZSIsIiRjbGFzc05hbWUiLCJtc2ciLCJjbGFzc05hbWUiLCJjcmVhdGVUZXh0Tm9kZSIsImNvbnRhaW5lckVMZW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInBhcmVudERpdiIsImluc2VydEJlZm9yZSIsImxhc3RFbGVtZW50Q2hpbGQiLCJzZXRUaW1lb3V0IiwicXVlcnlTZWxlY3RvciIsIiRzdGF0dXMiXSwic291cmNlUm9vdCI6IiJ9