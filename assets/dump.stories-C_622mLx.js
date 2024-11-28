import{a as N}from"./_commonjsHelpers-C4iS2aBk.js";import{c as m,t as x,o as g}from"./vue.esm-bundler-CIUkA9VC.js";import{_ as z}from"./_plugin-vue_export-helper-DlAUqK2U.js";var y="    ";function j(e){var r="";return e&&Object.keys(e).forEach(function(t){r+=t+":"+e[t]+";"}),r}function I(e){function r(a){return'class="'+a+'"'}function t(a){return'style="'+j(e["."+a])+'"'}return e?t:r}function D(e){return e===null?"null":Array.isArray(e)?"array":typeof e=="string"&&/^https?:/.test(e)?"link":typeof e=="object"&&typeof e.toISOString=="function"?"date":typeof e}function i(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;")}var F=function(e,r){var t="",a=I(r),d=function(n,l,s,S){if(!n.length)return l+" "+s;var f=l+`
`;return t+=y,n.forEach(function(q,E){f+=t+S(q)+(E<n.length-1?",":"")+`
`}),t=t.slice(0,-y.length),f+t+s};function o(n){if(n===void 0)return"";switch(D(n)){case"boolean":return"<span "+a("json-markup-bool")+">"+n+"</span>";case"number":return"<span "+a("json-markup-number")+">"+n+"</span>";case"date":return'<span class="json-markup-string">"'+i(n.toISOString())+'"</span>';case"null":return"<span "+a("json-markup-null")+">null</span>";case"string":return"<span "+a("json-markup-string")+'>"'+i(n.replace(/\n/g,`
`+t))+'"</span>';case"link":return"<span "+a("json-markup-string")+'>"<a href="'+i(n)+'">'+i(n)+'</a>"</span>';case"array":return d(n,"[","]",o);case"object":var l=Object.keys(n).filter(function(s){return n[s]!==void 0});return d(l,"{","}",function(s){return"<span "+a("json-markup-key")+'>"'+i(s)+'":</span> '+o(n[s])})}return""}return"<div "+a("json-markup")+">"+o(e)+"</div>"};const H=N(F),R={props:{highlight:{type:Boolean,default:!0},value:{type:[Object,Array]}},methods:{markup:H}},M={class:"dump"},P={key:0},V=["innerHTML"];function A(e,r,t,a,d,o){return g(),m("div",M,[t.highlight?(g(),m("div",{key:1,innerHTML:o.markup(t.value)},null,8,V)):(g(),m("pre",P,x(t.value),1))])}const T=z(R,[["render",A]]);R.__docgenInfo={exportName:"default",displayName:"dump",type:1,props:[{name:"highlight",global:!1,description:"",tags:[],required:!1,type:"boolean",declarations:[],schema:{kind:"enum",type:"boolean",schema:["false","true"]},default:"true"},{name:"value",global:!1,description:"",tags:[],required:!1,type:"Record<string, any> | unknown[]",declarations:[],schema:{kind:"enum",type:"Record<string, any> | unknown[]",schema:["Record<string, any>",{kind:"array",type:"unknown[]",schema:["unknown"]}]}},{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey",declarations:[],schema:{kind:"enum",type:"PropertyKey",schema:["string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef",declarations:[],schema:{kind:"enum",type:"VNodeRef",schema:["string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any>, refs: Record<...>): void",schema:[]}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean",declarations:[],schema:{kind:"enum",type:"boolean",schema:["false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string",declarations:[],schema:"string"},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[],slots:[],exposed:[{name:"highlight",type:"boolean",description:"",declarations:[],schema:{kind:"enum",type:"boolean",schema:["false","true"]}},{name:"value",type:"Record<string, any> | unknown[]",description:"",declarations:[],schema:{kind:"enum",type:"Record<string, any> | unknown[]",schema:["Record<string, any>",{kind:"array",type:"unknown[]",schema:["unknown"]}]}}],sourceFiles:"/home/runner/work/Vitel/Vitel/components/dump.vue"};const G={title:"Components/Dump",component:T,tags:["autodocs"]},u={args:{value:{foo:1,bar:2,baz:3}}},c={args:{value:[{title:"Foo widget",value:123},{title:"Bar widget",value:456},{title:"Baz widget",value:789}]}},p={args:{highlight:!1,value:[{title:"Foo widget",value:123},{title:"Bar widget",value:456},{title:"Baz widget",value:789}]}};var h,k,v;u.parameters={...u.parameters,docs:{...(h=u.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    value: {
      foo: 1,
      bar: 2,
      baz: 3
    }
  }
}`,...(v=(k=u.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var w,_,b;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    value: [{
      title: 'Foo widget',
      value: 123
    }, {
      title: 'Bar widget',
      value: 456
    }, {
      title: 'Baz widget',
      value: 789
    }]
  }
}`,...(b=(_=c.parameters)==null?void 0:_.docs)==null?void 0:b.source}}};var B,O,C;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    highlight: false,
    value: [{
      title: 'Foo widget',
      value: 123
    }, {
      title: 'Bar widget',
      value: 456
    }, {
      title: 'Baz widget',
      value: 789
    }]
  }
}`,...(C=(O=p.parameters)==null?void 0:O.docs)==null?void 0:C.source}}};const J=["Object","Collection","CollectionNoHighlight"];export{c as Collection,p as CollectionNoHighlight,u as Object,J as __namedExportsOrder,G as default};
