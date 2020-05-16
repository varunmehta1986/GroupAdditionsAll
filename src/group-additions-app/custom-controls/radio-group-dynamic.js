import { LitElement, css, html } from "lit-element";
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-icons/vaadin-icons';

class RadioGroupDynamic extends LitElement {
    static get properties() {
        return {
            items: { type: Array },
        }
    }
    render() {
        var radioGroupList = "";
        if (this.items != null && this.items != undefined) {
            for (let i = 0; i < this.items.length; i++) {
                radioGroupList += "<vaadin-radio-button value = '" + this.items[i] + "'>" +
                    this.items[i] + "&nbsp; &nbsp;"
                    + "</vaadin-radio-button>";
            }
        }
        return html`
            <style>
                .iconSize{
                    --iron-icon-height: 18px;
                    --iron-icon-width: 18px;
                }           
            </style>
            
            <vaadin-radio-group theme="vertical" @value-changed= "${this.radioValueChanged}">
                <vaadin-radio-button value='None' checked id="vrbNone">None</vaadin-radio-button> 
                 ${unsafeHTML(radioGroupList)}
            </vaadin-radio-group>
        `;
    }
    radioValueChanged(e) {
        var selectedValueChanged = new CustomEvent('value-changed', {
            detail: {
                message: e.target.value
            }
        });
        this.dispatchEvent(selectedValueChanged);
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "items") {
            var radioButtonNone = this.shadowRoot.getElementById("vrbNone");
            radioButtonNone.setAttribute("checked", "true");
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }

}
customElements.define("radio-group-dynamic", RadioGroupDynamic);