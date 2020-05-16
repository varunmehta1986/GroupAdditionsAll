import '../../src/group-additions-app/application-form-selection';
import { fixture, html, expect } from '@open-wc/testing';

describe("Application Form Selection", () => {
    it("should set selected value on form selection", async () => {
        const element = await fixture(html`<application-form-selection></application-form-selection>`);
        var event = new Object();
        event.target = {
            value: 26,
            selectedItem: {
                useWebApp: true,
                applicationFormTypeID: 26
            }
        };
        element.onFormSelection(event);
        expect(element.selectedValue).to.equal(26);
    });
    it("should load control for rejected app and set the formType combo box value", async()=>{
        const element = await fixture(html`<application-form-selection></application-form-selection>`);
        var rejectedAppData = {
            formType: 26
        };
        var e = new Object();
        e.target = {
            value: rejectedAppData.formType,
            selectedItem: {
                useWebApp: true,
                applicationFormTypeID: rejectedAppData.formType
            }
        };

        element.loadControl(rejectedAppData);
        expect(element.getElement("vaadin-combo-box").value).equals(26);
        expect(element.disabled).to.be.true;
    });
    
});