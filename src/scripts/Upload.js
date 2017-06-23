class Upload extends EventClass {
    constructor(app) {
        super();
        this.app = app;
        var myDropzone = new Dropzone(".upload__dropzone", {
            url: this.app.getEndpoint('upload'),
            paramName: "page",
            clickable: $('.upload .button--upload')[0],
            addRemoveLinks: true,
            headers: {
              "Cache-Control": "",
              "X-Requested-With": ""
            }
        });

        this.app.on('cancelUpload',function() {
            myDropzone.removeAllFiles(true);
        });

        myDropzone.on("success", function(file,server) {
            myDropzone.removeFile(file);
            this.trigger('pageUploaded',server);
        }.bind(this));
    }
}
