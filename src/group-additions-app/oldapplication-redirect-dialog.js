import { LitElement, html } from 'lit-element';
import {divStyles} from './group-addition-styles';
import '@vaadin/vaadin-button'

class OldApplicationRedirectDialog extends LitElement {
    static get styles(){
        return [
            divStyles
        ]
    }
    render() {
        return html`
        <div>
             <div class="error">
                    The application form that is selected is not currently suppported by this new website. 
             </div>
             <vaadin-button theme="primary small" @click = "${this.onOkClick.bind(this)}">Take me to the old website</vaadin-button>
            <vaadin-button @click = "${this.onCancelClick.bind(this)}" theme="small">I am looking for another form</vaadin-button>
        </div>
        `;
    }
    onOkClick(e){
        window.location.href = window.location.protocol + 
                                "//" + window.location.hostname + ":"
                                + window.location.port + "//MarketWrite_Group/Applications/ApplicationTracking/DataEntry.aspx";
    }
    onCancelClick(e) {
        let closedEvent = new CustomEvent('dialog-closed', {
            detail: {
                message: 'Dialog box closed fired'
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(closedEvent);
    }
}
customElements.define("oldapplication-redirect-dialog", OldApplicationRedirectDialog);