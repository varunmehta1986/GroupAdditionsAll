import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { spanStyles, divStyles } from '../group-additions-app/group-addition-styles';

class CompanySearch extends LitElement {
    static get properties() {
        return {
            value: { type: String }
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
        this.updateComplete.then(() => {
            this.comboBox.dataProvider = function (params, callback) {

                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    const response = JSON.parse(xhr.responseText);
                    setTimeout(function () {
                        callback(response.result, response.size);
                    }, 1000);
                };

                if (this.filter.length > 4) {
                    var companySearchURL = window.location.protocol + "//" + window.location.hostname + ":"
                        + window.location.port
                        + window.location.pathname
                        + "/api/CompanySearch/GetCompanySearchResults?searchString=" + this.filter;
                    xhr.open('GET', companySearchURL, true);
                    xhr.send();
                }
                else {
                    callback([]);
                }
            };

            this.comboBox.renderer = function (root, combobox, model) {
                root.__dataHost.focused = false;
                if (model.item == 'No records found') {
                    root.innerHTML = '<small>No companies were found with the search criteria provided!</small>';
                }
                else {
                    var regex = new RegExp(this._comboBox.filter, 'gi');
                    root.innerHTML = '<small>'
                        + '<table>'
                        + '<tr><td>Company : </td><td>' + model.item.companyName.replace(regex, function (str) {
                            return "<span style='background-color: #BED6DB;'>" + str + "</span>"
                        }) + '</td></tr>'
                        + '<tr><td>Tax Id : </td><td>' + model.item.taxId.replace(regex, function (str) {
                            return "<span style='background-color: #BED6DB;'>" + str + "</span>"
                        }) + '</td></tr>'
                        + '<tr><td>Group# : </td><td>' + model.item.groupNumber.replace(regex, function (str) {
                            return "<span style='background-color: #BED6DB;'>" + str + "</span>"
                        }) + '</td></tr>'
                        + '<tr><td>Group Name : </td><td>' + model.item.groupName.replace(regex, function (str) {
                            return "<span style='background-color: #BED6DB;'>" + str + "</span>"
                        }) + '</td></tr>'
                        + '</small>';
                }
            };
        });
    }

    get comboBox() {
        return this.shadowRoot.querySelector('vaadin-combo-box');
    }
    render() {
        return html`
            <dom-module id="custom-combo-box-icon" theme-for="vaadin-combo-box">
            <template>
             <style>
                :host([theme~="custom-icon"]) [part="toggle-button"]{
                display:none;
                }
            </style>
            </template>
            </dom-module>
            <div class="formControlGroup">
                <div><span class="simpleHeader">Company Search</span></div>
                <vaadin-combo-box 
                            item-label-path = "companyName"
                            item-value-path = "companyId"
                            placeholder="Search for a company using Name, Tax ID or Group Number"
                            style = "width:550px"
                            @selected-item-changed = "${this.onCompanySelection}"
                            clear-button-visible 
                            .value = "${this.value}"
                            theme="custom-icon">
                </vaadin-combo-box>  
                <div class="lightGreySmallNote">
                    To search by Tax ID , use the format 'xx-xxxxxxx'. 
                </div>
            </div>
        </div>
        `;
    }
    onCompanySelection(e) {
        if (e.target.selectedItem !== null && e.target.selectedItem !== undefined) {
            this.value = e.target.selectedItem.companyId;
            var companySelected = new CustomEvent("company-selected", {
                detail: {
                    message: e.target.selectedItem.companyId
                },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(companySelected);
        }
        else {
            var companySelected = new CustomEvent("company-selected", {
                detail: {
                    message: "No company selected"
                },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(companySelected);
        }
    }

}
customElements.define('company-search', CompanySearch);