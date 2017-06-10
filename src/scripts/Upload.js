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
