import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
class SsnVaadinTextField extends LitElement {
    static get properties() {
        return {
            required: { type: Boolean },
            hidden: { type: Boolean }
        }
    }
    render() {
        return html`
            <vaadin-text-field placeholder="SSN"
                 @keypress = ${this.isNumber}
                 @keyup=${this.textChanged}                    
                 maxlength = "11"
                 minlength = "11"
                 ?required = "${this.required}"
                 ?hidden = "${this.hidden}"
                 error-message = "Invalid SSN Number"
                 @blur = ${this.textLeave}> 
            </vaadin-text-field>
        `;
    }
    get vaadinTextField() {
        return this.shadowRoot.querySelector("vaadin-text-field");
    }
    get value() {
        return this.vaadinTextField.value;
    }
    hasInvalidCharacters() {
        var hiphenCount = 0;
        for (var i = 0; i < this.vaadinTextField.value.length; i++) {
            var character = this.vaadinTextField.value[i];
            if (isNaN(character) && character !== '-') {
                return true;
            }
            else if (character === '-') {
                if (++hiphenCount > 2) {
                    return true;
                }
            }
        }

        return false;
    }
    textLeave() {
        var currentValue = this.vaadinTextField.value.trim();
        if (this.hasInvalidCharacters()) {
            this.vaadinTextField.setAttribute("invalid", true);
            return;
        }
        else if (currentValue.length === 9) {
            //This case will cover when they copy a SSN without - characters
            this.vaadinTextField.value = currentValue.slice(0, 3) + "-" + currentValue.slice(3, 5) + "-" + currentValue.slice(5, 9);
        }
        else if (this.vaadinTextField.value.length < 11) {
            this.vaadinTextField.setAttribute("invalid", true);
            return;
        }
        var ssnPattern =  /^\d{3}-\d{2}-\d{4}$/;
        var isValidSSN = ssnPattern.test(this.vaadinTextField.value);
        if (!isValidSSN) {
            this.vaadinTextField.setAttribute("invalid", true);
        }
        else {
            this.vaadinTextField.removeAttribute("invalid");
        }
    }
    isNumber(e) {
        var keycodes = {
            'backspace': 8,
            'delete': 46,
            'leftArrow': 37,
            'rightArrow': 39,
            'number1': 48,
            'number9': 57
        };
        var charCode = e.which ? e.which :
            (e.charCode ? e.charCode :
                (e.keyCode ? e.keyCode : 0));

        if ((charCode < keycodes.number1 || charCode > keycodes.number9) &&
            charCode !== keycodes.delete &&
            charCode !== keycodes.backspace &&
            charCode !== keycodes.leftArrow &&
            charCode !== keycodes.rightArrow)
            e.preventDefault();
    }
    clear() {
        if (this.vaadinTextField !== null) {
            this.vaadinTextField.value = "";
        }
    }
    textChanged(event) {
        var ssnText = this.vaadinTextField.value;
        if (event.keyCode === 8) //backscpace
            return;

        if (ssnText.length === 3) {
            ssnText = ssnText + "-";
        }
        else if (ssnText.length === 6) {
            ssnText = ssnText + "-";
        }
        else if (ssnText.length === 4 && ssnText.indexOf('-') === -1) {
            ssnText = ssnText.slice(0, 3) + "-" + ssnText.slice(3);
        }
        else if (ssnText.length === 7 && ssnText.match("-").length === 1 && ssnText[6] !== '-') {
            ssnText = ssnText.slice(0, 6) + "-" + ssnText.slice(6);
        }
        this.vaadinTextField.value = ssnText;
    }
    get isValid() {
        return !this.vaadinTextField.hasAttribute("invalid");
    }
}
customElements.define('ssn-vaadin-text-field', SsnVaadinTextField);