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
class Panel extends EventClass {
    /**
     * Initiates a new panel instance with a few properties.
     *
     * @param {PanelzCreator} app    Application instance
     * @param {Page}          Page   Page this panel belongs to
     * @param {Object}        config Configuration options
     */
    constructor(app,Page,config) {
        super();
        /**
         * Application instance
         * @type {PanelzCreator}
         */
        this.app = app;
        /**
         * Page this panel belongs to
         * @type {Page}
         */
        this.page = Page;
        /**
         * Configuration options
         * @type {config}
         */
        this.config = config || {};
        /**
         * X coordinate on a page
         * @type {Number}
         */
        this.x = this.config.x;
        /**
         * Y coordinate on a page
         * @type {Number}
         */
        this.y = this.config.y;
        /**
         * Width of the panel
         * @type {Number}
         */
        this.width = this.config.width;
        /**
         * Height of a panel
         * @type {Numeber}
         */
        this.height = this.config.height;
        /**
         * Panel label for organization purposes
         * @type {String}
         */
        this.label = this.config.label || this.page.getNextLabel();
        /**
         * Element representing the FabricJS object on the canvas
         * @type {Object}
         */
        this.$element = false;
    }

    /**
     * When the element is set, begin listening to canvas events.
     *
     * @param  {Object} value FabricJS object instance
     */
    set $element(value) {
        if( value ) {
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
    get $element() {
        return this._$element;
    }

    /**
     * Listen for events on the object in order to update
     * the true x/y and width/height values.
     */
    setObjectEventListeners() {
        this.$element.on('moving',this.onObjectMoved.bind(this));
        this.$element.on('scaling',this.onObjectScaled.bind(this));
        this.$element.on('removed',this.onObjectRemoved.bind(this));
        this.$element.on('selected',this.onObjectSelected.bind(this));
        this.$element.on('deselected',this.onObjectDeselected.bind(this));
    }

    /**
     * When the object is selected on the canvas, make sure it's also
     * selected in the panels menu.
     */
    onObjectSelected() {
        var index = this.page.panels.indexOf(this);
        $('.controls__menu--panels .controls__menu-item').eq(index).addClass('controls__menu-item--selected');
    }

    /**
     * Object has been deselected on the canvas, deselect the menu
     * option as well.
     */
    onObjectDeselected() {
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
    onObjectMoved(e) {
        this.setPropertiesFromCanvas();

        if( this.getLeft() < 0 ) {
            this.$element.left = this.page.$element.left;
            this.setPropertiesFromCanvas();
        }

        if( this.getCurrentLeft() + this.getCurrentWidth() > this.page.$element.left + this.page.$element.getWidth()) {
            this.$element.left = Math.max(this.page.$element.left + this.page.$element.getWidth() - this.getCurrentWidth(),this.page.$element.left);
            this.setPropertiesFromCanvas();
        }


        if( this.getTop() < 0 ) {
            this.$element.top = this.page.$element.top;
            this.setPropertiesFromCanvas();
        }

        if( this.getCurrentTop() + this.getCurrentHeight() > this.page.$element.top + this.page.$element.getHeight()) {
            this.$element.top = Math.max(this.page.$element.top + this.page.$element.getHeight() - this.getCurrentHeight(),this.page.$element.top);
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
    onObjectScaled(e) {
        this.setPropertiesFromCanvas();

        if( this.getLeft() < 0 ) {
            this.$element.left = this.page.$element.left;
            this.setPropertiesFromCanvas();
        }

        if( this.getCurrentLeft() + this.getCurrentWidth() > this.page.$element.left + this.page.$element.getWidth()) {
            var width = this.page.$element.left + this.page.$element.getWidth() - this.getCurrentLeft();
            this.$element.scaleX = width / this.$element.width;
            this.setPropertiesFromCanvas();
        }

        if( this.getTop() < 0 ) {
            this.$element.top = this.page.$element.top;
            this.setPropertiesFromCanvas();
        }

        if( this.getCurrentTop() + this.getCurrentHeight() > this.page.$element.top + this.page.$element.getHeight()) {
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
    setPropertiesFromCanvas() {
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
    getPropertiesForCanvas() {
        return {
            x: Math.round((this.getLeft() * this.page.$element.getWidth() / this.page.getWidth()) + this.page.$element.left),
            y: Math.round((this.getTop() * this.page.$element.getHeight() / this.page.getHeight()) + this.page.$element.top),
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
    onObjectRemoved() {
        /**
         * Panel object removed event
         *
         * @event Page#panelObjectRemoved
         * @type {Object}
         * @property {Panel} Panel that was removed
         */
        this.page.trigger('panelObjectRemoved',this);
    }

    /**
     * Gets the width of the panel
     * @return {Number}
     */
    getWidth() {
        return this.width;
    }

    /**
     * Gets the height of the panel.
     *
     * @return {Number}
     */
    getHeight() {
        return this.height;
    }

    /**
     * Gets the y coordinate of the panel
     *
     * @return {Number}
     */
    getTop() {
        return this.y;
    }

    /**
     * Gets the x coordinate of the panel
     *
     * @return {Number}
     */
    getLeft() {
        return this.x;
    }

    /**
     * Gets the current width of the panel, sized
     * to fit the current page element.
     *
     * @return {Number}
     */
    getCurrentWidth() {
        return this.$element.width * this.$element.scaleX;
    }

    /**
     * Gets the current heiht of the panel, sized
     * to fit the current page element.
     *
     * @return {Number}
     */
    getCurrentHeight() {
        return this.$element.height * this.$element.scaleY
    }

    /**
     * Gets the current y coordinate of the panel,
     * sized to fit the current page element.
     *
     * @return {Number}
     */
    getCurrentTop() {
        return this.$element.top;
    }

    /**
     * Gets the current x coordinate of the panel,
     * sized to fit the current page element.
     *
     * @return {Number}
     */
    getCurrentLeft() {
        return this.$element.left;
    }

    /**
     * Returns an array value of this class instance
     *
     * @return {Object}
     */
    toArray() {
        return {
            x: this.getLeft(),
            y: this.getTop(),
            width: this.getWidth(),
            height: this.getHeight(),
            label: this.label
        }
    }

}
