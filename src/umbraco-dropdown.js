 import {LitElement, html, css} from 'lit';
 import {styleMap} from 'lit/directives/style-map.js';

 export class UmbracoDropdown extends LitElement {
   static get styles() {
     return css`
       :host {
         display: block;
         border: solid 1px gray;
         padding: 16px;
         max-width: 800px;
       }
       ul {
         padding: 0;
       }
       li {
         list-style: none;
         transition: all .4s ease-out;
       }
       .dropdown-menu {
         padding: 20px;
         transition: all .4s ease-in;
       }
       .data-item:hover {
         cursor: pointer;
         transform: scale(1.01);
       }
       .data-item {
         padding: 28px 6px;
         margin: 14px 0;
         background-color: #00011A;
         border: 1px solid #FF296D;
         color: #D1F9FF;
       }
       button, button::after {
        width: 300px;
        height: 86px;
        font-size: 40px;
        background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
        border: 0;
        color: #fff;
        letter-spacing: 3px;
        line-height: 88px;
        box-shadow: 6px 0px 0px #00E6F6;
        outline: transparent;
        position: relative;
      }
      button::after {
        --slice-0: inset(50% 50% 50% 50%);
        --slice-1: inset(80% -6px 0 0);
        --slice-2: inset(50% -6px 30% 0);
        --slice-3: inset(10% -6px 85% 0);
        --slice-4: inset(40% -6px 43% 0);
        --slice-5: inset(80% -6px 5% 0);
        Content: 'dropdown';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #FF013C 5%);
        text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
        clip-path: var(--slice-0);
      }
      button:hover::after {
        animation: 1s glitch;
        animation-timing-function: steps(2, end);
      }
      button:hover {
        cursor: pointer;
      }
      @keyframes glitch {
        0% { clip-path: var(--slice-1); transform: translate(-20px, -10px); }
        10% { clip-path: var(--slice-3); transform: translate(10px, 10px); }
        20% { clip-path: var(--slice-1); transform: translate(-10px, 10px); }
        30% { clip-path: var(--slice-3); transform: translate(0px, 5px); }
        40% { clip-path: var(--slice-2); transform: translate(-5px, 0px); }
        50% { clip-path: var(--slice-3); transform: translate(5px, 0px); }
        60% { clip-path: var(--slice-4); transform: translate(5px, 10px); }
        70% { clip-path: var(--slice-2); transform: translate(-10px, 10px); }
        80% { clip-path: var(--slice-5); transform: translate(20px, -10px); }
        90% { clip-path: var(--slice-1); transform: translate(-10px, 0px); }
        100% { clip-path: var(--slice-1); transform: translate(0); }
      }
      input[type="text"].cyberpunk{
        width: calc(100% - 30px);
        border: 30px solid #000;
        border-left: 5px solid #000;
        border-right: 5px solid #000;
        border-bottom: 15px solid #000;
        clip-path: polygon(0px 25px, 26px 0px, calc(60% - 25px) 0px, 60% 25px, 100% 25px, 100% calc(100% - 10px), calc(100% - 15px) calc(100% - 10px), calc(80% - 10px) calc(100% - 10px), calc(80% - 15px) calc(100% - 0px), 10px calc(100% - 0px), 0% calc(100% - 10px));
        padding: 12px;
      }
     `;
   }
 
   static get properties() {
     return {
      buttonText: {type: String},
      show: {type: Boolean},
      dropdownData: {type: Array}
     };
   }
 
   constructor() {
     super();
     this.buttonText = "dropdown";
     this.show = false;
     this.dropdownData = ["Python", "JavaScript", "C#", "Swift", "Java"];
   }

   showContent() {
     this.show = !this.show;
   }

  /* == This is function I'd have liked to use in filterList() and selectedItem() == */
  //  filtering(list, filterValue) {
  //   for (let i = 0; i < list.length; i++ ) {
  //     const dataValue = list[i].innerText;
  //     if (dataValue.toLowerCase().indexOf(filterValue) > -1) {
  //       list[i].style.display = "";
  //       setTimeout(function() {
  //        list[i].style.opacity = 1;
  //      }, 200);
  //     } else {
  //      setTimeout(function() {
  //        list[i].style.display = "none";
  //      }, 200);
  //      list[i].style.opacity = 0;
  //     }
  //   }
  //  }

   selectedItem(event) {
    const currentSelection = event.target.innerText;
    this.shadowRoot.querySelector("#search-field").value = currentSelection;
    /* == This is duplicate code from filterList(). Could be abstracted away or refactored == */
    const lowerCaseInput = event.target.innerText.toLowerCase();
    const list = this.shadowRoot.querySelector(".search-data").children;
    for (let i = 0; i < list.length; i++ ) {
      const dataValue = list[i].innerText;
      if (dataValue.toLowerCase().indexOf(lowerCaseInput) > -1) {
        list[i].style.display = "";
        setTimeout(function() {
         list[i].style.opacity = 1;
       }, 200);
      } else {
       setTimeout(function() {
         list[i].style.display = "none";
       }, 200);
       list[i].style.opacity = 0;
      }
    }
   }

   filterList(event) {
     const lowerCaseInput = event.target.value.toLowerCase();
     const list = this.shadowRoot.querySelector(".search-data").children;
     for (let i = 0; i < list.length; i++ ) {
       const dataValue = list[i].innerText;
       //check that one of the letters matches one of the letters in the input
       if (dataValue.toLowerCase().indexOf(lowerCaseInput) > -1) {
         list[i].style.display = "";
         setTimeout(function() {
          list[i].style.opacity = 1;
        }, 200);
       } else {
        setTimeout(function() {
          list[i].style.display = "none";
        }, 200);
        list[i].style.opacity = 0;
       }
     }
   }
 
   render() {
     const styles = {
       display: this.show ? "block" : "none"
     }

     return html`
     <div class="dropdown-container">
       <button id="dropdown-button" @click=${this.showContent}>${this.buttonText}</button>
        <div class="dropdown-menu" style=${styleMap(styles)}>
          <!-- input field-->
          <label for="search field"></label>
          <input type="text" class="cyberpunk" id="search-field" @keyup=${this.filterList} placeholder="search"/>
          <ul class="search-data">
            <!-- search data item -->
            ${this.dropdownData.map((item, index) => {
              return html`<li class="data-item" data-item-id=${index} @click=${this.selectedItem}> ${item} </li>`
            })}
         </ul>
       </div>
     </div>
     `;
   }
 }
 
 window.customElements.define('umbraco-dropdown', UmbracoDropdown);