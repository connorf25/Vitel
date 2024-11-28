function t(e,r={}){var a,u;arguments.length==3?[e,r]=[null,{value:e,singular:r,...arguments[2]}]:typeof e=="object"?[e,r]=[null,e]:isFinite(e)&&typeof r=="string"?[e,r]=[null,{value:e,singular:r}]:isFinite(e)?[e,r]=[null,{...r,value:e}]:typeof e=="string"&&([e,r]=[null,{...r,singular:e}]);let l={value:10,singular:void 0,plural:void 0,...r};if(!l.singular)throw new Error("Singular must be provided");let i;if(i=(a=/^(?<prefix>.*?)\[(?<modifier>.+?)\](?<suffix>.*)$/.exec(l.singular))==null?void 0:a.groups)if(/\|/.test(i.modifier)){let s=i.modifier.split(/\s*\|\s*/,2);Object.assign(l,{singular:i.prefix+s[0]+i.suffix,plural:i.prefix+s[1]+i.suffix})}else Object.assign(l,{singular:i.prefix+i.suffix,plural:i.prefix+i.modifier+i.suffix});else(i=(u=/^(?<singular>.*)\|(?<plural>.*)$/.exec(l.singular))==null?void 0:u.groups)&&Object.assign(l,i);if(!l.plural){let s=o.find(([n])=>n.test(l.singular));if(!s)throw new Error(`No valid pluralization rule found for the singular "${l.singular}"`);l.plural=l.singular.replace(s[0],s[1])}return(l.prefix?l.value+" ":"")+(l.value==1?l.singular:l.plural)}let o=[[/[^aeiou]y$|quy$/i,e=>e.substr(0,e.length-1)+"ies"],[/x$|ch$|s$/i,e=>e+"es"],[/nucleus|syllabus|focus|fungus|cactus/i,e=>e.substr(0,e.length-2)+"i"],[/thesis|crisis/i,e=>e.substr(0,e.length-2)+"es"],[/appendix|index/i,e=>e.substr(0,e.length-2)+"ices"],[/[aeiouy]o$/i,e=>e+"s"],[/[^aeiouy]o$/i,e=>e+"es"],[/(fe?$)/i,(e,r)=>e==="dwarf"||e==="roof"?e+"s":e.replace(r,"ves")],[/^criterion$/,"criteria"],[/^bacterium$/,"bacteria"],[/^memo$/,"memos"],[/^cello$/,"cellos"],[/^die$/,"dice"],[/^goose$/,"geese"],[/^mouse$/,"mice"],[/^person$/,"people"],[/^chilli$/,"chillies"],[/^(?:wo)?man$/i,e=>e.replace(/a/,"e")],[/\b(?:bison|cod|deer|fowl|halibut|moose|sheep)\b/i,e=>e],(()=>{let e=Object.values({tools:["goggle","scissor","plier","tong","tweezer"],clothes:["trouser","pant","pantie","clothe"],games:["billiard","bowl","card","dart","skittle","draught"],illnesses:["diabete","measle","mump","rabie","ricket","shingle"],misc:["kudo","premise","shamble","glasse","spectacle","jitter","alm","fece","bowel","sud","entrail","electronic","outskirt","odd","tropic","riche","surrounding","thank","heroic","remain","amend"]}).flat();return[new RegExp("\\b(?:"+e.join("|")+")s\\b","i"),r=>r]})(),[/ics$/i,e=>e],[/\b(?:tea|sugar|water|air|rice|knowledge|beauty|anger|fear|love|money|research|safety|evidence)\b/i,e=>e],[/$/,"s"]];function g(e,r){let l={parser:s=>s.replace(/[^\d\.]+/g,""),prefix:null,suffix:null,valueIfZero:null,...typeof r=="string"?{suffix:r}:r},i=typeof e=="number"?e:l.parser(e);if(i==0&&l.valueIfZero)return l.valueIfZero;let a=f(l.prefix),u=f(l.suffix);return[a?typeof a=="string"?a:t(i,a):null,e,u?typeof u=="string"?u:t(i,u):null].filter(Boolean).join(" ")}function f(e){var l;let r;return typeof e=="object"?e:typeof e=="string"&&(r=(l=/\[(?<singular>.*?)\|(?<plural>.*?)\]/.exec(e))==null?void 0:l.groups)?{singular:r.singular,plural:r.plural}:e||""}export{g as F};
