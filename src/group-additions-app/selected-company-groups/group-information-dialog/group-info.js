import { LitElement, html} from 'lit-element';
import '@vaadin/vaadin-icons';

class GroupInfo extends LitElement{
    static get properties(){
        return{
            groupInfo : {type: Object}    
        };
    }
    render() {
       return html`
        <style>
        .divGroupInfoHeader{
            font-size: 14px;
            text-align : left;
            padding-left: 10px; 
            background: #f5f5f5;
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
        .td2{
            padding-left: 2px;
            width:120px
        }
        .td3{
            font-weight: bold; 
            padding-left: 10px; 
            width:120px
        }
        .td4{
            padding-left: 2px; 
            width:200px;            
        }
        </style>

        <div class="divGroupInfoHeader">
        <br>  
        <span class="spanHeader">Group Information</span> 
        <br>         
        
            <table id="groupInfo">
                <tr>
                    <td class = "td1">Group Name:</td>
                    <td colspan="3">${this.groupInfo.groupName}</td>
                </tr>
                 <tr>
                    <td class = "td1">Admin Name:</td>
                    <td colspan="3">${this.groupInfo.groupAdministrator}</td>
                </tr>
                 <tr>
                    <td class = "td1">Admin Email:</td>
                    <td colspan="3">${this.groupInfo.groupAdminEmail}</td>
                </tr>           
                <tr>
                    <td class = "td1">Group #:</td>
                    <td class = "td2">${this.groupInfo.groupNumber}</td>
                    <td class = "td3">Proposal ID:</td>
                    <td class = "td4">${this.groupInfo.proposalId}</td>
                </tr>
                <tr>
                    <td class = "td1">Phone:</td>
                    <td class = "td2">${this.groupInfo.groupPhone}</td>
                    <td class = "td3">Fax:</td>
                    <td class = "td4">${this.groupInfo.groupFax}</td>
                </tr>
                <tr>
                <tr>
                    <td class = "td1">Carrier:</td>
                    <td class = "td2">${this.groupInfo.carrier}</td>
                    <td class = "td3">Anniversary Date:</td>
                    <td class = "td4">${this.groupInfo.initialAnniversaryDate}</td>
                </tr>
                <tr>
                    <td class = "td1">Region:</td>
                    <td class = "td2">${this.groupInfo.region}</td>
                    <td class = "td3">Effective Date:</td>
                    <td class = "td4">${this.groupInfo.groupEffectiveDate}</td>
                </tr>
                <tr>
                    <td class = "td1">Declined Life:</td>
                    <td class = "td2">${this.groupInfo.declinedLife ? "Yes" : "No"}</td>
                    <td class = "td3">Tier Level:</td>
                    <td class = "td4">${this.groupInfo.tierLevel}</td>
                </tr>               
            </table>               
        </div>        
        `;

    }


    attributeChangedCallback(name, oldVal, newVal) {
       if (name === "groupinfo" && newVal !== null && newVal !== undefined) {
               this.groupInfo = JSON.parse(newVal);
       }
       super.attributeChangedCallback(name, oldVal, newVal);
    }
}

customElements.define("group-info", GroupInfo);