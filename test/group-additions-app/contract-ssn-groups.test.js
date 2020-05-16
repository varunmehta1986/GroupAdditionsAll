import '../../src/group-additions-app/contract-ssn-groups';
import { fixture, html, expect } from '@open-wc/testing';

describe("Contract SSN groups tests", () => {
    it("should show error message on done click if no groups were selected", async () => {
        const element = await fixture(html`<contract-ssn-groups></contract-ssn-groups>`);
        element.selectedHealthGroup = "None";
        element.selectedDentalGroup = "None";
        element.selectedVisionGroup = "None";

        element.onDoneClick(event);

        expect(element.getElement("dynamic-vaadin-notification")).attribute("message").equals("No groups selected.");
    });

    it("should show selected groups element with the groups selected.", async () => {
        const element = await fixture(html`<contract-ssn-groups></contract-ssn-groups>`);
        element.selectedHealthGroup = "A0000";
        element.selectedDentalGroup = "D0000";
        element.selectedVisionGroup = "V0000";

        element.onDoneClick(event);

        expect(element.hideCompanyGroupsControl).to.be.true;
        expect(element.hideReset).to.be.false;
        expect(element.hideSelectedCompanyGroupsElement).to.be.false;
        expect(element.getElement("selected-company-groups")).attribute("header").equals("Associated Groups");
        expect(element.getElement("selected-company-groups")).attribute("selectedhealthgroup").equals("A0000");
        expect(element.getElement("selected-company-groups")).attribute("selecteddentalgroup").equals("D0000");
        expect(element.getElement("selected-company-groups")).attribute("selectedvisiongroup").equals("V0000");
    });
    it("should show selected groups element with the health and dental groups selected.", async () => {
        const element = await fixture(html`<contract-ssn-groups></contract-ssn-groups>`);
        element.selectedHealthGroup = "A0000";
        element.selectedDentalGroup = "D0000";
        element.selectedVisionGroup = "None";

        element.onDoneClick(event);

        expect(element.hideCompanyGroupsControl).to.be.true;
        expect(element.hideReset).to.be.false;
        expect(element.hideSelectedCompanyGroupsElement).to.be.false;
        expect(element.getElement("selected-company-groups")).attribute("header").equals("Associated Groups");
        expect(element.getElement("selected-company-groups")).attribute("selectedhealthgroup").equals("A0000");
        expect(element.getElement("selected-company-groups")).attribute("selecteddentalgroup").equals("D0000");
        expect(element.getElement("selected-company-groups")).attribute("selectedvisiongroup").equals("None");
    });
    it("should show selected groups element with only groups selected.", async () => {
        const element = await fixture(html`<contract-ssn-groups></contract-ssn-groups>`);
        element.selectedHealthGroup = "None";
        element.selectedDentalGroup = "None";
        element.selectedVisionGroup = "V0000";

        element.onDoneClick(event);

        expect(element.hideCompanyGroupsControl).to.be.true;
        expect(element.hideReset).to.be.false;
        expect(element.hideSelectedCompanyGroupsElement).to.be.false;
        expect(element.getElement("selected-company-groups")).attribute("header").equals("Associated Groups");
        expect(element.getElement("selected-company-groups")).attribute("selectedhealthgroup").equals("None");
        expect(element.getElement("selected-company-groups")).attribute("selecteddentalgroup").equals("None");
        expect(element.getElement("selected-company-groups")).attribute("selectedvisiongroup").equals("V0000");
    });
    it("should show company groups control, hide selected company groups, hide reset button reset click", async () => {
        const element = await fixture(html`<contract-ssn-groups></contract-ssn-groups>`);
        element.onResetClick("");

        expect(element.hideCompanyGroupsControl).to.be.false;
        expect(element.hideReset).to.be.true;
        expect(element.hideSelectedCompanyGroupsElement).to.be.true;
    });

    it("should load control for a rejected app", async()=>{
        const element = await fixture(html`<contract-ssn-groups></contract-ssn-groups>`);

        var rejectedAppData = {
            healthGroupNumber: "A0000",
            dentalGroupNumber: "D0000",
            visionGroupNumber: "V0000",
            healthContractNumber: "A12356666",
            dentalContractNumber: "A34345454",
            visionContractNumber: "A12322221",
            receivedDate: "01/01/2020",
            rejectedOsdApplicationId: 1234,
            appType: 1,
            qleType: {
                id: "10"
            },
            qleDate: "1/1/2020"
        };

        element.loadControl(rejectedAppData);

        expect(element.getElement("selected-company-groups")).attribute("header").equals("Associated Groups");
        expect(element.hideCompanyGroupsControl).to.be.true;
        expect(element.hideReset).to.be.true;
        expect(element.hideSelectedCompanyGroupsElement).to.be.false;
    });
  
})