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
