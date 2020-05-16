import { LitElement, html } from "lit-element";
import '@polymer/iron-ajax/iron-ajax';
import './group-information-dialog/group-information-dialog';
import { divStyles } from '../group-addition-styles';

class SelectedProductGroups extends LitElement {
    static get properties() {
        return {
            productType: { type: String },
            selectedGroupNumber: { type: String },
            hideIcon: { type: Boolean },
            groupInfo: { type: Object },
        }

    }
    static get styles() {
        return [
            divStyles
        ]
    }
    render() {
        return html`
        <style>
            .divselectedGroups{
                background:#F5F5F5; 
                font-family :  Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                border-width : 1px;
                border-color : #F5F5F5;
                border-style: solid;
                width : 170px;
                padding-left : 12px;
            }
            .iconStyle{
                --iron-icon-height: 18px;
                --iron-icon-width: 18px;
                    cursor: pointer;
            } 
        </style>


        <div class = "controlHeaderDark">${this.productType}</div>
         <div class="divselectedGroups">
            <p>${this.selectedGroupNumber}            
            <span @click = "${this.groupInfoClick}"><iron-icon class='iconStyle' ?hidden = "${this.hideIcon}" icon="vaadin:vaadin:info-circle-o" theme="small"></iron-icon></span>
            </p>            
            
            <group-information-dialog .groupInfo = ${this.groupInfo}></group-information-dialog>            
        </div>
         `;
    }
    get vaadinDialog() {
        return this.shadowRoot.querySelector("group-information-dialog");
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "selectedgroupnumber" && newVal !== null && newVal !== undefined) {
            if (newVal !== "None") {
                this.hideIcon = false;
            }
            else {
                this.hideIcon = true;
            }
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }

    groupInfoClick() {
        if (this.groupInfo !== undefined && this.groupInfo !== null) {
            this.vaadinDialog.setAttribute("groupinfo", JSON.stringify(this.groupInfo));
            this.vaadinDialog.open();
        }
    }
}
customElements.define("selected-product-groups", SelectedProductGroups);