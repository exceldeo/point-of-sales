import{r as m,j as e}from"./app-CuRLD6xo.js";import{I as p,a as h}from"./IconEye-DgyA8vw7.js";function b({label:l,type:o,className:d,errors:a,prefix:r,suffix:t,...c}){const s=o==="password",[n,i]=m.useState(!1);return e.jsxs("div",{className:"flex flex-col gap-2",children:[l&&e.jsx("label",{className:"text-sm font-medium text-slate-700 dark:text-slate-300",children:l}),e.jsxs("div",{className:"relative",children:[r&&e.jsx("div",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none",children:r}),e.jsx("input",{type:s&&n?"text":o,className:`
                        w-full h-11 px-4 text-sm rounded-xl
                        border border-slate-200 dark:border-slate-700
                        bg-slate-50 dark:bg-slate-800
                        text-slate-800 dark:text-slate-200
                        placeholder-slate-400 dark:placeholder-slate-500
                        focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                        transition-all duration-200
                        ${r?"pl-10":""}
                        ${t||s?"pr-20":""}
                        ${a?"border-danger-500 focus:border-danger-500 focus:ring-danger-500/20":""}
                        ${d||""}
                    `,...c}),t&&!s&&e.jsx("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none",children:t}),s&&e.jsxs("div",{className:"absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2",children:[t&&e.jsx("span",{className:"text-slate-500 dark:text-slate-400 pointer-events-none",children:t}),e.jsx("button",{type:"button",onClick:()=>i(x=>!x),className:"text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",children:n?e.jsx(p,{size:16}):e.jsx(h,{size:16})})]})]}),a&&e.jsx("small",{className:"text-xs text-danger-500 dark:text-danger-400",children:a})]})}export{b as I};
