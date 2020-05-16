import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@polymer/iron-input/iron-input';
import '@vaadin/vaadin-date-picker/vaadin-date-picker-light'
import '@vaadin/vaadin-icons/vaadin-icons';
class CustomMarketwriteDatePicker extends LitElement {
    static get properties() {
        return {
            label: { type: String },
            required: { type: Boolean },
            value: { type: String }
        };
    }
    constructor() {
        super();
        this.updateComplete.then(() => {
            var datePicker = this.shadowRoot.querySelector("vaadin-date-picker-light");
            datePicker.close();
            datePicker.value = "";
            datePicker.set("i18n.parseDate", function (dateString) {
                //duplicated validation as I am not able to find a way to call parent element's function
                if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
                    return undefined;

                var currentYear = new Date().getFullYear();
                var parts = dateString.split("/");
                var day = parseInt(parts[1], 10);
                var month = parseInt(parts[0], 10);
                var year = parseInt(parts[2], 10);
                if (year < 2000 || year > (currentYear + 1) || month == 0 || month > 12)
                    return undefined;
                var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
                    monthLength[1] = 29;
                if (day > 0 && day <= monthLength[month - 1]) {
                    var date = new Date(dateString);
                    return {
                        day: date.getDate() < 10 ? Number("0" + date.getDate()) : date.getDate(),
                        month: date.getMonth() < 10 ? Number("0" + date.getMonth()) : date.getMonth(),
                        year: date.getFullYear()
                    }
                };
            });
            datePicker.set("i18n.formatDate", function (date) {
                return [(date.month + 1) < 10 ? ("0" + (date.month + 1)) : (date.month + 1),
                date.day < 10 ? ("0" + date.day) : date.day,
                date.year].join("/");
            });
        });
    }
    render() {
        return html`
                <div>
                    <vaadin-date-picker-light required > 
                        <iron-input>
                        <vaadin-text-field .value = ${this.value}
                                            label = "${this.label}"  
                                            @keypress = "${this.isNumber}"
                                            @keyup = "${this.onKeyUp}"
                                            maxlength = "10"
                                            placeholder = "mm/dd/yyyy"                                             
                                            error-message = "Invalid Date"
                                            clear-button-visible
                                            required
                                            @blur = "${this.onDateChange}">
                                   <iron-icon icon= "vaadin:calendar" slot="suffix"></iron-icon>
                        </vaadin-text-field>
                        </iron-input>
                    </vaadin-date-picker-light>  
                </div>            
        `;
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
    get datePicker() {
        return this.shadowRoot.querySelector("vaadin-date-picker-light");
    }
    get dateTextBox() {
        return this.shadowRoot.querySelector("vaadin-text-field");
    }
    onKeyUp(event) {
        var dateString = event.currentTarget.value;
        if (event.key === "Backspace" || event.key === " ") {
            return;
        }
        else if (dateString.length === 2) {
            dateString = dateString + "/";
        }
        else if (dateString.length === 5) {
            dateString = dateString + "/";
        }
        else if (dateString.length === 3 && dateString.indexOf('/') === -1) {
            dateString = dateString.slice(0, 2) + "/" + dateString.slice(2);
        }
        else if (dateString.length === 6 && dateString.match("/").length === 1 && dateString[5] !== '/') {
            dateString = dateString.slice(0, 5) + "/" + dateString.slice(5);
        }
        event.currentTarget.value = dateString;
        this.value = dateString;
    }
    isValidDate(dateString) {
        var currentYear = new Date().getFullYear();
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;
        var parts = dateString.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        if (year < 2000 || year > (currentYear + 1) || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;
        return day > 0 && day <= monthLength[month - 1];
    };
    onDateChange(e) {
        this.value = e.currentTarget.value;
        if (e.currentTarget.value !== "") {
            if (this.isValidDate(e.currentTarget.value)) {
                let dateChanged = new CustomEvent("date-selected", {
                    detail: {
                        message: e.currentTarget.value
                    },
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(dateChanged);
                this.markControlInvalid(false);
            }
            else {
                this.markControlInvalid(true);
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        }
        else {

            this.markControlInvalid(true);
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
    }
    markControlInvalid(invalid) {
        if (invalid) {
            this.datePicker.setAttribute("invalid", true);
            this.dateTextBox.setAttribute("invalid", true);
        }
        else {
            this.datePicker.removeAttribute("invalid");
            this.dateTextBox.removeAttribute("invalid");
        }
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (this.datePicker !== null) {
            this.datePicker.removeAttribute("invalid");
            this.datePicker.value = "";
        }
        if (this.dateTextBox !== null) {
            this.dateTextBox.removeAttribute("invalid");
            this.dateTextBox.value = "";
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }

}
customElements.define("custom-marketwrite-date-picker", CustomMarketwriteDatePicker);