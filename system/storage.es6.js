'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
    function Storage(label, size) {
        _classCallCheck(this, Storage);

        this.label = label;
        this.labelObj = $('<div>').addClass('name').html(label);
        this.value = 0;
        this.allowSize = size != undefined;
        this.size = size;

        if (this.allowSize) {
            this.valueObj = $('<div>').addClass('value').html(MotherBoard.show(this.value, this.size));
        } else {
            this.valueObj = $('<div>').addClass('value').html(MotherBoard.show(this.value));
        }
    }

    _createClass(Storage, [{
        key: 'render',
        value: function render(selector) {
            $(selector).append(this.labelObj);
            $(selector).append(this.valueObj);
            this.selector = selector;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            if (this.allowSize) {
                this.valueObj.html(MotherBoard.show(this.value, this.size));
            } else {
                this.valueObj.html(MotherBoard.show(this.value));
            }
        }
    }, {
        key: 'read',
        value: function read() {
            return parseInt(this.value);
        }
    }, {
        key: 'write',
        value: function write(value) {
            if (this.allowsize && this.size >= value) {
                motherBoard.stopProcessing();
                alert("ERRO : Overflow!");
                return false;
            } else {
                if (window.maxRegisterValue < value) {
                    motherBoard.stopProcessing();
                    alert("ERRO : Overflow!");
                    return false;
                }
            }

            if (value == undefined || value == "") {
                value = 0;
            }

            this.value = value;
            this.refresh();
        }
    }]);

    return Storage;
}();