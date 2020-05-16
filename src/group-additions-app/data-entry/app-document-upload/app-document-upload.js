import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import './app-document-product';
import '@vaadin/vaadin-upload/vaadin-upload';
import '@vaadin/vaadin-button/vaadin-button';
import { divStyles } from '../../group-addition-styles';

class AppDocumentUpload extends LitElement {
    static get properties() {
        return {
            selectedGroups: { type: Object },
            appDocumentHealthDetails: { type: Object },
            appDocumentDentalDetails: { type: Object },
            appDocumentVisionDetails: { type: Object },
            files: { type: Array, attribute: false },
            selectedFileName: { type: String }
        }
    }
    static get styles() {
        return [
            divStyles
        ]
    }
    constructor() {
        super();
        this.updateComplete.then(() => {
            const fileUpload = this.shadowRoot.querySelector("vaadin-upload");
            fileUpload.set("i18n.addFiles", { "one": "Select Document" });
        });
    }
    render() {
        return html`
            <style>
                .mainDivAppUpload{
                    background:#F5F5F5; 
                    border-width : 1px;
                    border-color : #0099CC;
                    border-style: solid;

                }
            </style>
            <div>
                <div class = "controlHeaderDark">
                    Upload Application Document
                </div>
                <div class="mainDivAppUpload">
                <div style ="padding:12px;">
                    <vaadin-horizontal-layout theme="spacing-s" >
                        <app-document-product 
                            productType = "Health" 
                            id="healthGroup"
                            @product-updated = "${(e) => this.appDocumentHealthDetails = JSON.parse(e.detail.message)}">
                        </app-document-product>
                        <app-document-product
                            productType = "Dental"
                            id="dentalGroup"
                            @product-updated = "${(e) => this.appDocumentDentalDetails = JSON.parse(e.detail.message)}">
                        </app-document-product>
                        <app-document-product
                            productType = "Vision" 
                            id="visionGroup"
                            @product-updated = "${(e) => this.appDocumentVisionDetails = JSON.parse(e.detail.message)}">
                        </app-document-product>
                    </vaadin-horizontal-layout>
                </div>
                <div>
                    <vaadin-upload max-files = "1" accept = ".pdf,.doc,.docx,image/tif,.tif,.tiff"
                     .files = ${this.files}
                     .target = ${window.location.pathname + "/api/ApplicationUpload/ApplicationFileUpload"}
                     method = "POST"
                     @upload-error = ${this.onErrorUpload}
                     @files-changed = "${this.onDocumentUploadChange}"  >
                    <div slot = "add-button">
                            <vaadin-button>
                                Select File <small>(.PDF, .DOC, .DOCX, .TIF)</small>
                            </vaadin-button>
                    </div>
                    </vaadin-upload>
                    
                </div>
               </div>
            </div>
        `;
    }
    onErrorUpload() {
        this.files = [];
        this.selectedFileName = "";
    }
    isValid() {
        var healthValidMessage = this.healthDocElement.isValid();
        var dentalValidMessage = this.dentalDocElement.isValid();
        var visionValidMessage = this.visionDocElement.isValid();
        if (healthValidMessage !== "") {
            return healthValidMessage;
        }
        if (dentalValidMessage !== "") {
            return dentalValidMessage;
        }
        if (visionValidMessage !== "") {
            return visionValidMessage;
        }
        if (this.selectedFileName === null || this.selectedFileName === undefined
            || this.selectedFileName === "") {
            return "Please select an Application Document.";
        }
        return "";
    }
    get healthDocElement() {
        return this.shadowRoot.getElementById("healthGroup");
    }
    get visionDocElement() {
        return this.shadowRoot.getElementById("visionGroup");
    }
    get dentalDocElement() {
        return this.shadowRoot.getElementById("dentalGroup");
    }
    get vaadinUpload() {
        return this.shadowRoot.querySelector("vaadin-upload");
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "selectedgroups") {
            if (newVal !== null && newVal !== undefined) {
                var selectedGroups = JSON.parse(newVal);

                var healthGroupElement = this.shadowRoot.getElementById("healthGroup");
                healthGroupElement.setAttribute("groupnumber", selectedGroups.healthGroup);

                var visionGroupElement = this.shadowRoot.getElementById("visionGroup");
                visionGroupElement.setAttribute("groupnumber", selectedGroups.visionGroup);

                var dentalGroupElement = this.shadowRoot.getElementById("dentalGroup");
                dentalGroupElement.setAttribute("groupnumber", selectedGroups.dentalGroup);

                this.files = [];
            }
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }
    onDocumentUploadChange(e) {
        if (e.currentTarget.files !== undefined && e.currentTarget.files.length>0) {
            this.selectedFileName = e.currentTarget.files[0].name;
        }
        else{
            this.selectedFileName = "";
        }
    }
    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if (propName === "appDocumentHealthDetails"
                || propName === "appDocumentDentalDetails"
                || propName === "appDocumentVisionDetails") {
                var appDetails = new Object;
                appDetails.healthAppDetails = this.appDocumentHealthDetails;
                appDetails.dentalAppDetails = this.appDocumentDentalDetails;
                appDetails.visionAppDetails = this.appDocumentVisionDetails;

                var appDetailsUpdatedEvent = new CustomEvent("appDocumentDetailsUpdated", {
                    detail: {
                        message: JSON.stringify(appDetails)
                    },
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(appDetailsUpdatedEvent);
            }
        });
    }
    loadControl(rejectedAppData){
       this.files = [];
       this.healthDocElement.setAttribute("groupnumber", rejectedAppData.healthGroupNumber);
       this.dentalDocElement.setAttribute("groupnumber", rejectedAppData.dentalGroupNumber);
       this.visionDocElement.setAttribute("groupnumber", rejectedAppData.visionGroupNumber);        
    }
}
customElements.define("app-document-upload", AppDocumentUpload);