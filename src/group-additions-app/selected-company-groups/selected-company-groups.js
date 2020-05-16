import { LitElement, html } from "lit-element";
import {spanStyles, divStyles} from '../group-addition-styles';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '../selected-company-groups/selected-product-groups';

class SelectedCompanyGroups extends LitElement {
    static get properties(){
        return{
            selectedHealthGroup: {type: String},
            selectedDentalGroup: { type: String },
            selectedVisionGroup: { type: String },
            hideSelectedCompanyGroupsElement : {type : Boolean},
            healthGroupInfo: { type: Object},
            dentalGroupInfo: {type: Object}, 
            visionGroupInfo : {type: Object},
            header: { type: String }
        }
    }
    static get styles() {
        return[
            spanStyles, 
            divStyles
        ]
    }
    render() {
        return html`      
        <div style="width:300px">
            <span class="simpleHeader">${this.header}</span>                    
            <vaadin-horizontal-layout theme="spacing-s">
                <selected-product-groups    id = "spgHealth"
                                            .productType = "${"Health"}" 
                                            .groupInfo = "${this.healthGroupInfo}">
                </selected-product-groups>
                <selected-product-groups    id = "spgDental"
                                            .productType = "${"Dental"}"
                                            .groupInfo = "${this.dentalGroupInfo}">
                </selected-product-groups>
                <selected-product-groups    id = "spgVision"
                                            .productType = "${"Vision"}"
                                            .groupInfo = "${this.visionGroupInfo}">
                </selected-product-groups>            
            </vaadin-horizontal-layout>            
        </div>
        `;
    }

    get selectedHealthGroupsElement(){
        return this.shadowRoot.getElementById("spgHealth");
    }
    get selectedDentalGroupsElement(){
        return this.shadowRoot.getElementById("spgDental");
    }
    get selectedVisionGroupsElement(){
        return this.shadowRoot.getElementById("spgVision");
    }

    attributeChangedCallback(name, oldVal, newVal) {
        
        if (name === "selectedhealthgroup" && newVal !== null && newVal !== undefined) {
            this.selectedHealthGroupsElement.setAttribute("selectedgroupnumber", newVal);
        }
        else if (name === "selecteddentalgroup" && newVal !== null && newVal !== undefined) {
            this.selectedDentalGroupsElement.setAttribute("selectedgroupnumber", newVal);
        }
        else if (name === "selectedvisiongroup" && newVal !== null && newVal !== undefined) {
            this.selectedVisionGroupsElement.setAttribute("selectedgroupnumber", newVal);
        }
        else if(name === "healthgroupinfo" && newVal !== undefined){
            this.healthGroupInfo = JSON.parse(newVal);
        }
        else if(name === "dentalgroupinfo" && newVal !== undefined){
            this.dentalGroupInfo = JSON.parse(newVal);
        }
        else if(name === "visiongroupinfo" && newVal !== undefined){
            this.visionGroupInfo = JSON.parse(newVal);
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }

    loadControl(rejectedAppData){
        this.selectedHealthGroupsElement.setAttribute("selectedgroupnumber", rejectedAppData.healthGroupNumber);     
        this.selectedDentalGroupsElement.setAttribute("selectedgroupnumber", rejectedAppData.dentalGroupNumber);     
        this.selectedVisionGroupsElement.setAttribute("selectedgroupnumber", rejectedAppData.visionGroupNumber); 
    }
}
customElements.define("selected-company-groups", SelectedCompanyGroups);