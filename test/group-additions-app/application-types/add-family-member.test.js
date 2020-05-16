import '../../../src/group-additions-app/application-types/add-family-member';
import { fixture, html, expect } from '@open-wc/testing';

describe("Add a family member tests ", () => {
    it("should load groups when found", async () => {
        const element = await fixture(html`<add-family-member></add-family-member>`);
        var groups = [{
            contractNumber: "123456",
            firstName: "Test",
            mi: "A",
            lastName: "Last",
            sex: "Male",
            dob: "01/01/2000",
            groupNumber: "A12345",
            coverageEffectiveDate: "01/01/2000",
            status: "Active",
            productType: 1,
            isGroupInError: false
        },
        {
            contractNumber: "123457",
            firstName: "Test",
            mi: "A",
            lastName: "Last",
            sex: "Male",
            dob: "01/01/2000",
            groupNumber: "D12345",
            coverageEffectiveDate: "01/01/2000",
            status: "Active",
            productType: 2,
            isGroupInError: false
        },
        {
            contractNumber: "123490",
            firstName: "Test",
            mi: "A",
            lastName: "Last",
            sex: "Male",
            dob: "01/01/2000",
            groupNumber: "V12345",
            coverageEffectiveDate: "01/01/2000",
            status: "Active",
            productType: 3,
            isGroupInError: false
        }];
        var event = {
            detail:{
                message: JSON.stringify(groups)
            }
        };
        element.loadFoundGroups(event);
        expect(element.foundGroups.length).equal(groups.length);
        expect(element.hideContractSSNGroups).is.false;
    });
    it("should clear and hide elements", async()=>{
        const element = await fixture(html`<add-family-member></add-family-member>`);
        element.clear();
        expect(element.hideDataEntryControls).to.be.true;
        expect(element.hideContractSSNGroups).to.be.true;
    });
    it("should set data entry element", async()=>{
        const element = await fixture(html`<add-family-member></add-family-member>`);
        var groups = [{
            contractNumber: "123456",
            firstName: "Test",
            mi: "A",
            lastName: "Last",
            sex: "Male",
            dob: "01/01/2000",
            groupNumber: "A12345",
            coverageEffectiveDate: "01/01/2000",
            status: "Active",
            productType: 1,
            isGroupInError: false
        },
        {
            contractNumber: "123457",
            firstName: "Test",
            mi: "A",
            lastName: "Last",
            sex: "Male",
            dob: "01/01/2000",
            groupNumber: "D12345",
            coverageEffectiveDate: "01/01/2000",
            status: "Active",
            productType: 2,
            isGroupInError: false
        },
        {
            contractNumber: "123490",
            firstName: "Test",
            mi: "A",
            lastName: "Last",
            sex: "Male",
            dob: "01/01/2000",
            groupNumber: "V12345",
            coverageEffectiveDate: "01/01/2000",
            status: "Active",
            productType: 3,
            isGroupInError: false
        }];
        element.foundGroups = groups;

        var selectedGroups = {
            healthGroup : "A12345", 
            dentalGroup : "D12345", 
            visionGroup : "V12345"
        };
        var event = {
            detail:{
                message : JSON.stringify(selectedGroups)
            }
        };

        element.showDataEntryElement(event);

        var dataEntry = element.getElement("data-entry");
        expect(dataEntry).attribute("selectedContracts").to.be.not.null;
        expect(dataEntry).attribute("selectedGroups").to.be.not.null;
    });
    it("should hide data entry element on reset", async()=>{
        const element = await fixture(html`<add-family-member></add-family-member>`);
        element.resetDataEntryElement();
        expect(element.hideDataEntryControls).to.be.true;
    });
});