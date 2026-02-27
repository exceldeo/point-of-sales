import{c as S}from"./createReactComponent-CnMLWrmW.js";import{a as $,r as d}from"./app-uvSuXWqO.js";/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Oe=S("outline","chevron-down","IconChevronDown",[["path",{d:"M6 9l6 6l6 -6",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Re=S("outline","chevron-up","IconChevronUp",[["path",{d:"M6 15l6 -6l6 6",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var ke=S("outline","credit-card","IconCreditCard",[["path",{d:"M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z",key:"svg-0"}],["path",{d:"M3 10l18 0",key:"svg-1"}],["path",{d:"M7 15l.01 0",key:"svg-2"}],["path",{d:"M11 15l2 0",key:"svg-3"}]]);/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var De=S("outline","logout","IconLogout",[["path",{d:"M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2",key:"svg-0"}],["path",{d:"M9 12h12l-3 -3",key:"svg-1"}],["path",{d:"M18 15l3 -3",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Pe=S("outline","menu-2","IconMenu2",[["path",{d:"M4 6l16 0",key:"svg-0"}],["path",{d:"M4 12l16 0",key:"svg-1"}],["path",{d:"M4 18l16 0",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ne=S("outline","moon","IconMoon",[["path",{d:"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Le=S("outline","sun","IconSun",[["path",{d:"M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",key:"svg-0"}],["path",{d:"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7",key:"svg-1"}]]);function Ue(e){const{auth:t}=$().props;let a=t.permissions,o=!1;return e.forEach(function(r){a[r]&&(o=!0)}),o}const $e={DASHBOARD_ACCESS:"dashboard-access",USERS_ACCESS:"users-access",USERS_CREATE:"users-create",USERS_UPDATE:"users-update",USERS_DELETE:"users-delete",ROLES_ACCESS:"roles-access",ROLES_CREATE:"roles-create",ROLES_UPDATE:"roles-update",ROLES_DELETE:"roles-delete",PERMISSIONS_ACCESS:"permissions-access",CATEGORIES_ACCESS:"categories-access",CATEGORIES_CREATE:"categories-create",CATEGORIES_EDIT:"categories-edit",CATEGORIES_DELETE:"categories-delete",PRODUCTS_ACCESS:"products-access",PRODUCTS_CREATE:"products-create",PRODUCTS_EDIT:"products-edit",PRODUCTS_DELETE:"products-delete",CUSTOMERS_ACCESS:"customers-access",CUSTOMERS_CREATE:"customers-create",CUSTOMERS_EDIT:"customers-edit",CUSTOMERS_DELETE:"customers-delete",SUPPLIERS_ACCESS:"suppliers-access",SUPPLIERS_CREATE:"suppliers-create",SUPPLIERS_EDIT:"suppliers-edit",SUPPLIERS_DELETE:"suppliers-delete",STOCK_MANAGEMENT_ACCESS:"stock-management-access",STOCK_MANAGEMENT_CREATE:"stock-management-create",STOCK_MANAGEMENT_EDIT:"stock-management-edit",STOCK_MANAGEMENT_DELETE:"stock-management-delete",TRANSACTIONS_ACCESS:"transactions-access",REPORTS_ACCESS:"reports-access",PROFITS_ACCESS:"profits-access",SETTINGS_ACCESS:"settings-access",EMPLOYEE_MANAGEMENT_ACCESS:"employee-management-access",EMPLOYEE_MANAGEMENT_CHANGE:"employee-management-change"};let j={data:""},G=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||j,z=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,F=/\/\*[^]*?\*\/|  +/g,D=/\n+/g,y=(e,t)=>{let a="",o="",r="";for(let s in e){let n=e[s];s[0]=="@"?s[1]=="i"?a=s+" "+n+";":o+=s[1]=="f"?y(n,s):s+"{"+y(n,s[1]=="k"?"":t)+"}":typeof n=="object"?o+=y(n,t?t.replace(/([^,])+/g,i=>s.replace(/(^:.*)|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,i):i?i+" "+l:l)):s):n!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=y.p?y.p(s,n):s+":"+n+";")}return a+(t&&r?t+"{"+r+"}":r)+o},E={},N=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+N(e[a]);return t}return e},H=(e,t,a,o,r)=>{let s=N(e),n=E[s]||(E[s]=(l=>{let c=0,p=11;for(;c<l.length;)p=101*p+l.charCodeAt(c++)>>>0;return"go"+p})(s));if(!E[n]){let l=s!==e?e:(c=>{let p,f,m=[{}];for(;p=z.exec(c.replace(F,""));)p[4]?m.shift():p[3]?(f=p[3].replace(D," ").trim(),m.unshift(m[0][f]=m[0][f]||{})):m[0][p[1]]=p[2].replace(D," ").trim();return m[0]})(e);E[n]=y(r?{["@keyframes "+n]:l}:l,a?"":"."+n)}let i=a&&E.g?E.g:null;return a&&(E.g=E[n]),((l,c,p,f)=>{f?c.data=c.data.replace(f,l):c.data.indexOf(l)===-1&&(c.data=p?l+c.data:c.data+l)})(E[n],t,o,i),n},K=(e,t,a)=>e.reduce((o,r,s)=>{let n=t[s];if(n&&n.call){let i=n(a),l=i&&i.props&&i.props.className||/^go/.test(i)&&i;n=l?"."+l:i&&typeof i=="object"?i.props?"":y(i,""):i===!1?"":i}return o+r+(n??"")},"");function I(e){let t=this||{},a=e.call?e(t.p):e;return H(a.unshift?a.raw?K(a,[].slice.call(arguments,1),t.p):a.reduce((o,r)=>Object.assign(o,r&&r.call?r(t.p):r),{}):a,G(t.target),t.g,t.o,t.k)}let L,O,R;I.bind({g:1});let h=I.bind({k:1});function Y(e,t,a,o){y.p=t,L=e,O=a,R=o}function v(e,t){let a=this||{};return function(){let o=arguments;function r(s,n){let i=Object.assign({},s),l=i.className||r.className;a.p=Object.assign({theme:O&&O()},i),a.o=/ *go\d+/.test(l),i.className=I.apply(a,o)+(l?" "+l:"");let c=e;return e[0]&&(c=i.as||e,delete i.as),R&&c[0]&&R(i),L(c,i)}return r}}var B=e=>typeof e=="function",M=(e,t)=>B(e)?e(t):e,Z=(()=>{let e=0;return()=>(++e).toString()})(),U=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),q=20,T=new Map,J=1e3,P=e=>{if(T.has(e))return;let t=setTimeout(()=>{T.delete(e),b({type:4,toastId:e})},J);T.set(e,t)},Q=e=>{let t=T.get(e);t&&clearTimeout(t)},k=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,q)};case 1:return t.toast.id&&Q(t.toast.id),{...e,toasts:e.toasts.map(s=>s.id===t.toast.id?{...s,...t.toast}:s)};case 2:let{toast:a}=t;return e.toasts.find(s=>s.id===a.id)?k(e,{type:1,toast:a}):k(e,{type:0,toast:a});case 3:let{toastId:o}=t;return o?P(o):e.toasts.forEach(s=>{P(s.id)}),{...e,toasts:e.toasts.map(s=>s.id===o||o===void 0?{...s,visible:!1}:s)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(s=>s.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(s=>({...s,pauseDuration:s.pauseDuration+r}))}}},A=[],_={toasts:[],pausedAt:void 0},b=e=>{_=k(_,e),A.forEach(t=>{t(_)})},V={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},W=(e={})=>{let[t,a]=d.useState(_);d.useEffect(()=>(A.push(a),()=>{let r=A.indexOf(a);r>-1&&A.splice(r,1)}),[t]);let o=t.toasts.map(r=>{var s,n;return{...e,...e[r.type],...r,duration:r.duration||((s=e[r.type])==null?void 0:s.duration)||(e==null?void 0:e.duration)||V[r.type],style:{...e.style,...(n=e[r.type])==null?void 0:n.style,...r.style}}});return{...t,toasts:o}},X=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||Z()}),C=e=>(t,a)=>{let o=X(t,e,a);return b({type:2,toast:o}),o.id},u=(e,t)=>C("blank")(e,t);u.error=C("error");u.success=C("success");u.loading=C("loading");u.custom=C("custom");u.dismiss=e=>{b({type:3,toastId:e})};u.remove=e=>b({type:4,toastId:e});u.promise=(e,t,a)=>{let o=u.loading(t.loading,{...a,...a==null?void 0:a.loading});return e.then(r=>(u.success(M(t.success,r),{id:o,...a,...a==null?void 0:a.success}),r)).catch(r=>{u.error(M(t.error,r),{id:o,...a,...a==null?void 0:a.error})}),e};var ee=(e,t)=>{b({type:1,toast:{id:e,height:t}})},te=()=>{b({type:5,time:Date.now()})},ae=e=>{let{toasts:t,pausedAt:a}=W(e);d.useEffect(()=>{if(a)return;let s=Date.now(),n=t.map(i=>{if(i.duration===1/0)return;let l=(i.duration||0)+i.pauseDuration-(s-i.createdAt);if(l<0){i.visible&&u.dismiss(i.id);return}return setTimeout(()=>u.dismiss(i.id),l)});return()=>{n.forEach(i=>i&&clearTimeout(i))}},[t,a]);let o=d.useCallback(()=>{a&&b({type:6,time:Date.now()})},[a]),r=d.useCallback((s,n)=>{let{reverseOrder:i=!1,gutter:l=8,defaultPosition:c}=n||{},p=t.filter(g=>(g.position||c)===(s.position||c)&&g.height),f=p.findIndex(g=>g.id===s.id),m=p.filter((g,w)=>w<f&&g.visible).length;return p.filter(g=>g.visible).slice(...i?[m+1]:[0,m]).reduce((g,w)=>g+(w.height||0)+l,0)},[t]);return{toasts:t,handlers:{updateHeight:ee,startPause:te,endPause:o,calculateOffset:r}}},se=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,re=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,oe=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ie=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${se} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${re} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${oe} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ne=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,le=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ne} 1s linear infinite;
`,ce=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,de=h`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,pe=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ce} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${de} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,ue=v("div")`
  position: absolute;
`,me=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,fe=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ge=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${fe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ee=({toast:e})=>{let{icon:t,type:a,iconTheme:o}=e;return t!==void 0?typeof t=="string"?d.createElement(ge,null,t):t:a==="blank"?null:d.createElement(me,null,d.createElement(le,{...o}),a!=="loading"&&d.createElement(ue,null,a==="error"?d.createElement(ie,{...o}):d.createElement(pe,{...o})))},he=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ye=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ve="0%{opacity:0;} 100%{opacity:1;}",Se="0%{opacity:1;} 100%{opacity:0;}",be=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Ce=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,xe=(e,t)=>{let a=e.includes("top")?1:-1,[o,r]=U()?[ve,Se]:[he(a),ye(a)];return{animation:t?`${h(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Te=d.memo(({toast:e,position:t,style:a,children:o})=>{let r=e.height?xe(e.position||t||"top-center",e.visible):{opacity:0},s=d.createElement(Ee,{toast:e}),n=d.createElement(Ce,{...e.ariaProps},M(e.message,e));return d.createElement(be,{className:e.className,style:{...r,...a,...e.style}},typeof o=="function"?o({icon:s,message:n}):d.createElement(d.Fragment,null,s,n))});Y(d.createElement);var Ae=({id:e,className:t,style:a,onHeightUpdate:o,children:r})=>{let s=d.useCallback(n=>{if(n){let i=()=>{let l=n.getBoundingClientRect().height;o(e,l)};i(),new MutationObserver(i).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return d.createElement("div",{ref:s,className:t,style:a},r)},_e=(e,t)=>{let a=e.includes("top"),o=a?{top:0}:{bottom:0},r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:U()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...o,...r}},Me=I`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,x=16,je=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:o,children:r,containerStyle:s,containerClassName:n})=>{let{toasts:i,handlers:l}=ae(a);return d.createElement("div",{style:{position:"fixed",zIndex:9999,top:x,left:x,right:x,bottom:x,pointerEvents:"none",...s},className:n,onMouseEnter:l.startPause,onMouseLeave:l.endPause},i.map(c=>{let p=c.position||t,f=l.calculateOffset(c,{reverseOrder:e,gutter:o,defaultPosition:t}),m=_e(p,f);return d.createElement(Ae,{id:c.id,key:c.id,onHeightUpdate:l.updateHeight,className:c.visible?Me:"",style:m},c.type==="custom"?M(c.message,c):r?r(c):d.createElement(Te,{toast:c,position:p}))}))},Ge=u;export{Oe as I,Ge as _,ke as a,Re as b,De as c,Pe as d,Le as e,Ne as f,je as g,Ue as h,$e as p};
