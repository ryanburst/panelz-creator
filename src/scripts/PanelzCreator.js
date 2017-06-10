class PanelzCreator extends EventClass {
    constructor() {
        super();
        console.log('Init');
        this.book = new Book();
        this.upload = new Upload();

        this.setEventListeners();
    }

    setEventListeners() {
        this.upload.on('pageUploaded',this.onPageUploaded.bind(this));
    }

    onPageUploaded(data) {
        console.log('On page uploaded');
        this.book.add(data);
    }
}
