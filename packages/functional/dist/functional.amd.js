define(["exports","path"],(function(e,t){"use strict";const r={};e.capitalizeFirstLetter=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},e.compose=function(...e){return t=>e.reduce((e,t)=>t(e),t)},e.filterObject=function(e,t){return t.filter(t=>void 0!==e[t]).reduce((t,r)=>({...t,[r]:e[r]}),{})},e.memo=function(e,t){return t&&(r[e]=t),r[e]},e.url=function(e="",...r){return e.replace(/\/$/,"")+r.reduce((e,r="")=>t.join(e,r),"/").replace(/\/$/,"")},Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=functional.amd.js.map
