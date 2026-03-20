import{s as fe,d as o,i as p,a as ee,b as E,c as H,h as de,e as q,f as te,g as Q,j as N,k as L,l as ue,m as ye,o as He,n as Ne,p as he,q as P,r as Te,t as qe,u as Le}from"../chunks/scheduler.7QtDo1Mt.js";import{S as be,i as ve,d as B,t as $,a as R,c as ae,m as Y,b as j,e as U,g as le}from"../chunks/index.BW94giu7.js";import{D as Re,e as ge,s as we,Q as re,p as Ie,C as J,a as _e,r as oe,b as $e}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.tlMkA3ix.js";import{w as Ce}from"../chunks/entry.BlAwyduK.js";import{h as Z,p as We}from"../chunks/setTrackProxy.DjIbdjlZ.js";import{p as ke}from"../chunks/stores.DBWcTMLh.js";import{Q as me}from"../chunks/QueryViewer.BlK1Oyc9.js";import{B as Ke}from"../chunks/BarChart.D5UBQUIT.js";function xe(m){let s,u=c.title+"",e;return{c(){s=L("h1"),e=Le(u),this.h()},l(n){s=q(n,"H1",{class:!0});var a=Te(s);e=qe(a,u),a.forEach(o),this.h()},h(){E(s,"class","title")},m(n,a){p(n,s,a),ee(s,e)},p:P,d(n){n&&o(s)}}}function Se(m){return{c(){this.h()},l(s){this.h()},h(){document.title="Evidence"},m:P,p:P,d:P}}function Me(m){let s,u,e,n,a;return document.title=s=c.title,{c(){u=N(),e=L("meta"),n=N(),a=L("meta"),this.h()},l(i){u=H(i),e=q(i,"META",{property:!0,content:!0}),n=H(i),a=q(i,"META",{name:!0,content:!0}),this.h()},h(){var i,l;E(e,"property","og:title"),E(e,"content",((i=c.og)==null?void 0:i.title)??c.title),E(a,"name","twitter:title"),E(a,"content",((l=c.og)==null?void 0:l.title)??c.title)},m(i,l){p(i,u,l),p(i,e,l),p(i,n,l),p(i,a,l)},p(i,l){l&0&&s!==(s=c.title)&&(document.title=s)},d(i){i&&(o(u),o(e),o(n),o(a))}}}function Oe(m){var a,i;let s,u,e=(c.description||((a=c.og)==null?void 0:a.description))&&De(),n=((i=c.og)==null?void 0:i.image)&&Fe();return{c(){e&&e.c(),s=N(),n&&n.c(),u=te()},l(l){e&&e.l(l),s=H(l),n&&n.l(l),u=te()},m(l,f){e&&e.m(l,f),p(l,s,f),n&&n.m(l,f),p(l,u,f)},p(l,f){var r,b;(c.description||(r=c.og)!=null&&r.description)&&e.p(l,f),(b=c.og)!=null&&b.image&&n.p(l,f)},d(l){l&&(o(s),o(u)),e&&e.d(l),n&&n.d(l)}}}function De(m){let s,u,e,n,a;return{c(){s=L("meta"),u=N(),e=L("meta"),n=N(),a=L("meta"),this.h()},l(i){s=q(i,"META",{name:!0,content:!0}),u=H(i),e=q(i,"META",{property:!0,content:!0}),n=H(i),a=q(i,"META",{name:!0,content:!0}),this.h()},h(){var i,l,f;E(s,"name","description"),E(s,"content",c.description??((i=c.og)==null?void 0:i.description)),E(e,"property","og:description"),E(e,"content",((l=c.og)==null?void 0:l.description)??c.description),E(a,"name","twitter:description"),E(a,"content",((f=c.og)==null?void 0:f.description)??c.description)},m(i,l){p(i,s,l),p(i,u,l),p(i,e,l),p(i,n,l),p(i,a,l)},p:P,d(i){i&&(o(s),o(u),o(e),o(n),o(a))}}}function Fe(m){let s,u,e;return{c(){s=L("meta"),u=N(),e=L("meta"),this.h()},l(n){s=q(n,"META",{property:!0,content:!0}),u=H(n),e=q(n,"META",{name:!0,content:!0}),this.h()},h(){var n,a;E(s,"property","og:image"),E(s,"content",_e((n=c.og)==null?void 0:n.image)),E(e,"name","twitter:image"),E(e,"content",_e((a=c.og)==null?void 0:a.image))},m(n,a){p(n,s,a),p(n,u,a),p(n,e,a)},p:P,d(n){n&&(o(s),o(u),o(e))}}}function pe(m){let s,u;return s=new me({props:{queryID:"tests",queryResult:m[0]}}),{c(){U(s.$$.fragment)},l(e){j(s.$$.fragment,e)},m(e,n){Y(s,e,n),u=!0},p(e,n){const a={};n&1&&(a.queryResult=e[0]),s.$set(a)},i(e){u||(R(s.$$.fragment,e),u=!0)},o(e){$(s.$$.fragment,e),u=!1},d(e){B(s,e)}}}function ce(m){let s,u;return s=new me({props:{queryID:"by_type",queryResult:m[1]}}),{c(){U(s.$$.fragment)},l(e){j(s.$$.fragment,e)},m(e,n){Y(s,e,n),u=!0},p(e,n){const a={};n&2&&(a.queryResult=e[1]),s.$set(a)},i(e){u||(R(s.$$.fragment,e),u=!0)},o(e){$(s.$$.fragment,e),u=!1},d(e){B(s,e)}}}function Ae(m){let s,u,e,n,a,i,l,f;return s=new J({props:{id:"test_name",title:"Test"}}),e=new J({props:{id:"test_type",title:"Type"}}),a=new J({props:{id:"status",title:"Status"}}),l=new J({props:{id:"execution_time",title:"Duration (s)",fmt:"0.000"}}),{c(){U(s.$$.fragment),u=N(),U(e.$$.fragment),n=N(),U(a.$$.fragment),i=N(),U(l.$$.fragment)},l(r){j(s.$$.fragment,r),u=H(r),j(e.$$.fragment,r),n=H(r),j(a.$$.fragment,r),i=H(r),j(l.$$.fragment,r)},m(r,b){Y(s,r,b),p(r,u,b),Y(e,r,b),p(r,n,b),Y(a,r,b),p(r,i,b),Y(l,r,b),f=!0},p:P,i(r){f||(R(s.$$.fragment,r),R(e.$$.fragment,r),R(a.$$.fragment,r),R(l.$$.fragment,r),f=!0)},o(r){$(s.$$.fragment,r),$(e.$$.fragment,r),$(a.$$.fragment,r),$(l.$$.fragment,r),f=!1},d(r){r&&(o(u),o(n),o(i)),B(s,r),B(e,r),B(a,r),B(l,r)}}}function Be(m){let s,u,e,n,a,i,l='<a href="#test-coverage">Test Coverage</a>',f,r,b="All dbt tests from the latest build, grouped by type. Use this to understand how well our models are tested and spot any failing tests.",D,T,W='<li class="markdown"><strong class="markdown">not_null</strong> — Column must not have NULL values</li> <li class="markdown"><strong class="markdown">unique</strong> — Column values must be unique</li> <li class="markdown"><strong class="markdown">relationships</strong> — Foreign key references must exist in the parent table</li> <li class="markdown"><strong class="markdown">accepted_values</strong> — Column values must be within an allowed set</li> <li class="markdown"><strong class="markdown">expression_is_true</strong> — Custom SQL expression must evaluate to true</li>',k,K,x,g,S='<a href="#coverage-by-test-type">Coverage by Test Type</a>',w,v,G="Green = passing, Red = failing. If any red appears, scroll down to find the specific failing test.",F,I,h,C,ie='<a href="#all-tests">All Tests</a>',X,A,z,M=typeof c<"u"&&c.title&&c.hide_title!==!0&&xe();function Ee(t,_){return typeof c<"u"&&c.title?Me:Se}let V=Ee()(m),O=typeof c=="object"&&Oe(),d=m[0]&&pe(m),y=m[1]&&ce(m);return I=new Ke({props:{data:m[1],x:"test_type",y:["passing","failing"],type:"stacked",colorPalette:["#22c55e","#ef4444"]}}),A=new Re({props:{data:m[0],rows:"50",$$slots:{default:[Ae]},$$scope:{ctx:m}}}),{c(){M&&M.c(),s=N(),V.c(),u=L("meta"),e=L("meta"),O&&O.c(),n=te(),a=N(),i=L("h1"),i.innerHTML=l,f=N(),r=L("p"),r.textContent=b,D=N(),T=L("ul"),T.innerHTML=W,k=N(),d&&d.c(),K=N(),y&&y.c(),x=N(),g=L("h2"),g.innerHTML=S,w=N(),v=L("p"),v.textContent=G,F=N(),U(I.$$.fragment),h=N(),C=L("h2"),C.innerHTML=ie,X=N(),U(A.$$.fragment),this.h()},l(t){M&&M.l(t),s=H(t);const _=de("svelte-2igo1p",document.head);V.l(_),u=q(_,"META",{name:!0,content:!0}),e=q(_,"META",{name:!0,content:!0}),O&&O.l(_),n=te(),_.forEach(o),a=H(t),i=q(t,"H1",{class:!0,id:!0,"data-svelte-h":!0}),Q(i)!=="svelte-1d3qbpy"&&(i.innerHTML=l),f=H(t),r=q(t,"P",{class:!0,"data-svelte-h":!0}),Q(r)!=="svelte-1ycm0bs"&&(r.textContent=b),D=H(t),T=q(t,"UL",{class:!0,"data-svelte-h":!0}),Q(T)!=="svelte-14pl67u"&&(T.innerHTML=W),k=H(t),d&&d.l(t),K=H(t),y&&y.l(t),x=H(t),g=q(t,"H2",{class:!0,id:!0,"data-svelte-h":!0}),Q(g)!=="svelte-rr9pqv"&&(g.innerHTML=S),w=H(t),v=q(t,"P",{class:!0,"data-svelte-h":!0}),Q(v)!=="svelte-86v0ib"&&(v.textContent=G),F=H(t),j(I.$$.fragment,t),h=H(t),C=q(t,"H2",{class:!0,id:!0,"data-svelte-h":!0}),Q(C)!=="svelte-1fwa3pk"&&(C.innerHTML=ie),X=H(t),j(A.$$.fragment,t),this.h()},h(){E(u,"name","twitter:card"),E(u,"content","summary_large_image"),E(e,"name","twitter:site"),E(e,"content","@evidence_dev"),E(i,"class","markdown"),E(i,"id","test-coverage"),E(r,"class","markdown"),E(T,"class","markdown"),E(g,"class","markdown"),E(g,"id","coverage-by-test-type"),E(v,"class","markdown"),E(C,"class","markdown"),E(C,"id","all-tests")},m(t,_){M&&M.m(t,_),p(t,s,_),V.m(document.head,null),ee(document.head,u),ee(document.head,e),O&&O.m(document.head,null),ee(document.head,n),p(t,a,_),p(t,i,_),p(t,f,_),p(t,r,_),p(t,D,_),p(t,T,_),p(t,k,_),d&&d.m(t,_),p(t,K,_),y&&y.m(t,_),p(t,x,_),p(t,g,_),p(t,w,_),p(t,v,_),p(t,F,_),Y(I,t,_),p(t,h,_),p(t,C,_),p(t,X,_),Y(A,t,_),z=!0},p(t,[_]){typeof c<"u"&&c.title&&c.hide_title!==!0&&M.p(t,_),V.p(t,_),typeof c=="object"&&O.p(t,_),t[0]?d?(d.p(t,_),_&1&&R(d,1)):(d=pe(t),d.c(),R(d,1),d.m(K.parentNode,K)):d&&(le(),$(d,1,1,()=>{d=null}),ae()),t[1]?y?(y.p(t,_),_&2&&R(y,1)):(y=ce(t),y.c(),R(y,1),y.m(x.parentNode,x)):y&&(le(),$(y,1,1,()=>{y=null}),ae());const ne={};_&2&&(ne.data=t[1]),I.$set(ne);const se={};_&1&&(se.data=t[0]),_&16777216&&(se.$$scope={dirty:_,ctx:t}),A.$set(se)},i(t){z||(R(d),R(y),R(I.$$.fragment,t),R(A.$$.fragment,t),z=!0)},o(t){$(d),$(y),$(I.$$.fragment,t),$(A.$$.fragment,t),z=!1},d(t){t&&(o(s),o(a),o(i),o(f),o(r),o(D),o(T),o(k),o(K),o(x),o(g),o(w),o(v),o(F),o(h),o(C),o(X)),M&&M.d(t),V.d(t),o(u),o(e),O&&O.d(t),o(n),d&&d.d(t),y&&y.d(t),B(I,t),B(A,t)}}}const c={title:"Test Coverage"};function Ye(m,s,u){let e,n;ue(m,ke,h=>u(12,e=h)),ue(m,oe,h=>u(18,n=h));let{data:a}=s,{data:i={},customFormattingSettings:l,__db:f,inputs:r}=a;ye(oe,n="44723554d7022e1510f73a8274b1d7e0",n);let b=ge(Ce(r));He(b.subscribe(h=>r=h)),Ne($e,{getCustomFormats:()=>l.customFormats||[]});const D=(h,C)=>We(f.query,h,{query_name:C});we(D),e.params,he(()=>!0);let T={initialData:void 0,initialError:void 0},W=Z`SELECT
    unique_id,
    status,
    execution_time,
    name as test_name,
    CASE
        WHEN unique_id LIKE '%not_null%' THEN 'not_null'
        WHEN unique_id LIKE '%unique%' THEN 'unique'
        WHEN unique_id LIKE '%relationships%' THEN 'relationships'
        WHEN unique_id LIKE '%expression_is_true%' THEN 'expression_is_true'
        WHEN unique_id LIKE '%accepted_values%' THEN 'accepted_values'
        ELSE 'other'
    END as test_type
FROM jaffle_shop.run_results
WHERE node_type = 'test'
ORDER BY test_type, test_name`,k=`SELECT
    unique_id,
    status,
    execution_time,
    name as test_name,
    CASE
        WHEN unique_id LIKE '%not_null%' THEN 'not_null'
        WHEN unique_id LIKE '%unique%' THEN 'unique'
        WHEN unique_id LIKE '%relationships%' THEN 'relationships'
        WHEN unique_id LIKE '%expression_is_true%' THEN 'expression_is_true'
        WHEN unique_id LIKE '%accepted_values%' THEN 'accepted_values'
        ELSE 'other'
    END as test_type
FROM jaffle_shop.run_results
WHERE node_type = 'test'
ORDER BY test_type, test_name`;i.tests_data&&(i.tests_data instanceof Error?T.initialError=i.tests_data:T.initialData=i.tests_data,i.tests_columns&&(T.knownColumns=i.tests_columns));let K,x=!1;const g=re.createReactive({callback:h=>{u(0,K=h)},execFn:D},{id:"tests",...T});g(k,{noResolve:W,...T}),globalThis[Symbol.for("tests")]={get value(){return K}};let S={initialData:void 0,initialError:void 0},w=Z`SELECT
    test_type,
    count(test_type) as total,
    sum(case when status = 'success' then 1 else 0 end) as passing,
    sum(case when status != 'success' then 1 else 0 end) as failing
FROM (SELECT
    unique_id,
    status,
    execution_time,
    name as test_name,
    CASE
        WHEN unique_id LIKE '%not_null%' THEN 'not_null'
        WHEN unique_id LIKE '%unique%' THEN 'unique'
        WHEN unique_id LIKE '%relationships%' THEN 'relationships'
        WHEN unique_id LIKE '%expression_is_true%' THEN 'expression_is_true'
        WHEN unique_id LIKE '%accepted_values%' THEN 'accepted_values'
        ELSE 'other'
    END as test_type
FROM jaffle_shop.run_results
WHERE node_type = 'test'
ORDER BY test_type, test_name)
GROUP BY test_type
ORDER BY test_type`,v=`SELECT
    test_type,
    count(test_type) as total,
    sum(case when status = 'success' then 1 else 0 end) as passing,
    sum(case when status != 'success' then 1 else 0 end) as failing
FROM (SELECT
    unique_id,
    status,
    execution_time,
    name as test_name,
    CASE
        WHEN unique_id LIKE '%not_null%' THEN 'not_null'
        WHEN unique_id LIKE '%unique%' THEN 'unique'
        WHEN unique_id LIKE '%relationships%' THEN 'relationships'
        WHEN unique_id LIKE '%expression_is_true%' THEN 'expression_is_true'
        WHEN unique_id LIKE '%accepted_values%' THEN 'accepted_values'
        ELSE 'other'
    END as test_type
FROM jaffle_shop.run_results
WHERE node_type = 'test'
ORDER BY test_type, test_name)
GROUP BY test_type
ORDER BY test_type`;i.by_type_data&&(i.by_type_data instanceof Error?S.initialError=i.by_type_data:S.initialData=i.by_type_data,i.by_type_columns&&(S.knownColumns=i.by_type_columns));let G,F=!1;const I=re.createReactive({callback:h=>{u(1,G=h)},execFn:D},{id:"by_type",...S});return I(v,{noResolve:w,...S}),globalThis[Symbol.for("by_type")]={get value(){return G}},m.$$set=h=>{"data"in h&&u(2,a=h.data)},m.$$.update=()=>{m.$$.dirty&4&&u(3,{data:i={},customFormattingSettings:l,__db:f}=a,i),m.$$.dirty&8&&Ie.set(Object.keys(i).length>0),m.$$.dirty&4096&&e.params,m.$$.dirty&240&&(W||!x?W||(g(k,{noResolve:W,...T}),u(7,x=!0)):g(k,{noResolve:W})),m.$$.dirty&3840&&(w||!F?w||(I(v,{noResolve:w,...S}),u(11,F=!0)):I(v,{noResolve:w}))},u(5,W=Z`SELECT
    unique_id,
    status,
    execution_time,
    name as test_name,
    CASE
        WHEN unique_id LIKE '%not_null%' THEN 'not_null'
        WHEN unique_id LIKE '%unique%' THEN 'unique'
        WHEN unique_id LIKE '%relationships%' THEN 'relationships'
        WHEN unique_id LIKE '%expression_is_true%' THEN 'expression_is_true'
        WHEN unique_id LIKE '%accepted_values%' THEN 'accepted_values'
        ELSE 'other'
    END as test_type
FROM jaffle_shop.run_results
WHERE node_type = 'test'
ORDER BY test_type, test_name`),u(6,k=`SELECT
    unique_id,
    status,
    execution_time,
    name as test_name,
    CASE
        WHEN unique_id LIKE '%not_null%' THEN 'not_null'
        WHEN unique_id LIKE '%unique%' THEN 'unique'
        WHEN unique_id LIKE '%relationships%' THEN 'relationships'
        WHEN unique_id LIKE '%expression_is_true%' THEN 'expression_is_true'
        WHEN unique_id LIKE '%accepted_values%' THEN 'accepted_values'
        ELSE 'other'
    END as test_type
FROM jaffle_shop.run_results
WHERE node_type = 'test'
ORDER BY test_type, test_name`),u(9,w=Z`SELECT
    test_type,
    count(test_type) as total,
    sum(case when status = 'success' then 1 else 0 end) as passing,
    sum(case when status != 'success' then 1 else 0 end) as failing
FROM (SELECT
    unique_id,
    status,
    execution_time,
    name as test_name,
    CASE
        WHEN unique_id LIKE '%not_null%' THEN 'not_null'
        WHEN unique_id LIKE '%unique%' THEN 'unique'
        WHEN unique_id LIKE '%relationships%' THEN 'relationships'
        WHEN unique_id LIKE '%expression_is_true%' THEN 'expression_is_true'
        WHEN unique_id LIKE '%accepted_values%' THEN 'accepted_values'
        ELSE 'other'
    END as test_type
FROM jaffle_shop.run_results
WHERE node_type = 'test'
ORDER BY test_type, test_name)
GROUP BY test_type
ORDER BY test_type`),u(10,v=`SELECT
    test_type,
    count(test_type) as total,
    sum(case when status = 'success' then 1 else 0 end) as passing,
    sum(case when status != 'success' then 1 else 0 end) as failing
FROM (SELECT
    unique_id,
    status,
    execution_time,
    name as test_name,
    CASE
        WHEN unique_id LIKE '%not_null%' THEN 'not_null'
        WHEN unique_id LIKE '%unique%' THEN 'unique'
        WHEN unique_id LIKE '%relationships%' THEN 'relationships'
        WHEN unique_id LIKE '%expression_is_true%' THEN 'expression_is_true'
        WHEN unique_id LIKE '%accepted_values%' THEN 'accepted_values'
        ELSE 'other'
    END as test_type
FROM jaffle_shop.run_results
WHERE node_type = 'test'
ORDER BY test_type, test_name)
GROUP BY test_type
ORDER BY test_type`),[K,G,a,i,T,W,k,x,S,w,v,F,e]}class Ze extends be{constructor(s){super(),ve(this,s,Ye,Be,fe,{data:2})}}export{Ze as component};
