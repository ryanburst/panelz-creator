'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// https://github.com/sroucheray/event-class
var multiChannelSep = /(?:,|\s)+/g;
var channelSep = /:+/g;
var channelsSymbol = Symbol('channels');

var EventClass = function () {
    function EventClass() {
        _classCallCheck(this, EventClass);

        this[channelsSymbol] = {};
    }

    _createClass(EventClass, [{
        key: '_getChannels',
        value: function _getChannels(channelString) {
            return channelString.trim().split(multiChannelSep);
        }
    }, {
        key: '_getNameSpaces',
        value: function _getNameSpaces(channel) {
            var namespaces = [];
            var splittedChannels = channel.trim().split(channelSep);

            for (var i = splittedChannels.length; i >= 1; i--) {
                namespaces.push(splittedChannels.slice(0, i).join(':'));
            }

            return namespaces;
        }
    }, {
        key: 'trigger',
        value: function trigger(event) {
            var channels = this._getChannels(event);

            for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                data[_key - 1] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var channel = _step.value;

                    var namespaces = this._getNameSpaces(channel);
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = namespaces[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var namespace = _step2.value;

                            if (!this[channelsSymbol][namespace]) {
                                continue;
                            }

                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = this[channelsSymbol][namespace][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var callback = _step3.value;

                                    callback.apply(this, data);
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'on',
        value: function on(event, callback) {
            var channels = this._getChannels(event);

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = channels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var channel = _step4.value;

                    if (!this[channelsSymbol][channel]) {
                        this[channelsSymbol][channel] = [];
                    }

                    this[channelsSymbol][channel].push(callback);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: 'off',
        value: function off(event, callback) {
            var channels = this._getChannels(event);

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = channels[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var channel = _step5.value;

                    if (!this[channelsSymbol][channel]) {
                        return;
                    }

                    var index = this[channelsSymbol][channel].indexOf(callback);

                    if (index > -1) {
                        this[channelsSymbol][channel].splice(index, 1);
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }, {
        key: 'once',
        value: function once(event, callback) {
            function offCallback() {
                this.off(event, callback);
                this.off(event, offCallback);
            }

            this.on(event, callback);
            this.on(event, offCallback);
        }
    }]);

    return EventClass;
}();

var Book = function (_EventClass) {
    _inherits(Book, _EventClass);

    function Book(app, config) {
        _classCallCheck(this, Book);

        var _this = _possibleConstructorReturn(this, (Book.__proto__ || Object.getPrototypeOf(Book)).call(this));

        _this.app = app;
        _this.config = config;
        _this.id = config.id;
        _this.title = config.title;
        _this.pages = config.pages || [];
        _this.currentPage = false;

        _this.makeSortable();
        _this.setEventListeners();
        return _this;
    }

    _createClass(Book, [{
        key: 'makeSortable',
        value: function makeSortable() {
            $(".workspace-navigation__list").sortable({
                placeholder: "workspace-navigation__list-item ui-state-highlight",
                start: function start(e, ui) {
                    ui.placeholder.height(ui.item.height());
                },
                update: this.onPageSort.bind(this),
                axis: 'y'
            });
        }
    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.on('editingPage', this.setCurrentPage.bind(this));
        }
    }, {
        key: 'add',
        value: function add(pageConfig) {
            if (pageConfig instanceof Page) {
                this.pages.push(pageConfig);
                return;
            }
            var page = new Page(this, pageConfig);
            this.pages.push(page);

            var $element = $('<li class="workspace-navigation__list-item"><span class="workspace-navigation__delete-page"><i class="fa fa-times-circle"></i></span><img src="' + page.url + '" /></li>').data('page', page);

            $('.workspace-navigation__list').append($element);

            $element.trigger('click');

            this.trigger('pageAdded', page);
        }
    }, {
        key: 'setCurrentPage',
        value: function setCurrentPage(page) {
            this.currentPage = page;
        }
    }, {
        key: 'onPageSort',
        value: function onPageSort(ev, ui) {
            console.log('PAge sort');
            this.pages = $('.workspace-navigation__list-item').map(function (i, el) {
                return $(el).data('page');
            }).get();
            console.log(this.pages);
        }
    }, {
        key: 'toArray',
        value: function toArray() {
            var pages = this.pages.map(function (page) {
                return page.toArray();
            });
            return {
                id: this.id,
                title: $('.viewport__title-input').val(),
                pages: pages
            };
        }
    }, {
        key: 'title',
        set: function set(title) {
            $('.viewport__title-input').val(title);
            this._title = title;
        },
        get: function get() {
            return this._title;
        }
    }, {
        key: 'pages',
        set: function set(pages) {
            this._pages = [];
            pages.forEach(this.add.bind(this));
        },
        get: function get() {
            return this._pages;
        }
    }]);

    return Book;
}(EventClass);

var Page = function (_EventClass2) {
    _inherits(Page, _EventClass2);

    function Page(Book, config) {
        _classCallCheck(this, Page);

        var _this2 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

        _this2.labels = "abcdefghijklmnopqrstuvwxyz";
        _this2.app = Book.app;
        _this2.book = Book;
        _this2.url = config.url;
        _this2.size = config.size;
        _this2.width = config.width;
        _this2.height = config.height;
        _this2.panels = config.panels || [];

        _this2.setEventListeners();
        return _this2;
    }

    _createClass(Page, [{
        key: 'getNextLabel',
        value: function getNextLabel() {
            if (!this.labelRound) {
                this.labelRound = 1;
            }
            if (!this.remainingLabels || !this.remainingLabels.length) {
                if (this.remainingLabels && !this.remainingLabels.length) {
                    this.labelRound += 1;
                }
                this.remainingLabels = this.labels.toUpperCase().split("").map(function (val) {
                    return val.repeat(this.labelRound);
                }.bind(this));
            }

            return this.remainingLabels.shift();
        }
    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.on('edit', this.onEdit.bind(this));
            this.on('panelObjectAdded', this.onPanelObjectAdded.bind(this));
            this.on('panelObjectRemoved', this.onPanelObjectRemoved.bind(this));
        }
    }, {
        key: 'onEdit',
        value: function onEdit(pageObject) {
            this.$element = pageObject;
            this.book.trigger('editingPage', this);
        }
    }, {
        key: 'onPanelObjectAdded',
        value: function onPanelObjectAdded(panelObject, panel) {
            if (!panel) {
                var panel = new Panel(this, {});
                this.panels.push(panel);
            }
            panel.$element = panelObject;
            this.book.trigger('panelSet', panel);
        }
    }, {
        key: 'onPanelObjectRemoved',
        value: function onPanelObjectRemoved(panel) {
            var index = this.panels.indexOf(panel);
            this.panels.splice(index, 1);
            this.book.trigger('panelRemoved', panel);
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.width;
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.height;
        }
    }, {
        key: 'toArray',
        value: function toArray() {
            var panels = this.panels.map(function (panel) {
                return panel.toArray();
            });
            return {
                url: this.url,
                size: this.size,
                width: this.width,
                height: this.height,
                panels: panels
            };
        }
    }, {
        key: 'panels',
        set: function set(panels) {
            this._panels = [];
            panels.forEach(function (data) {
                var panel = data instanceof Panel ? data : new Panel(this, data);
                this.panels.push(panel);
            }.bind(this));
        },
        get: function get() {
            return this._panels;
        }
    }]);

    return Page;
}(EventClass);

var Panel = function (_EventClass3) {
    _inherits(Panel, _EventClass3);

    function Panel(Page, config) {
        _classCallCheck(this, Panel);

        var _this3 = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this));

        _this3.app = Page.app;
        _this3.page = Page;
        _this3.config = config || {};
        _this3.x = _this3.config.x;
        _this3.y = _this3.config.y;
        _this3.width = _this3.config.width;
        _this3.height = _this3.config.height;
        _this3.label = _this3.config.label || 'Panel ' + _this3.page.getNextLabel();
        return _this3;
    }

    _createClass(Panel, [{
        key: 'setObjectEventListeners',
        value: function setObjectEventListeners() {
            this.$element.on('moving', this.onObjectMoved.bind(this));
            this.$element.on('scaling', this.onObjectScaled.bind(this));
            this.$element.on('removed', this.onObjectRemoved.bind(this));
            this.$element.on('selected', this.onObjectSelected.bind(this));
            this.$element.on('deselected', this.onObjectDeselected.bind(this));
        }
    }, {
        key: 'onObjectSelected',
        value: function onObjectSelected() {
            var index = this.page.panels.indexOf(this);
            $('.controls__menu--panels .controls__menu-item').eq(index).addClass('controls__menu-item--selected');
        }
    }, {
        key: 'onObjectDeselected',
        value: function onObjectDeselected() {
            var index = this.page.panels.indexOf(this);
            $('.controls__menu--panels .controls__menu-item').eq(index).removeClass('controls__menu-item--selected');
        }
    }, {
        key: 'onObjectMoved',
        value: function onObjectMoved(e) {
            this.setPropertiesFromCanvas();

            if (this.getLeft() < 0) {
                this.$element.left = this.page.$element.left;
                this.setPropertiesFromCanvas();
            }

            if (this.getCurrentLeft() + this.getCurrentWidth() > this.page.$element.left + this.page.$element.getWidth()) {
                this.$element.left = Math.max(this.page.$element.left + this.page.$element.getWidth() - this.getCurrentWidth(), this.page.$element.left);
                this.setPropertiesFromCanvas();
            }

            if (this.getTop() < 0) {
                this.$element.top = this.page.$element.top;
                this.setPropertiesFromCanvas();
            }

            if (this.getCurrentTop() + this.getCurrentHeight() > this.page.$element.top + this.page.$element.getHeight()) {
                this.$element.top = Math.max(this.page.$element.top + this.page.$element.getHeight() - this.getCurrentHeight(), this.page.$element.top);
                this.setPropertiesFromCanvas();
            }

            this.$element.setCoords();
        }
    }, {
        key: 'onObjectScaled',
        value: function onObjectScaled(e) {
            this.setPropertiesFromCanvas();

            if (this.getLeft() < 0) {
                this.$element.left = this.page.$element.left;
                this.setPropertiesFromCanvas();
            }

            if (this.getCurrentLeft() + this.getCurrentWidth() > this.page.$element.left + this.page.$element.getWidth()) {
                var width = this.page.$element.left + this.page.$element.getWidth() - this.getCurrentLeft();
                this.$element.scaleX = width / this.$element.width;
                this.setPropertiesFromCanvas();
            }

            if (this.getTop() < 0) {
                this.$element.top = this.page.$element.top;
                this.setPropertiesFromCanvas();
            }

            if (this.getCurrentTop() + this.getCurrentHeight() > this.page.$element.top + this.page.$element.getHeight()) {
                var height = this.page.$element.top + this.page.$element.getHeight() - this.getCurrentTop();
                this.$element.scaleY = height / this.$element.height;
                this.setPropertiesFromCanvas();
            }

            this.$element.setCoords();
        }
    }, {
        key: 'setPropertiesFromCanvas',
        value: function setPropertiesFromCanvas() {
            this.x = Math.round((this.getCurrentLeft() - this.page.$element.left) * this.page.getWidth() / this.page.$element.getWidth());
            this.y = Math.round((this.getCurrentTop() - this.page.$element.top) * this.page.getHeight() / this.page.$element.getHeight());
            this.width = Math.round(this.getCurrentWidth() * this.page.getWidth() / this.page.$element.getWidth());
            this.height = Math.round(this.getCurrentHeight() * this.page.getHeight() / this.page.$element.getHeight());
        }
    }, {
        key: 'getPropertiesForCanvas',
        value: function getPropertiesForCanvas() {
            return {
                x: Math.round(this.getLeft() * this.page.$element.getWidth() / this.page.getWidth() + this.page.$element.left),
                y: Math.round(this.getTop() * this.page.$element.getHeight() / this.page.getHeight() + this.page.$element.top),
                width: Math.round(this.getWidth() * this.page.$element.getWidth() / this.page.getWidth()),
                height: Math.round(this.getHeight() * this.page.$element.getHeight() / this.page.getHeight())
            };
        }
    }, {
        key: 'onObjectRemoved',
        value: function onObjectRemoved() {
            this.page.trigger('panelObjectRemoved', this);
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.width;
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.height;
        }
    }, {
        key: 'getTop',
        value: function getTop() {
            return this.y;
        }
    }, {
        key: 'getLeft',
        value: function getLeft() {
            return this.x;
        }
    }, {
        key: 'getCurrentWidth',
        value: function getCurrentWidth() {
            return this.$element.width * this.$element.scaleX;
        }
    }, {
        key: 'getCurrentHeight',
        value: function getCurrentHeight() {
            return this.$element.height * this.$element.scaleY;
        }
    }, {
        key: 'getCurrentTop',
        value: function getCurrentTop() {
            return this.$element.top;
        }
    }, {
        key: 'getCurrentLeft',
        value: function getCurrentLeft() {
            return this.$element.left;
        }
    }, {
        key: 'toArray',
        value: function toArray() {
            return {
                x: this.getLeft(),
                y: this.getTop(),
                width: this.getWidth(),
                height: this.getHeight(),
                label: this.label
            };
        }
    }, {
        key: '$element',
        set: function set(value) {
            this._$element = value;
            this.setObjectEventListeners();
            this.onObjectScaled();
        },
        get: function get() {
            return this._$element;
        }
    }]);

    return Panel;
}(EventClass);

var PanelzCreator = function (_EventClass4) {
    _inherits(PanelzCreator, _EventClass4);

    function PanelzCreator(config) {
        _classCallCheck(this, PanelzCreator);

        var _this4 = _possibleConstructorReturn(this, (PanelzCreator.__proto__ || Object.getPrototypeOf(PanelzCreator)).call(this));

        _this4.DEFAULTS = {
            id: false,
            container: '.panelz-creator-container',
            method: 'ui',
            comic: {},
            endpoints: {
                view: '/read/',
                get: '/comic/',
                create: '/create',
                save: '/save',
                upload: '/upload'
            },
            onCreateComicSuccess: function onCreateComicSuccess() {}
        };

        _this4.config = $.extend(true, {}, _this4.DEFAULTS, config);

        _this4.setEventListeners();

        if (_this4.config.method === 'id') {
            _this4.loadById(_this4.config.id);
        } else if (_this4.config.method === 'data') {
            _this4.loadByData(config.comic);
        } else {
            _this4.loadByUI();
        }
        return _this4;
    }

    _createClass(PanelzCreator, [{
        key: 'loadById',
        value: function loadById(id) {
            $.ajax({
                url: this.getEndpoint('get') + id,
                method: 'GET',
                error: this.onRequestError.bind(this),
                success: this.loadByData.bind(this)
            });
        }
    }, {
        key: 'loadByData',
        value: function loadByData(data) {
            this.showEditor();
            this.book = new Book(this, data);
            this.upload = new Upload(this);
            this.workspace = new Workspace(this, this.book, this.upload);
            this.upload.on('pageUploaded', this.onPageUploaded.bind(this));

            $('[data-view-link]').attr('href', this.getEndpoint('view') + "?id=" + this.book.id);
        }
    }, {
        key: 'loadByUI',
        value: function loadByUI() {
            this.showCreateUI();
            $('body').on('click', '.viewport__entry-submit', this.createComic.bind(this));
        }
    }, {
        key: 'showCreateUI',
        value: function showCreateUI() {
            $('.viewport__loading').addClass('viewport__loading--hidden');
            $('.viewport__entry').removeClass('viewport__entry--hidden');
            $('.viewport__title-bar').addClass('viewport__title-bar--hidden');
            $('.viewport__content').addClass('viewport__content--hidden');
        }
    }, {
        key: 'showEditor',
        value: function showEditor() {
            $('.viewport__loading').addClass('viewport__loading--hidden');
            $('.viewport__entry').addClass('viewport__entry--hidden');
            $('.viewport__title-bar').removeClass('viewport__title-bar--hidden');
            $('.viewport__content').removeClass('viewport__content--hidden');
            $(window).on('beforeunload', this.saveComic.bind(this));
        }
    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('body').on('click', '.button--submit', this.onSubmitButtonClick.bind(this));
            $('body').on('complete', '.button--submit', this.onSubmitButtonComplete.bind(this));
            $('body').on('click', '.button--save', this.saveComic.bind(this));
        }
    }, {
        key: 'createComic',
        value: function createComic(e) {
            e.preventDefault();
            $.ajax({
                url: this.getEndpoint('create'),
                method: 'POST',
                data: {
                    title: $('.viewport__entry-input').val()
                },
                error: this.onCreateComicError.bind(this),
                success: function (data) {
                    this.config.onCreateComicSuccess.call(this, data);
                    this.loadByData(data);
                }.bind(this),
                complete: function complete() {
                    $(e.currentTarget).trigger('complete', e);
                }
            });
        }
    }, {
        key: 'onCreateComicError',
        value: function onCreateComicError(response) {
            try {
                var data = JSON.parse(response.responseText);
            } catch (Exeception) {
                data = { message: 'Something terrible has happened. Try again?' };
            }
            $('.viewport__entry-error').text(data.message).show();
        }
    }, {
        key: 'saveComic',
        value: function saveComic(e) {
            e.preventDefault();
            $.ajax({
                url: this.getEndpoint('save'),
                method: 'PUT',
                async: e.type === "beforeunload" ? false : true,
                data: this.book.toArray(),
                error: this.onRequestError.bind(this),
                success: this.onSaveComicSuccess.bind(this),
                complete: function complete() {
                    $(e.currentTarget).trigger('complete', e);
                }
            });
        }
    }, {
        key: 'onSaveComicSuccess',
        value: function onSaveComicSuccess(data) {
            console.log('SUCCESS!', data);
            this.message('Your comic has been saved.');
        }
    }, {
        key: 'onRequestError',
        value: function onRequestError(response) {
            try {
                var data = JSON.parse(response.responseText);
            } catch (Exeception) {
                data = { message: 'Something terrible has happened. Try again?' };
            }
            this.message(data.message);
        }
    }, {
        key: 'onSubmitButtonClick',
        value: function onSubmitButtonClick(e) {
            var $this = $(e.currentTarget);
            $this.width($this.width());
            $this.find('.button__icon').css('display', 'inline-block');
            $this.find('.button__text').hide();
        }
    }, {
        key: 'onSubmitButtonComplete',
        value: function onSubmitButtonComplete(e) {
            var $this = $(e.currentTarget);
            $this.css('width', 'auto');
            $this.find('.button__icon').hide();
            $this.find('.button__text').show();
        }
    }, {
        key: 'onPageUploaded',
        value: function onPageUploaded(data) {
            this.book.add(data);
        }
    }, {
        key: 'onBeforeUnload',
        value: function onBeforeUnload() {}
    }, {
        key: 'getEndpoint',
        value: function getEndpoint(endpoint) {
            return this.endpoints[endpoint];
        }
    }, {
        key: 'message',
        value: function message(_message, time) {
            var time = time ? time : 4000;

            clearTimeout(this.messageTimeout);

            $('.viewport__message').text(_message).fadeIn();
            this.messageTimeout = setTimeout(function () {
                $('.viewport__message').fadeOut();
            }, time);
        }
    }, {
        key: 'config',
        set: function set(config) {
            Object.keys(config).forEach(function (key) {
                this[key] = config[key];
            }.bind(this));
            this._config = config;
        },
        get: function get() {
            return this._config;
        }
    }, {
        key: 'container',
        set: function set(container) {
            this._container = container;
            this.$container = $(container).append(PANELZ_CREATOR_MARKUP);
        },
        get: function get() {
            return _$container;
        }
    }]);

    return PanelzCreator;
}(EventClass);

var Upload = function (_EventClass5) {
    _inherits(Upload, _EventClass5);

    function Upload(app) {
        _classCallCheck(this, Upload);

        var _this5 = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this));

        _this5.app = app;
        var myDropzone = new Dropzone(".upload__dropzone", {
            url: _this5.app.getEndpoint('upload'),
            paramName: "page",
            clickable: $('.upload .button--upload')[0],
            addRemoveLinks: true,
            headers: {
                "Cache-Control": "",
                "X-Requested-With": ""
            }
        });

        _this5.app.on('cancelUpload', function () {
            myDropzone.removeAllFiles(true);
        });

        myDropzone.on("sending", function (file, xhr, formData) {
            formData.append("comicID", this.app.book.id);
        });

        myDropzone.on("success", function (file, server) {
            myDropzone.removeFile(file);
            this.trigger('pageUploaded', server);
        }.bind(_this5));
        return _this5;
    }

    return Upload;
}(EventClass);

var DRAW_MODE = 'DRAW_MODE';
var SELECT_MODE = 'SELECT_MODE';

var Workspace = function (_EventClass6) {
    _inherits(Workspace, _EventClass6);

    function Workspace(app, book, upload) {
        _classCallCheck(this, Workspace);

        var _this6 = _possibleConstructorReturn(this, (Workspace.__proto__ || Object.getPrototypeOf(Workspace)).call(this));

        _this6.app = app;
        _this6.drawStarted = false;
        _this6.drawX = 0;
        _this6.drawY = 0;

        _this6.book = book;
        _this6.upload = upload;
        _this6.mode = SELECT_MODE;

        _this6.OBJECT_SETTINGS = {
            originX: 'left',
            originY: 'top',
            angle: 0,
            fill: 'rgba(255,0,0,0.5)',
            transparentCorners: false,
            cornerColor: 'rgba(102,153,255,0.5)',
            cornerSize: 12,
            lockRotation: true,
            hasRotatingPoint: false
        };

        _this6.canvas = new fabric.Canvas('workspace__canvas');

        $(".controls__menu").sortable({
            placeholder: "controls__menu-item ui-state-highlight",
            start: function start(e, ui) {
                ui.placeholder.height(ui.item.height());
            },
            update: _this6.onPanelOrderUpdate.bind(_this6),
            axis: 'y'
        });

        _this6.setEventListeners();

        if (_this6.book.pages.length) {
            $('.workspace-navigation__list-item:eq(0)').trigger('click');
        }
        return _this6;
    }

    _createClass(Workspace, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('body').on('click', '.workspace-navigation__add', this.showUploadScreen.bind(this));
            $('body').on('click', '.workspace-navigation__list-item', this.selectPage.bind(this));
            this.upload.on('pageUploaded', this.hideUploadScreen.bind(this));
            this.book.on('editingPage', this.onEditingPage.bind(this));
            this.book.on('panelSet', this.onPanelSet.bind(this));
            $(window).on('resize', this.onResize.bind(this)).trigger('resize');
            this.canvas.observe('mouse:down', this.mousedown.bind(this));
            this.canvas.observe('mouse:move', this.mousemove.bind(this));
            this.canvas.observe('mouse:up', this.mouseup.bind(this));
            this.canvas.observe('object:selected', this.setContextControlPosition.bind(this));
            this.canvas.observe('object:modified', this.setContextControlPosition.bind(this));
            this.canvas.observe('object:moving', this.hideContextControls.bind(this));
            this.canvas.observe('object:scaling', this.hideContextControls.bind(this));
            this.canvas.observe('selection:cleared', this.hideContextControls.bind(this));
            $(".upper-canvas").bind('contextmenu', this.onContextMenuClick.bind(this));
            $('.controls__button').on('click', this.onControlsClick.bind(this));
            $('.controls__option--panels').on('focusout', this.onControlButtonBlur.bind(this));
            $('.controls__button--delete').on('click', this.deleteObject.bind(this));
            $('.controls__button--duplicate').on('click', this.duplicateObject.bind(this));
            $('body').on('mousedown', '.controls__menu-item', this.onPanelSelect.bind(this));
            $('body').on('click', '.workspace-navigation__delete-page', this.onDeletePage.bind(this));
            $('body').on('click', '.upload__cancel', this.hideUploadScreen.bind(this));
            this.app.on('renderCanvas', this.render.bind(this));
        }
    }, {
        key: 'showUploadScreen',
        value: function showUploadScreen() {
            $('.upload').removeClass('upload--hidden');
            if (this.book.pages.length) {
                $('.upload__cancel').show();
            } else {
                $('.upload__cancel').hide();
            }
        }
    }, {
        key: 'hideUploadScreen',
        value: function hideUploadScreen() {
            this.app.trigger('cancelUpload');
            $('.upload').addClass('upload--hidden');
        }
    }, {
        key: 'onEditingPage',
        value: function onEditingPage(page) {
            if (!page.panels.length) {
                $('.controls__option--draw .controls__button').trigger('click');
                return;
            }

            page.panels.forEach(function (panel) {
                var properties = panel.getPropertiesForCanvas();
                var rect = new fabric.Rect($.extend({}, this.OBJECT_SETTINGS, {
                    left: properties.x,
                    top: properties.y,
                    width: properties.width,
                    height: properties.height
                }));
                this.canvas.add(rect);
                this.book.currentPage.trigger('panelObjectAdded', rect, panel);
            }.bind(this));
            $('.controls__option--select .controls__button').trigger('click');
        }
    }, {
        key: 'onPanelSet',
        value: function onPanelSet(panel) {
            var $element = $('<li class="controls__menu-item panel-item"><span><span data-panel-num>' + (this.book.currentPage.panels.indexOf(panel) + 1) + '</span>.</span> <span class="panel-item__text">' + panel.label + '</span><input type="text" value="' + panel.label + '" class="panel-item__input" /></li>').data('panel', panel);
            var $text = $element.find('.panel-item__text');
            var $input = $element.find('.panel-item__input');
            $('.controls__menu--panels').append($element);
            $('.controls__option--panels .controls__button').prop('disabled', false);
            $element.on('dblclick', function (e) {
                $text.hide();
                $input.val($text.text()).show().focus();
            });
            $input.on('keyup', function (e) {
                if (e.keyCode === 13 && $input.val().length) {
                    $input.hide();
                    $text.text($input.val()).show();
                    panel.label = $text.text();
                }
            });
            panel.$element.on('removed', function () {
                $element.remove();
                $('.controls__menu-item').each(function (index, element) {
                    $(element).find('[data-panel-num]').text(index + 1);
                });
                if (!this.book.currentPage.panels.length) {
                    $('.controls__option--panels .controls__button').prop('disabled', true);
                }
            }.bind(this));
        }
    }, {
        key: 'onPanelOrderUpdate',
        value: function onPanelOrderUpdate(ui, element) {
            this.book.currentPage.panels = $('.controls__menu-item').map(function (i, el) {
                var panel = $(el).data('panel');
                $(el).find('[data-panel-num]').text(i + 1);
                this.canvas.moveTo(panel.$element, i + 1);
                return panel;
            }.bind(this)).get();
        }
    }, {
        key: 'onPanelSelect',
        value: function onPanelSelect(e) {
            var $this = $(e.currentTarget);
            var panel = $this.data('panel');
            this.canvas.setActiveObject(panel.$element);
        }
    }, {
        key: 'onDeletePage',
        value: function onDeletePage(e) {
            var $this = $(e.currentTarget);
            var $element = $this.closest('.workspace-navigation__list-item');
            var page = $element.data('page');
            var index = this.book.pages.indexOf(page);

            e.stopPropagation();

            this.book.pages.splice(index, 1);

            $element.remove();

            if (this.book.pages.length) {
                var nextIndex = this.book.pages.length > index ? index : 0;
                $('.workspace-navigation__list-item').eq(nextIndex).trigger('click');
            } else {
                this.canvas.clear();
                $('.controls--edit').addClass('controls--hidden');
                $('.workspace-navigation__add').trigger('click');
            }
        }
    }, {
        key: 'selectPage',
        value: function selectPage(e) {
            var $this = $(e.currentTarget);
            var index = $this.index();
            var page = this.book.pages[index];

            var canvasWidth = this.canvas.getWidth();
            var canvasHeight = this.canvas.getHeight();
            var width = canvasWidth;
            var height = page.getHeight() * canvasWidth / page.getWidth();

            if (height > canvasHeight) {
                height = canvasHeight;
                width = page.getWidth() * canvasHeight / page.getHeight();
            }

            var imageSettings = {
                top: (canvasHeight - height) / 2,
                left: (canvasWidth - width) / 2,
                width: width,
                height: height,
                selectable: false
            };

            this.canvas.clear();

            $('.controls__option--panels .controls__button').prop('disabled', true);
            $('.controls__menu--panels').empty();
            $('.controls--edit').removeClass('controls--hidden');

            this.hideUploadScreen();

            // Reset scroll so we get a clean position
            //$('.workspace-navigation__list').scrollTop(0);

            $('.workspace-navigation__list-item--active').removeClass('workspace-navigation__list-item--active');
            $this.addClass('workspace-navigation__list-item--active');
            $('.workspace-navigation__list').animate({
                scrollTop: $this.position().top + $('.workspace-navigation__list').scrollTop() - 20
            }, 850);

            fabric.Image.fromURL(page.url, function (oImg) {
                oImg.set(imageSettings);
                this.canvas.add(oImg);

                page.trigger('edit', oImg);
            }.bind(this));
        }
    }, {
        key: 'mousedown',
        value: function mousedown(o) {
            if (this.mode !== DRAW_MODE) return true;

            this.drawStarted = true;
            var pointer = this.canvas.getPointer(o.e);
            this.drawX = pointer.x;
            this.drawY = pointer.y;
            var rect = new fabric.Rect($.extend({}, this.OBJECT_SETTINGS, {
                left: this.drawX,
                top: this.drawY,
                width: pointer.x - this.drawX,
                height: pointer.y - this.drawY
            }));
            this.canvas.add(rect);
            this.drawStarted = rect;
        }
    }, {
        key: 'mousemove',
        value: function mousemove(o) {
            if (this.mode !== DRAW_MODE || !this.drawStarted) return true;

            var pointer = this.canvas.getPointer(o.e);
            var rect = this.drawStarted;

            if (this.drawX > pointer.x) {
                rect.set({ left: Math.abs(pointer.x) });
            }
            if (this.drawY > pointer.y) {
                rect.set({ top: Math.abs(pointer.y) });
            }

            rect.set({ width: Math.abs(this.drawX - pointer.x) });
            rect.set({ height: Math.abs(this.drawY - pointer.y) });
            rect.setCoords();

            this.canvas.renderAll();
        }
    }, {
        key: 'mouseup',
        value: function mouseup(e) {
            if (this.mode === DRAW_MODE && this.drawStarted) {
                this.book.currentPage.trigger('panelObjectAdded', this.drawStarted);
                this.canvas.setActiveObject(this.drawStarted);
                this.drawStarted = false;
                this.drawX = 0;
                this.drawY = 0;
                $('.controls__option--select .controls__button').trigger('click');
            }
        }
    }, {
        key: 'switchModes',
        value: function switchModes(mode) {
            this.mode = mode;
            if (mode === DRAW_MODE) {
                this.canvas.deactivateAllWithDispatch().renderAll();
            }
            this.book.currentPage.panels.forEach(function (panel) {
                panel.$element.selectable = mode === DRAW_MODE ? false : true;
            });
        }
    }, {
        key: 'onControlsClick',
        value: function onControlsClick(e) {
            var $this = $(e.currentTarget);
            var mode = $this.attr('data-mode');
            $('.controls__button').removeClass('controls__button--active');
            $this.addClass('controls__button--active');
            $('.controls__menu').hide();
            if ($this.attr('data-menu')) {
                $this.closest('.controls__option').find('.controls__menu').show();
            }

            this.switchModes(mode);
        }
    }, {
        key: 'onContextMenuClick',
        value: function onContextMenuClick(e) {
            var pointer = this.canvas.getPointer(e.originalEvent);
            var objects = this.canvas.getObjects();
            for (var i = objects.length - 1; i >= 0; i--) {
                if (objects[i].containsPoint(pointer)) {
                    this.canvas.setActiveObject(objects[i]);
                    break;
                }
            }

            if (i < 0) {
                this.canvas.deactivateAllWithDispatch();
            }

            this.canvas.renderAll();

            e.preventDefault();
            return false;
        }
    }, {
        key: 'setContextControlPosition',
        value: function setContextControlPosition(e) {
            var panel = e.target;
            var top = panel.top - 40 > 0 ? panel.top - 40 : panel.top + panel.height * panel.scaleY + 5;
            var left = panel.left;

            if (top > this.canvas.getHeight() - $('.controls--context').outerHeight() - 5) {
                top = Math.max(5, panel.top + 5);
                left += 5;
            }
            $('.controls--context').css({
                top: top,
                left: left
            }).removeClass('controls--hidden');
        }
    }, {
        key: 'hideContextControls',
        value: function hideContextControls() {
            if ($('.controls__option--panels > .controls__button--active').length) {
                $('.controls__option--select .controls__button').trigger('click');
            }

            $('.controls--context').addClass('controls--hidden');
        }
    }, {
        key: 'deleteObject',
        value: function deleteObject(e) {
            if (this.canvas.getActiveGroup()) {
                this.canvas.getActiveGroup().forEachObject(function (o) {
                    this.canvas.remove(o);
                }.bind(this));
                this.canvas.discardActiveGroup().renderAll();
            } else {
                this.canvas.remove(this.canvas.getActiveObject());
            }
            $('.controls__option--select .controls__button').trigger('click');
        }
    }, {
        key: 'duplicateObject',
        value: function duplicateObject() {

            var panels = [this.canvas.getActiveObject()];

            if (this.canvas.getActiveGroup()) {
                panels = this.canvas.getActiveGroup().getObjects();
            }

            this.canvas.deactivateAllWithDispatch().renderAll();

            panels.forEach(function (obj) {
                var panel = obj.clone();
                panel.set(this.OBJECT_SETTINGS);
                panel.set("top", panel.top + 5);
                panel.set("left", panel.left + 5);
                this.canvas.add(panel);
                this.book.currentPage.trigger('panelObjectAdded', panel);
                this.canvas.setActiveObject(panel);
            }.bind(this));

            $('.controls__option--select .controls__button').trigger('click');
        }
    }, {
        key: 'onControlButtonBlur',
        value: function onControlButtonBlur(e) {
            if ($(e.relatedTarget).is('.panel-item__input') || $(e.target).is('.panel-item__input')) {
                return true;
            }
            $('.controls__option--select .controls__button').trigger('click');
        }
    }, {
        key: 'onResize',
        value: function onResize(e) {
            this.canvas.setWidth($('.workspace').width()).setHeight($('.workspace').height());
        }
    }, {
        key: 'render',
        value: function render() {
            this.canvas.renderAll();
        }
    }]);

    return Workspace;
}(EventClass);

var PANELZ_CREATOR_MARKUP = '\n    <div class="viewport">\n        <div class="viewport__message"></div>\n        <div class="viewport__loading">\n            <h2>Loading...</h2>\n            <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>\n        </div>\n        <form class="viewport__entry viewport__entry--hidden">\n            <h1>Enter the name of your comic to get started.</h1>\n            <p class="viewport__entry-error"></p>\n            <input type="text" class="viewport__entry-input" name="title" placeholder="Comic Title" />\n            <button class="button button--submit viewport__entry-submit" type="submit">\n                <span class="button__icon"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></span>\n                <span class="button__text">Create Your Comic</span>\n            </button>\n        </form>\n        <form class="viewport__title-bar viewport__title-bar--hidden">\n            <input type="text" class="viewport__title-input" placeholder="Comic Title" />\n            <button class="button button--submit button--save viewport__title-bar-button" type="submit">\n                <span class="button__icon"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></span>\n                <span class="button__text">Save Comic</span>\n            </button>\n            <a href="#" class="button button--alt viewport__title-bar-button" data-view-link>View Comic</a>\n        </form>\n        <div class="viewport__content viewport__content--hidden">\n            <div class="viewport__workspace-navigation workspace-navigation">\n                <div class="workspace-navigation__title">Pages</div>\n                <ul class="workspace-navigation__list"></ul>\n                <div class="workspace-navigation__add">\n                    <i class="fa fa-plus workspace-navigation__add-icon"></i>\n                    <span>Add Page</span>\n                </div>\n            </div>\n            <div class="viewport__workspace workspace">\n                <canvas id="workspace__canvas" class="workspace__canvas" width="100" hieght="100"></canvas>\n                <div class="workspace__controls">\n                    <ul class="controls controls--edit controls--hidden">\n                        <li class="controls__option controls__option--select controls__button--active">\n                            <button class="controls__button" data-mode="SELECT_MODE" title="Select Panel">\n                                <i class="fa fa-hand-pointer-o"></i>\n                            </button>\n                        </li>\n                        <li class="controls__option controls__option--draw">\n                            <button class="controls__button" data-mode="DRAW_MODE" title="Draw Panel">\n                                <i class="fa fa-pencil-square-o"></i>\n                            </button>\n                        </li>\n                        <li class="controls__option controls__option--panels">\n                            <button class="controls__button" data-mode="SELECT_MODE" data-menu="panels" disabled title="Organize Panels">\n                                <i class="fa fa-picture-o"></i>\n                            </button>\n                            <ul class="controls__menu controls__menu--panels">\n                                <li class="controls__menu-item">Panel A</li>\n                                <li class="controls__menu-item">Panel B</li>\n                                <li class="controls__menu-item">Panel C</li>\n                                <li class="controls__menu-item">Panel D</li>\n                                <li class="controls__menu-item">Panel E</li>\n                                <li class="controls__menu-item">Panel F</li>\n                                <li class="controls__menu-item">Panel G</li>\n                                <li class="controls__menu-item">Panel H</li>\n                                <li class="controls__menu-item">Panel I</li>\n                            </ul>\n                        </li>\n                    </ul>\n                </div>\n                <ul class="controls controls--context controls--hidden">\n                    <li class="controls__option">\n                        <button class="controls__button controls__button--duplicate" data-mode="SELECT_MODE" title="Clone Panel">\n                            <i class="fa fa-clone"></i>\n                        </button>\n                    </li>\n                    <li class="controls__option">\n                        <button class="controls__button controls__button--delete" data-mode="SELECT_MODE" title="Delete Panel">\n                            <i class="fa fa-trash"></i>\n                        </button>\n                    </li>\n                </ul>\n                <div class="upload">\n                    <a href="#" class="upload__cancel">Cancel</a>\n                    <div class="upload__dropzone">\n                        <div class="upload__select">\n                            <i class="fa fa-cloud-upload upload__dropzone-icon"></i>\n                            <span>Drag and Drop to Upload</span>\n                            <span style="font-size: 14px;">or</span>\n                            <button class="button button--upload">Select File From Your Computer</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n';