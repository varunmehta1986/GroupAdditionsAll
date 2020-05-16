import { LitElement, html, css } from "lit-element";
import { spanStyles, divStyles } from '../group-addition-styles';
import './product-groups';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@polymer/iron-ajax';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import '../selected-company-groups/selected-company-groups';

class CompanyGroups extends LitElement {
    static get properties() {
        return {
            companyId: { type: Number },
            companyGroupsApiURL: { type: String, attribute: false },
            selectedHealthGroup: { type: String },
            selectedDentalGroup: { type: String },
            selectedVisionGroup: { type: String },
            hideCompanyGroupsControl: { type: Boolean },
            hideProgressBar: { type: Boolean, attribute: false },
            disableDoneButton: { type: Boolean, attribute: false },
            disableResetButton: { type: Boolean, attribute: false },
            healthGroups: { type: Array, attribute: false },
            dentalGroups: { type: Array, attribute: false },
            visionGroups: { type: Array, attribute: false },
            hideSelectedCompanyGroupsElement: { type: Boolean },
            hideReset: { type: Boolean },
            healthGroupInfo: { type: Object },
            dentalGroupInfo: { type: Object },
            visionGroupInfo: { type: Object },
            hideGroupIneligibleMessage: { type: Boolean }
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
        this.hideCompanyGroupsControl = true;
        this.hideProgressBar = true;
        this.disableResetButton = true;
        this.hideSelectedCompanyGroupsElement = true;
        this.hideReset = true;
        this.hideGroupIneligibleMessage = true;
    }
    render() {

        return html`
            <iron-ajax  url="${this.companyGroupsApiURL}" 
                        handle-as ="json" 
                        @response = "${this.onGetCompanyGroupsApiReponse}" ></iron-ajax>
           
            <div class="formControlGroup">
            <vaadin-progress-bar indeterminate value="0" ?hidden = "${this.hideProgressBar}" ></vaadin-progress-bar>
            <div ?hidden = "${this.hideCompanyGroupsControl}"  style="width:550px">
                <span class="simpleHeader">Company Groups</span>
                <vaadin-horizontal-layout theme="spacing-s" >
                    <product-groups id="pgHealth" 
                                    .productType = "${"Health"}"
                                    .groups = "${this.healthGroups}"
                                    @group-selected = "${(e) => this.selectedHealthGroup = e.detail.message}">
                    </product-groups>
                    <product-groups id="pgDental"
                                    .productType = "${"Dental"}"
                                    .groups = "${this.dentalGroups}"
                                    @group-selected = "${(e) => this.selectedDentalGroup = e.detail.message}">
                    </product-groups>
                    <product-groups id="pgVision" 
                                    .productType = "${"Vision"}"
                                    .groups = "${this.visionGroups}"
                                    @group-selected = "${(e) => this.selectedVisionGroup = e.detail.message}">
                    </product-groups>
                </vaadin-horizontal-layout>               
                <vaadin-button theme="primary small" 
                            @click = "${this.onDoneClick.bind(this)}">
                            Done selecting Groups
                            
                </vaadin-button>                
            </div>
          
            <selected-company-groups  ?hidden = "${this.hideSelectedCompanyGroupsElement}">
            </selected-company-groups>                                
            <vaadin-button ?hidden = "${this.hideReset}"
                            theme="small"
                            @click = "${this.onResetClick.bind(this)}">
                            Reset Group selections
            </vaadin-button>
            </div> 
            <vaadin-notification duration="10000" position = "bottom-stretch" theme="error" id="vaadinNotifyNoProductGroupSelected">
                <template>
                    <div>
                        No groups selected. 
                    </div>
                </template>
            </vaadin-notification>    
            <vaadin-notification duration="10000" position = "bottom-stretch" theme="error" id="vaadinNotifyNoActiveGroupsFound">
                <template>
                    <div>
                        No active groups found based on company selected.
                    </div>
                </template>
            </vaadin-notification>
            <div>
                <span class ="redHighlight" ?hidden = "${this.hideGroupIneligibleMessage}">
                    The group is ineligible for data entry due to enrollment in one of the following services: 
                    BluesEnroll, E-Exchange, Electronic Transfer.</span>
            </div>
            </div>
        `;
    }

    get selectedGroupsElement() {
        return this.shadowRoot.querySelector("selected-company-groups");;
    }
    onDoneClick(e) {
        if ((this.selectedHealthGroup === "" || this.selectedHealthGroup == undefined || this.selectedHealthGroup === "None")
            && (this.selectedDentalGroup === "" || this.selectedDentalGroup == undefined || this.selectedDentalGroup === "None")
            && (this.selectedVisionGroup === "" || this.selectedVisionGroup == undefined || this.selectedVisionGroup === "None")) {
            this.shadowRoot.getElementById("vaadinNotifyNoProductGroupSelected").open();
        }
        else {
            var groupsSelectedEvent = new CustomEvent("groups-selected", {
                detail: {
                    message: JSON.stringify({ "healthGroup": this.selectedHealthGroup, "dentalGroup": this.selectedDentalGroup, "visionGroup": this.selectedVisionGroup })
                }
            });
            this.dispatchEvent(groupsSelectedEvent);
            this.hideCompanyGroupsControl = true;
            this.hideReset = false;
            this.hideSelectedCompanyGroupsElement = false;
            this.selectedGroupsElement.setAttribute("header", "Company Groups")
            this.selectedGroupsElement.setAttribute("selectedhealthgroup", this.selectedHealthGroup);
            this.selectedGroupsElement.setAttribute("selecteddentalgroup", this.selectedDentalGroup);
            this.selectedGroupsElement.setAttribute("selectedvisiongroup", this.selectedVisionGroup);
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
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "companyid" && newVal !== null && newVal !== undefined) {
            this.hideProgressBar = false;
            this.hideSelectedCompanyGroupsElement = true;
            this.hideReset = true;
            this.hideGroupIneligibleMessage = true;
            this.companyId = newVal;
            this.companyGroupsApiURL = window.location.protocol + "//" + window.location.hostname + ":"
                + window.location.port
                + window.location.pathname
                + "/api/GroupsSearch/GetGroupsForCompany?companyId=" + this.companyId;
            var ironAjax = this.shadowRoot.querySelector("iron-ajax");
            ironAjax.url = this.companyGroupsApiURL;
            ironAjax.generateRequest();

        }
        else if (name === "healthgroupinfo" && newVal !== undefined) {
            this.selectedGroupsElement.setAttribute("healthgroupinfo", newVal);
        }
        else if (name === "dentalgroupinfo" && newVal !== undefined) {
            this.selectedGroupsElement.setAttribute("dentalgroupinfo", newVal);
        }
        else if (name === "visiongroupinfo" && newVal !== undefined) {
            this.selectedGroupsElement.setAttribute("visiongroupinfo", newVal);
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }
    onGetCompanyGroupsApiReponse(e) {
        if (e.detail.response.message !== undefined && e.detail.response.message !== "") {
            this.hideGroupIneligibleMessage = false;
            this.hideProgressBar = true;
        }
        else {
            this.healthGroups = e.detail.response.Health;
            this.dentalGroups = e.detail.response.Dental;
            this.visionGroups = e.detail.response.Vision;
            if (this.healthGroups.length === 0 && this.dentalGroups.length == 0 && this.visionGroups.length === 0) {
                this.shadowRoot.getElementById("vaadinNotifyNoActiveGroupsFound").open();
                this.hideCompanyGroupsControl = true;
            }
            else {
                this.setGroupsOnControl("pgHealth", this.healthGroups);
                this.setGroupsOnControl("pgDental", this.dentalGroups);
                this.setGroupsOnControl("pgVision", this.visionGroups);
                this.hideCompanyGroupsControl = false;
            }
            this.hideProgressBar = true;
        }
    }
    setGroupsOnControl(controlName, groups) {
        var productGroups = this.shadowRoot.getElementById(controlName);
        productGroups.setAttribute("groups", JSON.stringify(groups));
        productGroups.setAttribute("selectedgroup", "None");
        productGroups.requestUpdate();
    }
    loadControl(rejectedAppData) {
        this.selectedHealthGroup = rejectedAppData.healthGroupNumber;
        this.selectedDentalGroup = rejectedAppData.dentalGroupNumber;
        this.selectedVisionGroup = rejectedAppData.visionGroupNumber;
        this.onDoneClick("");
        this.hideReset = true;
    }
}
customElements.define("company-groups", CompanyGroups);