// https://github.com/sroucheray/event-class
const multiChannelSep = /(?:,|\s)+/g;
const channelSep = /:+/g;
const channelsSymbol = Symbol('channels');

class EventClass {
    constructor(){
        this[channelsSymbol] = {};
    }

    _getChannels(channelString){
        return channelString.trim().split(multiChannelSep);
    }

    _getNameSpaces(channel){
        let namespaces = [];
        let splittedChannels = channel.trim().split(channelSep);

        for (let i = splittedChannels.length; i >= 1; i--) {
            namespaces.push(splittedChannels.slice(0, i).join(':'));
        }

        return namespaces;
    }

    trigger(event, data){
        let channels = this._getChannels(event);

        for (let channel of channels){
            let namespaces = this._getNameSpaces(channel);
            for (let namespace of namespaces){
                if(!this[channelsSymbol][namespace]){
                    continue;
                }

                for(let callback of this[channelsSymbol][namespace]){
                    callback.call(this, data);
                }
            }
        }
    }

    on(event, callback){
        let channels = this._getChannels(event);

        for (let channel of channels){
            if(!this[channelsSymbol][channel]){
                this[channelsSymbol][channel] = [];
            }

            this[channelsSymbol][channel].push(callback);
        }
    }

    off(event, callback){
        let channels = this._getChannels(event);

        for (let channel of channels){
            if(!this[channelsSymbol][channel]){
                return;
            }

            let index = this[channelsSymbol][channel].indexOf(callback);

            if(index > -1){
                this[channelsSymbol][channel].splice(index, 1);
            }
        }
    }

    once(event, callback){
        function offCallback(){
            this.off(event, callback);
            this.off(event, offCallback);
        }

        this.on(event, callback);
        this.on(event, offCallback);
    }
}

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

class Page extends EventClass {
    constructor(config) {
        super();
        this.url = config.url;
        this.size = config.size;
        this.width = config.width;
        this.height = config.height;
    }
}

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

class Upload extends EventClass {
    constructor() {
        super();
        var myDropzone = new Dropzone(".upload__dropzone", {
            url: "/upload",
            paramName: "page",
            clickable: $('.upload .button--upload')[0],
            addRemoveLinks: true
        });
        myDropzone.on("success", function(file,server) {
            myDropzone.removeFile(file);
            this.trigger('pageUploaded',server);
        }.bind(this));
    }
}
