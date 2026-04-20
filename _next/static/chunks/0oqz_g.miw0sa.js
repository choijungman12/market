(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,40281,(e,t,r)=>{t.exports=e.r(99753)},75732,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return l},formatWithValidation:function(){return c},urlObjectKeys:function(){return s}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=e.r(39258)._(e.r(70770)),a=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,n=e.protocol||"",o=e.pathname||"",l=e.hash||"",s=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),s&&"object"==typeof s&&(s=String(i.urlQueryToSearchParams(s)));let d=e.search||s&&`?${s}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||a.test(n))&&!1!==c?(c="//"+(c||""),o&&"/"!==o[0]&&(o="/"+o)):c||(c=""),l&&"#"!==l[0]&&(l="#"+l),d&&"?"!==d[0]&&(d="?"+d),o=o.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${n}${c}${o}${d}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return l(e)}},41664,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(39804);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=i(e,n)),t&&(o.current=i(t,n))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},46842,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return i}});let n=e.r(75233),o=e.r(64586);function i(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},46905,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},86607,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return y},useLinkStatus:function(){return b}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=e.r(39258),a=e.r(27707),l=i._(e.r(39804)),s=e.r(75732),c=e.r(36407),d=e.r(41664),u=e.r(75233),f=e.r(13946);e.r(12666);let p=e.r(16373),h=e.r(60672),m=e.r(46842),g=e.r(32114);function y(t){var r,n;let o,i,y,[b,w]=(0,l.useOptimistic)(h.IDLE_LINK_STATUS),S=(0,l.useRef)(null),{href:v,as:j,children:A,prefetch:k=null,passHref:N,replace:I,shallow:O,scroll:$,onClick:P,onMouseEnter:D,onTouchStart:T,legacyBehavior:C=!1,onNavigate:_,transitionTypes:M,ref:R,unstable_dynamicOnHover:E,...K}=t;o=A,C&&("string"==typeof o||"number"==typeof o)&&(o=(0,a.jsx)("a",{children:o}));let Q=l.default.useContext(c.AppRouterContext),H=!1!==k,F=!1!==k?null===(n=k)||"auto"===n?g.FetchStrategy.PPR:g.FetchStrategy.Full:g.FetchStrategy.PPR,L="string"==typeof(r=j||v)?r:(0,s.formatUrl)(r);if(C){if(o?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});i=l.default.Children.only(o)}let B=C?i&&"object"==typeof i&&i.ref:R,J=l.default.useCallback(e=>(null!==Q&&(S.current=(0,h.mountLinkInstance)(e,L,Q,F,H,w)),()=>{S.current&&((0,h.unmountLinkForCurrentNavigation)(S.current),S.current=null),(0,h.unmountPrefetchableInstance)(e)}),[H,L,Q,F,w]),U={ref:(0,d.useMergedRef)(J,B),onClick(t){C||"function"!=typeof P||P(t),C&&i.props&&"function"==typeof i.props.onClick&&i.props.onClick(t),!Q||t.defaultPrevented||function(t,r,n,o,i,a,s){if("u">typeof window){let c,{nodeName:d}=t.currentTarget;if("A"===d.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,m.isLocalURL)(r)){o&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),a){let e=!1;if(a({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:u}=e.r(51605);l.default.startTransition(()=>{u(r,o?"replace":"push",!1===i?p.ScrollBehavior.NoScroll:p.ScrollBehavior.Default,n.current,s)})}}(t,L,S,I,$,_,M)},onMouseEnter(e){C||"function"!=typeof D||D(e),C&&i.props&&"function"==typeof i.props.onMouseEnter&&i.props.onMouseEnter(e),Q&&H&&(0,h.onNavigationIntent)(e.currentTarget,!0===E)},onTouchStart:function(e){C||"function"!=typeof T||T(e),C&&i.props&&"function"==typeof i.props.onTouchStart&&i.props.onTouchStart(e),Q&&H&&(0,h.onNavigationIntent)(e.currentTarget,!0===E)}};return(0,u.isAbsoluteUrl)(L)?U.href=L:C&&!N&&("a"!==i.type||"href"in i.props)||(U.href=(0,f.addBasePath)(L)),y=C?l.default.cloneElement(i,U):(0,a.jsx)("a",{...K,...U,children:o}),(0,a.jsx)(x.Provider,{value:b,children:y})}e.r(46905);let x=(0,l.createContext)(h.IDLE_LINK_STATUS),b=()=>(0,l.useContext)(x);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},32710,44453,15970,e=>{"use strict";var t=e.i(27707),r=e.i(86607),n=e.i(40281),o=e.i(39804);let i="history";function a(){return new Promise((e,t)=>{let r=indexedDB.open("hookflow",1);r.onerror=()=>t(r.error),r.onsuccess=()=>e(r.result),r.onupgradeneeded=()=>{let e=r.result;e.objectStoreNames.contains(i)||e.createObjectStore(i,{keyPath:"id"}).createIndex("createdAt","createdAt")}})}async function l(e){try{let t=await a(),r=`h_${Date.now()}`,n={id:r,createdAt:new Date().toISOString(),...e};return new Promise((e,o)=>{let a=t.transaction(i,"readwrite").objectStore(i).put(n);a.onsuccess=()=>e(r),a.onerror=()=>o(a.error)})}catch(e){return console.error("[History] Save failed:",e),""}}async function s(){try{let e=await a();return new Promise((t,r)=>{let n=e.transaction(i,"readonly").objectStore(i).getAll();n.onsuccess=()=>{let e=n.result.sort((e,t)=>new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime());t(e)},n.onerror=()=>r(n.error)})}catch(e){return console.error("[History] Get failed:",e),[]}}async function c(e){try{let t=await a();return new Promise((r,n)=>{let o=t.transaction(i,"readwrite");o.objectStore(i).delete(e),o.oncomplete=()=>r(),o.onerror=()=>n(o.error)})}catch(e){console.error("[History] Delete failed:",e)}}async function d(){try{let e=await a();return new Promise((t,r)=>{let n=e.transaction(i,"readwrite");n.objectStore(i).clear(),n.oncomplete=()=>t(),n.onerror=()=>r(n.error)})}catch(e){console.error("[History] Clear failed:",e)}}function u(e){return localStorage.getItem(`hookflow_${e}`)||""}function f(){return u("anthropic_key")?"anthropic":"none"}function p(){return!!u("gemini_key")}async function h(e,t,r={}){let n=u("anthropic_key");if(!n)throw Error("Anthropic API 키를 설정 페이지에서 입력해주세요.");let o={model:"claude-haiku-4-5-20251001",max_tokens:r.max||2048,temperature:r.temp??.7,system:e,messages:[{role:"user",content:t}]};r.webSearch&&(o.tools=[{type:"web_search_20250305",name:"web_search",max_uses:15}]);let i=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":n,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify(o)});if(!i.ok){let e=await i.text();throw Error(`Claude 오류(${i.status}): ${e.slice(0,150)}`)}let a=await i.json(),l="";for(let e of a.content||[])"text"===e.type&&(l+=e.text);return l}async function m(e){let t=u("gemini_key");if(!t)return null;try{let r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:e}]}],generationConfig:{responseModalities:["TEXT","IMAGE"]}})});if(!r.ok){let e=await r.text();return console.error("[NanoBanana] Gemini",r.status,e.slice(0,300)),null}let n=await r.json();for(let e of n?.candidates?.[0]?.content?.parts||[])if(e.inlineData)return`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`;return null}catch(e){return console.warn("[NanoBanana] 오류:",e),null}}function g(e){if(!e||!e.trim())throw Error("AI 응답이 비어있습니다.");let t=e.match(/```(?:json)?\s*([\s\S]*?)```/);if(t)try{return JSON.parse(t[1].trim())}catch{}for(let t of(e=>{let t=[],r=0,n=-1;for(let o=0;o<e.length;o++)"["===e[o]?(0===r&&(n=o),r++):"]"===e[o]&&0==--r&&-1!==n&&(t.push(e.slice(n,o+1)),n=-1);return t})(e).sort((e,t)=>t.length-e.length))try{return JSON.parse(t)}catch{}let r=e.match(/\{[\s\S]*\}/);if(r)try{return JSON.parse(r[0])}catch{}throw console.error("[HookFlow] JSON 파싱 실패 원문 (처음 500자):",e.slice(0,500)),Error(`AI 응답 파싱 실패. 다시 시도해주세요. (원문: ${e.slice(0,100)})`)}e.s(["clearHistoryDB",0,d,"deleteHistoryDB",0,c,"getHistoryDB",0,s,"saveHistoryDB",0,l],44453);let y="hookflow_trends_cache";async function x(e=!1){if(!e){let e=function(){try{let e=localStorage.getItem(y);if(!e)return null;let{data:t,timestamp:r}=JSON.parse(e);if(Date.now()-r<216e5)return t;localStorage.removeItem(y)}catch{}return null}();if(e&&e.length>0)return e}if("none"===f())return b();try{let e=new Date().toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"long"}),t=await h(`2026년 한국/글로벌 실시간 트렌드 분석가.
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
[{"title":"","description":"","traffic":"","views":"","category":"","relatedQueries":[""]}]`,{temp:.3,max:1e4,webSearch:!0}),r=g(t),n=(Array.isArray(r)?r:[]).map((e,t)=>({id:`t_${t}_${Date.now()}`,title:String(e.title||""),source:"AI 분석",description:String(e.description||""),traffic:String(e.traffic||"10K+"),views:String(e.views||"100K views"),relatedQueries:Array.isArray(e.relatedQueries)?e.relatedQueries.map(String):[],category:String(e.category||"기타"),fetchedAt:new Date().toISOString()}));if(n.length>0)return localStorage.setItem(y,JSON.stringify({data:n,timestamp:Date.now()})),n}catch(e){console.error("[HookFlow] AI 트렌드 생성 실패:",e)}return b()}function b(){return[{id:"d1",title:"제로 칼로리 디저트 열풍",source:"AI",description:"제로 칼로리 디저트가 SNS를 점령. 다이어트 중에도 즐기는 죄책감 없는 간식 트렌드.",traffic:"800K+",views:"5M views",relatedQueries:["제로슈거","다이어트간식"],category:"음식",fetchedAt:new Date().toISOString()},{id:"d2",title:"12-3-30 워킹 다이어트",source:"AI",description:"틱톡에서 폭발적 인기. 경사 12, 속도 3, 30분 걷기로 체중 감량 성공 사례 속출.",traffic:"1.2M+",views:"15M views",relatedQueries:["걷기다이어트","틱톡운동"],category:"다이어트",fetchedAt:new Date().toISOString()},{id:"d3",title:"장건강이 피부를 바꾼다",source:"AI",description:"프로바이오틱스와 장건강이 피부 개선에 직접 영향. 피부과 전문의 추천 루틴 화제.",traffic:"500K+",views:"3M views",relatedQueries:["장건강","피부관리"],category:"건강",fetchedAt:new Date().toISOString()},{id:"d4",title:"고단백 도시락 밀프렙",source:"AI",description:"일주일치 고단백 도시락을 한번에 준비하는 밀프렙 콘텐츠가 직장인들 사이에서 대유행.",traffic:"300K+",views:"2M views",relatedQueries:["밀프렙","고단백식단"],category:"식단",fetchedAt:new Date().toISOString()},{id:"d5",title:"무신사 여름 세일 핫딜",source:"AI",description:"무신사 시즌 세일 시작. 최대 80% 할인 품목 정리 콘텐츠 조회수 폭발.",traffic:"600K+",views:"4M views",relatedQueries:["무신사세일","여름패션"],category:"쇼핑",fetchedAt:new Date().toISOString()},{id:"d6",title:"선크림 하나로 톤업 완성",source:"AI",description:"톤업 선크림 비교 리뷰 영상이 화제. 화장 없이 피부 보정 효과 검증.",traffic:"400K+",views:"6M views",relatedQueries:["톤업선크림","데일리선케어"],category:"화장품",fetchedAt:new Date().toISOString()},{id:"d7",title:"올드머니룩 코디법",source:"AI",description:'조용한 럭셔리 "올드머니룩"이 패션 트렌드 1위. 기본 아이템으로 고급스러운 스타일링.',traffic:"700K+",views:"8M views",relatedQueries:["올드머니룩","미니멀패션"],category:"의류",fetchedAt:new Date().toISOString()},{id:"d8",title:"쯔양 복귀 먹방 1000만뷰",source:"AI",description:"쯔양의 복귀 먹방 영상이 1000만 뷰를 돌파. 유튜브 실시간 트렌딩 1위 기록.",traffic:"2M+",views:"10M views",relatedQueries:["쯔양","먹방유튜버"],category:"인플루언서",fetchedAt:new Date().toISOString()},{id:"d9",title:"BTS 진 솔로 컴백",source:"AI",description:"BTS 진의 솔로 앨범 발매 소식에 전 세계 팬덤이 들끓는 중. 선주문량 역대급.",traffic:"5M+",views:"50M views",relatedQueries:["BTS진","K-POP"],category:"셀럽",fetchedAt:new Date().toISOString()},{id:"d10",title:"AI로 월 500만원 부업",source:"AI",description:"ChatGPT와 AI 도구로 부업하는 실제 사례 모음. 초보자도 따라할 수 있는 가이드.",traffic:"1M+",views:"7M views",relatedQueries:["AI부업","자동수익"],category:"재테크",fetchedAt:new Date().toISOString()},{id:"d11",title:"Apple Vision Pro 2 출시",source:"AI",description:"Apple Vision Pro 2세대 공개. 가격 절반에 성능 2배. 국내 출시일 확정.",traffic:"800K+",views:"4M views",relatedQueries:["비전프로","애플신제품"],category:"테크",fetchedAt:new Date().toISOString()},{id:"d12",title:"아이브 월드투어 티켓팅 전쟁",source:"AI",description:"아이브 첫 월드투어 티켓 오픈과 동시에 전석 매진. 리셀 가격 10배 치솟아.",traffic:"3M+",views:"20M views",relatedQueries:["아이브","콘서트티켓"],category:"셀럽",fetchedAt:new Date().toISOString()},{id:"d13",title:"5월 어버이날 감동 선물 TOP 10",source:"AI",description:"2026년 어버이날 선물 트렌드. 건강식품부터 체험형 선물까지 가성비 랭킹.",traffic:"600K+",views:"3M views",relatedQueries:["어버이날","효도선물"],category:"시즌",fetchedAt:new Date().toISOString()},{id:"d14",title:"일본 벚꽃 명소 2026 업데이트",source:"AI",description:"2026년 일본 벚꽃 개화 시기 확정. 새로운 숨은 명소와 가성비 여행 루트 공개.",traffic:"400K+",views:"2M views",relatedQueries:["일본여행","벚꽃명소"],category:"글로벌",fetchedAt:new Date().toISOString()},{id:"d15",title:"마음이 힘들 때 읽는 법구경",source:"AI",description:"불교 경전 법구경 속 지혜의 말씀. 현대인의 번아웃을 치유하는 2600년 된 처방전.",traffic:"200K+",views:"1.5M views",relatedQueries:["명상","마음치유"],category:"지혜",fetchedAt:new Date().toISOString()},{id:"d16",title:"2026 연애 트렌드 대반전",source:"AI",description:'Z세대의 새로운 연애 문화 "슬로우 데이팅"이 전 세계적 트렌드. 빠른 만남보다 천천히 알아가는 관계 선호.',traffic:"700K+",views:"8M views",relatedQueries:["슬로우데이팅","연애트렌드"],category:"연애",fetchedAt:new Date().toISOString()},{id:"d17",title:"커플 심리테스트 1억뷰 돌파",source:"AI",description:"틱톡에서 유행하는 커플 궁합 심리테스트가 1억 뷰 돌파. 연인 관계 진단 콘텐츠 폭발.",traffic:"500K+",views:"100M views",relatedQueries:["커플테스트","연애심리"],category:"연애",fetchedAt:new Date().toISOString()}]}async function w(e,t,r=3){let n=new Date().toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"long"}),o=`${new Date().getFullYear()}년 ${new Date().getMonth()+1}월`,i=g(await h(`당신은 한국 SNS 마케팅 전문 저널리스트입니다.
오늘 날짜: ${n}

**절대 규칙 - 반드시 준수:**

1. **최신성 필수**: ${o} 이내의 뉴스만 사용. 3개월 이상 오래된 자료 절대 금지.
2. **2차 검증**: 웹 검색을 **최소 2라운드** 수행 (1차 수집 → 2차 교차검증)
3. **날짜 명시**: 각 팩트는 뉴스 발행일을 확인 후 인용
4. **구체성**: 숫자, 날짜, 법조항, 인명, 금액 등 검증 가능한 팩트만

**작업 순서 (엄격 준수):**

[1라운드 검색]
- "토픽명 ${o}" 검색
- "토픽명 최신 뉴스" 검색
- "토픽명 오늘" 또는 "이번주" 검색

[2라운드 검증]
- 1라운드에서 찾은 핵심 팩트를 다른 키워드로 교차 검색
- 날짜, 숫자 확인
- 서로 다른 2개 이상 매체에서 같은 팩트 확인

[3단계 대본 작성]
- 검증된 최신 팩트만 사용
- 각 bodyPoint에 구체적 숫자 + 날짜 포함

**출력**: 순수 JSON 배열만. 한국어 오타 절대 금지.`,`토픽: "${e.title}"
설명: ${e.description}
톤: ${{informative:"정보형",provocative:"자극형",storytelling:"스토리형"}[t]||t}
오늘: ${n}

**작업 (엄격):**

[1라운드 - 최신 뉴스 수집]
다음 검색을 순차 실행:
1. "${e.title} ${o}" 검색
2. "${e.title} 최신 뉴스 2026" 검색
3. "${e.title} 발표 ${new Date().getFullYear()}" 검색

[2라운드 - 교차 검증]
1라운드에서 찾은 가장 중요한 팩트 3-5개를 다른 키워드로 재검색:
4. 팩트별 날짜 확인 (${o} 이내인지 검증)
5. 다른 매체에서 동일 팩트 확인
6. 숫자/금액/날짜 정확성 재확인

[3단계 - 대본 ${r}개 작성]

**각 대본 규칙:**
- **팩트는 반드시 ${o} 이내 뉴스에서만 추출** (오래된 자료 절대 금지)
- headline: 최신 뉴스의 핵심 (15자 이내)
- subheadline: 날짜 또는 구체 수치 포함 (30자 이내)
- bodyPoints: 5개, **각각 ${o} 뉴스 팩트 + 숫자 포함** (각 40자 이내)
  - 예시 형식: "${o} 발표: [구체적 수치/내용]"
- callToAction
- targetAudience

**금지 사항:**
- 3개월 이상 오래된 자료 인용 (절대)
- 검증 안 된 추측 정보
- 숫자 없는 일반론

**최종 출력:** JSON 배열만 (설명 금지, 코드블록 금지)

[{"headline":"","subheadline":"","bodyPoints":["","","","",""],"callToAction":"","targetAudience":""}]`,{temp:.3,max:16e3,webSearch:!0}));return Array.isArray(i)?i:[i]}async function S(e,t=5){let r=5===t?["Hook (결과 먼저)","Proof (근거/데이터)","Differentiation (차별점)","Result (실제 변화)","CTA (행동 유도)"]:6===t?["Hook","Problem","Proof","Differentiation","Result","CTA"]:7===t?["Hook","Problem","Proof","Differentiation","Method","Result","CTA"]:8===t?["Hook","Problem","Reason","Proof","Differentiation","Method","Result","CTA"]:Array.from({length:t},(e,r)=>0===r?"Hook":r===t-1?"CTA":1===r?"Proof":2===r?"Differentiation":"Result"),n=g(await h(`당신은 SNS 바이럴 콘텐츠 전문가입니다.
구조: Hook → Proof → Differentiation → Result → CTA (IR 스타일 설득 구조)

**절대 규칙:**
1. Hook은 결과를 먼저 보여줌 ("왜" 말고 "어떻게 되는지")
2. 숫자 → 감정 연결 ("52% 증가" ❌ → "같은 시간에 두배 효과" ⭕)
3. CTA는 "오늘 바로 시작 가능" 강조
4. 이미지 프롬프트는 반드시 5요소 포함:
   - 인물 (성별/나이/상황)
   - 장소 (구체적 공간)
   - 행동 (동작, 표정)
   - 감정 (놀람, 결심 등)
   - 스타일 (realistic, cinematic, 4k)
5. 모든 한국어 오타 금지, 맞춤법 완벽

JSON만 반환 (코드블록 금지).`,`주제: "${e.headline}"
부제: "${e.subheadline}"
핵심 내용: ${e.bodyPoints.join(" | ")}
CTA: ${e.callToAction}

SNS 이미지 ${t}장 대본을 아래 구조로 작성:
${r.map((e,t)=>`${t+1}장: ${e}`).join("\n")}

각 장 필수 필드:
- title: 강한 어그로 제목 (10-15자)
- subtitle: 문제 제기 + 해결 암시 (20-30자)
- body: 쉬운 설명 + 궁금증 (80-120자, 예시/숫자 포함)
- imagePrompt: DSLR 촬영 같은 사실적 이미지 생성용 영어 프롬프트
  * 반드시 포함: person(성별/나이), location(구체적), action(동작), emotion(감정), style(realistic, cinematic, 4k)
  * 예시: "30대 한국 남성이 헬스장 러닝머신에서 땀 흘리며 운동, 경사도 높게 설정, 놀란 표정, realistic photo, cinematic lighting, 4k"
- textEmphasis: 이미지에 강조 표시할 핵심 텍스트 (짧게, 예: "30분 = 지방 삭제?")
- colorScheme: 색상 톤 (예: "레드 + 블랙 대비", "파란색 깔끔", "따뜻한 오렌지")
- emotion: 유도할 감정 (예: "나도 해볼까?", "충격", "결심")

JSON 배열:
[
  {
    "id": "slide_1",
    "order": 1,
    "type": "Hook",
    "title": "강한 어그로 제목",
    "subtitle": "문제 + 해결 암시",
    "body": "쉬운 설명 + 궁금증 (80-120자)",
    "imagePrompt": "영어 이미지 생성 프롬프트 (5요소 포함)",
    "textEmphasis": "이미지 핵심 텍스트",
    "colorScheme": "색상 톤",
    "emotion": "유도 감정",
    "bgColor": "#0F172A",
    "textColor": "#F8FAFC",
    "accentColor": "#818CF8"
  }
]`,{temp:.6,max:8e3}));return Array.isArray(n)?n:[n]}async function v(e,t="instagram"){if(!p())return e.map(()=>"");let r={instagram:"정사각형 1:1",tiktok:"세로 9:16",facebook:"가로 16:9"},n=Array(e.length).fill("");for(let o=0;o<e.length;o+=2){let i=e.slice(o,o+2).map((i,a)=>{let l=String(i.title||""),s=String(i.subtitle||""),c=String(i.textEmphasis||l),d=String(i.imagePrompt||""),u=String(i.colorScheme||""),f=o+a===e.length-1;return m(`한국 SNS 콘텐츠 이미지 생성.

[이미지 장면 묘사 - 반드시 이 내용을 사실적으로 표현]
${d}

[색상 톤]
${u||"다크 모드 (#0F172A) + 보라 액센트 (#818CF8)"}

[한국어 텍스트 오버레이 - 반드시 이대로 정확히 표기]
상단 또는 하단에 큰 한국어 텍스트:
"${c}"
${s?`
그 아래 작은 한국어 부제:
"${s}"`:""}

[텍스트 배치 규칙]
- 중앙 금지, 반드시 상단 또는 하단 배치
- 흰색 두꺼운 고딕체 + 검정 그림자로 선명하게
- 인물 얼굴 가리지 않도록 주의
${f?'- CTA 느낌, "지금 시작" 버튼 느낌':""}

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

출력 전 검증: 이미지 내 모든 한국어가 "${c}"와 "${s}"와 정확히 일치하는지 확인.`).then(e=>{n[o+a]=e||""}).catch(()=>{n[o+a]=""})});await Promise.all(i),o+2<e.length&&await new Promise(e=>setTimeout(e,3e3))}return n}async function j(e){await l(e),localStorage.removeItem("hookflow_history")}e.s(["CATEGORIES",0,[{key:"all",label:"전체",emoji:"🔥"},{key:"음식",label:"음식/맛집",emoji:"🍽"},{key:"다이어트",label:"다이어트",emoji:"💪"},{key:"건강",label:"건강/의약",emoji:"🏥"},{key:"식단",label:"식단/영양",emoji:"🥗"},{key:"쇼핑",label:"쇼핑트렌드",emoji:"🛍"},{key:"화장품",label:"화장품/뷰티",emoji:"💄"},{key:"의류",label:"의류/패션",emoji:"👗"},{key:"인플루언서",label:"인플루언서",emoji:"📱"},{key:"셀럽",label:"연예인/셀럽",emoji:"⭐"},{key:"테크",label:"IT/테크",emoji:"💻"},{key:"재테크",label:"재테크/부업",emoji:"💰"},{key:"시즌",label:"시즌/이벤트",emoji:"📅"},{key:"글로벌",label:"글로벌/나라별",emoji:"🌍"},{key:"지혜",label:"지혜/철학/종교",emoji:"🕊"},{key:"연애",label:"연애/관계/성",emoji:"💕"}],"fetchTrends",0,x,"generateCarouselSlides",0,S,"generateHooks",0,w,"generateSlideImages",0,v,"getActiveProvider",0,f,"getApiKey",0,e=>u(`${e}_key`),"hasGeminiKey",0,p,"saveToHistory",0,j,"setApiKey",0,(e,t)=>{var r;return r=`${e}_key`,void localStorage.setItem(`hookflow_${r}`,t)}],15970);let A=[{href:"/",label:"트렌드",icon:"📊"},{href:"/generate",label:"생성",icon:"🚀"},{href:"/custom",label:"커스텀",icon:"✏"},{href:"/history",label:"히스토리",icon:"📋"},{href:"/settings",label:"설정",icon:"⚙"}];e.s(["default",0,function(){let e=(0,n.usePathname)(),[i,a]=(0,o.useState)({claude:!1,nano:!1});return(0,o.useEffect)(()=>{a({claude:"none"!==f(),nano:p()})},[]),(0,t.jsx)("nav",{className:"sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-xl",children:(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"flex items-center justify-between h-16",children:[(0,t.jsxs)(r.default,{href:"/",className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold text-sm",children:"HF"}),(0,t.jsxs)("span",{className:"text-lg font-bold",children:[(0,t.jsx)("span",{className:"gradient-text",children:"HookFlow"})," ",(0,t.jsx)("span",{className:"text-foreground/60",children:"AI"})]})]}),(0,t.jsx)("div",{className:"flex items-center gap-1",children:A.map(n=>(0,t.jsxs)(r.default,{href:n.href,className:`px-3 py-2 rounded-lg text-sm font-medium transition-all ${e===n.href?"bg-accent/15 text-accent":"text-foreground/60 hover:text-foreground hover:bg-card-bg"}`,children:[(0,t.jsx)("span",{className:"mr-1",children:n.icon}),n.label]},n.href))}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${i.claude?"bg-success":"bg-danger"}`}),(0,t.jsx)("span",{className:"text-foreground/50",children:i.claude?"Claude":"미연결"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${i.nano?"bg-purple-400":"bg-foreground/20"}`}),(0,t.jsx)("span",{className:"text-foreground/50",children:i.nano?"NanoBanana":"이미지 꺼짐"})]})]})]})})})}],32710)},5764,e=>{"use strict";var t=e.i(27707),r=e.i(39804),n=e.i(40281),o=e.i(32710),i=e.i(15970);function a({topic:e,onSelect:r,index:n}){let o=i.CATEGORIES.find(t=>t.key===e.category);return(0,t.jsxs)("button",{onClick:()=>r(e),className:"card-glow w-full text-left p-5 rounded-xl bg-card-bg border border-card-border hover:border-accent/50 transition-all animate-slide-up group",style:{animationDelay:`${60*n}ms`,animationFillMode:"both"},children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,t.jsx)("span",{className:"px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/15 text-accent",children:o?`${o.emoji} ${o.label}`:e.category}),(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[10px] text-foreground/30 font-mono",children:[e.views&&(0,t.jsx)("span",{children:e.views}),(0,t.jsx)("span",{children:e.traffic})]})]}),(0,t.jsx)("h3",{className:"text-sm font-bold mb-1.5 group-hover:text-accent transition-colors line-clamp-2",children:e.title}),(0,t.jsx)("p",{className:"text-xs text-foreground/40 line-clamp-2 mb-3",children:e.description}),e.relatedQueries.length>0&&(0,t.jsx)("div",{className:"flex flex-wrap gap-1",children:e.relatedQueries.slice(0,3).map((e,r)=>(0,t.jsxs)("span",{className:"px-1.5 py-0.5 rounded bg-background text-[10px] text-foreground/30",children:["#",e]},r))}),(0,t.jsx)("div",{className:"mt-2 text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity",children:"클릭하여 콘텐츠 생성 →"})]})}e.s(["default",0,function(){let e=(0,n.useRouter)(),[l,s]=(0,r.useState)([]),[c,d]=(0,r.useState)(!0),[u,f]=(0,r.useState)("all"),[p,h]=(0,r.useState)("");async function m(e=!1){d(!0);try{s(await (0,i.fetchTrends)(e))}catch{console.error("트렌드 로딩 실패")}finally{d(!1)}}function g(t){sessionStorage.setItem("selectedTopic",JSON.stringify(t)),e.push("/generate")}function y(){p.trim()&&g({id:`custom_${Date.now()}`,title:p.trim(),source:"직접입력",description:p.trim(),traffic:"-",views:"-",relatedQueries:[],category:"custom",fetchedAt:new Date().toISOString()})}(0,r.useEffect)(()=>{m()},[]);let x="all"===u?l:l.filter(e=>e.category===u),b=(0,i.getActiveProvider)(),w=l[0]?.fetchedAt?new Date(l[0].fetchedAt).toLocaleDateString("ko-KR"):"";return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.default,{}),(0,t.jsxs)("main",{className:"flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6",children:[(0,t.jsxs)("div",{className:"mb-6",children:[(0,t.jsx)("h1",{className:"text-2xl font-bold mb-1",children:(0,t.jsx)("span",{className:"gradient-text",children:"오늘의 바이럴 트렌드"})}),(0,t.jsxs)("p",{className:"text-foreground/40 text-sm",children:["네이버/구글/유튜브 웹 검색 기반 실시간 트렌드",w&&(0,t.jsxs)("span",{className:"ml-2 text-foreground/20",children:["| 마지막 업데이트: ",w]})]})]}),"none"===b&&(0,t.jsxs)("div",{className:"mb-4 p-3 rounded-xl bg-warning/10 border border-warning/30 flex items-center justify-between text-sm",children:[(0,t.jsxs)("span",{children:[(0,t.jsx)("span",{className:"font-bold text-warning",children:"API 키 필요"}),(0,t.jsx)("span",{className:"text-foreground/50 ml-2",children:"실시간 트렌드 생성에는 Claude API 키가 필요합니다"})]}),(0,t.jsx)("button",{onClick:()=>e.push("/settings"),className:"px-3 py-1 rounded-lg bg-warning/20 text-warning text-xs font-medium shrink-0 ml-3",children:"설정"})]}),(0,t.jsxs)("div",{className:"mb-6 flex gap-3",children:[(0,t.jsx)("input",{type:"text",placeholder:"직접 토픽 입력 (예: AI 자동화 부업, 다이어트 식단...)",value:p,onChange:e=>h(e.target.value),onKeyDown:e=>"Enter"===e.key&&y(),className:"flex-1 px-4 py-2.5 rounded-xl bg-card-bg border border-card-border text-sm focus:outline-none focus:border-accent"}),(0,t.jsx)("button",{onClick:y,disabled:!p.trim(),className:"px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white text-sm font-bold hover:opacity-90 disabled:opacity-40 shrink-0",children:"생성 →"})]}),(0,t.jsx)("div",{className:"mb-6 flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide",children:i.CATEGORIES.map(e=>{let r="all"===e.key?l.length:l.filter(t=>t.category===e.key).length;return(0,t.jsxs)("button",{onClick:()=>f(e.key),className:`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${u===e.key?"bg-accent/15 text-accent border border-accent/30":"bg-card-bg text-foreground/50 border border-card-border hover:border-accent/20"}`,children:[(0,t.jsx)("span",{children:e.emoji}),(0,t.jsx)("span",{children:e.label}),r>0&&(0,t.jsx)("span",{className:"text-[10px] opacity-50",children:r})]},e.key)})}),(0,t.jsxs)("div",{className:"mb-6 flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"text-xs text-foreground/40",children:[x.length,"개 트렌드 ","all"!==u&&`(${i.CATEGORIES.find(e=>e.key===u)?.label})`]}),(0,t.jsxs)("button",{onClick:()=>m(!0),disabled:c,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card-bg border border-card-border text-xs text-foreground/50 hover:text-accent hover:border-accent/30 disabled:opacity-40",children:[(0,t.jsx)("span",{className:c?"animate-spin":"",children:"↻"}),c?"웹 검색 중... (30초~1분)":"실시간 새로고침"]})]}),c?(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:Array.from({length:9}).map((e,r)=>(0,t.jsx)("div",{className:"h-44 rounded-xl bg-card-bg border border-card-border animate-pulse"},r))}):0===x.length?(0,t.jsxs)("div",{className:"text-center py-16 text-foreground/30",children:[(0,t.jsx)("div",{className:"text-3xl mb-3",children:"🔍"}),(0,t.jsx)("p",{children:"이 카테고리에 트렌드가 없습니다."}),(0,t.jsx)("p",{className:"text-xs mt-1",children:"다른 카테고리를 선택하거나 직접 입력해보세요."})]}):(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:x.map((e,r)=>(0,t.jsx)(a,{topic:e,onSelect:g,index:r},e.id))})]})]})}],5764)}]);