import { LitElement, html} from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-grid';



class SpecialConsiderationInfo extends LitElement{
    static get properties(){
        return{
            specialConsiderationInfo : {type: Array} ,
            hideSpecialConsideration: {type : Boolean},
            hideNoSpecialConsideration : {type : Boolean}
        };

    }
    render() {
       return html`
       <dom-module id="my-grid" theme-for="vaadin-grid">
        <template>
            <style>
            [part~="header-cell"] {
                background: #f5f5f5;
                font-weight: bold;
                color: black;
            }

            [part~="body-cell"] {
                background: #f5f5f5
            }
            </style>
        </template>
        </dom-module>
        
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
        .spanBody{
            color:red; 
            background: #f5f5f5;
            font-size: 14px;
        }
        </style>

        <div class="divGroupInfoHeader">
        <span class="spanHeader">Special Considerations</span>
        <div style="padding-top: 10px"> 
            <vaadin-vertical-layout theme="spacing-s" >
               <span class="spanBody" ?hidden= "${this.hideNoSpecialConsideration}">There are no special considerations for this group</span>                 
            <vaadin-grid theme="compact  column-borders" 
                        ?hidden= "${this.hideSpecialConsideration}" 
                        .items="${this.specialConsiderationInfo}" height-by-rows 
                        style="width:685px; background:#f5f5f5; font-size:14px">
            <vaadin-grid-column width="200px" path="formNumber" header="Form Number" textAlign="left" style="background:#f5f5f5"></vaadin-grid-column>
            <vaadin-grid-column width="480px"path="description" header="Description" textAlign="left" style="background:#f5f5f5"></vaadin-grid-column>
            </vaadin-grid>  
            </vaadin-vertical-layout> 
         </div>      
        </div>        
        `;

    }


    attributeChangedCallback(name, oldVal, newVal) {
       if (name === "specialconsiderationinfo" && newVal !== null && newVal !== undefined) {
               this.specialConsiderationInfo = JSON.parse(newVal);
               if(this.specialConsiderationInfo.length === 0){
                    this.hideNoSpecialConsideration = false;
                    this.hideSpecialConsideration = true;
               }
               else{
                    this.hideNoSpecialConsideration = true;
                   this.hideSpecialConsideration = false;
               }
       }
       super.attributeChangedCallback(name, oldVal, newVal);
    }
}

customElements.define("special-consideration-info", SpecialConsiderationInfo);