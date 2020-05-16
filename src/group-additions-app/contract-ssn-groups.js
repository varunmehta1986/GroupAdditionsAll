import { LitElement, html, css } from 'lit-element';
import { spanStyles } from './group-addition-styles';
import '../../src/group-additions-app/custom-controls/dynamic-vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-button/vaadin-button';
import './selected-company-groups/selected-company-groups';
import './company-groups/product-groups';
import '@polymer/iron-ajax/iron-ajax';

export const selectedGroupsElement = "selected-company-groups";
export const errorNotification = "dynamic-vaadin-notification";
export const productGroupsElement = "product-groups";


class ContractSsnGroups extends LitElement {
    static get properties() {
        return {
            healthGroups: { type: Object },
            dentalGroups: { type: Object },
            visionGroups: { type: Object },
            selectedHealthGroup: { type: String },
            selectedDentalGroup: { type: String },
            selectedVisionGroup: { type: String },
            hideCompanyGroupsControl: { type: Boolean },
            disableDoneButton: { type: Boolean, attribute: false },
            disableResetButton: { type: Boolean, attribute: false },
            hideSelectedCompanyGroupsElement: { type: Boolean },
            hideReset: { type: Boolean }
        }

    }
    static get styles() {
        return [
            spanStyles
        ]
    }

    constructor() {
        super();
        this.hideCompanyGroupsControl = true;
        this.disableResetButton = true;
        this.hideSelectedCompanyGroupsElement = true;
        this.hideReset = true;
    }

    render() {
        return html`
                <div style="width:550px;padding-top:14px" ?hidden = "${this.hideCompanyGroupsControl}">
                    <span class="simpleHeader">Associated Groups</span> 
                    <vaadin-horizontal-layout theme="spacing-s">
                        <product-groups id="pgHealth" 
                                        productType = "Health"
                                        .groups = "${this.healthGroups}"
                                        @group-selected = "${(e) => this.selectedHealthGroup = e.detail.message}">
                        </product-groups>
                        <product-groups id="pgDental"
                                        productType = "Dental"
                                        .groups = "${this.dentalGroups}"
                                        @group-selected = "${(e) => this.selectedDentalGroup = e.detail.message}">
                        </product-groups>
                        <product-groups id="pgVision" 
                                        productType = "Vision"
                                        .groups = "${this.visionGroups}"
                                        @group-selected = "${(e) => this.selectedVisionGroup = e.detail.message}">
                        </product-groups>
                    </vaadin-horizontal-layout>
                    <vaadin-button theme="primary small" 
                                @click = "${this.onDoneClick.bind(this)}">
                                Done selecting Groups
                                
                    </vaadin-button>
                </div>      
               <div style="width:300px;padding-top:14px">                
                    <selected-company-groups ?hidden = "${this.hideSelectedCompanyGroupsElement}">
                    </selected-company-groups>
                </div>
                <vaadin-button ?hidden = "${this.hideReset}"
                                theme="small"
                                @click = "${this.onResetClick.bind(this)}">
                                Reset Group selections
                </vaadin-button>

            <dynamic-vaadin-notification theme="error"></dynamic-vaadin-notification>

            <iron-ajax  method = "GET" 
                        handle-as = "json"
                        @response = "${(e) => this.onGetHealthGroupInfomrationApiResponse(e)}"
                        @error = ${this.handleGroupInfoApiError}
                        id = "getHealthGroupInfoAPI">
            </iron-ajax>
            <iron-ajax  method = "GET" 
                        handle-as = "json"
                        @response = "${(e) => this.onGetDentalGroupInfomrationApiResponse(e)}"
                        @error = ${this.handleGroupInfoApiError}
                        id = "getDentalGroupInfoAPI">
            </iron-ajax>
            <iron-ajax  method = "GET" 
                        handle-as = "json"
                        @response = ${(e) => this.onGetVisionGroupInfomrationApiResponse(e)}
                        @error = ${this.handleGroupInfoApiError}
                        id = "getVisionGroupInfoAPI">
            </iron-ajax>
        `;
    }

    getElement(elementName) {
        return this.shadowRoot.querySelector(elementName);
    }
    get healthGroupInfoIronAjax() {
        return this.shadowRoot.getElementById("getHealthGroupInfoAPI");
    }
    get dentalGroupInfoIronAjax() {
        return this.shadowRoot.getElementById("getDentalGroupInfoAPI");
    }
    get visionGroupInfoIronAjax() {
        return this.shadowRoot.getElementById("getVisionGroupInfoAPI");
    }
    onDoneClick(e) {
        if ((this.selectedHealthGroup === "" || this.selectedHealthGroup == undefined || this.selectedHealthGroup === "None")
            && (this.selectedDentalGroup === "" || this.selectedDentalGroup == undefined || this.selectedDentalGroup === "None")
            && (this.selectedVisionGroup === "" || this.selectedVisionGroup == undefined || this.selectedVisionGroup === "None")) {
            this.getElement(errorNotification).setAttribute("message", "No groups selected.");
        }
        else {
            this.hideCompanyGroupsControl = true;
            this.hideReset = false;
            this.hideSelectedCompanyGroupsElement = false;
            this.loadGroupInfoForSelectedGroups();
            this.getElement(selectedGroupsElement).setAttribute("header", "Associated Groups");
            this.getElement(selectedGroupsElement).setAttribute("selectedhealthgroup", this.selectedHealthGroup);
            this.getElement(selectedGroupsElement).setAttribute("selecteddentalgroup", this.selectedDentalGroup);
            this.getElement(selectedGroupsElement).setAttribute("selectedvisiongroup", this.selectedVisionGroup);
            var groupsSelectedEvent = new CustomEvent("groups-selected", {
                detail: {
                    message: JSON.stringify({ "healthGroup": this.selectedHealthGroup, "dentalGroup": this.selectedDentalGroup, "visionGroup": this.selectedVisionGroup })
                }
            });
            this.dispatchEvent(groupsSelectedEvent);
        }
    }
    handleGroupInfoApiError(event) {
        this.getElement(errorNotification).setAttribute("message", "Unable to get Group Info, application cannot be uploaded at this moment.");
    }

    onGetHealthGroupInfomrationApiResponse(e) {
        this.getElement(selectedGroupsElement).setAttribute("healthgroupinfo", JSON.stringify(e.detail.response));
        var groupInfoEvent = new CustomEvent("health-group-info-updated", {
            detail: {
                message: JSON.stringify(e.detail.response)
            },
            composed: true,
            bubbles: true
        });
        this.dispatchEvent(groupInfoEvent);
    }
    onGetDentalGroupInfomrationApiResponse(e) {
        this.getElement(selectedGroupsElement).setAttribute("dentalgroupinfo", JSON.stringify(e.detail.response));
        var groupInfoEvent = new CustomEvent("dental-group-info-updated", {
            detail: {
                message: JSON.stringify(e.detail.response)
            },
            composed: true,
            bubbles: true
        });
        this.dispatchEvent(groupInfoEvent);
    }
    onGetVisionGroupInfomrationApiResponse(e) {
        this.getElement(selectedGroupsElement).setAttribute("visiongroupinfo", JSON.stringify(e.detail.response));
        var groupInfoEvent = new CustomEvent("vision-group-info-updated", {
            detail: {
                message: JSON.stringify(e.detail.response)
            },
            composed: true,
            bubbles: true
        });
        this.dispatchEvent(groupInfoEvent);
    }
    loadGroupInfoForSelectedGroups() {
        if (this.selectedHealthGroup !== "None" && this.selectedHealthGroup !== undefined && this.selectedHealthGroup !== "") {
            this.healthGroupInfoIronAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
                + window.location.port
                + window.location.pathname
                + "/api/GroupInformation/GetGroupAgentRepInformation?groupNumber=" + this.selectedHealthGroup;
            this.healthGroupInfoIronAjax.generateRequest();
        }
        else {
            this.getElement(selectedGroupsElement).setAttribute("healthgroupinfo", "{}");
        }
        if (this.selectedDentalGroup !== "None" && this.selectedDentalGroup !== undefined && this.selectedDentalGroup !== "") {
            this.dentalGroupInfoIronAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
                + window.location.port
                + window.location.pathname
                + "/api/GroupInformation/GetGroupAgentRepInformation?groupNumber=" + this.selectedDentalGroup;
            this.dentalGroupInfoIronAjax.generateRequest();
        }
        else {
            this.getElement(selectedGroupsElement).setAttribute("dentalgroupinfo", "{}");
        }
        if (this.selectedVisionGroup !== "None" && this.selectedVisionGroup !== undefined && this.selectedVisionGroup !== "") {
            this.visionGroupInfoIronAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
                + window.location.port
                + window.location.pathname
                + "/api/GroupInformation/GetGroupAgentRepInformation?groupNumber=" + this.selectedVisionGroup;
            this.visionGroupInfoIronAjax.generateRequest();
        }
        else {
            this.getElement(selectedGroupsElement).setAttribute("visiongroupinfo", "{}");
        }

    }
    onResetClick(e) {
        this.hideCompanyGroupsControl = false;
        this.hideSelectedCompanyGroupsElement = true;

        var groupsResetEvent = new CustomEvent("groups-reset", {
            detail: {
                message: "Groups Reset Fired"
            }
        });
        this.dispatchEvent(groupsResetEvent);
        this.hideReset = true;
    }
    loadGroups(groups) {
        this.hideSelectedCompanyGroupsElement = true;
        this.hideCompanyGroupsControl = false;
        this.hideReset = true;
        this.healthGroups = groups.healthGroups;
        this.dentalGroups = groups.dentalGroups;
        this.visionGroups = groups.visionGroups;
        this.setGroupsOnControl("pgHealth", this.healthGroups);
        this.setGroupsOnControl("pgDental", this.dentalGroups);
        this.setGroupsOnControl("pgVision", this.visionGroups);
    }

    setGroupsOnControl(controlName, groups) {
        var productGroups = this.shadowRoot.getElementById(controlName);
        productGroups.setAttribute("groups", JSON.stringify(groups));
        productGroups.requestUpdate();

    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "healthgroupinfo" && newVal !== undefined) {
            this.getElement(selectedGroupsElement).setAttribute("healthgroupinfo", newVal);
        }
        else if (name === "dentalgroupinfo" && newVal !== undefined) {
            this.getElement(selectedGroupsElement).setAttribute("dentalgroupinfo", newVal);
        }
        else if (name === "visiongroupinfo" && newVal !== undefined) {
            this.getElement(selectedGroupsElement).setAttribute("visiongroupinfo", newVal);
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }
    loadControl(rejectedAppData){
        this.hideCompanyGroupsControl = true;   
        this.selectedHealthGroup = rejectedAppData.healthGroupNumber;
        this.selectedDentalGroup = rejectedAppData.dentalGroupNumber;
        this.selectedVisionGroup = rejectedAppData.visionGroupNumber;  
        this.loadGroupInfoForSelectedGroups();
        this.getElement(selectedGroupsElement).setAttribute("header", "Associated Groups");
        this.getElement(selectedGroupsElement).loadControl(rejectedAppData);
        this.hideSelectedCompanyGroupsElement = false;        
        this.hideReset = true;
    }
}

customElements.define('contract-ssn-groups', ContractSsnGroups);