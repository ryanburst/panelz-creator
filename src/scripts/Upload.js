/**
 * Handles uploads for a page. Uses the Dropzone
 * library to do drag and drop or selectable uploads.
 *
 * @class
 * @extends EventClass
 * @author  Ryan Burst <ryanburst@gmail.com>
 * @version 0.3.0
 */
class Upload extends EventClass {
    /**
     * Initiates the Upload item and initiates the Dropzone library
     *
     * @constructs
     * @param {PanelzCreator} app PanelzCreator instance
     */
    constructor(app) {
        super();
        /**
         * PanelzCreator instance
         * @type {[PanelzCreator]}
         */
        this.app = app;
        /**
         * Dropzone instance
         * @type {Dropzone}
         */
        this.dropzone = new Dropzone(".upload__dropzone", {
            url: this.app.getEndpoint('upload'),
            paramName: "page",
            clickable: $('.upload .button--upload')[0],
            addRemoveLinks: true,
            headers: {
              "Cache-Control": "",
              "X-Requested-With": ""
            }
        });

        this.setEventListeners();
    }

    /**
     * Sets event listeners on the application and dropzone
     */
    setEventListeners() {
        this.app.on('cancelUpload',this.onCancelUpload.bind(this));
        this.dropzone.on("sending",this.onFileSending.bind(this));
        this.dropzone.on("success",this.onUploadSuccess.bind(this));
        this.dropzone.on('complete',this.onUploadComplete.bind(this));
    }

    /**
     * Cancel upload has been initiated, so clear all files from
     * the Dropzone instance.
     */
    onCancelUpload() {
        this.dropzone.removeAllFiles(true);
    }

    /**
     * A file is being sent, add the comic ID to the data being sent.
     *
     * @param {Object} file     File being sent
     * @param {xhr}    xhr      xhr object
     * @param {Object} formData Data being sent
     */
    onFileSending(file, xhr, formData) {
        formData.append("comicID", this.app.book.id);
    }

    /**
     * The file has been uploaded, remove it from the the dropzone
     * instance and trigger an uploaded event.
     *
     * @param  {Object} file   dropzone file
     * @param  {Object} server Server response object
     * @fires  Upload#pageUploaded
     */
    onUploadSuccess(file,server) {
        this.dropzone.removeFile(file);
        /**
         * Page Uploaded event
         *
         * @event Upload#pageUploaded
         * @type {Object}
         * @property {Object} Server response
         */
        this.trigger('pageUploaded',server);
    }

    /**
     * A file upload is complete. If all of the uploads
     * have been completed, we can trigger the complete event.
     *
     * @param  {Object} file   dropzone file
     * @param  {Object} server Server response object\
     * @fires  Upload#complete
     */
    onUploadComplete(file,server) {
        if (this.areUploadsComplete()) {
            /**
             * Complete event
             *
             * @event Upload#complete
             * @type {Object}
             */
            this.trigger('complete');
        }
    }

    /**
     * Checks to see if all dropzone uploads have been completed.
     * @return {Boolean}
     */
    areUploadsComplete() {
        return this.dropzone.getUploadingFiles().length === 0
            && this.dropzone.getQueuedFiles().length === 0;
    }
}
