// https://github.com/sroucheray/event-class
const multiChannelSep = /(?:,|\s)+/g;
const channelSep = /:+/g;
const channelsSymbol = Symbol('channels');

class EventClass {
    constructor(){
        this[channelsSymbol] = {};
    }

    _getChannels(channelString){
        return channelString.trim().split(multiChannelSep);
    }

    _getNameSpaces(channel){
        let namespaces = [];
        let splittedChannels = channel.trim().split(channelSep);

        for (let i = splittedChannels.length; i >= 1; i--) {
            namespaces.push(splittedChannels.slice(0, i).join(':'));
        }

        return namespaces;
    }

    trigger(event, data){
        let channels = this._getChannels(event);

        for (let channel of channels){
            let namespaces = this._getNameSpaces(channel);
            for (let namespace of namespaces){
                if(!this[channelsSymbol][namespace]){
                    continue;
                }

                for(let callback of this[channelsSymbol][namespace]){
                    callback.call(this, data);
                }
            }
        }
    }

    on(event, callback){
        let channels = this._getChannels(event);

        for (let channel of channels){
            if(!this[channelsSymbol][channel]){
                this[channelsSymbol][channel] = [];
            }

            this[channelsSymbol][channel].push(callback);
        }
    }

    off(event, callback){
        let channels = this._getChannels(event);

        for (let channel of channels){
            if(!this[channelsSymbol][channel]){
                return;
            }

            let index = this[channelsSymbol][channel].indexOf(callback);

            if(index > -1){
                this[channelsSymbol][channel].splice(index, 1);
            }
        }
    }

    once(event, callback){
        function offCallback(){
            this.off(event, callback);
            this.off(event, offCallback);
        }

        this.on(event, callback);
        this.on(event, offCallback);
    }
}

class Book extends EventClass {
    constructor() {
        super();
        this.pages = [];
        this.currentPage = false;

        this.makeSortable();
        this.setEventListeners();
    }

    makeSortable() {
        $(".workspace-navigation__list").sortable({
            placeholder: "workspace-navigation__list-item ui-state-highlight",
            start: function(e, ui){
                ui.placeholder.height(ui.item.height());
            },
            update: this.onPageSort.bind(this)
        });
    }

    setEventListeners() {
        this.on('editingPage',this.setCurrentPage.bind(this));
    }

    add(pageConfig) {
        var page = new Page(this,pageConfig);
        this.pages.push(page);

        var $element = $('<li class="workspace-navigation__list-item"><img src="'+page.url+'" /></li>').data('page',page);

        $('.workspace-navigation__list').append($element);

        $element.trigger('click');

        this.trigger('pageAdded',page);
    }

    setCurrentPage(page) {
        this.currentPage = page;
    }

    onPageSort(ev,ui) {
        this.pages = $('.workspace-navigation__list-item').map(function(i, el) {
            return $(el).data('page');
        }).get();
    }
}

class Page extends EventClass {
    constructor(Book,config) {
        super();
        this.book = Book;
        this.url = config.url;
        this.size = config.size;
        this.width = config.width;
        this.height = config.height;
        this.panels = config.panels || [];

        this.setEventListeners();
    }

    setEventListeners() {
        this.on('edit',this.onEdit.bind(this));
        this.on('panelAdded',this.onPanelAdded.bind(this));
    }

    onEdit(pageObject) {
        this.$element = pageObject;
        this.book.trigger('editingPage',this);
    }

    onPanelAdded(panelObject) {
        var panel = new Panel(this,{'$element':panelObject});
        console.log(panel.data(),panel.data(true));
        this.panels.push(panel);
        console.log(this.panels);
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}

class Panel extends EventClass {
    constructor(Page,config) {
        super();
        this.page = Page;
        this.config = config || {};
        this.$element = this.config.$element;
        this.x = this.config.x;
        this.y = this.config.y;
        this.width = this.config.width;
        this.height = this.config.height;

        if( this.$element ) {
            this.setPropertiesFromCanvas();
        }
    }

    setPropertiesFromCanvas() {
        this.x = Math.round((this.getCurrentLeft() - this.page.$element.left) * this.page.getWidth() / this.page.$element.getWidth());
        this.y = Math.round((this.getCurrentTop() - this.page.$element.top) * this.page.getHeight() / this.page.$element.getHeight());
        this.width = Math.round(this.getCurrentWidth() * this.page.getWidth() / this.page.$element.getWidth());
        this.height = Math.round(this.getCurrentHeight() * this.page.getHeight() / this.page.$element.getHeight());
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getTop() {
        return this.y;
    }

    getLeft() {
        return this.x;
    }

    getCurrentWidth() {
        return this.$element.width * this.$element.scaleX;
    }

    getCurrentHeight() {
        return this.$element.height * this.$element.scaleY
    }

    getCurrentTop() {
        return this.$element.top;
    }

    getCurrentLeft() {
        return this.$element.left;
    }

    data(current) {
        if( current ) {
            return {
                x: this.getCurrentLeft(),
                y: this.getCurrentTop(),
                width: this.getCurrentWidth(),
                height: this.getCurrentHeight()
            }
        }

        return {
            x: this.getLeft(),
            y: this.getTop(),
            width: this.getWidth(),
            height: this.getHeight()
        }
    }

}

class PanelzCreator extends EventClass {
    constructor() {
        super();
        console.log('Init');
        this.book = new Book();
        this.upload = new Upload();
        this.workspace = new Workspace(this.book,this.upload);
        this.setEventListeners();
    }

    setEventListeners() {
        this.upload.on('pageUploaded',this.onPageUploaded.bind(this));
    }

    onPageUploaded(data) {
        this.book.add(data);
    }
}

class Upload extends EventClass {
    constructor() {
        super();
        var myDropzone = new Dropzone(".upload__dropzone", {
            url: "/upload",
            paramName: "page",
            clickable: $('.upload .button--upload')[0],
            addRemoveLinks: true
        });
        myDropzone.on("success", function(file,server) {
            myDropzone.removeFile(file);
            this.trigger('pageUploaded',server);
        }.bind(this));
    }
}

const DRAW_MODE = 'DRAW_MODE';
const SELECT_MODE = 'SELECT_MODE';
class Workspace extends EventClass {
    constructor(book,upload) {
        super();

        this.drawStarted = false;
        this.drawX = 0;
        this.drawY = 0;

        this.book = book;
        this.upload = upload;
        this.mode = DRAW_MODE;

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
            lockScalingFlip: true
        };

        this.canvas = new fabric.Canvas('workspace__canvas');

        $(".controls__menu").sortable({
            placeholder: "controls__menu-item ui-state-highlight",
            start: function(e, ui){
                ui.placeholder.height(ui.item.height());
            }
        });

        this.setEventListeners();
    }

    setEventListeners() {
        $('body').on('click','.workspace-navigation__add',this.showUploadScreen.bind(this));
        $('body').on('click','.workspace-navigation__list-item',this.selectPage.bind(this));
        this.upload.on('pageUploaded',this.hideUploadScreen.bind(this));
        //this.book.on('pageAdded',this.onPageAdded.bind(this));
        $(window).on('resize',this.onResize.bind(this)).trigger('resize');
        this.canvas.observe('mouse:down', this.mousedown.bind(this));
        this.canvas.observe('mouse:move', this.mousemove.bind(this));
        this.canvas.observe('mouse:up', this.mouseup.bind(this));
        this.canvas.observe('object:selected', this.setContextControlPosition.bind(this));
        this.canvas.observe('object:moving', this.setContextControlPosition.bind(this));
        this.canvas.observe('object:scaling', this.setContextControlPosition.bind(this));
        this.canvas.observe('object:scaling', this.monitorSize.bind(this));
        this.canvas.observe('selection:cleared', this.hideContextControls.bind(this));
        $(".upper-canvas").bind('contextmenu',this.onContextMenuClick.bind(this));
        $('.controls__button').on('click',this.onControlsClick.bind(this));
        $('.controls__option--panels').on('focusout',this.onControlButtonBlur.bind(this));
        $('.controls__button--delete').on('click',this.deleteObject.bind(this));
        $('.controls__button--duplicate').on('click',this.duplicateObject.bind(this));
    }

    showUploadScreen() {
        $('.upload').removeClass('upload--hidden');
    }

    hideUploadScreen() {
        $('.upload').addClass('upload--hidden');
    }

    onPageAdded(page) {

    }

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

        fabric.Image.fromURL(page.url, function(oImg) {
            oImg.set(imageSettings);
            this.canvas.add(oImg);

            page.trigger('edit',oImg);
        }.bind(this));
    }

    mousedown(o) {
        if( this.mode !== DRAW_MODE )
            return true;

        this.drawStarted = true;

        var pointer = this.canvas.getPointer(o.e);
        var minLeft = this.book.currentPage.$element.left;
        var maxLeft = this.book.currentPage.$element.left + this.book.currentPage.$element.width;
        var minTop  = this.book.currentPage.$element.top;
        var maxTop  = this.book.currentPage.$element.top + this.book.currentPage.$element.height;

        this.drawX = Math.min(Math.max(minLeft,pointer.x),maxLeft);
        this.drawY = Math.min(Math.max(minTop,pointer.y),maxTop);


        var rect = new fabric.Rect($.extend({},this.OBJECT_SETTINGS, {
            left: this.drawX,
            top: this.drawY,
            width: 10,
            height: 10
        }));
        this.canvas.add(rect);
        this.drawStarted = rect;
    }

    mousemove(o) {
        if( this.mode !== DRAW_MODE || ! this.drawStarted )
            return true;

        var pointer = this.canvas.getPointer(o.e);
        var rect = this.drawStarted;
        var minLeft = this.book.currentPage.$element.left;
        var maxLeft = this.book.currentPage.$element.left + this.book.currentPage.$element.width;
        var minTop  = this.book.currentPage.$element.top;
        var maxTop  = this.book.currentPage.$element.top + this.book.currentPage.$element.height;
        var left = Math.min(Math.max(minLeft,pointer.x),maxLeft);
        var top = Math.min(Math.max(minTop,pointer.y),maxTop);

        if(this.drawX>pointer.x){
            rect.set({ left: Math.abs(left) });
        }
        if(this.drawY>pointer.y){
            rect.set({ top: Math.abs(top) });
        }

        rect.set({ width: Math.abs(this.drawX - left) });
        rect.set({ height: Math.abs(this.drawY - top) });

        rect.setCoords();
        this.canvas.renderAll();
    }

    mouseup(e) {
        if( this.mode === DRAW_MODE && this.drawStarted) {
            this.canvas.setActiveObject(this.drawStarted);
            this.book.currentPage.trigger('panelAdded',this.drawStarted);
            this.drawStarted = false;
            this.drawX = 0;
            this.drawY = 0;
            $('.controls__option--select .controls__button').trigger('click');
        }
    }

    monitorSize(e) {
        var rect = this.canvas.getActiveObject();
        var currentSize = rect.left + (rect.width * rect.scaleX);
        var maxSize = this.book.currentPage.$element.left + (this.book.currentPage.$element.width * this.book.currentPage.$element.scaleX);
        var currentLeft = rect.left;
        var minLeft = this.book.currentPage.$element.left;
        if( currentSize >= maxSize) {
            rect.scaleX = (maxSize-rect.left) / rect.width;
        }
        if( currentLeft <= minLeft ) {
            rect.scaleX = minLeft;
        }

    }

    switchModes(mode) {
        this.mode = mode;
        if( mode === DRAW_MODE ) {
            this.canvas.selection = false;
        } else if (mode === SELECT_MODE ) {
            this.canvas.selection = true;
        }
    }

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
            this.canvas.deactivateAll();
        }

        this.canvas.renderAll();

        e.preventDefault();
        return false;
    }

    setContextControlPosition(e) {
        var panel = e.target;
        var top = (panel.top-40 > 0 )
            ? panel.top - 40
            : panel.top + (panel.height * panel.scaleY) + 5;
        $('.controls--context').css({
            top: top,
            left: panel.left
        }).removeClass('controls--hidden');
    }

    hideContextControls() {
        $('.controls--context').addClass('controls--hidden');
    }

    deleteObject(e) {
        var panel = this.canvas.getActiveObject();
        panel.remove();
        $('.controls__option--select .controls__button').trigger('click');
    }

    duplicateObject() {
        var panel = this.canvas.getActiveObject().clone();
        this.canvas.deactivateAll().renderAll();
        panel.set(this.OBJECT_SETTINGS);
        panel.set("top", panel.top + 5);
        panel.set("left", panel.left + 5);
        this.canvas.add(panel);
        $('.controls__option--select .controls__button').trigger('click');
    }

    onControlButtonBlur(e) {
        $('.controls__option--select .controls__button').trigger('click');
    }

    onResize(e) {
        this.canvas.setWidth($('.workspace').width()).setHeight($('.workspace').height());
    }
}
