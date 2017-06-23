const DRAW_MODE = 'DRAW_MODE';
const SELECT_MODE = 'SELECT_MODE';
class Workspace extends EventClass {
    constructor(app,book,upload) {
        super();

        this.app = app;
        this.drawStarted = false;
        this.drawX = 0;
        this.drawY = 0;

        this.book = book;
        this.upload = upload;
        this.mode = SELECT_MODE;

        this.OBJECT_SETTINGS = {
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
            $('.workspace-navigation__list-item:eq(0)').trigger('click');
        }
    }

    setEventListeners() {
        $('body').on('click','.workspace-navigation__add',this.showUploadScreen.bind(this));
        $('body').on('click','.workspace-navigation__list-item',this.selectPage.bind(this));
        this.upload.on('pageUploaded',this.hideUploadScreen.bind(this));
        this.book.on('editingPage',this.onEditingPage.bind(this));
        this.book.on('panelSet',this.onPanelSet.bind(this));
        $(window).on('resize',this.onResize.bind(this)).trigger('resize');
        this.canvas.observe('mouse:down', this.mousedown.bind(this));
        this.canvas.observe('mouse:move', this.mousemove.bind(this));
        this.canvas.observe('mouse:up', this.mouseup.bind(this));
        this.canvas.observe('object:selected', this.setContextControlPosition.bind(this));
        this.canvas.observe('object:modified', this.setContextControlPosition.bind(this));
        this.canvas.observe('object:moving', this.hideContextControls.bind(this));
        this.canvas.observe('object:scaling', this.hideContextControls.bind(this));
        this.canvas.observe('selection:cleared', this.hideContextControls.bind(this));
        $(".upper-canvas").bind('contextmenu',this.onContextMenuClick.bind(this));
        $('.controls__button').on('click',this.onControlsClick.bind(this));
        $('.controls__option--panels').on('focusout',this.onControlButtonBlur.bind(this));
        $('.controls__button--delete').on('click',this.deleteObject.bind(this));
        $('.controls__button--duplicate').on('click',this.duplicateObject.bind(this));
        $('body').on('mousedown','.controls__menu-item',this.onPanelSelect.bind(this));
        $('body').on('click','.workspace-navigation__delete-page',this.onDeletePage.bind(this));
        $('body').on('click','.upload__cancel',this.hideUploadScreen.bind(this));
        this.app.on('renderCanvas',this.render.bind(this));
    }

    showUploadScreen() {
        $('.upload').removeClass('upload--hidden');
        if( this.book.pages.length ) {
            $('.upload__cancel').show();
        } else {
            $('.upload__cancel').hide();
        }
    }

    hideUploadScreen() {
        this.app.trigger('cancelUpload');
        $('.upload').addClass('upload--hidden');
    }

    onEditingPage(page) {
        if( ! page.panels.length ) {
            $('.controls__option--draw .controls__button').trigger('click');
            return;
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
        $('.controls__option--select .controls__button').trigger('click');
    }

    onPanelSet(panel) {
        var $element = $('<li class="controls__menu-item panel-item"><span><span data-panel-num>'+(this.book.currentPage.panels.indexOf(panel)+1)+'</span>.</span> <span class="panel-item__text">'+panel.label+'</span><input type="text" value="'+panel.label+'" class="panel-item__input" /></li>').data('panel',panel);
        var $text = $element.find('.panel-item__text');
        var $input = $element.find('.panel-item__input');
        $('.controls__menu--panels').append($element);
        $('.controls__option--panels .controls__button').prop('disabled',false);
        $element.on('dblclick',function(e) {
            $text.hide();
            $input.val($text.text()).show().focus();
        });
        $input.on('keyup',function(e) {
            if( e.keyCode === 13 && $input.val().length ) {
                $input.hide();
                $text.text($input.val()).show();
                panel.label = $text.text();
            }
        });
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

    onPanelOrderUpdate(ui, element) {
        this.book.currentPage.panels = $('.controls__menu-item').map(function(i, el) {
            var panel = $(el).data('panel');
            $(el).find('[data-panel-num]').text(i+1);
            this.canvas.moveTo(panel.$element,i+1);
            return panel;
        }.bind(this)).get();
    }

    onPanelSelect(e) {
        var $this = $(e.currentTarget);
        var panel = $this.data('panel');
        this.canvas.setActiveObject(panel.$element);
    }

    onDeletePage(e) {
        var $this = $(e.currentTarget);
        var $element = $this.closest('.workspace-navigation__list-item');
        var page = $element.data('page');
        var index = this.book.pages.indexOf(page);

        e.stopPropagation();

        this.book.pages.splice(index,1);

        $element.remove();

        if( this.book.pages.length ) {
            var nextIndex = this.book.pages.length > index ? index : 0;
            $('.workspace-navigation__list-item').eq(nextIndex).trigger('click');
        } else {
            this.canvas.clear();
            $('.controls--edit').addClass('controls--hidden');
            $('.workspace-navigation__add').trigger('click');
        }

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

        $('.controls__option--panels .controls__button').prop('disabled',true);
        $('.controls__menu--panels').empty();
        $('.controls--edit').removeClass('controls--hidden');

        this.hideUploadScreen();

        // Reset scroll so we get a clean position
        //$('.workspace-navigation__list').scrollTop(0);

        $('.workspace-navigation__list-item--active').removeClass('workspace-navigation__list-item--active');
        $this.addClass('workspace-navigation__list-item--active');
        $('.workspace-navigation__list').animate({
            scrollTop: $this.position().top + $('.workspace-navigation__list').scrollTop() - 20
        },850);

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

    mousemove(o) {
        if( this.mode !== DRAW_MODE || ! this.drawStarted )
            return true;

        var pointer = this.canvas.getPointer(o.e);
        var rect = this.drawStarted;

        if(this.drawX>pointer.x){
            rect.set({ left: Math.abs(pointer.x) });
        }
        if(this.drawY>pointer.y){
            rect.set({ top: Math.abs(pointer.y) });
        }

        rect.set({ width: Math.abs(this.drawX - pointer.x) });
        rect.set({ height: Math.abs(this.drawY - pointer.y) });
        rect.setCoords();

        this.canvas.renderAll();
    }

    mouseup(e) {
        if( this.mode === DRAW_MODE && this.drawStarted) {
            this.book.currentPage.trigger('panelObjectAdded',this.drawStarted);
            this.canvas.setActiveObject(this.drawStarted);
            this.drawStarted = false;
            this.drawX = 0;
            this.drawY = 0;
            $('.controls__option--select .controls__button').trigger('click');
        }
    }

    switchModes(mode) {
        this.mode = mode;
        if( mode === DRAW_MODE ) {
            this.canvas.deactivateAllWithDispatch().renderAll();

        }
        this.book.currentPage.panels.forEach(function(panel) {
            panel.$element.selectable = (mode===DRAW_MODE) ? false : true;
        });
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
            this.canvas.deactivateAllWithDispatch();
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

    hideContextControls() {
        if( $('.controls__option--panels > .controls__button--active').length ) {
            $('.controls__option--select .controls__button').trigger('click');
        }

        $('.controls--context').addClass('controls--hidden');
    }

    deleteObject(e) {
        if( this.canvas.getActiveGroup() ) {
            this.canvas.getActiveGroup().forEachObject(function(o){
                this.canvas.remove(o);
            }.bind(this));
            this.canvas.discardActiveGroup().renderAll();
        } else {
            this.canvas.remove(this.canvas.getActiveObject());
        }
        $('.controls__option--select .controls__button').trigger('click');
    }

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
            this.book.currentPage.trigger('panelObjectAdded',panel);
            this.canvas.setActiveObject(panel);
        }.bind(this));

        $('.controls__option--select .controls__button').trigger('click');
    }

    onControlButtonBlur(e) {
        if( $(e.relatedTarget).is('.panel-item__input') || $(e.target).is('.panel-item__input') ) {
            return true;
        }
        $('.controls__option--select .controls__button').trigger('click');
    }

    onResize(e) {
        this.canvas.setWidth($('.workspace').width()).setHeight($('.workspace').height());
    }

    render() {
        this.canvas.renderAll();
    }
}
