import '../../../../src/group-additions-app/data-entry/generated-apps-dialog';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

describe("generated apps dialog test", () => {
    it("should open dialog", async () => {
        const element = await fixture(html`<generated-apps-dialog></generated-apps-dialog>>`);
        element.healthAppId = 123456;
        element.dentalAppId = 245775;
        element.visionAppId = 343434;
        element.open();
        expect(element.dialog.opened).to.be.true;
    });
});