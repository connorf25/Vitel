import{c as q,a as et}from"./_commonjsHelpers-C4iS2aBk.js";import{r as tt}from"./index-Bfav9528.js";import{e as nt,b as rt,d as ot,f as st,g as it,_ as at}from"./http-BXV5vmy8.js";import{a as ne}from"./_baseSlice-BD4yksuF.js";import{b as ut}from"./_baseIteratee-Cn0AXMFV.js";import{k as ct,f as lt,V as pt}from"./vitel-De4LWFz0.js";import{a as Be}from"./isArrayLike-DYVE1Yub.js";import{i as pe}from"./isSymbol-C1qQj8zB.js";import{i as dt}from"./isArray-Dxzbedgu.js";import{i as de}from"./_isIterateeCall-B847D5xG.js";import{c as fe,e as j,w as ft,K as gt,a as mt,t as ht,f as yt,r as Et,o as ge}from"./vue.esm-bundler-CIUkA9VC.js";import{_ as bt}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-BCAj_bCp.js";import{s as _t}from"./entry-preview-BsfXFv1X.js";import"./popper-Bnif2dgu.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./isObjectLike-Dipz0mOK.js";function wt(l,u){return l&&nt(l,u,ct)}function At(l,u){return function(o,s){if(o==null)return o;if(!Be(o))return l(o,s);for(var i=o.length,t=u?i:-1,e=Object(o);(u?t--:++t<i)&&s(e[t],t,e)!==!1;);return o}}var Tt=At(wt);function Ct(l,u){var o=-1,s=Be(l)?Array(l.length):[];return Tt(l,function(i,t,e){s[++o]=u(i,t,e)}),s}function Nt(l,u){var o=l.length;for(l.sort(u);o--;)l[o]=l[o].value;return l}function Ot(l,u){if(l!==u){var o=l!==void 0,s=l===null,i=l===l,t=pe(l),e=u!==void 0,r=u===null,m=u===u,c=pe(u);if(!r&&!c&&!t&&l>u||t&&e&&m&&!r&&!c||s&&e&&m||!o&&m||!i)return 1;if(!s&&!t&&!c&&l<u||c&&o&&i&&!s&&!t||r&&o&&i||!e&&i||!m)return-1}return 0}function vt(l,u,o){for(var s=-1,i=l.criteria,t=u.criteria,e=i.length,r=o.length;++s<e;){var m=Ot(i[s],t[s]);if(m){if(s>=r)return m;var c=o[s];return m*(c=="desc"?-1:1)}}return l.index-u.index}function Dt(l,u,o){u.length?u=ne(u,function(t){return dt(t)?function(e){return rt(e,t.length===1?t[0]:t)}:t}):u=[ot];var s=-1;u=ne(u,lt(ut));var i=Ct(l,function(t,e,r){var m=ne(u,function(c){return c(t)});return{criteria:m,index:++s,value:t}});return Nt(i,function(t,e){return vt(t,e,o)})}var me=st(function(l,u){if(l==null)return[];var o=u.length;return o>1&&de(l,u[0],u[1])?u=[]:o>2&&de(u[0],u[1],u[2])&&(u=[u[0]]),Dt(l,it(u,1),[])}),Ve={exports:{}},re={exports:{}},oe={exports:{}};/*!
  * Bootstrap data.js v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var he;function St(){return he||(he=1,function(l,u){(function(o,s){l.exports=s()})(q,function(){const o=new Map;return{set(i,t,e){o.has(i)||o.set(i,new Map);const r=o.get(i);if(!r.has(t)&&r.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);return}r.set(t,e)},get(i,t){return o.has(i)&&o.get(i).get(t)||null},remove(i,t){if(!o.has(i))return;const e=o.get(i);e.delete(t),e.size===0&&o.delete(i)}}})}(oe)),oe.exports}var se={exports:{}},Q={exports:{}};/*!
  * Bootstrap index.js v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var ye;function Y(){return ye||(ye=1,function(l,u){(function(o,s){s(u)})(q,function(o){const t="transitionend",e=n=>(n&&window.CSS&&window.CSS.escape&&(n=n.replace(/#([^\s"#']+)/g,(f,p)=>`#${CSS.escape(p)}`)),n),r=n=>n==null?`${n}`:Object.prototype.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase(),m=n=>{do n+=Math.floor(Math.random()*1e6);while(document.getElementById(n));return n},c=n=>{if(!n)return 0;let{transitionDuration:f,transitionDelay:p}=window.getComputedStyle(n);const b=Number.parseFloat(f),_=Number.parseFloat(p);return!b&&!_?0:(f=f.split(",")[0],p=p.split(",")[0],(Number.parseFloat(f)+Number.parseFloat(p))*1e3)},T=n=>{n.dispatchEvent(new Event(t))},v=n=>!n||typeof n!="object"?!1:(typeof n.jquery<"u"&&(n=n[0]),typeof n.nodeType<"u"),D=n=>v(n)?n.jquery?n[0]:n:typeof n=="string"&&n.length>0?document.querySelector(e(n)):null,$=n=>{if(!v(n)||n.getClientRects().length===0)return!1;const f=getComputedStyle(n).getPropertyValue("visibility")==="visible",p=n.closest("details:not([open])");if(!p)return f;if(p!==n){const b=n.closest("summary");if(b&&b.parentNode!==p||b===null)return!1}return f},K=n=>!n||n.nodeType!==Node.ELEMENT_NODE||n.classList.contains("disabled")?!0:typeof n.disabled<"u"?n.disabled:n.hasAttribute("disabled")&&n.getAttribute("disabled")!=="false",L=n=>{if(!document.documentElement.attachShadow)return null;if(typeof n.getRootNode=="function"){const f=n.getRootNode();return f instanceof ShadowRoot?f:null}return n instanceof ShadowRoot?n:n.parentNode?L(n.parentNode):null},H=()=>{},R=n=>{n.offsetHeight},U=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,P=[],k=n=>{document.readyState==="loading"?(P.length||document.addEventListener("DOMContentLoaded",()=>{for(const f of P)f()}),P.push(n)):n()},I=()=>document.documentElement.dir==="rtl",g=n=>{k(()=>{const f=U();if(f){const p=n.NAME,b=f.fn[p];f.fn[p]=n.jQueryInterface,f.fn[p].Constructor=n,f.fn[p].noConflict=()=>(f.fn[p]=b,n.jQueryInterface)}})},d=(n,f=[],p=n)=>typeof n=="function"?n(...f):p,h=(n,f,p=!0)=>{if(!p){d(n);return}const _=c(f)+5;let A=!1;const w=({target:M})=>{M===f&&(A=!0,f.removeEventListener(t,w),d(n))};f.addEventListener(t,w),setTimeout(()=>{A||T(f)},_)},y=(n,f,p,b)=>{const _=n.length;let A=n.indexOf(f);return A===-1?!p&&b?n[_-1]:n[0]:(A+=p?1:-1,b&&(A=(A+_)%_),n[Math.max(0,Math.min(A,_-1))])};o.defineJQueryPlugin=g,o.execute=d,o.executeAfterTransition=h,o.findShadowRoot=L,o.getElement=D,o.getNextActiveElement=y,o.getTransitionDurationFromElement=c,o.getUID=m,o.getjQuery=U,o.isDisabled=K,o.isElement=v,o.isRTL=I,o.isVisible=$,o.noop=H,o.onDOMContentLoaded=k,o.parseSelector=e,o.reflow=R,o.toType=r,o.triggerTransitionEnd=T,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})})}(Q,Q.exports)),Q.exports}/*!
  * Bootstrap event-handler.js v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var Ee;function Ke(){return Ee||(Ee=1,function(l,u){(function(o,s){l.exports=s(Y())})(q,function(o){const s=/[^.]*(?=\..*)\.|.*/,i=/\..*/,t=/::\d+$/,e={};let r=1;const m={mouseenter:"mouseover",mouseleave:"mouseout"},c=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function T(g,d){return d&&`${d}::${r++}`||g.uidEvent||r++}function v(g){const d=T(g);return g.uidEvent=d,e[d]=e[d]||{},e[d]}function D(g,d){return function h(y){return I(y,{delegateTarget:g}),h.oneOff&&k.off(g,y.type,d),d.apply(g,[y])}}function $(g,d,h){return function y(n){const f=g.querySelectorAll(d);for(let{target:p}=n;p&&p!==this;p=p.parentNode)for(const b of f)if(b===p)return I(n,{delegateTarget:p}),y.oneOff&&k.off(g,n.type,d,h),h.apply(p,[n])}}function K(g,d,h=null){return Object.values(g).find(y=>y.callable===d&&y.delegationSelector===h)}function L(g,d,h){const y=typeof d=="string",n=y?h:d||h;let f=P(g);return c.has(f)||(f=g),[y,n,f]}function H(g,d,h,y,n){if(typeof d!="string"||!g)return;let[f,p,b]=L(d,h,y);d in m&&(p=(te=>function(x){if(!x.relatedTarget||x.relatedTarget!==x.delegateTarget&&!x.delegateTarget.contains(x.relatedTarget))return te.call(this,x)})(p));const _=v(g),A=_[b]||(_[b]={}),w=K(A,p,f?h:null);if(w){w.oneOff=w.oneOff&&n;return}const M=T(p,d.replace(s,"")),N=f?$(g,h,p):D(g,p);N.delegationSelector=f?h:null,N.callable=p,N.oneOff=n,N.uidEvent=M,A[M]=N,g.addEventListener(b,N,f)}function R(g,d,h,y,n){const f=K(d[h],y,n);f&&(g.removeEventListener(h,f,!!n),delete d[h][f.uidEvent])}function U(g,d,h,y){const n=d[h]||{};for(const[f,p]of Object.entries(n))f.includes(y)&&R(g,d,h,p.callable,p.delegationSelector)}function P(g){return g=g.replace(i,""),m[g]||g}const k={on(g,d,h,y){H(g,d,h,y,!1)},one(g,d,h,y){H(g,d,h,y,!0)},off(g,d,h,y){if(typeof d!="string"||!g)return;const[n,f,p]=L(d,h,y),b=p!==d,_=v(g),A=_[p]||{},w=d.startsWith(".");if(typeof f<"u"){if(!Object.keys(A).length)return;R(g,_,p,f,n?h:null);return}if(w)for(const M of Object.keys(_))U(g,_,M,d.slice(1));for(const[M,N]of Object.entries(A)){const W=M.replace(t,"");(!b||d.includes(W))&&R(g,_,p,N.callable,N.delegationSelector)}},trigger(g,d,h){if(typeof d!="string"||!g)return null;const y=o.getjQuery(),n=P(d),f=d!==n;let p=null,b=!0,_=!0,A=!1;f&&y&&(p=y.Event(d,h),y(g).trigger(p),b=!p.isPropagationStopped(),_=!p.isImmediatePropagationStopped(),A=p.isDefaultPrevented());const w=I(new Event(d,{bubbles:b,cancelable:!0}),h);return A&&w.preventDefault(),_&&g.dispatchEvent(w),w.defaultPrevented&&p&&p.preventDefault(),w}};function I(g,d={}){for(const[h,y]of Object.entries(d))try{g[h]=y}catch{Object.defineProperty(g,h,{configurable:!0,get(){return y}})}return g}return k})}(se)),se.exports}var ie={exports:{}},ae={exports:{}};/*!
  * Bootstrap manipulator.js v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var be;function He(){return be||(be=1,function(l,u){(function(o,s){l.exports=s()})(q,function(){function o(t){if(t==="true")return!0;if(t==="false")return!1;if(t===Number(t).toString())return Number(t);if(t===""||t==="null")return null;if(typeof t!="string")return t;try{return JSON.parse(decodeURIComponent(t))}catch{return t}}function s(t){return t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}return{setDataAttribute(t,e,r){t.setAttribute(`data-bs-${s(e)}`,r)},removeDataAttribute(t,e){t.removeAttribute(`data-bs-${s(e)}`)},getDataAttributes(t){if(!t)return{};const e={},r=Object.keys(t.dataset).filter(m=>m.startsWith("bs")&&!m.startsWith("bsConfig"));for(const m of r){let c=m.replace(/^bs/,"");c=c.charAt(0).toLowerCase()+c.slice(1,c.length),e[c]=o(t.dataset[m])}return e},getDataAttribute(t,e){return o(t.getAttribute(`data-bs-${s(e)}`))}}})}(ae)),ae.exports}/*!
  * Bootstrap config.js v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var _e;function Mt(){return _e||(_e=1,function(l,u){(function(o,s){l.exports=s(He(),Y())})(q,function(o,s){class i{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(e,r){const m=s.isElement(r)?o.getDataAttribute(r,"config"):{};return{...this.constructor.Default,...typeof m=="object"?m:{},...s.isElement(r)?o.getDataAttributes(r):{},...typeof e=="object"?e:{}}}_typeCheckConfig(e,r=this.constructor.DefaultType){for(const[m,c]of Object.entries(r)){const T=e[m],v=s.isElement(T)?"element":s.toType(T);if(!new RegExp(c).test(v))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${m}" provided type "${v}" but expected type "${c}".`)}}}return i})}(ie)),ie.exports}/*!
  * Bootstrap base-component.js v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var we;function Lt(){return we||(we=1,function(l,u){(function(o,s){l.exports=s(St(),Ke(),Mt(),Y())})(q,function(o,s,i,t){const e="5.3.3";class r extends i{constructor(c,T){super(),c=t.getElement(c),c&&(this._element=c,this._config=this._getConfig(T),o.set(this._element,this.constructor.DATA_KEY,this))}dispose(){o.remove(this._element,this.constructor.DATA_KEY),s.off(this._element,this.constructor.EVENT_KEY);for(const c of Object.getOwnPropertyNames(this))this[c]=null}_queueCallback(c,T,v=!0){t.executeAfterTransition(c,T,v)}_getConfig(c){return c=this._mergeConfigObj(c,this._element),c=this._configAfterMerge(c),this._typeCheckConfig(c),c}static getInstance(c){return o.get(t.getElement(c),this.DATA_KEY)}static getOrCreateInstance(c,T={}){return this.getInstance(c)||new this(c,typeof T=="object"?T:null)}static get VERSION(){return e}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(c){return`${c}${this.EVENT_KEY}`}}return r})}(re)),re.exports}var ue={exports:{}};/*!
  * Bootstrap selector-engine.js v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var Ae;function Rt(){return Ae||(Ae=1,function(l,u){(function(o,s){l.exports=s(Y())})(q,function(o){const s=t=>{let e=t.getAttribute("data-bs-target");if(!e||e==="#"){let r=t.getAttribute("href");if(!r||!r.includes("#")&&!r.startsWith("."))return null;r.includes("#")&&!r.startsWith("#")&&(r=`#${r.split("#")[1]}`),e=r&&r!=="#"?r.trim():null}return e?e.split(",").map(r=>o.parseSelector(r)).join(","):null},i={find(t,e=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(e,t))},findOne(t,e=document.documentElement){return Element.prototype.querySelector.call(e,t)},children(t,e){return[].concat(...t.children).filter(r=>r.matches(e))},parents(t,e){const r=[];let m=t.parentNode.closest(e);for(;m;)r.push(m),m=m.parentNode.closest(e);return r},prev(t,e){let r=t.previousElementSibling;for(;r;){if(r.matches(e))return[r];r=r.previousElementSibling}return[]},next(t,e){let r=t.nextElementSibling;for(;r;){if(r.matches(e))return[r];r=r.nextElementSibling}return[]},focusableChildren(t){const e=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(r=>`${r}:not([tabindex^="-"])`).join(",");return this.find(e,t).filter(r=>!o.isDisabled(r)&&o.isVisible(r))},getSelectorFromElement(t){const e=s(t);return e&&i.findOne(e)?e:null},getElementFromSelector(t){const e=s(t);return e?i.findOne(e):null},getMultipleElementsFromSelector(t){const e=s(t);return e?i.find(e):[]}};return i})}(ue)),ue.exports}/*!
  * Bootstrap dropdown.js v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */(function(l,u){(function(o,s){l.exports=s(tt,Lt(),Ke(),He(),Rt(),Y())})(q,function(o,s,i,t,e,r){function m(B){const a=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(B){for(const E in B)if(E!=="default"){const C=Object.getOwnPropertyDescriptor(B,E);Object.defineProperty(a,E,C.get?C:{enumerable:!0,get:()=>B[E]})}}return a.default=B,Object.freeze(a)}const c=m(o),T="dropdown",D=".bs.dropdown",$=".data-api",K="Escape",L="Tab",H="ArrowUp",R="ArrowDown",U=2,P=`hide${D}`,k=`hidden${D}`,I=`show${D}`,g=`shown${D}`,d=`click${D}${$}`,h=`keydown${D}${$}`,y=`keyup${D}${$}`,n="show",f="dropup",p="dropend",b="dropstart",_="dropup-center",A="dropdown-center",w='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',M=`${w}.${n}`,N=".dropdown-menu",W=".navbar",te=".navbar-nav",x=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",Fe=r.isRTL()?"top-end":"top-start",Ye=r.isRTL()?"top-start":"top-end",We=r.isRTL()?"bottom-end":"bottom-start",je=r.isRTL()?"bottom-start":"bottom-end",Qe=r.isRTL()?"left-start":"right-start",Ge=r.isRTL()?"right-start":"left-start",ze="top",Je="bottom",Xe={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},Ze={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class S extends s{constructor(a,E){super(a,E),this._popper=null,this._parent=this._element.parentNode,this._menu=e.next(this._element,N)[0]||e.prev(this._element,N)[0]||e.findOne(N,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return Xe}static get DefaultType(){return Ze}static get NAME(){return T}toggle(){return this._isShown()?this.hide():this.show()}show(){if(r.isDisabled(this._element)||this._isShown())return;const a={relatedTarget:this._element};if(!i.trigger(this._element,I,a).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(te))for(const C of[].concat(...document.body.children))i.on(C,"mouseover",r.noop);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(n),this._element.classList.add(n),i.trigger(this._element,g,a)}}hide(){if(r.isDisabled(this._element)||!this._isShown())return;const a={relatedTarget:this._element};this._completeHide(a)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(a){if(!i.trigger(this._element,P,a).defaultPrevented){if("ontouchstart"in document.documentElement)for(const C of[].concat(...document.body.children))i.off(C,"mouseover",r.noop);this._popper&&this._popper.destroy(),this._menu.classList.remove(n),this._element.classList.remove(n),this._element.setAttribute("aria-expanded","false"),t.removeDataAttribute(this._menu,"popper"),i.trigger(this._element,k,a)}}_getConfig(a){if(a=super._getConfig(a),typeof a.reference=="object"&&!r.isElement(a.reference)&&typeof a.reference.getBoundingClientRect!="function")throw new TypeError(`${T.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return a}_createPopper(){if(typeof c>"u")throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let a=this._element;this._config.reference==="parent"?a=this._parent:r.isElement(this._config.reference)?a=r.getElement(this._config.reference):typeof this._config.reference=="object"&&(a=this._config.reference);const E=this._getPopperConfig();this._popper=c.createPopper(a,this._menu,E)}_isShown(){return this._menu.classList.contains(n)}_getPlacement(){const a=this._parent;if(a.classList.contains(p))return Qe;if(a.classList.contains(b))return Ge;if(a.classList.contains(_))return ze;if(a.classList.contains(A))return Je;const E=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return a.classList.contains(f)?E?Ye:Fe:E?je:We}_detectNavbar(){return this._element.closest(W)!==null}_getOffset(){const{offset:a}=this._config;return typeof a=="string"?a.split(",").map(E=>Number.parseInt(E,10)):typeof a=="function"?E=>a(E,this._element):a}_getPopperConfig(){const a={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(t.setDataAttribute(this._menu,"popper","static"),a.modifiers=[{name:"applyStyles",enabled:!1}]),{...a,...r.execute(this._config.popperConfig,[a])}}_selectMenuItem({key:a,target:E}){const C=e.find(x,this._menu).filter(O=>r.isVisible(O));C.length&&r.getNextActiveElement(C,E,a===R,!C.includes(E)).focus()}static jQueryInterface(a){return this.each(function(){const E=S.getOrCreateInstance(this,a);if(typeof a=="string"){if(typeof E[a]>"u")throw new TypeError(`No method named "${a}"`);E[a]()}})}static clearMenus(a){if(a.button===U||a.type==="keyup"&&a.key!==L)return;const E=e.find(M);for(const C of E){const O=S.getInstance(C);if(!O||O._config.autoClose===!1)continue;const F=a.composedPath(),V=F.includes(O._menu);if(F.includes(O._element)||O._config.autoClose==="inside"&&!V||O._config.autoClose==="outside"&&V||O._menu.contains(a.target)&&(a.type==="keyup"&&a.key===L||/input|select|option|textarea|form/i.test(a.target.tagName)))continue;const le={relatedTarget:O._element};a.type==="click"&&(le.clickEvent=a),O._completeHide(le)}}static dataApiKeydownHandler(a){const E=/input|textarea/i.test(a.target.tagName),C=a.key===K,O=[H,R].includes(a.key);if(!O&&!C||E&&!C)return;a.preventDefault();const F=this.matches(w)?this:e.prev(this,w)[0]||e.next(this,w)[0]||e.findOne(w,a.delegateTarget.parentNode),V=S.getOrCreateInstance(F);if(O){a.stopPropagation(),V.show(),V._selectMenuItem(a);return}V._isShown()&&(a.stopPropagation(),V.hide(),F.focus())}}return i.on(document,h,w,S.dataApiKeydownHandler),i.on(document,h,N,S.dataApiKeydownHandler),i.on(document,d,S.clearMenus),i.on(document,y,S.clearMenus),i.on(document,d,w,function(B){B.preventDefault(),S.getOrCreateInstance(this).toggle()}),r.defineJQueryPlugin(S),S})})(Ve);var Pt=Ve.exports;const kt=et(Pt);function ce(l){return l.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")}let Te=function(u,o){if(!u.parentElement)return console.log("Cannot render yet - no parent element");let s={options:[],query:null,filter:!1,sort:!1,label:e=>e,labelHighlighter(e){let r=e?new RegExp("("+e.trim().split(/\s/).map(c=>ce(c)).join("|")+")","gi"):null,m=new RegExp(`</${s.labelHighlightTag}>(\\s+)<${s.labelHighlightTag}>`,"g");return c=>r?c.replace(r,`<${s.labelHighlightTag}>$1</${s.labelHighlightTag}>`).replace(m,"$1"):c},labelHighlightTag:"strong",labelEmpty:e=>`<em>No matching results for "${e}"</em>`,dropdown:{autoClose:!1,popperConfig:{placement:"bottom-start"}},events:{async input(e){console.log("INPUT",e),s.query=e.target.value,await t.refreshOptions(),await t.toggleDropdown(!0)},async click(e){console.log("CLICK",e),await t.toggleDropdown(!0)},async keyup(e){s.keyHandlers[e.key]&&(console.log("KEY HANDLER",e.key),await s.keyHandlers[e.key]())}},keyHandlers:{async ArrowDown(){++i.highlighted>=i.options.length&&(i.highlighted=0),await t.renderOptions(),await t.toggleDropdown(!0)},async ArrowUp(){--i.highlighted<0&&(i.highlighted=i.options.length-1),await t.renderOptions(),await t.toggleDropdown(!0)},async Escape(){await t.toggleDropdown(!1)},async Enter(){await t.select()}},change(e){console.log("Change event called from v-autocomplete but no 'change' function to receieve it")},...typeof o.value=="function"||Array.isArray(o.value)?{options:o.value}:typeof o.value=="object"?o.value:{}},i={options:null,dropdownMenuEl:null,dropdownMenuBS:null,highlighted:0},t={refreshOptions(){return Promise.resolve().then(()=>{if(Array.isArray(s.options))return s.options;if(typeof s.options=="function")return Promise.resolve().then(()=>s.options(s.query)).then(e=>{if(Array.isArray(e))return e;if(typeof e=="object")return this.$http.request(e).then(({data:r})=>r);throw new Error("Unknown async response type `options` - expected an Array or AxiosRequest")});throw new Error("Unknown data type for `options` - expected an Array or Function")}).then(e=>{if(s.filter){let r=new RegExp("("+s.query.trim().split(/\s/).map(m=>ce(m)).join("|")+")","gi");return e.filter(m=>r.test(s.label(m)))}else return e}).then(e=>s.sort===!0?me(e,r=>s.label(r)):s.sort?me(e,s.sort):e).then(e=>i.options=e||[]).then(()=>t.renderOptions())},async renderOptions(){Array.isArray(i.options)||await t.refreshOptions();let e=s.labelHighlighter(s.query);if(i.options.length==0){let r=document.createElement("div");r.classList.add("dropdown-header"),r.innerHTML=s.labelEmpty(s.query),i.dropdownMenuEl.replaceChildren(r)}else i.dropdownMenuEl.replaceChildren(...i.options.map((r,m)=>{let c=document.createElement("a");return c.classList.add("dropdown-item"),c.classList.toggle("active",m==i.highlighted),c.innerHTML=e(s.label(r)),c.addEventListener("click",()=>t.select(m)),c}))},toggleDropdown(e="toggle"){return i.dropdownMenuBS[e===!0?"show":e===!1?"hide":"toggle"]()},async select(e){console.log("SELECT!",e),e!==void 0&&(i.highlighted=e),await t.toggleDropdown(!1),console.log("SETTING OPTION",i.options[i.highlighted]),await s.change(i.options[i.highlighted])}};i.dropdownMenuEl=u.parentElement.querySelector(".dropdown-menu"),i.dropdownMenuEl||(i.dropdownMenuEl=document.createElement("div"),i.dropdownMenuEl.classList.add("dropdown-menu"),u.after(i.dropdownMenuEl),Object.entries(s.events).forEach(([e,r])=>u.addEventListener(e,r,{passive:!0}))),i.dropdownMenuBS||(i.dropdownMenuBS=new kt(u,s.dropdown)),s.query===null&&(s.query=u.value),t.refreshOptions()};const xt={mounted:Te,updated:Te},Ue={directives:{autocomplete:xt},data(){return{value:""}},props:{settings:{type:Object,required:!0}}},qt={class:"form-floating mb-3"},$t={key:0},It={class:"border rounded p-1"};function Bt(l,u,o,s,i,t){const e=Et("autocomplete");return ge(),fe("form",null,[j("div",qt,[ft(j("input",{id:"exampleAutocomplete","onUpdate:modelValue":u[0]||(u[0]=r=>i.value=r),type:"text",class:"form-control",placeholder:"Select something from the list..."},null,512),[[gt,i.value],[e,{...o.settings,change:r=>i.value=r}]]),u[1]||(u[1]=j("label",{for:"exampleAutocomplete",class:"form-label"},"Example input",-1))]),i.value?(ge(),fe("p",$t,[u[2]||(u[2]=mt("Raw value: ")),j("code",It,ht(i.value),1)])):yt("",!0)])}const Vt=bt(Ue,[["render",Bt]]);Ue.__docgenInfo={exportName:"default",displayName:"v-autocomplete.demo",type:1,props:[{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey",declarations:[],schema:{kind:"enum",type:"PropertyKey",schema:["string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef",declarations:[],schema:{kind:"enum",type:"VNodeRef",schema:["string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any>, refs: Record<...>): void",schema:[]}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean",declarations:[],schema:{kind:"enum",type:"boolean",schema:["false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string",declarations:[],schema:"string"},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"settings",global:!1,description:"",tags:[],required:!0,type:"Record<string, any>",declarations:[],schema:"Record<string, any>"}],events:[],slots:[],exposed:[{name:"settings",type:"Record<string, any>",description:"",declarations:[],schema:"Record<string, any>"},{name:"value",type:"string",description:"",declarations:[],schema:"string"}],sourceFiles:"/home/runner/work/Vitel/Vitel/directives/v-autocomplete.demo.vue"};let ee=["Foo","Bar","Baz","Qux","Quux","Flarp","Corge","Grault","Garply","Waldo","Fred","Plugh","Xyzzy","Thud"];const on={title:"Directives/v-autocomplete",component:Vt,tags:["autodocs"]};_t(l=>{l.use(pt),l.service("$http",at,{debug:!0})});const G={args:{settings:{options:ee}}},z={args:{settings:{options:ee,filter:!0}}},J={args:{settings:{options:ee,filter:!0,sort:!0}}},X={args:{settings:{options(l){let u=new RegExp("("+l.split(/\s+/).map(o=>ce(o)).join("|")+")","i");return ee.filter(o=>u.test(o))}}}},Z={args:{settings:{options(l){return{method:"GET",url:"https://api.github.com/search/users",params:{q:l}}}}}};var Ce,Ne,Oe;G.parameters={...G.parameters,docs:{...(Ce=G.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    settings: {
      options: metasyntactic
    }
  }
}`,...(Oe=(Ne=G.parameters)==null?void 0:Ne.docs)==null?void 0:Oe.source}}};var ve,De,Se;z.parameters={...z.parameters,docs:{...(ve=z.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    settings: {
      options: metasyntactic,
      filter: true
    }
  }
}`,...(Se=(De=z.parameters)==null?void 0:De.docs)==null?void 0:Se.source}}};var Me,Le,Re;J.parameters={...J.parameters,docs:{...(Me=J.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  args: {
    settings: {
      options: metasyntactic,
      filter: true,
      sort: true
    }
  }
}`,...(Re=(Le=J.parameters)==null?void 0:Le.docs)==null?void 0:Re.source}}};var Pe,ke,xe;X.parameters={...X.parameters,docs:{...(Pe=X.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    settings: {
      options(query) {
        let queryRE = new RegExp(
        // Make a RegExp for each word. e.g. 'Hello World' => /(hello|world)/i
        '(' + query.split(/\\s+/).map(word => RegExpEscape(word)).join('|') + ')', 'i');
        return metasyntactic.filter(term => queryRE.test(term));
      }
    }
  }
}`,...(xe=(ke=X.parameters)==null?void 0:ke.docs)==null?void 0:xe.source}}};var qe,$e,Ie;Z.parameters={...Z.parameters,docs:{...(qe=Z.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  args: {
    settings: {
      options(query) {
        return {
          method: 'GET',
          url: 'https://api.github.com/search/users',
          params: {
            q: query
          }
        };
      }
    }
  }
}`,...(Ie=($e=Z.parameters)==null?void 0:$e.docs)==null?void 0:Ie.source}}};const sn=["SimpleArray","SimpleArrayWithFiltering","SimpleArrayWithFilteringAndSort","AsyncCallback","AxiosRequest"];export{X as AsyncCallback,Z as AxiosRequest,G as SimpleArray,z as SimpleArrayWithFiltering,J as SimpleArrayWithFilteringAndSort,sn as __namedExportsOrder,on as default};
