import '../../../src/group-additions-app/selected-company-groups/selected-company-groups';
import {fixture, html, expect} from '@open-wc/testing';

describe("selected company groups tests", () =>{
  it("should set groupNumber attribute on health product element on update of healthgroupNumber", async()=>{
      const element = await fixture(html`<selected-company-groups></selected-company-groups>`);
        element.attributeChangedCallback("selectedhealthgroup", "", "123456");
        expect(element.selectedHealthGroupsElement.selectedGroupNumber).to.be.not.null;  
        expect(element.selectedHealthGroupsElement.selectedGroupNumber).to.be.equal("123456"); 
  });

  it("should set groupNumber attribute on health product element on update of healthgroupNumber", async()=>{
    const element = await fixture(html`<selected-company-groups></selected-company-groups>`);
      element.attributeChangedCallback("selecteddentalgroup", "", "123456");
      expect(element.selectedDentalGroupsElement.selectedGroupNumber).to.be.not.null;  
      expect(element.selectedDentalGroupsElement.selectedGroupNumber).to.be.equal("123456"); 
    });

    it("should set groupNumber attribute on health product element on update of healthgroupNumber", async()=>{
        const element = await fixture(html`<selected-company-groups></selected-company-groups>`);
          element.attributeChangedCallback("selectedvisiongroup", "", "123456");
          expect(element.selectedVisionGroupsElement.selectedGroupNumber).to.be.not.null;  
          expect(element.selectedVisionGroupsElement.selectedGroupNumber).to.be.equal("123456"); 
    });

});