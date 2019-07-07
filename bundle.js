var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function a(e){e.forEach(t)}function l(e){return"function"==typeof e}function i(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function o(e,t){e.appendChild(t)}function c(e,t,n){e.insertBefore(t,n||null)}function s(e){e.parentNode.removeChild(e)}function r(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function u(e){return document.createElement(e)}function v(e){return document.createTextNode(e)}function d(){return v(" ")}function f(){return v("")}function p(e,t,n,a){return e.addEventListener(t,n,a),()=>e.removeEventListener(t,n,a)}function g(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function m(e,t){t=""+t,e.data!==t&&(e.data=t)}function h(e,t,n){e.style.setProperty(t,n)}let b;function y(e){b=e}function C(e){(function(){if(!b)throw new Error("Function called outside component initialization");return b})().$$.on_mount.push(e)}const k=[],x=[],w=[],D=[],A=Promise.resolve();let I=!1;function $(e){w.push(e)}function j(){const e=new Set;do{for(;k.length;){const e=k.shift();y(e),_(e.$$)}for(;x.length;)x.pop()();for(;w.length;){const t=w.pop();e.has(t)||(t(),e.add(t))}}while(k.length);for(;D.length;)D.pop()();I=!1}function _(e){e.fragment&&(e.update(e.dirty),a(e.before_render),e.fragment.p(e.dirty,e.ctx),e.dirty=null,e.after_render.forEach($))}const T=new Set;let W;function E(){W={remaining:0,callbacks:[]}}function L(){W.remaining||a(W.callbacks)}function V(e,t){e&&e.i&&(T.delete(e),e.i(t))}function R(e,t,n){if(e&&e.o){if(T.has(e))return;T.add(e),W.callbacks.push(()=>{T.delete(e),n&&(e.d(1),n())}),e.o(t)}}const N="undefined"!=typeof window?window:global;function G(e,n,i){const{fragment:o,on_mount:c,on_destroy:s,after_render:r}=e.$$;o.m(n,i),$(()=>{const n=c.map(t).filter(l);s?s.push(...n):a(n),e.$$.on_mount=[]}),r.forEach($)}function S(e,t){e.$$.fragment&&(a(e.$$.on_destroy),e.$$.fragment.d(t),e.$$.on_destroy=e.$$.fragment=null,e.$$.ctx={})}function z(e,t){e.$$.dirty||(k.push(e),I||(I=!0,A.then(j)),e.$$.dirty=n()),e.$$.dirty[t]=!0}function H(t,l,i,o,c,s){const r=b;y(t);const u=l.props||{},v=t.$$={fragment:null,ctx:null,props:s,update:e,not_equal:c,bound:n(),on_mount:[],on_destroy:[],before_render:[],after_render:[],context:new Map(r?r.$$.context:[]),callbacks:n(),dirty:null};let d=!1;var f;v.ctx=i?i(t,u,(e,n)=>{v.ctx&&c(v.ctx[e],v.ctx[e]=n)&&(v.bound[e]&&v.bound[e](n),d&&z(t,e))}):u,v.update(),d=!0,a(v.before_render),v.fragment=o(v.ctx),l.target&&(l.hydrate?v.fragment.l((f=l.target,Array.from(f.childNodes))):v.fragment.c(),l.intro&&V(t.$$.fragment),G(t,l.target,l.anchor),j()),y(r)}class O{$destroy(){S(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(){}}const{document:F}=N;function q(e,t,n){const a=Object.create(e);return a.checkedNode=t[n],a}function M(e,t,n){const a=Object.create(e);return a.node=t[n],a}function B(e,t,n){const a=Object.create(e);return a.violation=t[n],a.i=n,a}function P(e,t,n){const a=Object.create(e);return a.rule=t[n],a}function X(e,t,n){const a=Object.create(e);return a.checkVal=t[n],a}function J(e){var t,n,a,l,i,v,f,m,b;function y(){return e.click_handler(e)}for(var C=e.checkVal.ruleText,k=[],x=0;x<C.length;x+=1)k[x]=K(P(e,C,x));return{c(){t=u("div"),n=u("div"),(a=u("a")).textContent="X",l=d(),(i=u("div")).innerHTML="<strong>Rules in this:</strong>",v=d(),f=u("div"),m=u("ul");for(var e=0;e<k.length;e+=1)k[e].c();g(a,"href","javascript:void(0)"),h(n,"float","right"),h(m,"list-style","initial"),h(f,"clear","both"),g(t,"class","help-text-popup svelte-1jvv2yg"),b=p(a,"click",y)},m(e,s){c(e,t,s),o(t,n),o(n,a),o(t,l),o(t,i),o(t,v),o(t,f),o(f,m);for(var r=0;r<k.length;r+=1)k[r].m(m,null)},p(t,n){if(e=n,t.basicChecks){C=e.checkVal.ruleText;for(var a=0;a<C.length;a+=1){const n=P(e,C,a);k[a]?k[a].p(t,n):(k[a]=K(n),k[a].c(),k[a].m(m,null))}for(;a<k.length;a+=1)k[a].d(1);k.length=C.length}},d(e){e&&s(t),r(k,e),b()}}}function K(e){var t,n,a=e.rule;return{c(){t=u("li"),n=v(a)},m(e,a){c(e,t,a),o(t,n)},p(e,t){e.basicChecks&&a!==(a=t.rule)&&m(n,a)},d(e){e&&s(t)}}}function Q(e){var t,n=e.checkVal.passes;return{c(){t=v(n)},m(e,n){c(e,t,n)},p(e,a){e.basicChecks&&n!==(n=a.checkVal.passes)&&m(t,n)},d(e){e&&s(t)}}}function U(e){var t,n=e.checkVal.violations;return{c(){t=v(n)},m(e,n){c(e,t,n)},p(e,a){e.basicChecks&&n!==(n=a.checkVal.violations)&&m(t,n)},d(e){e&&s(t)}}}function Y(e){var t,n,a,l,i,r,f,m,b,y,C,k,x=e.helpTextFlags[e.checkVal.type]&&J(e);function w(){return e.mouseover_handler(e)}var D=e.checkVal.passes>-1&&Q(e),A=e.checkVal.violations>-1&&U(e);return{c(){t=u("div"),x&&x.c(),n=d(),a=u("i"),i=d(),r=u("div"),f=v("Passed: \n                        "),D&&D.c(),m=d(),b=u("div"),y=v("Violated: \n                        "),A&&A.c(),C=d(),g(a,"class",l="fas "+e.checkVal.icon+" svelte-1jvv2yg"),h(t,"float","left"),h(t,"padding","15px"),k=p(a,"mouseover",w)},m(e,l){c(e,t,l),x&&x.m(t,null),o(t,n),o(t,a),o(t,i),o(t,r),o(r,f),D&&D.m(r,null),o(t,m),o(t,b),o(b,y),A&&A.m(b,null),o(t,C)},p(i,o){(e=o).helpTextFlags[e.checkVal.type]?x?x.p(i,e):((x=J(e)).c(),x.m(t,n)):x&&(x.d(1),x=null),i.basicChecks&&l!==(l="fas "+e.checkVal.icon+" svelte-1jvv2yg")&&g(a,"class",l),e.checkVal.passes>-1?D?D.p(i,e):((D=Q(e)).c(),D.m(r,null)):D&&(D.d(1),D=null),e.checkVal.violations>-1?A?A.p(i,e):((A=U(e)).c(),A.m(b,null)):A&&(A.d(1),A=null)},d(e){e&&s(t),x&&x.d(),D&&D.d(),A&&A.d(),k()}}}function Z(e){for(var t,n=e.violation.nodes,a=[],l=0;l<n.length;l+=1)a[l]=te(M(e,n,l));return{c(){for(var e=0;e<a.length;e+=1)a[e].c();t=f()},m(e,n){for(var l=0;l<a.length;l+=1)a[l].m(e,n);c(e,t,n)},p(e,l){if(e.levelData){n=l.violation.nodes;for(var i=0;i<n.length;i+=1){const o=M(l,n,i);a[i]?a[i].p(e,o):(a[i]=te(o),a[i].c(),a[i].m(t.parentNode,t))}for(;i<a.length;i+=1)a[i].d(1);a.length=n.length}},d(e){r(a,e),e&&s(t)}}}function ee(e){var t,n,a,l,i,r=e.checkedNode.message;return{c(){t=u("li"),n=u("i"),a=d(),l=v(r),i=d(),h(n,"font-size","6px"),h(n,"padding-left","10px"),g(n,"class","fas fa-minus")},m(e,s){c(e,t,s),o(t,n),o(t,a),o(t,l),o(t,i)},p(e,t){e.levelData&&r!==(r=t.checkedNode.message)&&m(l,r)},d(e){e&&s(t)}}}function te(e){var t,n,l,i,f,b,y,C,k,x,w,D,A,I,$,j,_,T,W,E,L,V,R,N=e.node.impact,G=e.node.target;function S(){return e.click_handler_2(e)}function z(){return e.click_handler_3(e)}function H(){return e.click_handler_4(e)}for(var O=!1,F=e.node.any,M=[],B=0;B<F.length;B+=1)M[B]=ee(q(e,F,B));return{c(){t=u("div"),n=u("div"),l=v("Impact: "),i=v(N),f=d(),b=u("div"),y=v("Target: \n                                "),C=u("a"),k=u("code"),x=v(G),w=d(),(D=u("a")).textContent="Show html",A=d(),(I=u("a")).textContent="Go to element",$=d(),O&&O.c(),j=d(),_=u("div"),T=v("Fix this:"),W=u("br"),E=d(),L=u("ul");for(var e=0;e<M.length;e+=1)M[e].c();V=d(),g(k,"class","svelte-1jvv2yg"),g(C,"href","javascript:void(0)"),g(C,"class","svelte-1jvv2yg"),h(D,"padding","10px"),g(D,"href","javascript:void(0)"),g(D,"class","svelte-1jvv2yg"),g(I,"href","javascript:void(0)"),g(I,"class","svelte-1jvv2yg"),g(t,"class","violation-node svelte-1jvv2yg"),R=[p(C,"click",S),p(D,"click",z),p(I,"click",H)]},m(e,a){c(e,t,a),o(t,n),o(n,l),o(n,i),o(t,f),o(t,b),o(b,y),o(b,C),o(C,k),o(k,x),o(b,w),o(b,D),o(b,A),o(b,I),o(t,$),O&&O.m(t,null),o(t,j),o(t,_),o(_,T),o(_,W),o(_,E),o(_,L);for(var s=0;s<M.length;s+=1)M[s].m(L,null);o(t,V)},p(t,n){if(e=n,t.levelData&&N!==(N=e.node.impact)&&m(i,N),t.levelData&&G!==(G=e.node.target)&&m(x,G),O&&(O.d(1),O=null),t.levelData){F=e.node.any;for(var a=0;a<F.length;a+=1){const n=q(e,F,a);M[a]?M[a].p(t,n):(M[a]=ee(n),M[a].c(),M[a].m(L,null))}for(;a<M.length;a+=1)M[a].d(1);M.length=F.length}},d(e){e&&s(t),O&&O.d(),r(M,e),a(R)}}}function ne(e){var t,n,a,l,i,r,f,h,b,y,C,k=e.violation.help;function x(){return e.click_handler_1(e)}var w=e.isViolationDetailsSelected&&e.selectedViolationIdx===e.i&&Z(e);return{c(){t=u("div"),n=u("div"),a=u("i"),l=d(),i=u("strong"),r=v(k),f=d(),(h=u("a")).textContent="Details",b=d(),w&&w.c(),y=d(),g(a,"class","fas fa-angle-right"),g(h,"href","javascript:void(0)"),g(h,"class","svelte-1jvv2yg"),g(t,"class","level-violations svelte-1jvv2yg"),C=p(h,"click",x)},m(e,s){c(e,t,s),o(t,n),o(n,a),o(n,l),o(n,i),o(i,r),o(n,f),o(n,h),o(t,b),w&&w.m(t,null),o(t,y)},p(n,a){e=a,n.levelData&&k!==(k=e.violation.help)&&m(r,k),e.isViolationDetailsSelected&&e.selectedViolationIdx===e.i?w?w.p(n,e):((w=Z(e)).c(),w.m(t,y)):w&&(w.d(1),w=null)},d(e){e&&s(t),w&&w.d(),C()}}}function ae(t){for(var n,a,l,i,f,p,b,y,C,k,x,w,D,A,I,$,j,_,T,W,E,L,V,R,N,G,S,z,H,O,F,q,M,P,J,K,Q,U,Z,ee,te,ae,le,ie,oe,ce=t.levelData.heading,se=t.levelData.subheading,re=t.levelData.violations.length,ue=t.basicChecks,ve=[],de=0;de<ue.length;de+=1)ve[de]=Y(X(t,ue,de));var fe=t.levelData.violations,pe=[];for(de=0;de<fe.length;de+=1)pe[de]=ne(B(t,fe,de));return{c(){n=u("div"),a=u("div"),l=u("div"),i=u("div"),f=v(ce),p=d(),b=u("div"),y=v(se),C=d(),k=u("div"),x=u("a"),w=u("img"),j=d(),_=u("div"),T=u("ul"),W=u("li"),E=v("This tool runs "),L=v(t.confirmanceRulesCount),V=v(" rules for this level"),R=d(),N=u("li"),G=v("Only "),S=v(t.pageApplicableRulesCount),z=v(" out of the "),H=v(t.confirmanceRulesCount),O=v(" rules apply to this page"),F=d(),q=u("div"),M=u("div");for(var e=0;e<ve.length;e+=1)ve[e].c();P=d(),J=u("div"),K=u("span"),Q=u("i"),U=d(),Z=u("strong"),ee=v(t.totalNodes),te=v(" html elements with "),ae=u("strong"),le=v(re),ie=v(" violations"),oe=d();for(e=0;e<pe.length;e+=1)pe[e].c();g(w,"height","32"),g(w,"width","88"),g(w,"src",D=t.levelData.logo),g(w,"alt",A=t.levelData.alt),g(x,"href",I=t.levelData.link),g(x,"target","_blank"),g(x,"title",$=t.levelData.title),g(l,"class","media-block-left svelte-1jvv2yg"),g(T,"class","svelte-1jvv2yg"),g(_,"class","media-block-right svelte-1jvv2yg"),g(a,"class","media-block svelte-1jvv2yg"),g(M,"class","basic-checks-icon svelte-1jvv2yg"),g(Q,"class","fas fa-exclamation-circle"),h(J,"clear","both"),g(q,"class","level-description svelte-1jvv2yg"),g(n,"class","level-container svelte-1jvv2yg")},m(e,t){c(e,n,t),o(n,a),o(a,l),o(l,i),o(i,f),o(l,p),o(l,b),o(b,y),o(l,C),o(l,k),o(k,x),o(x,w),o(a,j),o(a,_),o(_,T),o(T,W),o(W,E),o(W,L),o(W,V),o(T,R),o(T,N),o(N,G),o(N,S),o(N,z),o(N,H),o(N,O),o(n,F),o(n,q),o(q,M);for(var s=0;s<ve.length;s+=1)ve[s].m(M,null);o(q,P),o(q,J),o(J,K),o(K,Q),o(K,U),o(K,Z),o(Z,ee),o(K,te),o(K,ae),o(ae,le),o(K,ie),o(q,oe);for(s=0;s<pe.length;s+=1)pe[s].m(q,null)},p(e,t){if(e.levelData&&ce!==(ce=t.levelData.heading)&&m(f,ce),e.levelData&&se!==(se=t.levelData.subheading)&&m(y,se),e.levelData&&D!==(D=t.levelData.logo)&&g(w,"src",D),e.levelData&&A!==(A=t.levelData.alt)&&g(w,"alt",A),e.levelData&&I!==(I=t.levelData.link)&&g(x,"href",I),e.levelData&&$!==($=t.levelData.title)&&g(x,"title",$),e.confirmanceRulesCount&&m(L,t.confirmanceRulesCount),e.pageApplicableRulesCount&&m(S,t.pageApplicableRulesCount),e.confirmanceRulesCount&&m(H,t.confirmanceRulesCount),e.basicChecks||e.helpTextFlags){ue=t.basicChecks;for(var n=0;n<ue.length;n+=1){const a=X(t,ue,n);ve[n]?ve[n].p(e,a):(ve[n]=Y(a),ve[n].c(),ve[n].m(M,null))}for(;n<ve.length;n+=1)ve[n].d(1);ve.length=ue.length}if(e.totalNodes&&m(ee,t.totalNodes),e.levelData&&re!==(re=t.levelData.violations.length)&&m(le,re),e.isViolationDetailsSelected||e.selectedViolationIdx||e.levelData){fe=t.levelData.violations;for(n=0;n<fe.length;n+=1){const a=B(t,fe,n);pe[n]?pe[n].p(e,a):(pe[n]=ne(a),pe[n].c(),pe[n].m(q,null))}for(;n<pe.length;n+=1)pe[n].d(1);pe.length=fe.length}},i:e,o:e,d(e){e&&s(n),r(ve,e),r(pe,e)}}}function le(e){const t=document.querySelectorAll(".visua11y-annotate-bg");for(let e=0;e<t.length;e++)t[e].className=t[e].className.replace(" visua11y-annotate-bg","");if(e){const t=document.querySelector(e);t&&(t.className=t.className+" visua11y-annotate-bg",t.scrollIntoView())}}function ie(e,t,n){let{levelData:a}=t;const l=[{type:"images",scanTags:{type:"rule",values:["image-alt","image-redundant-alt"]},icon:"fa-images",ruleText:[],scanData:{},passes:0,violations:0},{type:"links",scanTags:{type:"rule",values:["button-name","link-name","link-in-text-block"]},icon:"fa-link",ruleText:[],scanData:{},passes:0,violations:0},{type:"heading",scanTags:{type:"rule",values:["heading-order"]},icon:"fa-heading",ruleText:[],scanData:{},passes:0,violations:0},{type:"roles",scanTags:{type:"rule",values:["aria-roles","aria-allowed-attr","aria-allowed-role","aria-required-attr","aria-valid-attr","aria-valid-attr-name"]},icon:"fa-registered",ruleText:[],scanData:{},passes:0,violations:0}];let i,o,c,s=0,r=!1,u=-1,v=!1,d={images:!1,links:!1},f={};function p(e,t){!v||-1!=t&&t!==u?(n("isViolationDetailsSelected",v=!0),n("selectedViolationIdx",u=t)):t==u&&(n("isViolationDetailsSelected",v=!1),n("selectedViolationIdx",u=-1))}function g(e,t){d[e]=t,n("helpTextFlags",d)}return e.$set=(e=>{"levelData"in e&&n("levelData",a=e.levelData)}),e.$$.update=((e={basicChecks:1,ruleCheckIndices:1,levelData:1,totalNodesComputed:1,confirmanceRulesCount:1,pageInapplicableRulesCount:1})=>{if(e.basicChecks||e.ruleCheckIndices||e.levelData||e.totalNodesComputed||e.confirmanceRulesCount||e.pageInapplicableRulesCount){let e=axe.getRules();l.forEach((e,t)=>{e.scanTags.values.forEach(e=>{f[e]||(f[e]=[],n("ruleCheckIndices",f),n("basicChecks",l),n("levelData",a),n("totalNodesComputed",r),n("confirmanceRulesCount",i),n("pageInapplicableRulesCount",c)),f[e].push(t)})}),e.forEach(e=>{f[e.ruleId]&&f[e.ruleId].forEach(t=>{l[t].ruleText.push(e.description)})}),a.scanData.passes.forEach(e=>{f[e.id]&&f[e.id].forEach(t=>{l[t].passes=l[t].passes+e.nodes.length,n("basicChecks",l),n("ruleCheckIndices",f),n("levelData",a),n("totalNodesComputed",r),n("confirmanceRulesCount",i),n("pageInapplicableRulesCount",c)})}),a.scanData.violations.forEach(e=>{e.show=!1,f[e.id]&&f[e.id].forEach(t=>{l[t].violations=l[t].violations+e.nodes.length,n("basicChecks",l),n("ruleCheckIndices",f),n("levelData",a),n("totalNodesComputed",r),n("confirmanceRulesCount",i),n("pageInapplicableRulesCount",c)}),r||(n("totalNodes",s+=e.nodes.length),e.nodes.forEach(e=>{const t=document.querySelector(e.target);if(t&&-1==t.className.indexOf("visua11y")){const e=document.createElement("div");e.innerHTML=t.nodeName,e.className="visua11y-annotate","HTML"!==t.nodeName&&t.insertAdjacentElement("beforeBegin",e)}e.showHtml=!1}))}),a.violations=a.scanData.violations,n("levelData",a),n("basicChecks",l),n("ruleCheckIndices",f),n("totalNodesComputed",r),n("confirmanceRulesCount",i),n("pageInapplicableRulesCount",c),n("totalNodesComputed",r=!0),n("confirmanceRulesCount",i=axe.getRules(a.scanTags).length),n("pageInapplicableRulesCount",c=a.scanData.inapplicable.length),n("pageApplicableRulesCount",o=i-c)}}),{levelData:a,basicChecks:l,totalNodes:s,selectedViolationIdx:u,isViolationDetailsSelected:v,confirmanceRulesCount:i,pageApplicableRulesCount:o,helpTextFlags:d,toggleViolationDetails:p,showHelpText:g,click_handler:function({checkVal:e}){g(e.type,!1)},mouseover_handler:function({checkVal:e}){g(e.type,!0)},click_handler_1:function({violation:e,i:t}){return p(0,t)},click_handler_2:function({node:e}){return le(e.target)},click_handler_3:function({node:e}){return function(e){return e.showHtml=!e.showHtml,e.showHtml}(e)},click_handler_4:function({node:e}){return le(e.target)}}}class oe extends O{constructor(e){var t;super(),F.getElementById("svelte-1jvv2yg-style")||((t=u("style")).id="svelte-1jvv2yg-style",t.textContent=".level-container.svelte-1jvv2yg{padding:15px;font-size:14px !important;clear:both}.level-container.svelte-1jvv2yg code.svelte-1jvv2yg{padding:2px 4px;font-size:90%;color:#c7254e;background-color:#f9f2f4;border-radius:4px}.media-block.svelte-1jvv2yg{padding:15px;float:left}.level-description.svelte-1jvv2yg{padding:15px;clear:both}.level-violations.svelte-1jvv2yg{padding:10px}.media-block-left.svelte-1jvv2yg{float:left}.media-block-right.svelte-1jvv2yg{float:right;padding-left:30px}.media-block-right.svelte-1jvv2yg ul.svelte-1jvv2yg{list-style:initial}.level-violations.svelte-1jvv2yg{clear:both}.level-violations.svelte-1jvv2yg a.svelte-1jvv2yg{color:white !important;text-decoration:underline !important}.violation-node.svelte-1jvv2yg{padding:10px;clear:both}.basic-checks-icon.svelte-1jvv2yg i.svelte-1jvv2yg{font-size:30px !important\n    }.help-text-popup.svelte-1jvv2yg{position:absolute;background:#09304b;z-index:999;padding:10px;left:0px}",o(F.head,t)),H(this,e,ie,ae,i,["levelData"])}}const{document:ce}=N;function se(e,t,n){const a=Object.create(e);return a.confirmanceItem=t[n],a}function re(e){var t,n,a;return{c(){t=u("div"),(n=u("button")).innerHTML='<span><i class="fas fa-binoculars"></i></span>',g(n,"class","visua11y-button svelte-1n92ei9"),g(t,"class","visua11y-minimised-ctr svelte-1n92ei9"),a=p(n,"click",e.toggleContainer)},m(e,a){c(e,t,a),o(t,n)},d(e){e&&s(t),a()}}}function ue(e){var t,n,a,l,i,r,v,f,m,h=e.levelContainer&&ve(e),b=e.levelContainer&&de(e),y=!e.levelContainer&&fe(e);return{c(){t=u("div"),n=u("div"),h&&h.c(),a=d(),l=u("strong"),(i=u("button")).innerHTML='<span><i class="fas fa-binoculars"></i></span>',r=d(),b&&b.c(),v=d(),y&&y.c(),g(i,"class","visua11y-button svelte-1n92ei9"),g(n,"class","visua11y-main-ctr-minimise svelte-1n92ei9"),g(t,"class","visua11y-main-ctr svelte-1n92ei9"),m=p(i,"click",e.toggleContainer)},m(e,s){c(e,t,s),o(t,n),h&&h.m(n,null),o(n,a),o(n,l),o(l,i),o(t,r),b&&b.m(t,null),o(t,v),y&&y.m(t,null),f=!0},p(e,l){l.levelContainer?h||((h=ve(l)).c(),h.m(n,a)):h&&(h.d(1),h=null),l.levelContainer?b?(b.p(e,l),V(b,1)):((b=de(l)).c(),V(b,1),b.m(t,v)):b&&(E(),R(b,1,()=>{b=null}),L()),l.levelContainer?y&&(y.d(1),y=null):y?y.p(e,l):((y=fe(l)).c(),y.m(t,null))},i(e){f||(V(b),f=!0)},o(e){R(b),f=!1},d(e){e&&s(t),h&&h.d(),b&&b.d(),y&&y.d(),m()}}}function ve(e){var t,n,a;return{c(){t=u("strong"),(n=u("button")).innerHTML="<span>back</span>",g(n,"class","visua11y-button svelte-1n92ei9"),a=p(n,"click",e.toggleLevelDetails)},m(e,a){c(e,t,a),o(t,n)},d(e){e&&s(t),a()}}}function de(e){var t,n;function a(n){var a;e.confirmancedetails_levelData_binding.call(null,n),t=!0,a=(()=>t=!1),D.push(a)}let l={};void 0!==e.selectedLevelItem&&(l.levelData=e.selectedLevelItem);var i=new oe({props:l});return x.push(()=>(function(e,t,n){-1!==e.$$.props.indexOf(t)&&(e.$$.bound[t]=n,n(e.$$.ctx[t]))})(i,"levelData",a)),{c(){i.$$.fragment.c()},m(e,t){G(i,e,t),n=!0},p(e,n){var a={};!t&&e.selectedLevelItem&&(a.levelData=n.selectedLevelItem),i.$set(a)},i(e){n||(V(i.$$.fragment,e),n=!0)},o(e){R(i.$$.fragment,e),n=!1},d(e){S(i,e)}}}function fe(e){for(var t,n=e.confirmanceData,a=[],l=0;l<n.length;l+=1)a[l]=ge(se(e,n,l));return{c(){for(var e=0;e<a.length;e+=1)a[e].c();t=f()},m(e,n){for(var l=0;l<a.length;l+=1)a[l].m(e,n);c(e,t,n)},p(e,l){if(e.confirmanceData){n=l.confirmanceData;for(var i=0;i<n.length;i+=1){const o=se(l,n,i);a[i]?a[i].p(e,o):(a[i]=ge(o),a[i].c(),a[i].m(t.parentNode,t))}for(;i<a.length;i+=1)a[i].d(1);a.length=n.length}},d(e){r(a,e),e&&s(t)}}}function pe(e){var t,n,l,i,r,f,m,h,b,y,C,k,x,w=e.confirmanceItem.scanData.violations.length;function D(){return e.click_handler(e)}function A(){return e.click_handler_1(e)}return{c(){t=u("div"),n=u("span"),l=u("i"),i=d(),r=v(w),f=v(" violations"),m=d(),h=u("div"),(b=u("a")).textContent="Details",y=d(),C=u("div"),(k=u("a")).textContent="Run again",g(l,"class","fas fa-times-circle"),g(b,"href","javascript:void(0)"),g(b,"class","svelte-1n92ei9"),g(h,"class","visua11y-ctr-link svelte-1n92ei9"),g(k,"href","javascript:void(0)"),g(k,"class","svelte-1n92ei9"),g(C,"class","visua11y-ctr-link svelte-1n92ei9"),x=[p(b,"click",D),p(k,"click",A)]},m(e,a){c(e,t,a),o(t,n),o(n,l),o(n,i),o(n,r),o(n,f),c(e,m,a),c(e,h,a),o(h,b),c(e,y,a),c(e,C,a),o(C,k)},p(t,n){e=n},d(e){e&&(s(t),s(m),s(h),s(y),s(C)),a(x)}}}function ge(e){var t,n,a,l,i,r,f,p,m,h,b,y,C,k,x=e.confirmanceItem.heading,w=e.confirmanceItem.subheading,D=e.confirmanceItem.scanData&&e.confirmanceItem.scanData.violations&&pe(e);return{c(){t=u("div"),n=u("div"),a=u("strong"),l=v(x),i=d(),r=u("div"),f=u("strong"),p=v(w),m=d(),h=u("div"),b=u("a"),y=u("img"),C=d(),D&&D.c(),k=d(),g(y,"height","32"),g(y,"width","88"),g(y,"src",e.confirmanceItem.logo),g(y,"alt",e.confirmanceItem.alt),g(b,"href",e.confirmanceItem.link),g(b,"target","_blank"),g(b,"title",e.confirmanceItem.title),g(t,"class","visua11y-level-ctr svelte-1n92ei9")},m(e,s){c(e,t,s),o(t,n),o(n,a),o(a,l),o(t,i),o(t,r),o(r,f),o(f,p),o(t,m),o(t,h),o(h,b),o(b,y),o(t,C),D&&D.m(t,null),o(t,k)},p(e,n){n.confirmanceItem.scanData&&n.confirmanceItem.scanData.violations?D?D.p(e,n):((D=pe(n)).c(),D.m(t,k)):D&&(D.d(1),D=null)},d(e){e&&s(t),D&&D.d()}}}function me(e){var t,n,a,l,i,r,v=!e.fullContainer&&re(e),f=e.fullContainer&&ue(e);return{c(){t=u("script"),(n=u("style")).textContent=".visua11y-annotate{\n\t\t\tposition: absolute;\n\t\t\tfont-size: 12px;\n\t\t\tpadding: 2px;\n\t\t\tbackground: #FFAEAE;\n\t\t\tz-index: 8888;\n\t\t}\n\n\t\t.visua11y-annotate-bg{\n\t\t\tborder: 3px dotted#FFAEAE !important;\n\t\t}",a=d(),l=u("div"),v&&v.c(),i=d(),f&&f.c(),g(t,"src","https://kit.fontawesome.com/7e1024d596.js"),g(l,"class","visua11y visua11y-toolbar svelte-1n92ei9")},m(e,s){o(ce.head,t),o(ce.head,n),c(e,a,s),c(e,l,s),v&&v.m(l,null),o(l,i),f&&f.m(l,null),r=!0},p(e,t){t.fullContainer?v&&(v.d(1),v=null):v||((v=re(t)).c(),v.m(l,i)),t.fullContainer?f?(f.p(e,t),V(f,1)):((f=ue(t)).c(),V(f,1),f.m(l,null)):f&&(E(),R(f,1,()=>{f=null}),L())},i(e){r||(V(f),r=!0)},o(e){R(f),r=!1},d(e){s(t),s(n),e&&(s(a),s(l)),v&&v.d(),f&&f.d()}}}function he(e,t,n){let a,{name:l}=t,i=[{level:"wcag2a",heading:"WCAG 2.0",subheading:"Level A",logo:"https://www.w3.org/WAI/wcag2A",link:"https://www.w3.org/WAI/WCAG2A-Conformance",alt:"Level A conformance, W3C WAI Web Content Accessibility Guidelines 2.0",title:"Explanation of WCAG 2.0 Level A Conformance",scanTags:["wcag2a","best-practice"],scanData:{}},{level:"wcag2aa",heading:"WCAG 2.0",subheading:"Level AA",logo:"https://www.w3.org/WAI/wcag2AA",link:"https://www.w3.org/WAI/WCAG2AA-Conformance",alt:"Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.0",title:"Explanation of WCAG 2.0 Level Double-A Conformance",scanTags:["wcag2a","wcag2aa","best-practice"],scanData:{}},{level:"wcag2aaa",heading:"WCAG 2.0",subheading:"Level AAA",logo:"https://www.w3.org/WAI/wcag2AAA",link:"https://www.w3.org/WAI/WCAG2AAA-Conformance",alt:"Level Triple-A conformance, W3C WAI Web Content Accessibility Guidelines 2.0",title:"Explanation of WCAG 2.0 Level Triple-A Conformance",scanTags:["wcag2a","wcag2aa","wcag2aaa","best-practice"],scanData:{}},{level:"wcag21a",heading:"WCAG 2.1",subheading:"Level A",logo:"https://www.w3.org/WAI/WCAG21/wcag2.1AA-v",link:"https://www.w3.org/WAI/WCAG2.1AA-Conformance",alt:"Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.1",title:"Explanation of WCAG 2.1 Level Double-A Conformance",scanTags:["wcag2a","wcag2aa","wcag21a","wcag21aa","best-practice"],scanData:{}},{level:"section508",heading:"Section 508",subheading:"Section 508",logo:"http://digitalinclusionnewslog.itu.int/wp-content/uploads/sites/9/2015/10/Section-508.png",link:"https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines",alt:"Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.1",title:"Explanation of WCAG 2.1 Level Double-A Conformance",scanTags:["section508","best-practice"],scanData:{}}],o=[],c=!1,s=!1,r=!1;function u(e){c?o.push(e):(c=!0,e.scanData={},axe.run({exclude:[[".visua11y","button"],[".visua11y-button"]]},{runOnly:e.scanTags},(t,n)=>{if(e.scanData=n,c=!1,o.length){u(o.pop())}}))}function v(e){r?(n("levelContainer",r=!1),n("selectedLevelItem",a=void 0)):(n("selectedLevelItem",a=e),n("levelContainer",r=!0))}return C(()=>{const e=document.createElement("script");e.src="https://vedrag.github.io/visua11ysite/axe.min.js",e.onload=(()=>{console.log("AXE Tools loaded"),i.forEach(e=>{u(e)})}),document.querySelector("head").appendChild(e)}),e.$set=(e=>{"name"in e&&n("name",l=e.name)}),{name:l,confirmanceData:i,fullContainer:s,levelContainer:r,selectedLevelItem:a,toggleContainer:function(){n("fullContainer",s=!s)},runScan:u,toggleLevelDetails:v,confirmancedetails_levelData_binding:function(e){n("selectedLevelItem",a=e)},click_handler:function({confirmanceItem:e}){return v(e)},click_handler_1:function({confirmanceItem:e}){return u(e)}}}const be=document.createElement("div");return be.id="visua11y-bar",document.querySelector("body").appendChild(be),new class extends O{constructor(e){var t;super(),ce.getElementById("svelte-1n92ei9-style")||((t=u("style")).id="svelte-1n92ei9-style",t.textContent=".visua11y.svelte-1n92ei9{width:auto !important;height:auto !important;max-height:450px;max-width:700px}.visua11y.svelte-1n92ei9{font-family:Arial, Helvetica, sans-serif !important;color:#ffffff !important\n\t}.visua11y-toolbar.svelte-1n92ei9{background-color:#09304b !important;color:#f2f2f2 !important;position:fixed !important;top:auto !important;right:auto !important;bottom:0 !important;left:10px !important;border-top-left-radius:5px !important;border-top-right-radius:5px !important;overflow:scroll !important;z-index:9998 !important;font-family:Arial, Helvetica, sans-serif !important}.visua11y-minimised-ctr.svelte-1n92ei9{font-size:28px}.visua11y-button.svelte-1n92ei9{background:none;border-style:none;color:white !important;font-size:inherit !important\n\n\t}.visua11y-main-ctr-minimise.svelte-1n92ei9{float:right;font-size:14px}.visua11y-level-ctr.svelte-1n92ei9{float:left;padding:20px;max-width:20%;font-size:14px !important}.visua11y-ctr-link.svelte-1n92ei9 a.svelte-1n92ei9{font-weight:bold;color:#ffffff !important;text-decoration:underline !important}",o(ce.head,t)),H(this,e,he,me,i,["name"])}}({target:document.getElementById("visua11y-bar"),props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
