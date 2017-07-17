/**
 * String value for draw mode
 *
 * @constant
 * @type {String}
 */
const DRAW_MODE = 'DRAW_MODE';
/**
 * String value for select mode
 *
 * @constant
 * @type {String}
 */
const SELECT_MODE = 'SELECT_MODE';
/**
 * Class representing the workspace area for working
 * and uploading pages.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */
class Workspace extends EventClass {
    /**
     * Initiates the Workspace object with settings
     * and initiates sortable lists.
     *
     * @constructs
     * @param  {PanelzCreator} app    PanelzCreator instance
     * @param  {Book}          book   Book instance
     * @param  {Upload}        upload Upload Instance
     */
    constructor(app,book,upload) {
        super();

        /**
         * PanelzCreator instance
         * @type {PanelzCreator}
         */
        this.app = app;
        /**
         * Book class instance
         * @type {Book}
         */
        this.book = book;
        /**
         * Upload instance
         * @type {Upload}
         */
        this.upload = upload;
        /**
         * Current mode
         * @type {String}
         */
        this.mode = SELECT_MODE;
        /**
         * Keeps track of whether or not the
         * user is in the middle of drawing
         * @type {Boolean}
         */
        this.drawStarted = false;
        /**
         * The x coordinate of the draw
         * @type {Number}
         */
        this.drawX = 0;
        /**
         * The y coordinate of the draw
         * @type {Number}
         */
        this.drawY = 0;
        /**
         * Default object settings for creating rectangles
         * @type {Object}
         */
        this.OBJECT_SETTINGS = {
            originX: 'left',
            originY: 'top',
            angle: 0,
            fill: 'rgba(255,0,0,0.5)',
            transparentCorners: false,
            cornerColor: 'rgba(102,153,255,0.5)',
            cornerSize: 12,
            lockRotation: true,
            hasRotatingPoint: false,
            selectable: false
        };
        /**
         * Reference to the working canvas element,
         * using the FabricJS library.
         * @type {fabric}
         */
        this.canvas = new fabric.Canvas('workspace__canvas');

        $(".controls__menu").sortable({
            placeholder: "controls__menu-item ui-state-highlight",
            start: function(e, ui){
                ui.placeholder.height(ui.item.height());
            },
            update: this.onPanelOrderUpdate.bind(this),
            axis: 'y'
        });

        this.setEventListeners();

        if( this.book.pages.length ) {
            $('.workspace-navigation__list-item:eq(0)').trigger('activate');
        }
    }

    /**
     * Assigns all sorts of event listeners to both the
     * controls and to local class instances.
     */
    setEventListeners() {
        var $body = $('body');
        $body.on('click activate','.workspace-navigation__add',this.showUploadScreen.bind(this));
        $body.on('click activate','.workspace-navigation__list-item',this.selectPage.bind(this));
        $body.on('contextmenu','.upper-canvas',this.onContextMenuClick.bind(this));
        $body.on('click activate','.controls__button',this.onControlsClick.bind(this));
        $body.on('focusout','.controls__option--panels',this.onControlButtonBlur.bind(this));
        $body.on('click activate','.controls__button--delete',this.deleteObject.bind(this));
        $body.on('click activate','.controls__button--duplicate',this.duplicateObject.bind(this));
        $body.on('mousedown','.controls__menu-item',this.onPanelSelect.bind(this));
        $body.on('click activate','.workspace-navigation__delete-page',this.onDeletePage.bind(this));
        $body.on('click activate','.upload__cancel',this.hideUploadScreen.bind(this));
        $body.on('keyup',this.onKeyUp.bind(this));
        $(window).on('resize',this.onResize.bind(this)).trigger('resize');
        this.app.on('renderCanvas',this.render.bind(this));
        this.book.on('panelSet',this.onPanelSet.bind(this));
        this.book.on('editingPage',this.onEditingPage.bind(this));
        this.upload.on('complete',this.onUploadComplete.bind(this));
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
    showUploadScreen() {
        $('.upload').removeClass('upload--hidden');
        if( this.book.pages.length ) {
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
    hideUploadScreen() {
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
    onUploadComplete() {
        $('.workspace-navigation__list-item:last-child').trigger('activate');
    }

    /**
     * Editing a page. Set up the page on the canvas with all of the panels.
     * If there are no panels, bail from this method and do not proceed.
     *
     * @param  {Page} page Class instance
     * @return {Boolean}
     */
    onEditingPage(page) {
        if( ! page.panels.length ) {
            return $('.controls__option--draw .controls__button').trigger('activate');
        }

        page.panels.forEach(function(panel) {
            var properties = panel.getPropertiesForCanvas();
            var rect = new fabric.Rect($.extend({},this.OBJECT_SETTINGS, {
                left: properties.x,
                top: properties.y,
                width: properties.width,
                height: properties.height
            }));
            this.canvas.add(rect);
            this.book.currentPage.trigger('panelObjectAdded',rect,panel);
        }.bind(this));
        $('.controls__option--select .controls__button').trigger('activate');
    }

    /**
     * When a panel has been set, create an entry in the panel editor menu.
     * Assigns it a few events for renaming and selecting.
     *
     * @param  {Panel} panel Panel instance
     */
    onPanelSet(panel) {
        var $element = $('<li class="controls__menu-item panel-item" title="Double click to rename"><span><span data-panel-num>'+(this.book.currentPage.panels.indexOf(panel)+1)+'</span>.</span> <span class="panel-item__text">'+panel.label+'</span><input type="text" value="'+panel.label+'" class="panel-item__input" /></li>').data('panel',panel);
        var $text = $element.find('.panel-item__text');
        var $input = $element.find('.panel-item__input');
        $('.controls__menu--panels').append($element);
        $('.controls__option--panels .controls__button').prop('disabled',false);

        // If the menu element is double clicked on, hide the text and show the text input
        $element.on('dblclick',function(e) {
            $text.hide();
            $input.val($text.text()).show().focus();
        });
        // If they hit enter, save the text as the panel label and hide the input/show text
        $input.on('keyup blur',function(e) {
            if( (e.keyCode === 13 || e.type === 'blur') && $input.val().length ) {
                $input.hide();
                $text.text($input.val()).show();
                panel.label = $text.text();
            }
        });
        // If the panel element is removed on the canvas, remove this item from
        // the mennu and renumber the menu.
        panel.$element.on('removed',function() {
            $element.remove();
            $('.controls__menu-item').each(function(index,element) {
                $(element).find('[data-panel-num]').text(index+1);
            });
            if( ! this.book.currentPage.panels.length ) {
                $('.controls__option--panels .controls__button').prop('disabled',true);
            }
        }.bind(this));
    }

    /**
     * When the panel menu order is updated, reset the panels array for the
     * current page class instance.
     */
    onPanelOrderUpdate() {
        this.book.currentPage.panels = $('.controls__menu-item').map(function(i, el) {
            var panel = $(el).data('panel');
            $(el).find('[data-panel-num]').text(i+1);
            this.canvas.moveTo(panel.$element,i+1);
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
    onPanelSelect(e) {
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
     * @fires Book#pageDeleted
     */
    onDeletePage(e) {
        var $this = $(e.currentTarget);
        var $element = $this.closest('.workspace-navigation__list-item');
        var page = $element.data('page');
        var index = this.book.pages.indexOf(page);

        e.stopPropagation();

        this.book.pages.splice(index,1);

        /**
         * Page deleted event
         *
         * @event Book#pageDeleted
         * @type {Object}
         * @property {Page} Page
         */
        this.book.trigger('pageDeleted',page);

        $element.remove();

        if( this.book.pages.length ) {
            var nextIndex = this.book.pages.length > index ? index : 0;
            $('.workspace-navigation__list-item').eq(nextIndex).trigger('activate');
        } else {
            this.canvas.clear();
            $('.controls--edit').addClass('controls--hidden');
            $('.workspace-navigation__add').trigger('activate');
        }

    }

    /**
     * Key bindings for actions
     * @param {Object} e EventObject
     */
    onKeyUp(e) {
        // Delete - Delete panel
        if( e.which === 8 && this.mode === SELECT_MODE) {
            this.deleteObject();
        // C - Duplicate panel
        } else if( e.which === 67  && this.mode === SELECT_MODE ) {
            this.duplicateObject();
        // S - Select mode
        } else if( e.which === 83 ) {
            $('.controls__option--select .controls__button').trigger('activate');
        // D - Draw mode
        } else if( e.which === 68 ) {
            $('.controls__option--draw .controls__button').trigger('activate');
        // P - Panels menu
        } else if( e.which === 80 && ! $('.controls__option--panels .controls__button[disabled]').length ) {
            $('.controls__option--panels .controls__button').trigger('activate');
        }
    }

    /**
     * A page has been selected by the user. Center the image in
     * the workspace canvas and trigger an edit
     *
     * @param {Object} e Event object
     * @fires Page#edit
     */
    selectPage(e) {
        var $this = $(e.currentTarget);
        var index = $this.index();
        var page = this.book.pages[index];

        var canvasWidth = this.canvas.getWidth();
        var canvasHeight = this.canvas.getHeight();
        var width = canvasWidth;
        var height = page.getHeight() * canvasWidth / page.getWidth();

        if( height > canvasHeight ) {
            height = canvasHeight;
            width = page.getWidth() * canvasHeight / page.getHeight();
        }

        var imageSettings = {
            top: (canvasHeight - height) / 2,
            left: (canvasWidth - width) / 2,
            width: width,
            height: height,
            selectable: false
        }

        this.canvas.clear();

        $('.controls__option--panels .controls__button').prop('disabled',true);
        $('.controls__menu--panels').empty();
        $('.controls--edit').removeClass('controls--hidden');

        this.hideUploadScreen();

        $('.workspace-navigation__list-item--active').removeClass('workspace-navigation__list-item--active');
        $this.addClass('workspace-navigation__list-item--active');
        $('.workspace-navigation__list').animate({
            scrollTop: $this.position().top + $('.workspace-navigation__list').scrollTop() - 20
        },850);

        fabric.Image.fromURL(page.url, function(oImg) {
            oImg.set(imageSettings);
            this.canvas.add(oImg);
            /**
             * Page edit event
             *
             * @event Page#edit
             * @type {Object}
             * @property {Object} Canvas element
             */
            page.trigger('edit',oImg);
        }.bind(this));
    }

    /**
     * User has clicked on the canvas. If the current
     * mode is Draw Mode, begin drawing a rectangle.
     *
     * @param  {Object} o Mouse down event
     */
    mousedown(o) {
        if( this.mode !== DRAW_MODE )
            return true;

        this.drawStarted = true;
        var pointer = this.canvas.getPointer(o.e);
        this.drawX = pointer.x;
        this.drawY = pointer.y;
        var rect = new fabric.Rect($.extend({},this.OBJECT_SETTINGS, {
            left: this.drawX,
            top: this.drawY,
            width: pointer.x-this.drawX,
            height: pointer.y-this.drawY
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
    mousemove(o) {
        if( this.mode !== DRAW_MODE || ! this.drawStarted )
            return true;

        var pointer = this.canvas.getPointer(o.e);
        var rect = this.drawStarted;

        if(this.drawX > pointer.x){
            rect.set({ left: Math.abs(pointer.x) });
        }
        if(this.drawY > pointer.y){
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
     * If the object does not have any size (mouseup without drag), then
     * do not add the object as a panel and delete it from the canvas.
     *
     * @param {Object} e Mouse event object
     */
    mouseup(e) {
        if( this.mode === DRAW_MODE && this.drawStarted) {
            if( ! this.drawStarted.width || ! this.drawStarted.height ) {
                this.canvas.remove(this.drawStarted);
            } else {
                this.book.currentPage.trigger('panelObjectAdded',this.drawStarted);
            }
            this.canvas.deactivateAllWithDispatch().renderAll();
            this.drawStarted = false;
            this.drawX = 0;
            this.drawY = 0;
        }
    }

    /**
     * Switches the mode of the app. If they switch to Draw Mode
     * clear all activated items.
     *
     * @param  {String} mode Mode to switch to
     */
    switchModes(mode) {
        this.mode = mode;
        if( mode === DRAW_MODE ) {
            this.canvas.deactivateAllWithDispatch().renderAll();
        }
        this.book.currentPage.panels.forEach(function(panel) {
            panel.$element.selectable = (mode===DRAW_MODE) ? false : true;
        });
    }

    /**
     * A controls menu item with a mode attribute has been
     * selected, so switch to that mode.
     *
     * @param  {Object} e Event object
     */
    onControlsClick(e) {
        var $this = $(e.currentTarget);
        var mode = $this.attr('data-mode');
        $('.controls__button').removeClass('controls__button--active');
        $this.addClass('controls__button--active');
        $('.controls__menu').hide();
        if( $this.attr('data-menu') ) {
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
    onContextMenuClick(e) {
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
    setContextControlPosition(e) {
        var panel = e.target;
        var top = (panel.top-40 > 0 )
            ? panel.top - 40
            : panel.top + (panel.height * panel.scaleY) + 5;
        var left = panel.left;

        if( top > this.canvas.getHeight() - $('.controls--context').outerHeight() - 5 ) {
            top = Math.max(5,panel.top + 5);
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
    hideContextControls() {
        if( $('.controls__option--panels > .controls__button--active').length ) {
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
    deleteObject(e) {
        if( this.canvas.getActiveGroup() ) {
            this.canvas.getActiveGroup().forEachObject(function(o){
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
    duplicateObject() {

        var panels = [this.canvas.getActiveObject()];

        if( this.canvas.getActiveGroup() ) {
            panels = this.canvas.getActiveGroup().getObjects();
        }

        this.canvas.deactivateAllWithDispatch().renderAll();

        panels.forEach(function(obj) {
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
            this.book.currentPage.trigger('panelObjectAdded',panel);
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
    onControlButtonBlur(e) {
        if( $(e.relatedTarget).is('.panel-item__input') || $(e.target).is('.panel-item__input') ) {
            return true;
        }
        $('.controls__option--select .controls__button').trigger('activate');
    }

    /**
     * When the window is resized, resize the working canvas.
     *
     * @param  {Object} e Event object
     */
    onResize(e) {
        this.canvas.setWidth($('.workspace').width()).setHeight($('.workspace').height());
    }

    /**
     * Renders all of the canvas object
     */
    render() {
        this.canvas.renderAll();
    }
}
