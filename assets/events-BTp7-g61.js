function o(e){return{all:e=e||new Map,on:function(t,a){var n=e.get(t);n?n.push(a):e.set(t,[a])},off:function(t,a){var n=e.get(t);n&&(a?n.splice(n.indexOf(a)>>>0,1):e.set(t,[]))},emit:function(t,a){var n=e.get(t);n&&n.slice().map(function(r){r(a)}),(n=e.get("*"))&&n.slice().map(function(r){r(t,a)})}}}let s=new o;const i={name:"$events",methods:{all(){return s.all()},on(...e){return s.on(...e)},off(...e){return s.off(...e)},emit(...e){return s.emit(...e)}}};i.__docgenInfo={exportName:"default",displayName:"events",type:1,props:[{name:"key",global:!0,description:"",tags:[],required:!1,type:"PropertyKey",declarations:[],schema:{kind:"enum",type:"PropertyKey",schema:["string","number","symbol"]}},{name:"ref",global:!0,description:"",tags:[],required:!1,type:"VNodeRef",declarations:[],schema:{kind:"enum",type:"VNodeRef",schema:["string","Ref<any, any>",{kind:"event",type:"(ref: Element | ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, ComponentProvideOptions>, ... 4 more ..., any>, refs: Record<...>): void",schema:[]}]}},{name:"ref_for",global:!0,description:"",tags:[],required:!1,type:"boolean",declarations:[],schema:{kind:"enum",type:"boolean",schema:["false","true"]}},{name:"ref_key",global:!0,description:"",tags:[],required:!1,type:"string",declarations:[],schema:"string"},{name:"class",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"},{name:"style",global:!0,description:"",tags:[],required:!1,type:"unknown",declarations:[],schema:"unknown"}],events:[],slots:[],exposed:[],sourceFiles:"/home/runner/work/Vitel/Vitel/services/events.vue"};export{i as _};
