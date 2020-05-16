import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@polymer/iron-ajax/iron-ajax';
import '../custom-controls/select-list-dynamic';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { divStyles, spanStyles } from '../group-addition-styles';

export const dateElement = "vaadin-date-picker";
export const selectListElement = "select-list-dynamic";
export const reasonElement = "vaadin-text-field";

class PolicyElligibilityTypeSelection extends LitElement {
    static get properties() {
        return {
            eligibilityTypeOptionsApiUrl: { type: String },
            selectedEligibilityDate: { type: String },
            hideEligibilityDate: { type: Boolean },
            hideReason: { type: Boolean },
            selectedReason: { type: String },
            selectedEligibilityType: { type: String },
            selectedValue: { type: String },
            rejectedQleTypeId: { type: String }
        }
    }
    static get styles() {
        return [
            spanStyles,
            divStyles
        ]
    }
    constructor() {
        super();
        this.eligibilityTypeOptionsApiUrl = window.location.protocol + "//" + window.location.hostname + ":"
            + window.location.port
            + window.location.pathname
            + "/api/GroupAdditions/GetEligibilityTypes";
        this.hideEligibilityDate = true;
        this.hideReason = true;

    }
    render() {
        return html`
            <div style="background:#F5F5F5; width: 600px;">
                <div class = "controlHeaderDark">Policy Eligibility</div>
                    <div style="padding:2px">
                        <vaadin-vertical-layout style="padding-bottom: 2px">
                        <div class="formControlGroup"  style = "width:350px">
                            <div class="simpleHeader">Select Eligibility Type <span style ="color:red">*</span></div>
                            <select-list-dynamic
                                placeholder = "Select Eligibility Type"
                                style = "width:100%"
                                itemValuePath = "id"
                                itemDisplayPath = "name"
                                @change = ${this.onEligibilityTypeSelection}
                                .url = ${this.eligibilityTypeOptionsApiUrl}
                                .selectedValue = ${this.selectedValue}
                                required
                                autoLoad>
                            </select-list-dynamic>
                        </div>
                            <vaadin-horizontal-layout theme="spacing-s">
                                <div class="formControlGroup"  ?hidden = "${this.hideReason}"    style = "width:350px">
                                    <div class="simpleHeader">Reason</div>
                                    <vaadin-text-field 
                                        style = "width:100%"
                                        .value = "${this.selectedReason}">
                                    </vaadin-text-field>
                                </div>
                                <div class="formControlGroup"  ?hidden = "${this.hideEligibilityDate}" style="width:200px">
                                    <div class="simpleHeader">Policy Eligibility Date <span style ="color:red">*</span></div>
                                    <vaadin-date-picker 
                                        style="width:100%"
                                        @change = ${(e) => this.selectedEligibilityDate = e.target.value}
                                        >
                                    </vaadin-date-picker>
                                </div>
                            </vaadin-horizontal-layout>
                        </vaadin-vertical-layout>
                    </div>
            </div>
        `;
    }

    getElement(elementName) {
        return this.shadowRoot.querySelector(elementName);
    }

    isValid() {
        if (this.selectedEligibilityType === "" || this.selectedEligibilityType === null
            || this.selectedEligibilityType === undefined) {
            this.getElement(selectListElement).setAttribute("invalid", true);
            return "Please select a Policy Eligibility Type";
        }
        if (!this.hideEligibilityDate) {
            if ((this.selectedEligibilityDate === "" || this.selectedEligibilityDate === null ||
                this.selectedEligibilityDate === undefined) && this.selectedEligibilityType !== 10) {
                this.getElement(dateElement).setAttribute("invalid", true);
                return "Invalid Policy Eligibility Date.";
            }
            else {
                var date_regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
                if (!(date_regex.test(this.selectedEligibilityDate))) {
                    this.getElement(dateElement).setAttribute("invalid", true)
                    return "Invalid Policy Eligibility Date.";
                }
            }
        }
        this.getElement(dateElement).removeAttribute("invalid");
        this.getElement(selectListElement).removeAttribute("invalid");
        return "";
    }
    onEligibilityTypeSelection(e) {
        this.resetQleControls();
        this.selectedEligibilityType = e.detail.message;
        this.hideControlsByQleType();
    }

    resetQleControls() {
        this.selectedReason = "";
        this.getElement(reasonElement).value = "";
        this.getElement(dateElement).value = "";
        this.selectedEligibilityDate = "";
        this.getElement(dateElement).invalid = false;
        this.hideEligibilityDate = true;
        this.hideReason = true;
    }

    hideControlsByQleType() {
        if (this.selectedEligibilityType !== "") {
            if (this.selectedEligibilityType === "10") //Open Enrollment
            {
                this.hideEligibilityDate = true;
                this.hideReason = true;
            }
            else if (this.selectedEligibilityType === "11") //Other
            {
                this.hideReason = false;
                this.hideEligibilityDate = false;
            }
            else {
                this.hideReason = true;
                this.hideEligibilityDate = false;
            }
        }
        else {
            this.hideEligibilityDate = true;
            this.hideReason = true;
        }
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "selectedvalue" && newVal === "") {
            this.getElement(selectListElement).setAttribute("selectedvalue", newVal);
            this.getElement(selectListElement).removeAttribute("invalid");
        }
    }

    loadControl(rejectedAppData) {
        this.rejectedQleTypeId = rejectedAppData.qleType.id.toString();
        this.getElement(selectListElement).setAttribute("selectedvalue", rejectedAppData.qleType.id.toString());
        if (rejectedAppData.qleDate !== null) {
            var rejectedQleDate = rejectedAppData.qleDate.split('T')[0];
            this.getElement(dateElement).value = rejectedQleDate;
            this.selectedEligibilityDate = rejectedQleDate;
        }
    }
}
customElements.define("policy-eligibility-type-selection", PolicyElligibilityTypeSelection);

