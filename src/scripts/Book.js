class Book extends EventClass {
    constructor(app,config) {
        super();
        this.app = app;
        this.config = config;
        this.id = config.id;
        this.title = config.title;
        this.pages = config.pages || [];
        this.currentPage = false;

        this.makeSortable();
        this.setEventListeners();
    }

    set title(title) {
        $('.viewport__title-input').val(title);
        this._title = title;
    }

    get title() {
        return this._title;
    }

    set pages(pages) {
        this._pages = [];
        pages.forEach(this.add.bind(this));
    }

    get pages() {
        return this._pages;
    }

    makeSortable() {
        $(".workspace-navigation__list").sortable({
            placeholder: "workspace-navigation__list-item ui-state-highlight",
            start: function(e, ui){
                ui.placeholder.height(ui.item.height());
            },
            update: this.onPageSort.bind(this),
            axis: 'y'
        });
    }

    setEventListeners() {
        this.on('editingPage',this.setCurrentPage.bind(this));
    }

    add(pageConfig) {
        if( pageConfig instanceof Page) {
            this.pages.push(pageConfig);
            return;
        }
        var page = new Page(this,pageConfig);
        this.pages.push(page);

        var $element = $('<li class="workspace-navigation__list-item"><span class="workspace-navigation__delete-page"><i class="fa fa-times-circle"></i></span><img src="'+page.url+'" /></li>').data('page',page);

        $('.workspace-navigation__list').append($element);

        $element.trigger('click');

        this.trigger('pageAdded',page);
    }

    setCurrentPage(page) {
        this.currentPage = page;
    }

    onPageSort(ev,ui) {
        console.log('PAge sort');
        this.pages = $('.workspace-navigation__list-item').map(function(i, el) {
            return $(el).data('page');
        }).get();
        console.log(this.pages);
    }

    toArray() {
        var pages = this.pages.map(function(page) {
            return page.toArray();
        });
        return {
            id: this.id,
            title: $('.viewport__title-input').val(),
            pages: pages
        }
    }
}
