import { LitElement, html, css } from "lit-element";
import '@vaadin/vaadin-dialog/vaadin-dialog';

class RejectedAppsDialog extends LitElement {   

    render() {        
        return html`        
        <vaadin-dialog no-close-on-esc no-close-on-outside-click>
            <template>
                <div style="text-align: center;">
                    <h3>Document Uploaded</h3><br/>
                    <span style="font-size:14px">Assigned to OSD</span><br/>
                    <span style= "font-size:14px; color: #0066FF; font-weight: bold">To go back to the Rejected Queue, Close the current tab!</span>
                </div>
            </template>
        </vaadin-dialog>
        `;
    }
    get dialog() {
        return this.shadowRoot.querySelector("vaadin-dialog");
    }
    open() {
        this.dialog.opened = true;
    }
}
customElements.define("rejected-apps-dialog", RejectedAppsDialog);