import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '../custom-controls/dynamic-vaadin-notification';

class ContractSearch extends LitElement {
    static get properties() {
        return {
            hideProgressBar: { type: Boolean, attribute: false }
        };
    }
    constructor() {
        super();
        this.hideProgressBar = true;
    }
    render() {
        return html`
        <iron-ajax 
            @response = ${this.contractSearchResonse}
            @error = ${this.contractSearchError} >
        </iron-ajax>
        <dynamic-vaadin-notification theme="error" id="errorNotification"></dynamic-vaadin-notification>
        <dynamic-vaadin-notification theme="primary" id="infoNotification"></dynamic-vaadin-notification>
        <vaadin-horizontal-layout theme="spacing-s">
            <vaadin-text-field 
                        placeholder = "Contract#"
                        maxlength = "12"
                        required
                        error-message = "Invalid Contract Number">
            </vaadin-text-field>    
            <vaadin-button theme="primary" 
                @click=${this.searchClicked}>Search</vaadin-button>
        </vaadin-horizontal-layout>
        <vaadin-progress-bar indeterminate ?hidden  = "${this.hideProgressBar}"></vaadin-progress-bar>
        `;
    }
    get ironAjax() {
        return this.shadowRoot.querySelector("iron-ajax");
    }
    get textField() {
        return this.shadowRoot.querySelector("vaadin-text-field");
    }
    get vaadinErrorNotification() {
        return this.shadowRoot.getElementById("errorNotification");
    }
    get vaadinInfoNotification() {
        return this.shadowRoot.getElementById("infoNotification");
    }
    clear() {
        if (this.textField !== null) {
            this.textField.value = "";
            this.textField.removeAttribute("invalid");
        }
    }
    contractSearchResonse(event) {
        if (event.detail.response !== undefined && event.detail.response !== null) {
            if (event.detail.response.message === "No records found") {
                this.vaadinErrorNotification.setAttribute("message", "No records found.");
                this.hideProgressBar = true;
            }
            else if (event.detail.response.message === "Contract Cancelled") {
                this.vaadinInfoNotification.setAttribute("message", "The searched contract has been cancelled, looking for associated contracts");
                this.ironAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
                    + window.location.port
                    + window.location.pathname
                    + "/api/ContractSSNSearch/SearchBySSN?ssn="
                    + event.detail.response.ssn;

                this.ironAjax.generateRequest();
            }
            else {
                var customEvent = new CustomEvent('results-found', {
                    detail: {
                        message: JSON.stringify(event.detail.response)                      
                    },
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(customEvent);
                this.hideProgressBar = true;
            }
        }
        else {
            this.vaadinErrorNotification.setAttribute("message", "No records found.");
            this.hideProgressBar = true;
        }

    }
    contractSearchError(event) {
        this.vaadinErrorNotification.setAttribute("message", "Error getting search result for the contract number searched");
        this.hideProgressBar = true;
    }
    searchClicked(event) {
        if (this.textField.value === "") {
            this.textField.setAttribute("invalid", true);
            return;
        }
        else{
            var contractNumber = this.textField.value;
        }
        this.hideProgressBar = false;
        var searchStartedEvent = new CustomEvent('search-button-click', {
            detail: {
                message: "Search Button Clicked",
                value: contractNumber,
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(searchStartedEvent);

        this.textField.removeAttribute("invalid");
        this.ironAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
            + window.location.port
            + window.location.pathname
            + "/api/ContractSSNSearch/SearchByContractNumber?contractNumber="
            + this.textField.value;

        this.ironAjax.generateRequest();
    }
}
customElements.define("contract-search", ContractSearch);