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
