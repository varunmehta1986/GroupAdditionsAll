import '../../../src/group-additions-app/custom-controls/select-list-dynamic';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

describe("select list dynamic tests", () => {
    it("should select first vaadin list item if selectFirstIfSingleItem and items length is 1", async () => {
        const element = await fixture(html`<select-list-dynamic></select-list-dynamic>`);
        element.selectFirstIfSingleItem = true;
        element.itemValuePath = "id";
        var event = new Object();
        event.detail = {
            response: [{ id: "Item1" }]
        };
        element.apiResponseHandler(event);
        expect(element.vaadinSelect.value).to.be.equal("Item1");
        expect(element.vaadinSelect).does.not.have.attribute("invalid");
    });
    it("should select first vaadin list item if selectFirstIfSingleItem and addBlankOption and items length is 1", async () => {
        const element = await fixture(html`<select-list-dynamic></select-list-dynamic>`);
        element.selectFirstIfSingleItem = true;
        element.addBlankOption = true;
        element.itemValuePath = "id";
        var event = new Object();
        event.detail = {
            response: [{ id: "Item1" }]
        };
        element.apiResponseHandler(event);
        expect(element.vaadinSelect.value).to.be.equal("Item1");
        expect(element.vaadinSelect).does.not.have.attribute("invalid");
    });
    it("should unselect vaadin item for more than 1 item", async () => {
        const element = await fixture(html`<select-list-dynamic></select-list-dynamic>`);
        element.selectFirstIfSingleItem = true;
        element.addBlankOption = true;
        element.itemValuePath = "id";
        var event = new Object();
        event.detail = {
            response: [{ id: "Item1" }, {id:"Item2"}]
        };
        element.apiResponseHandler(event);
        expect(element.vaadinSelect.value).to.be.equal(undefined);
        expect(element.vaadinSelect).does.not.have.attribute("invalid");
    });
});