import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '../custom-controls/ssn-vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@polymer/iron-ajax/iron-ajax';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';

class SsnSearch extends LitElement {
    static get properties(){
        return {
            hideProgressBar : {type: Boolean, attribute : false}
        };
    }
    constructor(){
        super();
        this.hideProgressBar = true;
    }
    render() {
        return html`
            <iron-ajax
                @response = ${this.ssnSearchResonse}
                @error = ${this.ssnSearchError} >
            </iron-ajax>
            <dynamic-vaadin-notification theme="error"></dynamic-vaadin-notification>
            <vaadin-horizontal-layout theme="spacing-s">
                <ssn-vaadin-text-field 
                        required 
                        ?hidden = "${this.hideSSNField}">
                </ssn-vaadin-text-field>
                <vaadin-button theme="primary" @click=${this.searchClicked}>Search</vaadin-button>
            </vaadin-horizontal-layout>
            <vaadin-progress-bar indeterminate ?hidden  = "${this.hideProgressBar}"></vaadin-progress-bar>
        `;
    }
    get ironAjax() {
        return this.shadowRoot.querySelector("iron-ajax");
    }
    get textField() {
        return this.shadowRoot.querySelector("ssn-vaadin-text-field");
    }
    get vaadinNotification() {
        return this.shadowRoot.querySelector("dynamic-vaadin-notification");
    }
    clear() {
        if (this.textField !== null) {
            this.textField.clear();
            this.textField.removeAttribute("invalid");
        }
    }
    ssnSearchResonse(event) {
        if (event.detail.response !== undefined && event.detail.response !== null && event.detail.response.message !== "No records found") {
            var customEvent = new CustomEvent('results-found', {
                detail :{
                    message : JSON.stringify(event.detail.response)
                },
                bubbles: true, 
                composed : true
            });
            this.dispatchEvent(customEvent);
        }
        else {
            this.vaadinNotification.setAttribute("message", "No records found.");
        }
        this.hideProgressBar = true;
    }
    ssnSearchError(event) {
        this.vaadinNotification.setAttribute("message", "Error getting search result for the SSN searched");
        this.hideProgressBar = true;
    }
    searchClicked(event) {
        if(!this.textField.isValid){
            return;
        }
        else if (this.textField.value !== ""){
            var ssn = this.textField.value;
        }
        this.hideProgressBar = false;

        var searchStartedEvent = new CustomEvent('search-button-click', {
            detail : {
                message : "Search Button Clicked",
                value : ssn
            }, 
            bubbles : true, 
            composed : true
        });
        this.dispatchEvent(searchStartedEvent);

        this.ironAjax.url = window.location.protocol + "//" + window.location.hostname + ":"
            + window.location.port
            + window.location.pathname
            + "/api/ContractSSNSearch/SearchBySSN?ssn=" + this.textField.value;
        this.ironAjax.generateRequest();
    }
}
customElements.define("ssn-search", SsnSearch);