import { LitElement, html } from "lit-element";
import './policy-eligibility-type-selection';
import './app-document-upload/app-document-upload';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout'
import './upload-requirement-document/upload-requirement-document';
import '@polymer/iron-ajax/iron-ajax';
import '../custom-controls/dynamic-vaadin-notification';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-dialog/vaadin-dialog';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import './generated-apps-dialog';
import './rejected-apps-dialog';
import './rejected-apps-failed-upload-dialog';
import { spanStyles, divStyles } from '../group-addition-styles';

export const rejectedAppsDialog = "rejected-apps-dialog";
export const receivedDateElement = "vaadin-date-picker";
export const rejectedAppsFailedUploadDialog = "rejected-apps-failed-upload-dialog";

class DataEntry extends LitElement {
    static get properties() {
        return {
            selectedApplicationType: { type: String },
            selectedGroups: { type: Object },
            appDetails: { type: Object, attribute: false },
            errorNotificationMessage: { type: String, attribute: false },
            receivedDate: { type: String },
            applicationFormTypeId: { type: Number },
            healthGroupInfo: { type: Object },
            dentalGroupInfo: { type: Object },
            visionGroupInfo: { type: Object },
            selectedContracts: { type: Object },
            rejectedOsdApplicationId: { type: Number },
            disabled: { type: Boolean },
            selectedCompany: { type: Number },
            selectedcontractssn: {type : String}
        };
    }
    static get styles() {
        return [
            spanStyles,
            divStyles
        ]
    }
    constructor() {
        super();
        this.rejectedOsdApplicationId = 0;
        this.disabled = false;
    }
    render() {
        return html`
            <iron-ajax method="POST" 
                        handle-as = "json"
                        headers = '{"Content-type" : "application/json"}'
                        contentType = "application/json"
                        @response = ${this.saveApplicationApiResponseHandler}
                        @error = ${this.handleSaveApplicationApiError}
                        id="saveApplicationApi"
                        ></iron-ajax>
                        
                <div class="formControlGroup"> 
                <vaadin-vertical-layout theme="spacing-l" >
                <div>
                    <div><span class="simpleHeader">Received Date <span style ="color:red">*</span></span></div>
                    <vaadin-date-picker 
                        required
                        ?disabled = "${this.disabled}"
                        placeholder = "mm/dd/yyyy"
                        .value = ${this.receivedDate}></vaadin-date-picker>
                </div>
                <policy-eligibility-type-selection></policy-eligibility-type-selection>

                <upload-requirement-document> </upload-requirement-document>

                <app-document-upload .selectedGroups = "${this.selectedGroups}"
                    @appDocumentDetailsUpdated = ${(e) => this.appDetails = JSON.parse(e.detail.message)}
                ></app-document-upload>

                <vaadin-button theme="primary" 
                            @click = ${this.uploadDocumentsClicked} >
                            Upload Documents
                </vaadin-button>
                </vaadin-vertical-layout>
            </div>
          
            <vaadin-dialog no-close-on-esc no-close-on-outside-click>
                    <template>
                        <div>
                          Please wait while we upload your application. This may take a few minutes...
                            <vaadin-progress-bar indeterminate value="0"></vaadin-progress-bar>
                        </div>
                    </template>
            </vaadin-dialog>
            <dynamic-vaadin-notification theme="error"></dynamic-vaadin-notification>
            <generated-apps-dialog></generated-apps-dialog>
            <rejected-apps-dialog></rejected-apps-dialog>
            <rejected-apps-failed-upload-dialog></rejected-apps-failed-upload-dialog>
           
        `;

    }
    getElement(elementName) {
        return this.shadowRoot.querySelector(elementName);
    }
    get generatedAppsDialog() {
        return this.shadowRoot.querySelector("generated-apps-dialog");
    }
    get vaadinDialog() {
        return this.shadowRoot.querySelector("vaadin-dialog");
    }
    get receivedDateElement() {
        return this.shadowRoot.querySelector("vaadin-date-picker");
    }
    get saveApplicationIronAjax() {
        return this.shadowRoot.getElementById("saveApplicationApi");
    }
    get requirementDocElement() {
        return this.shadowRoot.querySelector("upload-requirement-document");
    }
    get policyEligibilityElement() {
        return this.shadowRoot.querySelector("policy-eligibility-type-selection");
    }
    get errorNotification() {
        return this.shadowRoot.querySelector("dynamic-vaadin-notification");
    }
    get appDocumentUpload() {
        return this.shadowRoot.querySelector("app-document-upload");
    }

    get requirementDocsForApiModel() {
        var reqDocs = [];
        this.requirementDocElement.uploadedDocuments.map(doc => {
            var req = new Object();
            req.typeId = doc.requirementTypeId;
            req.fileName = doc.document;
            reqDocs.push(req);
        });
        return reqDocs;

    }
    runValidations() {
        if (this.receivedDateElement.value === "" || this.receivedDateElement.value === undefined) {
            this.errorNotification.setAttribute("message", "Invalid Received Date");
            this.receivedDateElement.setAttribute("invalid", true);
            return false;
        }
        else {
            var dateParts = this.receivedDateElement.value.split('-');
            var receivedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            var date_regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
            if ((!(date_regex.test(this.receivedDateElement.value)) || receivedDate > new Date())) {
                this.errorNotification.setAttribute("message", "Invalid Received Date");
                this.receivedDateElement.setAttribute("invalid", true);
                return false;
            }
        }
        this.receivedDateElement.removeAttribute("invalid");
        var policyEligibilityError = this.policyEligibilityElement.isValid();
        if (policyEligibilityError !== "") {
            this.errorNotification.setAttribute("message", policyEligibilityError);
            return false;
        }
        var requirementDocError = this.requirementDocElement.isValid();
        if (requirementDocError !== "") {
            this.errorNotification.setAttribute("message", requirementDocError);
            return false;
        }
        var uploadDocError = this.appDocumentUpload.isValid();
        if (uploadDocError !== "") {
            this.errorNotification.setAttribute("message", uploadDocError);
            return false;
        }
        return true;
    }
    populateGroupAdditionModelWithGroupInfo(groupAdditionModel, groupInfo) {
        groupAdditionModel.agent = groupInfo.agent;
        groupAdditionModel.representative = groupInfo.representative;
        groupAdditionModel.initialAnniversaryDate = groupInfo.initialAnniversaryDate;
        groupAdditionModel.companyId = groupInfo.companyId;
        groupAdditionModel.carrier = groupInfo.carrier;
        groupAdditionModel.groupName = groupInfo.groupName;
        groupAdditionModel.declinedLife = groupInfo.declinedLife;
        groupAdditionModel.proposalId = groupInfo.proposalId;
        return groupAdditionModel;
    }
    populateGroupAdditionModelWithQleDetails(groupAdditionModel) {
        groupAdditionModel.qleType = this.policyEligibilityElement.selectedEligibilityType;
        groupAdditionModel.qleDate = this.policyEligibilityElement.selectedEligibilityDate;
        return groupAdditionModel;
    }
    populateGroupAdditionsModelWithProductDocumentDetails(groupAdditionModel, appDocProduct) {
        groupAdditionModel.documentDescription = appDocProduct.documentDescription;
        groupAdditionModel.documentLongDescription = appDocProduct.documentLongDescription;
        groupAdditionModel.classWaitPeriod = appDocProduct.classWaitingPeriod;
        return groupAdditionModel;
    }
    populateGroupAdditionModelWithCommonDetails(groupAdditionModel) {
        groupAdditionModel.receivedDate = this.receivedDateElement.value;
        groupAdditionModel.requirementDocuments = this.requirementDocsForApiModel;
        groupAdditionModel.applicationFileName = this.appDocumentUpload.selectedFileName;
        groupAdditionModel.formType = this.applicationFormTypeId;
        return groupAdditionModel;
    }
    populateGroupAdditionModel() {
        if (this.runValidations()) {
            this.vaadinDialog.opened = true;
            var groupAdditionModelArray = [];
            if (this.selectedGroups.healthGroup !== undefined && this.selectedGroups.healthGroup !== "None") {
                var groupAdditionModel = new Object();
                groupAdditionModel.groupNumber = this.selectedGroups.healthGroup;
                groupAdditionModel.productType = 1;
                if (this.selectedContracts !== null && this.selectedContracts !== undefined) {
                    groupAdditionModel.contractNumber = this.selectedContracts.healthContractNumber;
                }

                groupAdditionModel = this.populateGroupAdditionModelWithCommonDetails(groupAdditionModel)
                groupAdditionModel = this.populateGroupAdditionsModelWithProductDocumentDetails(groupAdditionModel, this.appDocumentUpload.appDocumentHealthDetails);
                groupAdditionModel = this.populateGroupAdditionModelWithQleDetails(groupAdditionModel);
                groupAdditionModel = this.populateGroupAdditionModelWithGroupInfo(groupAdditionModel, this.healthGroupInfo);

                groupAdditionModelArray.push(groupAdditionModel);
            }
            if (this.selectedGroups.dentalGroup !== undefined && this.selectedGroups.dentalGroup !== "None") {
                var groupAdditionModel = new Object();
                groupAdditionModel.groupNumber = this.selectedGroups.dentalGroup;
                groupAdditionModel.productType = 2;

                if (this.selectedContracts !== null && this.selectedContracts !== undefined) {
                    groupAdditionModel.contractNumber = this.selectedContracts.dentalContractNumber;
                }
                groupAdditionModel = this.populateGroupAdditionModelWithCommonDetails(groupAdditionModel)
                groupAdditionModel = this.populateGroupAdditionsModelWithProductDocumentDetails(groupAdditionModel, this.appDocumentUpload.appDocumentDentalDetails);
                groupAdditionModel = this.populateGroupAdditionModelWithQleDetails(groupAdditionModel);
                groupAdditionModel = this.populateGroupAdditionModelWithGroupInfo(groupAdditionModel, this.dentalGroupInfo);
                groupAdditionModelArray.push(groupAdditionModel);
            }
            if (this.selectedGroups.visionGroup !== undefined && this.selectedGroups.visionGroup !== "None") {
                var groupAdditionModel = new Object();
                groupAdditionModel.groupNumber = this.selectedGroups.visionGroup;
                groupAdditionModel.productType = 3;

                if (this.selectedContracts !== null && this.selectedContracts !== undefined) {
                    groupAdditionModel.contractNumber = this.selectedContracts.visionContractNumber;
                }
                groupAdditionModel = this.populateGroupAdditionModelWithCommonDetails(groupAdditionModel)
                groupAdditionModel = this.populateGroupAdditionsModelWithProductDocumentDetails(groupAdditionModel, this.appDocumentUpload.appDocumentVisionDetails);
                groupAdditionModel = this.populateGroupAdditionModelWithQleDetails(groupAdditionModel);
                groupAdditionModel = this.populateGroupAdditionModelWithGroupInfo(groupAdditionModel, this.visionGroupInfo);
                groupAdditionModelArray.push(groupAdditionModel);
            }
            return groupAdditionModelArray;
        }
        return undefined;
    }
    newEnrolleeUpload() {
        var groupAdditionModelArray = this.populateGroupAdditionModel();
        if (groupAdditionModelArray !== undefined) {
            if (this.rejectedOsdApplicationId !== 0) {
                this.setRejectedNewEnrolleeApi(groupAdditionModelArray)
            }
            else {
                this.setNewEnrolleeApi(groupAdditionModelArray);
            }

        }
    }

    addFamilyMemberUpload() {
        var groupAdditionModelArray = this.populateGroupAdditionModel();
        if (groupAdditionModelArray !== undefined) {
            if (this.rejectedOsdApplicationId !== 0 && this.rejectedOsdApplicationId !== null) {
                this.setRejectedAddFamilyMemeberApi(groupAdditionModelArray)
            }
            else {
                this.setAddFamilyMemeberApi(groupAdditionModelArray);
            }
        }

    }
    setNewEnrolleeApi(groupAdditionModelArray) {
        this.saveApplicationIronAjax.setAttribute("body", JSON.stringify(groupAdditionModelArray));
        this.saveApplicationIronAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
            + window.location.port
            + window.location.pathname
            + "/api/ApplicationUpload/GenerateNewEnrolleeApplications";
        this.saveApplicationIronAjax.generateRequest();
    }

    setRejectedNewEnrolleeApi(groupAdditionModelArray) {
        this.saveApplicationIronAjax.setAttribute("body", JSON.stringify(groupAdditionModelArray));
        this.saveApplicationIronAjax.setAttribute("method", "PUT");
        this.saveApplicationIronAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
            + window.location.port
            + window.location.pathname
            + "/api/ApplicationUpload/UpdateNewEnrolleeApplications/" + this.rejectedOsdApplicationId;
        this.saveApplicationIronAjax.generateRequest();
    }

    setAddFamilyMemeberApi(groupAdditionModelArray) {
        this.saveApplicationIronAjax.setAttribute("body", JSON.stringify(groupAdditionModelArray));
        this.saveApplicationIronAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
            + window.location.port
            + window.location.pathname
            + "/api/ApplicationUpload/GenerateAddFamilyApplications";
        this.saveApplicationIronAjax.generateRequest();
    }

    setRejectedAddFamilyMemeberApi(groupAdditionModelArray) {
        this.saveApplicationIronAjax.setAttribute("body", JSON.stringify(groupAdditionModelArray));
        this.saveApplicationIronAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
            + window.location.port
            + window.location.pathname
            + "/api/ApplicationUpload/UpdateAddFamilyMemberApplications?rejectedOsdApplicationId=" + this.rejectedOsdApplicationId;
        this.saveApplicationIronAjax.generateRequest();
    }

    saveApplicationApiResponseHandler(event) {
        this.vaadinDialog.opened = false;
        if (this.rejectedOsdApplicationId !== 0) {
            if (event.detail.response.showApplicationUploadError) {
                this.getElement(rejectedAppsFailedUploadDialog).open();
            }
            else {
                this.getElement(rejectedAppsDialog).open();
            }
        }
        else {
            this.generatedAppsDialog.setAttribute("healthappid", event.detail.response.applicationIds.Health);
            this.generatedAppsDialog.setAttribute("dentalappid", event.detail.response.applicationIds.Dental);
            this.generatedAppsDialog.setAttribute("visionappid", event.detail.response.applicationIds.Vision);
            debugger;
            if (event.detail.response.showApplicationUploadError) {
                this.generatedAppsDialog.setAttribute("showapplicationuploaderror", true);
            }
            else {
                this.generatedAppsDialog.removeAttribute("showapplicationuploaderror");
            }
            this.generatedAppsDialog.open();
        }
    }
    handleSaveApplicationApiError(event) {
        this.vaadinDialog.opened = false;
        this.errorNotification.setAttribute("message", event.detail.request.response.message)
    }
    uploadDocumentsClicked(e) {
        if (this.selectedApplicationType === "New Enrollee") {
            this.newEnrolleeUpload();
        }
        else if (this.selectedApplicationType === "Add a Family Member") {
            this.addFamilyMemberUpload();
        }
    }
    attributeChangedCallback(name, oldVal, newVal) {     
        if (name === "selectedgroups") {
            this.appDocumentUpload.setAttribute("selectedgroups", newVal);
        }
        else if ((name === "selectedcompany" || name === "selectedcontractssn") 
            && oldVal !== null && oldVal !== newVal)
        {
            this.receivedDateElement.value = "";
            this.receivedDateElement.removeAttribute("invalid");
            this.receivedDateElement.focus();
            this.policyEligibilityElement.setAttribute("selectedvalue", "");
            this.requirementDocElement.setAttribute("uploadeddocument", JSON.stringify([]));
        }
        else if (name === "healthgroupinfo" && newVal !== "undefined") {
            this.healthGroupInfo = JSON.parse(newVal);
        }
        else if (name === "dentalgroupinfo" && newVal !== "undefined") {
            this.dentalGroupInfo = JSON.parse(newVal);
        }
        else if (name === "visiongroupinfo" && newVal !== "undefined") {
            this.visionGroupInfo = JSON.parse(newVal);
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }

    loadControl(rejectedAppData) {
        if (rejectedAppData.appType === 2) {
            var rejectedGroups = new Object();
            rejectedGroups.healthGroup = rejectedAppData.healthGroupNumber;
            rejectedGroups.dentalGroup = rejectedAppData.dentalGroupNumber;
            rejectedGroups.visionGroup = rejectedAppData.visionGroupNumber;
            this.selectedGroups = rejectedGroups;
            var rejectedContracts = new Object();
            rejectedContracts.healthContractNumber = rejectedAppData.healthContractNumber;
            rejectedContracts.dentalContractNumber = rejectedAppData.dentalContractNumber;
            rejectedContracts.visionContractNumber = rejectedAppData.visionContractNumber;
            this.selectedContracts = rejectedContracts;
        }
        this.receivedDate = rejectedAppData.receivedDate.split('T')[0];
        this.disabled = true;
        this.policyEligibilityElement.loadControl(rejectedAppData);
        this.appDocumentUpload.loadControl(rejectedAppData);
        this.rejectedOsdApplicationId = rejectedAppData.rejectedOsdApplicationId;
    }
}
customElements.define("data-entry", DataEntry);