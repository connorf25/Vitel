import"./index-BCAj_bCp.js";import{_ as c}from"./toast-Dy2nnG-1.js";import{V as g}from"./vitel-De4LWFz0.js";import{c as y,e as s,a as $,o as v}from"./vue.esm-bundler-CIUkA9VC.js";import{_ as f}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{s as k}from"./entry-preview-BsfXFv1X.js";import"./isArrayLike-DYVE1Yub.js";import"./isObjectLike-Dipz0mOK.js";import"./isArray-Dxzbedgu.js";const u={data(){return{toastId:null,Error}},methods:{testNotifyPromise(o=!0){let t=new Promise((r,n)=>{setTimeout(()=>{this.$toast.promisify("Waiting 3 seconds...",t)}),setTimeout(()=>o?r("Yey!"):n("Oops!"),3e3)})}}},b={class:"card mb-2"},C={class:"card-body"},I={class:"list-group"},E={class:"card mb-2"},w={class:"card-body"},P={class:"list-group"},V={class:"card mb-2"},N={class:"card-body"},S={class:"list-group"},T={class:"card"},B={class:"card-body"},W={class:"list-group"};function j(o,t,r,n,i,l){return v(),y("div",null,[s("div",b,[t[22]||(t[22]=s("div",{class:"card-header"},"Simple toasts",-1)),s("div",C,[t[21]||(t[21]=s("p",null,[s("a",{href:"https://github.com/jerrywu001/vue3-toastify",target:"_blank"},"Vue3-Toastify"),$(" wrapper for Vue with some additional functionality "),s("ul",null,[s("li",null,"Promise wrappers"),s("li",null,"Update wrapper"),s("li",null,"Close functionality"),s("li",null,"Generic 'catch' function to handle misc errors")])],-1)),s("div",I,[s("a",{onClick:t[0]||(t[0]=e=>o.$toast.create("Hello World")),class:"list-group-item list-group-item-action"},"$toast.create('Hello World')"),s("a",{onClick:t[1]||(t[1]=e=>o.$toast.success("Success!")),class:"list-group-item list-group-item-action"},"$toast.success('Success!')"),s("a",{onClick:t[2]||(t[2]=e=>o.$toast.warn("Warn!")),class:"list-group-item list-group-item-action"},"$toast.warn('Warn!')"),s("a",{onClick:t[3]||(t[3]=e=>o.$toast.error("Error!")),class:"list-group-item list-group-item-action"},"$toast.error('Error!')")])])]),s("div",E,[t[23]||(t[23]=s("div",{class:"card-header"},"Error catching via $toast.catch()",-1)),s("div",w,[s("div",P,[s("a",{onClick:t[4]||(t[4]=e=>o.$toast.catch("Error String")),class:"list-group-item list-group-item-action"},"$toast.catch('Error String')"),s("a",{onClick:t[5]||(t[5]=e=>o.$toast.catch({error:"Object string"})),class:"list-group-item list-group-item-action"},"$toast.catch({error: 'Object string'})"),s("a",{onClick:t[6]||(t[6]=e=>o.$toast.catch(new Error("Error object"))),class:"list-group-item list-group-item-action"},"$toast.catch(new Error('Error object'))"),s("a",{onClick:t[7]||(t[7]=e=>o.$toast.catch()),class:"list-group-item list-group-item-action"},"$toast.catch() (generic errors)"),s("a",{onClick:t[8]||(t[8]=e=>o.$toast.catch("SKIP")),class:"list-group-item list-group-item-action"},"$toast.catch('SKIP') (ignored)"),s("a",{onClick:t[9]||(t[9]=e=>o.$toast.catch("cancel")),class:"list-group-item list-group-item-action"},"$toast.catch('cancel') (ignored)")])])]),s("div",V,[t[24]||(t[24]=s("div",{class:"card-header"},"Promisables",-1)),s("div",N,[s("div",S,[s("a",{onClick:t[10]||(t[10]=e=>l.testNotifyPromise(!0)),class:"list-group-item list-group-item-action"},"$toast.promise('Waiting 3 seconds', PromiseThatResolves)"),s("a",{onClick:t[11]||(t[11]=e=>l.testNotifyPromise(!1)),class:"list-group-item list-group-item-action"},"$toast.promise('Waiting 3 seconds', PromiseThatRejects)")])])]),s("div",T,[t[25]||(t[25]=s("div",{class:"card-header"},"Update by ID",-1)),s("div",B,[s("div",W,[s("a",{onClick:t[12]||(t[12]=e=>i.toastId=o.$toast.loading("Foo")),class:"list-group-item list-group-item-action"},"let toastId = $toast.loading('Foo')"),s("a",{onClick:t[13]||(t[13]=e=>o.$toast.update(i.toastId,"Bar")),class:"list-group-item list-group-item-action"},"$toast.update(toastId, 'Bar')"),s("a",{onClick:t[14]||(t[14]=e=>o.$toast.update(i.toastId,{progress:.25})),class:"list-group-item list-group-item-action"},"$toast.update(toastId, {progress: 0.25})"),s("a",{onClick:t[15]||(t[15]=e=>o.$toast.update(i.toastId,{progress:.5})),class:"list-group-item list-group-item-action"},"$toast.update(toastId, {progress: 0.5})"),s("a",{onClick:t[16]||(t[16]=e=>o.$toast.update(i.toastId,{progress:1})),class:"list-group-item list-group-item-action"},"$toast.update(toastId, {progress: 1})"),s("a",{onClick:t[17]||(t[17]=e=>o.$toast.update(i.toastId,"Baz",{isLoading:!1,type:"warning"})),class:"list-group-item list-group-item-action"},"$toast.update(toastId, 'Baz', {isLoading: false, type: 'warning'})"),s("a",{onClick:t[18]||(t[18]=e=>o.$toast.update(i.toastId,{isLoading:!1,type:"success"})),class:"list-group-item list-group-item-action"},"$toast.update(toastId, {isLoading: false, type: 'success'})"),s("a",{onClick:t[19]||(t[19]=e=>o.$toast.closable(i.toastId)),class:"list-group-item list-group-item-action"},"$toast.closable(toastId)"),s("a",{onClick:t[20]||(t[20]=e=>o.$toast.close(i.toastId)),class:"list-group-item list-group-item-action"},"$toast.close(toastId)")])])])])}const q=f(u,[["render",j]]);u.__docgenInfo={exportName:"default",displayName:"toast.demo",type:1,props:[{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey",declarations:[],schema:{kind:"enum",type:"PropertyKey",schema:["string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef",declarations:[],schema:{kind:"enum",type:"VNodeRef",schema:["string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any>, refs: Record<...>): void",schema:[]}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean",declarations:[],schema:{kind:"enum",type:"boolean",schema:["false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string",declarations:[],schema:"string"},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[],slots:[],exposed:[{name:"toastId",type:"any",description:"",declarations:[],schema:"any"},{name:"Error",type:"ErrorConstructor",description:"",declarations:[],schema:{kind:"event",type:"(message?: string): Error",schema:[]}}],sourceFiles:"/home/runner/work/Vitel/Vitel/services/toast.demo.vue"};k(o=>{o.use(g),o.service("$toast",c)});const U={title:"Services/Toast",component:q,tags:["autodocs"],argTypes:{}},a={};var d,p,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const G=["Example"];export{a as Example,G as __namedExportsOrder,U as default};
