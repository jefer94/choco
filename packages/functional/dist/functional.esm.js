import{join as r}from"path";function e(...r){return e=>r.reduce((r,e)=>e(r),e)}function t(r,e){return e.filter(e=>void 0!==r[e]).reduce((e,t)=>({...e,[t]:r[t]}),{})}function n(e="",...t){return e.replace(/\/$/,"")+t.reduce((e,t="")=>r(e,t),"/").replace(/\/$/,"")}const c={};function u(r,e){return e&&(c[r]=e),c[r]}function o(r){return r.charAt(0).toUpperCase()+r.slice(1)}export{o as capitalizeFirstLetter,e as compose,t as filterObject,u as memo,n as url};
//# sourceMappingURL=functional.esm.js.map
