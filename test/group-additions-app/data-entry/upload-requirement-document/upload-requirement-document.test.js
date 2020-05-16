import '../../../../src/group-additions-app/data-entry/upload-requirement-document/upload-requirement-document';
import {fixture, html, expect, elementUpdated} from '@open-wc/testing';

describe("upload requriement doc tests", () => {
    it("should set index for add requirement on button click", async () => {
        const element = await fixture(html`<upload-requirement-document></upload-requirement-document>`);
        element.index = 1;
        element.onAddRequirementClick();        
        expect(element.index).to.be.equal(2);
        var newRequirement = element.shadowRoot.querySelector("add-requirement-document");
        expect(newRequirement).is.not.null;
    });

    it("should get uploaded Documents", async () => {
        const element = await fixture(html`<upload-requirement-document></upload-requirement-document>`);
        const addReqElement = await fixture(html`<add-requirement-document></add-requirement-document>`);        
        addReqElement.selectedRequirementTypeId = "1";
        addReqElement.selectedFileName = "Test Document";
        element.shadowRoot.appendChild(addReqElement);
        element.uploadedDocuments;     
        expect(element.uploadedDocuments).is.not.null;
    });

    it("should remove child element on attribute update", async () => {
        const element = await fixture(html`<upload-requirement-document></upload-requirement-document>`);
        const addReqElement = await fixture(html`<add-requirement-document></add-requirement-document>`);        
        addReqElement.selectedRequirementTypeId = "1";
        addReqElement.selectedFileName = "Test Document";
        element.shadowRoot.appendChild(addReqElement);
        element.attributeChangedCallback("uploadeddocument", "", "");  
        var childReqElement = element.shadowRoot.querySelectorAll("add-requirement-document");
        expect(childReqElement.length).to.be.equal(0);
             
     });

    it("should return error message if add requirement element is invalid", async () => {
        const element = await fixture(html`<upload-requirement-document></upload-requirement-document>`);
        const addReqElement = await fixture(html`<add-requirement-document></add-requirement-document>`);        
        addReqElement.selectedRequirementTypeId = "10";
        addReqElement.selectedFileName = "";
        element.shadowRoot.appendChild(addReqElement);
        var errorMessage = element.isValid();       
        expect(errorMessage).to.be.equal("Please select a file for all of the requirement document types.");
    });

});