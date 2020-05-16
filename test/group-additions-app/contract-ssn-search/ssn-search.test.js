import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../../../src/group-additions-app/contract-ssn-search/ssn-search';

describe("ssn search tests", () => {
    it("should set error message if api call failed", async()=>{
        const element = await fixture(html`<ssn-search></ssn-search>`);
        element.ssnSearchError("");
        expect(element.vaadinNotification).has.attribute("message");
        expect(element.vaadinNotification).attribute("message").to.be.equal("Error getting search result for the SSN searched");
        expect(element.hideProgressBar).to.be.true;
    });
    it("should set error message and hide progress bar on no results found", async()=>{
        const element = await fixture(html`<ssn-search></ssn-search>`);
        var event = new Object();
        event.detail = {
            response: {
                message : "No records found"
            }
        };
        element.ssnSearchResonse(event);
        expect(element.vaadinNotification).has.attribute("message");
        expect(element.vaadinNotification).attribute("message").to.be.equal("No records found.");
        expect(element.hideProgressBar).to.be.true;
    });
    it("should show progress bar when search button is clicked", async()=>{
        const element = await fixture(html`<ssn-search></ssn-search>`);
        element.searchClicked("");
        expect(element.hideProgressBar).to.be.false;
    });
});