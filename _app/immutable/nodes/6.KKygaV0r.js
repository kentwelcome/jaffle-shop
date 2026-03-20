import{s as Z,d as _,i as u,a as W,b as m,c as N,h as ee,e as w,f as Q,g as q,j as h,k as D,l as Y,m as te,o as se,n as ae,p as re,q as X,r as oe,t as ne,u as ie}from"../chunks/scheduler.7QtDo1Mt.js";import{S as le,i as _e,d as H,t as g,a as U,c as de,m as F,b as O,e as I,g as ce}from"../chunks/index.BW94giu7.js";import{D as ue,e as fe,s as me,Q as Ee,p as pe,C as x,a as P,r as G,b as Te}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.tlMkA3ix.js";import{w as Ae}from"../chunks/entry.BlAwyduK.js";import{h as z,p as Le}from"../chunks/setTrackProxy.DjIbdjlZ.js";import{p as Ne}from"../chunks/stores.DBWcTMLh.js";import{Q as he}from"../chunks/QueryViewer.BlK1Oyc9.js";function we(E){let s,n=d.title+"",e;return{c(){s=D("h1"),e=ie(n),this.h()},l(a){s=w(a,"H1",{class:!0});var o=oe(s);e=ne(o,n),o.forEach(_),this.h()},h(){m(s,"class","title")},m(a,o){u(a,s,o),W(s,e)},p:X,d(a){a&&_(s)}}}function De(E){return{c(){this.h()},l(s){this.h()},h(){document.title="Evidence"},m:X,p:X,d:X}}function Re(E){let s,n,e,a,o;return document.title=s=d.title,{c(){n=h(),e=D("meta"),a=h(),o=D("meta"),this.h()},l(t){n=N(t),e=w(t,"META",{property:!0,content:!0}),a=N(t),o=w(t,"META",{name:!0,content:!0}),this.h()},h(){var t,i;m(e,"property","og:title"),m(e,"content",((t=d.og)==null?void 0:t.title)??d.title),m(o,"name","twitter:title"),m(o,"content",((i=d.og)==null?void 0:i.title)??d.title)},m(t,i){u(t,n,i),u(t,e,i),u(t,a,i),u(t,o,i)},p(t,i){i&0&&s!==(s=d.title)&&(document.title=s)},d(t){t&&(_(n),_(e),_(a),_(o))}}}function Se(E){var o,t;let s,n,e=(d.description||((o=d.og)==null?void 0:o.description))&&Ce(),a=((t=d.og)==null?void 0:t.image)&&Me();return{c(){e&&e.c(),s=h(),a&&a.c(),n=Q()},l(i){e&&e.l(i),s=N(i),a&&a.l(i),n=Q()},m(i,p){e&&e.m(i,p),u(i,s,p),a&&a.m(i,p),u(i,n,p)},p(i,p){var T,S;(d.description||(T=d.og)!=null&&T.description)&&e.p(i,p),(S=d.og)!=null&&S.image&&a.p(i,p)},d(i){i&&(_(s),_(n)),e&&e.d(i),a&&a.d(i)}}}function Ce(E){let s,n,e,a,o;return{c(){s=D("meta"),n=h(),e=D("meta"),a=h(),o=D("meta"),this.h()},l(t){s=w(t,"META",{name:!0,content:!0}),n=N(t),e=w(t,"META",{property:!0,content:!0}),a=N(t),o=w(t,"META",{name:!0,content:!0}),this.h()},h(){var t,i,p;m(s,"name","description"),m(s,"content",d.description??((t=d.og)==null?void 0:t.description)),m(e,"property","og:description"),m(e,"content",((i=d.og)==null?void 0:i.description)??d.description),m(o,"name","twitter:description"),m(o,"content",((p=d.og)==null?void 0:p.description)??d.description)},m(t,i){u(t,s,i),u(t,n,i),u(t,e,i),u(t,a,i),u(t,o,i)},p:X,d(t){t&&(_(s),_(n),_(e),_(a),_(o))}}}function Me(E){let s,n,e;return{c(){s=D("meta"),n=h(),e=D("meta"),this.h()},l(a){s=w(a,"META",{property:!0,content:!0}),n=N(a),e=w(a,"META",{name:!0,content:!0}),this.h()},h(){var a,o;m(s,"property","og:image"),m(s,"content",P((a=d.og)==null?void 0:a.image)),m(e,"name","twitter:image"),m(e,"content",P((o=d.og)==null?void 0:o.image))},m(a,o){u(a,s,o),u(a,n,o),u(a,e,o)},p:X,d(a){a&&(_(s),_(n),_(e))}}}function K(E){let s,n;return s=new he({props:{queryID:"freshness",queryResult:E[0]}}),{c(){I(s.$$.fragment)},l(e){O(s.$$.fragment,e)},m(e,a){F(s,e,a),n=!0},p(e,a){const o={};a&1&&(o.queryResult=e[0]),s.$set(o)},i(e){n||(U(s.$$.fragment,e),n=!0)},o(e){g(s.$$.fragment,e),n=!1},d(e){H(s,e)}}}function be(E){let s,n,e,a,o,t,i,p,T,S;return s=new x({props:{id:"source_table",title:"Source Table"}}),e=new x({props:{id:"date_column",title:"Date Column"}}),o=new x({props:{id:"latest_date",title:"Latest Date"}}),i=new x({props:{id:"days_since_latest",title:"Days Since Latest"}}),T=new x({props:{id:"status",title:"Status"}}),{c(){I(s.$$.fragment),n=h(),I(e.$$.fragment),a=h(),I(o.$$.fragment),t=h(),I(i.$$.fragment),p=h(),I(T.$$.fragment)},l(l){O(s.$$.fragment,l),n=N(l),O(e.$$.fragment,l),a=N(l),O(o.$$.fragment,l),t=N(l),O(i.$$.fragment,l),p=N(l),O(T.$$.fragment,l)},m(l,f){F(s,l,f),u(l,n,f),F(e,l,f),u(l,a,f),F(o,l,f),u(l,t,f),F(i,l,f),u(l,p,f),F(T,l,f),S=!0},p:X,i(l){S||(U(s.$$.fragment,l),U(e.$$.fragment,l),U(o.$$.fragment,l),U(i.$$.fragment,l),U(T.$$.fragment,l),S=!0)},o(l){g(s.$$.fragment,l),g(e.$$.fragment,l),g(o.$$.fragment,l),g(i.$$.fragment,l),g(T.$$.fragment,l),S=!1},d(l){l&&(_(n),_(a),_(t),_(p)),H(s,l),H(e,l),H(o,l),H(i,l),H(T,l)}}}function ye(E){let s,n,e,a,o,t,i='<a href="#data-freshness">Data Freshness</a>',p,T,S='Shows the most recent record date in each raw source table. If a source shows <strong class="markdown">Stale</strong>, the data hasn&#39;t been updated in over 90 days — check the ingestion pipeline or upstream data provider.',l,f,C='<li class="markdown"><strong class="markdown">Fresh</strong> — Latest record is within the last 90 days</li> <li class="markdown"><strong class="markdown">Stale</strong> — Latest record is older than 90 days, needs investigation</li> <li class="markdown"><strong class="markdown">Static seed</strong> — Data loaded from CSV seed files, not expected to change</li> <li class="markdown"><strong class="markdown">Linked to orders</strong> — No independent date column, freshness follows raw_orders</li>',M,b,R,v='<a href="#source-freshness">Source Freshness</a>',L,y,V,$=typeof d<"u"&&d.title&&d.hide_title!==!0&&we();function J(r,c){return typeof d<"u"&&d.title?Re:De}let j=J()(E),k=typeof d=="object"&&Se(),A=E[0]&&K(E);return y=new ue({props:{data:E[0],$$slots:{default:[be]},$$scope:{ctx:E}}}),{c(){$&&$.c(),s=h(),j.c(),n=D("meta"),e=D("meta"),k&&k.c(),a=Q(),o=h(),t=D("h1"),t.innerHTML=i,p=h(),T=D("p"),T.innerHTML=S,l=h(),f=D("ul"),f.innerHTML=C,M=h(),A&&A.c(),b=h(),R=D("h2"),R.innerHTML=v,L=h(),I(y.$$.fragment),this.h()},l(r){$&&$.l(r),s=N(r);const c=ee("svelte-2igo1p",document.head);j.l(c),n=w(c,"META",{name:!0,content:!0}),e=w(c,"META",{name:!0,content:!0}),k&&k.l(c),a=Q(),c.forEach(_),o=N(r),t=w(r,"H1",{class:!0,id:!0,"data-svelte-h":!0}),q(t)!=="svelte-9keuc9"&&(t.innerHTML=i),p=N(r),T=w(r,"P",{class:!0,"data-svelte-h":!0}),q(T)!=="svelte-1wuzr0o"&&(T.innerHTML=S),l=N(r),f=w(r,"UL",{class:!0,"data-svelte-h":!0}),q(f)!=="svelte-jxwes4"&&(f.innerHTML=C),M=N(r),A&&A.l(r),b=N(r),R=w(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),q(R)!=="svelte-1cl7gw2"&&(R.innerHTML=v),L=N(r),O(y.$$.fragment,r),this.h()},h(){m(n,"name","twitter:card"),m(n,"content","summary_large_image"),m(e,"name","twitter:site"),m(e,"content","@evidence_dev"),m(t,"class","markdown"),m(t,"id","data-freshness"),m(T,"class","markdown"),m(f,"class","markdown"),m(R,"class","markdown"),m(R,"id","source-freshness")},m(r,c){$&&$.m(r,c),u(r,s,c),j.m(document.head,null),W(document.head,n),W(document.head,e),k&&k.m(document.head,null),W(document.head,a),u(r,o,c),u(r,t,c),u(r,p,c),u(r,T,c),u(r,l,c),u(r,f,c),u(r,M,c),A&&A.m(r,c),u(r,b,c),u(r,R,c),u(r,L,c),F(y,r,c),V=!0},p(r,[c]){typeof d<"u"&&d.title&&d.hide_title!==!0&&$.p(r,c),j.p(r,c),typeof d=="object"&&k.p(r,c),r[0]?A?(A.p(r,c),c&1&&U(A,1)):(A=K(r),A.c(),U(A,1),A.m(b.parentNode,b)):A&&(ce(),g(A,1,1,()=>{A=null}),de());const B={};c&1&&(B.data=r[0]),c&262144&&(B.$$scope={dirty:c,ctx:r}),y.$set(B)},i(r){V||(U(A),U(y.$$.fragment,r),V=!0)},o(r){g(A),g(y.$$.fragment,r),V=!1},d(r){r&&(_(s),_(o),_(t),_(p),_(T),_(l),_(f),_(M),_(b),_(R),_(L)),$&&$.d(r),j.d(r),_(n),_(e),k&&k.d(r),_(a),A&&A.d(r),H(y,r)}}}const d={title:"Data Freshness"};function Ue(E,s,n){let e,a;Y(E,Ne,L=>n(7,e=L)),Y(E,G,L=>n(13,a=L));let{data:o}=s,{data:t={},customFormattingSettings:i,__db:p,inputs:T}=o;te(G,a="bb93918625ac532179813bde4e9c035e",a);let S=fe(Ae(T));se(S.subscribe(L=>T=L)),ae(Te,{getCustomFormats:()=>i.customFormats||[]});const l=(L,y)=>Le(p.query,L,{query_name:y});me(l),e.params,re(()=>!0);let f={initialData:void 0,initialError:void 0},C=z`SELECT
    'raw_orders' as source_table,
    'ordered_at' as date_column,
    MAX(ordered_at)::DATE as latest_date,
    CURRENT_DATE - MAX(ordered_at)::DATE as days_since_latest,
    CASE WHEN MAX(ordered_at)::DATE < CURRENT_DATE - INTERVAL '90 days' THEN 'Stale' ELSE 'Fresh' END as status
FROM jaffle_shop.raw_orders
UNION ALL
SELECT 'raw_customers', 'N/A (static seed)', NULL, NULL, 'Static seed'
UNION ALL
SELECT
    'raw_stores',
    'opened_at',
    MAX(opened_at)::DATE,
    CURRENT_DATE - MAX(opened_at)::DATE,
    CASE WHEN MAX(opened_at)::DATE < CURRENT_DATE - INTERVAL '90 days' THEN 'Stale' ELSE 'Fresh' END
FROM jaffle_shop.raw_stores
UNION ALL
SELECT 'raw_items', 'N/A (linked to orders)', NULL, NULL, 'Linked to orders'
ORDER BY source_table`,M=`SELECT
    'raw_orders' as source_table,
    'ordered_at' as date_column,
    MAX(ordered_at)::DATE as latest_date,
    CURRENT_DATE - MAX(ordered_at)::DATE as days_since_latest,
    CASE WHEN MAX(ordered_at)::DATE < CURRENT_DATE - INTERVAL '90 days' THEN 'Stale' ELSE 'Fresh' END as status
FROM jaffle_shop.raw_orders
UNION ALL
SELECT 'raw_customers', 'N/A (static seed)', NULL, NULL, 'Static seed'
UNION ALL
SELECT
    'raw_stores',
    'opened_at',
    MAX(opened_at)::DATE,
    CURRENT_DATE - MAX(opened_at)::DATE,
    CASE WHEN MAX(opened_at)::DATE < CURRENT_DATE - INTERVAL '90 days' THEN 'Stale' ELSE 'Fresh' END
FROM jaffle_shop.raw_stores
UNION ALL
SELECT 'raw_items', 'N/A (linked to orders)', NULL, NULL, 'Linked to orders'
ORDER BY source_table`;t.freshness_data&&(t.freshness_data instanceof Error?f.initialError=t.freshness_data:f.initialData=t.freshness_data,t.freshness_columns&&(f.knownColumns=t.freshness_columns));let b,R=!1;const v=Ee.createReactive({callback:L=>{n(0,b=L)},execFn:l},{id:"freshness",...f});return v(M,{noResolve:C,...f}),globalThis[Symbol.for("freshness")]={get value(){return b}},E.$$set=L=>{"data"in L&&n(1,o=L.data)},E.$$.update=()=>{E.$$.dirty&2&&n(2,{data:t={},customFormattingSettings:i,__db:p}=o,t),E.$$.dirty&4&&pe.set(Object.keys(t).length>0),E.$$.dirty&128&&e.params,E.$$.dirty&120&&(C||!R?C||(v(M,{noResolve:C,...f}),n(6,R=!0)):v(M,{noResolve:C}))},n(4,C=z`SELECT
    'raw_orders' as source_table,
    'ordered_at' as date_column,
    MAX(ordered_at)::DATE as latest_date,
    CURRENT_DATE - MAX(ordered_at)::DATE as days_since_latest,
    CASE WHEN MAX(ordered_at)::DATE < CURRENT_DATE - INTERVAL '90 days' THEN 'Stale' ELSE 'Fresh' END as status
FROM jaffle_shop.raw_orders
UNION ALL
SELECT 'raw_customers', 'N/A (static seed)', NULL, NULL, 'Static seed'
UNION ALL
SELECT
    'raw_stores',
    'opened_at',
    MAX(opened_at)::DATE,
    CURRENT_DATE - MAX(opened_at)::DATE,
    CASE WHEN MAX(opened_at)::DATE < CURRENT_DATE - INTERVAL '90 days' THEN 'Stale' ELSE 'Fresh' END
FROM jaffle_shop.raw_stores
UNION ALL
SELECT 'raw_items', 'N/A (linked to orders)', NULL, NULL, 'Linked to orders'
ORDER BY source_table`),n(5,M=`SELECT
    'raw_orders' as source_table,
    'ordered_at' as date_column,
    MAX(ordered_at)::DATE as latest_date,
    CURRENT_DATE - MAX(ordered_at)::DATE as days_since_latest,
    CASE WHEN MAX(ordered_at)::DATE < CURRENT_DATE - INTERVAL '90 days' THEN 'Stale' ELSE 'Fresh' END as status
FROM jaffle_shop.raw_orders
UNION ALL
SELECT 'raw_customers', 'N/A (static seed)', NULL, NULL, 'Static seed'
UNION ALL
SELECT
    'raw_stores',
    'opened_at',
    MAX(opened_at)::DATE,
    CURRENT_DATE - MAX(opened_at)::DATE,
    CASE WHEN MAX(opened_at)::DATE < CURRENT_DATE - INTERVAL '90 days' THEN 'Stale' ELSE 'Fresh' END
FROM jaffle_shop.raw_stores
UNION ALL
SELECT 'raw_items', 'N/A (linked to orders)', NULL, NULL, 'Linked to orders'
ORDER BY source_table`),[b,o,t,f,C,M,R,e]}class ve extends le{constructor(s){super(),_e(this,s,Ue,ye,Z,{data:1})}}export{ve as component};
