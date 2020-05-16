import '../../../src/group-additions-app/custom-controls/ssn-vaadin-text-field';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

describe("SSN Vaadin text fields tests", () => {
    it("should mark control invalid if the text length is less than 11", async () => {
        const element = await fixture(html`<ssn-vaadin-text-field></ssn-vaadin-text-field>`);
        element.vaadinTextField.value = "123-12-123";
        element.textLeave();

        expect(element.vaadinTextField).has.attribute("invalid");
    });

    it("should mark control invalid if the text contains invalid character", async () => {
        const element = await fixture(html`<ssn-vaadin-text-field></ssn-vaadin-text-field>`);
        element.vaadinTextField.value = "123A12BD23";
        element.textLeave();

        expect(element.vaadinTextField).has.attribute("invalid");
    });
    it("should mark control invalid if the text contains extra hiphens", async () => {
        const element = await fixture(html`<ssn-vaadin-text-field></ssn-vaadin-text-field>`);
        element.vaadinTextField.value = "123----D23";
        element.textLeave();

        expect(element.vaadinTextField).has.attribute("invalid");
    });

    it("should not mark control invalid if the text length is 11", async () => {
        const element = await fixture(html`<ssn-vaadin-text-field></ssn-vaadin-text-field>`);
        element.vaadinTextField.value = "123-12-1234";
        element.textLeave();

        expect(element.vaadinTextField).does.not.have.attribute("invalid");
    });
    it("should insert hiphens if text length is 9 and is a valid SSN", async () => {
        const element = await fixture(html`<ssn-vaadin-text-field></ssn-vaadin-text-field>`);
        element.vaadinTextField.value = "123121234";
        element.textLeave();

        expect(element.vaadinTextField).does.not.have.attribute("invalid");
        expect(element.vaadinTextField.value).equals("123-12-1234");
    });
    it("should insert hiphens if text length is 9 but is not a valid SSN", async () => {
        const element = await fixture(html`<ssn-vaadin-text-field></ssn-vaadin-text-field>`);
        element.vaadinTextField.value = "1--121234";
        element.textLeave();

        expect(element.vaadinTextField).has.attribute("invalid");
        expect(element.vaadinTextField.value).equals("1---12-1234");
    });

    it("should append a - character after 3 digits have been entered for SSN" , async()=>{
        const element = await fixture(html`<ssn-vaadin-text-field></ssn-vaadin-text-field>`);
        element.vaadinTextField.value = "123";
        
        element.textChanged("");

        expect(element.vaadinTextField.value).equals("123-");
    });
    it("should append a - character after 6 digits have been entered for SSN" , async()=>{
        const element = await fixture(html`<ssn-vaadin-text-field></ssn-vaadin-text-field>`);
        element.vaadinTextField.value = "123-56";
        
        element.textChanged("");

        expect(element.vaadinTextField.value).equals("123-56-");
    });
    it("should insert a - character after 4 digits have been entered for SSN and user removed the -" , async()=>{
        const element = await fixture(html`<ssn-vaadin-text-field></ssn-vaadin-text-field>`);
        element.vaadinTextField.value = "1235";
        
        element.textChanged("");

        expect(element.vaadinTextField.value).equals("123-5");
    });
    it("should insert a - character after 7 digits have been entered for SSN and user removed the 2nd -" , async()=>{
        const element = await fixture(html`<ssn-vaadin-text-field></ssn-vaadin-text-field>`);
        element.vaadinTextField.value = "123-456";
        
        element.textChanged("");

        expect(element.vaadinTextField.value).equals("123-45-6");
    });
    it("should not do anything if SSN length has reached" , async()=>{
        const element = await fixture(html`<ssn-vaadin-text-field></ssn-vaadin-text-field>`);
        element.vaadinTextField.value = "123-456-7890";
        
        element.textChanged("");

        expect(element.vaadinTextField.value).equals("123-456-7890");
    });

    it("should return if backspace is entered", async()=>{
        const element = await fixture(html`<ssn-vaadin-text-field></ssn-vaadin-text-field>`);
        element.vaadinTextField.value = "123";
        var event = {
            keyCode : 8
        };
        element.textChanged(event);
        expect(element.vaadinTextField.value).equals("123");
    });
});