import { LitElement, html, css } from "lit-element";
import '@vaadin/vaadin-dialog/vaadin-dialog';

class RejectedAppsFailedUploadDialog extends LitElement {
    render() {
        return html`        
        <vaadin-dialog no-close-on-esc no-close-on-outside-click>
            <template>
                <div style="text-align: center;">
                    <span style="color:red; font-size:14px">The application document(s) could not be uploaded at this time. <br/>
                    The document(s) will be reprocessed until uploaded successfully.</span><br/><br/>
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
customElements.define("rejected-apps-failed-upload-dialog", RejectedAppsFailedUploadDialog);