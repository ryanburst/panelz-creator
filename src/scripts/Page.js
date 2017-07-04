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
class Page extends EventClass {
    /**
     * Sets up a page instance and intializes event listeners.
     *
     * @param  {PanelzCreator} app    Application instance
     * @param  {Book}          Book   Book this page belongs to
     * @param  {Object}        config Configuration options
     */
    constructor(app,Book,config) {
        super();
        /**
         * Application instance
         * @type {PanelzCreator}
         */
        this.app = app;
        /**
         * Comic this page belongs to
         * @type {Book}
         */
        this.book = Book;
        /**
         * URL of the image that is this page
         * @type {String}
         */
        this.url = config.url;
        /**
         * Size of the page image in bytes
         * @type {Number}
         */
        this.size = config.size;
        /**
         * Width of the page image
         * @type {Number}
         */
        this.width = config.width;
        /**
         * Height of the page image
         * @type {Number}
         */
        this.height = config.height;
        /**
         * All of the available labels.
         * Each character is broken off as a new label.
         * @type {String}
         */
        this.labels = "abcdefghijklmnopqrstuvwxyz";
        /**
         * Holds the active labels that can be used.
         * @type {Array}
         */
        this.remainingLabels = [];
        /**
         * Number of times the labels have been used up
         * @type {Number}
         */
        this.labelRound = 0;
        /**
         * Array of panel instances.
         * @type {Array}
         */
        this.panels = config.panels || [];
        /**
         * Holds the image element reference.
         * @type {Object}
         */
        this.$element = false;

        this.setEventListeners();
    }

    /**
     * When setting the panels array, loop through
     * all of the panes and attempt to convert them
     * to a Panel class instance. If it's already a
     * panel, no need to create a new one.
     *
     * @param  {Array} panels Array of panel configuration objects or instances
     */
    set panels(panels) {
        this._panels = [];
        panels.forEach(function(data) {
            var panel = data instanceof Panel ? data : new Panel(this.app,this,data);
            this._panels.push(panel);
        }.bind(this));
    }

    /**
     * Returns the panels array internal.
     *
     * @return {Array} [description]
     */
    get panels() {
        return this._panels;
    }

    /**
     * Gets the next available label. Splits the labels array
     * and pops it off the front. If the options have all been
     * used up, it begins doubling up on the label (AA, BB);
     * @return {String}
     */
    getNextLabel() {
        // No labels left, up the label round and recreate
        // the remaining labels array with a repeated string
        // of each label option (A -> AA -> AAA)
        if( ! this.remainingLabels.length ) {
            this.labelRound += 1;
            this.remainingLabels = this.labels.toUpperCase().split("").map(function(val) {
                return val.repeat(this.labelRound);
            }.bind(this));
        }

        return 'Panel ' + this.remainingLabels.shift();
    }

    /**
     * Sets event listeners for editing this page, adding and removing
     * panel objects from the workspace.
     */
    setEventListeners() {
        this.on('edit',this.onEdit.bind(this));
        this.on('panelObjectAdded',this.onPanelObjectAdded.bind(this));
        this.on('panelObjectRemoved',this.onPanelObjectRemoved.bind(this));
    }

    /**
     * When the user wants to edit this page, set the element
     * property and tell the book the page is ready to be edited.
     *
     * @param {Object} pageObject FabricJS canvas object
     * @fires Book#editingPage
     */
    onEdit(pageObject) {
        this.$element = pageObject;
        /**
         * Editing page event
         *
         * @event Book#editingPage
         * @type {Object}
         * @property {Page} Page being edited
         */
        this.book.trigger('editingPage',this);
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
    onPanelObjectAdded(panelObject,panel) {
        if( ! panel ) {
            var panel = new Panel(this.app,this,{});
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
        this.book.trigger('panelSet',panel);
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
    onPanelObjectRemoved(panel) {
        var index = this.panels.indexOf(panel);
        this.panels.splice(index,1);
        this.book.trigger('panelRemoved',panel);
    }

    /**
     * Gets the width of the page image element
     *
     * @return {Number}
     */
    getWidth() {
        return this.width;
    }

    /**
     * Gets the height of the page image element
     * @return {Number}
     */
    getHeight() {
        return this.height;
    }

    /**
     * Converts the class data to an array. Loops through
     * all of the panels and turns them into an array as well.
     *
     * @return {Object}
     */
    toArray() {
        var panels = this.panels.map(function(panel) {
            return panel.toArray();
        });
        return {
            url: this.url,
            size: this.size,
            width: this.width,
            height: this.height,
            panels: panels
        }
    }
}
