import '../../../src/group-additions-app/application-types/application-types';
import { fixture, html, expect } from '@open-wc/testing';

describe("Application Types ", () => {
    it("should set hide new enrollee and show add a family memeber", async () => {
        const element = await fixture(html`<application-types></application-types>`);
        var name = "selectedapplicationtype";
        var newVal = "Add a Family Member";
        element.attributeChangedCallback(name, "", newVal);
        expect(element.hideNewEnrollee).to.be.true;
        expect(element.hideAddFamilyMember).to.be.false;
    });

    it("should show new enrollee and hide add a family memeber", async () => {
        const element = await fixture(html`<application-types></application-types>`);
        var name = "selectedapplicationtype";
        var newVal = "New Enrollee";
        element.attributeChangedCallback(name, "", newVal);
        expect(element.hideNewEnrollee).to.be.false;
        expect(element.hideAddFamilyMember).to.be.true;
    });
    
    it("should hide new enrollee and hide add a family memeber", async () => {
        const element = await fixture(html`<application-types></application-types>`);
        var name = "selectedapplicationtype";
        var newVal = "";
        element.attributeChangedCallback(name, "", newVal);
        expect(element.hideNewEnrollee).to.be.true;
        expect(element.hideAddFamilyMember).to.be.true;
    });
    it("should load control for rejectedAppData and hide add a family memeber if appType is newEnrollee", async()=>{
        const element = await fixture(html`<application-types></application-types>`);
        var rejectedAppData = {
            appType: 1,
            formType: 26,
            receivedDate: "2020-04-21T00:00:00",
            qleType: {id: "11", name: "Other"},
            qleDate: "2020-04-21T00:00:00",
            rejectedOsdApplicationId: 1,
            healthGroupNumber:"None",
            dentalGroupNumber: "None",
            visionGroupNumber: "None",
            healthContractNumber: "500002168",
            dentalContractNumber: "",
            visionContractNumber: ""
        };

        element.loadControl(rejectedAppData);
        expect(element.hideAddFamilyMember).to.be.true;
        expect(element.hideNewEnrollee).to.be.false;
    });

    it("should load control for rejectedAppData and hide new enrolle if appType is add a family memeber", async()=>{
        const element = await fixture(html`<application-types></application-types>`);
        element.hideAddFamilyMember = true;
        element.hideNewEnrollee = true;
        var rejectedAppData = {
            appType: 2,
            formType: 26,
            receivedDate: "2020-04-21T00:00:00",
            qleType: {id: "11", name: "Other"},
            qleDate: "2020-04-21T00:00:00",
            rejectedOsdApplicationId: 1,
            healthGroupNumber:"None",
            dentalGroupNumber: "None",
            visionGroupNumber: "None",
            healthContractNumber: "500002168",
            dentalContractNumber: "",
            visionContractNumber: ""
        };

        element.loadControl(rejectedAppData);
        expect(element.hideAddFamilyMember).to.be.false;
        expect(element.hideNewEnrollee).to.be.true;
    });

});        