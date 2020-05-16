import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import '../../../src/group-additions-app/contract-ssn-search/contract-ssn-search';

describe("contract-ssn search tests", () => {
    it("should set selectedContractOrSsn property if Contract number is not blank on search click", async () => {
        const element = await fixture(html`<contract-ssn-search></contract-ssn-search>`);
        
        var event = {
            detail:{
                value : JSON.stringify("K00337762")
            }
        };
        element.searchClicked(event);
        expect(element.selectedContractOrSsn).to.be.equal("K00337762");
        expect(element.hideResultGrid).to.be.true;
    });
    it("should set selectedContractOrSsn property if SSN is not blank on search click", async () => {
        const element = await fixture(html`<contract-ssn-search></contract-ssn-search>`);
        var event = {
            detail:{
                value : JSON.stringify("123-45-6789")
            }
        };
        element.searchClicked(event);
        expect(element.selectedContractOrSsn).to.be.equal("123-45-6789");
        expect(element.hideResultGrid).to.be.true;
    });
    it("should set contractList property on resultGridElement and display result grid", async () => {
        const element = await fixture(html`<contract-ssn-search></contract-ssn-search>`);
        var event = new Object();
        event.detail = {
            message: JSON.stringify([{contractNumber: "500117389",
            coverageEffectiveDate: "7/1/2020",
            dob: "9/25/1961",
            firstName: "James",
            groupName: "Industrial Mill Services - 042736",
            groupNumber: "042736",
            isGroupInError: false,
            lastName: "Wallace",
            mi: "R",
            productType: 1,
            sex: "Male",
            status: "Active"}, 
            {contractNumber: "500117389",
            coverageEffectiveDate: "7/1/2020",
            dob: "9/25/1961",
            firstName: "James",
            groupName: "Industrial Mill Services - 042736",
            groupNumber: "042736",
            isGroupInError: false,
            lastName: "Wallace",
            mi: "R",
            productType: 1,
            sex: "Male",
            status: "Active"}])
    };
    element.loadResultGrid(event);
    expect(element.hideResultGrid).to.be.false;
    expect(element.getElement("result-grid").contractList).is.not.undefined;
    });
    
});