import '../../../src/group-additions-app/application-types/new-enrollee';
import { fixture, html, expect } from '@open-wc/testing';

describe("New Enrollee test",()=>{
    it("should set hideDataEntryControls selected groups", async () => {
        const element = await fixture(html`<new-enrollee></new-enrollee>`);
        var event = new Object();
        event.detail = {
            message : JSON.stringify("{['A33454',''343542]}")
        };
        element.groupsSelected(event);
        expect(element.hideDataEntryControls).to.be.equal(false);
        expect(element.selectedGroups).be.not.equal(null);

    });
    it("should hide data entry control on groups reset", async ()=>{
        const element = await fixture(html`<new-enrollee></new-enrollee>`);
        element.groupsReset("");
        expect(element.hideDataEntryControls).to.be.equal(true);
    });
    it("should show company groups element on company selected", async () => {
        const element = await fixture(html`<new-enrollee></new-enrollee>`);
        var event = new Object();
        event.detail = {
            message: "12345"
        };
        element.companySelected(event);
        expect(element.hideCompanyGroups).to.be.equal(false);
    });
    it("should hide company groups element on no company selected", async () => {
        const element = await fixture(html`<new-enrollee></new-enrollee>`);
        var event = new Object();
        event.detail = {
            message: "No company selected"
        };
        element.companySelected(event);
        expect(element.hideCompanyGroups).to.be.equal(true);
    });

    it("should get healthGroupInfoIronAjax  element", async()=>{
        const element = await fixture(html `<new-enrollee></new-enrollee>`);
        var healthGroupInfoIronAjaxElement = element.healthGroupInfoIronAjax;
        expect(healthGroupInfoIronAjaxElement).to.be.not.null;
    });
    it("should get dentalGroupInfoIronAjax  element", async()=>{
        const element = await fixture(html `<new-enrollee></new-enrollee>`);
        var dentalGroupInfoIronAjaxElement = element.dentalGroupInfoIronAjax;
        expect(dentalGroupInfoIronAjaxElement).to.be.not.null;
    });
    it("should get visionGroupInfoIronAjax  element", async()=>{
        const element = await fixture(html `<new-enrollee></new-enrollee>`);
        var visionGroupInfoIronAjaxElement = element.visionGroupInfoIronAjax;
        expect(visionGroupInfoIronAjaxElement).to.be.not.null;
    });
    it("should set health group info on receiving API response", async()=>{
        const element = await fixture(html `<new-enrollee></new-enrollee>`);
        var event = new Object();
        event.detail = {
            response:{
                groupNumber : "A12345"
            }
        };
        element.onGetHealthGroupInfomrationApiResponse(event);
        expect(JSON.parse(element.healthGroupInfo).groupNumber).to.be.equal("A12345");
    });
    it("should set dental group info on receiving API response", async()=>{
        const element = await fixture(html `<new-enrollee></new-enrollee>`);
        var event = new Object();
        event.detail = {
            response:{
                groupNumber : "D12345"
            }
        };
        element.onGetDentalGroupInfomrationApiResponse(event);
        expect(JSON.parse(element.dentalGroupInfo).groupNumber).to.be.equal("D12345");
    });
    it("should set vision group info on receiving API response", async()=>{
        const element = await fixture(html `<new-enrollee></new-enrollee>`);
        var event = new Object();
        event.detail = {
            response:{
                groupNumber : "V12345"
            }
        };
        element.onGetVisionGroupInfomrationApiResponse(event);
        expect(JSON.parse(element.visionGroupInfo).groupNumber).to.be.equal("V12345");
    });
    

});