import { LitElement, html } from 'lit-element';
import { spanStyles, divStyles } from '../group-additions-app/group-addition-styles';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@polymer/iron-ajax/iron-ajax';

export const comboBoxElement = "vaadin-combo-box";

class ApplicationFormSelection extends LitElement {
    static get properties() {
        return {
            forms: { type: Array },
            formOptionsApiUrl: { type: String },
            selectedValue: { type: Number },
            rejectedFormTypeId: {type : Number},
            disabled : {type : Boolean}
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
        this.formOptionsApiUrl = window.location.protocol + "//" + window.location.hostname + ":"
            + window.location.port
            + window.location.pathname
            + "/api/GroupAdditions/GetApplicationFormTypes";
            this.rejectedFormTypeId = 0;
    }
    render() {
        return html`
            <div class="formControlGroup">
                <div class="simpleHeader">Select Application Form</div>
                <vaadin-combo-box 
                        .items = "${this.forms}"  
                        item-label-path = "formNumber"  
                        item-value-path = "applicationFormTypeID"
                        style = "width:400px"  
                        @selected-item-changed = "${this.onFormSelection}"
                        .value = "${this.selectedValue}"
                        theme="custom-icon"
                        ?disabled = "${this.disabled}">
            
                </vaadin-combo-box>
            </div>
            <iron-ajax id="iaGetFormSelections" auto 
                                url="${this.formOptionsApiUrl}" 
                                handle-as ="json" 
                                @response = ${this.onApplicationFormResponse} ></iron-ajax>
        `;
    }

    getElement(elementName) {
        return this.shadowRoot.querySelector(elementName);
    }
    
    onFormSelection(e) {
        if (e.target.selectedItem !== null && e.target.selectedItem !== undefined) {
            this.selectedValue = e.target.value;
            var formSelection = new Object();
            formSelection.useWebApp = e.target.selectedItem.useWebApp;
            formSelection.applicationFormTypeId =  e.target.selectedItem.applicationFormTypeID;
            let changeEvent = new CustomEvent('form-changed', {
                detail: {
                    message: JSON.stringify(formSelection)
                },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(changeEvent);
        }
    }

    onApplicationFormResponse(e){
        this.forms = e.detail.response;
        if(this.rejectedFormTypeId !== 0){
            this.getElement(comboBoxElement).value = this.rejectedFormTypeId;
        }
        
    }
    loadControl(rejectedAppData){
        this.rejectedFormTypeId = rejectedAppData.formType;
        this.getElement(comboBoxElement).value = this.rejectedFormTypeId;
        var e = new Object();
        e.target = {
            value: this.rejectedFormTypeId,
            selectedItem: {
                useWebApp: true,
                applicationFormTypeID: this.rejectedFormTypeId
            }
        };
        this.onFormSelection(e);
        this.disabled = true;
    }
}
customElements.define("application-form-selection", ApplicationFormSelection);