# Panelz Creator Application

## Configuration
```
{
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
}
```