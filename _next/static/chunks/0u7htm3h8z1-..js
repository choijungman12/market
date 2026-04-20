(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,75732,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={formatUrl:function(){return s},formatWithValidation:function(){return c},urlObjectKeys:function(){return l}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let o=e.r(39258)._(e.r(70770)),i=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:r}=e,a=e.protocol||"",n=e.pathname||"",s=e.hash||"",l=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),l&&"object"==typeof l&&(l=String(o.urlQueryToSearchParams(l)));let d=e.search||l&&`?${l}`||"";return a&&!a.endsWith(":")&&(a+=":"),e.slashes||(!a||i.test(a))&&!1!==c?(c="//"+(c||""),n&&"/"!==n[0]&&(n="/"+n)):c||(c=""),s&&"#"!==s[0]&&(s="#"+s),d&&"?"!==d[0]&&(d="?"+d),n=n.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${a}${c}${n}${d}${s}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return s(e)}},41664,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return n}});let a=e.r(39804);function n(e,t){let r=(0,a.useRef)(null),n=(0,a.useRef)(null);return(0,a.useCallback)(a=>{if(null===a){let e=r.current;e&&(r.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(r.current=o(e,a)),t&&(n.current=o(t,a))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},46842,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return o}});let a=e.r(75233),n=e.r(64586);function o(e){if(!(0,a.isAbsoluteUrl)(e))return!0;try{let t=(0,a.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,n.hasBasePath)(r.pathname)}catch(e){return!1}}},46905,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},86607,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return y},useLinkStatus:function(){return x}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let o=e.r(39258),i=e.r(27707),s=o._(e.r(39804)),l=e.r(75732),c=e.r(36407),d=e.r(41664),u=e.r(75233),f=e.r(13946);e.r(12666);let p=e.r(16373),g=e.r(60672),h=e.r(46842),m=e.r(32114);function y(t){var r,a;let n,o,y,[x,w]=(0,s.useOptimistic)(g.IDLE_LINK_STATUS),S=(0,s.useRef)(null),{href:v,as:j,children:A,prefetch:N=null,passHref:k,replace:I,shallow:$,scroll:O,onClick:P,onMouseEnter:T,onTouchStart:C,legacyBehavior:D=!1,onNavigate:_,transitionTypes:M,ref:K,unstable_dynamicOnHover:E,...B}=t;n=A,D&&("string"==typeof n||"number"==typeof n)&&(n=(0,i.jsx)("a",{children:n}));let R=s.default.useContext(c.AppRouterContext),Q=!1!==N,L=!1!==N?null===(a=N)||"auto"===a?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,J="string"==typeof(r=j||v)?r:(0,l.formatUrl)(r);if(D){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});o=s.default.Children.only(n)}let H=D?o&&"object"==typeof o&&o.ref:K,F=s.default.useCallback(e=>(null!==R&&(S.current=(0,g.mountLinkInstance)(e,J,R,L,Q,w)),()=>{S.current&&((0,g.unmountLinkForCurrentNavigation)(S.current),S.current=null),(0,g.unmountPrefetchableInstance)(e)}),[Q,J,R,L,w]),G={ref:(0,d.useMergedRef)(F,H),onClick(t){D||"function"!=typeof P||P(t),D&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),!R||t.defaultPrevented||function(t,r,a,n,o,i,l){if("u">typeof window){let c,{nodeName:d}=t.currentTarget;if("A"===d.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){n&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),i){let e=!1;if(i({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:u}=e.r(51605);s.default.startTransition(()=>{u(r,n?"replace":"push",!1===o?p.ScrollBehavior.NoScroll:p.ScrollBehavior.Default,a.current,l)})}}(t,J,S,I,O,_,M)},onMouseEnter(e){D||"function"!=typeof T||T(e),D&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),R&&Q&&(0,g.onNavigationIntent)(e.currentTarget,!0===E)},onTouchStart:function(e){D||"function"!=typeof C||C(e),D&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),R&&Q&&(0,g.onNavigationIntent)(e.currentTarget,!0===E)}};return(0,u.isAbsoluteUrl)(J)?G.href=J:D&&!k&&("a"!==o.type||"href"in o.props)||(G.href=(0,f.addBasePath)(J)),y=D?s.default.cloneElement(o,G):(0,i.jsx)("a",{...B,...G,children:n}),(0,i.jsx)(b.Provider,{value:x,children:y})}e.r(46905);let b=(0,s.createContext)(g.IDLE_LINK_STATUS),x=()=>(0,s.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},40281,(e,t,r)=>{t.exports=e.r(99753)},32710,44453,15970,e=>{"use strict";var t=e.i(27707),r=e.i(86607),a=e.i(40281),n=e.i(39804);let o="history";function i(){return new Promise((e,t)=>{let r=indexedDB.open("hookflow",1);r.onerror=()=>t(r.error),r.onsuccess=()=>e(r.result),r.onupgradeneeded=()=>{let e=r.result;e.objectStoreNames.contains(o)||e.createObjectStore(o,{keyPath:"id"}).createIndex("createdAt","createdAt")}})}async function s(e){try{let t=await i(),r=`h_${Date.now()}`,a={id:r,createdAt:new Date().toISOString(),...e};return new Promise((e,n)=>{let i=t.transaction(o,"readwrite").objectStore(o).put(a);i.onsuccess=()=>e(r),i.onerror=()=>n(i.error)})}catch(e){return console.error("[History] Save failed:",e),""}}async function l(){try{let e=await i();return new Promise((t,r)=>{let a=e.transaction(o,"readonly").objectStore(o).getAll();a.onsuccess=()=>{let e=a.result.sort((e,t)=>new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime());t(e)},a.onerror=()=>r(a.error)})}catch(e){return console.error("[History] Get failed:",e),[]}}async function c(e){try{let t=await i();return new Promise((r,a)=>{let n=t.transaction(o,"readwrite");n.objectStore(o).delete(e),n.oncomplete=()=>r(),n.onerror=()=>a(n.error)})}catch(e){console.error("[History] Delete failed:",e)}}async function d(){try{let e=await i();return new Promise((t,r)=>{let a=e.transaction(o,"readwrite");a.objectStore(o).clear(),a.oncomplete=()=>t(),a.onerror=()=>r(a.error)})}catch(e){console.error("[History] Clear failed:",e)}}function u(e){return localStorage.getItem(`hookflow_${e}`)||""}function f(){return u("anthropic_key")?"anthropic":"none"}function p(){return!!u("gemini_key")}async function g(e,t,r={}){let a=u("anthropic_key");if(!a)throw Error("Anthropic API 키를 설정 페이지에서 입력해주세요.");let n={model:"claude-haiku-4-5-20251001",max_tokens:r.max||2048,temperature:r.temp??.7,system:e,messages:[{role:"user",content:t}]};r.webSearch&&(n.tools=[{type:"web_search_20250305",name:"web_search",max_uses:5}]);let o=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify(n)});if(!o.ok){let e=await o.text();if(429===o.status)throw Error("분당 요청 한도(Rate Limit)를 초과했습니다. 1-2분 후 다시 시도해주세요.");if(529===o.status||503===o.status)throw Error("Claude 서버가 일시적으로 과부하 상태입니다. 잠시 후 재시도해주세요.");throw Error(`Claude 오류(${o.status}): ${e.slice(0,150)}`)}let i=await o.json(),s="";for(let e of i.content||[])"text"===e.type&&(s+=e.text);return s}async function h(e){let t=u("gemini_key");if(!t)return null;try{let r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:e}]}],generationConfig:{responseModalities:["TEXT","IMAGE"]}})});if(!r.ok){let e=await r.text();return console.error("[NanoBanana] Gemini",r.status,e.slice(0,300)),null}let a=await r.json();for(let e of a?.candidates?.[0]?.content?.parts||[])if(e.inlineData)return`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`;return null}catch(e){return console.warn("[NanoBanana] 오류:",e),null}}function m(e){if(!e||!e.trim())throw Error("AI 응답이 비어있습니다.");let t=e.match(/```(?:json)?\s*([\s\S]*?)```/);if(t)try{return JSON.parse(t[1].trim())}catch{}for(let t of(e=>{let t=[],r=0,a=-1;for(let n=0;n<e.length;n++)"["===e[n]?(0===r&&(a=n),r++):"]"===e[n]&&0==--r&&-1!==a&&(t.push(e.slice(a,n+1)),a=-1);return t})(e).sort((e,t)=>t.length-e.length))try{return JSON.parse(t)}catch{}let r=e.match(/\{[\s\S]*\}/);if(r)try{return JSON.parse(r[0])}catch{}throw console.error("[HookFlow] JSON 파싱 실패 원문 (처음 500자):",e.slice(0,500)),Error(`AI 응답 파싱 실패. 다시 시도해주세요. (원문: ${e.slice(0,100)})`)}e.s(["clearHistoryDB",0,d,"deleteHistoryDB",0,c,"getHistoryDB",0,l,"saveHistoryDB",0,s],44453);let y="hookflow_trends_cache";async function b(e=!1){if(!e){let e=function(){try{let e=localStorage.getItem(y);if(!e)return null;let{data:t,timestamp:r}=JSON.parse(e);if(Date.now()-r<216e5)return t;localStorage.removeItem(y)}catch{}return null}();if(e&&e.length>0)return e}if("none"===f())return x();try{let e=new Date().toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"long"}),t=await g(`2026년 한국/글로벌 실시간 트렌드 분석가.
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
[{"title":"","description":"","traffic":"","views":"","category":"","relatedQueries":[""]}]`,{temp:.3,max:6e3,webSearch:!0}),r=m(t),a=(Array.isArray(r)?r:[]).map((e,t)=>({id:`t_${t}_${Date.now()}`,title:String(e.title||""),source:"AI 분석",description:String(e.description||""),traffic:String(e.traffic||"10K+"),views:String(e.views||"100K views"),relatedQueries:Array.isArray(e.relatedQueries)?e.relatedQueries.map(String):[],category:String(e.category||"기타"),fetchedAt:new Date().toISOString()}));if(a.length>0)return localStorage.setItem(y,JSON.stringify({data:a,timestamp:Date.now()})),a}catch(e){console.error("[HookFlow] AI 트렌드 생성 실패:",e)}return x()}function x(){return[{id:"d1",title:"제로 칼로리 디저트 열풍",source:"AI",description:"제로 칼로리 디저트가 SNS를 점령. 다이어트 중에도 즐기는 죄책감 없는 간식 트렌드.",traffic:"800K+",views:"5M views",relatedQueries:["제로슈거","다이어트간식"],category:"음식",fetchedAt:new Date().toISOString()},{id:"d2",title:"12-3-30 워킹 다이어트",source:"AI",description:"틱톡에서 폭발적 인기. 경사 12, 속도 3, 30분 걷기로 체중 감량 성공 사례 속출.",traffic:"1.2M+",views:"15M views",relatedQueries:["걷기다이어트","틱톡운동"],category:"다이어트",fetchedAt:new Date().toISOString()},{id:"d3",title:"장건강이 피부를 바꾼다",source:"AI",description:"프로바이오틱스와 장건강이 피부 개선에 직접 영향. 피부과 전문의 추천 루틴 화제.",traffic:"500K+",views:"3M views",relatedQueries:["장건강","피부관리"],category:"건강",fetchedAt:new Date().toISOString()},{id:"d4",title:"고단백 도시락 밀프렙",source:"AI",description:"일주일치 고단백 도시락을 한번에 준비하는 밀프렙 콘텐츠가 직장인들 사이에서 대유행.",traffic:"300K+",views:"2M views",relatedQueries:["밀프렙","고단백식단"],category:"식단",fetchedAt:new Date().toISOString()},{id:"d5",title:"무신사 여름 세일 핫딜",source:"AI",description:"무신사 시즌 세일 시작. 최대 80% 할인 품목 정리 콘텐츠 조회수 폭발.",traffic:"600K+",views:"4M views",relatedQueries:["무신사세일","여름패션"],category:"쇼핑",fetchedAt:new Date().toISOString()},{id:"d6",title:"선크림 하나로 톤업 완성",source:"AI",description:"톤업 선크림 비교 리뷰 영상이 화제. 화장 없이 피부 보정 효과 검증.",traffic:"400K+",views:"6M views",relatedQueries:["톤업선크림","데일리선케어"],category:"화장품",fetchedAt:new Date().toISOString()},{id:"d7",title:"올드머니룩 코디법",source:"AI",description:'조용한 럭셔리 "올드머니룩"이 패션 트렌드 1위. 기본 아이템으로 고급스러운 스타일링.',traffic:"700K+",views:"8M views",relatedQueries:["올드머니룩","미니멀패션"],category:"의류",fetchedAt:new Date().toISOString()},{id:"d8",title:"쯔양 복귀 먹방 1000만뷰",source:"AI",description:"쯔양의 복귀 먹방 영상이 1000만 뷰를 돌파. 유튜브 실시간 트렌딩 1위 기록.",traffic:"2M+",views:"10M views",relatedQueries:["쯔양","먹방유튜버"],category:"인플루언서",fetchedAt:new Date().toISOString()},{id:"d9",title:"BTS 진 솔로 컴백",source:"AI",description:"BTS 진의 솔로 앨범 발매 소식에 전 세계 팬덤이 들끓는 중. 선주문량 역대급.",traffic:"5M+",views:"50M views",relatedQueries:["BTS진","K-POP"],category:"셀럽",fetchedAt:new Date().toISOString()},{id:"d10",title:"AI로 월 500만원 부업",source:"AI",description:"ChatGPT와 AI 도구로 부업하는 실제 사례 모음. 초보자도 따라할 수 있는 가이드.",traffic:"1M+",views:"7M views",relatedQueries:["AI부업","자동수익"],category:"재테크",fetchedAt:new Date().toISOString()},{id:"d11",title:"Apple Vision Pro 2 출시",source:"AI",description:"Apple Vision Pro 2세대 공개. 가격 절반에 성능 2배. 국내 출시일 확정.",traffic:"800K+",views:"4M views",relatedQueries:["비전프로","애플신제품"],category:"테크",fetchedAt:new Date().toISOString()},{id:"d12",title:"아이브 월드투어 티켓팅 전쟁",source:"AI",description:"아이브 첫 월드투어 티켓 오픈과 동시에 전석 매진. 리셀 가격 10배 치솟아.",traffic:"3M+",views:"20M views",relatedQueries:["아이브","콘서트티켓"],category:"셀럽",fetchedAt:new Date().toISOString()},{id:"d13",title:"5월 어버이날 감동 선물 TOP 10",source:"AI",description:"2026년 어버이날 선물 트렌드. 건강식품부터 체험형 선물까지 가성비 랭킹.",traffic:"600K+",views:"3M views",relatedQueries:["어버이날","효도선물"],category:"시즌",fetchedAt:new Date().toISOString()},{id:"d14",title:"일본 벚꽃 명소 2026 업데이트",source:"AI",description:"2026년 일본 벚꽃 개화 시기 확정. 새로운 숨은 명소와 가성비 여행 루트 공개.",traffic:"400K+",views:"2M views",relatedQueries:["일본여행","벚꽃명소"],category:"글로벌",fetchedAt:new Date().toISOString()},{id:"d15",title:"마음이 힘들 때 읽는 법구경",source:"AI",description:"불교 경전 법구경 속 지혜의 말씀. 현대인의 번아웃을 치유하는 2600년 된 처방전.",traffic:"200K+",views:"1.5M views",relatedQueries:["명상","마음치유"],category:"지혜",fetchedAt:new Date().toISOString()},{id:"d16",title:"2026 연애 트렌드 대반전",source:"AI",description:'Z세대의 새로운 연애 문화 "슬로우 데이팅"이 전 세계적 트렌드. 빠른 만남보다 천천히 알아가는 관계 선호.',traffic:"700K+",views:"8M views",relatedQueries:["슬로우데이팅","연애트렌드"],category:"연애",fetchedAt:new Date().toISOString()},{id:"d17",title:"커플 심리테스트 1억뷰 돌파",source:"AI",description:"틱톡에서 유행하는 커플 궁합 심리테스트가 1억 뷰 돌파. 연인 관계 진단 콘텐츠 폭발.",traffic:"500K+",views:"100M views",relatedQueries:["커플테스트","연애심리"],category:"연애",fetchedAt:new Date().toISOString()}]}async function w(e,t,r=3){let a={informative:"정보형",provocative:"자극형",storytelling:"스토리형"},n=`${new Date().getFullYear()}년 ${new Date().getMonth()+1}월`,o=await g(`한국 SNS 마케팅 작가. 웹 검색으로 최신 팩트 수집 후 대본 작성.

**중요 규칙:**
- 설명 텍스트 금지. 검색 과정 설명 금지.
- 검색 → 즉시 JSON만 출력
- ${n} 이내 최신 뉴스만 사용
- 한국어 오타 금지

출력 형식: JSON 배열만. 다른 텍스트 절대 금지.`,`"${e.title}" 토픽 ${a[t]||t} 톤 대본 ${r}개.

웹 검색 2-3회로 ${n} 최신 팩트 수집 후,
아래 JSON만 출력 (설명 금지, 코드블록 금지):

[
  {
    "headline": "후킹 제목 15자",
    "subheadline": "구체수치/날짜 30자",
    "bodyPoints": ["최신팩트1+숫자", "최신팩트2+숫자", "최신팩트3+숫자", "최신팩트4+숫자", "최신팩트5+숫자"],
    "callToAction": "행동유도",
    "targetAudience": "타겟"
  }
]`,{temp:.3,max:12e3,webSearch:!0});try{let e=m(o);return Array.isArray(e)?e:[e]}catch{console.warn("[HookFlow] 후킹 1차 파싱 실패, 웹검색 없이 재시도");let n=m(await g("SNS 마케팅 작가. 순수 JSON 배열만. 설명 금지.",`"${e.title}" ${a[t]||t} 대본 ${r}개. 형식:
[{"headline":"15자","subheadline":"30자","bodyPoints":["","","","",""],"callToAction":"","targetAudience":""}]`,{temp:.5,max:3e3}));return Array.isArray(n)?n:[n]}}async function S(e,t=5){let r=m(await g(`당신은 한국 SNS 바이럴 콘텐츠 작가입니다.

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
]`,{temp:.7,max:8e3}));return Array.isArray(r)?r:[r]}async function v(e,t="instagram"){if(!p())return e.map(()=>"");let r={instagram:"정사각형 1:1",tiktok:"세로 9:16",facebook:"가로 16:9"},a=Array(e.length).fill("");for(let n=0;n<e.length;n+=2){let o=e.slice(n,n+2).map((o,i)=>{let s=n+i,l=String(o.title||""),c=String(o.subtitle||""),d=String(o.textEmphasis||l),u=String(o.imagePrompt||""),f=String(o.colorScheme||""),p=s===e.length-1;return h(`한국 SNS 콘텐츠 이미지 생성.

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
${p?'- CTA 느낌, "지금 시작" 버튼 느낌':""}

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

출력 전 검증: 이미지 내 모든 한국어가 "${d}"와 "${c}"와 정확히 일치하는지 확인.`).then(e=>{a[s]=e||""}).catch(e=>{console.warn(`[Image ${s+1}] 실패:`,e),a[s]=""})});await Promise.allSettled(o),n+2<e.length&&await new Promise(e=>setTimeout(e,3e3))}return a}async function j(e,t="instagram",r=!1,a=!1){let n=String(e.title||""),o=String(e.subtitle||""),i=String(e.textEmphasis||n),s=String(e.imagePrompt||""),l=String(e.colorScheme||""),c=`한국 SNS 콘텐츠 이미지.
장면: ${s}
색상: ${l||"다크 + 보라"}
상단/하단 한국어 텍스트: "${i}"${o?` / "${o}"`:""}
텍스트: 흰색 두꺼운 고딕 + 검정 그림자
규칙: 중앙 텍스트 금지, DSLR 사실적 사진, 실제 한국인, 한국어 오타 금지
비율: ${{instagram:"정사각형 1:1",tiktok:"세로 9:16",facebook:"가로 16:9"}[t]}
${a?"CTA 느낌, 결심하는 인물":r?"스크롤 멈추는 충격적 장면":"진지한 정보 전달"}`;return await h(c)||""}async function A(e){await s(e),localStorage.removeItem("hookflow_history")}e.s(["CATEGORIES",0,[{key:"all",label:"전체",emoji:"🔥"},{key:"음식",label:"음식/맛집",emoji:"🍽"},{key:"다이어트",label:"다이어트",emoji:"💪"},{key:"건강",label:"건강/의약",emoji:"🏥"},{key:"식단",label:"식단/영양",emoji:"🥗"},{key:"쇼핑",label:"쇼핑트렌드",emoji:"🛍"},{key:"화장품",label:"화장품/뷰티",emoji:"💄"},{key:"의류",label:"의류/패션",emoji:"👗"},{key:"인플루언서",label:"인플루언서",emoji:"📱"},{key:"셀럽",label:"연예인/셀럽",emoji:"⭐"},{key:"테크",label:"IT/테크",emoji:"💻"},{key:"재테크",label:"재테크/부업",emoji:"💰"},{key:"시즌",label:"시즌/이벤트",emoji:"📅"},{key:"글로벌",label:"글로벌/나라별",emoji:"🌍"},{key:"지혜",label:"지혜/철학/종교",emoji:"🕊"},{key:"연애",label:"연애/관계/성",emoji:"💕"}],"fetchTrends",0,b,"generateCarouselSlides",0,S,"generateHooks",0,w,"generateSlideImages",0,v,"getActiveProvider",0,f,"getApiKey",0,e=>u(`${e}_key`),"hasGeminiKey",0,p,"regenerateSingleImage",0,j,"saveToHistory",0,A,"setApiKey",0,(e,t)=>{var r;return r=`${e}_key`,void localStorage.setItem(`hookflow_${r}`,t)}],15970);let N=[{href:"/",label:"트렌드",icon:"📊"},{href:"/generate",label:"생성",icon:"🚀"},{href:"/custom",label:"커스텀",icon:"✏"},{href:"/history",label:"히스토리",icon:"📋"},{href:"/settings",label:"설정",icon:"⚙"}];e.s(["default",0,function(){let e=(0,a.usePathname)(),[o,i]=(0,n.useState)({claude:!1,nano:!1});return(0,n.useEffect)(()=>{i({claude:"none"!==f(),nano:p()})},[]),(0,t.jsx)("nav",{className:"sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-xl",children:(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"flex items-center justify-between h-16",children:[(0,t.jsxs)(r.default,{href:"/",className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold text-sm",children:"HF"}),(0,t.jsxs)("span",{className:"text-lg font-bold",children:[(0,t.jsx)("span",{className:"gradient-text",children:"HookFlow"})," ",(0,t.jsx)("span",{className:"text-foreground/60",children:"AI"})]})]}),(0,t.jsx)("div",{className:"flex items-center gap-1",children:N.map(a=>(0,t.jsxs)(r.default,{href:a.href,className:`px-3 py-2 rounded-lg text-sm font-medium transition-all ${e===a.href?"bg-accent/15 text-accent":"text-foreground/60 hover:text-foreground hover:bg-card-bg"}`,children:[(0,t.jsx)("span",{className:"mr-1",children:a.icon}),a.label]},a.href))}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${o.claude?"bg-success":"bg-danger"}`}),(0,t.jsx)("span",{className:"text-foreground/50",children:o.claude?"Claude":"미연결"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${o.nano?"bg-purple-400":"bg-foreground/20"}`}),(0,t.jsx)("span",{className:"text-foreground/50",children:o.nano?"NanoBanana":"이미지 꺼짐"})]})]})]})})})}],32710)},33958,e=>{"use strict";var t=e.i(27707),r=e.i(39804),a=e.i(32710),n=e.i(15970);e.s(["default",0,function(){let[e,o]=(0,r.useState)(""),[i,s]=(0,r.useState)(""),[l,c]=(0,r.useState)(!1),[d,u]=(0,r.useState)(null),[f,p]=(0,r.useState)(!1),[g,h]=(0,r.useState)(null);async function m(){p(!0),u(null);try{let t=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":e.trim(),"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:30,messages:[{role:"user",content:'"연결 성공"이라고만 답해주세요.'}]})});if(t.ok){let e=await t.json();u(`Claude 연결 성공! "${e.content?.[0]?.text}"`)}else u(`Claude 실패 (${t.status})`)}catch(e){u(`오류: ${e instanceof Error?e.message:String(e)}`)}finally{p(!1)}}async function y(){p(!0),u(null),h(null);let e=i.trim();if(!e){u("Gemini API 키를 입력해주세요."),p(!1);return}try{(0,n.setApiKey)("gemini",e),u("NanoBanana 이미지 생성 중... (10~20초 소요)");let t=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:"Dark purple gradient abstract background, minimal geometric shapes, no text, professional, square format"}]}],generationConfig:{responseModalities:["TEXT","IMAGE"]}})});if(!t.ok){let e=await t.text();u(`Gemini API 오류 (${t.status}): ${e.slice(0,150)}`);return}let r=await t.json();for(let e of r?.candidates?.[0]?.content?.parts||[])if(e.inlineData){let t=`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`;h(t),u(`NanoBanana 성공! (${Math.round(e.inlineData.data.length/1024)}KB)`);return}u("응답에 이미지가 없습니다. 다시 시도해주세요.")}catch(e){u(`네트워크 오류: ${e instanceof Error?e.message:String(e)}`)}finally{p(!1)}}(0,r.useEffect)(()=>{o((0,n.getApiKey)("anthropic")),s((0,n.getApiKey)("gemini"))},[]);let b=(0,n.getActiveProvider)(),x=(0,n.hasGeminiKey)();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.default,{}),(0,t.jsxs)("main",{className:"flex-1 max-w-2xl mx-auto w-full px-4 py-8",children:[(0,t.jsx)("h1",{className:"text-2xl font-bold mb-6",children:(0,t.jsx)("span",{className:"gradient-text",children:"API 설정"})}),(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,t.jsxs)("div",{className:`p-4 rounded-xl border text-center ${"none"!==b?"bg-success/10 border-success/30":"bg-danger/10 border-danger/30"}`,children:[(0,t.jsx)("div",{className:`w-3 h-3 rounded-full mx-auto mb-2 ${"none"!==b?"bg-success":"bg-danger"}`}),(0,t.jsx)("div",{className:"text-xs font-bold",children:"none"!==b?"Claude 연결됨":"Claude 미연결"}),(0,t.jsx)("div",{className:"text-[10px] text-foreground/40 mt-1",children:"텍스트 생성"})]}),(0,t.jsxs)("div",{className:`p-4 rounded-xl border text-center ${x?"bg-success/10 border-success/30":"bg-warning/10 border-warning/30"}`,children:[(0,t.jsx)("div",{className:`w-3 h-3 rounded-full mx-auto mb-2 ${x?"bg-success":"bg-warning"}`}),(0,t.jsx)("div",{className:"text-xs font-bold",children:x?"NanoBanana 연결됨":"NanoBanana 미연결"}),(0,t.jsx)("div",{className:"text-[10px] text-foreground/40 mt-1",children:"이미지 생성"})]})]}),(0,t.jsxs)("div",{className:"p-6 rounded-xl bg-card-bg border border-accent/30 space-y-3",children:[(0,t.jsxs)("h2",{className:"font-bold text-sm",children:["Anthropic Claude API ",(0,t.jsx)("span",{className:"text-accent",children:"(필수)"})]}),(0,t.jsx)("p",{className:"text-xs text-foreground/40",children:"후킹 콘텐츠, 카루셀 구조, 랜딩 페이지 생성에 사용"}),(0,t.jsx)("input",{type:"password",placeholder:"sk-ant-api03-...",value:e,onChange:e=>o(e.target.value),className:"w-full px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm font-mono focus:outline-none focus:border-accent"}),(0,t.jsx)("p",{className:"text-[10px] text-foreground/30",children:"발급: console.anthropic.com → API Keys → Create Key"})]}),(0,t.jsxs)("div",{className:"p-6 rounded-xl bg-card-bg border border-purple-500/30 space-y-3",children:[(0,t.jsxs)("h2",{className:"font-bold text-sm",children:["Gemini API = NanoBanana ",(0,t.jsx)("span",{className:"text-purple-400",children:"(이미지 생성)"})]}),(0,t.jsx)("p",{className:"text-xs text-foreground/40",children:"카루셀 배경 이미지 자동 생성. 무료 키 사용 가능!"}),(0,t.jsx)("input",{type:"password",placeholder:"AIzaSy...",value:i,onChange:e=>s(e.target.value),className:"w-full px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm font-mono focus:outline-none focus:border-accent"}),(0,t.jsx)("p",{className:"text-[10px] text-foreground/30",children:"발급: aistudio.google.com → Get API Key → Create (무료)"})]}),(0,t.jsx)("button",{onClick:function(){(0,n.setApiKey)("anthropic",e.trim()),(0,n.setApiKey)("gemini",i.trim()),c(!0),setTimeout(()=>c(!1),3e3)},className:"w-full py-3 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90",children:l?"저장 완료!":"저장하기"}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,t.jsx)("button",{onClick:m,disabled:f||!e,className:"py-2.5 rounded-xl bg-card-bg border border-card-border text-sm font-medium hover:border-accent/30 disabled:opacity-40",children:f?"...":"Claude 테스트"}),(0,t.jsx)("button",{onClick:y,disabled:f||!i,className:"py-2.5 rounded-xl bg-card-bg border border-purple-500/30 text-sm font-medium hover:border-purple-500/50 disabled:opacity-40",children:f?"...":"NanoBanana 테스트"})]}),d&&(0,t.jsx)("div",{className:`p-4 rounded-xl border text-sm ${d.includes("성공")?"bg-success/10 border-success/30 text-success":"bg-danger/10 border-danger/30 text-danger"}`,children:d}),g&&(0,t.jsxs)("div",{className:"rounded-xl overflow-hidden border border-card-border",children:[(0,t.jsx)("img",{src:g,alt:"NanoBanana test",className:"w-full aspect-square object-cover"}),(0,t.jsx)("div",{className:"p-2 bg-card-bg text-xs text-center text-foreground/40",children:"NanoBanana 테스트 이미지"})]}),(0,t.jsxs)("div",{className:"p-4 rounded-xl bg-accent/5 border border-accent/20 text-xs text-foreground/50 space-y-2",children:[(0,t.jsx)("p",{className:"font-bold text-accent text-sm",children:"빠른 시작"}),(0,t.jsx)("p",{children:"1. Claude API 키 입력 → 저장 → 테스트"}),(0,t.jsx)("p",{children:"2. (선택) Gemini 키 입력 → NanoBanana 이미지 활성화"}),(0,t.jsx)("p",{children:"3. 트렌드 페이지에서 토픽 선택 → 자동 생성!"})]})]})]})]})}])}]);