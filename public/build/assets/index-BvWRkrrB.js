import{c as x}from"./createReactComponent-DJbEiBf8.js";import{a as L,r as c}from"./app-81RwIXDy.js";/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Pe=x("outline","chevron-down","IconChevronDown",[["path",{d:"M6 9l6 6l6 -6",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var ze=x("outline","chevron-up","IconChevronUp",[["path",{d:"M6 15l6 -6l6 6",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ae=x("outline","credit-card","IconCreditCard",[["path",{d:"M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z",key:"svg-0"}],["path",{d:"M3 10l18 0",key:"svg-1"}],["path",{d:"M7 15l.01 0",key:"svg-2"}],["path",{d:"M11 15l2 0",key:"svg-3"}]]);/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var De=x("outline","logout","IconLogout",[["path",{d:"M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2",key:"svg-0"}],["path",{d:"M9 12h12l-3 -3",key:"svg-1"}],["path",{d:"M18 15l3 -3",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ne=x("outline","menu-2","IconMenu2",[["path",{d:"M4 6l16 0",key:"svg-0"}],["path",{d:"M4 12l16 0",key:"svg-1"}],["path",{d:"M4 18l16 0",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Se=x("outline","moon","IconMoon",[["path",{d:"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.5.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Te=x("outline","sun","IconSun",[["path",{d:"M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",key:"svg-0"}],["path",{d:"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7",key:"svg-1"}]]);function Fe(e){const{auth:t}=L().props;let a=t.permissions,s=!1;return e.forEach(function(o){a[o]&&(s=!0)}),s}let _={data:""},H=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||_,U=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,R=/\/\*[^]*?\*\/|  +/g,D=/\n+/g,v=(e,t)=>{let a="",s="",o="";for(let r in e){let n=e[r];r[0]=="@"?r[1]=="i"?a=r+" "+n+";":s+=r[1]=="f"?v(n,r):r+"{"+v(n,r[1]=="k"?"":t)+"}":typeof n=="object"?s+=v(n,t?t.replace(/([^,])+/g,i=>r.replace(/(^:.*)|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,i):i?i+" "+l:l)):r):n!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=v.p?v.p(r,n):r+":"+n+";")}return a+(t&&o?t+"{"+o+"}":o)+s},h={},S=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+S(e[a]);return t}return e},Y=(e,t,a,s,o)=>{let r=S(e),n=h[r]||(h[r]=(l=>{let d=0,p=11;for(;d<l.length;)p=101*p+l.charCodeAt(d++)>>>0;return"go"+p})(r));if(!h[n]){let l=r!==e?e:(d=>{let p,f,m=[{}];for(;p=U.exec(d.replace(R,""));)p[4]?m.shift():p[3]?(f=p[3].replace(D," ").trim(),m.unshift(m[0][f]=m[0][f]||{})):m[0][p[1]]=p[2].replace(D," ").trim();return m[0]})(e);h[n]=v(o?{["@keyframes "+n]:l}:l,a?"":"."+n)}let i=a&&h.g?h.g:null;return a&&(h.g=h[n]),((l,d,p,f)=>{f?d.data=d.data.replace(f,l):d.data.indexOf(l)===-1&&(d.data=p?l+d.data:d.data+l)})(h[n],t,s,i),n},Z=(e,t,a)=>e.reduce((s,o,r)=>{let n=t[r];if(n&&n.call){let i=n(a),l=i&&i.props&&i.props.className||/^go/.test(i)&&i;n=l?"."+l:i&&typeof i=="object"?i.props?"":v(i,""):i===!1?"":i}return s+o+(n??"")},"");function $(e){let t=this||{},a=e.call?e(t.p):e;return Y(a.unshift?a.raw?Z(a,[].slice.call(arguments,1),t.p):a.reduce((s,o)=>Object.assign(s,o&&o.call?o(t.p):o),{}):a,H(t.target),t.g,t.o,t.k)}let T,P,z;$.bind({g:1});let y=$.bind({k:1});function q(e,t,a,s){v.p=t,T=e,P=a,z=s}function b(e,t){let a=this||{};return function(){let s=arguments;function o(r,n){let i=Object.assign({},r),l=i.className||o.className;a.p=Object.assign({theme:P&&P()},i),a.o=/ *go\d+/.test(l),i.className=$.apply(a,s)+(l?" "+l:"");let d=e;return e[0]&&(d=i.as||e,delete i.as),z&&d[0]&&z(i),T(d,i)}return o}}var B=e=>typeof e=="function",O=(e,t)=>B(e)?e(t):e,G=(()=>{let e=0;return()=>(++e).toString()})(),F=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),J=20,M=new Map,Q=1e3,N=e=>{if(M.has(e))return;let t=setTimeout(()=>{M.delete(e),w({type:4,toastId:e})},Q);M.set(e,t)},V=e=>{let t=M.get(e);t&&clearTimeout(t)},A=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,J)};case 1:return t.toast.id&&V(t.toast.id),{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:a}=t;return e.toasts.find(r=>r.id===a.id)?A(e,{type:1,toast:a}):A(e,{type:0,toast:a});case 3:let{toastId:s}=t;return s?N(s):e.toasts.forEach(r=>{N(r.id)}),{...e,toasts:e.toasts.map(r=>r.id===s||s===void 0?{...r,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+o}))}}},I=[],C={toasts:[],pausedAt:void 0},w=e=>{C=A(C,e),I.forEach(t=>{t(C)})},W={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},X=(e={})=>{let[t,a]=c.useState(C);c.useEffect(()=>(I.push(a),()=>{let o=I.indexOf(a);o>-1&&I.splice(o,1)}),[t]);let s=t.toasts.map(o=>{var r,n;return{...e,...e[o.type],...o,duration:o.duration||((r=e[o.type])==null?void 0:r.duration)||(e==null?void 0:e.duration)||W[o.type],style:{...e.style,...(n=e[o.type])==null?void 0:n.style,...o.style}}});return{...t,toasts:s}},K=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||G()}),k=e=>(t,a)=>{let s=K(t,e,a);return w({type:2,toast:s}),s.id},u=(e,t)=>k("blank")(e,t);u.error=k("error");u.success=k("success");u.loading=k("loading");u.custom=k("custom");u.dismiss=e=>{w({type:3,toastId:e})};u.remove=e=>w({type:4,toastId:e});u.promise=(e,t,a)=>{let s=u.loading(t.loading,{...a,...a==null?void 0:a.loading});return e.then(o=>(u.success(O(t.success,o),{id:s,...a,...a==null?void 0:a.success}),o)).catch(o=>{u.error(O(t.error,o),{id:s,...a,...a==null?void 0:a.error})}),e};var ee=(e,t)=>{w({type:1,toast:{id:e,height:t}})},te=()=>{w({type:5,time:Date.now()})},ae=e=>{let{toasts:t,pausedAt:a}=X(e);c.useEffect(()=>{if(a)return;let r=Date.now(),n=t.map(i=>{if(i.duration===1/0)return;let l=(i.duration||0)+i.pauseDuration-(r-i.createdAt);if(l<0){i.visible&&u.dismiss(i.id);return}return setTimeout(()=>u.dismiss(i.id),l)});return()=>{n.forEach(i=>i&&clearTimeout(i))}},[t,a]);let s=c.useCallback(()=>{a&&w({type:6,time:Date.now()})},[a]),o=c.useCallback((r,n)=>{let{reverseOrder:i=!1,gutter:l=8,defaultPosition:d}=n||{},p=t.filter(g=>(g.position||d)===(r.position||d)&&g.height),f=p.findIndex(g=>g.id===r.id),m=p.filter((g,j)=>j<f&&g.visible).length;return p.filter(g=>g.visible).slice(...i?[m+1]:[0,m]).reduce((g,j)=>g+(j.height||0)+l,0)},[t]);return{toasts:t,handlers:{updateHeight:ee,startPause:te,endPause:s,calculateOffset:o}}},re=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,oe=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,se=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ie=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${re} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${oe} 0.15s ease-out forwards;
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
    animation: ${se} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ne=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,le=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ne} 1s linear infinite;
`,de=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ce=y`
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
}`,pe=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${de} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ce} 0.2s ease-out forwards;
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
`,ue=b("div")`
  position: absolute;
`,me=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,fe=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ge=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${fe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,he=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return t!==void 0?typeof t=="string"?c.createElement(ge,null,t):t:a==="blank"?null:c.createElement(me,null,c.createElement(le,{...s}),a!=="loading"&&c.createElement(ue,null,a==="error"?c.createElement(ie,{...s}):c.createElement(pe,{...s})))},ye=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ve=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,be="0%{opacity:0;} 100%{opacity:1;}",xe="0%{opacity:1;} 100%{opacity:0;}",we=b("div")`
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
`,ke=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ee=(e,t)=>{let a=e.includes("top")?1:-1,[s,o]=F()?[be,xe]:[ye(a),ve(a)];return{animation:t?`${y(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Me=c.memo(({toast:e,position:t,style:a,children:s})=>{let o=e.height?Ee(e.position||t||"top-center",e.visible):{opacity:0},r=c.createElement(he,{toast:e}),n=c.createElement(ke,{...e.ariaProps},O(e.message,e));return c.createElement(we,{className:e.className,style:{...o,...a,...e.style}},typeof s=="function"?s({icon:r,message:n}):c.createElement(c.Fragment,null,r,n))});q(c.createElement);var Ie=({id:e,className:t,style:a,onHeightUpdate:s,children:o})=>{let r=c.useCallback(n=>{if(n){let i=()=>{let l=n.getBoundingClientRect().height;s(e,l)};i(),new MutationObserver(i).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return c.createElement("div",{ref:r,className:t,style:a},o)},Ce=(e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:F()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...o}},Oe=$`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,E=16,Le=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:o,containerStyle:r,containerClassName:n})=>{let{toasts:i,handlers:l}=ae(a);return c.createElement("div",{style:{position:"fixed",zIndex:9999,top:E,left:E,right:E,bottom:E,pointerEvents:"none",...r},className:n,onMouseEnter:l.startPause,onMouseLeave:l.endPause},i.map(d=>{let p=d.position||t,f=l.calculateOffset(d,{reverseOrder:e,gutter:s,defaultPosition:t}),m=Ce(p,f);return c.createElement(Ie,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?Oe:"",style:m},d.type==="custom"?O(d.message,d):o?o(d):c.createElement(Me,{toast:d,position:p}))}))},_e=u;export{Pe as I,_e as _,Ae as a,Ne as b,Te as c,Se as d,De as e,Le as f,ze as g,Fe as h};
