import '../../../src/group-additions-app/company-groups/company-groups';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

describe("company groups element tests",()=>{
    it("should show notification if no group selected", async()=>{
        const element = await fixture(html`<company-groups></company-groups>`);
        element.selectedHealthGroup = "None";
        element.selectedDentalGroup = "None";
        element.selectedVisionGroup = "None";
        element.onDoneClick('');
        var notification = element.shadowRoot.getElementById("vaadinNotifyNoProductGroupSelected");
        expect(notification.opened).to.be.equal(true);
    });
    it("should set product group properties on API positive response and should show company groups element", async()=>{
        const element = await fixture(html`<company-groups></company-groups>`);
        var event = new Object();
        event.detail = {
            response :{
                Health : ["A12345","A23435","B23356"],
                Dental : ["D12344","D23244","D35456"],
                Vision : ["V23555","V34356","V34366"]
            }
        };
        element.onGetCompanyGroupsApiReponse(event);
        expect(element.healthGroups).to.be.not.null;
        expect(element.dentalGroups).to.be.not.null;
        expect(element.visionGroups).to.be.not.null;
        expect(element.healthGroups).to.be.length(3);
        expect(element.dentalGroups).to.be.length(3);
        expect(element.visionGroups).to.be.length(3);
        expect(element.hideCompanyGroupsControl).to.be.equal(false);
        expect(element.hideProgressBar).to.be.equal(true);
        expect(element.hideGroupIneligibleMessage).to.be.true;
    });
    it("show notification and hide company control on negative API response", async () => {
        const element = await fixture(html`<company-groups></company-groups>`);
        var event = new Object();
        event.detail = {
            response :{
                Health : [],
                Dental : [],
                Vision : []
            }
        };
        element.onGetCompanyGroupsApiReponse(event);
        expect(element.healthGroups).to.be.length(0);
        expect(element.dentalGroups).to.be.length(0);
        expect(element.visionGroups).to.be.length(0);
        expect(element.hideCompanyGroupsControl).to.be.equal(true);

        var notification = element.shadowRoot.getElementById("vaadinNotifyNoActiveGroupsFound");
        expect(notification.opened).to.be.equal(true);
        expect(element.hideProgressBar).to.be.equal(true);
        expect(element.hideGroupIneligibleMessage).to.be.true;
    });
    it("should show selected groups element with the groups selected.", async () => {
        const element = await fixture(html`<company-groups></company-groups>`);
        element.selectedHealthGroup = "A0000";
        element.selectedDentalGroup = "D0000";
        element.selectedVisionGroup = "V0000";

        element.onDoneClick(event);

        expect(element.hideCompanyGroupsControl).to.be.true;
        expect(element.hideReset).to.be.false;
        expect(element.hideSelectedCompanyGroupsElement).to.be.false;
        expect(element.selectedGroupsElement).attribute("header").equals("Company Groups");
        expect(element.selectedGroupsElement).attribute("selectedhealthgroup").equals("A0000");
        expect(element.selectedGroupsElement).attribute("selecteddentalgroup").equals("D0000");
        expect(element.selectedGroupsElement).attribute("selectedvisiongroup").equals("V0000");
    });

    it("should display message inEligible for data entry on API negative response and should hide company groups element", async () => {
        const element = await fixture(html`<company-groups></company-groups>`);
        var event = new Object();
        event.detail = { response: { message: "Company ineligible for Data Entry" } };
        element.onGetCompanyGroupsApiReponse(event);
        expect(element.healthGroups).to.be.undefined;
        expect(element.dentalGroups).to.be.undefined;
        expect(element.visionGroups).to.be.undefined;
        expect(element.hideGroupIneligibleMessage).to.be.false;
        expect(element.hideCompanyGroupsControl).to.be.true;
        expect(element.hideProgressBar).to.be.equal(true);
    });

    it("should display company groups element and hide selected groups element on Reset button click", async () => {
        const element = await fixture(html`<company-groups></company-groups>`);
        element.onResetClick("");
        expect(element.hideCompanyGroupsControl).to.be.false;
        expect(element.hideSelectedCompanyGroupsElement).to.be.true;
        expect(element.hideReset).to.be.true;
    });

});

