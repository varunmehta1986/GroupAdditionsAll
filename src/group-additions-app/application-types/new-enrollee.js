import { LitElement, html, css } from "lit-element";
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '../data-entry/data-entry';
import '../company-search';
import '../company-groups/company-groups';
import '../custom-controls/dynamic-vaadin-notification';

export const companyGroupsElement = "company-groups";
export const errorNotification = "dynamic-vaadin-notification";
export const dataEntryElement = "data-entry";
export const companySearchElement = "company-search";

class NewEnrollee extends LitElement {
    static get properties() {
        return {
            hideCompanyGroups: { type: Boolean },
            reset: { type: Boolean },
            hideDataEntryControls: { type: Boolean },
            selectedGroups: { type: Object }, 
            applicationFormTypeId : {type: Number},
            healthGroupInfo: { type: Object}, 
            dentalGroupInfo : {type: Object},
            visionGroupInfo : {type: Object},
            hideCompanySearch: {type: Boolean}
        };
    }
    constructor() {
        super();
        this.hideCompanyGroups = true;
        this.hideDataEntryControls = true;
        this.disableCompanyControls = false;
        this.hideCompanySearch = false;
    }
    render() {
        return html`
            <vaadin-vertical-layout theme="spacing-s">
                <div id="divCompanyControls">
                    <company-search @company-selected = "${this.companySelected}" ?hidden="${this.hideCompanySearch}" ></company-search>

                    <company-groups ?hidden = "${this.hideCompanyGroups}"
                                     @groups-selected = "${this.groupsSelected}"
                                     @groups-reset = "${this.groupsReset}">
                    </company-groups>
                </div>
                <div id="dataEntryDiv">
                <data-entry ?hidden = "${this.hideDataEntryControls}" 
                                    .selectedGroups = "${this.selectedGroups}" 
                                    selectedApplicationType = "New Enrollee"
                                    .applicationFormTypeId = "${this.applicationFormTypeId}"></data-entry>
                </div>
            </vaadin-vertical-layout>                 

            <iron-ajax  method = "GET" 
                        handle-as = "json"
                        @response = "${(e) =>  this.onGetHealthGroupInfomrationApiResponse(e)}"
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
            <dynamic-vaadin-notification theme="error"></dynamic-vaadin-notification>
        `;
    };

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
    get selectedGroupsElement(){
        return this.shadowRoot.querySelector("selected-company-groups");;
    }

    groupsSelected(e) {
        this.hideDataEntryControls = false;
        this.selectedGroups = JSON.parse(e.detail.message);
        this.getElement(dataEntryElement).setAttribute("selectedgroups", JSON.stringify(this.selectedGroups));
       

        if (this.selectedGroups.healthGroup !== "None" && this.selectedGroups.healthGroup !== undefined && this.selectedGroups.healthGroup !== "") {
            this.healthGroupInfoIronAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
                + window.location.port
                + window.location.pathname
                + "/api/GroupInformation/GetGroupAgentRepInformation?groupNumber=" + this.selectedGroups.healthGroup;
            this.healthGroupInfoIronAjax.generateRequest();
        }
        else{
            this.getElement(companyGroupsElement).setAttribute("healthgroupinfo", "{}");
        }
        if (this.selectedGroups.dentalGroup !== "None" && this.selectedGroups.dentalGroup !== undefined && this.selectedGroups.dentalGroup !== "") {
            this.dentalGroupInfoIronAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
                + window.location.port
                + window.location.pathname
                + "/api/GroupInformation/GetGroupAgentRepInformation?groupNumber=" + this.selectedGroups.dentalGroup;
            this.dentalGroupInfoIronAjax.generateRequest();
        }
        else{
            this.getElement(companyGroupsElement).setAttribute("dentalgroupinfo", "{}");
        }
        if (this.selectedGroups.visionGroup !== "None" && this.selectedGroups.visionGroup !== undefined  && this.selectedGroups.visionGroup !== "") {
            this.visionGroupInfoIronAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
                + window.location.port
                + window.location.pathname
                + "/api/GroupInformation/GetGroupAgentRepInformation?groupNumber=" + this.selectedGroups.visionGroup;
            this.visionGroupInfoIronAjax.generateRequest();
        }
        else{
            this.getElement(companyGroupsElement).setAttribute("visiongroupinfo", "{}");
        }       
        
    }
    groupsReset(e) {
        this.hideDataEntryControls = true;
    }

    handleGroupInfoApiError(event) {
        this.getElement(errorNotification).setAttribute("message", "Unable to get Group Info, application cannot be uploaded at this moment.");
    }
    onGetHealthGroupInfomrationApiResponse(e){
      this.healthGroupInfo = JSON.stringify(e.detail.response);    
      this.getElement(dataEntryElement).setAttribute("healthgroupinfo", this.healthGroupInfo);
      this.getElement(companyGroupsElement).setAttribute("healthgroupinfo", this.healthGroupInfo);
                
    }
    onGetDentalGroupInfomrationApiResponse(e){
      this.dentalGroupInfo = JSON.stringify(e.detail.response);     
      this.getElement(dataEntryElement).setAttribute("dentalgroupinfo", this.dentalGroupInfo); 
      this.getElement(companyGroupsElement).setAttribute("dentalgroupinfo",this.dentalGroupInfo);          
    }
    onGetVisionGroupInfomrationApiResponse(e){
      this.visionGroupInfo = JSON.stringify(e.detail.response);  
      this.getElement(dataEntryElement).setAttribute("visiongroupinfo", this.visionGroupInfo);  
      this.getElement(companyGroupsElement).setAttribute("visiongroupinfo",this.visionGroupInfo);           
    }
     
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "reset" && newVal === "true") {
          this.hideCompanyGroups = true;
          this.getElement(dataEntryElement).setAttribute("reset", true);
          this.getElement(companySearchElement).setAttribute("value", "");
          this.getElement(companySearchElement).value = "";
          this.getElement(companySearchElement).requestUpdate();
          this.getElement(dataEntryElement).requestUpdate();
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }
    companySelected(e) {
        this.hideDataEntryControls = true;        
        if (e.detail.message !== "No company selected") {
            this.getElement(companyGroupsElement).setAttribute("companyid", e.detail.message);
            this.getElement(companyGroupsElement).requestUpdate();
            this.hideCompanyGroups = false;
        }
        else {
            this.hideCompanyGroups = true;
            this.getElement(companyGroupsElement).hideCompanyGroupsControl = true;
        }
        this.getElement(dataEntryElement).setAttribute("selectedcompany",  JSON.stringify(e.detail.message));
    }

    loadControl(rejectedAppData){
        this.hideCompanySearch = true;
        this.hideCompanyGroups = false;
        this.getElement(companyGroupsElement).loadControl(rejectedAppData);
        this.hideDataEntryControls = false;
        this.getElement(dataEntryElement).loadControl(rejectedAppData);
    }
}
customElements.define("new-enrollee", NewEnrollee);