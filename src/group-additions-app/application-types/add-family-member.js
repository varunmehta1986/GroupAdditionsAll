import { LitElement, html } from "lit-element";
import '../contract-ssn-search/contract-ssn-search';
import '../contract-ssn-groups';

export const dataEntryElement = "data-entry";
export const contractSsnSearchElement = "contract-ssn-search";
export const contractSsnGroupsElement = "contract-ssn-groups";

class AddFamilyMember extends LitElement {
    static get properties() {
        return {
            hideDataEntryControls: { type: Boolean },
            applicationFormTypeId: { type: Number },
            healthGroupInfo: { type: Object },
            dentalGroupInfo: { type: Object },
            visionGroupInfo: { type: Object },
            hideContractSSNGroups: { type: Boolean },
            foundGroups : {type: Object, attribute: false},
            hideContractSearch: {type : Boolean},
            selectedContractNumber : {type: Number}
        }
    }
    constructor() {
        super();
        this.hideDataEntryControls = true;
        this.hideContractSSNGroups = true;
        this.hideContractSearch = false;
    }
    render() {
        return html`
            <contract-ssn-search ?hidden = "${this.hideContractSearch}"
                @results-found = ${this.loadFoundGroups}
                @no-contract-checked-changed = ${this.hideControls}
                @search-button-click = ${this.hideControls}>
            </contract-ssn-search>
            <contract-ssn-groups 
                ?hidden = "${this.hideContractSSNGroups}"
                @groups-selected = ${this.showDataEntryElement}
                @groups-reset = ${this.resetDataEntryElement}
                @health-group-info-updated = ${(e)=>this.healthGroupInfo = JSON.parse(e.detail.message)}
                @dental-group-info-updated = ${(e)=>this.dentalGroupInfo = JSON.parse(e.detail.message)}
                @vision-group-info-updated = ${(e)=>this.visionGroupInfo = JSON.parse(e.detail.message)}>
            </contract-ssn-groups>

            <div id="dataEntryDiv">
                <data-entry ?hidden = "${this.hideDataEntryControls}" 
                                    selectedApplicationType = "Add a Family Member"
                                    .healthGroupInfo = ${this.healthGroupInfo}
                                    .visionGroupInfo = ${this.visionGroupInfo}
                                    .dentalGroupInfo = ${this.dentalGroupInfo}
                                    .applicationFormTypeId = "${this.applicationFormTypeId}">
                </data-entry>
            </div>
        `;
    }
    getElement(elementName){
        return this.shadowRoot.querySelector(elementName);
    }
    resetDataEntryElement() {
        this.hideDataEntryControls = true;
    }
    showDataEntryElement(event) {
        this.hideDataEntryControls = false;
        var selectedGroups = JSON.parse(event.detail.message);
        var selectedContracts = new Object();
        var healthGroupRow = this.foundGroups.filter(grp=>grp.groupNumber === selectedGroups.healthGroup);
        var dentalGroupRow = this.foundGroups.filter(grp=>grp.groupNumber === selectedGroups.dentalGroup);
        var visionGroupRow = this.foundGroups.filter(grp=>grp.groupNumber === selectedGroups.visionGroup);
        if(healthGroupRow.length === 1){
            selectedContracts.healthContractNumber = healthGroupRow[0].contractNumber;
        }
        if(dentalGroupRow.length === 1){
            selectedContracts.dentalContractNumber = dentalGroupRow[0].contractNumber;
        }
        if(visionGroupRow.length === 1){
            selectedContracts.visionContractNumber = visionGroupRow[0].contractNumber;
        }        
        this.getElement(dataEntryElement).setAttribute("selectedcontracts", JSON.stringify(selectedContracts));
        this.getElement(dataEntryElement).setAttribute("selectedgroups", event.detail.message);        
        var contractOrSsn = this.getElement(contractSsnSearchElement).selectedContractOrSsn; 
        this.getElement(dataEntryElement).setAttribute("selectedcontractssn", JSON.stringify(contractOrSsn));
    }
    hideControls() {
        this.hideDataEntryControls = true;
        this.hideContractSSNGroups = true;
    }
    clear() {
        this.getElement(contractSsnSearchElement).clear();
        this.hideControls();
    }
    loadFoundGroups(event) {
        var results = JSON.parse(event.detail.message);
        this.foundGroups = results;
        var groups = new Object();
        groups.healthGroups = [];
        groups.dentalGroups = [];
        groups.visionGroups = [];
        var healthGroups = results.filter(grp => grp.productType === 1 && !grp.isGroupInError);
        var dentalGroups = results.filter(grp => grp.productType === 2 && !grp.isGroupInError);
        var visionGroups = results.filter(grp => grp.productType === 3 && !grp.isGroupInError);
        for (var i = 0; i < healthGroups.length; i++) {
            if (groups.healthGroups.indexOf(healthGroups[i].groupNumber) === -1) {
                groups.healthGroups.push(healthGroups[i].groupNumber);
            }
        }
        for (var i = 0; i < dentalGroups.length; i++) {
            if (groups.dentalGroups.indexOf(dentalGroups[i].groupNumber) === -1) {
                groups.dentalGroups.push(dentalGroups[i].groupNumber);
            }
        }
        for (var i = 0; i < visionGroups.length; i++) {
            if (groups.visionGroups.indexOf(visionGroups[i].groupNumber) === -1) {
                groups.visionGroups.push(visionGroups[i].groupNumber);
            }
        }
        this.hideContractSSNGroups = false;
        this.getElement(contractSsnGroupsElement).loadGroups(groups);
    }

    loadControl(rejectedAppData){
       // this.rejectedAppData = rejectedAppData;
        this.hideContractSearch = true;
        this.hideContractSSNGroups = false;
        this.getElement(contractSsnGroupsElement).loadControl(rejectedAppData); 
        this.getElement(dataEntryElement).loadControl(rejectedAppData);        
        this.hideDataEntryControls = false;
    }
}
customElements.define("add-family-member", AddFamilyMember);