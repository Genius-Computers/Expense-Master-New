var ht=Object.defineProperty;var Ae=e=>{throw TypeError(e)};var yt=(e,t,s)=>t in e?ht(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var f=(e,t,s)=>yt(e,typeof t!="symbol"?t+"":t,s),qe=(e,t,s)=>t.has(e)||Ae("Cannot "+s);var p=(e,t,s)=>(qe(e,t,"read from private field"),s?s.call(e):t.get(e)),h=(e,t,s)=>t.has(e)?Ae("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),b=(e,t,s,a)=>(qe(e,t,"write to private field"),a?a.call(e,s):t.set(e,s),s),w=(e,t,s)=>(qe(e,t,"access private method"),s);var Ne=(e,t,s,a)=>({set _(r){b(e,t,r,s)},get _(){return p(e,t,a)}});var Pe=(e,t,s)=>(a,r)=>{let l=-1;return i(0);async function i(o){if(o<=l)throw new Error("next() called multiple times");l=o;let n,d=!1,u;if(e[o]?(u=e[o][0][0],a.req.routeIndex=o):u=o===e.length&&r||void 0,u)try{n=await u(a,()=>i(o+1))}catch(m){if(m instanceof Error&&t)a.error=m,n=await t(m,a),d=!0;else throw m}else a.finalized===!1&&s&&(n=await s(a));return n&&(a.finalized===!1||d)&&(a.res=n),a}},vt=Symbol(),wt=async(e,t=Object.create(null))=>{const{all:s=!1,dot:a=!1}=t,l=(e instanceof st?e.raw.headers:e.headers).get("Content-Type");return l!=null&&l.startsWith("multipart/form-data")||l!=null&&l.startsWith("application/x-www-form-urlencoded")?_t(e,{all:s,dot:a}):{}};async function _t(e,t){const s=await e.formData();return s?kt(s,t):{}}function kt(e,t){const s=Object.create(null);return e.forEach((a,r)=>{t.all||r.endsWith("[]")?Et(s,r,a):s[r]=a}),t.dot&&Object.entries(s).forEach(([a,r])=>{a.includes(".")&&(St(s,a,r),delete s[a])}),s}var Et=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},St=(e,t,s)=>{let a=e;const r=t.split(".");r.forEach((l,i)=>{i===r.length-1?a[l]=s:((!a[l]||typeof a[l]!="object"||Array.isArray(a[l])||a[l]instanceof File)&&(a[l]=Object.create(null)),a=a[l])})},Ke=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},$t=e=>{const{groups:t,path:s}=It(e),a=Ke(s);return Tt(a,t)},It=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,a)=>{const r=`@${a}`;return t.push([r,s]),r}),{groups:t,path:e}},Tt=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[a]=t[s];for(let r=e.length-1;r>=0;r--)if(e[r].includes(a)){e[r]=e[r].replace(a,t[s][1]);break}}return e},Se={},Bt=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const a=`${e}#${t}`;return Se[a]||(s[2]?Se[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:Se[a]=[e,s[1],!0]),Se[a]}return null},Fe=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},Dt=e=>Fe(e,decodeURI),Xe=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let a=s;for(;a<t.length;a++){const r=t.charCodeAt(a);if(r===37){const l=t.indexOf("?",a),i=t.slice(s,l===-1?void 0:l);return Dt(i.includes("%25")?i.replace(/%25/g,"%2525"):i)}else if(r===63)break}return t.slice(s,a)},Rt=e=>{const t=Xe(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},le=(e,t,...s)=>(s.length&&(t=le(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Ze=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let a="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))a+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){s.length===0&&a===""?s.push("/"):s.push(a);const l=r.replace("?","");a+="/"+l,s.push(a)}else a+="/"+r}),s.filter((r,l,i)=>i.indexOf(r)===l)},Le=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Fe(e,tt):e):e,et=(e,t,s)=>{let a;if(!s&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const o=e.charCodeAt(i+t.length+1);if(o===61){const n=i+t.length+2,d=e.indexOf("&",n);return Le(e.slice(n,d===-1?void 0:d))}else if(o==38||isNaN(o))return"";i=e.indexOf(`&${t}`,i+1)}if(a=/[%+]/.test(e),!a)return}const r={};a??(a=/[%+]/.test(e));let l=e.indexOf("?",8);for(;l!==-1;){const i=e.indexOf("&",l+1);let o=e.indexOf("=",l);o>i&&i!==-1&&(o=-1);let n=e.slice(l+1,o===-1?i===-1?void 0:i:o);if(a&&(n=Le(n)),l=i,n==="")continue;let d;o===-1?d="":(d=e.slice(o+1,i===-1?void 0:i),a&&(d=Le(d))),s?(r[n]&&Array.isArray(r[n])||(r[n]=[]),r[n].push(d)):r[n]??(r[n]=d)}return t?r[t]:r},Ct=et,qt=(e,t)=>et(e,t,!0),tt=decodeURIComponent,Ue=e=>Fe(e,tt),oe,C,U,at,rt,Oe,W,Ye,st=(Ye=class{constructor(e,t="/",s=[[]]){h(this,U);f(this,"raw");h(this,oe);h(this,C);f(this,"routeIndex",0);f(this,"path");f(this,"bodyCache",{});h(this,W,e=>{const{bodyCache:t,raw:s}=this,a=t[e];if(a)return a;const r=Object.keys(t)[0];return r?t[r].then(l=>(r==="json"&&(l=JSON.stringify(l)),new Response(l)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,b(this,C,s),b(this,oe,{})}param(e){return e?w(this,U,at).call(this,e):w(this,U,rt).call(this)}query(e){return Ct(this.url,e)}queries(e){return qt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,a)=>{t[a]=s}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await wt(this,e))}json(){return p(this,W).call(this,"text").then(e=>JSON.parse(e))}text(){return p(this,W).call(this,"text")}arrayBuffer(){return p(this,W).call(this,"arrayBuffer")}blob(){return p(this,W).call(this,"blob")}formData(){return p(this,W).call(this,"formData")}addValidatedData(e,t){p(this,oe)[e]=t}valid(e){return p(this,oe)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[vt](){return p(this,C)}get matchedRoutes(){return p(this,C)[0].map(([[,e]])=>e)}get routePath(){return p(this,C)[0].map(([[,e]])=>e)[this.routeIndex].path}},oe=new WeakMap,C=new WeakMap,U=new WeakSet,at=function(e){const t=p(this,C)[0][this.routeIndex][1][e],s=w(this,U,Oe).call(this,t);return s&&/\%/.test(s)?Ue(s):s},rt=function(){const e={},t=Object.keys(p(this,C)[0][this.routeIndex][1]);for(const s of t){const a=w(this,U,Oe).call(this,p(this,C)[0][this.routeIndex][1][s]);a!==void 0&&(e[s]=/\%/.test(a)?Ue(a):a)}return e},Oe=function(e){return p(this,C)[1]?p(this,C)[1][e]:e},W=new WeakMap,Ye),Lt={Stringify:1},lt=async(e,t,s,a,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const l=e.callbacks;return l!=null&&l.length?(r?r[0]+=e:r=[e],Promise.all(l.map(o=>o({phase:t,buffer:r,context:a}))).then(o=>Promise.all(o.filter(Boolean).map(n=>lt(n,t,!1,a,r))).then(()=>r[0]))):Promise.resolve(e)},jt="text/plain; charset=UTF-8",je=(e,t)=>({"Content-Type":e,...t}),ye,ve,M,de,A,B,we,ce,pe,X,_e,ke,Y,ie,ze,Ot=(ze=class{constructor(e,t){h(this,Y);h(this,ye);h(this,ve);f(this,"env",{});h(this,M);f(this,"finalized",!1);f(this,"error");h(this,de);h(this,A);h(this,B);h(this,we);h(this,ce);h(this,pe);h(this,X);h(this,_e);h(this,ke);f(this,"render",(...e)=>(p(this,ce)??b(this,ce,t=>this.html(t)),p(this,ce).call(this,...e)));f(this,"setLayout",e=>b(this,we,e));f(this,"getLayout",()=>p(this,we));f(this,"setRenderer",e=>{b(this,ce,e)});f(this,"header",(e,t,s)=>{this.finalized&&b(this,B,new Response(p(this,B).body,p(this,B)));const a=p(this,B)?p(this,B).headers:p(this,X)??b(this,X,new Headers);t===void 0?a.delete(e):s!=null&&s.append?a.append(e,t):a.set(e,t)});f(this,"status",e=>{b(this,de,e)});f(this,"set",(e,t)=>{p(this,M)??b(this,M,new Map),p(this,M).set(e,t)});f(this,"get",e=>p(this,M)?p(this,M).get(e):void 0);f(this,"newResponse",(...e)=>w(this,Y,ie).call(this,...e));f(this,"body",(e,t,s)=>w(this,Y,ie).call(this,e,t,s));f(this,"text",(e,t,s)=>!p(this,X)&&!p(this,de)&&!t&&!s&&!this.finalized?new Response(e):w(this,Y,ie).call(this,e,t,je(jt,s)));f(this,"json",(e,t,s)=>w(this,Y,ie).call(this,JSON.stringify(e),t,je("application/json",s)));f(this,"html",(e,t,s)=>{const a=r=>w(this,Y,ie).call(this,r,t,je("text/html; charset=UTF-8",s));return typeof e=="object"?lt(e,Lt.Stringify,!1,{}).then(a):a(e)});f(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});f(this,"notFound",()=>(p(this,pe)??b(this,pe,()=>new Response),p(this,pe).call(this,this)));b(this,ye,e),t&&(b(this,A,t.executionCtx),this.env=t.env,b(this,pe,t.notFoundHandler),b(this,ke,t.path),b(this,_e,t.matchResult))}get req(){return p(this,ve)??b(this,ve,new st(p(this,ye),p(this,ke),p(this,_e))),p(this,ve)}get event(){if(p(this,A)&&"respondWith"in p(this,A))return p(this,A);throw Error("This context has no FetchEvent")}get executionCtx(){if(p(this,A))return p(this,A);throw Error("This context has no ExecutionContext")}get res(){return p(this,B)||b(this,B,new Response(null,{headers:p(this,X)??b(this,X,new Headers)}))}set res(e){if(p(this,B)&&e){e=new Response(e.body,e);for(const[t,s]of p(this,B).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=p(this,B).headers.getSetCookie();e.headers.delete("set-cookie");for(const r of a)e.headers.append("set-cookie",r)}else e.headers.set(t,s)}b(this,B,e),this.finalized=!0}get var(){return p(this,M)?Object.fromEntries(p(this,M)):{}}},ye=new WeakMap,ve=new WeakMap,M=new WeakMap,de=new WeakMap,A=new WeakMap,B=new WeakMap,we=new WeakMap,ce=new WeakMap,pe=new WeakMap,X=new WeakMap,_e=new WeakMap,ke=new WeakMap,Y=new WeakSet,ie=function(e,t,s){const a=p(this,B)?new Headers(p(this,B).headers):p(this,X)??new Headers;if(typeof t=="object"&&"headers"in t){const l=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,o]of l)i.toLowerCase()==="set-cookie"?a.append(i,o):a.set(i,o)}if(s)for(const[l,i]of Object.entries(s))if(typeof i=="string")a.set(l,i);else{a.delete(l);for(const o of i)a.append(l,o)}const r=typeof t=="number"?t:(t==null?void 0:t.status)??p(this,de);return new Response(e,{status:r,headers:a})},ze),E="ALL",Ft="all",Mt=["get","post","put","delete","options","patch"],it="Can not add a route since the matcher is already built.",nt=class extends Error{},At="__COMPOSED_HANDLER",Nt=e=>e.text("404 Not Found",404),He=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},q,S,ot,L,Q,$e,Ie,ue,Pt=(ue=class{constructor(t={}){h(this,S);f(this,"get");f(this,"post");f(this,"put");f(this,"delete");f(this,"options");f(this,"patch");f(this,"all");f(this,"on");f(this,"use");f(this,"router");f(this,"getPath");f(this,"_basePath","/");h(this,q,"/");f(this,"routes",[]);h(this,L,Nt);f(this,"errorHandler",He);f(this,"onError",t=>(this.errorHandler=t,this));f(this,"notFound",t=>(b(this,L,t),this));f(this,"fetch",(t,...s)=>w(this,S,Ie).call(this,t,s[1],s[0],t.method));f(this,"request",(t,s,a,r)=>t instanceof Request?this.fetch(s?new Request(t,s):t,a,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${le("/",t)}`,s),a,r)));f(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(w(this,S,Ie).call(this,t.request,t,void 0,t.request.method))})});[...Mt,Ft].forEach(l=>{this[l]=(i,...o)=>(typeof i=="string"?b(this,q,i):w(this,S,Q).call(this,l,p(this,q),i),o.forEach(n=>{w(this,S,Q).call(this,l,p(this,q),n)}),this)}),this.on=(l,i,...o)=>{for(const n of[i].flat()){b(this,q,n);for(const d of[l].flat())o.map(u=>{w(this,S,Q).call(this,d.toUpperCase(),p(this,q),u)})}return this},this.use=(l,...i)=>(typeof l=="string"?b(this,q,l):(b(this,q,"*"),i.unshift(l)),i.forEach(o=>{w(this,S,Q).call(this,E,p(this,q),o)}),this);const{strict:a,...r}=t;Object.assign(this,r),this.getPath=a??!0?t.getPath??Xe:Rt}route(t,s){const a=this.basePath(t);return s.routes.map(r=>{var i;let l;s.errorHandler===He?l=r.handler:(l=async(o,n)=>(await Pe([],s.errorHandler)(o,()=>r.handler(o,n))).res,l[At]=r.handler),w(i=a,S,Q).call(i,r.method,r.path,l)}),this}basePath(t){const s=w(this,S,ot).call(this);return s._basePath=le(this._basePath,t),s}mount(t,s,a){let r,l;a&&(typeof a=="function"?l=a:(l=a.optionHandler,a.replaceRequest===!1?r=n=>n:r=a.replaceRequest));const i=l?n=>{const d=l(n);return Array.isArray(d)?d:[d]}:n=>{let d;try{d=n.executionCtx}catch{}return[n.env,d]};r||(r=(()=>{const n=le(this._basePath,t),d=n==="/"?0:n.length;return u=>{const m=new URL(u.url);return m.pathname=m.pathname.slice(d)||"/",new Request(m,u)}})());const o=async(n,d)=>{const u=await s(r(n.req.raw),...i(n));if(u)return u;await d()};return w(this,S,Q).call(this,E,le(t,"*"),o),this}},q=new WeakMap,S=new WeakSet,ot=function(){const t=new ue({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,b(t,L,p(this,L)),t.routes=this.routes,t},L=new WeakMap,Q=function(t,s,a){t=t.toUpperCase(),s=le(this._basePath,s);const r={basePath:this._basePath,path:s,method:t,handler:a};this.router.add(t,s,[a,r]),this.routes.push(r)},$e=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},Ie=function(t,s,a,r){if(r==="HEAD")return(async()=>new Response(null,await w(this,S,Ie).call(this,t,s,a,"GET")))();const l=this.getPath(t,{env:a}),i=this.router.match(r,l),o=new Ot(t,{path:l,matchResult:i,env:a,executionCtx:s,notFoundHandler:p(this,L)});if(i[0].length===1){let d;try{d=i[0][0][0][0](o,async()=>{o.res=await p(this,L).call(this,o)})}catch(u){return w(this,S,$e).call(this,u,o)}return d instanceof Promise?d.then(u=>u||(o.finalized?o.res:p(this,L).call(this,o))).catch(u=>w(this,S,$e).call(this,u,o)):d??p(this,L).call(this,o)}const n=Pe(i[0],this.errorHandler,p(this,L));return(async()=>{try{const d=await n(o);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return w(this,S,$e).call(this,d,o)}})()},ue),dt=[];function Ut(e,t){const s=this.buildAllMatchers(),a=((r,l)=>{const i=s[r]||s[E],o=i[2][l];if(o)return o;const n=l.match(i[0]);if(!n)return[[],dt];const d=n.indexOf("",1);return[i[1][d],n]});return this.match=a,a(e,t)}var Be="[^/]+",xe=".*",he="(?:|/.*)",ne=Symbol(),Ht=new Set(".\\+*[^]$()");function Wt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===xe||e===he?1:t===xe||t===he?-1:e===Be?1:t===Be?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Z,ee,j,ae,Yt=(ae=class{constructor(){h(this,Z);h(this,ee);h(this,j,Object.create(null))}insert(t,s,a,r,l){if(t.length===0){if(p(this,Z)!==void 0)throw ne;if(l)return;b(this,Z,s);return}const[i,...o]=t,n=i==="*"?o.length===0?["","",xe]:["","",Be]:i==="/*"?["","",he]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(n){const u=n[1];let m=n[2]||Be;if(u&&n[2]&&(m===".*"||(m=m.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(m))))throw ne;if(d=p(this,j)[m],!d){if(Object.keys(p(this,j)).some(g=>g!==xe&&g!==he))throw ne;if(l)return;d=p(this,j)[m]=new ae,u!==""&&b(d,ee,r.varIndex++)}!l&&u!==""&&a.push([u,p(d,ee)])}else if(d=p(this,j)[i],!d){if(Object.keys(p(this,j)).some(u=>u.length>1&&u!==xe&&u!==he))throw ne;if(l)return;d=p(this,j)[i]=new ae}d.insert(o,s,a,r,l)}buildRegExpStr(){const s=Object.keys(p(this,j)).sort(Wt).map(a=>{const r=p(this,j)[a];return(typeof p(r,ee)=="number"?`(${a})@${p(r,ee)}`:Ht.has(a)?`\\${a}`:a)+r.buildRegExpStr()});return typeof p(this,Z)=="number"&&s.unshift(`#${p(this,Z)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},Z=new WeakMap,ee=new WeakMap,j=new WeakMap,ae),De,Ee,Je,zt=(Je=class{constructor(){h(this,De,{varIndex:0});h(this,Ee,new Yt)}insert(e,t,s){const a=[],r=[];for(let i=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,n=>{const d=`@\\${i}`;return r[i]=[d,n],i++,o=!0,d}),!o)break}const l=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=r.length-1;i>=0;i--){const[o]=r[i];for(let n=l.length-1;n>=0;n--)if(l[n].indexOf(o)!==-1){l[n]=l[n].replace(o,r[i][1]);break}}return p(this,Ee).insert(l,t,a,p(this,De),s),a}buildRegExp(){let e=p(this,Ee).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,l,i)=>l!==void 0?(s[++t]=Number(l),"$()"):(i!==void 0&&(a[Number(i)]=++t),"")),[new RegExp(`^${e}`),s,a]}},De=new WeakMap,Ee=new WeakMap,Je),Jt=[/^$/,[],Object.create(null)],Te=Object.create(null);function ct(e){return Te[e]??(Te[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Vt(){Te=Object.create(null)}function Gt(e){var d;const t=new zt,s=[];if(e.length===0)return Jt;const a=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,m],[g,x])=>u?1:g?-1:m.length-x.length),r=Object.create(null);for(let u=0,m=-1,g=a.length;u<g;u++){const[x,y,_]=a[u];x?r[y]=[_.map(([k])=>[k,Object.create(null)]),dt]:m++;let v;try{v=t.insert(y,m,x)}catch(k){throw k===ne?new nt(y):k}x||(s[m]=_.map(([k,D])=>{const R=Object.create(null);for(D-=1;D>=0;D--){const[O,T]=v[D];R[O]=T}return[k,R]}))}const[l,i,o]=t.buildRegExp();for(let u=0,m=s.length;u<m;u++)for(let g=0,x=s[u].length;g<x;g++){const y=(d=s[u][g])==null?void 0:d[1];if(!y)continue;const _=Object.keys(y);for(let v=0,k=_.length;v<k;v++)y[_[v]]=o[y[_[v]]]}const n=[];for(const u in i)n[u]=s[i[u]];return[l,n,r]}function re(e,t){if(e){for(const s of Object.keys(e).sort((a,r)=>r.length-a.length))if(ct(s).test(t))return[...e[s]]}}var z,J,Re,pt,Ve,Qt=(Ve=class{constructor(){h(this,Re);f(this,"name","RegExpRouter");h(this,z);h(this,J);f(this,"match",Ut);b(this,z,{[E]:Object.create(null)}),b(this,J,{[E]:Object.create(null)})}add(e,t,s){var o;const a=p(this,z),r=p(this,J);if(!a||!r)throw new Error(it);a[e]||[a,r].forEach(n=>{n[e]=Object.create(null),Object.keys(n[E]).forEach(d=>{n[e][d]=[...n[E][d]]})}),t==="/*"&&(t="*");const l=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const n=ct(t);e===E?Object.keys(a).forEach(d=>{var u;(u=a[d])[t]||(u[t]=re(a[d],t)||re(a[E],t)||[])}):(o=a[e])[t]||(o[t]=re(a[e],t)||re(a[E],t)||[]),Object.keys(a).forEach(d=>{(e===E||e===d)&&Object.keys(a[d]).forEach(u=>{n.test(u)&&a[d][u].push([s,l])})}),Object.keys(r).forEach(d=>{(e===E||e===d)&&Object.keys(r[d]).forEach(u=>n.test(u)&&r[d][u].push([s,l]))});return}const i=Ze(t)||[t];for(let n=0,d=i.length;n<d;n++){const u=i[n];Object.keys(r).forEach(m=>{var g;(e===E||e===m)&&((g=r[m])[u]||(g[u]=[...re(a[m],u)||re(a[E],u)||[]]),r[m][u].push([s,l-d+n+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(p(this,J)).concat(Object.keys(p(this,z))).forEach(t=>{e[t]||(e[t]=w(this,Re,pt).call(this,t))}),b(this,z,b(this,J,void 0)),Vt(),e}},z=new WeakMap,J=new WeakMap,Re=new WeakSet,pt=function(e){const t=[];let s=e===E;return[p(this,z),p(this,J)].forEach(a=>{const r=a[e]?Object.keys(a[e]).map(l=>[l,a[e][l]]):[];r.length!==0?(s||(s=!0),t.push(...r)):e!==E&&t.push(...Object.keys(a[E]).map(l=>[l,a[E][l]]))}),s?Gt(t):null},Ve),V,N,Ge,Kt=(Ge=class{constructor(e){f(this,"name","SmartRouter");h(this,V,[]);h(this,N,[]);b(this,V,e.routers)}add(e,t,s){if(!p(this,N))throw new Error(it);p(this,N).push([e,t,s])}match(e,t){if(!p(this,N))throw new Error("Fatal error");const s=p(this,V),a=p(this,N),r=s.length;let l=0,i;for(;l<r;l++){const o=s[l];try{for(let n=0,d=a.length;n<d;n++)o.add(...a[n]);i=o.match(e,t)}catch(n){if(n instanceof nt)continue;throw n}this.match=o.match.bind(o),b(this,V,[o]),b(this,N,void 0);break}if(l===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(p(this,N)||p(this,V).length!==1)throw new Error("No active router has been determined yet.");return p(this,V)[0]}},V=new WeakMap,N=new WeakMap,Ge),fe=Object.create(null),G,I,te,me,$,P,K,ge,Xt=(ge=class{constructor(t,s,a){h(this,P);h(this,G);h(this,I);h(this,te);h(this,me,0);h(this,$,fe);if(b(this,I,a||Object.create(null)),b(this,G,[]),t&&s){const r=Object.create(null);r[t]={handler:s,possibleKeys:[],score:0},b(this,G,[r])}b(this,te,[])}insert(t,s,a){b(this,me,++Ne(this,me)._);let r=this;const l=$t(s),i=[];for(let o=0,n=l.length;o<n;o++){const d=l[o],u=l[o+1],m=Bt(d,u),g=Array.isArray(m)?m[0]:d;if(g in p(r,I)){r=p(r,I)[g],m&&i.push(m[1]);continue}p(r,I)[g]=new ge,m&&(p(r,te).push(m),i.push(m[1])),r=p(r,I)[g]}return p(r,G).push({[t]:{handler:a,possibleKeys:i.filter((o,n,d)=>d.indexOf(o)===n),score:p(this,me)}}),r}search(t,s){var n;const a=[];b(this,$,fe);let l=[this];const i=Ke(s),o=[];for(let d=0,u=i.length;d<u;d++){const m=i[d],g=d===u-1,x=[];for(let y=0,_=l.length;y<_;y++){const v=l[y],k=p(v,I)[m];k&&(b(k,$,p(v,$)),g?(p(k,I)["*"]&&a.push(...w(this,P,K).call(this,p(k,I)["*"],t,p(v,$))),a.push(...w(this,P,K).call(this,k,t,p(v,$)))):x.push(k));for(let D=0,R=p(v,te).length;D<R;D++){const O=p(v,te)[D],T=p(v,$)===fe?{}:{...p(v,$)};if(O==="*"){const H=p(v,I)["*"];H&&(a.push(...w(this,P,K).call(this,H,t,p(v,$))),b(H,$,T),x.push(H));continue}const[ft,Me,be]=O;if(!m&&!(be instanceof RegExp))continue;const F=p(v,I)[ft],xt=i.slice(d).join("/");if(be instanceof RegExp){const H=be.exec(xt);if(H){if(T[Me]=H[0],a.push(...w(this,P,K).call(this,F,t,p(v,$),T)),Object.keys(p(F,I)).length){b(F,$,T);const Ce=((n=H[0].match(/\//))==null?void 0:n.length)??0;(o[Ce]||(o[Ce]=[])).push(F)}continue}}(be===!0||be.test(m))&&(T[Me]=m,g?(a.push(...w(this,P,K).call(this,F,t,T,p(v,$))),p(F,I)["*"]&&a.push(...w(this,P,K).call(this,p(F,I)["*"],t,T,p(v,$)))):(b(F,$,T),x.push(F)))}}l=x.concat(o.shift()??[])}return a.length>1&&a.sort((d,u)=>d.score-u.score),[a.map(({handler:d,params:u})=>[d,u])]}},G=new WeakMap,I=new WeakMap,te=new WeakMap,me=new WeakMap,$=new WeakMap,P=new WeakSet,K=function(t,s,a,r){const l=[];for(let i=0,o=p(t,G).length;i<o;i++){const n=p(t,G)[i],d=n[s]||n[E],u={};if(d!==void 0&&(d.params=Object.create(null),l.push(d),a!==fe||r&&r!==fe))for(let m=0,g=d.possibleKeys.length;m<g;m++){const x=d.possibleKeys[m],y=u[d.score];d.params[x]=r!=null&&r[x]&&!y?r[x]:a[x]??(r==null?void 0:r[x]),u[d.score]=!0}}return l},ge),se,Qe,Zt=(Qe=class{constructor(){f(this,"name","TrieRouter");h(this,se);b(this,se,new Xt)}add(e,t,s){const a=Ze(t);if(a){for(let r=0,l=a.length;r<l;r++)p(this,se).insert(e,a[r],s);return}p(this,se).insert(e,t,s)}match(e,t){return p(this,se).search(e,t)}},se=new WeakMap,Qe),ut=class extends Pt{constructor(e={}){super(e),this.router=e.router??new Kt({routers:[new Qt,new Zt]})}},es=e=>{const s={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},a=(l=>typeof l=="string"?l==="*"?()=>l:i=>l===i?i:null:typeof l=="function"?l:i=>l.includes(i)?i:null)(s.origin),r=(l=>typeof l=="function"?l:Array.isArray(l)?()=>l:()=>[])(s.allowMethods);return async function(i,o){var u;function n(m,g){i.res.headers.set(m,g)}const d=await a(i.req.header("origin")||"",i);if(d&&n("Access-Control-Allow-Origin",d),s.credentials&&n("Access-Control-Allow-Credentials","true"),(u=s.exposeHeaders)!=null&&u.length&&n("Access-Control-Expose-Headers",s.exposeHeaders.join(",")),i.req.method==="OPTIONS"){s.origin!=="*"&&n("Vary","Origin"),s.maxAge!=null&&n("Access-Control-Max-Age",s.maxAge.toString());const m=await r(i.req.header("origin")||"",i);m.length&&n("Access-Control-Allow-Methods",m.join(","));let g=s.allowHeaders;if(!(g!=null&&g.length)){const x=i.req.header("Access-Control-Request-Headers");x&&(g=x.split(/\s*,\s*/))}return g!=null&&g.length&&(n("Access-Control-Allow-Headers",g.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await o(),s.origin!=="*"&&i.header("Vary","Origin",{append:!0})}};const ts=`<!DOCTYPE html>
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
`,ss=`<!DOCTYPE html>
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
`,mt=`<!DOCTYPE html>
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
`,as=`<!DOCTYPE html>
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
`,rs=`<!DOCTYPE html>
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
`,ls=`<!DOCTYPE html>
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
`,is=`<!DOCTYPE html>
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
`,gt=`<!DOCTYPE html>
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
    <style>
        .content-section { display: none; }
        .content-section.active { display: block; animation: fadeIn 0.5s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .quick-access-btn { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .quick-access-btn:active { transform: scale(0.95) !important; }
        
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
                
                <!-- Additional Stats -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">البنوك النشطة</span>
                            <i class="fas fa-university text-blue-500"></i>
                        </div>
                        <p class="text-2xl font-bold text-gray-800" id="stat-banks">0</p>
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
                const userRole = user.role || user.user_type;
                
                console.log('👤 دور المستخدم:', userRole);
                
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
                        '/admin/reports'
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
                        '/admin/reports'
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
                        '/admin/dashboard',
                        '/admin/customers',
                        '/admin/requests',
                        '/calculator',
                        '/'
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
                
                // إخفاء قسم رابط الحاسبة للمستخدمين العاديين فقط
                const calculatorLinkSection = document.getElementById('calculatorLinkSection');
                if (calculatorLinkSection) {
                    if (userRole === 'user') {
                        calculatorLinkSection.style.display = 'none';
                        console.log('🚫 إخفاء قسم رابط الحاسبة (مستخدم عادي)');
                    } else {
                        // عرض القسم لـ superadmin، admin، company
                        calculatorLinkSection.style.display = 'block';
                        console.log('✅ عرض قسم رابط الحاسبة لـ:', userRole);
                        
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
        
        // Initialize on load
        loadDashboardStats();
        
        // Load calculator link when page loads
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                if (userData.role === 'company' || userData.role === 'admin' || userData.role === 'superadmin') {
                    console.log('🔗 تحميل رابط الحاسبة للمستخدم:', userData.role);
                    loadCalculatorLink();
                } else {
                    console.log('⚠️ دور المستخدم لا يسمح بعرض رابط الحاسبة:', userData.role);
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
`,ns=`<!DOCTYPE html>
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
`,os=`<!DOCTYPE html>
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
`,ds=`<!DOCTYPE html>
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
`,cs=`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منظومة التقارير - نظام حاسبة التمويل</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"><\/script>
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
                <a href="/admin/panel" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
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
            <!-- Customer Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                    <i class="fas fa-users text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير العملاء</h3>
                    <p class="text-sm text-blue-100 mt-2">تقرير شامل لجميع العملاء وإحصائياتهم</p>
                </div>
                <div class="p-6">
                    <button onclick="generateCustomersReport()" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Financing Requests Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
                    <i class="fas fa-file-invoice text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير طلبات التمويل</h3>
                    <p class="text-sm text-green-100 mt-2">تحليل الطلبات حسب الحالة والفترة</p>
                </div>
                <div class="p-6">
                    <button onclick="generateRequestsReport()" class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-bold">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Performance Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
                    <i class="fas fa-chart-bar text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير الأداء</h3>
                    <p class="text-sm text-purple-100 mt-2">تحليل أداء النظام والإحصائيات</p>
                </div>
                <div class="p-6">
                    <button onclick="generatePerformanceReport()" class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-bold">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Financial Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6">
                    <i class="fas fa-dollar-sign text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">التقرير المالي</h3>
                    <p class="text-sm text-yellow-100 mt-2">ملخص المبالغ والتمويلات</p>
                </div>
                <div class="p-6">
                    <button onclick="generateFinancialReport()" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-bold">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Banks Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div class="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6">
                    <i class="fas fa-university text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير البنوك</h3>
                    <p class="text-sm text-teal-100 mt-2">توزيع الطلبات حسب البنوك</p>
                </div>
                <div class="p-6">
                    <button onclick="generateBanksReport()" class="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg font-bold">
                        <i class="fas fa-file-alt ml-2"></i>
                        عرض التقرير
                    </button>
                </div>
            </div>

            <!-- Custom Report -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div class="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6">
                    <i class="fas fa-cogs text-3xl mb-2"></i>
                    <h3 class="text-xl font-bold">تقرير مخصص</h3>
                    <p class="text-sm text-pink-100 mt-2">إنشاء تقرير حسب معايير خاصة</p>
                </div>
                <div class="p-6">
                    <button onclick="openCustomReportModal()" class="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-lg font-bold">
                        <i class="fas fa-file-alt ml-2"></i>
                        إنشاء تقرير
                    </button>
                </div>
            </div>
        </div>

        <!-- Report Display Area -->
        <div id="report-display" class="hidden">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-800" id="report-title">التقرير</h2>
                    <div class="flex gap-2">
                        <button onclick="exportReport('pdf')" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-file-pdf ml-2"></i>
                            تصدير PDF
                        </button>
                        <button onclick="exportReport('excel')" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-file-excel ml-2"></i>
                            تصدير Excel
                        </button>
                        <button onclick="printReport()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-print ml-2"></i>
                            طباعة
                        </button>
                        <button onclick="closeReport()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-times ml-2"></i>
                            إغلاق
                        </button>
                    </div>
                </div>
                <div id="report-content" class="prose max-w-none"></div>
            </div>
        </div>
    </div>

    <script>
        const authToken = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');

        // Load initial stats
        async function loadStats() {
            try {
                console.log('📊 Loading reports statistics...');
                
                // Use dashboard stats API for better performance
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
                
                // Fallback: try without authentication
                try {
                    console.log('🔄 Retrying without auth...');
                    const statsRes = await axios.get('/api/dashboard/stats');
                    
                    if (statsRes.data.success) {
                        const stats = statsRes.data.data;
                        document.getElementById('stat-total-customers').textContent = stats.total_customers || 0;
                        document.getElementById('stat-total-requests').textContent = stats.total_requests || 0;
                        document.getElementById('stat-pending-requests').textContent = stats.pending_requests || 0;
                        document.getElementById('stat-approved-requests').textContent = stats.approved_requests || 0;
                    }
                } catch (retryError) {
                    console.error('❌ Retry failed:', retryError);
                }
            }
        }

        // Generate Customers Report
        window.generateCustomersReport = async function() {
            try {
                const response = await axios.get('/api/customers', {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });
                
                const customers = response.data.data || [];
                
                let html = \`
                    <div class="mb-6">
                        <h3 class="text-xl font-bold mb-4">تقرير العملاء الشامل</h3>
                        <p class="text-gray-600">إجمالي العملاء: <strong>\${customers.length}</strong></p>
                        <p class="text-gray-600">تاريخ التقرير: <strong>\${new Date().toLocaleDateString('ar-SA')}</strong></p>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاسم الكامل</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الهاتف</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البريد الإلكتروني</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نوع التوظيف</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الراتب الشهري</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عدد الطلبات</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                \`;
                
                customers.forEach(customer => {
                    html += \`
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">\${customer.full_name}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${customer.phone}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${customer.email || '-'}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${customer.employment_type}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${customer.monthly_salary?.toLocaleString('ar-SA')} ريال</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${customer.total_requests || 0}</td>
                        </tr>
                    \`;
                });
                
                html += \`
                            </tbody>
                        </table>
                    </div>
                \`;
                
                showReport('تقرير العملاء', html);
            } catch (error) {
                alert('حدث خطأ في تحميل التقرير');
                console.error(error);
            }
        }

        // Generate Requests Report
        window.generateRequestsReport = async function() {
            try {
                const response = await axios.get('/api/financing-requests', {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });
                
                const requests = response.data.data || [];
                const statusCounts = {
                    pending: requests.filter(r => r.status === 'pending').length,
                    approved: requests.filter(r => r.status === 'approved').length,
                    rejected: requests.filter(r => r.status === 'rejected').length
                };
                
                let html = \`
                    <div class="mb-6">
                        <h3 class="text-xl font-bold mb-4">تقرير طلبات التمويل</h3>
                        <div class="grid grid-cols-3 gap-4 mb-6">
                            <div class="bg-yellow-50 p-4 rounded-lg">
                                <div class="text-yellow-600 text-2xl font-bold">\${statusCounts.pending}</div>
                                <div class="text-sm text-gray-600">قيد المراجعة</div>
                            </div>
                            <div class="bg-green-50 p-4 rounded-lg">
                                <div class="text-green-600 text-2xl font-bold">\${statusCounts.approved}</div>
                                <div class="text-sm text-gray-600">موافق عليها</div>
                            </div>
                            <div class="bg-red-50 p-4 rounded-lg">
                                <div class="text-red-600 text-2xl font-bold">\${statusCounts.rejected}</div>
                                <div class="text-sm text-gray-600">مرفوضة</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الطلب</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">اسم العميل</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">البنك</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                \`;
                
                requests.forEach(request => {
                    const statusColors = {
                        pending: 'bg-yellow-100 text-yellow-800',
                        approved: 'bg-green-100 text-green-800',
                        rejected: 'bg-red-100 text-red-800'
                    };
                    const statusText = {
                        pending: 'قيد المراجعة',
                        approved: 'موافق عليه',
                        rejected: 'مرفوض'
                    };
                    
                    html += \`
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">#\${request.id}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${request.customer_name}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${request.bank_name}</td>
                            <td class="px-6 py-4 whitespace-nowrap">\${request.financing_amount?.toLocaleString('ar-SA')} ريال</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs rounded-full \${statusColors[request.status]}">
                                    \${statusText[request.status]}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">\${new Date(request.created_at).toLocaleDateString('ar-SA')}</td>
                        </tr>
                    \`;
                });
                
                html += \`
                            </tbody>
                        </table>
                    </div>
                \`;
                
                showReport('تقرير طلبات التمويل', html);
            } catch (error) {
                alert('حدث خطأ في تحميل التقرير');
                console.error(error);
            }
        }

        // Generate Performance Report
        window.generatePerformanceReport = async function() {
            const html = \`
                <div class="text-center py-12">
                    <i class="fas fa-chart-line text-6xl text-purple-500 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">تقرير الأداء</h3>
                    <p class="text-gray-600">قريباً - سيتم إضافة تحليلات الأداء المتقدمة</p>
                </div>
            \`;
            showReport('تقرير الأداء', html);
        }

        // Generate Financial Report
        window.generateFinancialReport = async function() {
            try {
                const response = await axios.get('/api/financing-requests', {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                });
                
                const requests = response.data.data || [];
                const totalAmount = requests.reduce((sum, r) => sum + (r.financing_amount || 0), 0);
                const approvedAmount = requests
                    .filter(r => r.status === 'approved')
                    .reduce((sum, r) => sum + (r.financing_amount || 0), 0);
                
                const html = \`
                    <div class="mb-6">
                        <h3 class="text-xl font-bold mb-4">التقرير المالي</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="bg-blue-50 p-6 rounded-lg">
                                <div class="text-blue-600 text-3xl font-bold">\${totalAmount.toLocaleString('ar-SA')} ريال</div>
                                <div class="text-sm text-gray-600 mt-2">إجمالي مبالغ الطلبات</div>
                            </div>
                            <div class="bg-green-50 p-6 rounded-lg">
                                <div class="text-green-600 text-3xl font-bold">\${approvedAmount.toLocaleString('ar-SA')} ريال</div>
                                <div class="text-sm text-gray-600 mt-2">المبالغ الموافق عليها</div>
                            </div>
                        </div>
                    </div>
                \`;
                
                showReport('التقرير المالي', html);
            } catch (error) {
                alert('حدث خطأ في تحميل التقرير');
                console.error(error);
            }
        }

        // Generate Banks Report
        window.generateBanksReport = function() {
            const html = \`
                <div class="text-center py-12">
                    <i class="fas fa-university text-6xl text-teal-500 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">تقرير البنوك</h3>
                    <p class="text-gray-600">قريباً - سيتم إضافة تحليل توزيع الطلبات حسب البنوك</p>
                </div>
            \`;
            showReport('تقرير البنوك', html);
        }

        // Open Custom Report Modal
        window.generateCustomReport = function() {
            alert('قريباً - سيتم إضافة خاصية التقارير المخصصة');
        }

        // Show Report
        function showReport(title, content) {
            document.getElementById('report-title').textContent = title;
            document.getElementById('report-content').innerHTML = content;
            document.getElementById('report-display').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Close Report
        function closeReport() {
            document.getElementById('report-display').classList.add('hidden');
        }

        // Export Report
        function exportReport(format) {
            alert(\`سيتم تصدير التقرير بصيغة \${format.toUpperCase()} قريباً\`);
        }

        // Print Report
        window.printReport = function() {
            const printContent = document.getElementById('report-content').innerHTML;
            const printWindow = window.open('', '_blank');
            printWindow.document.write(\`
                <html dir="rtl">
                <head>
                    <title>طباعة التقرير</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
                        th { background-color: #f3f4f6; }
                    </style>
                </head>
                <body>
                    \${printContent}
                    <script>window.print(); window.close();<\/script>
                </body>
                </html>
            \`);
        }

        // Load stats on page load
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 Page loaded, starting to load stats...');
            loadStats();
        });
        
        // Also try to load immediately
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            console.log('🚀 Document ready, loading stats immediately...');
            loadStats();
        }
    <\/script>
</body>
</html>
`,ps=`<!DOCTYPE html>
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
`,c=new ut;c.use("*",es());async function us(e){const s=(e.req.header("host")||"").split(".")[0],a=e.req.path.match(/^\/c\/([^\/]+)/),r=a?a[1]:null;let l=null;return s&&s!=="localhost"&&s!=="3000-ii8t2q2dzwwe7ckmslxss-3844e1b6"&&(l=await e.env.DB.prepare(`
      SELECT * FROM tenants 
      WHERE subdomain = ? AND status = 'active'
      LIMIT 1
    `).bind(s).first()),!l&&r&&(l=await e.env.DB.prepare(`
      SELECT * FROM tenants 
      WHERE slug = ? AND status = 'active'
      LIMIT 1
    `).bind(r).first()),l||(l=await e.env.DB.prepare(`
      SELECT * FROM tenants WHERE id = 1 LIMIT 1
    `).bind().first()),l}c.use("/c/:tenant/*",async(e,t)=>{const s=await us(e);if(!s)return e.json({error:"Tenant not found",message:"الشركة غير موجودة أو غير نشطة"},404);e.set("tenant",s),e.set("tenantId",s.id),await t()});c.get("/api/tenants",async e=>{try{const{results:t}=await e.env.DB.prepare(`
      SELECT * FROM tenants ORDER BY created_at DESC
    `).all();return e.json({success:!0,data:t})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/tenants",async e=>{try{const t=await e.req.json();if(!t.company_name||!t.slug)return e.json({success:!1,error:"اسم الشركة والـ Slug مطلوبان"},400);if(await e.env.DB.prepare(`
      SELECT id FROM tenants WHERE slug = ?
    `).bind(t.slug).first())return e.json({success:!1,error:"الـ Slug موجود بالفعل"},400);const a=await e.env.DB.prepare(`
      INSERT INTO tenants (
        company_name, slug, subdomain, status, max_users, 
        max_customers, max_requests, contact_email, contact_phone,
        primary_color, secondary_color
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(t.company_name,t.slug,t.subdomain||t.slug,t.status||"active",t.max_users||10,t.max_customers||500,t.max_requests||2e3,t.contact_email||"",t.contact_phone||"",t.primary_color||"#667eea",t.secondary_color||"#764ba2").run();return e.json({success:!0,data:{id:a.meta.last_row_id,...t},message:"تم إنشاء الشركة بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/tenants/:id",async e=>{try{const t=e.req.param("id"),s=await e.req.json();return await e.env.DB.prepare(`
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
    `).bind(s.company_name,s.slug,s.subdomain,s.status,s.max_users,s.max_customers,s.max_requests,s.contact_email,s.contact_phone,s.primary_color||"#667eea",s.secondary_color||"#764ba2",t).run(),e.json({success:!0,data:{id:t,...s},message:"تم تحديث الشركة بنجاح"})):e.json({success:!1,error:"الشركة غير موجودة"},404)}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/tenants/:id",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare(`
      SELECT COUNT(*) as count FROM users WHERE tenant_id = ?
    `).bind(t).first();return s&&s.count>0?e.json({success:!1,error:`لا يمكن حذف الشركة لأنها تحتوي على ${s.count} مستخدم/مستخدمين`},400):(await e.env.DB.prepare(`
      DELETE FROM tenants WHERE id = ?
    `).bind(t).run(),e.json({success:!0,message:"تم حذف الشركة بنجاح"}))}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/auth/login",async e=>{try{const{username:t,password:s}=await e.req.json(),a=await e.env.DB.prepare(`
      SELECT u.*, r.role_name, s.company_name, t.id as tenant_id, t.company_name as tenant_name, t.slug as tenant_slug
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN subscriptions s ON u.subscription_id = s.id
      LEFT JOIN tenants t ON u.tenant_id = t.id
      WHERE u.username = ? AND u.password = ? AND u.is_active = 1
    `).bind(t,s).first();if(!a)return e.json({success:!1,error:"اسم المستخدم أو كلمة المرور غير صحيحة"},401);await e.env.DB.prepare("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?").bind(a.id).run();const r=`${a.id}:${a.tenant_id||"null"}:${Date.now()}:${Math.random()}`,l=btoa(r);let i="/admin";return a.tenant_id&&a.tenant_slug?i=`/c/${a.tenant_slug}/admin`:a.user_type==="superadmin"&&(i="/admin/tenants"),e.json({success:!0,token:l,redirect:i,user:{id:a.id,username:a.username,full_name:a.full_name,email:a.email,role:a.role_name,user_type:a.user_type,company_name:a.company_name,subscription_id:a.subscription_id,tenant_id:a.tenant_id,tenant_name:a.tenant_name,tenant_slug:a.tenant_slug}})}catch(t){return e.json({success:!1,message:t.message},500)}});c.post("/api/auth/forgot-password",async e=>{try{const{email:t}=await e.req.json(),s=await e.env.DB.prepare(`
      SELECT id, email, username FROM users WHERE email = ? OR username = ?
    `).bind(t,t).first();if(!s)return e.json({success:!1,message:"البريد الإلكتروني أو اسم المستخدم غير موجود"},404);const a=Math.floor(1e5+Math.random()*9e5).toString(),r=new Date(Date.now()+900*1e3);return await e.env.DB.prepare(`
      INSERT INTO password_change_notifications (user_id, verification_code, expires_at, is_used)
      VALUES (?, ?, ?, 0)
    `).bind(s.id,a,r.toISOString()).run(),console.log(`Verification code for ${s.email}: ${a}`),e.json({success:!0,message:"تم إرسال رمز التحقق إلى بريدك الإلكتروني",devCode:a})}catch(t){return console.error("Forgot password error:",t),e.json({success:!1,message:"حدث خطأ. الرجاء المحاولة مرة أخرى."},500)}});c.post("/api/auth/verify-reset-code",async e=>{try{const{email:t,code:s}=await e.req.json(),a=await e.env.DB.prepare(`
      SELECT id FROM users WHERE email = ? OR username = ?
    `).bind(t,t).first();if(!a)return e.json({success:!1,message:"المستخدم غير موجود"},404);const r=await e.env.DB.prepare(`
      SELECT id, verification_code, expires_at, is_used
      FROM password_change_notifications
      WHERE user_id = ? AND is_used = 0
      ORDER BY created_at DESC
      LIMIT 1
    `).bind(a.id).first();if(!r)return e.json({success:!1,message:"لم يتم العثور على رمز التحقق"},404);if(new Date(r.expires_at)<new Date)return e.json({success:!1,message:"انتهت صلاحية رمز التحقق. الرجاء طلب رمز جديد."},400);if(r.verification_code!==s)return e.json({success:!1,message:"رمز التحقق غير صحيح"},400);const l=Math.random().toString(36).substring(2)+Date.now().toString(36);return e.json({success:!0,message:"تم التحقق بنجاح",token:l})}catch(t){return console.error("Verify code error:",t),e.json({success:!1,message:"حدث خطأ. الرجاء المحاولة مرة أخرى."},500)}});c.post("/api/auth/reset-password",async e=>{try{const{email:t,token:s,newPassword:a}=await e.req.json();if(!a||a.length<8)return e.json({success:!1,message:"كلمة السر يجب أن تكون 8 أحرف على الأقل"},400);const r=await e.env.DB.prepare(`
      SELECT id FROM users WHERE email = ? OR username = ?
    `).bind(t,t).first();return r?(await e.env.DB.prepare(`
      UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).bind(a,r.id).run(),await e.env.DB.prepare(`
      UPDATE password_change_notifications SET is_used = 1 WHERE user_id = ? AND is_used = 0
    `).bind(r.id).run(),e.json({success:!0,message:"تم تغيير كلمة السر بنجاح"})):e.json({success:!1,message:"المستخدم غير موجود"},404)}catch(t){return console.error("Reset password error:",t),e.json({success:!1,message:"حدث خطأ. الرجاء المحاولة مرة أخرى."},500)}});c.get("/api/banks",async e=>{try{const s=(await e.env.DB.prepare("SELECT * FROM banks ORDER BY bank_name").all()).results;return e.json({success:!0,data:s})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/banks",async e=>{try{const t=await e.req.json(),{bank_name:s,bank_code:a,logo_url:r,is_active:l}=t,i=await e.env.DB.prepare(`
      INSERT INTO banks (bank_name, bank_code, logo_url, is_active) 
      VALUES (?, ?, ?, ?)
    `).bind(s,a,r,l).run();return e.json({success:!0,id:i.meta.last_row_id})}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/banks/:id",async e=>{try{const t=e.req.param("id"),s=await e.req.json(),{bank_name:a,bank_code:r,logo_url:l,is_active:i}=s;return await e.env.DB.prepare(`
      UPDATE banks SET bank_name = ?, bank_code = ?, logo_url = ?, is_active = ? WHERE id = ?
    `).bind(a,r,l,i,t).run(),e.json({success:!0})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/banks/:id",async e=>{try{const t=e.req.param("id"),s=await e.req.formData(),a=s.get("bank_name"),r=s.get("bank_code"),l=s.get("logo_url")||null,i=parseInt(s.get("is_active")||"1");return await e.env.DB.prepare(`
      UPDATE banks SET bank_name = ?, bank_code = ?, logo_url = ?, is_active = ? WHERE id = ?
    `).bind(a,r,l,i,t).run(),e.redirect("/admin/banks")}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/banks/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare(`
      SELECT id FROM banks WHERE id = ?
    `).bind(t).first()?(await e.env.DB.prepare("DELETE FROM banks WHERE id = ?").bind(t).run(),e.json({success:!0})):e.json({success:!1,error:"البنك غير موجود"},404)}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/financing-types",async e=>{try{const{results:t}=await e.env.DB.prepare(`
      SELECT * FROM financing_types ORDER BY type_name
    `).all();return e.json({success:!0,data:t})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/rates",async e=>{try{const t=e.req.header("Authorization"),s=t==null?void 0:t.replace("Bearer ","");let a=null;if(s){const o=atob(s).split(":");a=o[1]!=="null"?parseInt(o[1]):null}let r=`
      SELECT 
        r.*,
        b.bank_name,
        f.type_name as financing_type_name
      FROM bank_financing_rates r
      JOIN banks b ON r.bank_id = b.id
      JOIN financing_types f ON r.financing_type_id = f.id
    `;a!==null&&(r+=" WHERE r.tenant_id = ?"),r+=" ORDER BY b.bank_name, f.type_name";const{results:l}=a!==null?await e.env.DB.prepare(r).bind(a).all():await e.env.DB.prepare(r).all();return e.json({success:!0,data:l})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/rates",async e=>{try{const t=e.req.header("Authorization"),s=t==null?void 0:t.replace("Bearer ","");let a=null;if(s){const n=atob(s).split(":");a=n[1]!=="null"?parseInt(n[1]):null}const r=await e.req.formData(),l={};r.forEach((o,n)=>{l[n]=o});const i=await e.env.DB.prepare(`
      INSERT INTO bank_financing_rates 
      (bank_id, financing_type_id, rate, min_amount, max_amount, min_duration, max_duration, is_active, tenant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(l.bank_id,l.financing_type_id,l.rate,l.min_amount||null,l.max_amount||null,l.min_duration||null,l.max_duration||null,l.is_active||1,a).run();return e.redirect("/admin/rates")}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/rates/:id",async e=>{try{const t=e.req.param("id"),s=await e.req.json();return await e.env.DB.prepare(`
      UPDATE bank_financing_rates 
      SET bank_id = ?, financing_type_id = ?, rate = ?, 
          min_amount = ?, max_amount = ?, min_salary = ?, max_salary = ?,
          min_duration = ?, max_duration = ?, is_active = ?
      WHERE id = ?
    `).bind(s.bank_id,s.financing_type_id,s.rate,s.min_amount,s.max_amount,s.min_salary,s.max_salary,s.min_duration,s.max_duration,s.is_active,t).run(),e.json({success:!0})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/rates/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM bank_financing_rates WHERE id = ?").bind(t).run(),e.json({success:!0})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/packages",async e=>{try{const{results:t}=await e.env.DB.prepare(`
      SELECT * FROM packages ORDER BY price
    `).all();return e.json({success:!0,data:t})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/packages",async e=>{try{const t=await e.req.formData(),s=t.get("package_name"),a=t.get("description"),r=t.get("price"),l=t.get("duration_months"),i=t.get("max_calculations"),o=t.get("max_users"),n=t.get("is_active")||"1",d=await e.env.DB.prepare(`
      INSERT INTO packages (package_name, description, price, duration_months, max_calculations, max_users, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(s,a||null,r,l,i||null,o||null,n).run();return e.redirect("/admin/packages")}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/packages/:id",async e=>{try{const t=e.req.param("id"),{package_name:s,description:a,price:r,duration_months:l,max_calculations:i,max_users:o,is_active:n}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE packages 
      SET package_name = ?, description = ?, price = ?, duration_months = ?, 
          max_calculations = ?, max_users = ?, is_active = ?
      WHERE id = ?
    `).bind(s,a,r,l,i,o,n,t).run(),e.json({success:!0,message:"تم تحديث الباقة بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/subscriptions",async e=>{try{const t=e.req.header("Authorization"),s=t==null?void 0:t.replace("Bearer ","");let a=null;if(s){const o=atob(s).split(":");a=o[1]!=="null"?parseInt(o[1]):null}let r=`
      SELECT 
        s.*,
        p.package_name,
        p.price,
        p.max_calculations
      FROM subscriptions s
      JOIN packages p ON s.package_id = p.id`;a&&(r+=` WHERE s.tenant_id = ${a}`),r+=" ORDER BY s.created_at DESC";const{results:l}=await e.env.DB.prepare(r).all();return e.json({success:!0,data:l})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/subscriptions",async e=>{try{const t=await e.req.formData(),s=t.get("company_name"),a=t.get("package_id"),r=t.get("start_date"),l=t.get("end_date"),i=t.get("status")||"active",o=t.get("calculations_used")||0,n=e.req.header("Authorization"),d=n==null?void 0:n.replace("Bearer ","");let u=null;if(d){const x=atob(d).split(":");u=x[1]!=="null"?parseInt(x[1]):null}const m=await e.env.DB.prepare(`
      INSERT INTO subscriptions (company_name, package_id, start_date, end_date, status, calculations_used, tenant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(s,a,r,l,i,o,u).run();return e.redirect("/admin/subscriptions")}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/subscriptions/:id",async e=>{try{const t=e.req.param("id"),{company_name:s,package_id:a,start_date:r,end_date:l,status:i}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE subscriptions 
      SET company_name = ?, package_id = ?, start_date = ?, end_date = ?, status = ?
      WHERE id = ?
    `).bind(s,a,r,l,i,t).run(),e.json({success:!0})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/subscription-requests",async e=>{try{const{results:t}=await e.env.DB.prepare(`
      SELECT 
        sr.*,
        p.package_name,
        p.price,
        p.duration_months
      FROM subscription_requests sr
      LEFT JOIN packages p ON sr.package_id = p.id
      ORDER BY sr.created_at DESC
    `).all();return e.json({success:!0,data:t})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/subscription-requests/:id",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare(`
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
    `).bind(t).first();return s?e.json({success:!0,data:s}):e.json({success:!1,message:"الطلب غير موجود"},404)}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/subscription-requests",async e=>{try{const{company_name:t,contact_name:s,email:a,phone:r,package_id:l,notes:i}=await e.req.json();if(!t||!s||!a||!r||!l)return e.json({success:!1,message:"جميع الحقول مطلوبة"},400);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a))return e.json({success:!1,message:"البريد الإلكتروني غير صحيح"},400);if(!/^(05|5)[0-9]{8}$/.test(r.replace(/[\s-]/g,"")))return e.json({success:!1,message:"رقم الجوال غير صحيح. يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"},400);if(!await e.env.DB.prepare(`
      SELECT id FROM packages WHERE id = ? AND is_active = 1
    `).bind(l).first())return e.json({success:!1,message:"الباقة غير موجودة أو غير متاحة"},400);const u=await e.env.DB.prepare(`
      INSERT INTO subscription_requests 
      (company_name, contact_name, email, phone, package_id, status, notes)
      VALUES (?, ?, ?, ?, ?, 'pending', ?)
    `).bind(t,s,a,r,l,i||null).run();return e.json({success:!0,message:"تم إرسال طلبك بنجاح. سنتواصل معك قريباً",requestId:u.meta.last_row_id})}catch(t){return console.error("Subscription request error:",t),e.json({success:!1,message:"حدث خطأ. الرجاء المحاولة مرة أخرى."},500)}});c.put("/api/subscription-requests/:id",async e=>{try{const t=e.req.param("id"),{status:s,notes:a}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE subscription_requests 
      SET status = ?, notes = ?
      WHERE id = ?
    `).bind(s,a||null,t).run(),e.json({success:!0,message:"تم تحديث الطلب بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/subscription-requests/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare(`
      DELETE FROM subscription_requests WHERE id = ?
    `).bind(t).run(),e.json({success:!0,message:"تم حذف الطلب بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/users",async e=>{try{const t=e.req.header("Authorization"),s=t==null?void 0:t.replace("Bearer ","");let a=null;if(s){const o=atob(s).split(":");a=o[1]!=="null"?parseInt(o[1]):null}let r=`
      SELECT u.*, r.role_name, r.description as role_description,
             COUNT(DISTINCT rp.permission_id) as permissions_count
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN role_permissions rp ON r.id = rp.role_id`;a&&(r+=` WHERE u.tenant_id = ${a}`),r+=`
      GROUP BY u.id
      ORDER BY u.id DESC`;const{results:l}=await e.env.DB.prepare(r).all();return e.json({success:!0,data:l})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/users",async e=>{try{const t=await e.req.formData(),s=t.get("username"),a=t.get("password"),r=t.get("full_name"),l=t.get("email"),i=t.get("phone"),o=t.get("user_type"),n=t.get("role_id"),d=t.get("subscription_id")||null,u=t.get("is_active")||"1",m=e.req.header("Authorization"),g=m==null?void 0:m.replace("Bearer ","");let x=null;if(g){const k=atob(g).split(":");x=k[1]!=="null"?parseInt(k[1]):null}if(await e.env.DB.prepare(`
      SELECT id FROM users WHERE username = ?
    `).bind(s).first())return e.json({success:!1,error:"اسم المستخدم موجود مسبقاً! الرجاء اختيار اسم مستخدم آخر."},400);if(l&&await e.env.DB.prepare(`
        SELECT id FROM users WHERE email = ?
      `).bind(l).first())return e.json({success:!1,error:"البريد الإلكتروني موجود مسبقاً! الرجاء استخدام بريد إلكتروني آخر."},400);const _=await e.env.DB.prepare(`
      INSERT INTO users (username, password, full_name, email, phone, user_type, role_id, subscription_id, is_active, tenant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(s,a,r,l,i,o,n,d,u,x).run();return e.json({success:!0,message:"تم إضافة المستخدم بنجاح",userId:_.meta.last_row_id})}catch(t){return console.error("Error adding user:",t),e.json({success:!1,error:t.message||"حدث خطأ أثناء إضافة المستخدم"},500)}});c.put("/api/users/:id",async e=>{try{const t=e.req.param("id"),{username:s,full_name:a,email:r,phone:l,role_id:i,subscription_id:o,is_active:n}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE users 
      SET username = ?, full_name = ?, email = ?, phone = ?, role_id = ?, subscription_id = ?, is_active = ?
      WHERE id = ?
    `).bind(s,a,r,l,i,o,n,t).run(),e.json({success:!0})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/customers",async e=>{try{const t=e.req.header("Authorization"),s=t==null?void 0:t.replace("Bearer ","");let a=null;if(s){const o=atob(s).split(":");a=o[1]!=="null"?parseInt(o[1]):null}let r=`
      SELECT 
        c.*,
        ft.type_name as financing_type_name,
        COUNT(f.id) as total_requests,
        SUM(CASE WHEN f.status = 'pending' THEN 1 ELSE 0 END) as pending_requests,
        SUM(CASE WHEN f.status = 'approved' THEN 1 ELSE 0 END) as approved_requests
      FROM customers c
      LEFT JOIN financing_requests f ON c.id = f.customer_id
      LEFT JOIN financing_types ft ON c.financing_type_id = ft.id`;a&&(r+=` WHERE c.tenant_id = ${a}`),r+=`
      GROUP BY c.id
      ORDER BY c.created_at DESC`;const{results:l}=await e.env.DB.prepare(r).all();return e.json({success:!0,data:l})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/customers",async e=>{try{const t=await e.req.formData(),s=t.get("full_name"),a=t.get("phone"),r=t.get("email")||null,l=t.get("national_id")||null,i=t.get("date_of_birth")||null,o=t.get("employer_name")||null,n=t.get("job_title")||null,d=t.get("work_start_date")||null,u=t.get("city")||null,m=parseFloat(t.get("monthly_salary")||"0"),g=e.req.header("Authorization"),x=g==null?void 0:g.replace("Bearer ","");let y=null;if(x){const O=atob(x).split(":");y=O[1]!=="null"?parseInt(O[1]):null}if(l){let R="SELECT id, full_name FROM customers WHERE national_id = ?",O=[l];y&&(R+=" AND tenant_id = ?",O.push(y));const T=await e.env.DB.prepare(R).bind(...O).first();if(T)return e.html(`
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
                  <p class="text-gray-700"><strong>مسجل باسم:</strong> ${T.full_name}</p>
                  <p class="text-gray-700"><strong>رقم العميل:</strong> #${T.id}</p>
                </div>
                <div class="flex gap-3">
                  <a href="/admin/customers/add" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                    <i class="fas fa-arrow-right ml-2"></i>
                    العودة للنموذج
                  </a>
                  <a href="/admin/customers/${T.id}" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
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
        `)}let _="SELECT id, full_name FROM customers WHERE phone = ?",v=[a];y&&(_+=" AND tenant_id = ?",v.push(y));const k=await e.env.DB.prepare(_).bind(...v).first();if(k)return e.html(`
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
                <p class="text-gray-700"><strong>رقم الهاتف:</strong> ${a}</p>
                <p class="text-gray-700"><strong>مسجل باسم:</strong> ${k.full_name}</p>
                <p class="text-gray-700"><strong>رقم العميل:</strong> #${k.id}</p>
              </div>
              <div class="flex gap-3">
                <a href="/admin/customers/add" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-arrow-right ml-2"></i>
                  العودة للنموذج
                </a>
                <a href="/admin/customers/${k.id}" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <i class="fas fa-eye ml-2"></i>
                  عرض العميل الموجود
                </a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `);const D=await e.env.DB.prepare(`
      INSERT INTO customers (full_name, phone, email, national_id, birthdate, employer_name, job_title, work_start_date, city, monthly_salary, tenant_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(s,a,r,l,i,o,n,d,u,m,y).run();return e.redirect("/admin/customers")}catch(t){return e.html(`
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
    `)}});c.post("/api/customers/:id",async e=>{try{const t=e.req.param("id"),s=await e.req.formData(),a=s.get("full_name"),r=s.get("phone"),l=s.get("email")||null,i=s.get("national_id")||null,o=s.get("date_of_birth")||null,n=s.get("employer_name")||null,d=s.get("job_title")||null,u=s.get("work_start_date")||null,m=s.get("city")||null,g=parseFloat(s.get("monthly_salary")||"0");return await e.env.DB.prepare(`
      UPDATE customers 
      SET full_name = ?, phone = ?, email = ?, national_id = ?, birthdate = ?,
          employer_name = ?, job_title = ?, work_start_date = ?, city = ?, monthly_salary = ?
      WHERE id = ?
    `).bind(a,r,l,i,o,n,d,u,m,g,t).run(),e.redirect("/admin/customers")}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/financing-requests",async e=>{try{const t=e.req.header("Authorization"),s=t==null?void 0:t.replace("Bearer ","");let a=null;if(s){const o=atob(s).split(":");a=o[1]!=="null"?parseInt(o[1]):null}let r=`
      SELECT 
        f.*,
        c.full_name as customer_name,
        c.phone as customer_phone,
        c.national_id,
        c.employer_name,
        c.job_title,
        b.bank_name as selected_bank_name,
        ft.type_name as financing_type_name
      FROM financing_requests f
      JOIN customers c ON f.customer_id = c.id
      LEFT JOIN banks b ON f.selected_bank_id = b.id
      LEFT JOIN financing_types ft ON f.financing_type_id = ft.id`;a&&(r+=` WHERE f.tenant_id = ${a}`),r+=" ORDER BY f.created_at DESC";const{results:l}=await e.env.DB.prepare(r).all();return e.json({success:!0,data:l})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/requests",async e=>{try{const t=await e.req.formData(),s=t.get("customer_id"),a=t.get("financing_type_id"),r=t.get("requested_amount"),l=t.get("duration_months"),i=t.get("salary_at_request"),o=t.get("selected_bank_id")||null,n=t.get("status")||"pending",d=t.get("notes")||"",u=e.req.header("Authorization"),m=u==null?void 0:u.replace("Bearer ","");let g=null;if(m){const _=atob(m).split(":");g=_[1]!=="null"?parseInt(_[1]):null}const x=await e.env.DB.prepare(`
      INSERT INTO financing_requests (
        customer_id, financing_type_id, selected_bank_id, 
        requested_amount, salary_at_request, duration_months, 
        status, notes, tenant_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(s,a,o,r,i,l,n,d,g).run();return e.redirect("/admin/requests")}catch(t){return console.error("Error creating request:",t),e.json({success:!1,error:t.message,message:"حدث خطأ أثناء حفظ الطلب"},500)}});c.post("/api/c/:tenant/calculator/submit-request",async e=>{try{const t=e.req.param("tenant"),s=await e.req.json(),a=await e.env.DB.prepare(`
      SELECT id FROM tenants WHERE slug = ? AND status = 'active'
    `).bind(t).first();if(!a)return e.json({success:!1,error:"شركة غير موجودة"},404);const r=a.id;let l=await e.env.DB.prepare(`
      SELECT id FROM customers WHERE (national_id = ? OR phone = ?) AND tenant_id = ?
    `).bind(s.national_id||"",s.phone||"",r).first(),i;if(l)i=l.id,await e.env.DB.prepare(`
        UPDATE customers 
        SET full_name = ?, phone = ?, email = ?, 
            birthdate = ?, monthly_salary = ?,
            employer_name = ?, job_title = ?,
            work_start_date = ?, city = ?,
            financing_amount = ?, monthly_obligations = ?, financing_type_id = ?
        WHERE id = ?
      `).bind(s.full_name||"",s.phone||"",s.email||null,s.birthdate||null,s.monthly_salary||0,s.employer||"",s.job_title||"",s.work_start_date||null,s.city||"",s.requested_amount||0,s.monthly_obligations||0,s.financing_type_id||null,i).run();else try{i=(await e.env.DB.prepare(`
          INSERT INTO customers (
            full_name, phone, email, national_id, 
            birthdate, monthly_salary, employer_name, 
            job_title, work_start_date, city, tenant_id,
            financing_amount, monthly_obligations, financing_type_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(s.full_name||"",s.phone||"",s.email||null,s.national_id||"",s.birthdate||null,s.monthly_salary||0,s.employer||"",s.job_title||"",s.work_start_date||null,s.city||"",r,s.requested_amount||0,s.monthly_obligations||0,s.financing_type_id||null).run()).meta.last_row_id}catch(d){if(d.message&&d.message.includes("UNIQUE")){const u=await e.env.DB.prepare(`
            SELECT id FROM customers WHERE (national_id = ? OR phone = ?)
          `).bind(s.national_id||"",s.phone||"").first();if(u)i=u.id,await e.env.DB.prepare(`
              UPDATE customers 
              SET full_name = ?, phone = ?, email = ?, 
                  birthdate = ?, monthly_salary = ?,
                  employer_name = ?, job_title = ?,
                  work_start_date = ?, city = ?, tenant_id = ?,
                  financing_amount = ?, monthly_obligations = ?, financing_type_id = ?
              WHERE id = ?
            `).bind(s.full_name||"",s.phone||"",s.email||null,s.birthdate||null,s.monthly_salary||0,s.employer||"",s.job_title||"",s.work_start_date||null,s.city||"",r,s.requested_amount||0,s.monthly_obligations||0,s.financing_type_id||null,i).run();else throw d}else throw d}const n=(await e.env.DB.prepare(`
      INSERT INTO financing_requests (
        customer_id, financing_type_id, selected_bank_id,
        requested_amount, salary_at_request, duration_months,
        monthly_obligations, monthly_payment,
        status, notes, tenant_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
    `).bind(i,s.financing_type_id||null,s.bank_id||s.selected_bank_id||null,s.requested_amount||0,s.monthly_salary||0,s.duration||s.duration_months||0,s.monthly_obligations||0,s.monthly_payment||0,s.notes||null,r).run()).meta.last_row_id;return e.json({success:!0,request_id:n,message:"تم إرسال طلبك بنجاح"})}catch(t){return console.error("Calculator submit error:",t),console.error("Error details:",{message:t.message,stack:t.stack,data:t}),e.json({success:!1,error:"حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى.",details:t.message},500)}});c.post("/api/calculator/save-customer",async e=>{try{const t=await e.req.json(),s=t.tenant_slug||null;let a=null;if(s){const i=await e.env.DB.prepare(`
        SELECT id FROM tenants WHERE slug = ? AND status = 'active'
      `).bind(s).first();i&&(a=i.id)}let r=await e.env.DB.prepare(`
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
      `).bind(t.name,t.birthdate,t.salary,t.amount,t.obligations||0,t.financing_type_id,t.duration_months||null,t.best_bank_id||null,t.best_rate||null,t.monthly_payment||null,t.total_payment||null,a,l).run();else{const i=`TEMP-${Date.now()}-${Math.random().toString(36).substring(7)}`;l=(await e.env.DB.prepare(`
        INSERT INTO customers (
          full_name, phone, birthdate, monthly_salary,
          financing_amount, monthly_obligations, financing_type_id,
          financing_duration_months, best_bank_id, best_rate,
          monthly_payment, total_payment, calculation_date,
          national_id, tenant_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)
      `).bind(t.name,t.phone,t.birthdate,t.salary,t.amount,t.obligations||0,t.financing_type_id,t.duration_months||null,t.best_bank_id||null,t.best_rate||null,t.monthly_payment||null,t.total_payment||null,i,a).run()).meta.last_row_id}return e.json({success:!0,customer_id:l,message:"تم حفظ بيانات العميل بنجاح"})}catch(t){return console.error("Save customer error:",t),e.json({success:!1,error:t.message},500)}});c.post("/api/calculator/submit-request",async e=>{try{const t=await e.req.json();let s=await e.env.DB.prepare(`
      SELECT id FROM customers WHERE national_id = ? OR phone = ?
    `).bind(t.national_id,t.phone).first(),a;if(s)a=s.id,await e.env.DB.prepare(`
        UPDATE customers 
        SET full_name = ?, phone = ?, email = ?, 
            birthdate = ?, monthly_salary = ?,
            employer_name = ?, job_title = ?,
            work_start_date = ?, city = ?
        WHERE id = ?
      `).bind(t.full_name,t.phone,t.email||null,t.birthdate,t.monthly_salary,t.employer,t.job_title,t.work_start_date,t.city,a).run();else try{a=(await e.env.DB.prepare(`
          INSERT INTO customers (
            full_name, phone, email, national_id, 
            birthdate, monthly_salary, employer_name, 
            job_title, work_start_date, city
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(t.full_name,t.phone,t.email||null,t.national_id,t.birthdate,t.monthly_salary,t.employer,t.job_title,t.work_start_date,t.city).run()).meta.last_row_id}catch(i){if(i.message&&i.message.includes("UNIQUE")){const o=await e.env.DB.prepare(`
            SELECT id FROM customers WHERE national_id = ? OR phone = ?
          `).bind(t.national_id,t.phone).first();if(o)a=o.id;else throw i}else throw i}const l=(await e.env.DB.prepare(`
      INSERT INTO financing_requests (
        customer_id, financing_type_id, selected_bank_id,
        requested_amount, salary_at_request, duration_months,
        monthly_obligations, monthly_payment,
        status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    `).bind(a,t.financing_type_id,t.bank_id,t.requested_amount,t.monthly_salary,t.duration,t.monthly_obligations,t.monthly_payment,t.notes).run()).meta.last_row_id;return await e.env.DB.prepare(`
      INSERT INTO notifications (user_id, title, message, type, category, related_request_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(1,"طلب تمويل جديد",`تم استلام طلب تمويل جديد برقم #${l} بمبلغ ${t.requested_amount.toLocaleString("ar-SA")} ريال من ${t.full_name}`,"info","request",l).run(),e.json({success:!0,request_id:l,customer_id:a,message:"تم إرسال طلبك بنجاح"})}catch(t){return console.error("Calculator submit error:",t),e.json({success:!1,error:t.message,message:"حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى."},500)}});c.put("/api/financing-requests/:id",async e=>{try{const t=e.req.param("id"),s=e.req.header("Authorization");let a=null;if(s&&s.startsWith("Bearer ")){const D=s.substring(7).split(".");D.length===3&&(a=JSON.parse(atob(D[1])).tenant_id||null)}const{requested_amount:r,duration_months:l,salary_at_request:i,monthly_obligations:o,status:n,notes:d,id_attachment_url:u,bank_statement_attachment_url:m,salary_attachment_url:g,additional_attachment_url:x}=await e.req.json();let y=["requested_amount = ?","duration_months = ?","salary_at_request = ?","monthly_obligations = ?","status = ?","notes = ?"];const _=[r,l,i||0,o||0,n||"pending",d||""];u&&(y.push("id_attachment_url = ?"),_.push(u)),m&&(y.push("bank_statement_attachment_url = ?"),_.push(m)),g&&(y.push("salary_attachment_url = ?"),_.push(g)),x&&(y.push("additional_attachment_url = ?"),_.push(x)),_.push(t);let v=`
      UPDATE financing_requests 
      SET ${y.join(", ")}
      WHERE id = ?
    `;return a!==null&&(v+=" AND tenant_id = ?",_.push(a)),await e.env.DB.prepare(v).bind(..._).run(),e.json({success:!0})}catch(t){return console.error("Update financing request error:",t),e.json({success:!1,error:t.message},500)}});c.put("/api/financing-requests/:id/status",async e=>{try{const t=e.req.param("id"),{status:s,notes:a}=await e.req.json();await e.env.DB.prepare(`
      UPDATE financing_requests SET status = ?, notes = ? WHERE id = ?
    `).bind(s,a,t).run();const r=await e.env.DB.prepare(`
      SELECT requested_amount FROM financing_requests WHERE id = ?
    `).bind(t).first(),l={pending:"قيد الانتظار",under_review:"قيد المراجعة",approved:"موافق عليه",rejected:"مرفوض"},i={pending:"info",under_review:"warning",approved:"success",rejected:"error"};return await e.env.DB.prepare(`
      INSERT INTO notifications (user_id, title, message, type, category, related_request_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(1,"تحديث حالة الطلب",`تم تحديث حالة الطلب #${t} إلى: ${l[s]||s}`,i[s]||"info","status_change",t).run(),e.json({success:!0})}catch(t){return console.error("Update status error:",t),e.json({success:!1,error:t.message},500)}});c.post("/api/attachments/upload",async e=>{try{const t=await e.req.formData(),s=t.get("file"),a=t.get("request_id"),r=t.get("attachmentType")||t.get("attachment_type");if(!s)return e.json({success:!1,error:"No file provided"},400);const l=Date.now(),i=Math.random().toString(36).substring(7),o=s.name.split(".").pop(),n=a?`${a}/${r}_${l}.${o}`:`temp/${r}_${l}_${i}.${o}`,d=await s.arrayBuffer();await e.env.ATTACHMENTS.put(n,d,{httpMetadata:{contentType:s.type}});const u=`/api/attachments/view/${n}`;if(a){const m=`${r}_attachment_url`;console.log("📎 Updating attachment:",{requestId:a,attachmentType:r,columnName:m,publicUrl:u});const g=await e.env.DB.prepare(`
        UPDATE financing_requests 
        SET ${m} = ? 
        WHERE id = ?
      `).bind(u,a).run();console.log("✅ Update result:",g)}return e.json({success:!0,url:u,filename:n})}catch(t){return console.error("Upload error:",t),e.json({success:!1,error:t.message},500)}});c.get("/api/attachments/view/:path{.+}",async e=>{try{const t=e.req.param("path"),s=await e.env.ATTACHMENTS.get(t);if(!s)return e.notFound();const a=new Headers;return s.writeHttpMetadata(a),a.set("etag",s.httpEtag),new Response(s.body,{headers:a})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/attachments/delete/:path{.+}",async e=>{try{const t=e.req.param("path");await e.env.ATTACHMENTS.delete(t);const s=t.split("/");if(s.length===2){const a=s[0],r=s[1];let l=null;r.startsWith("id_")?l="id_attachment_url":r.startsWith("salary_")?l="salary_attachment_url":r.startsWith("bank_statement_")?l="bank_statement_attachment_url":r.startsWith("additional_")&&(l="additional_attachment_url"),l&&await e.env.DB.prepare(`
          UPDATE financing_requests 
          SET ${l} = NULL 
          WHERE id = ?
        `).bind(a).run()}return e.json({success:!0})}catch(t){return console.error("Delete error:",t),e.json({success:!1,error:t.message},500)}});c.get("/api/notifications",async e=>{try{const t=e.req.header("Authorization"),s=t==null?void 0:t.replace("Bearer ","");let a=null,r=1;if(s){const n=atob(s).split(":");r=parseInt(n[0]),a=n[1]!=="null"?parseInt(n[1]):null}let l=`
      SELECT 
        n.*,
        fr.requested_amount,
        fr.status as request_status
      FROM notifications n
      LEFT JOIN financing_requests fr ON n.related_request_id = fr.id
      WHERE n.user_id = ?`;a&&(l+=` AND n.tenant_id = ${a}`),l+=`
      ORDER BY n.created_at DESC
      LIMIT 50`;const{results:i}=await e.env.DB.prepare(l).bind(r).all();return e.json({success:!0,data:i})}catch(t){return console.error("Error fetching notifications:",t),e.json({success:!1,error:t.message},500)}});c.get("/api/notifications/unread-count",async e=>{try{const t=e.req.header("Authorization"),s=t==null?void 0:t.replace("Bearer ","");let a=null,r=1;if(s){const n=atob(s).split(":");r=parseInt(n[0]),a=n[1]!=="null"?parseInt(n[1]):null}let l="SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0";a&&(l+=` AND tenant_id = ${a}`);const i=await e.env.DB.prepare(l).bind(r).first();return e.json({success:!0,count:(i==null?void 0:i.count)||0})}catch(t){return console.error("Error fetching unread count:",t),e.json({success:!1,error:t.message},500)}});c.put("/api/notifications/:id/read",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare(`
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
    `).bind(t,1).run(),e.json({success:!0})}catch(t){return console.error("Error deleting notification:",t),e.json({success:!1,error:t.message},500)}});c.post("/api/notifications",async e=>{try{const{user_id:t,title:s,message:a,type:r,category:l,related_request_id:i}=await e.req.json(),o=await e.env.DB.prepare(`
      INSERT INTO notifications (user_id, title, message, type, category, related_request_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(t||1,s,a,r||"info",l||"general",i||null).run();return e.json({success:!0,id:o.meta.last_row_id})}catch(t){return console.error("Error creating notification:",t),e.json({success:!1,error:t.message},500)}});c.get("/api/calculations",async e=>{try{const{results:t}=await e.env.DB.prepare(`
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
    `).all();return e.json({success:!0,data:t})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/calculate",async e=>{try{const{amount:t,duration_months:s,salary:a,bank_id:r,financing_type_id:l,user_id:i,subscription_id:o}=await e.req.json(),n=await e.env.DB.prepare(`
      SELECT rate FROM bank_financing_rates 
      WHERE bank_id = ? AND financing_type_id = ? AND is_active = 1
      LIMIT 1
    `).bind(r,l).first();if(!n)return e.json({success:!1,error:"لا توجد نسبة تمويل متاحة لهذا البنك ونوع التمويل"},400);const d=n.rate,u=d/100/12,m=t*u*Math.pow(1+u,s)/(Math.pow(1+u,s)-1),g=m*s,x=g-t,y=await e.env.DB.prepare(`
      INSERT INTO calculations 
      (user_id, subscription_id, financing_type_id, bank_id, amount, duration_months, salary, rate, monthly_payment, total_payment, total_interest)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(i||null,o||null,l,r,t,s,a,d,m,g,x).run();return e.json({success:!0,data:{id:y.meta.last_row_id,amount:t,duration_months:s,rate:d,monthly_payment:Math.round(m*100)/100,total_payment:Math.round(g*100)/100,total_interest:Math.round(x*100)/100}})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/dashboard/stats",async e=>{try{const t=e.req.header("Authorization"),s=t==null?void 0:t.replace("Bearer ","");let a=null;if(s){const R=atob(s).split(":");a=R[1]!=="null"?parseInt(R[1]):null}let r="SELECT COUNT(*) as count FROM customers",l="SELECT COUNT(*) as count FROM financing_requests",i='SELECT COUNT(*) as count FROM financing_requests WHERE status = "pending"',o='SELECT COUNT(*) as count FROM financing_requests WHERE status = "approved"',n='SELECT COUNT(*) as count FROM subscriptions WHERE status = "active"',d="SELECT COUNT(*) as count FROM users WHERE is_active = 1";a!==null&&(r+=" WHERE tenant_id = ?",l+=" WHERE tenant_id = ?",i+=" AND tenant_id = ?",o+=" AND tenant_id = ?",n+=" AND tenant_id = ?",d+=" AND tenant_id = ?");const u=a!==null?await e.env.DB.prepare(r).bind(a).first():await e.env.DB.prepare(r).first(),m=a!==null?await e.env.DB.prepare(l).bind(a).first():await e.env.DB.prepare(l).first(),g=a!==null?await e.env.DB.prepare(i).bind(a).first():await e.env.DB.prepare(i).first(),x=a!==null?await e.env.DB.prepare(o).bind(a).first():await e.env.DB.prepare(o).first(),y=a!==null?await e.env.DB.prepare(n).bind(a).first():await e.env.DB.prepare(n).first(),_=a!==null?await e.env.DB.prepare(d).bind(a).first():await e.env.DB.prepare(d).first(),v=await e.env.DB.prepare("SELECT COUNT(*) as count FROM banks WHERE is_active = 1").first(),k=await e.env.DB.prepare("SELECT COUNT(*) as count FROM calculations").first();return e.json({success:!0,data:{total_customers:(u==null?void 0:u.count)||0,total_requests:(m==null?void 0:m.count)||0,pending_requests:(g==null?void 0:g.count)||0,approved_requests:(x==null?void 0:x.count)||0,active_subscriptions:(y==null?void 0:y.count)||0,total_calculations:(k==null?void 0:k.count)||0,active_banks:(v==null?void 0:v.count)||0,active_users:(_==null?void 0:_.count)||0}})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/customers/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM financing_requests WHERE customer_id = ?").bind(t).run(),await e.env.DB.prepare("DELETE FROM customers WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف العميل بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/financing-requests/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM financing_requests WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف الطلب بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/banks/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM banks WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف البنك بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/rates/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM bank_financing_rates WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف النسبة بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/subscriptions/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM subscriptions WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف الاشتراك بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/users/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM users WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف المستخدم بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/packages/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM packages WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف الباقة بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/subscription-requests",async e=>{try{const{results:t}=await e.env.DB.prepare(`
      SELECT 
        sr.*,
        p.package_name
      FROM subscription_requests sr
      LEFT JOIN packages p ON sr.package_id = p.id
      ORDER BY sr.created_at DESC
    `).all();return e.json({success:!0,data:t})}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/subscription-requests/:id/status",async e=>{try{const t=e.req.param("id"),{status:s,notes:a}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE subscription_requests 
      SET status = ?, notes = ?
      WHERE id = ?
    `).bind(s,a,t).run(),e.json({success:!0,message:"تم تحديث حالة الطلب بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.delete("/api/subscription-requests/:id",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM subscription_requests WHERE id = ?").bind(t).run(),e.json({success:!0,message:"تم حذف طلب الاشتراك بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/permissions",async e=>{try{const t=await e.env.DB.prepare("SELECT * FROM permissions ORDER BY category, id").all();return e.json({success:!0,data:t.results})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/permissions/by-category",async e=>{try{const s=(await e.env.DB.prepare("SELECT * FROM permissions ORDER BY category, id").all()).results,a={};return s.forEach(r=>{a[r.category]||(a[r.category]=[]),a[r.category].push(r)}),e.json({success:!0,data:a})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/roles/:roleId/permissions",async e=>{try{const t=e.req.param("roleId"),s=await e.env.DB.prepare(`
      SELECT p.* FROM permissions p
      INNER JOIN role_permissions rp ON p.id = rp.permission_id
      WHERE rp.role_id = ?
      ORDER BY p.category, p.id
    `).bind(t).all();return e.json({success:!0,data:s.results})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/users/:userId/permissions",async e=>{try{const t=e.req.param("userId"),s=await e.env.DB.prepare(`
      SELECT p.* FROM permissions p
      INNER JOIN role_permissions rp ON p.id = rp.permission_id
      INNER JOIN users u ON u.role_id = rp.role_id
      WHERE u.id = ?
      ORDER BY p.category, p.id
    `).bind(t).all();return e.json({success:!0,data:s.results})}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/roles/:roleId/permissions",async e=>{try{const t=e.req.param("roleId"),{permission_ids:s}=await e.req.json();await e.env.DB.prepare("DELETE FROM role_permissions WHERE role_id = ?").bind(t).run();for(const a of s)await e.env.DB.prepare("INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)").bind(t,a).run();return e.json({success:!0,message:"تم تحديث صلاحيات الدور بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.post("/api/users/check-permission",async e=>{try{const{user_id:t,permission_key:s}=await e.req.json(),a=await e.env.DB.prepare(`
      SELECT COUNT(*) as has_permission FROM permissions p
      INNER JOIN role_permissions rp ON p.id = rp.permission_id
      INNER JOIN users u ON u.role_id = rp.role_id
      WHERE u.id = ? AND p.permission_key = ?
    `).bind(t,s).first();return e.json({success:!0,has_permission:(a==null?void 0:a.has_permission)>0})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/api/roles",async e=>{try{const t=await e.env.DB.prepare(`
      SELECT r.*, 
             COUNT(rp.permission_id) as permissions_count
      FROM roles r
      LEFT JOIN role_permissions rp ON r.id = rp.role_id
      GROUP BY r.id
      ORDER BY r.id
    `).all();return e.json({success:!0,data:t.results})}catch(t){return e.json({success:!1,error:t.message},500)}});c.put("/api/users/:id",async e=>{try{const t=e.req.param("id"),{full_name:s,email:a,phone:r,role_id:l,is_active:i}=await e.req.json();return await e.env.DB.prepare(`
      UPDATE users 
      SET full_name = ?, email = ?, phone = ?, role_id = ?, is_active = ?
      WHERE id = ?
    `).bind(s,a,r,l,i,t).run(),e.json({success:!0,message:"تم تحديث بيانات المستخدم بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});c.get("/",e=>e.html(ts));c.get("/calculator",e=>e.html(mt));c.get("/calculator-old",e=>e.html(ss));c.get("/c/:tenant/calculator",async e=>{const t=e.req.param("tenant"),s=await e.env.DB.prepare(`
    SELECT * FROM tenants WHERE slug = ? AND status = 'active'
  `).bind(t).first();return s?e.html(mt.replace(/حاسبة التمويل الذكية/g,`حاسبة تمويل ${s.company_name}`).replace("/api/calculator/submit-request",`/api/c/${t}/calculator/submit-request`).replace("<script>",`<script>
        // Tenant information for company-specific calculator
        window.TENANT_NAME = '${s.company_name.replace(/'/g,"\\'")}';
    `).replace("سيتم التواصل معك قريباً من ' + selectedBestOffer.bank.bank_name",`سيتم المراجعة من شركة ${s.company_name.replace(/'/g,"\\'")} وسوف يتم التواصل معك قريباً'`)):e.html(`
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
    `)});c.get("/login",e=>e.html(as));c.get("/forgot-password",e=>e.html(rs));c.get("/packages",e=>e.html(ls));c.get("/subscribe",e=>e.html(is));c.get("/admin",e=>e.html(`
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
  `));c.get("/api/reports/statistics",async e=>{try{const t=e.req.query("from_date"),s=e.req.query("to_date"),a=e.req.header("Authorization"),r=a==null?void 0:a.replace("Bearer ","");let l=null;if(r){const x=atob(r).split(":");l=x[1]!=="null"?parseInt(x[1]):null}let i="1=1";const o=[];l&&(i+=" AND f.tenant_id = ?",o.push(l)),t&&(i+=" AND DATE(f.created_at) >= ?",o.push(t)),s&&(i+=" AND DATE(f.created_at) <= ?",o.push(s));const n=`
      SELECT 
        COUNT(*) as total_requests,
        SUM(CASE WHEN f.status = 'approved' THEN 1 ELSE 0 END) as approved_requests,
        SUM(CASE WHEN f.status = 'pending' THEN 1 ELSE 0 END) as pending_requests,
        SUM(CASE WHEN f.status = 'rejected' THEN 1 ELSE 0 END) as rejected_requests,
        SUM(f.requested_amount) as total_amount
      FROM financing_requests f
      WHERE ${i}
    `,d=await e.env.DB.prepare(n).bind(...o).first(),u=`
      SELECT 
        c.full_name as customer_name,
        COUNT(f.id) as request_count,
        SUM(f.requested_amount) as total_amount,
        MAX(f.created_at) as last_request_date
      FROM financing_requests f
      JOIN customers c ON f.customer_id = c.id
      WHERE ${i}
      GROUP BY c.id
      ORDER BY request_count DESC, total_amount DESC
      LIMIT 10
    `,{results:m}=await e.env.DB.prepare(u).bind(...o).all();return e.json({success:!0,data:{...d,top_customers:m}})}catch(t){return console.error("Reports API error:",t),e.json({success:!1,error:t.message},500)}});c.get("/admin/panel",e=>e.html(gt));c.get("/admin/tenants/add",e=>e.html(`
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
  `));c.get("/admin/tenants/:id/edit",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare(`
      SELECT * FROM tenants WHERE id = ?
    `).bind(t).first();return s?e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>تعديل شركة - ${s.company_name}</title>
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
                      تعديل شركة: ${s.company_name}
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
                                      value="${s.company_name}"
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
                                      value="${s.slug}"
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
                                      <option value="active" ${s.status==="active"?"selected":""}>نشط</option>
                                      <option value="trial" ${s.status==="trial"?"selected":""}>تجريبي</option>
                                      <option value="suspended" ${s.status==="suspended"?"selected":""}>متوقف</option>
                                  </select>
                              </div>
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">عدد المستخدمين الأقصى</label>
                                  <input 
                                      type="number" 
                                      id="max_users"
                                      value="${s.max_users||10}"
                                      min="1"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                              </div>
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">Subdomain (اختياري)</label>
                                  <input 
                                      type="text" 
                                      id="subdomain"
                                      value="${s.subdomain||""}"
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
                                      value="${s.contact_email||""}"
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                  >
                              </div>
                              <div>
                                  <label class="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                                  <input 
                                      type="tel" 
                                      id="contact_phone"
                                      value="${s.contact_phone||""}"
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
    `):e.html("<h1>الشركة غير موجودة</h1>")}catch(t){return e.html(`<h1>خطأ في تحميل الصفحة: ${t.message}</h1>`)}});c.get("/admin/tenants/:id",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare(`
      SELECT * FROM tenants WHERE id = ?
    `).bind(t).first();if(!s)return e.html("<h1>الشركة غير موجودة</h1>");const a=await e.env.DB.prepare(`
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
          <title>عرض شركة - ${s.company_name}</title>
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
                      <a href="/c/${s.slug}/admin" target="_blank" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">
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
                              ${s.company_name}
                          </h1>
                          <p class="text-emerald-100 text-lg">
                              <code class="bg-white/20 px-3 py-1 rounded">${s.slug}</code>
                          </p>
                      </div>
                      <div class="text-right">
                          <span class="inline-block px-6 py-2 bg-white/20 rounded-full text-xl font-bold">
                              ${s.status==="active"?"🟢 نشط":s.status==="trial"?"🟡 تجريبي":"🔴 متوقف"}
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
                              <p class="text-3xl font-bold text-blue-600">${(a==null?void 0:a.total_users)||0}</p>
                              <p class="text-gray-500 text-xs mt-1">من ${s.max_users} مسموح</p>
                          </div>
                          <i class="fas fa-users text-4xl text-blue-200"></i>
                      </div>
                  </div>
                  
                  <div class="bg-white rounded-xl shadow-lg p-6">
                      <div class="flex items-center justify-between">
                          <div>
                              <p class="text-gray-600 text-sm mb-1">العملاء</p>
                              <p class="text-3xl font-bold text-green-600">${(a==null?void 0:a.total_customers)||0}</p>
                          </div>
                          <i class="fas fa-user-friends text-4xl text-green-200"></i>
                      </div>
                  </div>
                  
                  <div class="bg-white rounded-xl shadow-lg p-6">
                      <div class="flex items-center justify-between">
                          <div>
                              <p class="text-gray-600 text-sm mb-1">طلبات التمويل</p>
                              <p class="text-3xl font-bold text-purple-600">${(a==null?void 0:a.total_requests)||0}</p>
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
                              <p class="text-lg font-semibold text-gray-900">${s.company_name}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">Slug</label>
                              <p class="text-lg font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded inline-block">${s.slug}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">Subdomain</label>
                              <p class="text-lg font-mono text-gray-900">${s.subdomain||"-"}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">الحد الأقصى للمستخدمين</label>
                              <p class="text-lg font-semibold text-gray-900">${s.max_users||10} مستخدم</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">البريد الإلكتروني</label>
                              <p class="text-lg text-gray-900">${s.contact_email||"-"}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">رقم الهاتف</label>
                              <p class="text-lg text-gray-900">${s.contact_phone||"-"}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">تاريخ الإنشاء</label>
                              <p class="text-lg text-gray-900">${new Date(s.created_at).toLocaleDateString("ar-SA")}</p>
                          </div>
                          <div>
                              <label class="block text-sm font-medium text-gray-500 mb-1">الحالة</label>
                              <span class="inline-flex px-4 py-2 text-sm font-semibold rounded-full 
                                  ${s.status==="active"?"bg-green-100 text-green-800":s.status==="trial"?"bg-yellow-100 text-yellow-800":"bg-red-100 text-red-800"}">
                                  ${s.status==="active"?"نشط":s.status==="trial"?"تجريبي":"متوقف"}
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
                      <a href="/c/${s.slug}/admin" target="_blank" 
                         class="flex flex-col items-center justify-center p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all">
                          <i class="fas fa-tachometer-alt text-2xl text-emerald-600 mb-2"></i>
                          <span class="text-sm font-medium text-gray-700">لوحة التحكم</span>
                      </a>
                      <a href="/c/${s.slug}/calculator" target="_blank" 
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
    `)}catch(t){return e.html(`<h1>خطأ في تحميل الصفحة: ${t.message}</h1>`)}});c.get("/admin/tenants",e=>e.html(ns));c.get("/admin/tenant-calculators",e=>e.html(os));c.get("/admin/saas-settings",e=>e.html(ds));c.get("/admin/reports",e=>e.html(cs));c.get("/admin/banks",e=>e.html(ps));c.get("/c/:tenant/admin",async e=>{const t=e.req.param("tenant"),s=await e.env.DB.prepare(`
    SELECT * FROM tenants WHERE slug = ? AND status = 'active'
  `).bind(t).first();return s?e.html(gt.replace("لوحة التحكم - نظام حاسبة التمويل",`لوحة التحكم - ${s.company_name}`)):e.html(`
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
  `));c.get("/admin/dashboard",async e=>{var t;try{const s=await e.env.DB.prepare(`
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
    `).all(),r=await e.env.DB.prepare(`
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
    `).all(),l=await e.env.DB.prepare(`
      SELECT 
        status,
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM financing_requests), 2) as percentage
      FROM financing_requests
      GROUP BY status
    `).all(),i=a.results||[],o=r.results||[],n=l.results||[];return e.html(`
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
                  <p class="text-4xl font-bold">${(s==null?void 0:s.total_customers)||0}</p>
                </div>
                <i class="fas fa-users text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-green-100 text-sm mb-1">إجمالي الطلبات</p>
                  <p class="text-4xl font-bold">${(s==null?void 0:s.total_requests)||0}</p>
                </div>
                <i class="fas fa-file-invoice text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-yellow-100 text-sm mb-1">قيد الانتظار</p>
                  <p class="text-4xl font-bold">${(s==null?void 0:s.pending_requests)||0}</p>
                </div>
                <i class="fas fa-clock text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-purple-100 text-sm mb-1">موافق عليها</p>
                  <p class="text-4xl font-bold">${(s==null?void 0:s.approved_requests)||0}</p>
                </div>
                <i class="fas fa-check-circle text-6xl opacity-20"></i>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-red-100 text-sm mb-1">مرفوضة</p>
                  <p class="text-4xl font-bold">${(s==null?void 0:s.rejected_requests)||0}</p>
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
                  <p class="text-2xl font-bold text-gray-800">${parseFloat((s==null?void 0:s.total_requested_amount)||0).toLocaleString("ar-SA")} ر.س</p>
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
                  <p class="text-2xl font-bold text-gray-800">${parseFloat((s==null?void 0:s.total_approved_amount)||0).toLocaleString("ar-SA")} ر.س</p>
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
                  <p class="text-2xl font-bold text-gray-800">${(((s==null?void 0:s.approved_requests)||0)/Math.max(s==null?void 0:s.total_requests,1)*100).toFixed(1)}%</p>
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
                  <p class="text-2xl font-bold text-gray-800">${(parseFloat((s==null?void 0:s.total_requested_amount)||0)/Math.max(s==null?void 0:s.total_requests,1)).toLocaleString("ar-SA",{maximumFractionDigits:0})} ر.س</p>
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
                    <p class="text-xl font-bold mt-1">${((t=o[0])==null?void 0:t.bank_name)||"لا يوجد"}</p>
                  </div>
                  <div class="bg-white/20 rounded-lg p-4">
                    <p class="text-sm opacity-90">الطلبات النشطة</p>
                    <p class="text-xl font-bold mt-1">${((s==null?void 0:s.pending_requests)||0)+((s==null?void 0:s.under_review_requests)||0)}</p>
                  </div>
                  <div class="bg-white/20 rounded-lg p-4">
                    <p class="text-sm opacity-90">معدل النجاح</p>
                    <p class="text-xl font-bold mt-1">${(((s==null?void 0:s.approved_requests)||0)/Math.max(((s==null?void 0:s.approved_requests)||0)+((s==null?void 0:s.rejected_requests)||0),1)*100).toFixed(1)}%</p>
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
                    ${o.map((d,u)=>`
                      <tr class="border-t hover:bg-gray-50">
                        <td class="px-4 py-3">
                          <span class="text-2xl">${u===0?"🥇":u===1?"🥈":u===2?"🥉":(u+1).toString()}</span>
                        </td>
                        <td class="px-4 py-3 font-bold text-gray-800">${d.bank_name}</td>
                        <td class="px-4 py-3 text-blue-600 font-bold">${d.request_count}</td>
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
              ${n.map(d=>{const u={pending:{color:"yellow",icon:"clock",label:"قيد الانتظار"},under_review:{color:"blue",icon:"search",label:"قيد المراجعة"},approved:{color:"green",icon:"check-circle",label:"موافق"},rejected:{color:"red",icon:"times-circle",label:"مرفوض"}}[d.status]||{color:"gray",icon:"question",label:d.status};return`
                  <div class="bg-${u.color}-50 border-2 border-${u.color}-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-2">
                      <i class="fas fa-${u.icon} text-2xl text-${u.color}-600"></i>
                      <span class="text-3xl font-bold text-${u.color}-600">${d.count}</span>
                    </div>
                    <p class="text-sm text-gray-700 font-bold">${u.label}</p>
                    <p class="text-xs text-gray-600">${d.percentage}% من الإجمالي</p>
                  </div>
                `}).join("")}
            </div>
          </div>

        </div>

        <script>
          // Monthly Trend Chart
          const monthlyCtx = document.getElementById('monthlyTrendChart').getContext('2d');
          const monthlyData = ${JSON.stringify(i)};
          
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
          const statusData = ${JSON.stringify(n)};
          
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
  `));c.get("/admin/customers",async e=>{try{const t=await e.env.DB.prepare("SELECT * FROM customers ORDER BY created_at DESC").all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>العملاء</title>
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
                <i class="fas fa-users text-green-600 ml-2"></i>
                العملاء (<span id="totalCount">${t.results.length}</span>)
              </h1>
              
              <div class="flex gap-3">
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
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" id="tableBody">
                ${t.results.map(s=>`
                  <tr class="hover:bg-gray-50" data-name="${s.full_name||""}" data-phone="${s.phone||""}" data-email="${s.email||""}">
                    <td class="px-6 py-4 whitespace-nowrap font-bold text-gray-900">${s.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap font-medium">${s.full_name||"-"}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${s.phone||"-"}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${s.email||"-"}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${new Date(s.created_at).toLocaleDateString("ar-SA")}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                      <div class="flex items-center justify-center gap-2">
                        <a href="/admin/customers/${s.id}/report" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm" title="تقرير العميل الكامل">
                          <i class="fas fa-file-alt"></i> تقرير
                        </a>
                        <a href="/admin/customers/${s.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/customers/${s.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/customers/${s.id}/delete" onclick="return confirm('هل أنت متأكد من حذف هذا العميل؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
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
              ${t.results.map(s=>`['${s.id}', '${s.full_name||"-"}', '${s.phone||"-"}', '${s.email||"-"}', '${s.national_id||"-"}', '${new Date(s.created_at).toLocaleDateString("ar-SA")}']`).join(`,
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
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/requests/:id/edit",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare(`
      SELECT 
        fr.*,
        c.full_name as customer_name,
        c.phone as customer_phone,
        b.bank_name
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      LEFT JOIN banks b ON fr.selected_bank_id = b.id
      WHERE fr.id = ?
    `).bind(t).first();if(!s)return e.html("<h1>الطلب غير موجود</h1>");const a=await e.env.DB.prepare(`
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
                  <p class="text-gray-700"><strong>اسم العميل:</strong> ${s.customer_name||"غير محدد"}</p>
                  <p class="text-gray-700"><strong>رقم الجوال:</strong> ${s.customer_phone||"غير محدد"}</p>
                  <p class="text-gray-700"><strong>البنك:</strong> ${s.bank_name||"غير محدد"}</p>
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
                      value="${s.requested_amount||0}"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">مدة التمويل (بالأشهر)</label>
                    <input 
                      type="number" 
                      id="duration_months"
                      value="${s.duration_months||0}"
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
                      value="${s.salary_at_request||0}"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">الالتزامات الشهرية</label>
                    <input 
                      type="number" 
                      id="monthly_obligations"
                      value="${s.monthly_obligations||0}"
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
                      ${s.id_attachment_url?`
                        <a href="${s.id_attachment_url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
                          <i class="fas fa-external-link-alt ml-1"></i> عرض الملف
                        </a>
                      `:'<span class="text-red-500 text-sm">لم يتم الرفع</span>'}
                    </div>
                    <div>
                      <p class="text-sm text-gray-600 mb-2"><i class="fas fa-file-invoice ml-1"></i> كشف الحساب:</p>
                      ${s.bank_statement_attachment_url?`
                        <a href="${s.bank_statement_attachment_url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
                          <i class="fas fa-external-link-alt ml-1"></i> عرض الملف
                        </a>
                      `:'<span class="text-red-500 text-sm">لم يتم الرفع</span>'}
                    </div>
                    <div class="border-r pr-4">
                      <p class="text-sm text-gray-600 mb-2"><i class="fas fa-money-check ml-1"></i> تعريف الراتب:</p>
                      ${s.salary_attachment_url?`
                        <a href="${s.salary_attachment_url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
                          <i class="fas fa-external-link-alt ml-1"></i> عرض الملف
                        </a>
                      `:'<span class="text-red-500 text-sm">لم يتم الرفع</span>'}
                    </div>
                    <div>
                      <p class="text-sm text-gray-600 mb-2"><i class="fas fa-file-alt ml-1"></i> مرفقات إضافية:</p>
                      ${s.additional_attachment_url?`
                        <a href="${s.additional_attachment_url}" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">
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
                      <option value="pending" ${s.status==="pending"?"selected":""}>قيد الانتظار</option>
                      <option value="under_review" ${s.status==="under_review"?"selected":""}>قيد المراجعة</option>
                      <option value="approved" ${s.status==="approved"?"selected":""}>موافق عليه</option>
                      <option value="rejected" ${s.status==="rejected"?"selected":""}>مرفوض</option>
                    </select>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">الملاحظات</label>
                    <textarea 
                      id="notes"
                      rows="3"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="أضف ملاحظات..."
                    >${s.notes||""}</textarea>
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
    `)}catch(t){return console.error("Edit request page error:",t),e.html(`<h1>خطأ في تحميل الصفحة: ${t.message}</h1>`)}});c.get("/admin/requests",async e=>{try{const t=await e.env.DB.prepare(`
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
      ORDER BY fr.created_at DESC
    `).all();return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>طلبات التمويل</title>
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
                <i class="fas fa-file-invoice text-purple-600 ml-2"></i>
                طلبات التمويل (<span id="totalCount">${t.results.length}</span>)
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
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" id="tableBody">
                ${t.results.map(s=>{var r;const a=s.status==="approved"?"مقبول":s.status==="pending"?"قيد المراجعة":"مرفوض";return`
                  <tr class="hover:bg-gray-50" 
                      data-customer="${s.customer_name||""}" 
                      data-bank="${s.bank_name||""}" 
                      data-status="${a}">
                    <td class="px-6 py-4 whitespace-nowrap font-medium">${s.customer_name||"عميل #"+s.customer_id}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${s.bank_name||"بنك #"+(s.selected_bank_id||"-")}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${(r=s.requested_amount)==null?void 0:r.toLocaleString("ar-SA")} ريال</td>
                    <td class="px-6 py-4 whitespace-nowrap">${s.duration_months} شهر</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 py-1 text-xs rounded-full ${s.status==="approved"?"bg-green-100 text-green-800":s.status==="pending"?"bg-yellow-100 text-yellow-800":"bg-red-100 text-red-800"}">
                        ${a}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">${new Date(s.created_at).toLocaleDateString("ar-SA")}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex gap-2 justify-center">
                        <a href="/admin/requests/${s.id}/report" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-xs transition-all" title="تقرير الطلب الكامل">
                          <i class="fas fa-file-alt"></i> تقرير
                        </a>
                        <a href="/admin/requests/${s.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/requests/${s.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/requests/${s.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs transition-all">
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
              ${t.results.map(s=>{const a=s.status==="approved"?"مقبول":s.status==="pending"?"قيد المراجعة":"مرفوض",r=s.customer_name||`عميل #${s.customer_id}`,l=s.bank_name||`بنك #${s.selected_bank_id||"-"}`;return`['${r}', '${l}', '${s.requested_amount||0}', '${s.duration_months}', '${a}', '${new Date(s.created_at).toLocaleDateString("ar-SA")}']`}).join(`,
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
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/requests/new",async e=>{try{const t=await e.env.DB.prepare("SELECT id, full_name, phone FROM customers ORDER BY full_name").all(),s=await e.env.DB.prepare("SELECT id, bank_name FROM banks WHERE is_active = 1 ORDER BY bank_name").all(),a=await e.env.DB.prepare("SELECT id, type_name FROM financing_types ORDER BY type_name").all();return e.html(`
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
                    ${a.results.map(r=>`
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
                    ${s.results.map(r=>`
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
    `)}catch{return e.html("<h1>خطأ في تحميل الصفحة</h1>")}});c.get("/admin/requests/:id",async e=>{var t,s;try{const a=e.req.param("id"),r=await e.env.DB.prepare(`
      SELECT fr.*, 
             c.full_name as customer_name, c.phone as customer_phone, c.email as customer_email,
             b.bank_name, ft.type_name as financing_type_name
      FROM financing_requests fr
      LEFT JOIN customers c ON fr.customer_id = c.id
      LEFT JOIN banks b ON fr.selected_bank_id = b.id
      LEFT JOIN financing_types ft ON fr.financing_type_id = ft.id
      WHERE fr.id = ?
    `).bind(a).first();return r?e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>عرض طلب التمويل #${a}</title>
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
              <a href="/admin/requests/${a}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-edit ml-1"></i> تعديل
              </a>
              <a href="/admin/requests/${a}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all">
                <i class="fas fa-trash ml-1"></i> حذف
              </a>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <i class="fas fa-file-invoice text-purple-600 ml-3"></i>
              طلب التمويل #${a}
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
                <p class="text-lg text-gray-900">${r.customer_name||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">رقم الجوال</label>
                <p class="text-lg text-gray-900">${r.customer_phone||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">البريد الإلكتروني</label>
                <p class="text-lg text-gray-900">${r.customer_email||"-"}</p>
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
                <p class="text-lg text-gray-900">${r.financing_type_name||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">المبلغ المطلوب</label>
                <p class="text-lg font-bold text-green-600">${((t=r.requested_amount)==null?void 0:t.toLocaleString())||"0"} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">مدة التمويل</label>
                <p class="text-lg text-gray-900">${r.duration_months||"0"} شهر</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الراتب عند الطلب</label>
                <p class="text-lg text-gray-900">${((s=r.salary_at_request)==null?void 0:s.toLocaleString())||"0"} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">البنك المختار</label>
                <p class="text-lg text-gray-900">${r.bank_name||"غير محدد"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحالة</label>
                <p>
                  <span class="px-4 py-2 rounded-full text-sm font-bold ${r.status==="approved"?"bg-green-100 text-green-800":r.status==="pending"?"bg-yellow-100 text-yellow-800":"bg-red-100 text-red-800"}">
                    ${r.status==="approved"?"مقبول":r.status==="pending"?"قيد المراجعة":"مرفوض"}
                  </span>
                </p>
              </div>
              
              ${r.notes?`
                <div class="md:col-span-2 mt-4">
                  <label class="block text-sm font-bold text-gray-600 mb-1">ملاحظات</label>
                  <p class="text-gray-900 bg-gray-50 p-4 rounded">${r.notes}</p>
                </div>
              `:""}
              
              <div class="md:col-span-2 mt-4">
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الإنشاء</label>
                <p class="text-gray-900">${new Date(r.created_at).toLocaleString("ar-SA")}</p>
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
              ${r.id_attachment_url?`
                <div class="border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <i class="fas fa-id-card text-2xl text-blue-600 ml-3"></i>
                      <span class="font-bold text-gray-800">صورة الهوية</span>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">متوفر</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <a href="${r.id_attachment_url}" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="${r.id_attachment_url}" download 
                       class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-download"></i> تنزيل
                    </a>
                    <button onclick="deleteAttachment('${r.id_attachment_url}', 'id')" 
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
              
              ${r.salary_attachment_url?`
                <div class="border-2 border-green-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <i class="fas fa-money-check-alt text-2xl text-green-600 ml-3"></i>
                      <span class="font-bold text-gray-800">كشف الراتب</span>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">متوفر</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <a href="${r.salary_attachment_url}" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="${r.salary_attachment_url}" download 
                       class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-download"></i> تنزيل
                    </a>
                    <button onclick="deleteAttachment('${r.salary_attachment_url}', 'salary')" 
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
              
              ${r.bank_statement_attachment_url?`
                <div class="border-2 border-purple-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <i class="fas fa-file-invoice-dollar text-2xl text-purple-600 ml-3"></i>
                      <span class="font-bold text-gray-800">كشف الحساب البنكي</span>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">متوفر</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <a href="${r.bank_statement_attachment_url}" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="${r.bank_statement_attachment_url}" download 
                       class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-download"></i> تنزيل
                    </a>
                    <button onclick="deleteAttachment('${r.bank_statement_attachment_url}', 'bank_statement')" 
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
              
              ${r.additional_attachment_url?`
                <div class="border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                      <i class="fas fa-file-alt text-2xl text-orange-600 ml-3"></i>
                      <span class="font-bold text-gray-800">مرفق إضافي</span>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">متوفر</span>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <a href="${r.additional_attachment_url}" target="_blank" 
                       class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-eye"></i> عرض
                    </a>
                    <a href="${r.additional_attachment_url}" download 
                       class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition text-center text-sm">
                      <i class="fas fa-download"></i> تنزيل
                    </a>
                    <button onclick="deleteAttachment('${r.additional_attachment_url}', 'additional')" 
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
            
            ${!r.id_attachment_url&&!r.salary_attachment_url&&!r.bank_statement_attachment_url&&!r.additional_attachment_url?`
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
    `):e.html("<h1>الطلب غير موجود</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/customers/:id",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare("SELECT * FROM customers WHERE id = ?").bind(t).first();return s?e.html(`
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
                <p class="text-xl font-bold text-gray-800">#${s.id}</p>
              </div>
              
              <div class="border-r-4 border-green-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">الاسم الكامل</p>
                <p class="text-xl font-bold text-gray-800">${s.name}</p>
              </div>
              
              <div class="border-r-4 border-yellow-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">رقم الهاتف</p>
                <p class="text-xl font-bold text-gray-800">${s.phone||"غير متوفر"}</p>
              </div>
              
              <div class="border-r-4 border-purple-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">البريد الإلكتروني</p>
                <p class="text-xl font-bold text-gray-800">${s.email||"غير متوفر"}</p>
              </div>
              
              <div class="border-r-4 border-red-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">الرقم الوطني</p>
                <p class="text-xl font-bold text-gray-800">${s.national_id||"غير متوفر"}</p>
              </div>
              
              <div class="border-r-4 border-indigo-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">تاريخ التسجيل</p>
                <p class="text-xl font-bold text-gray-800">${new Date(s.created_at).toLocaleDateString("ar-SA")}</p>
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
    `):e.html("<h1>العميل غير موجود</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/customers/:id/edit",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare("SELECT * FROM customers WHERE id = ?").bind(t).first();return s?e.html(`
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
                <input type="text" name="name" value="${s.name}" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
                <input type="tel" name="phone" value="${s.phone||""}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
                <input type="email" name="email" value="${s.email||""}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">الرقم الوطني</label>
                <input type="text" name="national_id" value="${s.national_id||""}" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
  `));c.get("/admin/customers/:id/report",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare(`
      SELECT 
        c.*,
        ft.type_name as financing_type_name,
        b.bank_name as best_bank_name
      FROM customers c
      LEFT JOIN financing_types ft ON c.financing_type_id = ft.id
      LEFT JOIN banks b ON c.best_bank_id = b.id
      WHERE c.id = ?
    `).bind(t).first();if(!s)return e.html("<h1>العميل غير موجود</h1>");const a=s,r=i=>i?new Date(i).toLocaleDateString("ar-SA",{year:"numeric",month:"long",day:"numeric"}):"غير محدد",l=i=>i?i.toLocaleString("ar-SA"):"غير محدد";return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تقرير العميل - ${a.full_name}</title>
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
                  <p class="text-xl font-bold text-gray-800">#${a.id}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-green-100 p-3 rounded-lg">
                  <i class="fas fa-user text-green-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">الاسم الكامل</p>
                  <p class="text-xl font-bold text-gray-800">${a.full_name||"غير محدد"}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <i class="fas fa-phone text-yellow-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">رقم الهاتف</p>
                  <p class="text-xl font-bold text-gray-800" dir="ltr">${a.phone||"غير محدد"}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-envelope text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">البريد الإلكتروني</p>
                  <p class="text-xl font-bold text-gray-800">${a.email||"غير محدد"}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-red-100 p-3 rounded-lg">
                  <i class="fas fa-calendar text-red-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">تاريخ الميلاد</p>
                  <p class="text-xl font-bold text-gray-800">${r(a.birthdate)}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-indigo-100 p-3 rounded-lg">
                  <i class="fas fa-id-badge text-indigo-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">رقم الهوية</p>
                  <p class="text-xl font-bold text-gray-800">${a.national_id&&!a.national_id.startsWith("TEMP-")?a.national_id:"غير محدد"}</p>
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
                  <p class="text-2xl font-bold text-green-600">${l(a.monthly_salary)} ريال</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <i class="fas fa-hand-holding-usd text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">مبلغ التمويل المطلوب</p>
                  <p class="text-2xl font-bold text-blue-600">${l(a.financing_amount)} ريال</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-red-100 p-3 rounded-lg">
                  <i class="fas fa-receipt text-red-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">الالتزامات الشهرية</p>
                  <p class="text-2xl font-bold text-red-600">${l(a.monthly_obligations)} ريال</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-tag text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">نوع التمويل</p>
                  <p class="text-xl font-bold text-purple-600">${a.financing_type_name||"غير محدد"}</p>
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
            
            ${a.best_bank_id?`
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg p-4 shadow">
                  <div class="flex items-start space-x-3 space-x-reverse">
                    <div class="bg-green-100 p-3 rounded-lg">
                      <i class="fas fa-university text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">البنك المختار</p>
                      <p class="text-2xl font-bold text-green-600">${a.best_bank_name||"غير محدد"}</p>
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
                      <p class="text-2xl font-bold text-blue-600">${a.financing_duration_months||"غير محدد"} شهر</p>
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
                      <p class="text-2xl font-bold text-yellow-600">${a.best_rate?a.best_rate+"%":"غير محدد"}</p>
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
                      <p class="text-2xl font-bold text-purple-600">${l(a.monthly_payment)} ريال</p>
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
                      <p class="text-3xl font-bold text-indigo-600">${l(a.total_payment)} ريال</p>
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
                      <p class="text-xl font-bold text-green-600">${r(a.calculation_date)}</p>
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
                  <p class="text-lg font-bold text-gray-800">${r(a.created_at)}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-edit text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">آخر تحديث</p>
                  <p class="text-lg font-bold text-gray-800">${r(a.updated_at)}</p>
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
    `)}catch(t){return console.error("خطأ في عرض تقرير العميل:",t),e.html(`<h1>حدث خطأ: ${t.message}</h1>`)}});c.get("/admin/requests/:id/report",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare(`
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
    `).bind(t).first();if(!s)return e.html("<h1>الطلب غير موجود</h1>");const a=s,r=n=>n?new Date(n).toLocaleDateString("ar-SA",{year:"numeric",month:"long",day:"numeric"}):"غير محدد",l=n=>n?n.toLocaleString("ar-SA"):"غير محدد",i={pending:{text:"قيد المراجعة",color:"yellow",icon:"clock"},approved:{text:"مقبول",color:"green",icon:"check-circle"},rejected:{text:"مرفوض",color:"red",icon:"times-circle"}},o=i[a.status]||i.pending;return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تقرير طلب التمويل - ${a.customer_name}</title>
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
        </style>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-5xl mx-auto p-6">
          <!-- أزرار التحكم -->
          <div class="mb-6 no-print flex justify-between items-center">
            <a href="/admin/requests" class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-arrow-right ml-2"></i>
              العودة لقائمة طلبات التمويل
            </a>
            <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
              <i class="fas fa-print ml-2"></i>
              طباعة التقرير
            </button>
          </div>
          
          <!-- رأس التقرير -->
          <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg p-8 mb-6 report-section">
            <div class="text-center">
              <h1 class="text-4xl font-bold mb-2">
                <i class="fas fa-file-invoice ml-3"></i>
                تقرير طلب التمويل
              </h1>
              <p class="text-xl opacity-90">نظام تمويل - Tamweel Finance</p>
              <p class="text-sm opacity-75 mt-2">رقم الطلب: #${a.id} | تاريخ التقرير: ${r(new Date().toISOString())}</p>
            </div>
          </div>
          
          <!-- حالة الطلب -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6 report-section">
            <div class="flex items-center justify-center">
              <div class="bg-${o.color}-100 border-2 border-${o.color}-300 rounded-lg p-6 text-center">
                <i class="fas fa-${o.icon} text-${o.color}-600 text-5xl mb-3"></i>
                <p class="text-2xl font-bold text-${o.color}-700">حالة الطلب: ${o.text}</p>
                <p class="text-sm text-gray-600 mt-2">تاريخ الطلب: ${r(a.created_at)}</p>
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
                  <p class="text-xl font-bold text-gray-800">${a.customer_name||"غير محدد"}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-green-100 p-3 rounded-lg">
                  <i class="fas fa-phone text-green-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">رقم الهاتف</p>
                  <p class="text-xl font-bold text-gray-800" dir="ltr">${a.customer_phone||"غير محدد"}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-envelope text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">البريد الإلكتروني</p>
                  <p class="text-xl font-bold text-gray-800">${a.customer_email||"غير محدد"}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-red-100 p-3 rounded-lg">
                  <i class="fas fa-calendar text-red-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">تاريخ الميلاد</p>
                  <p class="text-xl font-bold text-gray-800">${r(a.customer_birthdate)}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <i class="fas fa-money-bill-wave text-yellow-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">الراتب الشهري</p>
                  <p class="text-xl font-bold text-yellow-600">${l(a.customer_salary)} ريال</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-indigo-100 p-3 rounded-lg">
                  <i class="fas fa-id-badge text-indigo-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">رقم الهوية</p>
                  <p class="text-xl font-bold text-gray-800">${a.customer_national_id&&!a.customer_national_id.startsWith("TEMP-")?a.customer_national_id:"غير محدد"}</p>
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
                    <p class="text-2xl font-bold text-purple-600">${a.financing_type_name||"غير محدد"}</p>
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
                    <p class="text-2xl font-bold text-blue-600">${l(a.requested_amount)} ريال</p>
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
                    <p class="text-2xl font-bold text-green-600">${a.duration_months||"غير محدد"} شهر</p>
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
                    <p class="text-2xl font-bold text-yellow-600">${a.bank_name||"غير محدد"}</p>
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
                    <p class="text-2xl font-bold text-red-600">${l(a.monthly_obligations)} ريال</p>
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
                    <p class="text-2xl font-bold text-indigo-600">${l(a.monthly_payment)} ريال</p>
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
                  <p class="text-lg font-bold text-gray-800">${r(a.created_at)}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 space-x-reverse">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <i class="fas fa-edit text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-500">آخر تحديث</p>
                  <p class="text-lg font-bold text-gray-800">${r(a.updated_at)}</p>
                </div>
              </div>
              
              ${a.notes?`
              <div class="md:col-span-2">
                <div class="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                  <p class="text-sm text-gray-500 mb-2">ملاحظات</p>
                  <p class="text-gray-700">${a.notes}</p>
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
    `)}catch(t){return console.error("خطأ في عرض تقرير طلب التمويل:",t),e.html(`<h1>حدث خطأ: ${t.message}</h1>`)}});c.post("/api/banks",async e=>{try{const t=await e.req.parseBody();return await e.env.DB.prepare(`
      INSERT INTO banks (bank_name, description, is_active, created_at)
      VALUES (?, ?, 1, datetime('now'))
    `).bind(t.bank_name,t.description||"").run(),e.redirect("/admin/banks")}catch{return e.json({error:"فشل إضافة البنك"},500)}});c.get("/admin/banks/:id",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare("SELECT * FROM banks WHERE id = ?").bind(t).first();return s?e.html(`
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
                <p class="text-xl font-bold text-gray-800">#${s.id}</p>
              </div>
              
              <div class="border-r-4 border-green-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">اسم البنك</p>
                <p class="text-xl font-bold text-gray-800">${s.bank_name}</p>
              </div>
              
              <div class="border-r-4 border-yellow-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">الوصف</p>
                <p class="text-xl font-bold text-gray-800">${s.description||"لا يوجد"}</p>
              </div>
              
              <div class="border-r-4 border-purple-500 pr-4">
                <p class="text-sm text-gray-500 mb-1">الحالة</p>
                <p class="text-xl font-bold ${s.is_active?"text-green-600":"text-red-600"}">
                  ${s.is_active?"نشط":"غير نشط"}
                </p>
              </div>
            </div>
            
            <div class="mt-8 flex gap-4">
              <a href="/admin/banks/${s.id}/edit" 
                 class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold">
                <i class="fas fa-edit ml-2"></i>
                تعديل
              </a>
              <a href="/admin/banks/${s.id}/delete" 
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
    `):e.html("<h1>البنك غير موجود</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/banks/:id/edit",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare("SELECT * FROM banks WHERE id = ?").bind(t).first();return s?e.html(`
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
            
            <form action="/api/banks/${s.id}" method="POST" enctype="application/x-www-form-urlencoded" class="space-y-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">اسم البنك</label>
                <input type="text" name="bank_name" value="${s.bank_name}" required 
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">الوصف</label>
                <textarea name="description" rows="3"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">${s.description||""}</textarea>
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
    `):e.html("<h1>البنك غير موجود</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.post("/api/banks/:id",async e=>{try{const t=e.req.param("id"),s=await e.req.parseBody();return await e.env.DB.prepare(`
      UPDATE banks 
      SET bank_name = ?, description = ?
      WHERE id = ?
    `).bind(s.bank_name,s.description||"",t).run(),e.redirect("/admin/banks")}catch{return e.json({error:"فشل تعديل البنك"},500)}});c.get("/admin/banks/:id/delete",async e=>{try{const t=e.req.param("id");return await e.env.DB.prepare("DELETE FROM banks WHERE id = ?").bind(t).run(),e.redirect("/admin/banks")}catch{return e.html("<h1>خطأ في حذف البنك</h1>")}});c.get("/admin/banks",async e=>{try{const t=await e.env.DB.prepare("SELECT * FROM banks ORDER BY bank_name").all();return e.html(`
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
                ${t.results.map(s=>`
                  <tr class="hover:bg-gray-50" data-name="${s.bank_name||""}" data-code="${s.bank_code||""}">
                    <td class="px-6 py-4 text-sm text-gray-900">${s.id}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <i class="fas fa-university text-yellow-600 ml-2"></i>
                        <span class="text-sm font-bold text-gray-900">${s.bank_name}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${s.description||"لا يوجد"}</td>
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 rounded-full text-xs font-bold ${s.is_active?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}">
                        ${s.is_active?"نشط":"غير نشط"}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex justify-center gap-2">
                        <a href="/admin/banks/${s.id}" 
                           class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/banks/${s.id}/edit" 
                           class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-bold">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/banks/${s.id}/delete" 
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
              ${t.results.map(s=>`['${s.id}', '${s.bank_name}', '${s.description||""}', '${s.is_active?"نشط":"غير نشط"}']`).join(`,
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
                ${t.results.map(s=>`
                  <tr class="hover:bg-gray-50" data-bank="${s.bank_name||""}" data-type="${s.type_name||""}">
                    <td class="px-6 py-4 text-sm text-gray-900">${s.id}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <i class="fas fa-university text-yellow-600 ml-2"></i>
                        <span class="text-sm font-bold text-gray-900">${s.bank_name||"غير محدد"}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${s.type_name||"غير محدد"}</td>
                    <td class="px-6 py-4">
                      <span class="text-lg font-bold text-orange-600">${s.rate||0}%</span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${s.min_amount?s.min_amount.toLocaleString():"0"} ريال</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${s.max_amount?s.max_amount.toLocaleString():"0"} ريال</td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2 justify-center">
                        <a href="/admin/rates/${s.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/rates/${s.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/rates/${s.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs transition-all">
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
              ${t.results.map(s=>`['${s.id}', '${s.bank_name||"غير محدد"}', '${s.type_name||"غير محدد"}', '${s.rate||0}%', '${s.min_amount||0}', '${s.max_amount||0}']`).join(`,
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
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/rates/new",async e=>{try{const t=await e.env.DB.prepare("SELECT id, bank_name FROM banks WHERE is_active = 1 ORDER BY bank_name").all(),s=await e.env.DB.prepare("SELECT id, type_name FROM financing_types ORDER BY type_name").all();return e.html(`
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
                    ${t.results.map(a=>`
                      <option value="${a.id}">${a.bank_name}</option>
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
                    ${s.results.map(a=>`
                      <option value="${a.id}">${a.type_name}</option>
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
    `)}catch{return e.html("<h1>خطأ في تحميل الصفحة</h1>")}});c.get("/admin/rates/:id",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare(`
      SELECT fr.*, b.bank_name, ft.type_name
      FROM bank_financing_rates fr
      LEFT JOIN banks b ON fr.bank_id = b.id
      LEFT JOIN financing_types ft ON fr.financing_type_id = ft.id
      WHERE fr.id = ?
    `).bind(t).first();return s?e.html(`
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
                <p class="text-lg text-gray-900">${s.bank_name||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">نوع التمويل</label>
                <p class="text-lg text-gray-900">${s.type_name||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">نسبة الفائدة</label>
                <p class="text-3xl font-bold text-orange-600">${s.rate||0}%</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحالة</label>
                <p>
                  <span class="px-4 py-2 rounded-full text-sm font-bold ${s.is_active?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}">
                    ${s.is_active?"نشط":"غير نشط"}
                  </span>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحد الأدنى للمبلغ</label>
                <p class="text-lg text-gray-900">${s.min_amount?s.min_amount.toLocaleString():"غير محدد"} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحد الأقصى للمبلغ</label>
                <p class="text-lg text-gray-900">${s.max_amount?s.max_amount.toLocaleString():"غير محدد"} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحد الأدنى للمدة</label>
                <p class="text-lg text-gray-900">${s.min_duration||"غير محدد"} شهر</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحد الأقصى للمدة</label>
                <p class="text-lg text-gray-900">${s.max_duration||"غير محدد"} شهر</p>
              </div>
              
              <div class="md:col-span-2 mt-4">
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الإنشاء</label>
                <p class="text-gray-900">${new Date(s.created_at).toLocaleString("ar-SA")}</p>
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
                ${t.results.map(s=>{const a=s.status==="active"?"نشط":s.status==="expired"?"منتهي":"معلق";return`
                  <tr class="hover:bg-gray-50" 
                      data-company="${s.company_name||""}" 
                      data-package="${s.package_name||""}" 
                      data-status="${a}">
                    <td class="px-6 py-4 text-sm text-gray-900">${s.id}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <i class="fas fa-building text-teal-600 ml-2"></i>
                        <span class="text-sm font-bold text-gray-900">${s.company_name}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${s.package_name||"غير محدد"}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${s.start_date||"-"}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${s.end_date||"-"}</td>
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 rounded-full text-xs font-bold ${s.status==="active"?"bg-green-100 text-green-800":s.status==="expired"?"bg-red-100 text-red-800":"bg-yellow-100 text-yellow-800"}">
                        ${a}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">${s.calculations_used||0}</td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2 justify-center">
                        <a href="/admin/subscriptions/${s.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-eye"></i> عرض
                        </a>
                        <a href="/admin/subscriptions/${s.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-xs transition-all">
                          <i class="fas fa-edit"></i> تعديل
                        </a>
                        <a href="/admin/subscriptions/${s.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-xs transition-all">
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
              ${t.results.map(s=>{const a=s.status==="active"?"نشط":s.status==="expired"?"منتهي":"معلق";return`['${s.id}', '${s.company_name}', '${s.package_name||"غير محدد"}', '${s.start_date||"-"}', '${s.end_date||"-"}', '${a}', '${s.calculations_used||0}']`}).join(`,
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
                    ${t.results.map(s=>`
                      <option value="${s.id}" data-duration="${s.duration_months}">
                        ${s.package_name} - ${s.price} ريال - ${s.duration_months} شهر
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
    `)}catch{return e.html("<h1>خطأ في تحميل الصفحة</h1>")}});c.get("/admin/subscriptions/:id",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare(`
      SELECT s.*, p.package_name, p.price
      FROM subscriptions s
      LEFT JOIN packages p ON s.package_id = p.id
      WHERE s.id = ?
    `).bind(t).first();return s?e.html(`
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
                <p class="text-2xl font-bold text-gray-900">${s.company_name}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الباقة</label>
                <p class="text-lg text-gray-900">${s.package_name||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">السعر</label>
                <p class="text-lg font-bold text-green-600">${s.price?s.price.toLocaleString():"0"} ريال</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ البداية</label>
                <p class="text-lg text-gray-900">${s.start_date||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الانتهاء</label>
                <p class="text-lg text-gray-900">${s.end_date||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحالة</label>
                <p>
                  <span class="px-4 py-2 rounded-full text-sm font-bold ${s.status==="active"?"bg-green-100 text-green-800":s.status==="expired"?"bg-red-100 text-red-800":"bg-yellow-100 text-yellow-800"}">
                    ${s.status==="active"?"نشط":s.status==="expired"?"منتهي":"معلق"}
                  </span>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحسابات المستخدمة</label>
                <p class="text-lg text-gray-900">${s.calculations_used||0}</p>
              </div>
              
              <div class="md:col-span-2 mt-4">
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الإنشاء</label>
                <p class="text-gray-900">${new Date(s.created_at).toLocaleString("ar-SA")}</p>
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
            ${t.results.map(s=>`
              <div class="package-card bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-t-4 ${s.package_name.includes("الذهبية")?"border-yellow-500":s.package_name.includes("الاحترافية")?"border-purple-500":"border-blue-500"}" data-name="${s.package_name||""}" data-price="${s.price||0}">
                <div class="text-center mb-4">
                  <i class="fas fa-box text-5xl ${s.package_name.includes("الذهبية")?"text-yellow-500":s.package_name.includes("الاحترافية")?"text-purple-500":"text-blue-500"} mb-3"></i>
                  <h3 class="text-2xl font-bold text-gray-800">${s.package_name}</h3>
                  <p class="text-sm text-gray-600 mt-2">${s.description||""}</p>
                </div>
                
                <div class="border-t border-b border-gray-200 py-4 my-4">
                  <div class="text-center">
                    <span class="text-4xl font-bold text-gray-800">${s.price}</span>
                    <span class="text-gray-600"> ريال</span>
                    <p class="text-sm text-gray-500 mt-1">لمدة ${s.duration_months} شهر</p>
                  </div>
                </div>
                
                <div class="space-y-3 mb-4">
                  <div class="flex items-center text-sm">
                    <i class="fas fa-check-circle text-green-500 ml-2"></i>
                    <span><strong>${s.max_calculations}</strong> حساب</span>
                  </div>
                  <div class="flex items-center text-sm">
                    <i class="fas fa-users text-blue-500 ml-2"></i>
                    <span>حتى <strong>${s.max_users}</strong> مستخدمين</span>
                  </div>
                  <div class="flex items-center text-sm">
                    <i class="fas fa-${s.is_active?"check":"times"}-circle ${s.is_active?"text-green-500":"text-red-500"} ml-2"></i>
                    <span>${s.is_active?"نشط":"غير نشط"}</span>
                  </div>
                </div>
                
                <div class="pt-4 border-t border-gray-200 flex gap-2 justify-center">
                  <a href="/admin/packages/${s.id}" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-all">
                    <i class="fas fa-eye"></i> عرض
                  </a>
                  <a href="/admin/packages/${s.id}/edit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm transition-all">
                    <i class="fas fa-edit"></i> تعديل
                  </a>
                  <a href="/admin/packages/${s.id}/delete" onclick="return confirm('هل أنت متأكد من الحذف؟')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-all">
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
              ${t.results.map(s=>`['${s.id}', '${s.package_name}', '${s.description||""}', '${s.price}', '${s.duration_months}', '${s.max_calculations}', '${s.max_users}', '${s.is_active?"نشط":"غير نشط"}']`).join(`,
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
  `));c.get("/admin/packages/:id",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare("SELECT * FROM packages WHERE id = ?").bind(t).first();return s?e.html(`
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
          
          <div class="bg-white rounded-xl shadow-lg p-8 border-t-4 ${s.package_name.includes("الذهبية")?"border-yellow-500":s.package_name.includes("الاحترافية")?"border-purple-500":"border-blue-500"}">
            <div class="text-center mb-8">
              <i class="fas fa-box text-6xl ${s.package_name.includes("الذهبية")?"text-yellow-500":s.package_name.includes("الاحترافية")?"text-purple-500":"text-blue-500"} mb-4"></i>
              <h1 class="text-4xl font-bold text-gray-800">${s.package_name}</h1>
              ${s.description?`<p class="text-gray-600 mt-2">${s.description}</p>`:""}
            </div>
            
            <div class="border-t border-b border-gray-200 py-6 my-6">
              <div class="text-center">
                <span class="text-5xl font-bold text-gray-800">${s.price}</span>
                <span class="text-2xl text-gray-600"> ريال</span>
                <p class="text-gray-500 mt-2">لمدة ${s.duration_months} شهر</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="flex items-center">
                <i class="fas fa-calculator text-orange-600 text-2xl ml-3"></i>
                <div>
                  <p class="text-sm text-gray-600">عدد الحسابات</p>
                  <p class="text-2xl font-bold text-gray-800">${s.max_calculations||"غير محدود"}</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <i class="fas fa-users text-blue-600 text-2xl ml-3"></i>
                <div>
                  <p class="text-sm text-gray-600">عدد المستخدمين</p>
                  <p class="text-2xl font-bold text-gray-800">${s.max_users||"غير محدود"}</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <i class="fas fa-${s.is_active?"check":"times"}-circle text-2xl ml-3 ${s.is_active?"text-green-600":"text-red-600"}"></i>
                <div>
                  <p class="text-sm text-gray-600">الحالة</p>
                  <p class="text-xl font-bold ${s.is_active?"text-green-600":"text-red-600"}">
                    ${s.is_active?"نشط":"غير نشط"}
                  </p>
                </div>
              </div>
              
              <div class="flex items-center">
                <i class="fas fa-calendar text-purple-600 text-2xl ml-3"></i>
                <div>
                  <p class="text-sm text-gray-600">تاريخ الإنشاء</p>
                  <p class="text-sm text-gray-800">${new Date(s.created_at).toLocaleDateString("ar-SA")}</p>
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
                    <div class="flex gap-2 justify-center">
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
    `)}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/users/new",async e=>{try{const t=await e.env.DB.prepare("SELECT id, role_name FROM roles ORDER BY id").all(),s=await e.env.DB.prepare('SELECT id, company_name FROM subscriptions WHERE status = "active" ORDER BY company_name').all();return e.html(`
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
                    ${t.results.map(a=>`
                      <option value="${a.id}">${a.role_name}</option>
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
                    ${s.results.map(a=>`
                      <option value="${a.id}">${a.company_name}</option>
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
    `)}catch{return e.html("<h1>خطأ في تحميل الصفحة</h1>")}});c.get("/admin/users/:id",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare(`
      SELECT u.*, r.role_name, s.company_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN subscriptions s ON u.subscription_id = s.id
      WHERE u.id = ?
    `).bind(t).first();return s?e.html(`
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
                ${s.full_name?s.full_name.charAt(0).toUpperCase():"U"}
              </div>
              <div>
                <h1 class="text-3xl font-bold text-gray-800">${s.full_name||"غير محدد"}</h1>
                <p class="text-gray-600">@${s.username}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">اسم المستخدم</label>
                <p class="text-lg text-gray-900">${s.username}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الاسم الكامل</label>
                <p class="text-lg text-gray-900">${s.full_name||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">البريد الإلكتروني</label>
                <p class="text-lg text-gray-900">${s.email||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">رقم الجوال</label>
                <p class="text-lg text-gray-900">${s.phone||"-"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الدور</label>
                <p class="text-lg text-gray-900">
                  <span class="px-3 py-1 rounded-full ${s.role_name==="مدير"?"bg-red-100 text-red-800":s.role_name==="محاسب"?"bg-blue-100 text-blue-800":"bg-gray-100 text-gray-800"}">
                    ${s.role_name||"-"}
                  </span>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الشركة</label>
                <p class="text-lg text-gray-900">${s.company_name||"غير مرتبط"}</p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">الحالة</label>
                <p>
                  <span class="px-4 py-2 rounded-full text-sm font-bold ${s.is_active?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}">
                    ${s.is_active?"نشط":"غير نشط"}
                  </span>
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-600 mb-1">تاريخ الإنشاء</label>
                <p class="text-gray-900">${new Date(s.created_at).toLocaleString("ar-SA")}</p>
              </div>
              
              ${s.last_login?`
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-gray-600 mb-1">آخر تسجيل دخول</label>
                  <p class="text-gray-900">${new Date(s.last_login).toLocaleString("ar-SA")}</p>
                </div>
              `:""}
            </div>
          </div>
        </div>
      </body>
      </html>
    `):e.html("<h1>المستخدم غير موجود</h1>")}catch{return e.html("<h1>خطأ في تحميل البيانات</h1>")}});c.get("/admin/users/:id/permissions",async e=>{try{const t=e.req.param("id"),s=await e.env.DB.prepare(`
      SELECT u.*, r.role_name 
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?
    `).bind(t).first();if(!s)return e.html("<h1>المستخدم غير موجود</h1>");const a=await e.env.DB.prepare(`
      SELECT * FROM permissions ORDER BY category, id
    `).all(),l=(await e.env.DB.prepare(`
      SELECT p.id, p.permission_key
      FROM permissions p
      JOIN role_permissions rp ON p.id = rp.permission_id
      WHERE rp.role_id = ?
    `).bind(s.role_id).all()).results.map(n=>n.id),i={};a.results.forEach(n=>{i[n.category]||(i[n.category]=[]),i[n.category].push({...n,hasPermission:l.includes(n.id)})});const o={dashboard:"لوحة التحكم",customers:"العملاء",requests:"طلبات التمويل",banks:"البنوك",rates:"النسب التمويلية",packages:"الباقات",subscriptions:"الاشتراكات",users:"المستخدمين",calculator:"الحاسبة",reports:"التقارير"};return e.html(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إدارة صلاحيات ${s.full_name}</title>
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
                  <span><i class="fas fa-user ml-1"></i> ${s.full_name}</span>
                  <span><i class="fas fa-envelope ml-1"></i> ${s.email}</span>
                  <span><i class="fas fa-shield-alt ml-1"></i> ${s.role_name}</span>
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
            <input type="hidden" name="role_id" value="${s.role_id}">
            
            ${Object.keys(i).map(n=>`
              <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4 border-b-2 border-indigo-600 pb-2">
                  <i class="fas fa-folder text-indigo-600 ml-2"></i>
                  ${o[n]||n}
                </h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  ${i[n].map(d=>`
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
              <div class="flex gap-4 justify-center">
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
    `)}catch(t){return e.html("<h1>خطأ في تحميل البيانات: "+t.message+"</h1>")}});c.post("/api/users/:id/permissions",async e=>{try{const t=e.req.param("id"),{role_id:s,permission_ids:a}=await e.req.json();if(await e.env.DB.prepare(`
      DELETE FROM role_permissions WHERE role_id = ?
    `).bind(s).run(),a&&a.length>0)for(const r of a)await e.env.DB.prepare(`
          INSERT OR IGNORE INTO role_permissions (role_id, permission_id)
          VALUES (?, ?)
        `).bind(s,r).run();return e.json({success:!0,message:"تم تحديث الصلاحيات بنجاح"})}catch(t){return e.json({success:!1,error:t.message},500)}});const We=new ut,ms=Object.assign({"/src/index.tsx":c});let bt=!1;for(const[,e]of Object.entries(ms))e&&(We.all("*",t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),We.notFound(t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),bt=!0);if(!bt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{We as default};
