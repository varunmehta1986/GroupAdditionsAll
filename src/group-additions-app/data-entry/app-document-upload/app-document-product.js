import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-icons/vaadin-icons';
import '../../custom-controls/select-list-dynamic';
import { divStyles } from '../../group-addition-styles';

class AppDocumentProduct extends LitElement {
    static get properties() {
        return {
            productType: { type: String },
            groupNumber: { type: String },
            hideNoGroupSelected: { type: Boolean, attribute: false },
            employeeClassesAPIUrl: { type: String, attribute: false },
            employeeClasses: { type: Array, attribute: false },
            selectedClassWaitingPeriod: { type: String, attribute: false },
            documentDescription: { type: String, attribute: false },
            documentLongDescription: { type: String, attribute: false }
        }
    }
    static get styles() {
        return [
            divStyles
        ]
    }
    render() {
        return html`
            <style>
                .mainDiv{
                    border-width : 1px;
                    border-color : #0099CC;
                    height: 100%;
                    width :  250px;
                    border-style: solid;
                    border-radius:5px 5px 5px 5px; 
                    width: 300px
                }
                .noGroupSelected{
                    font-family : 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 14px;
                    text-align : center;
                    color: #0099CC;
                    border-radius:5px 5px 5px 5px; 
                }
                .controlWidth{
                    width: 98%;
                }
            </style>
            <div class = "mainDiv">
                <div id="divGroup" ?hidden = "${(this.groupNumber === "" || this.groupNumber === undefined ||
                this.groupNumber === null || this.groupNumber === "None")}">
                    <div class="controlHeaderLight">
                        ${this.productType}
                    </div>
                    <div class="controlHeaderLight">
                      ${this.groupNumber}
                    </div>
                    <div style="padding:5px"> 
                        <vaadin-vertical-layout>
                            <div class="formControlGroup controlWidth">
                                <div class="simpleHeader">Class/Waiting Period</div>
                                <select-list-dynamic 
                                    placeholder = "Select Class/Wait period"
                                    itemValuePath = "id"
                                    itemDisplayPath = "name"
                                    selectFirstIfSingleItem
                                    @change = ${(e) => this.selectedClassWaitingPeriod = e.detail.message}
                                    disableCaching
                                    addBlankOption
                                    blankOptionText = "--Select Class/Wait Period--">
                                </select-list-dynamic>
                            </div>
                            <div class="formControlGroup controlWidth">
                                <div class="simpleHeader">Document Description <span style="color:red">*</span></div>
                                <vaadin-text-field 
                                            style="width:100%" 
                                            required
                                            .value=${this.documentDescription}
                                            maxlength = "50"
                                            @change = ${(e) => { this.documentDescription = e.target.value }}
                                            >
                                </vaadin-text-field>
                            </div>
                            <div class="formControlGroup controlWidth">
                                <div class="simpleHeader">Long Description</div>
                                <vaadin-text-area
                                    style="width:100%"
                                    maxlength = "250"
                                    .value = ${this.documentLongDescription}
                                    @change = "${(e) => this.documentLongDescription = e.target.value}">
                            </vaadin-text-area>
                            </div>
                        </vaadin-vertical-layout>
                    </div>
                </div>
                <div id="divNoGroup" class="noGroupSelected" 
                                ?hidden = "${!(this.groupNumber === "" || this.groupNumber === undefined ||
                this.groupNumber === null || this.groupNumber === "None")}"> 
                  <div class="controlHeaderLight">
                        ${this.productType}
                    </div>
                    <br/> <br/>
                   <iron-icon icon="vaadin:info-circle"></iron-icon>No Group has been selected for the product.
                </div>
            </div>
        `;
    }
    isValid(){
        if(this.documentDescription ===""){ 
            this.documentDescriptionField.setAttribute("invalid", true);
            return this.productType + " Document Description is Blank";
        }
        this.documentDescriptionField.removeAttribute("invalid");
        return "";
    }
    get documentDescriptionField() {
        return this.shadowRoot.querySelector("vaadin-text-field");
    }
    get documentLongDescriptionField() {
        return this.shadowRoot.querySelector("vaadin-text-area");
    }
    get selectListElement() {
        return this.shadowRoot.querySelector("select-list-dynamic");
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "groupnumber"
            && newVal !== null
            && newVal !== ""
            && newVal !== undefined
            && newVal !== "None") {
            this.groupNumber = newVal;
            this.employeeClassesAPIUrl = window.location.protocol + "//" + window.location.hostname + ":"
                + window.location.port
                + window.location.pathname
                + "/api/GroupsSearch/GetClassWaitingPeriodsForGroup?groupNumber=" + this.groupNumber;
            if (this.selectListElement !== null && this.selectListElement !== undefined) {
                this.selectListElement.setAttribute("url", this.employeeClassesAPIUrl);
                this.selectListElement.setAttribute("selectedvalue", "");
            }

        }
        this.documentDescription = "App for Group# " + this.groupNumber;
        this.documentLongDescription = "";
        super.attributeChangedCallback(name, oldVal, newVal);
    }

    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if (propName === "selectedClassWaitingPeriod" ||
                propName === "documentDescription" ||
                propName === "documentLongDescription") {

                var productDocumentDetails = new Object();
                productDocumentDetails.classWaitingPeriod = this.selectedClassWaitingPeriod;
                productDocumentDetails.documentDescription = this.documentDescription;
                productDocumentDetails.documentLongDescription = this.documentLongDescription;
                var productUpdatedEvent = new CustomEvent("product-updated", {
                    detail: {
                        message: JSON.stringify(productDocumentDetails)
                    },
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(productUpdatedEvent);
            }
        });
    }
}
customElements.define("app-document-product", AppDocumentProduct);