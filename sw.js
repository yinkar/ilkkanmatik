if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>i(e,o),c={module:{uri:o},exports:t,require:l};s[o]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-61cfd03a"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-9237f458.css",revision:null},{url:"assets/index-aacf7ee8.js",revision:null},{url:"assets/pwa-eab37138.js",revision:null},{url:"assets/workbox-window.prod.es5-295a6886.js",revision:null},{url:"index.html",revision:"21be50703544053145fc3c5368663949"},{url:"favicon.png",revision:"43dc019eb91e4a335b255057a11540e6"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"icon-192.png",revision:"1355a04e54e57ff24448cf70cdb04bf1"},{url:"icon-512.png",revision:"3ca7e6732e0a81d13049e5d3ae3ff158"},{url:"manifest.webmanifest",revision:"7470627e219e131b5cf17cf648004406"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
