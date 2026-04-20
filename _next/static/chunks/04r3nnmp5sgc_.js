(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,40281,(e,t,r)=>{t.exports=e.r(99753)},75732,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o={formatUrl:function(){return s},formatWithValidation:function(){return c},urlObjectKeys:function(){return l}};for(var a in o)Object.defineProperty(r,a,{enumerable:!0,get:o[a]});let n=e.r(39258)._(e.r(70770)),i=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:r}=e,o=e.protocol||"",a=e.pathname||"",s=e.hash||"",l=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),l&&"object"==typeof l&&(l=String(n.urlQueryToSearchParams(l)));let d=e.search||l&&`?${l}`||"";return o&&!o.endsWith(":")&&(o+=":"),e.slashes||(!o||i.test(o))&&!1!==c?(c="//"+(c||""),a&&"/"!==a[0]&&(a="/"+a)):c||(c=""),s&&"#"!==s[0]&&(s="#"+s),d&&"?"!==d[0]&&(d="?"+d),a=a.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${o}${c}${a}${d}${s}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return s(e)}},41664,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return a}});let o=e.r(39804);function a(e,t){let r=(0,o.useRef)(null),a=(0,o.useRef)(null);return(0,o.useCallback)(o=>{if(null===o){let e=r.current;e&&(r.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(r.current=n(e,o)),t&&(a.current=n(t,o))},[e,t])}function n(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},46842,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return n}});let o=e.r(75233),a=e.r(64586);function n(e){if(!(0,o.isAbsoluteUrl)(e))return!0;try{let t=(0,o.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,a.hasBasePath)(r.pathname)}catch(e){return!1}}},46905,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return o}});let o=e=>{}},86607,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o={default:function(){return b},useLinkStatus:function(){return S}};for(var a in o)Object.defineProperty(r,a,{enumerable:!0,get:o[a]});let n=e.r(39258),i=e.r(27707),s=n._(e.r(39804)),l=e.r(75732),c=e.r(36407),d=e.r(41664),u=e.r(75233),f=e.r(13946);e.r(12666);let g=e.r(16373),h=e.r(60672),p=e.r(46842),m=e.r(32114);function b(t){var r,o;let a,n,b,[S,x]=(0,s.useOptimistic)(h.IDLE_LINK_STATUS),w=(0,s.useRef)(null),{href:v,as:k,children:j,prefetch:$=null,passHref:N,replace:A,shallow:O,scroll:P,onClick:I,onMouseEnter:T,onTouchStart:C,legacyBehavior:_=!1,onNavigate:D,transitionTypes:M,ref:E,unstable_dynamicOnHover:R,...K}=t;a=j,_&&("string"==typeof a||"number"==typeof a)&&(a=(0,i.jsx)("a",{children:a}));let J=s.default.useContext(c.AppRouterContext),L=!1!==$,Q=!1!==$?null===(o=$)||"auto"===o?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,B="string"==typeof(r=k||v)?r:(0,l.formatUrl)(r);if(_){if(a?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});n=s.default.Children.only(a)}let F=_?n&&"object"==typeof n&&n.ref:E,H=s.default.useCallback(e=>(null!==J&&(w.current=(0,h.mountLinkInstance)(e,B,J,Q,L,x)),()=>{w.current&&((0,h.unmountLinkForCurrentNavigation)(w.current),w.current=null),(0,h.unmountPrefetchableInstance)(e)}),[L,B,J,Q,x]),U={ref:(0,d.useMergedRef)(H,F),onClick(t){_||"function"!=typeof I||I(t),_&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(t),!J||t.defaultPrevented||function(t,r,o,a,n,i,l){if("u">typeof window){let c,{nodeName:d}=t.currentTarget;if("A"===d.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,p.isLocalURL)(r)){a&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),i){let e=!1;if(i({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:u}=e.r(51605);s.default.startTransition(()=>{u(r,a?"replace":"push",!1===n?g.ScrollBehavior.NoScroll:g.ScrollBehavior.Default,o.current,l)})}}(t,B,w,A,P,D,M)},onMouseEnter(e){_||"function"!=typeof T||T(e),_&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),J&&L&&(0,h.onNavigationIntent)(e.currentTarget,!0===R)},onTouchStart:function(e){_||"function"!=typeof C||C(e),_&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),J&&L&&(0,h.onNavigationIntent)(e.currentTarget,!0===R)}};return(0,u.isAbsoluteUrl)(B)?U.href=B:_&&!N&&("a"!==n.type||"href"in n.props)||(U.href=(0,f.addBasePath)(B)),b=_?s.default.cloneElement(n,U):(0,i.jsx)("a",{...K,...U,children:a}),(0,i.jsx)(y.Provider,{value:S,children:b})}e.r(46905);let y=(0,s.createContext)(h.IDLE_LINK_STATUS),S=()=>(0,s.useContext)(y);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},32710,44453,15970,e=>{"use strict";var t=e.i(27707),r=e.i(86607),o=e.i(40281),a=e.i(39804);let n="history";function i(){return new Promise((e,t)=>{let r=indexedDB.open("hookflow",1);r.onerror=()=>t(r.error),r.onsuccess=()=>e(r.result),r.onupgradeneeded=()=>{let e=r.result;e.objectStoreNames.contains(n)||e.createObjectStore(n,{keyPath:"id"}).createIndex("createdAt","createdAt")}})}async function s(e){try{let t=await i(),r=`h_${Date.now()}`,o={id:r,createdAt:new Date().toISOString(),...e};return new Promise((e,a)=>{let i=t.transaction(n,"readwrite").objectStore(n).put(o);i.onsuccess=()=>e(r),i.onerror=()=>a(i.error)})}catch(e){return console.error("[History] Save failed:",e),""}}async function l(){try{let e=await i();return new Promise((t,r)=>{let o=e.transaction(n,"readonly").objectStore(n).getAll();o.onsuccess=()=>{let e=o.result.sort((e,t)=>new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime());t(e)},o.onerror=()=>r(o.error)})}catch(e){return console.error("[History] Get failed:",e),[]}}async function c(e){try{let t=await i();return new Promise((r,o)=>{let a=t.transaction(n,"readwrite");a.objectStore(n).delete(e),a.oncomplete=()=>r(),a.onerror=()=>o(a.error)})}catch(e){console.error("[History] Delete failed:",e)}}async function d(){try{let e=await i();return new Promise((t,r)=>{let o=e.transaction(n,"readwrite");o.objectStore(n).clear(),o.oncomplete=()=>t(),o.onerror=()=>r(o.error)})}catch(e){console.error("[History] Clear failed:",e)}}function u(e){return localStorage.getItem(`hookflow_${e}`)||""}function f(){return u("anthropic_key")?"anthropic":"none"}function g(){return!!u("gemini_key")}async function h(e,t,r={}){let o=u("anthropic_key");if(!o)throw Error("Anthropic API 키를 설정 페이지에서 입력해주세요.");let a={model:"claude-haiku-4-5-20251001",max_tokens:r.max||2048,temperature:r.temp??.7,system:e,messages:[{role:"user",content:t}]};r.webSearch&&(a.tools=[{type:"web_search_20250305",name:"web_search",max_uses:5}]);let n=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":o,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify(a)});if(!n.ok){let e=await n.text();if(429===n.status){console.warn("[Claude] Rate limit - 20초 후 자동 재시도"),await new Promise(e=>setTimeout(e,2e4));let e=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":o,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify(a)});if(e.ok){let t=await e.json(),r="";for(let e of t.content||[])"text"===e.type&&(r+=e.text);return r}throw Error("분당 요청 한도(Rate Limit) 초과. 1~2분 후 다시 시도해주세요.")}if(529===n.status||503===n.status)throw Error("Claude 서버가 일시적으로 과부하 상태입니다. 잠시 후 재시도해주세요.");throw Error(`Claude 오류(${n.status}): ${e.slice(0,150)}`)}let i=await n.json(),s="";for(let e of i.content||[])"text"===e.type&&(s+=e.text);return s}async function p(e){let t=u("gemini_key");if(!t)return null;try{let r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:e}]}],generationConfig:{responseModalities:["TEXT","IMAGE"]}})});if(!r.ok){let e=await r.text();return console.error("[NanoBanana] Gemini",r.status,e.slice(0,300)),null}let o=await r.json();for(let e of o?.candidates?.[0]?.content?.parts||[])if(e.inlineData)return`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`;return null}catch(e){return console.warn("[NanoBanana] 오류:",e),null}}function m(e){if(!e||!e.trim())throw Error("AI 응답이 비어있습니다.");let t=e.match(/```(?:json)?\s*([\s\S]*?)```/);if(t)try{return JSON.parse(t[1].trim())}catch{}for(let t of(e=>{let t=[],r=0,o=-1;for(let a=0;a<e.length;a++)"["===e[a]?(0===r&&(o=a),r++):"]"===e[a]&&0==--r&&-1!==o&&(t.push(e.slice(o,a+1)),o=-1);return t})(e).sort((e,t)=>t.length-e.length))try{return JSON.parse(t)}catch{}let r=e.match(/\{[\s\S]*\}/);if(r)try{return JSON.parse(r[0])}catch{}throw console.error("[HookFlow] JSON 파싱 실패 원문 (처음 500자):",e.slice(0,500)),Error(`AI 응답 파싱 실패. 다시 시도해주세요. (원문: ${e.slice(0,100)})`)}e.s(["clearHistoryDB",0,d,"deleteHistoryDB",0,c,"getHistoryDB",0,l,"saveHistoryDB",0,s],44453);let b="hookflow_trends_cache";async function y(e=!1){if(!e){let e=function(){try{let e=localStorage.getItem(b);if(!e)return null;let{data:t,timestamp:r}=JSON.parse(e);if(Date.now()-r<216e5)return t;localStorage.removeItem(b)}catch{}return null}();if(e&&e.length>0)return e}if("none"===f())return S();try{let e=new Date().toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"long"}),t=await h(`2026년 한국/글로벌 실시간 트렌드 분석가.
필수: 반드시 실제 웹 검색으로 오늘 날짜의 실제 트렌드 수집.
네이버 실시간 검색어, 구글 트렌드, 유튜브 인기 동영상, 트위터/X 트렌딩, 해외 뉴스 등에서 실제 데이터만 수집.
추측/가상 데이터 절대 금지. 오래된 자료 금지.
한국어 오타/맞춤법 완벽. JSON만 반환.`,`오늘은 ${e}입니다.

웹 검색을 사용해서 다음을 조사하세요:
1. "네이버 실시간 급상승" 검색 - 한국 실시간 검색어
2. "구글 트렌드 한국" 검색 - 한국 Google Trends 오늘
3. "유튜브 인기 동영상 한국" 검색 - 유튜브 트렌딩
4. "오늘의 뉴스 바이럴" 검색 - 핫이슈 뉴스

검색 결과에서 실제 트렌드 30개 이상을 카테고리별로 분류:
- 음식 / 다이어트 / 건강 / 식단 / 쇼핑 / 화장품 / 의류
- 인플루언서 / 셀럽 / 테크 / 재테크
- 시즌 / 글로벌 / 지혜 / 연애

각 항목 (실제 검색 결과만 사용):
- title: 실제 트렌딩 키워드 또는 뉴스 제목 (20자 이내)
- description: 왜 지금 핫한지 실제 사실 기반 (2문장)
- traffic: 실제 추정 검색량 (예: 네이버 500K+)
- views: 실제 SNS 조회수 (예: 유튜브 5M views)
- category: 해당 카테고리
- relatedQueries: 실제 연관 검색어 2개

검증 필수: 각 항목이 실제 2026년 4월 트렌드인지 확인.
추측 데이터 금지.

JSON 배열만 반환:
[{"title":"","description":"","traffic":"","views":"","category":"","relatedQueries":[""]}]`,{temp:.3,max:6e3,webSearch:!0}),r=m(t),o=(Array.isArray(r)?r:[]).map((e,t)=>({id:`t_${t}_${Date.now()}`,title:String(e.title||""),source:"AI 분석",description:String(e.description||""),traffic:String(e.traffic||"10K+"),views:String(e.views||"100K views"),relatedQueries:Array.isArray(e.relatedQueries)?e.relatedQueries.map(String):[],category:String(e.category||"기타"),fetchedAt:new Date().toISOString()}));if(o.length>0)return localStorage.setItem(b,JSON.stringify({data:o,timestamp:Date.now()})),o}catch(e){console.error("[HookFlow] AI 트렌드 생성 실패:",e)}return S()}function S(){return[{id:"d1",title:"제로 칼로리 디저트 열풍",source:"AI",description:"제로 칼로리 디저트가 SNS를 점령. 다이어트 중에도 즐기는 죄책감 없는 간식 트렌드.",traffic:"800K+",views:"5M views",relatedQueries:["제로슈거","다이어트간식"],category:"음식",fetchedAt:new Date().toISOString()},{id:"d2",title:"12-3-30 워킹 다이어트",source:"AI",description:"틱톡에서 폭발적 인기. 경사 12, 속도 3, 30분 걷기로 체중 감량 성공 사례 속출.",traffic:"1.2M+",views:"15M views",relatedQueries:["걷기다이어트","틱톡운동"],category:"다이어트",fetchedAt:new Date().toISOString()},{id:"d3",title:"장건강이 피부를 바꾼다",source:"AI",description:"프로바이오틱스와 장건강이 피부 개선에 직접 영향. 피부과 전문의 추천 루틴 화제.",traffic:"500K+",views:"3M views",relatedQueries:["장건강","피부관리"],category:"건강",fetchedAt:new Date().toISOString()},{id:"d4",title:"고단백 도시락 밀프렙",source:"AI",description:"일주일치 고단백 도시락을 한번에 준비하는 밀프렙 콘텐츠가 직장인들 사이에서 대유행.",traffic:"300K+",views:"2M views",relatedQueries:["밀프렙","고단백식단"],category:"식단",fetchedAt:new Date().toISOString()},{id:"d5",title:"무신사 여름 세일 핫딜",source:"AI",description:"무신사 시즌 세일 시작. 최대 80% 할인 품목 정리 콘텐츠 조회수 폭발.",traffic:"600K+",views:"4M views",relatedQueries:["무신사세일","여름패션"],category:"쇼핑",fetchedAt:new Date().toISOString()},{id:"d6",title:"선크림 하나로 톤업 완성",source:"AI",description:"톤업 선크림 비교 리뷰 영상이 화제. 화장 없이 피부 보정 효과 검증.",traffic:"400K+",views:"6M views",relatedQueries:["톤업선크림","데일리선케어"],category:"화장품",fetchedAt:new Date().toISOString()},{id:"d7",title:"올드머니룩 코디법",source:"AI",description:'조용한 럭셔리 "올드머니룩"이 패션 트렌드 1위. 기본 아이템으로 고급스러운 스타일링.',traffic:"700K+",views:"8M views",relatedQueries:["올드머니룩","미니멀패션"],category:"의류",fetchedAt:new Date().toISOString()},{id:"d8",title:"쯔양 복귀 먹방 1000만뷰",source:"AI",description:"쯔양의 복귀 먹방 영상이 1000만 뷰를 돌파. 유튜브 실시간 트렌딩 1위 기록.",traffic:"2M+",views:"10M views",relatedQueries:["쯔양","먹방유튜버"],category:"인플루언서",fetchedAt:new Date().toISOString()},{id:"d9",title:"BTS 진 솔로 컴백",source:"AI",description:"BTS 진의 솔로 앨범 발매 소식에 전 세계 팬덤이 들끓는 중. 선주문량 역대급.",traffic:"5M+",views:"50M views",relatedQueries:["BTS진","K-POP"],category:"셀럽",fetchedAt:new Date().toISOString()},{id:"d10",title:"AI로 월 500만원 부업",source:"AI",description:"ChatGPT와 AI 도구로 부업하는 실제 사례 모음. 초보자도 따라할 수 있는 가이드.",traffic:"1M+",views:"7M views",relatedQueries:["AI부업","자동수익"],category:"재테크",fetchedAt:new Date().toISOString()},{id:"d11",title:"Apple Vision Pro 2 출시",source:"AI",description:"Apple Vision Pro 2세대 공개. 가격 절반에 성능 2배. 국내 출시일 확정.",traffic:"800K+",views:"4M views",relatedQueries:["비전프로","애플신제품"],category:"테크",fetchedAt:new Date().toISOString()},{id:"d12",title:"아이브 월드투어 티켓팅 전쟁",source:"AI",description:"아이브 첫 월드투어 티켓 오픈과 동시에 전석 매진. 리셀 가격 10배 치솟아.",traffic:"3M+",views:"20M views",relatedQueries:["아이브","콘서트티켓"],category:"셀럽",fetchedAt:new Date().toISOString()},{id:"d13",title:"5월 어버이날 감동 선물 TOP 10",source:"AI",description:"2026년 어버이날 선물 트렌드. 건강식품부터 체험형 선물까지 가성비 랭킹.",traffic:"600K+",views:"3M views",relatedQueries:["어버이날","효도선물"],category:"시즌",fetchedAt:new Date().toISOString()},{id:"d14",title:"일본 벚꽃 명소 2026 업데이트",source:"AI",description:"2026년 일본 벚꽃 개화 시기 확정. 새로운 숨은 명소와 가성비 여행 루트 공개.",traffic:"400K+",views:"2M views",relatedQueries:["일본여행","벚꽃명소"],category:"글로벌",fetchedAt:new Date().toISOString()},{id:"d15",title:"마음이 힘들 때 읽는 법구경",source:"AI",description:"불교 경전 법구경 속 지혜의 말씀. 현대인의 번아웃을 치유하는 2600년 된 처방전.",traffic:"200K+",views:"1.5M views",relatedQueries:["명상","마음치유"],category:"지혜",fetchedAt:new Date().toISOString()},{id:"d16",title:"2026 연애 트렌드 대반전",source:"AI",description:'Z세대의 새로운 연애 문화 "슬로우 데이팅"이 전 세계적 트렌드. 빠른 만남보다 천천히 알아가는 관계 선호.',traffic:"700K+",views:"8M views",relatedQueries:["슬로우데이팅","연애트렌드"],category:"연애",fetchedAt:new Date().toISOString()},{id:"d17",title:"커플 심리테스트 1억뷰 돌파",source:"AI",description:"틱톡에서 유행하는 커플 궁합 심리테스트가 1억 뷰 돌파. 연인 관계 진단 콘텐츠 폭발.",traffic:"500K+",views:"100M views",relatedQueries:["커플테스트","연애심리"],category:"연애",fetchedAt:new Date().toISOString()}]}async function x(e,t,r=3,o=!1){let a={informative:"정보형",provocative:"자극형",storytelling:"스토리형"},n=o?`"${e.title}" ${a[t]||t} 대본 ${r}개. 웹 검색으로 최신 팩트 수집 후 JSON 배열만 반환:
[{"headline":"15자","subheadline":"30자","bodyPoints":["팩트+숫자","","","",""],"callToAction":"","targetAudience":""}]`:`"${e.title}" ${a[t]||t} 대본 ${r}개. JSON 배열만:
[{"headline":"15자","subheadline":"30자","bodyPoints":["","","","",""],"callToAction":"","targetAudience":""}]`,i=await h(o?"한국 SNS 마케팅 작가. 웹 검색 후 JSON만 출력. 설명 금지.":"한국 SNS 마케팅 작가. JSON만 출력. 설명 금지. 오타 금지.",n,{temp:.6,max:o?12e3:3e3,webSearch:o});try{let e=m(i);return Array.isArray(e)?e:[e]}catch{console.warn("[HookFlow] 후킹 1차 파싱 실패, 웹검색 없이 재시도");let o=m(await h("SNS 마케팅 작가. 순수 JSON 배열만. 설명 금지.",`"${e.title}" ${a[t]||t} 대본 ${r}개. 형식:
[{"headline":"15자","subheadline":"30자","bodyPoints":["","","","",""],"callToAction":"","targetAudience":""}]`,{temp:.5,max:3e3}));return Array.isArray(o)?o:[o]}}async function w(e,t=5){let r=m(await h(`당신은 한국 SNS 바이럴 콘텐츠 작가입니다.

**절대 금지 사항:**
- 부제에 "Proof:", "Result:", "Differentiation:", "핵심 포인트" 같은 레이블 작성 절대 금지
- 학술적/설명적 문구 금지
- "증거:", "결과:", "근거:" 같은 단어 금지

**부제 작성 원칙 (필수):**
- 답을 주지 말고 **질문만 남기기** - 독자가 다음 장으로 넘기도록
- 미완성 긴장: "근데 그게 문제였습니다", "그때는 몰랐어요"
- 반전 예고: "전문가가 틀렸습니다", "정반대였습니다"
- 공범 유도: "사실 저도 속았어요", "우리만 모릅니다"
- 감정 암시: "심장이 뛰었습니다", "눈을 의심했어요"

**${t}장 구성 (긴장감 상승 → 반전 → 행동):**
- 1장 (Hook): 충격적 주장 or 놀라운 결과 먼저 제시
- 2~${t-2}장: 미스터리 쌓기 → 정보 공개 → 반전
- ${t-1}장: 클라이맥스 (핵심 반전/결론)
- ${t}장 (CTA): 행동 유도 + 여운

**규칙:**
- 한국어 오타 절대 금지
- 숫자 → 감정 연결 ("52% 증가" ❌ → "두배 효과" ⭕)
- JSON만 반환 (코드블록 금지)`,`주제: "${e.headline}"
팩트: ${e.bodyPoints.join(" | ")}
CTA: ${e.callToAction}

궁금증 유발 ${t}장 캐러셀 대본:

각 장 필드:
- title: 충격/공감/호기심 (10-15자, 강한 어그로)
- subtitle: **답을 주지 않고 다음 슬라이드 궁금하게** (15-25자)
  예: "근데 그게 전부가 아니었습니다", "이게 바로 그 이유입니다", "지금부터 진짜 시작입니다"
  절대 금지: "Proof:", "Result:", "핵심 포인트"
- body: 내용 풀어서 설명 (60-100자, 쉬운 예시)
- imagePrompt: DSLR 사실적 한국 장면 (인물/장소/행동/감정/스타일 5요소 영어로)
  예: "30대 한국 남성이 모던한 사무실에서 노트북 화면을 놀란 표정으로 보는 모습, realistic photo, cinematic lighting, 4k"
- textEmphasis: 이미지에 쓸 큰 한국어 텍스트 (짧게)
- colorScheme: 색상 (예: "충격의 레드+블랙", "신뢰의 블루+화이트")
- emotion: 유도 감정 (예: "뭐야 진짜?", "나도 해볼까")

JSON 배열 (type 필드는 내부 사용, 사용자에게는 안 보임):
[
  {
    "id": "slide_1",
    "order": 1,
    "type": "Hook",
    "title": "",
    "subtitle": "답을 주지 않는 궁금증 부제",
    "body": "",
    "imagePrompt": "",
    "textEmphasis": "",
    "colorScheme": "",
    "emotion": ""
  }
]`,{temp:.7,max:8e3}));return Array.isArray(r)?r:[r]}async function v(e,t="instagram"){if(!g())return e.map(()=>"");let r={instagram:"정사각형 1:1",tiktok:"세로 9:16",facebook:"가로 16:9"},o=Array(e.length).fill("");for(let a=0;a<e.length;a+=2){let n=e.slice(a,a+2).map((n,i)=>{let s=a+i,l=String(n.title||""),c=String(n.subtitle||""),d=String(n.textEmphasis||l),u=String(n.imagePrompt||""),f=String(n.colorScheme||""),g=s===e.length-1;return p(`한국 SNS 콘텐츠 이미지 생성.

[이미지 장면 묘사 - 반드시 이 내용을 사실적으로 표현]
${u}

[색상 톤]
${f||"다크 모드 (#0F172A) + 보라 액센트 (#818CF8)"}

[한국어 텍스트 오버레이 - 반드시 이대로 정확히 표기]
상단 또는 하단에 큰 한국어 텍스트:
"${d}"
${c?`
그 아래 작은 한국어 부제:
"${c}"`:""}

[텍스트 배치 규칙]
- 중앙 금지, 반드시 상단 또는 하단 배치
- 흰색 두꺼운 고딕체 + 검정 그림자로 선명하게
- 인물 얼굴 가리지 않도록 주의
${g?'- CTA 느낌, "지금 시작" 버튼 느낌':""}

[필수 포함 요소 - 5가지]
1. 인물: 실제 한국인 (성별/나이 구체화)
2. 장소: 구체적 공간
3. 행동: 동작과 표정 표현
4. 감정: 공감 유도
5. 스타일: DSLR 촬영, realistic, cinematic, 4k

[절대 금지]
- 추상적 그라데이션 배경 (반드시 실제 사진)
- AI/일러스트 스타일
- 한국어 오타, 자모음 깨짐
- 제시된 문구 외 다른 한국어 생성
- 중앙에 텍스트 배치

[비율] ${r[t]}

출력 전 검증: 이미지 내 모든 한국어가 "${d}"와 "${c}"와 정확히 일치하는지 확인.`).then(e=>{o[s]=e||""}).catch(e=>{console.warn(`[Image ${s+1}] 실패:`,e),o[s]=""})});await Promise.allSettled(n),a+2<e.length&&await new Promise(e=>setTimeout(e,3e3))}return o}async function k(e,t="instagram",r=!1,o=!1){let a=String(e.title||""),n=String(e.subtitle||""),i=String(e.textEmphasis||a),s=String(e.imagePrompt||""),l=String(e.colorScheme||""),c=`한국 SNS 콘텐츠 이미지.
장면: ${s}
색상: ${l||"다크 + 보라"}
상단/하단 한국어 텍스트: "${i}"${n?` / "${n}"`:""}
텍스트: 흰색 두꺼운 고딕 + 검정 그림자
규칙: 중앙 텍스트 금지, DSLR 사실적 사진, 실제 한국인, 한국어 오타 금지
비율: ${{instagram:"정사각형 1:1",tiktok:"세로 9:16",facebook:"가로 16:9"}[t]}
${o?"CTA 느낌, 결심하는 인물":r?"스크롤 멈추는 충격적 장면":"진지한 정보 전달"}`;return await p(c)||""}async function j(e){await s(e),localStorage.removeItem("hookflow_history")}async function $(){let e=new Date().toLocaleDateString("ko-KR"),t=await h(`한국/글로벌 YouTube\xb7SNS 바이럴 영상 분석 전문가.
실제 웹 검색으로 최신 바이럴 영상 60개 조사 후 JSON으로 분석 결과 반환.
설명 텍스트 금지. 순수 JSON만.`,`오늘(${e}) 기준 글로벌 바이럴 영상 분석 보고서.

카테고리 10개 (각 6개 영상):
1. 철학_지혜 2. 지식_교육 3. 일상_라이프스타일 4. 웹툰_애니메이션 5. 아이교육
6. 해외_바이럴 7. 자기계발 8. 재테크_경제 9. 건강_웰빙 10. 테크_IT

웹 검색 2-3회로 실제 YouTube/TikTok 바이럴 영상 정보 수집.

JSON 형식 (순수 JSON만, 설명 금지):
{
  "date": "${e}",
  "totalVideos": 60,
  "categories": {
    "철학_지혜": [
      {
        "title": "실제 영상 제목",
        "channel": "실제 채널명",
        "views": 1500000,
        "viewsStr": "1.5M",
        "engagementRate": 8.5,
        "estimatedCPM": 9.0,
        "estimatedRevenue": 13500,
        "viralSpeed": 300000,
        "region": "KR",
        "isShorts": true,
        "category": "철학_지혜",
        "hookPattern": "empathy",
        "uploadDate": "2026-04-17"
      }
    ]
  },
  "topCPM": [],
  "topEngagement": [],
  "topViralSpeed": [],
  "hookPatternDistribution": {"empathy": 28, "stats": 19, "question": 7, "visual": 6},
  "regionDistribution": {"US": 37, "KR": 17, "JP": 3, "IN": 2, "EU": 1},
  "shortsVsLong": {"shorts": 26, "long": 34},
  "nextWeekPredictions": [
    {"trend": "Physical AI & 휴머노이드 로봇", "growth": "+35%", "reason": "CES 2026 여파 지속"},
    {"trend": "재테크/크립토 컴백", "growth": "+28%", "reason": "코스피 신고가 기대감"}
  ],
  "executiveSummary": "오늘의 핵심 요약 3-5문장"
}`,{temp:.4,max:16e3,webSearch:!0});try{return m(t)}catch{return m(await h("바이럴 영상 분석가. 순수 JSON만 반환.",`카테고리 10개 \xd7 6개 영상 = 60개의 바이럴 분석 JSON 생성.
형식: {"date":"${e}","totalVideos":60,"categories":{"철학_지혜":[{"title":"","channel":"","views":0,"viewsStr":"","engagementRate":0,"estimatedCPM":0,"estimatedRevenue":0,"viralSpeed":0,"region":"US","isShorts":true,"category":"철학_지혜","hookPattern":"empathy","uploadDate":""}]},"topCPM":[],"topEngagement":[],"topViralSpeed":[],"hookPatternDistribution":{},"regionDistribution":{},"shortsVsLong":{"shorts":0,"long":0},"nextWeekPredictions":[{"trend":"","growth":"","reason":""}],"executiveSummary":""}`,{temp:.5,max:12e3}))}}async function N(e,t="instagram"){return m(await h("SNS/YouTube SEO 전문가. 한국어. 오타금지. JSON만.",`"${e}" 주제 SEO 패키지 생성.

JSON 형식:
{
  "titles": ["SEO제목1 (70자 내)", "SEO제목2", "SEO제목3"],
  "description": "SNS/YouTube 설명글 (150-200자, 키워드+해시태그 포함)",
  "hashtags": ["#태그1", "#태그2", ... 15개],
  "tags": ["태그1", "태그2", ... 20개],
  "thumbnailText": "썸네일 문구 (5-10자)",
  "optimalPostTime": "최적 업로드 시간 (예: 월-금 저녁 7-9시)",
  "platforms": {
    "youtube": {"title": "YouTube 최적화 제목", "description": "YouTube 설명"},
    "instagram": {"caption": "IG 캡션 (짧고 감성적)", "hashtags": "#태그 나열"},
    "tiktok": {"caption": "TikTok 캡션 (fyp 유도)", "hashtags": "#fyp #추천"},
    "facebook": {"post": "FB 포스트 내용"}
  }
}`,{temp:.6,max:3e3}))}e.s(["CATEGORIES",0,[{key:"all",label:"전체",emoji:"🔥"},{key:"음식",label:"음식/맛집",emoji:"🍽"},{key:"다이어트",label:"다이어트",emoji:"💪"},{key:"건강",label:"건강/의약",emoji:"🏥"},{key:"식단",label:"식단/영양",emoji:"🥗"},{key:"쇼핑",label:"쇼핑트렌드",emoji:"🛍"},{key:"화장품",label:"화장품/뷰티",emoji:"💄"},{key:"의류",label:"의류/패션",emoji:"👗"},{key:"인플루언서",label:"인플루언서",emoji:"📱"},{key:"셀럽",label:"연예인/셀럽",emoji:"⭐"},{key:"테크",label:"IT/테크",emoji:"💻"},{key:"재테크",label:"재테크/부업",emoji:"💰"},{key:"시즌",label:"시즌/이벤트",emoji:"📅"},{key:"글로벌",label:"글로벌/나라별",emoji:"🌍"},{key:"지혜",label:"지혜/철학/종교",emoji:"🕊"},{key:"연애",label:"연애/관계/성",emoji:"💕"}],"fetchTrends",0,y,"generateAnalysisReport",0,$,"generateCarouselSlides",0,w,"generateHooks",0,x,"generateSEOPackage",0,N,"generateSlideImages",0,v,"getActiveProvider",0,f,"getApiKey",0,e=>u(`${e}_key`),"hasGeminiKey",0,g,"regenerateSingleImage",0,k,"reportToMarkdown",0,function(e){let t=`# 일일 바이럴 영상 분석 보고서

`;for(let[r,o]of(t+=`**${e.date}** \xb7 카테고리: ${Object.keys(e.categories).length}개 \xb7 분석 영상: ${e.totalVideos}개

---

## 📊 핵심 요약

${e.executiveSummary}

---

## 1️⃣ 카테고리별 트렌딩 영상

`,Object.entries(e.categories)))t+=`### ${r.replace("_","/")}

| 순위 | 제목 | 채널 | 조회수 | 참여율 | CPM | 수익 |
|---|---|---|---|---|---|---|
`,o.forEach((e,r)=>{t+=`| ${r+1} | ${e.title} | ${e.channel} | ${e.viewsStr} | ${e.engagementRate}% | $${e.estimatedCPM} | $${e.estimatedRevenue.toLocaleString()} |
`}),t+=`
`;for(let[r,o]of(t+=`
## 2️⃣ 성과 분석

### 💰 CPM TOP 10

| 순위 | 제목 | 카테고리 | CPM | 예상 수익 |
|---|---|---|---|---|
`,e.topCPM.slice(0,10).forEach((e,r)=>{t+=`| ${r+1} | ${e.title} | ${e.category} | $${e.estimatedCPM} | $${e.estimatedRevenue.toLocaleString()} |
`}),t+=`
### 🚀 바이럴 속도 TOP 10

| 순위 | 제목 | 일평균 조회수 | 카테고리 |
|---|---|---|---|
`,e.topViralSpeed.slice(0,10).forEach((e,r)=>{t+=`| ${r+1} | ${e.title} | ${e.viralSpeed.toLocaleString()}/day | ${e.category} |
`}),t+=`
## 3️⃣ 콘텐츠 구조 분석

### 🎣 Hook 패턴 분포

`,Object.entries(e.hookPatternDistribution)))t+=`- **${r}**: ${o}개
`;for(let[r,o]of(t+=`
### 📱 Shorts vs 장편

- Shorts: ${e.shortsVsLong.shorts}개
- 장편: ${e.shortsVsLong.long}개

### 🌍 지역 분포

`,Object.entries(e.regionDistribution)))t+=`- ${r}: ${o}개
`;return t+=`
## 4️⃣ 다음 주 트렌드 예측

`,e.nextWeekPredictions.forEach((e,r)=>{t+=`**${r+1}. ${e.trend}** (${e.growth})
${e.reason}

`}),t+=`
---

*Generated by HookFlow AI \xb7 ${new Date().toISOString()}*
`},"saveToHistory",0,j,"setApiKey",0,(e,t)=>{var r;return r=`${e}_key`,void localStorage.setItem(`hookflow_${r}`,t)}],15970);let A=[{href:"/",label:"트렌드",icon:"📊"},{href:"/analysis",label:"분석",icon:"📈"},{href:"/generate",label:"생성",icon:"🚀"},{href:"/custom",label:"커스텀",icon:"✏"},{href:"/history",label:"히스토리",icon:"📋"},{href:"/settings",label:"설정",icon:"⚙"}];e.s(["default",0,function(){let e=(0,o.usePathname)(),[n,i]=(0,a.useState)({claude:!1,nano:!1});return(0,a.useEffect)(()=>{i({claude:"none"!==f(),nano:g()})},[]),(0,t.jsx)("nav",{className:"sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-xl",children:(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"flex items-center justify-between h-16",children:[(0,t.jsxs)(r.default,{href:"/",className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold text-sm",children:"HF"}),(0,t.jsxs)("span",{className:"text-lg font-bold",children:[(0,t.jsx)("span",{className:"gradient-text",children:"HookFlow"})," ",(0,t.jsx)("span",{className:"text-foreground/60",children:"AI"})]})]}),(0,t.jsx)("div",{className:"flex items-center gap-1",children:A.map(o=>(0,t.jsxs)(r.default,{href:o.href,className:`px-3 py-2 rounded-lg text-sm font-medium transition-all ${e===o.href?"bg-accent/15 text-accent":"text-foreground/60 hover:text-foreground hover:bg-card-bg"}`,children:[(0,t.jsx)("span",{className:"mr-1",children:o.icon}),o.label]},o.href))}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${n.claude?"bg-success":"bg-danger"}`}),(0,t.jsx)("span",{className:"text-foreground/50",children:n.claude?"Claude":"미연결"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${n.nano?"bg-purple-400":"bg-foreground/20"}`}),(0,t.jsx)("span",{className:"text-foreground/50",children:n.nano?"NanoBanana":"이미지 꺼짐"})]})]})]})})})}],32710)},39209,e=>{"use strict";var t=e.i(27707),r=e.i(39804),o=e.i(40281),a=e.i(32710),n=e.i(15970);e.s(["default",0,function(){let e=(0,o.useRouter)(),[i,s]=(0,r.useState)("instagram"),[l,c]=(0,r.useState)([{title:"",body:""},{title:"",body:""},{title:"",body:""}]),[d,u]=(0,r.useState)(!1),[f,g]=(0,r.useState)([]),[h,p]=(0,r.useState)(!1);function m(e,t,r){c(o=>o.map((o,a)=>a===e?{...o,[t]:r}:o))}async function b(){let e=l.filter(e=>e.title.trim()||e.body.trim());if(e.length<2)return void alert("최소 2장 이상의 대본을 작성해주세요.");if(!(0,n.hasGeminiKey)())return void alert("설정에서 Gemini(NanoBanana) 키를 입력해주세요.");u(!0);try{let t=e.map((t,r)=>({id:`s_${r}`,order:r+1,type:0===r?"cover":r===e.length-1?"cta":"content",title:t.title,body:t.body,bgColor:"#0F172A",textColor:"#F8FAFC",accentColor:"#818CF8"})),r=await (0,n.generateSlideImages)(t,i);g(r),p(!0),await (0,n.saveToHistory)({topic:"커스텀 대본",headline:e[0].title||"커스텀",platform:i,slideCount:e.length,images:r,scripts:e})}catch(e){alert(e instanceof Error?e.message:"생성 실패")}finally{u(!1)}}function y(e){if(!f[e])return;let t=document.createElement("a");t.href=f[e],t.download=`custom-${i}-${e+1}.png`,t.click()}async function S(){for(let e=0;e<f.length;e++)f[e]&&(y(e),await new Promise(e=>setTimeout(e,500)))}let x={instagram:"Instagram (1:1)",tiktok:"TikTok (9:16)",facebook:"Facebook (16:9)"}[i];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.default,{}),(0,t.jsxs)("main",{className:"flex-1 max-w-4xl mx-auto w-full px-4 py-6",children:[(0,t.jsx)("h1",{className:"text-2xl font-bold mb-1",children:(0,t.jsx)("span",{className:"gradient-text",children:"커스텀 대본"})}),(0,t.jsx)("p",{className:"text-foreground/40 text-sm mb-6",children:"원하는 주제와 내용을 직접 작성하여 SNS 이미지를 만드세요."}),d&&(0,t.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",children:(0,t.jsxs)("div",{className:"text-center p-8 rounded-2xl bg-card-bg border border-card-border",children:[(0,t.jsx)("div",{className:"w-12 h-12 rounded-full border-[3px] border-accent/30 border-t-accent animate-spin mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-foreground/70 text-sm",children:"NanoBanana로 이미지 생성 중..."})]})}),h?(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsx)("div",{className:`grid gap-4 ${"tiktok"===i?"grid-cols-2 md:grid-cols-4":"grid-cols-2 md:grid-cols-3"}`,children:f.map((e,r)=>(0,t.jsxs)("div",{className:"group relative",children:[(0,t.jsx)("div",{className:`rounded-xl border border-card-border overflow-hidden bg-card-bg ${"tiktok"===i?"aspect-[9/16]":"facebook"===i?"aspect-[16/9]":"aspect-square"}`,children:e?(0,t.jsx)("img",{src:e,alt:`${r+1}`,className:"w-full h-full object-cover"}):(0,t.jsx)("div",{className:"flex items-center justify-center h-full text-foreground/30 text-sm",children:"생성 실패"})}),(0,t.jsx)("div",{className:"absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-bold",children:0===r?"메인":r+1}),e&&(0,t.jsx)("button",{onClick:()=>y(r),className:"absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 text-white text-[10px] opacity-0 group-hover:opacity-100",children:"다운로드"})]},r))}),(0,t.jsxs)("div",{className:"grid grid-cols-3 gap-3",children:[(0,t.jsx)("button",{onClick:S,className:"py-3 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm",children:"전체 다운로드"}),(0,t.jsx)("button",{onClick:()=>{p(!1),g([])},className:"py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 text-sm",children:"대본 수정"}),(0,t.jsx)("button",{onClick:()=>e.push("/history"),className:"py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 text-sm",children:"히스토리"})]})]}):(0,t.jsxs)("div",{className:"space-y-5",children:[(0,t.jsx)("div",{className:"flex gap-2",children:[{key:"instagram",label:"📸 Instagram"},{key:"tiktok",label:"🎵 TikTok"},{key:"facebook",label:"📘 Facebook"}].map(e=>(0,t.jsx)("button",{onClick:()=>s(e.key),className:`px-4 py-2 rounded-lg text-sm border ${i===e.key?"border-accent bg-accent/10 text-accent":"border-card-border text-foreground/50"}`,children:e.label},e.key))}),(0,t.jsx)("div",{className:"space-y-3",children:l.map((e,r)=>(0,t.jsxs)("div",{className:"p-4 rounded-xl bg-card-bg border border-card-border group",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsx)("span",{className:`text-xs font-bold ${0===r?"text-accent":"text-foreground/40"}`,children:0===r?"1장 (메인 어그로)":`${r+1}장`}),l.length>2&&(0,t.jsx)("button",{onClick:()=>{l.length>2&&c(e=>e.filter((e,t)=>t!==r))},className:"text-xs text-danger/50 hover:text-danger opacity-0 group-hover:opacity-100",children:"삭제"})]}),(0,t.jsx)("input",{type:"text",value:e.title,onChange:e=>m(r,"title",e.target.value),placeholder:0===r?"시선을 사로잡는 메인 제목":`${r+1}장 제목`,className:"w-full px-3 py-2 rounded-lg bg-background border border-card-border text-sm font-bold mb-2 focus:outline-none focus:border-accent"}),(0,t.jsx)("textarea",{value:e.body,onChange:e=>m(r,"body",e.target.value),placeholder:"이미지에 들어갈 내용을 작성하세요",className:"w-full px-3 py-2 rounded-lg bg-background border border-card-border text-sm resize-none focus:outline-none focus:border-accent",rows:2})]},r))}),(0,t.jsx)("button",{onClick:function(){c(e=>[...e,{title:"",body:""}])},className:"w-full py-2 rounded-lg border border-dashed border-card-border text-sm text-foreground/40 hover:text-accent hover:border-accent/30",children:"+ 장면 추가"}),(0,t.jsxs)("button",{onClick:b,disabled:d,className:"w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50",children:[x," 이미지 ",l.filter(e=>e.title||e.body).length,"장 생성"]})]})]})]})}])}]);