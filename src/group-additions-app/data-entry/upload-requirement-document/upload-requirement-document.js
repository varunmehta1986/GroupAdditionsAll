import { LitElement, html, css } from "lit-element";
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-upload';
import '@polymer/iron-icons/iron-icons';
import './add-requirement-document';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import {divStyles} from '../../group-addition-styles';

class UploadRequirementDocument extends LitElement {

    static get properties() {
        return {
            index: { type: Number },
            uploadedDocument: {type : Array},
        };
    }
    static get styles(){
        return [
            divStyles
        ]
    }
    constructor() {
        super();
        this.index = 0;
    }

    render() {
        return html`
        <style>
            .mainDivRequirementUpload{
                background:#F5F5F5;
                width: 850px;
                height: 100%;
            }
        </style>

                <div class = "controlHeaderDark">
                    Upload Requirement Document
                </div>
                <div class="mainDivRequirementUpload">
                <div style ="padding:2px;">
                    <vaadin-vertical-layout id="uploadDocument" theme="spacing-s">
                            <vaadin-button  theme="small"
                                            @click = "${this.onAddRequirementClick}">
                                            <iron-icon icon="vaadin:plus"></iron-icon>
                                            Add
                            </vaadin-button>
                    </vaadin-vertical-layout>
                </div>
                </div>
        `;
    }
    isValid() {
        var addReqElements = this.shadowRoot.querySelectorAll("add-requirement-document");
        var errorMessage = "";
        for (var i = 0; i < addReqElements.length; i++) {
            var node = addReqElements[i];
            errorMessage = node.isValid();
            if (errorMessage !== "") {
                break;
            }
        }
        return errorMessage;
    }
    onAddRequirementClick() {
        var newRequirement = document.createElement("add-requirement-document");
        newRequirement.setAttribute("id", this.index);
        this.shadowRoot.querySelector("vaadin-vertical-layout").appendChild(newRequirement);
        this.requestUpdate();
        this.index = this.index + 1;
    }

    get uploadedDocuments(){
        var addReqElements = this.shadowRoot.querySelectorAll("add-requirement-document");
        var uploadedReqDoc = new Array();
        Array.prototype.forEach.call(addReqElements, function (node) {            
            uploadedReqDoc.requirementTypeId = node.selectedRequirementTypeId;
            uploadedReqDoc.document = node.selectedFileName;
            uploadedReqDoc.push(uploadedReqDoc);            
        });
        return uploadedReqDoc;
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "uploadeddocument") {
            var addReqElements = this.shadowRoot.querySelectorAll("add-requirement-document");
            Array.prototype.forEach.call(addReqElements, function (node) {
                node.parentNode.removeChild(node);
            });
            
            super.attributeChangedCallback(name, oldVal, newVal);
        }
    }
    

}
customElements.define("upload-requirement-document", UploadRequirementDocument);