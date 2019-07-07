var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function a(e){e.forEach(t)}function l(e){return"function"==typeof e}function o(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function i(e,t){e.appendChild(t)}function c(e,t,n){e.insertBefore(t,n||null)}function s(e){e.parentNode.removeChild(e)}function r(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function d(e){return document.createElement(e)}function u(e){return document.createTextNode(e)}function f(){return u(" ")}function v(){return u("")}function m(e,t,n,a){return e.addEventListener(t,n,a),()=>e.removeEventListener(t,n,a)}function p(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function g(e,t){t=""+t,e.data!==t&&(e.data=t)}function h(e,t,n){e.style.setProperty(t,n)}let b;function x(e){b=e}function w(e){(function(){if(!b)throw new Error("Function called outside component initialization");return b})().$$.on_mount.push(e)}const C=[],D=[],y=[],A=[],$=Promise.resolve();let k=!1;function I(e){y.push(e)}function _(){const e=new Set;do{for(;C.length;){const e=C.shift();x(e),z(e.$$)}for(;D.length;)D.pop()();for(;y.length;){const t=y.pop();e.has(t)||(t(),e.add(t))}}while(C.length);for(;A.length;)A.pop()();k=!1}function z(e){e.fragment&&(e.update(e.dirty),a(e.before_render),e.fragment.p(e.dirty,e.ctx),e.dirty=null,e.after_render.forEach(I))}const W=new Set;let L;function N(){L={remaining:0,callbacks:[]}}function E(){L.remaining||a(L.callbacks)}function R(e,t){e&&e.i&&(W.delete(e),e.i(t))}function G(e,t,n){if(e&&e.o){if(W.has(e))return;W.add(e),L.callbacks.push(()=>{W.delete(e),n&&(e.d(1),n())}),e.o(t)}}const S="undefined"!=typeof window?window:global;function T(e,n,o){const{fragment:i,on_mount:c,on_destroy:s,after_render:r}=e.$$;i.m(n,o),I(()=>{const n=c.map(t).filter(l);s?s.push(...n):a(n),e.$$.on_mount=[]}),r.forEach(I)}function j(e,t){e.$$.fragment&&(a(e.$$.on_destroy),e.$$.fragment.d(t),e.$$.on_destroy=e.$$.fragment=null,e.$$.ctx={})}function V(e,t){e.$$.dirty||(C.push(e),k||(k=!0,$.then(_)),e.$$.dirty=n()),e.$$.dirty[t]=!0}function H(t,l,o,i,c,s){const r=b;x(t);const d=l.props||{},u=t.$$={fragment:null,ctx:null,props:s,update:e,not_equal:c,bound:n(),on_mount:[],on_destroy:[],before_render:[],after_render:[],context:new Map(r?r.$$.context:[]),callbacks:n(),dirty:null};let f=!1;var v;u.ctx=o?o(t,d,(e,n)=>{u.ctx&&c(u.ctx[e],u.ctx[e]=n)&&(u.bound[e]&&u.bound[e](n),f&&V(t,e))}):d,u.update(),f=!0,a(u.before_render),u.fragment=i(u.ctx),l.target&&(l.hydrate?u.fragment.l((v=l.target,Array.from(v.childNodes))):u.fragment.c(),l.intro&&R(t.$$.fragment),T(t,l.target,l.anchor),_()),x(r)}class O{$destroy(){j(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(){}}const{document:q}=S;function M(e,t,n){const a=Object.create(e);return a.checkedNode=t[n],a}function B(e,t,n){const a=Object.create(e);return a.node=t[n],a}function F(e,t,n){const a=Object.create(e);return a.violation=t[n],a.i=n,a}function P(e){for(var t,n=e.violation.nodes,a=[],l=0;l<n.length;l+=1)a[l]=J(B(e,n,l));return{c(){for(var e=0;e<a.length;e+=1)a[e].c();t=v()},m(e,n){for(var l=0;l<a.length;l+=1)a[l].m(e,n);c(e,t,n)},p(e,l){if(e.levelData){n=l.violation.nodes;for(var o=0;o<n.length;o+=1){const i=B(l,n,o);a[o]?a[o].p(e,i):(a[o]=J(i),a[o].c(),a[o].m(t.parentNode,t))}for(;o<a.length;o+=1)a[o].d(1);a.length=n.length}},d(e){r(a,e),e&&s(t)}}}function X(e){var t,n,a,l,o,r=e.checkedNode.message;return{c(){t=d("li"),n=d("i"),a=f(),l=u(r),o=f(),h(n,"font-size","6px"),h(n,"padding-left","10px"),p(n,"class","fas fa-minus")},m(e,s){c(e,t,s),i(t,n),i(t,a),i(t,l),i(t,o)},p(e,t){e.levelData&&r!==(r=t.checkedNode.message)&&g(l,r)},d(e){e&&s(t)}}}function J(e){var t,n,l,o,v,h,b,x,w,C,D,y,A,$,k,I,_,z,W,L,N,E,R,G,S,T=e.node.impact,j=e.node.target,V=e.node.showHtml;function H(){return e.click_handler_1(e)}function O(){return e.click_handler_2(e)}function q(){return e.click_handler_3(e)}for(var B=!1,F=e.node.any,P=[],J=0;J<F.length;J+=1)P[J]=X(M(e,F,J));return{c(){t=d("div"),n=d("div"),l=u("Impact: "),o=u(T),v=f(),h=d("div"),b=u("Target: \n                                "),x=d("a"),w=d("code"),C=u(j),D=f(),(y=d("a")).textContent="Show html",A=f(),($=d("a")).textContent="Go to element",k=f(),I=u(V),_=f(),B&&B.c(),z=f(),W=d("div"),L=u("Fix this:"),N=d("br"),E=f(),R=d("ul");for(var e=0;e<P.length;e+=1)P[e].c();G=f(),p(w,"class","svelte-xsdz0f"),p(x,"href","javascript:void(0)"),p(x,"class","svelte-xsdz0f"),p(y,"href","javascript:void(0)"),p(y,"class","svelte-xsdz0f"),p($,"href","javascript:void(0)"),p($,"class","svelte-xsdz0f"),p(t,"class","violation-node svelte-xsdz0f"),S=[m(x,"click",H),m(y,"click",O),m($,"click",q)]},m(e,a){c(e,t,a),i(t,n),i(n,l),i(n,o),i(t,v),i(t,h),i(h,b),i(h,x),i(x,w),i(w,C),i(h,D),i(h,y),i(h,A),i(h,$),i(h,k),i(h,I),i(t,_),B&&B.m(t,null),i(t,z),i(t,W),i(W,L),i(W,N),i(W,E),i(W,R);for(var s=0;s<P.length;s+=1)P[s].m(R,null);i(t,G)},p(t,n){if(e=n,t.levelData&&T!==(T=e.node.impact)&&g(o,T),t.levelData&&j!==(j=e.node.target)&&g(C,j),t.levelData&&V!==(V=e.node.showHtml)&&g(I,V),B&&(B.d(1),B=null),t.levelData){F=e.node.any;for(var a=0;a<F.length;a+=1){const n=M(e,F,a);P[a]?P[a].p(t,n):(P[a]=X(n),P[a].c(),P[a].m(R,null))}for(;a<P.length;a+=1)P[a].d(1);P.length=F.length}},d(e){e&&s(t),B&&B.d(),r(P,e),a(S)}}}function K(e){var t,n,a,l,o,r,v,h,b,x,w,C=e.violation.help;function D(){return e.click_handler(e)}var y=e.isViolationDetailsSelected&&e.selectedViolationIdx===e.i&&P(e);return{c(){t=d("div"),n=d("div"),a=d("i"),l=f(),o=d("strong"),r=u(C),v=f(),(h=d("a")).textContent="Details",b=f(),y&&y.c(),x=f(),p(a,"class","fas fa-angle-right"),p(h,"href","javascript:void(0)"),p(h,"class","svelte-xsdz0f"),p(t,"class","level-violations svelte-xsdz0f"),w=m(h,"click",D)},m(e,s){c(e,t,s),i(t,n),i(n,a),i(n,l),i(n,o),i(o,r),i(n,v),i(n,h),i(t,b),y&&y.m(t,null),i(t,x)},p(n,a){e=a,n.levelData&&C!==(C=e.violation.help)&&g(r,C),e.isViolationDetailsSelected&&e.selectedViolationIdx===e.i?y?y.p(n,e):((y=P(e)).c(),y.m(t,x)):y&&(y.d(1),y=null)},d(e){e&&s(t),y&&y.d(),w()}}}function Q(t){for(var n,a,l,o,v,m,h,b,x,w,C,D,y,A,$,k,I,_,z,W,L,N,E,R,G,S,T,j,V,H,O,q,M,B,P,X,J,Q,U,Y,Z,ee,te,ne=t.levelData.heading,ae=t.levelData.subheading,le=t.levelData.violations.length,oe=t.levelData.violations,ie=[],ce=0;ce<oe.length;ce+=1)ie[ce]=K(F(t,oe,ce));return{c(){n=d("div"),a=d("div"),l=d("div"),o=d("div"),v=u(ne),m=f(),h=d("div"),b=u(ae),x=f(),w=d("div"),C=d("a"),D=d("img"),I=f(),_=d("div"),z=d("ul"),W=d("li"),L=u("This tool runs "),N=u(t.confirmanceRulesCount),E=u(" rules for this level"),R=f(),G=d("li"),S=u("Only "),T=u(t.pageApplicableRulesCount),j=u(" out of the "),V=u(t.confirmanceRulesCount),H=u(" rules apply to this page"),O=f(),q=d("div"),M=d("div"),B=d("span"),P=d("i"),X=f(),J=d("strong"),Q=u(t.totalNodes),U=u(" html elements with "),Y=d("strong"),Z=u(le),ee=u(" violations"),te=f();for(var e=0;e<ie.length;e+=1)ie[e].c();p(D,"height","32"),p(D,"width","88"),p(D,"src",y=t.levelData.logo),p(D,"alt",A=t.levelData.alt),p(C,"href",$=t.levelData.link),p(C,"target","_blank"),p(C,"title",k=t.levelData.title),p(l,"class","media-block-left svelte-xsdz0f"),p(z,"class","svelte-xsdz0f"),p(_,"class","media-block-right svelte-xsdz0f"),p(a,"class","media-block svelte-xsdz0f"),p(P,"class","fas fa-exclamation-circle"),p(q,"class","level-description svelte-xsdz0f"),p(n,"class","level-container svelte-xsdz0f")},m(e,t){c(e,n,t),i(n,a),i(a,l),i(l,o),i(o,v),i(l,m),i(l,h),i(h,b),i(l,x),i(l,w),i(w,C),i(C,D),i(a,I),i(a,_),i(_,z),i(z,W),i(W,L),i(W,N),i(W,E),i(z,R),i(z,G),i(G,S),i(G,T),i(G,j),i(G,V),i(G,H),i(n,O),i(n,q),i(q,M),i(M,B),i(B,P),i(B,X),i(B,J),i(J,Q),i(B,U),i(B,Y),i(Y,Z),i(B,ee),i(q,te);for(var s=0;s<ie.length;s+=1)ie[s].m(q,null)},p(e,t){if(e.levelData&&ne!==(ne=t.levelData.heading)&&g(v,ne),e.levelData&&ae!==(ae=t.levelData.subheading)&&g(b,ae),e.levelData&&y!==(y=t.levelData.logo)&&p(D,"src",y),e.levelData&&A!==(A=t.levelData.alt)&&p(D,"alt",A),e.levelData&&$!==($=t.levelData.link)&&p(C,"href",$),e.levelData&&k!==(k=t.levelData.title)&&p(C,"title",k),e.confirmanceRulesCount&&g(N,t.confirmanceRulesCount),e.pageApplicableRulesCount&&g(T,t.pageApplicableRulesCount),e.confirmanceRulesCount&&g(V,t.confirmanceRulesCount),e.totalNodes&&g(Q,t.totalNodes),e.levelData&&le!==(le=t.levelData.violations.length)&&g(Z,le),e.isViolationDetailsSelected||e.selectedViolationIdx||e.levelData){oe=t.levelData.violations;for(var n=0;n<oe.length;n+=1){const a=F(t,oe,n);ie[n]?ie[n].p(e,a):(ie[n]=K(a),ie[n].c(),ie[n].m(q,null))}for(;n<ie.length;n+=1)ie[n].d(1);ie.length=oe.length}},i:e,o:e,d(e){e&&s(n),r(ie,e)}}}function U(e){const t=document.querySelectorAll(".visua11y-annotate-bg");for(let e=0;e<t.length;e++)t[e].className=t[e].className.replace(" visua11y-annotate-bg","");if(e){const t=document.querySelector(e);t&&(t.className=t.className+" visua11y-annotate-bg",t.scrollIntoView())}}function Y(e,t,n){let a,l,o,{levelData:i}=t,c=0,s=!1,r=-1,d=!1;function u(e,t){!d||-1!=t&&t!==r?(n("isViolationDetailsSelected",d=!0),n("selectedViolationIdx",r=t)):t==r&&(n("isViolationDetailsSelected",d=!1),n("selectedViolationIdx",r=-1))}return e.$set=(e=>{"levelData"in e&&n("levelData",i=e.levelData)}),e.$$.update=((e={levelData:1,totalNodesComputed:1,confirmanceRulesCount:1,pageInapplicableRulesCount:1})=>{(e.levelData||e.totalNodesComputed||e.confirmanceRulesCount||e.pageInapplicableRulesCount)&&(i.scanData.violations.forEach(e=>{e.show=!1,s||(n("totalNodes",c+=e.nodes.length),e.nodes.forEach(e=>{const t=document.querySelector(e.target),n=document.createElement("div");n.innerHTML=t.nodeName,n.className="visua11y-annotate","HTML"!==t.nodeName&&t.insertAdjacentElement("beforeBegin",n),e.showHtml=!1}))}),i.violations=i.scanData.violations,n("levelData",i),n("totalNodesComputed",s),n("confirmanceRulesCount",a),n("pageInapplicableRulesCount",o),n("totalNodesComputed",s=!0),n("confirmanceRulesCount",a=axe.getRules(i.scanTags).length),n("pageInapplicableRulesCount",o=i.scanData.inapplicable.length),n("pageApplicableRulesCount",l=a-o))}),{levelData:i,totalNodes:c,selectedViolationIdx:r,isViolationDetailsSelected:d,confirmanceRulesCount:a,pageApplicableRulesCount:l,toggleViolationDetails:u,click_handler:function({violation:e,i:t}){return u(0,t)},click_handler_1:function({node:e}){return U(e.target)},click_handler_2:function({node:e}){return function(e){return e.showHtml=!e.showHtml,e.showHtml}(e)},click_handler_3:function({node:e}){return U(e.target)}}}class Z extends O{constructor(e){var t;super(),q.getElementById("svelte-xsdz0f-style")||((t=d("style")).id="svelte-xsdz0f-style",t.textContent=".level-container.svelte-xsdz0f{padding:15px;font-size:14px !important;clear:both}.level-container.svelte-xsdz0f code.svelte-xsdz0f{padding:2px 4px;font-size:90%;color:#c7254e;background-color:#f9f2f4;border-radius:4px}.media-block.svelte-xsdz0f{padding:15px;float:left}.level-description.svelte-xsdz0f{padding:15px;clear:both}.level-violations.svelte-xsdz0f{padding:10px}.media-block-left.svelte-xsdz0f{float:left}.media-block-right.svelte-xsdz0f{float:right;padding-left:30px}.media-block-right.svelte-xsdz0f ul.svelte-xsdz0f{list-style:initial}.level-violations.svelte-xsdz0f{clear:both}.level-violations.svelte-xsdz0f a.svelte-xsdz0f{color:white !important;text-decoration:underline !important}.violation-node.svelte-xsdz0f{padding:10px;clear:both}",i(q.head,t)),H(this,e,Y,Q,o,["levelData"])}}const{document:ee}=S;function te(e,t,n){const a=Object.create(e);return a.confirmanceItem=t[n],a}function ne(e){var t,n,a;return{c(){t=d("div"),(n=d("button")).innerHTML='<span><i class="fas fa-binoculars"></i></span>',p(n,"class","visua11y-button svelte-1n92ei9"),p(t,"class","visua11y-minimised-ctr svelte-1n92ei9"),a=m(n,"click",e.toggleContainer)},m(e,a){c(e,t,a),i(t,n)},d(e){e&&s(t),a()}}}function ae(e){var t,n,a,l,o,r,u,v,g,h=e.levelContainer&&le(e),b=e.levelContainer&&oe(e),x=!e.levelContainer&&ie(e);return{c(){t=d("div"),n=d("div"),h&&h.c(),a=f(),l=d("strong"),(o=d("button")).innerHTML='<span><i class="fas fa-binoculars"></i></span>',r=f(),b&&b.c(),u=f(),x&&x.c(),p(o,"class","visua11y-button svelte-1n92ei9"),p(n,"class","visua11y-main-ctr-minimise svelte-1n92ei9"),p(t,"class","visua11y-main-ctr svelte-1n92ei9"),g=m(o,"click",e.toggleContainer)},m(e,s){c(e,t,s),i(t,n),h&&h.m(n,null),i(n,a),i(n,l),i(l,o),i(t,r),b&&b.m(t,null),i(t,u),x&&x.m(t,null),v=!0},p(e,l){l.levelContainer?h||((h=le(l)).c(),h.m(n,a)):h&&(h.d(1),h=null),l.levelContainer?b?(b.p(e,l),R(b,1)):((b=oe(l)).c(),R(b,1),b.m(t,u)):b&&(N(),G(b,1,()=>{b=null}),E()),l.levelContainer?x&&(x.d(1),x=null):x?x.p(e,l):((x=ie(l)).c(),x.m(t,null))},i(e){v||(R(b),v=!0)},o(e){G(b),v=!1},d(e){e&&s(t),h&&h.d(),b&&b.d(),x&&x.d(),g()}}}function le(e){var t,n,a;return{c(){t=d("strong"),(n=d("button")).innerHTML="<span>back</span>",p(n,"class","visua11y-button svelte-1n92ei9"),a=m(n,"click",e.toggleLevelDetails)},m(e,a){c(e,t,a),i(t,n)},d(e){e&&s(t),a()}}}function oe(e){var t,n;function a(n){var a;e.confirmancedetails_levelData_binding.call(null,n),t=!0,a=(()=>t=!1),A.push(a)}let l={};void 0!==e.selectedLevelItem&&(l.levelData=e.selectedLevelItem);var o=new Z({props:l});return D.push(()=>(function(e,t,n){-1!==e.$$.props.indexOf(t)&&(e.$$.bound[t]=n,n(e.$$.ctx[t]))})(o,"levelData",a)),{c(){o.$$.fragment.c()},m(e,t){T(o,e,t),n=!0},p(e,n){var a={};!t&&e.selectedLevelItem&&(a.levelData=n.selectedLevelItem),o.$set(a)},i(e){n||(R(o.$$.fragment,e),n=!0)},o(e){G(o.$$.fragment,e),n=!1},d(e){j(o,e)}}}function ie(e){for(var t,n=e.confirmanceData,a=[],l=0;l<n.length;l+=1)a[l]=se(te(e,n,l));return{c(){for(var e=0;e<a.length;e+=1)a[e].c();t=v()},m(e,n){for(var l=0;l<a.length;l+=1)a[l].m(e,n);c(e,t,n)},p(e,l){if(e.confirmanceData){n=l.confirmanceData;for(var o=0;o<n.length;o+=1){const i=te(l,n,o);a[o]?a[o].p(e,i):(a[o]=se(i),a[o].c(),a[o].m(t.parentNode,t))}for(;o<a.length;o+=1)a[o].d(1);a.length=n.length}},d(e){r(a,e),e&&s(t)}}}function ce(e){var t,n,l,o,r,v,g,h,b,x,w,C,D,y=e.confirmanceItem.scanData.violations.length;function A(){return e.click_handler(e)}function $(){return e.click_handler_1(e)}return{c(){t=d("div"),n=d("span"),l=d("i"),o=f(),r=u(y),v=u(" violations"),g=f(),h=d("div"),(b=d("a")).textContent="Details",x=f(),w=d("div"),(C=d("a")).textContent="Run again",p(l,"class","fas fa-times-circle"),p(b,"href","javascript:void(0)"),p(b,"class","svelte-1n92ei9"),p(h,"class","visua11y-ctr-link svelte-1n92ei9"),p(C,"href","javascript:void(0)"),p(C,"class","svelte-1n92ei9"),p(w,"class","visua11y-ctr-link svelte-1n92ei9"),D=[m(b,"click",A),m(C,"click",$)]},m(e,a){c(e,t,a),i(t,n),i(n,l),i(n,o),i(n,r),i(n,v),c(e,g,a),c(e,h,a),i(h,b),c(e,x,a),c(e,w,a),i(w,C)},p(t,n){e=n},d(e){e&&(s(t),s(g),s(h),s(x),s(w)),a(D)}}}function se(e){var t,n,a,l,o,r,v,m,g,h,b,x,w,C,D=e.confirmanceItem.heading,y=e.confirmanceItem.subheading,A=e.confirmanceItem.scanData&&e.confirmanceItem.scanData.violations&&ce(e);return{c(){t=d("div"),n=d("div"),a=d("strong"),l=u(D),o=f(),r=d("div"),v=d("strong"),m=u(y),g=f(),h=d("div"),b=d("a"),x=d("img"),w=f(),A&&A.c(),C=f(),p(x,"height","32"),p(x,"width","88"),p(x,"src",e.confirmanceItem.logo),p(x,"alt",e.confirmanceItem.alt),p(b,"href",e.confirmanceItem.link),p(b,"target","_blank"),p(b,"title",e.confirmanceItem.title),p(t,"class","visua11y-level-ctr svelte-1n92ei9")},m(e,s){c(e,t,s),i(t,n),i(n,a),i(a,l),i(t,o),i(t,r),i(r,v),i(v,m),i(t,g),i(t,h),i(h,b),i(b,x),i(t,w),A&&A.m(t,null),i(t,C)},p(e,n){n.confirmanceItem.scanData&&n.confirmanceItem.scanData.violations?A?A.p(e,n):((A=ce(n)).c(),A.m(t,C)):A&&(A.d(1),A=null)},d(e){e&&s(t),A&&A.d()}}}function re(e){var t,n,a,l,o,r,u=!e.fullContainer&&ne(e),v=e.fullContainer&&ae(e);return{c(){t=d("script"),(n=d("style")).textContent=".visua11y-annotate{\n\t\t\tposition: absolute;\n\t\t\tfont-size: 12px;\n\t\t\tpadding: 2px;\n\t\t\tbackground: green;\n\t\t\tz-index: 8888;\n\t\t}\n\n\t\t.visua11y-annotate-bg{\n\t\t\tborder: 3px dotted green !important;\n\t\t}",a=f(),l=d("div"),u&&u.c(),o=f(),v&&v.c(),p(t,"src","https://kit.fontawesome.com/7e1024d596.js"),p(l,"class","visua11y visua11y-toolbar svelte-1n92ei9")},m(e,s){i(ee.head,t),i(ee.head,n),c(e,a,s),c(e,l,s),u&&u.m(l,null),i(l,o),v&&v.m(l,null),r=!0},p(e,t){t.fullContainer?u&&(u.d(1),u=null):u||((u=ne(t)).c(),u.m(l,o)),t.fullContainer?v?(v.p(e,t),R(v,1)):((v=ae(t)).c(),R(v,1),v.m(l,null)):v&&(N(),G(v,1,()=>{v=null}),E())},i(e){r||(R(v),r=!0)},o(e){G(v),r=!1},d(e){s(t),s(n),e&&(s(a),s(l)),u&&u.d(),v&&v.d()}}}function de(e,t,n){let a,{name:l}=t,o=[{level:"wcag2a",heading:"WCAG 2.0",subheading:"Level A",logo:"https://www.w3.org/WAI/wcag2A",link:"https://www.w3.org/WAI/WCAG2A-Conformance",alt:"Level A conformance, W3C WAI Web Content Accessibility Guidelines 2.0",title:"Explanation of WCAG 2.0 Level A Conformance",scanTags:["wcag2a"],scanData:{}},{level:"wcag2aa",heading:"WCAG 2.0",subheading:"Level AA",logo:"https://www.w3.org/WAI/wcag2AA",link:"https://www.w3.org/WAI/WCAG2AA-Conformance",alt:"Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.0",title:"Explanation of WCAG 2.0 Level Double-A Conformance",scanTags:["wcag2a","wcag2aa"],scanData:{}},{level:"wcag2aaa",heading:"WCAG 2.0",subheading:"Level AAA",logo:"https://www.w3.org/WAI/wcag2AAA",link:"https://www.w3.org/WAI/WCAG2AAA-Conformance",alt:"Level Triple-A conformance, W3C WAI Web Content Accessibility Guidelines 2.0",title:"Explanation of WCAG 2.0 Level Triple-A Conformance",scanTags:["wcag2a","wcag2aa","wcag2aaa"],scanData:{}},{level:"wcag21a",heading:"WCAG 2.1",subheading:"Level A",logo:"https://www.w3.org/WAI/WCAG21/wcag2.1AA-v",link:"https://www.w3.org/WAI/WCAG2.1AA-Conformance",alt:"Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.1",title:"Explanation of WCAG 2.1 Level Double-A Conformance",scanTags:["wcag2a","wcag2aa","wcag21a","wcag21aa"],scanData:{}},{level:"section508",heading:"Section 508",subheading:"Section 508",logo:"http://digitalinclusionnewslog.itu.int/wp-content/uploads/sites/9/2015/10/Section-508.png",link:"https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/final-rule/text-of-the-standards-and-guidelines",alt:"Level Double-A conformance, W3C WAI Web Content Accessibility Guidelines 2.1",title:"Explanation of WCAG 2.1 Level Double-A Conformance",scanTags:["section508"],scanData:{}}],i=[],c=!1,s=!1,r=!1;function d(e){c?i.push(e):(c=!0,e.scanData={},axe.run(document,{runOnly:e.scanTags},(t,n)=>{if(e.scanData=n,c=!1,i.length){d(i.pop())}}))}function u(e){r?(n("levelContainer",r=!1),n("selectedLevelItem",a=void 0)):(n("selectedLevelItem",a=e),n("levelContainer",r=!0))}return w(()=>{const e=document.createElement("script");e.src="http://localhost:5000/axe.min.js",e.onload=(()=>{console.log("AXE Tools loaded"),o.forEach(e=>{d(e)})}),document.querySelector("head").appendChild(e)}),e.$set=(e=>{"name"in e&&n("name",l=e.name)}),{name:l,confirmanceData:o,fullContainer:s,levelContainer:r,selectedLevelItem:a,toggleContainer:function(){n("fullContainer",s=!s)},runScan:d,toggleLevelDetails:u,confirmancedetails_levelData_binding:function(e){n("selectedLevelItem",a=e)},click_handler:function({confirmanceItem:e}){return u(e)},click_handler_1:function({confirmanceItem:e}){return d(e)}}}const ue=document.createElement("div");return ue.id="visua11y-bar",document.querySelector("body").appendChild(ue),new class extends O{constructor(e){var t;super(),ee.getElementById("svelte-1n92ei9-style")||((t=d("style")).id="svelte-1n92ei9-style",t.textContent=".visua11y.svelte-1n92ei9{width:auto !important;height:auto !important;max-height:450px;max-width:700px}.visua11y.svelte-1n92ei9{font-family:Arial, Helvetica, sans-serif !important;color:#ffffff !important\n\t}.visua11y-toolbar.svelte-1n92ei9{background-color:#09304b !important;color:#f2f2f2 !important;position:fixed !important;top:auto !important;right:auto !important;bottom:0 !important;left:10px !important;border-top-left-radius:5px !important;border-top-right-radius:5px !important;overflow:scroll !important;z-index:9998 !important;font-family:Arial, Helvetica, sans-serif !important}.visua11y-minimised-ctr.svelte-1n92ei9{font-size:28px}.visua11y-button.svelte-1n92ei9{background:none;border-style:none;color:white !important;font-size:inherit !important\n\n\t}.visua11y-main-ctr-minimise.svelte-1n92ei9{float:right;font-size:14px}.visua11y-level-ctr.svelte-1n92ei9{float:left;padding:20px;max-width:20%;font-size:14px !important}.visua11y-ctr-link.svelte-1n92ei9 a.svelte-1n92ei9{font-weight:bold;color:#ffffff !important;text-decoration:underline !important}",i(ee.head,t)),H(this,e,de,re,o,["name"])}}({target:document.getElementById("visua11y-bar"),props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map