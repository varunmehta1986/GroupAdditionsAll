import { css } from 'lit-element';

export const vaadinCheckboxStyle = css`
    vaadin-checkbox{
        font-family : 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size : 14px;
    }
`;

export const divStyles = css`
    div.error{
        font-family : 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color : red;
        font-size: 14px
    }
    div.formControlGroup{
        padding: 4px
    }
    div.lightGreySmallNote{
        color:Grey; 
        font-size : 13px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    div.controlHeaderDark{
        font-family : 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size:15px;        
        color: white; 
        background: url('/MWG_Apps/images/top_nav_bg_tile.gif') repeat-x;
        height: 25px;
        line-height: 25px;
        border-radius:5px 5px 0px 0px; 
        padding-left: 12px;
    }
    div.simpleHeader{
        font-size : 14px;
        font-family : 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 0px 0px 5px 5x;  
        font-weight: 600
    }
    div.controlHeaderLight{
        font-family : 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size : 15px;
        text-align : center;
        color: white; 
        background: #0099CC;
        height: 20px;
        line-height: 20px;

    }
`;

export const spanStyles = css`
    span.simpleHeader{
        font-size : 14px;
        font-family : 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 0px 0px 5px 5x;  
        font-weight: 600
    }
    span.redHighlight{
        font-size : 11px;
        font-family : 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: rgb(255, 240, 240);
    }
`; 