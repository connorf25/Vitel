import{D as i}from"./date-Bhin10Pf.js";import"./vue.esm-bundler-CIUkA9VC.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const v={title:"Components/Date",component:i,tags:["autodocs"],argTypes:{display:{control:"select",options:["auto","relative","date"]},localeDateStyle:{control:"select",options:["full","long","medium","short"]},localeTimeStyle:{control:"select",options:["full","long","medium","short"]},relativeCutoff:{control:{type:"number",min:0,step:1e3*6e3}}}},e={args:{value:new Date(Date.now()-1e3*60*2)}},a={args:{value:new Date("2023-01-23T10:00:23")}},t={args:{value:"2023-02-27T12:13:45"}};var o,r,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    value: new Date(Date.now() - 1000 * 60 * 2) //~ Now - 2m
  }
}`,...(s=(r=e.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};var n,l,c;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    value: new Date('2023-01-23T10:00:23')
  }
}`,...(c=(l=a.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var u,m,p;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    value: '2023-02-27T12:13:45'
  }
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const w=["RelativeValue","DateValue","StringValue"];export{a as DateValue,e as RelativeValue,t as StringValue,w as __namedExportsOrder,v as default};
