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
