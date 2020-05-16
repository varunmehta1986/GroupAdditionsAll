import { LitElement, html, css } from "lit-element";
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '../../custom-controls/select-list-dynamic';

export const selectElement = "select-list-dynamic";
export const vaadinUploadElement = "vaadin-upload";

class AddRequirementDocument extends LitElement {
    static get properties() {
        return {
            selectedRequirementTypeId: { type: String },
            requirementDocumentTypes: { type: Array },
            requirementDocumentOptionsUrl: { type: String },
            files: { type: Array },
            selectedFileName: { type: String },
            id: { type: Number },
            maxFiles : {type: String},
            disableUpload : {type : Boolean}

        }
    }
    constructor() {
        super();
        this.uploadedData = [];
        this.hideControl = true;
        this.selectedFileName = "";
        this.files = [];
        this.maxFiles = "0";
        this.requirementDocumentOptionsUrl = window.location.protocol + "//" + window.location.hostname + ":"
            + window.location.port
            + window.location.pathname
            + "/api/GroupAdditions/GetRequirementDocumentTypes";

        this.updateComplete.then(() => {
            const fileUpload = this.shadowRoot.querySelector("vaadin-upload");
            fileUpload.set("i18n.addFiles", { "one": "Select Document" });
        });
        this.disableUpload = true;
    }

    render() {
        return html`
        <style>

        .mainDiv{
                    width: 850px;
                    height: 100%;
                    border-width : 1px;
                    border-color : #0099CC;
                    border-style: solid;
                    border-radius:5px 5px 5px 5px; 
                    padding-top: 5px;
                    background:#F5F5F5;
                    padding-bottom: 5px;
                    padding-left: 0px;
                    align-items: center;
                }
            </style>
                    <div class="mainDiv" id="vaadinAddRequirement">
                            <vaadin-horizontal-layout theme="spacing-s">
                               
                                <select-list-dynamic 
                                        .label =  ${"Document Type"}
                                        .placeholder = ${"Select Type"}
                                        style = "width:360px"
                                        .itemValuePath = ${"id"}
                                        .itemDisplayPath = ${"name"}
                                        @change = ${this.onSelectedTypeChange}
                                        .url = ${this.requirementDocumentOptionsUrl}
                                        .selectedValue = ${this.selectedRequirementTypeId} 
                                         required    
                                         autoLoad                                  
                                        >
                                </select-list-dynamic>
                                <vaadin-upload  
                                                theme="small"
                                                max-files =  ${this.maxFiles}
                                                style="width: 330px; padding-top:2px;"
                                                accept = ".pdf,.doc,.docx,image/tif,.tif,.tiff" 
                                                @upload-error = ${this.onErrorUpload}
                                                @files-changed = "${this.onDocumentUploadChange}"                                                
                                                .target = ${window.location.pathname + "/api/ApplicationUpload/ApplicationFileUpload"}
                                                .files = "${this.files}"
                                                method = "POST"
                                                >
                                <div slot = "add-button">
                                        <vaadin-button ?disabled="${this.disableUpload}">
                                            Select File <small>(.PDF, .DOC, .DOCX, .TIF)</small>
                                        </vaadin-button>
                                </div>
                                </vaadin-upload>                                
                                <vaadin-button 
                                                theme="medium"                                                
                                                style= "background-color:#F5F5F5;">
                                                <iron-icon icon="vaadin:close-small" style  = "color:red;"></iron-icon>
                                </vaadin-button>
                                
                                </vaadin-horizontal-layout>
                    </div>

        `;
    }
    onErrorUpload() {
        this.files = [];
        this.selectedFileName = "";
    }
    
    getElement(elementName) {
        return this.shadowRoot.querySelector(elementName);
    }
    isValid() {
        if (this.selectedRequirementTypeId === "" || this.selectedRequirementTypeId === undefined) {
            this.getElement(selectElement).setAttribute("invalid", true);
            return "Requirement Document Type needs to be selected.";
        }
        if (this.selectedFileName === null || this.selectedFileName === undefined
            || this.selectedFileName === "") {
            return "Please select a file for all of the requirement document types.";
        }
        this.getElement(selectElement).removeAttribute("invalid");
        return "";
    }
    onGetRequirementDocumentSelectionsApiResponse(e) {
        this.requirementDocumentTypes = e.detail.response;
    }
    onRemoveRequirementClick(e) {
        this.parentElement.removeChild(this);
    }

    onSelectedTypeChange(e) {
        this.files = [];
        this.selectedFileName = "";
        this.selectedRequirementTypeId = e.detail.message;
        if(this.selectedRequirementTypeId !== undefined || this.selectedRequirementTypeId !== null){
           this.maxFiles = "1"
           this.disableUpload = false;
        }
        
    }
    onDocumentUploadChange(e) {
        if (e.currentTarget.files !== undefined && e.currentTarget.files.length>0) {
            this.selectedFileName = e.currentTarget.files[0].name;
        }
        else{
            this.selectedFileName = "";
        }
    }
   

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "id"
            && newVal !== null
            && newVal !== undefined) {
            if (oldVal !== newVal) {
                this.id = newVal;
            }
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }
    
}

customElements.define("add-requirement-document", AddRequirementDocument);