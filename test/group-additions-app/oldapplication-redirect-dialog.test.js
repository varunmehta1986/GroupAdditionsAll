import '../../src/group-additions-app/oldapplication-redirect-dialog';
import { fixture, html, expect } from '@open-wc/testing';

describe("old application redirect dialog test",()=>{
    it("should dispatch dialog-closed event on cancel click", async ()=>{
        const groupAdditionElement = await fixture(html `<group-additions-app></group-additions-app>`);
        const element = await fixture(html`<oldapplication-redirect-dialog></oldapplication-redirect-dialog>`);
        element.onCancelClick("");
        expect(groupAdditionElement.hideRedirectDialog).to.be.true;
    });
});