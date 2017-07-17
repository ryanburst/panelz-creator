/**
 * The main client class for the Panelz Creator application.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */
class PanelzCreator extends EventClass {
    /**
     * Takes in a configuration object for the
     * application settings.
     *
     * @constructs PanelzCreator
     * @param config
     */
    constructor(config) {
        super();
        this.DEFAULTS = {
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
            onCreateComicSuccess: function(){}
        };
        /**
         * Holds the ID of the book, either from the passed
         * in configuration or from the fetched comic book data.
         *
         * @type {String}
         */
        this.id = false;
        /**
         * jQuery object that holds the interface markup
         *
         * @type {Object}
         */
        this.$container = false;
        /**
         * Message callback function
         * @type {Function}
         */
        this.messageTimeout = false;

        this.config = $.extend(true,{},this.DEFAULTS,config);

        this.setEventListeners();

        if( this.config.method === 'id' ) {
            this.loadById(this.config.id);
        }else if (this.config.method === 'data') {
            this.loadByData(config.comic);
        } else {
            this.loadByUI();
        }
    }

    /**
     * When setting the configuration, set each of the keys
     * as a property in the application.
     *
     * @param {Object} config Configuration options
     */
    set config(config) {
        Object.keys(config).forEach(function(key) {
            this[key] = config[key];
        }.bind(this));
        this._config = config;
    }

    /**
     * Gets internal config property
     *
     * @return {Object}
     */
    get config() {
        return this._config;
    }

    /**
     * When setting the container, also set a $container property
     * holding appended markup.
     *
     * @param {String} container jQuery selector for container
     */
    set container(container) {
        this._container = container;
        this.$container = $(container).append(PANELZ_CREATOR_MARKUP);
    }

    /**
     * Gets the internal container property
     * @return {Object}
     */
    get container() {
        return _$container;
    }

    /**
     * Load the comic by fetching the data via the id.
     *
     * @param {String} id ID of comic to fetch
     */
    loadById(id) {
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
    loadByData(data) {
        this.showEditor();
        this.id = data.id;
        this.book = new Book(this,data);
        this.upload = new Upload(this);
        this.workspace = new Workspace(this,this.book,this.upload);

        this.upload.on('pageUploaded',this.onPageUploaded.bind(this));
        this.book.on('pageAdded',this.updateViewButton.bind(this));
        this.book.on('pageDeleted',this.updateViewButton.bind(this));

        this.updateViewButton();
        $('[data-view-link]').attr('href',this.getEndpoint('view'));
    }

    /**
     * Load the creation UI and allow them to save a comic from scratch.
     */
    loadByUI() {
        this.showCreateUI();
        $('body').on('click','.viewport__entry-submit',this.createComic.bind(this));
    }

    /**
     * Shows the creation UI by hiding and removing elements with special classes.
     */
    showCreateUI() {
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
    showEditor() {
        $('.viewport__loading').addClass('viewport__loading--hidden');
        $('.viewport__entry').addClass('viewport__entry--hidden');
        $('.viewport__title-bar').removeClass('viewport__title-bar--hidden');
        $('.viewport__content').removeClass('viewport__content--hidden');
        $(window).on('beforeunload',this.saveComic.bind(this));
    }

    /**
     * Sets event listeners for the page.
     */
    setEventListeners() {
        console.log('Set event listeners');
        $('body').on('click','.button--submit',this.onSubmitButtonClick.bind(this));
        $('body').on('complete','.button--submit',this.onSubmitButtonComplete.bind(this));
        $('body').on('click','.button--save',this.saveComic.bind(this));
        $('body').on('click','[data-view-link]',this.onViewButtonClick.bind(this));
    }

    /**
     * Creates a comic by sending off the title to the create endpoint. This
     * endpoint should create an ID and return it with the title.
     *
     * @param {Object} e Event object
     */
    createComic(e) {
        e.preventDefault();
        $.ajax({
            url: this.getEndpoint('create'),
            method: 'POST',
            data: {
                title: $('.viewport__entry-input').val()
            },
            error: this.onCreateComicError.bind(this),
            success: function(data) {
                this.config.onCreateComicSuccess.call(this,data);
                this.loadByData(data);
            }.bind(this),
            complete: function() {
                $(e.currentTarget).trigger('complete',e);
            }
        });
    }

    /**
     * An error has occured attempting to create a comic. Message
     * the user with the error, if possible.
     *
     * @param {Object} response Response object from the server
     */
    onCreateComicError(response) {
        try {
            var data = JSON.parse(response.responseText);
        } catch(Exeception) {
            data = { message: 'Something terrible has happened. Try again?' };
        }
        $('.viewport__entry-error').text(data.message).show();
    }

    /**
     * Ships of the comic data to the save endpoint.
     *
     * @param {Object} e Event object
     */
    saveComic(e) {
        e.preventDefault();
        $.ajax({
            url: this.getEndpoint('save'),
            method: 'PUT',
            async: e.type === "beforeunload" ? false : true,
            data: this.book.toArray(),
            error: this.onRequestError.bind(this),
            success: this.onSaveComicSuccess.bind(this),
            complete: function() {
                $(e.currentTarget).trigger('complete',e);
            }
        });
    }

    /**
     * When a save has been successful, message the user.
     *
     * @param  {Object} data Comic data
     */
    onSaveComicSuccess(data) {
        console.log('SUCCESS!',data);
        this.message('Your comic has been saved.');
    }

    /**
     * A request to the server has failed. Attempt to message them
     * with any message from the server, or fall back on a generic message.
     *
     * @param  {Object} response Server response data
     */
    onRequestError(response) {
        try {
            var data = JSON.parse(response.responseText);
        } catch(Exeception) {
            data = { message: 'Something terrible has happened. Try again?' };
        }
        this.message(data.message);
    }

    /**
     * Submit button has been clicked, show a progress icon
     *
     * @param {Object} e Event object
     */
    onSubmitButtonClick(e) {
        var $this = $(e.currentTarget);
        $this.width($this.width());
        $this.find('.button__icon').css('display','inline-block');
        $this.find('.button__text').hide();
    }

    /**
     * Submission was complete after pressing a submit button, so
     * hide the icon and show the text.
     *
     * @param {Object} e Event object
     */
    onSubmitButtonComplete(e) {
        var $this = $(e.currentTarget);
        $this.css('width','auto');
        $this.find('.button__icon').hide();
        $this.find('.button__text').show();
    }

    /**
     * Enables or disables the view comic button based on the comic
     * book page length. If there are no pages, don't let them view.
     */
    updateViewButton() {
        $('[data-view-link]').attr('disabled',!this.book.pages.length);
    }

    /**
     * When the view link is clicked, if it's disabled, don't go anywhere.
     * @param {Object} e Event object
     */
    onViewButtonClick(e) {
        if( $(e.currentTarget).attr('disabled') ) {
            e.preventDefault();
        }
    }

    /**
     * Page has been uploaded via the interface, add the page
     * data to the book.
     *
     * @param  {Object} data Page data
     */
    onPageUploaded(data) {
        this.book.add(data);
    }

    /**
     * Gets a specific endpoint from the array of endpoints. Replaces
     * the {id} placeholder with the id set in the configuration.
     *
     * @param  {String} endpoint Which endpoint to grab from the array
     * @return {String}
     */
    getEndpoint(endpoint) {
        return this.endpoints[endpoint].replace('{id}',this.id);
    }

    /**
     * Displays a message for the user within the viewport.
     *
     * @param  {String} message Message to display
     * @param  {Number} time    Time in ms to display the message
     */
    message(message,time) {
        var time = time ? time : 4000;

        clearTimeout(this.messageTimeout);

        $('.viewport__message').text(message).fadeIn();
        this.messageTimeout = setTimeout(function() {
            $('.viewport__message').fadeOut();
        },time);
    }
}
