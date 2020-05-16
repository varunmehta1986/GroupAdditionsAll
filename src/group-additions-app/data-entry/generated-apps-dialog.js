import { LitElement, html } from "lit-element";
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-dialog/vaadin-dialog';
class GeneratedAppsDialog extends LitElement {
    static get properties() {
        return {
            healthAppId: { type: Number },
            dentalAppId: { type: Number },
            visionAppId: { type: Number }, 
            showApplicationUploadError : {type: Boolean}
        }
    }
    constructor(){
        super();
        this.showApplicationUploadError  = false;
    }
    render() {

        return html`
        <style>
            h3{
                display: block;
                font-size: 1.17em;
                margin-block-start: 0px;
                margin-block-end: 0px;
                margin-inline-start: 0px;
                margin-inline-end: 0px;
                font-weight: bold;
            }
        </style>
        <vaadin-dialog no-close-on-esc no-close-on-outside-click style="color: red">
        </vaadin-dialog>
        `;
    }
    get dialog() {
        return this.shadowRoot.querySelector("vaadin-dialog");
    }
    open() {
        const myElement = this;
        this.dialog.renderer = function (root, dialog) {
            if (root.firstChildElement) {
                return;
            }
            const mainDiv = window.document.createElement('div');
            mainDiv.setAttribute("style", "width: 420px");
            const header = window.document.createElement('h3');
            header.setAttribute("style", "margin:0px ")
            header.textContent = "Application(s) submitted successfully"
            mainDiv.appendChild(header);
            mainDiv.appendChild(window.document.createElement('br'));
            if (myElement.healthAppId !== undefined && !isNaN(myElement.healthAppId) && myElement.healthAppId!== 0) {
                const healthAppSpan = window.document.createElement('span');
                healthAppSpan.textContent = "Health Application ID: " + myElement.healthAppId;
                healthAppSpan.setAttribute("style","font-size:14px");
                mainDiv.appendChild(healthAppSpan);
                mainDiv.appendChild(window.document.createElement('br'));
            }
            if (myElement.dentalAppId !== undefined && !isNaN(myElement.dentalAppId)  && myElement.dentalAppId!== 0) {
                const dentalAppSpan = window.document.createElement('span');
                dentalAppSpan.textContent = "Dental Application ID: " + myElement.dentalAppId;
                dentalAppSpan.setAttribute("style","font-size:14px");
                mainDiv.appendChild(dentalAppSpan);
                mainDiv.appendChild(window.document.createElement('br'));
            }
            if (myElement.visionAppId !== undefined && !isNaN(myElement.visionAppId) && myElement.visionAppId!== 0) {
                const visionAppSpan = window.document.createElement('span');
                visionAppSpan.textContent = "Vision Application ID: " + myElement.visionAppId;
                visionAppSpan.setAttribute("style","font-size:14px");
                mainDiv.appendChild(visionAppSpan);
                mainDiv.appendChild(window.document.createElement('br'));
            }
            debugger;
            if(myElement.showApplicationUploadError){
                const appUploadErrorSpan = window.document.createElement('span');
                appUploadErrorSpan.textContent = "The application document(s) could not be uploaded at this time. " + 
                                             "The document(s) will be reprocessed until uploaded successfully.";
                appUploadErrorSpan.setAttribute("style", "color:red; font-size:14px");

                mainDiv.appendChild(window.document.createElement('br'));
                mainDiv.appendChild(appUploadErrorSpan);
                mainDiv.appendChild(window.document.createElement('br'));
            }
            const submitAnotherButton = window.document.createElement('vaadin-button');
            submitAnotherButton.setAttribute('theme', 'primary');
            submitAnotherButton.setAttribute('style', 'margin-right: 1em');
            submitAnotherButton.textContent = "Submit another Application"
            submitAnotherButton.addEventListener("click",function(){
                    window.location.reload()});
            mainDiv.appendChild(window.document.createElement('br'));
            mainDiv.appendChild(submitAnotherButton);            
            root.appendChild(mainDiv);
        };
        this.dialog.opened = true;
    }
}
customElements.define("generated-apps-dialog", GeneratedAppsDialog);