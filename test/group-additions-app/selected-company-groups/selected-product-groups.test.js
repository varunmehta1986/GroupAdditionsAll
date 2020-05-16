import '../../../src/group-additions-app/selected-company-groups/selected-product-groups';
import {fixture, html, expect} from '@open-wc/testing';

describe("selected product groups tests", () =>{
    it("should set hideIcon property to true when selectedGroupNumber property is None", async() =>{
        const element = await fixture(html`<selected-product-groups></selected-product-groups>`);
        var name="selectedgroupnumber";
        var newVal = "None";
        element.attributeChangedCallback(name, "", newVal);
        expect(element.hideIcon).to.be.equal(true);
    });
    
    it("should set hideIcon property to false when selectedGroupNumber property is None", async() =>{
        const element = await fixture(html`<selected-product-groups></selected-product-groups>`);
        var name="selectedgroupnumber";
        var newVal = "12345";
        element.attributeChangedCallback(name, "", newVal);
        expect(element.hideIcon).to.be.equal(false);
    });
    
    it("should set vaadinDialog element attribute on group info icon click", async() =>{
        const element = await fixture(html`<selected-product-groups></selected-product-groups>`);       
        element.groupInfo = { 
            groupNumber : 1232314,
            representative : {firstName: "testRepresentative"},
            agent : {firstName: "testAgent"},
            specialConsiderations: {formNumber: 12345}};
        element.groupInfoClick();
        expect(element.vaadinDialog.groupInfo).to.be.not.null;
        expect(element.vaadinDialog.groupInfo.representative).to.be.not.null;
        expect(element.vaadinDialog.groupInfo.agent).to.be.not.null;
        expect(element.vaadinDialog.groupInfo.specialConsiderations).to.be.not.null;
        expect(element.vaadinDialog.groupInfo.groupNumber).to.be.equal(1232314);
        expect(element.vaadinDialog.groupInfo.representative.firstName).to.be.equal("testRepresentative");
        expect(element.vaadinDialog.groupInfo.agent.firstName).to.be.equal("testAgent");        
        expect(element.vaadinDialog.groupInfo.specialConsiderations.formNumber).to.be.equal(12345); 
    });

    it("should hide icon selectedGroupNumber is 'None' ", async() =>{
        const element = await fixture(html`<selected-product-groups></selected-product-groups>`);
        var  newVal = "None";
        element.attributeChangedCallback("selectedgroupnumber", "", newVal);
        expect(element.hideIcon).to.be.true;
    });
});