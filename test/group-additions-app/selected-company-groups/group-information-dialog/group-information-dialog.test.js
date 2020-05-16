import '../../../../src/group-additions-app/selected-company-groups/group-information-dialog/group-information-dialog';
import {fixture, html, expect} from '@open-wc/testing';

describe("group information dialog tests", () =>{
  it("should open a dialog if icon is clicked", async()=>{
      const element = await fixture(html`<group-information-dialog></group-information-dialog>`);
      element.groupInfo = { 
        groupNumber : 1232314,
        representative : {firstName: "testRepresentative"},
        agent : {firstName: "testAgent"},
        specialConsiderations: {formNumber: 12345}};
        element.open();
        expect(element.dialog.opened).to.be.true;     
      
  });
});


