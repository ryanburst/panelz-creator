class PanelzCreator extends EventClass {
    constructor(config) {
        super();
        this.DEFAULTS = {
            id: false,
            container: '.panelz-creator-container',
            method: 'ui',
            comic: {},
            endpoints: {
                view: '/read/',
                get: '/comic/',
                create: '/create',
                save: '/save',
                upload: '/upload'
            },
            onCreateComicSuccess: function(){}
        };

        this.config = $.extend(true,{},this.DEFAULTS,config);

        this.setEventListeners();

        if( this.config.method === 'id' ) {
            this.loadById(this.config.id);
        }else if (this.config.method === 'data') {
            this.loadByData(config.comic);
        } else {
            this.loadByUI();
        }
    }

    set config(config) {
        Object.keys(config).forEach(function(key) {
            this[key] = config[key];
        }.bind(this));
        this._config = config;
    }

    get config() {
        return this._config;
    }

    set container(container) {
        this._container = container;
        this.$container = $(container).append(PANELZ_CREATOR_MARKUP);
    }

    get container() {
        return _$container;
    }

    loadById(id) {
        $.ajax({
            url: this.getEndpoint('get') + id,
            method: 'GET',
            error: this.onRequestError.bind(this),
            success: this.loadByData.bind(this)
        });
    }

    loadByData(data) {
        this.showEditor();
        this.book = new Book(this,data);
        this.upload = new Upload(this);
        this.workspace = new Workspace(this,this.book,this.upload);
        this.upload.on('pageUploaded',this.onPageUploaded.bind(this));

        $('[data-view-link]').attr('href',this.getEndpoint('view') + "?id=" + this.book.id);
    }

    loadByUI() {
        this.showCreateUI();
        $('body').on('click','.viewport__entry-submit',this.createComic.bind(this));
    }

    showCreateUI() {
        $('.viewport__loading').addClass('viewport__loading--hidden');
        $('.viewport__entry').removeClass('viewport__entry--hidden');
        $('.viewport__title-bar').addClass('viewport__title-bar--hidden');
        $('.viewport__content').addClass('viewport__content--hidden');
    }

    showEditor() {
        $('.viewport__loading').addClass('viewport__loading--hidden');
        $('.viewport__entry').addClass('viewport__entry--hidden');
        $('.viewport__title-bar').removeClass('viewport__title-bar--hidden');
        $('.viewport__content').removeClass('viewport__content--hidden');
        $(window).on('beforeunload',this.saveComic.bind(this));
    }

    setEventListeners() {
        $('body').on('click','.button--submit',this.onSubmitButtonClick.bind(this));
        $('body').on('complete','.button--submit',this.onSubmitButtonComplete.bind(this));
        $('body').on('click','.button--save',this.saveComic.bind(this));
    }

    createComic(e) {
        e.preventDefault();
        $.ajax({
            url: this.getEndpoint('create'),
            method: 'POST',
            data: {
                title: $('.viewport__entry-input').val()
            },
            error: this.onCreateComicError.bind(this),
            success: function(data) {
                this.config.onCreateComicSuccess.call(this,data);
                this.loadByData(data);
            }.bind(this),
            complete: function() {
                $(e.currentTarget).trigger('complete',e);
            }
        });
    }

    onCreateComicError(response) {
        try {
            var data = JSON.parse(response.responseText);
        } catch(Exeception) {
            data = { message: 'Something terrible has happened. Try again?' };
        }
        $('.viewport__entry-error').text(data.message).show();
    }

    saveComic(e) {
        e.preventDefault();
        $.ajax({
            url: this.getEndpoint('save'),
            method: 'PUT',
            async: e.type === "beforeunload" ? false : true,
            data: this.book.toArray(),
            error: this.onRequestError.bind(this),
            success: this.onSaveComicSuccess.bind(this),
            complete: function() {
                $(e.currentTarget).trigger('complete',e);
            }
        });
    }

    onSaveComicSuccess(data) {
        console.log('SUCCESS!',data);
        this.message('Your comic has been saved.');
    }

    onRequestError(response) {
        try {
            var data = JSON.parse(response.responseText);
        } catch(Exeception) {
            data = { message: 'Something terrible has happened. Try again?' };
        }
        this.message(data.message);
    }

    onSubmitButtonClick(e) {
        var $this = $(e.currentTarget);
        $this.width($this.width());
        $this.find('.button__icon').css('display','inline-block');
        $this.find('.button__text').hide();
    }

    onSubmitButtonComplete(e) {
        var $this = $(e.currentTarget);
        $this.css('width','auto');
        $this.find('.button__icon').hide();
        $this.find('.button__text').show();
    }

    onPageUploaded(data) {
        this.book.add(data);
    }

    onBeforeUnload() {

    }

    getEndpoint(endpoint) {
        return this.endpoints[endpoint];
    }

    message(message,time) {
        var time = time ? time : 4000;

        clearTimeout(this.messageTimeout);

        $('.viewport__message').text(message).fadeIn();
        this.messageTimeout = setTimeout(function() {
            $('.viewport__message').fadeOut();
        },time);
    }
}
