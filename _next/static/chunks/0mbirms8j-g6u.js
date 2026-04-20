(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,75732,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={formatUrl:function(){return i},formatWithValidation:function(){return c},urlObjectKeys:function(){return l}};for(var s in a)Object.defineProperty(r,s,{enumerable:!0,get:a[s]});let o=e.r(39258)._(e.r(70770)),n=/https?|ftp|gopher|file/;function i(e){let{auth:t,hostname:r}=e,a=e.protocol||"",s=e.pathname||"",i=e.hash||"",l=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),l&&"object"==typeof l&&(l=String(o.urlQueryToSearchParams(l)));let d=e.search||l&&`?${l}`||"";return a&&!a.endsWith(":")&&(a+=":"),e.slashes||(!a||n.test(a))&&!1!==c?(c="//"+(c||""),s&&"/"!==s[0]&&(s="/"+s)):c||(c=""),i&&"#"!==i[0]&&(i="#"+i),d&&"?"!==d[0]&&(d="?"+d),s=s.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${a}${c}${s}${d}${i}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return i(e)}},41664,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return s}});let a=e.r(39804);function s(e,t){let r=(0,a.useRef)(null),s=(0,a.useRef)(null);return(0,a.useCallback)(a=>{if(null===a){let e=r.current;e&&(r.current=null,e());let t=s.current;t&&(s.current=null,t())}else e&&(r.current=o(e,a)),t&&(s.current=o(t,a))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},46842,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return o}});let a=e.r(75233),s=e.r(64586);function o(e){if(!(0,a.isAbsoluteUrl)(e))return!0;try{let t=(0,a.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,s.hasBasePath)(r.pathname)}catch(e){return!1}}},46905,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},86607,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return g},useLinkStatus:function(){return y}};for(var s in a)Object.defineProperty(r,s,{enumerable:!0,get:a[s]});let o=e.r(39258),n=e.r(27707),i=o._(e.r(39804)),l=e.r(75732),c=e.r(36407),d=e.r(41664),u=e.r(75233),h=e.r(13946);e.r(12666);let m=e.r(16373),x=e.r(60672),f=e.r(46842),p=e.r(32114);function g(t){var r,a;let s,o,g,[y,j]=(0,i.useOptimistic)(x.IDLE_LINK_STATUS),S=(0,i.useRef)(null),{href:v,as:w,children:N,prefetch:k=null,passHref:$,replace:A,shallow:O,scroll:P,onClick:I,onMouseEnter:T,onTouchStart:_,legacyBehavior:D=!1,onNavigate:M,transitionTypes:C,ref:E,unstable_dynamicOnHover:R,...L}=t;s=N,D&&("string"==typeof s||"number"==typeof s)&&(s=(0,n.jsx)("a",{children:s}));let K=i.default.useContext(c.AppRouterContext),J=!1!==k,Q=!1!==k?null===(a=k)||"auto"===a?p.FetchStrategy.PPR:p.FetchStrategy.Full:p.FetchStrategy.PPR,B="string"==typeof(r=w||v)?r:(0,l.formatUrl)(r);if(D){if(s?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});o=i.default.Children.only(s)}let U=D?o&&"object"==typeof o&&o.ref:E,H=i.default.useCallback(e=>(null!==K&&(S.current=(0,x.mountLinkInstance)(e,B,K,Q,J,j)),()=>{S.current&&((0,x.unmountLinkForCurrentNavigation)(S.current),S.current=null),(0,x.unmountPrefetchableInstance)(e)}),[J,B,K,Q,j]),V={ref:(0,d.useMergedRef)(H,U),onClick(t){D||"function"!=typeof I||I(t),D&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),!K||t.defaultPrevented||function(t,r,a,s,o,n,l){if("u">typeof window){let c,{nodeName:d}=t.currentTarget;if("A"===d.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,f.isLocalURL)(r)){s&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),n){let e=!1;if(n({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:u}=e.r(51605);i.default.startTransition(()=>{u(r,s?"replace":"push",!1===o?m.ScrollBehavior.NoScroll:m.ScrollBehavior.Default,a.current,l)})}}(t,B,S,A,P,M,C)},onMouseEnter(e){D||"function"!=typeof T||T(e),D&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),K&&J&&(0,x.onNavigationIntent)(e.currentTarget,!0===R)},onTouchStart:function(e){D||"function"!=typeof _||_(e),D&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),K&&J&&(0,x.onNavigationIntent)(e.currentTarget,!0===R)}};return(0,u.isAbsoluteUrl)(B)?V.href=B:D&&!$&&("a"!==o.type||"href"in o.props)||(V.href=(0,h.addBasePath)(B)),g=D?i.default.cloneElement(o,V):(0,n.jsx)("a",{...L,...V,children:s}),(0,n.jsx)(b.Provider,{value:y,children:g})}e.r(46905);let b=(0,i.createContext)(x.IDLE_LINK_STATUS),y=()=>(0,i.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},40281,(e,t,r)=>{t.exports=e.r(99753)},32710,44453,15970,e=>{"use strict";var t=e.i(27707),r=e.i(86607),a=e.i(40281),s=e.i(39804);let o="history";function n(){return new Promise((e,t)=>{let r=indexedDB.open("hookflow",1);r.onerror=()=>t(r.error),r.onsuccess=()=>e(r.result),r.onupgradeneeded=()=>{let e=r.result;e.objectStoreNames.contains(o)||e.createObjectStore(o,{keyPath:"id"}).createIndex("createdAt","createdAt")}})}async function i(e){try{let t=await n(),r=`h_${Date.now()}`,a={id:r,createdAt:new Date().toISOString(),...e};return new Promise((e,s)=>{let n=t.transaction(o,"readwrite").objectStore(o).put(a);n.onsuccess=()=>e(r),n.onerror=()=>s(n.error)})}catch(e){return console.error("[History] Save failed:",e),""}}async function l(){try{let e=await n();return new Promise((t,r)=>{let a=e.transaction(o,"readonly").objectStore(o).getAll();a.onsuccess=()=>{let e=a.result.sort((e,t)=>new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime());t(e)},a.onerror=()=>r(a.error)})}catch(e){return console.error("[History] Get failed:",e),[]}}async function c(e){try{let t=await n();return new Promise((r,a)=>{let s=t.transaction(o,"readwrite");s.objectStore(o).delete(e),s.oncomplete=()=>r(),s.onerror=()=>a(s.error)})}catch(e){console.error("[History] Delete failed:",e)}}async function d(){try{let e=await n();return new Promise((t,r)=>{let a=e.transaction(o,"readwrite");a.objectStore(o).clear(),a.oncomplete=()=>t(),a.onerror=()=>r(a.error)})}catch(e){console.error("[History] Clear failed:",e)}}function u(e){return localStorage.getItem(`hookflow_${e}`)||""}function h(){return u("anthropic_key")?"anthropic":"none"}function m(){return!!u("gemini_key")}async function x(e,t,r={}){let a=u("anthropic_key");if(!a)throw Error("Anthropic API 키를 설정 페이지에서 입력해주세요.");let s={model:"claude-haiku-4-5-20251001",max_tokens:r.max||2048,temperature:r.temp??.7,system:e,messages:[{role:"user",content:t}]};r.webSearch&&(s.tools=[{type:"web_search_20250305",name:"web_search",max_uses:5}]);let o=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify(s)});if(!o.ok){let e=await o.text();if(429===o.status){console.warn("[Claude] Rate limit - 20초 후 자동 재시도"),await new Promise(e=>setTimeout(e,2e4));let e=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":a,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify(s)});if(e.ok){let t=await e.json(),r="";for(let e of t.content||[])"text"===e.type&&(r+=e.text);return r}throw Error("분당 요청 한도(Rate Limit) 초과. 1~2분 후 다시 시도해주세요.")}if(529===o.status||503===o.status)throw Error("Claude 서버가 일시적으로 과부하 상태입니다. 잠시 후 재시도해주세요.");throw Error(`Claude 오류(${o.status}): ${e.slice(0,150)}`)}let n=await o.json(),i="";for(let e of n.content||[])"text"===e.type&&(i+=e.text);return i}async function f(e){let t=u("gemini_key");if(!t)return null;try{let r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:e}]}],generationConfig:{responseModalities:["TEXT","IMAGE"]}})});if(!r.ok){let e=await r.text();return console.error("[NanoBanana] Gemini",r.status,e.slice(0,300)),null}let a=await r.json();for(let e of a?.candidates?.[0]?.content?.parts||[])if(e.inlineData)return`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`;return null}catch(e){return console.warn("[NanoBanana] 오류:",e),null}}function p(e){if(!e||!e.trim())throw Error("AI 응답이 비어있습니다.");let t=e.match(/```(?:json)?\s*([\s\S]*?)```/);if(t)try{return JSON.parse(t[1].trim())}catch{}for(let t of(e=>{let t=[],r=0,a=-1;for(let s=0;s<e.length;s++)"["===e[s]?(0===r&&(a=s),r++):"]"===e[s]&&0==--r&&-1!==a&&(t.push(e.slice(a,s+1)),a=-1);return t})(e).sort((e,t)=>t.length-e.length))try{return JSON.parse(t)}catch{}let r=e.match(/\{[\s\S]*\}/);if(r)try{return JSON.parse(r[0])}catch{}throw console.error("[HookFlow] JSON 파싱 실패 원문 (처음 500자):",e.slice(0,500)),Error(`AI 응답 파싱 실패. 다시 시도해주세요. (원문: ${e.slice(0,100)})`)}e.s(["clearHistoryDB",0,d,"deleteHistoryDB",0,c,"getHistoryDB",0,l,"saveHistoryDB",0,i],44453);let g="hookflow_trends_cache";async function b(e=!1){if(!e){let e=function(){try{let e=localStorage.getItem(g);if(!e)return null;let{data:t,timestamp:r}=JSON.parse(e);if(Date.now()-r<216e5)return t;localStorage.removeItem(g)}catch{}return null}();if(e&&e.length>0)return e}if("none"===h())return y();try{let e=new Date().toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"long"}),t=await x(`2026년 한국/글로벌 실시간 트렌드 분석가.
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
[{"title":"","description":"","traffic":"","views":"","category":"","relatedQueries":[""]}]`,{temp:.3,max:6e3,webSearch:!0}),r=p(t),a=(Array.isArray(r)?r:[]).map((e,t)=>({id:`t_${t}_${Date.now()}`,title:String(e.title||""),source:"AI 분석",description:String(e.description||""),traffic:String(e.traffic||"10K+"),views:String(e.views||"100K views"),relatedQueries:Array.isArray(e.relatedQueries)?e.relatedQueries.map(String):[],category:String(e.category||"기타"),fetchedAt:new Date().toISOString()}));if(a.length>0)return localStorage.setItem(g,JSON.stringify({data:a,timestamp:Date.now()})),a}catch(e){console.error("[HookFlow] AI 트렌드 생성 실패:",e)}return y()}function y(){return[{id:"d1",title:"제로 칼로리 디저트 열풍",source:"AI",description:"제로 칼로리 디저트가 SNS를 점령. 다이어트 중에도 즐기는 죄책감 없는 간식 트렌드.",traffic:"800K+",views:"5M views",relatedQueries:["제로슈거","다이어트간식"],category:"음식",fetchedAt:new Date().toISOString()},{id:"d2",title:"12-3-30 워킹 다이어트",source:"AI",description:"틱톡에서 폭발적 인기. 경사 12, 속도 3, 30분 걷기로 체중 감량 성공 사례 속출.",traffic:"1.2M+",views:"15M views",relatedQueries:["걷기다이어트","틱톡운동"],category:"다이어트",fetchedAt:new Date().toISOString()},{id:"d3",title:"장건강이 피부를 바꾼다",source:"AI",description:"프로바이오틱스와 장건강이 피부 개선에 직접 영향. 피부과 전문의 추천 루틴 화제.",traffic:"500K+",views:"3M views",relatedQueries:["장건강","피부관리"],category:"건강",fetchedAt:new Date().toISOString()},{id:"d4",title:"고단백 도시락 밀프렙",source:"AI",description:"일주일치 고단백 도시락을 한번에 준비하는 밀프렙 콘텐츠가 직장인들 사이에서 대유행.",traffic:"300K+",views:"2M views",relatedQueries:["밀프렙","고단백식단"],category:"식단",fetchedAt:new Date().toISOString()},{id:"d5",title:"무신사 여름 세일 핫딜",source:"AI",description:"무신사 시즌 세일 시작. 최대 80% 할인 품목 정리 콘텐츠 조회수 폭발.",traffic:"600K+",views:"4M views",relatedQueries:["무신사세일","여름패션"],category:"쇼핑",fetchedAt:new Date().toISOString()},{id:"d6",title:"선크림 하나로 톤업 완성",source:"AI",description:"톤업 선크림 비교 리뷰 영상이 화제. 화장 없이 피부 보정 효과 검증.",traffic:"400K+",views:"6M views",relatedQueries:["톤업선크림","데일리선케어"],category:"화장품",fetchedAt:new Date().toISOString()},{id:"d7",title:"올드머니룩 코디법",source:"AI",description:'조용한 럭셔리 "올드머니룩"이 패션 트렌드 1위. 기본 아이템으로 고급스러운 스타일링.',traffic:"700K+",views:"8M views",relatedQueries:["올드머니룩","미니멀패션"],category:"의류",fetchedAt:new Date().toISOString()},{id:"d8",title:"쯔양 복귀 먹방 1000만뷰",source:"AI",description:"쯔양의 복귀 먹방 영상이 1000만 뷰를 돌파. 유튜브 실시간 트렌딩 1위 기록.",traffic:"2M+",views:"10M views",relatedQueries:["쯔양","먹방유튜버"],category:"인플루언서",fetchedAt:new Date().toISOString()},{id:"d9",title:"BTS 진 솔로 컴백",source:"AI",description:"BTS 진의 솔로 앨범 발매 소식에 전 세계 팬덤이 들끓는 중. 선주문량 역대급.",traffic:"5M+",views:"50M views",relatedQueries:["BTS진","K-POP"],category:"셀럽",fetchedAt:new Date().toISOString()},{id:"d10",title:"AI로 월 500만원 부업",source:"AI",description:"ChatGPT와 AI 도구로 부업하는 실제 사례 모음. 초보자도 따라할 수 있는 가이드.",traffic:"1M+",views:"7M views",relatedQueries:["AI부업","자동수익"],category:"재테크",fetchedAt:new Date().toISOString()},{id:"d11",title:"Apple Vision Pro 2 출시",source:"AI",description:"Apple Vision Pro 2세대 공개. 가격 절반에 성능 2배. 국내 출시일 확정.",traffic:"800K+",views:"4M views",relatedQueries:["비전프로","애플신제품"],category:"테크",fetchedAt:new Date().toISOString()},{id:"d12",title:"아이브 월드투어 티켓팅 전쟁",source:"AI",description:"아이브 첫 월드투어 티켓 오픈과 동시에 전석 매진. 리셀 가격 10배 치솟아.",traffic:"3M+",views:"20M views",relatedQueries:["아이브","콘서트티켓"],category:"셀럽",fetchedAt:new Date().toISOString()},{id:"d13",title:"5월 어버이날 감동 선물 TOP 10",source:"AI",description:"2026년 어버이날 선물 트렌드. 건강식품부터 체험형 선물까지 가성비 랭킹.",traffic:"600K+",views:"3M views",relatedQueries:["어버이날","효도선물"],category:"시즌",fetchedAt:new Date().toISOString()},{id:"d14",title:"일본 벚꽃 명소 2026 업데이트",source:"AI",description:"2026년 일본 벚꽃 개화 시기 확정. 새로운 숨은 명소와 가성비 여행 루트 공개.",traffic:"400K+",views:"2M views",relatedQueries:["일본여행","벚꽃명소"],category:"글로벌",fetchedAt:new Date().toISOString()},{id:"d15",title:"마음이 힘들 때 읽는 법구경",source:"AI",description:"불교 경전 법구경 속 지혜의 말씀. 현대인의 번아웃을 치유하는 2600년 된 처방전.",traffic:"200K+",views:"1.5M views",relatedQueries:["명상","마음치유"],category:"지혜",fetchedAt:new Date().toISOString()},{id:"d16",title:"2026 연애 트렌드 대반전",source:"AI",description:'Z세대의 새로운 연애 문화 "슬로우 데이팅"이 전 세계적 트렌드. 빠른 만남보다 천천히 알아가는 관계 선호.',traffic:"700K+",views:"8M views",relatedQueries:["슬로우데이팅","연애트렌드"],category:"연애",fetchedAt:new Date().toISOString()},{id:"d17",title:"커플 심리테스트 1억뷰 돌파",source:"AI",description:"틱톡에서 유행하는 커플 궁합 심리테스트가 1억 뷰 돌파. 연인 관계 진단 콘텐츠 폭발.",traffic:"500K+",views:"100M views",relatedQueries:["커플테스트","연애심리"],category:"연애",fetchedAt:new Date().toISOString()}]}async function j(e,t,r=3,a=!1){let s={informative:"정보형",provocative:"자극형",storytelling:"스토리형"},o=a?`"${e.title}" ${s[t]||t} 대본 ${r}개. 웹 검색으로 최신 팩트 수집 후 JSON 배열만 반환:
[{"headline":"15자","subheadline":"30자","bodyPoints":["팩트+숫자","","","",""],"callToAction":"","targetAudience":""}]`:`"${e.title}" ${s[t]||t} 대본 ${r}개. JSON 배열만:
[{"headline":"15자","subheadline":"30자","bodyPoints":["","","","",""],"callToAction":"","targetAudience":""}]`,n=await x(a?"한국 SNS 마케팅 작가. 웹 검색 후 JSON만 출력. 설명 금지.":"한국 SNS 마케팅 작가. JSON만 출력. 설명 금지. 오타 금지.",o,{temp:.6,max:a?12e3:3e3,webSearch:a});try{let e=p(n);return Array.isArray(e)?e:[e]}catch{console.warn("[HookFlow] 후킹 1차 파싱 실패, 웹검색 없이 재시도");let a=p(await x("SNS 마케팅 작가. 순수 JSON 배열만. 설명 금지.",`"${e.title}" ${s[t]||t} 대본 ${r}개. 형식:
[{"headline":"15자","subheadline":"30자","bodyPoints":["","","","",""],"callToAction":"","targetAudience":""}]`,{temp:.5,max:3e3}));return Array.isArray(a)?a:[a]}}async function S(e,t=5){let r=p(await x(`당신은 한국 SNS 바이럴 콘텐츠 작가입니다.

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
]`,{temp:.7,max:8e3}));return Array.isArray(r)?r:[r]}async function v(e,t="instagram"){if(!m())return e.map(()=>"");let r={instagram:"정사각형 1:1",tiktok:"세로 9:16",facebook:"가로 16:9"},a=Array(e.length).fill("");for(let s=0;s<e.length;s+=2){let o=e.slice(s,s+2).map((o,n)=>{let i=s+n,l=String(o.title||""),c=String(o.subtitle||""),d=String(o.textEmphasis||l),u=String(o.imagePrompt||""),h=String(o.colorScheme||""),m=i===e.length-1;return f(`한국 SNS 콘텐츠 이미지 생성.

[이미지 장면 묘사 - 반드시 이 내용을 사실적으로 표현]
${u}

[색상 톤]
${h||"다크 모드 (#0F172A) + 보라 액센트 (#818CF8)"}

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
${m?'- CTA 느낌, "지금 시작" 버튼 느낌':""}

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

출력 전 검증: 이미지 내 모든 한국어가 "${d}"와 "${c}"와 정확히 일치하는지 확인.`).then(e=>{a[i]=e||""}).catch(e=>{console.warn(`[Image ${i+1}] 실패:`,e),a[i]=""})});await Promise.allSettled(o),s+2<e.length&&await new Promise(e=>setTimeout(e,3e3))}return a}async function w(e,t="instagram",r=!1,a=!1){let s=String(e.title||""),o=String(e.subtitle||""),n=String(e.textEmphasis||s),i=String(e.imagePrompt||""),l=String(e.colorScheme||""),c=`한국 SNS 콘텐츠 이미지.
장면: ${i}
색상: ${l||"다크 + 보라"}
상단/하단 한국어 텍스트: "${n}"${o?` / "${o}"`:""}
텍스트: 흰색 두꺼운 고딕 + 검정 그림자
규칙: 중앙 텍스트 금지, DSLR 사실적 사진, 실제 한국인, 한국어 오타 금지
비율: ${{instagram:"정사각형 1:1",tiktok:"세로 9:16",facebook:"가로 16:9"}[t]}
${a?"CTA 느낌, 결심하는 인물":r?"스크롤 멈추는 충격적 장면":"진지한 정보 전달"}`;return await f(c)||""}async function N(e){await i(e),localStorage.removeItem("hookflow_history")}async function k(){let e=new Date().toLocaleDateString("ko-KR"),t=await x(`한국/글로벌 YouTube\xb7SNS 바이럴 영상 분석 전문가.
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
}`,{temp:.4,max:16e3,webSearch:!0});try{return p(t)}catch{return p(await x("바이럴 영상 분석가. 순수 JSON만 반환.",`카테고리 10개 \xd7 6개 영상 = 60개의 바이럴 분석 JSON 생성.
형식: {"date":"${e}","totalVideos":60,"categories":{"철학_지혜":[{"title":"","channel":"","views":0,"viewsStr":"","engagementRate":0,"estimatedCPM":0,"estimatedRevenue":0,"viralSpeed":0,"region":"US","isShorts":true,"category":"철학_지혜","hookPattern":"empathy","uploadDate":""}]},"topCPM":[],"topEngagement":[],"topViralSpeed":[],"hookPatternDistribution":{},"regionDistribution":{},"shortsVsLong":{"shorts":0,"long":0},"nextWeekPredictions":[{"trend":"","growth":"","reason":""}],"executiveSummary":""}`,{temp:.5,max:12e3}))}}async function $(e,t="instagram"){return p(await x("SNS/YouTube SEO 전문가. 한국어. 오타금지. JSON만.",`"${e}" 주제 SEO 패키지 생성.

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
}`,{temp:.6,max:3e3}))}e.s(["CATEGORIES",0,[{key:"all",label:"전체",emoji:"🔥"},{key:"음식",label:"음식/맛집",emoji:"🍽"},{key:"다이어트",label:"다이어트",emoji:"💪"},{key:"건강",label:"건강/의약",emoji:"🏥"},{key:"식단",label:"식단/영양",emoji:"🥗"},{key:"쇼핑",label:"쇼핑트렌드",emoji:"🛍"},{key:"화장품",label:"화장품/뷰티",emoji:"💄"},{key:"의류",label:"의류/패션",emoji:"👗"},{key:"인플루언서",label:"인플루언서",emoji:"📱"},{key:"셀럽",label:"연예인/셀럽",emoji:"⭐"},{key:"테크",label:"IT/테크",emoji:"💻"},{key:"재테크",label:"재테크/부업",emoji:"💰"},{key:"시즌",label:"시즌/이벤트",emoji:"📅"},{key:"글로벌",label:"글로벌/나라별",emoji:"🌍"},{key:"지혜",label:"지혜/철학/종교",emoji:"🕊"},{key:"연애",label:"연애/관계/성",emoji:"💕"}],"fetchTrends",0,b,"generateAnalysisReport",0,k,"generateCarouselSlides",0,S,"generateHooks",0,j,"generateSEOPackage",0,$,"generateSlideImages",0,v,"getActiveProvider",0,h,"getApiKey",0,e=>u(`${e}_key`),"hasGeminiKey",0,m,"regenerateSingleImage",0,w,"reportToMarkdown",0,function(e){let t=`# 일일 바이럴 영상 분석 보고서

`;for(let[r,a]of(t+=`**${e.date}** \xb7 카테고리: ${Object.keys(e.categories).length}개 \xb7 분석 영상: ${e.totalVideos}개

---

## 📊 핵심 요약

${e.executiveSummary}

---

## 1️⃣ 카테고리별 트렌딩 영상

`,Object.entries(e.categories)))t+=`### ${r.replace("_","/")}

| 순위 | 제목 | 채널 | 조회수 | 참여율 | CPM | 수익 |
|---|---|---|---|---|---|---|
`,a.forEach((e,r)=>{t+=`| ${r+1} | ${e.title} | ${e.channel} | ${e.viewsStr} | ${e.engagementRate}% | $${e.estimatedCPM} | $${e.estimatedRevenue.toLocaleString()} |
`}),t+=`
`;for(let[r,a]of(t+=`
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

`,Object.entries(e.hookPatternDistribution)))t+=`- **${r}**: ${a}개
`;for(let[r,a]of(t+=`
### 📱 Shorts vs 장편

- Shorts: ${e.shortsVsLong.shorts}개
- 장편: ${e.shortsVsLong.long}개

### 🌍 지역 분포

`,Object.entries(e.regionDistribution)))t+=`- ${r}: ${a}개
`;return t+=`
## 4️⃣ 다음 주 트렌드 예측

`,e.nextWeekPredictions.forEach((e,r)=>{t+=`**${r+1}. ${e.trend}** (${e.growth})
${e.reason}

`}),t+=`
---

*Generated by HookFlow AI \xb7 ${new Date().toISOString()}*
`},"saveToHistory",0,N,"setApiKey",0,(e,t)=>{var r;return r=`${e}_key`,void localStorage.setItem(`hookflow_${r}`,t)}],15970);let A=[{href:"/",label:"트렌드",icon:"📊"},{href:"/analysis",label:"분석",icon:"📈"},{href:"/generate",label:"생성",icon:"🚀"},{href:"/custom",label:"커스텀",icon:"✏"},{href:"/history",label:"히스토리",icon:"📋"},{href:"/settings",label:"설정",icon:"⚙"}];e.s(["default",0,function(){let e=(0,a.usePathname)(),[o,n]=(0,s.useState)({claude:!1,nano:!1});return(0,s.useEffect)(()=>{n({claude:"none"!==h(),nano:m()})},[]),(0,t.jsx)("nav",{className:"sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-xl",children:(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"flex items-center justify-between h-16",children:[(0,t.jsxs)(r.default,{href:"/",className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold text-sm",children:"HF"}),(0,t.jsxs)("span",{className:"text-lg font-bold",children:[(0,t.jsx)("span",{className:"gradient-text",children:"HookFlow"})," ",(0,t.jsx)("span",{className:"text-foreground/60",children:"AI"})]})]}),(0,t.jsx)("div",{className:"flex items-center gap-1",children:A.map(a=>(0,t.jsxs)(r.default,{href:a.href,className:`px-3 py-2 rounded-lg text-sm font-medium transition-all ${e===a.href?"bg-accent/15 text-accent":"text-foreground/60 hover:text-foreground hover:bg-card-bg"}`,children:[(0,t.jsx)("span",{className:"mr-1",children:a.icon}),a.label]},a.href))}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${o.claude?"bg-success":"bg-danger"}`}),(0,t.jsx)("span",{className:"text-foreground/50",children:o.claude?"Claude":"미연결"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${o.nano?"bg-purple-400":"bg-foreground/20"}`}),(0,t.jsx)("span",{className:"text-foreground/50",children:o.nano?"NanoBanana":"이미지 꺼짐"})]})]})]})})})}],32710)},24704,e=>{"use strict";var t=e.i(27707),r=e.i(39804),a=e.i(32710),s=e.i(15970);e.s(["default",0,function(){let[e,o]=(0,r.useState)(null),[n,i]=(0,r.useState)(!1),[l,c]=(0,r.useState)(null),[d,u]=(0,r.useState)("summary");async function h(){if("none"===(0,s.getActiveProvider)())return void c("설정에서 Anthropic API 키를 먼저 입력하세요.");i(!0),c(null);try{let e=await (0,s.generateAnalysisReport)();o(e)}catch(e){c(e instanceof Error?e.message:"분석 실패")}finally{i(!1)}}return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.default,{}),(0,t.jsxs)("main",{className:"flex-1 max-w-7xl mx-auto w-full px-4 py-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"text-2xl font-bold",children:(0,t.jsx)("span",{className:"gradient-text",children:"일일 바이럴 분석"})}),(0,t.jsx)("p",{className:"text-foreground/40 text-sm mt-1",children:"오늘의 바이럴 영상 60개 분석 + 성능 지표 + 트렌드 예측"})]}),(0,t.jsxs)("div",{className:"flex gap-2",children:[e&&(0,t.jsx)("button",{onClick:function(){if(!e)return;let t=new Blob([(0,s.reportToMarkdown)(e)],{type:"text/markdown"}),r=URL.createObjectURL(t),a=document.createElement("a");a.href=r,a.download=`viral-report-${e.date}.md`,a.click(),URL.revokeObjectURL(r)},className:"px-4 py-2 rounded-lg bg-accent/15 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/25",children:"📄 보고서 다운로드 (.md)"}),(0,t.jsx)("button",{onClick:h,disabled:n,className:"px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-purple-500 text-white text-sm font-bold disabled:opacity-50",children:n?"분석 중...":e?"재분석":"오늘 분석 시작"})]})]}),l&&(0,t.jsx)("div",{className:"mb-4 p-4 rounded-xl bg-danger/10 border border-danger/30 text-sm text-danger",children:l}),n&&(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center py-20",children:[(0,t.jsx)("div",{className:"w-12 h-12 rounded-full border-[3px] border-accent/30 border-t-accent animate-spin mb-4"}),(0,t.jsx)("p",{className:"text-foreground/60 text-sm font-medium",children:"웹 검색으로 60개 바이럴 영상 분석 중..."}),(0,t.jsx)("p",{className:"text-foreground/30 text-xs mt-2",children:"2-3분 소요 (카테고리 10개 × 영상 6개)"})]}),!e&&!n&&(0,t.jsxs)("div",{className:"p-12 rounded-2xl border border-card-border bg-card-bg text-center",children:[(0,t.jsx)("div",{className:"text-5xl mb-4",children:"📊"}),(0,t.jsx)("h2",{className:"text-lg font-bold mb-2",children:"오늘의 바이럴 영상 분석"}),(0,t.jsx)("p",{className:"text-foreground/50 text-sm mb-1",children:"10개 카테고리 × 6개 영상 = 60개 실시간 분석"}),(0,t.jsx)("p",{className:"text-foreground/40 text-xs",children:"CPM, 참여율, 바이럴 속도, 훅 패턴, 다음 주 예측까지 자동 생성"}),(0,t.jsx)("div",{className:"mt-8 grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto",children:["철학/지혜","지식/교육","일상","웹툰/애니","아이교육","해외 바이럴","자기계발","재테크","건강","테크/IT"].map(e=>(0,t.jsx)("div",{className:"px-3 py-2 rounded-lg bg-background border border-card-border text-xs text-foreground/50",children:e},e))})]}),e&&!n&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"flex gap-1 mb-6 border-b border-card-border",children:[{key:"summary",label:"📊 요약"},{key:"categories",label:"📁 카테고리"},{key:"performance",label:"💰 성과"},{key:"trends",label:"🔮 트렌드 예측"}].map(e=>(0,t.jsx)("button",{onClick:()=>u(e.key),className:`px-4 py-2.5 text-sm font-medium transition-all ${d===e.key?"text-accent border-b-2 border-accent":"text-foreground/50 hover:text-foreground/80"}`,children:e.label},e.key))}),"summary"===d&&(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"p-6 rounded-xl bg-accent/5 border border-accent/20",children:[(0,t.jsx)("h3",{className:"text-sm font-bold text-accent mb-3",children:"💡 오늘의 핵심 인사이트"}),(0,t.jsx)("p",{className:"text-foreground/80 leading-relaxed",children:e.executiveSummary})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[(0,t.jsxs)("div",{className:"p-4 rounded-xl bg-card-bg border border-card-border",children:[(0,t.jsx)("div",{className:"text-2xl font-bold text-accent",children:e.totalVideos}),(0,t.jsx)("div",{className:"text-xs text-foreground/40 mt-1",children:"분석 영상"})]}),(0,t.jsxs)("div",{className:"p-4 rounded-xl bg-card-bg border border-card-border",children:[(0,t.jsx)("div",{className:"text-2xl font-bold text-purple-400",children:Object.keys(e.categories).length}),(0,t.jsx)("div",{className:"text-xs text-foreground/40 mt-1",children:"카테고리"})]}),(0,t.jsxs)("div",{className:"p-4 rounded-xl bg-card-bg border border-card-border",children:[(0,t.jsx)("div",{className:"text-2xl font-bold text-success",children:e.shortsVsLong.shorts}),(0,t.jsx)("div",{className:"text-xs text-foreground/40 mt-1",children:"Shorts"})]}),(0,t.jsxs)("div",{className:"p-4 rounded-xl bg-card-bg border border-card-border",children:[(0,t.jsx)("div",{className:"text-2xl font-bold text-warning",children:e.shortsVsLong.long}),(0,t.jsx)("div",{className:"text-xs text-foreground/40 mt-1",children:"장편"})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{className:"p-6 rounded-xl bg-card-bg border border-card-border",children:[(0,t.jsx)("h3",{className:"text-sm font-bold text-foreground/70 mb-3",children:"🎣 훅 패턴 분포"}),(0,t.jsx)("div",{className:"space-y-2",children:Object.entries(e.hookPatternDistribution).map(([r,a])=>(0,t.jsxs)("div",{className:"flex items-center justify-between text-sm",children:[(0,t.jsx)("span",{className:"capitalize",children:r}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-32 h-1.5 bg-background rounded-full overflow-hidden",children:(0,t.jsx)("div",{className:"h-full bg-accent",style:{width:`${a/e.totalVideos*100}%`}})}),(0,t.jsxs)("span",{className:"text-foreground/50 text-xs w-10 text-right",children:[a,"개"]})]})]},r))})]}),(0,t.jsxs)("div",{className:"p-6 rounded-xl bg-card-bg border border-card-border",children:[(0,t.jsx)("h3",{className:"text-sm font-bold text-foreground/70 mb-3",children:"🌍 지역 분포"}),(0,t.jsx)("div",{className:"space-y-2",children:Object.entries(e.regionDistribution).map(([r,a])=>(0,t.jsxs)("div",{className:"flex items-center justify-between text-sm",children:[(0,t.jsx)("span",{children:r}),(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-32 h-1.5 bg-background rounded-full overflow-hidden",children:(0,t.jsx)("div",{className:"h-full bg-purple-400",style:{width:`${a/e.totalVideos*100}%`}})}),(0,t.jsxs)("span",{className:"text-foreground/50 text-xs w-10 text-right",children:[a,"개"]})]})]},r))})]})]})]}),"categories"===d&&(0,t.jsx)("div",{className:"space-y-6",children:Object.entries(e.categories).map(([e,r])=>(0,t.jsxs)("div",{className:"p-5 rounded-xl bg-card-bg border border-card-border",children:[(0,t.jsx)("h3",{className:"text-base font-bold mb-4",children:e.replace("_","/")}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-card-border text-foreground/40",children:[(0,t.jsx)("th",{className:"py-2 px-2 text-left",children:"순위"}),(0,t.jsx)("th",{className:"py-2 px-2 text-left",children:"제목"}),(0,t.jsx)("th",{className:"py-2 px-2 text-left",children:"채널"}),(0,t.jsx)("th",{className:"py-2 px-2 text-right",children:"조회수"}),(0,t.jsx)("th",{className:"py-2 px-2 text-right",children:"참여율"}),(0,t.jsx)("th",{className:"py-2 px-2 text-right",children:"CPM"})]})}),(0,t.jsx)("tbody",{children:r.map((e,r)=>(0,t.jsxs)("tr",{className:"border-b border-card-border/30 hover:bg-accent/5",children:[(0,t.jsx)("td",{className:"py-2 px-2 text-foreground/50",children:r+1}),(0,t.jsx)("td",{className:"py-2 px-2 font-medium max-w-md truncate",children:e.title}),(0,t.jsx)("td",{className:"py-2 px-2 text-foreground/60",children:e.channel}),(0,t.jsx)("td",{className:"py-2 px-2 text-right text-accent",children:e.viewsStr}),(0,t.jsxs)("td",{className:"py-2 px-2 text-right",children:[e.engagementRate,"%"]}),(0,t.jsxs)("td",{className:"py-2 px-2 text-right text-success",children:["$",e.estimatedCPM]})]},r))})]})})]},e))}),"performance"===d&&(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"p-5 rounded-xl bg-card-bg border border-card-border",children:[(0,t.jsx)("h3",{className:"text-base font-bold mb-4",children:"💰 CPM TOP 10 (광고 수익 관점)"}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-card-border text-foreground/40",children:[(0,t.jsx)("th",{className:"py-2 px-2 text-left",children:"순위"}),(0,t.jsx)("th",{className:"py-2 px-2 text-left",children:"제목"}),(0,t.jsx)("th",{className:"py-2 px-2 text-left",children:"카테고리"}),(0,t.jsx)("th",{className:"py-2 px-2 text-right",children:"CPM"}),(0,t.jsx)("th",{className:"py-2 px-2 text-right",children:"예상 수익"})]})}),(0,t.jsx)("tbody",{children:(e.topCPM||[]).slice(0,10).map((e,r)=>(0,t.jsxs)("tr",{className:"border-b border-card-border/30",children:[(0,t.jsx)("td",{className:"py-2 px-2",children:r+1}),(0,t.jsx)("td",{className:"py-2 px-2 font-medium max-w-md truncate",children:e.title}),(0,t.jsx)("td",{className:"py-2 px-2 text-foreground/60",children:e.category?.replace("_","/")}),(0,t.jsxs)("td",{className:"py-2 px-2 text-right text-success font-bold",children:["$",e.estimatedCPM]}),(0,t.jsxs)("td",{className:"py-2 px-2 text-right",children:["$",e.estimatedRevenue?.toLocaleString()]})]},r))})]})})]}),(0,t.jsxs)("div",{className:"p-5 rounded-xl bg-card-bg border border-card-border",children:[(0,t.jsx)("h3",{className:"text-base font-bold mb-4",children:"🚀 바이럴 속도 TOP 10"}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-card-border text-foreground/40",children:[(0,t.jsx)("th",{className:"py-2 px-2 text-left",children:"순위"}),(0,t.jsx)("th",{className:"py-2 px-2 text-left",children:"제목"}),(0,t.jsx)("th",{className:"py-2 px-2 text-right",children:"일평균 조회"}),(0,t.jsx)("th",{className:"py-2 px-2 text-left",children:"카테고리"})]})}),(0,t.jsx)("tbody",{children:(e.topViralSpeed||[]).slice(0,10).map((e,r)=>(0,t.jsxs)("tr",{className:"border-b border-card-border/30",children:[(0,t.jsx)("td",{className:"py-2 px-2",children:r+1}),(0,t.jsx)("td",{className:"py-2 px-2 font-medium max-w-md truncate",children:e.title}),(0,t.jsx)("td",{className:"py-2 px-2 text-right text-accent font-bold",children:e.viralSpeed?.toLocaleString()}),(0,t.jsx)("td",{className:"py-2 px-2 text-foreground/60",children:e.category?.replace("_","/")})]},r))})]})})]})]}),"trends"===d&&(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)("h3",{className:"text-sm text-foreground/70 mb-2",children:"📅 다음 주 트렌드 예측"}),(e.nextWeekPredictions||[]).map((e,r)=>(0,t.jsxs)("div",{className:"p-5 rounded-xl bg-gradient-to-br from-accent/5 to-purple-500/5 border border-accent/20",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsxs)("h4",{className:"font-bold text-lg",children:[r+1,". ",e.trend]}),(0,t.jsx)("span",{className:"px-3 py-1 rounded-full bg-success/20 text-success text-sm font-bold",children:e.growth})]}),(0,t.jsx)("p",{className:"text-foreground/60 text-sm",children:e.reason})]},r))]})]})]})]})}])}]);