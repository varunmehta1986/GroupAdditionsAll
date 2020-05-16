import { LitElement, html} from 'lit-element';

class MarketingRepInfo extends LitElement{
    static get properties(){
        return{
            marketRepInfo : {type: Object}  
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
        .td2{
            padding-left: 2px; 
            width:120px;            
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
        <span class="spanHeader">Marketing Rep</span>  
            <table id="marketRep">
                <tr>
                    <td class= "td1">Last Name:</td>
                    <td class= "td2">${this.marketRepInfo.lastName}</td>
                    <td class= "td3">First Name:</td>
                    <td class= "td4">${this.marketRepInfo.firstName}</td>
                </tr>
                <tr>
                    <td class= "td1">Tax ID:</td>
                    <td class= "td2">${this.marketRepInfo.taxID}</td>
                    <td class= "td3">License #:</td>
                    <td class= "td4">${this.marketRepInfo.licenseNumber}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td class= "td1">Email:</td>
                    <td colspan="3">${this.marketRepInfo.email}</td>
                </tr>
            </table>
      
        </div>
        
        `;

    }
    
    attributeChangedCallback(name, oldVal, newVal) {
       if (name === "marketrepinfo" && newVal !== null && newVal !== undefined) {
            this.marketRepInfo = JSON.parse(newVal);     
        }
       super.attributeChangedCallback(name, oldVal, newVal);
    }
}

customElements.define("marketing-rep-info", MarketingRepInfo);