'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = require('./storage.es6');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Memory = function () {
    function Memory(size, program) {
        _classCallCheck(this, Memory);

        this.selector = '';
        this.memory_array = [];
        this.attributes = {
            'el': 'mem',
            'pointer': 0,
            'barramento': ''
        };

        this.size = size;
        this.program = program;

        var dataArray = [];

        for (var i = 0; i < size; i++) {
            dataArray.push(new _storage2.default(i));
        }

        this.dataArray = dataArray;
        this.UIArray = [];

        this.setProgram(program);
    }

    _createClass(Memory, [{
        key: 'render',
        value: function render(selector) {
            var memoryObj = $('<ul>').addClass('memory').attr({
                'id': 'memoria_principal'
            });

            var UIArray = [];
            var val = 0;

            this.dataArray.forEach(function (obj, add) {
                var li = $('<li>').attr({
                    'arr': add
                });
                obj.render(li);
                UIArray.push(li);
                memoryObj.append(li);
            });

            $(selector).html('');
            $(selector).append(memoryObj);

            this.UIArray = UIArray;
            this.selector = selector;
            this.memoryObj = memoryObj;
        }
    }, {
        key: 'selectAddress',
        value: function selectAddress(address, hide) {
            if (this.UIArray[address] == undefined) {
                motherBoard.stopProcessing();
                alert("ERRO : Endereço não encontrado!");
                return false;
            }
            $(this.UIArray[address]).highlight(hide);
            this.selectedAddress = address;
        }
    }, {
        key: 'read',
        value: function read() {
            return this.dataArray[this.selectedAddress].read();
        }
    }, {
        key: 'write',
        value: function write(value) {
            this.dataArray[this.selectedAddress].write(value);
        }
    }, {
        key: 'getProgram',
        value: function getProgram() {
            var program = [];
            this.dataArray.forEach(function (obj, add) {
                program.push(obj.read());
            });
            return program.join("\n");
        }
    }, {
        key: 'setProgram',
        value: function setProgram(str) {
            var program = str.split("\n");
            var thisMem = this;

            program.forEach(function (cod, add) {
                thisMem.dataArray[add].write(cod);
            });
        }
    }]);

    return Memory;
}();