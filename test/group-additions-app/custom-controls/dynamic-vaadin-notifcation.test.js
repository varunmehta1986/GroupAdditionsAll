import '../../../src/group-additions-app/custom-controls/dynamic-vaadin-notification';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

describe("Dynamic vaadin notification tets", () => {
    it("should show notification on message attribute update", async () => {
        const element = await fixture(html`<dynamic-vaadin-notification></dynamic-vaadin-notification>`);
        var name = "message";
        var notification = element.shadowRoot.querySelector("vaadin-notification");
        element.attributeChangedCallback(name, "","test message");
        expect(notification.opened).to.equal(true);
    });
});