import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import '../custom-controls/radio-group-dynamic';
import { divStyles } from '../group-addition-styles';

class ProductGroups extends LitElement {
    static get properties() {
        return {
            productType: { type: String },
            groups: { type: Array },
            selectedGroup: { type: String },
        };
    }
    static get styles() {
        return [
            divStyles
        ]
    }
    render() {
        return html`
            <div style="background:#F5F5F5;height:100%; width:170px">
                <div class="controlHeaderDark" >${this.productType}</div>
                <div style="padding:15px">
                    <radio-group-dynamic .items = "${this.groups}" 
                                        @value-changed = "${(e) => this.radioGroupSelectedValueChanged(e)}"
                                        .value = "${this.selectedGroup}"> </radio-group-dynamic>
                </div>
            </div>
        `;
    }
    attributeChangedCallback(name, oldVal, newVal) {
        var radioGroup = this.shadowRoot.querySelector("radio-group-dynamic");
        if (name === "groups" && newVal !== null && newVal !== undefined) {
            radioGroup.setAttribute("items", newVal);
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }
    radioGroupSelectedValueChanged(e) {
        this.selectedGroup = e.detail.message;
        var groupSelectedEvent = new CustomEvent("group-selected", {
            detail: {
                message: this.selectedGroup
            }
        });
        this.dispatchEvent(groupSelectedEvent);
    }
}
customElements.define('product-groups', ProductGroups);