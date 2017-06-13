class Page extends EventClass {
    constructor(config) {
        super();
        this.url = config.url;
        this.size = config.size;
        this.width = config.width;
        this.height = config.height;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}
