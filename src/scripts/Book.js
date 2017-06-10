class Book extends EventClass {
    constructor() {
        super();
        this.pages = [];
    }

    add(pageConfig) {
        var page = new Page(pageConfig);
        this.pages.push(page);

        console.log(page);

        $('.workspace-navigation__list').append('<li class="workspace-navigation__list-item"><img src="'+page.url+'" /></li>');
    }
}
