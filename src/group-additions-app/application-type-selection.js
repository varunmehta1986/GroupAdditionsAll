import { LitElement, html } from "lit-element";
import { spanStyles, divStyles } from '../group-additions-app/group-addition-styles';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-select/vaadin-select';

export const vaadinSelecteElement = "vaadin-select";

class ApplictionTypeSelection extends LitElement {
    static get properties() {
        return {
            applicationTypeOptions: { type: Array },
            selectedApplicationType: { type: String },
            disabled: { type: Boolean }
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
        this.selectedApplicationType = "";
        this.disabled = false;
    }
    render() {
        return html`
            <div class="formControlGroup">
                <div><span class="simpleHeader">Select Application Type</span></div>
                <vaadin-select style="width:300px"
                    .value = ${this.selectedApplicationType}
                    @value-changed = ${this.onApplicationTypeSelection}
                    ?disabled = "${this.disabled}">
                    <template>
                    <vaadin-list-box>
                        <vaadin-item>
                            New Enrollee
                        </vaadin-item>
                        <vaadin-item>
                            Add a Family Member
                        </vaadin-item>
                    </vaadin-list-box>
                    </template>
                </vaadin-select>
            </div>
            `;
    }
    getElement(elementName) {
        return this.shadowRoot.querySelector(elementName);
    }
    onApplicationTypeSelection(e) {
        if (e.target.value !== null && e.target.value !== undefined) {
            this.selectedApplicationType = e.target.value;
            let applicationTypeSelected = new CustomEvent("applicationType-selected", {
                detail: {
                    message: this.selectedApplicationType
                },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(applicationTypeSelected);
        }
    }
    loadControl(rejectedAppData) {
        if (rejectedAppData.appType === 1) {
            this.getElement(vaadinSelecteElement).value = "New Enrollee";
        }
        else if (rejectedAppData.appType === 2) {
            this.getElement(vaadinSelecteElement).value = "Add a Family Member";
        }
        else {
            this.getElement(vaadinSelecteElement).value = "";
        }
        this.disabled = true;
    }
}
customElements.define("application-type-selection", ApplictionTypeSelection);