import { LitElement, html } from 'lit-element';
import { spanStyles } from '../group-addition-styles';
import '@vaadin/vaadin-grid';

class ResultGrid extends LitElement {
    static get properties() {
        return {
            contractList: { type: Array },
            hideRedHighlightSpan: { type: Boolean, attribute: false }
        }
    }
    static get styles() {
        return [
            spanStyles
        ]
    }
    constructor() {
        super();
        this.hideRedHighlightSpan = true;
    }
    get vaadinGrid() {
        return this.shadowRoot.querySelector("vaadin-grid");
    }
    render() {
        return html`
        <dom-module id="my-grid-styles" theme-for="vaadin-grid">
        <template>
            <style>
                [part~="header-cell"] {
                    font-size : 13px;
                    font-family : 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-weight: bolder;
                }
                [part~="body-cell"] {
                    font-size : 13px;
                    font-family : 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                [part~="cell"].hasError {
                     background: rgb(255, 240, 240);
                }
            </style>
        </template>
        </dom-module>
        <div>
            <span class ="simpleHeader">Search Results</span>
            <vaadin-grid theme="compact column-borders wrap-cell-content"
                         height-by-rows
                        style="width:1020px">
                <vaadin-grid-column header="Contract ID" path="contractNumber" width="90px"></vaadin-grid-column>
                <vaadin-grid-column header="First Name" path="firstName" auto-width></vaadin-grid-column>
                <vaadin-grid-column header="M.I." path="mi" auto-width></vaadin-grid-column>
                <vaadin-grid-column header="Last Name" path="lastName" auto-width></vaadin-grid-column>
                <vaadin-grid-column header="Gender" path="sex" auto-width></vaadin-grid-column>
                <vaadin-grid-column header="D.O.B." path="dob" width="82px"></vaadin-grid-column>
                <vaadin-grid-column header="Group #" path="groupNumber"width=74px></vaadin-grid-column>
                <vaadin-grid-column header="Group Name" path="groupName" auto-width></vaadin-grid-column>
                <vaadin-grid-column header="Coverage Eff. Date" path="coverageEffectiveDate" auto-width></vaadin-grid-column>
                <vaadin-grid-column header="Status" path="status" width="80px"></vaadin-grid-column>
            </vaadin-grid>
            <span class ="redHighlight" ?hidden = "${this.hideRedHighlightSpan}">No group information exists in MarketWrite for the highlighted contract(s) or 
                                        the group is ineligible for data entry due to enrollment in one of the following services: BluesEnroll, E-Exchange, Electronic Transfer.</span>
        </div>
        `;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "contractlist") {
            const element = this;
            const vaadinGrid = this.vaadinGrid;
            element.hideRedHighlightSpan = true;
            vaadinGrid.items = JSON.parse(newValue);
            vaadinGrid.cellClassNameGenerator = function (column, rowData) {
                if (rowData.item.isGroupInError) {
                    element.hideRedHighlightSpan = false;
                    return "hasError";
                }
            }
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }
}
customElements.define('result-grid', ResultGrid);