'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Register = function () {
  function Register(config) {
    _classCallCheck(this, Register);

    /*
    {
        'name': 'epi',
        'showName': 'EPI',
        'orientation': {
            'x': 150,
            'y': 10
        },
        'bus': 'em'
    }
    */
    this.attributes = {
      'el': config.name,
      'l': config.css.left
    };
    this.bus = config.bus;
    if (config.size != undefined) {
      this.attributes['size'] = config.size;
    }
    this.name = config.showName;
    this.css = config.css;
    this.store = new Storage(this.name, config.size);
    return this;
  }

  _createClass(Register, [{
    key: 'render',
    value: function render(selector) {
      this.regObj = $('<div>').attr(this.attributes).addClass('registrador draggable').css(this.css);
      this.store.render(this.regObj);

      this.selector = selector;
      $(selector).append(this.regObj);
    }
  }, {
    key: 'select',
    value: function select(hide) {
      $(this.regObj).highlight(hide);
    }
  }, {
    key: 'read',
    value: function read() {
      return this.store.read();
    }
  }, {
    key: 'write',
    value: function write(value) {
      this.store.write(value);
    }
  }]);

  return Register;
}();