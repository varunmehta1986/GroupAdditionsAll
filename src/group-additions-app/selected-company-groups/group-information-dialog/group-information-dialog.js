import { LitElement, html} from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import './group-info';
import './marketing-rep-Info';
import './agent-info';
import './special-consideration-info';
import '@vaadin/vaadin-dialog/vaadin-dialog';
import '@vaadin/vaadin-icons';


class GroupInformation extends LitElement{
    static get properties(){
        return{
            groupInfo : {type: Object},
            errorNotificationMessage: { type: String },
        };
    }
    render() {
       return html`
       <style>
        .divGroupInformationHeader{
            font-family :  -apple-system, BlinkMacSystemFont, Roboto,
                            "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";            
            width: 700px
        }
        </style>

        <vaadin-dialog class ="divGroupInformationHeader">
        </vaadin-dialog>
        `;
    }


    get dialog() {
        return this.shadowRoot.querySelector("vaadin-dialog");
    }
    
    open() {
        const myElement = this;
        this.dialog.renderer = function (root, dialog) {
            const mainDiv = window.document.createElement('div');
            mainDiv.setAttribute("style", "width: 700px; border-color: #005172; border-radius: 5px 5px 0px 0px; border-style: solid; background: #f5f5f5;");
            const verticalLayout = window.document.createElement('vaadin-vertical-layout');
            verticalLayout.setAttribute("theme", "spacing-l");
            verticalLayout.setAttribute("style", "width: 700px; background: #f5f5f5;");
            
            const titleBar =  window.document.createElement('div');
            titleBar.setAttribute("style", "width: 700px; background: #f5f5f5;");
            
            var icon = window.document.createElement('iron-icon');
            icon.setAttribute("icon", "vaadin:close-small");
            icon.setAttribute("style", "float: right; width:25px; margin-right:10px; color:red; cursor: pointer");
            titleBar.appendChild(icon);            
            
            mainDiv.appendChild(titleBar);

            if(myElement.groupInfo !== undefined && myElement.groupInfo !== null && myElement.groupInfo !== "{}"){
                const groupInfoElement = window.document.createElement('group-info');
                groupInfoElement.setAttribute("groupinfo", JSON.stringify(myElement.groupInfo));           

                verticalLayout.appendChild(groupInfoElement);
                           
                const specialConsiderationElement = window.document.createElement('special-consideration-info');
                specialConsiderationElement.setAttribute("specialconsiderationinfo", JSON.stringify(myElement.groupInfo.specialConsiderations));
                verticalLayout.appendChild(specialConsiderationElement);    

                const marktRepElement = window.document.createElement('marketing-rep-info');
                marktRepElement.setAttribute("marketrepinfo", JSON.stringify(myElement.groupInfo.representative));
                
                verticalLayout.appendChild(marktRepElement);
                const agentElement = window.document.createElement('agent-info');
                if(myElement.groupInfo.agent.lastName !== null && myElement.groupInfo.agent.ssn !== null &&
                    myElement.groupInfo.agent.taxId !== null && myElement.groupInfo.agent.licenseNumber !== null )
                {
                    agentElement.setAttribute("agentinfo", JSON.stringify(myElement.groupInfo.agent));
                    verticalLayout.appendChild(agentElement);   
                }

                mainDiv.appendChild(verticalLayout);
                titleBar.addEventListener("click", function(){
                    myElement.dialog.opened = false;});
                }                
               
            root.appendChild(mainDiv);

            
        };
        this.dialog.opened = true;
    }


    attributeChangedCallback(name, oldVal, newVal) {
       if (name === "groupinfo" && newVal !== null && newVal !== undefined) {
           this.groupInfo = JSON.parse(newVal);          
        }
       super.attributeChangedCallback(name, oldVal, newVal);
    }


}

customElements.define("group-information-dialog", GroupInformation);