class Panel extends EventClass {
    constructor(Page,config) {
        super();
        this.app = Page.app;
        this.page = Page;
        this.config = config || {};
        this.x = this.config.x;
        this.y = this.config.y;
        this.width = this.config.width;
        this.height = this.config.height;
        this.label = this.config.label || 'Panel ' + this.page.getNextLabel();
    }

    set $element(value) {
        this._$element = value;
        this.setObjectEventListeners();
        this.onObjectScaled();
    }

    get $element() {
        return this._$element;
    }

    setObjectEventListeners() {
        this.$element.on('moving',this.onObjectMoved.bind(this));
        this.$element.on('scaling',this.onObjectScaled.bind(this));
        this.$element.on('removed',this.onObjectRemoved.bind(this));
        this.$element.on('selected',this.onObjectSelected.bind(this));
        this.$element.on('deselected',this.onObjectDeselected.bind(this));
    }

    onObjectSelected() {
        var index = this.page.panels.indexOf(this);
        $('.controls__menu--panels .controls__menu-item').eq(index).addClass('controls__menu-item--selected');
    }

    onObjectDeselected() {
        var index = this.page.panels.indexOf(this);
        $('.controls__menu--panels .controls__menu-item').eq(index).removeClass('controls__menu-item--selected');
    }

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

    setPropertiesFromCanvas() {
        this.x = Math.round((this.getCurrentLeft() - this.page.$element.left) * this.page.getWidth() / this.page.$element.getWidth());
        this.y = Math.round((this.getCurrentTop() - this.page.$element.top) * this.page.getHeight() / this.page.$element.getHeight());
        this.width = Math.round(this.getCurrentWidth() * this.page.getWidth() / this.page.$element.getWidth());
        this.height = Math.round(this.getCurrentHeight() * this.page.getHeight() / this.page.$element.getHeight());
    }

    getPropertiesForCanvas() {
        return {
            x: Math.round((this.getLeft() * this.page.$element.getWidth() / this.page.getWidth()) + this.page.$element.left),
            y: Math.round((this.getTop() * this.page.$element.getHeight() / this.page.getHeight()) + this.page.$element.top),
            width: Math.round(this.getWidth() * this.page.$element.getWidth() / this.page.getWidth()),
            height: Math.round(this.getHeight() * this.page.$element.getHeight() / this.page.getHeight())
        };
    }

    onObjectRemoved() {
        this.page.trigger('panelObjectRemoved',this);
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
