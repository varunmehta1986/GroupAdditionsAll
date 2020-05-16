import '../../../src/group-additions-app/data-entry/policy-eligibility-type-selection';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

describe("test policy eligibility type selection", () => {
    it("should return error message if policy eligibility type is blank", async () => {
        const element = await fixture(html`<policy-eligibility-type-selection></policy-eligibility-type-selection>`);
        element.selectedEligibilityType = "";
        var errorMessage = element.isValid();
        expect(errorMessage).to.be.equal("Please select a Policy Eligibility Type");
    });
    it("should return error message if policy eligibility date is blank", async () => {
        const element = await fixture(html`<policy-eligibility-type-selection></policy-eligibility-type-selection>`);
        element.selectedEligibilityType = "11"
        element.hideEligibilityDate = false;
        element.selectedEligibilityDate = "";
        var errorMessage = element.isValid();
        expect(errorMessage).to.be.equal("Invalid Policy Eligibility Date.");
    });
    it("should return error message if policy eligibility date is Invalid", async () => {
        const element = await fixture(html`<policy-eligibility-type-selection></policy-eligibility-type-selection>`);
        element.selectedEligibilityType = "10"
        element.hideEligibilityDate = false;
        element.selectedEligibilityDate = "23232";
        var errorMessage = element.isValid();
        expect(errorMessage).to.be.equal("Invalid Policy Eligibility Date.");
    });
   

});