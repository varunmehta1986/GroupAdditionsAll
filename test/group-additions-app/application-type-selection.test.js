import '../../src/group-additions-app/application-type-selection';
import { fixture, html, expect } from '@open-wc/testing';

describe("aaplication type selection test cases", ()=>{
    it("should load control for rejected new enrollee app", async()=>{
        const element = await fixture(html`<application-type-selection></application-type-selection>>`);
        var rejectedAppData = {
            appType: 1
        };

        element.loadControl(rejectedAppData);

        expect(element.getElement("vaadin-select").value).equals("New Enrollee");
    });
    it("should load control for rejected add a family member app", async()=>{
        const element = await fixture(html`<application-type-selection></application-type-selection>>`);
        var rejectedAppData = {
            appType: 2
        };

        element.loadControl(rejectedAppData);

        expect(element.getElement("vaadin-select").value).equals("Add a Family Member");
    });
    it("should not load control for invalid app type", async()=>{
        const element = await fixture(html`<application-type-selection></application-type-selection>>`);
        var rejectedAppData = {
            appType: 3
        };

        element.loadControl(rejectedAppData);

        expect(element.getElement("vaadin-select").value).equals("");
    });
})