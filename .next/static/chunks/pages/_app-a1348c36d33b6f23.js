(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{6840:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(3191)}])},3991:function(e,t){"use strict";var n,r;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{PrefetchKind:function(){return n},ACTION_REFRESH:function(){return o},ACTION_NAVIGATE:function(){return i},ACTION_RESTORE:function(){return l},ACTION_SERVER_PATCH:function(){return a},ACTION_PREFETCH:function(){return s},ACTION_FAST_REFRESH:function(){return u},ACTION_SERVER_ACTION:function(){return c}});let o="refresh",i="navigate",l="restore",a="server-patch",s="prefetch",u="fast-refresh",c="server-action";(r=n||(n={})).AUTO="auto",r.FULL="full",r.TEMPORARY="temporary",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1516:function(e,t,n){"use strict";function r(e,t,n,r){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return r}}),n(2387),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5569:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return m}});let r=n(8754),o=r._(n(7294)),i=n(4532),l=n(3353),a=n(1410),s=n(9064),u=n(370),c=n(9955),d=n(4224),f=n(508),p=n(1516),h=n(4266),x=n(3991),g=new Set;function b(e,t,n,r,o,i){if(!i&&!(0,l.isLocalURL)(t))return;if(!r.bypassPrefetchedCheck){let o=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,i=t+"%"+n+"%"+o;if(g.has(i))return;g.add(i)}let a=i?e.prefetch(t,o):e.prefetch(t,n,r);Promise.resolve(a).catch(e=>{})}function v(e){return"string"==typeof e?e:(0,a.formatUrl)(e)}let y=o.default.forwardRef(function(e,t){let n,r;let{href:a,as:g,children:y,prefetch:m=null,passHref:j,replace:_,shallow:P,scroll:T,locale:C,onClick:O,onMouseEnter:E,onTouchStart:R,legacyBehavior:w=!1,...I}=e;n=y,w&&("string"==typeof n||"number"==typeof n)&&(n=o.default.createElement("a",null,n));let k=o.default.useContext(c.RouterContext),S=o.default.useContext(d.AppRouterContext),A=null!=k?k:S,M=!k,N=!1!==m,L=null===m?x.PrefetchKind.AUTO:x.PrefetchKind.FULL,{href:z,as:U}=o.default.useMemo(()=>{if(!k){let e=v(a);return{href:e,as:g?v(g):e}}let[e,t]=(0,i.resolveHref)(k,a,!0);return{href:e,as:g?(0,i.resolveHref)(k,g):t||e}},[k,a,g]),F=o.default.useRef(z),H=o.default.useRef(U);w&&(r=o.default.Children.only(n));let D=w?r&&"object"==typeof r&&r.ref:t,[K,V,G]=(0,f.useIntersection)({rootMargin:"200px"}),q=o.default.useCallback(e=>{(H.current!==U||F.current!==z)&&(G(),H.current=U,F.current=z),K(e),D&&("function"==typeof D?D(e):"object"==typeof D&&(D.current=e))},[U,D,z,G,K]);o.default.useEffect(()=>{A&&V&&N&&b(A,z,U,{locale:C},{kind:L},M)},[U,z,V,C,N,null==k?void 0:k.locale,A,M,L]);let B={ref:q,onClick(e){w||"function"!=typeof O||O(e),w&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),A&&!e.defaultPrevented&&function(e,t,n,r,i,a,s,u,c,d){let{nodeName:f}=e.currentTarget,p="A"===f.toUpperCase();if(p&&(function(e){let t=e.currentTarget,n=t.getAttribute("target");return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!c&&!(0,l.isLocalURL)(n)))return;e.preventDefault();let h=()=>{let e=null==s||s;"beforePopState"in t?t[i?"replace":"push"](n,r,{shallow:a,locale:u,scroll:e}):t[i?"replace":"push"](r||n,{forceOptimisticNavigation:!d,scroll:e})};c?o.default.startTransition(h):h()}(e,A,z,U,_,P,T,C,M,N)},onMouseEnter(e){w||"function"!=typeof E||E(e),w&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),A&&(N||!M)&&b(A,z,U,{locale:C,priority:!0,bypassPrefetchedCheck:!0},{kind:L},M)},onTouchStart(e){w||"function"!=typeof R||R(e),w&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),A&&(N||!M)&&b(A,z,U,{locale:C,priority:!0,bypassPrefetchedCheck:!0},{kind:L},M)}};if((0,s.isAbsoluteUrl)(U))B.href=U;else if(!w||j||"a"===r.type&&!("href"in r.props)){let e=void 0!==C?C:null==k?void 0:k.locale,t=(null==k?void 0:k.isLocaleDomain)&&(0,p.getDomainLocale)(U,e,null==k?void 0:k.locales,null==k?void 0:k.domainLocales);B.href=t||(0,h.addBasePath)((0,u.addLocale)(U,e,null==k?void 0:k.defaultLocale))}return w?o.default.cloneElement(r,B):o.default.createElement("a",{...I,...B},n)}),m=y;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},508:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return s}});let r=n(7294),o=n(29),i="function"==typeof IntersectionObserver,l=new Map,a=[];function s(e){let{rootRef:t,rootMargin:n,disabled:s}=e,u=s||!i,[c,d]=(0,r.useState)(!1),f=(0,r.useRef)(null),p=(0,r.useCallback)(e=>{f.current=e},[]);(0,r.useEffect)(()=>{if(i){if(u||c)return;let e=f.current;if(e&&e.tagName){let r=function(e,t,n){let{id:r,observer:o,elements:i}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=a.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=l.get(r)))return t;let o=new Map,i=new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:i,elements:o},a.push(n),l.set(n,t),t}(n);return i.set(e,t),o.observe(e),function(){if(i.delete(e),o.unobserve(e),0===i.size){o.disconnect(),l.delete(r);let e=a.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&a.splice(e,1)}}}(e,e=>e&&d(e),{root:null==t?void 0:t.current,rootMargin:n});return r}}else if(!c){let e=(0,o.requestIdleCallback)(()=>d(!0));return()=>(0,o.cancelIdleCallback)(e)}},[u,n,t,c,f.current]);let h=(0,r.useCallback)(()=>{d(!1)},[]);return[p,c,h]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3191:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var r=n(5893),o=n(7294),i=n(9008),l=n.n(i),a=n(4298),s=n.n(a),u=n(1664),c=n.n(u),d=n(1163);function f(e){let{role:t,content:n}=e;return(0,r.jsx)("div",{className:"message-bubble ".concat(t),children:n})}function p(e){let{isPage1Override:t}=e,[n,i]=(0,o.useState)([]),[l,a]=(0,o.useState)(""),[s,u]=(0,o.useState)(!1),c=(0,o.useRef)(null),d=()=>{var e;null===(e=c.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})};(0,o.useEffect)(()=>{d()},[n]);let p=e=>{if(!e||!e[0])return;let t=e[0],n=new FileReader;n.onload=e=>{var n;let r=null===(n=e.target)||void 0===n?void 0:n.result;if(!r||"string"!=typeof r)return;let o={role:"user",content:"File uploaded: ".concat(t.name,", size=").concat(t.size," bytes, base64Len=").concat(r.length)};i(e=>[...e,o])},n.readAsDataURL(t)},h=async()=>{if(!l.trim())return;let e={role:"user",content:l.trim()};i(t=>[...t,e]),a(""),u(!0);try{var t,r,o;let l=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-4",messages:[...n,e]})}),a=await l.json(),s=(null==a?void 0:null===(o=a.choices)||void 0===o?void 0:null===(r=o[0])||void 0===r?void 0:null===(t=r.message)||void 0===t?void 0:t.content)||"",c="",d=0,f=setInterval(()=>{d<s.length?(c+=s.charAt(d++),i(e=>{let t=e[e.length-1];return t&&"assistant"===t.role?[...e.slice(0,-1),{role:"assistant",content:c}]:[...e,{role:"assistant",content:c}]})):(clearInterval(f),u(!1))},25)}catch(e){console.error("Error calling /api/chat:",e),u(!1)}},x={display:"flex",flexDirection:"column",background:"#fafafa",borderTop:"1px solid #ddd",borderLeft:"1px solid #ddd",borderRight:"1px solid #ddd",borderRadius:"8px 8px 0 0",overflow:"hidden",width:"100%"};return t?x.height="calc(100vh - 60px - 80px)":(x.height="60vh",x.maxWidth="800px",x.margin="0 auto"),(0,r.jsxs)("div",{style:x,children:[(0,r.jsxs)("div",{style:{flex:1,overflowY:"auto",padding:"1rem"},children:[n.map((e,t)=>(0,r.jsx)(f,{role:e.role,content:e.content},t)),(0,r.jsx)("div",{ref:c})]}),(0,r.jsxs)("div",{style:{display:"flex",gap:"0.5rem",padding:"0.75rem",borderTop:"1px solid #ccc",background:"#f3f3f3"},children:[(0,r.jsx)("input",{type:"file",style:{background:"#fff",border:"1px solid #ccc",borderRadius:"4px",cursor:"pointer",padding:"0.3rem"},onChange:e=>p(e.target.files)}),(0,r.jsx)("textarea",{style:{flex:1,resize:"none",border:"1px solid #ccc",borderRadius:"4px",padding:"0.75rem",fontSize:"0.95rem",fontFamily:"sans-serif"},placeholder:"(Reference: chatgpt.com) Enter message or attach file...",value:l,onChange:e=>a(e.target.value),disabled:s}),(0,r.jsx)("button",{style:{background:"#31a37d",color:"#fff",border:"none",borderRadius:"4px",padding:"0 16px",fontSize:"1rem",cursor:"pointer"},onClick:h,disabled:s||!l.trim(),children:s?"...":"Send"})]})]})}function h(){return(0,r.jsxs)("header",{style:{position:"fixed",top:0,left:0,height:"60px",width:"100%",zIndex:9999,background:"#222",display:"flex",alignItems:"center",padding:"0 1rem",color:"#fff"},children:[(0,r.jsx)("span",{style:{fontWeight:"bold",marginRight:"2rem"},children:"GPT-4 Model"}),(0,r.jsxs)("nav",{style:{display:"flex",gap:"1rem",fontSize:"1rem"},children:[(0,r.jsx)(c(),{href:"/",children:(0,r.jsx)("span",{style:{cursor:"pointer"},children:"Page1"})}),(0,r.jsx)(c(),{href:"/page2",children:(0,r.jsx)("span",{style:{cursor:"pointer"},children:"Page2"})}),(0,r.jsx)(c(),{href:"/page3",children:(0,r.jsx)("span",{style:{cursor:"pointer"},children:"Page3"})}),(0,r.jsx)(c(),{href:"/page4",children:(0,r.jsx)("span",{style:{cursor:"pointer"},children:"Page4"})}),(0,r.jsx)(c(),{href:"/page5",children:(0,r.jsx)("span",{style:{cursor:"pointer"},children:"Page5"})}),(0,r.jsx)(c(),{href:"/page6",children:(0,r.jsx)("span",{style:{cursor:"pointer"},children:"Page6"})})]})]})}function x(){let[e,t]=o.useState(!1);return(0,r.jsxs)("div",{style:{position:"fixed",top:"60px",right:"1rem",zIndex:9999,fontSize:"0.9rem"},children:[(0,r.jsx)("button",{style:{background:"#444",color:"#fff",border:"none",borderRadius:"4px",padding:"0.4rem 0.8rem",cursor:"pointer"},onClick:()=>t(!e),children:e?"Hide Transformer":"Show Transformer"}),e&&(0,r.jsxs)("div",{style:{marginTop:"0.3rem",background:"rgba(0,0,0,0.85)",color:"#fff",padding:"1rem",borderRadius:"8px",width:"280px",boxShadow:"0 4px 8px rgba(0,0,0,0.4)"},children:[(0,r.jsx)("h4",{style:{marginBottom:"0.3rem"},children:"Attention Is All You Need (2017)"}),(0,r.jsxs)("p",{style:{fontSize:"0.88rem",lineHeight:"1.4"},children:["Visualize multi-head attention or see how Q-K-V are computed in real-time.",(0,r.jsx)("br",{}),(0,r.jsx)("a",{href:"https://arxiv.org/abs/1706.03762",target:"_blank",rel:"noreferrer",style:{color:"#66ffcc",textDecoration:"underline"},children:"[arXiv:1706.03762]"})]})]})]})}function g(e){let{Component:t,pageProps:n}=e,i=(0,d.useRouter)();return(0,o.useEffect)(()=>{},[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(l(),{children:[(0,r.jsx)("title",{children:"0 - The Ultimate GPT-4 Quantum Clone"}),(0,r.jsx)("meta",{name:"description",content:"0: GPT-4 based ChatGPT-like site with quantum illusions, synergy, unstoppable expansions."}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"})]}),(0,r.jsx)(s(),{src:"/js/quantum3D.js",strategy:"beforeInteractive"}),(0,r.jsx)(s(),{src:"/js/starsAnim.js",strategy:"beforeInteractive"}),(0,r.jsx)(s(),{src:"/js/waveAnim.js",strategy:"beforeInteractive"}),(0,r.jsxs)("div",{style:{position:"fixed",inset:0,zIndex:0},children:[(0,r.jsx)("canvas",{id:"bg-canvas",className:"bg-canvas-layer"}),(0,r.jsx)("canvas",{id:"stars-canvas",className:"bg-canvas-layer"}),(0,r.jsx)("canvas",{id:"wave-canvas",className:"bg-canvas-layer"})]}),(0,r.jsxs)("div",{style:{position:"relative",zIndex:1,paddingTop:"60px",paddingBottom:"80px",minHeight:"100vh",boxSizing:"border-box"},children:[(0,r.jsx)(h,{}),(0,r.jsx)(x,{}),(0,r.jsx)(t,{...n})]}),(0,r.jsx)("footer",{style:{position:"fixed",bottom:0,left:0,height:"80px",width:"100%",background:"#f0f0f0",boxShadow:"0 -2px 6px rgba(0,0,0,0.2)",zIndex:1e4,display:"flex",alignItems:"center"},children:(0,r.jsx)(p,{isPage1Override:"/"===i.pathname})})]})}n(5950),n(9531),n(3442),n(7799),n(1275),n(113),n(4173),n(7803)},5950:function(){},9531:function(){},3442:function(){},7799:function(){},1275:function(){},113:function(){},4173:function(){},7803:function(){},9008:function(e,t,n){e.exports=n(2636)},1664:function(e,t,n){e.exports=n(5569)},1163:function(e,t,n){e.exports=n(6885)},4298:function(e,t,n){e.exports=n(5442)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return t(6840),t(6885)}),_N_E=e.O()}]);