import { LitElement, html } from "lit-element";
import './new-enrollee';
import './add-family-member';

export const newEnrolleElement = "new-enrollee";
export const addFamilyMemberElement = "add-family-member";

class ApplicationTypes extends LitElement {
    static get properties() {
        return {
            hideNewEnrollee: { type: Boolean, attribute: false },
            hideAddFamilyMember: { type: Boolean, attribute: false },
            selectedApplicationType: { type: String, attribute: true }, 
            applicationFormTypeId : {type : Number}
        }
    }
    constructor() {
        super();
        this.hideNewEnrollee = true;
        this.hideAddFamilyMember = true;
    }
    render() {
        return html`  

                <new-enrollee ?hidden = "${this.hideNewEnrollee}"                                 
                            .applicationFormTypeId = "${this.applicationFormTypeId}">
                </new-enrollee>
                <add-family-member ?hidden = "${this.hideAddFamilyMember}"
                                     .applicationFormTypeId = "${this.applicationFormTypeId}">
                </add-family-member>
        `;
    }

    getElement(elementName) {
        return this.shadowRoot.querySelector(elementName);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name == "selectedapplicationtype") {
            if (newVal === "New Enrollee") { 
                this.hideNewEnrollee = false;
                this.resetNewEnrolleeControls();
                this.hideAddFamilyMember = true;
            }
            else if (newVal === "Add a Family Member"){
                this.getElement(addFamilyMemberElement).clear();
                this.hideNewEnrollee = true;
                this.hideAddFamilyMember = false;
            }
            else{
                this.hideNewEnrollee = true;
                this.hideAddFamilyMember = true;
            }
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }       

    resetNewEnrolleeControls() {
        this.getElement(newEnrolleElement).setAttribute("reset", true);
        this.getElement(newEnrolleElement).requestUpdate();
    }

    loadControl(rejectedAppData) {
        if (rejectedAppData.appType === 1) {
            this.hideNewEnrollee = false;
            this.hideAddFamilyMember = true;
            this.getElement(newEnrolleElement).loadControl(rejectedAppData);            
        }
        else if ((rejectedAppData.appType === 2)) {
            this.hideAddFamilyMember = false;
            this.hideNewEnrollee = true;
            this.getElement(addFamilyMemberElement).loadControl(rejectedAppData);            
        }
    }
}
customElements.define("application-types", ApplicationTypes);