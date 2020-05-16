import '../../../../src/group-additions-app/selected-company-groups/group-information-dialog/special-consideration-info';
import {fixture, html, expect} from '@open-wc/testing';

describe("group information dialog tests", () =>{
  it("should display no special considerations message if special consideration info id null", async()=>{
      const element = await fixture(html`<special-consideration-info></special-consideration-info>`);
        element.attributeChangedCallback("specialconsiderationinfo", "", "[]");
        expect(element.hideNoSpecialConsideration).to.be.false;  
        expect(element.hideSpecialConsideration).to.be.true;  
  });
});