'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _NotifyJs = require('./Notify.js');

var _NotifyJs2 = _interopRequireDefault(_NotifyJs);

var _PanelJs = require('./Panel.js');

var _PanelJs2 = _interopRequireDefault(_PanelJs);

var _AjaxJs = require('./Ajax.js');

var _AjaxJs2 = _interopRequireDefault(_AjaxJs);

var _helpersJqueryAttributesJs = require('./helpers/jquery-attributes.js');

var _helpersJqueryAttributesJs2 = _interopRequireDefault(_helpersJqueryAttributesJs);

var _helpersLocalStoreJs = require('./helpers/LocalStore.js');

var _helpersLocalStoreJs2 = _interopRequireDefault(_helpersLocalStoreJs);

var _helpersEventJs = require('./helpers/event.js');

var _helpersEventJs2 = _interopRequireDefault(_helpersEventJs);

var moment = {};
global.$$ = Dom7;

var F7ReactCompositeApp = (function () {
    function F7ReactCompositeApp(methods) {
        _classCallCheck(this, F7ReactCompositeApp);

        for (var method in methods) {
            this[method] = methods[method];
        }

        this.pages = {};
    }

    _createClass(F7ReactCompositeApp, [{
        key: 'initialize',
        value: function initialize() {
            window.LocalStore = _helpersLocalStoreJs2['default'];
            //Atache event methods to App
            (0, _helpersEventJs2['default'])(this);
            this.notify = new _NotifyJs2['default'](this.configs.notify || {});
            this.panel = new _PanelJs2['default'](this.configs.panel || {});
            this.ajax = new _AjaxJs2['default'](this.configs.ajax || {});
            this.stores = this.configs.stores;
            this.actions = this.configs.actions;
            //this.pages      = this.configs.pages;
            this.components = this.configs.components;

            window.Stores = this.configs.stores;
            window.Actions = this.configs.actions;

            this.F7 = new Framework7({
                modalTitle: 'Moving Chat',
                template7Pages: true,
                precompileTemplates: true,
                router: true,
                externalLinks: 'a.js-external-link',
                cache: false,
                materialRipple: Framework7.prototype.device.android,
                fastClicks: true,
                pushState: false,
                material: !Framework7.prototype.device.ios
            });

            this.container = this.F7.addView('.view-main', {
                dynamicNavbar: true,
                domCache: true
            });

            window.App = this;
            this.initEvents();
        }
    }, {
        key: 'getConfig',
        value: function getConfig(name) {
            return this.configs[name];
        }
    }, {
        key: 'set',
        value: function set(props) {
            this.setConfig(props);
        }
    }, {
        key: 'setPage',
        value: function setPage(page) {

            this.pages[page.name] = page;
        }
    }, {
        key: 'setConfig',
        value: function setConfig(props) {
            this.configs = $.extend({}, this.defaults, props);
        }
    }, {
        key: 'setMiddleware',
        value: function setMiddleware(middlewares) {
            this.middlewares = $.extend({}, this.middlewares, middlewares);
        }
    }, {
        key: 'pageShow',
        value: function pageShow(props) {
            var eventResult = true;

            //Do not do double call page
            if (this.container.activePage) {
                if (this.container.activePage.name == props.name) return;
            }

            //Defined page callback launch

            if (this.pages[props.name] && this.pages[props.name].beforePageInit) {
                eventResult = this.pages[props.name].beforePageInit(props);
                if (eventResult === false) return;
            }

            //Middleware launch
            var middlewareResult = this.middlewares.beforePageInit(props);
            if (middlewareResult === false) return;

            //If no false in events and middleware load pages

            this.container.router.load({
                template: Template7.templates[props.name],
                context: props.context || {},
                animatePages: props.animate || true,
                reload: props.reload || false
            });
        }
    }, {
        key: 'renderReact',
        value: function renderReact(container) {

            for (var index in App.components) {
                if (!App.components.hasOwnProperty(index)) continue;

                $(index, container).each(function () {

                    ReactDOM.render(React.createElement(App.components[index], $(this).getAttr(), $(this).html()), $(this)[0]);
                });
            }
        }
    }, {
        key: 'unmountReact',
        value: function unmountReact(container) {
            for (var index in App.components) {
                if (!App.components.hasOwnProperty(index)) continue;
                $(index, container).each(function () {
                    React.unmountComponentAtNode($(this)[0]);
                });
            }
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            var _this2 = this;

            var _this = this;
            $('.panel-left,.panel-right').on('open', function (props) {
                _this.renderReact($(this)[0]);
            });

            $('.panel-left,.panel-right').on('closed', function (props) {
                _this.unmountReact($(this)[0]);
            });

            this.F7.onPageInit('*', function (page) {
                _this2.renderReact($(page.container));
            });

            this.F7.onPageInit('pageBeforeRemove', function (page) {
                _this2.unmountReact($(page.container));
            });

            $(document).on('click', '.app-link', function (e) {
                e.preventDefault();
                App.pageShow({
                    name: $(this).data('page'),
                    context: $(this).data('context') ? JSON.parse($(this).data('context')) : {},
                    animated: $(this).data('animated') || true,
                    reload: $(this).data('reload') || false
                });
                return false;
            });

            $(document).on('click', '.app-back', function (e) {
                e.preventDefault();
                App.container.router.back({
                    pageName: 'index',
                    force: true
                });
                return false;
            });
        }
    }]);

    return F7ReactCompositeApp;
})();

F7ReactCompositeApp.prototype.defaults = {
    pages: {},
    stores: {},
    components: {},
    ajax: {
        baseURL: 'http://localhost:8000/',
        timeout: 4000
    },
    notify: {
        timeout: 3000
    }
};

F7ReactCompositeApp.prototype.middlewares = {
    beforePageInit: function beforePageInit() {},
    afterPageInit: function afterPageInit() {},
    afterPageUnmount: function afterPageUnmount() {},
    beforePageUnmount: function beforePageUnmount() {}
};

exports['default'] = F7ReactCompositeApp;
module.exports = exports['default'];