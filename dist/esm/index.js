import e,{useState as t,useEffect as n,useContext as r,createContext as o}from"react";const i={desktopLg:1400,desktopMd:1300,desktopSm:1200,tabletLg:1040,tabletMd:991,tabletSm:840,mobileLg:767,mobileMd:540,mobileSm:400,mobileXsm:350};function s(e,t){const n=t[e];if(!n)throw new Error(`Bad breakpoint variable given: ${e}`);return n}function a(e,t,n){"min-width"===n&&e.reverse();const r=e.reduce(((e,t)=>t.matches?t:e&&e.matches?e:null));t({name:r?r.name:"default",size:r&&r.breakpoint})}const l=(e="max-width")=>{const[r,o]=t({name:"default",size:null}),l=[];n((()=>{Object.keys(i).forEach((t=>{const n=window.matchMedia(`(${e}: ${i[t]}px)`);n.breakpoint=i[t],n.name=t,n.addEventListener("change",(function(){a(l,o,e)})),l.push(n)})),a(l,o,e)}),[]);return{breakpoint:r,setClass:e=>function(e,t){if("object"!=typeof t)throw new Error(`Bad breakpoint type given: ${t} (${typeof t})`);const n=e.default||"";if("default"===t.name)return n;const r=Object.keys(i).reverse(),o=r.indexOf(t.name),s=r.slice(o).find((t=>e[t]))||"default";return"default"===s?n:e[s]}(e,r),bpIsGT:e=>((e,t)=>{const n="string"==typeof e?s(e,i):e;return null===t.size||t.size>n})(e,r),bpIsLT:e=>((e,t)=>{const n="string"==typeof e?s(e,i):e;return null!==t.size&&t.size<=n})(e,r),breakpoints:i}},c=o(null),d=({children:t})=>{const n=l();return e.createElement(c.Provider,{value:{...n}},t)},u=()=>r(c);export{d as BreakpointProvider,l as useBreakpoint,u as useBreakpointContext};