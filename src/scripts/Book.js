/**
 * Book class that keeps track of the comic data.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */
class Book extends EventClass {
    /**
     * Takes in a configuration object for the
     * application settings.
     *
     * @constructs Book
     * @param {PanelzCreator} app    PanelzCreator instance
     * @param {Object}        config Configuration options
     */
    constructor(app,config) {
        super();
        /**
         * PanelzCreator application instance
         * @type {PanelzCreator}
         */
        this.app = app;
        /**
         * Configuration options
         * @type {Object}
         */
        this.config = config;
        /**
         * Comic identifier
         * @type {String}
         */
        this.id = config.id;
        /**
         * Title of the comic
         * @type {String}
         */
        this.title = config.title;
        /**
         * Holds all the data for each page
         * @type {Array}
         */
        this.pages = config.pages || [];
        /**
         * Holds the class instance for the
         * current page active in the workspace
         * @type {Page}
         */
        this.currentPage = false;

        this.makeSortable();
        this.setEventListeners();
    }

    /**
     * When the title property is updated, update
     * the viewport element.
     *
     * @param  {String} title Title of comic
     */
    set title(title) {
        $('.viewport__title-input').val(title);
        this._title = title;
    }

    /**
     * Gets the title internal
     *
     * @return {String}
     */
    get title() {
        return this._title;
    }

    /**
     * When setting pages, loop through each and call
     * the add method to initialize each page as a
     * class instance.
     *
     * @param {Array} pages Pages for the comic
     */
    set pages(pages) {
        this._pages = [];
        pages.forEach(this.add.bind(this));
    }

    /**
     * Gets pages internal
     *
     * @return {Array}
     */
    get pages() {
        return this._pages;
    }

    /**
     * Makes the page section sortable. Uses the jQuery UI
     * sortable method to allow drag and drop sorting of pages.
     */
    makeSortable() {
        $(".workspace-navigation__list").sortable({
            placeholder: "workspace-navigation__list-item ui-state-highlight",
            start: function(e, ui){
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
    setEventListeners() {
        this.on('editingPage',this.setCurrentPage.bind(this));
    }

    /**
     * Initializes a page object configuration into a class
     * instance and adds it to the internal pages array.
     *
     * @param {Object} pageConfig Page configuration options
     * @fires Book#pageAdded
     */
    add(pageConfig) {
        // In some cases, the item may already be a Page instance,
        // if this is the case, no need to initialize it again, simply
        // add it to the pages array.
        if( pageConfig instanceof Page) {
            return this.pages.push(pageConfig);
        }
        var page = new Page(this.app,this,pageConfig);
        this.pages.push(page);

        // Create the item for the pages list in the UI
        var $element = $('<li class="workspace-navigation__list-item"><span class="workspace-navigation__delete-page"><i class="fa fa-times-circle"></i></span><img src="'+page.url+'" /></li>').data('page',page);

        $('.workspace-navigation__list').append($element);
        /**
         * Page added event
         *
         * @event Book#pageAdded
         * @type {Object}
         * @property {Page} Page instance
         */
        this.trigger('pageAdded',page);
    }

    /**
     * Sets the current page active in the workspace
     *
     * @param {Page} page Page instance
     */
    setCurrentPage(page) {
        this.currentPage = page;
    }

    /**
     * User has sorted the page order in the interface. Use the
     * data method to pull the class instance from the element
     * and reorder the pages array property.
     */
    onPageSort() {
        this.pages = $('.workspace-navigation__list-item').map(function(i, el) {
            return $(el).data('page');
        }).get();
    }

    /**
     * Turn the class instance into an array. Loops through all of
     * pages and turns them into an array as well.
     *
     * @return {Object}
     */
    toArray() {
        var pages = this.pages.map(function(page) {
            return page.toArray();
        });
        return {
            id: this.id,
            title: $('.viewport__title-input').val(),
            pages: pages
        }
    }
}
