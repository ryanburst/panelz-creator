class Page extends EventClass {
    constructor(Book,config) {
        super();
        this.labels = "abcdefghijklmnopqrstuvwxyz";
        this.app = Book.app;
        this.book = Book;
        this.url = config.url;
        this.size = config.size;
        this.width = config.width;
        this.height = config.height;
        this.panels = config.panels || [];

        this.setEventListeners();
    }

    set panels(panels) {
        this._panels = [];
        panels.forEach(function(data) {
            var panel = data instanceof Panel ? data : new Panel(this,data);
            this.panels.push(panel);
        }.bind(this));
    }

    get panels() {
        return this._panels;
    }

    getNextLabel() {
        if( ! this.labelRound ) {
            this.labelRound = 1;
        }
        if( ! this.remainingLabels || ! this.remainingLabels.length ) {
            if( this.remainingLabels && ! this.remainingLabels.length ) {
                this.labelRound += 1;
            }
            this.remainingLabels = this.labels.toUpperCase().split("").map(function(val) {
                return val.repeat(this.labelRound);
            }.bind(this));
        }

        return this.remainingLabels.shift();
    }

    setEventListeners() {
        this.on('edit',this.onEdit.bind(this));
        this.on('panelObjectAdded',this.onPanelObjectAdded.bind(this));
        this.on('panelObjectRemoved',this.onPanelObjectRemoved.bind(this));
    }

    onEdit(pageObject) {
        this.$element = pageObject;
        this.book.trigger('editingPage',this);
    }

    onPanelObjectAdded(panelObject,panel) {
        if( ! panel ) {
            var panel = new Panel(this,{});
            this.panels.push(panel);
        }
        panel.$element = panelObject;
        this.book.trigger('panelSet',panel);
    }

    onPanelObjectRemoved(panel) {
        var index = this.panels.indexOf(panel);
        this.panels.splice(index,1);
        this.book.trigger('panelRemoved',panel);
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

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
