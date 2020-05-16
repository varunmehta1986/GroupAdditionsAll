import { LitElement, html } from 'lit-element';
import { vaadinCheckboxStyle,spanStyles, divStyles } from '../group-addition-styles';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import './contract-search';
import './ssn-search';
import './result-grid';

export const contractSearchElement = "contract-search";
export const ssnSearchElement = "ssn-search";
export const resultGridElement = "result-grid";

class ContractSsnSearch extends LitElement {
    static get properties() {
        return {
            hideContractNumberField: { type: Boolean, attribute: false },
            hideSSNField: { type: Boolean, attribute: false },
            hideResultGrid: { type: Boolean, attribute: false },
            selectedContractOrSsn : {type : String}
        }
    }
    static get styles() {
        return [
            vaadinCheckboxStyle,
            spanStyles, 
            divStyles
        ]
    }
    constructor() {
        super();
        this.hideSSNField = true;
        this.hideContractNumberField = false;
        this.hideResultGrid = true;
    }
    render() {
        return html`
        <div class="formControlGroup">
            <vaadin-vertical-layout theme="spacing-s">
                <vaadin-checkbox
                    @checked-changed = ${this.noContractChecked}>
                    <span class="simpleHeader">No Contract#</span>
                </vaadin-checkbox>
                <contract-search 
                                ?hidden = "${this.hideContractNumberField}"
                                @results-found = ${this.loadResultGrid}
                                @search-button-click  = ${this.searchClicked}></contract-search>
                <ssn-search ?hidden = "${this.hideSSNField}" 
                            @results-found = ${this.loadResultGrid}
                            @search-button-click  = ${this.searchClicked}></ssn-search>
                <result-grid ?hidden = "${this.hideResultGrid}"></result-grid>
            </vaadin-vertical-layout>
        </div>
        `;
    }
    get checkBox() {
        return this.shadowRoot.querySelector("vaadin-checkbox");
    }
    getElement(elementName) {
        return this.shadowRoot.querySelector(elementName);
    }
    searchClicked(event) {
        this.hideResultGrid = true;
        if(event.detail.value !== undefined && event.detail.value !== null){
            this.selectedContractOrSsn = JSON.parse(event.detail.value);
        }
    }
    loadResultGrid(event) {
        this.getElement(resultGridElement).setAttribute("contractlist", event.detail.message);
        this.hideResultGrid = false;
    }
    noContractChecked(event) {
        this.hideContractNumberField = event.currentTarget.checked;
        this.hideSSNField = !event.currentTarget.checked;
        this.getElement(contractSearchElement).clear();
        this.getElement(ssnSearchElement).clear();
        this.hideResultGrid = true;

        var clearEvent = new CustomEvent("no-contract-checked-changed", {
            detail: {
                message: "Checked changed"
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(clearEvent);
    }
    clear() {
        this.hideResultGrid = true;
        this.checkBox.checked = false;
        this.getElement(contractSearchElement).clear();
        this.getElement(ssnSearchElement).clear();
    }

}
customElements.define("contract-ssn-search", ContractSsnSearch);