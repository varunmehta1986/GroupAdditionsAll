import '../../../../src/group-additions-app/data-entry/upload-requirement-document/add-requirement-document';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

describe("add requriement doc tests", () => {
    it("should set requriementdocumentypes on API response", async () => {
        const element = await fixture(html`<add-requirement-document></add-requirement-document>`);
        var event = new Object();
        event.detail = {
            response: [{ id: 1, name: "document 1" }, { id: 2, name: "document 2" }]
        };
        element.onGetRequirementDocumentSelectionsApiResponse(event);
        expect(element.requirementDocumentTypes).to.be.not.null;
    });
    it("should reset files onSelectedTypeChange ", async () => {
        const element = await fixture(html`<add-requirement-document></add-requirement-document>`);
        element.selectedFileName = "SomeFileName";
        var event = new Object();
        event.detail = {
            message: 1
        };
        element.onSelectedTypeChange(event);
        expect(element.selectedFileName).to.be.equal("");
        expect(element.files.length).to.be.equal(0);
    });
    it("should assign attribute id on value changed", async () => {
        const element = await fixture(html`<add-requirement-document></add-requirement-document>`);
        var newVal = 10;
        element.attributeChangedCallback("id", 0, newVal);
        expect(element.id).to.be.equal(newVal);
    });
    it("should not assign attribute id on same value assignment", async () => {
        const element = await fixture(html`<add-requirement-document></add-requirement-document>`);
        element.id = 10;
        var newVal = 10;
        var oldVal = 10
        element.attributeChangedCallback("id", oldVal, newVal);
        expect(element.id).to.be.equal(newVal);
    });
    it("should assign file name when document uploaded", async () => {
        const element = await fixture(html`<add-requirement-document></add-requirement-document>`);
        var event = new Object();
        event.currentTarget = {
            files: [{
                name: "file1"
            }]
        };
        element.onDocumentUploadChange(event);
        expect(element.selectedFileName).to.be.equal("file1");
    });    
    it("should assign blank out file name when document removed", async () => {
        const element = await fixture(html`<add-requirement-document></add-requirement-document>`);
        var event = new Object();
        event.currentTarget = {
            files: []
        };
        element.onDocumentUploadChange(event);
        expect(element.selectedFileName).to.be.empty;
    });

    it("should reset invalid attribute to true and return error message if selectedRequirementTypeId is undefined or empty", async () => {
        const element = await fixture(html`<add-requirement-document></add-requirement-document>`);
        element.selectedRequirementTypeId = undefined;
        var errorMessage = element.isValid();
        expect(element.getElement("select-list-dynamic").invalid).to.be.equal(true);
        expect(errorMessage).to.be.equal("Requirement Document Type needs to be selected.");
    });

    it("should return error message if selectedFileName is undefined or null", async () => {
        const element = await fixture(html`<add-requirement-document></add-requirement-document>`);
        element.selectedFileName = "";
        element.selectedRequirementTypeId = "10";       
        var errorMessage = element.isValid();
        expect(errorMessage).to.be.equal("Please select a file for all of the requirement document types.");
    });

    it("should remove invalid attribute if selectedFileName (or) selectedRequirementTypeId is not null", async () => {
        const element = await fixture(html`<add-requirement-document></add-requirement-document>`);
        element.selectedFileName = "Test Document";
        element.selectedRequirementTypeId = "10";
        var errorMessage = element.isValid();
        expect(element.getElement("select-list-dynamic").invalid).to.be.equal(undefined);
        expect(errorMessage).to.be.equal("");
    });

    it("should reset files and selectedFileName attribute if there is an error uploading file", async () => {
        const element = await fixture(html`<add-requirement-document></add-requirement-document>`);
        element.selectedFileName = "Test Document";
        element.files = [{name: "Test Document"}];
        element.onErrorUpload();
        expect(element.selectedFileName).to.be.equal("");
        expect(element.files.length).is.equal(0);
    });

    it("should delete requirement element on remove requirement click event", async () => {
        const uploadReqElement = await fixture(html`<upload-requirement-document></upload-requirement-document>`);
        const element = await fixture(html`<add-requirement-document></add-requirement-document>`); 
        uploadReqElement.appendChild(element);
        element.onRemoveRequirementClick();
        var addReqElement = uploadReqElement.querySelector("add-requirement-document");
        expect(addReqElement).to.be.equal(null);
    });
});