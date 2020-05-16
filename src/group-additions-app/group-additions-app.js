import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import './application-form-selection';
import './application-type-selection';
import './oldapplication-redirect-dialog';
import '../mw-header/mw-header';
import './application-types/application-types';

export const applicationFormSelectionElement = "application-form-selection";
export const applicationTypeSelectionElement = "application-type-selection";
export const applicationTypesElement = "application-types";
class GroupAdditionsApp extends LitElement {

    static get properties() {
        return {
            hideApplicationFormSelection: { type: Boolean },
            hideApplicationTypeSelection: { type: Boolean },
            hideRedirectDialog: { type: Boolean },
            hideApplicationTypes: { type: Boolean },
            selectedApplicationType: { type: String },
            applicationFormTypeId : {type: Number},
            osdApplicationId : {type: Number},
            rejectedAppData: {type : Object}
        }
    }
    constructor() {
        super();
        this.hideApplicationTypeSelection = true;
        this.hideRedirectDialog = true;
        this.hideApplicationTypes = true;
        this.hideApplicationFormSelection = false;
        const element = this;
        this.updateComplete.then(() => {
            if (window.location.href.substring((window.location.href.indexOf("=")) + 1, window.location.href.length) > 0) {
                element.osdApplicationId = window.location.href.substring((window.location.href.indexOf("=")) + 1, window.location.href.length);
                element.hideApplicationFormSelection = true;
                var url = window.location.protocol + "//" + window.location.hostname + ":"
                    + window.location.port
                    + window.location.pathname
                    + "/api/RejectedApps/GetRejectedApplication?osdApplicationId=" + element.osdApplicationId;

                element.getElement("iron-ajax").setAttribute("url", url);
                element.getElement("iron-ajax").generateRequest();
            }
        });
    }
    render() {
        return html`
        <style>
        .content {
            max-width:1024px;
            margin: auto;
            background: white;
            padding: 10px;
            height: 100%;
            overflow-y : hidden;
            min-height: 850px;
          }
        h1{
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        }
        </style>
        <div style="height: 100%" >
                <mw-header></mw-header>
                <div id="mainDiv" class="content">
                <h1>Group Additions Data Entry</h1>
                    <vaadin-vertical-layout theme="spacing-s">
                        <application-form-selection
                        @form-changed = "${this.onApplicationFormSelection}"
                        ?hidden ="${this.hideApplicationFormSelection}"
                        .selectedValue="${this.selectedValue}">
                        </application-form-selection>

                        <oldapplication-redirect-dialog
                            ?hidden = "${this.hideRedirectDialog}"
                            @dialog-closed = "${this.resetApplicationFormSelection}">
                        </oldapplication-redirect-dialog>

                    <application-type-selection 
                                            .selectedApplicationType= "${this.selectedApplicationType}"
                                            ?hidden = "${this.hideApplicationTypeSelection}"
                                            @applicationType-selected = "${(e) => { this.onApplicationTypeSelection(e); }}">
                    </application-type-selection>
                    <application-types 
                                    ?hidden = "${this.hideApplicationTypes}"
                                    .applicationFormTypeId= "${this.applicationFormTypeId}">
                    </application-types>
                </vaadin-vertical-layout>
                <iron-ajax id="iaGetGroupAdditionsAppData" 
                                handle-as ="json" 
                                @response = "${(e) => this.onRejectedApplicationDataResponse(e)}" ></iron-ajax>                                         
                </div>
            </div>
            `;
    }

    getElement(elementName) {
        return this.shadowRoot.querySelector(elementName);
    }

    resetApplicationFormSelection(e) {
        this.hideRedirectDialog = true;
        this.getElement(applicationFormSelectionElement).selectedValue = null;
        this.getElement(applicationFormSelectionElement).setAttribute("selectedvalue", null);
        this.getElement(applicationFormSelectionElement).requestUpdate();

    }
    onApplicationFormSelection(e) {
        var selectedApplicationForm = JSON.parse(e.detail.message);
        if (selectedApplicationForm.useWebApp === true) {
            this.applicationFormTypeId = selectedApplicationForm.applicationFormTypeId;            
            if(this.rejectedAppData !== undefined){
                
                this.getElement(applicationTypeSelectionElement).loadControl(this.rejectedAppData);               
            }
            else{
                 this.selectedApplicationType = "";
            }
            this.hideApplicationTypeSelection = false;
            this.hideRedirectDialog = true;
        }
        else {
            this.hideApplicationTypeSelection = true;
            this.hideRedirectDialog = false;
        }
        this.hideApplicationTypes = true;
    }
    onApplicationTypeSelection(e) {
        this.selectedApplicationType = e.detail.message;
        if(this.rejectedAppData !== undefined){ 
            this.getElement(applicationTypesElement).removeAttribute("hidden");     
            this.getElement(applicationTypesElement).setAttribute('selectedapplicationtype', this.selectedApplicationType);
            this.getElement(applicationTypesElement).loadControl(this.rejectedAppData);
            
        }
        else if (this.selectedApplicationType !== "") {
            this.hideApplicationTypes = false;
             this.getElement(applicationTypesElement).setAttribute('selectedapplicationtype', this.selectedApplicationType);
             this.getElement(applicationTypesElement).requestUpdate();
        }
        else {
            this.hideApplicationTypes = true;
        }        
    }

    onRejectedApplicationDataResponse(e){
        this.rejectedAppData = e.detail.response;
        this.getElement(applicationFormSelectionElement).loadControl(e.detail.response);
        this.hideApplicationFormSelection = false;
        
    }
}
customElements.define('group-additions-app', GroupAdditionsApp);
