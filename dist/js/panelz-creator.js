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

/**
 * Book class that keeps track of the comic data.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Book = function (_EventClass) {
    _inherits(Book, _EventClass);

    /**
     * Takes in a configuration object for the
     * application settings.
     *
     * @constructs Book
     * @param {PanelzCreator} app    PanelzCreator instance
     * @param {Object}        config Configuration options
     */
    function Book(app, config) {
        _classCallCheck(this, Book);

        /**
         * PanelzCreator application instance
         * @type {PanelzCreator}
         */
        var _this = _possibleConstructorReturn(this, (Book.__proto__ || Object.getPrototypeOf(Book)).call(this));

        _this.app = app;
        /**
         * Configuration options
         * @type {Object}
         */
        _this.config = config;
        /**
         * Comic identifier
         * @type {String}
         */
        _this.id = config.id;
        /**
         * Title of the comic
         * @type {String}
         */
        _this.title = config.title;
        /**
         * Holds all the data for each page
         * @type {Array}
         */
        _this.pages = config.pages || [];
        /**
         * Holds the class instance for the
         * current page active in the workspace
         * @type {Page}
         */
        _this.currentPage = false;

        _this.makeSortable();
        _this.setEventListeners();
        return _this;
    }

    /**
     * When the title property is updated, update
     * the viewport element.
     *
     * @param  {String} title Title of comic
     */


    _createClass(Book, [{
        key: 'makeSortable',


        /**
         * Makes the page section sortable. Uses the jQuery UI
         * sortable method to allow drag and drop sorting of pages.
         */
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

        /**
         * Sets event listeners. When editing a page, set the current
         * page to that item.
         */

    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.on('editingPage', this.setCurrentPage.bind(this));
        }

        /**
         * Initializes a page object configuration into a class
         * instance and adds it to the internal pages array.
         *
         * @param {Object} pageConfig Page configuration options
         * @fires Book#pageAdded
         */

    }, {
        key: 'add',
        value: function add(pageConfig) {
            // In some cases, the item may already be a Page instance,
            // if this is the case, no need to initialize it again, simply
            // add it to the pages array.
            if (pageConfig instanceof Page) {
                return this.pages.push(pageConfig);
            }
            var page = new Page(this.app, this, pageConfig);
            this.pages.push(page);

            // Create the item for the pages list in the UI
            var $element = $('<li class="workspace-navigation__list-item"><span class="workspace-navigation__delete-page"><i class="fa fa-times-circle"></i></span><img src="' + page.url + '" /></li>').data('page', page);

            $('.workspace-navigation__list').append($element);
            /**
             * Page added event
             *
             * @event Book#pageAdded
             * @type {Object}
             * @property {Page} Page instance
             */
            this.trigger('pageAdded', page);
        }

        /**
         * Sets the current page active in the workspace
         *
         * @param {Page} page Page instance
         */

    }, {
        key: 'setCurrentPage',
        value: function setCurrentPage(page) {
            this.currentPage = page;
        }

        /**
         * User has sorted the page order in the interface. Use the
         * data method to pull the class instance from the element
         * and reorder the pages array property.
         */

    }, {
        key: 'onPageSort',
        value: function onPageSort() {
            this.pages = $('.workspace-navigation__list-item').map(function (i, el) {
                return $(el).data('page');
            }).get();
        }

        /**
         * Turn the class instance into an array. Loops through all of
         * pages and turns them into an array as well.
         *
         * @return {Object}
         */

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
        }

        /**
         * Gets the title internal
         *
         * @return {String}
         */
        ,
        get: function get() {
            return this._title;
        }

        /**
         * When setting pages, loop through each and call
         * the add method to initialize each page as a
         * class instance.
         *
         * @param {Array} pages Pages for the comic
         */

    }, {
        key: 'pages',
        set: function set(pages) {
            this._pages = [];
            pages.forEach(this.add.bind(this));
        }

        /**
         * Gets pages internal
         *
         * @return {Array}
         */
        ,
        get: function get() {
            return this._pages;
        }
    }]);

    return Book;
}(EventClass);

/**
 * Represents a Page within a comic. Has an array that
 * keeps track of all of the panels on the page. Keeps
 * track of what labels have been used for panels to
 * try and produce unique panels names per page.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Page = function (_EventClass2) {
    _inherits(Page, _EventClass2);

    /**
     * Sets up a page instance and intializes event listeners.
     *
     * @param  {PanelzCreator} app    Application instance
     * @param  {Book}          Book   Book this page belongs to
     * @param  {Object}        config Configuration options
     */
    function Page(app, Book, config) {
        _classCallCheck(this, Page);

        /**
         * Application instance
         * @type {PanelzCreator}
         */
        var _this2 = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

        _this2.app = app;
        /**
         * Comic this page belongs to
         * @type {Book}
         */
        _this2.book = Book;
        /**
         * URL of the image that is this page
         * @type {String}
         */
        _this2.url = config.url;
        /**
         * Size of the page image in bytes
         * @type {Number}
         */
        _this2.size = config.size;
        /**
         * Width of the page image
         * @type {Number}
         */
        _this2.width = config.width;
        /**
         * Height of the page image
         * @type {Number}
         */
        _this2.height = config.height;
        /**
         * All of the available labels.
         * Each character is broken off as a new label.
         * @type {String}
         */
        _this2.labels = "abcdefghijklmnopqrstuvwxyz";
        /**
         * Holds the active labels that can be used.
         * @type {Array}
         */
        _this2.remainingLabels = [];
        /**
         * Number of times the labels have been used up
         * @type {Number}
         */
        _this2.labelRound = 0;
        /**
         * Array of panel instances.
         * @type {Array}
         */
        _this2.panels = config.panels || [];
        /**
         * Holds the image element reference.
         * @type {Object}
         */
        _this2.$element = false;

        _this2.setEventListeners();
        return _this2;
    }

    /**
     * When setting the panels array, loop through
     * all of the panes and attempt to convert them
     * to a Panel class instance. If it's already a
     * panel, no need to create a new one.
     *
     * @param  {Array} panels Array of panel configuration objects or instances
     */


    _createClass(Page, [{
        key: 'getNextLabel',


        /**
         * Gets the next available label. Splits the labels array
         * and pops it off the front. If the options have all been
         * used up, it begins doubling up on the label (AA, BB);
         * @return {String}
         */
        value: function getNextLabel() {
            // No labels left, up the label round and recreate
            // the remaining labels array with a repeated string
            // of each label option (A -> AA -> AAA)
            if (!this.remainingLabels.length) {
                this.labelRound += 1;
                this.remainingLabels = this.labels.toUpperCase().split("").map(function (val) {
                    return val.repeat(this.labelRound);
                }.bind(this));
            }

            return 'Panel ' + this.remainingLabels.shift();
        }

        /**
         * Sets event listeners for editing this page, adding and removing
         * panel objects from the workspace.
         */

    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.on('edit', this.onEdit.bind(this));
            this.on('panelObjectAdded', this.onPanelObjectAdded.bind(this));
            this.on('panelObjectRemoved', this.onPanelObjectRemoved.bind(this));
        }

        /**
         * When the user wants to edit this page, set the element
         * property and tell the book the page is ready to be edited.
         *
         * @param {Object} pageObject FabricJS canvas object
         * @fires Book#editingPage
         */

    }, {
        key: 'onEdit',
        value: function onEdit(pageObject) {
            this.$element = pageObject;
            /**
             * Editing page event
             *
             * @event Book#editingPage
             * @type {Object}
             * @property {Page} Page being edited
             */
            this.book.trigger('editingPage', this);
        }

        /**
         * A new canvas rectangle representing a panel has been
         * added to the canvas. If this is a brand new panel,
         * add it to the panels array, otherwise it's already
         * be added to the canvas before (we may be loading
         * a page with panels already created).
         *
         * @param {Object} panelObject FabricJS panel object
         * @param {Panel}  panel       Panel instance
         * @fires Book#panelSet
         */

    }, {
        key: 'onPanelObjectAdded',
        value: function onPanelObjectAdded(panelObject, panel) {
            if (!panel) {
                var panel = new Panel(this.app, this, {});
                this.panels.push(panel);
            }
            panel.$element = panelObject;
            /**
             * Panel added event
             *
             * @event Book#panelAdded
             * @type {Object}
             * @property {Page} Panel that was added
             */
            this.book.trigger('panelSet', panel);
        }

        /**
         * A canvas panel object has been removed from the
         * canvas. Unlike the add event, this means it's
         * gone for good and we want to remove it from the
         * panels array that keeps track of all the panels.
         *
         * @param {Panel} panel Panel being removed
         * @fires Book#panelRemoved
         */

    }, {
        key: 'onPanelObjectRemoved',
        value: function onPanelObjectRemoved(panel) {
            var index = this.panels.indexOf(panel);
            this.panels.splice(index, 1);
            this.book.trigger('panelRemoved', panel);
        }

        /**
         * Gets the width of the page image element
         *
         * @return {Number}
         */

    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.width;
        }

        /**
         * Gets the height of the page image element
         * @return {Number}
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.height;
        }

        /**
         * Converts the class data to an array. Loops through
         * all of the panels and turns them into an array as well.
         *
         * @return {Object}
         */

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
                var panel = data instanceof Panel ? data : new Panel(this.app, this, data);
                this._panels.push(panel);
            }.bind(this));
        }

        /**
         * Returns the panels array internal.
         *
         * @return {Array} [description]
         */
        ,
        get: function get() {
            return this._panels;
        }
    }]);

    return Page;
}(EventClass);

/**
 * Represents a panel within a page. When on the workspace,
 * this panel is a canvas rectangle object. It has an object
 * width and height that needs to be converted to what size
 * and location it would be on the actual page image.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Panel = function (_EventClass3) {
    _inherits(Panel, _EventClass3);

    /**
     * Initiates a new panel instance with a few properties.
     *
     * @param {PanelzCreator} app    Application instance
     * @param {Page}          Page   Page this panel belongs to
     * @param {Object}        config Configuration options
     */
    function Panel(app, Page, config) {
        _classCallCheck(this, Panel);

        /**
         * Application instance
         * @type {PanelzCreator}
         */
        var _this3 = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this));

        _this3.app = app;
        /**
         * Page this panel belongs to
         * @type {Page}
         */
        _this3.page = Page;
        /**
         * Configuration options
         * @type {config}
         */
        _this3.config = config || {};
        /**
         * X coordinate on a page
         * @type {Number}
         */
        _this3.x = _this3.config.x;
        /**
         * Y coordinate on a page
         * @type {Number}
         */
        _this3.y = _this3.config.y;
        /**
         * Width of the panel
         * @type {Number}
         */
        _this3.width = _this3.config.width;
        /**
         * Height of a panel
         * @type {Numeber}
         */
        _this3.height = _this3.config.height;
        /**
         * Panel label for organization purposes
         * @type {String}
         */
        _this3.label = _this3.config.label || _this3.page.getNextLabel();
        /**
         * Element representing the FabricJS object on the canvas
         * @type {Object}
         */
        _this3.$element = false;
        return _this3;
    }

    /**
     * When the element is set, begin listening to canvas events.
     *
     * @param  {Object} value FabricJS object instance
     */


    _createClass(Panel, [{
        key: 'setObjectEventListeners',


        /**
         * Listen for events on the object in order to update
         * the true x/y and width/height values.
         */
        value: function setObjectEventListeners() {
            this.$element.on('moving', this.onObjectMoved.bind(this));
            this.$element.on('scaling', this.onObjectScaled.bind(this));
            this.$element.on('removed', this.onObjectRemoved.bind(this));
            this.$element.on('selected', this.onObjectSelected.bind(this));
            this.$element.on('deselected', this.onObjectDeselected.bind(this));
        }

        /**
         * When the object is selected on the canvas, make sure it's also
         * selected in the panels menu.
         */

    }, {
        key: 'onObjectSelected',
        value: function onObjectSelected() {
            var index = this.page.panels.indexOf(this);
            $('.controls__menu--panels .controls__menu-item').eq(index).addClass('controls__menu-item--selected');
        }

        /**
         * Object has been deselected on the canvas, deselect the menu
         * option as well.
         */

    }, {
        key: 'onObjectDeselected',
        value: function onObjectDeselected() {
            var index = this.page.panels.indexOf(this);
            $('.controls__menu--panels .controls__menu-item').eq(index).removeClass('controls__menu-item--selected');
        }

        /**
         * The object has moved from the canvas. Update the internal coordinates,
         * as well as provide restrictions on its movements to make sure
         * it does not flow outside of the page element.
         *
         * @param  {Object} e Event object
         */

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

        /**
         * The object has been scaled on the canvas. Update the width/height
         * internal values and restrict it's size and location so it does not
         * overflow the current page element.
         *
         * @param {Object} e Event object
         */

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

        /**
         * Updates the class properties based on the size and location the
         * panel is on the canvas.
         */

    }, {
        key: 'setPropertiesFromCanvas',
        value: function setPropertiesFromCanvas() {
            this.x = Math.round((this.getCurrentLeft() - this.page.$element.left) * this.page.getWidth() / this.page.$element.getWidth());
            this.y = Math.round((this.getCurrentTop() - this.page.$element.top) * this.page.getHeight() / this.page.$element.getHeight());
            this.width = Math.round(this.getCurrentWidth() * this.page.getWidth() / this.page.$element.getWidth());
            this.height = Math.round(this.getCurrentHeight() * this.page.getHeight() / this.page.$element.getHeight());
        }

        /**
         * Converts the actual location and size of panel to the coordinates and
         * sizes needed for the page element on the canvas.
         *
         * @return {Object}
         */

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

        /**
         * The panel object has been removed, so trigger an event
         * on the page class instance.
         *
         * @fires Page#panelObjectRemoved
         */

    }, {
        key: 'onObjectRemoved',
        value: function onObjectRemoved() {
            /**
             * Panel object removed event
             *
             * @event Page#panelObjectRemoved
             * @type {Object}
             * @property {Panel} Panel that was removed
             */
            this.page.trigger('panelObjectRemoved', this);
        }

        /**
         * Gets the width of the panel
         * @return {Number}
         */

    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.width;
        }

        /**
         * Gets the height of the panel.
         *
         * @return {Number}
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.height;
        }

        /**
         * Gets the y coordinate of the panel
         *
         * @return {Number}
         */

    }, {
        key: 'getTop',
        value: function getTop() {
            return this.y;
        }

        /**
         * Gets the x coordinate of the panel
         *
         * @return {Number}
         */

    }, {
        key: 'getLeft',
        value: function getLeft() {
            return this.x;
        }

        /**
         * Gets the current width of the panel, sized
         * to fit the current page element.
         *
         * @return {Number}
         */

    }, {
        key: 'getCurrentWidth',
        value: function getCurrentWidth() {
            return this.$element.width * this.$element.scaleX;
        }

        /**
         * Gets the current heiht of the panel, sized
         * to fit the current page element.
         *
         * @return {Number}
         */

    }, {
        key: 'getCurrentHeight',
        value: function getCurrentHeight() {
            return this.$element.height * this.$element.scaleY;
        }

        /**
         * Gets the current y coordinate of the panel,
         * sized to fit the current page element.
         *
         * @return {Number}
         */

    }, {
        key: 'getCurrentTop',
        value: function getCurrentTop() {
            return this.$element.top;
        }

        /**
         * Gets the current x coordinate of the panel,
         * sized to fit the current page element.
         *
         * @return {Number}
         */

    }, {
        key: 'getCurrentLeft',
        value: function getCurrentLeft() {
            return this.$element.left;
        }

        /**
         * Returns an array value of this class instance
         *
         * @return {Object}
         */

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
            if (value) {
                this._$element = value;
                this.setObjectEventListeners();
                this.onObjectScaled();
            }
        }

        /**
         * Returns the FabricJS object internal.
         *
         * @return {Object}
         */
        ,
        get: function get() {
            return this._$element;
        }
    }]);

    return Panel;
}(EventClass);

/**
 * The main client class for the Panelz Creator application.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var PanelzCreator = function (_EventClass4) {
    _inherits(PanelzCreator, _EventClass4);

    /**
     * Takes in a configuration object for the
     * application settings.
     *
     * @constructs PanelzCreator
     * @param config
     */
    function PanelzCreator(config) {
        _classCallCheck(this, PanelzCreator);

        var _this4 = _possibleConstructorReturn(this, (PanelzCreator.__proto__ || Object.getPrototypeOf(PanelzCreator)).call(this));

        _this4.DEFAULTS = {
            /**
             * The container to load the comic reader into.
             * Should be a jQuery selector
             *
             * @type {String}
             * @default
             */
            container: '.panelz-creator-container',
            /**
             * The method by which to load the interface.
             * id: fetch comic book data
             * data: load the comic via an object
             * ui: allow them to create from scratch
             * @type {String}
             */
            method: 'ui',
            /**
             * ID of the book to load when fetching the data.
             * This value is required if a <#comic> object
             * has not been provided.
             *
             * @type {String}
             * @default
             */
            id: false,
            /**
             * Object of comic data to load into the creator. Must
             * contain an id, title, and array of pages. Each page
             * object must look like the following:
             *     id: "<stringID>",
             *     title: "<title>",
             *     pages = [
             *         {
             *             url: "<urlOfImage>",
             *             size: <size> //in bytes
             *             panels: [
             *                 {
             *                     x: xCoordinateOfPanel
             *                     y: yCoordinateOfPanel
             *                     width: widthOfPanel
             *                     height: heightOfPanel
             *                 }
             *                 ...
             *             ]
             *         }
             *         ...
             *     ]
             * The panels array within each page can be empty if the
             * page contains to panels to zoom to for the Panel Zoom feature.
             *
             * @type {Object}
             * @default
             */
            comic: {},
            /**
             * Supply a custom list of endpoints. The Panelz reader
             * requires a number of configured URLs.
             *
             * The {id} placeholder will be swapped for the supplied
             * <#id> configuration parameter.
             *
             * @type {Object}
             * @default
             */
            endpoints: {
                /**
                 * Link to view the comic
                 *
                 * @type {String}
                 */
                view: '/read/?id={id}',
                /**
                 * Gets comic data
                 *
                 * Method: GET
                 * Request:
                 *     {
                 *         id: <id>
                 *     }
                 * Response:
                 *     {
                 *         id: <id>,
                 *         title: <title>,
                 *         panels: [
                 *             {
                 *                 x: <x>,
                 *                 y: <y>,
                 *                 width: <width>,
                 *                 height: <height>
                 *             }
                 *             ...
                 *         ]
                 *     }
                 */
                get: '/comic/{id}',
                /**
                 * Creates a comic book and returns the new ID
                 *
                 * Method: POST
                 * Request:
                 *     {
                 *         title: <title>
                 *     }
                 * Response:
                 *     {
                 *         id: <id>,
                 *         title: <title>,
                 *         panels: []
                 *     }
                 */
                create: '/create',
                /**
                 * Saves comic data wholesale
                 *
                 * Method: PUT
                 * Request:
                 *     {
                 *         id: <id>,
                 *         title: <title>,
                 *         panels: [
                 *             {
                 *                 x: <x>,
                 *                 y: <y>,
                 *                 width: <width>,
                 *                 height: <height>
                 *             }
                 *             ...
                 *         ]
                 *     }
                 * Response:
                 *     {
                 *         id: <id>,
                 *         title: <title>,
                 *         panels: [
                 *             {
                 *                 x: <x>,
                 *                 y: <y>,
                 *                 width: <width>,
                 *                 height: <height>
                 *             }
                 *             ...
                 *         ]
                 *     }
                 */
                save: '/save',
                /**
                 * Uploads a page to a comic
                 *
                 * Method: POST
                 * Request:
                 *     {
                 *         page: <file>
                 *         id: <id>
                 *     }
                 * Response:
                 *     {
                 *         url: <url>
                 *         size: <size>
                 *         width: <width>
                 *         height: <height>
                 *     }
                 */
                upload: '/upload'
            },
            /**
             * Callback for when a comic is created, for the user
             * to hook into if they need to. Good for redirecting
             * or changing the URL to include the ID.
             *
             * @type {Function}
             * @default
             */
            onCreateComicSuccess: function onCreateComicSuccess() {}
        };
        /**
         * Holds the ID of the book, either from the passed
         * in configuration or from the fetched comic book data.
         *
         * @type {String}
         */
        _this4.id = false;
        /**
         * jQuery object that holds the interface markup
         *
         * @type {Object}
         */
        _this4.$container = false;
        /**
         * Message callback function
         * @type {Function}
         */
        _this4.messageTimeout = false;

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

    /**
     * When setting the configuration, set each of the keys
     * as a property in the application.
     *
     * @param {Object} config Configuration options
     */


    _createClass(PanelzCreator, [{
        key: 'loadById',


        /**
         * Load the comic by fetching the data via the id.
         *
         * @param {String} id ID of comic to fetch
         */
        value: function loadById(id) {
            $.ajax({
                url: this.getEndpoint('get'),
                method: 'GET',
                error: this.onRequestError.bind(this),
                success: this.loadByData.bind(this)
            });
        }

        /**
         * Load the comic data. Shows the editor interface and
         * initializes the classes needed. Also updates the view
         * comic link with the view endpoint.
         *
         * @param {Object} data Comic data
         */

    }, {
        key: 'loadByData',
        value: function loadByData(data) {
            this.showEditor();
            this.id = data.id;
            this.book = new Book(this, data);
            this.upload = new Upload(this);
            this.workspace = new Workspace(this, this.book, this.upload);
            this.upload.on('pageUploaded', this.onPageUploaded.bind(this));

            $('[data-view-link]').attr('href', this.getEndpoint('view'));
        }

        /**
         * Load the creation UI and allow them to save a comic from scratch.
         */

    }, {
        key: 'loadByUI',
        value: function loadByUI() {
            this.showCreateUI();
            $('body').on('click', '.viewport__entry-submit', this.createComic.bind(this));
        }

        /**
         * Shows the creation UI by hiding and removing elements with special classes.
         */

    }, {
        key: 'showCreateUI',
        value: function showCreateUI() {
            $('.viewport__loading').addClass('viewport__loading--hidden');
            $('.viewport__entry').removeClass('viewport__entry--hidden');
            $('.viewport__title-bar').addClass('viewport__title-bar--hidden');
            $('.viewport__content').addClass('viewport__content--hidden');
        }

        /**
         * Shows the editor interface by hiding and removing elements
         * with special classes. Makes sure the save comic transaction
         * occurs when they leave (unload) the page.
         */

    }, {
        key: 'showEditor',
        value: function showEditor() {
            $('.viewport__loading').addClass('viewport__loading--hidden');
            $('.viewport__entry').addClass('viewport__entry--hidden');
            $('.viewport__title-bar').removeClass('viewport__title-bar--hidden');
            $('.viewport__content').removeClass('viewport__content--hidden');
            $(window).on('beforeunload', this.saveComic.bind(this));
        }

        /**
         * Sets event listeners for the page.
         */

    }, {
        key: 'setEventListeners',
        value: function setEventListeners() {
            $('body').on('click', '.button--submit', this.onSubmitButtonClick.bind(this));
            $('body').on('complete', '.button--submit', this.onSubmitButtonComplete.bind(this));
            $('body').on('click', '.button--save', this.saveComic.bind(this));
        }

        /**
         * Creates a comic by sending off the title to the create endpoint. This
         * endpoint should create an ID and return it with the title.
         *
         * @param {Object} e Event object
         */

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

        /**
         * An error has occured attempting to create a comic. Message
         * the user with the error, if possible.
         *
         * @param {Object} response Response object from the server
         */

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

        /**
         * Ships of the comic data to the save endpoint.
         *
         * @param {Object} e Event object
         */

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

        /**
         * When a save has been successful, message the user.
         *
         * @param  {Object} data Comic data
         */

    }, {
        key: 'onSaveComicSuccess',
        value: function onSaveComicSuccess(data) {
            console.log('SUCCESS!', data);
            this.message('Your comic has been saved.');
        }

        /**
         * A request to the server has failed. Attempt to message them
         * with any message from the server, or fall back on a generic message.
         *
         * @param  {Object} response Server response data
         */

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

        /**
         * Submit button has been clicked, show a progress icon
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'onSubmitButtonClick',
        value: function onSubmitButtonClick(e) {
            var $this = $(e.currentTarget);
            $this.width($this.width());
            $this.find('.button__icon').css('display', 'inline-block');
            $this.find('.button__text').hide();
        }

        /**
         * Submission was complete after pressing a submit button, so
         * hide the icon and show the text.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'onSubmitButtonComplete',
        value: function onSubmitButtonComplete(e) {
            var $this = $(e.currentTarget);
            $this.css('width', 'auto');
            $this.find('.button__icon').hide();
            $this.find('.button__text').show();
        }

        /**
         * Page has been uploaded via the interface, add the page
         * data to the book.
         *
         * @param  {Object} data Page data
         */

    }, {
        key: 'onPageUploaded',
        value: function onPageUploaded(data) {
            this.book.add(data);
        }

        /**
         * Gets a specific endpoint from the array of endpoints. Replaces
         * the {id} placeholder with the id set in the configuration.
         *
         * @param  {String} endpoint Which endpoint to grab from the array
         * @return {String}
         */

    }, {
        key: 'getEndpoint',
        value: function getEndpoint(endpoint) {
            return this.endpoints[endpoint].replace('{id}', this.id);
        }

        /**
         * Displays a message for the user within the viewport.
         *
         * @param  {String} message Message to display
         * @param  {Number} time    Time in ms to display the message
         */

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
        }

        /**
         * Gets internal config property
         *
         * @return {Object}
         */
        ,
        get: function get() {
            return this._config;
        }

        /**
         * When setting the container, also set a $container property
         * holding appended markup.
         *
         * @param {String} container jQuery selector for container
         */

    }, {
        key: 'container',
        set: function set(container) {
            this._container = container;
            this.$container = $(container).append(PANELZ_CREATOR_MARKUP);
        }

        /**
         * Gets the internal container property
         * @return {Object}
         */
        ,
        get: function get() {
            return _$container;
        }
    }]);

    return PanelzCreator;
}(EventClass);

/**
 * Handles uploads for a page. Uses the Dropzone
 * library to do drag and drop or selectable uploads.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */


var Upload = function (_EventClass5) {
    _inherits(Upload, _EventClass5);

    /**
     * Initiates the Upload item and initiates the Dropzone library
     *
     * @constructs
     * @param {PanelzCreator} app PanelzCreator instance
     */
    function Upload(app) {
        _classCallCheck(this, Upload);

        /**
         * PanelzCreator instance
         * @type {[PanelzCreator]}
         */
        var _this5 = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this));

        _this5.app = app;
        /**
         * Dropzone instance
         * @type {Dropzone}
         */
        _this5.dropzone = new Dropzone(".upload__dropzone", {
            acceptedFiles: "image/jpeg,image/png",
            url: _this5.app.getEndpoint('upload'),
            paramName: "page",
            clickable: $('.upload .button--upload')[0],
            addRemoveLinks: true,
            headers: {
                "Cache-Control": "",
                "X-Requested-With": ""
            }
        });

        _this5.setEventListeners();
        return _this5;
    }

    /**
     * Sets event listeners on the application and dropzone
     */


    _createClass(Upload, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            this.app.on('cancelUpload', this.onCancelUpload.bind(this));
            this.dropzone.on("sending", this.onFileSending.bind(this));
            this.dropzone.on("success", this.onUploadSuccess.bind(this));
            this.dropzone.on('complete', this.onUploadComplete.bind(this));
            this.dropzone.on('error', this.onUploadError.bind(this));
        }

        /**
         * Cancel upload has been initiated, so clear all files from
         * the Dropzone instance.
         *
         * @return {Boolean}
         */

    }, {
        key: 'onCancelUpload',
        value: function onCancelUpload() {
            if (this.areUploadsComplete()) {
                return true;
            }
            this.dropzone.removeAllFiles(true);
            return this.app.message('Upload canceled');
        }

        /**
         * A file is being sent, add the comic ID to the data being sent.
         *
         * @param {Object} file     File being sent
         * @param {xhr}    xhr      xhr object
         * @param {Object} formData Data being sent
         */

    }, {
        key: 'onFileSending',
        value: function onFileSending(file, xhr, formData) {
            formData.append("comicID", this.app.book.id);
        }

        /**
         * The file has been uploaded, remove it from the the dropzone
         * instance and trigger an uploaded event.
         *
         * @param  {Object} file   dropzone file
         * @param  {Object} server Server response object
         * @fires  Upload#pageUploaded
         */

    }, {
        key: 'onUploadSuccess',
        value: function onUploadSuccess(file, server) {
            this.dropzone.removeFile(file);
            /**
             * Page Uploaded event
             *
             * @event Upload#pageUploaded
             * @type {Object}
             * @property {Object} Server response
             */
            this.trigger('pageUploaded', server);
        }

        /**
         * A file upload is complete. If all of the uploads
         * have been completed, we can trigger the complete event.
         *
         * @param  {Object} file   dropzone file
         * @param  {Object} server Server response object\
         * @fires  Upload#complete
         */

    }, {
        key: 'onUploadComplete',
        value: function onUploadComplete(file, server) {
            if (this.areUploadsComplete()) {
                /**
                 * Complete event
                 *
                 * @event Upload#complete
                 * @type {Object}
                 */
                this.trigger('complete');
            }
        }

        /**
         * Checks to see if all dropzone uploads have been completed.
         * @return {Boolean}
         */

    }, {
        key: 'areUploadsComplete',
        value: function areUploadsComplete() {
            return this.dropzone.getUploadingFiles().length === 0 && this.dropzone.getQueuedFiles().length === 0;
        }

        /**
         * When there is an upload error, message the user (unless
         * the user canceled the upload);
         *
         * @param  {Object} file         Dropzone file
         * @param  {String} errorMessage Error message from server
         * @return {Boolean}
         */

    }, {
        key: 'onUploadError',
        value: function onUploadError(file, errorMessage) {
            if (file.status === 'canceled') {
                return false;
            }
            this.app.message('Error uploading ' + file.name);
            return this.dropzone.removeFile(file);
        }
    }]);

    return Upload;
}(EventClass);

/**
 * String value for draw mode
 *
 * @constant
 * @type {String}
 */


var DRAW_MODE = 'DRAW_MODE';
/**
 * String value for select mode
 *
 * @constant
 * @type {String}
 */
var SELECT_MODE = 'SELECT_MODE';
/**
 * Class representing the workspace area for working
 * and uploading pages.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */

var Workspace = function (_EventClass6) {
    _inherits(Workspace, _EventClass6);

    /**
     * Initiates the Workspace object with settings
     * and initiates sortable lists.
     *
     * @constructs
     * @param  {PanelzCreator} app    PanelzCreator instance
     * @param  {Book}          book   Book instance
     * @param  {Upload}        upload Upload Instance
     */
    function Workspace(app, book, upload) {
        _classCallCheck(this, Workspace);

        /**
         * PanelzCreator instance
         * @type {PanelzCreator}
         */
        var _this6 = _possibleConstructorReturn(this, (Workspace.__proto__ || Object.getPrototypeOf(Workspace)).call(this));

        _this6.app = app;
        /**
         * Book class instance
         * @type {Book}
         */
        _this6.book = book;
        /**
         * Upload instance
         * @type {Upload}
         */
        _this6.upload = upload;
        /**
         * Current mode
         * @type {String}
         */
        _this6.mode = SELECT_MODE;
        /**
         * Keeps track of whether or not the
         * user is in the middle of drawing
         * @type {Boolean}
         */
        _this6.drawStarted = false;
        /**
         * The x coordinate of the draw
         * @type {Number}
         */
        _this6.drawX = 0;
        /**
         * The y coordinate of the draw
         * @type {Number}
         */
        _this6.drawY = 0;
        /**
         * Default object settings for creating rectangles
         * @type {Object}
         */
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
        /**
         * Reference to the working canvas element,
         * using the FabricJS library.
         * @type {fabric}
         */
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
            $('.workspace-navigation__list-item:eq(0)').trigger('activate');
        }
        return _this6;
    }

    /**
     * Assigns all sorts of event listeners to both the
     * controls and to local class instances.
     */


    _createClass(Workspace, [{
        key: 'setEventListeners',
        value: function setEventListeners() {
            var $body = $('body');
            $body.on('click activate', '.workspace-navigation__add', this.showUploadScreen.bind(this));
            $body.on('click activate', '.workspace-navigation__list-item', this.selectPage.bind(this));
            $body.on('contextmenu', '.upper-canvas', this.onContextMenuClick.bind(this));
            $body.on('click activate', '.controls__button', this.onControlsClick.bind(this));
            $body.on('focusout', '.controls__option--panels', this.onControlButtonBlur.bind(this));
            $body.on('click activate', '.controls__button--delete', this.deleteObject.bind(this));
            $body.on('click activate', '.controls__button--duplicate', this.duplicateObject.bind(this));
            $body.on('mousedown', '.controls__menu-item', this.onPanelSelect.bind(this));
            $body.on('click activate', '.workspace-navigation__delete-page', this.onDeletePage.bind(this));
            $body.on('click activate', '.upload__cancel', this.hideUploadScreen.bind(this));
            $(window).on('resize', this.onResize.bind(this)).trigger('resize');
            this.app.on('renderCanvas', this.render.bind(this));
            this.book.on('panelSet', this.onPanelSet.bind(this));
            this.book.on('editingPage', this.onEditingPage.bind(this));
            this.upload.on('complete', this.onUploadComplete.bind(this));
            this.canvas.observe('mouse:down', this.mousedown.bind(this));
            this.canvas.observe('mouse:move', this.mousemove.bind(this));
            this.canvas.observe('mouse:up', this.mouseup.bind(this));
            this.canvas.observe('object:selected', this.setContextControlPosition.bind(this));
            this.canvas.observe('object:modified', this.setContextControlPosition.bind(this));
            this.canvas.observe('object:moving', this.hideContextControls.bind(this));
            this.canvas.observe('object:scaling', this.hideContextControls.bind(this));
            this.canvas.observe('selection:cleared', this.hideContextControls.bind(this));
        }

        /**
         * Shows the upload screen by removing a CSS class. If there are
         * pages, make sure the cancel link is showing (otherwise hide it).
         */

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

        /**
         * Hides the upload screen and makes sure any current
         * queued uploads are canceled.
         *
         * @fires PanelzCreator#cancelUpload
         */

    }, {
        key: 'hideUploadScreen',
        value: function hideUploadScreen() {
            $('.upload').addClass('upload--hidden');
            /**
             * Cancel upload event
             *
             * @event PanelzCreator#cancelUpload
             * @type {Object}
             */
            this.app.trigger('cancelUpload');
        }

        /**
         * When the upload is complete, activate the final page
         * to trigger editing it on the canvas.
         */

    }, {
        key: 'onUploadComplete',
        value: function onUploadComplete() {
            $('.workspace-navigation__list-item:last-child').trigger('activate');
        }

        /**
         * Editing a page. Set up the page on the canvas with all of the panels.
         * If there are no panels, bail from this method and do not proceed.
         *
         * @param  {Page} page Class instance
         * @return {Boolean}
         */

    }, {
        key: 'onEditingPage',
        value: function onEditingPage(page) {
            if (!page.panels.length) {
                return $('.controls__option--draw .controls__button').trigger('activate');
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
            $('.controls__option--select .controls__button').trigger('activate');
        }

        /**
         * When a panel has been set, create an entry in the panel editor menu.
         * Assigns it a few events for renaming and selecting.
         *
         * @param  {Panel} panel Panel instance
         */

    }, {
        key: 'onPanelSet',
        value: function onPanelSet(panel) {
            var $element = $('<li class="controls__menu-item panel-item"><span><span data-panel-num>' + (this.book.currentPage.panels.indexOf(panel) + 1) + '</span>.</span> <span class="panel-item__text">' + panel.label + '</span><input type="text" value="' + panel.label + '" class="panel-item__input" /></li>').data('panel', panel);
            var $text = $element.find('.panel-item__text');
            var $input = $element.find('.panel-item__input');
            $('.controls__menu--panels').append($element);
            $('.controls__option--panels .controls__button').prop('disabled', false);

            // If the menu element is double clicked on, hide the text and show the text input
            $element.on('dblclick', function (e) {
                $text.hide();
                $input.val($text.text()).show().focus();
            });
            // If they hit enter, save the text as the panel label and hide the input/show text
            $input.on('keyup', function (e) {
                if (e.keyCode === 13 && $input.val().length) {
                    $input.hide();
                    $text.text($input.val()).show();
                    panel.label = $text.text();
                }
            });
            // If the panel element is removed on the canvas, remove this item from
            // the mennu and renumber the menu.
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

        /**
         * When the panel menu order is updated, reset the panels array for the
         * current page class instance.
         */

    }, {
        key: 'onPanelOrderUpdate',
        value: function onPanelOrderUpdate() {
            this.book.currentPage.panels = $('.controls__menu-item').map(function (i, el) {
                var panel = $(el).data('panel');
                $(el).find('[data-panel-num]').text(i + 1);
                this.canvas.moveTo(panel.$element, i + 1);
                return panel;
            }.bind(this)).get();
        }

        /**
         * A panel has been selected from the menu. Extract the panel
         * information from the data in the element and activate it
         * on the canvas.
         *
         * @param {Object} e Event object
         */

    }, {
        key: 'onPanelSelect',
        value: function onPanelSelect(e) {
            var $this = $(e.currentTarget);
            var panel = $this.data('panel');
            this.canvas.setActiveObject(panel.$element);
        }

        /**
         * User has selected the delete page option. Remove the page
         * from the array and the the actual element. If there are
         * more pages, activate the next page. If there are no more
         * pages, clear the canvas.
         *
         * @param {Object} e Event object
         */

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
                $('.workspace-navigation__list-item').eq(nextIndex).trigger('activate');
            } else {
                this.canvas.clear();
                $('.controls--edit').addClass('controls--hidden');
                $('.workspace-navigation__add').trigger('activate');
            }
        }

        /**
         * A page has been selected by the user. Center the image in
         * the workspace canvas and trigger an edit
         *
         * @param {Object} e Event object
         * @fires Page#edit
         */

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

            $('.workspace-navigation__list-item--active').removeClass('workspace-navigation__list-item--active');
            $this.addClass('workspace-navigation__list-item--active');
            $('.workspace-navigation__list').animate({
                scrollTop: $this.position().top + $('.workspace-navigation__list').scrollTop() - 20
            }, 850);

            fabric.Image.fromURL(page.url, function (oImg) {
                oImg.set(imageSettings);
                this.canvas.add(oImg);
                /**
                 * Page edit event
                 *
                 * @event Page#edit
                 * @type {Object}
                 * @property {Object} Canvas element
                 */
                page.trigger('edit', oImg);
            }.bind(this));
        }

        /**
         * User has clicked on the canvas. If the current
         * mode is Draw Mode, begin drawing a rectangle.
         *
         * @param  {Object} o Mouse down event
         */

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

        /**
         * User has mousemoved across the canvas. If this is draw mode
         * and they have begun to draw a rectangle. Continue drawing
         * the rectangle.
         *
         * @param  {Object} o Mouse event object
         */

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

        /**
         * User has let up on the mouse. If the current mode is in draw
         * mode and they were drawing a rectangle, consider this a complete
         * panel draw and add it to the current page.
         *
         * @param {Object} e Mouse event object
         */

    }, {
        key: 'mouseup',
        value: function mouseup(e) {
            if (this.mode === DRAW_MODE && this.drawStarted) {
                this.book.currentPage.trigger('panelObjectAdded', this.drawStarted);
                this.canvas.setActiveObject(this.drawStarted);
                this.drawStarted = false;
                this.drawX = 0;
                this.drawY = 0;
                $('.controls__option--select .controls__button').trigger('activate');
            }
        }

        /**
         * Switches the mode of the app. If they switch to Draw Mode
         * clear all activated items.
         *
         * @param  {String} mode Mode to switch to
         */

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

        /**
         * A controls menu item with a mode attribute has been
         * selected, so switch to that mode.
         *
         * @param  {Object} e Event object
         */

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

        /**
         * The user has right clicked on the canvas. If they have right
         * clicked on a panel, select that item. Return false to prevent
         * an actual context menu event from propagating.
         *
         * @param  {Object} e Event object
         * @return {Boolean}
         */

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

        /**
         * Sets the position of the context control menu. This is the menu
         * that appears along side an activated panel. Appears above it,
         * unless there's no room, at which it appears below it. In case
         * neither works, appears at the top inside of it.
         *
         * @param  {Object} e Event object
         */

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

        /**
         * Hides the context control menu items
         */

    }, {
        key: 'hideContextControls',
        value: function hideContextControls() {
            if ($('.controls__option--panels > .controls__button--active').length) {
                $('.controls__option--select .controls__button').trigger('activate');
            }
            $('.controls--context').addClass('controls--hidden');
        }

        /**
         * Delete a panel. If the selection is a group, delete each
         * item in the group.
         *
         * @param  {Object} e Event object
         */

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
            $('.controls__option--select .controls__button').trigger('activate');
        }

        /**
         * Duplicates a panel. If it's a group, make sure we duplicate
         * all items within the group.
         *
         * @fires Page#panelObjectAdded
         */

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
                /**
                 * Panel object added event
                 *
                 * @event Page#panelObjectAdded
                 * @type {Object}
                 * @property {Object} panel
                 */
                this.book.currentPage.trigger('panelObjectAdded', panel);
                this.canvas.setActiveObject(panel);
            }.bind(this));

            $('.controls__option--select .controls__button').trigger('activate');
        }

        /**
         * A control menu botton is blurred, under certain circumstances don't
         * do anything because we want the panels order menu to stay up. Otherwise
         * select the selection option.
         *
         * @param  {Object}  e Event object
         * @return {Boolean}
         */

    }, {
        key: 'onControlButtonBlur',
        value: function onControlButtonBlur(e) {
            if ($(e.relatedTarget).is('.panel-item__input') || $(e.target).is('.panel-item__input')) {
                return true;
            }
            $('.controls__option--select .controls__button').trigger('activate');
        }

        /**
         * When the window is resized, resize the working canvas.
         *
         * @param  {Object} e Event object
         */

    }, {
        key: 'onResize',
        value: function onResize(e) {
            this.canvas.setWidth($('.workspace').width()).setHeight($('.workspace').height());
        }

        /**
         * Renders all of the canvas object
         */

    }, {
        key: 'render',
        value: function render() {
            this.canvas.renderAll();
        }
    }]);

    return Workspace;
}(EventClass);

var PANELZ_CREATOR_MARKUP = '\n    <div class="viewport">\n        <div class="viewport__message"></div>\n        <div class="viewport__loading">\n            <h2>Loading...</h2>\n            <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>\n        </div>\n        <form class="viewport__entry viewport__entry--hidden">\n            <h1>Enter the name of your comic to get started.</h1>\n            <p class="viewport__entry-error"></p>\n            <input type="text" class="viewport__entry-input" name="title" placeholder="Comic Title" />\n            <button class="button button--submit viewport__entry-submit" type="submit">\n                <span class="button__icon"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></span>\n                <span class="button__text">Create Your Comic</span>\n            </button>\n        </form>\n        <form class="viewport__title-bar viewport__title-bar--hidden">\n            <input type="text" class="viewport__title-input" placeholder="Comic Title" />\n            <button class="button button--submit button--save viewport__title-bar-button" type="submit">\n                <span class="button__icon"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></span>\n                <span class="button__text">Save Comic</span>\n            </button>\n            <a href="#" class="button button--alt viewport__title-bar-button" data-view-link>View Comic</a>\n        </form>\n        <div class="viewport__content viewport__content--hidden">\n            <div class="viewport__workspace-navigation workspace-navigation">\n                <div class="workspace-navigation__title">Pages</div>\n                <ul class="workspace-navigation__list"></ul>\n                <div class="workspace-navigation__add">\n                    <i class="fa fa-plus workspace-navigation__add-icon"></i>\n                    <span>Add Page</span>\n                </div>\n            </div>\n            <div class="viewport__workspace workspace">\n                <canvas id="workspace__canvas" class="workspace__canvas" width="100" hieght="100"></canvas>\n                <div class="workspace__controls">\n                    <ul class="controls controls--edit controls--hidden">\n                        <li class="controls__option controls__option--select controls__button--active">\n                            <button class="controls__button" data-mode="SELECT_MODE" title="Select Panel">\n                                <i class="fa fa-hand-pointer-o"></i>\n                            </button>\n                        </li>\n                        <li class="controls__option controls__option--draw">\n                            <button class="controls__button" data-mode="DRAW_MODE" title="Draw Panel">\n                                <i class="fa fa-pencil-square-o"></i>\n                            </button>\n                        </li>\n                        <li class="controls__option controls__option--panels">\n                            <button class="controls__button" data-mode="SELECT_MODE" data-menu="panels" disabled title="Organize Panels">\n                                <i class="fa fa-picture-o"></i>\n                            </button>\n                            <ul class="controls__menu controls__menu--panels">\n                                <li class="controls__menu-item">Panel A</li>\n                                <li class="controls__menu-item">Panel B</li>\n                                <li class="controls__menu-item">Panel C</li>\n                                <li class="controls__menu-item">Panel D</li>\n                                <li class="controls__menu-item">Panel E</li>\n                                <li class="controls__menu-item">Panel F</li>\n                                <li class="controls__menu-item">Panel G</li>\n                                <li class="controls__menu-item">Panel H</li>\n                                <li class="controls__menu-item">Panel I</li>\n                            </ul>\n                        </li>\n                    </ul>\n                </div>\n                <ul class="controls controls--context controls--hidden">\n                    <li class="controls__option">\n                        <button class="controls__button controls__button--duplicate" data-mode="SELECT_MODE" title="Clone Panel">\n                            <i class="fa fa-clone"></i>\n                        </button>\n                    </li>\n                    <li class="controls__option">\n                        <button class="controls__button controls__button--delete" data-mode="SELECT_MODE" title="Delete Panel">\n                            <i class="fa fa-trash"></i>\n                        </button>\n                    </li>\n                </ul>\n                <div class="upload">\n                    <a href="#" class="upload__cancel">Cancel</a>\n                    <div class="upload__dropzone">\n                        <div class="upload__select">\n                            <i class="fa fa-cloud-upload upload__dropzone-icon"></i>\n                            <span>Drag and Drop to Upload</span>\n                            <span style="font-size: 14px;">or</span>\n                            <button class="button button--upload">Select File From Your Computer</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n';