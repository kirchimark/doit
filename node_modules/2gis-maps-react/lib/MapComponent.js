'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var MapComponent = (function (_Component) {
    _inherits(MapComponent, _Component);

    function MapComponent() {
        _classCallCheck(this, MapComponent);

        _get(Object.getPrototypeOf(MapComponent.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MapComponent, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.state && this.state.dgElement) {
                this.state.dgElement.remove();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            var childrenForRender = [];

            if (this.state && this.state.dgElement && this.props.children) {
                childrenForRender = _react.Children.map(this.props.children, function (child) {
                    return (0, _react.cloneElement)(child, {
                        element: _this.state.dgElement
                    });
                });
            }

            return _react2['default'].createElement(
                'noscript',
                null,
                childrenForRender
            );
        }
    }, {
        key: 'checkPropsChange',
        value: function checkPropsChange(propsName, prevProps) {
            var _this2 = this;

            if (typeof propsName == 'string') {
                return prevProps[propsName] !== this.props[propsName];
            } else if (typeof propsName == 'object') {
                return propsName.some(function (name) {
                    return prevProps[name] !== _this2.props[name];
                });
            }
        }
    }, {
        key: 'updateLabel',
        value: function updateLabel(prevProps) {
            if (this.checkPropsChange('label', prevProps)) {
                if (this.props.label) {
                    this.state.dgElement.bindLabel(this.props.label);
                } else {
                    this.state.dgElement.unbindLabel();
                }
            }
        }
    }, {
        key: 'updatePos',
        value: function updatePos(prevProps) {
            if (this.checkPropsChange('pos', prevProps)) {
                this.state.dgElement.setLatLng(this.props.pos);
            }
        }
    }, {
        key: 'updatePoints',
        value: function updatePoints(prevProps) {
            if (this.checkPropsChange('points', prevProps)) {
                this.state.dgElement.setLatLngs(this.props.points);
            }
        }
    }, {
        key: 'updateStyle',
        value: function updateStyle(prevProps) {
            if (this.checkPropsChange('style', prevProps)) {
                this.state.dgElement.setStyle(this.props.style);
            }
        }
    }, {
        key: 'insideMap',
        value: function insideMap() {
            return !!this.props.element.options.zoom;
        }
    }, {
        key: 'isFunction',
        value: function isFunction(variable) {
            return typeof variable === 'function';
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents(dgElement) {
            for (var prop in this.props) {
                if (prop.slice(0, 2) === 'on' && this.isFunction(this.props[prop])) {
                    dgElement.on(prop.slice(2).toLowerCase(), this.props[prop]);
                }
            }
        }
    }, {
        key: 'updateEvents',
        value: function updateEvents(dgElement, prevProps) {
            for (var prop in this.props) {
                if (prop.slice(0, 2) === 'on') {
                    var dgPropName = prop.slice(2).toLowerCase();

                    if (!prevProps[prop] && this.isFunction(this.props[prop])) {
                        dgElement.on(dgPropName, this.props[prop]);
                    }

                    if (this.props[prop] !== prevProps[prop] && this.isFunction(this.props[prop])) {
                        dgElement.off(dgPropName, prevProps[prop]);
                        dgElement.on(dgPropName, this.props[prop]);
                    }

                    if (!this.props[prop] && this.isFunction(prevProps[prop])) {
                        dgElement.off(dgPropName, prevProps[prop]);
                    }
                }
            }
        }
    }]);

    return MapComponent;
})(_react.Component);

exports['default'] = MapComponent;
module.exports = exports['default'];