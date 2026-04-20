(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,40281,(e,t,r)=>{t.exports=e.r(99753)},75732,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o={formatUrl:function(){return l},formatWithValidation:function(){return c},urlObjectKeys:function(){return s}};for(var n in o)Object.defineProperty(r,n,{enumerable:!0,get:o[n]});let a=e.r(39258)._(e.r(70770)),i=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,o=e.protocol||"",n=e.pathname||"",l=e.hash||"",s=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),s&&"object"==typeof s&&(s=String(a.urlQueryToSearchParams(s)));let d=e.search||s&&`?${s}`||"";return o&&!o.endsWith(":")&&(o+=":"),e.slashes||(!o||i.test(o))&&!1!==c?(c="//"+(c||""),n&&"/"!==n[0]&&(n="/"+n)):c||(c=""),l&&"#"!==l[0]&&(l="#"+l),d&&"?"!==d[0]&&(d="?"+d),n=n.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${o}${c}${n}${d}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return l(e)}},41664,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return n}});let o=e.r(39804);function n(e,t){let r=(0,o.useRef)(null),n=(0,o.useRef)(null);return(0,o.useCallback)(o=>{if(null===o){let e=r.current;e&&(r.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(r.current=a(e,o)),t&&(n.current=a(t,o))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},46842,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return a}});let o=e.r(75233),n=e.r(64586);function a(e){if(!(0,o.isAbsoluteUrl)(e))return!0;try{let t=(0,o.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,n.hasBasePath)(r.pathname)}catch(e){return!1}}},46905,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return o}});let o=e=>{}},86607,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o={default:function(){return b},useLinkStatus:function(){return x}};for(var n in o)Object.defineProperty(r,n,{enumerable:!0,get:o[n]});let a=e.r(39258),i=e.r(27707),l=a._(e.r(39804)),s=e.r(75732),c=e.r(36407),d=e.r(41664),u=e.r(75233),f=e.r(13946);e.r(12666);let p=e.r(16373),g=e.r(60672),h=e.r(46842),m=e.r(32114);function b(t){var r,o;let n,a,b,[x,w]=(0,l.useOptimistic)(g.IDLE_LINK_STATUS),v=(0,l.useRef)(null),{href:S,as:j,children:k,prefetch:A=null,passHref:N,replace:$,shallow:I,scroll:O,onClick:C,onMouseEnter:T,onTouchStart:_,legacyBehavior:D=!1,onNavigate:P,transitionTypes:M,ref:K,unstable_dynamicOnHover:E,...R}=t;n=k,D&&("string"==typeof n||"number"==typeof n)&&(n=(0,i.jsx)("a",{children:n}));let F=l.default.useContext(c.AppRouterContext),Q=!1!==A,B=!1!==A?null===(o=A)||"auto"===o?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,L="string"==typeof(r=j||S)?r:(0,s.formatUrl)(r);if(D){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});a=l.default.Children.only(n)}let H=D?a&&"object"==typeof a&&a.ref:K,J=l.default.useCallback(e=>(null!==F&&(v.current=(0,g.mountLinkInstance)(e,L,F,B,Q,w)),()=>{v.current&&((0,g.unmountLinkForCurrentNavigation)(v.current),v.current=null),(0,g.unmountPrefetchableInstance)(e)}),[Q,L,F,B,w]),U={ref:(0,d.useMergedRef)(J,H),onClick(t){D||"function"!=typeof C||C(t),D&&a.props&&"function"==typeof a.props.onClick&&a.props.onClick(t),!F||t.defaultPrevented||function(t,r,o,n,a,i,s){if("u">typeof window){let c,{nodeName:d}=t.currentTarget;if("A"===d.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){n&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),i){let e=!1;if(i({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:u}=e.r(51605);l.default.startTransition(()=>{u(r,n?"replace":"push",!1===a?p.ScrollBehavior.NoScroll:p.ScrollBehavior.Default,o.current,s)})}}(t,L,v,$,O,P,M)},onMouseEnter(e){D||"function"!=typeof T||T(e),D&&a.props&&"function"==typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),F&&Q&&(0,g.onNavigationIntent)(e.currentTarget,!0===E)},onTouchStart:function(e){D||"function"!=typeof _||_(e),D&&a.props&&"function"==typeof a.props.onTouchStart&&a.props.onTouchStart(e),F&&Q&&(0,g.onNavigationIntent)(e.currentTarget,!0===E)}};return(0,u.isAbsoluteUrl)(L)?U.href=L:D&&!N&&("a"!==a.type||"href"in a.props)||(U.href=(0,f.addBasePath)(L)),b=D?l.default.cloneElement(a,U):(0,i.jsx)("a",{...R,...U,children:n}),(0,i.jsx)(y.Provider,{value:x,children:b})}e.r(46905);let y=(0,l.createContext)(g.IDLE_LINK_STATUS),x=()=>(0,l.useContext)(y);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},32710,44453,15970,e=>{"use strict";var t=e.i(27707),r=e.i(86607),o=e.i(40281),n=e.i(39804);let a="history";function i(){return new Promise((e,t)=>{let r=indexedDB.open("hookflow",1);r.onerror=()=>t(r.error),r.onsuccess=()=>e(r.result),r.onupgradeneeded=()=>{let e=r.result;e.objectStoreNames.contains(a)||e.createObjectStore(a,{keyPath:"id"}).createIndex("createdAt","createdAt")}})}async function l(e){try{let t=await i(),r=`h_${Date.now()}`,o={id:r,createdAt:new Date().toISOString(),...e};return new Promise((e,n)=>{let i=t.transaction(a,"readwrite").objectStore(a).put(o);i.onsuccess=()=>e(r),i.onerror=()=>n(i.error)})}catch(e){return console.error("[History] Save failed:",e),""}}async function s(){try{let e=await i();return new Promise((t,r)=>{let o=e.transaction(a,"readonly").objectStore(a).getAll();o.onsuccess=()=>{let e=o.result.sort((e,t)=>new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime());t(e)},o.onerror=()=>r(o.error)})}catch(e){return console.error("[History] Get failed:",e),[]}}async function c(e){try{let t=await i();return new Promise((r,o)=>{let n=t.transaction(a,"readwrite");n.objectStore(a).delete(e),n.oncomplete=()=>r(),n.onerror=()=>o(n.error)})}catch(e){console.error("[History] Delete failed:",e)}}async function d(){try{let e=await i();return new Promise((t,r)=>{let o=e.transaction(a,"readwrite");o.objectStore(a).clear(),o.oncomplete=()=>t(),o.onerror=()=>r(o.error)})}catch(e){console.error("[History] Clear failed:",e)}}function u(e){return localStorage.getItem(`hookflow_${e}`)||""}function f(){return u("anthropic_key")?"anthropic":"none"}function p(){return!!u("gemini_key")}async function g(e,t,r={}){let o=u("anthropic_key");if(!o)throw Error("Anthropic API 키를 설정 페이지에서 입력해주세요.");let n={model:"claude-haiku-4-5-20251001",max_tokens:r.max||2048,temperature:r.temp??.7,system:e,messages:[{role:"user",content:t}]};r.webSearch&&(n.tools=[{type:"web_search_20250305",name:"web_search",max_uses:15}]);let a=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":o,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify(n)});if(!a.ok){let e=await a.text();throw Error(`Claude 오류(${a.status}): ${e.slice(0,150)}`)}let i=await a.json(),l="";for(let e of i.content||[])"text"===e.type&&(l+=e.text);return l}async function h(e){let t=u("gemini_key");if(!t)return null;try{let r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:e}]}],generationConfig:{responseModalities:["TEXT","IMAGE"]}})});if(!r.ok){let e=await r.text();return console.error("[NanoBanana] Gemini",r.status,e.slice(0,300)),null}let o=await r.json();for(let e of o?.candidates?.[0]?.content?.parts||[])if(e.inlineData)return`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`;return null}catch(e){return console.warn("[NanoBanana] 오류:",e),null}}function m(e){if(!e||!e.trim())throw Error("AI 응답이 비어있습니다.");let t=e.match(/```(?:json)?\s*([\s\S]*?)```/);if(t)try{return JSON.parse(t[1].trim())}catch{}for(let t of(e=>{let t=[],r=0,o=-1;for(let n=0;n<e.length;n++)"["===e[n]?(0===r&&(o=n),r++):"]"===e[n]&&0==--r&&-1!==o&&(t.push(e.slice(o,n+1)),o=-1);return t})(e).sort((e,t)=>t.length-e.length))try{return JSON.parse(t)}catch{}let r=e.match(/\{[\s\S]*\}/);if(r)try{return JSON.parse(r[0])}catch{}throw console.error("[HookFlow] JSON 파싱 실패 원문 (처음 500자):",e.slice(0,500)),Error(`AI 응답 파싱 실패. 다시 시도해주세요. (원문: ${e.slice(0,100)})`)}e.s(["clearHistoryDB",0,d,"deleteHistoryDB",0,c,"getHistoryDB",0,s,"saveHistoryDB",0,l],44453);let b="hookflow_trends_cache";async function y(e=!1){if(!e){let e=function(){try{let e=localStorage.getItem(b);if(!e)return null;let{data:t,timestamp:r}=JSON.parse(e);if(Date.now()-r<216e5)return t;localStorage.removeItem(b)}catch{}return null}();if(e&&e.length>0)return e}if("none"===f())return x();try{let e=new Date().toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"long"}),t=await g(`2026년 한국/글로벌 실시간 트렌드 분석가.
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
[{"title":"","description":"","traffic":"","views":"","category":"","relatedQueries":[""]}]`,{temp:.3,max:1e4,webSearch:!0}),r=m(t),o=(Array.isArray(r)?r:[]).map((e,t)=>({id:`t_${t}_${Date.now()}`,title:String(e.title||""),source:"AI 분석",description:String(e.description||""),traffic:String(e.traffic||"10K+"),views:String(e.views||"100K views"),relatedQueries:Array.isArray(e.relatedQueries)?e.relatedQueries.map(String):[],category:String(e.category||"기타"),fetchedAt:new Date().toISOString()}));if(o.length>0)return localStorage.setItem(b,JSON.stringify({data:o,timestamp:Date.now()})),o}catch(e){console.error("[HookFlow] AI 트렌드 생성 실패:",e)}return x()}function x(){return[{id:"d1",title:"제로 칼로리 디저트 열풍",source:"AI",description:"제로 칼로리 디저트가 SNS를 점령. 다이어트 중에도 즐기는 죄책감 없는 간식 트렌드.",traffic:"800K+",views:"5M views",relatedQueries:["제로슈거","다이어트간식"],category:"음식",fetchedAt:new Date().toISOString()},{id:"d2",title:"12-3-30 워킹 다이어트",source:"AI",description:"틱톡에서 폭발적 인기. 경사 12, 속도 3, 30분 걷기로 체중 감량 성공 사례 속출.",traffic:"1.2M+",views:"15M views",relatedQueries:["걷기다이어트","틱톡운동"],category:"다이어트",fetchedAt:new Date().toISOString()},{id:"d3",title:"장건강이 피부를 바꾼다",source:"AI",description:"프로바이오틱스와 장건강이 피부 개선에 직접 영향. 피부과 전문의 추천 루틴 화제.",traffic:"500K+",views:"3M views",relatedQueries:["장건강","피부관리"],category:"건강",fetchedAt:new Date().toISOString()},{id:"d4",title:"고단백 도시락 밀프렙",source:"AI",description:"일주일치 고단백 도시락을 한번에 준비하는 밀프렙 콘텐츠가 직장인들 사이에서 대유행.",traffic:"300K+",views:"2M views",relatedQueries:["밀프렙","고단백식단"],category:"식단",fetchedAt:new Date().toISOString()},{id:"d5",title:"무신사 여름 세일 핫딜",source:"AI",description:"무신사 시즌 세일 시작. 최대 80% 할인 품목 정리 콘텐츠 조회수 폭발.",traffic:"600K+",views:"4M views",relatedQueries:["무신사세일","여름패션"],category:"쇼핑",fetchedAt:new Date().toISOString()},{id:"d6",title:"선크림 하나로 톤업 완성",source:"AI",description:"톤업 선크림 비교 리뷰 영상이 화제. 화장 없이 피부 보정 효과 검증.",traffic:"400K+",views:"6M views",relatedQueries:["톤업선크림","데일리선케어"],category:"화장품",fetchedAt:new Date().toISOString()},{id:"d7",title:"올드머니룩 코디법",source:"AI",description:'조용한 럭셔리 "올드머니룩"이 패션 트렌드 1위. 기본 아이템으로 고급스러운 스타일링.',traffic:"700K+",views:"8M views",relatedQueries:["올드머니룩","미니멀패션"],category:"의류",fetchedAt:new Date().toISOString()},{id:"d8",title:"쯔양 복귀 먹방 1000만뷰",source:"AI",description:"쯔양의 복귀 먹방 영상이 1000만 뷰를 돌파. 유튜브 실시간 트렌딩 1위 기록.",traffic:"2M+",views:"10M views",relatedQueries:["쯔양","먹방유튜버"],category:"인플루언서",fetchedAt:new Date().toISOString()},{id:"d9",title:"BTS 진 솔로 컴백",source:"AI",description:"BTS 진의 솔로 앨범 발매 소식에 전 세계 팬덤이 들끓는 중. 선주문량 역대급.",traffic:"5M+",views:"50M views",relatedQueries:["BTS진","K-POP"],category:"셀럽",fetchedAt:new Date().toISOString()},{id:"d10",title:"AI로 월 500만원 부업",source:"AI",description:"ChatGPT와 AI 도구로 부업하는 실제 사례 모음. 초보자도 따라할 수 있는 가이드.",traffic:"1M+",views:"7M views",relatedQueries:["AI부업","자동수익"],category:"재테크",fetchedAt:new Date().toISOString()},{id:"d11",title:"Apple Vision Pro 2 출시",source:"AI",description:"Apple Vision Pro 2세대 공개. 가격 절반에 성능 2배. 국내 출시일 확정.",traffic:"800K+",views:"4M views",relatedQueries:["비전프로","애플신제품"],category:"테크",fetchedAt:new Date().toISOString()},{id:"d12",title:"아이브 월드투어 티켓팅 전쟁",source:"AI",description:"아이브 첫 월드투어 티켓 오픈과 동시에 전석 매진. 리셀 가격 10배 치솟아.",traffic:"3M+",views:"20M views",relatedQueries:["아이브","콘서트티켓"],category:"셀럽",fetchedAt:new Date().toISOString()},{id:"d13",title:"5월 어버이날 감동 선물 TOP 10",source:"AI",description:"2026년 어버이날 선물 트렌드. 건강식품부터 체험형 선물까지 가성비 랭킹.",traffic:"600K+",views:"3M views",relatedQueries:["어버이날","효도선물"],category:"시즌",fetchedAt:new Date().toISOString()},{id:"d14",title:"일본 벚꽃 명소 2026 업데이트",source:"AI",description:"2026년 일본 벚꽃 개화 시기 확정. 새로운 숨은 명소와 가성비 여행 루트 공개.",traffic:"400K+",views:"2M views",relatedQueries:["일본여행","벚꽃명소"],category:"글로벌",fetchedAt:new Date().toISOString()},{id:"d15",title:"마음이 힘들 때 읽는 법구경",source:"AI",description:"불교 경전 법구경 속 지혜의 말씀. 현대인의 번아웃을 치유하는 2600년 된 처방전.",traffic:"200K+",views:"1.5M views",relatedQueries:["명상","마음치유"],category:"지혜",fetchedAt:new Date().toISOString()},{id:"d16",title:"2026 연애 트렌드 대반전",source:"AI",description:'Z세대의 새로운 연애 문화 "슬로우 데이팅"이 전 세계적 트렌드. 빠른 만남보다 천천히 알아가는 관계 선호.',traffic:"700K+",views:"8M views",relatedQueries:["슬로우데이팅","연애트렌드"],category:"연애",fetchedAt:new Date().toISOString()},{id:"d17",title:"커플 심리테스트 1억뷰 돌파",source:"AI",description:"틱톡에서 유행하는 커플 궁합 심리테스트가 1억 뷰 돌파. 연인 관계 진단 콘텐츠 폭발.",traffic:"500K+",views:"100M views",relatedQueries:["커플테스트","연애심리"],category:"연애",fetchedAt:new Date().toISOString()}]}async function w(e,t,r=3){let o=new Date().toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"long"}),n=`${new Date().getFullYear()}년 ${new Date().getMonth()+1}월`,a=m(await g(`당신은 한국 SNS 마케팅 전문 저널리스트입니다.
오늘 날짜: ${o}

**절대 규칙 - 반드시 준수:**

1. **최신성 필수**: ${n} 이내의 뉴스만 사용. 3개월 이상 오래된 자료 절대 금지.
2. **2차 검증**: 웹 검색을 **최소 2라운드** 수행 (1차 수집 → 2차 교차검증)
3. **날짜 명시**: 각 팩트는 뉴스 발행일을 확인 후 인용
4. **구체성**: 숫자, 날짜, 법조항, 인명, 금액 등 검증 가능한 팩트만

**작업 순서 (엄격 준수):**

[1라운드 검색]
- "토픽명 ${n}" 검색
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
오늘: ${o}

**작업 (엄격):**

[1라운드 - 최신 뉴스 수집]
다음 검색을 순차 실행:
1. "${e.title} ${n}" 검색
2. "${e.title} 최신 뉴스 2026" 검색
3. "${e.title} 발표 ${new Date().getFullYear()}" 검색

[2라운드 - 교차 검증]
1라운드에서 찾은 가장 중요한 팩트 3-5개를 다른 키워드로 재검색:
4. 팩트별 날짜 확인 (${n} 이내인지 검증)
5. 다른 매체에서 동일 팩트 확인
6. 숫자/금액/날짜 정확성 재확인

[3단계 - 대본 ${r}개 작성]

**각 대본 규칙:**
- **팩트는 반드시 ${n} 이내 뉴스에서만 추출** (오래된 자료 절대 금지)
- headline: 최신 뉴스의 핵심 (15자 이내)
- subheadline: 날짜 또는 구체 수치 포함 (30자 이내)
- bodyPoints: 5개, **각각 ${n} 뉴스 팩트 + 숫자 포함** (각 40자 이내)
  - 예시 형식: "${n} 발표: [구체적 수치/내용]"
- callToAction
- targetAudience

**금지 사항:**
- 3개월 이상 오래된 자료 인용 (절대)
- 검증 안 된 추측 정보
- 숫자 없는 일반론

**최종 출력:** JSON 배열만 (설명 금지, 코드블록 금지)

[{"headline":"","subheadline":"","bodyPoints":["","","","",""],"callToAction":"","targetAudience":""}]`,{temp:.3,max:16e3,webSearch:!0}));return Array.isArray(a)?a:[a]}async function v(e,t=8){let r=m(await g(`SNS 콘텐츠 작가. 초보자도 이해하기 쉽게 친절하게 작성. 한국어 맞춤법 완벽. JSON만 반환.

각 슬라이드는 3단 구조:
1. title: 짧은 후킹 제목 (10-15자)
2. subtitle: 제목 보충 부제목 (20-30자)
3. body: 상세 본문 내용 (80-150자, 예시/비유/숫자 포함하여 초보자도 쉽게 이해)

본문은 반드시 포함:
- 구체적 예시 ("예를 들어...", "실제로는...")
- 쉬운 비유 ("마치 ~처럼")
- 숫자/데이터 (%, 금액, 기간 등)
- 전문용어는 반드시 풀어서 설명`,`주제: "${e.headline}"
부제: "${e.subheadline}"
핵심 내용: ${e.bodyPoints.join(" | ")}
CTA: ${e.callToAction}

위 내용으로 SNS 이미지 ${t}장 대본을 작성하세요.

[구성]
1장(cover): 스크롤 멈추는 강렬한 후킹 (title + subtitle + 간단한 미리보기 body)
2~${t-1}장(content): 핵심 포인트 전달
   - 각 장은 1개 포인트에 집중
   - title: 짧고 임팩트 있게
   - subtitle: 궁금증 유발
   - body: 상세 설명 (예시, 비유, 숫자 포함하여 초보자도 이해 가능)
${t}장(cta): 행동 유도 + 팔로우/저장 요청

JSON 배열 반환 (각 장은 title + subtitle + body + example 필드 포함):
[
  {
    "id": "slide_1",
    "order": 1,
    "type": "cover",
    "title": "짧은 제목 (10-15자)",
    "subtitle": "부제목 (20-30자)",
    "body": "상세 본문 (80-150자, 초보자도 이해 가능하게 예시/비유/숫자 포함)",
    "example": "추가 예시나 팁 (선택, 40자 이내)",
    "bgColor": "#0F172A",
    "textColor": "#F8FAFC",
    "accentColor": "#818CF8"
  }
]`,{temp:.6,max:6e3}));return Array.isArray(r)?r:[r]}async function S(e,t="instagram"){if(!p())return e.map(()=>"");let r={instagram:"정사각형 1:1",tiktok:"세로 9:16",facebook:"가로 16:9"},o=Array(e.length).fill("");for(let n=0;n<e.length;n+=2){let a=e.slice(n,n+2).map((a,i)=>{let l=String(a.title||""),s=String(a.subtitle||""),c=String(a.body||""),d=n+i===0,u=n+i===e.length-1;return h(`${d?`스크롤 멈추는 한국 SNS 메인 이미지.
이미지 중앙에 아래 한국어를 크고 굵게 정확히 표시:
"${l}"
${s?`
그 아래 작게 표시: "${s}"`:""}
배경: ${c} 장면의 실제 DSLR 사진.
텍스트 스타일: 흰색 두꺼운 고딕체, 검정 그림자.`:u?`한국 SNS CTA 이미지.
중앙에 한국어 표시: "${l}"
${s?`부제: "${s}"`:""}
행동 유도 디자인, 실제 사진 배경.`:`한국 SNS 콘텐츠 이미지.
상단에 한국어 제목: "${l}"
${s?`제목 아래 부제: "${s}"`:""}
배경: "${c}" 내용을 표현하는 실제 사진.
텍스트: 흰색 굵은 글씨, 그림자 효과.`}

필수 규칙:
1. 위에 명시된 한국어를 정확히 표기 (오타/자모음 깨짐 절대 금지)
2. 제시된 문구 외 다른 한국어 생성 금지
3. DSLR 촬영 같은 사실적 사진 (AI/일러스트 금지)
4. 실제 한국인, 한국 장소, 실제 물건
5. 자연스러운 조명, 시네마틱 색감
6. 비율: ${r[t]}

출력 전 검증: 이미지 내 한국어가 "${l}" 및 "${s}"와 정확히 일치하는지 확인.`).then(e=>{o[n+i]=e||""}).catch(()=>{o[n+i]=""})});await Promise.all(a),n+2<e.length&&await new Promise(e=>setTimeout(e,3e3))}return o}async function j(e){await l(e),localStorage.removeItem("hookflow_history")}e.s(["CATEGORIES",0,[{key:"all",label:"전체",emoji:"🔥"},{key:"음식",label:"음식/맛집",emoji:"🍽"},{key:"다이어트",label:"다이어트",emoji:"💪"},{key:"건강",label:"건강/의약",emoji:"🏥"},{key:"식단",label:"식단/영양",emoji:"🥗"},{key:"쇼핑",label:"쇼핑트렌드",emoji:"🛍"},{key:"화장품",label:"화장품/뷰티",emoji:"💄"},{key:"의류",label:"의류/패션",emoji:"👗"},{key:"인플루언서",label:"인플루언서",emoji:"📱"},{key:"셀럽",label:"연예인/셀럽",emoji:"⭐"},{key:"테크",label:"IT/테크",emoji:"💻"},{key:"재테크",label:"재테크/부업",emoji:"💰"},{key:"시즌",label:"시즌/이벤트",emoji:"📅"},{key:"글로벌",label:"글로벌/나라별",emoji:"🌍"},{key:"지혜",label:"지혜/철학/종교",emoji:"🕊"},{key:"연애",label:"연애/관계/성",emoji:"💕"}],"fetchTrends",0,y,"generateCarouselSlides",0,v,"generateHooks",0,w,"generateSlideImages",0,S,"getActiveProvider",0,f,"getApiKey",0,e=>u(`${e}_key`),"hasGeminiKey",0,p,"saveToHistory",0,j,"setApiKey",0,(e,t)=>{var r;return r=`${e}_key`,void localStorage.setItem(`hookflow_${r}`,t)}],15970);let k=[{href:"/",label:"트렌드",icon:"📊"},{href:"/generate",label:"생성",icon:"🚀"},{href:"/custom",label:"커스텀",icon:"✏"},{href:"/history",label:"히스토리",icon:"📋"},{href:"/settings",label:"설정",icon:"⚙"}];e.s(["default",0,function(){let e=(0,o.usePathname)(),[a,i]=(0,n.useState)({claude:!1,nano:!1});return(0,n.useEffect)(()=>{i({claude:"none"!==f(),nano:p()})},[]),(0,t.jsx)("nav",{className:"sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-xl",children:(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"flex items-center justify-between h-16",children:[(0,t.jsxs)(r.default,{href:"/",className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold text-sm",children:"HF"}),(0,t.jsxs)("span",{className:"text-lg font-bold",children:[(0,t.jsx)("span",{className:"gradient-text",children:"HookFlow"})," ",(0,t.jsx)("span",{className:"text-foreground/60",children:"AI"})]})]}),(0,t.jsx)("div",{className:"flex items-center gap-1",children:k.map(o=>(0,t.jsxs)(r.default,{href:o.href,className:`px-3 py-2 rounded-lg text-sm font-medium transition-all ${e===o.href?"bg-accent/15 text-accent":"text-foreground/60 hover:text-foreground hover:bg-card-bg"}`,children:[(0,t.jsx)("span",{className:"mr-1",children:o.icon}),o.label]},o.href))}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${a.claude?"bg-success":"bg-danger"}`}),(0,t.jsx)("span",{className:"text-foreground/50",children:a.claude?"Claude":"미연결"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${a.nano?"bg-purple-400":"bg-foreground/20"}`}),(0,t.jsx)("span",{className:"text-foreground/50",children:a.nano?"NanoBanana":"이미지 꺼짐"})]})]})]})})})}],32710)},39209,e=>{"use strict";var t=e.i(27707),r=e.i(39804),o=e.i(40281),n=e.i(32710),a=e.i(15970);e.s(["default",0,function(){let e=(0,o.useRouter)(),[i,l]=(0,r.useState)("instagram"),[s,c]=(0,r.useState)([{title:"",body:""},{title:"",body:""},{title:"",body:""}]),[d,u]=(0,r.useState)(!1),[f,p]=(0,r.useState)([]),[g,h]=(0,r.useState)(!1);function m(e,t,r){c(o=>o.map((o,n)=>n===e?{...o,[t]:r}:o))}async function b(){let e=s.filter(e=>e.title.trim()||e.body.trim());if(e.length<2)return void alert("최소 2장 이상의 대본을 작성해주세요.");if(!(0,a.hasGeminiKey)())return void alert("설정에서 Gemini(NanoBanana) 키를 입력해주세요.");u(!0);try{let t=e.map((t,r)=>({id:`s_${r}`,order:r+1,type:0===r?"cover":r===e.length-1?"cta":"content",title:t.title,body:t.body,bgColor:"#0F172A",textColor:"#F8FAFC",accentColor:"#818CF8"})),r=await (0,a.generateSlideImages)(t,i);p(r),h(!0),await (0,a.saveToHistory)({topic:"커스텀 대본",headline:e[0].title||"커스텀",platform:i,slideCount:e.length,images:r,scripts:e})}catch(e){alert(e instanceof Error?e.message:"생성 실패")}finally{u(!1)}}function y(e){if(!f[e])return;let t=document.createElement("a");t.href=f[e],t.download=`custom-${i}-${e+1}.png`,t.click()}async function x(){for(let e=0;e<f.length;e++)f[e]&&(y(e),await new Promise(e=>setTimeout(e,500)))}let w={instagram:"Instagram (1:1)",tiktok:"TikTok (9:16)",facebook:"Facebook (16:9)"}[i];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.default,{}),(0,t.jsxs)("main",{className:"flex-1 max-w-4xl mx-auto w-full px-4 py-6",children:[(0,t.jsx)("h1",{className:"text-2xl font-bold mb-1",children:(0,t.jsx)("span",{className:"gradient-text",children:"커스텀 대본"})}),(0,t.jsx)("p",{className:"text-foreground/40 text-sm mb-6",children:"원하는 주제와 내용을 직접 작성하여 SNS 이미지를 만드세요."}),d&&(0,t.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",children:(0,t.jsxs)("div",{className:"text-center p-8 rounded-2xl bg-card-bg border border-card-border",children:[(0,t.jsx)("div",{className:"w-12 h-12 rounded-full border-[3px] border-accent/30 border-t-accent animate-spin mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-foreground/70 text-sm",children:"NanoBanana로 이미지 생성 중..."})]})}),g?(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsx)("div",{className:`grid gap-4 ${"tiktok"===i?"grid-cols-2 md:grid-cols-4":"grid-cols-2 md:grid-cols-3"}`,children:f.map((e,r)=>(0,t.jsxs)("div",{className:"group relative",children:[(0,t.jsx)("div",{className:`rounded-xl border border-card-border overflow-hidden bg-card-bg ${"tiktok"===i?"aspect-[9/16]":"facebook"===i?"aspect-[16/9]":"aspect-square"}`,children:e?(0,t.jsx)("img",{src:e,alt:`${r+1}`,className:"w-full h-full object-cover"}):(0,t.jsx)("div",{className:"flex items-center justify-center h-full text-foreground/30 text-sm",children:"생성 실패"})}),(0,t.jsx)("div",{className:"absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-bold",children:0===r?"메인":r+1}),e&&(0,t.jsx)("button",{onClick:()=>y(r),className:"absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 text-white text-[10px] opacity-0 group-hover:opacity-100",children:"다운로드"})]},r))}),(0,t.jsxs)("div",{className:"grid grid-cols-3 gap-3",children:[(0,t.jsx)("button",{onClick:x,className:"py-3 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm",children:"전체 다운로드"}),(0,t.jsx)("button",{onClick:()=>{h(!1),p([])},className:"py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 text-sm",children:"대본 수정"}),(0,t.jsx)("button",{onClick:()=>e.push("/history"),className:"py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 text-sm",children:"히스토리"})]})]}):(0,t.jsxs)("div",{className:"space-y-5",children:[(0,t.jsx)("div",{className:"flex gap-2",children:[{key:"instagram",label:"📸 Instagram"},{key:"tiktok",label:"🎵 TikTok"},{key:"facebook",label:"📘 Facebook"}].map(e=>(0,t.jsx)("button",{onClick:()=>l(e.key),className:`px-4 py-2 rounded-lg text-sm border ${i===e.key?"border-accent bg-accent/10 text-accent":"border-card-border text-foreground/50"}`,children:e.label},e.key))}),(0,t.jsx)("div",{className:"space-y-3",children:s.map((e,r)=>(0,t.jsxs)("div",{className:"p-4 rounded-xl bg-card-bg border border-card-border group",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsx)("span",{className:`text-xs font-bold ${0===r?"text-accent":"text-foreground/40"}`,children:0===r?"1장 (메인 어그로)":`${r+1}장`}),s.length>2&&(0,t.jsx)("button",{onClick:()=>{s.length>2&&c(e=>e.filter((e,t)=>t!==r))},className:"text-xs text-danger/50 hover:text-danger opacity-0 group-hover:opacity-100",children:"삭제"})]}),(0,t.jsx)("input",{type:"text",value:e.title,onChange:e=>m(r,"title",e.target.value),placeholder:0===r?"시선을 사로잡는 메인 제목":`${r+1}장 제목`,className:"w-full px-3 py-2 rounded-lg bg-background border border-card-border text-sm font-bold mb-2 focus:outline-none focus:border-accent"}),(0,t.jsx)("textarea",{value:e.body,onChange:e=>m(r,"body",e.target.value),placeholder:"이미지에 들어갈 내용을 작성하세요",className:"w-full px-3 py-2 rounded-lg bg-background border border-card-border text-sm resize-none focus:outline-none focus:border-accent",rows:2})]},r))}),(0,t.jsx)("button",{onClick:function(){c(e=>[...e,{title:"",body:""}])},className:"w-full py-2 rounded-lg border border-dashed border-card-border text-sm text-foreground/40 hover:text-accent hover:border-accent/30",children:"+ 장면 추가"}),(0,t.jsxs)("button",{onClick:b,disabled:d,className:"w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50",children:[w," 이미지 ",s.filter(e=>e.title||e.body).length,"장 생성"]})]})]})]})}])}]);