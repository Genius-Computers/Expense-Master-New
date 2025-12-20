var P=(e,t,a)=>(s,r)=>{let l=-1;return o(0);async function o(i){if(i<=l)throw new Error("next() called multiple times");l=i;let n,d=!1,p;if(e[i]?(p=e[i][0][0],s.req.routeIndex=i):p=i===e.length&&r||void 0,p)try{n=await p(s,()=>o(i+1))}catch(u){if(u instanceof Error&&t)s.error=u,n=await t(u,s),d=!0;else throw u}else s.finalized===!1&&a&&(n=await a(s));return n&&(s.finalized===!1||d)&&(s.res=n),s}},me=Symbol(),ge=async(e,t=Object.create(null))=>{const{all:a=!1,dot:s=!1}=t,l=(e instanceof Q?e.raw.headers:e.headers).get("Content-Type");return l?.startsWith("multipart/form-data")||l?.startsWith("application/x-www-form-urlencoded")?be(e,{all:a,dot:s}):{}};async function be(e,t){const a=await e.formData();return a?fe(a,t):{}}function fe(e,t){const a=Object.create(null);return e.forEach((s,r)=>{t.all||r.endsWith("[]")?xe(a,r,s):a[r]=s}),t.dot&&Object.entries(a).forEach(([s,r])=>{s.includes(".")&&(he(a,s,r),delete a[s])}),a}var xe=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},he=(e,t,a)=>{let s=e;const r=t.split(".");r.forEach((l,o)=>{o===r.length-1?s[l]=a:((!s[l]||typeof s[l]!="object"||Array.isArray(s[l])||s[l]instanceof File)&&(s[l]=Object.create(null)),s=s[l])})},z=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},ye=e=>{const{groups:t,path:a}=ve(e),s=z(a);return we(s,t)},ve=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,s)=>{const r=`@${s}`;return t.push([r,a]),r}),{groups:t,path:e}},we=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[s]=t[a];for(let r=e.length-1;r>=0;r--)if(e[r].includes(s)){e[r]=e[r].replace(s,t[a][1]);break}}return e},L={},_e=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const s=`${e}#${t}`;return L[s]||(a[2]?L[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:L[s]=[e,a[1],!0]),L[s]}return null},N=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},ke=e=>N(e,decodeURI),Y=e=>{const t=e.url,a=t.indexOf("/",t.indexOf(":")+4);let s=a;for(;s<t.length;s++){const r=t.charCodeAt(s);if(r===37){const l=t.indexOf("?",s),o=t.slice(a,l===-1?void 0:l);return ke(o.includes("%25")?o.replace(/%25/g,"%2525"):o)}else if(r===63)break}return t.slice(a,s)},Ee=e=>{const t=Y(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},$=(e,t,...a)=>(a.length&&(t=$(t,...a)),`${e?.[0]==="/"?"":"/"}${e}${t==="/"?"":`${e?.at(-1)==="/"?"":"/"}${t?.[0]==="/"?t.slice(1):t}`}`),J=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let s="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))s+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){a.length===0&&s===""?a.push("/"):a.push(s);const l=r.replace("?","");s+="/"+l,a.push(s)}else s+="/"+r}),a.filter((r,l,o)=>o.indexOf(r)===l)},O=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?N(e,G):e):e,V=(e,t,a)=>{let s;if(!a&&t&&!/[%+]/.test(t)){let o=e.indexOf("?",8);if(o===-1)return;for(e.startsWith(t,o+1)||(o=e.indexOf(`&${t}`,o+1));o!==-1;){const i=e.charCodeAt(o+t.length+1);if(i===61){const n=o+t.length+2,d=e.indexOf("&",n);return O(e.slice(n,d===-1?void 0:d))}else if(i==38||isNaN(i))return"";o=e.indexOf(`&${t}`,o+1)}if(s=/[%+]/.test(e),!s)return}const r={};s??=/[%+]/.test(e);let l=e.indexOf("?",8);for(;l!==-1;){const o=e.indexOf("&",l+1);let i=e.indexOf("=",l);i>o&&o!==-1&&(i=-1);let n=e.slice(l+1,i===-1?o===-1?void 0:o:i);if(s&&(n=O(n)),l=o,n==="")continue;let d;i===-1?d="":(d=e.slice(i+1,o===-1?void 0:o),s&&(d=O(d))),a?(r[n]&&Array.isArray(r[n])||(r[n]=[]),r[n].push(d)):r[n]??=d}return t?r[t]:r},Se=V,Te=(e,t)=>V(e,t,!0),G=decodeURIComponent,H=e=>N(e,G),Q=class{raw;#t;#e;routeIndex=0;path;bodyCache={};constructor(e,t="/",a=[[]]){this.raw=e,this.path=t,this.#e=a,this.#t={}}param(e){return e?this.#a(e):this.#l()}#a(e){const t=this.#e[0][this.routeIndex][1][e],a=this.#r(t);return a&&/\%/.test(a)?H(a):a}#l(){const e={},t=Object.keys(this.#e[0][this.routeIndex][1]);for(const a of t){const s=this.#r(this.#e[0][this.routeIndex][1][a]);s!==void 0&&(e[a]=/\%/.test(s)?H(s):s)}return e}#r(e){return this.#e[1]?this.#e[1][e]:e}query(e){return Se(this.url,e)}queries(e){return Te(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,s)=>{t[s]=a}),t}async parseBody(e){return this.bodyCache.parsedBody??=await ge(this,e)}#s=e=>{const{bodyCache:t,raw:a}=this,s=t[e];if(s)return s;const r=Object.keys(t)[0];return r?t[r].then(l=>(r==="json"&&(l=JSON.stringify(l)),new Response(l)[e]())):t[e]=a[e]()};json(){return this.#s("text").then(e=>JSON.parse(e))}text(){return this.#s("text")}arrayBuffer(){return this.#s("arrayBuffer")}blob(){return this.#s("blob")}formData(){return this.#s("formData")}addValidatedData(e,t){this.#t[e]=t}valid(e){return this.#t[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[me](){return this.#e}get matchedRoutes(){return this.#e[0].map(([[,e]])=>e)}get routePath(){return this.#e[0].map(([[,e]])=>e)[this.routeIndex].path}},Ie={Stringify:1},X=async(e,t,a,s,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const l=e.callbacks;return l?.length?(r?r[0]+=e:r=[e],Promise.all(l.map(i=>i({phase:t,buffer:r,context:s}))).then(i=>Promise.all(i.filter(Boolean).map(n=>X(n,t,!1,s,r))).then(()=>r[0]))):Promise.resolve(e)},$e="text/plain; charset=UTF-8",F=(e,t)=>({"Content-Type":e,...t}),De=class{#t;#e;env={};#a;finalized=!1;error;#l;#r;#s;#c;#i;#d;#n;#p;#u;constructor(e,t){this.#t=e,t&&(this.#r=t.executionCtx,this.env=t.env,this.#d=t.notFoundHandler,this.#u=t.path,this.#p=t.matchResult)}get req(){return this.#e??=new Q(this.#t,this.#u,this.#p),this.#e}get event(){if(this.#r&&"respondWith"in this.#r)return this.#r;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#r)return this.#r;throw Error("This context has no ExecutionContext")}get res(){return this.#s||=new Response(null,{headers:this.#n??=new Headers})}set res(e){if(this.#s&&e){e=new Response(e.body,e);for(const[t,a]of this.#s.headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=this.#s.headers.getSetCookie();e.headers.delete("set-cookie");for(const r of s)e.headers.append("set-cookie",r)}else e.headers.set(t,a)}this.#s=e,this.finalized=!0}render=(...e)=>(this.#i??=t=>this.html(t),this.#i(...e));setLayout=e=>this.#c=e;getLayout=()=>this.#c;setRenderer=e=>{this.#i=e};header=(e,t,a)=>{this.finalized&&(this.#s=new Response(this.#s.body,this.#s));const s=this.#s?this.#s.headers:this.#n??=new Headers;t===void 0?s.delete(e):a?.append?s.append(e,t):s.set(e,t)};status=e=>{this.#l=e};set=(e,t)=>{this.#a??=new Map,this.#a.set(e,t)};get=e=>this.#a?this.#a.get(e):void 0;get var(){return this.#a?Object.fromEntries(this.#a):{}}#o(e,t,a){const s=this.#s?new Headers(this.#s.headers):this.#n??new Headers;if(typeof t=="object"&&"headers"in t){const l=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[o,i]of l)o.toLowerCase()==="set-cookie"?s.append(o,i):s.set(o,i)}if(a)for(const[l,o]of Object.entries(a))if(typeof o=="string")s.set(l,o);else{s.delete(l);for(const i of o)s.append(l,i)}const r=typeof t=="number"?t:t?.status??this.#l;return new Response(e,{status:r,headers:s})}newResponse=(...e)=>this.#o(...e);body=(e,t,a)=>this.#o(e,t,a);text=(e,t,a)=>!this.#n&&!this.#l&&!t&&!a&&!this.finalized?new Response(e):this.#o(e,t,F($e,a));json=(e,t,a)=>this.#o(JSON.stringify(e),t,F("application/json",a));html=(e,t,a)=>{const s=r=>this.#o(r,t,F("text/html; charset=UTF-8",a));return typeof e=="object"?X(e,Ie.Stringify,!1,{}).then(s):s(e)};redirect=(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)};notFound=()=>(this.#d??=()=>new Response,this.#d(this))},y="ALL",Be="all",Re=["get","post","put","delete","options","patch"],K="Can not add a route since the matcher is already built.",Z=class extends Error{},Ce="__COMPOSED_HANDLER",qe=e=>e.text("404 Not Found",404),U=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},Le=class ee{get;post;put;delete;options;patch;all;on;use;router;getPath;_basePath="/";#t="/";routes=[];constructor(t={}){[...Re,Be].forEach(l=>{this[l]=(o,...i)=>(typeof o=="string"?this.#t=o:this.#l(l,this.#t,o),i.forEach(n=>{this.#l(l,this.#t,n)}),this)}),this.on=(l,o,...i)=>{for(const n of[o].flat()){this.#t=n;for(const d of[l].flat())i.map(p=>{this.#l(d.toUpperCase(),this.#t,p)})}return this},this.use=(l,...o)=>(typeof l=="string"?this.#t=l:(this.#t="*",o.unshift(l)),o.forEach(i=>{this.#l(y,this.#t,i)}),this);const{strict:s,...r}=t;Object.assign(this,r),this.getPath=s??!0?t.getPath??Y:Ee}#e(){const t=new ee({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,t.#a=this.#a,t.routes=this.routes,t}#a=qe;errorHandler=U;route(t,a){const s=this.basePath(t);return a.routes.map(r=>{let l;a.errorHandler===U?l=r.handler:(l=async(o,i)=>(await P([],a.errorHandler)(o,()=>r.handler(o,i))).res,l[Ce]=r.handler),s.#l(r.method,r.path,l)}),this}basePath(t){const a=this.#e();return a._basePath=$(this._basePath,t),a}onError=t=>(this.errorHandler=t,this);notFound=t=>(this.#a=t,this);mount(t,a,s){let r,l;s&&(typeof s=="function"?l=s:(l=s.optionHandler,s.replaceRequest===!1?r=n=>n:r=s.replaceRequest));const o=l?n=>{const d=l(n);return Array.isArray(d)?d:[d]}:n=>{let d;try{d=n.executionCtx}catch{}return[n.env,d]};r||=(()=>{const n=$(this._basePath,t),d=n==="/"?0:n.length;return p=>{const u=new URL(p.url);return u.pathname=u.pathname.slice(d)||"/",new Request(u,p)}})();const i=async(n,d)=>{const p=await a(r(n.req.raw),...o(n));if(p)return p;await d()};return this.#l(y,$(t,"*"),i),this}#l(t,a,s){t=t.toUpperCase(),a=$(this._basePath,a);const r={basePath:this._basePath,path:a,method:t,handler:s};this.router.add(t,a,[s,r]),this.routes.push(r)}#r(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t}#s(t,a,s,r){if(r==="HEAD")return(async()=>new Response(null,await this.#s(t,a,s,"GET")))();const l=this.getPath(t,{env:s}),o=this.router.match(r,l),i=new De(t,{path:l,matchResult:o,env:s,executionCtx:a,notFoundHandler:this.#a});if(o[0].length===1){let d;try{d=o[0][0][0][0](i,async()=>{i.res=await this.#a(i)})}catch(p){return this.#r(p,i)}return d instanceof Promise?d.then(p=>p||(i.finalized?i.res:this.#a(i))).catch(p=>this.#r(p,i)):d??this.#a(i)}const n=P(o[0],this.errorHandler,this.#a);return(async()=>{try{const d=await n(i);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return this.#r(d,i)}})()}fetch=(t,...a)=>this.#s(t,a[1],a[0],t.method);request=(t,a,s,r)=>t instanceof Request?this.fetch(a?new Request(t,a):t,s,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${$("/",t)}`,a),s,r));fire=()=>{addEventListener("fetch",t=>{t.respondWith(this.#s(t.request,t,void 0,t.request.method))})}},te=[];function je(e,t){const a=this.buildAllMatchers(),s=((r,l)=>{const o=a[r]||a[y],i=o[2][l];if(i)return i;const n=l.match(o[0]);if(!n)return[[],te];const d=n.indexOf("",1);return[o[1][d],n]});return this.match=s,s(e,t)}var j="[^/]+",C=".*",q="(?:|/.*)",D=Symbol(),Oe=new Set(".\\+*[^]$()");function Fe(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===C||e===q?1:t===C||t===q?-1:e===j?1:t===j?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Me=class M{#t;#e;#a=Object.create(null);insert(t,a,s,r,l){if(t.length===0){if(this.#t!==void 0)throw D;if(l)return;this.#t=a;return}const[o,...i]=t,n=o==="*"?i.length===0?["","",C]:["","",j]:o==="/*"?["","",q]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(n){const p=n[1];let u=n[2]||j;if(p&&n[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw D;if(d=this.#a[u],!d){if(Object.keys(this.#a).some(m=>m!==C&&m!==q))throw D;if(l)return;d=this.#a[u]=new M,p!==""&&(d.#e=r.varIndex++)}!l&&p!==""&&s.push([p,d.#e])}else if(d=this.#a[o],!d){if(Object.keys(this.#a).some(p=>p.length>1&&p!==C&&p!==q))throw D;if(l)return;d=this.#a[o]=new M}d.insert(i,a,s,r,l)}buildRegExpStr(){const a=Object.keys(this.#a).sort(Fe).map(s=>{const r=this.#a[s];return(typeof r.#e=="number"?`(${s})@${r.#e}`:Oe.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof this.#t=="number"&&a.unshift(`#${this.#t}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},Ne=class{#t={varIndex:0};#e=new Me;insert(e,t,a){const s=[],r=[];for(let o=0;;){let i=!1;if(e=e.replace(/\{[^}]+\}/g,n=>{const d=`@\\${o}`;return r[o]=[d,n],o++,i=!0,d}),!i)break}const l=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=r.length-1;o>=0;o--){const[i]=r[o];for(let n=l.length-1;n>=0;n--)if(l[n].indexOf(i)!==-1){l[n]=l[n].replace(i,r[o][1]);break}}return this.#e.insert(l,t,s,this.#t,a),s}buildRegExp(){let e=this.#e.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,l,o)=>l!==void 0?(a[++t]=Number(l),"$()"):(o!==void 0&&(s[Number(o)]=++t),"")),[new RegExp(`^${e}`),a,s]}},Ae=[/^$/,[],Object.create(null)],ae=Object.create(null);function se(e){return ae[e]??=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`)}function Pe(){ae=Object.create(null)}function He(e){const t=new Ne,a=[];if(e.length===0)return Ae;const s=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,p],[u,m])=>d?1:u?-1:p.length-m.length),r=Object.create(null);for(let d=0,p=-1,u=s.length;d<u;d++){const[m,b,g]=s[d];m?r[b]=[g.map(([x])=>[x,Object.create(null)]),te]:p++;let f;try{f=t.insert(b,p,m)}catch(x){throw x===D?new Z(b):x}m||(a[p]=g.map(([x,h])=>{const _=Object.create(null);for(h-=1;h>=0;h--){const[w,v]=f[h];_[w]=v}return[x,_]}))}const[l,o,i]=t.buildRegExp();for(let d=0,p=a.length;d<p;d++)for(let u=0,m=a[d].length;u<m;u++){const b=a[d][u]?.[1];if(!b)continue;const g=Object.keys(b);for(let f=0,x=g.length;f<x;f++)b[g[f]]=i[b[g[f]]]}const n=[];for(const d in o)n[d]=a[o[d]];return[l,n,r]}function I(e,t){if(e){for(const a of Object.keys(e).sort((s,r)=>r.length-s.length))if(se(a).test(t))return[...e[a]]}}var Ue=class{name="RegExpRouter";#t;#e;constructor(){this.#t={[y]:Object.create(null)},this.#e={[y]:Object.create(null)}}add(e,t,a){const s=this.#t,r=this.#e;if(!s||!r)throw new Error(K);s[e]||[s,r].forEach(i=>{i[e]=Object.create(null),Object.keys(i[y]).forEach(n=>{i[e][n]=[...i[y][n]]})}),t==="/*"&&(t="*");const l=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const i=se(t);e===y?Object.keys(s).forEach(n=>{s[n][t]||=I(s[n],t)||I(s[y],t)||[]}):s[e][t]||=I(s[e],t)||I(s[y],t)||[],Object.keys(s).forEach(n=>{(e===y||e===n)&&Object.keys(s[n]).forEach(d=>{i.test(d)&&s[n][d].push([a,l])})}),Object.keys(r).forEach(n=>{(e===y||e===n)&&Object.keys(r[n]).forEach(d=>i.test(d)&&r[n][d].push([a,l]))});return}const o=J(t)||[t];for(let i=0,n=o.length;i<n;i++){const d=o[i];Object.keys(r).forEach(p=>{(e===y||e===p)&&(r[p][d]||=[...I(s[p],d)||I(s[y],d)||[]],r[p][d].push([a,l-n+i+1]))})}}match=je;buildAllMatchers(){const e=Object.create(null);return Object.keys(this.#e).concat(Object.keys(this.#t)).forEach(t=>{e[t]||=this.#a(t)}),this.#t=this.#e=void 0,Pe(),e}#a(e){const t=[];let a=e===y;return[this.#t,this.#e].forEach(s=>{const r=s[e]?Object.keys(s[e]).map(l=>[l,s[e][l]]):[];r.length!==0?(a||=!0,t.push(...r)):e!==y&&t.push(...Object.keys(s[y]).map(l=>[l,s[y][l]]))}),a?He(t):null}},We=class{name="SmartRouter";#t=[];#e=[];constructor(e){this.#t=e.routers}add(e,t,a){if(!this.#e)throw new Error(K);this.#e.push([e,t,a])}match(e,t){if(!this.#e)throw new Error("Fatal error");const a=this.#t,s=this.#e,r=a.length;let l=0,o;for(;l<r;l++){const i=a[l];try{for(let n=0,d=s.length;n<d;n++)i.add(...s[n]);o=i.match(e,t)}catch(n){if(n instanceof Z)continue;throw n}this.match=i.match.bind(i),this.#t=[i],this.#e=void 0;break}if(l===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(this.#e||this.#t.length!==1)throw new Error("No active router has been determined yet.");return this.#t[0]}},R=Object.create(null),ze=class re{#t;#e;#a;#l=0;#r=R;constructor(t,a,s){if(this.#e=s||Object.create(null),this.#t=[],t&&a){const r=Object.create(null);r[t]={handler:a,possibleKeys:[],score:0},this.#t=[r]}this.#a=[]}insert(t,a,s){this.#l=++this.#l;let r=this;const l=ye(a),o=[];for(let i=0,n=l.length;i<n;i++){const d=l[i],p=l[i+1],u=_e(d,p),m=Array.isArray(u)?u[0]:d;if(m in r.#e){r=r.#e[m],u&&o.push(u[1]);continue}r.#e[m]=new re,u&&(r.#a.push(u),o.push(u[1])),r=r.#e[m]}return r.#t.push({[t]:{handler:s,possibleKeys:o.filter((i,n,d)=>d.indexOf(i)===n),score:this.#l}}),r}#s(t,a,s,r){const l=[];for(let o=0,i=t.#t.length;o<i;o++){const n=t.#t[o],d=n[a]||n[y],p={};if(d!==void 0&&(d.params=Object.create(null),l.push(d),s!==R||r&&r!==R))for(let u=0,m=d.possibleKeys.length;u<m;u++){const b=d.possibleKeys[u],g=p[d.score];d.params[b]=r?.[b]&&!g?r[b]:s[b]??r?.[b],p[d.score]=!0}}return l}search(t,a){const s=[];this.#r=R;let l=[this];const o=z(a),i=[];for(let n=0,d=o.length;n<d;n++){const p=o[n],u=n===d-1,m=[];for(let b=0,g=l.length;b<g;b++){const f=l[b],x=f.#e[p];x&&(x.#r=f.#r,u?(x.#e["*"]&&s.push(...this.#s(x.#e["*"],t,f.#r)),s.push(...this.#s(x,t,f.#r))):m.push(x));for(let h=0,_=f.#a.length;h<_;h++){const w=f.#a[h],v=f.#r===R?{}:{...f.#r};if(w==="*"){const T=f.#e["*"];T&&(s.push(...this.#s(T,t,f.#r)),T.#r=v,m.push(T));continue}const[E,A,B]=w;if(!p&&!(B instanceof RegExp))continue;const S=f.#e[E],pe=o.slice(n).join("/");if(B instanceof RegExp){const T=B.exec(pe);if(T){if(v[A]=T[0],s.push(...this.#s(S,t,f.#r,v)),Object.keys(S.#e).length){S.#r=v;const ue=T[0].match(/\//)?.length??0;(i[ue]||=[]).push(S)}continue}}(B===!0||B.test(p))&&(v[A]=p,u?(s.push(...this.#s(S,t,v,f.#r)),S.#e["*"]&&s.push(...this.#s(S.#e["*"],t,v,f.#r))):(S.#r=v,m.push(S)))}}l=m.concat(i.shift()??[])}return s.length>1&&s.sort((n,d)=>n.score-d.score),[s.map(({handler:n,params:d})=>[n,d])]}},Ye=class{name="TrieRouter";#t;constructor(){this.#t=new ze}add(e,t,a){const s=J(t);if(s){for(let r=0,l=s.length;r<l;r++)this.#t.insert(e,s[r],a);return}this.#t.insert(e,t,a)}match(e,t){return this.#t.search(e,t)}},le=class extends Le{constructor(e={}){super(e),this.router=e.router??new We({routers:[new Ue,new Ye]})}},Je=e=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(l=>typeof l=="string"?l==="*"?()=>l:o=>l===o?o:null:typeof l=="function"?l:o=>l.includes(o)?o:null)(a.origin),r=(l=>typeof l=="function"?l:Array.isArray(l)?()=>l:()=>[])(a.allowMethods);return async function(o,i){function n(p,u){o.res.headers.set(p,u)}const d=await s(o.req.header("origin")||"",o);if(d&&n("Access-Control-Allow-Origin",d),a.credentials&&n("Access-Control-Allow-Credentials","true"),a.exposeHeaders?.length&&n("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),o.req.method==="OPTIONS"){a.origin!=="*"&&n("Vary","Origin"),a.maxAge!=null&&n("Access-Control-Max-Age",a.maxAge.toString());const p=await r(o.req.header("origin")||"",o);p.length&&n("Access-Control-Allow-Methods",p.join(","));let u=a.allowHeaders;if(!u?.length){const m=o.req.header("Access-Control-Request-Headers");m&&(u=m.split(/\s*,\s*/))}return u?.length&&(n("Access-Control-Allow-Headers",u.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await i(),a.origin!=="*"&&o.header("Vary","Origin",{append:!0})}};const Ve=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منصة حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
    <div class="container mx-auto px-4 py-12">
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-12">
                <i class="fas fa-calculator text-6xl text-blue-600 mb-4"></i>
                <h1 class="text-5xl font-bold text-gray-800 mb-4">منصة حاسبة التمويل</h1>
                <p class="text-xl text-gray-600">نظام شامل لإدارة التمويل والعملاء والبنوك</p>
            </div>
            
            <!-- Main Links -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
                <a href="/calculator" class="block bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
                    <i class="fas fa-calculator text-5xl mb-4"></i>
                    <h2 class="text-2xl font-bold mb-2">الحاسبة</h2>
                    <p class="text-blue-100">احسب التمويل المناسب لك</p>
                </a>
                
                <a href="/login" class="block bg-gradient-to-br from-green-500 to-green-700 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
                    <i class="fas fa-sign-in-alt text-5xl mb-4"></i>
                    <h2 class="text-2xl font-bold mb-2">تسجيل الدخول</h2>
                    <p class="text-green-100">دخول الموظفين</p>
                </a>
            </div>
            
            <!-- Features -->
            <div class="bg-white rounded-2xl shadow-xl p-8">
                <h3 class="text-2xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-star text-yellow-500 ml-2"></i>
                    مميزات النظام
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex items-start">
                        <i class="fas fa-calculator text-blue-500 text-2xl ml-3 mt-1"></i>
                        <div>
                            <h4 class="font-bold text-lg mb-1">حاسبة تمويل متقدمة</h4>
                            <p class="text-gray-600">حساب دقيق لجميع أنواع التمويل</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <i class="fas fa-university text-green-500 text-2xl ml-3 mt-1"></i>
                        <div>
                            <h4 class="font-bold text-lg mb-1">إدارة البنوك والنسب</h4>
                            <p class="text-gray-600">تحديث نسب التمويل لجميع البنوك</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <i class="fas fa-users text-purple-500 text-2xl ml-3 mt-1"></i>
                        <div>
                            <h4 class="font-bold text-lg mb-1">إدارة المستخدمين</h4>
                            <p class="text-gray-600">نظام صلاحيات كامل</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <i class="fas fa-file-invoice-dollar text-orange-500 text-2xl ml-3 mt-1"></i>
                        <div>
                            <h4 class="font-bold text-lg mb-1">إدارة الاشتراكات</h4>
                            <p class="text-gray-600">باقات مرنة للشركات</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script>
        // Load unread notifications count
        async function loadUnreadCount() {
            try {
                const response = await axios.get('/api/notifications/unread-count');
                if (response.data.success && response.data.count > 0) {
                    const badge = document.getElementById('notif-badge');
                    badge.textContent = response.data.count;
                    badge.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error loading unread count:', error);
            }
        }
        
        loadUnreadCount();
    <\/script>
</body>
</html>
`,Ge=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
    <!-- Header -->
    <nav class="bg-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <a href="/" class="text-2xl font-bold text-blue-600">
                    <i class="fas fa-calculator ml-2"></i>
                    حاسبة التمويل
                </a>
                <div class="space-x-reverse space-x-4">
                    <a href="/" class="text-gray-700 hover:text-blue-600">
                        <i class="fas fa-home ml-1"></i>الرئيسية
                    </a>
                    <a href="/admin" class="text-gray-700 hover:text-blue-600">
                        <i class="fas fa-user-shield ml-1"></i>الإدارة
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container mx-auto px-4 py-8">
        <div class="max-w-6xl mx-auto">
            <!-- Calculator Form -->
            <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 class="text-3xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-calculator text-blue-600 ml-2"></i>
                    احسب التمويل المناسب لك
                </h2>
                
                <form id="calculatorForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- نوع التمويل -->
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">نوع التمويل</label>
                        <select id="financingType" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">اختر نوع التمويل</option>
                        </select>
                    </div>
                    
                    <!-- البنك -->
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">البنك</label>
                        <select id="bank" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">اختر البنك</option>
                        </select>
                    </div>
                    
                    <!-- مبلغ التمويل -->
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">مبلغ التمويل (ريال)</label>
                        <input type="number" id="amount" required min="10000" step="1000" 
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                               placeholder="مثال: 100000">
                    </div>
                    
                    <!-- مدة التمويل -->
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">مدة التمويل (شهر)</label>
                        <input type="number" id="duration" required min="12" max="360" 
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                               placeholder="مثال: 60">
                    </div>
                    
                    <!-- الراتب الشهري -->
                    <div class="md:col-span-2">
                        <label class="block text-gray-700 font-bold mb-2">الراتب الشهري (ريال)</label>
                        <input type="number" id="salary" required min="3000" step="100"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                               placeholder="مثال: 10000">
                    </div>
                    
                    <!-- زر الحساب -->
                    <div class="md:col-span-2">
                        <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition transform hover:scale-105">
                            <i class="fas fa-calculator ml-2"></i>
                            احسب الآن
                        </button>
                    </div>
                </form>
            </div>
            
            <!-- Results -->
            <div id="results" class="hidden">
                <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl p-8">
                    <h3 class="text-2xl font-bold mb-6 text-gray-800">
                        <i class="fas fa-check-circle text-green-600 ml-2"></i>
                        نتيجة الحساب
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div class="bg-white rounded-xl p-6 shadow-lg">
                            <div class="text-gray-600 text-sm mb-1">القسط الشهري</div>
                            <div class="text-3xl font-bold text-blue-600" id="monthlyPayment">0</div>
                            <div class="text-gray-500 text-sm mt-1">ريال</div>
                        </div>
                        
                        <div class="bg-white rounded-xl p-6 shadow-lg">
                            <div class="text-gray-600 text-sm mb-1">إجمالي المبلغ</div>
                            <div class="text-3xl font-bold text-purple-600" id="totalPayment">0</div>
                            <div class="text-gray-500 text-sm mt-1">ريال</div>
                        </div>
                        
                        <div class="bg-white rounded-xl p-6 shadow-lg">
                            <div class="text-gray-600 text-sm mb-1">إجمالي الفائدة</div>
                            <div class="text-3xl font-bold text-orange-600" id="totalInterest">0</div>
                            <div class="text-gray-500 text-sm mt-1">ريال</div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <h4 class="font-bold text-lg mb-3">تفاصيل الحساب</h4>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span class="text-gray-600">مبلغ التمويل:</span>
                                <span class="font-bold mr-2" id="detailAmount">0</span> ريال
                            </div>
                            <div>
                                <span class="text-gray-600">مدة التمويل:</span>
                                <span class="font-bold mr-2" id="detailDuration">0</span> شهر
                            </div>
                            <div>
                                <span class="text-gray-600">نسبة الفائدة:</span>
                                <span class="font-bold mr-2" id="detailRate">0</span>%
                            </div>
                            <div>
                                <span class="text-gray-600">الراتب الشهري:</span>
                                <span class="font-bold mr-2" id="detailSalary">0</span> ريال
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let banks = [];
        let financingTypes = [];
        
        // Load data
        async function loadData() {
            try {
                const [banksRes, typesRes] = await Promise.all([
                    axios.get('/api/banks'),
                    axios.get('/api/financing-types')
                ]);
                
                banks = banksRes.data.data;
                financingTypes = typesRes.data.data;
                
                // Populate selects
                const bankSelect = document.getElementById('bank');
                banks.forEach(bank => {
                    const option = document.createElement('option');
                    option.value = bank.id;
                    option.textContent = bank.bank_name;
                    bankSelect.appendChild(option);
                });
                
                const typeSelect = document.getElementById('financingType');
                financingTypes.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type.id;
                    option.textContent = type.type_name;
                    typeSelect.appendChild(option);
                });
            } catch (error) {
                console.error('Error loading data:', error);
                alert('خطأ في تحميل البيانات');
            }
        }
        
        // Calculate
        document.getElementById('calculatorForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const amount = parseFloat(document.getElementById('amount').value);
            const duration = parseInt(document.getElementById('duration').value);
            const salary = parseFloat(document.getElementById('salary').value);
            const bankId = parseInt(document.getElementById('bank').value);
            const financingTypeId = parseInt(document.getElementById('financingType').value);
            
            try {
                const response = await axios.post('/api/calculate', {
                    amount,
                    duration_months: duration,
                    salary,
                    bank_id: bankId,
                    financing_type_id: financingTypeId
                });
                
                if (response.data.success) {
                    const result = response.data.data;
                    
                    // Display results
                    document.getElementById('monthlyPayment').textContent = result.monthly_payment.toLocaleString('ar-SA');
                    document.getElementById('totalPayment').textContent = result.total_payment.toLocaleString('ar-SA');
                    document.getElementById('totalInterest').textContent = result.total_interest.toLocaleString('ar-SA');
                    document.getElementById('detailAmount').textContent = amount.toLocaleString('ar-SA');
                    document.getElementById('detailDuration').textContent = duration;
                    document.getElementById('detailRate').textContent = result.rate;
                    document.getElementById('detailSalary').textContent = salary.toLocaleString('ar-SA');
                    
                    document.getElementById('results').classList.remove('hidden');
                    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
                } else {
                    alert(response.data.error || 'خطأ في الحساب');
                }
            } catch (error) {
                console.error('Calculation error:', error);
                alert('خطأ في الحساب. يرجى التحقق من البيانات المدخلة.');
            }
        });
        
        // Load data on page load
        loadData();
    <\/script>
</body>
</html>
`,oe=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>حاسبة التمويل الذكية</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <style>
        .modal { display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); overflow-y: auto; }
        .modal.active { display: flex; align-items: center; justify-content: center; }
        .best-offer { border: 3px solid #10B981; background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); }
        .bank-card { transition: all 0.3s; cursor: pointer; }
        .bank-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .qualification-badge { 
            display: inline-block; 
            padding: 8px 20px; 
            border-radius: 50px; 
            font-weight: bold; 
            font-size: 1.1rem;
        }
        .qualified { background: linear-gradient(135deg, #10B981, #059669); color: white; }
        .not-qualified { background: linear-gradient(135deg, #EF4444, #DC2626); color: white; }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            /* Adjust padding and margins */
            .container { padding-left: 1rem; padding-right: 1rem; }
            .px-8 { padding-left: 1rem; padding-right: 1rem; }
            .py-12 { padding-top: 2rem; padding-bottom: 2rem; }
            
            /* Make grid single column */
            .grid-cols-2 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .grid-cols-3 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            
            /* Adjust font sizes */
            .text-4xl { font-size: 1.75rem; }
            .text-3xl { font-size: 1.5rem; }
            .text-2xl { font-size: 1.25rem; }
            
            /* Make modals full screen */
            .modal > div {
                width: 95% !important;
                max-width: 95% !important;
                margin: 1rem !important;
                max-height: 90vh !important;
                overflow-y: auto !important;
            }
            
            /* Adjust input sizes */
            input, select, button {
                font-size: 16px !important; /* Prevent zoom on iOS */
                padding: 0.75rem !important;
            }
            
            /* Stack bank cards vertically */
            .bank-card {
                margin-bottom: 1rem;
            }
            
            /* Adjust button sizes */
            button {
                padding: 0.75rem 1.5rem !important;
                width: 100%;
                margin-bottom: 0.5rem;
            }
            
            /* Hide decorative elements on mobile */
            .absolute.top-0.left-0 { display: none; }
            .absolute.bottom-0.right-0 { display: none; }
        }
        
        /* Print styles */
        @media print {
            body { background: white; }
            nav, .modal, button { display: none !important; }
            #step1 { display: none !important; }
            #resultsSection { display: block !important; }
            .bank-card { break-inside: avoid; }
            @page { margin: 1cm; }
        }
    </style>
</head>
<body class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
    <!-- Header -->
    <nav class="bg-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <a href="/" class="text-2xl font-bold text-blue-600">
                    <i class="fas fa-calculator ml-2"></i>
                    حاسبة التمويل الذكية
                </a>
                <div class="flex items-center space-x-reverse space-x-4">
                    <a href="/packages" class="text-gray-700 hover:text-blue-600 transition-colors">
                        <i class="fas fa-box ml-1"></i>الباقات
                    </a>
                    <a href="/login" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                        <i class="fas fa-sign-in-alt ml-1"></i>تسجيل الدخول
                    </a>
                    <a href="/subscribe" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
                        <i class="fas fa-rocket ml-1"></i>اشترك الآن
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <!-- Step 1: Main Calculator Form -->
            <div id="step1" class="bg-white rounded-2xl shadow-2xl p-8 mb-8">
                <div class="text-center mb-8">
                    <div class="inline-block bg-blue-100 rounded-full p-4 mb-4">
                        <i class="fas fa-calculator text-4xl text-blue-600"></i>
                    </div>
                    <h2 class="text-3xl font-bold text-gray-800 mb-2">احسب أفضل عرض تمويل</h2>
                    <p class="text-gray-600">سنقارن لك جميع البنوك ونختار الأفضل</p>
                </div>
                
                <form id="calculatorForm" class="space-y-6">
                    <!-- نوع التمويل -->
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-hand-holding-usd text-blue-600 ml-2"></i>
                            نوع التمويل
                        </label>
                        <select id="financingType" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">اختر نوع التمويل</option>
                        </select>
                    </div>
                    
                    <!-- مبلغ التمويل -->
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-money-bill-wave text-green-600 ml-2"></i>
                            مبلغ التمويل المطلوب (ريال)
                        </label>
                        <input type="number" id="amount" required min="10000" step="1000" 
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                               placeholder="مثال: 100000">
                        <p class="text-sm text-gray-500 mt-1">الحد الأدنى: 10,000 ريال</p>
                    </div>
                    
                    <!-- الراتب الشهري -->
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-wallet text-purple-600 ml-2"></i>
                            الراتب الشهري (ريال)
                        </label>
                        <input type="number" id="salary" required min="3000" step="100"
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                               placeholder="مثال: 10000">
                        <p class="text-sm text-gray-500 mt-1">الحد الأدنى: 3,000 ريال</p>
                    </div>
                    
                    <!-- الالتزامات الشهرية -->
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-credit-card text-red-600 ml-2"></i>
                            الالتزامات الشهرية (ريال)
                        </label>
                        <input type="number" id="obligations" min="0" step="100" value="0"
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                               placeholder="مثال: 2000">
                        <p class="text-sm text-gray-500 mt-1">أقساط القروض الحالية أو بطاقات الائتمان</p>
                    </div>
                    
                    <!-- زر الحساب -->
                    <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-xl hover:shadow-xl transition transform hover:scale-105">
                        <i class="fas fa-calculator ml-2"></i>
                        احسب أفضل عرض
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal: Customer Info -->
    <div id="customerModal" class="modal">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div class="text-center mb-6">
                <div class="inline-block bg-green-100 rounded-full p-4 mb-4">
                    <i class="fas fa-user-check text-4xl text-green-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">معلوماتك الشخصية</h3>
                <p class="text-gray-600">لنجد لك أفضل عرض مخصص</p>
            </div>
            
            <form id="customerForm" class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-user text-blue-600 ml-2"></i>
                        الاسم الكامل
                    </label>
                    <input type="text" id="customerName" required 
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                           placeholder="مثال: محمد أحمد السعيد">
                </div>
                
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-phone text-green-600 ml-2"></i>
                        رقم الجوال
                    </label>
                    <input type="tel" id="customerPhone" required pattern="05[0-9]{8}"
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                           placeholder="مثال: 0512345678">
                    <p class="text-sm text-gray-500 mt-1">يجب أن يبدأ بـ 05 ويتكون من 10 أرقام</p>
                </div>
                
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-calendar text-purple-600 ml-2"></i>
                        تاريخ الميلاد
                    </label>
                    <input type="date" id="customerBirthdate" required max="2006-12-31"
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <p class="text-sm text-gray-500 mt-1">يجب أن يكون عمرك 18 سنة على الأقل</p>
                </div>
                
                <div class="flex space-x-reverse space-x-3 mt-6">
                    <button type="button" onclick="closeModal()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-bold">
                        إلغاء
                    </button>
                    <button type="submit" class="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-bold">
                        <i class="fas fa-search ml-2"></i>
                        ابحث عن أفضل عرض
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal: Complete Request Form -->
    <div id="completeRequestModal" class="modal">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 my-8">
            <div class="text-center mb-6">
                <div class="inline-block bg-blue-100 rounded-full p-4 mb-4">
                    <i class="fas fa-file-alt text-4xl text-blue-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">إكمال طلب التمويل</h3>
                <p class="text-gray-600">املأ بياناتك الكاملة لإتمام الطلب</p>
            </div>
            
            <form id="completeRequestForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-user text-blue-600 ml-2"></i>
                            الاسم الكامل
                        </label>
                        <input type="text" id="fullName" required 
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-phone text-green-600 ml-2"></i>
                            رقم الجوال
                        </label>
                        <input type="tel" id="fullPhone" required 
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-envelope text-purple-600 ml-2"></i>
                            البريد الإلكتروني (اختياري)
                        </label>
                        <input type="email" id="email" 
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-id-card text-orange-600 ml-2"></i>
                            رقم الهوية
                        </label>
                        <input type="text" id="nationalId" required 
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-building text-indigo-600 ml-2"></i>
                            جهة العمل
                        </label>
                        <input type="text" id="employer" required 
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-briefcase text-pink-600 ml-2"></i>
                            المسمى الوظيفي
                        </label>
                        <input type="text" id="jobTitle" required 
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-calendar-alt text-teal-600 ml-2"></i>
                            تاريخ بداية العمل
                        </label>
                        <input type="date" id="workStartDate" required 
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-home text-red-600 ml-2"></i>
                            المدينة
                        </label>
                        <input type="text" id="city" required 
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>
                
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-comment text-gray-600 ml-2"></i>
                        ملاحظات إضافية (اختياري)
                    </label>
                    <textarea id="notes" rows="3"
                              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                
                <!-- File Attachments Section -->
                <div class="border-t-2 border-gray-200 pt-6 mt-6">
                    <h4 class="text-lg font-bold text-gray-800 mb-4">
                        <i class="fas fa-paperclip text-blue-600 ml-2"></i>
                        المرفقات (اختياري)
                    </h4>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- الهوية -->
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-id-card text-blue-600 ml-2"></i>
                                صورة الهوية
                            </label>
                            <input type="file" id="idAttachment" accept="image/*,.pdf" onchange="previewFile(this, 'idPreview')"
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 file:ml-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                            <div id="idPreview" class="mt-2"></div>
                            <p class="text-xs text-gray-500 mt-1">صيغة الملف: صورة أو PDF (حد أقصى: 5 ميغابايت)</p>
                        </div>
                        
                        <!-- كشف الحساب البنكي -->
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-file-invoice text-green-600 ml-2"></i>
                                كشف الحساب البنكي (آخر 3 أشهر)
                            </label>
                            <input type="file" id="bankStatementAttachment" accept="image/*,.pdf" onchange="previewFile(this, 'bankStatementPreview')"
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 file:ml-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100">
                            <div id="bankStatementPreview" class="mt-2"></div>
                            <p class="text-xs text-gray-500 mt-1">صيغة الملف: صورة أو PDF (حد أقصى: 5 ميغابايت)</p>
                        </div>
                        
                        <!-- تعريف بالراتب -->
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-file-contract text-purple-600 ml-2"></i>
                                تعريف بالراتب
                            </label>
                            <input type="file" id="salaryAttachment" accept="image/*,.pdf" onchange="previewFile(this, 'salaryPreview')"
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 file:ml-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100">
                            <div id="salaryPreview" class="mt-2"></div>
                            <p class="text-xs text-gray-500 mt-1">صيغة الملف: صورة أو PDF (حد أقصى: 5 ميغابايت)</p>
                        </div>
                        
                        <!-- مرفق إضافي -->
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-file text-orange-600 ml-2"></i>
                                مرفق إضافي
                            </label>
                            <input type="file" id="additionalAttachment" accept="image/*,.pdf" onchange="previewFile(this, 'additionalPreview')"
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 file:ml-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100">
                            <div id="additionalPreview" class="mt-2"></div>
                            <p class="text-xs text-gray-500 mt-1">صيغة الملف: صورة أو PDF (حد أقصى: 5 ميغابايت)</p>
                        </div>
                    </div>
                    
                    <!-- Progress bars container -->
                    <div id="uploadProgress" class="hidden mt-4 space-y-2"></div>
                    
                    <div class="bg-blue-50 border-r-4 border-blue-500 p-4 mt-4 rounded">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle ml-2"></i>
                            <strong>ملاحظة:</strong> جميع المرفقات اختيارية، لكن إرفاق المستندات يساعد في تسريع معالجة طلبك
                        </p>
                    </div>
                </div>
                
                <div class="flex space-x-reverse space-x-3 mt-6">
                    <button type="button" onclick="closeCompleteRequestModal()" 
                            class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-bold">
                        إلغاء
                    </button>
                    <button type="submit" 
                            class="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-bold">
                        <i class="fas fa-paper-plane ml-2"></i>
                        إرسال الطلب
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Success Modal -->
    <div id="successModal" class="modal hidden">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div class="text-center">
                <!-- Success Icon -->
                <div class="inline-block bg-green-100 rounded-full p-6 mb-4">
                    <i class="fas fa-check-circle text-6xl text-green-600"></i>
                </div>
                
                <!-- Success Message -->
                <h3 class="text-3xl font-bold text-gray-800 mb-3">🎉 تهانينا!</h3>
                <p class="text-xl text-gray-700 mb-2 font-semibold">تم إرسال طلبك بنجاح</p>
                <p class="text-gray-600 mb-4">سيتم المراجعة من شركة <span id="companyNameInSuccess" class="font-bold text-blue-600"></span></p>
                <p class="text-gray-600 mb-6">وسوف يتم التواصل معك قريباً</p>
                
                <!-- Attachments Count -->
                <div id="attachmentsCount" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 hidden">
                    <i class="fas fa-paperclip text-blue-600 ml-2"></i>
                    <span class="text-blue-800 font-medium">تم رفع <span id="attachmentNumber"></span> مرفق(ات) بنجاح</span>
                </div>
                
                <!-- Auto close message -->
                <p class="text-sm text-gray-500">
                    <i class="fas fa-info-circle ml-1"></i>
                    سيتم إغلاق هذه الرسالة تلقائياً بعد 3 ثوانٍ
                </p>
            </div>
        </div>
    </div>

    <!-- Error Modal -->
    <div id="errorModal" class="modal hidden">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div class="text-center">
                <!-- Error Icon -->
                <div class="inline-block bg-red-100 rounded-full p-6 mb-4">
                    <i class="fas fa-exclamation-circle text-6xl text-red-600"></i>
                </div>
                
                <!-- Error Message -->
                <h3 class="text-2xl font-bold text-gray-800 mb-3">❌ حدث خطأ</h3>
                <p class="text-gray-700 mb-6" id="errorMessage">حدث خطأ أثناء إرسال الطلب</p>
                
                <!-- Close Button -->
                <button onclick="closeErrorModal()" class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-colors">
                    <i class="fas fa-times ml-2"></i>
                    إغلاق
                </button>
            </div>
        </div>
    </div>

    <!-- Results Section -->
    <div id="resultsSection" class="container mx-auto px-4 py-8 hidden">
        <div class="max-w-6xl mx-auto">
            <!-- Qualification Status -->
            <div id="qualificationStatus" class="text-center mb-8">
                <!-- Will be filled dynamically -->
            </div>

            <!-- Best Offer Banner -->
            <div id="bestOfferBanner" class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-2xl p-8 mb-8 text-center">
                <div class="inline-block bg-white/20 rounded-full p-4 mb-4">
                    <i class="fas fa-trophy text-5xl"></i>
                </div>
                <h2 class="text-3xl font-bold mb-2">🎉 وجدنا لك أفضل عرض!</h2>
                <p class="text-xl mb-4" id="bestOfferText">جاري التحميل...</p>
                
                <!-- Complete Request Button -->
                <button id="completeRequestBtn" onclick="openCompleteRequestModal()" 
                        class="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-xl hover:shadow-xl transition transform hover:scale-105 mt-4">
                    <i class="fas fa-clipboard-check ml-2"></i>
                    إكمال الطلب
                </button>
            </div>

            <!-- All Offers -->
            <div class="mb-8">
                <h3 class="text-2xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-list ml-2 text-blue-600"></i>
                    جميع العروض المتاحة
                </h3>
                <div id="offersGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Offers will be loaded here -->
                </div>
            </div>
            
            <!-- Comparison Table -->
            <div id="comparisonTable" class="mb-8">
                <!-- Detailed comparison table will be loaded here -->
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-center space-x-reverse space-x-4">
                <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold">
                    <i class="fas fa-print ml-2"></i>
                    طباعة العروض
                </button>
                <button onclick="restartCalculator()" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold">
                    <i class="fas fa-redo ml-2"></i>
                    حساب جديد
                </button>
            </div>
        </div>
    </div>

    <script>
        let calculationData = {};
        let customerData = {};
        let selectedBestOffer = null;
        let allBanks = [];
        let financingTypes = [];
        let allRates = [];
        
        // File validation and preview
        function previewFile(input, previewId) {
            const preview = document.getElementById(previewId);
            const file = input.files[0];
            
            if (!file) {
                preview.innerHTML = '';
                return;
            }
            
            // Validate file size (5MB max)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                alert('حجم الملف كبير جداً! الحد الأقصى: 5 ميغابايت');
                input.value = '';
                preview.innerHTML = '';
                return;
            }
            
            // Show preview
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.innerHTML = \`
                        <div class="flex items-center gap-3 bg-green-50 border border-green-300 rounded p-2">
                            <img src="\${e.target.result}" class="w-20 h-20 object-cover rounded border">
                            <div class="flex-1">
                                <p class="text-sm font-bold text-green-800">\${file.name}</p>
                                <p class="text-xs text-green-600">\${(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <i class="fas fa-check-circle text-2xl text-green-600"></i>
                        </div>
                    \`;
                };
                reader.readAsDataURL(file);
            } else {
                preview.innerHTML = \`
                    <div class="flex items-center gap-3 bg-green-50 border border-green-300 rounded p-2">
                        <i class="fas fa-file-pdf text-4xl text-red-600"></i>
                        <div class="flex-1">
                            <p class="text-sm font-bold text-green-800">\${file.name}</p>
                            <p class="text-xs text-green-600">\${(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <i class="fas fa-check-circle text-2xl text-green-600"></i>
                    </div>
                \`;
            }
        }
        
        // Load initial data
        async function loadData() {
            try {
                const [banksRes, typesRes, ratesRes] = await Promise.all([
                    axios.get('/api/banks'),
                    axios.get('/api/financing-types'),
                    axios.get('/api/rates')
                ]);
                
                allBanks = banksRes.data.data;
                financingTypes = typesRes.data.data;
                allRates = ratesRes.data.data;
                
                // Populate financing types
                const typeSelect = document.getElementById('financingType');
                financingTypes.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type.id;
                    option.textContent = type.type_name;
                    typeSelect.appendChild(option);
                });
            } catch (error) {
                console.error('Error loading data:', error);
                alert('خطأ في تحميل البيانات');
            }
        }
        
        // Step 1: Main form submission
        document.getElementById('calculatorForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            calculationData = {
                financing_type_id: parseInt(document.getElementById('financingType').value),
                amount: parseFloat(document.getElementById('amount').value),
                salary: parseFloat(document.getElementById('salary').value),
                obligations: parseFloat(document.getElementById('obligations').value) || 0
            };
            
            // Calculate available income
            const availableIncome = calculationData.salary - calculationData.obligations;
            
            // Check if customer can afford
            if (availableIncome < 1000) {
                alert('عذراً، الراتب المتاح بعد خصم الالتزامات غير كافٍ (يجب أن يكون 1000 ريال على الأقل)');
                return;
            }
            
            // Show modal
            document.getElementById('customerModal').classList.add('active');
        });
        
        // Step 2: Customer info submission
        document.getElementById('customerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get customer info
            customerData = {
                name: document.getElementById('customerName').value,
                phone: document.getElementById('customerPhone').value,
                birthdate: document.getElementById('customerBirthdate').value
            };
            
            // Close modal
            closeModal();
            
            // Save customer initial data to database
            try {
                // Extract tenant from URL (for /c/tenant/calculator) or use null for /calculator
                const pathParts = window.location.pathname.split('/');
                const tenantSlug = pathParts[1] === 'c' ? pathParts[2] : null;
                
                console.log('🔍 Saving customer data:', {
                    name: customerData.name,
                    phone: customerData.phone,
                    birthdate: customerData.birthdate,
                    salary: calculationData.salary,
                    amount: calculationData.amount,
                    tenantSlug: tenantSlug
                });
                
                const response = await axios.post('/api/calculator/save-customer', {
                    name: customerData.name,
                    phone: customerData.phone,
                    birthdate: customerData.birthdate,
                    salary: calculationData.salary,
                    amount: calculationData.amount,
                    obligations: calculationData.obligations,
                    financing_type_id: calculationData.financing_type_id,
                    tenant_slug: tenantSlug
                });
                
                console.log('✅ تم حفظ بيانات العميل في قاعدة البيانات:', response.data);
            } catch (error) {
                console.error('❌ خطأ في حفظ بيانات العميل:', error);
                if (error.response) {
                    console.error('Error details:', error.response.data);
                }
                // Continue anyway - don't block the user
            }
            
            // Show loading
            document.getElementById('resultsSection').classList.remove('hidden');
            document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
            
            // Calculate all offers
            await calculateAllOffers();
        });
        
        // Step 3: Complete Request Form submission
        document.getElementById('completeRequestForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get file attachments info (filename only for now)
            const idFile = document.getElementById('idAttachment').files[0];
            const bankStatementFile = document.getElementById('bankStatementAttachment').files[0];
            const salaryFile = document.getElementById('salaryAttachment').files[0];
            const additionalFile = document.getElementById('additionalAttachment').files[0];
            
            // Build request data object
            const requestData = {
                full_name: document.getElementById('fullName').value,
                phone: document.getElementById('fullPhone').value,
                email: document.getElementById('email').value || null,
                national_id: document.getElementById('nationalId').value,
                birthdate: customerData.birthdate,
                employer: document.getElementById('employer').value,
                job_title: document.getElementById('jobTitle').value,
                monthly_salary: calculationData.salary,
                work_start_date: document.getElementById('workStartDate').value,
                city: document.getElementById('city').value,
                financing_type_id: calculationData.financing_type_id,
                bank_id: selectedBestOffer.bank.id,
                requested_amount: calculationData.amount,
                monthly_obligations: calculationData.obligations,
                duration: selectedBestOffer.bestCalculation.duration,
                monthly_payment: selectedBestOffer.bestCalculation.monthlyPayment,
                notes: document.getElementById('notes').value || null,
                // Store filenames for tracking
                id_attachment_filename: idFile ? idFile.name : null,
                bank_statement_attachment_filename: bankStatementFile ? bankStatementFile.name : null,
                salary_attachment_filename: salaryFile ? salaryFile.name : null,
                additional_attachment_filename: additionalFile ? additionalFile.name : null
            };
            
            try {
                // Show loading message
                const submitBtn = e.target.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
                
                // Step 1: Create the financing request first
                const response = await axios.post('/api/calculator/submit-request', requestData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.data.success) {
                    const requestId = response.data.request_id;
                    console.log('✅ Request created successfully:', { requestId, response: response.data });
                    
                    // Step 2: Upload attachments if any exist
                    const attachments = [
                        { file: idFile, type: 'id', label: 'صورة الهوية' },
                        { file: salaryFile, type: 'salary', label: 'تعريف بالراتب' },
                        { file: bankStatementFile, type: 'bank_statement', label: 'كشف الحساب البنكي' },
                        { file: additionalFile, type: 'additional', label: 'مرفق إضافي' }
                    ].filter(att => att.file);
                    
                    if (attachments.length > 0) {
                        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري رفع المرفقات...';
                        
                        // Show progress container
                        const progressContainer = document.getElementById('uploadProgress');
                        progressContainer.classList.remove('hidden');
                        progressContainer.innerHTML = '';
                        
                        let uploadedCount = 0;
                        
                        for (const attachment of attachments) {
                            // Add progress bar
                            const progressId = \`progress-\${attachment.type}\`;
                            progressContainer.innerHTML += \`
                                <div class="bg-gray-100 rounded p-3">
                                    <div class="flex justify-between items-center mb-1">
                                        <span class="text-sm font-bold text-gray-700">\${attachment.label}</span>
                                        <span id="\${progressId}-status" class="text-xs text-gray-600">جاري الرفع...</span>
                                    </div>
                                    <div class="w-full bg-gray-300 rounded-full h-2">
                                        <div id="\${progressId}-bar" class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                                    </div>
                                </div>
                            \`;
                            
                            const formData = new FormData();
                            formData.append('file', attachment.file);
                            formData.append('request_id', requestId);
                            formData.append('attachment_type', attachment.type);
                            
                            console.log('📤 Uploading attachment:', { 
                                requestId, 
                                type: attachment.type, 
                                fileName: attachment.file.name 
                            });
                            
                            try {
                                // Simulate progress (since R2 upload doesn't report progress)
                                const progressBar = document.getElementById(\`\${progressId}-bar\`);
                                const progressStatus = document.getElementById(\`\${progressId}-status\`);
                                
                                progressBar.style.width = '30%';
                                
                                await axios.post('/api/attachments/upload', formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                });
                                
                                progressBar.style.width = '100%';
                                progressBar.classList.remove('bg-blue-600');
                                progressBar.classList.add('bg-green-600');
                                progressStatus.textContent = '✓ تم الرفع';
                                progressStatus.classList.remove('text-gray-600');
                                progressStatus.classList.add('text-green-600');
                                uploadedCount++;
                            } catch (uploadError) {
                                console.error(\`Error uploading \${attachment.type}:\`, uploadError);
                                const progressBar = document.getElementById(\`\${progressId}-bar\`);
                                const progressStatus = document.getElementById(\`\${progressId}-status\`);
                                progressBar.style.width = '100%';
                                progressBar.classList.remove('bg-blue-600');
                                progressBar.classList.add('bg-red-600');
                                progressStatus.textContent = '✗ فشل الرفع';
                                progressStatus.classList.remove('text-gray-600');
                                progressStatus.classList.add('text-red-600');
                            }
                        }
                        
                        submitBtn.innerHTML = '<i class="fas fa-check ml-2"></i> اكتمل الرفع!';
                    }
                    
                    closeCompleteRequestModal();
                    
                    // Show success modal
                    showSuccessModal(attachments.length);
                    
                    // Reset calculator after 3 seconds
                    setTimeout(() => {
                        restartCalculator();
                    }, 3000);
                } else {
                    showErrorModal(response.data.error || response.data.message || 'حدث خطأ غير متوقع');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            } catch (error) {
                console.error('Error submitting request:', error);
                showErrorModal('حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى.');
                const submitBtn = e.target.querySelector('button[type="submit"]');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane ml-2"></i> إرسال الطلب';
            }
        });
        
        async function calculateAllOffers() {
            const availableIncome = calculationData.salary - calculationData.obligations;
            const maxMonthlyPayment = availableIncome * 0.33; // 33% من الدخل المتاح
            
            // Determine qualification status
            const isQualified = maxMonthlyPayment >= 500; // الحد الأدنى للقسط الشهري
            
            // Display qualification status
            const qualificationDiv = document.getElementById('qualificationStatus');
            qualificationDiv.innerHTML = \`
                <div class="inline-block qualification-badge \${isQualified ? 'qualified' : 'not-qualified'}">
                    <i class="fas fa-\${isQualified ? 'check-circle' : 'times-circle'} ml-2"></i>
                    \${isQualified ? 'مؤهل للحصول على التمويل' : 'غير مؤهل للحصول على التمويل'}
                </div>
                <div class="mt-4 text-gray-700">
                    <p>الدخل المتاح: <span class="font-bold text-blue-600">\${availableIncome.toLocaleString('ar-SA')} ريال</span></p>
                    <p>القدرة الشرائية: <span class="font-bold text-green-600">\${maxMonthlyPayment.toLocaleString('ar-SA')} ريال</span></p>
                </div>
            \`;
            
            if (!isQualified) {
                document.getElementById('bestOfferBanner').classList.add('hidden');
                document.getElementById('offersGrid').innerHTML = '<div class="col-span-full text-center text-gray-600 text-lg">عذراً، القدرة الشرائية الحالية غير كافية للحصول على تمويل</div>';
                return;
            }
            
            // Filter rates for selected financing type
            const applicableRates = allRates.filter(rate => 
                rate.financing_type_id === calculationData.financing_type_id &&
                rate.is_active === 1 &&
                rate.min_salary <= calculationData.salary &&
                rate.max_salary >= calculationData.salary &&
                rate.min_amount <= calculationData.amount &&
                rate.max_amount >= calculationData.amount
            );
            
            if (applicableRates.length === 0) {
                document.getElementById('bestOfferText').textContent = 'عذراً، لا توجد عروض متاحة حالياً تناسب معاييرك';
                document.getElementById('completeRequestBtn').classList.add('hidden');
                return;
            }
            
            // Calculate offers for each bank
            const offers = applicableRates.map(rate => {
                const bank = allBanks.find(b => b.id === rate.bank_id);
                const calculations = [];
                
                // Try different durations
                for (let months = rate.min_duration; months <= rate.max_duration; months += 12) {
                    const monthlyRate = rate.rate / 100 / 12;
                    const monthlyPayment = (calculationData.amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                                          (Math.pow(1 + monthlyRate, months) - 1);
                    
                    if (monthlyPayment <= maxMonthlyPayment) {
                        const totalPayment = monthlyPayment * months;
                        const totalInterest = totalPayment - calculationData.amount;
                        
                        calculations.push({
                            duration: months,
                            monthlyPayment: Math.round(monthlyPayment * 100) / 100,
                            totalPayment: Math.round(totalPayment * 100) / 100,
                            totalInterest: Math.round(totalInterest * 100) / 100
                        });
                    }
                }
                
                // Get best duration (lowest total interest)
                const bestCalc = calculations.sort((a, b) => a.totalInterest - b.totalInterest)[0];
                
                return {
                    bank: bank,
                    rate: rate.rate,
                    bestCalculation: bestCalc,
                    allCalculations: calculations
                };
            }).filter(offer => offer.bestCalculation);
            
            // Sort by total interest (best first)
            offers.sort((a, b) => a.bestCalculation.totalInterest - b.bestCalculation.totalInterest);
            
            // Display results
            displayOffers(offers);
            
            // Update customer record with calculation results
            if (offers.length > 0 && customerData && customerData.phone) {
                const bestOffer = offers[0];
                try {
                    const pathParts = window.location.pathname.split('/');
                    const tenantSlug = pathParts[1] === 'c' ? pathParts[2] : null;
                    
                    console.log('💾 Updating customer with calculation results:', {
                        phone: customerData.phone,
                        best_bank: bestOffer.bank.bank_name,
                        duration: bestOffer.bestCalculation.duration,
                        monthly_payment: bestOffer.bestCalculation.monthlyPayment
                    });
                    
                    await axios.post('/api/calculator/save-customer', {
                        name: customerData.name,
                        phone: customerData.phone,
                        birthdate: customerData.birthdate,
                        salary: calculationData.salary,
                        amount: calculationData.amount,
                        obligations: calculationData.obligations,
                        financing_type_id: calculationData.financing_type_id,
                        duration_months: bestOffer.bestCalculation.duration,
                        best_bank_id: bestOffer.bank.id,
                        best_rate: bestOffer.rate,
                        monthly_payment: bestOffer.bestCalculation.monthlyPayment,
                        total_payment: bestOffer.bestCalculation.totalPayment,
                        tenant_slug: tenantSlug
                    });
                    
                    console.log('✅ تم تحديث بيانات العميل بنتائج الحساب');
                } catch (error) {
                    console.error('❌ خطأ في تحديث بيانات العميل:', error);
                }
            }
        }
        
        function displayOffers(offers) {
            if (offers.length === 0) {
                document.getElementById('bestOfferText').textContent = 'عذراً، لا توجد عروض تناسب قدرتك الشرائية حالياً';
                document.getElementById('completeRequestBtn').classList.add('hidden');
                return;
            }
            
            const bestOffer = offers[0];
            selectedBestOffer = bestOffer;
            
            // Update best offer banner
            document.getElementById('bestOfferText').innerHTML = \`
                <span class="text-2xl">أفضل عرض من <span class="font-bold">\${bestOffer.bank.bank_name}</span></span>
                <br>
                <span class="text-lg">قسط شهري: \${bestOffer.bestCalculation.monthlyPayment.toLocaleString('ar-SA')} ريال</span>
            \`;
            
            // Show complete request button
            document.getElementById('completeRequestBtn').classList.remove('hidden');
            
            // Display all offers (cards)
            const offersGrid = document.getElementById('offersGrid');
            offersGrid.innerHTML = offers.map((offer, index) => {
                const isBest = index === 0;
                return \`
                    <div class="bank-card \${isBest ? 'best-offer' : 'bg-white'} rounded-xl shadow-lg p-6 relative">
                        \${isBest ? '<div class="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-tr-xl rounded-bl-xl font-bold"><i class="fas fa-star ml-1"></i>الأفضل</div>' : ''}
                        
                        <div class="text-center mb-4 \${isBest ? 'mt-6' : ''}">
                            <div class="inline-block bg-blue-100 rounded-full p-3 mb-2">
                                <i class="fas fa-university text-3xl text-blue-600"></i>
                            </div>
                            <h4 class="text-xl font-bold text-gray-800">\${offer.bank.bank_name}</h4>
                        </div>
                        
                        <div class="space-y-3">
                            <div class="bg-gray-50 p-3 rounded-lg">
                                <div class="text-sm text-gray-600">نسبة الفائدة</div>
                                <div class="text-lg font-bold text-blue-600">\${offer.rate}%</div>
                            </div>
                            
                            <div class="bg-blue-50 p-3 rounded-lg">
                                <div class="text-sm text-gray-600">القسط الشهري</div>
                                <div class="text-2xl font-bold text-blue-600">\${offer.bestCalculation.monthlyPayment.toLocaleString('ar-SA')} <span class="text-sm">ريال</span></div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-2">
                                <div class="bg-gray-50 p-2 rounded text-center">
                                    <div class="text-xs text-gray-600">المدة</div>
                                    <div class="font-bold">\${offer.bestCalculation.duration} شهر</div>
                                </div>
                                <div class="bg-gray-50 p-2 rounded text-center">
                                    <div class="text-xs text-gray-600">إجمالي الفائدة</div>
                                    <div class="font-bold text-orange-600">\${offer.bestCalculation.totalInterest.toLocaleString('ar-SA')}</div>
                                </div>
                            </div>
                            
                            <div class="bg-purple-50 p-3 rounded-lg">
                                <div class="text-sm text-gray-600">إجمالي المبلغ</div>
                                <div class="text-xl font-bold text-purple-600">\${offer.bestCalculation.totalPayment.toLocaleString('ar-SA')} <span class="text-sm">ريال</span></div>
                            </div>
                        </div>
                    </div>
                \`;
            }).join('');
            
            // Display comparison table
            displayComparisonTable(offers);
        }
        
        function displayComparisonTable(offers) {
            const comparisonTable = document.getElementById('comparisonTable');
            if (!comparisonTable) return;
            
            comparisonTable.innerHTML = \`
                <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-2">
                                <i class="fas fa-table text-blue-600 ml-2"></i>
                                جدول المقارنة التفصيلي
                            </h3>
                            <p class="text-gray-600">قارن جميع العروض المتاحة بسهولة</p>
                        </div>
                        <button onclick="printResults()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                            <i class="fas fa-print ml-2"></i>
                            طباعة النتائج
                        </button>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-right">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="px-4 py-3 text-gray-700 font-bold">البنك</th>
                                    <th class="px-4 py-3 text-gray-700 font-bold">نسبة الفائدة</th>
                                    <th class="px-4 py-3 text-gray-700 font-bold">القسط الشهري</th>
                                    <th class="px-4 py-3 text-gray-700 font-bold">المدة</th>
                                    <th class="px-4 py-3 text-gray-700 font-bold">إجمالي الفائدة</th>
                                    <th class="px-4 py-3 text-gray-700 font-bold">إجمالي المبلغ</th>
                                    <th class="px-4 py-3 text-gray-700 font-bold">التوفير</th>
                                </tr>
                            </thead>
                            <tbody>
                                \${offers.map((offer, index) => {
                                    const isBest = index === 0;
                                    const savings = index > 0 ? offer.bestCalculation.totalInterest - offers[0].bestCalculation.totalInterest : 0;
                                    return \`
                                        <tr class="\${isBest ? 'bg-green-50 font-bold' : 'hover:bg-gray-50'}">
                                            <td class="px-4 py-3 border-t">
                                                \${offer.bank.bank_name}
                                                \${isBest ? '<span class="mr-2 text-green-600"><i class="fas fa-star"></i></span>' : ''}
                                            </td>
                                            <td class="px-4 py-3 border-t">\${offer.rate}%</td>
                                            <td class="px-4 py-3 border-t text-blue-600">\${offer.bestCalculation.monthlyPayment.toLocaleString('ar-SA')} ر.س</td>
                                            <td class="px-4 py-3 border-t">\${offer.bestCalculation.duration} شهر</td>
                                            <td class="px-4 py-3 border-t text-orange-600">\${offer.bestCalculation.totalInterest.toLocaleString('ar-SA')} ر.س</td>
                                            <td class="px-4 py-3 border-t text-purple-600">\${offer.bestCalculation.totalPayment.toLocaleString('ar-SA')} ر.س</td>
                                            <td class="px-4 py-3 border-t \${isBest ? 'text-green-600' : 'text-red-600'}">
                                                \${isBest ? 'الأفضل ✓' : '+' + savings.toLocaleString('ar-SA') + ' ر.س'}
                                            </td>
                                        </tr>
                                    \`;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Smart Recommendations -->
                    <div class="mt-6 bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-bold text-blue-800 mb-2">
                            <i class="fas fa-lightbulb text-yellow-500 ml-2"></i>
                            نصائح ذكية
                        </h4>
                        <ul class="text-sm text-gray-700 space-y-2">
                            \${generateSmartRecommendations(offers)}
                        </ul>
                    </div>
                </div>
            \`;
        }
        
        function generateSmartRecommendations(offers) {
            if (offers.length === 0) return '';
            
            const recommendations = [];
            const bestOffer = offers[0];
            
            // Recommendation 1: Best bank
            recommendations.push(\`<li><i class="fas fa-check-circle text-green-600 ml-2"></i>عرض <strong>\${bestOffer.bank.bank_name}</strong> هو الأفضل بقسط شهري \${bestOffer.bestCalculation.monthlyPayment.toLocaleString('ar-SA')} ريال</li>\`);
            
            // Recommendation 2: Savings
            if (offers.length > 1) {
                const savings = offers[1].bestCalculation.totalInterest - bestOffer.bestCalculation.totalInterest;
                recommendations.push(\`<li><i class="fas fa-piggy-bank text-green-600 ml-2"></i>ستوفر <strong>\${savings.toLocaleString('ar-SA')} ريال</strong> بالمقارنة مع ثاني أفضل عرض</li>\`);
            }
            
            // Recommendation 3: Duration advice
            if (bestOffer.bestCalculation.duration >= 60) {
                recommendations.push(\`<li><i class="fas fa-clock text-orange-600 ml-2"></i>المدة طويلة (\${bestOffer.bestCalculation.duration} شهر). حاول تقليصها إن أمكن لتوفير المزيد من الفوائد</li>\`);
            } else {
                recommendations.push(\`<li><i class="fas fa-clock text-green-600 ml-2"></i>مدة التمويل معقولة (\${bestOffer.bestCalculation.duration} شهر)</li>\`);
            }
            
            // Recommendation 4: Monthly payment
            const paymentRatio = (bestOffer.bestCalculation.monthlyPayment / calculationData.salary) * 100;
            if (paymentRatio <= 25) {
                recommendations.push(\`<li><i class="fas fa-check-circle text-green-600 ml-2"></i>القسط الشهري يشكل \${paymentRatio.toFixed(1)}% فقط من راتبك - نسبة ممتازة!</li>\`);
            } else {
                recommendations.push(\`<li><i class="fas fa-exclamation-triangle text-orange-600 ml-2"></i>القسط الشهري يشكل \${paymentRatio.toFixed(1)}% من راتبك - تأكد من قدرتك على الالتزام</li>\`);
            }
            
            return recommendations.join('');
        }
        
        function printResults() {
            window.print();
        }
        
        function openCompleteRequestModal() {
            // Pre-fill some data
            document.getElementById('fullName').value = customerData.name;
            document.getElementById('fullPhone').value = customerData.phone;
            
            // Show modal
            document.getElementById('completeRequestModal').classList.add('active');
        }
        
        function closeModal() {
            document.getElementById('customerModal').classList.remove('active');
        }
        
        function closeCompleteRequestModal() {
            document.getElementById('completeRequestModal').classList.remove('active');
        }
        
        function restartCalculator() {
            document.getElementById('resultsSection').classList.add('hidden');
            document.getElementById('calculatorForm').reset();
            calculationData = {};
            customerData = {};
            selectedBestOffer = null;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function showSuccessModal(attachmentCount) {
            const modal = document.getElementById('successModal');
            const companyName = window.TENANT_NAME || 'الشركة';
            
            // Set company name
            document.getElementById('companyNameInSuccess').textContent = companyName;
            
            // Show attachments count if any
            if (attachmentCount > 0) {
                document.getElementById('attachmentsCount').classList.remove('hidden');
                document.getElementById('attachmentNumber').textContent = attachmentCount;
            } else {
                document.getElementById('attachmentsCount').classList.add('hidden');
            }
            
            // Show modal
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            
            // Auto close after 3 seconds
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.style.display = 'none';
            }, 3000);
        }
        
        function showErrorModal(message) {
            const modal = document.getElementById('errorModal');
            document.getElementById('errorMessage').textContent = message;
            
            // Show modal
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
        
        window.closeErrorModal = function() {
            const modal = document.getElementById('errorModal');
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
        
        // Load data on page load
        loadData();
    <\/script>
</body>
</html>
`,Qe=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تسجيل الدخول - منصة حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .glass-effect {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .input-focus:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-slide-in {
            animation: slideIn 0.5s ease-out;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            .glass-effect {
                padding: 1.5rem !important;
            }
            h1 {
                font-size: 1.75rem !important;
            }
            button {
                font-size: 1rem !important;
            }
        }
        @media (max-width: 480px) {
            .glass-effect {
                padding: 1rem !important;
            }
            h1 {
                font-size: 1.5rem !important;
            }
        }
    </style>
</head>
<body class="gradient-bg min-h-screen flex items-center justify-center p-4">
    <div class="container max-w-md">
        <!-- Login Card -->
        <div class="glass-effect rounded-2xl shadow-2xl p-8 animate-slide-in">
            <!-- Logo and Title -->
            <div class="text-center mb-8">
                <div class="inline-block bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full p-4 mb-4">
                    <i class="fas fa-calculator text-4xl"></i>
                </div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">تسجيل الدخول</h1>
                <p class="text-gray-600">مرحباً بك في منصة حاسبة التمويل</p>
            </div>

            <!-- Alert Messages -->
            <div id="alertMessage" class="hidden mb-4 p-4 rounded-lg"></div>

            <!-- Login Form -->
            <form id="loginForm" class="space-y-6">
                <!-- Username -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-user text-purple-600 ml-2"></i>
                        اسم المستخدم أو البريد الإلكتروني
                    </label>
                    <input type="text" id="username" required
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg input-focus transition"
                           placeholder="أدخل اسم المستخدم">
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-lock text-purple-600 ml-2"></i>
                        كلمة السر
                    </label>
                    <div class="relative">
                        <input type="password" id="password" required
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg input-focus transition"
                               placeholder="أدخل كلمة السر">
                        <button type="button" onclick="togglePassword()" 
                                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            <i id="passwordIcon" class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between">
                    <label class="flex items-center">
                        <input type="checkbox" id="rememberMe" class="ml-2 w-4 h-4 text-purple-600">
                        <span class="text-gray-700">تذكرني</span>
                    </label>
                    <a href="/forgot-password" class="text-purple-600 hover:text-purple-800 font-bold">
                        نسيت كلمة السر؟
                    </a>
                </div>

                <!-- Submit Button -->
                <button type="submit" id="loginBtn"
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-105">
                    <i class="fas fa-sign-in-alt ml-2"></i>
                    تسجيل الدخول
                </button>
            </form>

            <!-- Divider -->
            <div class="flex items-center my-6">
                <div class="flex-1 border-t border-gray-300"></div>
                <span class="px-4 text-gray-500">أو</span>
                <div class="flex-1 border-t border-gray-300"></div>
            </div>

            <!-- Links -->
            <div class="text-center space-y-3">
                <p class="text-gray-600">
                    ليس لديك حساب؟
                    <a href="/packages" class="text-purple-600 hover:text-purple-800 font-bold">
                        اشترك الآن
                    </a>
                </p>
                <a href="/" class="block text-gray-600 hover:text-gray-800">
                    <i class="fas fa-home ml-2"></i>
                    العودة للصفحة الرئيسية
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-6 text-white">
            <p class="text-sm">© 2025 منصة حاسبة التمويل. جميع الحقوق محفوظة.</p>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script>
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const passwordIcon = document.getElementById('passwordIcon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordIcon.classList.remove('fa-eye');
                passwordIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                passwordIcon.classList.remove('fa-eye-slash');
                passwordIcon.classList.add('fa-eye');
            }
        }

        function showAlert(message, type = 'error') {
            const alertDiv = document.getElementById('alertMessage');
            alertDiv.className = \`mb-4 p-4 rounded-lg \${type === 'error' ? 'bg-red-100 border-2 border-red-500 text-red-800' : 'bg-green-100 border-2 border-green-500 text-green-800'}\`;
            alertDiv.innerHTML = \`
                <div class="flex items-center">
                    <i class="fas fa-\${type === 'error' ? 'exclamation-circle' : 'check-circle'} text-2xl ml-3"></i>
                    <span>\${message}</span>
                </div>
            \`;
            alertDiv.classList.remove('hidden');
            
            if (type === 'success') {
                setTimeout(() => {
                    alertDiv.classList.add('hidden');
                }, 3000);
            }
        }

        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            const loginBtn = document.getElementById('loginBtn');
            
            // Disable button
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري التحقق...';
            
            try {
                const response = await axios.post('/api/auth/login', {
                    username,
                    password,
                    rememberMe
                });
                
                if (response.data.success) {
                    showAlert('✓ تم تسجيل الدخول بنجاح! جاري التحويل...', 'success');
                    
                    // Save token and user data in localStorage
                    localStorage.setItem('authToken', response.data.token);
                    localStorage.setItem('userData', JSON.stringify(response.data.user));
                    console.log('✅ تم حفظ بيانات المستخدم:', response.data.user);
                    
                    // Redirect based on user type
                    setTimeout(() => {
                        window.location.href = response.data.redirect || '/admin';
                    }, 1000);
                } else {
                    showAlert(response.data.message || 'فشل تسجيل الدخول');
                    loginBtn.disabled = false;
                    loginBtn.innerHTML = '<i class="fas fa-sign-in-alt ml-2"></i> تسجيل الدخول';
                }
            } catch (error) {
                console.error('Login error:', error);
                showAlert(error.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى.');
                loginBtn.disabled = false;
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt ml-2"></i> تسجيل الدخول';
            }
        });
    <\/script>
</body>
</html>
`,Xe=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إعادة تعيين كلمة السر - منصة حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .glass-effect {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .input-focus:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
        }
    </style>
</head>
<body class="gradient-bg min-h-screen flex items-center justify-center p-4">
    <div class="container max-w-md">
        <!-- Reset Password Card -->
        <div class="glass-effect rounded-2xl shadow-2xl p-8 animate-fade-in">
            <!-- Step 1: Email Input -->
            <div id="step1">
                <div class="text-center mb-8">
                    <div class="inline-block bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full p-4 mb-4">
                        <i class="fas fa-key text-4xl"></i>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">نسيت كلمة السر؟</h1>
                    <p class="text-gray-600">لا تقلق، سنساعدك على استعادتها</p>
                </div>

                <div id="alertMessage" class="hidden mb-4 p-4 rounded-lg"></div>

                <form id="emailForm" class="space-y-6">
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-envelope text-orange-600 ml-2"></i>
                            البريد الإلكتروني أو اسم المستخدم
                        </label>
                        <input type="text" id="email" required
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg input-focus transition"
                               placeholder="أدخل بريدك الإلكتروني">
                        <p class="text-sm text-gray-500 mt-2">
                            <i class="fas fa-info-circle ml-1"></i>
                            سنرسل لك رمز التحقق عبر البريد الإلكتروني
                        </p>
                    </div>

                    <button type="submit" id="sendCodeBtn"
                            class="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-bold hover:from-orange-700 hover:to-red-700 transition transform hover:scale-105">
                        <i class="fas fa-paper-plane ml-2"></i>
                        إرسال رمز التحقق
                    </button>
                </form>
            </div>

            <!-- Step 2: Verification Code -->
            <div id="step2" class="hidden">
                <div class="text-center mb-8">
                    <div class="inline-block bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full p-4 mb-4">
                        <i class="fas fa-shield-alt text-4xl"></i>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">رمز التحقق</h1>
                    <p class="text-gray-600">أدخل الرمز المرسل إلى بريدك الإلكتروني</p>
                    <p class="text-sm text-gray-500 mt-2" id="emailDisplay"></p>
                </div>

                <div id="alertMessage2" class="hidden mb-4 p-4 rounded-lg"></div>

                <form id="verifyForm" class="space-y-6">
                    <div>
                        <label class="block text-gray-700 font-bold mb-2 text-center">
                            <i class="fas fa-hashtag text-blue-600 ml-2"></i>
                            رمز التحقق
                        </label>
                        <input type="text" id="verificationCode" required maxlength="6"
                               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg input-focus transition text-center text-2xl tracking-widest"
                               placeholder="000000">
                    </div>

                    <button type="submit" id="verifyBtn"
                            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105">
                        <i class="fas fa-check-circle ml-2"></i>
                        تحقق من الرمز
                    </button>

                    <button type="button" onclick="resendCode()" id="resendBtn"
                            class="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition">
                        <i class="fas fa-redo ml-2"></i>
                        إعادة إرسال الرمز
                    </button>
                </form>
            </div>

            <!-- Step 3: New Password -->
            <div id="step3" class="hidden">
                <div class="text-center mb-8">
                    <div class="inline-block bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-full p-4 mb-4">
                        <i class="fas fa-lock text-4xl"></i>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">كلمة سر جديدة</h1>
                    <p class="text-gray-600">أدخل كلمة السر الجديدة</p>
                </div>

                <div id="alertMessage3" class="hidden mb-4 p-4 rounded-lg"></div>

                <form id="resetForm" class="space-y-6">
                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-lock text-green-600 ml-2"></i>
                            كلمة السر الجديدة
                        </label>
                        <div class="relative">
                            <input type="password" id="newPassword" required minlength="8"
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg input-focus transition"
                                   placeholder="أدخل كلمة السر الجديدة">
                            <button type="button" onclick="togglePassword('newPassword', 'icon1')" 
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <i id="icon1" class="fas fa-eye"></i>
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">يجب أن تكون 8 أحرف على الأقل</p>
                    </div>

                    <div>
                        <label class="block text-gray-700 font-bold mb-2">
                            <i class="fas fa-check-double text-green-600 ml-2"></i>
                            تأكيد كلمة السر
                        </label>
                        <div class="relative">
                            <input type="password" id="confirmPassword" required minlength="8"
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg input-focus transition"
                                   placeholder="أعد إدخال كلمة السر">
                            <button type="button" onclick="togglePassword('confirmPassword', 'icon2')" 
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <i id="icon2" class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" id="resetBtn"
                            class="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-teal-700 transition transform hover:scale-105">
                        <i class="fas fa-save ml-2"></i>
                        حفظ كلمة السر الجديدة
                    </button>
                </form>
            </div>

            <!-- Back to Login -->
            <div class="text-center mt-6">
                <a href="/login" class="text-purple-600 hover:text-purple-800 font-bold">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة لتسجيل الدخول
                </a>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script>
        let userEmail = '';
        let resetToken = '';

        function showAlert(step, message, type = 'error') {
            const alertDiv = document.getElementById(\`alertMessage\${step > 1 ? step : ''}\`);
            alertDiv.className = \`mb-4 p-4 rounded-lg \${type === 'error' ? 'bg-red-100 border-2 border-red-500 text-red-800' : 'bg-green-100 border-2 border-green-500 text-green-800'}\`;
            alertDiv.innerHTML = \`
                <div class="flex items-center">
                    <i class="fas fa-\${type === 'error' ? 'exclamation-circle' : 'check-circle'} text-2xl ml-3"></i>
                    <span>\${message}</span>
                </div>
            \`;
            alertDiv.classList.remove('hidden');
        }

        function goToStep(step) {
            document.getElementById('step1').classList.add('hidden');
            document.getElementById('step2').classList.add('hidden');
            document.getElementById('step3').classList.add('hidden');
            document.getElementById(\`step\${step}\`).classList.remove('hidden');
        }

        function togglePassword(inputId, iconId) {
            const input = document.getElementById(inputId);
            const icon = document.getElementById(iconId);
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        }

        // Step 1: Send verification code
        document.getElementById('emailForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const btn = document.getElementById('sendCodeBtn');
            
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
            
            try {
                const response = await axios.post('/api/auth/forgot-password', { email });
                
                if (response.data.success) {
                    userEmail = email;
                    document.getElementById('emailDisplay').textContent = email;
                    showAlert(1, '✓ تم إرسال رمز التحقق إلى بريدك الإلكتروني', 'success');
                    setTimeout(() => goToStep(2), 1500);
                } else {
                    showAlert(1, response.data.message || 'فشل إرسال رمز التحقق');
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-paper-plane ml-2"></i> إرسال رمز التحقق';
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert(1, error.response?.data?.message || 'حدث خطأ. الرجاء المحاولة مرة أخرى.');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane ml-2"></i> إرسال رمز التحقق';
            }
        });

        // Step 2: Verify code
        document.getElementById('verifyForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const code = document.getElementById('verificationCode').value;
            const btn = document.getElementById('verifyBtn');
            
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري التحقق...';
            
            try {
                const response = await axios.post('/api/auth/verify-reset-code', {
                    email: userEmail,
                    code: code
                });
                
                if (response.data.success) {
                    resetToken = response.data.token;
                    showAlert(2, '✓ تم التحقق بنجاح!', 'success');
                    setTimeout(() => goToStep(3), 1000);
                } else {
                    showAlert(2, response.data.message || 'رمز التحقق غير صحيح');
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-check-circle ml-2"></i> تحقق من الرمز';
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert(2, error.response?.data?.message || 'رمز التحقق غير صحيح');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-check-circle ml-2"></i> تحقق من الرمز';
            }
        });

        // Step 3: Reset password
        document.getElementById('resetForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const btn = document.getElementById('resetBtn');
            
            if (newPassword !== confirmPassword) {
                showAlert(3, 'كلمتا السر غير متطابقتين');
                return;
            }
            
            if (newPassword.length < 8) {
                showAlert(3, 'كلمة السر يجب أن تكون 8 أحرف على الأقل');
                return;
            }
            
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الحفظ...';
            
            try {
                const response = await axios.post('/api/auth/reset-password', {
                    email: userEmail,
                    token: resetToken,
                    newPassword: newPassword
                });
                
                if (response.data.success) {
                    showAlert(3, '✓ تم تغيير كلمة السر بنجاح! جاري التحويل...', 'success');
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 2000);
                } else {
                    showAlert(3, response.data.message || 'فشل تغيير كلمة السر');
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-save ml-2"></i> حفظ كلمة السر الجديدة';
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert(3, error.response?.data?.message || 'حدث خطأ. الرجاء المحاولة مرة أخرى.');
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-save ml-2"></i> حفظ كلمة السر الجديدة';
            }
        });

        async function resendCode() {
            const btn = document.getElementById('resendBtn');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
            
            try {
                await axios.post('/api/auth/forgot-password', { email: userEmail });
                showAlert(2, '✓ تم إعادة إرسال رمز التحقق', 'success');
            } catch (error) {
                showAlert(2, 'فشل إعادة إرسال الرمز');
            }
            
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-redo ml-2"></i> إعادة إرسال الرمز';
        }
    <\/script>
</body>
</html>
`,Ke=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>باقات الاشتراك - منصة حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .gradient-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .package-card {
            transition: all 0.3s ease;
        }
        .package-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .feature-item {
            display: flex;
            align-items: start;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .feature-item:last-child {
            border-bottom: none;
        }
        .popular-badge {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <div class="gradient-header text-white py-16">
        <div class="container mx-auto px-4">
            <div class="text-center">
                <h1 class="text-5xl font-bold mb-4">
                    <i class="fas fa-box-open ml-3"></i>
                    باقات الاشتراك
                </h1>
                <p class="text-xl text-purple-100">اختر الباقة المناسبة لاحتياجات شركتك</p>
            </div>
        </div>
    </div>

    <!-- Packages Container -->
    <div class="container mx-auto px-4 py-12">
        <!-- Loading -->
        <div id="loading" class="text-center py-12">
            <i class="fas fa-spinner fa-spin text-6xl text-purple-600"></i>
            <p class="text-gray-600 mt-4 text-xl">جاري تحميل الباقات...</p>
        </div>

        <!-- Packages Grid -->
        <div id="packagesGrid" class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <!-- Packages will be loaded here -->
        </div>

        <!-- No Packages -->
        <div id="noPackages" class="hidden text-center py-12">
            <i class="fas fa-inbox text-6xl text-gray-400 mb-4"></i>
            <p class="text-gray-600 text-xl">لا توجد باقات متاحة حالياً</p>
        </div>
    </div>

    <!-- Features Comparison Section -->
    <div class="bg-white py-16 mt-12">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                <i class="fas fa-chart-bar text-purple-600 ml-3"></i>
                مقارنة المميزات
            </h2>
            <div class="max-w-6xl mx-auto overflow-x-auto">
                <table class="w-full border-collapse" id="comparisonTable">
                    <thead>
                        <tr class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                            <th class="px-6 py-4 text-right">الميزة</th>
                            <!-- Package columns will be added dynamically -->
                        </tr>
                    </thead>
                    <tbody id="comparisonBody">
                        <!-- Rows will be added dynamically -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- CTA Section -->
    <div class="gradient-header text-white py-16">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold mb-4">هل لديك أسئلة؟</h2>
            <p class="text-xl mb-8">فريقنا مستعد لمساعدتك في اختيار الباقة المناسبة</p>
            <div class="flex justify-center gap-4">
                <a href="/login" class="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
                    <i class="fas fa-sign-in-alt ml-2"></i>
                    تسجيل الدخول
                </a>
                <a href="/" class="bg-purple-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-900 transition">
                    <i class="fas fa-home ml-2"></i>
                    الصفحة الرئيسية
                </a>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
        <div class="container mx-auto px-4 text-center">
            <p>© 2025 منصة حاسبة التمويل. جميع الحقوق محفوظة.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script>
        let packages = [];

        async function loadPackages() {
            try {
                const response = await axios.get('/api/packages');
                
                if (response.data.success) {
                    packages = response.data.data.filter(pkg => pkg.is_active === 1);
                    
                    if (packages.length === 0) {
                        document.getElementById('loading').classList.add('hidden');
                        document.getElementById('noPackages').classList.remove('hidden');
                        return;
                    }
                    
                    renderPackages();
                    renderComparison();
                    
                    document.getElementById('loading').classList.add('hidden');
                    document.getElementById('packagesGrid').classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error loading packages:', error);
                document.getElementById('loading').innerHTML = \`
                    <i class="fas fa-exclamation-circle text-6xl text-red-500"></i>
                    <p class="text-red-600 mt-4 text-xl">حدث خطأ في تحميل الباقات</p>
                \`;
            }
        }

        function renderPackages() {
            const grid = document.getElementById('packagesGrid');
            
            const html = packages.map((pkg, index) => {
                const isPopular = pkg.is_popular === 1;
                const features = JSON.parse(pkg.features || '[]');
                const priceMonthly = parseFloat(pkg.price_monthly || 0);
                const priceYearly = parseFloat(pkg.price_yearly || 0);
                const discount = priceYearly > 0 ? Math.round((1 - (priceYearly / (priceMonthly * 12))) * 100) : 0;
                
                return \`
                    <div class="package-card bg-white rounded-2xl shadow-xl overflow-hidden relative \${isPopular ? 'ring-4 ring-purple-500' : ''}">
                        \${isPopular ? \`
                            <div class="absolute top-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-bl-2xl popular-badge">
                                <i class="fas fa-star ml-2"></i>
                                الأكثر شعبية
                            </div>
                        \` : ''}
                        
                        <div class="p-8 \${isPopular ? 'pt-16' : ''}">
                            <!-- Package Icon -->
                            <div class="text-center mb-6">
                                <div class="inline-block bg-gradient-to-br from-\${index === 0 ? 'blue' : index === 1 ? 'purple' : 'orange'}-500 to-\${index === 0 ? 'indigo' : index === 1 ? 'pink' : 'red'}-600 text-white rounded-full p-6 mb-4">
                                    <i class="fas fa-\${index === 0 ? 'rocket' : index === 1 ? 'crown' : 'star'} text-4xl"></i>
                                </div>
                                <h3 class="text-3xl font-bold text-gray-800">\${pkg.package_name}</h3>
                                <p class="text-gray-600 mt-2">\${pkg.description || ''}</p>
                            </div>

                            <!-- Pricing -->
                            <div class="text-center mb-8 pb-8 border-b-2 border-gray-200">
                                <div class="mb-4">
                                    <span class="text-5xl font-bold text-gray-800">\${priceMonthly.toLocaleString()}</span>
                                    <span class="text-gray-600"> ريال / شهرياً</span>
                                </div>
                                \${priceYearly > 0 ? \`
                                    <div class="bg-green-50 border-2 border-green-500 rounded-lg p-3 inline-block">
                                        <p class="text-green-800 font-bold">
                                            <i class="fas fa-tag ml-2"></i>
                                            وفّر \${discount}% بالاشتراك السنوي
                                        </p>
                                        <p class="text-green-700">\${priceYearly.toLocaleString()} ريال / سنوياً</p>
                                    </div>
                                \` : ''}
                            </div>

                            <!-- Features -->
                            <div class="mb-8">
                                <h4 class="font-bold text-gray-800 mb-4 text-lg">
                                    <i class="fas fa-check-circle text-green-600 ml-2"></i>
                                    المميزات المتضمنة:
                                </h4>
                                <div class="space-y-3">
                                    \${features.map(feature => \`
                                        <div class="feature-item">
                                            <i class="fas fa-check text-green-500 ml-3 mt-1"></i>
                                            <span class="text-gray-700">\${feature}</span>
                                        </div>
                                    \`).join('')}
                                    
                                    <!-- Package Limits -->
                                    <div class="feature-item">
                                        <i class="fas fa-users text-blue-500 ml-3 mt-1"></i>
                                        <span class="text-gray-700">حتى \${pkg.max_users || 'غير محدود'} مستخدم</span>
                                    </div>
                                    <div class="feature-item">
                                        <i class="fas fa-database text-purple-500 ml-3 mt-1"></i>
                                        <span class="text-gray-700">\${pkg.storage_gb || 'غير محدود'} جيجابايت تخزين</span>
                                    </div>
                                    <div class="feature-item">
                                        <i class="fas fa-headset text-orange-500 ml-3 mt-1"></i>
                                        <span class="text-gray-700">دعم فني \${pkg.support_level || 'أساسي'}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- CTA Button -->
                            <button onclick="subscribePackage(\${pkg.id}, '\${pkg.package_name}')" 
                                    class="w-full bg-gradient-to-r from-\${index === 0 ? 'blue' : index === 1 ? 'purple' : 'orange'}-600 to-\${index === 0 ? 'indigo' : index === 1 ? 'pink' : 'red'}-600 text-white py-4 rounded-lg font-bold hover:shadow-lg transition transform hover:scale-105">
                                <i class="fas fa-shopping-cart ml-2"></i>
                                اشترك الآن
                            </button>
                        </div>
                    </div>
                \`;
            }).join('');
            
            grid.innerHTML = html;
        }

        function renderComparison() {
            const thead = document.querySelector('#comparisonTable thead tr');
            const tbody = document.getElementById('comparisonBody');
            
            // Add package columns to header
            packages.forEach((pkg, index) => {
                const th = document.createElement('th');
                th.className = 'px-6 py-4 text-center';
                th.innerHTML = \`
                    <div class="font-bold">\${pkg.package_name}</div>
                    <div class="text-sm font-normal">\${parseFloat(pkg.price_monthly).toLocaleString()} ريال/شهر</div>
                \`;
                thead.appendChild(th);
            });
            
            // Comparison features
            const comparisonFeatures = [
                { label: 'عدد المستخدمين', key: 'max_users' },
                { label: 'مساحة التخزين', key: 'storage_gb', suffix: ' جيجابايت' },
                { label: 'مستوى الدعم', key: 'support_level' },
                { label: 'تقارير متقدمة', key: 'advanced_reports', type: 'bool' },
                { label: 'واجهة برمجية API', key: 'api_access', type: 'bool' }
            ];
            
            comparisonFeatures.forEach(feature => {
                const tr = document.createElement('tr');
                tr.className = 'border-b hover:bg-gray-50';
                tr.innerHTML = \`<td class="px-6 py-4 font-bold text-gray-700">\${feature.label}</td>\`;
                
                packages.forEach(pkg => {
                    const td = document.createElement('td');
                    td.className = 'px-6 py-4 text-center';
                    
                    let value = pkg[feature.key];
                    if (feature.type === 'bool') {
                        value = value === 1 ? '<i class="fas fa-check text-green-600 text-2xl"></i>' : '<i class="fas fa-times text-red-600 text-2xl"></i>';
                    } else {
                        value = value + (feature.suffix || '');
                    }
                    
                    td.innerHTML = value;
                    tr.appendChild(td);
                });
                
                tbody.appendChild(tr);
            });
        }

        function subscribePackage(packageId, packageName) {
            // Redirect to subscription request page
            window.location.href = \`/subscribe?package=\${packageId}\`;
        }

        // Load packages on page load
        loadPackages();
    <\/script>
</body>
</html>
`,Ze=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>طلب اشتراك - منصة حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .gradient-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .step-indicator {
            transition: all 0.3s ease;
        }
        .step-indicator.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .step-indicator.completed {
            background: #10b981;
            color: white;
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <div class="gradient-header text-white py-12">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-4xl font-bold mb-4">
                    <i class="fas fa-clipboard-list ml-3"></i>
                    طلب اشتراك جديد
                </h1>
                <p class="text-purple-100 text-lg">املأ البيانات التالية لإتمام طلب الاشتراك</p>
            </div>
        </div>
    </div>

    <!-- Progress Steps -->
    <div class="bg-white shadow-md py-6">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="flex justify-between items-center">
                    <div class="flex items-center flex-1">
                        <div id="step1-indicator" class="step-indicator active w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-lg">1</div>
                        <div class="flex-1 h-1 bg-gray-300 mx-2"></div>
                    </div>
                    <div class="flex items-center flex-1">
                        <div id="step2-indicator" class="step-indicator w-12 h-12 rounded-full flex items-center justify-center font-bold bg-gray-300 border-4 border-white shadow-lg">2</div>
                        <div class="flex-1 h-1 bg-gray-300 mx-2"></div>
                    </div>
                    <div class="flex items-center flex-1">
                        <div id="step3-indicator" class="step-indicator w-12 h-12 rounded-full flex items-center justify-center font-bold bg-gray-300 border-4 border-white shadow-lg">3</div>
                    </div>
                </div>
                <div class="flex justify-between mt-2 text-sm">
                    <span class="flex-1 text-center font-bold">معلومات الشركة</span>
                    <span class="flex-1 text-center">معلومات المسؤول</span>
                    <span class="flex-1 text-center">مراجعة وإرسال</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
        <div class="max-w-4xl mx-auto">
            <!-- Alert Messages -->
            <div id="alertMessage" class="hidden mb-6 p-4 rounded-lg"></div>

            <!-- Step 1: Company Information -->
            <div id="step1" class="bg-white rounded-2xl shadow-xl p-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-building text-purple-600 ml-3 text-4xl"></i>
                    معلومات الشركة
                </h2>

                <form id="companyForm" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-building text-blue-600 ml-2"></i>
                                اسم الشركة *
                            </label>
                            <input type="text" id="company_name" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-id-card text-green-600 ml-2"></i>
                                السجل التجاري *
                            </label>
                            <input type="text" id="commercial_register" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-envelope text-purple-600 ml-2"></i>
                                البريد الإلكتروني للشركة *
                            </label>
                            <input type="email" id="company_email" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-phone text-orange-600 ml-2"></i>
                                هاتف الشركة *
                            </label>
                            <input type="tel" id="company_phone" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                                   placeholder="05xxxxxxxx">
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-map-marker-alt text-red-600 ml-2"></i>
                                عنوان الشركة *
                            </label>
                            <textarea id="company_address" required rows="3"
                                      class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"></textarea>
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-city text-indigo-600 ml-2"></i>
                                المدينة *
                            </label>
                            <input type="text" id="city" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-briefcase text-teal-600 ml-2"></i>
                                نوع النشاط *
                            </label>
                            <select id="business_type" required
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                                <option value="">اختر نوع النشاط</option>
                                <option value="finance">مالي</option>
                                <option value="banking">بنكي</option>
                                <option value="insurance">تأمين</option>
                                <option value="real_estate">عقاري</option>
                                <option value="other">أخرى</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" 
                            class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-105">
                        <span>التالي</span>
                        <i class="fas fa-arrow-left mr-2"></i>
                    </button>
                </form>
            </div>

            <!-- Step 2: Admin Information -->
            <div id="step2" class="hidden bg-white rounded-2xl shadow-xl p-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-user-tie text-indigo-600 ml-3 text-4xl"></i>
                    معلومات المسؤول
                </h2>

                <form id="adminForm" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-user text-blue-600 ml-2"></i>
                                الاسم الكامل *
                            </label>
                            <input type="text" id="admin_name" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-envelope text-purple-600 ml-2"></i>
                                البريد الإلكتروني *
                            </label>
                            <input type="email" id="admin_email" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-phone text-green-600 ml-2"></i>
                                رقم الجوال *
                            </label>
                            <input type="tel" id="admin_phone" required pattern="05[0-9]{8}"
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                                   placeholder="05xxxxxxxx">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-briefcase text-orange-600 ml-2"></i>
                                المسمى الوظيفي *
                            </label>
                            <input type="text" id="admin_position" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-user-circle text-indigo-600 ml-2"></i>
                                اسم المستخدم *
                            </label>
                            <input type="text" id="username" required
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                        </div>

                        <div>
                            <label class="block text-gray-700 font-bold mb-2">
                                <i class="fas fa-lock text-red-600 ml-2"></i>
                                كلمة السر *
                            </label>
                            <input type="password" id="password" required minlength="8"
                                   class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition">
                            <p class="text-xs text-gray-500 mt-1">8 أحرف على الأقل</p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <button type="button" onclick="goToStep(1)" 
                                class="flex-1 bg-gray-300 text-gray-800 py-4 rounded-lg font-bold text-lg hover:bg-gray-400 transition">
                            <i class="fas fa-arrow-right ml-2"></i>
                            السابق
                        </button>
                        <button type="submit" 
                                class="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-105">
                            <span>التالي</span>
                            <i class="fas fa-arrow-left mr-2"></i>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Step 3: Review & Submit -->
            <div id="step3" class="hidden bg-white rounded-2xl shadow-xl p-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-check-circle text-green-600 ml-3 text-4xl"></i>
                    مراجعة البيانات
                </h2>

                <div class="space-y-6">
                    <!-- Selected Package -->
                    <div class="bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-500 rounded-lg p-6">
                        <h3 class="text-xl font-bold text-purple-800 mb-4">الباقة المختارة</h3>
                        <div id="packageInfo"></div>
                    </div>

                    <!-- Company Info Summary -->
                    <div class="border-2 border-gray-200 rounded-lg p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">معلومات الشركة</h3>
                        <div id="companyInfo" class="grid grid-cols-2 gap-4"></div>
                    </div>

                    <!-- Admin Info Summary -->
                    <div class="border-2 border-gray-200 rounded-lg p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">معلومات المسؤول</h3>
                        <div id="adminInfo" class="grid grid-cols-2 gap-4"></div>
                    </div>

                    <!-- Terms and Conditions -->
                    <div class="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
                        <label class="flex items-start">
                            <input type="checkbox" id="acceptTerms" class="mt-1 ml-3 w-5 h-5 text-purple-600">
                            <span class="text-gray-800">
                                أوافق على <a href="#" class="text-purple-600 font-bold hover:text-purple-800">الشروط والأحكام</a> 
                                و <a href="#" class="text-purple-600 font-bold hover:text-purple-800">سياسة الخصوصية</a>
                            </span>
                        </label>
                    </div>

                    <div class="flex gap-4">
                        <button type="button" onclick="goToStep(2)" 
                                class="flex-1 bg-gray-300 text-gray-800 py-4 rounded-lg font-bold text-lg hover:bg-gray-400 transition">
                            <i class="fas fa-arrow-right ml-2"></i>
                            السابق
                        </button>
                        <button type="button" onclick="submitSubscription()" id="submitBtn"
                                class="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-teal-700 transition transform hover:scale-105">
                            <i class="fas fa-paper-plane ml-2"></i>
                            إرسال الطلب
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script>
        let currentStep = 1;
        let formData = {
            package_id: null,
            company: {},
            admin: {}
        };
        let selectedPackage = null;

        // Get package ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        formData.package_id = urlParams.get('package');

        async function loadPackageInfo() {
            if (!formData.package_id) {
                window.location.href = '/packages';
                return;
            }

            try {
                const response = await axios.get('/api/packages');
                selectedPackage = response.data.data.find(p => p.id == formData.package_id);
                
                if (!selectedPackage) {
                    window.location.href = '/packages';
                }
            } catch (error) {
                console.error('Error loading package:', error);
            }
        }

        function showAlert(message, type = 'error') {
            const alertDiv = document.getElementById('alertMessage');
            alertDiv.className = \`mb-6 p-4 rounded-lg \${type === 'error' ? 'bg-red-100 border-2 border-red-500 text-red-800' : 'bg-green-100 border-2 border-green-500 text-green-800'}\`;
            alertDiv.innerHTML = \`
                <div class="flex items-center">
                    <i class="fas fa-\${type === 'error' ? 'exclamation-circle' : 'check-circle'} text-2xl ml-3"></i>
                    <span>\${message}</span>
                </div>
            \`;
            alertDiv.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function goToStep(step) {
            // Hide all steps
            document.getElementById('step1').classList.add('hidden');
            document.getElementById('step2').classList.add('hidden');
            document.getElementById('step3').classList.add('hidden');
            
            // Show target step
            document.getElementById(\`step\${step}\`).classList.remove('hidden');
            
            // Update step indicators
            for (let i = 1; i <= 3; i++) {
                const indicator = document.getElementById(\`step\${i}-indicator\`);
                if (i < step) {
                    indicator.className = 'step-indicator completed w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-lg';
                } else if (i === step) {
                    indicator.className = 'step-indicator active w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-lg';
                } else {
                    indicator.className = 'step-indicator w-12 h-12 rounded-full flex items-center justify-center font-bold bg-gray-300 border-4 border-white shadow-lg';
                }
            }
            
            currentStep = step;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Step 1: Company Form
        document.getElementById('companyForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            formData.company = {
                company_name: document.getElementById('company_name').value,
                commercial_register: document.getElementById('commercial_register').value,
                company_email: document.getElementById('company_email').value,
                company_phone: document.getElementById('company_phone').value,
                company_address: document.getElementById('company_address').value,
                city: document.getElementById('city').value,
                business_type: document.getElementById('business_type').value
            };
            
            goToStep(2);
        });

        // Step 2: Admin Form
        document.getElementById('adminForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            formData.admin = {
                admin_name: document.getElementById('admin_name').value,
                admin_email: document.getElementById('admin_email').value,
                admin_phone: document.getElementById('admin_phone').value,
                admin_position: document.getElementById('admin_position').value,
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            };
            
            showReview();
            goToStep(3);
        });

        function showReview() {
            // Package Info
            if (selectedPackage) {
                document.getElementById('packageInfo').innerHTML = \`
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-2xl font-bold text-purple-800">\${selectedPackage.package_name}</p>
                            <p class="text-gray-600">\${selectedPackage.description || ''}</p>
                        </div>
                        <div class="text-left">
                            <p class="text-3xl font-bold text-purple-800">\${parseFloat(selectedPackage.price_monthly).toLocaleString()} ريال</p>
                            <p class="text-gray-600">شهرياً</p>
                        </div>
                    </div>
                \`;
            }
            
            // Company Info
            const companyHtml = Object.entries(formData.company).map(([key, value]) => \`
                <div>
                    <p class="text-sm text-gray-600">\${getFieldLabel(key)}</p>
                    <p class="font-bold text-gray-800">\${value}</p>
                </div>
            \`).join('');
            document.getElementById('companyInfo').innerHTML = companyHtml;
            
            // Admin Info (hide password)
            const adminHtml = Object.entries(formData.admin).filter(([key]) => key !== 'password').map(([key, value]) => \`
                <div>
                    <p class="text-sm text-gray-600">\${getFieldLabel(key)}</p>
                    <p class="font-bold text-gray-800">\${value}</p>
                </div>
            \`).join('');
            document.getElementById('adminInfo').innerHTML = adminHtml;
        }

        function getFieldLabel(key) {
            const labels = {
                company_name: 'اسم الشركة',
                commercial_register: 'السجل التجاري',
                company_email: 'البريد الإلكتروني',
                company_phone: 'الهاتف',
                company_address: 'العنوان',
                city: 'المدينة',
                business_type: 'نوع النشاط',
                admin_name: 'الاسم الكامل',
                admin_email: 'البريد الإلكتروني',
                admin_phone: 'رقم الجوال',
                admin_position: 'المسمى الوظيفي',
                username: 'اسم المستخدم'
            };
            return labels[key] || key;
        }

        async function submitSubscription() {
            if (!document.getElementById('acceptTerms').checked) {
                showAlert('يجب الموافقة على الشروط والأحكام');
                return;
            }
            
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
            
            try {
                const response = await axios.post('/api/subscription-requests', formData);
                
                if (response.data.success) {
                    showAlert('✓ تم إرسال طلب الاشتراك بنجاح! سيتم التواصل معك قريباً', 'success');
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 3000);
                } else {
                    showAlert(response.data.message || 'فشل إرسال الطلب');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane ml-2"></i> إرسال الطلب';
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert(error.response?.data?.message || 'حدث خطأ. الرجاء المحاولة مرة أخرى.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane ml-2"></i> إرسال الطلب';
            }
        }

        // Load package info on page load
        loadPackageInfo();
    <\/script>
</body>
</html>
`,ne=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>لوحة التحكم - نظام حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"><\/script>
    <style>
        .content-section { display: none; }
        .content-section.active { display: block; animation: fadeIn 0.5s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .quick-access-btn { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .quick-access-btn:active { transform: scale(0.95) !important; }
        
        /* Enhanced Scrollbar Styles */
        .overflow-x-auto {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #cbd5e0 #f7fafc;
        }
        
        .overflow-x-auto::-webkit-scrollbar {
            height: 8px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
            background: #f7fafc;
            border-radius: 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: #a0aec0;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
            /* Make tables horizontally scrollable */
            .overflow-x-auto {
                -webkit-overflow-scrolling: touch;
            }
            
            /* Adjust padding for mobile */
            .px-6 { padding-left: 1rem; padding-right: 1rem; }
            .px-8 { padding-left: 1rem; padding-right: 1rem; }
            
            /* Make buttons full width on mobile */
            .quick-access-btn {
                width: 100%;
                margin-bottom: 0.5rem;
            }
            
            /* Adjust grid columns for mobile */
            .grid-cols-2 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .grid-cols-3 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .grid-cols-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            
            /* Hide less important columns on mobile */
            .mobile-hide { display: none; }
            
            /* Make modals full screen on mobile */
            .fixed.inset-0 > div {
                width: 95% !important;
                max-width: 95% !important;
                margin: 1rem auto !important;
                max-height: 90vh !important;
                overflow-y: auto !important;
            }
            
            /* Adjust font sizes */
            .text-3xl { font-size: 1.5rem; }
            .text-2xl { font-size: 1.25rem; }
            
            /* Make sidebar toggleable on mobile */
            #sidebar {
                position: fixed;
                left: -100%;
                transition: left 0.3s ease;
                z-index: 50;
                height: 100vh;
            }
            
            #sidebar.active {
                left: 0;
            }
            
            /* Add overlay for mobile sidebar */
            #sidebar-overlay {
                display: none;
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.5);
                z-index: 40;
            }
            
            #sidebar-overlay.active {
                display: block;
            }
        }
        
        /* Tablet Styles */
        @media (min-width: 769px) and (max-width: 1024px) {
            .grid-cols-4 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Top Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div class="flex items-center justify-between px-6 py-4">
            <div class="flex items-center space-x-reverse space-x-4">
                <!-- Mobile Menu Toggle -->
                <button onclick="toggleMobileMenu()" class="p-2 hover:bg-white/10 rounded-lg md:hidden" title="القائمة">
                    <i class="fas fa-bars text-xl"></i>
                </button>
                <button onclick="toggleDarkMode()" class="p-2 hover:bg-white/10 rounded-lg hidden md:inline-block" title="الوضع الليلي">
                    <i class="fas fa-moon"></i>
                </button>
                <button class="p-2 hover:bg-white/10 rounded-lg hidden md:inline-block" title="الإشعارات">
                    <i class="fas fa-bell"></i>
                </button>
                <button onclick="doLogout()" class="p-2 hover:bg-red-500 rounded-lg transition-colors" title="تسجيل الخروج">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
            <div class="flex items-center space-x-reverse space-x-3">
                <div class="text-right">
                    <div class="font-bold" id="userDisplayName">جاري التحميل...</div>
                    <div class="text-xs text-blue-200" id="userEmail">-</div>
                </div>
                <i class="fas fa-user-circle text-3xl"></i>
            </div>
        </div>
    </div>

    <!-- Main Content بدون Sidebar -->
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
            
            <!-- لوحة الوصول السريع -->
            <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <i class="fas fa-th-large text-blue-600 ml-3"></i>
                    لوحة الوصول السريع
                </h2>
                
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <!-- زر لوحة المعلومات -->
                    <a href="/admin/dashboard" class="quick-access-btn bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-tachometer-alt text-3xl mb-2"></i>
                        <div class="text-sm font-bold">لوحة المعلومات</div>
                    </a>
                    
                    <!-- زر العملاء -->
                    <a href="/admin/customers" class="quick-access-btn bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-users text-3xl mb-2"></i>
                        <div class="text-sm font-bold">العملاء</div>
                    </a>
                    
                    <!-- زر طلبات التمويل -->
                    <a href="/admin/requests" class="quick-access-btn bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-file-invoice text-3xl mb-2"></i>
                        <div class="text-sm font-bold">طلبات التمويل</div>
                    </a>
                    
                    <!-- زر التقارير -->
                    <a href="/admin/reports" class="quick-access-btn bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-chart-line text-3xl mb-2"></i>
                        <div class="text-sm font-bold">التقارير</div>
                    </a>
                    
                    <!-- زر سندات القبض -->
                    <a href="/admin/payments" class="quick-access-btn bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-receipt text-3xl mb-2"></i>
                        <div class="text-sm font-bold">سندات القبض</div>
                    </a>
                    
                    <!-- زر البنوك -->
                    <a href="/admin/banks" class="quick-access-btn bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-university text-3xl mb-2"></i>
                        <div class="text-sm font-bold">البنوك</div>
                    </a>
                    
                    <!-- زر نسب التمويل -->
                    <a href="/admin/rates" class="quick-access-btn bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-percentage text-3xl mb-2"></i>
                        <div class="text-sm font-bold">نسب التمويل</div>
                    </a>
                    
                    <!-- زر الاشتراكات -->
                    <a href="/admin/subscriptions" class="quick-access-btn bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-id-card text-3xl mb-2"></i>
                        <div class="text-sm font-bold">الاشتراكات</div>
                    </a>
                    
                    <!-- زر الباقات -->
                    <a href="/admin/packages" class="quick-access-btn bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-box text-3xl mb-2"></i>
                        <div class="text-sm font-bold">الباقات</div>
                    </a>
                    
                    <!-- زر المستخدمين -->
                    <a href="/admin/users" class="quick-access-btn bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-users-cog text-3xl mb-2"></i>
                        <div class="text-sm font-bold">المستخدمين</div>
                    </a>
                    
                    <!-- زر الإشعارات -->
                    <a href="/admin/notifications" class="quick-access-btn bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-bell text-3xl mb-2"></i>
                        <div class="text-sm font-bold">الإشعارات</div>
                    </a>
                    
                    <!-- زر الحاسبة -->
                    <a href="/calculator" id="calculatorLink" class="quick-access-btn bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-calculator text-3xl mb-2"></i>
                        <div class="text-sm font-bold">الحاسبة</div>
                    </a>
                    
                    <!-- زر الصفحة الرئيسية -->
                    <a href="/" class="quick-access-btn bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-home text-3xl mb-2"></i>
                        <div class="text-sm font-bold">الصفحة الرئيسية</div>
                    </a>
                    
                    <!-- زر الشركات (Super Admin فقط) -->
                    <a href="/admin/tenants" class="quick-access-btn bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-building text-3xl mb-2"></i>
                        <div class="text-sm font-bold">إدارة الشركات</div>
                    </a>
                    
                    <!-- زر حاسبات الشركات -->
                    <a href="/admin/tenant-calculators" class="quick-access-btn bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-calculator text-3xl mb-2"></i>
                        <div class="text-sm font-bold">حاسبات الشركات</div>
                    </a>
                    
                    <!-- زر نموذج SaaS -->
                    <a href="/admin/saas-settings" class="quick-access-btn bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg p-4 transition-all transform hover:scale-105 shadow-lg block text-center">
                        <i class="fas fa-cogs text-3xl mb-2"></i>
                        <div class="text-sm font-bold">إعدادات SaaS</div>
                    </a>
                </div>
            </div>
            <!-- Dashboard Section -->
            <div id="dashboard-section" class="content-section active">
                <h1 class="text-3xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-tachometer-alt text-blue-600 ml-2"></i>
                    لوحة المعلومات
                </h1>
                
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-blue-100 text-sm mb-1">إجمالي العملاء</p>
                                <p class="text-3xl font-bold" id="stat-customers">0</p>
                            </div>
                            <i class="fas fa-users text-5xl opacity-30"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-green-100 text-sm mb-1">إجمالي الطلبات</p>
                                <p class="text-3xl font-bold" id="stat-requests">0</p>
                            </div>
                            <i class="fas fa-file-invoice text-5xl opacity-30"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-yellow-100 text-sm mb-1">قيد الانتظار</p>
                                <p class="text-3xl font-bold" id="stat-pending">0</p>
                            </div>
                            <i class="fas fa-clock text-5xl opacity-30"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-purple-100 text-sm mb-1">مقبول</p>
                                <p class="text-3xl font-bold" id="stat-approved">0</p>
                            </div>
                            <i class="fas fa-check-circle text-5xl opacity-30"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Additional Stats - Superadmin Only -->
                <div class="grid grid-cols-1 md:grid-cols-5 gap-6 superadmin-only-stats" style="display: none;">
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">البنوك النشطة</span>
                            <i class="fas fa-university text-blue-500"></i>
                        </div>
                        <p class="text-2xl font-bold text-gray-800" id="stat-banks">0</p>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">الشركات النشطة</span>
                            <i class="fas fa-building text-emerald-500"></i>
                        </div>
                        <p class="text-2xl font-bold text-gray-800" id="stat-tenants">0</p>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">الاشتراكات النشطة</span>
                            <i class="fas fa-crown text-yellow-500"></i>
                        </div>
                        <p class="text-2xl font-bold text-gray-800" id="stat-subscriptions">0</p>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">المستخدمين النشطين</span>
                            <i class="fas fa-user-check text-green-500"></i>
                        </div>
                        <p class="text-2xl font-bold text-gray-800" id="stat-users">0</p>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">إجمالي الحسابات</span>
                            <i class="fas fa-calculator text-purple-500"></i>
                        </div>
                        <p class="text-2xl font-bold text-gray-800" id="stat-calculations">0</p>
                    </div>
                </div>
                
                <!-- Calculator Link & QR Code Section -->
                <div class="bg-white rounded-xl shadow-lg p-6 mt-6" id="calculatorLinkSection">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-calculator text-blue-600 text-2xl ml-3"></i>
                        <h2 class="text-xl font-bold text-gray-800">رابط حاسبة التمويل</h2>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Left Side: Link -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <i class="fas fa-link ml-1"></i>
                                رابط الحاسبة الخاصة بك
                            </label>
                            <div class="flex gap-2">
                                <input 
                                    type="text" 
                                    id="calculatorLinkInput" 
                                    value="جاري التحميل..." 
                                    readonly 
                                    class="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
                                >
                                <button 
                                    onclick="copyCalculatorLink()" 
                                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                                    title="نسخ الرابط"
                                >
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                            <p class="text-xs text-gray-500 mt-2">
                                <i class="fas fa-info-circle ml-1"></i>
                                يمكنك مشاركة هذا الرابط مع عملائك لاستخدام حاسبة التمويل
                            </p>
                            
                            <!-- Success Message -->
                            <div id="copySuccessMessage" class="hidden mt-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                                <i class="fas fa-check-circle ml-1"></i>
                                تم نسخ الرابط بنجاح!
                            </div>
                            
                            <!-- Open Link Button -->
                            <button 
                                onclick="openCalculatorLink()" 
                                class="w-full mt-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                            >
                                <i class="fas fa-external-link-alt ml-2"></i>
                                فتح الحاسبة في نافذة جديدة
                            </button>
                        </div>
                        
                        <!-- Right Side: QR Code -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <i class="fas fa-qrcode ml-1"></i>
                                رمز QR للمشاركة
                            </label>
                            <div class="flex flex-col items-center justify-center bg-gray-50 border border-gray-300 rounded-lg p-4">
                                <div id="qrcodeContainer" class="mb-3"></div>
                                <button 
                                    onclick="downloadQRCode()" 
                                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                                >
                                    <i class="fas fa-download ml-1"></i>
                                    تحميل رمز QR
                                </button>
                            </div>
                            <p class="text-xs text-gray-500 mt-2 text-center">
                                <i class="fas fa-mobile-alt ml-1"></i>
                                يمكن للعملاء مسح الرمز للوصول إلى الحاسبة مباشرة
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Employee Calculator Link & QR Code Section -->
                <div class="bg-white rounded-xl shadow-lg p-6 mt-6" id="employeeCalculatorSection" style="display: none;">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-calculator text-green-600 text-2xl ml-3"></i>
                        <h2 class="text-xl font-bold text-gray-800">رابط حاسبة الشركة</h2>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Left Side: Link -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <i class="fas fa-link ml-1"></i>
                                رابط حاسبة التمويل الخاصة بشركتك
                            </label>
                            <div class="flex gap-2">
                                <input 
                                    type="text" 
                                    id="employeeCalculatorLinkInput" 
                                    value="جاري التحميل..." 
                                    readonly 
                                    class="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-500"
                                >
                                <button 
                                    onclick="copyEmployeeCalculatorLink()" 
                                    class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                                    title="نسخ الرابط"
                                >
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                            <p class="text-xs text-gray-500 mt-2">
                                <i class="fas fa-info-circle ml-1"></i>
                                يمكنك مشاركة هذا الرابط مع عملائك لاستخدام حاسبة التمويل
                            </p>
                            
                            <!-- Success Message -->
                            <div id="employeeCopySuccessMessage" class="hidden mt-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                                <i class="fas fa-check-circle ml-1"></i>
                                تم نسخ الرابط بنجاح!
                            </div>
                            
                            <!-- Open Link Button -->
                            <button 
                                onclick="openEmployeeCalculatorLink()" 
                                class="w-full mt-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                            >
                                <i class="fas fa-external-link-alt ml-2"></i>
                                فتح الحاسبة في نافذة جديدة
                            </button>
                        </div>
                        
                        <!-- Right Side: QR Code -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <i class="fas fa-qrcode ml-1"></i>
                                باركود الحاسبة
                            </label>
                            <div class="flex flex-col items-center justify-center bg-gray-50 border border-gray-300 rounded-lg p-4">
                                <div id="employeeQRCodeContainer" class="mb-3"></div>
                                <button 
                                    onclick="downloadEmployeeQRCode()" 
                                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                                >
                                    <i class="fas fa-download ml-1"></i>
                                    تحميل الباركود
                                </button>
                            </div>
                            <p class="text-xs text-gray-500 mt-2 text-center">
                                <i class="fas fa-mobile-alt ml-1"></i>
                                يمكن للعملاء مسح الباركود للوصول إلى الحاسبة مباشرة
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Customers Section -->
            <div id="customers-section" class="content-section">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-users text-blue-600 ml-2"></i>
                        إدارة العملاء
                    </h1>
                    <div class="flex space-x-reverse space-x-3">
                        <button onclick="addCustomer()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold">
                            <i class="fas fa-plus ml-2"></i>
                            إضافة عميل جديد
                        </button>
                        <button onclick="exportExcel('customers')" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-file-excel ml-2"></i>
                            تصدير Excel
                        </button>
                        <button onclick="showAddCustomerModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-plus ml-2"></i>
                            إضافة عميل
                        </button>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="mb-4">
                        <input type="text" id="searchCustomers" placeholder="بحث في العملاء..." 
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">م</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الاسم</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الجوال</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">تاريخ الميلاد</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الراتب</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">مبلغ التمويل</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الالتزامات</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">نوع التمويل</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="customersTable">
                                <tr>
                                    <td colspan="9" class="text-center py-8">
                                        <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Financing Requests Section -->
            <div id="financing-requests-section" class="content-section">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-file-invoice text-green-600 ml-2"></i>
                        طلبات التمويل من العملاء
                    </h1>
                    <div class="flex space-x-reverse space-x-3">
                        <select id="filterStatus" onchange="loadFinancingRequests()" class="px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="">جميع الحالات</option>
                            <option value="pending">قيد الانتظار</option>
                            <option value="approved">مقبول</option>
                            <option value="rejected">مرفوض</option>
                        </select>
                        <select id="filterBank" onchange="loadFinancingRequests()" class="px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="">جميع البنوك</option>
                        </select>
                        <button onclick="loadFinancingRequests()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-sync ml-2"></i>
                            تحديث
                        </button>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-red-100 border-r-4 border-red-500 rounded-lg p-4">
                        <div class="text-gray-700 text-sm">مرفوض</div>
                        <div class="text-2xl font-bold text-red-600" id="requests-rejected">0</div>
                    </div>
                    <div class="bg-green-100 border-r-4 border-green-500 rounded-lg p-4">
                        <div class="text-gray-700 text-sm">تحت المعالجة</div>
                        <div class="text-2xl font-bold text-green-600" id="requests-processing">0</div>
                    </div>
                    <div class="bg-purple-100 border-r-4 border-purple-500 rounded-lg p-4">
                        <div class="text-gray-700 text-sm">تحت المراجعة</div>
                        <div class="text-2xl font-bold text-purple-600" id="requests-review">0</div>
                    </div>
                    <div class="bg-blue-100 border-r-4 border-blue-500 rounded-lg p-4">
                        <div class="text-gray-700 text-sm">طلب اكتمال بيانات</div>
                        <div class="text-2xl font-bold text-blue-600" id="requests-incomplete">2</div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">م</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">العميل</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الجوال</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">نوع التمويل</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">المبلغ</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">المدة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">البنك</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="requestsTable">
                                <tr>
                                    <td colspan="9" class="text-center py-8">
                                        <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Other sections will be loaded dynamically -->
            <div id="banks-section" class="content-section">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-university text-blue-600 ml-2"></i>
                        إدارة البنوك
                    </h1>
                    <button onclick="addBank()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold">
                        <i class="fas fa-plus ml-2"></i>
                        إضافة بنك جديد
                    </button>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">م</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">اسم البنك</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الكود</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="banksTable">
                                <tr>
                                    <td colspan="5" class="text-center py-8">
                                        <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="rates-section" class="content-section">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-percent text-green-600 ml-2"></i>
                        نسب التمويل
                    </h1>
                    <button onclick="addRate()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold">
                        <i class="fas fa-plus ml-2"></i>
                        إضافة نسبة جديدة
                    </button>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">م</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">البنك</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">نوع التمويل</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">النسبة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">المبلغ (من - إلى)</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الراتب (من - إلى)</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="ratesTable">
                                <tr>
                                    <td colspan="8" class="text-center py-8">
                                        <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="subscriptions-section" class="content-section">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-crown text-yellow-600 ml-2"></i>
                        الاشتراكات
                    </h1>
                    <button onclick="addSubscription()" class="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-bold">
                        <i class="fas fa-plus ml-2"></i>
                        إضافة اشتراك جديد
                    </button>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">م</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الشركة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الباقة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">تاريخ البداية</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">تاريخ الانتهاء</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="subscriptionsTable">
                                <tr>
                                    <td colspan="7" class="text-center py-8">
                                        <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="users-section" class="content-section">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-user-cog text-purple-600 ml-2"></i>
                        المستخدمين
                    </h1>
                    <button onclick="addUser()" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold">
                        <i class="fas fa-plus ml-2"></i>
                        إضافة مستخدم جديد
                    </button>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">م</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الاسم</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">البريد الإلكتروني</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">اسم المستخدم</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الدور</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الصلاحيات</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="usersTable">
                                <tr>
                                    <td colspan="7" class="text-center py-8">
                                        <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="packages-section" class="content-section">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-box text-orange-600 ml-2"></i>
                        إدارة الباقات
                    </h1>
                    <button onclick="addPackage()" class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-bold">
                        <i class="fas fa-plus ml-2"></i>
                        إضافة باقة جديدة
                    </button>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">م</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">اسم الباقة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">السعر</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">المدة (أشهر)</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">عدد الحسابات</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="packagesTable">
                                <tr>
                                    <td colspan="7" class="text-center py-8">
                                        <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="subscription-requests-section" class="content-section">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-clipboard-list text-red-600 ml-2"></i>
                        طلبات الاشتراك
                    </h1>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">م</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">اسم الشركة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">جهة الاتصال</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">البريد الإلكتروني</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الجوال</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الباقة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="subscriptionRequestsTable">
                                <tr>
                                    <td colspan="8" class="text-center py-8">
                                        <i class="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- Reports Section -->
            <div id="reports-section" class="content-section">
                <h1 class="text-3xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-chart-line text-indigo-600 ml-2"></i>
                    التقارير والإحصائيات
                </h1>
                
                <!-- Date Range Filter -->
                <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">من تاريخ</label>
                            <input type="date" id="reportFromDate" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">إلى تاريخ</label>
                            <input type="date" id="reportToDate" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        </div>
                        <div class="flex items-end">
                            <button onclick="loadReports()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold">
                                <i class="fas fa-search ml-2"></i>
                                عرض التقرير
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Statistics Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm opacity-90">إجمالي الطلبات</p>
                                <h3 class="text-3xl font-bold mt-2" id="reportTotalRequests">0</h3>
                            </div>
                            <i class="fas fa-file-alt text-4xl opacity-50"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm opacity-90">الطلبات المقبولة</p>
                                <h3 class="text-3xl font-bold mt-2" id="reportApprovedRequests">0</h3>
                            </div>
                            <i class="fas fa-check-circle text-4xl opacity-50"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm opacity-90">قيد المراجعة</p>
                                <h3 class="text-3xl font-bold mt-2" id="reportPendingRequests">0</h3>
                            </div>
                            <i class="fas fa-clock text-4xl opacity-50"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm opacity-90">إجمالي المبلغ</p>
                                <h3 class="text-2xl font-bold mt-2" id="reportTotalAmount">0 ريال</h3>
                            </div>
                            <i class="fas fa-money-bill-wave text-4xl opacity-50"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Charts -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <!-- Requests by Status Chart -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">
                            <i class="fas fa-chart-pie text-indigo-600 ml-2"></i>
                            الطلبات حسب الحالة
                        </h3>
                        <canvas id="statusChart"></canvas>
                    </div>
                    
                    <!-- Requests by Bank Chart -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">
                            <i class="fas fa-chart-bar text-indigo-600 ml-2"></i>
                            الطلبات حسب البنك
                        </h3>
                        <canvas id="bankChart"></canvas>
                    </div>
                </div>
                
                <!-- Top Customers Table -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">
                        <i class="fas fa-users text-indigo-600 ml-2"></i>
                        أكثر العملاء نشاطاً
                    </h3>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">العميل</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">عدد الطلبات</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">إجمالي المبلغ</th>
                                    <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">آخر طلب</th>
                                </tr>
                            </thead>
                            <tbody id="topCustomersTable">
                                <tr>
                                    <td colspan="4" class="text-center py-8 text-gray-500">لا توجد بيانات</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modals Section -->
        
        <!-- Add Customer Modal -->
        <div id="addCustomerModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" style="display: none;">
            <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h2 class="text-2xl font-bold mb-4 text-gray-800">
                    <i class="fas fa-user-plus text-blue-600 ml-2"></i>
                    إضافة عميل جديد
                </h2>
                <form id="addCustomerForm">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل *</label>
                            <input type="text" name="full_name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">رقم الجوال *</label>
                            <input type="tel" name="phone" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                            <input type="email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">رقم الهوية</label>
                            <input type="text" name="national_id" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">تاريخ الميلاد</label>
                            <input type="date" name="date_of_birth" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">جهة العمل</label>
                            <input type="text" name="employer_name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">المسمى الوظيفي</label>
                            <input type="text" name="job_title" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">تاريخ بداية العمل</label>
                            <input type="date" name="work_start_date" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                            <input type="text" name="city" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الراتب الشهري</label>
                            <input type="number" name="monthly_salary" step="0.01" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-save ml-2"></i>
                            حفظ
                        </button>
                        <button type="button" onclick="closeModal('addCustomerModal')" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-times ml-2"></i>
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Add Bank Modal -->
        <div id="addBankModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" style="display: none;">
            <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                <h2 class="text-2xl font-bold mb-4 text-gray-800">
                    <i class="fas fa-university text-blue-600 ml-2"></i>
                    إضافة بنك جديد
                </h2>
                <form id="addBankForm">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">اسم البنك *</label>
                            <input type="text" name="bank_name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">كود البنك *</label>
                            <input type="text" name="bank_code" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">رابط الشعار</label>
                            <input type="url" name="logo_url" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-save ml-2"></i>
                            حفظ
                        </button>
                        <button type="button" onclick="closeModal('addBankModal')" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-times ml-2"></i>
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Add Rate Modal -->
        <div id="addRateModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" style="display: none;">
            <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h2 class="text-2xl font-bold mb-4 text-gray-800">
                    <i class="fas fa-percent text-green-600 ml-2"></i>
                    إضافة نسبة تمويل جديدة
                </h2>
                <form id="addRateForm">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">البنك *</label>
                            <select name="bank_id" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" id="rateBankSelect">
                                <option value="">اختر البنك</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">نوع التمويل *</label>
                            <select name="financing_type_id" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" id="rateFinancingTypeSelect">
                                <option value="">اختر نوع التمويل</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">النسبة % *</label>
                            <input type="number" name="rate" step="0.01" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للمبلغ *</label>
                            <input type="number" name="min_amount" step="0.01" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الحد الأعلى للمبلغ *</label>
                            <input type="number" name="max_amount" step="0.01" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للراتب *</label>
                            <input type="number" name="min_salary" step="0.01" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الحد الأعلى للراتب *</label>
                            <input type="number" name="max_salary" step="0.01" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للمدة (شهر) *</label>
                            <input type="number" name="min_duration" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الحد الأعلى للمدة (شهر) *</label>
                            <input type="number" name="max_duration" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        </div>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-save ml-2"></i>
                            حفظ
                        </button>
                        <button type="button" onclick="closeModal('addRateModal')" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-times ml-2"></i>
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Add Subscription Modal -->
        <div id="addSubscriptionModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" style="display: none;">
            <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                <h2 class="text-2xl font-bold mb-4 text-gray-800">
                    <i class="fas fa-crown text-yellow-600 ml-2"></i>
                    إضافة اشتراك جديد
                </h2>
                <form id="addSubscriptionForm">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">اسم الشركة *</label>
                            <input type="text" name="company_name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الباقة *</label>
                            <select name="package_id" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500" id="subscriptionPackageSelect">
                                <option value="">اختر الباقة</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">تاريخ البداية *</label>
                            <input type="date" name="start_date" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">تاريخ الانتهاء *</label>
                            <input type="date" name="end_date" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">
                        </div>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="submit" class="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-save ml-2"></i>
                            حفظ
                        </button>
                        <button type="button" onclick="closeModal('addSubscriptionModal')" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-times ml-2"></i>
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- View Request Modal -->
        <div id="viewRequestModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" style="display: none;">
            <div class="bg-white rounded-xl p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h2 class="text-2xl font-bold mb-4 text-gray-800">
                    <i class="fas fa-file-invoice text-blue-600 ml-2"></i>
                    تفاصيل طلب التمويل
                </h2>
                <div id="requestDetails" class="space-y-4">
                    <!-- Will be filled dynamically -->
                </div>
                <div class="flex gap-3 mt-6">
                    <button type="button" onclick="closeModal('viewRequestModal')" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold">
                        <i class="fas fa-times ml-2"></i>
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Update Status Modal -->
        <div id="updateStatusModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" style="display: none;">
            <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                <h2 class="text-2xl font-bold mb-4 text-gray-800">
                    <i class="fas fa-edit text-green-600 ml-2"></i>
                    تحديث حالة الطلب
                </h2>
                <form id="updateStatusForm">
                    <input type="hidden" id="requestId" name="requestId">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الحالة الجديدة *</label>
                            <select name="status" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                                <option value="pending">قيد الانتظار</option>
                                <option value="approved">مقبول</option>
                                <option value="rejected">مرفوض</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">ملاحظات</label>
                            <textarea name="notes" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="أضف ملاحظات حول تحديث الحالة..."></textarea>
                        </div>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-save ml-2"></i>
                            حفظ التحديث
                        </button>
                        <button type="button" onclick="closeModal('updateStatusModal')" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-times ml-2"></i>
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Add Package Modal -->
        <div id="addPackageModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" style="display: none;">
            <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
                <h2 class="text-2xl font-bold mb-4 text-gray-800">
                    <i class="fas fa-box text-orange-600 ml-2"></i>
                    إضافة باقة جديدة
                </h2>
                <form id="addPackageForm">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">اسم الباقة *</label>
                            <input type="text" name="package_name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">السعر (ريال) *</label>
                            <input type="number" name="price" step="0.01" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">المدة (أشهر) *</label>
                            <input type="number" name="duration_months" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">عدد الحسابات</label>
                            <input type="number" name="max_calculations" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">عدد المستخدمين</label>
                            <input type="number" name="max_users" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                            <textarea name="description" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"></textarea>
                        </div>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="submit" class="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-save ml-2"></i>
                            حفظ
                        </button>
                        <button type="button" onclick="closeModal('addPackageModal')" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-times ml-2"></i>
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Edit User Modal -->
        <div id="editUserModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" style="display: none;">
            <div class="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
                <h2 class="text-2xl font-bold mb-4 text-gray-800">
                    <i class="fas fa-user-edit text-purple-600 ml-2"></i>
                    تعديل مستخدم
                </h2>
                <form id="editUserForm">
                    <input type="hidden" name="userId" id="editUserId">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل *</label>
                            <input type="text" name="full_name" id="editUserFullName" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني *</label>
                            <input type="email" name="email" id="editUserEmail" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">رقم الجوال</label>
                            <input type="text" name="phone" id="editUserPhone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الدور *</label>
                            <select name="role_id" id="editUserRole" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                <option value="1">مدير النظام</option>
                                <option value="2">شركة مشتركة</option>
                                <option value="3">مستخدم عادي</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">الحالة *</label>
                            <select name="is_active" id="editUserActive" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                <option value="1">نشط</option>
                                <option value="0">غير نشط</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="submit" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-save ml-2"></i>
                            حفظ التعديلات
                        </button>
                        <button type="button" onclick="closeModal('editUserModal')" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold">
                            <i class="fas fa-times ml-2"></i>
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Manage User Permissions Modal -->
        <div id="managePermissionsModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" style="display: none;">
            <div class="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <h2 class="text-2xl font-bold mb-4 text-gray-800">
                    <i class="fas fa-shield-alt text-purple-600 ml-2"></i>
                    إدارة صلاحيات المستخدم: <span id="permissionsUserName"></span>
                </h2>
                <input type="hidden" id="permissionsRoleId">
                
                <div class="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p class="text-sm text-blue-800">
                        <i class="fas fa-info-circle ml-1"></i>
                        الصلاحيات تُحدد حسب الدور. تغيير الدور سيؤثر على جميع المستخدمين بنفس الدور.
                    </p>
                </div>

                <div id="permissionsContent" class="space-y-4">
                    <!-- يتم ملؤها ديناميكياً -->
                </div>

                <div class="flex gap-3 mt-6">
                    <button type="button" onclick="savePermissions()" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-bold">
                        <i class="fas fa-save ml-2"></i>
                        حفظ الصلاحيات
                    </button>
                    <button type="button" onclick="closeModal('managePermissionsModal')" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-bold">
                        <i class="fas fa-times ml-2"></i>
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
        
    </div>

    <script>
        // دالة بسيطة للانتقال بين الأقسام
        window.goToSection = function(sectionName) {
            console.log('🚀 الانتقال إلى:', sectionName);
            
            // إخفاء جميع الأقسام
            const allSections = document.querySelectorAll('.content-section');
            allSections.forEach(function(section) {
                section.classList.remove('active');
            });
            
            // إظهار القسم المطلوب
            const targetSection = document.getElementById(sectionName + '-section');
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('✅ تم تفعيل القسم:', sectionName);
                
                // تحميل البيانات
                window.loadSectionData(sectionName);
            } else {
                console.error('❌ القسم غير موجود:', sectionName);
            }
        }
        
        // دالة تسجيل الخروج - تعريف مباشر
        function doLogout() {
            console.log('🚪 محاولة تسجيل الخروج...');
            if (confirm('هل تريد تسجيل الخروج؟')) {
                console.log('✅ تأكيد تسجيل الخروج');
                // حذف جميع البيانات من localStorage
                localStorage.clear(); // حذف كل شيء
                console.log('✅ تم حذف جميع البيانات من localStorage');
                // التوجه إلى صفحة تسجيل الدخول
                window.location.href = '/login';
            } else {
                console.log('❌ تم إلغاء تسجيل الخروج');
            }
        }
        
        // جعل الدالة متاحة عالمياً
        window.doLogout = doLogout;
        
        // تحميل بيانات المستخدم من localStorage
        function loadUserData() {
            console.log('═══════════════════════════════════════');
            console.log('🔄 بدء تحميل بيانات المستخدم...');
            console.log('═══════════════════════════════════════');
            
            try {
                // Try both 'userData' and 'user' keys for compatibility
                let userStr = localStorage.getItem('userData') || localStorage.getItem('user');
                
                console.log('📦 محتويات localStorage:');
                console.log('  - userData:', localStorage.getItem('userData') ? 'موجود ✅' : 'غير موجود ❌');
                console.log('  - user:', localStorage.getItem('user') ? 'موجود ✅' : 'غير موجود ❌');
                console.log('  - authToken:', localStorage.getItem('authToken') ? 'موجود ✅' : 'غير موجود ❌');
                
                if (userStr) {
                    const user = JSON.parse(userStr);
                    console.log('👤 بيانات المستخدم المحملة:');
                    console.log('  - username:', user.username);
                    console.log('  - full_name:', user.full_name);
                    console.log('  - role:', user.role);
                    console.log('  - tenant_id:', user.tenant_id);
                    console.log('  - tenant_name:', user.tenant_name);
                    console.log('  - tenant_slug:', user.tenant_slug);
                    
                    // تحديث اسم المستخدم
                    const displayNameEl = document.getElementById('userDisplayName');
                    const emailEl = document.getElementById('userEmail');
                    
                    console.log('🎯 عناصر DOM:');
                    console.log('  - displayNameEl:', displayNameEl ? 'موجود ✅' : 'غير موجود ❌');
                    console.log('  - emailEl:', emailEl ? 'موجود ✅' : 'غير موجود ❌');
                    
                    if (displayNameEl) {
                        let displayName = user.full_name || user.username || 'مستخدم';
                        
                        console.log('🔍 تحديد اسم العرض:');
                        console.log('  - الاسم الأساسي:', displayName);
                        
                        // إضافة اسم الشركة إن وجد (له الأولوية)
                        if (user.tenant_name) {
                            displayName = 'مدير ' + user.tenant_name;
                            console.log('  - tenant_name موجود:', user.tenant_name);
                            console.log('  - اسم العرض النهائي:', displayName);
                        } 
                        // إضافة الدور إذا لم يكن هناك شركة
                        else if (user.role === 'admin') {
                            displayName += ' (مدير النظام)';
                            console.log('  - الدور: admin');
                            console.log('  - اسم العرض النهائي:', displayName);
                        } else if (user.role === 'company') {
                            displayName += ' (مدير الشركة)';
                            console.log('  - الدور: company');
                            console.log('  - اسم العرض النهائي:', displayName);
                        } else if (user.role === 'user') {
                            displayName += ' (مستخدم)';
                            console.log('  - الدور: user');
                            console.log('  - اسم العرض النهائي:', displayName);
                        }
                        
                        displayNameEl.textContent = displayName;
                        console.log('✅ تم تحديث DOM - الاسم:', displayName);
                    } else {
                        console.error('❌ عنصر userDisplayName غير موجود في DOM!');
                    }
                    
                    if (emailEl && user.email) {
                        emailEl.textContent = user.email;
                        console.log('✅ تم تحديث DOM - البريد:', user.email);
                    }
                    
                    console.log('═══════════════════════════════════════');
                    console.log('✅ اكتمل تحميل بيانات المستخدم بنجاح');
                    console.log('═══════════════════════════════════════');
                } else {
                    console.warn('═══════════════════════════════════════');
                    console.warn('⚠️ لم يتم العثور على بيانات المستخدم في localStorage');
                    console.warn('═══════════════════════════════════════');
                }
            } catch (error) {
                console.error('═══════════════════════════════════════');
                console.error('❌ خطأ في تحميل بيانات المستخدم:', error);
                console.error('═══════════════════════════════════════');
            }
        }
        
        // تحميل البيانات عند تحميل الصفحة وعند DOMContentLoaded
        loadUserData();
        document.addEventListener('DOMContentLoaded', loadUserData);
        
        // دالة تطبيق الصلاحيات حسب دور المستخدم
        function applyUserPermissions() {
            console.log('🔐 بدء تطبيق الصلاحيات...');
            
            try {
                // قراءة بيانات المستخدم من localStorage
                let userStr = localStorage.getItem('userData') || localStorage.getItem('user');
                
                if (!userStr) {
                    console.warn('⚠️ لا توجد بيانات مستخدم - عرض جميع الصلاحيات افتراضياً');
                    return;
                }
                
                const user = JSON.parse(userStr);
                // For superadmin, use user_type; for others use role
                const userRole = user.user_type === 'superadmin' ? 'superadmin' : (user.role || user.user_type);
                
                console.log('👤 دور المستخدم:', userRole);
                console.log('📋 user_type:', user.user_type);
                console.log('📋 role:', user.role);
                
                // Show superadmin-only stats only for superadmin
                const superadminStats = document.querySelector('.superadmin-only-stats');
                if (superadminStats) {
                    if (user.user_type === 'superadmin') {
                        console.log('✅ إظهار إحصائيات السوبر أدمن');
                        superadminStats.style.display = 'grid';
                    } else {
                        console.log('❌ إخفاء إحصائيات السوبر أدمن');
                        superadminStats.style.display = 'none';
                    }
                }
                
                // تعريف الروابط المسموحة لكل دور
                const allowedLinks = {
                    'superadmin': [
                        '/admin/dashboard',
                        '/admin/customers', 
                        '/admin/requests',
                        '/admin/banks',
                        '/admin/rates',
                        '/admin/subscriptions',
                        '/admin/packages',
                        '/admin/users',
                        '/admin/notifications',
                        '/calculator',
                        '/',
                        '/admin/tenants',
                        '/admin/tenant-calculators',
                        '/admin/saas-settings',
                        '/admin/reports',
                        '/admin/payments'
                    ],
                    'admin': [
                        '/admin/dashboard',
                        '/admin/customers',
                        '/admin/requests',
                        '/admin/banks',
                        '/admin/rates',
                        '/admin/subscriptions',
                        '/admin/packages',
                        '/admin/users',
                        '/admin/notifications',
                        '/calculator',
                        '/',
                        '/admin/tenants',
                        '/admin/reports',
                        '/admin/payments'
                    ],
                    'manager': [
                        '/admin/dashboard',
                        '/admin/customers',
                        '/admin/requests',
                        '/admin/banks',
                        '/admin/rates',
                        '/admin/users',
                        '/admin/reports',
                        '/admin/payments',
                        '/calculator',
                        '/'
                    ],
                    'employee': [
                        '/admin/customers',
                        '/admin/requests',
                        '/calculator'
                    ],
                    'company': [
                        '/admin/dashboard',
                        '/admin/customers',
                        '/admin/requests',
                        '/admin/users',
                        '/admin/reports',
                        '/calculator',
                        '/'
                    ],
                    'user': [
                        '/admin/customers',
                        '/admin/requests',
                        '/calculator'
                    ]
                };
                
                // الحصول على الروابط المتاحة للمستخدم
                const userAllowedLinks = allowedLinks[userRole] || allowedLinks['user'];
                
                console.log('✅ الروابط المتاحة:', userAllowedLinks);
                
                // إخفاء الأزرار غير المسموح بها
                const allButtons = document.querySelectorAll('.quick-access-btn');
                let hiddenCount = 0;
                let visibleCount = 0;
                
                allButtons.forEach(button => {
                    const href = button.getAttribute('href');
                    
                    // فحص الصلاحية
                    if (!userAllowedLinks.includes(href)) {
                        button.style.display = 'none';
                        hiddenCount++;
                        console.log('🚫 إخفاء زر:', href);
                    } else {
                        button.style.display = 'block';
                        visibleCount++;
                        console.log('✅ عرض زر:', href);
                    }
                });
                
                console.log(\`✅ تم تطبيق الصلاحيات: \${visibleCount} أزرار ظاهرة، \${hiddenCount} أزرار مخفية\`);
                
                // إخفاء الكروت الإضافية للموظفين
                const adminOnlyStats = document.querySelector('.admin-only-stats');
                if (adminOnlyStats) {
                    if (userRole === 'employee') {
                        adminOnlyStats.style.display = 'none';
                        console.log('🚫 إخفاء الكروت الإضافية للموظف');
                    } else {
                        adminOnlyStats.style.display = 'grid';
                        console.log('✅ عرض الكروت الإضافية');
                    }
                }
                
                // إخفاء قسم رابط الحاسبة للموظفين والمستخدمين العاديين
                const calculatorLinkSection = document.getElementById('calculatorLinkSection');
                const employeeCalculatorSection = document.getElementById('employeeCalculatorSection');
                
                if (calculatorLinkSection) {
                    if (userRole === 'user' || userRole === 'employee') {
                        calculatorLinkSection.style.display = 'none';
                        console.log('🚫 إخفاء قسم رابط الحاسبة (موظف أو مستخدم عادي)');
                        
                        // عرض قسم الباركود للموظفين فقط
                        if (userRole === 'employee' && employeeCalculatorSection) {
                            employeeCalculatorSection.style.display = 'block';
                            console.log('✅ عرض قسم الباركود للموظف');
                            
                            // تحميل رابط الحاسبة للموظف
                            setTimeout(() => {
                                if (typeof loadEmployeeCalculatorLink === 'function') {
                                    loadEmployeeCalculatorLink();
                                }
                            }, 500);
                        }
                    } else {
                        // عرض القسم لـ superadmin، admin، manager، company
                        calculatorLinkSection.style.display = 'block';
                        console.log('✅ عرض قسم رابط الحاسبة لـ:', userRole);
                        
                        // إخفاء قسم الموظف
                        if (employeeCalculatorSection) {
                            employeeCalculatorSection.style.display = 'none';
                        }
                        
                        // تحميل رابط الحاسبة و QR Code
                        setTimeout(() => {
                            if (typeof loadCalculatorLink === 'function') {
                                loadCalculatorLink();
                            }
                        }, 500);
                    }
                } else {
                    console.warn('⚠️ لم يتم العثور على calculatorLinkSection');
                }
                
            } catch (error) {
                console.error('❌ خطأ في تطبيق الصلاحيات:', error);
            }
        }
        
        // تطبيق الصلاحيات عند تحميل الصفحة
        applyUserPermissions();
        document.addEventListener('DOMContentLoaded', applyUserPermissions);
        
        // دالة تحديث رابط الحاسبة حسب الشركة
        function updateCalculatorLink() {
            console.log('🔗 تحديث رابط الحاسبة...');
            
            try {
                // قراءة بيانات المستخدم من localStorage
                let userStr = localStorage.getItem('userData') || localStorage.getItem('user');
                
                if (!userStr) {
                    console.warn('⚠️ لا توجد بيانات مستخدم');
                    return;
                }
                
                const user = JSON.parse(userStr);
                const calculatorLink = document.getElementById('calculatorLink');
                
                if (!calculatorLink) {
                    console.warn('⚠️ زر الحاسبة غير موجود');
                    return;
                }
                
                // إذا كان المستخدم لديه tenant_slug، استخدم حاسبة الشركة
                if (user.tenant_slug) {
                    calculatorLink.href = \`/c/\${user.tenant_slug}/calculator\`;
                    console.log(\`✅ تم تحديث رابط الحاسبة إلى: /c/\${user.tenant_slug}/calculator\`);
                } else {
                    // SuperAdmin أو مستخدم بدون شركة: استخدم الحاسبة العامة
                    calculatorLink.href = '/calculator';
                    console.log('✅ تم تحديث رابط الحاسبة إلى: /calculator (حاسبة عامة)');
                }
                
            } catch (error) {
                console.error('❌ خطأ في تحديث رابط الحاسبة:', error);
            }
        }
        
        // تحديث رابط الحاسبة عند تحميل الصفحة
        updateCalculatorLink();
        document.addEventListener('DOMContentLoaded', updateCalculatorLink);
        
        // دالة تحميل بيانات الأقسام - window function
        window.loadSectionData = async function(section) {
            console.log('📥 تحميل بيانات القسم:', section);
            switch(section) {
                case 'dashboard':
                    await loadDashboardStats();
                    break;
                case 'customers':
                    await loadCustomers();
                    break;
                case 'financing-requests':
                    await loadFinancingRequests();
                    break;
                case 'banks':
                    await loadBanks();
                    break;
                case 'rates':
                    await loadRates();
                    break;
                case 'subscriptions':
                    await loadSubscriptions();
                    break;
                case 'users':
                    await loadUsers();
                    break;
                case 'packages':
                    await loadPackages();
                    break;
                case 'subscription-requests':
                    await loadSubscriptionRequests();
                    break;
            }
        }
        
        // Load Dashboard Stats
        async function loadDashboardStats() {
            try {
                const response = await axios.get('/api/dashboard/stats');
                if (response.data.success) {
                    const stats = response.data.data;
                    document.getElementById('stat-customers').textContent = stats.total_customers;
                    document.getElementById('stat-requests').textContent = stats.total_requests;
                    document.getElementById('stat-pending').textContent = stats.pending_requests;
                    document.getElementById('stat-approved').textContent = stats.approved_requests;
                    document.getElementById('stat-banks').textContent = stats.active_banks;
                    document.getElementById('stat-tenants').textContent = stats.active_tenants || 0;
                    document.getElementById('stat-subscriptions').textContent = stats.active_subscriptions;
                    document.getElementById('stat-users').textContent = stats.active_users;
                    document.getElementById('stat-calculations').textContent = stats.total_calculations;
                }
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }
        
        // Load Customers
        async function loadCustomers() {
            try {
                const response = await axios.get('/api/customers');
                if (response.data.success) {
                    const customers = response.data.data;
                    const tbody = document.getElementById('customersTable');
                    
                    if (customers.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-gray-500">لا توجد بيانات</td></tr>';
                        return;
                    }
                    
                    tbody.innerHTML = customers.map((customer, index) => \`
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-4 py-3">\${index + 1}</td>
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-2">
                                    <span class="font-medium">\${customer.full_name}</span>
                                    <button onclick="viewCustomerFinancingDetails(\${customer.id})" 
                                            class="text-indigo-600 hover:text-indigo-800 transition-colors" 
                                            title="عرض التفاصيل التمويلية الكاملة">
                                        <i class="fas fa-info-circle text-lg"></i>
                                    </button>
                                </div>
                            </td>
                            <td class="px-4 py-3">\${customer.phone}</td>
                            <td class="px-4 py-3 text-sm">\${customer.birthdate || '-'}</td>
                            <td class="px-4 py-3 font-medium text-green-600">\${customer.monthly_salary ? customer.monthly_salary.toLocaleString('ar-SA') + ' ريال' : '-'}</td>
                            <td class="px-4 py-3 font-medium text-purple-600">\${customer.financing_amount ? customer.financing_amount.toLocaleString('ar-SA') + ' ريال' : '-'}</td>
                            <td class="px-4 py-3 text-sm text-orange-600">\${customer.monthly_obligations ? customer.monthly_obligations.toLocaleString('ar-SA') + ' ريال' : '-'}</td>
                            <td class="px-4 py-3 text-sm">\${customer.financing_type_name || '-'}</td>
                            <td class="px-4 py-3">
                                <button onclick="viewCustomer(\${customer.id})" class="text-blue-600 hover:text-blue-800 ml-2" title="عرض الملف الكامل">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button onclick="editCustomer(\${customer.id})" class="text-green-600 hover:text-green-800 ml-2" title="تعديل">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="deleteCustomer(\${customer.id})" class="text-red-600 hover:text-red-800" title="حذف">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    \`).join('');
                }
            } catch (error) {
                console.error('Error loading customers:', error);
            }
        }
        
        // Load Financing Requests
        async function loadFinancingRequests() {
            try {
                const response = await axios.get('/api/financing-requests');
                if (response.data.success) {
                    const requests = response.data.data;
                    const tbody = document.getElementById('requestsTable');
                    
                    if (requests.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="9" class="text-center py-8 text-gray-500">لا توجد طلبات</td></tr>';
                        return;
                    }
                    
                    tbody.innerHTML = requests.map((req, index) => {
                        const statusColors = {
                            'pending': 'bg-yellow-100 text-yellow-800',
                            'approved': 'bg-green-100 text-green-800',
                            'rejected': 'bg-red-100 text-red-800'
                        };
                        const statusText = {
                            'pending': 'قيد الانتظار',
                            'approved': 'مقبول',
                            'rejected': 'مرفوض'
                        };
                        
                        return \`
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-4 py-3">\${index + 1}</td>
                                <td class="px-4 py-3 font-medium">\${req.customer_name}</td>
                                <td class="px-4 py-3">\${req.customer_phone}</td>
                                <td class="px-4 py-3 text-sm">\${req.financing_type_name || '-'}</td>
                                <td class="px-4 py-3 font-medium">\${req.requested_amount.toLocaleString('ar-SA')}</td>
                                <td class="px-4 py-3">\${req.duration_months} شهر</td>
                                <td class="px-4 py-3 text-sm">\${req.selected_bank_name || '-'}</td>
                                <td class="px-4 py-3">
                                    <span class="\${statusColors[req.status]} px-2 py-1 rounded text-xs">\${statusText[req.status]}</span>
                                </td>
                                <td class="px-4 py-3">
                                    <button onclick="viewRequest(\${req.id})" class="text-blue-600 hover:text-blue-800 ml-2" title="عرض">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="updateStatus(\${req.id})" class="text-green-600 hover:text-green-800 ml-2" title="تعديل الحالة">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteRequest(\${req.id})" class="text-red-600 hover:text-red-800" title="حذف">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        \`;
                    }).join('');
                }
            } catch (error) {
                console.error('Error loading requests:', error);
            }
        }
        
        // Utility functions
        window.toggleDarkMode = function() {
            alert('وضع الليل - قيد التطوير');
        }
        
        window.logout = function() {
            if (confirm('هل تريد تسجيل الخروج؟')) {
                window.location.href = '/';
            }
        }
        
        window.exportExcel = function(type) {
            alert('تصدير Excel - قيد التطوير');
        }
        
        function showAddCustomerModal() {
            alert('إضافة عميل - قيد التطوير');
        }
        
        window.addCustomer = function() {
            openModal('addCustomerModal');
        }
        
        window.viewCustomer = async function(id) {
            try {
                const response = await axios.get('/api/customers');
                if (response.data.success) {
                    const customer = response.data.data.find(c => c.id === id);
                    if (!customer) {
                        alert('❌ لم يتم العثور على العميل');
                        return;
                    }
                    
                    // Create modal content
                    const modalContent = \`
                        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onclick="this.remove()">
                            <div class="bg-white rounded-xl p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
                                <div class="flex items-center justify-between mb-6">
                                    <h2 class="text-3xl font-bold text-gray-800">
                                        <i class="fas fa-user-circle text-blue-600 ml-2"></i>
                                        بيانات العميل
                                    </h2>
                                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                                        <i class="fas fa-times text-2xl"></i>
                                    </button>
                                </div>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <!-- Personal Information -->
                                    <div class="col-span-2">
                                        <h3 class="text-xl font-bold text-gray-700 mb-4 border-b-2 border-blue-500 pb-2">
                                            <i class="fas fa-id-card text-blue-600 ml-2"></i>
                                            المعلومات الشخصية
                                        </h3>
                                    </div>
                                    
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <p class="text-sm text-gray-600 mb-1">الاسم الكامل</p>
                                        <p class="text-lg font-bold text-gray-800">\${customer.full_name || '-'}</p>
                                    </div>
                                    
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <p class="text-sm text-gray-600 mb-1">رقم الجوال</p>
                                        <p class="text-lg font-bold text-gray-800">\${customer.phone || '-'}</p>
                                    </div>
                                    
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <p class="text-sm text-gray-600 mb-1">البريد الإلكتروني</p>
                                        <p class="text-lg font-bold text-gray-800">\${customer.email || '-'}</p>
                                    </div>
                                    
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <p class="text-sm text-gray-600 mb-1">رقم الهوية الوطني</p>
                                        <p class="text-lg font-bold text-gray-800">\${customer.national_id && !customer.national_id.startsWith('TEMP-') ? customer.national_id : 'غير متوفر'}</p>
                                    </div>
                                    
                                    <div class="bg-blue-50 p-4 rounded-lg">
                                        <p class="text-sm text-blue-600 mb-1">📅 تاريخ الميلاد</p>
                                        <p class="text-lg font-bold text-blue-800">\${customer.birthdate || 'غير متوفر'}</p>
                                    </div>
                                    
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <p class="text-sm text-gray-600 mb-1">المدينة</p>
                                        <p class="text-lg font-bold text-gray-800">\${customer.city || 'غير متوفر'}</p>
                                    </div>
                                    
                                    <div class="bg-purple-50 p-4 rounded-lg">
                                        <p class="text-sm text-purple-600 mb-1">📝 تاريخ التسجيل</p>
                                        <p class="text-lg font-bold text-purple-800">\${customer.created_at ? new Date(customer.created_at).toLocaleDateString('ar-SA') : 'غير متوفر'}</p>
                                    </div>
                                    
                                    <!-- Employment Information -->
                                    <div class="col-span-2 mt-4">
                                        <h3 class="text-xl font-bold text-gray-700 mb-4 border-b-2 border-green-500 pb-2">
                                            <i class="fas fa-briefcase text-green-600 ml-2"></i>
                                            المعلومات الوظيفية
                                        </h3>
                                    </div>
                                    
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <p class="text-sm text-gray-600 mb-1">جهة العمل</p>
                                        <p class="text-lg font-bold text-gray-800">\${customer.employer_name || '-'}</p>
                                    </div>
                                    
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <p class="text-sm text-gray-600 mb-1">المسمى الوظيفي</p>
                                        <p class="text-lg font-bold text-gray-800">\${customer.job_title || '-'}</p>
                                    </div>
                                    
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <p class="text-sm text-gray-600 mb-1">تاريخ بداية العمل</p>
                                        <p class="text-lg font-bold text-gray-800">\${customer.work_start_date || '-'}</p>
                                    </div>
                                    
                                    <!-- Financing Information -->
                                    <div class="col-span-2 mt-4">
                                        <h3 class="text-xl font-bold text-gray-700 mb-4 border-b-2 border-purple-500 pb-2">
                                            <i class="fas fa-money-bill-wave text-purple-600 ml-2"></i>
                                            معلومات التمويل
                                        </h3>
                                    </div>
                                    
                                    <div class="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                                        <p class="text-sm text-purple-600 mb-1">💰 مبلغ التمويل المطلوب</p>
                                        <p class="text-2xl font-bold text-purple-700">\${customer.financing_amount ? customer.financing_amount.toLocaleString('ar-SA') + ' ريال' : 'غير محدد'}</p>
                                    </div>
                                    
                                    <div class="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                                        <p class="text-sm text-green-600 mb-1">💵 الراتب الشهري</p>
                                        <p class="text-2xl font-bold text-green-700">\${customer.monthly_salary ? customer.monthly_salary.toLocaleString('ar-SA') + ' ريال' : 'غير محدد'}</p>
                                    </div>
                                    
                                    <div class="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                                        <p class="text-sm text-orange-600 mb-1">📊 الالتزامات الشهرية</p>
                                        <p class="text-2xl font-bold text-orange-700">\${customer.monthly_obligations ? customer.monthly_obligations.toLocaleString('ar-SA') + ' ريال' : '0 ريال'}</p>
                                    </div>
                                    
                                    <div class="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                                        <p class="text-sm text-blue-600 mb-1">💳 الدخل المتاح</p>
                                        <p class="text-2xl font-bold text-blue-700">\${customer.monthly_salary && customer.monthly_obligations ? (customer.monthly_salary - customer.monthly_obligations).toLocaleString('ar-SA') + ' ريال' : 'غير محسوب'}</p>
                                    </div>
                                    
                                    <div class="bg-indigo-50 p-4 rounded-lg col-span-2 border-2 border-indigo-200">
                                        <p class="text-sm text-indigo-600 mb-1">🏦 نوع التمويل</p>
                                        <p class="text-xl font-bold text-indigo-800">\${customer.financing_type_name || 'غير محدد'}</p>
                                    </div>
                                    
                                    <!-- Requests Statistics -->
                                    <div class="col-span-2 mt-4">
                                        <h3 class="text-xl font-bold text-gray-700 mb-4 border-b-2 border-blue-500 pb-2">
                                            <i class="fas fa-chart-bar text-blue-600 ml-2"></i>
                                            إحصائيات الطلبات
                                        </h3>
                                    </div>
                                    
                                    <div class="bg-blue-50 p-4 rounded-lg text-center">
                                        <p class="text-sm text-blue-600 mb-1">إجمالي الطلبات</p>
                                        <p class="text-3xl font-bold text-blue-700">\${customer.total_requests || 0}</p>
                                    </div>
                                    
                                    <div class="bg-yellow-50 p-4 rounded-lg text-center">
                                        <p class="text-sm text-yellow-600 mb-1">قيد الانتظار</p>
                                        <p class="text-3xl font-bold text-yellow-700">\${customer.pending_requests || 0}</p>
                                    </div>
                                    
                                    <div class="bg-green-50 p-4 rounded-lg text-center">
                                        <p class="text-sm text-green-600 mb-1">موافق عليها</p>
                                        <p class="text-3xl font-bold text-green-700">\${customer.approved_requests || 0}</p>
                                    </div>
                                </div>
                                
                                <div class="flex justify-end gap-3 mt-6">
                                    <button onclick="editCustomer(\${customer.id})" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold">
                                        <i class="fas fa-edit ml-2"></i>
                                        تعديل
                                    </button>
                                    <button onclick="this.closest('.fixed').remove()" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-bold">
                                        <i class="fas fa-times ml-2"></i>
                                        إغلاق
                                    </button>
                                </div>
                            </div>
                        </div>
                    \`;
                    
                    // Append modal to body
                    document.body.insertAdjacentHTML('beforeend', modalContent);
                }
            } catch (error) {
                console.error('Error viewing customer:', error);
                alert('❌ حدث خطأ أثناء تحميل بيانات العميل');
            }
        }
        
        // View Customer Financing Details with Best Bank & Best Offer
        window.viewCustomerFinancingDetails = async function(id) {
            try {
                console.log('🔍 Loading financing details for customer:', id);
                
                // Get customer data
                const customersRes = await axios.get('/api/customers');
                const customer = customersRes.data.data.find(c => c.id === id);
                
                if (!customer) {
                    alert('❌ لم يتم العثور على العميل');
                    return;
                }
                
                // Get banks and rates data
                const [banksRes, ratesRes] = await Promise.all([
                    axios.get('/api/banks'),
                    axios.get('/api/financing-rates')
                ]);
                
                const banks = banksRes.data.data || [];
                const rates = ratesRes.data.data || [];
                
                // Calculate best financing options
                const salary = customer.monthly_salary || 0;
                const obligations = customer.monthly_obligations || 0;
                const requestedAmount = customer.financing_amount || 0;
                const duration = 60; // Default 60 months
                
                const availableIncome = salary - obligations;
                const maxMonthlyPayment = availableIncome * 0.33;
                
                // Calculate offers for each bank
                const offers = banks.filter(b => b.is_active).map(bank => {
                    // Find rate for this bank
                    const rate = rates.find(r => r.bank_id === bank.id && r.is_active);
                    if (!rate) return null;
                    
                    const profitRate = parseFloat(rate.profit_rate) / 100;
                    const adminFee = parseFloat(rate.admin_fee_percentage) / 100;
                    
                    // Calculate total amount with profit
                    const totalProfit = requestedAmount * profitRate * (duration / 12);
                    const totalAmount = requestedAmount + totalProfit;
                    const adminFeeAmount = requestedAmount * adminFee;
                    const finalAmount = totalAmount + adminFeeAmount;
                    const monthlyPayment = finalAmount / duration;
                    
                    return {
                        bank_id: bank.id,
                        bank_name: bank.bank_name,
                        profit_rate: rate.profit_rate,
                        admin_fee: rate.admin_fee_percentage,
                        monthly_payment: monthlyPayment,
                        total_amount: finalAmount,
                        total_profit: totalProfit + adminFeeAmount,
                        is_affordable: monthlyPayment <= maxMonthlyPayment
                    };
                }).filter(o => o !== null);
                
                // Sort by lowest monthly payment
                offers.sort((a, b) => a.monthly_payment - b.monthly_payment);
                
                const bestOffer = offers.find(o => o.is_affordable) || offers[0];
                
                // Create detailed modal
                const modalContent = \`
                    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="this.remove()">
                        <div class="bg-white rounded-xl max-w-5xl w-full max-h-[95vh] overflow-y-auto" onclick="event.stopPropagation()">
                            <!-- Header -->
                            <div class="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-t-xl">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h2 class="text-2xl font-bold mb-2">
                                            <i class="fas fa-calculator ml-2"></i>
                                            التفاصيل التمويلية الكاملة
                                        </h2>
                                        <p class="text-indigo-100">\${customer.full_name}</p>
                                    </div>
                                    <button onclick="this.closest('.fixed').remove()" class="text-white hover:text-indigo-200">
                                        <i class="fas fa-times text-2xl"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="p-6">
                                <!-- Customer Financial Info -->
                                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
                                    <h3 class="text-xl font-bold text-blue-800 mb-4">
                                        <i class="fas fa-user-circle ml-2"></i>
                                        البيانات الأساسية
                                    </h3>
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div class="bg-white rounded-lg p-4">
                                            <p class="text-sm text-gray-600 mb-1">تاريخ الميلاد</p>
                                            <p class="text-lg font-bold text-gray-800">\${customer.birthdate || '-'}</p>
                                        </div>
                                        <div class="bg-white rounded-lg p-4">
                                            <p class="text-sm text-gray-600 mb-1">رقم الجوال</p>
                                            <p class="text-lg font-bold text-gray-800">\${customer.phone}</p>
                                        </div>
                                        <div class="bg-white rounded-lg p-4">
                                            <p class="text-sm text-gray-600 mb-1">نوع التمويل</p>
                                            <p class="text-lg font-bold text-gray-800">\${customer.financing_type_name || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Financial Summary -->
                                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 text-center">
                                        <i class="fas fa-money-bill-wave text-3xl mb-2 opacity-80"></i>
                                        <p class="text-sm opacity-90 mb-1">الراتب الشهري</p>
                                        <p class="text-2xl font-bold">\${salary.toLocaleString('ar-SA')}</p>
                                        <p class="text-xs opacity-75">ريال</p>
                                    </div>
                                    <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 text-center">
                                        <i class="fas fa-hand-holding-usd text-3xl mb-2 opacity-80"></i>
                                        <p class="text-sm opacity-90 mb-1">مبلغ التمويل</p>
                                        <p class="text-2xl font-bold">\${requestedAmount.toLocaleString('ar-SA')}</p>
                                        <p class="text-xs opacity-75">ريال</p>
                                    </div>
                                    <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 text-center">
                                        <i class="fas fa-credit-card text-3xl mb-2 opacity-80"></i>
                                        <p class="text-sm opacity-90 mb-1">الالتزامات</p>
                                        <p class="text-2xl font-bold">\${obligations.toLocaleString('ar-SA')}</p>
                                        <p class="text-xs opacity-75">ريال</p>
                                    </div>
                                    <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 text-center">
                                        <i class="fas fa-wallet text-3xl mb-2 opacity-80"></i>
                                        <p class="text-sm opacity-90 mb-1">الدخل المتاح</p>
                                        <p class="text-2xl font-bold">\${availableIncome.toLocaleString('ar-SA')}</p>
                                        <p class="text-xs opacity-75">ريال</p>
                                    </div>
                                </div>
                                
                                <!-- Best Offer Section -->
                                \${bestOffer ? \`
                                <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-xl p-6 mb-6">
                                    <div class="flex items-center gap-3 mb-4">
                                        <div class="bg-yellow-500 text-white rounded-full p-3">
                                            <i class="fas fa-trophy text-2xl"></i>
                                        </div>
                                        <div>
                                            <h3 class="text-2xl font-bold text-yellow-800">أفضل عرض مقترح</h3>
                                            <p class="text-yellow-700">\${bestOffer.bank_name}</p>
                                        </div>
                                    </div>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div class="bg-white rounded-lg p-4 border-2 border-yellow-300">
                                            <p class="text-sm text-gray-600 mb-1">القسط الشهري</p>
                                            <p class="text-2xl font-bold text-yellow-700">\${bestOffer.monthly_payment.toLocaleString('ar-SA', {maximumFractionDigits: 2})}</p>
                                            <p class="text-xs text-gray-500">ريال / شهر</p>
                                        </div>
                                        <div class="bg-white rounded-lg p-4">
                                            <p class="text-sm text-gray-600 mb-1">نسبة الربح</p>
                                            <p class="text-xl font-bold text-gray-800">\${bestOffer.profit_rate}%</p>
                                            <p class="text-xs text-gray-500">سنوياً</p>
                                        </div>
                                        <div class="bg-white rounded-lg p-4">
                                            <p class="text-sm text-gray-600 mb-1">رسوم إدارية</p>
                                            <p class="text-xl font-bold text-gray-800">\${bestOffer.admin_fee}%</p>
                                            <p class="text-xs text-gray-500">من المبلغ</p>
                                        </div>
                                        <div class="bg-white rounded-lg p-4">
                                            <p class="text-sm text-gray-600 mb-1">إجمالي المبلغ</p>
                                            <p class="text-xl font-bold text-gray-800">\${bestOffer.total_amount.toLocaleString('ar-SA', {maximumFractionDigits: 0})}</p>
                                            <p class="text-xs text-gray-500">ريال</p>
                                        </div>
                                    </div>
                                    
                                    <div class="mt-4 p-4 bg-white rounded-lg">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="text-gray-700">إجمالي الربح والرسوم:</span>
                                            <span class="text-xl font-bold text-red-600">\${bestOffer.total_profit.toLocaleString('ar-SA', {maximumFractionDigits: 0})} ريال</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <span class="text-gray-700">الحالة:</span>
                                            <span class="px-3 py-1 rounded-full text-sm font-bold \${bestOffer.is_affordable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                                                \${bestOffer.is_affordable ? '✓ مناسب للعميل' : '✗ يتجاوز القدرة الشرائية'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                \` : '<div class="text-center text-gray-500 py-8">لا توجد عروض متاحة</div>'}
                                
                                <!-- All Offers Comparison -->
                                \${offers.length > 1 ? \`
                                <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <div class="bg-gray-100 px-6 py-4 border-b">
                                        <h3 class="text-xl font-bold text-gray-800">
                                            <i class="fas fa-chart-bar ml-2"></i>
                                            مقارنة جميع العروض
                                        </h3>
                                    </div>
                                    <div class="overflow-x-auto">
                                        <table class="w-full">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th class="px-4 py-3 text-right text-sm font-bold text-gray-700">البنك</th>
                                                    <th class="px-4 py-3 text-right text-sm font-bold text-gray-700">القسط الشهري</th>
                                                    <th class="px-4 py-3 text-right text-sm font-bold text-gray-700">نسبة الربح</th>
                                                    <th class="px-4 py-3 text-right text-sm font-bold text-gray-700">الرسوم</th>
                                                    <th class="px-4 py-3 text-right text-sm font-bold text-gray-700">الإجمالي</th>
                                                    <th class="px-4 py-3 text-center text-sm font-bold text-gray-700">الحالة</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                \${offers.map((offer, idx) => \`
                                                    <tr class="border-t hover:bg-gray-50 \${offer.bank_id === bestOffer?.bank_id ? 'bg-yellow-50' : ''}">
                                                        <td class="px-4 py-3 font-medium \${offer.bank_id === bestOffer?.bank_id ? 'text-yellow-700' : ''}">
                                                            \${offer.bank_id === bestOffer?.bank_id ? '🏆 ' : ''}\${offer.bank_name}
                                                        </td>
                                                        <td class="px-4 py-3 font-bold">\${offer.monthly_payment.toLocaleString('ar-SA', {maximumFractionDigits: 2})} ريال</td>
                                                        <td class="px-4 py-3">\${offer.profit_rate}%</td>
                                                        <td class="px-4 py-3">\${offer.admin_fee}%</td>
                                                        <td class="px-4 py-3 font-medium">\${offer.total_amount.toLocaleString('ar-SA', {maximumFractionDigits: 0})} ريال</td>
                                                        <td class="px-4 py-3 text-center">
                                                            <span class="px-2 py-1 rounded-full text-xs font-bold \${offer.is_affordable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                                                                \${offer.is_affordable ? '✓ مناسب' : '✗ غير مناسب'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                \`).join('')}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                \` : ''}
                                
                                <!-- Action Buttons -->
                                <div class="flex justify-end gap-3 mt-6">
                                    <button onclick="window.print()" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-bold">
                                        <i class="fas fa-print ml-2"></i>
                                        طباعة
                                    </button>
                                    <button onclick="this.closest('.fixed').remove()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold">
                                        <i class="fas fa-times ml-2"></i>
                                        إغلاق
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                \`;
                
                document.body.insertAdjacentHTML('beforeend', modalContent);
                
            } catch (error) {
                console.error('Error loading financing details:', error);
                alert('❌ حدث خطأ أثناء تحميل التفاصيل التمويلية');
            }
        }
        
        window.editCustomer = function(id) {
            alert('تعديل العميل رقم: ' + id);
        }
        
        window.deleteCustomer = async function(id) {
            if (!confirm('هل أنت متأكد من حذف هذا العميل؟\\n\\nسيتم حذف جميع الطلبات المرتبطة به.')) {
                return;
            }
            
            try {
                const response = await axios.delete(\`/api/customers/\${id}\`);
                if (response.data.success) {
                    alert('✅ ' + response.data.message);
                    loadCustomers();
                } else {
                    alert('❌ خطأ: ' + response.data.error);
                }
            } catch (error) {
                console.error('Error deleting customer:', error);
                alert('❌ حدث خطأ أثناء الحذف');
            }
        }
        
        window.viewRequest = async function(id) {
            try {
                const response = await axios.get('/api/financing-requests');
                if (response.data.success) {
                    const request = response.data.data.find(r => r.id === id);
                    if (request) {
                        const statusColors = {
                            'pending': 'bg-yellow-100 text-yellow-800',
                            'approved': 'bg-green-100 text-green-800',
                            'rejected': 'bg-red-100 text-red-800'
                        };
                        const statusText = {
                            'pending': 'قيد الانتظار',
                            'approved': 'مقبول',
                            'rejected': 'مرفوض'
                        };
                        
                        const detailsHtml = \`
                            <div class="bg-gray-50 rounded-lg p-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p class="text-sm text-gray-600">رقم الطلب</p>
                                        <p class="font-bold text-lg">#\${request.id}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">الحالة</p>
                                        <span class="\${statusColors[request.status]} px-3 py-1 rounded text-sm font-bold inline-block mt-1">
                                            \${statusText[request.status]}
                                        </span>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">اسم العميل</p>
                                        <p class="font-medium">\${request.customer_name}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">رقم الجوال</p>
                                        <p class="font-medium">\${request.customer_phone}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">رقم الهوية</p>
                                        <p class="font-medium">\${request.national_id || '-'}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">جهة العمل</p>
                                        <p class="font-medium">\${request.employer_name || '-'}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">المسمى الوظيفي</p>
                                        <p class="font-medium">\${request.job_title || '-'}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">البنك المختار</p>
                                        <p class="font-medium">\${request.selected_bank_name || '-'}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">نوع التمويل</p>
                                        <p class="font-medium">\${request.financing_type_name || '-'}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">المبلغ المطلوب</p>
                                        <p class="font-bold text-green-600 text-lg">\${Number(request.requested_amount).toLocaleString('ar-SA')} ريال</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">مدة التمويل</p>
                                        <p class="font-medium">\${request.duration_months} شهر</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">الراتب عند الطلب</p>
                                        <p class="font-medium">\${Number(request.salary_at_request).toLocaleString('ar-SA')} ريال</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">الالتزامات الشهرية</p>
                                        <p class="font-medium">\${Number(request.monthly_obligations || 0).toLocaleString('ar-SA')} ريال</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">القسط الشهري</p>
                                        <p class="font-medium">\${Number(request.monthly_payment || 0).toLocaleString('ar-SA')} ريال</p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">تاريخ الطلب</p>
                                        <p class="font-medium">\${new Date(request.created_at).toLocaleDateString('ar-SA')}</p>
                                    </div>
                                </div>
                                \${request.notes ? \`
                                    <div class="mt-4 pt-4 border-t">
                                        <p class="text-sm text-gray-600 mb-2">ملاحظات</p>
                                        <p class="text-gray-800">\${request.notes}</p>
                                    </div>
                                \` : ''}
                                
                                <!-- Attachments Section -->
                                <div class="mt-4 pt-4 border-t">
                                    <p class="text-sm text-gray-700 font-semibold mb-3">
                                        <i class="fas fa-paperclip ml-1"></i>
                                        المرفقات
                                    </p>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        \${(request.id_attachment_url && request.id_attachment_url !== 'null') ? \`
                                            <a href="\${request.id_attachment_url}" target="_blank" 
                                               class="flex items-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                                                <i class="fas fa-id-card text-blue-600"></i>
                                                <span class="text-sm text-blue-800 font-medium">صورة الهوية</span>
                                                <i class="fas fa-download text-blue-600 mr-auto"></i>
                                            </a>
                                        \` : '<div class="p-3 bg-gray-100 rounded-lg border border-gray-200 text-sm text-gray-500">صورة الهوية: غير مرفقة</div>'}
                                        
                                        \${(request.bank_statement_attachment_url && request.bank_statement_attachment_url !== 'null') ? \`
                                            <a href="\${request.bank_statement_attachment_url}" target="_blank"
                                               class="flex items-center gap-2 p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                                                <i class="fas fa-university text-green-600"></i>
                                                <span class="text-sm text-green-800 font-medium">كشف الحساب البنكي</span>
                                                <i class="fas fa-download text-green-600 mr-auto"></i>
                                            </a>
                                        \` : '<div class="p-3 bg-gray-100 rounded-lg border border-gray-200 text-sm text-gray-500">كشف الحساب: غير مرفق</div>'}
                                        
                                        \${(request.salary_attachment_url && request.salary_attachment_url !== 'null') ? \`
                                            <a href="\${request.salary_attachment_url}" target="_blank"
                                               class="flex items-center gap-2 p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 transition-colors">
                                                <i class="fas fa-file-invoice-dollar text-yellow-600"></i>
                                                <span class="text-sm text-yellow-800 font-medium">تعريف الراتب</span>
                                                <i class="fas fa-download text-yellow-600 mr-auto"></i>
                                            </a>
                                        \` : '<div class="p-3 bg-gray-100 rounded-lg border border-gray-200 text-sm text-gray-500">تعريف الراتب: غير مرفق</div>'}
                                        
                                        \${(request.additional_attachment_url && request.additional_attachment_url !== 'null') ? \`
                                            <a href="\${request.additional_attachment_url}" target="_blank"
                                               class="flex items-center gap-2 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
                                                <i class="fas fa-file text-purple-600"></i>
                                                <span class="text-sm text-purple-800 font-medium">مرفقات إضافية</span>
                                                <i class="fas fa-download text-purple-600 mr-auto"></i>
                                            </a>
                                        \` : '<div class="p-3 bg-gray-100 rounded-lg border border-gray-200 text-sm text-gray-500">مرفقات إضافية: غير مرفقة</div>'}
                                    </div>
                                </div>
                            </div>
                        \`;
                        
                        document.getElementById('requestDetails').innerHTML = detailsHtml;
                        openModal('viewRequestModal');
                    }
                }
            } catch (error) {
                console.error('Error loading request:', error);
                alert('❌ حدث خطأ أثناء تحميل بيانات الطلب');
            }
        }
        
        window.deleteRequest = async function(id) {
            if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
                return;
            }
            
            try {
                const response = await axios.delete(\`/api/financing-requests/\${id}\`);
                if (response.data.success) {
                    alert('✅ ' + response.data.message);
                    loadFinancingRequests();
                    loadDashboardStats(); // Refresh stats
                } else {
                    alert('❌ خطأ: ' + response.data.error);
                }
            } catch (error) {
                console.error('Error deleting request:', error);
                alert('❌ حدث خطأ أثناء الحذف');
            }
        }
        
        window.updateStatus = async function(id) {
            document.getElementById('requestId').value = id;
            
            // Load current request data
            try {
                const response = await axios.get('/api/financing-requests');
                if (response.data.success) {
                    const request = response.data.data.find(r => r.id === id);
                    if (request) {
                        document.querySelector('#updateStatusForm select[name="status"]').value = request.status;
                        document.querySelector('#updateStatusForm textarea[name="notes"]').value = request.notes || '';
                    }
                }
            } catch (error) {
                console.error('Error loading request:', error);
            }
            
            openModal('updateStatusModal');
        }
        
        // Load Banks
        async function loadBanks() {
            try {
                const response = await axios.get('/api/banks');
                if (response.data.success) {
                    const banks = response.data.data;
                    const tbody = document.getElementById('banksTable');
                    
                    if (banks.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-8 text-gray-500">لا توجد بنوك</td></tr>';
                        return;
                    }
                    
                    tbody.innerHTML = banks.map((bank, index) => \`
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-4 py-3">\${index + 1}</td>
                            <td class="px-4 py-3 font-medium">\${bank.bank_name}</td>
                            <td class="px-4 py-3">\${bank.bank_code || '-'}</td>
                            <td class="px-4 py-3">
                                <span class="\${bank.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-2 py-1 rounded text-xs">
                                    \${bank.is_active ? 'نشط' : 'غير نشط'}
                                </span>
                            </td>
                            <td class="px-4 py-3">
                                <button onclick="viewBank(\${bank.id})" class="text-blue-600 hover:text-blue-800 ml-2" title="عرض">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button onclick="editBank(\${bank.id})" class="text-green-600 hover:text-green-800 ml-2" title="تعديل">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="deleteBank(\${bank.id})" class="text-red-600 hover:text-red-800" title="حذف">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    \`).join('');
                }
            } catch (error) {
                console.error('Error loading banks:', error);
            }
        }
        
        // Load Rates
        async function loadRates() {
            try {
                const response = await axios.get('/api/rates');
                if (response.data.success) {
                    const rates = response.data.data;
                    const tbody = document.getElementById('ratesTable');
                    
                    if (rates.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-gray-500">لا توجد نسب</td></tr>';
                        return;
                    }
                    
                    tbody.innerHTML = rates.map((rate, index) => \`
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-4 py-3">\${index + 1}</td>
                            <td class="px-4 py-3 font-medium">\${rate.bank_name || '-'}</td>
                            <td class="px-4 py-3">\${rate.financing_type_name || '-'}</td>
                            <td class="px-4 py-3 font-bold text-green-600">\${rate.rate}%</td>
                            <td class="px-4 py-3 text-sm">\${rate.min_amount.toLocaleString('ar-SA')} - \${rate.max_amount.toLocaleString('ar-SA')}</td>
                            <td class="px-4 py-3 text-sm">\${rate.min_salary.toLocaleString('ar-SA')} - \${rate.max_salary.toLocaleString('ar-SA')}</td>
                            <td class="px-4 py-3">
                                <span class="\${rate.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-2 py-1 rounded text-xs">
                                    \${rate.is_active ? 'نشط' : 'غير نشط'}
                                </span>
                            </td>
                            <td class="px-4 py-3">
                                <button onclick="viewRate(\${rate.id})" class="text-blue-600 hover:text-blue-800 ml-2" title="عرض">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button onclick="editRate(\${rate.id})" class="text-green-600 hover:text-green-800 ml-2" title="تعديل">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="deleteRate(\${rate.id})" class="text-red-600 hover:text-red-800" title="حذف">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    \`).join('');
                }
            } catch (error) {
                console.error('Error loading rates:', error);
            }
        }
        
        // Bank actions
        window.addBank = function() {
            openModal('addBankModal');
        }
        
        window.viewBank = function(id) {
            alert('عرض البنك رقم: ' + id);
        }
        
        window.editBank = function(id) {
            alert('تعديل البنك رقم: ' + id);
        }
        
        window.deleteBank = async function(id) {
            if (!confirm('هل أنت متأكد من حذف هذا البنك؟\\n\\nسيتم حذف جميع النسب المرتبطة به.')) {
                return;
            }
            
            try {
                const response = await axios.delete(\`/api/banks/\${id}\`);
                if (response.data.success) {
                    alert('✅ ' + response.data.message);
                    loadBanks();
                } else {
                    alert('❌ خطأ: ' + response.data.error);
                }
            } catch (error) {
                console.error('Error deleting bank:', error);
                alert('❌ حدث خطأ أثناء الحذف');
            }
        }
        
        // Rate actions
        window.addRate = async function() {
            // Load banks and financing types for the dropdown
            try {
                const [banksRes, typesRes] = await Promise.all([
                    axios.get('/api/banks'),
                    axios.get('/api/financing-types')
                ]);
                
                if (banksRes.data.success && typesRes.data.success) {
                    const bankSelect = document.getElementById('rateBankSelect');
                    const typeSelect = document.getElementById('rateFinancingTypeSelect');
                    
                    bankSelect.innerHTML = '<option value="">اختر البنك</option>' +
                        banksRes.data.data.map(b => \`<option value="\${b.id}">\${b.bank_name}</option>\`).join('');
                    
                    typeSelect.innerHTML = '<option value="">اختر نوع التمويل</option>' +
                        typesRes.data.data.map(t => \`<option value="\${t.id}">\${t.type_name}</option>\`).join('');
                    
                    openModal('addRateModal');
                }
            } catch (error) {
                console.error('Error loading data:', error);
                alert('❌ حدث خطأ أثناء تحميل البيانات');
            }
        }
        
        window.viewRate = function(id) {
            alert('عرض النسبة رقم: ' + id);
        }
        
        window.editRate = function(id) {
            alert('تعديل النسبة رقم: ' + id);
        }
        
        window.deleteRate = async function(id) {
            if (!confirm('هل أنت متأكد من حذف هذه النسبة؟')) {
                return;
            }
            
            try {
                const response = await axios.delete(\`/api/rates/\${id}\`);
                if (response.data.success) {
                    alert('✅ ' + response.data.message);
                    loadRates();
                } else {
                    alert('❌ خطأ: ' + response.data.error);
                }
            } catch (error) {
                console.error('Error deleting rate:', error);
                alert('❌ حدث خطأ أثناء الحذف');
            }
        }
        
        // Load Users
        async function loadUsers() {
            try {
                const response = await axios.get('/api/users');
                if (response.data.success) {
                    const users = response.data.data;
                    const tbody = document.getElementById('usersTable');
                    
                    if (users.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-gray-500">لا توجد مستخدمين</td></tr>';
                        return;
                    }
                    
                    tbody.innerHTML = users.map((user, index) => \`
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-4 py-3">\${index + 1}</td>
                            <td class="px-4 py-3 font-medium">\${user.full_name}</td>
                            <td class="px-4 py-3">\${user.email}</td>
                            <td class="px-4 py-3">\${user.username}</td>
                            <td class="px-4 py-3">
                                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                    \${user.role_name || '-'}
                                </span>
                            </td>
                            <td class="px-4 py-3">
                                <button onclick="managePermissions(\${user.id}, '\${user.full_name}', \${user.role_id})" 
                                        class="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1 rounded text-xs font-medium" 
                                        title="إدارة الصلاحيات">
                                    <i class="fas fa-shield-alt ml-1"></i>
                                    \${user.permissions_count || 0} صلاحية
                                </button>
                            </td>
                            <td class="px-4 py-3">
                                <span class="\${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-2 py-1 rounded text-xs">
                                    \${user.is_active ? 'نشط' : 'غير نشط'}
                                </span>
                            </td>
                            <td class="px-4 py-3">
                                <button onclick="viewUser(\${user.id})" class="text-blue-600 hover:text-blue-800 ml-2" title="عرض">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button onclick="editUser(\${user.id})" class="text-green-600 hover:text-green-800 ml-2" title="تعديل">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="deleteUser(\${user.id})" class="text-red-600 hover:text-red-800" title="حذف">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    \`).join('');
                }
            } catch (error) {
                console.error('Error loading users:', error);
            }
        }
        
        // Manage User Permissions
        window.managePermissions = async function(userId, userName, roleId) {
            document.getElementById('permissionsUserName').textContent = userName;
            document.getElementById('permissionsRoleId').value = roleId;
            
            try {
                // Load all permissions grouped by category
                const permissionsRes = await axios.get('/api/permissions/by-category');
                // Load user's current permissions
                const userPermRes = await axios.get(\`/api/roles/\${roleId}/permissions\`);
                
                if (permissionsRes.data.success && userPermRes.data.success) {
                    const allPermissions = permissionsRes.data.data;
                    const userPermissions = userPermRes.data.data.map(p => p.id);
                    
                    const categoryNames = {
                        'dashboard': 'لوحة التحكم',
                        'customers': 'العملاء',
                        'requests': 'طلبات التمويل',
                        'banks': 'البنوك',
                        'rates': 'النسب التمويلية',
                        'packages': 'الباقات',
                        'subscriptions': 'الاشتراكات',
                        'users': 'المستخدمين',
                        'calculator': 'الحاسبة',
                        'reports': 'التقارير'
                    };
                    
                    const content = Object.keys(allPermissions).map(category => {
                        const permissions = allPermissions[category];
                        return \`
                            <div class="bg-gray-50 rounded-lg p-4">
                                <h3 class="font-bold text-lg mb-3 text-gray-800">
                                    <i class="fas fa-folder ml-2"></i>
                                    \${categoryNames[category] || category}
                                </h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    \${permissions.map(perm => \`
                                        <label class="flex items-center space-x-reverse space-x-2 p-2 hover:bg-white rounded cursor-pointer">
                                            <input type="checkbox" 
                                                   class="permission-checkbox rounded text-purple-600 focus:ring-purple-500" 
                                                   value="\${perm.id}"
                                                   \${userPermissions.includes(perm.id) ? 'checked' : ''}>
                                            <span class="text-sm text-gray-700">\${perm.permission_name}</span>
                                        </label>
                                    \`).join('')}
                                </div>
                            </div>
                        \`;
                    }).join('');
                    
                    document.getElementById('permissionsContent').innerHTML = content;
                    openModal('managePermissionsModal');
                }
            } catch (error) {
                console.error('Error loading permissions:', error);
                alert('❌ حدث خطأ أثناء تحميل الصلاحيات');
            }
        }
        
        // Save Permissions
        window.savePermissions = async function() {
            const roleId = document.getElementById('permissionsRoleId').value;
            const checkboxes = document.querySelectorAll('.permission-checkbox:checked');
            const permissionIds = Array.from(checkboxes).map(cb => parseInt(cb.value));
            
            try {
                const response = await axios.put(\`/api/roles/\${roleId}/permissions\`, {
                    permission_ids: permissionIds
                });
                
                if (response.data.success) {
                    alert('✅ تم تحديث الصلاحيات بنجاح');
                    closeModal('managePermissionsModal');
                    loadUsers();
                } else {
                    alert('❌ خطأ: ' + response.data.error);
                }
            } catch (error) {
                console.error('Error saving permissions:', error);
                alert('❌ حدث خطأ أثناء حفظ الصلاحيات');
            }
        }
        
        // Edit User
        window.editUser = async function(id) {
            try {
                const response = await axios.get('/api/users');
                if (response.data.success) {
                    const user = response.data.data.find(u => u.id === id);
                    if (user) {
                        document.getElementById('editUserId').value = user.id;
                        document.getElementById('editUserFullName').value = user.full_name;
                        document.getElementById('editUserEmail').value = user.email;
                        document.getElementById('editUserPhone').value = user.phone || '';
                        document.getElementById('editUserRole').value = user.role_id;
                        document.getElementById('editUserActive').value = user.is_active;
                        
                        openModal('editUserModal');
                    }
                }
            } catch (error) {
                console.error('Error loading user:', error);
                alert('❌ حدث خطأ أثناء تحميل بيانات المستخدم');
            }
        }
        
        window.viewUser = function(id) {
            alert('عرض تفاصيل المستخدم رقم: ' + id);
        }
        
        // Load Subscriptions
        async function loadSubscriptions() {
            try {
                const response = await axios.get('/api/subscriptions');
                if (response.data.success) {
                    const subscriptions = response.data.data;
                    const tbody = document.getElementById('subscriptionsTable');
                    
                    if (subscriptions.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-gray-500">لا توجد اشتراكات</td></tr>';
                        return;
                    }
                    
                    tbody.innerHTML = subscriptions.map((sub, index) => {
                        const statusColors = {
                            'active': 'bg-green-100 text-green-800',
                            'expired': 'bg-red-100 text-red-800',
                            'cancelled': 'bg-gray-100 text-gray-800'
                        };
                        const statusText = {
                            'active': 'نشط',
                            'expired': 'منتهي',
                            'cancelled': 'ملغي'
                        };
                        
                        return \`
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-4 py-3">\${index + 1}</td>
                                <td class="px-4 py-3 font-medium">\${sub.company_name}</td>
                                <td class="px-4 py-3">\${sub.package_name || '-'}</td>
                                <td class="px-4 py-3">\${sub.start_date}</td>
                                <td class="px-4 py-3">\${sub.end_date}</td>
                                <td class="px-4 py-3">
                                    <span class="\${statusColors[sub.status]} px-2 py-1 rounded text-xs">
                                        \${statusText[sub.status] || sub.status}
                                    </span>
                                </td>
                                <td class="px-4 py-3">
                                    <button onclick="viewSubscription(\${sub.id})" class="text-blue-600 hover:text-blue-800 ml-2" title="عرض">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="editSubscription(\${sub.id})" class="text-green-600 hover:text-green-800 ml-2" title="تعديل">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteSubscription(\${sub.id})" class="text-red-600 hover:text-red-800" title="حذف">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        \`;
                    }).join('');
                }
            } catch (error) {
                console.error('Error loading subscriptions:', error);
            }
        }
        
        // Load Packages
        async function loadPackages() {
            try {
                const response = await axios.get('/api/packages');
                if (response.data.success) {
                    const packages = response.data.data;
                    const tbody = document.getElementById('packagesTable');
                    
                    if (packages.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-gray-500">لا توجد باقات</td></tr>';
                        return;
                    }
                    
                    tbody.innerHTML = packages.map((pkg, index) => \`
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-4 py-3">\${index + 1}</td>
                            <td class="px-4 py-3 font-medium">\${pkg.package_name}</td>
                            <td class="px-4 py-3 font-bold text-green-600">\${pkg.price.toLocaleString('ar-SA')} ريال</td>
                            <td class="px-4 py-3">\${pkg.duration_months} شهر</td>
                            <td class="px-4 py-3">\${pkg.max_calculations || 'غير محدود'}</td>
                            <td class="px-4 py-3">
                                <span class="\${pkg.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-2 py-1 rounded text-xs">
                                    \${pkg.is_active ? 'نشط' : 'غير نشط'}
                                </span>
                            </td>
                            <td class="px-4 py-3">
                                <button onclick="viewPackage(\${pkg.id})" class="text-blue-600 hover:text-blue-800 ml-2" title="عرض">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button onclick="editPackage(\${pkg.id})" class="text-green-600 hover:text-green-800 ml-2" title="تعديل">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="deletePackage(\${pkg.id})" class="text-red-600 hover:text-red-800" title="حذف">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    \`).join('');
                }
            } catch (error) {
                console.error('Error loading packages:', error);
            }
        }
        
        // User actions
        window.addUser = function() { alert('إضافة مستخدم جديد - قيد التطوير'); }
        // viewUser already converted as window.viewUser
        // editUser already converted as window.editUser
        window.deleteUser = async function(id) {
            if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;
            try {
                const response = await axios.delete(\`/api/users/\${id}\`);
                if (response.data.success) {
                    alert('✅ ' + response.data.message);
                    loadUsers();
                } else {
                    alert('❌ خطأ: ' + response.data.error);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('❌ حدث خطأ أثناء الحذف');
            }
        }
        
        // Subscription actions
        window.addSubscription = function() { alert('إضافة اشتراك جديد - قيد التطوير'); }
        window.viewSubscription = function(id) { alert('عرض الاشتراك رقم: ' + id); }
        window.editSubscription = function(id) { alert('تعديل الاشتراك رقم: ' + id); }
        window.deleteSubscription = async function(id) {
            if (!confirm('هل أنت متأكد من حذف هذا الاشتراك؟')) return;
            try {
                const response = await axios.delete(\`/api/subscriptions/\${id}\`);
                if (response.data.success) {
                    alert('✅ ' + response.data.message);
                    loadSubscriptions();
                } else {
                    alert('❌ خطأ: ' + response.data.error);
                }
            } catch (error) {
                console.error('Error deleting subscription:', error);
                alert('❌ حدث خطأ أثناء الحذف');
            }
        }
        
        // Package actions
        window.addPackage = function() {
            openModal('addPackageModal');
        }
        window.viewPackage = function(id) { alert('عرض الباقة رقم: ' + id); }
        window.editPackage = function(id) { alert('تعديل الباقة رقم: ' + id); }
        window.deletePackage = async function(id) {
            if (!confirm('هل أنت متأكد من حذف هذه الباقة؟')) return;
            try {
                const response = await axios.delete(\`/api/packages/\${id}\`);
                if (response.data.success) {
                    alert('✅ ' + response.data.message);
                    loadPackages();
                } else {
                    alert('❌ خطأ: ' + response.data.error);
                }
            } catch (error) {
                console.error('Error deleting package:', error);
                alert('❌ حدث خطأ أثناء الحذف');
            }
        }
        
        // Load Subscription Requests
        async function loadSubscriptionRequests() {
            try {
                const response = await axios.get('/api/subscription-requests');
                if (response.data.success) {
                    const requests = response.data.data;
                    const tbody = document.getElementById('subscriptionRequestsTable');
                    
                    if (requests.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-gray-500">لا توجد طلبات اشتراك</td></tr>';
                        return;
                    }
                    
                    tbody.innerHTML = requests.map((req, index) => {
                        const statusColors = {
                            'pending': 'bg-yellow-100 text-yellow-800',
                            'approved': 'bg-green-100 text-green-800',
                            'rejected': 'bg-red-100 text-red-800'
                        };
                        const statusText = {
                            'pending': 'قيد الانتظار',
                            'approved': 'مقبول',
                            'rejected': 'مرفوض'
                        };
                        
                        return \`
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-4 py-3">\${index + 1}</td>
                                <td class="px-4 py-3 font-medium">\${req.company_name}</td>
                                <td class="px-4 py-3">\${req.contact_name}</td>
                                <td class="px-4 py-3">\${req.email}</td>
                                <td class="px-4 py-3">\${req.phone}</td>
                                <td class="px-4 py-3">\${req.package_name || '-'}</td>
                                <td class="px-4 py-3">
                                    <span class="\${statusColors[req.status]} px-2 py-1 rounded text-xs">
                                        \${statusText[req.status] || req.status}
                                    </span>
                                </td>
                                <td class="px-4 py-3">
                                    <button onclick="viewSubscriptionRequest(\${req.id})" class="text-blue-600 hover:text-blue-800 ml-2" title="عرض">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="updateSubscriptionRequestStatus(\${req.id})" class="text-green-600 hover:text-green-800 ml-2" title="تحديث الحالة">
                                        <i class="fas fa-check-circle"></i>
                                    </button>
                                    <button onclick="deleteSubscriptionRequest(\${req.id})" class="text-red-600 hover:text-red-800" title="حذف">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        \`;
                    }).join('');
                }
            } catch (error) {
                console.error('Error loading subscription requests:', error);
            }
        }
        
        // Subscription Request actions
        window.viewSubscriptionRequest = function(id) { alert('عرض طلب الاشتراك رقم: ' + id); }
        window.updateSubscriptionRequestStatus = function(id) { alert('تحديث حالة طلب الاشتراك رقم: ' + id); }
        window.deleteSubscriptionRequest = async function(id) {
            if (!confirm('هل أنت متأكد من حذف طلب الاشتراك هذا؟')) return;
            try {
                const response = await axios.delete(\`/api/subscription-requests/\${id}\`);
                if (response.data.success) {
                    alert('✅ ' + response.data.message);
                    loadSubscriptionRequests();
                } else {
                    alert('❌ خطأ: ' + response.data.error);
                }
            } catch (error) {
                console.error('Error deleting subscription request:', error);
                alert('❌ حدث خطأ أثناء الحذف');
            }
        }
        
        // Modal Management
        window.openModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.remove('hidden');
            }
        }
        
        window.closeModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                modal.classList.add('hidden');
                const form = modal.querySelector('form');
                if (form) form.reset();
            }
        }
        
        // Form Submissions
        document.addEventListener('DOMContentLoaded', () => {
            const addCustomerForm = document.getElementById('addCustomerForm');
            if (addCustomerForm) {
                addCustomerForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());
                    try {
                        const response = await axios.post('/api/customers', data);
                        if (response.data.success) {
                            alert('✅ ' + response.data.message);
                            closeModal('addCustomerModal');
                            loadCustomers();
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('❌ حدث خطأ أثناء الإضافة');
                    }
                });
            }
            
            const addBankForm = document.getElementById('addBankForm');
            if (addBankForm) {
                addBankForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());
                    try {
                        const response = await axios.post('/api/banks', data);
                        if (response.data.success) {
                            alert('✅ تم إضافة البنك بنجاح');
                            closeModal('addBankModal');
                            loadBanks();
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('❌ حدث خطأ أثناء الإضافة');
                    }
                });
            }
            
            const addRateForm = document.getElementById('addRateForm');
            if (addRateForm) {
                addRateForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());
                    try {
                        const response = await axios.post('/api/rates', data);
                        if (response.data.success) {
                            alert('✅ تم إضافة النسبة بنجاح');
                            closeModal('addRateModal');
                            loadRates();
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('❌ حدث خطأ أثناء الإضافة');
                    }
                });
            }
            
            const addSubscriptionForm = document.getElementById('addSubscriptionForm');
            if (addSubscriptionForm) {
                addSubscriptionForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());
                    try {
                        const response = await axios.post('/api/subscriptions', data);
                        if (response.data.success) {
                            alert('✅ تم إضافة الاشتراك بنجاح');
                            closeModal('addSubscriptionModal');
                            loadSubscriptions();
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('❌ حدث خطأ أثناء الإضافة');
                    }
                });
            }
            
            const addPackageForm = document.getElementById('addPackageForm');
            if (addPackageForm) {
                addPackageForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());
                    try {
                        const response = await axios.post('/api/packages', data);
                        if (response.data.success) {
                            alert('✅ ' + response.data.message);
                            closeModal('addPackageModal');
                            loadPackages();
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('❌ حدث خطأ أثناء الإضافة');
                    }
                });
            }
            
            // Update Status Form
            const updateStatusForm = document.getElementById('updateStatusForm');
            if (updateStatusForm) {
                updateStatusForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const requestId = formData.get('requestId');
                    const status = formData.get('status');
                    const notes = formData.get('notes');
                    
                    try {
                        const response = await axios.put(\`/api/financing-requests/\${requestId}/status\`, {
                            status: status,
                            notes: notes
                        });
                        if (response.data.success) {
                            alert('✅ تم تحديث حالة الطلب بنجاح');
                            closeModal('updateStatusModal');
                            loadFinancingRequests();
                            loadDashboardStats();
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('❌ حدث خطأ أثناء التحديث');
                    }
                });
            }
            
            // Edit User Form
            const editUserForm = document.getElementById('editUserForm');
            if (editUserForm) {
                editUserForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const userId = formData.get('userId');
                    const data = {
                        full_name: formData.get('full_name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        role_id: parseInt(formData.get('role_id')),
                        is_active: parseInt(formData.get('is_active'))
                    };
                    
                    try {
                        const response = await axios.put(\`/api/users/\${userId}\`, data);
                        if (response.data.success) {
                            alert('✅ تم تحديث بيانات المستخدم بنجاح');
                            closeModal('editUserModal');
                            loadUsers();
                        } else {
                            alert('❌ خطأ: ' + response.data.error);
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('❌ حدث خطأ أثناء التحديث');
                    }
                });
            }
        });
        
        // ==========================================
        // Calculator Link & QR Code Functions
        // ==========================================
        
        // Generate and display calculator link and QR code
        function loadCalculatorLink() {
            console.log('📱 بدء تحميل رابط الحاسبة...');
            
            const userDataStr = localStorage.getItem('userData');
            console.log('📦 بيانات localStorage:', userDataStr);
            
            if (!userDataStr) {
                console.error('❌ لا توجد بيانات مستخدم في localStorage');
                return;
            }
            
            const userData = JSON.parse(userDataStr);
            console.log('👤 بيانات المستخدم:', userData);
            
            const tenantSlug = userData.tenant_slug || 'unknown';
            const tenantName = userData.tenant_name || 'الشركة';
            
            console.log('🏢 معلومات الشركة:', { tenantSlug, tenantName });
            
            // Build calculator URL
            const baseUrl = window.location.origin;
            const calculatorUrl = \`\${baseUrl}/c/\${tenantSlug}/calculator\`;
            
            console.log('🔗 رابط الحاسبة المولد:', calculatorUrl);
            
            // Update input field
            const linkInput = document.getElementById('calculatorLinkInput');
            if (linkInput) {
                linkInput.value = calculatorUrl;
            }
            
            // Generate QR Code using QR Server API
            const qrcodeContainer = document.getElementById('qrcodeContainer');
            if (qrcodeContainer) {
                qrcodeContainer.innerHTML = '';
                
                // Create QR code image using API
                const qrCodeUrl = \`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=\${encodeURIComponent(calculatorUrl)}\`;
                
                const qrImg = document.createElement('img');
                qrImg.src = qrCodeUrl;
                qrImg.alt = 'QR Code';
                qrImg.className = 'w-48 h-48';
                qrImg.id = 'qrcodeImage';
                
                qrcodeContainer.appendChild(qrImg);
            }
        }
        
        // Copy calculator link to clipboard
        window.copyCalculatorLink = function() {
            console.log('📋 نسخ رابط الحاسبة...');
            
            const linkInput = document.getElementById('calculatorLinkInput');
            if (!linkInput) {
                console.error('❌ لم يتم العثور على حقل الرابط');
                return;
            }
            
            // Copy to clipboard
            linkInput.select();
            linkInput.setSelectionRange(0, 99999); // For mobile devices
            
            try {
                document.execCommand('copy');
                console.log('✅ تم النسخ بنجاح');
                
                // Show success message
                const successMessage = document.getElementById('copySuccessMessage');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 3000);
                }
            } catch (err) {
                console.error('❌ فشل النسخ:', err);
                alert('❌ فشل نسخ الرابط');
            }
        };
        
        // Open calculator link in new tab
        window.openCalculatorLink = function() {
            console.log('🌐 فتح رابط الحاسبة...');
            
            const linkInput = document.getElementById('calculatorLinkInput');
            if (!linkInput || !linkInput.value || linkInput.value === 'جاري التحميل...') {
                console.error('❌ الرابط غير جاهز');
                alert('❌ الرجاء الانتظار حتى يتم تحميل الرابط');
                return;
            }
            
            const calculatorUrl = linkInput.value;
            console.log('🔗 فتح الرابط:', calculatorUrl);
            
            // Open in new tab
            window.open(calculatorUrl, '_blank');
        };
        
        // Download QR Code as image
        window.downloadQRCode = function() {
            console.log('💾 تحميل رمز QR...');
            
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const tenantName = userData.tenant_name || 'الشركة';
            
            const qrImg = document.getElementById('qrcodeImage');
            if (!qrImg) {
                console.error('❌ لم يتم العثور على رمز QR');
                alert('❌ لم يتم إنشاء رمز QR بعد');
                return;
            }
            
            // Create download link
            const link = document.createElement('a');
            link.href = qrImg.src;
            link.download = \`calculator-qr-\${tenantName.replace(/\\s+/g, '-')}.png\`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            console.log('✅ تم بدء التحميل');
        };
        
        // Employee Calculator Link Functions
        window.copyEmployeeCalculatorLink = function() {
            console.log('📋 نسخ رابط الحاسبة (موظف)...');
            
            const linkInput = document.getElementById('employeeCalculatorLinkInput');
            if (!linkInput) {
                console.error('❌ لم يتم العثور على حقل الرابط');
                return;
            }
            
            linkInput.select();
            linkInput.setSelectionRange(0, 99999);
            
            try {
                document.execCommand('copy');
                console.log('✅ تم النسخ بنجاح');
                
                const successMessage = document.getElementById('employeeCopySuccessMessage');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 3000);
                }
            } catch (err) {
                console.error('❌ فشل النسخ:', err);
                alert('❌ فشل نسخ الرابط');
            }
        };
        
        window.openEmployeeCalculatorLink = function() {
            console.log('🌐 فتح رابط الحاسبة (موظف)...');
            
            const linkInput = document.getElementById('employeeCalculatorLinkInput');
            if (!linkInput || !linkInput.value || linkInput.value === 'جاري التحميل...') {
                console.error('❌ الرابط غير جاهز');
                alert('❌ الرجاء الانتظار حتى يتم تحميل الرابط');
                return;
            }
            
            window.open(linkInput.value, '_blank');
        };
        
        window.downloadEmployeeQRCode = function() {
            console.log('💾 تحميل باركود الحاسبة (موظف)...');
            
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const tenantName = userData.tenant_name || 'الشركة';
            
            const qrImg = document.getElementById('employeeQRCodeImage');
            if (!qrImg) {
                console.error('❌ لم يتم العثور على الباركود');
                alert('❌ لم يتم إنشاء الباركود بعد');
                return;
            }
            
            const link = document.createElement('a');
            link.href = qrImg.src;
            link.download = \`calculator-qr-\${tenantName.replace(/\\s+/g, '-')}.png\`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            console.log('✅ تم بدء التحميل');
        };
        
        window.loadEmployeeCalculatorLink = async function() {
            console.log('🔗 تحميل رابط الحاسبة للموظف...');
            
            try {
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                const tenantSlug = userData.tenant_slug;
                
                if (!tenantSlug) {
                    console.error('❌ لا يوجد tenant_slug');
                    return;
                }
                
                const baseUrl = window.location.origin;
                const calculatorUrl = \`\${baseUrl}/c/\${tenantSlug}/calculator\`;
                
                console.log('✅ رابط الحاسبة:', calculatorUrl);
                
                // Update input field
                const linkInput = document.getElementById('employeeCalculatorLinkInput');
                if (linkInput) {
                    linkInput.value = calculatorUrl;
                }
                
                // Generate QR Code
                const qrContainer = document.getElementById('employeeQRCodeContainer');
                if (qrContainer && typeof QRCode !== 'undefined') {
                    qrContainer.innerHTML = '';
                    new QRCode(qrContainer, {
                        text: calculatorUrl,
                        width: 200,
                        height: 200,
                        colorDark: '#000000',
                        colorLight: '#ffffff',
                        correctLevel: QRCode.CorrectLevel.H
                    });
                    
                    setTimeout(() => {
                        const qrImg = qrContainer.querySelector('img');
                        if (qrImg) {
                            qrImg.id = 'employeeQRCodeImage';
                            qrImg.style.border = '10px solid white';
                            qrImg.style.borderRadius = '10px';
                            console.log('✅ تم إنشاء الباركود');
                        }
                    }, 500);
                }
            } catch (error) {
                console.error('❌ خطأ في تحميل رابط الحاسبة:', error);
            }
        };
        
        // Initialize on load
        loadDashboardStats();
        
        // Load calculator link when page loads
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                const userRole = userData.role || userData.user_type;
                
                if (userRole === 'employee') {
                    console.log('🔗 تحميل رابط الحاسبة للموظف:', userRole);
                    if (typeof loadEmployeeCalculatorLink === 'function') {
                        loadEmployeeCalculatorLink();
                    }
                } else if (userRole === 'company' || userRole === 'admin' || userRole === 'superadmin' || userRole === 'manager') {
                    console.log('🔗 تحميل رابط الحاسبة للمستخدم:', userRole);
                    if (typeof loadCalculatorLink === 'function') {
                        loadCalculatorLink();
                    }
                } else {
                    console.log('⚠️ دور المستخدم لا يسمح بعرض رابط الحاسبة:', userRole);
                }
            }, 1000);
        });
        
        // Show Section function
        window.showSection = function(sectionName) {
            console.log('🔄 Switching to section:', sectionName);
            
            // Hide all sections
            const allSections = document.querySelectorAll('.content-section');
            allSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const targetSection = document.getElementById(sectionName + '-section');
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('✅ Section activated:', sectionName);
                
                // Load data based on section
                if (sectionName === 'reports') {
                    loadReports();
                }
            } else {
                console.error('❌ Section not found:', sectionName);
            }
        };
        
        // Load Reports function
        window.loadReports = async function() {
            try {
                console.log('📊 Loading reports...');
                
                // Get date range
                const fromDate = document.getElementById('reportFromDate').value;
                const toDate = document.getElementById('reportToDate').value;
                
                // Set default dates if not provided
                if (!fromDate || !toDate) {
                    const today = new Date();
                    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                    document.getElementById('reportFromDate').value = firstDay.toISOString().split('T')[0];
                    document.getElementById('reportToDate').value = today.toISOString().split('T')[0];
                }
                
                // Get auth token
                const token = localStorage.getItem('authToken');
                
                // Fetch statistics
                const statsResponse = await axios.get('/api/reports/statistics', {
                    params: { from_date: fromDate, to_date: toDate },
                    headers: token ? { 'Authorization': \`Bearer \${token}\` } : {}
                });
                
                if (statsResponse.data.success) {
                    const stats = statsResponse.data.data;
                    
                    // Update cards
                    document.getElementById('reportTotalRequests').textContent = stats.total_requests || 0;
                    document.getElementById('reportApprovedRequests').textContent = stats.approved_requests || 0;
                    document.getElementById('reportPendingRequests').textContent = stats.pending_requests || 0;
                    document.getElementById('reportTotalAmount').textContent = (stats.total_amount || 0).toLocaleString('ar-SA') + ' ريال';
                    
                    // Load top customers
                    if (stats.top_customers && stats.top_customers.length > 0) {
                        const tbody = document.getElementById('topCustomersTable');
                        tbody.innerHTML = stats.top_customers.map(customer => \`
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-4 py-3">\${customer.customer_name}</td>
                                <td class="px-4 py-3">\${customer.request_count}</td>
                                <td class="px-4 py-3">\${(customer.total_amount || 0).toLocaleString('ar-SA')} ريال</td>
                                <td class="px-4 py-3">\${customer.last_request_date ? new Date(customer.last_request_date).toLocaleDateString('ar-SA') : '-'}</td>
                            </tr>
                        \`).join('');
                    }
                    
                    console.log('✅ Reports loaded successfully');
                } else {
                    console.error('Failed to load reports');
                }
            } catch (error) {
                console.error('Error loading reports:', error);
            }
        };
        
        // Mobile Menu Toggle
        window.toggleMobileMenu = function() {
            const sidebar = document.querySelector('.min-h-screen.bg-white.shadow-lg');
            const overlay = document.getElementById('sidebar-overlay');
            
            if (sidebar) {
                sidebar.classList.toggle('active');
            }
            if (overlay) {
                overlay.classList.toggle('active');
            }
        };
        
        // Close mobile menu when clicking overlay
        document.addEventListener('click', function(e) {
            if (e.target.id === 'sidebar-overlay') {
                toggleMobileMenu();
            }
        });
        
        // Close mobile menu when clicking a menu item on mobile
        document.querySelectorAll('[onclick^="showSection"]').forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    setTimeout(() => toggleMobileMenu(), 300);
                }
            });
        });
    <\/script>
    
    <!-- Mobile Sidebar Overlay -->
    <div id="sidebar-overlay"></div>
</body>
</html>
`,et=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إدارة الشركات - SaaS Multi-Tenant</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold flex items-center">
                    <i class="fas fa-building ml-3"></i>
                    إدارة الشركات - SaaS Multi-Tenant
                </h1>
                <div class="flex gap-3">
                    <a href="/admin/panel" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all">
                        <i class="fas fa-arrow-right ml-2"></i>
                        العودة للوحة التحكم
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto p-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">إجمالي الشركات</p>
                        <p class="text-3xl font-bold text-emerald-600" id="total-tenants">0</p>
                    </div>
                    <i class="fas fa-building text-4xl text-emerald-200"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">شركات نشطة</p>
                        <p class="text-3xl font-bold text-green-600" id="active-tenants">0</p>
                    </div>
                    <i class="fas fa-check-circle text-4xl text-green-200"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">شركات تجريبية</p>
                        <p class="text-3xl font-bold text-yellow-600" id="trial-tenants">0</p>
                    </div>
                    <i class="fas fa-hourglass-half text-4xl text-yellow-200"></i>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-600 text-sm mb-1">شركات متوقفة</p>
                        <p class="text-3xl font-bold text-red-600" id="suspended-tenants">0</p>
                    </div>
                    <i class="fas fa-ban text-4xl text-red-200"></i>
                </div>
            </div>
        </div>

        <!-- Tenants Table -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-gray-800">
                        <i class="fas fa-list ml-2"></i>
                        قائمة الشركات
                    </h2>
                    <button onclick="addTenant()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-all">
                        <i class="fas fa-plus ml-2"></i>
                        إضافة شركة جديدة
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم الشركة</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subdomain</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستخدمين</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رابط الحاسبة</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody id="tenants-tbody" class="bg-white divide-y divide-gray-200">
                        <!-- Will be populated by JavaScript -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        async function loadTenants() {
            try {
                const response = await axios.get('/api/tenants');
                const tenants = response.data.data;
                
                // Update stats
                document.getElementById('total-tenants').textContent = tenants.length;
                document.getElementById('active-tenants').textContent = tenants.filter(t => t.status === 'active').length;
                document.getElementById('trial-tenants').textContent = tenants.filter(t => t.status === 'trial').length;
                document.getElementById('suspended-tenants').textContent = tenants.filter(t => t.status === 'suspended').length;
                
                // Populate table
                const tbody = document.getElementById('tenants-tbody');
                tbody.innerHTML = tenants.map((tenant, index) => \`
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">\${index + 1}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <i class="fas fa-building text-emerald-600 ml-2"></i>
                                <span class="font-medium text-gray-900">\${tenant.company_name}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <code class="bg-gray-100 px-2 py-1 rounded">\${tenant.slug}</code>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <code class="bg-gray-100 px-2 py-1 rounded">\${tenant.subdomain || '-'}</code>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                \${tenant.status === 'active' ? 'bg-green-100 text-green-800' : 
                                  tenant.status === 'trial' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'}">
                                \${tenant.status === 'active' ? 'نشط' : tenant.status === 'trial' ? 'تجريبي' : 'متوقف'}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <i class="fas fa-users ml-1"></i>
                            \${tenant.max_users || 10}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                            <a href="/c/\${tenant.slug}/calculator" target="_blank" 
                               class="text-blue-600 hover:text-blue-800 font-medium">
                                <i class="fas fa-external-link-alt ml-1"></i>
                                فتح الحاسبة
                            </a>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex gap-2">
                                <button onclick="viewTenant(\${tenant.id})" 
                                        class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-all">
                                    <i class="fas fa-eye"></i> عرض
                                </button>
                                <button onclick="editTenant(\${tenant.id})" 
                                        class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition-all">
                                    <i class="fas fa-edit"></i> تعديل
                                </button>
                                <button onclick="deleteTenant(\${tenant.id})" 
                                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-all">
                                    <i class="fas fa-trash"></i> حذف
                                </button>
                            </div>
                        </td>
                    </tr>
                \`).join('');
            } catch (error) {
                console.error('Error loading tenants:', error);
                alert('حدث خطأ في تحميل البيانات');
            }
        }

        function addTenant() {
            window.location.href = '/admin/tenants/add';
        }

        function editTenant(id) {
            window.location.href = \`/admin/tenants/\${id}/edit\`;
        }

        function viewTenant(id) {
            window.location.href = \`/admin/tenants/\${id}\`;
        }

        async function deleteTenant(id) {
            if (!confirm('هل أنت متأكد من حذف هذه الشركة؟')) return;
            
            try {
                await axios.delete(\`/api/tenants/\${id}\`);
                alert('تم حذف الشركة بنجاح');
                loadTenants();
            } catch (error) {
                console.error('Error deleting tenant:', error);
                alert('حدث خطأ في حذف الشركة');
            }
        }

        // Load on page ready
        loadTenants();
    <\/script>
</body>
</html>
`,tt=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>حاسبات الشركات - SaaS Multi-Tenant</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
</head>
<body class="bg-gray-50">
    <div class="bg-gradient-to-r from-violet-600 to-violet-800 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold flex items-center">
                    <i class="fas fa-calculator ml-3"></i>
                    حاسبات الشركات
                </h1>
                <a href="/admin/panel" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة للوحة التحكم
                </a>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto p-6">
        <div class="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold mb-3"><i class="fas fa-info-circle ml-2"></i>حاسبات مخصصة لكل شركة</h2>
            <p class="text-violet-100">كل شركة لديها رابط حاسبة خاص بها. يمكن مشاركة هذا الرابط مع العملاء.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="calculators-grid"></div>
    </div>

    <script>
        async function loadCalculators() {
            try {
                const response = await axios.get('/api/tenants');
                const tenants = response.data.data.filter(t => t.status === 'active');
                
                const grid = document.getElementById('calculators-grid');
                grid.innerHTML = tenants.map(tenant => {
                    const calculatorUrl = '/c/' + tenant.slug + '/calculator';
                    const fullUrl = window.location.origin + calculatorUrl;
                    
                    return '<div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">' +
                        '<div class="bg-gradient-to-r from-violet-500 to-purple-600 text-white p-6">' +
                        '<h3 class="text-xl font-bold mb-2">' + tenant.company_name + '</h3>' +
                        '<p class="text-sm text-violet-100">' + tenant.slug + '</p>' +
                        '</div>' +
                        '<div class="p-6">' +
                        '<div class="mb-4">' +
                        '<label class="block text-sm font-bold text-gray-700 mb-2">رابط الحاسبة</label>' +
                        '<input type="text" value="' + fullUrl + '" readonly class="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm">' +
                        '</div>' +
                        '<a href="' + calculatorUrl + '" target="_blank" class="block text-center bg-violet-600 hover:bg-violet-700 text-white px-4 py-3 rounded-lg font-bold">' +
                        '<i class="fas fa-external-link-alt ml-2"></i>فتح الحاسبة</a>' +
                        '</div></div>';
                }).join('');
            } catch (error) {
                alert('حدث خطأ في تحميل البيانات');
            }
        }
        loadCalculators();
    <\/script>
</body>
</html>
`,at=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إعدادات SaaS - Multi-Tenant System</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
</head>
<body class="bg-gray-50">
    <div class="bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold flex items-center">
                    <i class="fas fa-cogs ml-3"></i>
                    إعدادات نظام SaaS Multi-Tenant
                </h1>
                <a href="/admin/panel" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة
                </a>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto p-6">
        <!-- System Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-gray-800">نموذج النظام</h3>
                    <i class="fas fa-sitemap text-3xl text-amber-600"></i>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">النوع:</span>
                        <span class="font-bold text-amber-600">SaaS Multi-Tenant</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">الإصدار:</span>
                        <span class="font-bold">v1.0.0</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">الحالة:</span>
                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">نشط</span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-gray-800">عزل البيانات</h3>
                    <i class="fas fa-database text-3xl text-blue-600"></i>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-green-600"></i>
                        <span>tenant_id في كل جدول</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-green-600"></i>
                        <span>تصفية تلقائية بالـ APIs</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-green-600"></i>
                        <span>عزل كامل للبيانات</span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-gray-800">روابط الوصول</h3>
                    <i class="fas fa-link text-3xl text-purple-600"></i>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-green-600"></i>
                        <span>Slug: /c/:tenant/*</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-info-circle text-blue-600"></i>
                        <span>Subdomain: قريباً</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-info-circle text-blue-600"></i>
                        <span>Custom Domain: قريباً</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Configuration Sections -->
        <div class="space-y-6">
            <!-- Tenant Management -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6">
                    <h2 class="text-xl font-bold flex items-center">
                        <i class="fas fa-building ml-3"></i>
                        إدارة الشركات (Tenants)
                    </h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="font-bold text-gray-800 mb-3">الميزات المتاحة</h3>
                            <ul class="space-y-2 text-sm">
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-green-600 mt-1"></i>
                                    <span>إنشاء شركات جديدة مع slug فريد</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-green-600 mt-1"></i>
                                    <span>تحديد عدد المستخدمين لكل شركة</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-green-600 mt-1"></i>
                                    <span>حالات متعددة: نشط، تجريبي، متوقف</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-green-600 mt-1"></i>
                                    <span>رابط حاسبة مخصص لكل شركة</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800 mb-3">إجراءات سريعة</h3>
                            <div class="space-y-2">
                                <a href="/admin/tenants" class="block w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg text-center font-bold">
                                    <i class="fas fa-eye ml-2"></i>
                                    عرض جميع الشركات
                                </a>
                                <a href="/admin/tenant-calculators" class="block w-full bg-violet-600 hover:bg-violet-700 text-white px-4 py-3 rounded-lg text-center font-bold">
                                    <i class="fas fa-calculator ml-2"></i>
                                    حاسبات الشركات
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Data Isolation -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                    <h2 class="text-xl font-bold flex items-center">
                        <i class="fas fa-shield-alt ml-3"></i>
                        عزل البيانات (Data Isolation)
                    </h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="border-r border-gray-200 pr-4">
                            <h4 class="font-bold text-gray-800 mb-3">الجداول المحمية</h4>
                            <ul class="space-y-1 text-sm text-gray-600">
                                <li><i class="fas fa-table text-blue-600 ml-1"></i> customers</li>
                                <li><i class="fas fa-table text-blue-600 ml-1"></i> financing_requests</li>
                                <li><i class="fas fa-table text-blue-600 ml-1"></i> users</li>
                                <li><i class="fas fa-table text-blue-600 ml-1"></i> notifications</li>
                                <li><i class="fas fa-table text-blue-600 ml-1"></i> subscriptions</li>
                            </ul>
                        </div>
                        <div class="border-r border-gray-200 pr-4">
                            <h4 class="font-bold text-gray-800 mb-3">APIs المحمية</h4>
                            <ul class="space-y-1 text-sm text-gray-600">
                                <li><i class="fas fa-shield-alt text-green-600 ml-1"></i> GET /api/customers</li>
                                <li><i class="fas fa-shield-alt text-green-600 ml-1"></i> GET /api/financing-requests</li>
                                <li><i class="fas fa-shield-alt text-green-600 ml-1"></i> GET /api/users</li>
                                <li><i class="fas fa-shield-alt text-green-600 ml-1"></i> GET /api/notifications</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-800 mb-3">آلية الحماية</h4>
                            <ul class="space-y-1 text-sm text-gray-600">
                                <li><i class="fas fa-key text-amber-600 ml-1"></i> JWT Token مع tenant_id</li>
                                <li><i class="fas fa-filter text-amber-600 ml-1"></i> WHERE tenant_id = ?</li>
                                <li><i class="fas fa-lock text-amber-600 ml-1"></i> عزل تلقائي</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- System Statistics -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
                    <h2 class="text-xl font-bold flex items-center">
                        <i class="fas fa-chart-bar ml-3"></i>
                        إحصائيات النظام
                    </h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4" id="stats-grid">
                        <div class="text-center p-4 bg-emerald-50 rounded-lg">
                            <div class="text-3xl font-bold text-emerald-600" id="stat-tenants">0</div>
                            <div class="text-sm text-gray-600 mt-1">إجمالي الشركات</div>
                        </div>
                        <div class="text-center p-4 bg-blue-50 rounded-lg">
                            <div class="text-3xl font-bold text-blue-600" id="stat-active">0</div>
                            <div class="text-sm text-gray-600 mt-1">شركات نشطة</div>
                        </div>
                        <div class="text-center p-4 bg-purple-50 rounded-lg">
                            <div class="text-3xl font-bold text-purple-600" id="stat-trial">0</div>
                            <div class="text-sm text-gray-600 mt-1">شركات تجريبية</div>
                        </div>
                        <div class="text-center p-4 bg-amber-50 rounded-lg">
                            <div class="text-3xl font-bold text-amber-600" id="stat-total-users">0</div>
                            <div class="text-sm text-gray-600 mt-1">إجمالي المستخدمين</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        async function loadStats() {
            try {
                const [tenantsRes, usersRes] = await Promise.all([
                    axios.get('/api/tenants'),
                    axios.get('/api/users')
                ]);
                
                const tenants = tenantsRes.data.data;
                document.getElementById('stat-tenants').textContent = tenants.length;
                document.getElementById('stat-active').textContent = tenants.filter(t => t.status === 'active').length;
                document.getElementById('stat-trial').textContent = tenants.filter(t => t.status === 'trial').length;
                document.getElementById('stat-total-users').textContent = usersRes.data.data.length;
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        }
        loadStats();
    <\/script>
</body>
</html>
`,st=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منظومة التقارير - نظام حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold flex items-center">
                    <i class="fas fa-chart-line ml-3"></i>
                    منظومة التقارير والإحصائيات
                </h1>
                <a href="/admin/panel" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة للوحة التحكم
                </a>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto p-6">
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <i class="fas fa-users text-4xl opacity-80"></i>
                    <div class="text-right">
                        <div class="text-3xl font-bold" id="stat-total-customers">0</div>
                        <div class="text-sm opacity-90">إجمالي العملاء</div>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <i class="fas fa-file-invoice text-4xl opacity-80"></i>
                    <div class="text-right">
                        <div class="text-3xl font-bold" id="stat-total-requests">0</div>
                        <div class="text-sm opacity-90">إجمالي الطلبات</div>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <i class="fas fa-clock text-4xl opacity-80"></i>
                    <div class="text-right">
                        <div class="text-3xl font-bold" id="stat-pending-requests">0</div>
                        <div class="text-sm opacity-90">طلبات قيد المراجعة</div>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-4">
                    <i class="fas fa-check-circle text-4xl opacity-80"></i>
                    <div class="text-right">
                        <div class="text-3xl font-bold" id="stat-approved-requests">0</div>
                        <div class="text-sm opacity-90">طلبات موافق عليها</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Report Types -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <!-- Requests Followup Report (Manager Only) -->
            <div id="requestsFollowupReport" class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
                    <i class="fas fa-tasks text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير متابعة الطلبات</h3>
                    <p class="text-sm text-orange-100 mt-2">متابعة حالة طلبات التمويل والموظفين المخصصين</p>
                </div>
                <div class="p-6">
                    <button onclick="goToRequestsFollowup()" class="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Customer Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                    <i class="fas fa-users text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير العملاء</h3>
                    <p class="text-sm text-blue-100 mt-2">تقرير شامل لجميع العملاء وإحصائياتهم</p>
                </div>
                <div class="p-6">
                    <a href="/admin/reports/customers" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold transition-all block text-center">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </a>
                </div>
            </div>

            <!-- Financing Requests Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
                    <i class="fas fa-file-invoice text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير طلبات التمويل</h3>
                    <p class="text-sm text-green-100 mt-2">تحليل الطلبات حسب الحالة والفترة</p>
                </div>
                <div class="p-6">
                    <a href="/admin/reports/requests" class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-bold transition-all block text-center">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </a>
                </div>
            </div>

            <!-- Performance Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
                    <i class="fas fa-chart-bar text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير الأداء</h3>
                    <p class="text-sm text-purple-100 mt-2">تحليل أداء النظام والإحصائيات</p>
                </div>
                <div class="p-6">
                    <button onclick="showComingSoon('تقرير الأداء')" class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Financial Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6">
                    <i class="fas fa-dollar-sign text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">التقرير المالي</h3>
                    <p class="text-sm text-yellow-100 mt-2">ملخص المبالغ والتمويلات</p>
                </div>
                <div class="p-6">
                    <a href="/admin/reports/financial" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-bold transition-all block text-center">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </a>
                </div>
            </div>

            <!-- Banks Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
                <div class="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6">
                    <i class="fas fa-university text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير البنوك</h3>
                    <p class="text-sm text-teal-100 mt-2">توزيع الطلبات حسب البنوك</p>
                </div>
                <div class="p-6">
                    <button onclick="showComingSoon('تقرير البنوك')" class="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        console.log('📊 Reports page loaded');
        
        const authToken = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');

        // Navigate to Requests Followup Report
        window.goToRequestsFollowup = function() {
            console.log('🔗 Navigating to Requests Followup Report');
            console.log('User data:', userData);
            
            if (userData.tenant_id) {
                const url = '/admin/reports/requests-followup?tenant_id=' + userData.tenant_id;
                console.log('Redirecting to:', url);
                window.location.href = url;
            } else {
                console.log('No tenant_id found, redirecting without tenant_id');
                window.location.href = '/admin/reports/requests-followup';
            }
        }

        // Show coming soon message
        window.showComingSoon = function(reportName) {
            alert('قريباً: ' + reportName + '\\n\\nسيتم إضافة هذا التقرير قريباً');
        }

        // Load initial stats
        async function loadStats() {
            try {
                console.log('📊 Loading reports statistics...');
                
                const statsRes = await axios.get('/api/dashboard/stats', {
                    headers: authToken ? { 'Authorization': 'Bearer ' + authToken } : {}
                });
                
                if (statsRes.data.success) {
                    const stats = statsRes.data.data;
                    console.log('✅ Stats loaded:', stats);
                    
                    document.getElementById('stat-total-customers').textContent = stats.total_customers || 0;
                    document.getElementById('stat-total-requests').textContent = stats.total_requests || 0;
                    document.getElementById('stat-pending-requests').textContent = stats.pending_requests || 0;
                    document.getElementById('stat-approved-requests').textContent = stats.approved_requests || 0;
                } else {
                    console.error('❌ Failed to load stats:', statsRes.data);
                }
            } catch (error) {
                console.error('❌ Error loading stats:', error);
            }
        }

        // Hide Requests Followup Report for employees
        function applyReportPermissions() {
            const userRole = userData.role || userData.user_type;
            console.log('🔐 Applying permissions for role:', userRole);
            
            // Hide for employees/users
            if (userRole === 'employee' || userRole === 'user') {
                const requestsFollowupCard = document.getElementById('requestsFollowupReport');
                if (requestsFollowupCard) {
                    console.log('❌ Hiding Requests Followup Report for employee');
                    requestsFollowupCard.style.display = 'none';
                }
            } else {
                console.log('✅ Showing Requests Followup Report for:', userRole);
            }
        }

        // Load stats on page load
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 Page loaded, initializing...');
            console.log('Auth token:', authToken ? 'Present' : 'Missing');
            console.log('User data:', userData);
            
            loadStats();
            applyReportPermissions();
        });
    <\/script>
</body>
</html>
`,ie=()=>`
  /* Mobile Responsive Styles */
  @media (max-width: 768px) {
    .max-w-7xl, .max-w-6xl, .max-w-5xl {
      padding-left: 1rem !important;
      padding-right: 1rem !important;
    }
    h1 { font-size: 1.5rem !important; }
    h2 { font-size: 1.25rem !important; }
    table { font-size: 0.875rem !important; }
    table th, table td { padding: 0.5rem !important; }
    .hide-on-mobile { display: none !important; }
    button, .btn { font-size: 0.875rem !important; padding: 0.5rem 1rem !important; }
    input, select, textarea { font-size: 1rem !important; }
    .bg-white.rounded-xl, .bg-white.rounded-lg { padding: 1rem !important; }
    .flex.justify-between { flex-wrap: wrap; gap: 1rem; }
    .flex-wrap > * { width: 100%; }
    input[type="text"], input[type="search"] { width: 100% !important; }
    .grid { grid-template-columns: 1fr !important; }
    .p-6 { padding: 1rem !important; }
    .p-8 { padding: 1.5rem !important; }
    .overflow-x-auto { 
      margin-left: -1rem !important; 
      margin-right: -1rem !important;
      padding-bottom: 1.5rem !important;
      position: relative !important;
    }
    
    /* Enhanced Mobile Scrollbar */
    .overflow-x-auto::-webkit-scrollbar {
      height: 14px !important;
      -webkit-appearance: none;
    }
    .overflow-x-auto::-webkit-scrollbar-track {
      background: #f1f5f9 !important;
      border-radius: 8px !important;
      border: 2px solid #e2e8f0 !important;
    }
    .overflow-x-auto::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%) !important;
      border-radius: 8px !important;
      border: 2px solid #e2e8f0 !important;
      min-width: 50px !important;
    }
    .overflow-x-auto {
      overflow-x: scroll !important;
      -webkit-overflow-scrolling: touch !important;
      scrollbar-width: auto !important;
      scrollbar-color: #3b82f6 #f1f5f9 !important;
    }
  }
  @media (max-width: 480px) {
    body { font-size: 14px !important; }
    h1 { font-size: 1.25rem !important; }
    table { font-size: 0.75rem !important; }
    button { font-size: 0.75rem !important; padding: 0.375rem 0.75rem !important; }
    .overflow-x-auto::-webkit-scrollbar { height: 16px !important; }
    .overflow-x-auto::-webkit-scrollbar-thumb { min-width: 60px !important; }
  }
`,rt=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تقرير العملاء</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"><\/script>
    <style>
        /* Custom Scrollbar - Enhanced */
        .overflow-x-auto {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #3b82f6 #f7fafc;
        }
        
        .overflow-x-auto::-webkit-scrollbar {
            height: 12px;
            width: 12px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 10px;
            margin: 0 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
            border-radius: 10px;
            border: 2px solid #e5e7eb;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
            border-color: #d1d5db;
        }
        
        /* Force scrollbar to always show */
        .overflow-x-auto {
            overflow-x: scroll !important; /* Always show scrollbar */
        }
        
        .overflow-x-auto table {
            min-width: 1200px; /* Force table to be wide enough for scrollbar */
            width: max-content;
        }
        
        ${ie()}
    </style>
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto p-6">
        <div class="mb-6 flex items-center justify-between">
            <a href="/admin/reports" class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-arrow-right ml-2"></i>
                العودة للتقارير
            </a>
            <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-users text-blue-600 ml-2"></i>
                تقرير العملاء الشامل
            </h1>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <div>
                    <h2 class="text-xl font-bold">إجمالي العملاء: <span id="totalCustomers" class="text-blue-600">0</span></h2>
                    <p class="text-gray-600 text-sm">تاريخ التقرير: <span id="reportDate"></span></p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <input 
                            type="text" 
                            id="searchInput" 
                            placeholder="بحث في العملاء..." 
                            class="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onkeyup="searchTable()"
                        />
                        <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                    </div>
                    <button onclick="exportToExcel()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold whitespace-nowrap">
                        <i class="fas fa-file-excel ml-2"></i>
                        تصدير Excel
                    </button>
                </div>
            </div>

            <div id="loading" class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                <p class="text-gray-600">جاري تحميل البيانات...</p>
            </div>

            <div id="tableContainer" class="hidden overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <tr>
                            <th class="px-4 py-3 text-right">#</th>
                            <th class="px-4 py-3 text-right">الاسم الكامل</th>
                            <th class="px-4 py-3 text-right">الهاتف</th>
                            <th class="px-4 py-3 text-right">البريد الإلكتروني</th>
                            <th class="px-4 py-3 text-right">نوع التوظيف</th>
                            <th class="px-4 py-3 text-right">الراتب الشهري</th>
                            <th class="px-4 py-3 text-right">الالتزامات الشهرية</th>
                            <th class="px-4 py-3 text-right">الموظف المخصص</th>
                        </tr>
                    </thead>
                    <tbody id="reportTable" class="divide-y divide-gray-200"></tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        let reportData = [];
        const authToken = localStorage.getItem('authToken');
        
        async function loadReport() {
            try {
                const response = await axios.get('/api/customers', {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });
                
                if (response.data.success) {
                    reportData = response.data.data || [];
                    displayReport();
                }
            } catch (error) {
                console.error('Error loading report:', error);
                alert('حدث خطأ في تحميل التقرير');
            } finally {
                document.getElementById('loading').classList.add('hidden');
            }
        }
        
        function displayReport() {
            document.getElementById('totalCustomers').textContent = reportData.length;
            document.getElementById('reportDate').textContent = new Date().toLocaleDateString('ar-SA');
            document.getElementById('tableContainer').classList.remove('hidden');
            
            const tbody = document.getElementById('reportTable');
            tbody.innerHTML = reportData.map((customer, index) => \`
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3">\${index + 1}</td>
                    <td class="px-4 py-3 font-medium">\${customer.full_name}</td>
                    <td class="px-4 py-3">\${customer.phone}</td>
                    <td class="px-4 py-3">\${customer.email || '-'}</td>
                    <td class="px-4 py-3">\${customer.employment_type || '-'}</td>
                    <td class="px-4 py-3">\${(customer.monthly_salary || 0).toLocaleString('ar-SA')} ريال</td>
                    <td class="px-4 py-3">\${(customer.monthly_obligations || 0).toLocaleString('ar-SA')} ريال</td>
                    <td class="px-4 py-3">\${customer.assigned_employee_name || 'غير محدد'}</td>
                </tr>
            \`).join('');
        }
        
        function searchTable() {
            const searchValue = document.getElementById('searchInput').value.toLowerCase();
            const tbody = document.getElementById('reportTable');
            const rows = tbody.querySelectorAll('tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
        
        window.exportToExcel = function() {
            const ws = XLSX.utils.json_to_sheet(reportData.map(c => ({
                'الاسم': c.full_name,
                'الهاتف': c.phone,
                'البريد': c.email,
                'نوع التوظيف': c.employment_type,
                'الراتب': c.monthly_salary,
                'الالتزامات': c.monthly_obligations,
                'الموظف المخصص': c.assigned_employee_name
            })));
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'العملاء');
            XLSX.writeFile(wb, 'تقرير_العملاء_' + new Date().toISOString().split('T')[0] + '.xlsx');
        }
        
        document.addEventListener('DOMContentLoaded', loadReport);
    <\/script>
</body>
</html>`,lt=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تقرير طلبات التمويل</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"><\/script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"><\/script>
    <style>
        /* Custom Scrollbar - Enhanced */
        .overflow-x-auto {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #22c55e #f7fafc;
        }
        
        .overflow-x-auto::-webkit-scrollbar {
            height: 12px;
            width: 12px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 10px;
            margin: 0 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
            border-radius: 10px;
            border: 2px solid #e5e7eb;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #16a34a 0%, #15803d 100%);
            border-color: #d1d5db;
        }
        
        /* Force scrollbar to always show */
        .overflow-x-auto {
            overflow-x: scroll !important; /* Always show scrollbar */
        }
        
        .overflow-x-auto table {
            min-width: 1200px; /* Force table to be wide enough for scrollbar */
            width: max-content;
        }
        
        ${ie()}
    </style>
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto p-6">
        <div class="mb-6 flex items-center justify-between">
            <a href="/admin/reports" class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-arrow-right ml-2"></i>
                العودة للتقارير
            </a>
            <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-file-invoice text-green-600 ml-2"></i>
                تقرير طلبات التمويل
            </h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="text-gray-600 text-sm">إجمالي الطلبات</div>
                <div class="text-3xl font-bold text-blue-600" id="totalRequests">0</div>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="text-gray-600 text-sm">قيد المراجعة</div>
                <div class="text-3xl font-bold text-yellow-600" id="pendingRequests">0</div>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="text-gray-600 text-sm">مقبول</div>
                <div class="text-3xl font-bold text-green-600" id="approvedRequests">0</div>
            </div>
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="text-gray-600 text-sm">مرفوض</div>
                <div class="text-3xl font-bold text-red-600" id="rejectedRequests">0</div>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <canvas id="requestsChart" height="100"></canvas>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <h2 class="text-xl font-bold">تفاصيل الطلبات</h2>
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <input 
                            type="text" 
                            id="searchInputRequests" 
                            placeholder="بحث في الطلبات..." 
                            class="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            onkeyup="searchRequestsTable()"
                        />
                        <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                    </div>
                    <button onclick="exportToExcel()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold whitespace-nowrap">
                        <i class="fas fa-file-excel ml-2"></i>
                        تصدير Excel
                    </button>
                </div>
            </div>

            <div id="loading" class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl text-green-600 mb-4"></i>
                <p class="text-gray-600">جاري تحميل البيانات...</p>
            </div>

            <div id="tableContainer" class="hidden overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gradient-to-r from-green-600 to-green-700 text-white">
                        <tr>
                            <th class="px-4 py-3 text-right">رقم الطلب</th>
                            <th class="px-4 py-3 text-right">اسم العميل</th>
                            <th class="px-4 py-3 text-right">البنك</th>
                            <th class="px-4 py-3 text-right">المبلغ المطلوب</th>
                            <th class="px-4 py-3 text-right">الحالة</th>
                            <th class="px-4 py-3 text-right">التاريخ</th>
                        </tr>
                    </thead>
                    <tbody id="reportTable" class="divide-y divide-gray-200"></tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        let reportData = [];
        const authToken = localStorage.getItem('authToken');
        
        async function loadReport() {
            try {
                const response = await axios.get('/api/financing-requests', {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });
                
                if (response.data.success) {
                    reportData = response.data.data || [];
                    displayReport();
                    displayChart();
                }
            } catch (error) {
                console.error('Error loading report:', error);
                alert('حدث خطأ في تحميل التقرير');
            } finally {
                document.getElementById('loading').classList.add('hidden');
            }
        }
        
        function displayReport() {
            const stats = {
                total: reportData.length,
                pending: reportData.filter(r => r.status === 'pending').length,
                approved: reportData.filter(r => r.status === 'approved' || r.status === 'approved_internal' || r.status === 'approved_external').length,
                rejected: reportData.filter(r => r.status === 'rejected').length
            };
            
            document.getElementById('totalRequests').textContent = stats.total;
            document.getElementById('pendingRequests').textContent = stats.pending;
            document.getElementById('approvedRequests').textContent = stats.approved;
            document.getElementById('rejectedRequests').textContent = stats.rejected;
            document.getElementById('tableContainer').classList.remove('hidden');
            
            const tbody = document.getElementById('reportTable');
            tbody.innerHTML = reportData.map(req => {
                const statusColors = {
                    'pending': 'bg-yellow-100 text-yellow-800',
                    'approved': 'bg-green-100 text-green-800',
                    'approved_internal': 'bg-green-100 text-green-800',
                    'approved_external': 'bg-green-100 text-green-800',
                    'rejected': 'bg-red-100 text-red-800'
                };
                const statusText = {
                    'pending': 'قيد المراجعة',
                    'approved': 'مقبول',
                    'approved_internal': 'مقبول (داخلي)',
                    'approved_external': 'مقبول (خارجي)',
                    'rejected': 'مرفوض'
                };
                
                return \`
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3">#\${req.id}</td>
                        <td class="px-4 py-3 font-medium">\${req.customer_name || '-'}</td>
                        <td class="px-4 py-3">\${req.bank_name || '-'}</td>
                        <td class="px-4 py-3">\${(req.requested_amount || 0).toLocaleString('ar-SA')} ريال</td>
                        <td class="px-4 py-3">
                            <span class="px-2 py-1 text-xs rounded-full \${statusColors[req.status] || 'bg-gray-100 text-gray-800'}">
                                \${statusText[req.status] || req.status}
                            </span>
                        </td>
                        <td class="px-4 py-3">\${new Date(req.created_at).toLocaleDateString('ar-SA')}</td>
                    </tr>
                \`;
            }).join('');
        }
        
        function displayChart() {
            const stats = {
                pending: reportData.filter(r => r.status === 'pending').length,
                approved: reportData.filter(r => r.status === 'approved' || r.status === 'approved_internal' || r.status === 'approved_external').length,
                rejected: reportData.filter(r => r.status === 'rejected').length
            };
            
            const ctx = document.getElementById('requestsChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['قيد المراجعة', 'مقبول', 'مرفوض'],
                    datasets: [{
                        label: 'عدد الطلبات',
                        data: [stats.pending, stats.approved, stats.rejected],
                        backgroundColor: ['#eab308', '#22c55e', '#ef4444']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }
        
        function searchRequestsTable() {
            const searchValue = document.getElementById('searchInputRequests').value.toLowerCase();
            const tbody = document.getElementById('reportTable');
            const rows = tbody.querySelectorAll('tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
        
        window.exportToExcel = function() {
            const ws = XLSX.utils.json_to_sheet(reportData.map(r => ({
                'رقم الطلب': r.id,
                'العميل': r.customer_name,
                'البنك': r.bank_name,
                'المبلغ': r.requested_amount,
                'الحالة': r.status,
                'التاريخ': r.created_at
            })));
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'الطلبات');
            XLSX.writeFile(wb, 'تقرير_الطلبات_' + new Date().toISOString().split('T')[0] + '.xlsx');
        }
        
        document.addEventListener('DOMContentLoaded', loadReport);
    <\/script>
</body>
</html>`,ot=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>التقرير المالي</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"><\/script>
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto p-6">
        <div class="mb-6 flex items-center justify-between">
            <a href="/admin/reports" class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-arrow-right ml-2"></i>
                العودة للتقارير
            </a>
            <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-dollar-sign text-yellow-600 ml-2"></i>
                التقرير المالي
            </h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">إجمالي المبالغ المطلوبة</div>
                <div class="text-3xl font-bold mt-2" id="totalAmount">0 ريال</div>
            </div>
            <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">المبالغ الموافق عليها</div>
                <div class="text-3xl font-bold mt-2" id="approvedAmount">0 ريال</div>
            </div>
            <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">إجمالي العمولات المدفوعة</div>
                <div class="text-3xl font-bold mt-2" id="commissionsAmount">0 ريال</div>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <canvas id="financialChart" height="100"></canvas>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold mb-4">متوسط المبالغ</h3>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-gray-600">متوسط المبلغ المطلوب:</span>
                        <span class="font-bold" id="avgRequested">0 ريال</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">متوسط المبلغ الموافق عليه:</span>
                        <span class="font-bold text-green-600" id="avgApproved">0 ريال</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold mb-4">معدل القبول</h3>
                <div class="text-center">
                    <div class="text-5xl font-bold text-green-600" id="approvalRate">0%</div>
                    <div class="text-gray-600 mt-2">من إجمالي الطلبات</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const authToken = localStorage.getItem('authToken');
        
        async function loadReport() {
            try {
                const [requestsRes, paymentsRes] = await Promise.all([
                    axios.get('/api/financing-requests', {
                        headers: { 'Authorization': 'Bearer ' + authToken }
                    }),
                    axios.get('/api/payments', {
                        headers: { 'Authorization': 'Bearer ' + authToken }
                    }).catch(() => ({ data: { data: [] } }))
                ]);
                
                const requests = requestsRes.data.data || [];
                const payments = paymentsRes.data.data || [];
                
                const totalAmount = requests.reduce((sum, r) => sum + (r.requested_amount || 0), 0);
                const approvedAmount = requests
                    .filter(r => r.status === 'approved' || r.status === 'approved_internal' || r.status === 'approved_external')
                    .reduce((sum, r) => sum + (r.requested_amount || 0), 0);
                const commissionsAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
                
                const approvedCount = requests.filter(r => r.status === 'approved' || r.status === 'approved_internal' || r.status === 'approved_external').length;
                const approvalRate = requests.length > 0 ? ((approvedCount / requests.length) * 100).toFixed(1) : 0;
                
                document.getElementById('totalAmount').textContent = totalAmount.toLocaleString('ar-SA') + ' ريال';
                document.getElementById('approvedAmount').textContent = approvedAmount.toLocaleString('ar-SA') + ' ريال';
                document.getElementById('commissionsAmount').textContent = commissionsAmount.toLocaleString('ar-SA') + ' ريال';
                document.getElementById('avgRequested').textContent = (requests.length > 0 ? (totalAmount / requests.length) : 0).toLocaleString('ar-SA') + ' ريال';
                document.getElementById('avgApproved').textContent = (approvedCount > 0 ? (approvedAmount / approvedCount) : 0).toLocaleString('ar-SA') + ' ريال';
                document.getElementById('approvalRate').textContent = approvalRate + '%';
                
                displayChart(totalAmount, approvedAmount, commissionsAmount);
            } catch (error) {
                console.error('Error loading report:', error);
            }
        }
        
        function displayChart(total, approved, commissions) {
            const ctx = document.getElementById('financialChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['المبالغ المطلوبة', 'الموافق عليها', 'العمولات المدفوعة'],
                    datasets: [{
                        data: [total, approved, commissions],
                        backgroundColor: ['#3b82f6', '#22c55e', '#eab308']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
        
        document.addEventListener('DOMContentLoaded', loadReport);
    <\/script>
</body>
</html>`,nt=()=>`
  @media (max-width: 768px) {
    .max-w-7xl { padding-left: 1rem !important; padding-right: 1rem !important; }
    h1 { font-size: 1.5rem !important; }
    table { font-size: 0.875rem !important; }
    table th, table td { padding: 0.5rem !important; }
    .hide-on-mobile { display: none !important; }
    button { font-size: 0.875rem !important; padding: 0.5rem 1rem !important; }
    .bg-white.rounded-xl { padding: 1rem !important; }
    .flex.justify-between { flex-wrap: wrap; gap: 1rem; }
    input[type="text"] { width: 100% !important; }
    .grid { grid-template-columns: 1fr !important; }
    .p-6 { padding: 1rem !important; }
    .overflow-x-auto { 
      padding-bottom: 1.5rem !important;
      position: relative !important;
    }
    
    /* Enhanced Mobile Scrollbar */
    .overflow-x-auto::-webkit-scrollbar {
      height: 14px !important;
      -webkit-appearance: none;
    }
    .overflow-x-auto::-webkit-scrollbar-track {
      background: #f1f5f9 !important;
      border-radius: 8px !important;
      border: 2px solid #e2e8f0 !important;
    }
    .overflow-x-auto::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #10b981 0%, #059669 100%) !important;
      border-radius: 8px !important;
      border: 2px solid #e2e8f0 !important;
      min-width: 50px !important;
    }
    .overflow-x-auto {
      overflow-x: scroll !important;
      -webkit-overflow-scrolling: touch !important;
      scrollbar-width: auto !important;
      scrollbar-color: #10b981 #f1f5f9 !important;
    }
  }
  @media (max-width: 480px) {
    h1 { font-size: 1.25rem !important; }
    table { font-size: 0.75rem !important; }
    .overflow-x-auto::-webkit-scrollbar { height: 16px !important; }
    .overflow-x-auto::-webkit-scrollbar-thumb { min-width: 60px !important; }
  }
`,it=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سندات القبض - المدفوعات</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"><\/script>
    <style>
        /* Custom Scrollbar - Enhanced */
        .overflow-x-auto {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #10b981 #f7fafc;
        }
        
        .overflow-x-auto::-webkit-scrollbar {
            height: 12px;
            width: 12px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 10px;
            margin: 0 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #10b981 0%, #059669 100%);
            border-radius: 10px;
            border: 2px solid #e5e7eb;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #059669 0%, #047857 100%);
            border-color: #d1d5db;
        }
        
        /* Force scrollbar to always show */
        .overflow-x-auto {
            overflow-x: scroll !important; /* Always show scrollbar */
        }
        
        .overflow-x-auto table {
            min-width: 1200px; /* Force table to be wide enough for scrollbar */
            width: max-content;
        }
        
        ${nt()}
    </style>
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto p-6">
        <div class="mb-6 flex items-center justify-between">
            <a href="/admin/panel" class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-arrow-right ml-2"></i>
                العودة للوحة التحكم
            </a>
            <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-receipt text-green-600 ml-2"></i>
                سندات القبض - العمولات
            </h1>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">إجمالي المدفوعات</div>
                <div class="text-3xl font-bold mt-2" id="totalPayments">0</div>
            </div>
            <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">إجمالي العمولات</div>
                <div class="text-3xl font-bold mt-2" id="totalAmount">0 ريال</div>
            </div>
            <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">طلبات مقبولة غير مدفوعة</div>
                <div class="text-3xl font-bold mt-2" id="unpaidRequests">0</div>
            </div>
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
                <div class="text-sm opacity-90">هذا الشهر</div>
                <div class="text-3xl font-bold mt-2" id="thisMonthAmount">0 ريال</div>
            </div>
        </div>

        <!-- Add Payment Button -->
        <div class="mb-6">
            <button onclick="openAddPaymentModal()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all">
                <i class="fas fa-plus ml-2"></i>
                إضافة سند قبض جديد
            </button>
            <button onclick="exportToExcel()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all mr-2">
                <i class="fas fa-file-excel ml-2"></i>
                تصدير Excel
            </button>
        </div>

        <!-- Payments Table -->
        <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-4 gap-4 flex-wrap">
                <h2 class="text-xl font-bold">سجل المدفوعات</h2>
                <div class="relative">
                    <input 
                        type="text" 
                        id="searchPayments" 
                        placeholder="بحث في المدفوعات..." 
                        class="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        onkeyup="searchPaymentsTable()"
                    />
                    <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                </div>
            </div>
            
            <div id="loading" class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl text-green-600 mb-4"></i>
                <p class="text-gray-600">جاري تحميل البيانات...</p>
            </div>

            <div id="tableContainer" class="hidden overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gradient-to-r from-green-600 to-green-700 text-white">
                        <tr>
                            <th class="px-4 py-3 text-right">رقم السند</th>
                            <th class="px-4 py-3 text-right">التاريخ</th>
                            <th class="px-4 py-3 text-right">اسم العميل</th>
                            <th class="px-4 py-3 text-right">الموظف المخصص</th>
                            <th class="px-4 py-3 text-right">المبلغ</th>
                            <th class="px-4 py-3 text-right">طريقة الدفع</th>
                            <th class="px-4 py-3 text-right">ملاحظات</th>
                            <th class="px-4 py-3 text-right">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody id="paymentsTable" class="divide-y divide-gray-200"></tbody>
                </table>
            </div>

            <div id="emptyState" class="hidden text-center py-12">
                <i class="fas fa-inbox text-gray-300 text-6xl mb-4"></i>
                <p class="text-gray-500 text-xl">لا توجد مدفوعات مسجلة</p>
            </div>
        </div>
    </div>

    <!-- Add Payment Modal -->
    <div id="addPaymentModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    <i class="fas fa-receipt text-green-600 ml-2"></i>
                    سند قبض جديد
                </h2>
                <button onclick="closeAddPaymentModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>

            <form id="paymentForm" class="space-y-4">
                <!-- Approved Request Selection -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-file-invoice ml-1 text-blue-600"></i>
                        الطلب المقبول <span class="text-red-600">*</span>
                    </label>
                    <select id="requestSelect" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option value="">اختر الطلب المقبول...</option>
                    </select>
                </div>

                <!-- Customer Info Display -->
                <div id="customerInfo" class="hidden bg-blue-50 p-4 rounded-lg space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600">اسم العميل:</span>
                        <span class="font-bold" id="customerName">-</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">الموظف المخصص:</span>
                        <span class="font-bold" id="employeeName">-</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">مبلغ التمويل:</span>
                        <span class="font-bold text-green-600" id="financingAmount">-</span>
                    </div>
                </div>

                <!-- Payment Amount -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-dollar-sign ml-1 text-green-600"></i>
                        مبلغ العمولة (ريال) <span class="text-red-600">*</span>
                    </label>
                    <input type="number" id="amount" required min="0" step="0.01" 
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                           placeholder="أدخل مبلغ العمولة">
                </div>

                <!-- Payment Date -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-calendar ml-1 text-purple-600"></i>
                        تاريخ الدفع <span class="text-red-600">*</span>
                    </label>
                    <input type="date" id="paymentDate" required 
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                </div>

                <!-- Payment Method -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-money-bill-wave ml-1 text-yellow-600"></i>
                        طريقة الدفع
                    </label>
                    <select id="paymentMethod" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option value="cash">نقداً</option>
                        <option value="bank_transfer">تحويل بنكي</option>
                        <option value="check">شيك</option>
                        <option value="online">دفع إلكتروني</option>
                    </select>
                </div>

                <!-- Receipt Number -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-hashtag ml-1 text-indigo-600"></i>
                        رقم السند (اختياري)
                    </label>
                    <input type="text" id="receiptNumber" 
                           class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                           placeholder="رقم السند أو المرجع">
                </div>

                <!-- Notes -->
                <div>
                    <label class="block text-gray-700 font-bold mb-2">
                        <i class="fas fa-sticky-note ml-1 text-orange-600"></i>
                        ملاحظات (اختياري)
                    </label>
                    <textarea id="notes" rows="3" 
                              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="أي ملاحظات إضافية..."></textarea>
                </div>

                <!-- Submit Button -->
                <div class="flex gap-3 pt-4">
                    <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-save ml-2"></i>
                        حفظ السند
                    </button>
                    <button type="button" onclick="closeAddPaymentModal()" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-times ml-2"></i>
                        إلغاء
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        let paymentsData = [];
        let approvedRequests = [];
        const authToken = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');

        // Load all data
        async function loadData() {
            try {
                const [paymentsRes, requestsRes] = await Promise.all([
                    axios.get('/api/payments', {
                        headers: { 'Authorization': 'Bearer ' + authToken }
                    }),
                    axios.get('/api/financing-requests', {
                        headers: { 'Authorization': 'Bearer ' + authToken }
                    })
                ]);

                paymentsData = paymentsRes.data.data || [];
                const allRequests = requestsRes.data.data || [];
                
                // Filter approved requests that don't have payments yet
                const paidRequestIds = paymentsData.map(p => p.financing_request_id);
                approvedRequests = allRequests.filter(r => 
                    (r.status === 'approved' || r.status === 'approved_internal' || r.status === 'approved_external')
                    && !paidRequestIds.includes(r.id)
                );

                displayStats();
                displayPaymentsTable();
                populateRequestSelect();
            } catch (error) {
                console.error('Error loading data:', error);
                alert('حدث خطأ في تحميل البيانات');
            } finally {
                document.getElementById('loading').classList.add('hidden');
            }
        }

        function displayStats() {
            const totalAmount = paymentsData.reduce((sum, p) => sum + (p.amount || 0), 0);
            const thisMonth = new Date();
            const thisMonthPayments = paymentsData.filter(p => {
                const paymentDate = new Date(p.payment_date);
                return paymentDate.getMonth() === thisMonth.getMonth() && 
                       paymentDate.getFullYear() === thisMonth.getFullYear();
            });
            const thisMonthAmount = thisMonthPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

            document.getElementById('totalPayments').textContent = paymentsData.length;
            document.getElementById('totalAmount').textContent = totalAmount.toLocaleString('ar-SA') + ' ريال';
            document.getElementById('unpaidRequests').textContent = approvedRequests.length;
            document.getElementById('thisMonthAmount').textContent = thisMonthAmount.toLocaleString('ar-SA') + ' ريال';
        }

        function displayPaymentsTable() {
            const tbody = document.getElementById('paymentsTable');
            const tableContainer = document.getElementById('tableContainer');
            const emptyState = document.getElementById('emptyState');

            if (paymentsData.length === 0) {
                tableContainer.classList.add('hidden');
                emptyState.classList.remove('hidden');
                return;
            }

            tableContainer.classList.remove('hidden');
            emptyState.classList.add('hidden');

            tbody.innerHTML = paymentsData.map(payment => {
                const paymentMethods = {
                    'cash': 'نقداً',
                    'bank_transfer': 'تحويل بنكي',
                    'check': 'شيك',
                    'online': 'دفع إلكتروني'
                };

                return \`
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3 font-medium">\${payment.receipt_number || '#' + payment.id}</td>
                        <td class="px-4 py-3">\${new Date(payment.payment_date).toLocaleDateString('ar-SA')}</td>
                        <td class="px-4 py-3 font-medium text-blue-600">\${payment.customer_name || '-'}</td>
                        <td class="px-4 py-3">\${payment.employee_name || 'غير محدد'}</td>
                        <td class="px-4 py-3 font-bold text-green-600">\${(payment.amount || 0).toLocaleString('ar-SA')} ريال</td>
                        <td class="px-4 py-3">
                            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                \${paymentMethods[payment.payment_method] || payment.payment_method}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-600">\${payment.notes || '-'}</td>
                        <td class="px-4 py-3">
                            <button onclick="deletePayment(\${payment.id})" class="text-red-600 hover:text-red-800">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                \`;
            }).join('');
        }

        function populateRequestSelect() {
            const select = document.getElementById('requestSelect');
            select.innerHTML = '<option value="">اختر الطلب المقبول...</option>' + 
                approvedRequests.map(req => \`
                    <option value="\${req.id}" 
                            data-customer="\${req.customer_name || 'غير محدد'}"
                            data-employee="\${req.assigned_employee_name || 'غير محدد'}"
                            data-amount="\${req.requested_amount || 0}">
                        #\${req.id} - \${req.customer_name || 'غير محدد'} - \${(req.requested_amount || 0).toLocaleString('ar-SA')} ريال
                    </option>
                \`).join('');
        }

        // Modal functions
        window.openAddPaymentModal = function() {
            if (approvedRequests.length === 0) {
                alert('لا توجد طلبات مقبولة غير مدفوعة');
                return;
            }
            document.getElementById('addPaymentModal').classList.remove('hidden');
            document.getElementById('paymentDate').valueAsDate = new Date();
        }

        window.closeAddPaymentModal = function() {
            document.getElementById('addPaymentModal').classList.add('hidden');
            document.getElementById('paymentForm').reset();
            document.getElementById('customerInfo').classList.add('hidden');
        }

        // Request selection change
        document.getElementById('requestSelect').addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption.value) {
                document.getElementById('customerInfo').classList.remove('hidden');
                document.getElementById('customerName').textContent = selectedOption.dataset.customer;
                document.getElementById('employeeName').textContent = selectedOption.dataset.employee;
                document.getElementById('financingAmount').textContent = parseFloat(selectedOption.dataset.amount).toLocaleString('ar-SA') + ' ريال';
            } else {
                document.getElementById('customerInfo').classList.add('hidden');
            }
        });

        // Submit payment form
        document.getElementById('paymentForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const requestId = document.getElementById('requestSelect').value;
            const selectedRequest = approvedRequests.find(r => r.id == requestId);

            if (!selectedRequest) {
                alert('يجب اختيار طلب مقبول');
                return;
            }

            const paymentData = {
                financing_request_id: parseInt(requestId),
                customer_id: selectedRequest.customer_id,
                employee_id: selectedRequest.assigned_employee_id || null,
                amount: parseFloat(document.getElementById('amount').value),
                payment_date: document.getElementById('paymentDate').value,
                payment_method: document.getElementById('paymentMethod').value,
                receipt_number: document.getElementById('receiptNumber').value || null,
                notes: document.getElementById('notes').value || null
            };

            try {
                const response = await axios.post('/api/payments', paymentData, {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });

                if (response.data.success) {
                    alert('✅ تم حفظ سند القبض بنجاح');
                    closeAddPaymentModal();
                    window.location.reload();
                } else {
                    alert('خطأ: ' + (response.data.error || 'فشل حفظ السند'));
                }
            } catch (error) {
                console.error('Error saving payment:', error);
                alert('حدث خطأ في حفظ السند');
            }
        });

        // Delete payment
        window.deletePayment = async function(id) {
            if (!confirm('هل أنت متأكد من حذف هذا السند؟')) return;

            try {
                const response = await axios.delete(\`/api/payments/\${id}\`, {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });

                if (response.data.success) {
                    alert('✅ تم حذف السند بنجاح');
                    window.location.reload();
                } else {
                    alert('خطأ: ' + (response.data.error || 'فشل الحذف'));
                }
            } catch (error) {
                console.error('Error deleting payment:', error);
                alert('حدث خطأ في الحذف');
            }
        }

        // Export to Excel
        window.exportToExcel = function() {
            const ws = XLSX.utils.json_to_sheet(paymentsData.map(p => ({
                'رقم السند': p.receipt_number || p.id,
                'التاريخ': p.payment_date,
                'العميل': p.customer_name,
                'الموظف': p.employee_name,
                'المبلغ': p.amount,
                'طريقة الدفع': p.payment_method,
                'ملاحظات': p.notes
            })));
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'المدفوعات');
            XLSX.writeFile(wb, 'سندات_القبض_' + new Date().toISOString().split('T')[0] + '.xlsx');
        }

        function searchPaymentsTable() {
            const searchValue = document.getElementById('searchPayments').value.toLowerCase();
            const tbody = document.getElementById('paymentsTable');
            const rows = tbody.querySelectorAll('tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        document.addEventListener('DOMContentLoaded', loadData);
    <\/script>
</body>
</html>`,dt=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إدارة البنوك - نظام حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold flex items-center">
                    <i class="fas fa-university ml-3"></i>
                    إدارة البنوك
                </h1>
                <a href="/admin/panel" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة للوحة التحكم
                </a>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto p-6">
        <!-- Action Bar -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex-1 w-full md:w-auto">
                    <div class="relative">
                        <input type="text" id="searchInput" placeholder="البحث عن بنك..." 
                            class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                        <i class="fas fa-search absolute right-3 top-4 text-gray-400"></i>
                    </div>
                </div>
                <button onclick="openAddBankModal()" class="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
                    <i class="fas fa-plus"></i>
                    <span>إضافة بنك جديد</span>
                </button>
            </div>
        </div>

        <!-- Banks Table -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
                        <tr>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">#</th>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">اسم البنك</th>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">رمز البنك</th>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">الحالة</th>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">نطاق البنك</th>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">تاريخ الإضافة</th>
                            <th class="px-6 py-4 text-right text-sm font-bold uppercase">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody id="banksTableBody" class="bg-white divide-y divide-gray-200">
                        <tr>
                            <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                                <i class="fas fa-spinner fa-spin text-4xl mb-2"></i>
                                <p>جاري تحميل البيانات...</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Add/Edit Bank Modal -->
    <div id="bankModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-6 py-4 flex items-center justify-between">
                <h2 class="text-xl font-bold flex items-center">
                    <i class="fas fa-university ml-2"></i>
                    <span id="modalTitle">إضافة بنك جديد</span>
                </h2>
                <button onclick="closeBankModal()" class="text-white hover:text-gray-200">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <form id="bankForm" class="p-6 space-y-6">
                <input type="hidden" id="bankId">
                
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">
                        <i class="fas fa-university text-yellow-600 ml-1"></i>
                        اسم البنك
                    </label>
                    <input type="text" id="bankName" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="مثال: مصرف الراجحي">
                </div>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">
                        <i class="fas fa-code text-yellow-600 ml-1"></i>
                        رمز البنك
                    </label>
                    <input type="text" id="bankCode" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="مثال: RAJ">
                </div>

                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">
                        <i class="fas fa-image text-yellow-600 ml-1"></i>
                        رابط الشعار (اختياري)
                    </label>
                    <input type="url" id="logoUrl"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="https://example.com/logo.png">
                </div>

                <div>
                    <label class="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" id="isActive" checked class="w-5 h-5 text-yellow-600 rounded focus:ring-yellow-500">
                        <span class="text-sm font-bold text-gray-700">
                            <i class="fas fa-check-circle text-green-600 ml-1"></i>
                            البنك نشط
                        </span>
                    </label>
                </div>

                <div class="bg-blue-50 border-r-4 border-blue-500 p-4 rounded">
                    <p class="text-sm text-blue-800">
                        <i class="fas fa-info-circle ml-1"></i>
                        <strong>ملاحظة:</strong> البنك سيكون خاصاً بشركتك فقط. يمكنك إدارة نسب التمويل الخاصة به من صفحة "نسب التمويل".
                    </p>
                </div>

                <div class="flex gap-3 pt-4">
                    <button type="submit" class="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-6 py-3 rounded-lg font-bold transition-all">
                        <i class="fas fa-save ml-2"></i>
                        حفظ البنك
                    </button>
                    <button type="button" onclick="closeBankModal()" class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all">
                        <i class="fas fa-times ml-2"></i>
                        إلغاء
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const authToken = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        let currentEditId = null;

        // Load banks on page load
        loadBanks();

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#banksTableBody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });

        // Load banks from API
        async function loadBanks() {
            try {
                const response = await axios.get('/api/banks', {
                    headers: authToken ? { 'Authorization': 'Bearer ' + authToken } : {}
                });

                const banks = response.data.data || [];
                const tbody = document.getElementById('banksTableBody');

                if (banks.length === 0) {
                    tbody.innerHTML = \`
                        <tr>
                            <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                                <i class="fas fa-university text-6xl text-gray-300 mb-4"></i>
                                <p class="text-lg font-bold">لا توجد بنوك</p>
                                <p class="text-sm">اضغط على "إضافة بنك جديد" للبدء</p>
                            </td>
                        </tr>
                    \`;
                    return;
                }

                tbody.innerHTML = banks.map((bank, index) => \`
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4 text-sm font-bold text-gray-900">\${index + 1}</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                \${bank.logo_url ? \`<img src="\${bank.logo_url}" class="w-8 h-8 rounded object-cover">\` : \`<i class="fas fa-university text-yellow-600 text-2xl"></i>\`}
                                <span class="text-sm font-bold text-gray-900">\${bank.bank_name}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-900 font-mono">\${bank.bank_code}</td>
                        <td class="px-6 py-4">
                            \${bank.is_active ? 
                                '<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold"><i class="fas fa-check-circle ml-1"></i>نشط</span>' : 
                                '<span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold"><i class="fas fa-times-circle ml-1"></i>غير نشط</span>'
                            }
                        </td>
                        <td class="px-6 py-4">
                            \${bank.tenant_id ? 
                                '<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold"><i class="fas fa-lock ml-1"></i>خاص بالشركة</span>' : 
                                '<span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold"><i class="fas fa-globe ml-1"></i>عام (متاح للجميع)</span>'
                            }
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">
                            \${bank.created_at ? new Date(bank.created_at).toLocaleDateString('ar-SA') : '-'}
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex gap-2">
                                \${bank.tenant_id ? \`
                                    <button onclick="editBank(\${bank.id})" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-bold transition-all">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteBank(\${bank.id})" class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-xs font-bold transition-all">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                \` : \`
                                    <span class="text-xs text-gray-500 italic">بنك عام (للقراءة فقط)</span>
                                \`}
                            </div>
                        </td>
                    </tr>
                \`).join('');

            } catch (error) {
                console.error('Error loading banks:', error);
                document.getElementById('banksTableBody').innerHTML = \`
                    <tr>
                        <td colspan="7" class="px-6 py-8 text-center text-red-500">
                            <i class="fas fa-exclamation-triangle text-4xl mb-2"></i>
                            <p>حدث خطأ أثناء تحميل البيانات</p>
                        </td>
                    </tr>
                \`;
            }
        }

        // Open add bank modal
        window.openAddBankModal = function() {
            currentEditId = null;
            document.getElementById('modalTitle').textContent = 'إضافة بنك جديد';
            document.getElementById('bankForm').reset();
            document.getElementById('bankId').value = '';
            document.getElementById('isActive').checked = true;
            document.getElementById('bankModal').classList.remove('hidden');
        }

        // Edit bank
        window.editBank = async function(id) {
            try {
                const response = await axios.get('/api/banks', {
                    headers: authToken ? { 'Authorization': 'Bearer ' + authToken } : {}
                });
                
                const bank = response.data.data.find(b => b.id === id);
                if (!bank) {
                    alert('❌ لم يتم العثور على البنك');
                    return;
                }

                currentEditId = id;
                document.getElementById('modalTitle').textContent = 'تعديل بنك';
                document.getElementById('bankId').value = id;
                document.getElementById('bankName').value = bank.bank_name;
                document.getElementById('bankCode').value = bank.bank_code;
                document.getElementById('logoUrl').value = bank.logo_url || '';
                document.getElementById('isActive').checked = bank.is_active;
                document.getElementById('bankModal').classList.remove('hidden');
            } catch (error) {
                console.error('Error loading bank:', error);
                alert('❌ حدث خطأ أثناء تحميل بيانات البنك');
            }
        }

        // Close modal
        window.closeBankModal = function() {
            document.getElementById('bankModal').classList.add('hidden');
            currentEditId = null;
        }

        // Submit form
        document.getElementById('bankForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const bankData = {
                bank_name: document.getElementById('bankName').value,
                bank_code: document.getElementById('bankCode').value,
                logo_url: document.getElementById('logoUrl').value || null,
                is_active: document.getElementById('isActive').checked ? 1 : 0
            };

            try {
                const submitBtn = e.target.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الحفظ...';

                if (currentEditId) {
                    await axios.put(\`/api/banks/\${currentEditId}\`, bankData, {
                        headers: { 'Authorization': 'Bearer ' + authToken }
                    });
                } else {
                    await axios.post('/api/banks', bankData, {
                        headers: { 'Authorization': 'Bearer ' + authToken }
                    });
                }

                closeBankModal();
                loadBanks();
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                successMsg.innerHTML = '<i class="fas fa-check-circle ml-2"></i>تم حفظ البنك بنجاح';
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);

            } catch (error) {
                console.error('Error saving bank:', error);
                alert('❌ حدث خطأ أثناء حفظ البنك: ' + (error.response?.data?.error || error.message));
            } finally {
                const submitBtn = e.target.querySelector('button[type="submit"]');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-save ml-2"></i>حفظ البنك';
            }
        });

        // Delete bank
        window.deleteBank = async function(id) {
            if (!confirm('هل أنت متأكد من حذف هذا البنك؟\\n\\nتنبيه: سيتم حذف جميع نسب التمويل المرتبطة بهذا البنك أيضاً!')) {
                return;
            }

            try {
                await axios.delete(\`/api/banks/\${id}\`, {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });

                loadBanks();

                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                successMsg.innerHTML = '<i class="fas fa-check-circle ml-2"></i>تم حذف البنك بنجاح';
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);

            } catch (error) {
                console.error('Error deleting bank:', error);
                alert('❌ حدث خطأ أثناء حذف البنك: ' + (error.response?.data?.error || error.message));
            }
        }
    <\/script>
</body>
</html>
`,de=()=>`
  @media (max-width: 768px) {
    .max-w-3xl { padding-left: 1rem !important; padding-right: 1rem !important; }
    h1 { font-size: 1.5rem !important; }
    h2 { font-size: 1.25rem !important; }
    .bg-white.rounded-xl { padding: 1rem !important; }
    .grid.grid-cols-2 { grid-template-columns: 1fr !important; }
    button { font-size: 0.875rem !important; padding: 0.5rem 1rem !important; }
    input, select, textarea { font-size: 1rem !important; }
    .p-6 { padding: 1rem !important; }
    .p-8 { padding: 1.5rem !important; }
    
    /* Tables in forms (if any) */
    .overflow-x-auto::-webkit-scrollbar {
      height: 14px !important;
    }
    .overflow-x-auto::-webkit-scrollbar-track {
      background: #f1f5f9 !important;
      border: 2px solid #e2e8f0 !important;
    }
    .overflow-x-auto::-webkit-scrollbar-thumb {
      background: #10b981 !important;
      border-radius: 8px !important;
      min-width: 50px !important;
    }
  }
  @media (max-width: 480px) {
    h1 { font-size: 1.25rem !important; }
    button { font-size: 0.75rem !important; }
    .overflow-x-auto::-webkit-scrollbar { height: 16px !important; }
  }
`;function ct(e,t,a){return`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>إضافة نسبة جديدة</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <style>
        ${de()}
      </style>
    </head>
    <body class="bg-gray-50">
      <div class="max-w-3xl mx-auto p-6">
        <div class="mb-6">
          <a href="/admin/rates?tenant_id=${e}" class="text-blue-600 hover:text-blue-800">
            <i class="fas fa-arrow-right ml-2"></i>
            العودة للنسب
          </a>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            <i class="fas fa-plus-circle text-green-600 ml-2"></i>
            إضافة نسبة تمويل جديدة
          </h1>
          
          <form id="addRateForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-university ml-1"></i>
                  البنك *
                </label>
                <select name="bank_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">اختر البنك</option>
                  ${t.map(s=>`<option value="${s.id}">${s.bank_name}</option>`).join("")}
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-tag ml-1"></i>
                  نوع التمويل *
                </label>
                <select name="financing_type_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">اختر نوع التمويل</option>
                  ${a.map(s=>`<option value="${s.id}">${s.type_name}</option>`).join("")}
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-percent ml-1"></i>
                  النسبة % *
                </label>
                <input type="number" name="rate" step="0.01" min="0" max="100" required 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 5.5">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-money-bill ml-1"></i>
                  الحد الأدنى للمبلغ (ريال)
                </label>
                <input type="number" name="min_amount" min="0" step="1000"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 10000">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-money-bill-wave ml-1"></i>
                  الحد الأقصى للمبلغ (ريال)
                </label>
                <input type="number" name="max_amount" min="0" step="1000"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 500000">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar ml-1"></i>
                  الحد الأدنى للمدة (شهر)
                </label>
                <input type="number" name="min_duration" min="1" max="360"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 12">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar-alt ml-1"></i>
                  الحد الأقصى للمدة (شهر)
                </label>
                <input type="number" name="max_duration" min="1" max="360"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="مثال: 60">
              </div>
            </div>
            
            <div class="flex gap-4 mt-8">
              <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md">
                <i class="fas fa-check ml-2"></i>
                حفظ النسبة
              </button>
              <a href="/admin/rates?tenant_id=${e}" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md text-center">
                <i class="fas fa-times ml-2"></i>
                إلغاء
              </a>
            </div>
          </form>
        </div>
      </div>
      
      <script>
        document.getElementById('addRateForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = new FormData(e.target);
          const data = {
            bank_id: parseInt(formData.get('bank_id')),
            financing_type_id: parseInt(formData.get('financing_type_id')),
            rate: parseFloat(formData.get('rate')),
            min_amount: formData.get('min_amount') ? parseFloat(formData.get('min_amount')) : null,
            max_amount: formData.get('max_amount') ? parseFloat(formData.get('max_amount')) : null,
            min_duration: formData.get('min_duration') ? parseInt(formData.get('min_duration')) : null,
            max_duration: formData.get('max_duration') ? parseInt(formData.get('max_duration')) : null,
            tenant_id: ${e}
          };
          
          try {
            const response = await fetch('/api/rates', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
              alert('✅ تم إضافة النسبة بنجاح!');
              window.location.href = '/admin/rates?tenant_id=${e}';
            } else {
              alert('❌ خطأ: ' + result.message);
            }
          } catch (error) {
            alert('❌ حدث خطأ: ' + error.message);
          }
        });
      <\/script>
    </body>
    </html>
  `}function pt(e,t,a,s){return`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>تعديل النسبة</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      <style>
        ${de()}
      </style>
    </head>
    <body class="bg-gray-50">
      <div class="max-w-3xl mx-auto p-6">
        <div class="mb-6">
          <a href="/admin/rates?tenant_id=${e}" class="text-blue-600 hover:text-blue-800">
            <i class="fas fa-arrow-right ml-2"></i>
            العودة للنسب
          </a>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            <i class="fas fa-edit text-blue-600 ml-2"></i>
            تعديل نسبة التمويل
          </h1>
          
          <form id="editRateForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-university ml-1"></i>
                  البنك *
                </label>
                <select name="bank_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">اختر البنك</option>
                  ${a.map(r=>`<option value="${r.id}" ${r.id==t.bank_id?"selected":""}>${r.bank_name}</option>`).join("")}
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-tag ml-1"></i>
                  نوع التمويل *
                </label>
                <select name="financing_type_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">اختر نوع التمويل</option>
                  ${s.map(r=>`<option value="${r.id}" ${r.id==t.financing_type_id?"selected":""}>${r.type_name}</option>`).join("")}
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-percent ml-1"></i>
                  النسبة % *
                </label>
                <input type="number" name="rate" step="0.01" min="0" max="100" required value="${t.rate}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-money-bill ml-1"></i>
                  الحد الأدنى للمبلغ (ريال)
                </label>
                <input type="number" name="min_amount" min="0" step="1000" value="${t.min_amount||""}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-money-bill-wave ml-1"></i>
                  الحد الأقصى للمبلغ (ريال)
                </label>
                <input type="number" name="max_amount" min="0" step="1000" value="${t.max_amount||""}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar ml-1"></i>
                  الحد الأدنى للمدة (شهر)
                </label>
                <input type="number" name="min_duration" min="1" max="360" value="${t.min_duration||""}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar-alt ml-1"></i>
                  الحد الأقصى للمدة (شهر)
                </label>
                <input type="number" name="max_duration" min="1" max="360" value="${t.max_duration||""}"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
            </div>
            
            <div class="flex gap-4 mt-8">
              <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md">
                <i class="fas fa-save ml-2"></i>
                حفظ التعديلات
              </button>
              <a href="/admin/rates?tenant_id=${e}" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md text-center">
                <i class="fas fa-times ml-2"></i>
                إلغاء
              </a>
            </div>
          </form>
        </div>
      </div>
      
      <script>
        document.getElementById('editRateForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = new FormData(e.target);
          const data = {
            bank_id: parseInt(formData.get('bank_id')),
            financing_type_id: parseInt(formData.get('financing_type_id')),
            rate: parseFloat(formData.get('rate')),
            min_amount: formData.get('min_amount') ? parseFloat(formData.get('min_amount')) : null,
            max_amount: formData.get('max_amount') ? parseFloat(formData.get('max_amount')) : null,
            min_duration: formData.get('min_duration') ? parseInt(formData.get('min_duration')) : null,
            max_duration: formData.get('max_duration') ? parseInt(formData.get('max_duration')) : null
          };
          
          try {
            const response = await fetch('/api/rates/${t.id}', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
              alert('✅ تم تحديث النسبة بنجاح!');
              window.location.href = '/admin/rates?tenant_id=${e}';
            } else {
              alert('❌ خطأ: ' + (result.message || 'حدث خطأ غير معروف'));
            }
          } catch (error) {
            console.error('Edit rate error:', error);
            alert('❌ حدث خطأ: ' + (error.message || 'فشل الاتصال بالخادم'));
          }
        });
      <\/script>
    </body>
    </html>
  `}function ut(e,t,a,s){const{transitions:r=[],actions:l=[],tasks:o=[]}=s,i=(n,d)=>{const p=new Date(n),m=new Date(d).getTime()-p.getTime(),b=Math.floor(m/(1e3*60*60)),g=Math.floor(b/24);return g>0?`${g} يوم`:`${b} ساعة`};return`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>مراحل الطلب - ${t.customer_name}</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    /* Timeline Styles */
    .timeline-container {
      position: relative;
      padding-right: 2rem;
    }
    
    .timeline-line {
      position: absolute;
      right: 0.75rem;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #10B981 0%, #3B82F6 50%, #8B5CF6 100%);
    }
    
    .timeline-item {
      position: relative;
      margin-bottom: 2rem;
      padding-right: 3rem;
    }
    
    .timeline-dot {
      position: absolute;
      right: -0.5rem;
      top: 0.5rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.875rem;
      box-shadow: 0 0 0 4px white, 0 0 0 6px currentColor;
      z-index: 10;
    }
    
    .timeline-dot.current {
      animation: pulse 2s infinite;
      box-shadow: 0 0 0 4px white, 0 0 0 6px currentColor, 0 0 20px currentColor;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    .stage-card {
      background: white;
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border-right: 4px solid;
      transition: all 0.3s;
    }
    
    .stage-card:hover {
      transform: translateX(-4px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .action-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
    
    .task-item {
      background: #F9FAFB;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
      border-right: 3px solid;
    }
    
    .task-item.pending {
      border-right-color: #F59E0B;
    }
    
    .task-item.completed {
      border-right-color: #10B981;
      opacity: 0.7;
    }
    
    @media print {
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body class="bg-gray-50">
  
  <!-- Header -->
  <div class="bg-gradient-to-l from-blue-600 to-purple-600 text-white py-6 no-print">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold mb-2">
            <i class="fas fa-route ml-2"></i>
            مراحل سير عمل الطلب
          </h1>
          <p class="text-blue-100">الطلب رقم: ${e} | العميل: ${t.customer_name}</p>
        </div>
        <div class="flex gap-2">
          <button onclick="window.print()" class="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            <i class="fas fa-print ml-2"></i>
            طباعة
          </button>
          <a href="/admin/requests/${e}/report" class="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
            <i class="fas fa-arrow-right ml-2"></i>
            العودة للتقرير
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Request Summary -->
  <div class="max-w-6xl mx-auto px-4 py-6">
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <div class="text-gray-500 text-sm mb-1">المبلغ المطلوب</div>
          <div class="text-2xl font-bold text-blue-600">${Number(t.requested_amount).toLocaleString()} ريال</div>
        </div>
        <div>
          <div class="text-gray-500 text-sm mb-1">المرحلة الحالية</div>
          <div class="text-lg font-bold" style="color: ${t.stage_color||"#3B82F6"}">
            <i class="fas ${t.stage_icon||"fa-circle"} ml-2"></i>
            ${t.stage_name_ar||"غير محدد"}
          </div>
        </div>
        <div>
          <div class="text-gray-500 text-sm mb-1">الحالة</div>
          <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
            ${t.status==="pending"?"bg-yellow-100 text-yellow-800":t.status==="approved"?"bg-green-100 text-green-800":t.status==="rejected"?"bg-red-100 text-red-800":"bg-gray-100 text-gray-800"}">
            ${t.status==="pending"?"قيد الانتظار":t.status==="approved"?"موافق عليه":t.status==="rejected"?"مرفوض":t.status}
          </div>
        </div>
        <div>
          <div class="text-gray-500 text-sm mb-1">تاريخ الطلب</div>
          <div class="text-lg font-bold text-gray-700">
            ${new Date(t.created_at).toLocaleDateString("ar-SA")}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Timeline -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">
        <i class="fas fa-timeline ml-2 text-blue-600"></i>
        المسار الزمني للطلب
      </h2>
      
      <div class="timeline-container">
        <div class="timeline-line"></div>
        
        ${r.length===0?`
          <div class="text-center py-12 text-gray-500">
            <i class="fas fa-inbox fa-3x mb-4 text-gray-300"></i>
            <p class="text-lg">لم يتم تسجيل أي مراحل بعد</p>
          </div>
        `:""}
        
        ${r.map((n,d)=>{const p=d===r.length-1,u=d>0?i(r[d-1].created_at,n.created_at):null,m=l.filter(g=>g.stage_id===n.to_stage_id),b=o.filter(g=>g.stage_id===n.to_stage_id);return`
            <div class="timeline-item">
              <div class="timeline-dot ${p?"current":""}" style="background-color: ${n.to_stage_color}">
                <i class="fas ${n.to_stage_icon}"></i>
              </div>
              
              <div class="stage-card" style="border-right-color: ${n.to_stage_color}">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-xl font-bold text-gray-800 mb-1">
                      ${d+1}. ${n.to_stage_name}
                    </h3>
                    <p class="text-sm text-gray-500">
                      <i class="fas fa-clock ml-1"></i>
                      ${new Date(n.created_at).toLocaleString("ar-SA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}
                    </p>
                  </div>
                  
                  ${u?`
                    <div class="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                      <i class="fas fa-hourglass-half ml-1"></i>
                      استغرق ${u}
                    </div>
                  `:""}
                </div>
                
                ${n.transitioned_by_name?`
                  <div class="text-sm text-gray-600 mb-3">
                    <i class="fas fa-user ml-1 text-gray-400"></i>
                    بواسطة: <span class="font-medium">${n.transitioned_by_name}</span>
                  </div>
                `:""}
                
                ${n.notes?`
                  <div class="bg-yellow-50 border-r-3 border-yellow-400 p-3 rounded mb-3">
                    <p class="text-sm text-gray-700">
                      <i class="fas fa-sticky-note ml-1 text-yellow-600"></i>
                      ${n.notes}
                    </p>
                  </div>
                `:""}
                
                ${m.length>0?`
                  <div class="mb-3">
                    <h4 class="text-sm font-bold text-gray-700 mb-2">
                      <i class="fas fa-tasks ml-1"></i>
                      الإجراءات المتخذة:
                    </h4>
                    ${m.map(g=>`
                      <div class="action-badge bg-green-50 text-green-700 border border-green-200">
                        <i class="fas fa-check-circle"></i>
                        <span>${g.action_data||g.action_type}</span>
                        ${g.performed_by_name?`<span class="text-xs text-green-600">- ${g.performed_by_name}</span>`:""}
                      </div>
                    `).join("")}
                  </div>
                `:""}
                
                ${b.length>0?`
                  <div>
                    <h4 class="text-sm font-bold text-gray-700 mb-2">
                      <i class="fas fa-list-check ml-1"></i>
                      المهام:
                    </h4>
                    ${b.map(g=>`
                      <div class="task-item ${g.status}">
                        <div class="flex justify-between items-start">
                          <div class="flex-1">
                            <div class="font-medium text-gray-800">${g.task_title}</div>
                            ${g.task_description?`<div class="text-sm text-gray-600 mt-1">${g.task_description}</div>`:""}
                            ${g.assigned_to_name?`
                              <div class="text-xs text-gray-500 mt-1">
                                <i class="fas fa-user ml-1"></i>
                                ${g.assigned_to_name}
                              </div>
                            `:""}
                          </div>
                          <div class="text-sm">
                            ${g.status==="completed"?`
                              <span class="text-green-600">
                                <i class="fas fa-check-circle ml-1"></i>
                                مكتمل
                              </span>
                            `:`
                              <span class="text-yellow-600">
                                <i class="fas fa-clock ml-1"></i>
                                معلق
                              </span>
                            `}
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="mt-6 flex gap-3 no-print">
      <button onclick="updateStage()" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        <i class="fas fa-arrow-left ml-2"></i>
        تحديث المرحلة
      </button>
      <button onclick="addAction()" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
        <i class="fas fa-plus ml-2"></i>
        إضافة إجراء
      </button>
      <button onclick="createTask()" class="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
        <i class="fas fa-tasks ml-2"></i>
        إنشاء مهمة
      </button>
    </div>
  </div>
  
  <script>
    const stages = ${JSON.stringify(a)};
    const currentRequestId = ${e};
    const currentStageId = ${t.current_stage_id||"null"};
    
    function updateStage() {
      // Create modal for stage selection
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      modal.innerHTML = \`
        <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
          <h3 class="text-xl font-bold mb-4">تحديث مرحلة الطلب</h3>
          <select id="newStageId" class="w-full border rounded-lg p-2 mb-3">
            \${stages.map(s => \`
              <option value="\${s.id}" \${s.id === currentStageId ? 'selected' : ''}>
                \${s.stage_name_ar}
              </option>
            \`).join('')}
          </select>
          <textarea id="stageNotes" placeholder="ملاحظات (اختياري)" class="w-full border rounded-lg p-2 mb-3" rows="3"></textarea>
          <div class="flex gap-2">
            <button onclick="confirmStageUpdate()" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">تحديث</button>
            <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">إلغاء</button>
          </div>
        </div>
      \`;
      document.body.appendChild(modal);
    }
    
    async function confirmStageUpdate() {
      const newStageId = document.getElementById('newStageId').value;
      const notes = document.getElementById('stageNotes').value;
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      const response = await fetch('/api/workflow/update-stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: currentRequestId,
          newStageId: parseInt(newStageId),
          notes: notes,
          userId: userData.id
        })
      });
      
      if (response.ok) {
        location.reload();
      }
    }
    
    function addAction() {
      // Similar modal for adding action
      alert('سيتم إضافة نموذج إضافة إجراء قريباً');
    }
    
    function createTask() {
      // Similar modal for creating task
      alert('سيتم إضافة نموذج إنشاء مهمة قريباً');
    }
  <\/script>
  
</body>
</html>
  `}const c=new le,k=()=>`
  /* Mobile Responsive Styles */
  @media (max-width: 768px) {
    /* Container adjustments */
    .max-w-7xl, .max-w-6xl, .max-w-5xl {
      padding-left: 1rem !important;
      padding-right: 1rem !important;
    }
    
    /* Headings */
    h1 {
      font-size: 1.5rem !important;
    }
    h2 {
      font-size: 1.25rem !important;
    }
    
    /* Tables */
    table {
      font-size: 0.875rem !important;
    }
    
    table th, table td {
      padding: 0.5rem !important;
    }
    
    /* Hide less important columns on mobile */
    .hide-on-mobile {
      display: none !important;
    }
    
    /* Buttons */
    button, .btn {
      font-size: 0.875rem !important;
      padding: 0.5rem 1rem !important;
    }
    
    /* Forms */
    input, select, textarea {
      font-size: 1rem !important;
    }
    
    /* Cards */
    .bg-white.rounded-xl, .bg-white.rounded-lg {
      padding: 1rem !important;
    }
    
    /* Flex wrap for header actions */
    .flex.justify-between {
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    /* Stack items vertically on mobile */
    .flex-wrap > * {
      width: 100%;
    }
    
    /* Search input full width */
    input[type="text"], input[type="search"] {
      width: 100% !important;
    }
    
    /* Modal adjustments */
    .fixed.inset-0 > div {
      margin: 1rem !important;
      max-height: 90vh !important;
      overflow-y: auto !important;
    }
    
    /* Sidebar adjustments */
    aside, .sidebar {
      width: 100% !important;
      position: fixed !important;
      z-index: 50 !important;
    }
    
    /* Grid adjustments */
    .grid {
      grid-template-columns: 1fr !important;
    }
    
    /* Reduce spacing */
    .p-6 {
      padding: 1rem !important;
    }
    
    .p-8 {
      padding: 1.5rem !important;
    }
    
    /* Table container */
    .overflow-x-auto {
      margin-left: -1rem !important;
      margin-right: -1rem !important;
      padding-left: 1rem !important;
      padding-right: 1rem !important;
      padding-bottom: 1.5rem !important; /* Space for scrollbar */
    }
    
    /* IMPORTANT: Force scrollbar to be ALWAYS VISIBLE on mobile */
    .overflow-x-auto::-webkit-scrollbar {
      height: 14px !important; /* Larger scrollbar for mobile */
      -webkit-appearance: none;
    }
    
    .overflow-x-auto::-webkit-scrollbar-track {
      background: #f1f5f9 !important; /* Light background */
      border-radius: 8px !important;
      border: 2px solid #e2e8f0 !important; /* Border to make it stand out */
    }
    
    .overflow-x-auto::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%) !important;
      border-radius: 8px !important;
      border: 2px solid #e2e8f0 !important;
      min-width: 50px !important; /* Minimum thumb width */
    }
    
    .overflow-x-auto::-webkit-scrollbar-thumb:active {
      background: linear-gradient(180deg, #1d4ed8 0%, #1e40af 100%) !important;
    }
    
    /* Force scrollbar to always show on mobile (iOS Safari & Chrome) */
    .overflow-x-auto {
      overflow-x: scroll !important; /* Always show scrollbar */
      -webkit-overflow-scrolling: touch !important; /* Smooth scrolling on iOS */
      scrollbar-width: auto !important; /* Firefox: show scrollbar */
      scrollbar-color: #3b82f6 #f1f5f9 !important; /* Firefox colors */
    }
    
    /* Add visual indicator for scrollable content */
    .overflow-x-auto::after {
      content: '← مرر للمزيد →' !important;
      position: absolute !important;
      bottom: 0 !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      background: rgba(59, 130, 246, 0.9) !important;
      color: white !important;
      padding: 0.25rem 1rem !important;
      border-radius: 1rem !important;
      font-size: 0.75rem !important;
      font-weight: bold !important;
      pointer-events: none !important;
      opacity: 0 !important;
      animation: fadeInOut 3s ease-in-out !important;
    }
    
    @keyframes fadeInOut {
      0%, 100% { opacity: 0; }
      10%, 90% { opacity: 1; }
    }
    
    /* Table wrapper positioning */
    .overflow-x-auto {
      position: relative !important;
    }
    
    /* Action buttons in table */
    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    /* Status badges */
    .badge, .status-badge {
      font-size: 0.75rem !important;
      padding: 0.25rem 0.5rem !important;
    }
  }
  
  @media (max-width: 480px) {
    /* Extra small screens */
    body {
      font-size: 14px !important;
    }
    
    h1 {
      font-size: 1.25rem !important;
    }
    
    table {
      font-size: 0.75rem !important;
    }
    
    button, .btn {
      font-size: 0.75rem !important;
      padding: 0.375rem 0.75rem !important;
    }
    
    /* Even larger scrollbar for very small screens */
    .overflow-x-auto::-webkit-scrollbar {
      height: 16px !important;
    }
    
    .overflow-x-auto::-webkit-scrollbar-thumb {
      min-width: 60px !important;
    }
  }
`;c.use("*",Je());async function mt(e){const a=(e.req.header("host")||"").split(".")[0],s=e.req.path.match(/^\/c\/([^\/]+)/),r=s?s[1]:null;let l=null;return a&&a!=="localhost"&&a!=="3000-ii8t2q2dzwwe7ckmslxss-3844e1b6"&&(l=await e.env.DB.prepare(`
      SELECT * FROM tenants 
      WHERE subdomain = ? AND status = 'active'
      LIMIT 1
    `).bind(a).first()),!l&&r&&(l=await e.env.DB.prepare(`
      SELECT * FROM tenants 
      WHERE slug = ? AND status = 'active'
      LIMIT 1
    `).bind(r).first()),l||(l=await e.env.DB.prepare(`
      SELECT * FROM tenants WHERE id = 1 LIMIT 1
    `).bind().first()),l}c.use("/c/:tenant/*",async(e,t)=>{const a=await mt(e);if(!a)return e.json({error:"Tenant not found",message:"الشركة غير موجودة أو غير نشطة"},404);e.set("tenant",a),e.set("tenantId",a.id),await t()});c.get("/api/tenants",async e=>{try{const{results:t}=await e.env.DB.prepare(`
      SELECT * FROM tenants ORDER BY created_at DESC
    `).all();return e.json({success:!0,data:t})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/tenants",async e=>{try{const t=await e.req.json();if(!t.company_name||!t.slug)return e.json({success:!1,error:"اسم الشركة والـ Slug مطلوبان"},400);if(await e.env.DB.prepare(`
      SELECT id FROM tenants WHERE slug = ?
    `).bind(t.slug).first())return e.json({success:!1,error:"الـ Slug موجود بالفعل"},400);const s=await e.env.DB.prepare(`
      INSERT INTO tenants (
        company_name, slug, subdomain, status, max_users, 
        max_customers, max_requests, contact_email, contact_phone,
        primary_color, secondary_color
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(t.company_name,t.slug,t.subdomain||t.slug,t.status||"active",t.max_users||10,t.max_customers||500,t.max_requests||2e3,t.contact_email||"",t.contact_phone||"",t.primary_color||"#667eea",t.secondary_color||"#764ba2").run();return e.json({success:!0,data:{id:s.meta.last_row_id,...t},message:"تم إنشاء الشركة بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/tenants/:id",async e=>{try{const t=e.req.param("id"),a=await e.req.json();return await e.env.DB.prepare(`
      SELECT id FROM tenants WHERE id = ?
    `).bind(t).first()?(await e.env.DB.prepare(`
      UPDATE tenants SET
        company_name = ?,
        slug = ?,
        subdomain = ?,
        status = ?,
        max_users = ?,
        max_customers = ?,
        max_requests = ?,
        contact_email = ?,
        contact_phone = ?,
        primary_color = ?,
        secondary_color = ?
      WHERE id = ?
    `).bind(a.company_name,a.slug,a.subdomain,a.status,a.max_users,a.max_customers,a.max_requests,a.contact_email,a.contact_phone,a.primary_color||"#667eea",a.secondary_color||"#764ba2",t).run(),e.json({success:!0,data:{id:t,...a},message:"تم تحديث الشركة بنجاح"})):e.json({success:!1,error:"الشركة غير موجودة"},404)}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/tenants/:id",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT COUNT(*) as count FROM users WHERE tenant_id = ?
    `).bind(t).first();return a&&a.count>0?e.json({success:!1,error:`لا يمكن حذف الشركة لأنها تحتوي على ${a.count} مستخدم/مستخدمين`},400):(await e.env.DB.prepare(`
      DELETE FROM tenants WHERE id = ?
    `).bind(t).run(),e.json({success:!0,message:"تم حذف الشركة بنجاح"}))}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/auth/login",async e=>{try{const{username:t,password:a}=await e.req.json(),s=await e.env.DB.prepare(`
      SELECT u.*, r.role_name, s.company_name, t.id as tenant_id, t.company_name as tenant_name, t.slug as tenant_slug
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN subscriptions s ON u.subscription_id = s.id
      LEFT JOIN tenants t ON u.tenant_id = t.id
      WHERE u.username = ? AND u.password = ? AND u.is_active = 1
    `).bind(t,a).first();if(!s)return e.json({success:!1,error:"اسم المستخدم أو كلمة المرور غير صحيحة"},401);await e.env.DB.prepare("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?").bind(s.id).run();const r=`${s.id}:${s.tenant_id||"null"}:${Date.now()}:${Math.random()}`,l=btoa(r);let o="/admin";return s.tenant_id&&s.tenant_slug?o=`/c/${s.tenant_slug}/admin`:s.user_type==="superadmin"&&(o="/admin"),e.json({success:!0,token:l,redirect:o,user:{id:s.id,username:s.username,full_name:s.full_name,email:s.email,role:s.role,role_name:s.role_name,user_type:s.user_type,company_name:s.company_name,subscription_id:s.subscription_id,tenant_id:s.tenant_id,tenant_name:s.tenant_name,tenant_slug:s.tenant_slug}})}catch(t){return e.json({success:!1,message:t.message},500)}});c.post("/api/auth/forgot-password",async e=>{try{const{email:t}=await e.req.json(),a=await e.env.DB.prepare(`
      SELECT id, email, username FROM users WHERE email = ? OR username = ?
    `).bind(t,t).first();if(!a)return e.json({success:!1,message:"البريد الإلكتروني أو اسم المستخدم غير موجود"},404);const s=Math.floor(1e5+Math.random()*9e5).toString(),r=new Date(Date.now()+900*1e3);return await e.env.DB.prepare(`
      INSERT INTO password_change_notifications (user_id, verification_code, expires_at, is_used)
      VALUES (?, ?, ?, 0)
    `).bind(a.id,s,r.toISOString()).run(),console.log(`Verification code for ${a.email}: ${s}`),e.json({success:!0,message:"تم إرسال رمز التحقق إلى بريدك الإلكتروني",devCode:s})}catch(t){return console.error("Forgot password error:",t),e.json({success:!1,message:"حدث خطأ. الرجاء المحاولة مرة أخرى."},500)}});c.post("/api/auth/verify-reset-code",async e=>{try{const{email:t,code:a}=await e.req.json(),s=await e.env.DB.prepare(`
      SELECT id FROM users WHERE email = ? OR username = ?
    `).bind(t,t).first();if(!s)return e.json({success:!1,message:"المستخدم غير موجود"},404);const r=await e.env.DB.prepare(`
      SELECT id, verification_code, expires_at, is_used
      FROM password_change_notifications
      WHERE user_id = ? AND is_used = 0
      ORDER BY created_at DESC
      LIMIT 1
    `).bind(s.id).first();if(!r)return e.json({success:!1,message:"لم يتم العثور على رمز التحقق"},404);if(new Date(r.expires_at)<new Date)return e.json({success:!1,message:"انتهت صلاحية رمز التحقق. الرجاء طلب رمز جديد."},400);if(r.verification_code!==a)return e.json({success:!1,message:"رمز التحقق غير صحيح"},400);const l=Math.random().toString(36).substring(2)+Date.now().toString(36);return e.json({success:!0,message:"تم التحقق بنجاح",token:l})}catch(t){return console.error("Verify code error:",t),e.json({success:!1,message:"حدث خطأ. الرجاء المحاولة مرة أخرى."},500)}});c.post("/api/auth/reset-password",async e=>{try{const{email:t,token:a,newPassword:s}=await e.req.json();if(!s||s.length<8)return e.json({success:!1,message:"كلمة السر يجب أن تكون 8 أحرف على الأقل"},400);const r=await e.env.DB.prepare(`
      SELECT id FROM users WHERE email = ? OR username = ?
    `).bind(t,t).first();return r?(await e.env.DB.prepare(`
      UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).bind(s,r.id).run(),await e.env.DB.prepare(`
      UPDATE password_change_notifications SET is_used = 1 WHERE user_id = ? AND is_used = 0
    `).bind(r.id).run(),e.json({success:!0,message:"تم تغيير كلمة السر بنجاح"})):e.json({success:!1,message:"المستخدم غير موجود"},404)}catch(t){return console.error("Reset password error:",t),e.json({success:!1,message:"حدث خطأ. الرجاء المحاولة مرة أخرى."},500)}});c.get("/api/banks",async e=>{try{const t=e.req.query("tenant_id");let a="SELECT * FROM banks",s;return t?(a+=" WHERE tenant_id = ? ORDER BY bank_name",s=(await e.env.DB.prepare(a).bind(parseInt(t)).all()).results):(a+=" ORDER BY bank_name",s=(await e.env.DB.prepare(a).all()).results),e.json({success:!0,data:s})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/admin/requests/:id/timeline",async e=>{const t=e.req.param("id"),a=await e.env.DB.prepare(`
    SELECT 
      fr.*,
      c.full_name as customer_name,
      c.phone as customer_phone,
      c.email as customer_email,
      c.created_at as customer_created_at,
      b.bank_name,
      ft.type_name as financing_type_name
    FROM financing_requests fr
    LEFT JOIN customers c ON fr.customer_id = c.id
    LEFT JOIN banks b ON fr.selected_bank_id = b.id
    LEFT JOIN financing_types ft ON fr.financing_type_id = ft.id
    WHERE fr.id = ?
  `).bind(t).first();if(!a)return e.text("الطلب غير موجود",404);const s=await e.env.DB.prepare(`
    SELECT * FROM financing_request_status_history 
    WHERE request_id = ? 
    ORDER BY created_at ASC
  `).bind(t).all();function r(p,u){const m=new Date(p),g=new Date(u).getTime()-m.getTime(),f=Math.floor(g/(1e3*60*60*24)),x=Math.floor(g%(1e3*60*60*24)/(1e3*60*60)),h=Math.floor(g%(1e3*60*60)/(1e3*60));return f>0?`${f} يوم و ${x} ساعة`:x>0?`${x} ساعة و ${h} دقيقة`:`${h} دقيقة`}function l(p){return new Date(p).toLocaleString("ar-SA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0})}const o=[];a.customer_created_at&&o.push({title:"📝 العميل أدخل بياناته في الحاسبة",datetime:l(a.customer_created_at),duration:"",icon:"📝",color:"#3b82f6"}),o.push({title:"📋 تم تقديم طلب التمويل الرسمي",datetime:l(a.created_at),duration:a.customer_created_at?r(a.customer_created_at,a.created_at):"",icon:"📋",color:"#8b5cf6"});let i=a.created_at;for(const p of s.results){const u=p.new_status==="pending"?"قيد الانتظار":p.new_status==="under_review"?"قيد المراجعة":p.new_status==="approved"?"✅ تمت الموافقة":p.new_status==="rejected"?"❌ تم الرفض":p.new_status,m=p.new_status==="pending"?"#f59e0b":p.new_status==="under_review"?"#3b82f6":p.new_status==="approved"?"#10b981":p.new_status==="rejected"?"#ef4444":"#6b7280";o.push({title:`تغيير الحالة إلى: ${u}`,datetime:l(p.created_at),duration:r(i,p.created_at),icon:"🔄",color:m}),i=p.created_at}const n=a.customer_created_at?r(a.customer_created_at,i):r(a.created_at,i),d=`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>الجدول الزمني - طلب رقم #${a.id}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          min-height: 100vh;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          font-size: 28px;
          margin-bottom: 10px;
        }
        .header p {
          font-size: 16px;
          opacity: 0.9;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          padding: 30px;
          background: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
        }
        .info-card {
          background: white;
          padding: 15px;
          border-radius: 10px;
          border-right: 4px solid #667eea;
        }
        .info-card label {
          display: block;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 5px;
          font-weight: 600;
        }
        .info-card span {
          display: block;
          font-size: 16px;
          color: #1e293b;
          font-weight: bold;
        }
        .timeline {
          padding: 40px 30px;
          position: relative;
        }
        .timeline::before {
          content: '';
          position: absolute;
          right: 40px;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #667eea, #764ba2);
        }
        .timeline-item {
          position: relative;
          padding-right: 80px;
          padding-bottom: 40px;
        }
        .timeline-item:last-child {
          padding-bottom: 0;
        }
        .timeline-icon {
          position: absolute;
          right: 25px;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          border: 4px solid;
          z-index: 1;
        }
        .timeline-content {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          border-right: 4px solid;
        }
        .timeline-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #1e293b;
        }
        .timeline-datetime {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 8px;
        }
        .timeline-duration {
          display: inline-block;
          background: #f1f5f9;
          color: #475569;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }
        .total-summary {
          margin: 30px;
          padding: 25px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(16,185,129,0.3);
        }
        .total-summary h2 {
          font-size: 22px;
          margin-bottom: 10px;
        }
        .total-summary .time {
          font-size: 32px;
          font-weight: bold;
        }
        .actions {
          padding: 30px;
          text-align: center;
          background: #f8fafc;
          border-top: 2px solid #e2e8f0;
        }
        .btn {
          display: inline-block;
          padding: 12px 30px;
          margin: 0 10px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
          font-size: 16px;
        }
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102,126,234,0.4);
        }
        .btn-secondary {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }
        .btn-secondary:hover {
          background: #667eea;
          color: white;
        }
        @media print {
          body { background: white; padding: 0; }
          .actions { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⏱️ الجدول الزمني التفصيلي</h1>
          <p>طلب التمويل رقم #${a.id}</p>
        </div>

        <div class="info-grid">
          <div class="info-card">
            <label>👤 اسم العميل</label>
            <span>${a.customer_name||"غير محدد"}</span>
          </div>
          <div class="info-card">
            <label>📱 رقم الجوال</label>
            <span>${a.customer_phone||"غير محدد"}</span>
          </div>
          <div class="info-card">
            <label>🏦 البنك</label>
            <span>${a.bank_name||"غير محدد"}</span>
          </div>
          <div class="info-card">
            <label>💰 المبلغ المطلوب</label>
            <span>${(a.requested_amount||0).toLocaleString("ar-SA")} ريال</span>
          </div>
          <div class="info-card">
            <label>📅 مدة التمويل</label>
            <span>${a.duration_months||0} شهر</span>
          </div>
          <div class="info-card">
            <label>🎯 نوع التمويل</label>
            <span>${a.financing_type_name||"غير محدد"}</span>
          </div>
        </div>

        <div class="timeline">
          ${o.map((p,u)=>`
            <div class="timeline-item">
              <div class="timeline-icon" style="border-color: ${p.color}; color: ${p.color};">
                ${p.icon}
              </div>
              <div class="timeline-content" style="border-right-color: ${p.color};">
                <div class="timeline-title">${p.title}</div>
                <div class="timeline-datetime">📅 ${p.datetime}</div>
                ${p.duration?`<span class="timeline-duration">⏱️ المدة: ${p.duration}</span>`:""}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="total-summary">
          <h2>⏰ إجمالي الوقت الكلي</h2>
          <div class="time">${n}</div>
          <p style="margin-top: 10px; opacity: 0.9;">من بداية إدخال البيانات حتى الحالة الحالية</p>
        </div>

        <div class="actions">
          <button onclick="window.print()" class="btn btn-primary">🖨️ طباعة التقرير</button>
          <a href="/admin/requests" class="btn btn-secondary">↩️ العودة للطلبات</a>
          <a href="/admin/requests/${a.id}/report" class="btn btn-secondary">📄 تقرير الطلب</a>
        </div>
      </div>
    </body>
    </html>
  `;return e.html(d)});c.post("/api/banks",async e=>{try{const t=await e.req.json(),{bank_name:a,bank_code:s,logo_url:r,is_active:l,tenant_id:o}=t;let i=o;if(!i){const p=e.req.header("Authorization")?.replace("Bearer ","");if(p){const m=atob(p).split(":");i=m[1]!=="null"?parseInt(m[1]):null}}const n=await e.env.DB.prepare(`
      INSERT INTO banks (bank_name, bank_code, logo_url, is_active, tenant_id) 
      VALUES (?, ?, ?, ?, ?)
    `).bind(a,s,r,l,i).run();return e.json({success:!0,id:n.meta.last_row_id})}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/banks/:id",async e=>{try{const t=e.req.param("id"),a=await e.req.json(),{bank_name:s,bank_code:r,logo_url:l,is_active:o}=a,n=e.req.header("Authorization")?.replace("Bearer ","");let d=null;if(n){const m=atob(n).split(":");d=m[1]!=="null"?parseInt(m[1]):null}let p="UPDATE banks SET bank_name = ?, bank_code = ?, logo_url = ?, is_active = ? WHERE id = ?";return d?(p+=" AND tenant_id = ?",await e.env.DB.prepare(p).bind(s,r,l,o,t,d).run()):await e.env.DB.prepare(p).bind(s,r,l,o,t).run(),e.json({success:!0})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/banks/:id",async e=>{try{const t=e.req.param("id"),a=await e.req.formData(),s=a.get("bank_name"),r=a.get("bank_code"),l=a.get("logo_url")||null,o=parseInt(a.get("is_active")||"1");return await e.env.DB.prepare(`
      UPDATE banks SET bank_name = ?, bank_code = ?, logo_url = ?, is_active = ? WHERE id = ?
    `).bind(s,r,l,o,t).run(),e.redirect("/admin/banks")}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/banks/:id",async e=>{try{const t=e.req.param("id"),s=e.req.header("Authorization")?.replace("Bearer ","");let r=null;if(s){const n=atob(s).split(":");r=n[1]!=="null"?parseInt(n[1]):null}let l="SELECT id FROM banks WHERE id = ?";return r&&(l+=" AND tenant_id = ?"),(r?await e.env.DB.prepare(l).bind(t,r).first():await e.env.DB.prepare(l).bind(t).first())?(await e.env.DB.prepare("DELETE FROM banks WHERE id = ?").bind(t).run(),e.json({success:!0})):e.json({success:!1,error:"البنك غير موجود أو لا يمكنك حذفه"},404)}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/financing-types",async e=>{try{const t=e.req.query("tenant_id");let a="SELECT * FROM financing_types",s;return t?(a+=" WHERE tenant_id = ? OR tenant_id IS NULL ORDER BY type_name",s=(await e.env.DB.prepare(a).bind(parseInt(t)).all()).results):(a+=" ORDER BY type_name",s=(await e.env.DB.prepare(a).all()).results),e.json({success:!0,data:s})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/rates",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");let s=null;if(a){const i=atob(a).split(":");s=i[1]!=="null"?parseInt(i[1]):null}let r=`
      SELECT 
        r.*,
        b.bank_name,
        f.type_name as financing_type_name
      FROM bank_financing_rates r
      JOIN banks b ON r.bank_id = b.id
      JOIN financing_types f ON r.financing_type_id = f.id
    `;s!==null&&(r+=" WHERE r.tenant_id = ?"),r+=" ORDER BY b.bank_name, f.type_name";const{results:l}=s!==null?await e.env.DB.prepare(r).bind(s).all():await e.env.DB.prepare(r).all();return e.json({success:!0,data:l})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/rates",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");let s=null;if(a){const n=atob(a).split(":");s=n[1]!=="null"?parseInt(n[1]):null}const r=await e.req.formData(),l={};r.forEach((i,n)=>{l[n]=i});const o=await e.env.DB.prepare(`
      INSERT INTO bank_financing_rates 
      (bank_id, financing_type_id, rate, min_amount, max_amount, min_duration, max_duration, is_active, tenant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(l.bank_id,l.financing_type_id,l.rate,l.min_amount||null,l.max_amount||null,l.min_duration||null,l.max_duration||null,l.is_active||1,s).run();return e.redirect("/admin/rates")}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/rates/:id",async e=>{try{const t=e.req.param("id"),a=await e.req.json(),r=e.req.header("Authorization")?.replace("Bearer ","");let l=null;if(r){const n=atob(r).split(":");l=n[1]!=="null"?parseInt(n[1]):null}let o=`
      UPDATE bank_financing_rates 
      SET bank_id = ?, financing_type_id = ?, rate = ?, 
          min_amount = ?, max_amount = ?, min_salary = ?, max_salary = ?,
          min_duration = ?, max_duration = ?, is_active = ?
      WHERE id = ?
    `;return l?(o+=" AND tenant_id = ?",await e.env.DB.prepare(o).bind(a.bank_id,a.financing_type_id,a.rate,a.min_amount,a.max_amount,a.min_salary,a.max_salary,a.min_duration,a.max_duration,a.is_active,t,l).run()):await e.env.DB.prepare(o).bind(a.bank_id,a.financing_type_id,a.rate,a.min_amount,a.max_amount,a.min_salary,a.max_salary,a.min_duration,a.max_duration,a.is_active,t).run(),e.json({success:!0})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/rates/:id",async e=>{try{const t=e.req.param("id"),s=e.req.header("Authorization")?.replace("Bearer ","");let r=null;if(s){const i=atob(s).split(":");r=i[1]!=="null"?parseInt(i[1]):null}let l="DELETE FROM bank_financing_rates WHERE id = ?";return r?(l+=" AND tenant_id = ?",await e.env.DB.prepare(l).bind(t,r).run()):await e.env.DB.prepare(l).bind(t).run(),e.json({success:!0})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/packages",async e=>{try{const{results:t}=await e.env.DB.prepare(`
      SELECT * FROM packages ORDER BY price
    `).all();return e.json({success:!0,data:t})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/packages",async e=>{try{const t=await e.req.formData(),a=t.get("package_name"),s=t.get("description"),r=t.get("price"),l=t.get("duration_months"),o=t.get("max_calculations"),i=t.get("max_users"),n=t.get("is_active")||"1",d=await e.env.DB.prepare(`
      INSERT INTO packages (package_name, description, price, duration_months, max_calculations, max_users, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(a,s||null,r,l,o||null,i||null,n).run();return e.redirect("/admin/packages")}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/packages/:id",async e=>{try{const t=e.req.param("id"),{package_name:a,description:s,price:r,duration_months:l,max_calculations:o,max_users:i,is_active:n}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE packages 
      SET package_name = ?, description = ?, price = ?, duration_months = ?, 
          max_calculations = ?, max_users = ?, is_active = ?
      WHERE id = ?
    `).bind(a,s,r,l,o,i,n,t).run(),e.json({success:!0,message:"تم تحديث الباقة بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/subscriptions",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");let s=null;if(a){const i=atob(a).split(":");s=i[1]!=="null"?parseInt(i[1]):null}let r=`
      SELECT 
        s.*,
        p.package_name,
        p.price,
        p.max_calculations
      FROM subscriptions s
      JOIN packages p ON s.package_id = p.id`;s&&(r+=` WHERE s.tenant_id = ${s}`),r+=" ORDER BY s.created_at DESC";const{results:l}=await e.env.DB.prepare(r).all();return e.json({success:!0,data:l})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/subscriptions",async e=>{try{const t=await e.req.formData(),a=t.get("company_name"),s=t.get("package_id"),r=t.get("start_date"),l=t.get("end_date"),o=t.get("status")||"active",i=t.get("calculations_used")||0,d=e.req.header("Authorization")?.replace("Bearer ","");let p=null;if(d){const b=atob(d).split(":");p=b[1]!=="null"?parseInt(b[1]):null}const u=await e.env.DB.prepare(`
      INSERT INTO subscriptions (company_name, package_id, start_date, end_date, status, calculations_used, tenant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(a,s,r,l,o,i,p).run();return e.redirect("/admin/subscriptions")}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/subscriptions/:id",async e=>{try{const t=e.req.param("id"),{company_name:a,package_id:s,start_date:r,end_date:l,status:o}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE subscriptions 
      SET company_name = ?, package_id = ?, start_date = ?, end_date = ?, status = ?
      WHERE id = ?
    `).bind(a,s,r,l,o,t).run(),e.json({success:!0})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/subscription-requests",async e=>{try{const{results:t}=await e.env.DB.prepare(`
      SELECT 
        sr.*,
        p.package_name,
        p.price,
        p.duration_months
      FROM subscription_requests sr
      LEFT JOIN packages p ON sr.package_id = p.id
      ORDER BY sr.created_at DESC
    `).all();return e.json({success:!0,data:t})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/subscription-requests/:id",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT 
        sr.*,
        p.package_name,
        p.price,
        p.duration_months,
        p.max_calculations,
        p.max_users
      FROM subscription_requests sr
      LEFT JOIN packages p ON sr.package_id = p.id
      WHERE sr.id = ?
    `).bind(t).first();return a?e.json({success:!0,data:a}):e.json({success:!1,message:"الطلب غير موجود"},404)}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/subscription-requests",async e=>{try{const{company_name:t,contact_name:a,email:s,phone:r,package_id:l,notes:o}=await e.req.json();if(!t||!a||!s||!r||!l)return e.json({success:!1,message:"جميع الحقول مطلوبة"},400);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))return e.json({success:!1,message:"البريد الإلكتروني غير صحيح"},400);if(!/^(05|5)[0-9]{8}$/.test(r.replace(/[\s-]/g,"")))return e.json({success:!1,message:"رقم الجوال غير صحيح. يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"},400);if(!await e.env.DB.prepare(`
      SELECT id FROM packages WHERE id = ? AND is_active = 1
    `).bind(l).first())return e.json({success:!1,message:"الباقة غير موجودة أو غير متاحة"},400);const p=await e.env.DB.prepare(`
      INSERT INTO subscription_requests 
      (company_name, contact_name, email, phone, package_id, status, notes)
      VALUES (?, ?, ?, ?, ?, 'pending', ?)
    `).bind(t,a,s,r,l,o||null).run();return e.json({success:!0,message:"تم إرسال طلبك بنجاح. سنتواصل معك قريباً",requestId:p.meta.last_row_id})}catch(t){return console.error("Subscription request error:",t),e.json({success:!1,message:"حدث خطأ. الرجاء المحاولة مرة أخرى."},500)}});c.put("/api/subscription-requests/:id",async e=>{try{const t=e.req.param("id"),{status:a,notes:s}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE subscription_requests 
      SET status = ?, notes = ?
      WHERE id = ?
    `).bind(a,s||null,t).run(),e.json({success:!0,message:"تم تحديث الطلب بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/subscription-requests/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare(`
      DELETE FROM subscription_requests WHERE id = ?
    `).bind(t).run(),e.json({success:!0,message:"تم حذف الطلب بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/users",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");let s=null;if(a){const i=atob(a).split(":");s=i[1]!=="null"?parseInt(i[1]):null}let r=`
      SELECT u.*, r.role_name, r.description as role_description,
             COUNT(DISTINCT rp.permission_id) as permissions_count
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN role_permissions rp ON r.id = rp.role_id`;s&&(r+=` WHERE u.tenant_id = ${s}`),r+=`
      GROUP BY u.id
      ORDER BY u.id DESC`;const{results:l}=await e.env.DB.prepare(r).all();return e.json({success:!0,data:l})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/users",async e=>{try{const t=await e.req.formData(),a=t.get("username"),s=t.get("password"),r=t.get("full_name"),l=t.get("email"),o=t.get("phone"),i=t.get("user_type"),n=t.get("role_id"),d=t.get("subscription_id")||null,p=t.get("is_active")||"1",m=e.req.header("Authorization")?.replace("Bearer ","");let b=null;if(m){const h=atob(m).split(":");b=h[1]!=="null"?parseInt(h[1]):null}if(await e.env.DB.prepare(`
      SELECT id FROM users WHERE username = ?
    `).bind(a).first())return e.json({success:!1,error:"اسم المستخدم موجود مسبقاً! الرجاء اختيار اسم مستخدم آخر."},400);if(l&&await e.env.DB.prepare(`
        SELECT id FROM users WHERE email = ?
      `).bind(l).first())return e.json({success:!1,error:"البريد الإلكتروني موجود مسبقاً! الرجاء استخدام بريد إلكتروني آخر."},400);const f=await e.env.DB.prepare(`
      INSERT INTO users (username, password, full_name, email, phone, user_type, role_id, subscription_id, is_active, tenant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(a,s,r,l,o,i,n,d,p,b).run();return e.json({success:!0,message:"تم إضافة المستخدم بنجاح",userId:f.meta.last_row_id})}catch(t){return console.error("Error adding user:",t),e.json({success:!1,error:t.message||"حدث خطأ أثناء إضافة المستخدم"},500)}});c.put("/api/users/:id",async e=>{try{const t=e.req.param("id"),{username:a,full_name:s,email:r,phone:l,role_id:o,subscription_id:i,is_active:n}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE users 
      SET username = ?, full_name = ?, email = ?, phone = ?, role_id = ?, subscription_id = ?, is_active = ?
      WHERE id = ?
    `).bind(a,s,r,l,o,i,n,t).run(),e.json({success:!0})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/customers",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");let s=null;if(a){const i=atob(a).split(":");s=i[1]!=="null"?parseInt(i[1]):null}let r=`
      SELECT 
        c.*,
        ft.type_name as financing_type_name,
        COUNT(f.id) as total_requests,
        SUM(CASE WHEN f.status = 'pending' THEN 1 ELSE 0 END) as pending_requests,
        SUM(CASE WHEN f.status = 'approved' THEN 1 ELSE 0 END) as approved_requests
      FROM customers c
      LEFT JOIN financing_requests f ON c.id = f.customer_id
      LEFT JOIN financing_types ft ON c.financing_type_id = ft.id`;s&&(r+=` WHERE c.tenant_id = ${s}`),r+=`
      GROUP BY c.id
      ORDER BY c.created_at DESC`;const{results:l}=await e.env.DB.prepare(r).all();return e.json({success:!0,data:l})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/customers",async e=>{try{const t=await e.req.formData(),a=t.get("full_name"),s=t.get("phone"),r=t.get("email")||null,l=t.get("national_id")||null,o=t.get("date_of_birth")||null,i=t.get("employer_name")||null,n=t.get("job_title")||null,d=t.get("work_start_date")||null,p=t.get("city")||null,u=parseFloat(t.get("monthly_salary")||"0"),b=e.req.header("Authorization")?.replace("Bearer ","");let g=null;if(b){const v=atob(b).split(":");g=v[1]!=="null"?parseInt(v[1]):null}if(l){let w="SELECT id, full_name FROM customers WHERE national_id = ?",v=[l];g&&(w+=" AND tenant_id = ?",v.push(g));const E=await e.env.DB.prepare(w).bind(...v).first();if(E)return e.html(`
          <!DOCTYPE html>
          <html lang="ar" dir="rtl">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>خطأ</title>
            <script src="https://cdn.tailwindcss.com"><\/script>
            <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
          </head>
          <body class="bg-gray-50">
            <div class="max-w-2xl mx-auto p-6 mt-20">
              <div class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-lg">
                <div class="flex items-center mb-4">
                  <i class="fas fa-exclamation-circle text-red-500 text-4xl ml-3"></i>
                  <div>
                    <h1 class="text-2xl font-bold text-red-800">رقم الهوية مكرر!</h1>
                    <p class="text-red-600 mt-1">لا يمكن إضافة عميل برقم هوية موجود مسبقاً</p>
                  </div>
                </div>
                <div class="bg-white rounded-lg p-4 mb-4">
                  <p class="text-gray-700"><strong>الرقم الوطني:</strong> ${l}</p>
                  <p class="text-gray-700"><strong>مسجل باسم:</strong> ${E.full_name}</p>
                  <p class="text-gray-700"><strong>رقم العميل:</strong> #${E.id}</p>
                </div>
                <div class="flex gap-3">
                  <a href="/admin/customers/add" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة للنموذج
                  </a>
                  <a href="/admin/customers/${E.id}" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                    <i class="fas fa-eye ml-2"></i>
                    عرض العميل الموجود
                  </a>
                  <a href="/admin/customers" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                    <i class="fas fa-list ml-2"></i>
                    قائمة العملاء
                  </a>
                </div>
              </div>
            </div>
          </body>
          </html>
        `)}let f="SELECT id, full_name FROM customers WHERE phone = ?",x=[s];g&&(f+=" AND tenant_id = ?",x.push(g));const h=await e.env.DB.prepare(f).bind(...x).first();if(h)return e.html(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>خطأ</title>
          <script src="https://cdn.tailwindcss.com"><\/script>
          <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        </head>
        <body class="bg-gray-50">
          <div class="max-w-2xl mx-auto p-6 mt-20">
            <div class="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6 shadow-lg">
              <div class="flex items-center mb-4">
                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl ml-3"></i>
                <div>
                  <h1 class="text-2xl font-bold text-yellow-800">رقم الهاتف مكرر!</h1>
                  <p class="text-yellow-600 mt-1">يوجد عميل آخر بنفس رقم الهاتف</p>
                </div>
              </div>
              <div class="bg-white rounded-lg p-4 mb-4">
                <p class="text-gray-700"><strong>رقم الهاتف:</strong> ${s}</p>
                <p class="text-gray-700"><strong>مسجل باسم:</strong> ${h.full_name}</p>
                <p class="text-gray-700"><strong>رقم العميل:</strong> #${h.id}</p>
              </div>
              <div class="flex gap-3">
                <a href="/admin/customers/add" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-arrow-right ml-2"></i>
                  العودة للنموذج
                </a>
                <a href="/admin/customers/${h.id}" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-eye ml-2"></i>
                  عرض العميل الموجود
                </a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `);const _=await e.env.DB.prepare(`
      INSERT INTO customers (full_name, phone, email, national_id, birthdate, employer_name, job_title, work_start_date, city, monthly_salary, tenant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(a,s,r,l,o,i,n,d,p,u,g).run();return e.redirect("/admin/customers")}catch(t){return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>خطأ</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-2xl mx-auto p-6 mt-20">
          <div class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-lg">
            <div class="flex items-center mb-4">
              <i class="fas fa-times-circle text-red-500 text-4xl ml-3"></i>
              <div>
                <h1 class="text-2xl font-bold text-red-800">حدث خطأ!</h1>
                <p class="text-red-600 mt-1">لم نتمكن من إضافة العميل</p>
              </div>
            </div>
            <div class="bg-white rounded-lg p-4 mb-4">
              <p class="text-gray-700 font-mono text-sm">${t.message}</p>
            </div>
            <a href="/admin/customers/add" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all inline-block">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة للنموذج
            </a>
          </div>
        </div>
      </body>
      </html>
    `)}});c.post("/api/customers/:id",async e=>{try{const t=e.req.param("id"),a=await e.req.formData(),s=a.get("full_name"),r=a.get("phone"),l=a.get("email")||null,o=a.get("national_id")||null,i=a.get("date_of_birth")||null,n=a.get("employer_name")||null,d=a.get("job_title")||null,p=a.get("work_start_date")||null,u=a.get("city")||null,m=parseFloat(a.get("monthly_salary")||"0");return await e.env.DB.prepare(`
      UPDATE customers 
      SET full_name = ?, phone = ?, email = ?, national_id = ?, birthdate = ?,
          employer_name = ?, job_title = ?, work_start_date = ?, city = ?, monthly_salary = ?
      WHERE id = ?
    `).bind(s,r,l,o,i,n,d,p,u,m,t).run(),e.redirect("/admin/customers")}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/financing-requests",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");let s=null;if(a){const i=atob(a).split(":");s=i[1]!=="null"?parseInt(i[1]):null}let r=`
      SELECT 
        f.*,
        c.full_name as customer_name,
        c.phone as customer_phone,
        c.national_id,
        c.employer_name,
        c.job_title,
        b.bank_name as selected_bank_name,
        ft.type_name as financing_type_name,
        ca.employee_id as assigned_employee_id,
        u.full_name as assigned_employee_name
      FROM financing_requests f
      JOIN customers c ON f.customer_id = c.id
      LEFT JOIN banks b ON f.selected_bank_id = b.id
      LEFT JOIN financing_types ft ON f.financing_type_id = ft.id
      LEFT JOIN customer_assignments ca ON c.id = ca.customer_id
      LEFT JOIN users u ON ca.employee_id = u.id`;s&&(r+=` WHERE f.tenant_id = ${s}`),r+=" ORDER BY f.created_at DESC";const{results:l}=await e.env.DB.prepare(r).all();return e.json({success:!0,data:l})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/requests",async e=>{try{const t=await e.req.formData(),a=t.get("customer_id"),s=t.get("financing_type_id"),r=t.get("requested_amount"),l=t.get("duration_months"),o=t.get("salary_at_request"),i=t.get("selected_bank_id")||null,n=t.get("status")||"pending",d=t.get("notes")||"",u=e.req.header("Authorization")?.replace("Bearer ","");let m=null;if(u){const f=atob(u).split(":");m=f[1]!=="null"?parseInt(f[1]):null}const b=await e.env.DB.prepare(`
      INSERT INTO financing_requests (
        customer_id, financing_type_id, selected_bank_id, 
        requested_amount, salary_at_request, duration_months, 
        status, notes, tenant_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(a,s,i,r,o,l,n,d,m).run();return e.redirect("/admin/requests")}catch(t){return console.error("Error creating request:",t),e.json({success:!1,error:t.message,message:"حدث خطأ أثناء حفظ الطلب"},500)}});c.get("/api/workflow/stages",async e=>{try{const{results:t}=await e.env.DB.prepare(`
      SELECT * FROM workflow_stages 
      WHERE is_active = 1 
      ORDER BY stage_order ASC
    `).all();return e.json({success:!0,data:t})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/workflow/timeline/:requestId",async e=>{try{const t=e.req.param("requestId"),{results:a}=await e.env.DB.prepare(`
      SELECT 
        wst.*,
        from_stage.stage_name_ar as from_stage_name,
        from_stage.stage_color as from_stage_color,
        from_stage.stage_icon as from_stage_icon,
        to_stage.stage_name_ar as to_stage_name,
        to_stage.stage_color as to_stage_color,
        to_stage.stage_icon as to_stage_icon,
        u.full_name as transitioned_by_name
      FROM workflow_stage_transitions wst
      LEFT JOIN workflow_stages from_stage ON wst.from_stage_id = from_stage.id
      LEFT JOIN workflow_stages to_stage ON wst.to_stage_id = to_stage.id
      LEFT JOIN users u ON wst.transitioned_by = u.id
      WHERE wst.request_id = ?
      ORDER BY wst.created_at ASC
    `).bind(t).all(),{results:s}=await e.env.DB.prepare(`
      SELECT 
        wsa.*,
        ws.stage_name_ar,
        ws.stage_color,
        ws.stage_icon,
        u.full_name as performed_by_name
      FROM workflow_stage_actions wsa
      LEFT JOIN workflow_stages ws ON wsa.stage_id = ws.id
      LEFT JOIN users u ON wsa.performed_by = u.id
      WHERE wsa.request_id = ?
      ORDER BY wsa.created_at ASC
    `).bind(t).all(),{results:r}=await e.env.DB.prepare(`
      SELECT 
        wst.*,
        ws.stage_name_ar,
        assigned_user.full_name as assigned_to_name,
        completed_user.full_name as completed_by_name
      FROM workflow_stage_tasks wst
      LEFT JOIN workflow_stages ws ON wst.stage_id = ws.id
      LEFT JOIN users assigned_user ON wst.assigned_to = assigned_user.id
      LEFT JOIN users completed_user ON wst.completed_by = completed_user.id
      WHERE wst.request_id = ?
      ORDER BY wst.due_date ASC
    `).bind(t).all();return e.json({success:!0,data:{transitions:a,actions:s,tasks:r}})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/workflow/update-stage",async e=>{try{const{requestId:t,newStageId:a,notes:s,userId:r}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE financing_requests 
      SET current_stage_id = ?, 
          stage_entered_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(a,t).run(),s&&await e.env.DB.prepare(`
        UPDATE workflow_stage_transitions 
        SET notes = ?, transitioned_by = ?
        WHERE request_id = ? AND to_stage_id = ?
        ORDER BY created_at DESC
        LIMIT 1
      `).bind(s,r,t,a).run(),e.json({success:!0,message:"تم تحديث مرحلة الطلب بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/workflow/add-action",async e=>{try{const{requestId:t,stageId:a,actionType:s,actionData:r,performedBy:l,notes:o}=await e.req.json();return await e.env.DB.prepare(`
      INSERT INTO workflow_stage_actions 
      (request_id, stage_id, action_type, action_data, performed_by, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(t,a,s,r,l,o).run(),e.json({success:!0,message:"تم إضافة الإجراء بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/workflow/create-task",async e=>{try{const{requestId:t,stageId:a,taskTitle:s,taskDescription:r,assignedTo:l,dueDate:o,priority:i}=await e.req.json();return await e.env.DB.prepare(`
      INSERT INTO workflow_stage_tasks 
      (request_id, stage_id, task_title, task_description, assigned_to, due_date, priority)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(t,a,s,r,l,o,i||"medium").run(),e.json({success:!0,message:"تم إنشاء المهمة بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/workflow/complete-task",async e=>{try{const{taskId:t,completedBy:a}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE workflow_stage_tasks 
      SET status = 'completed', 
          completed_at = CURRENT_TIMESTAMP,
          completed_by = ?
      WHERE id = ?
    `).bind(a,t).run(),e.json({success:!0,message:"تم إتمام المهمة بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/workflow/my-tasks/:userId",async e=>{try{const t=e.req.param("userId"),{results:a}=await e.env.DB.prepare(`
      SELECT 
        wst.*,
        ws.stage_name_ar,
        ws.stage_color,
        fr.id as request_id,
        c.full_name as customer_name,
        fr.requested_amount
      FROM workflow_stage_tasks wst
      LEFT JOIN workflow_stages ws ON wst.stage_id = ws.id
      LEFT JOIN financing_requests fr ON wst.request_id = fr.id
      LEFT JOIN customers c ON fr.customer_id = c.id
      WHERE wst.assigned_to = ? AND wst.status = 'pending'
      ORDER BY wst.due_date ASC
    `).bind(t).all();return e.json({success:!0,data:a})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/payments",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");let s=null;if(a)try{const i=atob(a),[n,d]=i.split(":");s=d==="null"?null:parseInt(d)}catch{}let r=`
      SELECT 
        p.*,
        c.full_name as customer_name,
        u.full_name as employee_name
      FROM payments p
      LEFT JOIN customers c ON p.customer_id = c.id
      LEFT JOIN users u ON p.employee_id = u.id
    `;const l=[];s&&(r+=" WHERE p.tenant_id = ?",l.push(s)),r+=" ORDER BY p.created_at DESC";const{results:o}=await e.env.DB.prepare(r).bind(...l).all();return e.json({success:!0,data:o})}catch(t){return console.error("Payments API error:",t),e.json({success:!1,error:t.message},500)}});c.post("/api/payments",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");if(!a)return e.json({success:!1,error:"غير مصرح"},401);const s=atob(a),[r,l]=s.split(":"),o=l==="null"?null:parseInt(l),i=parseInt(r);if(!o)return e.json({success:!1,error:"يجب أن تكون مرتبطاً بشركة"},403);const n=await e.req.json();return!n.financing_request_id||!n.customer_id||!n.amount||!n.payment_date?e.json({success:!1,error:"البيانات المطلوبة ناقصة"},400):(await e.env.DB.prepare(`
      INSERT INTO payments (
        financing_request_id, customer_id, tenant_id, employee_id,
        amount, payment_date, payment_method, receipt_number, notes, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(n.financing_request_id,n.customer_id,o,n.employee_id||null,n.amount,n.payment_date,n.payment_method||"cash",n.receipt_number||null,n.notes||null,i).run(),e.json({success:!0,message:"تم حفظ سند القبض بنجاح"}))}catch(t){return console.error("Error creating payment:",t),e.json({success:!1,error:t.message},500)}});c.delete("/api/payments/:id",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");if(!a)return e.json({success:!1,error:"غير مصرح"},401);const s=atob(a),[r,l]=s.split(":"),o=l==="null"?null:parseInt(l),i=e.req.param("id");if(o){const n=await e.env.DB.prepare("SELECT tenant_id FROM payments WHERE id = ?").bind(i).first();if(n&&n.tenant_id!==o)return e.json({success:!1,error:"غير مصرح بحذف هذا السند"},403)}return await e.env.DB.prepare("DELETE FROM payments WHERE id = ?").bind(i).run(),e.json({success:!0,message:"تم حذف السند بنجاح"})}catch(t){return console.error("Error deleting payment:",t),e.json({success:!1,error:t.message},500)}});c.post("/api/c/:tenant/calculator/submit-request",async e=>{try{const t=e.req.param("tenant"),a=await e.req.json(),s=await e.env.DB.prepare(`
      SELECT id FROM tenants WHERE slug = ? AND status = 'active'
    `).bind(t).first();if(!s)return e.json({success:!1,error:"شركة غير موجودة"},404);const r=s.id;let l=await e.env.DB.prepare(`
      SELECT id FROM customers WHERE (national_id = ? OR phone = ?) AND tenant_id = ?
    `).bind(a.national_id||"",a.phone||"",r).first(),o;if(l)o=l.id,await e.env.DB.prepare(`
        UPDATE customers 
        SET full_name = ?, phone = ?, email = ?, 
            birthdate = ?, monthly_salary = ?,
            employer_name = ?, job_title = ?,
            work_start_date = ?, city = ?,
            financing_amount = ?, monthly_obligations = ?, financing_type_id = ?
        WHERE id = ?
      `).bind(a.full_name||"",a.phone||"",a.email||null,a.birthdate||null,a.monthly_salary||0,a.employer||"",a.job_title||"",a.work_start_date||null,a.city||"",a.requested_amount||0,a.monthly_obligations||0,a.financing_type_id||null,o).run();else try{o=(await e.env.DB.prepare(`
          INSERT INTO customers (
            full_name, phone, email, national_id, 
            birthdate, monthly_salary, employer_name, 
            job_title, work_start_date, city, tenant_id,
            financing_amount, monthly_obligations, financing_type_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(a.full_name||"",a.phone||"",a.email||null,a.national_id||"",a.birthdate||null,a.monthly_salary||0,a.employer||"",a.job_title||"",a.work_start_date||null,a.city||"",r,a.requested_amount||0,a.monthly_obligations||0,a.financing_type_id||null).run()).meta.last_row_id}catch(d){if(d.message&&d.message.includes("UNIQUE")){const p=await e.env.DB.prepare(`
            SELECT id FROM customers WHERE (national_id = ? OR phone = ?)
          `).bind(a.national_id||"",a.phone||"").first();if(p)o=p.id,await e.env.DB.prepare(`
              UPDATE customers 
              SET full_name = ?, phone = ?, email = ?, 
                  birthdate = ?, monthly_salary = ?,
                  employer_name = ?, job_title = ?,
                  work_start_date = ?, city = ?, tenant_id = ?,
                  financing_amount = ?, monthly_obligations = ?, financing_type_id = ?
              WHERE id = ?
            `).bind(a.full_name||"",a.phone||"",a.email||null,a.birthdate||null,a.monthly_salary||0,a.employer||"",a.job_title||"",a.work_start_date||null,a.city||"",r,a.requested_amount||0,a.monthly_obligations||0,a.financing_type_id||null,o).run();else throw d}else throw d}const n=(await e.env.DB.prepare(`
      INSERT INTO financing_requests (
        customer_id, financing_type_id, selected_bank_id,
        requested_amount, salary_at_request, duration_months,
        monthly_obligations, monthly_payment,
        status, notes, tenant_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
    `).bind(o,a.financing_type_id||null,a.bank_id||a.selected_bank_id||null,a.requested_amount||0,a.monthly_salary||0,a.duration||a.duration_months||0,a.monthly_obligations||0,a.monthly_payment||0,a.notes||null,r).run()).meta.last_row_id;return e.json({success:!0,request_id:n,message:"تم إرسال طلبك بنجاح"})}catch(t){return console.error("Calculator submit error:",t),console.error("Error details:",{message:t.message,stack:t.stack,data:t}),e.json({success:!1,error:"حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى.",details:t.message},500)}});c.post("/api/calculator/save-customer",async e=>{try{const t=await e.req.json(),a=t.tenant_slug||null;let s=null;if(a){const o=await e.env.DB.prepare(`
        SELECT id FROM tenants WHERE slug = ? AND status = 'active'
      `).bind(a).first();o&&(s=o.id)}let r=await e.env.DB.prepare(`
      SELECT id FROM customers WHERE phone = ?
    `).bind(t.phone).first(),l;if(r)l=r.id,await e.env.DB.prepare(`
        UPDATE customers 
        SET full_name = ?, 
            birthdate = ?, 
            monthly_salary = ?,
            financing_amount = ?,
            monthly_obligations = ?,
            financing_type_id = ?,
            financing_duration_months = ?,
            best_bank_id = ?,
            best_rate = ?,
            monthly_payment = ?,
            total_payment = ?,
            calculation_date = CURRENT_TIMESTAMP,
            tenant_id = COALESCE(?, tenant_id)
        WHERE id = ?
      `).bind(t.name,t.birthdate,t.salary,t.amount,t.obligations||0,t.financing_type_id,t.duration_months||null,t.best_bank_id||null,t.best_rate||null,t.monthly_payment||null,t.total_payment||null,s,l).run();else{const o=`TEMP-${Date.now()}-${Math.random().toString(36).substring(7)}`;l=(await e.env.DB.prepare(`
        INSERT INTO customers (
          full_name, phone, birthdate, monthly_salary,
          financing_amount, monthly_obligations, financing_type_id,
          financing_duration_months, best_bank_id, best_rate,
          monthly_payment, total_payment, calculation_date,
          national_id, tenant_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)
      `).bind(t.name,t.phone,t.birthdate,t.salary,t.amount,t.obligations||0,t.financing_type_id,t.duration_months||null,t.best_bank_id||null,t.best_rate||null,t.monthly_payment||null,t.total_payment||null,o,s).run()).meta.last_row_id}return e.json({success:!0,customer_id:l,message:"تم حفظ بيانات العميل بنجاح"})}catch(t){return console.error("Save customer error:",t),e.json({success:!1,error:t.message},500)}});c.post("/api/calculator/submit-request",async e=>{try{const t=await e.req.json();let a=await e.env.DB.prepare(`
      SELECT id FROM customers WHERE national_id = ? OR phone = ?
    `).bind(t.national_id,t.phone).first(),s;if(a)s=a.id,await e.env.DB.prepare(`
        UPDATE customers 
        SET full_name = ?, phone = ?, email = ?, 
            birthdate = ?, monthly_salary = ?,
            employer_name = ?, job_title = ?,
            work_start_date = ?, city = ?
        WHERE id = ?
      `).bind(t.full_name,t.phone,t.email||null,t.birthdate,t.monthly_salary,t.employer,t.job_title,t.work_start_date,t.city,s).run();else try{s=(await e.env.DB.prepare(`
          INSERT INTO customers (
            full_name, phone, email, national_id, 
            birthdate, monthly_salary, employer_name, 
            job_title, work_start_date, city
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(t.full_name,t.phone,t.email||null,t.national_id,t.birthdate,t.monthly_salary,t.employer,t.job_title,t.work_start_date,t.city).run()).meta.last_row_id}catch(o){if(o.message&&o.message.includes("UNIQUE")){const i=await e.env.DB.prepare(`
            SELECT id FROM customers WHERE national_id = ? OR phone = ?
          `).bind(t.national_id,t.phone).first();if(i)s=i.id;else throw o}else throw o}const l=(await e.env.DB.prepare(`
      INSERT INTO financing_requests (
        customer_id, financing_type_id, selected_bank_id,
        requested_amount, salary_at_request, duration_months,
        monthly_obligations, monthly_payment,
        status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    `).bind(s,t.financing_type_id,t.bank_id,t.requested_amount,t.monthly_salary,t.duration,t.monthly_obligations,t.monthly_payment,t.notes).run()).meta.last_row_id;return await e.env.DB.prepare(`
      INSERT INTO notifications (user_id, title, message, type, category, related_request_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(1,"طلب تمويل جديد",`تم استلام طلب تمويل جديد برقم #${l} بمبلغ ${t.requested_amount.toLocaleString("ar-SA")} ريال من ${t.full_name}`,"info","request",l).run(),e.json({success:!0,request_id:l,customer_id:s,message:"تم إرسال طلبك بنجاح"})}catch(t){return console.error("Calculator submit error:",t),e.json({success:!1,error:t.message,message:"حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى."},500)}});c.put("/api/financing-requests/:id",async e=>{try{const t=e.req.param("id"),a=e.req.header("Authorization");let s=null;if(a&&a.startsWith("Bearer ")){const _=a.substring(7).split(".");_.length===3&&(s=JSON.parse(atob(_[1])).tenant_id||null)}const{requested_amount:r,duration_months:l,salary_at_request:o,monthly_obligations:i,status:n,notes:d,id_attachment_url:p,bank_statement_attachment_url:u,salary_attachment_url:m,additional_attachment_url:b}=await e.req.json();let g=["requested_amount = ?","duration_months = ?","salary_at_request = ?","monthly_obligations = ?","status = ?","notes = ?"];const f=[r,l,o||0,i||0,n||"pending",d||""];p&&(g.push("id_attachment_url = ?"),f.push(p)),u&&(g.push("bank_statement_attachment_url = ?"),f.push(u)),m&&(g.push("salary_attachment_url = ?"),f.push(m)),b&&(g.push("additional_attachment_url = ?"),f.push(b)),f.push(t);let x=`
      UPDATE financing_requests 
      SET ${g.join(", ")}
      WHERE id = ?
    `;return s!==null&&(x+=" AND tenant_id = ?",f.push(s)),await e.env.DB.prepare(x).bind(...f).run(),e.json({success:!0})}catch(t){return console.error("Update financing request error:",t),e.json({success:!1,error:t.message},500)}});c.put("/api/financing-requests/:id/status",async e=>{try{const t=e.req.param("id"),{status:a,notes:s}=await e.req.json(),r=await e.env.DB.prepare(`
      SELECT status FROM financing_requests WHERE id = ?
    `).bind(t).first(),o={pending:"pending_at",under_review:"under_review_at",processing:"processing_at",approved:"approved_at",rejected:"rejected_at"}[a];o?await e.env.DB.prepare(`
        UPDATE financing_requests 
        SET status = ?, notes = ?, ${o} = datetime('now'), reviewed_at = datetime('now')
        WHERE id = ?
      `).bind(a,s,t).run():await e.env.DB.prepare(`
        UPDATE financing_requests SET status = ?, notes = ? WHERE id = ?
      `).bind(a,s,t).run(),r&&r.status!==a&&await e.env.DB.prepare(`
        INSERT INTO financing_request_status_history (request_id, old_status, new_status, changed_by, notes)
        VALUES (?, ?, ?, 'admin', ?)
      `).bind(t,r.status,a,s||"").run();const i=await e.env.DB.prepare(`
      SELECT requested_amount FROM financing_requests WHERE id = ?
    `).bind(t).first(),n={pending:"قيد الانتظار",under_review:"قيد المراجعة",approved:"موافق عليه",rejected:"مرفوض"},d={pending:"info",under_review:"warning",approved:"success",rejected:"error"};return await e.env.DB.prepare(`
      INSERT INTO notifications (user_id, title, message, type, category, related_request_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(1,"تحديث حالة الطلب",`تم تحديث حالة الطلب #${t} إلى: ${n[a]||a}`,d[a]||"info","status_change",t).run(),e.json({success:!0})}catch(t){return console.error("Update status error:",t),e.json({success:!1,error:t.message},500)}});c.post("/api/attachments/upload",async e=>{try{const t=await e.req.formData(),a=t.get("file"),s=t.get("request_id"),r=t.get("attachmentType")||t.get("attachment_type");if(!a)return e.json({success:!1,error:"No file provided"},400);const l=Date.now(),o=Math.random().toString(36).substring(7),i=a.name.split(".").pop(),n=s?`${s}/${r}_${l}.${i}`:`temp/${r}_${l}_${o}.${i}`,d=await a.arrayBuffer();await e.env.ATTACHMENTS.put(n,d,{httpMetadata:{contentType:a.type}});const p=`/api/attachments/view/${n}`;if(s){const u=`${r}_attachment_url`;console.log("📎 Updating attachment:",{requestId:s,attachmentType:r,columnName:u,publicUrl:p});const m=await e.env.DB.prepare(`
        UPDATE financing_requests 
        SET ${u} = ? 
        WHERE id = ?
      `).bind(p,s).run();console.log("✅ Update result:",m)}return e.json({success:!0,url:p,filename:n})}catch(t){return console.error("Upload error:",t),e.json({success:!1,error:t.message},500)}});c.get("/api/attachments/view/:path{.+}",async e=>{try{const t=e.req.param("path"),a=await e.env.ATTACHMENTS.get(t);if(!a)return e.notFound();const s=new Headers;return a.writeHttpMetadata(s),s.set("etag",a.httpEtag),new Response(a.body,{headers:s})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/attachments/delete/:path{.+}",async e=>{try{const t=e.req.param("path");await e.env.ATTACHMENTS.delete(t);const a=t.split("/");if(a.length===2){const s=a[0],r=a[1];let l=null;r.startsWith("id_")?l="id_attachment_url":r.startsWith("salary_")?l="salary_attachment_url":r.startsWith("bank_statement_")?l="bank_statement_attachment_url":r.startsWith("additional_")&&(l="additional_attachment_url"),l&&await e.env.DB.prepare(`
          UPDATE financing_requests 
          SET ${l} = NULL 
          WHERE id = ?
        `).bind(s).run()}return e.json({success:!0})}catch(t){return console.error("Delete error:",t),e.json({success:!1,error:t.message},500)}});c.get("/api/notifications",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");let s=null,r=1;if(a){const n=atob(a).split(":");r=parseInt(n[0]),s=n[1]!=="null"?parseInt(n[1]):null}let l=`
      SELECT 
        n.*,
        fr.requested_amount,
        fr.status as request_status
      FROM notifications n
      LEFT JOIN financing_requests fr ON n.related_request_id = fr.id
      WHERE n.user_id = ?`;s&&(l+=` AND n.tenant_id = ${s}`),l+=`
      ORDER BY n.created_at DESC
      LIMIT 50`;const{results:o}=await e.env.DB.prepare(l).bind(r).all();return e.json({success:!0,data:o})}catch(t){return console.error("Error fetching notifications:",t),e.json({success:!1,error:t.message},500)}});c.get("/api/notifications/unread-count",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");let s=null,r=1;if(a){const n=atob(a).split(":");r=parseInt(n[0]),s=n[1]!=="null"?parseInt(n[1]):null}let l="SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0";s&&(l+=` AND tenant_id = ${s}`);const o=await e.env.DB.prepare(l).bind(r).first();return e.json({success:!0,count:o?.count||0})}catch(t){return console.error("Error fetching unread count:",t),e.json({success:!1,error:t.message},500)}});c.put("/api/notifications/:id/read",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare(`
      UPDATE notifications
      SET is_read = 1, read_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `).bind(t,1).run(),e.json({success:!0})}catch(t){return console.error("Error marking notification as read:",t),e.json({success:!1,error:t.message},500)}});c.put("/api/notifications/read-all",async e=>{try{return await e.env.DB.prepare(`
      UPDATE notifications
      SET is_read = 1, read_at = CURRENT_TIMESTAMP
      WHERE user_id = ? AND is_read = 0
    `).bind(1).run(),e.json({success:!0})}catch(t){return console.error("Error marking all as read:",t),e.json({success:!1,error:t.message},500)}});c.delete("/api/notifications/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare(`
      DELETE FROM notifications
      WHERE id = ? AND user_id = ?
    `).bind(t,1).run(),e.json({success:!0})}catch(t){return console.error("Error deleting notification:",t),e.json({success:!1,error:t.message},500)}});c.post("/api/notifications",async e=>{try{const{user_id:t,title:a,message:s,type:r,category:l,related_request_id:o}=await e.req.json(),i=await e.env.DB.prepare(`
      INSERT INTO notifications (user_id, title, message, type, category, related_request_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(t||1,a,s,r||"info",l||"general",o||null).run();return e.json({success:!0,id:i.meta.last_row_id})}catch(t){return console.error("Error creating notification:",t),e.json({success:!1,error:t.message},500)}});c.get("/api/calculations",async e=>{try{const{results:t}=await e.env.DB.prepare(`
      SELECT 
        calc.*,
        u.full_name as user_name,
        b.bank_name,
        ft.type_name as financing_type
      FROM calculations calc
      LEFT JOIN users u ON calc.user_id = u.id
      JOIN banks b ON calc.bank_id = b.id
      JOIN financing_types ft ON calc.financing_type_id = ft.id
      ORDER BY calc.created_at DESC
      LIMIT 100
    `).all();return e.json({success:!0,data:t})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/calculate",async e=>{try{const{amount:t,duration_months:a,salary:s,bank_id:r,financing_type_id:l,user_id:o,subscription_id:i}=await e.req.json(),n=await e.env.DB.prepare(`
      SELECT rate FROM bank_financing_rates 
      WHERE bank_id = ? AND financing_type_id = ? AND is_active = 1
      LIMIT 1
    `).bind(r,l).first();if(!n)return e.json({success:!1,error:"لا توجد نسبة تمويل متاحة لهذا البنك ونوع التمويل"},400);const d=n.rate,p=d/100/12,u=t*p*Math.pow(1+p,a)/(Math.pow(1+p,a)-1),m=u*a,b=m-t,g=await e.env.DB.prepare(`
      INSERT INTO calculations 
      (user_id, subscription_id, financing_type_id, bank_id, amount, duration_months, salary, rate, monthly_payment, total_payment, total_interest)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(o||null,i||null,l,r,t,a,s,d,u,m,b).run();return e.json({success:!0,data:{id:g.meta.last_row_id,amount:t,duration_months:a,rate:d,monthly_payment:Math.round(u*100)/100,total_payment:Math.round(m*100)/100,total_interest:Math.round(b*100)/100}})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/admin/init-payments-table",async e=>{try{return await e.env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        financing_request_id INTEGER NOT NULL,
        customer_id INTEGER NOT NULL,
        tenant_id INTEGER NOT NULL,
        employee_id INTEGER,
        amount REAL NOT NULL,
        payment_date TEXT NOT NULL,
        payment_method TEXT DEFAULT 'cash',
        receipt_number TEXT,
        notes TEXT,
        created_by INTEGER,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `).run(),await e.env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_payments_tenant ON payments(tenant_id)").run(),await e.env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_payments_request ON payments(financing_request_id)").run(),await e.env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_payments_customer ON payments(customer_id)").run(),await e.env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_payments_employee ON payments(employee_id)").run(),await e.env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date)").run(),e.json({success:!0,message:"Payments table created successfully"})}catch(t){return console.error("Error creating payments table:",t),e.json({success:!1,error:t.message},500)}});c.get("/api/dashboard/stats",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");let s=null;if(a){const E=atob(a).split(":");s=E[1]!=="null"?parseInt(E[1]):null}let r="SELECT COUNT(*) as count FROM customers",l="SELECT COUNT(*) as count FROM financing_requests",o='SELECT COUNT(*) as count FROM financing_requests WHERE status = "pending"',i='SELECT COUNT(*) as count FROM financing_requests WHERE status = "approved"',n='SELECT COUNT(*) as count FROM subscriptions WHERE status = "active"',d="SELECT COUNT(*) as count FROM users WHERE is_active = 1";s!==null&&(r+=" WHERE tenant_id = ?",l+=" WHERE tenant_id = ?",o+=" AND tenant_id = ?",i+=" AND tenant_id = ?",n+=" AND tenant_id = ?",d+=" AND tenant_id = ?");const p=s!==null?await e.env.DB.prepare(r).bind(s).first():await e.env.DB.prepare(r).first(),u=s!==null?await e.env.DB.prepare(l).bind(s).first():await e.env.DB.prepare(l).first(),m=s!==null?await e.env.DB.prepare(o).bind(s).first():await e.env.DB.prepare(o).first(),b=s!==null?await e.env.DB.prepare(i).bind(s).first():await e.env.DB.prepare(i).first(),g=s!==null?await e.env.DB.prepare(n).bind(s).first():await e.env.DB.prepare(n).first(),f=s!==null?await e.env.DB.prepare(d).bind(s).first():await e.env.DB.prepare(d).first();let x="SELECT COUNT(*) as count FROM banks";s!==null&&(x+=" WHERE tenant_id = ?");const h=s!==null?await e.env.DB.prepare(x).bind(s).first():await e.env.DB.prepare(x).first(),_=await e.env.DB.prepare('SELECT COUNT(*) as count FROM tenants WHERE status = "active"').first(),w=await e.env.DB.prepare("SELECT COUNT(*) as count FROM calculations").first();return e.json({success:!0,data:{total_customers:p?.count||0,total_requests:u?.count||0,pending_requests:m?.count||0,approved_requests:b?.count||0,active_subscriptions:g?.count||0,total_calculations:w?.count||0,active_banks:h?.count||0,active_tenants:_?.count||0,active_users:f?.count||0}})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/customers/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM financing_requests WHERE customer_id = ?").bind(t).run(),await e.env.DB.prepare("DELETE FROM customers WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف العميل بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/financing-requests/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM financing_requests WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف الطلب بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/banks/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM banks WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف البنك بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/rates/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM bank_financing_rates WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف النسبة بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/subscriptions/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM subscriptions WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف الاشتراك بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/users/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM users WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف المستخدم بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/packages/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM packages WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف الباقة بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/subscription-requests",async e=>{try{const{results:t}=await e.env.DB.prepare(`
      SELECT 
        sr.*,
        p.package_name
      FROM subscription_requests sr
      LEFT JOIN packages p ON sr.package_id = p.id
      ORDER BY sr.created_at DESC
    `).all();return e.json({success:!0,data:t})}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/subscription-requests/:id/status",async e=>{try{const t=e.req.param("id"),{status:a,notes:s}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE subscription_requests 
      SET status = ?, notes = ?
      WHERE id = ?
    `).bind(a,s,t).run(),e.json({success:!0,message:"تم تحديث حالة الطلب بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/subscription-requests/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM subscription_requests WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف طلب الاشتراك بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/permissions",async e=>{try{const t=await e.env.DB.prepare("SELECT * FROM permissions ORDER BY category, id").all();return e.json({success:!0,data:t.results})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/permissions/by-category",async e=>{try{const a=(await e.env.DB.prepare("SELECT * FROM permissions ORDER BY category, id").all()).results,s={};return a.forEach(r=>{s[r.category]||(s[r.category]=[]),s[r.category].push(r)}),e.json({success:!0,data:s})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/roles/:roleId/permissions",async e=>{try{const t=e.req.param("roleId"),a=await e.env.DB.prepare(`
      SELECT p.* FROM permissions p
      INNER JOIN role_permissions rp ON p.id = rp.permission_id
      WHERE rp.role_id = ?
      ORDER BY p.category, p.id
    `).bind(t).all();return e.json({success:!0,data:a.results})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/users/:userId/permissions",async e=>{try{const t=e.req.param("userId"),a=await e.env.DB.prepare(`
      SELECT p.* FROM permissions p
      INNER JOIN role_permissions rp ON p.id = rp.permission_id
      INNER JOIN users u ON u.role_id = rp.role_id
      WHERE u.id = ?
      ORDER BY p.category, p.id
    `).bind(t).all();return e.json({success:!0,data:a.results})}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/roles/:roleId/permissions",async e=>{try{const t=e.req.param("roleId"),{permission_ids:a}=await e.req.json();await e.env.DB.prepare("DELETE FROM role_permissions WHERE role_id = ?").bind(t).run();for(const s of a)await e.env.DB.prepare("INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)").bind(t,s).run();return e.json({success:!0,message:"تم تحديث صلاحيات الدور بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/users/check-permission",async e=>{try{const{user_id:t,permission_key:a}=await e.req.json(),s=await e.env.DB.prepare(`
      SELECT COUNT(*) as has_permission FROM permissions p
      INNER JOIN role_permissions rp ON p.id = rp.permission_id
      INNER JOIN users u ON u.role_id = rp.role_id
      WHERE u.id = ? AND p.permission_key = ?
    `).bind(t,a).first();return e.json({success:!0,has_permission:s?.has_permission>0})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/roles",async e=>{try{const t=await e.env.DB.prepare(`
      SELECT r.*, 
             COUNT(rp.permission_id) as permissions_count
      FROM roles r
      LEFT JOIN role_permissions rp ON r.id = rp.role_id
      GROUP BY r.id
      ORDER BY r.id
    `).all();return e.json({success:!0,data:t.results})}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/users/:id",async e=>{try{const t=e.req.param("id"),{full_name:a,email:s,phone:r,role_id:l,is_active:o}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE users 
      SET full_name = ?, email = ?, phone = ?, role_id = ?, is_active = ?
      WHERE id = ?
    `).bind(a,s,r,l,o,t).run(),e.json({success:!0,message:"تم تحديث بيانات المستخدم بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/",e=>e.html(Ve));c.get("/calculator",e=>e.html(oe));c.get("/calculator-old",e=>e.html(Ge));c.get("/c/:tenant/calculator",async e=>{const t=e.req.param("tenant"),a=await e.env.DB.prepare(`
    SELECT * FROM tenants WHERE slug = ? AND status = 'active'
  `).bind(t).first();return a?e.html(oe.replace(/حاسبة التمويل الذكية/g,`حاسبة تمويل ${a.company_name}`).replace("/api/calculator/submit-request",`/api/c/${t}/calculator/submit-request`).replace("<script>",`<script>
        // Tenant information for company-specific calculator
        window.TENANT_NAME = '${a.company_name.replace(/'/g,"\\'")}';
    `).replace("سيتم التواصل معك قريباً من ' + selectedBestOffer.bank.bank_name",`سيتم المراجعة من شركة ${a.company_name.replace(/'/g,"\\'")} وسوف يتم التواصل معك قريباً'`)):e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>شركة غير موجودة</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-100 min-h-screen flex items-center justify-center">
        <div class="max-w-md mx-auto text-center p-8 bg-white rounded-xl shadow-lg">
          <i class="fas fa-building text-6xl text-red-500 mb-4"></i>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">الشركة غير موجودة</h1>
          <p class="text-gray-600 mb-6">لم نتمكن من العثور على هذه الشركة</p>
          <a href="/" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block">
            <i class="fas fa-home ml-2"></i>
            العودة للصفحة الرئيسية
          </a>
        </div>
      </body>
      </html>
    `)});c.get("/login",e=>e.html(Qe));c.get("/forgot-password",e=>e.html(Xe));c.get("/packages",e=>e.html(Ke));c.get("/subscribe",e=>e.html(Ze));c.get("/admin",e=>e.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تحميل...</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body>
        <script>
            // Check if user is logged in
            const authToken = localStorage.getItem('authToken');
            const userData = localStorage.getItem('userData');
            
            if (authToken && userData) {
                // User is logged in, load admin panel
                window.location.replace('/admin/panel');
            } else {
                // User is not logged in, show login required page
                document.body.innerHTML = \`
                    <div class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center">
                        <div class="max-w-md w-full mx-4">
                            <div class="bg-white rounded-2xl shadow-2xl p-8 text-center">
                                <div class="mb-6">
                                    <i class="fas fa-lock text-6xl text-blue-600"></i>
                                </div>
                                <h1 class="text-3xl font-bold text-gray-800 mb-4">تسجيل الدخول مطلوب</h1>
                                <p class="text-gray-600 mb-6">
                                    يجب تسجيل الدخول للوصول إلى لوحة الإدارة
                                </p>
                                <div class="space-y-3">
                                    <a href="/login" class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                                        <i class="fas fa-sign-in-alt ml-2"></i>
                                        تسجيل الدخول
                                    </a>
                                    <a href="/" class="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
                                        <i class="fas fa-home ml-2"></i>
                                        العودة للرئيسية
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                \`;
            }
        <\/script>
    </body>
    </html>
  `));c.get("/api/reports/statistics",async e=>{try{const t=e.req.query("from_date"),a=e.req.query("to_date"),r=e.req.header("Authorization")?.replace("Bearer ","");let l=null;if(r){const b=atob(r).split(":");l=b[1]!=="null"?parseInt(b[1]):null}let o="1=1";const i=[];l&&(o+=" AND f.tenant_id = ?",i.push(l)),t&&(o+=" AND DATE(f.created_at) >= ?",i.push(t)),a&&(o+=" AND DATE(f.created_at) <= ?",i.push(a));const n=`
      SELECT 
        COUNT(*) as total_requests,
        SUM(CASE WHEN f.status = 'approved' THEN 1 ELSE 0 END) as approved_requests,
        SUM(CASE WHEN f.status = 'pending' THEN 1 ELSE 0 END) as pending_requests,
        SUM(CASE WHEN f.status = 'rejected' THEN 1 ELSE 0 END) as rejected_requests,
        SUM(f.requested_amount) as total_amount
      FROM financing_requests f
      WHERE ${o}
    `,d=await e.env.DB.prepare(n).bind(...i).first(),p=`
      SELECT 
        c.full_name as customer_name,
        COUNT(f.id) as request_count,
        SUM(f.requested_amount) as total_amount,
        MAX(f.created_at) as last_request_date
      FROM financing_requests f
      JOIN customers c ON f.customer_id = c.id
      WHERE ${o}
      GROUP BY c.id
      ORDER BY request_count DESC, total_amount DESC
      LIMIT 10
    `,{results:u}=await e.env.DB.prepare(p).bind(...i).all();return e.json({success:!0,data:{...d,top_customers:u}})}catch(t){return console.error("Reports API error:",t),e.json({success:!1,error:t.message},500)}});c.get("/api/reports/requests-followup",async e=>{try{const a=e.req.header("Authorization")?.replace("Bearer ","");let s=null;if(a){const i=atob(a).split(":");s=i[1]!=="null"?parseInt(i[1]):null}if(!s)return e.json({success:!1,error:"يجب تحديد الشركة"},400);const r=`
      SELECT 
        fr.id,
        fr.created_at,
        fr.pending_at,
        fr.under_review_at,
        fr.processing_at,
        fr.approved_at,
        fr.rejected_at,
        fr.reviewed_at,
        fr.status,
        fr.requested_amount,
        c.full_name as customer_name,
        c.phone as customer_phone,
        u.full_name as employee_name,
        u.username as employee_username,
        CASE 
          WHEN fr.status = 'approved' AND fr.approved_at IS NOT NULL THEN fr.approved_at
          WHEN fr.status = 'rejected' AND fr.rejected_at IS NOT NULL THEN fr.rejected_at
          WHEN fr.status = 'processing' AND fr.processing_at IS NOT NULL THEN fr.processing_at
          WHEN fr.status = 'under_review' AND fr.under_review_at IS NOT NULL THEN fr.under_review_at
          WHEN fr.reviewed_at IS NOT NULL THEN fr.reviewed_at
          ELSE NULL
        END as last_update,
        CASE 
          WHEN fr.status = 'approved' AND fr.approved_at IS NOT NULL THEN 
            CAST((julianday(fr.approved_at) - julianday(fr.created_at)) AS INTEGER)
          WHEN fr.status = 'rejected' AND fr.rejected_at IS NOT NULL THEN 
            CAST((julianday(fr.rejected_at) - julianday(fr.created_at)) AS INTEGER)
          ELSE 
            CAST((julianday('now') - julianday(fr.created_at)) AS INTEGER)
        END as days_elapsed,
        CASE 
          WHEN fr.status IN ('approved', 'rejected') THEN 1
          ELSE 0
        END as is_closed
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      LEFT JOIN customer_assignments ca ON c.id = ca.customer_id
      LEFT JOIN users u ON ca.employee_id = u.id
      WHERE fr.tenant_id = ?
      ORDER BY fr.created_at DESC
    `,{results:l}=await e.env.DB.prepare(r).bind(s).all();return e.json({success:!0,data:l})}catch(t){return console.error("Requests follow-up report error:",t),e.json({success:!1,error:t.message},500)}});c.get("/admin/panel",e=>e.html(ne));c.get("/admin/reports/requests-followup",async e=>{try{const t=e.req.query("tenant_id");return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تقرير متابعة طلبات التمويل</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <style>
          /* Custom Scrollbar - Enhanced */
          .overflow-x-auto {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #3b82f6 #f7fafc;
          }
          
          .overflow-x-auto::-webkit-scrollbar {
            height: 12px;
            width: 12px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 10px;
            margin: 0 10px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
            border-radius: 10px;
            border: 2px solid #e5e7eb;
          }
          
          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
            border-color: #d1d5db;
          }
          
          /* Force scrollbar to always show */
          .overflow-x-auto {
            overflow-x: scroll !important; /* Always show scrollbar */
          }
          
          .overflow-x-auto table {
            min-width: 1200px; /* Force table to be wide enough for scrollbar */
            width: max-content;
          }
          
          ${k()}
          
          /* Scroll Buttons for Tables */
          .scroll-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            border: 3px solid white;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            transition: all 0.3s ease;
            font-size: 18px;
          }
          
          .scroll-btn:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            transform: translateY(-50%) scale(1.1);
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6);
          }
          
          .scroll-btn:active {
            transform: translateY(-50%) scale(0.95);
          }
          
          .scroll-btn-right {
            right: -20px;
          }
          
          .scroll-btn-left {
            left: -20px;
          }
          
          @media (max-width: 768px) {
            .scroll-btn {
              width: 44px;
              height: 44px;
              font-size: 16px;
              border-width: 2px;
            }
            
            .scroll-btn-right {
              right: 8px;
            }
            
            .scroll-btn-left {
              left: 8px;
            }
          }
        </style>
      </head>
      <body class="bg-gray-50">
        <script>
          // Auto-redirect with tenant_id if not present
          (function() {
            const urlParams = new URLSearchParams(window.location.search);
            if (!urlParams.has('tenant_id')) {
              const userData = localStorage.getItem('userData');
              if (userData) {
                try {
                  const user = JSON.parse(userData);
                  if (user.tenant_id) {
                    window.location.replace('/admin/reports/requests-followup?tenant_id=' + user.tenant_id);
                  }
                } catch (e) {
                  console.error('Error parsing userData:', e);
                }
              }
            }
          })();
        <\/script>
        
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة للوحة التحكم
            </a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-6 gap-4 flex-wrap">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-file-alt text-blue-600 ml-2"></i>
                تقرير متابعة طلبات التمويل
              </h1>
              <div class="flex items-center gap-3">
                <div class="relative">
                  <input 
                    type="text" 
                    id="searchFollowup" 
                    placeholder="بحث في الطلبات..." 
                    class="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onkeyup="searchFollowupTable()"
                  />
                  <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                </div>
                <button onclick="exportToExcel()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md whitespace-nowrap">
                  <i class="fas fa-file-excel ml-2"></i>
                  تصدير Excel
                </button>
              </div>
            </div>
            
            <!-- Loading Indicator -->
            <div id="loading" class="text-center py-12">
              <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
              <p class="text-gray-600">جاري تحميل البيانات...</p>
            </div>
            
            <!-- Table Container with Scroll Buttons -->
            <div class="hidden" id="tableWrapper">
              <div class="relative">
                <!-- Right Scroll Button -->
                <button 
                  id="scrollLeftBtn" 
                  onclick="scrollTable('left')"
                  class="scroll-btn scroll-btn-left hidden"
                  aria-label="تمرير لليسار"
                >
                  <i class="fas fa-chevron-left"></i>
                </button>
                
                <!-- Left Scroll Button -->
                <button 
                  id="scrollRightBtn" 
                  onclick="scrollTable('right')"
                  class="scroll-btn scroll-btn-right hidden"
                  aria-label="تمرير لليمين"
                >
                  <i class="fas fa-chevron-right"></i>
                </button>
                
                <div id="tableContainer" class="overflow-x-auto">
                  <table class="w-full">
                <thead class="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th class="px-4 py-3 text-right text-sm font-bold">#</th>
                    <th class="px-4 py-3 text-right text-sm font-bold">اسم العميل</th>
                    <th class="px-4 py-3 text-right text-sm font-bold">رقم الهاتف</th>
                    <th class="px-4 py-3 text-right text-sm font-bold">الموظف المخصص</th>
                    <th class="px-4 py-3 text-right text-sm font-bold">تاريخ تقديم الطلب</th>
                    <th class="px-4 py-3 text-right text-sm font-bold">مراحل الطلب</th>
                    <th class="px-4 py-3 text-right text-sm font-bold">آخر تحديث</th>
                    <th class="px-4 py-3 text-right text-sm font-bold">إجمالي الوقت</th>
                    <th class="px-4 py-3 text-right text-sm font-bold">المبلغ المطلوب</th>
                    <th class="px-4 py-3 text-right text-sm font-bold">حالة الطلب</th>
                  </tr>
                </thead>
                <tbody id="reportTable" class="divide-y divide-gray-200">
                </tbody>
              </table>
            </div>
              </div>
            </div>
            
            <!-- Empty State -->
            <div id="emptyState" class="hidden text-center py-12">
              <i class="fas fa-inbox text-gray-300 text-6xl mb-4"></i>
              <p class="text-gray-500 text-xl">لا توجد طلبات لعرضها</p>
            </div>
          </div>
        </div>
        
        <script>
          let reportData = [];
          
          async function loadReport() {
            try {
              const urlParams = new URLSearchParams(window.location.search);
              const tenantId = urlParams.get('tenant_id');
              
              if (!tenantId) {
                alert('خطأ: لم يتم تحديد الشركة');
                return;
              }
              
              const authToken = localStorage.getItem('authToken');
              const response = await axios.get('/api/reports/requests-followup', {
                headers: {
                  'Authorization': 'Bearer ' + authToken
                }
              });
              
              if (response.data.success) {
                reportData = response.data.data;
                displayReport(reportData);
              } else {
                alert('خطأ: ' + response.data.error);
              }
            } catch (error) {
              console.error('Error loading report:', error);
              alert('حدث خطأ أثناء تحميل التقرير');
            } finally {
              document.getElementById('loading').classList.add('hidden');
            }
          }
          
          function displayReport(data) {
            const tbody = document.getElementById('reportTable');
            const tableContainer = document.getElementById('tableContainer');
            const emptyState = document.getElementById('emptyState');
            
            if (data.length === 0) {
              emptyState.classList.remove('hidden');
              return;
            }
            
            tableContainer.classList.remove('hidden');
            document.getElementById('tableWrapper')?.classList.remove('hidden');
            
            tbody.innerHTML = data.map((row, index) => {
              const statusColors = {
                'pending': 'bg-yellow-100 text-yellow-800',
                'approved': 'bg-green-100 text-green-800',
                'rejected': 'bg-red-100 text-red-800',
                'processing': 'bg-blue-100 text-blue-800'
              };
              
              const statusNames = {
                'pending': 'قيد الانتظار',
                'approved': 'مقبول',
                'rejected': 'مرفوض',
                'processing': 'قيد المعالجة'
              };
              
              const statusClass = statusColors[row.status] || 'bg-gray-100 text-gray-800';
              const statusName = statusNames[row.status] || row.status;
              
              const createdDate = new Date(row.created_at);
              const formattedDate = createdDate.toLocaleDateString('ar-SA') + ' ' + createdDate.toLocaleTimeString('ar-SA', {hour: '2-digit', minute: '2-digit'});
              
              // Build timeline/stages
              const stages = [];
              
              // Stage 1: قيد الانتظار
              if (row.pending_at) {
                const pendingDate = new Date(row.pending_at);
                stages.push(\`
                  <div class="flex items-center text-xs mb-1">
                    <span class="w-2 h-2 rounded-full bg-yellow-500 ml-2"></span>
                    <span class="font-bold">قيد الانتظار:</span>
                    <span class="text-gray-600 mr-1">\${pendingDate.toLocaleDateString('ar-SA')} \${pendingDate.toLocaleTimeString('ar-SA', {hour: '2-digit', minute: '2-digit'})}</span>
                  </div>
                \`);
              }
              
              // Stage 2: تحت المراجعة
              if (row.under_review_at) {
                const reviewDate = new Date(row.under_review_at);
                stages.push(\`
                  <div class="flex items-center text-xs mb-1">
                    <span class="w-2 h-2 rounded-full bg-blue-500 ml-2"></span>
                    <span class="font-bold">تحت المراجعة:</span>
                    <span class="text-gray-600 mr-1">\${reviewDate.toLocaleDateString('ar-SA')} \${reviewDate.toLocaleTimeString('ar-SA', {hour: '2-digit', minute: '2-digit'})}</span>
                  </div>
                \`);
              }
              
              // Stage 3: قيد المعالجة
              if (row.processing_at) {
                const processingDate = new Date(row.processing_at);
                stages.push(\`
                  <div class="flex items-center text-xs mb-1">
                    <span class="w-2 h-2 rounded-full bg-indigo-500 ml-2"></span>
                    <span class="font-bold">قيد المعالجة:</span>
                    <span class="text-gray-600 mr-1">\${processingDate.toLocaleDateString('ar-SA')} \${processingDate.toLocaleTimeString('ar-SA', {hour: '2-digit', minute: '2-digit'})}</span>
                  </div>
                \`);
              }
              
              // Stage 4: مقبول
              if (row.approved_at) {
                const approvedDate = new Date(row.approved_at);
                stages.push(\`
                  <div class="flex items-center text-xs mb-1">
                    <span class="w-2 h-2 rounded-full bg-green-500 ml-2"></span>
                    <span class="font-bold text-green-700">✓ مقبول:</span>
                    <span class="text-gray-600 mr-1">\${approvedDate.toLocaleDateString('ar-SA')} \${approvedDate.toLocaleTimeString('ar-SA', {hour: '2-digit', minute: '2-digit'})}</span>
                  </div>
                \`);
              }
              
              // Stage 5: مرفوض
              if (row.rejected_at) {
                const rejectedDate = new Date(row.rejected_at);
                stages.push(\`
                  <div class="flex items-center text-xs mb-1">
                    <span class="w-2 h-2 rounded-full bg-red-500 ml-2"></span>
                    <span class="font-bold text-red-700">✗ مرفوض:</span>
                    <span class="text-gray-600 mr-1">\${rejectedDate.toLocaleDateString('ar-SA')} \${rejectedDate.toLocaleTimeString('ar-SA', {hour: '2-digit', minute: '2-digit'})}</span>
                  </div>
                \`);
              }
              
              const stagesHTML = stages.length > 0 ? stages.join('') : '<span class="text-gray-400 text-xs">لا توجد مراحل مسجلة</span>';
              
              // Format last_update
              const lastUpdateDate = row.last_update ? new Date(row.last_update) : null;
              const formattedLastUpdate = lastUpdateDate ? 
                lastUpdateDate.toLocaleDateString('ar-SA') + ' ' + lastUpdateDate.toLocaleTimeString('ar-SA', {hour: '2-digit', minute: '2-digit'}) :
                '<span class="text-gray-400">-</span>';
              
              const daysElapsed = row.days_elapsed || 0;
              const isClosed = row.is_closed === 1;
              
              // Format time elapsed based on status
              let timeElapsed = '';
              if (daysElapsed === 0) {
                timeElapsed = 'اليوم';
              } else if (daysElapsed === 1) {
                timeElapsed = 'يوم واحد';
              } else {
                timeElapsed = daysElapsed + ' يوم';
              }
              
              // Add indicator if closed
              const timeDisplay = isClosed ? 
                \`<i class="fas fa-stopwatch ml-1"></i>\${timeElapsed}\` : 
                \`<i class="fas fa-clock ml-1"></i>\${timeElapsed}\`;
              
              const timeClass = isClosed ? 
                'px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold' : 
                'px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold';
              
              return \`
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-4 text-sm">\${index + 1}</td>
                  <td class="px-4 py-4 font-bold">\${row.customer_name || '-'}</td>
                  <td class="px-4 py-4 text-sm text-gray-600">\${row.customer_phone || '-'}</td>
                  <td class="px-4 py-4 text-sm">
                    \${row.employee_name ? \`
                      <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                        <i class="fas fa-user ml-1"></i>
                        \${row.employee_name}
                      </span>
                    \` : '<span class="text-gray-400">غير مخصص</span>'}
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-600">\${formattedDate}</td>
                  <td class="px-4 py-4">
                    <div class="space-y-1">
                      \${stagesHTML}
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-600">
                    \${formattedLastUpdate}
                  </td>
                  <td class="px-4 py-4">
                    <span class="\${timeClass}">
                      \${timeDisplay}
                    </span>
                    \${isClosed ? '<div class="text-xs text-gray-500 mt-1">⏸️ منتهي</div>' : '<div class="text-xs text-purple-600 mt-1">⏱️ جاري العد</div>'}
                  </td>
                  <td class="px-4 py-4 font-bold text-green-600">
                    \${row.requested_amount ? row.requested_amount.toLocaleString('ar-SA') + ' ريال' : '-'}
                  </td>
                  <td class="px-4 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold \${statusClass}">
                      \${statusName}
                    </span>
                  </td>
                </tr>
              \`;
            }).join('');
          }
          
          function exportToExcel() {
            if (reportData.length === 0) {
              alert('لا توجد بيانات لتصديرها');
              return;
            }
            
            // Create CSV content
            let csv = 'رقم,اسم العميل,رقم الهاتف,الموظف المخصص,تاريخ تقديم الطلب,المدة المنقضية (أيام),المبلغ المطلوب,حالة الطلب\\n';
            
            reportData.forEach((row, index) => {
              const statusNames = {
                'pending': 'قيد الانتظار',
                'approved': 'مقبول',
                'rejected': 'مرفوض',
                'processing': 'قيد المعالجة'
              };
              
              const createdDate = new Date(row.created_at).toLocaleDateString('ar-SA');
              
              csv += \`\${index + 1},\`;
              csv += \`"\${row.customer_name || '-'}",\`;
              csv += \`"\${row.customer_phone || '-'}",\`;
              csv += \`"\${row.employee_name || 'غير مخصص'}",\`;
              csv += \`"\${createdDate}",\`;
              csv += \`\${row.days_elapsed || 0},\`;
              csv += \`\${row.requested_amount || 0},\`;
              csv += \`"\${statusNames[row.status] || row.status}"\\n\`;
            });
            
            // Create download link
            const BOM = "\\uFEFF";
            const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.setAttribute('href', url);
            link.setAttribute('download', 'تقرير_متابعة_الطلبات_' + new Date().toISOString().split('T')[0] + '.csv');
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          
          function searchFollowupTable() {
            const searchValue = document.getElementById('searchFollowup').value.toLowerCase();
            const tbody = document.getElementById('reportTable');
            const rows = tbody.querySelectorAll('tr');
            
            rows.forEach(row => {
              const text = row.textContent.toLowerCase();
              if (text.includes(searchValue)) {
                row.style.display = '';
              } else {
                row.style.display = 'none';
              }
            });
          }
          
          // Scroll table function
          function scrollTable(direction) {
            const container = document.getElementById('tableContainer');
            const scrollAmount = 300; // pixels to scroll
            
            if (direction === 'right') {
              container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else {
              container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
            
            // Update button visibility after scroll
            setTimeout(checkScrollButtons, 300);
          }
          
          // Check if scroll buttons should be visible
          function checkScrollButtons() {
            const container = document.getElementById('tableContainer');
            const leftBtn = document.getElementById('scrollLeftBtn');
            const rightBtn = document.getElementById('scrollRightBtn');
            
            if (!container || !leftBtn || !rightBtn) return;
            
            const canScrollLeft = container.scrollLeft > 0;
            const canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth - 10);
            
            // Show/hide buttons based on scroll position
            if (canScrollLeft) {
              leftBtn.classList.remove('hidden');
            } else {
              leftBtn.classList.add('hidden');
            }
            
            if (canScrollRight) {
              rightBtn.classList.remove('hidden');
            } else {
              rightBtn.classList.add('hidden');
            }
          }
          
          // Initialize scroll buttons after table loads
          function initScrollButtons() {
            const container = document.getElementById('tableContainer');
            const wrapper = document.getElementById('tableWrapper');
            
            if (container && wrapper) {
              wrapper.classList.remove('hidden');
              
              // Check initially
              checkScrollButtons();
              
              // Check on scroll
              container.addEventListener('scroll', checkScrollButtons);
              
              // Check on window resize
              window.addEventListener('resize', checkScrollButtons);
            }
          }
          
          // Load report on page load
          loadReport().then(() => {
            // Initialize scroll buttons after data is loaded
            setTimeout(initScrollButtons, 500);
          });
        <\/script>
      </body>
      </html>
    `)}catch(t){return e.html("<h1>Error: "+t.message+"</h1>",500)}});c.get("/admin/tenants/add",e=>e.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إضافة شركة جديدة - SaaS Multi-Tenant</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    </head>
    <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
            <div class="mb-6">
                <a href="/admin/tenants" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة لقائمة الشركات
                </a>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-8">
                    <i class="fas fa-plus-circle text-emerald-600 ml-2"></i>
                    إضافة شركة جديدة
                </h1>
                
                <form id="addTenantForm" onsubmit="handleSubmit(event)" class="space-y-6">
                    <!-- Basic Information -->
                    <div class="border-b pb-6">
                        <h2 class="text-xl font-bold text-gray-700 mb-4">
                            <i class="fas fa-info-circle ml-2"></i>
                            المعلومات الأساسية
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    اسم الشركة <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="company_name"
                                    required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="مثال: شركة التمويل الأولى"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Slug (معرف فريد) <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="slug"
                                    required
                                    pattern="[a-z0-9-]+"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="tamweel-1"
                                >
                                <p class="text-xs text-gray-500 mt-1">حروف صغيرة وأرقام وشرطات فقط</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Settings -->
                    <div class="border-b pb-6">
                        <h2 class="text-xl font-bold text-gray-700 mb-4">
                            <i class="fas fa-cog ml-2"></i>
                            الإعدادات
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                                <select 
                                    id="status"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="active">نشط</option>
                                    <option value="trial">تجريبي</option>
                                    <option value="suspended">متوقف</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">عدد المستخدمين الأقصى</label>
                                <input 
                                    type="number" 
                                    id="max_users"
                                    value="10"
                                    min="1"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Subdomain (اختياري)</label>
                                <input 
                                    type="text" 
                                    id="subdomain"
                                    pattern="[a-z0-9-]*"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="company1"
                                >
                            </div>
                        </div>
                    </div>
                    
                    <!-- Contact Information -->
                    <div>
                        <h2 class="text-xl font-bold text-gray-700 mb-4">
                            <i class="fas fa-address-card ml-2"></i>
                            معلومات الاتصال (اختياري)
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                                <input 
                                    type="email" 
                                    id="contact_email"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="info@company.com"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                                <input 
                                    type="tel" 
                                    id="contact_phone"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="+966501234567"
                                >
                            </div>
                        </div>
                    </div>
                    
                    <!-- Submit Buttons -->
                    <div class="flex gap-4 pt-4">
                        <button 
                            type="submit"
                            class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
                        >
                            <i class="fas fa-save ml-2"></i>
                            حفظ الشركة
                        </button>
                        <a 
                            href="/admin/tenants"
                            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all text-center"
                        >
                            <i class="fas fa-times ml-2"></i>
                            إلغاء
                        </a>
                    </div>
                </form>
                
                <div id="message" class="mt-4"></div>
            </div>
        </div>
        
        <script>
            // Auto-generate slug from company name
            document.getElementById('company_name').addEventListener('input', function(e) {
                const slug = e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9\\s-]/g, '')
                    .replace(/\\s+/g, '-')
                    .replace(/-+/g, '-')
                    .substring(0, 50);
                document.getElementById('slug').value = slug;
            });
            
            async function handleSubmit(event) {
                event.preventDefault();
                
                const data = {
                    company_name: document.getElementById('company_name').value,
                    slug: document.getElementById('slug').value,
                    status: document.getElementById('status').value,
                    max_users: parseInt(document.getElementById('max_users').value),
                    subdomain: document.getElementById('subdomain').value || null,
                    contact_email: document.getElementById('contact_email').value || null,
                    contact_phone: document.getElementById('contact_phone').value || null
                };
                
                try {
                    const response = await axios.post('/api/tenants', data);
                    
                    if (response.data.success) {
                        document.getElementById('message').innerHTML = \`
                            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                <i class="fas fa-check-circle ml-2"></i>
                                تم إضافة الشركة بنجاح!
                            </div>
                        \`;
                        
                        setTimeout(() => {
                            window.location.href = '/admin/tenants';
                        }, 1500);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    document.getElementById('message').innerHTML = \`
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <i class="fas fa-exclamation-circle ml-2"></i>
                            خطأ في الإضافة: \${error.response?.data?.error || error.message}
                        </div>
                    \`;
                }
            }
        <\/script>
    </body>
    </html>
  `));c.get("/admin/tenants/:id/edit",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT * FROM tenants WHERE id = ?
    `).bind(t).first();return a?e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>تعديل شركة - ${a.company_name}</title>
          <script src="https://cdn.tailwindcss.com"><\/script>
          <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
          <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
      </head>
      <body class="bg-gray-50">
          <div class="max-w-4xl mx-auto p-6">
              <div class="mb-6">
                  <a href="/admin/tenants" class="text-blue-600 hover:text-blue-800">
                      <i class="fas fa-arrow-right ml-2"></i>
                      العودة لقائمة الشركات
                  </a>
              </div>
              
              <div class="bg-white rounded-xl shadow-lg p-8">
                  <h1 class="text-3xl font-bold text-gray-800 mb-8">
                      <i class="fas fa-edit text-yellow-600 ml-2"></i>
                      تعديل شركة: ${a.company_name}
                  </h1>
                  
                  <form id="editTenantForm" onsubmit="handleSubmit(event)" class="space-y-6">
                      <!-- Basic Information -->
                      <div class="border-b pb-6">
                          <h2 class="text-xl font-bold text-gray-700 mb-4">
                              <i class="fas fa-info-circle ml-2"></i>
                              المعلومات الأساسية
                          </h2>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">
                                      اسم الشركة <span class="text-red-500">*</span>
                                  </label>
                                  <input 
                                      type="text" 
                                      id="company_name"
                                      value="${a.company_name}"
                                      required
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                              </div>
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">
                                      Slug (معرف فريد) <span class="text-red-500">*</span>
                                  </label>
                                  <input 
                                      type="text" 
                                      id="slug"
                                      value="${a.slug}"
                                      required
                                      pattern="[a-z0-9-]+"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                                  <p class="text-xs text-gray-500 mt-1">حروف صغيرة وأرقام وشرطات فقط</p>
                              </div>
                          </div>
                      </div>
                      
                      <!-- Settings -->
                      <div class="border-b pb-6">
                          <h2 class="text-xl font-bold text-gray-700 mb-4">
                              <i class="fas fa-cog ml-2"></i>
                              الإعدادات
                          </h2>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                                  <select 
                                      id="status"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                                      <option value="active" ${a.status==="active"?"selected":""}>نشط</option>
                                      <option value="trial" ${a.status==="trial"?"selected":""}>تجريبي</option>
                                      <option value="suspended" ${a.status==="suspended"?"selected":""}>متوقف</option>
                                  </select>
                              </div>
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">عدد المستخدمين الأقصى</label>
                                  <input 
                                      type="number" 
                                      id="max_users"
                                      value="${a.max_users||10}"
                                      min="1"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                              </div>
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">Subdomain (اختياري)</label>
                                  <input 
                                      type="text" 
                                      id="subdomain"
                                      value="${a.subdomain||""}"
                                      pattern="[a-z0-9-]*"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                              </div>
                          </div>
                      </div>
                      
                      <!-- Contact Information -->
                      <div>
                          <h2 class="text-xl font-bold text-gray-700 mb-4">
                              <i class="fas fa-address-card ml-2"></i>
                              معلومات الاتصال (اختياري)
                          </h2>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                                  <input 
                                      type="email" 
                                      id="contact_email"
                                      value="${a.contact_email||""}"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                              </div>
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                                  <input 
                                      type="tel" 
                                      id="contact_phone"
                                      value="${a.contact_phone||""}"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                              </div>
                          </div>
                      </div>
                      
                      <!-- Submit Buttons -->
                      <div class="flex gap-4 pt-4">
                          <button 
                              type="submit"
                              class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
                          >
                              <i class="fas fa-save ml-2"></i>
                              حفظ التعديلات
                          </button>
                          <a 
                              href="/admin/tenants"
                              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all text-center"
                          >
                              <i class="fas fa-times ml-2"></i>
                              إلغاء
                          </a>
                      </div>
                  </form>
                  
                  <div id="message" class="mt-4"></div>
              </div>
          </div>
          
          <script>
              async function handleSubmit(event) {
                  event.preventDefault();
                  
                  const data = {
                      company_name: document.getElementById('company_name').value,
                      slug: document.getElementById('slug').value,
                      status: document.getElementById('status').value,
                      max_users: parseInt(document.getElementById('max_users').value),
                      subdomain: document.getElementById('subdomain').value || null,
                      contact_email: document.getElementById('contact_email').value || null,
                      contact_phone: document.getElementById('contact_phone').value || null
                  };
                  
                  try {
                      const response = await axios.put('/api/tenants/${t}', data);
                      
                      if (response.data.success) {
                          document.getElementById('message').innerHTML = \`
                              <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                  <i class="fas fa-check-circle ml-2"></i>
                                  تم تحديث الشركة بنجاح!
                              </div>
                          \`;
                          
                          setTimeout(() => {
                              window.location.href = '/admin/tenants';
                          }, 1500);
                      }
                  } catch (error) {
                      console.error('Error:', error);
                      document.getElementById('message').innerHTML = \`
                          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                              <i class="fas fa-exclamation-circle ml-2"></i>
                              خطأ في التحديث: \${error.response?.data?.error || error.message}
                          </div>
                      \`;
                  }
              }
          <\/script>
      </body>
      </html>
    `):e.html("<h1>الشركة غير موجودة</h1>")}catch(t){return e.html(`<h1>خطأ في تحميل الصفحة: ${t.message}</h1>`)}});c.get("/admin/tenants/:id",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT * FROM tenants WHERE id = ?
    `).bind(t).first();if(!a)return e.html("<h1>الشركة غير موجودة</h1>");const s=await e.env.DB.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM users WHERE tenant_id = ?) as total_users,
        (SELECT COUNT(*) FROM customers WHERE tenant_id = ?) as total_customers,
        (SELECT COUNT(*) FROM financing_requests WHERE tenant_id = ?) as total_requests
    `).bind(t,t,t).first();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>عرض شركة - ${a.company_name}</title>
          <script src="https://cdn.tailwindcss.com"><\/script>
          <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
          <div class="max-w-6xl mx-auto p-6">
              <div class="mb-6 flex justify-between items-center">
                  <a href="/admin/tenants" class="text-blue-600 hover:text-blue-800">
                      <i class="fas fa-arrow-right ml-2"></i>
                      العودة لقائمة الشركات
                  </a>
                  <div class="flex gap-3">
                      <a href="/admin/tenants/${t}/edit" class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg">
                          <i class="fas fa-edit ml-2"></i>
                          تعديل
                      </a>
                      <a href="/c/${a.slug}/admin" target="_blank" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">
                          <i class="fas fa-external-link-alt ml-2"></i>
                          لوحة التحكم
                      </a>
                  </div>
              </div>
              
              <!-- Company Header -->
              <div class="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-xl shadow-lg p-8 mb-6">
                  <div class="flex items-center justify-between">
                      <div>
                          <h1 class="text-3xl font-bold mb-2">
                              <i class="fas fa-building ml-2"></i>
                              ${a.company_name}
                          </h1>
                          <p class="text-emerald-100 text-lg">
                              <code class="bg-white/20 px-3 py-1 rounded">${a.slug}</code>
                          </p>
                      </div>
                      <div class="text-right">
                          <span class="inline-block px-6 py-2 bg-white/20 rounded-full text-xl font-bold">
                              ${a.status==="active"?"🟢 نشط":a.status==="trial"?"🟡 تجريبي":"🔴 متوقف"}
                          </span>
                      </div>
                  </div>
              </div>
              
              <!-- Statistics -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div class="bg-white rounded-xl shadow-lg p-6">
                      <div class="flex items-center justify-between">
                          <div>
                              <p class="text-gray-600 text-sm mb-1">المستخدمين</p>
                              <p class="text-3xl font-bold text-blue-600">${s?.total_users||0}</p>
                              <p class="text-gray-500 text-xs mt-1">من ${a.max_users} مسموح</p>
                          </div>
                          <i class="fas fa-users text-4xl text-blue-200"></i>
                      </div>
                  </div>
                  
                  <div class="bg-white rounded-xl shadow-lg p-6">
                      <div class="flex items-center justify-between">
                          <div>
                              <p class="text-gray-600 text-sm mb-1">العملاء</p>
                              <p class="text-3xl font-bold text-green-600">${s?.total_customers||0}</p>
                          </div>
                          <i class="fas fa-user-friends text-4xl text-green-200"></i>
                      </div>
                  </div>
                  
                  <div class="bg-white rounded-xl shadow-lg p-6">
                      <div class="flex items-center justify-between">
                          <div>
                              <p class="text-gray-600 text-sm mb-1">طلبات التمويل</p>
                              <p class="text-3xl font-bold text-purple-600">${s?.total_requests||0}</p>
                          </div>
                          <i class="fas fa-file-invoice text-4xl text-purple-200"></i>
                      </div>
                  </div>
              </div>
              
              <!-- Company Details -->
              <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div class="p-6 bg-gray-50 border-b">
                      <h2 class="text-xl font-bold text-gray-800">
                          <i class="fas fa-info-circle ml-2"></i>
                          تفاصيل الشركة
                      </h2>
                  </div>
                  <div class="p-6">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">اسم الشركة</label>
                              <p class="text-lg font-semibold text-gray-900">${a.company_name}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">Slug</label>
                              <p class="text-lg font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded inline-block">${a.slug}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">Subdomain</label>
                              <p class="text-lg font-mono text-gray-900">${a.subdomain||"-"}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">الحد الأقصى للمستخدمين</label>
                              <p class="text-lg font-semibold text-gray-900">${a.max_users||10} مستخدم</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">البريد الإلكتروني</label>
                              <p class="text-lg text-gray-900">${a.contact_email||"-"}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">رقم الهاتف</label>
                              <p class="text-lg text-gray-900">${a.contact_phone||"-"}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">تاريخ الإنشاء</label>
                              <p class="text-lg text-gray-900">${new Date(a.created_at).toLocaleDateString("ar-SA")}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">الحالة</label>
                              <span class="inline-flex px-4 py-2 text-sm font-semibold rounded-full 
                                  ${a.status==="active"?"bg-green-100 text-green-800":a.status==="trial"?"bg-yellow-100 text-yellow-800":"bg-red-100 text-red-800"}">
                                  ${a.status==="active"?"نشط":a.status==="trial"?"تجريبي":"متوقف"}
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
              
              <!-- Quick Actions -->
              <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
                  <h2 class="text-xl font-bold text-gray-800 mb-4">
                      <i class="fas fa-bolt ml-2"></i>
                      إجراءات سريعة
                  </h2>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <a href="/c/${a.slug}/admin" target="_blank" 
                         class="flex flex-col items-center justify-center p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all">
                          <i class="fas fa-tachometer-alt text-2xl text-emerald-600 mb-2"></i>
                          <span class="text-sm font-medium text-gray-700">لوحة التحكم</span>
                      </a>
                      <a href="/c/${a.slug}/calculator" target="_blank" 
                         class="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all">
                          <i class="fas fa-calculator text-2xl text-blue-600 mb-2"></i>
                          <span class="text-sm font-medium text-gray-700">حاسبة التمويل</span>
                      </a>
                      <a href="/admin/tenants/${t}/edit" 
                         class="flex flex-col items-center justify-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-all">
                          <i class="fas fa-edit text-2xl text-yellow-600 mb-2"></i>
                          <span class="text-sm font-medium text-gray-700">تعديل البيانات</span>
                      </a>
                      <button onclick="if(confirm('هل أنت متأكد من الحذف؟')) window.location.href='/admin/tenants'" 
                         class="flex flex-col items-center justify-center p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-all">
                          <i class="fas fa-trash text-2xl text-red-600 mb-2"></i>
                          <span class="text-sm font-medium text-gray-700">حذف الشركة</span>
                      </button>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `)}catch(t){return e.html(`<h1>خطأ في تحميل الصفحة: ${t.message}</h1>`)}});c.get("/admin/tenants",e=>e.html(et));c.get("/admin/tenant-calculators",e=>e.html(tt));c.get("/admin/saas-settings",e=>e.html(at));c.get("/admin/reports",e=>e.html(st));c.get("/admin/reports/customers",e=>e.html(rt));c.get("/admin/reports/requests",e=>e.html(lt));c.get("/admin/reports/financial",e=>e.html(ot));c.get("/admin/payments",e=>e.html(it));c.get("/admin/banks",e=>e.html(dt));c.get("/c/:tenant/admin",async e=>{const t=e.req.param("tenant"),a=await e.env.DB.prepare(`
    SELECT * FROM tenants WHERE slug = ? AND status = 'active'
  `).bind(t).first();return a?e.html(ne.replace("لوحة التحكم - نظام حاسبة التمويل",`لوحة التحكم - ${a.company_name}`)):e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>شركة غير موجودة</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-100 min-h-screen flex items-center justify-center">
        <div class="max-w-md mx-auto text-center p-8 bg-white rounded-xl shadow-lg">
          <i class="fas fa-building text-6xl text-red-500 mb-4"></i>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">الشركة غير موجودة</h1>
          <p class="text-gray-600 mb-6">لم نتمكن من العثور على هذه الشركة</p>
          <a href="/" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block">
            <i class="fas fa-home ml-2"></i>
            العودة للصفحة الرئيسية
          </a>
        </div>
      </body>
      </html>
    `)});c.get("/test",e=>e.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تسجيل الدخول مطلوب</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center justify-center">
        <div class="max-w-md w-full mx-4">
            <div class="bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div class="mb-6">
                    <i class="fas fa-lock text-6xl text-blue-600"></i>
                </div>
                <h1 class="text-3xl font-bold text-gray-800 mb-4">تسجيل الدخول مطلوب</h1>
                <p class="text-gray-600 mb-6">
                    يجب تسجيل الدخول للوصول إلى صفحة الاختبار
                </p>
                <div class="space-y-3">
                    <a href="/login" class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        <i class="fas fa-sign-in-alt ml-2"></i>
                        تسجيل الدخول
                    </a>
                    <a href="/" class="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
                        <i class="fas fa-home ml-2"></i>
                        العودة للرئيسية
                    </a>
                </div>
            </div>
        </div>
    </body>
    </html>
  `));c.get("/admin/dashboard",async e=>{try{const t=await e.env.DB.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM customers) as total_customers,
        (SELECT COUNT(*) FROM financing_requests) as total_requests,
        (SELECT COUNT(*) FROM financing_requests WHERE status = 'pending') as pending_requests,
        (SELECT COUNT(*) FROM financing_requests WHERE status = 'approved') as approved_requests,
        (SELECT COUNT(*) FROM financing_requests WHERE status = 'rejected') as rejected_requests,
        (SELECT COUNT(*) FROM financing_requests WHERE status = 'under_review') as under_review_requests,
        (SELECT SUM(requested_amount) FROM financing_requests) as total_requested_amount,
        (SELECT SUM(requested_amount) FROM financing_requests WHERE status = 'approved') as total_approved_amount,
        (SELECT COUNT(*) FROM banks WHERE is_active = 1) as active_banks,
        (SELECT COUNT(*) FROM financing_types) as financing_types_count
    `).first(),a=await e.env.DB.prepare(`
      SELECT 
        strftime('%Y-%m', created_at) as month,
        COUNT(*) as count,
        SUM(requested_amount) as total_amount
      FROM financing_requests
      WHERE created_at >= date('now', '-6 months')
      GROUP BY strftime('%Y-%m', created_at)
      ORDER BY month
    `).all(),s=await e.env.DB.prepare(`
      SELECT 
        b.bank_name,
        COUNT(fr.id) as request_count,
        SUM(fr.requested_amount) as total_amount
      FROM banks b
      LEFT JOIN financing_requests fr ON b.id = fr.selected_bank_id
      WHERE fr.id IS NOT NULL
      GROUP BY b.id, b.bank_name
      ORDER BY request_count DESC
      LIMIT 5
    `).all(),r=await e.env.DB.prepare(`
      SELECT 
        status,
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM financing_requests), 2) as percentage
      FROM financing_requests
      GROUP BY status
    `).all(),l=a.results||[],o=s.results||[],i=r.results||[];return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>لوحة المعلومات المتقدمة</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"><\/script>
        <style>
          @media print {
            button, nav, .no-print { display: none; }
            .print-full-width { width: 100%; }
          }
          
          ${k()}
        </style>
      </head>
      <body class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div class="max-w-7xl mx-auto p-6">
          <!-- Header -->
          <div class="flex justify-between items-center mb-8 no-print">
            <div>
              <a href="/admin" class="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
                <i class="fas fa-arrow-right ml-1"></i>
                العودة للوحة الرئيسية
              </a>
              <h1 class="text-4xl font-bold text-gray-800">
                <i class="fas fa-chart-line text-blue-600 ml-2"></i>
                لوحة المعلومات المتقدمة
              </h1>
              <p class="text-gray-600 mt-2">تحليلات وإحصائيات شاملة لنظام حاسبة التمويل</p>
            </div>
            <div class="flex gap-3">
              <button onclick="window.print()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                <i class="fas fa-print ml-2"></i>
                طباعة التقرير
              </button>
              <button onclick="doLogout()" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
                <i class="fas fa-sign-out-alt ml-2"></i>
                تسجيل الخروج
              </button>
            </div>
          </div>

          <!-- Main Statistics Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-blue-100 text-sm mb-1">إجمالي العملاء</p>
                  <p class="text-4xl font-bold">${t?.total_customers||0}</p>
                </div>
                <i class="fas fa-users text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-green-100 text-sm mb-1">إجمالي الطلبات</p>
                  <p class="text-4xl font-bold">${t?.total_requests||0}</p>
                </div>
                <i class="fas fa-file-invoice text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-yellow-100 text-sm mb-1">قيد الانتظار</p>
                  <p class="text-4xl font-bold">${t?.pending_requests||0}</p>
                </div>
                <i class="fas fa-clock text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-purple-100 text-sm mb-1">موافق عليها</p>
                  <p class="text-4xl font-bold">${t?.approved_requests||0}</p>
                </div>
                <i class="fas fa-check-circle text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-red-100 text-sm mb-1">مرفوضة</p>
                  <p class="text-4xl font-bold">${t?.rejected_requests||0}</p>
                </div>
                <i class="fas fa-times-circle text-6xl opacity-20"></i>
              </div>
            </div>
          </div>

          <!-- Financial Summary & KPIs -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center mb-4">
                <div class="bg-blue-100 rounded-full p-3 ml-4">
                  <i class="fas fa-money-bill-wave text-2xl text-blue-600"></i>
                </div>
                <div>
                  <p class="text-gray-600 text-sm">إجمالي التمويل المطلوب</p>
                  <p class="text-2xl font-bold text-gray-800">${parseFloat(t?.total_requested_amount||0).toLocaleString("ar-SA")} ر.س</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center mb-4">
                <div class="bg-green-100 rounded-full p-3 ml-4">
                  <i class="fas fa-check-double text-2xl text-green-600"></i>
                </div>
                <div>
                  <p class="text-gray-600 text-sm">التمويل الموافق عليه</p>
                  <p class="text-2xl font-bold text-gray-800">${parseFloat(t?.total_approved_amount||0).toLocaleString("ar-SA")} ر.س</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center mb-4">
                <div class="bg-purple-100 rounded-full p-3 ml-4">
                  <i class="fas fa-percentage text-2xl text-purple-600"></i>
                </div>
                <div>
                  <p class="text-gray-600 text-sm">نسبة القبول</p>
                  <p class="text-2xl font-bold text-gray-800">${((t?.approved_requests||0)/Math.max(t?.total_requests,1)*100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center mb-4">
                <div class="bg-orange-100 rounded-full p-3 ml-4">
                  <i class="fas fa-calculator text-2xl text-orange-600"></i>
                </div>
                <div>
                  <p class="text-gray-600 text-sm">متوسط المبلغ</p>
                  <p class="text-2xl font-bold text-gray-800">${(parseFloat(t?.total_requested_amount||0)/Math.max(t?.total_requests,1)).toLocaleString("ar-SA",{maximumFractionDigits:0})} ر.س</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Quick Insights -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-2xl font-bold mb-2">
                  <i class="fas fa-lightbulb ml-2"></i>
                  رؤى سريعة
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div class="bg-white/20 rounded-lg p-4">
                    <p class="text-sm opacity-90">أكثر البنوك طلباً</p>
                    <p class="text-xl font-bold mt-1">${o[0]?.bank_name||"لا يوجد"}</p>
                  </div>
                  <div class="bg-white/20 rounded-lg p-4">
                    <p class="text-sm opacity-90">الطلبات النشطة</p>
                    <p class="text-xl font-bold mt-1">${(t?.pending_requests||0)+(t?.under_review_requests||0)}</p>
                  </div>
                  <div class="bg-white/20 rounded-lg p-4">
                    <p class="text-sm opacity-90">معدل النجاح</p>
                    <p class="text-xl font-bold mt-1">${((t?.approved_requests||0)/Math.max((t?.approved_requests||0)+(t?.rejected_requests||0),1)*100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Monthly Trend Chart -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-chart-line text-blue-600 ml-2"></i>
                الطلبات الشهرية (آخر 6 أشهر)
              </h3>
              <canvas id="monthlyTrendChart"></canvas>
            </div>
            
            <!-- Status Distribution Chart -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-chart-pie text-purple-600 ml-2"></i>
                توزيع حالات الطلبات
              </h3>
              <canvas id="statusChart"></canvas>
            </div>
          </div>

          <!-- Top Banks Section -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Top Banks Table -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-trophy text-yellow-500 ml-2"></i>
                أكثر البنوك نشاطاً
              </h3>
              <div class="overflow-x-auto">
                <table class="w-full text-right">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-4 py-3 text-gray-700 font-bold">الترتيب</th>
                      <th class="px-4 py-3 text-gray-700 font-bold">البنك</th>
                      <th class="px-4 py-3 text-gray-700 font-bold">الطلبات</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${o.map((n,d)=>`
                      <tr class="border-t hover:bg-gray-50">
                        <td class="px-4 py-3">
                          <span class="text-2xl">${d===0?"🥇":d===1?"🥈":d===2?"🥉":(d+1).toString()}</span>
                        </td>
                        <td class="px-4 py-3 font-bold text-gray-800">${n.bank_name}</td>
                        <td class="px-4 py-3 text-blue-600 font-bold">${n.request_count}</td>
                      </tr>
                      `).join("")}
                  </tbody>
                </table>
              </div>
            </div>
            
            <!-- Top Banks Chart -->
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-chart-bar text-green-600 ml-2"></i>
                توزيع الطلبات حسب البنوك
              </h3>
              <canvas id="banksChart"></canvas>
            </div>
          </div>

          <!-- Status Details -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">
              <i class="fas fa-info-circle text-blue-600 ml-2"></i>
              تفاصيل حالات الطلبات
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              ${i.map(n=>{const d={pending:{color:"yellow",icon:"clock",label:"قيد الانتظار"},under_review:{color:"blue",icon:"search",label:"قيد المراجعة"},approved:{color:"green",icon:"check-circle",label:"موافق"},rejected:{color:"red",icon:"times-circle",label:"مرفوض"}}[n.status]||{color:"gray",icon:"question",label:n.status};return`
                  <div class="bg-${d.color}-50 border-2 border-${d.color}-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                      <i class="fas fa-${d.icon} text-2xl text-${d.color}-600"></i>
                      <span class="text-3xl font-bold text-${d.color}-600">${n.count}</span>
                    </div>
                    <p class="text-sm text-gray-700 font-bold">${d.label}</p>
                    <p class="text-xs text-gray-600">${n.percentage}% من الإجمالي</p>
                  </div>
                `}).join("")}
            </div>
          </div>

        </div>

        <script>
          // Monthly Trend Chart
          const monthlyCtx = document.getElementById('monthlyTrendChart').getContext('2d');
          const monthlyData = ${JSON.stringify(l)};
          
          new Chart(monthlyCtx, {
            type: 'line',
            data: {
              labels: monthlyData.map(d => d.month),
              datasets: [{
                label: 'عدد الطلبات',
                data: monthlyData.map(d => d.count),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { display: true, position: 'top' }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }
          });
          
          // Status Distribution Chart
          const statusCtx = document.getElementById('statusChart').getContext('2d');
          const statusData = ${JSON.stringify(i)};
          
          const statusColors = {
            'pending': '#EAB308',
            'under_review': '#3B82F6',
            'approved': '#10B981',
            'rejected': '#EF4444'
          };
          
          const statusLabels = {
            'pending': 'قيد الانتظار',
            'under_review': 'قيد المراجعة',
            'approved': 'موافق',
            'rejected': 'مرفوض'
          };
          
          new Chart(statusCtx, {
            type: 'doughnut',
            data: {
              labels: statusData.map(d => statusLabels[d.status] || d.status),
              datasets: [{
                data: statusData.map(d => d.count),
                backgroundColor: statusData.map(d => statusColors[d.status] || '#6B7280'),
                borderWidth: 2,
                borderColor: '#fff'
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { position: 'right' }
              }
            }
          });
          
          // Banks Distribution Chart
          const banksCtx = document.getElementById('banksChart').getContext('2d');
          const topBanksData = ${JSON.stringify(o)};
          
          new Chart(banksCtx, {
            type: 'bar',
            data: {
              labels: topBanksData.map(b => b.bank_name),
              datasets: [{
                label: 'عدد الطلبات',
                data: topBanksData.map(b => b.request_count),
                backgroundColor: [
                  'rgba(234, 179, 8, 0.8)',
                  'rgba(192, 192, 192, 0.8)',
                  'rgba(205, 127, 50, 0.8)',
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(16, 185, 129, 0.8)'
                ],
                borderColor: [
                  'rgb(234, 179, 8)',
                  'rgb(192, 192, 192)',
                  'rgb(205, 127, 50)',
                  'rgb(59, 130, 246)',
                  'rgb(16, 185, 129)'
                ],
                borderWidth: 2
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { display: false }
              },
              scales: {
                y: { 
                  beginAtZero: true,
                  ticks: { stepSize: 1 }
                }
              }
            }
          });
          
          // دالة تسجيل الخروج
          function doLogout() {
            if (confirm('هل تريد تسجيل الخروج؟')) {
              console.log('🚪 تسجيل الخروج من لوحة المعلومات...');
              localStorage.removeItem('user');
              localStorage.removeItem('userData');
              localStorage.removeItem('token');
              window.location.href = '/login';
            }
          }
        <\/script>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/customers/add",async e=>e.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>إضافة عميل جديد</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <div class="max-w-4xl mx-auto p-6">
        <div class="mb-6">
          <a href="/admin/customers" class="text-blue-600 hover:text-blue-800">← العودة لقائمة العملاء</a>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-bold mb-6 text-gray-800">
            <i class="fas fa-user-plus text-green-600 ml-2"></i>
            إضافة عميل جديد
          </h1>
          
          <form method="POST" action="/api/customers" enctype="application/x-www-form-urlencoded" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-user text-blue-600 ml-1"></i>
                  الاسم الكامل *
                </label>
                <input type="text" name="full_name" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="مثال: أحمد محمد السعيد">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-phone text-green-600 ml-1"></i>
                  رقم الهاتف *
                </label>
                <input type="tel" name="phone" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="05xxxxxxxx">
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-envelope text-red-600 ml-1"></i>
                  البريد الإلكتروني
                </label>
                <input type="email" name="email" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="example@domain.com">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-id-card text-purple-600 ml-1"></i>
                  الرقم الوطني *
                </label>
                <input type="text" name="national_id" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="1xxxxxxxxx">
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar text-orange-600 ml-1"></i>
                  تاريخ الميلاد
                </label>
                <input type="date" name="date_of_birth" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-building text-indigo-600 ml-1"></i>
                  اسم جهة العمل
                </label>
                <input type="text" name="employer_name" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="مثال: شركة أرامكو">
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-briefcase text-teal-600 ml-1"></i>
                  المسمى الوظيفي
                </label>
                <input type="text" name="job_title" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="مثال: مهندس">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar-check text-pink-600 ml-1"></i>
                  تاريخ بدء العمل
                </label>
                <input type="date" name="work_start_date" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-map-marker-alt text-red-600 ml-1"></i>
                  المدينة
                </label>
                <input type="text" name="city" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="مثال: الرياض">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-money-bill text-green-600 ml-1"></i>
                  الراتب الشهري *
                </label>
                <input type="number" name="monthly_salary" step="0.01" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       placeholder="10000.00">
              </div>
            </div>
            
            <div class="flex gap-4">
              <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold">
                <i class="fas fa-plus ml-2"></i>
                إضافة العميل
              </button>
              <a href="/admin/customers" class="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold">
                <i class="fas fa-times ml-2"></i>
                إلغاء
              </a>
            </div>
          </form>
        </div>
      </div>
    </body>
    </html>
  `));c.get("/admin/customer-assignment",async e=>{const t=e.req.query("tenant_id")||1,a=await e.env.DB.prepare(`
    SELECT id, username, full_name, email, role 
    FROM users 
    WHERE role = 'employee' AND tenant_id = ?
    ORDER BY full_name
  `).bind(t).all(),s=await e.env.DB.prepare(`
    SELECT 
      c.*,
      ca.employee_id,
      u.full_name as assigned_employee_name
    FROM customers c
    LEFT JOIN customer_assignments ca ON c.id = ca.customer_id
    LEFT JOIN users u ON ca.employee_id = u.id
    WHERE c.tenant_id = ?
    ORDER BY c.created_at DESC
  `).bind(t).all(),r=await e.env.DB.prepare(`
    SELECT 
      u.id,
      u.full_name,
      u.username,
      COUNT(ca.customer_id) as customer_count
    FROM users u
    LEFT JOIN customer_assignments ca ON u.id = ca.employee_id
    LEFT JOIN customers c ON ca.customer_id = c.id AND c.tenant_id = ?
    WHERE u.role = 'employee' AND u.tenant_id = ?
    GROUP BY u.id
    ORDER BY customer_count DESC
  `).bind(t,t).all(),l=`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>توزيع العملاء على الموظفين</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        .stat-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .employee-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
        }
        .assigned { background: #d1fae5; color: #065f46; }
        .unassigned { background: #fee2e2; color: #991b1b; }
        
        ${k()}
      </style>
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-800 mb-2">
                <i class="fas fa-users-cog text-indigo-600"></i>
                توزيع العملاء على الموظفين
              </h1>
              <p class="text-gray-600">قم بتوزيع العملاء على الموظفين لتنظيم العمل</p>
            </div>
            <a href="/admin/customers" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة للعملاء
            </a>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          ${r.results.map((o,i)=>`
              <div class="stat-card bg-gradient-to-br ${["from-blue-500 to-blue-600","from-green-500 to-green-600","from-purple-500 to-purple-600","from-orange-500 to-orange-600","from-pink-500 to-pink-600"][i%5]} text-white rounded-xl p-5 shadow-lg">
                <div class="text-sm opacity-90 mb-1">${o.full_name}</div>
                <div class="text-3xl font-bold">${o.customer_count}</div>
                <div class="text-xs opacity-80 mt-1">عميل مخصص</div>
              </div>
            `).join("")}
        </div>

        <!-- Bulk Assignment Tools -->
        <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            <i class="fas fa-magic text-purple-600"></i>
            أدوات التوزيع السريع
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onclick="autoDistribute()" class="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-4 rounded-lg transition-all shadow-md">
              <i class="fas fa-random ml-2"></i>
              توزيع تلقائي متساوي
            </button>
            <button onclick="clearAllAssignments()" class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-lg transition-all shadow-md">
              <i class="fas fa-trash ml-2"></i>
              مسح جميع التخصيصات
            </button>
            <button onclick="assignSelected()" class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-lg transition-all shadow-md">
              <i class="fas fa-check-double ml-2"></i>
              تخصيص المحددين
            </button>
          </div>
        </div>

        <!-- Customers Table -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <h2 class="text-2xl font-bold">
              <i class="fas fa-list ml-2"></i>
              قائمة العملاء (${s.results.length})
            </h2>
          </div>
          
          <div class="p-6">
            <div class="mb-4 flex gap-3">
              <input type="text" id="searchInput" placeholder="بحث..." class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none">
              <select id="filterEmployee" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="">كل الموظفين</option>
                <option value="unassigned">غير مخصص</option>
                ${r.results.map(o=>`
                  <option value="${o.id}">${o.full_name} (${o.customer_count})</option>
                `).join("")}
              </select>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="px-4 py-3 text-right">
                      <input type="checkbox" id="selectAll" class="rounded" onchange="toggleSelectAll(this)">
                    </th>
                    <th class="px-4 py-3 text-right">رقم</th>
                    <th class="px-4 py-3 text-right">اسم العميل</th>
                    <th class="px-4 py-3 text-right">رقم الجوال</th>
                    <th class="px-4 py-3 text-right">البريد الإلكتروني</th>
                    <th class="px-4 py-3 text-right">الموظف المخصص</th>
                    <th class="px-4 py-3 text-right">الإجراءات</th>
                  </tr>
                </thead>
                <tbody id="customersTableBody">
                  ${s.results.map(o=>`
                    <tr class="border-t hover:bg-gray-50 customer-row" data-customer-id="${o.id}" data-employee-id="${o.employee_id||""}">
                      <td class="px-4 py-3">
                        <input type="checkbox" class="customer-checkbox rounded" value="${o.id}">
                      </td>
                      <td class="px-4 py-3">#${o.id}</td>
                      <td class="px-4 py-3 font-semibold">${o.full_name||"غير محدد"}</td>
                      <td class="px-4 py-3">${o.phone||"غير محدد"}</td>
                      <td class="px-4 py-3">${o.email||"غير محدد"}</td>
                      <td class="px-4 py-3">
                        ${o.assigned_employee_name?`<span class="employee-badge assigned">${o.assigned_employee_name}</span>`:'<span class="employee-badge unassigned">غير مخصص</span>'}
                      </td>
                      <td class="px-4 py-3">
                        <select class="assignment-select px-3 py-1 border border-gray-300 rounded text-sm" 
                                data-customer-id="${o.id}"
                                onchange="assignCustomer(${o.id}, this.value)">
                          <option value="">اختر موظف...</option>
                          ${a.results.map(i=>`
                            <option value="${i.id}" ${o.employee_id==i.id?"selected":""}>
                              ${i.full_name}
                            </option>
                          `).join("")}
                        </select>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <script>
        // Assign single customer
        async function assignCustomer(customerId, employeeId) {
          if (!employeeId) {
            if (!confirm('هل تريد إلغاء تخصيص هذا العميل؟')) return;
          }
          
          try {
            const response = await fetch('/api/customer-assignment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                customer_id: customerId, 
                employee_id: employeeId || null,
                notes: ''
              })
            });
            
            const data = await response.json();
            if (data.success) {
              alert('تم التخصيص بنجاح!');
              location.reload();
            } else {
              alert('حدث خطأ: ' + (data.error || 'خطأ غير معروف'));
            }
          } catch (error) {
            alert('حدث خطأ: ' + error.message);
          }
        }

        // Auto distribute customers equally
        async function autoDistribute() {
          if (!confirm('سيتم توزيع العملاء بالتساوي على جميع الموظفين. هل تريد المتابعة؟')) return;
          
          try {
            // Get tenant_id from URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const tenantId = urlParams.get('tenant_id') || '${t}';
            
            const response = await fetch('/api/customer-assignment/auto-distribute', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ tenant_id: tenantId })
            });
            
            const data = await response.json();
            if (data.success) {
              alert(\`تم توزيع \${data.assigned_count} عميل على \${data.employee_count} موظف!\`);
              location.reload();
            } else {
              alert('حدث خطأ: ' + (data.error || 'خطأ غير معروف'));
            }
          } catch (error) {
            alert('حدث خطأ: ' + error.message);
          }
        }

        // Clear all assignments
        async function clearAllAssignments() {
          if (!confirm('سيتم مسح جميع التخصيصات. هل أنت متأكد؟')) return;
          
          try {
            const response = await fetch('/api/customer-assignment/clear-all', {
              method: 'POST'
            });
            
            const data = await response.json();
            if (data.success) {
              alert(\`تم مسح \${data.cleared_count} تخصيص!\`);
              location.reload();
            }
          } catch (error) {
            alert('حدث خطأ: ' + error.message);
          }
        }

        // Toggle select all checkboxes
        function toggleSelectAll(checkbox) {
          const checkboxes = document.querySelectorAll('.customer-checkbox');
          checkboxes.forEach(cb => cb.checked = checkbox.checked);
        }

        // Assign selected customers
        async function assignSelected() {
          const selectedIds = Array.from(document.querySelectorAll('.customer-checkbox:checked'))
            .map(cb => cb.value);
          
          if (selectedIds.length === 0) {
            alert('الرجاء تحديد عملاء أولاً');
            return;
          }
          
          const employeeId = prompt('أدخل رقم الموظف:');
          if (!employeeId) return;
          
          try {
            const response = await fetch('/api/customer-assignment/bulk', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                customer_ids: selectedIds, 
                employee_id: employeeId 
              })
            });
            
            const data = await response.json();
            if (data.success) {
              alert(\`تم تخصيص \${data.assigned_count} عميل!\`);
              location.reload();
            }
          } catch (error) {
            alert('حدث خطأ: ' + error.message);
          }
        }

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', filterTable);
        document.getElementById('filterEmployee').addEventListener('change', filterTable);

        function filterTable() {
          const searchTerm = document.getElementById('searchInput').value.toLowerCase();
          const filterEmployee = document.getElementById('filterEmployee').value;
          const rows = document.querySelectorAll('.customer-row');
          
          rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const employeeId = row.dataset.employeeId;
            
            let matchSearch = text.includes(searchTerm);
            let matchEmployee = true;
            
            if (filterEmployee === 'unassigned') {
              matchEmployee = !employeeId;
            } else if (filterEmployee) {
              matchEmployee = employeeId === filterEmployee;
            }
            
            row.style.display = (matchSearch && matchEmployee) ? '' : 'none';
          });
        }
      <\/script>
    </body>
    </html>
  `;return e.html(l)});c.post("/api/customer-assignment",async e=>{try{const{customer_id:t,employee_id:a,notes:s}=await e.req.json();if(!a)return await e.env.DB.prepare(`
        DELETE FROM customer_assignments WHERE customer_id = ?
      `).bind(t).run(),e.json({success:!0,message:"تم إلغاء التخصيص"});const r=await e.env.DB.prepare(`
      SELECT * FROM customer_assignments WHERE customer_id = ?
    `).bind(t).first();return r?(await e.env.DB.prepare(`
        INSERT INTO assignment_history (customer_id, old_employee_id, new_employee_id, changed_by, notes)
        VALUES (?, ?, ?, 1, ?)
      `).bind(t,r.employee_id,a,s||"").run(),await e.env.DB.prepare(`
        UPDATE customer_assignments 
        SET employee_id = ?, assigned_by = 1, assigned_at = datetime('now'), notes = ?
        WHERE customer_id = ?
      `).bind(a,s||"",t).run()):(await e.env.DB.prepare(`
        INSERT INTO customer_assignments (customer_id, employee_id, assigned_by, notes)
        VALUES (?, ?, 1, ?)
      `).bind(t,a,s||"").run(),await e.env.DB.prepare(`
        INSERT INTO assignment_history (customer_id, old_employee_id, new_employee_id, changed_by, notes)
        VALUES (?, NULL, ?, 1, ?)
      `).bind(t,a,s||"").run()),e.json({success:!0,message:"تم التخصيص بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/customer-assignment/auto-distribute",async e=>{try{const a=(await e.req.json().catch(()=>({}))).tenant_id||e.req.query("tenant_id")||1,s=await e.env.DB.prepare(`
      SELECT id FROM users 
      WHERE role = 'employee' AND tenant_id = ?
      ORDER BY id
    `).bind(a).all();if(s.results.length===0)return e.json({success:!1,error:"لا يوجد موظفين في هذه الشركة"});const r=await e.env.DB.prepare(`
      SELECT c.id 
      FROM customers c
      LEFT JOIN customer_assignments ca ON c.id = ca.customer_id
      WHERE ca.customer_id IS NULL AND c.tenant_id = ?
      ORDER BY c.id
    `).bind(a).all();let l=0;const o=s.results.length;for(let i=0;i<r.results.length;i++){const n=r.results[i],d=s.results[i%o];await e.env.DB.prepare(`
        INSERT INTO customer_assignments (customer_id, employee_id, assigned_by, notes)
        VALUES (?, ?, 1, 'توزيع تلقائي')
      `).bind(n.id,d.id).run(),l++}return e.json({success:!0,assigned_count:l,employee_count:o})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/customer-assignment/clear-all",async e=>{try{const t=await e.env.DB.prepare(`
      DELETE FROM customer_assignments
    `).run();return e.json({success:!0,cleared_count:t.meta.changes})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/customer-assignment/bulk",async e=>{try{const{customer_ids:t,employee_id:a}=await e.req.json();let s=0;for(const r of t)await e.env.DB.prepare(`
        SELECT * FROM customer_assignments WHERE customer_id = ?
      `).bind(r).first()?await e.env.DB.prepare(`
          UPDATE customer_assignments 
          SET employee_id = ?, assigned_by = 1, assigned_at = datetime('now')
          WHERE customer_id = ?
        `).bind(a,r).run():await e.env.DB.prepare(`
          INSERT INTO customer_assignments (customer_id, employee_id, assigned_by)
          VALUES (?, ?, 1)
        `).bind(r,a).run(),s++;return e.json({success:!0,assigned_count:s})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/admin/banks",async e=>{try{const t=e.req.query("tenant_id");let a=null;t&&(a=await e.env.DB.prepare("SELECT company_name FROM tenants WHERE id = ?").bind(t).first());let s="SELECT * FROM banks";t&&(s+=" WHERE tenant_id = ?"),s+=" ORDER BY bank_name";const r=t?await e.env.DB.prepare(s).bind(t).all():await e.env.DB.prepare(s).all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>البنوك ${a?"- "+a.company_name:""}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-university text-blue-600 ml-2"></i>
                البنوك ${a?"- "+a.company_name:"(جميع الشركات)"}
              </h1>
              <span class="text-2xl font-bold text-blue-600">${r.results.length} بنك</span>
            </div>
            
            ${r.results.length===0?`
              <div class="text-center py-12">
                <i class="fas fa-university text-gray-300 text-6xl mb-4"></i>
                <p class="text-gray-500 text-xl">لا توجد بنوك لهذه الشركة</p>
              </div>
            `:`
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-6 py-3 text-right text-sm font-bold text-gray-700">رقم</th>
                      <th class="px-6 py-3 text-right text-sm font-bold text-gray-700">اسم البنك</th>
                      <th class="px-6 py-3 text-right text-sm font-bold text-gray-700">كود البنك</th>
                      <th class="px-6 py-3 text-right text-sm font-bold text-gray-700">الشركة</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    ${r.results.map((l,o)=>`
                      <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 text-sm">${o+1}</td>
                        <td class="px-6 py-4 font-bold">${l.bank_name}</td>
                        <td class="px-6 py-4 text-sm text-gray-600">${l.bank_code||"-"}</td>
                        <td class="px-6 py-4 text-sm">
                          <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                            Tenant ${l.tenant_id||"N/A"}
                          </span>
                        </td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>
      </body>
      </html>
    `)}catch(t){return e.html(`<h1>Error: ${t.message}</h1>`,500)}});c.get("/admin/rates",async e=>{try{const t=e.req.query("tenant_id");let a=null;t&&(a=await e.env.DB.prepare("SELECT company_name FROM tenants WHERE id = ?").bind(t).first());let s=`
      SELECT 
        r.*,
        b.bank_name,
        f.type_name as financing_type_name
      FROM bank_financing_rates r
      LEFT JOIN banks b ON r.bank_id = b.id
      LEFT JOIN financing_types f ON r.financing_type_id = f.id
    `;t&&(s+=" WHERE r.tenant_id = ?"),s+=" ORDER BY b.bank_name, f.type_name";const r=t?await e.env.DB.prepare(s).bind(t).all():await e.env.DB.prepare(s).all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>النسب والأسعار ${a?"- "+a.company_name:""}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          /* Custom Scrollbar - Enhanced */
          .overflow-x-auto {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #10b981 #f7fafc;
          }
          
          .overflow-x-auto::-webkit-scrollbar {
            height: 12px;
            width: 12px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 10px;
            margin: 0 10px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #10b981 0%, #059669 100%);
            border-radius: 10px;
            border: 2px solid #e5e7eb;
          }
          
          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #059669 0%, #047857 100%);
            border-color: #d1d5db;
          }
          
          /* Force scrollbar to always show */
          .overflow-x-auto {
            overflow-x: scroll !important; /* Always show scrollbar */
          }
          
          .overflow-x-auto table {
            min-width: 1200px; /* Force table to be wide enough for scrollbar */
            width: max-content;
          }
          
          ${k()}
        </style>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-percent text-green-600 ml-2"></i>
                النسب والأسعار ${a?"- "+a.company_name:"(جميع الشركات)"}
              </h1>
              <div class="flex flex-wrap items-center gap-4">
                <span class="text-2xl font-bold text-green-600">${r.results.length} نسبة</span>
                <div class="flex-1"></div>
                <!-- Search Box -->
                <div class="relative">
                  <input 
                    type="text" 
                    id="searchRates" 
                    placeholder="بحث عن بنك أو نوع تمويل..." 
                    class="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onkeyup="searchInRatesTable()"
                  />
                  <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                </div>
                ${t?`
                  <a href="/admin/rates/add?tenant_id=${t}" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg">
                    <i class="fas fa-plus ml-2"></i>
                    إضافة نسبة جديدة
                  </a>
                `:""}
              </div>
            </div>
            
            ${r.results.length===0?`
              <div class="text-center py-12">
                <i class="fas fa-percent text-gray-300 text-6xl mb-4"></i>
                <p class="text-gray-500 text-xl">لا توجد نسب لهذه الشركة</p>
              </div>
            `:`
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-4 py-3 text-right text-sm font-bold text-gray-700">رقم</th>
                      <th class="px-4 py-3 text-right text-sm font-bold text-gray-700">البنك</th>
                      <th class="px-4 py-3 text-right text-sm font-bold text-gray-700">نوع التمويل</th>
                      <th class="px-4 py-3 text-right text-sm font-bold text-gray-700">النسبة %</th>
                      <th class="px-4 py-3 text-right text-sm font-bold text-gray-700">الحد الأدنى</th>
                      <th class="px-4 py-3 text-right text-sm font-bold text-gray-700">الحد الأقصى</th>
                      <th class="px-4 py-3 text-right text-sm font-bold text-gray-700">المدة</th>
                      ${t?'<th class="px-4 py-3 text-right text-sm font-bold text-gray-700">إجراءات</th>':""}
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    ${r.results.map((l,o)=>`
                      <tr class="hover:bg-gray-50">
                        <td class="px-4 py-4 text-sm">${o+1}</td>
                        <td class="px-4 py-4 font-bold">${l.bank_name||"-"}</td>
                        <td class="px-4 py-4 text-sm">${l.financing_type_name||"-"}</td>
                        <td class="px-4 py-4">
                          <span class="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                            ${l.rate}%
                          </span>
                        </td>
                        <td class="px-4 py-4 text-sm">${l.min_amount?l.min_amount.toLocaleString():"-"} ريال</td>
                        <td class="px-4 py-4 text-sm">${l.max_amount?l.max_amount.toLocaleString():"-"} ريال</td>
                        <td class="px-4 py-4 text-sm">${l.min_duration||"-"} - ${l.max_duration||"-"} شهر</td>
                        ${t?`
                          <td class="px-4 py-4 text-sm">
                            <a href="/admin/rates/edit/${l.id}?tenant_id=${t}" class="text-blue-600 hover:text-blue-800 ml-2" title="تعديل">
                              <i class="fas fa-edit"></i>
                            </a>
                            <button onclick="deleteRate(${l.id})" class="text-red-600 hover:text-red-800" title="حذف">
                              <i class="fas fa-trash"></i>
                            </button>
                          </td>
                        `:""}
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>
        
        <script>
          function searchInRatesTable() {
            const searchValue = document.getElementById('searchRates').value.toLowerCase();
            const tableBody = document.querySelector('tbody');
            const rows = tableBody.querySelectorAll('tr');
            
            rows.forEach(row => {
              const bankName = row.cells[1]?.textContent.toLowerCase() || '';
              const financingType = row.cells[2]?.textContent.toLowerCase() || '';
              
              if (bankName.includes(searchValue) || financingType.includes(searchValue)) {
                row.style.display = '';
              } else {
                row.style.display = 'none';
              }
            });
          }
          
          function deleteRate(rateId) {
            if (!confirm('هل أنت متأكد من حذف هذه النسبة؟')) return;
            
            const urlParams = new URLSearchParams(window.location.search);
            const tenantId = urlParams.get('tenant_id');
            
            fetch(\`/api/rates/\${rateId}\`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
            })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                alert('تم حذف النسبة بنجاح');
                window.location.reload();
              } else {
                alert('حدث خطأ: ' + data.message);
              }
            })
            .catch(error => {
              alert('حدث خطأ: ' + error.message);
            });
          }
        <\/script>
      </body>
      </html>
    `)}catch(t){return e.html(`<h1>Error: ${t.message}</h1>`,500)}});c.get("/admin/rates/add",async e=>{const t=e.req.query("tenant_id");if(!t)return e.html("<h1>خطأ: يجب تحديد الشركة</h1>",400);const a=await e.env.DB.prepare("SELECT * FROM banks WHERE tenant_id = ? ORDER BY bank_name").bind(t).all(),s=await e.env.DB.prepare("SELECT * FROM financing_types ORDER BY type_name").all();return e.html(ct(t,a.results,s.results))});c.get("/admin/rates/edit/:id",async e=>{const t=e.req.param("id"),a=e.req.query("tenant_id");if(!a)return e.html("<h1>خطأ: يجب تحديد الشركة</h1>",400);const s=await e.env.DB.prepare(`
    SELECT r.*, b.bank_name, f.type_name
    FROM bank_financing_rates r
    LEFT JOIN banks b ON r.bank_id = b.id
    LEFT JOIN financing_types f ON r.financing_type_id = f.id
    WHERE r.id = ? AND r.tenant_id = ?
  `).bind(t,a).first();if(!s)return e.html("<h1>خطأ: النسبة غير موجودة</h1>",404);const r=await e.env.DB.prepare("SELECT * FROM banks WHERE tenant_id = ? ORDER BY bank_name").bind(a).all(),l=await e.env.DB.prepare("SELECT * FROM financing_types ORDER BY type_name").all();return e.html(pt(a,s,r.results,l.results))});c.get("/admin/customers",async e=>{try{const t=e.req.query("tenant_id");let a="SELECT * FROM customers";t&&(a+=" WHERE tenant_id = ?"),a+=" ORDER BY created_at DESC";const s=t?await e.env.DB.prepare(a).bind(t).all():await e.env.DB.prepare(a).all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>العملاء</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          /* Custom Scrollbar - Enhanced */
          .overflow-x-auto {
            overflow-x: scroll !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #10b981 #f7fafc;
          }
          
          .overflow-x-auto::-webkit-scrollbar {
            height: 12px;
            width: 12px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 10px;
            margin: 0 10px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #10b981 0%, #059669 100%);
            border-radius: 10px;
            border: 2px solid #e5e7eb;
          }
          
          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #059669 0%, #047857 100%);
            border-color: #d1d5db;
          }
          
          .overflow-x-auto table {
            min-width: 1200px;
            width: max-content;
          }
          
          ${k()}
        </style>
      </head>
      <body class="bg-gray-50">
        <script>
          // Auto-redirect with tenant_id if not present in URL
          (function() {
            const urlParams = new URLSearchParams(window.location.search);
            if (!urlParams.has('tenant_id')) {
              const userData = localStorage.getItem('userData');
              if (userData) {
                try {
                  const user = JSON.parse(userData);
                  if (user.tenant_id) {
                    window.location.replace('/admin/customers?tenant_id=' + user.tenant_id);
                  }
                } catch (e) {
                  console.error('Error parsing userData:', e);
                }
              }
            }
          })();
        <\/script>
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-users text-green-600 ml-2"></i>
                العملاء (<span id="totalCount">${s.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
                <a href="/admin/customer-assignment${t?"?tenant_id="+t:""}" 
                   class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md">
                  <i class="fas fa-users-cog ml-2"></i>
                  توزيع العملاء
                </a>
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
                <a href="/admin/customers/add" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة عميل جديد
                </a>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onkeyup="filterTable()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onchange="filterTable()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="name">الاسم فقط</option>
                    <option value="phone">الهاتف فقط</option>
                    <option value="email">البريد فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <table class="min-w-full" id="dataTable">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">#</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاسم</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الهاتف</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البريد</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ التسجيل</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" id="tableBody">
                ${s.results.map(r=>`
                  <tr class="hover:bg-gray-50" data-name="${r.full_name||""}" data-phone="${r.phone||""}" data-email="${r.email||""}">
                    <td class="px-6 py-4 whitespace-nowrap font-bold text-gray-900">${r.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap font-medium">${r.full_name||"-"}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${r.phone||"-"}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${r.email||"-"}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${new Date(r.created_at).toLocaleDateString("ar-SA")}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                      <div class="flex items-center justify-center gap-2">
                        <a href="/admin/customers/${r.id}/report" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm" title="تقرير العميل الكامل">
                          <i class="fas fa-file-alt"></i> تقرير
                        </a>
                        <a href="/admin/customers/${r.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/customers/${r.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/customers/${r.id}/delete" onclick="return confirm('هل أنت متأكد من حذف هذا العميل؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                          <i class="fas fa-trash"></i> حذف
                        </a>
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
        
        <script>
          // البحث والفلترة
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim()
            const filterField = document.getElementById('filterField').value
            const tableBody = document.getElementById('tableBody')
            const rows = tableBody.getElementsByTagName('tr')
            let visibleCount = 0
            
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i]
              const name = row.getAttribute('data-name') || ''
              const phone = row.getAttribute('data-phone') || ''
              const email = row.getAttribute('data-email') || ''
              
              let shouldShow = false
              
              if (searchInput === '') {
                shouldShow = true
              } else {
                switch(filterField) {
                  case 'name':
                    shouldShow = name.toLowerCase().includes(searchInput)
                    break
                  case 'phone':
                    shouldShow = phone.toLowerCase().includes(searchInput)
                    break
                  case 'email':
                    shouldShow = email.toLowerCase().includes(searchInput)
                    break
                  default: // 'all'
                    shouldShow = name.toLowerCase().includes(searchInput) || 
                                phone.toLowerCase().includes(searchInput) || 
                                email.toLowerCase().includes(searchInput)
                }
              }
              
              row.style.display = shouldShow ? '' : 'none'
              if (shouldShow) visibleCount++
            }
            
            document.getElementById('totalCount').textContent = visibleCount
          }
          
          // إعادة تعيين الفلاتر
          function resetFilters() {
            document.getElementById('searchInput').value = ''
            document.getElementById('filterField').value = 'all'
            filterTable()
          }
          
          // التصدير إلى CSV
          function exportToCSV() {
            const data = [
              ['#', 'الاسم', 'الهاتف', 'البريد الإلكتروني', 'الرقم الوطني', 'تاريخ التسجيل'],
              ${s.results.map(r=>`['${r.id}', '${r.full_name||"-"}', '${r.phone||"-"}', '${r.email||"-"}', '${r.national_id||"-"}', '${new Date(r.created_at).toLocaleDateString("ar-SA")}']`).join(`,
              `)}
            ];
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'العملاء_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
        <\/script>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/notifications",async e=>{try{return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>مركز الإشعارات</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          .notification-card {
            transition: all 0.3s ease;
          }
          .notification-card:hover {
            transform: translateX(-5px);
          }
          .notification-unread {
            background: linear-gradient(to right, #EFF6FF, #FFFFFF);
            border-right: 4px solid #3B82F6;
          }
          .notification-read {
            background: #FFFFFF;
            opacity: 0.85;
          }
          .badge-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
          }
          
          ${k()}
        </style>
      </head>
      <body class="bg-gray-50">
        <div class="container mx-auto px-4 py-8">
          <!-- Header -->
          <div class="flex justify-between items-center mb-8">
            <div>
              <h1 class="text-4xl font-bold text-gray-800 flex items-center gap-3">
                <i class="fas fa-bell text-blue-600"></i>
                مركز الإشعارات
              </h1>
              <p class="text-gray-600 mt-2">إدارة جميع إشعارات النظام</p>
            </div>
            <div class="flex gap-3">
              <button onclick="markAllAsRead()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-bold">
                <i class="fas fa-check-double ml-2"></i>
                تحديد الكل كمقروء
              </button>
              <a href="/admin" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition font-bold">
                <i class="fas fa-arrow-right ml-2"></i>
                العودة
              </a>
            </div>
          </div>

          <!-- Statistics -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-blue-100 text-sm mb-1">إجمالي الإشعارات</p>
                  <p class="text-4xl font-bold" id="totalCount">0</p>
                </div>
                <i class="fas fa-bell text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-green-100 text-sm mb-1">غير مقروءة</p>
                  <p class="text-4xl font-bold badge-pulse" id="unreadCount">0</p>
                </div>
                <i class="fas fa-envelope text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-purple-100 text-sm mb-1">مقروءة</p>
                  <p class="text-4xl font-bold" id="readCount">0</p>
                </div>
                <i class="fas fa-envelope-open text-6xl opacity-20"></i>
              </div>
            </div>
          </div>

          <!-- Filters -->
          <div class="bg-white rounded-xl shadow-md p-6 mb-6">
            <div class="flex flex-wrap gap-3">
              <button onclick="filterNotifications('all')" class="filter-btn active px-6 py-2 rounded-lg font-bold transition">
                <i class="fas fa-list ml-2"></i>
                الكل
              </button>
              <button onclick="filterNotifications('unread')" class="filter-btn px-6 py-2 rounded-lg font-bold transition">
                <i class="fas fa-envelope ml-2"></i>
                غير مقروءة
              </button>
              <button onclick="filterNotifications('read')" class="filter-btn px-6 py-2 rounded-lg font-bold transition">
                <i class="fas fa-envelope-open ml-2"></i>
                مقروءة
              </button>
              <button onclick="filterNotifications('request')" class="filter-btn px-6 py-2 rounded-lg font-bold transition">
                <i class="fas fa-file-invoice ml-2"></i>
                طلبات جديدة
              </button>
              <button onclick="filterNotifications('status_change')" class="filter-btn px-6 py-2 rounded-lg font-bold transition">
                <i class="fas fa-sync ml-2"></i>
                تحديثات الحالة
              </button>
            </div>
          </div>

          <!-- Notifications List -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <div id="notificationsList" class="space-y-4">
              <div class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">جاري تحميل الإشعارات...</p>
              </div>
            </div>
          </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script>
          let allNotifications = [];
          let currentFilter = 'all';

          async function loadNotifications() {
            try {
              const response = await axios.get('/api/notifications');
              if (response.data.success) {
                allNotifications = response.data.data;
                updateStats();
                renderNotifications();
              }
            } catch (error) {
              console.error('Error loading notifications:', error);
              document.getElementById('notificationsList').innerHTML = \`
                <div class="text-center py-12">
                  <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                  <p class="text-red-600">حدث خطأ في تحميل الإشعارات</p>
                </div>
              \`;
            }
          }

          function updateStats() {
            const total = allNotifications.length;
            const unread = allNotifications.filter(n => n.is_read === 0).length;
            const read = total - unread;

            document.getElementById('totalCount').textContent = total;
            document.getElementById('unreadCount').textContent = unread;
            document.getElementById('readCount').textContent = read;
          }

          function filterNotifications(filter) {
            currentFilter = filter;
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
              btn.classList.remove('active', 'bg-blue-600', 'text-white');
              btn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            });
            event.target.closest('button').classList.add('active', 'bg-blue-600', 'text-white');
            event.target.closest('button').classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            
            renderNotifications();
          }

          function renderNotifications() {
            let filtered = allNotifications;

            if (currentFilter === 'unread') {
              filtered = allNotifications.filter(n => n.is_read === 0);
            } else if (currentFilter === 'read') {
              filtered = allNotifications.filter(n => n.is_read === 1);
            } else if (currentFilter === 'request' || currentFilter === 'status_change') {
              filtered = allNotifications.filter(n => n.category === currentFilter);
            }

            if (filtered.length === 0) {
              document.getElementById('notificationsList').innerHTML = \`
                <div class="text-center py-12">
                  <i class="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                  <p class="text-gray-600">لا توجد إشعارات</p>
                </div>
              \`;
              return;
            }

            const html = filtered.map(notification => {
              const typeIcons = {
                info: 'fa-info-circle text-blue-600',
                success: 'fa-check-circle text-green-600',
                warning: 'fa-exclamation-triangle text-yellow-600',
                error: 'fa-times-circle text-red-600'
              };

              const categoryIcons = {
                request: 'fa-file-invoice',
                status_change: 'fa-sync',
                system: 'fa-cog',
                general: 'fa-bell'
              };

              const typeIcon = typeIcons[notification.type] || typeIcons.info;
              const categoryIcon = categoryIcons[notification.category] || categoryIcons.general;
              
              return \`
                <div class="notification-card \${notification.is_read === 0 ? 'notification-unread' : 'notification-read'} rounded-lg p-4 shadow-sm">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                      <i class="fas \${typeIcon} text-3xl"></i>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-start justify-between mb-2">
                        <h3 class="text-lg font-bold text-gray-800">\${notification.title}</h3>
                        <div class="flex gap-2">
                          \${notification.is_read === 0 ? \`
                            <button onclick="markAsRead(\${notification.id})" class="text-blue-600 hover:text-blue-800 transition" title="تحديد كمقروء">
                              <i class="fas fa-check"></i>
                            </button>
                          \` : ''}
                          <button onclick="deleteNotification(\${notification.id})" class="text-red-600 hover:text-red-800 transition" title="حذف">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      <p class="text-gray-700 mb-3">\${notification.message}</p>
                      <div class="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          <i class="fas \${categoryIcon} ml-1"></i>
                          \${notification.category === 'request' ? 'طلب جديد' : 
                            notification.category === 'status_change' ? 'تحديث حالة' : 
                            notification.category === 'system' ? 'نظام' : 'عام'}
                        </span>
                        <span>
                          <i class="fas fa-clock ml-1"></i>
                          \${new Date(notification.created_at).toLocaleString('ar-SA')}
                        </span>
                        \${notification.related_request_id ? \`
                          <a href="/admin/requests/\${notification.related_request_id}" class="text-blue-600 hover:text-blue-800 font-bold">
                            <i class="fas fa-external-link-alt ml-1"></i>
                            عرض الطلب #\${notification.related_request_id}
                          </a>
                        \` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              \`;
            }).join('');

            document.getElementById('notificationsList').innerHTML = html;
          }

          async function markAsRead(id) {
            try {
              await axios.put(\`/api/notifications/\${id}/read\`);
              await loadNotifications();
            } catch (error) {
              console.error('Error marking as read:', error);
              alert('حدث خطأ في تحديد الإشعار كمقروء');
            }
          }

          async function markAllAsRead() {
            try {
              await axios.put('/api/notifications/read-all');
              await loadNotifications();
              alert('✓ تم تحديد جميع الإشعارات كمقروءة');
            } catch (error) {
              console.error('Error marking all as read:', error);
              alert('حدث خطأ في تحديد الإشعارات');
            }
          }

          async function deleteNotification(id) {
            if (!confirm('هل أنت متأكد من حذف هذا الإشعار؟')) return;
            
            try {
              await axios.delete(\`/api/notifications/\${id}\`);
              await loadNotifications();
            } catch (error) {
              console.error('Error deleting notification:', error);
              alert('حدث خطأ في حذف الإشعار');
            }
          }

          // Load notifications on page load
          loadNotifications();
        <\/script>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/requests/:id/edit",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT 
        fr.*,
        c.full_name as customer_name,
        c.phone as customer_phone,
        b.bank_name
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      LEFT JOIN banks b ON fr.selected_bank_id = b.id
      WHERE fr.id = ?
    `).bind(t).first();if(!a)return e.html("<h1>الطلب غير موجود</h1>");const s=await e.env.DB.prepare(`
      SELECT id, bank_name FROM banks ORDER BY bank_name
    `).all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تعديل طلب التمويل #${t}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/requests" class="text-blue-600 hover:text-blue-800">← العودة للطلبات</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-8">
              <i class="fas fa-edit text-yellow-600 ml-2"></i>
              تعديل طلب التمويل #${t}
            </h1>
            
            <form id="editForm" onsubmit="handleSubmit(event)" class="space-y-6">
              <!-- Customer Information (Read Only) -->
              <div class="border-b pb-6">
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-user ml-2"></i>
                  معلومات العميل (للعرض فقط)
                </h2>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <p class="text-gray-700"><strong>اسم العميل:</strong> ${a.customer_name||"غير محدد"}</p>
                  <p class="text-gray-700"><strong>رقم الجوال:</strong> ${a.customer_phone||"غير محدد"}</p>
                  <p class="text-gray-700"><strong>البنك:</strong> ${a.bank_name||"غير محدد"}</p>
                </div>
              </div>
              
              <!-- Financing Information -->
              <div class="border-b pb-6">
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-money-bill-wave ml-2"></i>
                  معلومات التمويل
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">المبلغ المطلوب</label>
                    <input 
                      type="number" 
                      id="requested_amount"
                      value="${a.requested_amount||0}"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">مدة التمويل (بالأشهر)</label>
                    <input 
                      type="number" 
                      id="duration_months"
                      value="${a.duration_months||0}"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                  </div>
                </div>
              </div>
              
              <!-- Financial Details -->
              <div class="border-b pb-6">
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-chart-line ml-2"></i>
                  التفاصيل المالية
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">الراتب وقت الطلب</label>
                    <input 
                      type="number" 
                      id="salary_at_request"
                      value="${a.salary_at_request||0}"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">الالتزامات الشهرية</label>
                    <input 
                      type="number" 
                      id="monthly_obligations"
                      value="${a.monthly_obligations||0}"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                </div>
              </div>
              
              <!-- Attachments Section -->
              <div class="border-b pb-6">
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-paperclip ml-2"></i>
                  المرفقات
                </h2>
                
                <!-- Current Attachments -->
                <div class="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-bold text-gray-700 mb-3">المرفقات الحالية:</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="border-r pr-4">
                      <p class="text-sm text-gray-600 mb-2"><i class="fas fa-id-card ml-1"></i> صورة الهوية:</p>
                      ${a.id_attachment_url?`
                        <a href="${a.id_attachment_url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
                          <i class="fas fa-external-link-alt ml-1"></i> عرض الملف
                        </a>
                      `:'<span class="text-red-500 text-sm">لم يتم الرفع</span>'}
                    </div>
                    <div>
                      <p class="text-sm text-gray-600 mb-2"><i class="fas fa-file-invoice ml-1"></i> كشف الحساب:</p>
                      ${a.bank_statement_attachment_url?`
                        <a href="${a.bank_statement_attachment_url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
                          <i class="fas fa-external-link-alt ml-1"></i> عرض الملف
                        </a>
                      `:'<span class="text-red-500 text-sm">لم يتم الرفع</span>'}
                    </div>
                    <div class="border-r pr-4">
                      <p class="text-sm text-gray-600 mb-2"><i class="fas fa-money-check ml-1"></i> تعريف الراتب:</p>
                      ${a.salary_attachment_url?`
                        <a href="${a.salary_attachment_url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
                          <i class="fas fa-external-link-alt ml-1"></i> عرض الملف
                        </a>
                      `:'<span class="text-red-500 text-sm">لم يتم الرفع</span>'}
                    </div>
                    <div>
                      <p class="text-sm text-gray-600 mb-2"><i class="fas fa-file-alt ml-1"></i> مرفقات إضافية:</p>
                      ${a.additional_attachment_url?`
                        <a href="${a.additional_attachment_url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
                          <i class="fas fa-external-link-alt ml-1"></i> عرض الملف
                        </a>
                      `:'<span class="text-red-500 text-sm">لم يتم الرفع</span>'}
                    </div>
                  </div>
                </div>
                
                <!-- Upload New Attachments -->
                <div class="space-y-4">
                  <h3 class="font-bold text-gray-700 mb-3">رفع مرفقات جديدة (اختياري):</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- ID Attachment -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-id-card ml-1"></i> صورة الهوية
                      </label>
                      <input 
                        type="file"
                        id="id_attachment"
                        accept="image/*,application/pdf"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        onchange="handleFileSelect('id_attachment')"
                      >
                      <p class="text-xs text-gray-500 mt-1">JPG, PNG أو PDF (حد أقصى 5MB)</p>
                      <div id="id_attachment_preview" class="mt-2"></div>
                    </div>
                    
                    <!-- Bank Statement Attachment -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-file-invoice ml-1"></i> كشف الحساب البنكي
                      </label>
                      <input 
                        type="file"
                        id="bank_statement_attachment"
                        accept="image/*,application/pdf"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        onchange="handleFileSelect('bank_statement_attachment')"
                      >
                      <p class="text-xs text-gray-500 mt-1">JPG, PNG أو PDF (حد أقصى 5MB)</p>
                      <div id="bank_statement_attachment_preview" class="mt-2"></div>
                    </div>
                    
                    <!-- Salary Attachment -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-money-check ml-1"></i> تعريف الراتب
                      </label>
                      <input 
                        type="file"
                        id="salary_attachment"
                        accept="image/*,application/pdf"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        onchange="handleFileSelect('salary_attachment')"
                      >
                      <p class="text-xs text-gray-500 mt-1">JPG, PNG أو PDF (حد أقصى 5MB)</p>
                      <div id="salary_attachment_preview" class="mt-2"></div>
                    </div>
                    
                    <!-- Additional Attachment -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-file-alt ml-1"></i> مرفقات إضافية
                      </label>
                      <input 
                        type="file"
                        id="additional_attachment"
                        accept="image/*,application/pdf"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        onchange="handleFileSelect('additional_attachment')"
                      >
                      <p class="text-xs text-gray-500 mt-1">JPG, PNG أو PDF (حد أقصى 5MB)</p>
                      <div id="additional_attachment_preview" class="mt-2"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Status and Notes -->
              <div>
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-clipboard ml-2"></i>
                  الحالة والملاحظات
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                    <select 
                      id="status"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="pending" ${a.status==="pending"?"selected":""}>قيد الانتظار</option>
                      <option value="under_review" ${a.status==="under_review"?"selected":""}>قيد المراجعة</option>
                      <option value="approved" ${a.status==="approved"?"selected":""}>موافق عليه</option>
                      <option value="rejected" ${a.status==="rejected"?"selected":""}>مرفوض</option>
                    </select>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">الملاحظات</label>
                    <textarea 
                      id="notes"
                      rows="3"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="أضف ملاحظات..."
                    >${a.notes||""}</textarea>
                  </div>
                </div>
              </div>
              
              <!-- Submit Buttons -->
              <div class="flex gap-4">
                <button 
                  type="submit"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-save ml-2"></i>
                  حفظ التعديلات
                </button>
                <a 
                  href="/admin/requests"
                  class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all text-center"
                >
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
            
            <div id="message" class="mt-4"></div>
          </div>
        </div>
        
        <script>
          const attachmentFiles = {
            id_attachment: null,
            bank_statement_attachment: null,
            salary_attachment: null,
            additional_attachment: null
          }
          
          function handleFileSelect(fieldName) {
            const fileInput = document.getElementById(fieldName)
            const file = fileInput.files[0]
            const previewDiv = document.getElementById(fieldName + '_preview')
            
            if (!file) {
              previewDiv.innerHTML = ''
              attachmentFiles[fieldName] = null
              return
            }
            
            // Check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
              previewDiv.innerHTML = '<span class="text-red-500 text-sm">الملف كبير جداً. الحد الأقصى 5MB</span>'
              fileInput.value = ''
              attachmentFiles[fieldName] = null
              return
            }
            
            attachmentFiles[fieldName] = file
            previewDiv.innerHTML = \`
              <div class="text-sm text-green-600">
                <i class="fas fa-check-circle ml-1"></i>
                تم اختيار: \${file.name} (\${(file.size / 1024).toFixed(1)} KB)
              </div>
            \`
          }
          
          async function uploadAttachment(file, attachmentType) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('attachmentType', attachmentType)
            
            try {
              const response = await axios.post('/api/attachments/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              
              return response.data.url
            } catch (error) {
              console.error('Upload error:', error)
              throw error
            }
          }
          
          async function handleSubmit(event) {
            event.preventDefault()
            
            // Show loading message
            document.getElementById('message').innerHTML = \`
              <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <i class="fas fa-spinner fa-spin ml-2"></i>
                جاري حفظ التعديلات...
              </div>
            \`
            
            const data = {
              requested_amount: parseFloat(document.getElementById('requested_amount').value),
              duration_months: parseInt(document.getElementById('duration_months').value),
              salary_at_request: parseFloat(document.getElementById('salary_at_request').value) || 0,
              monthly_obligations: parseFloat(document.getElementById('monthly_obligations').value) || 0,
              status: document.getElementById('status').value,
              notes: document.getElementById('notes').value
            }
            
            try {
              // Upload attachments if selected
              if (attachmentFiles.id_attachment) {
                document.getElementById('message').innerHTML = \`
                  <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                    <i class="fas fa-spinner fa-spin ml-2"></i>
                    جاري رفع صورة الهوية...
                  </div>
                \`
                data.id_attachment_url = await uploadAttachment(attachmentFiles.id_attachment, 'id')
              }
              
              if (attachmentFiles.bank_statement_attachment) {
                document.getElementById('message').innerHTML = \`
                  <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                    <i class="fas fa-spinner fa-spin ml-2"></i>
                    جاري رفع كشف الحساب...
                  </div>
                \`
                data.bank_statement_attachment_url = await uploadAttachment(attachmentFiles.bank_statement_attachment, 'bank_statement')
              }
              
              if (attachmentFiles.salary_attachment) {
                document.getElementById('message').innerHTML = \`
                  <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                    <i class="fas fa-spinner fa-spin ml-2"></i>
                    جاري رفع تعريف الراتب...
                  </div>
                \`
                data.salary_attachment_url = await uploadAttachment(attachmentFiles.salary_attachment, 'salary')
              }
              
              if (attachmentFiles.additional_attachment) {
                document.getElementById('message').innerHTML = \`
                  <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                    <i class="fas fa-spinner fa-spin ml-2"></i>
                    جاري رفع المرفقات الإضافية...
                  </div>
                \`
                data.additional_attachment_url = await uploadAttachment(attachmentFiles.additional_attachment, 'additional')
              }
              
              // Update financing request
              document.getElementById('message').innerHTML = \`
                <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                  <i class="fas fa-spinner fa-spin ml-2"></i>
                  جاري حفظ التعديلات النهائية...
                </div>
              \`
              
              const response = await axios.put('/api/financing-requests/${t}', data)
              
              if (response.data.success) {
                document.getElementById('message').innerHTML = \`
                  <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <i class="fas fa-check-circle ml-2"></i>
                    تم تحديث الطلب والمرفقات بنجاح!
                  </div>
                \`
                
                setTimeout(() => {
                  window.location.href = '/admin/requests'
                }, 2000)
              }
            } catch (error) {
              console.error('Error:', error)
              document.getElementById('message').innerHTML = \`
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <i class="fas fa-exclamation-circle ml-2"></i>
                  خطأ في التحديث: \${error.response?.data?.error || error.message}
                </div>
              \`
            }
          }
        <\/script>
      </body>
      </html>
    `)}catch(t){return console.error("Edit request page error:",t),e.html(`<h1>خطأ في تحميل الصفحة: ${t.message}</h1>`)}});c.get("/admin/requests",async e=>{try{const t=e.req.query("tenant_id");let a=`
      SELECT 
        fr.id,
        fr.customer_id,
        fr.selected_bank_id,
        fr.requested_amount,
        fr.duration_months,
        fr.status,
        fr.created_at,
        c.full_name as customer_name,
        b.bank_name as bank_name
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      LEFT JOIN banks b ON fr.selected_bank_id = b.id
    `;t&&(a+=" WHERE fr.tenant_id = ?"),a+=" ORDER BY fr.created_at DESC";const s=t?await e.env.DB.prepare(a).bind(t).all():await e.env.DB.prepare(a).all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>طلبات التمويل</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          /* Custom Scrollbar - Enhanced */
          .overflow-x-auto {
            overflow-x: scroll !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: #3b82f6 #f7fafc;
          }
          
          .overflow-x-auto::-webkit-scrollbar {
            height: 12px;
            width: 12px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 10px;
            margin: 0 10px;
          }
          
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
            border-radius: 10px;
            border: 2px solid #e5e7eb;
          }
          
          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
            border-color: #d1d5db;
          }
          
          .overflow-x-auto table {
            min-width: 1200px;
            width: max-content;
          }
          
          ${k()}
        </style>
      </head>
      <body class="bg-gray-50">
        <script>
          // Auto-redirect with tenant_id if not present in URL
          (function() {
            const urlParams = new URLSearchParams(window.location.search);
            if (!urlParams.has('tenant_id')) {
              const userData = localStorage.getItem('userData');
              if (userData) {
                try {
                  const user = JSON.parse(userData);
                  if (user.tenant_id) {
                    window.location.replace('/admin/requests?tenant_id=' + user.tenant_id);
                  }
                } catch (e) {
                  console.error('Error parsing userData:', e);
                }
              }
            }
          })();
        <\/script>
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-file-invoice text-purple-600 ml-2"></i>
                طلبات التمويل (<span id="totalCount">${s.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
                <a href="/admin/requests/new" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة جديد
                </a>
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onkeyup="filterTable()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onchange="filterTable()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="customer">اسم العميل فقط</option>
                    <option value="bank">البنك فقط</option>
                    <option value="status">الحالة فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <table class="min-w-full" id="dataTable">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البنك</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المدة</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" id="tableBody">
                ${s.results.map(r=>{const l=r.status==="approved"?"مقبول":r.status==="pending"?"قيد المراجعة":"مرفوض";return`
                  <tr class="hover:bg-gray-50" 
                      data-customer="${r.customer_name||""}" 
                      data-bank="${r.bank_name||""}" 
                      data-status="${l}">
                    <td class="px-6 py-4 whitespace-nowrap font-medium">${r.customer_name||"عميل #"+r.customer_id}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${r.bank_name||"بنك #"+(r.selected_bank_id||"-")}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${r.requested_amount?.toLocaleString("ar-SA")} ريال</td>
                    <td class="px-6 py-4 whitespace-nowrap">${r.duration_months} شهر</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 py-1 text-xs rounded-full ${r.status==="approved"?"bg-green-100 text-green-800":r.status==="pending"?"bg-yellow-100 text-yellow-800":"bg-red-100 text-red-800"}">
                        ${l}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">${new Date(r.created_at).toLocaleDateString("ar-SA")}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex gap-2 justify-end">
                        <a href="/admin/requests/${r.id}/timeline" class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-3 py-2 rounded text-xs transition-all shadow-md" title="الجدول الزمني التفصيلي">
                          <i class="fas fa-clock"></i> ⏱️ Timeline
                        </a>
                        <a href="/admin/requests/${r.id}/report" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-xs transition-all" title="تقرير الطلب الكامل">
                          <i class="fas fa-file-alt"></i> تقرير
                        </a>
                        <a href="/admin/requests/${r.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/requests/${r.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/requests/${r.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-trash"></i> حذف
                        </a>
                      </div>
                    </td>
                  </tr>
                `}).join("")}
              </tbody>
            </table>
          </div>
        </div>
        
        <script>
          // البحث والفلترة
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim()
            const filterField = document.getElementById('filterField').value
            const tableBody = document.getElementById('tableBody')
            const rows = tableBody.getElementsByTagName('tr')
            let visibleCount = 0
            
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i]
              const customer = row.getAttribute('data-customer') || ''
              const bank = row.getAttribute('data-bank') || ''
              const status = row.getAttribute('data-status') || ''
              
              let shouldShow = false
              
              if (searchInput === '') {
                shouldShow = true
              } else {
                switch(filterField) {
                  case 'customer':
                    shouldShow = customer.toLowerCase().includes(searchInput)
                    break
                  case 'bank':
                    shouldShow = bank.toLowerCase().includes(searchInput)
                    break
                  case 'status':
                    shouldShow = status.toLowerCase().includes(searchInput)
                    break
                  default: // 'all'
                    shouldShow = customer.toLowerCase().includes(searchInput) || 
                                bank.toLowerCase().includes(searchInput) || 
                                status.toLowerCase().includes(searchInput)
                }
              }
              
              row.style.display = shouldShow ? '' : 'none'
              if (shouldShow) visibleCount++
            }
            
            document.getElementById('totalCount').textContent = visibleCount
          }
          
          function resetFilters() {
            document.getElementById('searchInput').value = ''
            document.getElementById('filterField').value = 'all'
            filterTable()
          }
          
          function exportToCSV() {
            const data = [
              ['العميل', 'البنك', 'المبلغ المطلوب', 'المدة (شهور)', 'الحالة', 'التاريخ'],
              ${s.results.map(r=>{const l=r.status==="approved"?"مقبول":r.status==="pending"?"قيد المراجعة":"مرفوض",o=r.customer_name||`عميل #${r.customer_id}`,i=r.bank_name||`بنك #${r.selected_bank_id||"-"}`;return`['${o}', '${i}', '${r.requested_amount||0}', '${r.duration_months}', '${l}', '${new Date(r.created_at).toLocaleDateString("ar-SA")}']`}).join(`,
              `)}
            ];
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'طلبات_التمويل_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
        <\/script>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/requests/new",async e=>{try{const t=await e.env.DB.prepare("SELECT id, full_name, phone FROM customers ORDER BY full_name").all(),a=await e.env.DB.prepare("SELECT id, bank_name FROM banks WHERE is_active = 1 ORDER BY bank_name").all(),s=await e.env.DB.prepare("SELECT id, type_name FROM financing_types ORDER BY type_name").all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إضافة طلب تمويل جديد</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/requests" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة طلبات التمويل
            </a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
              <i class="fas fa-plus-circle text-purple-600 ml-2"></i>
              إضافة طلب تمويل جديد
            </h1>
            
            <form action="/api/requests" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- اختيار العميل -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-user text-blue-600 ml-1"></i>
                    العميل *
                  </label>
                  <select name="customer_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">-- اختر العميل --</option>
                    ${t.results.map(r=>`
                      <option value="${r.id}">${r.full_name} - ${r.phone}</option>
                    `).join("")}
                  </select>
                </div>
                
                <!-- نوع التمويل -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-file-invoice text-purple-600 ml-1"></i>
                    نوع التمويل *
                  </label>
                  <select name="financing_type_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">-- اختر نوع التمويل --</option>
                    ${s.results.map(r=>`
                      <option value="${r.id}">${r.type_name}</option>
                    `).join("")}
                  </select>
                </div>
                
                <!-- المبلغ المطلوب -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-money-bill-wave text-green-600 ml-1"></i>
                    المبلغ المطلوب (ريال) *
                  </label>
                  <input type="number" name="requested_amount" required min="1000" step="1000" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                         placeholder="مثال: 50000">
                </div>
                
                <!-- مدة التمويل -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-calendar text-orange-600 ml-1"></i>
                    مدة التمويل (شهور) *
                  </label>
                  <select name="duration_months" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">-- اختر المدة --</option>
                    <option value="12">12 شهر (سنة)</option>
                    <option value="24">24 شهر (سنتين)</option>
                    <option value="36">36 شهر (3 سنوات)</option>
                    <option value="48">48 شهر (4 سنوات)</option>
                    <option value="60">60 شهر (5 سنوات)</option>
                    <option value="84">84 شهر (7 سنوات)</option>
                    <option value="120">120 شهر (10 سنوات)</option>
                  </select>
                </div>
                
                <!-- الراتب عند الطلب -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-coins text-yellow-600 ml-1"></i>
                    الراتب عند الطلب (ريال) *
                  </label>
                  <input type="number" name="salary_at_request" required min="1000" step="100" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                         placeholder="مثال: 15000">
                </div>
                
                <!-- البنك المختار -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-university text-yellow-600 ml-1"></i>
                    البنك المختار
                  </label>
                  <select name="selected_bank_id" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="">-- اختر البنك (اختياري) --</option>
                    ${a.results.map(r=>`
                      <option value="${r.id}">${r.bank_name}</option>
                    `).join("")}
                  </select>
                </div>
                
                <!-- الحالة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-flag text-blue-600 ml-1"></i>
                    الحالة *
                  </label>
                  <select name="status" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="pending">قيد المراجعة</option>
                    <option value="approved">مقبول</option>
                    <option value="rejected">مرفوض</option>
                  </select>
                </div>
                
                <!-- ملاحظات -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-comment text-gray-600 ml-1"></i>
                    ملاحظات
                  </label>
                  <textarea name="notes" rows="3" 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="أي ملاحظات إضافية..."></textarea>
                </div>
              </div>
              
              <div class="flex gap-4 pt-6 border-t">
                <button type="submit" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-bold transition-all">
                  <i class="fas fa-save ml-2"></i>
                  حفظ الطلب
                </button>
                <a href="/admin/requests" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold text-center transition-all">
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل الصفحة</h1>")}});c.get("/admin/requests/:id",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT fr.*, 
             c.full_name as customer_name, c.phone as customer_phone, c.email as customer_email,
             b.bank_name, ft.type_name as financing_type_name
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      LEFT JOIN banks b ON fr.selected_bank_id = b.id
      LEFT JOIN financing_types ft ON fr.financing_type_id = ft.id
      WHERE fr.id = ?
    `).bind(t).first();return a?e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض طلب التمويل #${t}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6 flex justify-between items-center">
            <a href="/admin/requests" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة الطلبات
            </a>
            <div class="flex gap-2">
              <a href="/admin/requests/${t}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-edit ml-1"></i> تعديل
              </a>
              <a href="/admin/requests/${t}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-trash ml-1"></i> حذف
              </a>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <i class="fas fa-file-invoice text-purple-600 ml-3"></i>
              طلب التمويل #${t}
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- معلومات العميل -->
              <div class="md:col-span-2 border-b pb-4">
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-user text-blue-600 ml-2"></i>
                  معلومات العميل
                </h2>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الاسم الكامل</label>
                <p class="text-lg text-gray-900">${a.customer_name||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">رقم الجوال</label>
                <p class="text-lg text-gray-900">${a.customer_phone||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">البريد الإلكتروني</label>
                <p class="text-lg text-gray-900">${a.customer_email||"-"}</p>
              </div>
              
              <!-- معلومات التمويل -->
              <div class="md:col-span-2 border-b pb-4 mt-4">
                <h2 class="text-xl font-bold text-gray-700 mb-4">
                  <i class="fas fa-money-bill-wave text-green-600 ml-2"></i>
                  معلومات التمويل
                </h2>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">نوع التمويل</label>
                <p class="text-lg text-gray-900">${a.financing_type_name||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">المبلغ المطلوب</label>
                <p class="text-lg font-bold text-green-600">${a.requested_amount?.toLocaleString()||"0"} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">مدة التمويل</label>
                <p class="text-lg text-gray-900">${a.duration_months||"0"} شهر</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الراتب عند الطلب</label>
                <p class="text-lg text-gray-900">${a.salary_at_request?.toLocaleString()||"0"} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">البنك المختار</label>
                <p class="text-lg text-gray-900">${a.bank_name||"غير محدد"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحالة</label>
                <p>
                  <span class="px-4 py-2 rounded-full text-sm font-bold ${a.status==="approved"?"bg-green-100 text-green-800":a.status==="pending"?"bg-yellow-100 text-yellow-800":"bg-red-100 text-red-800"}">
                    ${a.status==="approved"?"مقبول":a.status==="pending"?"قيد المراجعة":"مرفوض"}
                  </span>
                </p>
              </div>
              
              ${a.notes?`
                <div class="md:col-span-2 mt-4">
                  <label class="block text-sm font-bold text-gray-600 mb-1">ملاحظات</label>
                  <p class="text-gray-900 bg-gray-50 p-4 rounded">${a.notes}</p>
                </div>
              `:""}
              
              <div class="md:col-span-2 mt-4">
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الإنشاء</label>
                <p class="text-gray-900">${new Date(a.created_at).toLocaleString("ar-SA")}</p>
              </div>
            </div>
          </div>
          
          <!-- قسم المرفقات -->
          <div class="bg-white rounded-xl shadow-lg p-8 mt-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <i class="fas fa-paperclip text-blue-600 ml-3"></i>
              المرفقات
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${a.id_attachment_url?`
                <div class="border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <i class="fas fa-id-card text-2xl text-blue-600 ml-3"></i>
                      <span class="font-bold text-gray-800">صورة الهوية</span>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">متوفر</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <a href="${a.id_attachment_url}" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="${a.id_attachment_url}" download 
                       class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-download"></i> تنزيل
                    </a>
                    <button onclick="deleteAttachment('${a.id_attachment_url}', 'id')" 
                       class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-trash"></i> حذف
                    </button>
                  </div>
                </div>
              `:`
                <div class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div class="flex items-center mb-3">
                    <i class="fas fa-id-card text-2xl text-gray-400 ml-3"></i>
                    <span class="font-bold text-gray-600">صورة الهوية</span>
                  </div>
                  <p class="text-sm text-gray-500">لم يتم رفع المرفق</p>
                </div>
              `}
              
              ${a.salary_attachment_url?`
                <div class="border-2 border-green-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <i class="fas fa-money-check-alt text-2xl text-green-600 ml-3"></i>
                      <span class="font-bold text-gray-800">كشف الراتب</span>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">متوفر</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <a href="${a.salary_attachment_url}" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="${a.salary_attachment_url}" download 
                       class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-download"></i> تنزيل
                    </a>
                    <button onclick="deleteAttachment('${a.salary_attachment_url}', 'salary')" 
                       class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-trash"></i> حذف
                    </button>
                  </div>
                </div>
              `:`
                <div class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div class="flex items-center mb-3">
                    <i class="fas fa-money-check-alt text-2xl text-gray-400 ml-3"></i>
                    <span class="font-bold text-gray-600">كشف الراتب</span>
                  </div>
                  <p class="text-sm text-gray-500">لم يتم رفع المرفق</p>
                </div>
              `}
              
              ${a.bank_statement_attachment_url?`
                <div class="border-2 border-purple-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <i class="fas fa-file-invoice-dollar text-2xl text-purple-600 ml-3"></i>
                      <span class="font-bold text-gray-800">كشف الحساب البنكي</span>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">متوفر</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <a href="${a.bank_statement_attachment_url}" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="${a.bank_statement_attachment_url}" download 
                       class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-download"></i> تنزيل
                    </a>
                    <button onclick="deleteAttachment('${a.bank_statement_attachment_url}', 'bank_statement')" 
                       class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-trash"></i> حذف
                    </button>
                  </div>
                </div>
              `:`
                <div class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div class="flex items-center mb-3">
                    <i class="fas fa-file-invoice-dollar text-2xl text-gray-400 ml-3"></i>
                    <span class="font-bold text-gray-600">كشف الحساب البنكي</span>
                  </div>
                  <p class="text-sm text-gray-500">لم يتم رفع المرفق</p>
                </div>
              `}
              
              ${a.additional_attachment_url?`
                <div class="border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <i class="fas fa-file-alt text-2xl text-orange-600 ml-3"></i>
                      <span class="font-bold text-gray-800">مرفق إضافي</span>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">متوفر</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <a href="${a.additional_attachment_url}" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="${a.additional_attachment_url}" download 
                       class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-download"></i> تنزيل
                    </a>
                    <button onclick="deleteAttachment('${a.additional_attachment_url}', 'additional')" 
                       class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-trash"></i> حذف
                    </button>
                  </div>
                </div>
              `:`
                <div class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div class="flex items-center mb-3">
                    <i class="fas fa-file-alt text-2xl text-gray-400 ml-3"></i>
                    <span class="font-bold text-gray-600">مرفق إضافي</span>
                  </div>
                  <p class="text-sm text-gray-500">لم يتم رفع المرفق</p>
                </div>
              `}
            </div>
            
            ${!a.id_attachment_url&&!a.salary_attachment_url&&!a.bank_statement_attachment_url&&!a.additional_attachment_url?`
              <div class="text-center mt-6 text-gray-500">
                <i class="fas fa-inbox text-4xl mb-2"></i>
                <p>لا توجد مرفقات لهذا الطلب</p>
              </div>
            `:""}
          </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script>
          async function deleteAttachment(attachmentUrl, type) {
            if (!confirm('هل أنت متأكد من حذف هذا المرفق؟ لا يمكن التراجع عن هذا الإجراء.')) {
              return;
            }
            
            try {
              // Extract path from URL (remove /api/attachments/view/ prefix)
              const path = attachmentUrl.replace('/api/attachments/view/', '');
              
              const response = await axios.delete(\`/api/attachments/delete/\${path}\`);
              
              if (response.data.success) {
                alert('✓ تم حذف المرفق بنجاح');
                location.reload(); // Reload page to reflect changes
              } else {
                alert('✗ فشل حذف المرفق: ' + (response.data.error || 'خطأ غير معروف'));
              }
            } catch (error) {
              console.error('Error deleting attachment:', error);
              alert('✗ حدث خطأ أثناء حذف المرفق');
            }
          }
        <\/script>
      </body>
      </html>
    `):e.html("<h1>الطلب غير موجود</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/customers/:id",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare("SELECT * FROM customers WHERE id = ?").bind(t).first();return a?e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض العميل</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/customers" class="text-blue-600 hover:text-blue-800">← العودة لقائمة العملاء</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold mb-6 text-gray-800">
              <i class="fas fa-user text-green-600 ml-2"></i>
              بيانات العميل
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="border-r-4 border-blue-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">رقم العميل</p>
                <p class="text-xl font-bold text-gray-800">#${a.id}</p>
              </div>
              
              <div class="border-r-4 border-green-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">الاسم الكامل</p>
                <p class="text-xl font-bold text-gray-800">${a.name}</p>
              </div>
              
              <div class="border-r-4 border-yellow-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">رقم الهاتف</p>
                <p class="text-xl font-bold text-gray-800">${a.phone||"غير متوفر"}</p>
              </div>
              
              <div class="border-r-4 border-purple-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">البريد الإلكتروني</p>
                <p class="text-xl font-bold text-gray-800">${a.email||"غير متوفر"}</p>
              </div>
              
              <div class="border-r-4 border-red-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">الرقم الوطني</p>
                <p class="text-xl font-bold text-gray-800">${a.national_id||"غير متوفر"}</p>
              </div>
              
              <div class="border-r-4 border-indigo-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">تاريخ التسجيل</p>
                <p class="text-xl font-bold text-gray-800">${new Date(a.created_at).toLocaleDateString("ar-SA")}</p>
              </div>
            </div>
            
            <div class="mt-8 flex gap-4">
              <a href="/admin/customers/${t}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold">
                <i class="fas fa-edit ml-2"></i>
                تعديل البيانات
              </a>
              <a href="/admin/customers/${t}/delete" onclick="return confirm('هل أنت متأكد من حذف هذا العميل؟')" class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold">
                <i class="fas fa-trash ml-2"></i>
                حذف العميل
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `):e.html("<h1>العميل غير موجود</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/customers/:id/edit",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare("SELECT * FROM customers WHERE id = ?").bind(t).first();return a?e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تعديل العميل</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/customers/${t}" class="text-blue-600 hover:text-blue-800">← العودة لبيانات العميل</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold mb-6 text-gray-800">
              <i class="fas fa-edit text-yellow-600 ml-2"></i>
              تعديل بيانات العميل #${t}
            </h1>
            
            <form method="POST" action="/api/customers/${t}" enctype="application/x-www-form-urlencoded" class="space-y-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                <input type="text" name="name" value="${a.name}" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
                <input type="tel" name="phone" value="${a.phone||""}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
                <input type="email" name="email" value="${a.email||""}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">الرقم الوطني</label>
                <input type="text" name="national_id" value="${a.national_id||""}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div class="flex gap-4">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold">
                  <i class="fas fa-save ml-2"></i>
                  حفظ التعديلات
                </button>
                <a href="/admin/customers/${t}" class="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold">
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `):e.html("<h1>العميل غير موجود</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/customers/:id/delete",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM customers WHERE id = ?").bind(t).run(),e.redirect("/admin/customers")}catch{return e.html("<h1>خطأ في حذف العميل</h1>")}});c.get("/admin/banks/add",async e=>e.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>إضافة بنك جديد</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <div class="max-w-4xl mx-auto p-6">
        <div class="mb-6">
          <a href="/admin/banks" class="text-blue-600 hover:text-blue-800">← العودة لقائمة البنوك</a>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-bold mb-6 text-gray-800">
            <i class="fas fa-plus-circle text-green-600 ml-2"></i>
            إضافة بنك جديد
          </h1>
          
          <form action="/api/banks" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">اسم البنك</label>
              <input type="text" name="bank_name" required 
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">
            </div>
            
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">الوصف</label>
              <textarea name="description" rows="3"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"></textarea>
            </div>
            
            <div class="flex gap-4">
              <button type="submit" 
                      class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold">
                <i class="fas fa-save ml-2"></i>
                حفظ البنك
              </button>
              <a href="/admin/banks" class="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold">
                <i class="fas fa-times ml-2"></i>
                إلغاء
              </a>
            </div>
          </form>
        </div>
      </div>
    </body>
    </html>
  `));c.get("/admin/customers/:id/report",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT 
        c.*,
        ft.type_name as financing_type_name,
        b.bank_name as best_bank_name
      FROM customers c
      LEFT JOIN financing_types ft ON c.financing_type_id = ft.id
      LEFT JOIN banks b ON c.best_bank_id = b.id
      WHERE c.id = ?
    `).bind(t).first();if(!a)return e.html("<h1>العميل غير موجود</h1>");const s=a,r=o=>o?new Date(o).toLocaleDateString("ar-SA",{year:"numeric",month:"long",day:"numeric"}):"غير محدد",l=o=>o?o.toLocaleString("ar-SA"):"غير محدد";return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تقرير العميل - ${s.full_name}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          @media print {
            .no-print { display: none !important; }
            body { background: white; }
          }
          .report-section {
            page-break-inside: avoid;
          }
          
          ${k()}
        </style>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-5xl mx-auto p-6">
          <!-- أزرار التحكم -->
          <div class="mb-6 no-print flex justify-between items-center">
            <a href="/admin/customers" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة العملاء
            </a>
            <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
              <i class="fas fa-print ml-2"></i>
              طباعة التقرير
            </button>
          </div>
          
          <!-- رأس التقرير -->
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8 mb-6 report-section">
            <div class="text-center">
              <h1 class="text-4xl font-bold mb-2">
                <i class="fas fa-file-contract ml-3"></i>
                تقرير العميل الشامل
              </h1>
              <p class="text-xl opacity-90">نظام تمويل - Tamweel Finance</p>
              <p class="text-sm opacity-75 mt-2">تاريخ التقرير: ${r(new Date().toISOString())}</p>
            </div>
          </div>
          
          <!-- القسم 1: المعلومات الشخصية -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6 report-section">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-blue-500 pb-2">
              <i class="fas fa-user text-blue-600 ml-2"></i>
              المعلومات الشخصية
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <i class="fas fa-id-card text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">رقم العميل</p>
                  <p class="text-xl font-bold text-gray-800">#${s.id}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-green-100 p-3 rounded-lg">
                  <i class="fas fa-user text-green-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">الاسم الكامل</p>
                  <p class="text-xl font-bold text-gray-800">${s.full_name||"غير محدد"}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <i class="fas fa-phone text-yellow-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">رقم الهاتف</p>
                  <p class="text-xl font-bold text-gray-800" dir="ltr">${s.phone||"غير محدد"}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-envelope text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">البريد الإلكتروني</p>
                  <p class="text-xl font-bold text-gray-800">${s.email||"غير محدد"}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-red-100 p-3 rounded-lg">
                  <i class="fas fa-calendar text-red-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">تاريخ الميلاد</p>
                  <p class="text-xl font-bold text-gray-800">${r(s.birthdate)}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-indigo-100 p-3 rounded-lg">
                  <i class="fas fa-id-badge text-indigo-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">رقم الهوية</p>
                  <p class="text-xl font-bold text-gray-800">${s.national_id&&!s.national_id.startsWith("TEMP-")?s.national_id:"غير محدد"}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- القسم 2: بيانات الحاسبة المالية -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6 report-section">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-green-500 pb-2">
              <i class="fas fa-calculator text-green-600 ml-2"></i>
              بيانات الحاسبة المالية
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-green-100 p-3 rounded-lg">
                  <i class="fas fa-money-bill-wave text-green-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">الراتب الشهري</p>
                  <p class="text-2xl font-bold text-green-600">${l(s.monthly_salary)} ريال</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <i class="fas fa-hand-holding-usd text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">مبلغ التمويل المطلوب</p>
                  <p class="text-2xl font-bold text-blue-600">${l(s.financing_amount)} ريال</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-red-100 p-3 rounded-lg">
                  <i class="fas fa-receipt text-red-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">الالتزامات الشهرية</p>
                  <p class="text-2xl font-bold text-red-600">${l(s.monthly_obligations)} ريال</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-tag text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">نوع التمويل</p>
                  <p class="text-xl font-bold text-purple-600">${s.financing_type_name||"غير محدد"}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- القسم 3: نتائج التمويل (أفضل عرض) -->
          <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6 report-section border-2 border-green-400">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-green-500 pb-2">
              <i class="fas fa-star text-green-600 ml-2"></i>
              أفضل عرض تمويلي
            </h2>
            
            ${s.best_bank_id?`
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg p-4 shadow">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-green-100 p-3 rounded-lg">
                      <i class="fas fa-university text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">البنك المختار</p>
                      <p class="text-2xl font-bold text-green-600">${s.best_bank_name||"غير محدد"}</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-blue-100 p-3 rounded-lg">
                      <i class="fas fa-clock text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">مدة التمويل</p>
                      <p class="text-2xl font-bold text-blue-600">${s.financing_duration_months||"غير محدد"} شهر</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-yellow-100 p-3 rounded-lg">
                      <i class="fas fa-percentage text-yellow-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">معدل الفائدة</p>
                      <p class="text-2xl font-bold text-yellow-600">${s.best_rate?s.best_rate+"%":"غير محدد"}</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-purple-100 p-3 rounded-lg">
                      <i class="fas fa-calendar-check text-purple-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">القسط الشهري</p>
                      <p class="text-2xl font-bold text-purple-600">${l(s.monthly_payment)} ريال</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white rounded-lg p-4 shadow md:col-span-2">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-indigo-100 p-3 rounded-lg">
                      <i class="fas fa-coins text-indigo-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">إجمالي المبلغ المستحق</p>
                      <p class="text-3xl font-bold text-indigo-600">${l(s.total_payment)} ريال</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-green-50 rounded-lg p-4 shadow md:col-span-2 border-2 border-green-300">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-green-100 p-3 rounded-lg">
                      <i class="fas fa-calendar-alt text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">تاريخ الحساب</p>
                      <p class="text-xl font-bold text-green-600">${r(s.calculation_date)}</p>
                    </div>
                  </div>
                </div>
              </div>
            `:`
              <div class="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
                <i class="fas fa-exclamation-triangle text-yellow-600 text-4xl mb-3"></i>
                <p class="text-xl font-bold text-yellow-700">لم يتم حساب عرض تمويلي بعد</p>
                <p class="text-gray-600 mt-2">العميل لم يستخدم الحاسبة لحساب أفضل عرض تمويلي</p>
              </div>
            `}
          </div>
          
          <!-- القسم 4: معلومات إضافية -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6 report-section">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-500 pb-2">
              <i class="fas fa-info-circle text-gray-600 ml-2"></i>
              معلومات إضافية
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <i class="fas fa-calendar-plus text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">تاريخ التسجيل</p>
                  <p class="text-lg font-bold text-gray-800">${r(s.created_at)}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-edit text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">آخر تحديث</p>
                  <p class="text-lg font-bold text-gray-800">${r(s.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- تذييل التقرير -->
          <div class="bg-gray-100 rounded-xl p-6 text-center report-section">
            <p class="text-gray-600">
              <i class="fas fa-shield-alt ml-2"></i>
              هذا التقرير سري ومخصص للاستخدام الداخلي فقط
            </p>
            <p class="text-sm text-gray-500 mt-2">
              تم إنشاء هذا التقرير بواسطة نظام تمويل - Tamweel Finance Management System
            </p>
          </div>
        </div>
      </body>
      </html>
    `)}catch(t){return console.error("خطأ في عرض تقرير العميل:",t),e.html(`<h1>حدث خطأ: ${t.message}</h1>`)}});c.get("/admin/requests/:id/report",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT 
        fr.*,
        c.full_name as customer_name,
        c.phone as customer_phone,
        c.email as customer_email,
        c.national_id as customer_national_id,
        c.birthdate as customer_birthdate,
        c.monthly_salary as customer_salary,
        b.bank_name,
        ft.type_name as financing_type_name
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      LEFT JOIN banks b ON fr.selected_bank_id = b.id
      LEFT JOIN financing_types ft ON fr.financing_type_id = ft.id
      WHERE fr.id = ?
    `).bind(t).first();if(!a)return e.html("<h1>الطلب غير موجود</h1>");const s=a,r=n=>n?new Date(n).toLocaleDateString("ar-SA",{year:"numeric",month:"long",day:"numeric"}):"غير محدد",l=n=>n?n.toLocaleString("ar-SA"):"غير محدد",o={pending:{text:"قيد المراجعة",color:"yellow",icon:"clock"},approved:{text:"مقبول",color:"green",icon:"check-circle"},rejected:{text:"مرفوض",color:"red",icon:"times-circle"}},i=o[s.status]||o.pending;return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تقرير طلب التمويل - ${s.customer_name}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          @media print {
            .no-print { display: none !important; }
            body { background: white; }
          }
          .report-section {
            page-break-inside: avoid;
          }
          
          ${k()}
        </style>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-5xl mx-auto p-6">
          <!-- أزرار التحكم -->
          <div class="mb-6 no-print flex justify-between items-center flex-wrap gap-3">
            <a href="/admin/requests" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة طلبات التمويل
            </a>
            <div class="flex gap-3">
              <a href="/admin/requests/${t}/workflow" class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg">
                <i class="fas fa-route ml-2"></i>
                سير العمل (Workflow)
              </a>
              <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                <i class="fas fa-print ml-2"></i>
                طباعة التقرير
              </button>
            </div>
          </div>
          
          <!-- رأس التقرير -->
          <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg p-8 mb-6 report-section">
            <div class="text-center">
              <h1 class="text-4xl font-bold mb-2">
                <i class="fas fa-file-invoice ml-3"></i>
                تقرير طلب التمويل
              </h1>
              <p class="text-xl opacity-90">نظام تمويل - Tamweel Finance</p>
              <p class="text-sm opacity-75 mt-2">رقم الطلب: #${s.id} | تاريخ التقرير: ${r(new Date().toISOString())}</p>
            </div>
          </div>
          
          <!-- حالة الطلب -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6 report-section">
            <div class="flex items-center justify-center">
              <div class="bg-${i.color}-100 border-2 border-${i.color}-300 rounded-lg p-6 text-center">
                <i class="fas fa-${i.icon} text-${i.color}-600 text-5xl mb-3"></i>
                <p class="text-2xl font-bold text-${i.color}-700">حالة الطلب: ${i.text}</p>
                <p class="text-sm text-gray-600 mt-2">تاريخ الطلب: ${r(s.created_at)}</p>
              </div>
            </div>
          </div>
          
          <!-- القسم 1: معلومات العميل -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6 report-section">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-blue-500 pb-2">
              <i class="fas fa-user text-blue-600 ml-2"></i>
              معلومات العميل
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <i class="fas fa-user text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">اسم العميل</p>
                  <p class="text-xl font-bold text-gray-800">${s.customer_name||"غير محدد"}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-green-100 p-3 rounded-lg">
                  <i class="fas fa-phone text-green-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">رقم الهاتف</p>
                  <p class="text-xl font-bold text-gray-800" dir="ltr">${s.customer_phone||"غير محدد"}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-envelope text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">البريد الإلكتروني</p>
                  <p class="text-xl font-bold text-gray-800">${s.customer_email||"غير محدد"}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-red-100 p-3 rounded-lg">
                  <i class="fas fa-calendar text-red-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">تاريخ الميلاد</p>
                  <p class="text-xl font-bold text-gray-800">${r(s.customer_birthdate)}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <i class="fas fa-money-bill-wave text-yellow-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">الراتب الشهري</p>
                  <p class="text-xl font-bold text-yellow-600">${l(s.customer_salary)} ريال</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-indigo-100 p-3 rounded-lg">
                  <i class="fas fa-id-badge text-indigo-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">رقم الهوية</p>
                  <p class="text-xl font-bold text-gray-800">${s.customer_national_id&&!s.customer_national_id.startsWith("TEMP-")?s.customer_national_id:"غير محدد"}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- القسم 2: تفاصيل طلب التمويل -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 mb-6 report-section border-2 border-purple-400">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-purple-500 pb-2">
              <i class="fas fa-file-invoice-dollar text-purple-600 ml-2"></i>
              تفاصيل طلب التمويل
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-start space-x-3 space-x-reverse">
                  <div class="bg-purple-100 p-3 rounded-lg">
                    <i class="fas fa-tag text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">نوع التمويل</p>
                    <p class="text-2xl font-bold text-purple-600">${s.financing_type_name||"غير محدد"}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-start space-x-3 space-x-reverse">
                  <div class="bg-blue-100 p-3 rounded-lg">
                    <i class="fas fa-hand-holding-usd text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">المبلغ المطلوب</p>
                    <p class="text-2xl font-bold text-blue-600">${l(s.requested_amount)} ريال</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-start space-x-3 space-x-reverse">
                  <div class="bg-green-100 p-3 rounded-lg">
                    <i class="fas fa-clock text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">مدة التمويل</p>
                    <p class="text-2xl font-bold text-green-600">${s.duration_months||"غير محدد"} شهر</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-start space-x-3 space-x-reverse">
                  <div class="bg-yellow-100 p-3 rounded-lg">
                    <i class="fas fa-university text-yellow-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">البنك المختار</p>
                    <p class="text-2xl font-bold text-yellow-600">${s.bank_name||"غير محدد"}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-start space-x-3 space-x-reverse">
                  <div class="bg-red-100 p-3 rounded-lg">
                    <i class="fas fa-receipt text-red-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">الالتزامات الشهرية</p>
                    <p class="text-2xl font-bold text-red-600">${l(s.monthly_obligations)} ريال</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-start space-x-3 space-x-reverse">
                  <div class="bg-indigo-100 p-3 rounded-lg">
                    <i class="fas fa-calendar-check text-indigo-600 text-xl"></i>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">القسط الشهري</p>
                    <p class="text-2xl font-bold text-indigo-600">${l(s.monthly_payment)} ريال</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- القسم 3: معلومات إضافية -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6 report-section">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-500 pb-2">
              <i class="fas fa-info-circle text-gray-600 ml-2"></i>
              معلومات إضافية
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <i class="fas fa-calendar-plus text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">تاريخ تقديم الطلب</p>
                  <p class="text-lg font-bold text-gray-800">${r(s.created_at)}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-edit text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">آخر تحديث</p>
                  <p class="text-lg font-bold text-gray-800">${r(s.updated_at)}</p>
                </div>
              </div>
              
              ${s.notes?`
              <div class="md:col-span-2">
                <div class="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                  <p class="text-sm text-gray-500 mb-2">ملاحظات</p>
                  <p class="text-gray-700">${s.notes}</p>
                </div>
              </div>
              `:""}
            </div>
          </div>
          
          <!-- تذييل التقرير -->
          <div class="bg-gray-100 rounded-xl p-6 text-center report-section">
            <p class="text-gray-600">
              <i class="fas fa-shield-alt ml-2"></i>
              هذا التقرير سري ومخصص للاستخدام الداخلي فقط
            </p>
            <p class="text-sm text-gray-500 mt-2">
              تم إنشاء هذا التقرير بواسطة نظام تمويل - Tamweel Finance Management System
            </p>
          </div>
        </div>
      </body>
      </html>
    `)}catch(t){return console.error("خطأ في عرض تقرير طلب التمويل:",t),e.html(`<h1>حدث خطأ: ${t.message}</h1>`)}});c.get("/admin/requests/:id/timeline",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT 
        fr.*,
        c.full_name as customer_name,
        c.created_at as customer_registration_date,
        c.first_calculation_date
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      WHERE fr.id = ?
    `).bind(t).first();if(!a)return e.html("<h1>الطلب غير موجود</h1>");const s=a,r=await e.env.DB.prepare(`
      SELECT * FROM financing_request_status_history 
      WHERE request_id = ? 
      ORDER BY created_at ASC
    `).bind(t).all(),l=(d,p)=>{if(!d||!p)return null;const u=new Date(p).getTime()-new Date(d).getTime(),m=Math.floor(u/(1e3*60*60*24)),b=Math.floor(u%(1e3*60*60*24)/(1e3*60*60)),g=Math.floor(u%(1e3*60*60)/(1e3*60));return m>0?`${m} يوم و ${b} ساعة`:b>0?`${b} ساعة و ${g} دقيقة`:`${g} دقيقة`},o=d=>d?new Date(d).toLocaleString("ar-SA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}):"غير محدد",i=[];if(s.customer_registration_date&&i.push({title:"تسجيل العميل",icon:"user-plus",color:"blue",date:s.customer_registration_date,description:`تم تسجيل العميل ${s.customer_name} في النظام`}),s.first_calculation_date){const d=l(s.customer_registration_date,s.first_calculation_date);i.push({title:"استخدام الحاسبة",icon:"calculator",color:"green",date:s.first_calculation_date,description:"العميل استخدم حاسبة التمويل لأول مرة",duration:d})}if(i.push({title:"تقديم طلب التمويل",icon:"file-invoice",color:"purple",date:s.created_at,description:`تم تقديم طلب تمويل بمبلغ ${s.requested_amount?.toLocaleString("ar-SA")} ريال`,duration:s.first_calculation_date?l(s.first_calculation_date,s.created_at):l(s.customer_registration_date,s.created_at)}),r.results.length>0){let d=s.created_at;r.results.forEach(p=>{const m={pending:{title:"قيد الانتظار",icon:"clock",color:"yellow"},under_review:{title:"قيد المراجعة",icon:"search",color:"orange"},approved:{title:"تمت الموافقة",icon:"check-circle",color:"green"},rejected:{title:"تم الرفض",icon:"times-circle",color:"red"}}[p.new_status]||{title:p.new_status,icon:"info",color:"gray"};i.push({title:m.title,icon:m.icon,color:m.color,date:p.created_at,description:p.notes||`تغيرت الحالة إلى: ${m.title}`,duration:l(d,p.created_at)}),d=p.created_at})}else s.reviewed_at&&i.push({title:"قيد المراجعة",icon:"search",color:"orange",date:s.reviewed_at,description:"بدأت عملية المراجعة",duration:l(s.created_at,s.reviewed_at)}),s.approved_at&&i.push({title:"تمت الموافقة",icon:"check-circle",color:"green",date:s.approved_at,description:"تمت الموافقة على الطلب",duration:l(s.reviewed_at||s.created_at,s.approved_at)}),s.rejected_at&&i.push({title:"تم الرفض",icon:"times-circle",color:"red",date:s.rejected_at,description:"تم رفض الطلب",duration:l(s.reviewed_at||s.created_at,s.rejected_at)});const n=i.length>1?l(i[0].date,i[i.length-1].date):null;return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>التقرير الزمني - طلب #${t}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          @media print {
            .no-print { display: none !important; }
            body { background: white; }
          }
          .timeline-line {
            position: absolute;
            right: 39px;
            top: 80px;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, #3B82F6, #8B5CF6);
          }
          .timeline-dot {
            position: absolute;
            right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10;
          }
          
          ${k()}
        </style>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-5xl mx-auto p-6">
          <!-- أزرار التحكم -->
          <div class="mb-6 no-print flex justify-between items-center">
            <a href="/admin/requests/${t}/report" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة للتقرير
            </a>
            <div class="flex gap-3">
              <a href="/admin/requests" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                <i class="fas fa-list ml-2"></i>
                قائمة الطلبات
              </a>
              <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                <i class="fas fa-print ml-2"></i>
                طباعة
              </button>
            </div>
          </div>
          
          <!-- رأس التقرير -->
          <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl shadow-lg p-8 mb-6">
            <div class="text-center">
              <h1 class="text-4xl font-bold mb-2">
                <i class="fas fa-clock ml-3"></i>
                التقرير الزمني (Timeline)
              </h1>
              <p class="text-xl opacity-90">رحلة طلب التمويل</p>
              <p class="text-sm opacity-75 mt-2">طلب رقم #${t} | ${s.customer_name}</p>
            </div>
          </div>
          
          <!-- إحصائيات سريعة -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-white rounded-xl shadow-lg p-6 text-center">
              <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-flag-checkered text-blue-600 text-2xl"></i>
              </div>
              <p class="text-sm text-gray-500">عدد المراحل</p>
              <p class="text-3xl font-bold text-blue-600">${i.length}</p>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6 text-center">
              <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-hourglass-half text-purple-600 text-2xl"></i>
              </div>
              <p class="text-sm text-gray-500">الوقت الإجمالي</p>
              <p class="text-2xl font-bold text-purple-600">${n||"جاري..."}</p>
            </div>
            
            <div class="bg-white rounded-xl shadow-lg p-6 text-center">
              <div class="bg-${s.status==="approved"?"green":s.status==="rejected"?"red":"yellow"}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-${s.status==="approved"?"check-circle":s.status==="rejected"?"times-circle":"clock"} text-${s.status==="approved"?"green":s.status==="rejected"?"red":"yellow"}-600 text-2xl"></i>
              </div>
              <p class="text-sm text-gray-500">الحالة الحالية</p>
              <p class="text-xl font-bold text-${s.status==="approved"?"green":s.status==="rejected"?"red":"yellow"}-600">
                ${s.status==="approved"?"مقبول":s.status==="rejected"?"مرفوض":"قيد المراجعة"}
              </p>
            </div>
          </div>
          
          <!-- Timeline -->
          <div class="bg-white rounded-xl shadow-lg p-8 mb-6 relative">
            <h2 class="text-2xl font-bold mb-8 text-gray-800">
              <i class="fas fa-stream ml-2"></i>
              المراحل الزمنية
            </h2>
            
            <!-- الخط الزمني -->
            ${i.length>1?'<div class="timeline-line"></div>':""}
            
            <!-- العناصر -->
            <div class="space-y-8 relative">
              ${i.map((d,p)=>`
                <div class="flex items-start gap-6 relative pr-20">
                  <!-- النقطة -->
                  <div class="timeline-dot bg-${d.color}-500 text-white">
                    <i class="fas fa-${d.icon}"></i>
                  </div>
                  
                  <!-- المحتوى -->
                  <div class="flex-1 bg-${d.color}-50 border-2 border-${d.color}-200 rounded-lg p-6">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-xl font-bold text-${d.color}-700">
                        ${p+1}. ${d.title}
                      </h3>
                      ${d.duration?`
                        <span class="bg-${d.color}-200 text-${d.color}-800 px-3 py-1 rounded-full text-sm font-bold">
                          <i class="fas fa-stopwatch ml-1"></i>
                          ${d.duration}
                        </span>
                      `:""}
                    </div>
                    <p class="text-gray-700 mb-2">${d.description}</p>
                    <p class="text-sm text-gray-500">
                      <i class="fas fa-calendar ml-1"></i>
                      ${o(d.date)}
                    </p>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
          
          <!-- ملخص الأوقات -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border-2 border-purple-300">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">
              <i class="fas fa-chart-line text-purple-600 ml-2"></i>
              ملخص الفترات الزمنية
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${i.filter(d=>d.duration).map((d,p)=>`
                <div class="bg-white rounded-lg p-4 shadow">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="bg-${d.color}-100 p-2 rounded-lg">
                        <i class="fas fa-${d.icon} text-${d.color}-600"></i>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">من ${i[p]?.title||"البداية"}</p>
                        <p class="font-bold text-gray-800">إلى ${d.title}</p>
                      </div>
                    </div>
                    <p class="text-lg font-bold text-${d.color}-600">${d.duration}</p>
                  </div>
                </div>
              `).join("")}
            </div>
            
            ${n?`
              <div class="mt-4 bg-white rounded-lg p-4 shadow-lg border-2 border-purple-400">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="bg-purple-600 p-3 rounded-lg">
                      <i class="fas fa-clock text-white text-xl"></i>
                    </div>
                    <p class="text-xl font-bold text-gray-800">إجمالي الوقت</p>
                  </div>
                  <p class="text-2xl font-bold text-purple-600">${n}</p>
                </div>
              </div>
            `:""}
          </div>
          
          <!-- تذييل -->
          <div class="bg-gray-100 rounded-xl p-6 text-center mt-6">
            <p class="text-gray-600">
              <i class="fas fa-info-circle ml-2"></i>
              هذا التقرير يوضح الرحلة الزمنية الكاملة لطلب التمويل
            </p>
            <p class="text-sm text-gray-500 mt-2">
              Tamweel Finance Management System
            </p>
          </div>
        </div>
      </body>
      </html>
    `)}catch(t){return console.error("خطأ في عرض Timeline:",t),e.html(`<h1>حدث خطأ: ${t.message}</h1>`)}});c.get("/admin/requests/:id/workflow",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT 
        fr.*,
        c.full_name as customer_name,
        ws.stage_name_ar,
        ws.stage_color,
        ws.stage_icon
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      LEFT JOIN workflow_stages ws ON fr.current_stage_id = ws.id
      WHERE fr.id = ?
    `).bind(t).first();if(!a)return e.html("<h1>الطلب غير موجود</h1>");const{results:s}=await e.env.DB.prepare(`
      SELECT * FROM workflow_stages 
      WHERE is_active = 1 
      ORDER BY stage_order ASC
    `).all(),l=await(await fetch(new URL(`/api/workflow/timeline/${t}`,e.req.url).toString(),{headers:e.req.headers})).json(),o=ut(parseInt(t),a,s,l.data||{transitions:[],actions:[],tasks:[]});return e.html(o)}catch(t){return console.error("خطأ في عرض Workflow:",t),e.html(`<h1>حدث خطأ: ${t.message}</h1>`)}});c.post("/api/banks",async e=>{try{const t=await e.req.parseBody();return await e.env.DB.prepare(`
      INSERT INTO banks (bank_name, description, is_active, created_at)
      VALUES (?, ?, 1, datetime('now'))
    `).bind(t.bank_name,t.description||"").run(),e.redirect("/admin/banks")}catch{return e.json({error:"فشل إضافة البنك"},500)}});c.get("/admin/banks/:id",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare("SELECT * FROM banks WHERE id = ?").bind(t).first();return a?e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض البنك</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/banks" class="text-blue-600 hover:text-blue-800">← العودة لقائمة البنوك</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold mb-6 text-gray-800">
              <i class="fas fa-university text-yellow-600 ml-2"></i>
              بيانات البنك
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="border-r-4 border-blue-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">رقم البنك</p>
                <p class="text-xl font-bold text-gray-800">#${a.id}</p>
              </div>
              
              <div class="border-r-4 border-green-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">اسم البنك</p>
                <p class="text-xl font-bold text-gray-800">${a.bank_name}</p>
              </div>
              
              <div class="border-r-4 border-yellow-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">الوصف</p>
                <p class="text-xl font-bold text-gray-800">${a.description||"لا يوجد"}</p>
              </div>
              
              <div class="border-r-4 border-purple-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">الحالة</p>
                <p class="text-xl font-bold ${a.is_active?"text-green-600":"text-red-600"}">
                  ${a.is_active?"نشط":"غير نشط"}
                </p>
              </div>
            </div>
            
            <div class="mt-8 flex gap-4">
              <a href="/admin/banks/${a.id}/edit" 
                 class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold">
                <i class="fas fa-edit ml-2"></i>
                تعديل
              </a>
              <a href="/admin/banks/${a.id}/delete" 
                 class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold"
                 onclick="return confirm('هل أنت متأكد من حذف هذا البنك؟')">
                <i class="fas fa-trash ml-2"></i>
                حذف
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `):e.html("<h1>البنك غير موجود</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/banks/:id/edit",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare("SELECT * FROM banks WHERE id = ?").bind(t).first();return a?e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تعديل البنك</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/banks" class="text-blue-600 hover:text-blue-800">← العودة لقائمة البنوك</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold mb-6 text-gray-800">
              <i class="fas fa-edit text-blue-600 ml-2"></i>
              تعديل البنك
            </h1>
            
            <form action="/api/banks/${a.id}" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">اسم البنك</label>
                <input type="text" name="bank_name" value="${a.bank_name}" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">الوصف</label>
                <textarea name="description" rows="3"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">${a.description||""}</textarea>
              </div>
              
              <div class="flex gap-4">
                <button type="submit" 
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold">
                  <i class="fas fa-save ml-2"></i>
                  حفظ التغييرات
                </button>
                <a href="/admin/banks" class="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold">
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `):e.html("<h1>البنك غير موجود</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.post("/api/banks/:id",async e=>{try{const t=e.req.param("id"),a=await e.req.parseBody();return await e.env.DB.prepare(`
      UPDATE banks 
      SET bank_name = ?, description = ?
      WHERE id = ?
    `).bind(a.bank_name,a.description||"",t).run(),e.redirect("/admin/banks")}catch{return e.json({error:"فشل تعديل البنك"},500)}});c.get("/admin/banks/:id/delete",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM banks WHERE id = ?").bind(t).run(),e.redirect("/admin/banks")}catch{return e.html("<h1>خطأ في حذف البنك</h1>")}});c.get("/admin/banks",async e=>{try{const t=await e.env.DB.prepare("SELECT * FROM banks ORDER BY bank_name").all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>البنوك</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-university text-yellow-600 ml-2"></i>
                البنوك (<span id="totalCount">${t.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
                <a href="/admin/banks/add" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة بنك جديد
                </a>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    onkeyup="filterTable()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    onchange="filterTable()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="name">اسم البنك فقط</option>
                    <option value="code">كود البنك فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <table class="w-full" id="dataTable">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">#</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">اسم البنك</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الوصف</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الحالة</th>
                  <th class="px-6 py-4 text-center text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200" id="tableBody">
                ${t.results.map(a=>`
                  <tr class="hover:bg-gray-50" data-name="${a.bank_name||""}" data-code="${a.bank_code||""}">
                    <td class="px-6 py-4 text-sm text-gray-900">${a.id}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <i class="fas fa-university text-yellow-600 ml-2"></i>
                        <span class="text-sm font-bold text-gray-900">${a.bank_name}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${a.description||"لا يوجد"}</td>
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 rounded-full text-xs font-bold ${a.is_active?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}">
                        ${a.is_active?"نشط":"غير نشط"}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex justify-end gap-2">
                        <a href="/admin/banks/${a.id}" 
                           class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/banks/${a.id}/edit" 
                           class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-bold">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/banks/${a.id}/delete" 
                           onclick="return confirm('هل أنت متأكد من حذف هذا البنك؟')"
                           class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">
                          <i class="fas fa-trash"></i> حذف
                        </a>
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
        
        <script>
          // البحث والفلترة
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim()
            const filterField = document.getElementById('filterField').value
            const tableBody = document.getElementById('tableBody')
            const rows = tableBody.getElementsByTagName('tr')
            let visibleCount = 0
            
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i]
              const name = row.getAttribute('data-name') || ''
              const code = row.getAttribute('data-code') || ''
              
              let shouldShow = false
              
              if (searchInput === '') {
                shouldShow = true
              } else {
                switch(filterField) {
                  case 'name':
                    shouldShow = name.toLowerCase().includes(searchInput)
                    break
                  case 'code':
                    shouldShow = code.toLowerCase().includes(searchInput)
                    break
                  default: // 'all'
                    shouldShow = name.toLowerCase().includes(searchInput) || 
                                code.toLowerCase().includes(searchInput)
                }
              }
              
              row.style.display = shouldShow ? '' : 'none'
              if (shouldShow) visibleCount++
            }
            
            document.getElementById('totalCount').textContent = visibleCount
          }
          
          function resetFilters() {
            document.getElementById('searchInput').value = ''
            document.getElementById('filterField').value = 'all'
            filterTable()
          }
          
          function exportToCSV() {
            const data = [
              ['#', 'اسم البنك', 'الوصف', 'الحالة'],
              ${t.results.map(a=>`['${a.id}', '${a.bank_name}', '${a.description||""}', '${a.is_active?"نشط":"غير نشط"}']`).join(`,
              `)}
            ];
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'البنوك_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
        <\/script>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/rates",async e=>{try{const t=await e.env.DB.prepare(`
      SELECT fr.*, b.bank_name, ft.type_name
      FROM bank_financing_rates fr
      LEFT JOIN banks b ON fr.bank_id = b.id
      LEFT JOIN financing_types ft ON fr.financing_type_id = ft.id
      ORDER BY b.bank_name, ft.type_name
    `).all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>نسب التمويل</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-percentage text-orange-600 ml-2"></i>
                نسب التمويل (<span id="totalCount">${t.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
                <a href="/admin/rates/new" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة جديد
                </a>
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    onkeyup="filterTable()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    onchange="filterTable()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="bank">البنك فقط</option>
                    <option value="type">نوع التمويل فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <table class="w-full" id="dataTable">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">#</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">البنك</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">نوع التمويل</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">نسبة الفائدة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الحد الأدنى</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الحد الأقصى</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200" id="tableBody">
                ${t.results.map(a=>`
                  <tr class="hover:bg-gray-50" data-bank="${a.bank_name||""}" data-type="${a.type_name||""}">
                    <td class="px-6 py-4 text-sm text-gray-900">${a.id}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <i class="fas fa-university text-yellow-600 ml-2"></i>
                        <span class="text-sm font-bold text-gray-900">${a.bank_name||"غير محدد"}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${a.type_name||"غير محدد"}</td>
                    <td class="px-6 py-4">
                      <span class="text-lg font-bold text-orange-600">${a.rate||0}%</span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${a.min_amount?a.min_amount.toLocaleString():"0"} ريال</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${a.max_amount?a.max_amount.toLocaleString():"0"} ريال</td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2 justify-end">
                        <a href="/admin/rates/${a.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/rates/${a.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/rates/${a.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-trash"></i> حذف
                        </a>
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
        
        <script>
          // البحث والفلترة
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim()
            const filterField = document.getElementById('filterField').value
            const tableBody = document.getElementById('tableBody')
            const rows = tableBody.getElementsByTagName('tr')
            let visibleCount = 0
            
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i]
              const bank = row.getAttribute('data-bank') || ''
              const type = row.getAttribute('data-type') || ''
              
              let shouldShow = false
              
              if (searchInput === '') {
                shouldShow = true
              } else {
                switch(filterField) {
                  case 'bank':
                    shouldShow = bank.toLowerCase().includes(searchInput)
                    break
                  case 'type':
                    shouldShow = type.toLowerCase().includes(searchInput)
                    break
                  default: // 'all'
                    shouldShow = bank.toLowerCase().includes(searchInput) || 
                                type.toLowerCase().includes(searchInput)
                }
              }
              
              row.style.display = shouldShow ? '' : 'none'
              if (shouldShow) visibleCount++
            }
            
            document.getElementById('totalCount').textContent = visibleCount
          }
          
          function resetFilters() {
            document.getElementById('searchInput').value = ''
            document.getElementById('filterField').value = 'all'
            filterTable()
          }
          
          function exportToCSV() {
            const data = [
              ['#', 'البنك', 'نوع التمويل', 'نسبة الفائدة', 'الحد الأدنى', 'الحد الأقصى'],
              ${t.results.map(a=>`['${a.id}', '${a.bank_name||"غير محدد"}', '${a.type_name||"غير محدد"}', '${a.rate||0}%', '${a.min_amount||0}', '${a.max_amount||0}']`).join(`,
              `)}
            ];
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'نسب_التمويل_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
        <\/script>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/rates/new",async e=>{try{const t=await e.env.DB.prepare("SELECT id, bank_name FROM banks WHERE is_active = 1 ORDER BY bank_name").all(),a=await e.env.DB.prepare("SELECT id, type_name FROM financing_types ORDER BY type_name").all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إضافة نسبة تمويل جديدة</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/rates" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة نسب التمويل
            </a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
              <i class="fas fa-plus-circle text-orange-600 ml-2"></i>
              إضافة نسبة تمويل جديدة
            </h1>
            
            <form action="/api/rates" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- البنك -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-university text-yellow-600 ml-1"></i>
                    البنك *
                  </label>
                  <select name="bank_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="">-- اختر البنك --</option>
                    ${t.results.map(s=>`
                      <option value="${s.id}">${s.bank_name}</option>
                    `).join("")}
                  </select>
                </div>
                
                <!-- نوع التمويل -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-file-invoice text-purple-600 ml-1"></i>
                    نوع التمويل *
                  </label>
                  <select name="financing_type_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="">-- اختر نوع التمويل --</option>
                    ${a.results.map(s=>`
                      <option value="${s.id}">${s.type_name}</option>
                    `).join("")}
                  </select>
                </div>
                
                <!-- نسبة الفائدة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-percentage text-orange-600 ml-1"></i>
                    نسبة الفائدة (%) *
                  </label>
                  <input type="number" name="rate" required min="0" max="100" step="0.01" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                         placeholder="مثال: 4.5">
                </div>
                
                <!-- الحد الأدنى للمبلغ -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-arrow-down text-green-600 ml-1"></i>
                    الحد الأدنى للمبلغ (ريال)
                  </label>
                  <input type="number" name="min_amount" min="0" step="1000" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                         placeholder="مثال: 10000">
                </div>
                
                <!-- الحد الأقصى للمبلغ -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-arrow-up text-red-600 ml-1"></i>
                    الحد الأقصى للمبلغ (ريال)
                  </label>
                  <input type="number" name="max_amount" min="0" step="1000" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                         placeholder="مثال: 500000">
                </div>
                
                <!-- الحد الأدنى للمدة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-calendar text-blue-600 ml-1"></i>
                    الحد الأدنى للمدة (شهور)
                  </label>
                  <input type="number" name="min_duration" min="1" max="360" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                         placeholder="مثال: 12">
                </div>
                
                <!-- الحد الأقصى للمدة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-calendar-alt text-purple-600 ml-1"></i>
                    الحد الأقصى للمدة (شهور)
                  </label>
                  <input type="number" name="max_duration" min="1" max="360" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                         placeholder="مثال: 60">
                </div>
              </div>
              
              <div class="flex gap-4 pt-6 border-t">
                <button type="submit" class="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-bold transition-all">
                  <i class="fas fa-save ml-2"></i>
                  حفظ النسبة
                </button>
                <a href="/admin/rates" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold text-center transition-all">
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل الصفحة</h1>")}});c.get("/admin/rates/:id",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT fr.*, b.bank_name, ft.type_name
      FROM bank_financing_rates fr
      LEFT JOIN banks b ON fr.bank_id = b.id
      LEFT JOIN financing_types ft ON fr.financing_type_id = ft.id
      WHERE fr.id = ?
    `).bind(t).first();return a?e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض نسبة التمويل #${t}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6 flex justify-between items-center">
            <a href="/admin/rates" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة النسب
            </a>
            <div class="flex gap-2">
              <a href="/admin/rates/${t}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-edit ml-1"></i> تعديل
              </a>
              <a href="/admin/rates/${t}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-trash ml-1"></i> حذف
              </a>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <i class="fas fa-percentage text-orange-600 ml-3"></i>
              نسبة التمويل #${t}
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">البنك</label>
                <p class="text-lg text-gray-900">${a.bank_name||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">نوع التمويل</label>
                <p class="text-lg text-gray-900">${a.type_name||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">نسبة الفائدة</label>
                <p class="text-3xl font-bold text-orange-600">${a.rate||0}%</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحالة</label>
                <p>
                  <span class="px-4 py-2 rounded-full text-sm font-bold ${a.is_active?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}">
                    ${a.is_active?"نشط":"غير نشط"}
                  </span>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحد الأدنى للمبلغ</label>
                <p class="text-lg text-gray-900">${a.min_amount?a.min_amount.toLocaleString():"غير محدد"} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحد الأقصى للمبلغ</label>
                <p class="text-lg text-gray-900">${a.max_amount?a.max_amount.toLocaleString():"غير محدد"} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحد الأدنى للمدة</label>
                <p class="text-lg text-gray-900">${a.min_duration||"غير محدد"} شهر</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحد الأقصى للمدة</label>
                <p class="text-lg text-gray-900">${a.max_duration||"غير محدد"} شهر</p>
              </div>
              
              <div class="md:col-span-2 mt-4">
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الإنشاء</label>
                <p class="text-gray-900">${new Date(a.created_at).toLocaleString("ar-SA")}</p>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `):e.html("<h1>النسبة غير موجودة</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/subscriptions",async e=>{try{const t=await e.env.DB.prepare(`
      SELECT s.*, p.package_name, p.price
      FROM subscriptions s
      LEFT JOIN packages p ON s.package_id = p.id
      ORDER BY s.created_at DESC
    `).all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>الاشتراكات</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-id-card text-teal-600 ml-2"></i>
                الاشتراكات (<span id="totalCount">${t.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
                <a href="/admin/subscriptions/new" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة جديد
                </a>
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    onkeyup="filterTable()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    onchange="filterTable()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="company">الشركة فقط</option>
                    <option value="package">الباقة فقط</option>
                    <option value="status">الحالة فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <table class="w-full" id="dataTable">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">#</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">اسم الشركة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الباقة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">تاريخ البداية</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">تاريخ الانتهاء</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الحالة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الحسابات المستخدمة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200" id="tableBody">
                ${t.results.map(a=>{const s=a.status==="active"?"نشط":a.status==="expired"?"منتهي":"معلق";return`
                  <tr class="hover:bg-gray-50" 
                      data-company="${a.company_name||""}" 
                      data-package="${a.package_name||""}" 
                      data-status="${s}">
                    <td class="px-6 py-4 text-sm text-gray-900">${a.id}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <i class="fas fa-building text-teal-600 ml-2"></i>
                        <span class="text-sm font-bold text-gray-900">${a.company_name}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${a.package_name||"غير محدد"}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${a.start_date||"-"}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${a.end_date||"-"}</td>
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 rounded-full text-xs font-bold ${a.status==="active"?"bg-green-100 text-green-800":a.status==="expired"?"bg-red-100 text-red-800":"bg-yellow-100 text-yellow-800"}">
                        ${s}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${a.calculations_used||0}</td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2 justify-end">
                        <a href="/admin/subscriptions/${a.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/subscriptions/${a.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/subscriptions/${a.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-trash"></i> حذف
                        </a>
                      </div>
                    </td>
                  </tr>
                `}).join("")}
              </tbody>
            </table>
          </div>
        </div>
        
        <script>
          // البحث والفلترة
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim()
            const filterField = document.getElementById('filterField').value
            const tableBody = document.getElementById('tableBody')
            const rows = tableBody.getElementsByTagName('tr')
            let visibleCount = 0
            
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i]
              const company = row.getAttribute('data-company') || ''
              const package_name = row.getAttribute('data-package') || ''
              const status = row.getAttribute('data-status') || ''
              
              let shouldShow = false
              
              if (searchInput === '') {
                shouldShow = true
              } else {
                switch(filterField) {
                  case 'company':
                    shouldShow = company.toLowerCase().includes(searchInput)
                    break
                  case 'package':
                    shouldShow = package_name.toLowerCase().includes(searchInput)
                    break
                  case 'status':
                    shouldShow = status.toLowerCase().includes(searchInput)
                    break
                  default: // 'all'
                    shouldShow = company.toLowerCase().includes(searchInput) || 
                                package_name.toLowerCase().includes(searchInput) || 
                                status.toLowerCase().includes(searchInput)
                }
              }
              
              row.style.display = shouldShow ? '' : 'none'
              if (shouldShow) visibleCount++
            }
            
            document.getElementById('totalCount').textContent = visibleCount
          }
          
          function resetFilters() {
            document.getElementById('searchInput').value = ''
            document.getElementById('filterField').value = 'all'
            filterTable()
          }
          
          function exportToCSV() {
            const data = [
              ['#', 'اسم الشركة', 'الباقة', 'تاريخ البداية', 'تاريخ الانتهاء', 'الحالة', 'الحسابات المستخدمة'],
              ${t.results.map(a=>{const s=a.status==="active"?"نشط":a.status==="expired"?"منتهي":"معلق";return`['${a.id}', '${a.company_name}', '${a.package_name||"غير محدد"}', '${a.start_date||"-"}', '${a.end_date||"-"}', '${s}', '${a.calculations_used||0}']`}).join(`,
              `)}
            ];
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'الاشتراكات_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
        <\/script>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/subscriptions/new",async e=>{try{const t=await e.env.DB.prepare("SELECT id, package_name, price, duration_months FROM packages WHERE is_active = 1 ORDER BY price").all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إضافة اشتراك جديد</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/subscriptions" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة الاشتراكات
            </a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
              <i class="fas fa-plus-circle text-teal-600 ml-2"></i>
              إضافة اشتراك جديد
            </h1>
            
            <form action="/api/subscriptions" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- اسم الشركة -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-building text-teal-600 ml-1"></i>
                    اسم الشركة *
                  </label>
                  <input type="text" name="company_name" required 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                         placeholder="مثال: شركة التمويل السريع">
                </div>
                
                <!-- الباقة -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-box text-purple-600 ml-1"></i>
                    الباقة *
                  </label>
                  <select name="package_id" id="packageSelect" required onchange="updateDates()" 
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="">-- اختر الباقة --</option>
                    ${t.results.map(a=>`
                      <option value="${a.id}" data-duration="${a.duration_months}">
                        ${a.package_name} - ${a.price} ريال - ${a.duration_months} شهر
                      </option>
                    `).join("")}
                  </select>
                </div>
                
                <!-- تاريخ البداية -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-calendar-check text-green-600 ml-1"></i>
                    تاريخ البداية *
                  </label>
                  <input type="date" name="start_date" id="startDate" required onchange="updateEndDate()" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                </div>
                
                <!-- تاريخ الانتهاء -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-calendar-times text-red-600 ml-1"></i>
                    تاريخ الانتهاء *
                  </label>
                  <input type="date" name="end_date" id="endDate" required 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                         readonly>
                </div>
                
                <!-- الحالة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-flag text-blue-600 ml-1"></i>
                    الحالة *
                  </label>
                  <select name="status" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="active">نشط</option>
                    <option value="pending">معلق</option>
                    <option value="expired">منتهي</option>
                  </select>
                </div>
                
                <!-- عدد الحسابات المستخدمة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-calculator text-orange-600 ml-1"></i>
                    عدد الحسابات المستخدمة
                  </label>
                  <input type="number" name="calculations_used" min="0" value="0" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                </div>
              </div>
              
              <div class="flex gap-4 pt-6 border-t">
                <button type="submit" class="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-bold transition-all">
                  <i class="fas fa-save ml-2"></i>
                  حفظ الاشتراك
                </button>
                <a href="/admin/subscriptions" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold text-center transition-all">
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
        
        <script>
          // Set today as default start date
          document.getElementById('startDate').valueAsDate = new Date();
          
          function updateEndDate() {
            const packageSelect = document.getElementById('packageSelect');
            const startDate = document.getElementById('startDate').value;
            const endDateInput = document.getElementById('endDate');
            
            if (packageSelect.value && startDate) {
              const selectedOption = packageSelect.options[packageSelect.selectedIndex];
              const durationMonths = parseInt(selectedOption.dataset.duration);
              
              const start = new Date(startDate);
              const end = new Date(start);
              end.setMonth(end.getMonth() + durationMonths);
              
              endDateInput.value = end.toISOString().split('T')[0];
            }
          }
          
          function updateDates() {
            updateEndDate();
          }
          
          // Auto-update end date when package changes
          document.getElementById('packageSelect').addEventListener('change', updateDates);
        <\/script>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل الصفحة</h1>")}});c.get("/admin/subscriptions/:id",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT s.*, p.package_name, p.price
      FROM subscriptions s
      LEFT JOIN packages p ON s.package_id = p.id
      WHERE s.id = ?
    `).bind(t).first();return a?e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض الاشتراك #${t}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6 flex justify-between items-center">
            <a href="/admin/subscriptions" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة الاشتراكات
            </a>
            <div class="flex gap-2">
              <a href="/admin/subscriptions/${t}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-edit ml-1"></i> تعديل
              </a>
              <a href="/admin/subscriptions/${t}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-trash ml-1"></i> حذف
              </a>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <i class="fas fa-id-card text-teal-600 ml-3"></i>
              الاشتراك #${t}
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-bold text-gray-600 mb-1">اسم الشركة</label>
                <p class="text-2xl font-bold text-gray-900">${a.company_name}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الباقة</label>
                <p class="text-lg text-gray-900">${a.package_name||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">السعر</label>
                <p class="text-lg font-bold text-green-600">${a.price?a.price.toLocaleString():"0"} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ البداية</label>
                <p class="text-lg text-gray-900">${a.start_date||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الانتهاء</label>
                <p class="text-lg text-gray-900">${a.end_date||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحالة</label>
                <p>
                  <span class="px-4 py-2 rounded-full text-sm font-bold ${a.status==="active"?"bg-green-100 text-green-800":a.status==="expired"?"bg-red-100 text-red-800":"bg-yellow-100 text-yellow-800"}">
                    ${a.status==="active"?"نشط":a.status==="expired"?"منتهي":"معلق"}
                  </span>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحسابات المستخدمة</label>
                <p class="text-lg text-gray-900">${a.calculations_used||0}</p>
              </div>
              
              <div class="md:col-span-2 mt-4">
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الإنشاء</label>
                <p class="text-gray-900">${new Date(a.created_at).toLocaleString("ar-SA")}</p>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `):e.html("<h1>الاشتراك غير موجود</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/packages",async e=>{try{const t=await e.env.DB.prepare(`
      SELECT * FROM packages ORDER BY price
    `).all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>الباقات</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-box text-purple-600 ml-2"></i>
                الباقات (<span id="totalCount">${t.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
                <a href="/admin/packages/new" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة جديد
                </a>
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onkeyup="filterPackages()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onchange="filterPackages()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="name">اسم الباقة فقط</option>
                    <option value="price">السعر فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="packagesGrid">
            ${t.results.map(a=>`
              <div class="package-card bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-t-4 ${a.package_name.includes("الذهبية")?"border-yellow-500":a.package_name.includes("الاحترافية")?"border-purple-500":"border-blue-500"}" data-name="${a.package_name||""}" data-price="${a.price||0}">
                <div class="text-center mb-4">
                  <i class="fas fa-box text-5xl ${a.package_name.includes("الذهبية")?"text-yellow-500":a.package_name.includes("الاحترافية")?"text-purple-500":"text-blue-500"} mb-3"></i>
                  <h3 class="text-2xl font-bold text-gray-800">${a.package_name}</h3>
                  <p class="text-sm text-gray-600 mt-2">${a.description||""}</p>
                </div>
                
                <div class="border-t border-b border-gray-200 py-4 my-4">
                  <div class="text-center">
                    <span class="text-4xl font-bold text-gray-800">${a.price}</span>
                    <span class="text-gray-600"> ريال</span>
                    <p class="text-sm text-gray-500 mt-1">لمدة ${a.duration_months} شهر</p>
                  </div>
                </div>
                
                <div class="space-y-3 mb-4">
                  <div class="flex items-center text-sm">
                    <i class="fas fa-check-circle text-green-500 ml-2"></i>
                    <span><strong>${a.max_calculations}</strong> حساب</span>
                  </div>
                  <div class="flex items-center text-sm">
                    <i class="fas fa-users text-blue-500 ml-2"></i>
                    <span>حتى <strong>${a.max_users}</strong> مستخدمين</span>
                  </div>
                  <div class="flex items-center text-sm">
                    <i class="fas fa-${a.is_active?"check":"times"}-circle ${a.is_active?"text-green-500":"text-red-500"} ml-2"></i>
                    <span>${a.is_active?"نشط":"غير نشط"}</span>
                  </div>
                </div>
                
                <div class="pt-4 border-t border-gray-200 flex gap-2 justify-end">
                  <a href="/admin/packages/${a.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-all">
                    <i class="fas fa-eye"></i> عرض
                  </a>
                  <a href="/admin/packages/${a.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm transition-all">
                    <i class="fas fa-edit"></i> تعديل
                  </a>
                  <a href="/admin/packages/${a.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-all">
                    <i class="fas fa-trash"></i> حذف
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
        
        <script>
          // البحث والفلترة
          function filterPackages() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim()
            const filterField = document.getElementById('filterField').value
            const grid = document.getElementById('packagesGrid')
            const cards = grid.getElementsByClassName('package-card')
            let visibleCount = 0
            
            for (let i = 0; i < cards.length; i++) {
              const card = cards[i]
              const name = card.getAttribute('data-name') || ''
              const price = card.getAttribute('data-price') || ''
              
              let shouldShow = false
              
              if (searchInput === '') {
                shouldShow = true
              } else {
                switch(filterField) {
                  case 'name':
                    shouldShow = name.toLowerCase().includes(searchInput)
                    break
                  case 'price':
                    shouldShow = price.toLowerCase().includes(searchInput)
                    break
                  default: // 'all'
                    shouldShow = name.toLowerCase().includes(searchInput) || 
                                price.toLowerCase().includes(searchInput)
                }
              }
              
              card.style.display = shouldShow ? '' : 'none'
              if (shouldShow) visibleCount++
            }
            
            document.getElementById('totalCount').textContent = visibleCount
          }
          
          function resetFilters() {
            document.getElementById('searchInput').value = ''
            document.getElementById('filterField').value = 'all'
            filterPackages()
          }
          
          function exportToCSV() {
            const data = [
              ['#', 'اسم الباقة', 'الوصف', 'السعر', 'المدة (شهور)', 'الحسابات', 'المستخدمين', 'الحالة'],
              ${t.results.map(a=>`['${a.id}', '${a.package_name}', '${a.description||""}', '${a.price}', '${a.duration_months}', '${a.max_calculations}', '${a.max_users}', '${a.is_active?"نشط":"غير نشط"}']`).join(`,
              `)}
            ];
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'الباقات_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
        <\/script>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/packages/new",async e=>e.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>إضافة باقة جديدة</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <div class="max-w-4xl mx-auto p-6">
        <div class="mb-6">
          <a href="/admin/packages" class="text-blue-600 hover:text-blue-800">
            <i class="fas fa-arrow-right ml-2"></i>
            العودة لقائمة الباقات
          </a>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-6">
            <i class="fas fa-plus-circle text-pink-600 ml-2"></i>
            إضافة باقة جديدة
          </h1>
          
          <form action="/api/packages" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- اسم الباقة -->
              <div class="md:col-span-2">
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-box text-purple-600 ml-1"></i>
                  اسم الباقة *
                </label>
                <input type="text" name="package_name" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                       placeholder="مثال: الباقة الذهبية">
              </div>
              
              <!-- السعر -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-money-bill-wave text-green-600 ml-1"></i>
                  السعر (ريال) *
                </label>
                <input type="number" name="price" required min="0" step="0.01" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                       placeholder="مثال: 5000">
              </div>
              
              <!-- المدة بالأشهر -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calendar text-blue-600 ml-1"></i>
                  المدة (شهور) *
                </label>
                <select name="duration_months" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option value="">-- اختر المدة --</option>
                  <option value="1">شهر واحد</option>
                  <option value="3">3 أشهر</option>
                  <option value="6">6 أشهر</option>
                  <option value="12">سنة واحدة (12 شهر)</option>
                  <option value="24">سنتين (24 شهر)</option>
                  <option value="36">3 سنوات (36 شهر)</option>
                </select>
              </div>
              
              <!-- عدد الحسابات -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-calculator text-orange-600 ml-1"></i>
                  عدد الحسابات المسموحة *
                </label>
                <input type="number" name="max_calculations" required min="1" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                       placeholder="مثال: 1000">
              </div>
              
              <!-- عدد المستخدمين -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-users text-indigo-600 ml-1"></i>
                  عدد المستخدمين المسموح *
                </label>
                <input type="number" name="max_users" required min="1" 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                       placeholder="مثال: 5">
              </div>
              
              <!-- الحالة -->
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-toggle-on text-green-600 ml-1"></i>
                  الحالة *
                </label>
                <select name="is_active" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option value="1">نشط</option>
                  <option value="0">غير نشط</option>
                </select>
              </div>
              
              <!-- الوصف -->
              <div class="md:col-span-2">
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-align-right text-gray-600 ml-1"></i>
                  الوصف
                </label>
                <textarea name="description" rows="3" 
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="وصف مختصر للباقة..."></textarea>
              </div>
            </div>
            
            <div class="flex gap-4 pt-6 border-t">
              <button type="submit" class="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-bold transition-all">
                <i class="fas fa-save ml-2"></i>
                حفظ الباقة
              </button>
              <a href="/admin/packages" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold text-center transition-all">
                <i class="fas fa-times ml-2"></i>
                إلغاء
              </a>
            </div>
          </form>
        </div>
      </div>
    </body>
    </html>
  `));c.get("/admin/packages/:id",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare("SELECT * FROM packages WHERE id = ?").bind(t).first();return a?e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض الباقة #${t}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6 flex justify-between items-center">
            <a href="/admin/packages" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة الباقات
            </a>
            <div class="flex gap-2">
              <a href="/admin/packages/${t}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-edit ml-1"></i> تعديل
              </a>
              <a href="/admin/packages/${t}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-trash ml-1"></i> حذف
              </a>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8 border-t-4 ${a.package_name.includes("الذهبية")?"border-yellow-500":a.package_name.includes("الاحترافية")?"border-purple-500":"border-blue-500"}">
            <div class="text-center mb-8">
              <i class="fas fa-box text-6xl ${a.package_name.includes("الذهبية")?"text-yellow-500":a.package_name.includes("الاحترافية")?"text-purple-500":"text-blue-500"} mb-4"></i>
              <h1 class="text-4xl font-bold text-gray-800">${a.package_name}</h1>
              ${a.description?`<p class="text-gray-600 mt-2">${a.description}</p>`:""}
            </div>
            
            <div class="border-t border-b border-gray-200 py-6 my-6">
              <div class="text-center">
                <span class="text-5xl font-bold text-gray-800">${a.price}</span>
                <span class="text-2xl text-gray-600"> ريال</span>
                <p class="text-gray-500 mt-2">لمدة ${a.duration_months} شهر</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="flex items-center">
                <i class="fas fa-calculator text-orange-600 text-2xl ml-3"></i>
                <div>
                  <p class="text-sm text-gray-600">عدد الحسابات</p>
                  <p class="text-2xl font-bold text-gray-800">${a.max_calculations||"غير محدود"}</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <i class="fas fa-users text-blue-600 text-2xl ml-3"></i>
                <div>
                  <p class="text-sm text-gray-600">عدد المستخدمين</p>
                  <p class="text-2xl font-bold text-gray-800">${a.max_users||"غير محدود"}</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <i class="fas fa-${a.is_active?"check":"times"}-circle text-2xl ml-3 ${a.is_active?"text-green-600":"text-red-600"}"></i>
                <div>
                  <p class="text-sm text-gray-600">الحالة</p>
                  <p class="text-xl font-bold ${a.is_active?"text-green-600":"text-red-600"}">
                    ${a.is_active?"نشط":"غير نشط"}
                  </p>
                </div>
              </div>
              
              <div class="flex items-center">
                <i class="fas fa-calendar text-purple-600 text-2xl ml-3"></i>
                <div>
                  <p class="text-sm text-gray-600">تاريخ الإنشاء</p>
                  <p class="text-sm text-gray-800">${new Date(a.created_at).toLocaleDateString("ar-SA")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `):e.html("<h1>الباقة غير موجودة</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/users",async e=>{try{return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>المستخدمين</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto p-6">
          <div class="mb-6 flex items-center justify-between">
            <a href="/admin" class="text-blue-600 hover:text-blue-800">← العودة للوحة الرئيسية</a>
            <div class="flex items-center gap-3">
              <i class="fas fa-user-circle text-2xl text-gray-600"></i>
              <div class="text-right">
                <div class="text-sm font-bold text-gray-800" id="currentUserName">جاري التحميل...</div>
                <div class="text-xs text-gray-500" id="currentUserRole">-</div>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-3xl font-bold text-gray-800">
                <i class="fas fa-users text-indigo-600 ml-2"></i>
                المستخدمين (<span id="totalCount">0</span>)
              </h1>
              
              <div class="flex gap-3">
                <a href="/admin/users/new" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-plus ml-2"></i>
                  إضافة جديد
                </a>
                <button onclick="exportToCSV()" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-file-export ml-2"></i>
                  تصدير Excel
                </button>
              </div>
            </div>
            
            <!-- شريط البحث والفلترة -->
            <div class="border-t pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative">
                  <i class="fas fa-search absolute right-3 top-3.5 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="بحث في جميع الحقول..." 
                    class="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onkeyup="filterTable()"
                  >
                </div>
                
                <div>
                  <select 
                    id="filterField" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onchange="filterTable()"
                  >
                    <option value="all">البحث في: الكل</option>
                    <option value="username">اسم المستخدم فقط</option>
                    <option value="fullname">الاسم الكامل فقط</option>
                    <option value="email">البريد فقط</option>
                  </select>
                </div>
                
                <button 
                  onclick="resetFilters()" 
                  class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  <i class="fas fa-redo ml-2"></i>
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <table class="w-full" id="dataTable">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">#</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">اسم المستخدم</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الاسم الكامل</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">البريد الإلكتروني</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الدور</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الشركة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الحالة</th>
                  <th class="px-6 py-4 text-right text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200" id="tableBody">
                <tr>
                  <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-spinner fa-spin text-3xl mb-2"></i>
                    <div>جاري تحميل البيانات...</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <script>
          let allUsers = []; // تخزين جميع المستخدمين
          
          // تحميل بيانات المستخدم الحالي
          function loadCurrentUser() {
            const userData = localStorage.getItem('userData') || localStorage.getItem('user');
            if (userData) {
              const user = JSON.parse(userData);
              document.getElementById('currentUserName').textContent = user.full_name || user.username || 'مستخدم';
              document.getElementById('currentUserRole').textContent = user.role === 'company' ? 'مدير شركة' : (user.role === 'admin' ? 'مدير نظام' : 'مستخدم');
            }
          }
          
          // تحميل المستخدمين من API
          async function loadUsers() {
            try {
              const authToken = localStorage.getItem('authToken');
              if (!authToken) {
                console.error('⚠️ لا يوجد authToken - إعادة التوجيه لصفحة تسجيل الدخول');
                window.location.href = '/login';
                return;
              }
              
              console.log('🔄 جاري تحميل المستخدمين من API...');
              const response = await axios.get('/api/users', {
                headers: { 'Authorization': \`Bearer \${authToken}\` }
              });
              
              if (response.data.success) {
                allUsers = response.data.data;
                console.log(\`✅ تم تحميل \${allUsers.length} مستخدم\`);
                renderUsers(allUsers);
              } else {
                throw new Error(response.data.error || 'فشل تحميل المستخدمين');
              }
            } catch (error) {
              console.error('❌ خطأ في تحميل المستخدمين:', error);
              document.getElementById('tableBody').innerHTML = \`
                <tr>
                  <td colspan="8" class="px-6 py-8 text-center text-red-500">
                    <i class="fas fa-exclamation-triangle text-3xl mb-2"></i>
                    <div>فشل تحميل البيانات: \${error.message}</div>
                  </td>
                </tr>
              \`;
            }
          }
          
          // عرض المستخدمين في الجدول
          function renderUsers(users) {
            const tbody = document.getElementById('tableBody');
            
            if (!users || users.length === 0) {
              tbody.innerHTML = \`
                <tr>
                  <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-users text-3xl mb-2"></i>
                    <div>لا توجد بيانات مستخدمين</div>
                  </td>
                </tr>
              \`;
              document.getElementById('totalCount').textContent = '0';
              return;
            }
            
            tbody.innerHTML = users.map(user => {
              const roleClass = user.user_type === 'admin' ? 'bg-red-100 text-red-800' : 
                                user.user_type === 'company' ? 'bg-blue-100 text-blue-800' : 
                                'bg-gray-100 text-gray-800';
              const statusClass = user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
              const statusText = user.is_active ? 'نشط' : 'غير نشط';
              
              return \`
                <tr class="hover:bg-gray-50" 
                    data-username="\${user.username || ''}" 
                    data-fullname="\${user.full_name || ''}" 
                    data-email="\${user.email || ''}">
                  <td class="px-6 py-4 text-sm text-gray-900">\${user.id}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <i class="fas fa-user text-indigo-600 ml-2"></i>
                      <span class="text-sm font-bold text-gray-900">\${user.username}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">\${user.full_name || '-'}</td>
                  <td class="px-6 py-4 text-sm text-gray-600">\${user.email || '-'}</td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold \${roleClass}">
                      \${user.role_name || user.user_type || 'غير محدد'}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">\${user.company_name || '-'}</td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold \${statusClass}">
                      \${statusText}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2 justify-end">
                      <a href="/admin/users/\${user.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs transition-all">
                        <i class="fas fa-eye"></i> عرض
                      </a>
                      <a href="/admin/users/\${user.id}/permissions" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-xs transition-all" title="إدارة الصلاحيات">
                        <i class="fas fa-user-shield"></i> صلاحيات
                      </a>
                      <a href="/admin/users/\${user.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-xs transition-all">
                        <i class="fas fa-edit"></i> تعديل
                      </a>
                      <a href="/admin/users/\${user.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs transition-all">
                        <i class="fas fa-trash"></i> حذف
                      </a>
                    </div>
                  </td>
                </tr>
              \`;
            }).join('');
            
            document.getElementById('totalCount').textContent = users.length;
          }
          
          // البحث والفلترة
          function filterTable() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
            const filterField = document.getElementById('filterField').value;
            
            if (searchInput === '') {
              renderUsers(allUsers);
              return;
            }
            
            const filtered = allUsers.filter(user => {
              const username = (user.username || '').toLowerCase();
              const fullname = (user.full_name || '').toLowerCase();
              const email = (user.email || '').toLowerCase();
              
              switch(filterField) {
                case 'username':
                  return username.includes(searchInput);
                case 'fullname':
                  return fullname.includes(searchInput);
                case 'email':
                  return email.includes(searchInput);
                default:
                  return username.includes(searchInput) || 
                         fullname.includes(searchInput) || 
                         email.includes(searchInput);
              }
            });
            
            renderUsers(filtered);
          }
          
          function resetFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('filterField').value = 'all';
            renderUsers(allUsers);
          }
          
          function exportToCSV() {
            const data = [
              ['#', 'اسم المستخدم', 'الاسم الكامل', 'البريد الإلكتروني', 'الدور', 'الشركة', 'الحالة']
            ];
            
            allUsers.forEach(user => {
              data.push([
                user.id,
                user.username,
                user.full_name || '-',
                user.email || '-',
                user.role_name || user.user_type || 'غير محدد',
                user.company_name || '-',
                user.is_active ? 'نشط' : 'غير نشط'
              ]);
            });
            
            let csv = '\\uFEFF';
            data.forEach(row => {
              csv += row.join(',') + '\\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'المستخدمين_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
          }
          
          // تحميل البيانات عند تحميل الصفحة
          document.addEventListener('DOMContentLoaded', () => {
            loadCurrentUser();
            loadUsers();
          });
        <\/script>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/users/new",async e=>{try{const t=await e.env.DB.prepare("SELECT id, role_name FROM roles ORDER BY id").all(),a=await e.env.DB.prepare('SELECT id, company_name FROM subscriptions WHERE status = "active" ORDER BY company_name').all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إضافة مستخدم جديد</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <!-- Header مع زر تسجيل الخروج -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg mb-6">
          <div class="flex items-center justify-between px-6 py-4">
            <div class="flex items-center space-x-reverse space-x-4">
              <button onclick="doLogout()" class="p-2 hover:bg-red-500 rounded-lg transition-colors" title="تسجيل الخروج">
                <i class="fas fa-sign-out-alt"></i>
              </button>
            </div>
            <div class="flex items-center space-x-reverse space-x-3">
              <div class="text-right">
                <div class="font-bold" id="userDisplayName">مدير النظام</div>
                <div class="text-xs text-blue-200" id="userEmail">admin@tamweel.sa</div>
              </div>
              <i class="fas fa-user-circle text-3xl"></i>
            </div>
          </div>
        </div>
        
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6">
            <a href="/admin/users" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة المستخدمين
            </a>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">
              <i class="fas fa-plus-circle text-indigo-600 ml-2"></i>
              إضافة مستخدم جديد
            </h1>
            
            <form id="addUserForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- اسم المستخدم -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-user text-indigo-600 ml-1"></i>
                    اسم المستخدم *
                  </label>
                  <input type="text" name="username" required 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="مثال: ahmed123">
                </div>
                
                <!-- كلمة المرور -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-lock text-red-600 ml-1"></i>
                    كلمة المرور *
                  </label>
                  <input type="password" name="password" required minlength="6" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="••••••••">
                </div>
                
                <!-- الاسم الكامل -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-id-card text-blue-600 ml-1"></i>
                    الاسم الكامل *
                  </label>
                  <input type="text" name="full_name" required 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="مثال: أحمد محمد السعيد">
                </div>
                
                <!-- البريد الإلكتروني -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-envelope text-purple-600 ml-1"></i>
                    البريد الإلكتروني
                  </label>
                  <input type="email" name="email" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="مثال: ahmed@example.com">
                </div>
                
                <!-- رقم الجوال -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-phone text-green-600 ml-1"></i>
                    رقم الجوال
                  </label>
                  <input type="tel" name="phone" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                         placeholder="مثال: 0512345678">
                </div>
                
                <!-- نوع المستخدم -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-user-tag text-orange-600 ml-1"></i>
                    نوع المستخدم *
                  </label>
                  <select name="user_type" required id="userType" onchange="toggleSubscription()" 
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="">-- اختر نوع المستخدم --</option>
                    <option value="admin">مدير النظام</option>
                    <option value="company">شركة</option>
                    <option value="employee">موظف</option>
                  </select>
                </div>
                
                <!-- الدور -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-shield-alt text-red-600 ml-1"></i>
                    الدور *
                  </label>
                  <select name="role_id" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="">-- اختر الدور --</option>
                    ${t.results.map(s=>`
                      <option value="${s.id}">${s.role_name}</option>
                    `).join("")}
                  </select>
                </div>
                
                <!-- الاشتراك -->
                <div id="subscriptionDiv" class="md:col-span-2" style="display: none;">
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-building text-teal-600 ml-1"></i>
                    الاشتراك (للشركات فقط)
                  </label>
                  <select name="subscription_id" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="">-- اختر الاشتراك --</option>
                    ${a.results.map(s=>`
                      <option value="${s.id}">${s.company_name}</option>
                    `).join("")}
                  </select>
                </div>
                
                <!-- الحالة -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    <i class="fas fa-toggle-on text-green-600 ml-1"></i>
                    الحالة *
                  </label>
                  <select name="is_active" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="1">نشط</option>
                    <option value="0">غير نشط</option>
                  </select>
                </div>
              </div>
              
              <div class="flex gap-4 pt-6 border-t">
                <button type="submit" class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-bold transition-all">
                  <i class="fas fa-save ml-2"></i>
                  حفظ المستخدم
                </button>
                <a href="/admin/users" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-bold text-center transition-all">
                  <i class="fas fa-times ml-2"></i>
                  إلغاء
                </a>
              </div>
            </form>
          </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script>
          // دالة تسجيل الخروج
          function doLogout() {
            if (confirm('هل تريد تسجيل الخروج؟')) {
              console.log('🚪 تسجيل الخروج...');
              localStorage.removeItem('user');
              localStorage.removeItem('userData');
              localStorage.removeItem('authToken');
              localStorage.removeItem('token');
              console.log('✅ تم حذف بيانات المستخدم والتوكن');
              window.location.href = '/login';
            }
          }
          
          // تحميل بيانات المستخدم
          function loadUserData() {
            try {
              let userStr = localStorage.getItem('userData') || localStorage.getItem('user');
              if (userStr) {
                const user = JSON.parse(userStr);
                const displayNameEl = document.getElementById('userDisplayName');
                const emailEl = document.getElementById('userEmail');
                
                if (displayNameEl) {
                  let displayName = user.full_name || user.username || 'مستخدم';
                  if (user.tenant_name) {
                    displayName = 'مدير ' + user.tenant_name;
                  } else if (user.role === 'admin') {
                    displayName += ' (مدير النظام)';
                  }
                  displayNameEl.textContent = displayName;
                }
                
                if (emailEl && user.email) {
                  emailEl.textContent = user.email;
                }
              }
            } catch (error) {
              console.error('خطأ في تحميل بيانات المستخدم:', error);
            }
          }
          
          // تحميل البيانات عند تحميل الصفحة
          loadUserData();
          document.addEventListener('DOMContentLoaded', loadUserData);
          
          function toggleSubscription() {
            const userType = document.getElementById('userType').value;
            const subscriptionDiv = document.getElementById('subscriptionDiv');
            
            if (userType === 'company') {
              subscriptionDiv.style.display = 'block';
            } else {
              subscriptionDiv.style.display = 'none';
            }
          }
          
          // Handle form submission with token
          document.getElementById('addUserForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const token = localStorage.getItem('authToken');
            
            if (!token) {
              alert('لم يتم العثور على رمز التوثيق. الرجاء تسجيل الدخول مرة أخرى.');
              window.location.href = '/login';
              return;
            }
            
            console.log('📤 إرسال بيانات المستخدم...');
            
            try {
              const response = await axios.post('/api/users', formData, {
                headers: {
                  'Authorization': \`Bearer \${token}\`
                }
              });
              
              console.log('✅ تم إضافة المستخدم بنجاح:', response.data);
              alert('✓ تم إضافة المستخدم بنجاح!');
              
              // Redirect to users page on success
              window.location.href = '/admin/users';
            } catch (error) {
              console.error('❌ خطأ في إضافة المستخدم:', error);
              alert(error.response?.data?.error || 'حدث خطأ أثناء إضافة المستخدم');
            }
          });
        <\/script>
      </body>
      </html>
    `)}catch{return e.html("<h1>خطأ في تحميل الصفحة</h1>")}});c.get("/admin/users/:id",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT u.*, r.role_name, s.company_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN subscriptions s ON u.subscription_id = s.id
      WHERE u.id = ?
    `).bind(t).first();return a?e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض المستخدم #${t}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto p-6">
          <div class="mb-6 flex justify-between items-center">
            <a href="/admin/users" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة المستخدمين
            </a>
            <div class="flex gap-2">
              <a href="/admin/users/${t}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-edit ml-1"></i> تعديل
              </a>
              <a href="/admin/users/${t}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-trash ml-1"></i> حذف
              </a>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="flex items-center mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold ml-4">
                ${a.full_name?a.full_name.charAt(0).toUpperCase():"U"}
              </div>
              <div>
                <h1 class="text-3xl font-bold text-gray-800">${a.full_name||"غير محدد"}</h1>
                <p class="text-gray-600">@${a.username}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">اسم المستخدم</label>
                <p class="text-lg text-gray-900">${a.username}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الاسم الكامل</label>
                <p class="text-lg text-gray-900">${a.full_name||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">البريد الإلكتروني</label>
                <p class="text-lg text-gray-900">${a.email||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">رقم الجوال</label>
                <p class="text-lg text-gray-900">${a.phone||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الدور</label>
                <p class="text-lg text-gray-900">
                  <span class="px-3 py-1 rounded-full ${a.role_name==="مدير"?"bg-red-100 text-red-800":a.role_name==="محاسب"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}">
                    ${a.role_name||"-"}
                  </span>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الشركة</label>
                <p class="text-lg text-gray-900">${a.company_name||"غير مرتبط"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحالة</label>
                <p>
                  <span class="px-4 py-2 rounded-full text-sm font-bold ${a.is_active?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}">
                    ${a.is_active?"نشط":"غير نشط"}
                  </span>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الإنشاء</label>
                <p class="text-gray-900">${new Date(a.created_at).toLocaleString("ar-SA")}</p>
              </div>
              
              ${a.last_login?`
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-600 mb-1">آخر تسجيل دخول</label>
                  <p class="text-gray-900">${new Date(a.last_login).toLocaleString("ar-SA")}</p>
                </div>
              `:""}
            </div>
          </div>
        </div>
      </body>
      </html>
    `):e.html("<h1>المستخدم غير موجود</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/users/:id/permissions",async e=>{try{const t=e.req.param("id"),a=await e.env.DB.prepare(`
      SELECT u.*, r.role_name 
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?
    `).bind(t).first();if(!a)return e.html("<h1>المستخدم غير موجود</h1>");const s=await e.env.DB.prepare(`
      SELECT * FROM permissions ORDER BY category, id
    `).all(),l=(await e.env.DB.prepare(`
      SELECT p.id, p.permission_key
      FROM permissions p
      JOIN role_permissions rp ON p.id = rp.permission_id
      WHERE rp.role_id = ?
    `).bind(a.role_id).all()).results.map(n=>n.id),o={};s.results.forEach(n=>{o[n.category]||(o[n.category]=[]),o[n.category].push({...n,hasPermission:l.includes(n.id)})});const i={dashboard:"لوحة التحكم",customers:"العملاء",requests:"طلبات التمويل",banks:"البنوك",rates:"النسب التمويلية",packages:"الباقات",subscriptions:"الاشتراكات",users:"المستخدمين",calculator:"الحاسبة",reports:"التقارير"};return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إدارة صلاحيات ${a.full_name}</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-50">
        <div class="container mx-auto px-4 py-8">
          <!-- العنوان -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">
                  <i class="fas fa-user-shield text-indigo-600 ml-2"></i>
                  إدارة صلاحيات المستخدم
                </h1>
                <div class="flex items-center gap-4 text-gray-600">
                  <span><i class="fas fa-user ml-1"></i> ${a.full_name}</span>
                  <span><i class="fas fa-envelope ml-1"></i> ${a.email}</span>
                  <span><i class="fas fa-shield-alt ml-1"></i> ${a.role_name}</span>
                </div>
              </div>
              <a href="/admin/users" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                <i class="fas fa-arrow-right ml-2"></i>
                رجوع للمستخدمين
              </a>
            </div>
          </div>

          <!-- نموذج الصلاحيات -->
          <form id="permissionsForm" class="space-y-6">
            <input type="hidden" name="user_id" value="${t}">
            <input type="hidden" name="role_id" value="${a.role_id}">
            
            ${Object.keys(o).map(n=>`
              <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-indigo-600 pb-2">
                  <i class="fas fa-folder text-indigo-600 ml-2"></i>
                  ${i[n]||n}
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  ${o[n].map(d=>`
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                      <input 
                        type="checkbox" 
                        id="perm_${d.id}" 
                        name="permissions[]" 
                        value="${d.id}"
                        ${d.hasPermission?"checked":""}
                        class="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      >
                      <label for="perm_${d.id}" class="mr-3 flex-1 cursor-pointer">
                        <div class="font-semibold text-gray-800">${d.permission_name}</div>
                        ${d.description?`<div class="text-xs text-gray-500">${d.description}</div>`:""}
                      </label>
                    </div>
                  `).join("")}
                </div>
              </div>
            `).join("")}
            
            <!-- أزرار الحفظ -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="flex gap-4 justify-end">
                <button type="button" onclick="selectAll()" class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-check-double ml-2"></i>
                  تحديد الكل
                </button>
                <button type="button" onclick="deselectAll()" class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-times-circle ml-2"></i>
                  إلغاء تحديد الكل
                </button>
                <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-save ml-2"></i>
                  حفظ الصلاحيات
                </button>
              </div>
            </div>
          </form>
        </div>

        <script>
          function selectAll() {
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = true)
          }
          
          function deselectAll() {
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false)
          }
          
          document.getElementById('permissionsForm').addEventListener('submit', async (e) => {
            e.preventDefault()
            
            const formData = new FormData(e.target)
            const userId = formData.get('user_id')
            const roleId = formData.get('role_id')
            const permissions = formData.getAll('permissions[]')
            
            try {
              const response = await fetch(\`/api/users/\${userId}/permissions\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role_id: roleId, permission_ids: permissions })
              })
              
              const result = await response.json()
              
              if (result.success) {
                alert('✅ تم حفظ الصلاحيات بنجاح!')
                window.location.href = '/admin/users'
              } else {
                alert('❌ خطأ: ' + result.error)
              }
            } catch (error) {
              alert('❌ حدث خطأ أثناء الحفظ')
              console.error(error)
            }
          })
        <\/script>
      </body>
      </html>
    `)}catch(t){return e.html("<h1>خطأ في تحميل البيانات: "+t.message+"</h1>")}});c.post("/api/users/:id/permissions",async e=>{try{const t=e.req.param("id"),{role_id:a,permission_ids:s}=await e.req.json();if(await e.env.DB.prepare(`
      DELETE FROM role_permissions WHERE role_id = ?
    `).bind(a).run(),s&&s.length>0)for(const r of s)await e.env.DB.prepare(`
          INSERT OR IGNORE INTO role_permissions (role_id, permission_id)
          VALUES (?, ?)
        `).bind(a,r).run();return e.json({success:!0,message:"تم تحديث الصلاحيات بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});const W=new le,gt=Object.assign({"/src/index.tsx":c});let ce=!1;for(const[,e]of Object.entries(gt))e&&(W.all("*",t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),W.notFound(t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),ce=!0);if(!ce)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{W as default};
