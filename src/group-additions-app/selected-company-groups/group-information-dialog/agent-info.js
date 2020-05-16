import { LitElement, html} from 'lit-element';

class AgentInfo extends LitElement{
    static get properties(){
        return{
            agentInfo : {type: Object},
            hideControl : {type: Boolean},
        };
    }

    render() {
       return html`
        <style>
        .divGroupInfoHeader{
            font-size: 14px;
            text-align : left;
            background: #f5f5f5;
            padding-left: 10px;
        }
        .spanHeader{
            color:#005172;
             font-weight: bold;
              font-size: 16px;
        }
        .td1{
            font-weight: bold; 
            width:120px
        }
        .td3{
            font-weight: bold; 
            padding-left: 10px; 
            width:120px
        }
        .td2{
            padding-left: 2px;
            width:120px
        }
        .td4{
            padding-left: 2px; 
            width:200px;            
        }
        
        </style>
        <div class="divGroupInfoHeader" ?hidden = "${this.hideControl}">
        <span class="spanHeader">Agent</span>
        <table id="agent" ?hidden = "${this.hideControl}">
                <tr>
                    <td class= "td1">Last Name:</td>
                    <td class= "td2">${this.agentInfo.lastName}</td>
                    <td class= "td3">First Name:</td>
                    <td class= "td4">${this.agentInfo.firstName}</td>
                </tr>
                <tr>
                    <td class = "td1">Tax ID:</td>
                    <td class = "td2">${this.agentInfo.taxID}</td>
                    <td class = "td3">License #:</td>
                    <td class = "td4">${this.agentInfo.licenseNumber}</td>                                     
                </tr>
                <tr>
                    <td class = "td1">SSN:</td>
                    <td colspan="3">${this.agentInfo.ssn}</td>                        
                </tr>
            </table>   
            <table>
                <tr>
                    <td class= "td1">Email:</td>
                    <td colspan="3">${this.agentInfo.email}</td>
                </tr>
            </table>         
        </div>
        
        `;
    }

}

customElements.define("agent-info", AgentInfo);