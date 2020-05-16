import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../../../src/group-additions-app/contract-ssn-search/contract-search';

describe("contract search tests", () => {
    it("should set invalid attribute if Contract number is blank on search click", async () => {
        const element = await fixture(html`<contract-search></contract-search>`);
        element.textField.value = "";
        var event = new Object();
        element.searchClicked(event);
        expect(element.textField).has.attribute("invalid");
    });
    it("should unhide progress bar, dispatch event and call api on search click", async () => {
        const element = await fixture(html`<contract-search></contract-search>`);
        element.textField.value = "K00337762";
        var event = new Object();
        element.searchClicked(event);
        expect(element.hideProgressBar).is.false;
        expect(element.textField).does.not.have.attribute("invalid");
    });
    it("should set error message on vaadin notification and hide progress bar", async () => {
        const element = await fixture(html`<contract-search></contract-search>`);
        element.contractSearchError("");
        expect(element.vaadinErrorNotification).attribute("message").to.be.equal("Error getting search result for the contract number searched");
        expect(element.hideProgressBar).to.be.true;
    });
    it("should show message if no records are found on search", async () => {
        const element = await fixture(html`<contract-search></contract-search>`);
        var event = new Object();
        event.detail = {
            response: {
                message: "No records found"
            }
        };
        element.contractSearchResonse(event);
        expect(element.vaadinErrorNotification).attribute("message").to.be.equal("No records found.");
        expect(element.hideProgressBar).to.be.true;
    });
    it("should show message if the searched contract is cancelled", async () => {
        const element = await fixture(html`<contract-search></contract-search>`);
        var event = new Object();
        event.detail = {
            response: {
                message: "Contract Cancelled"
            }
        };
        element.contractSearchResonse(event);
        expect(element.vaadinInfoNotification).attribute("message").to.be.equal("The searched contract has been cancelled, looking for associated contracts");
    });
    it("should dispatch event if results are found", async () => {
        const element = await fixture(html`<contract-search></contract-search>`);
        var event = new Object();
        event.detail = {
            response: {
                message: "Records found"
            }
        };
        element.contractSearchResonse(event);
        expect(element.hideProgressBar).to.be.true;
    });

});
