import { LitElement, html } from "lit-element"
import '@polymer/iron-ajax/iron-ajax';
import '@vaadin/vaadin-select';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

    class SelectListDynamic extends LitElement {
    static get properties() {
        return {
            placeholder: { type: String },
            required: { type: Boolean },
            url: { type: String },
            itemValuePath: { type: String },
            itemDisplayPath: { type: String },
            selectFirstIfSingleItem: { type: Boolean },
            items: { type: Array, attribute: false },
            selectedValue: { type: String }, 
            autoLoad : {type:Boolean}, 
            addBlankOption : {type: Boolean}, 
            disableCaching : {type: Boolean}, 
            invalid : {type : Boolean}, 
            blankOptionText : {type:String} 
        };
    }
    constructor(){
        super();
        this.blankOptionText = "";
        const myElement = this;
        this.updateComplete.then(() => {
            if(myElement.disableCaching){
                myElement.ironAjax.headers = '{"cache-control": "no-cache, no-store, must-revalidate","pragma":"no-cache","expires":"0"}';
            }
        });
    }
    render() {
        const valuePath = this.itemValuePath;
        const displayPath = this.itemDisplayPath;
        if (this.items != null && this.items != undefined) {
            var vaadinItems = "<template><vaadin-list-box>";
            if(this.addBlankOption){
                vaadinItems += "<vaadin-item value='" + "" + "'>" +  this.blankOptionText + "</vaadin-item>"
            }
            this.items.map(item => {
                vaadinItems += "<vaadin-item value='" + item[valuePath] + "'>"
                    + item[displayPath] + "</vaadin-item>"
            });
            vaadinItems += "</vaadin-list-box></template>";
        }
        
        return html`
            <style>
                :host{
                    width:100%
                }
                .maxWidth{
                    width:100%
                }
            </style>
            <iron-ajax  url="${this.url}" 
                        handle-as ="json" 
                        @response = "${this.apiResponseHandler}"
                        ?auto  = "${this.autoLoad}">
            </iron-ajax>
            <vaadin-select
                        class = "maxWidth"
                        placeholder = "${this.placeholder}"
                        ?required = "${this.required}"
                        @value-changed = "${this.change}"
                        .value = ${this.selectedValue}
                        ?invalid = "${this.invalid}"
                        >
                    ${unsafeHTML(vaadinItems)}
            </vaadin-select>
            </div>
        `;
    }
    get ironAjax() {
        return this.shadowRoot.querySelector("iron-ajax");
    }
    get vaadinSelect(){
        return this.shadowRoot.querySelector("vaadin-select");
    }
    apiResponseHandler(event){
        this.items = event.detail.response;
        
        if(this.selectFirstIfSingleItem && this.addBlankOption && this.items.length === 1 ){
            this.vaadinSelect.value = this.items[0][this.itemValuePath];
        }
        else if(this.selectFirstIfSingleItem && this.items.length === 1){
            this.vaadinSelect.value = this.items[0][this.itemValuePath];
        }
        else if(this.selectedValue !== undefined){            
            this.vaadinSelect.value = this.selectedValue;
        }
        else{
            this.vaadinSelect.value = undefined;
        }
        this.vaadinSelect.removeAttribute("invalid");
    }
    change(event){
        if(event.target.value !== undefined){
            this.selectedValue = event.target.value;
            var changeEvent = new CustomEvent("change",{
                detail:{
                    message:this.selectedValue
                }, 
                bubbles : true,
                composed: true
            });
            this.dispatchEvent(changeEvent);
        }
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "url" && newVal !== "" && newVal !== undefined) {
            if (this.ironAjax !== null && this.ironAjax !== undefined) {
                this.ironAjax.url = newVal;
                this.ironAjax.generateRequest();
            }
        }
        else if(name==="selectedvalue" && newVal !== undefined){
            this.vaadinSelect.value = newVal;
            this.vaadinSelect.removeAttribute("invalid");
        }
        super.attributeChangedCallback(name, oldVal, newVal);
    }
}

customElements.define("select-list-dynamic", SelectListDynamic);