(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,75732,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return l},formatWithValidation:function(){return c},urlObjectKeys:function(){return s}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=e.r(39258)._(e.r(70770)),o=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,n=e.protocol||"",a=e.pathname||"",l=e.hash||"",s=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),s&&"object"==typeof s&&(s=String(i.urlQueryToSearchParams(s)));let d=e.search||s&&`?${s}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||o.test(n))&&!1!==c?(c="//"+(c||""),a&&"/"!==a[0]&&(a="/"+a)):c||(c=""),l&&"#"!==l[0]&&(l="#"+l),d&&"?"!==d[0]&&(d="?"+d),a=a.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${n}${c}${a}${d}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return l(e)}},41664,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return a}});let n=e.r(39804);function a(e,t){let r=(0,n.useRef)(null),a=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(r.current=i(e,n)),t&&(a.current=i(t,n))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},46842,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return i}});let n=e.r(75233),a=e.r(64586);function i(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,a.hasBasePath)(r.pathname)}catch(e){return!1}}},46905,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},86607,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return x},useLinkStatus:function(){return b}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=e.r(39258),o=e.r(27707),l=i._(e.r(39804)),s=e.r(75732),c=e.r(36407),d=e.r(41664),u=e.r(75233),f=e.r(13946);e.r(12666);let h=e.r(16373),p=e.r(60672),g=e.r(46842),m=e.r(32114);function x(t){var r,n;let a,i,x,[b,w]=(0,l.useOptimistic)(p.IDLE_LINK_STATUS),v=(0,l.useRef)(null),{href:j,as:S,children:N,prefetch:A=null,passHref:k,replace:$,shallow:I,scroll:O,onClick:D,onMouseEnter:_,onTouchStart:P,legacyBehavior:T=!1,onNavigate:C,transitionTypes:M,ref:K,unstable_dynamicOnHover:E,...R}=t;a=N,T&&("string"==typeof a||"number"==typeof a)&&(a=(0,o.jsx)("a",{children:a}));let Q=l.default.useContext(c.AppRouterContext),B=!1!==A,L=!1!==A?null===(n=A)||"auto"===n?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,F="string"==typeof(r=S||j)?r:(0,s.formatUrl)(r);if(T){if(a?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});i=l.default.Children.only(a)}let H=T?i&&"object"==typeof i&&i.ref:K,J=l.default.useCallback(e=>(null!==Q&&(v.current=(0,p.mountLinkInstance)(e,F,Q,L,B,w)),()=>{v.current&&((0,p.unmountLinkForCurrentNavigation)(v.current),v.current=null),(0,p.unmountPrefetchableInstance)(e)}),[B,F,Q,L,w]),U={ref:(0,d.useMergedRef)(J,H),onClick(t){T||"function"!=typeof D||D(t),T&&i.props&&"function"==typeof i.props.onClick&&i.props.onClick(t),!Q||t.defaultPrevented||function(t,r,n,a,i,o,s){if("u">typeof window){let c,{nodeName:d}=t.currentTarget;if("A"===d.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,g.isLocalURL)(r)){a&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),o){let e=!1;if(o({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:u}=e.r(51605);l.default.startTransition(()=>{u(r,a?"replace":"push",!1===i?h.ScrollBehavior.NoScroll:h.ScrollBehavior.Default,n.current,s)})}}(t,F,v,$,O,C,M)},onMouseEnter(e){T||"function"!=typeof _||_(e),T&&i.props&&"function"==typeof i.props.onMouseEnter&&i.props.onMouseEnter(e),Q&&B&&(0,p.onNavigationIntent)(e.currentTarget,!0===E)},onTouchStart:function(e){T||"function"!=typeof P||P(e),T&&i.props&&"function"==typeof i.props.onTouchStart&&i.props.onTouchStart(e),Q&&B&&(0,p.onNavigationIntent)(e.currentTarget,!0===E)}};return(0,u.isAbsoluteUrl)(F)?U.href=F:T&&!k&&("a"!==i.type||"href"in i.props)||(U.href=(0,f.addBasePath)(F)),x=T?l.default.cloneElement(i,U):(0,o.jsx)("a",{...R,...U,children:a}),(0,o.jsx)(y.Provider,{value:b,children:x})}e.r(46905);let y=(0,l.createContext)(p.IDLE_LINK_STATUS),b=()=>(0,l.useContext)(y);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},40281,(e,t,r)=>{t.exports=e.r(99753)},32710,44453,15970,e=>{"use strict";var t=e.i(27707),r=e.i(86607),n=e.i(40281),a=e.i(39804);let i="history";function o(){return new Promise((e,t)=>{let r=indexedDB.open("hookflow",1);r.onerror=()=>t(r.error),r.onsuccess=()=>e(r.result),r.onupgradeneeded=()=>{let e=r.result;e.objectStoreNames.contains(i)||e.createObjectStore(i,{keyPath:"id"}).createIndex("createdAt","createdAt")}})}async function l(e){try{let t=await o(),r=`h_${Date.now()}`,n={id:r,createdAt:new Date().toISOString(),...e};return new Promise((e,a)=>{let o=t.transaction(i,"readwrite").objectStore(i).put(n);o.onsuccess=()=>e(r),o.onerror=()=>a(o.error)})}catch(e){return console.error("[History] Save failed:",e),""}}async function s(){try{let e=await o();return new Promise((t,r)=>{let n=e.transaction(i,"readonly").objectStore(i).getAll();n.onsuccess=()=>{let e=n.result.sort((e,t)=>new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime());t(e)},n.onerror=()=>r(n.error)})}catch(e){return console.error("[History] Get failed:",e),[]}}async function c(e){try{let t=await o();return new Promise((r,n)=>{let a=t.transaction(i,"readwrite");a.objectStore(i).delete(e),a.oncomplete=()=>r(),a.onerror=()=>n(a.error)})}catch(e){console.error("[History] Delete failed:",e)}}async function d(){try{let e=await o();return new Promise((t,r)=>{let n=e.transaction(i,"readwrite");n.objectStore(i).clear(),n.oncomplete=()=>t(),n.onerror=()=>r(n.error)})}catch(e){console.error("[History] Clear failed:",e)}}function u(e){return localStorage.getItem(`hookflow_${e}`)||""}function f(){return u("anthropic_key")?"anthropic":"none"}function h(){return!!u("gemini_key")}async function p(e,t,r={}){let n=u("anthropic_key");if(!n)throw Error("Anthropic API 키를 설정 페이지에서 입력해주세요.");let a={model:"claude-haiku-4-5-20251001",max_tokens:r.max||2048,temperature:r.temp??.7,system:e,messages:[{role:"user",content:t}]};r.webSearch&&(a.tools=[{type:"web_search_20250305",name:"web_search",max_uses:15}]);let i=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":n,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify(a)});if(!i.ok){let e=await i.text();throw Error(`Claude 오류(${i.status}): ${e.slice(0,150)}`)}let o=await i.json(),l="";for(let e of o.content||[])"text"===e.type&&(l+=e.text);return l}async function g(e){let t=u("gemini_key");if(!t)return null;try{let r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:e}]}],generationConfig:{responseModalities:["TEXT","IMAGE"]}})});if(!r.ok){let e=await r.text();return console.error("[NanoBanana] Gemini",r.status,e.slice(0,300)),null}let n=await r.json();for(let e of n?.candidates?.[0]?.content?.parts||[])if(e.inlineData)return`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`;return null}catch(e){return console.warn("[NanoBanana] 오류:",e),null}}function m(e){if(!e||!e.trim())throw Error("AI 응답이 비어있습니다.");let t=e.match(/```(?:json)?\s*([\s\S]*?)```/);if(t)try{return JSON.parse(t[1].trim())}catch{}for(let t of(e=>{let t=[],r=0,n=-1;for(let a=0;a<e.length;a++)"["===e[a]?(0===r&&(n=a),r++):"]"===e[a]&&0==--r&&-1!==n&&(t.push(e.slice(n,a+1)),n=-1);return t})(e).sort((e,t)=>t.length-e.length))try{return JSON.parse(t)}catch{}let r=e.match(/\{[\s\S]*\}/);if(r)try{return JSON.parse(r[0])}catch{}throw console.error("[HookFlow] JSON 파싱 실패 원문 (처음 500자):",e.slice(0,500)),Error(`AI 응답 파싱 실패. 다시 시도해주세요. (원문: ${e.slice(0,100)})`)}e.s(["clearHistoryDB",0,d,"deleteHistoryDB",0,c,"getHistoryDB",0,s,"saveHistoryDB",0,l],44453);let x="hookflow_trends_cache";async function y(e=!1){if(!e){let e=function(){try{let e=localStorage.getItem(x);if(!e)return null;let{data:t,timestamp:r}=JSON.parse(e);if(Date.now()-r<216e5)return t;localStorage.removeItem(x)}catch{}return null}();if(e&&e.length>0)return e}if("none"===f())return b();try{let e=new Date().toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"long"}),t=await p(`2026년 한국/글로벌 실시간 트렌드 분석가.
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
[{"title":"","description":"","traffic":"","views":"","category":"","relatedQueries":[""]}]`,{temp:.3,max:1e4,webSearch:!0}),r=m(t),n=(Array.isArray(r)?r:[]).map((e,t)=>({id:`t_${t}_${Date.now()}`,title:String(e.title||""),source:"AI 분석",description:String(e.description||""),traffic:String(e.traffic||"10K+"),views:String(e.views||"100K views"),relatedQueries:Array.isArray(e.relatedQueries)?e.relatedQueries.map(String):[],category:String(e.category||"기타"),fetchedAt:new Date().toISOString()}));if(n.length>0)return localStorage.setItem(x,JSON.stringify({data:n,timestamp:Date.now()})),n}catch(e){console.error("[HookFlow] AI 트렌드 생성 실패:",e)}return b()}function b(){return[{id:"d1",title:"제로 칼로리 디저트 열풍",source:"AI",description:"제로 칼로리 디저트가 SNS를 점령. 다이어트 중에도 즐기는 죄책감 없는 간식 트렌드.",traffic:"800K+",views:"5M views",relatedQueries:["제로슈거","다이어트간식"],category:"음식",fetchedAt:new Date().toISOString()},{id:"d2",title:"12-3-30 워킹 다이어트",source:"AI",description:"틱톡에서 폭발적 인기. 경사 12, 속도 3, 30분 걷기로 체중 감량 성공 사례 속출.",traffic:"1.2M+",views:"15M views",relatedQueries:["걷기다이어트","틱톡운동"],category:"다이어트",fetchedAt:new Date().toISOString()},{id:"d3",title:"장건강이 피부를 바꾼다",source:"AI",description:"프로바이오틱스와 장건강이 피부 개선에 직접 영향. 피부과 전문의 추천 루틴 화제.",traffic:"500K+",views:"3M views",relatedQueries:["장건강","피부관리"],category:"건강",fetchedAt:new Date().toISOString()},{id:"d4",title:"고단백 도시락 밀프렙",source:"AI",description:"일주일치 고단백 도시락을 한번에 준비하는 밀프렙 콘텐츠가 직장인들 사이에서 대유행.",traffic:"300K+",views:"2M views",relatedQueries:["밀프렙","고단백식단"],category:"식단",fetchedAt:new Date().toISOString()},{id:"d5",title:"무신사 여름 세일 핫딜",source:"AI",description:"무신사 시즌 세일 시작. 최대 80% 할인 품목 정리 콘텐츠 조회수 폭발.",traffic:"600K+",views:"4M views",relatedQueries:["무신사세일","여름패션"],category:"쇼핑",fetchedAt:new Date().toISOString()},{id:"d6",title:"선크림 하나로 톤업 완성",source:"AI",description:"톤업 선크림 비교 리뷰 영상이 화제. 화장 없이 피부 보정 효과 검증.",traffic:"400K+",views:"6M views",relatedQueries:["톤업선크림","데일리선케어"],category:"화장품",fetchedAt:new Date().toISOString()},{id:"d7",title:"올드머니룩 코디법",source:"AI",description:'조용한 럭셔리 "올드머니룩"이 패션 트렌드 1위. 기본 아이템으로 고급스러운 스타일링.',traffic:"700K+",views:"8M views",relatedQueries:["올드머니룩","미니멀패션"],category:"의류",fetchedAt:new Date().toISOString()},{id:"d8",title:"쯔양 복귀 먹방 1000만뷰",source:"AI",description:"쯔양의 복귀 먹방 영상이 1000만 뷰를 돌파. 유튜브 실시간 트렌딩 1위 기록.",traffic:"2M+",views:"10M views",relatedQueries:["쯔양","먹방유튜버"],category:"인플루언서",fetchedAt:new Date().toISOString()},{id:"d9",title:"BTS 진 솔로 컴백",source:"AI",description:"BTS 진의 솔로 앨범 발매 소식에 전 세계 팬덤이 들끓는 중. 선주문량 역대급.",traffic:"5M+",views:"50M views",relatedQueries:["BTS진","K-POP"],category:"셀럽",fetchedAt:new Date().toISOString()},{id:"d10",title:"AI로 월 500만원 부업",source:"AI",description:"ChatGPT와 AI 도구로 부업하는 실제 사례 모음. 초보자도 따라할 수 있는 가이드.",traffic:"1M+",views:"7M views",relatedQueries:["AI부업","자동수익"],category:"재테크",fetchedAt:new Date().toISOString()},{id:"d11",title:"Apple Vision Pro 2 출시",source:"AI",description:"Apple Vision Pro 2세대 공개. 가격 절반에 성능 2배. 국내 출시일 확정.",traffic:"800K+",views:"4M views",relatedQueries:["비전프로","애플신제품"],category:"테크",fetchedAt:new Date().toISOString()},{id:"d12",title:"아이브 월드투어 티켓팅 전쟁",source:"AI",description:"아이브 첫 월드투어 티켓 오픈과 동시에 전석 매진. 리셀 가격 10배 치솟아.",traffic:"3M+",views:"20M views",relatedQueries:["아이브","콘서트티켓"],category:"셀럽",fetchedAt:new Date().toISOString()},{id:"d13",title:"5월 어버이날 감동 선물 TOP 10",source:"AI",description:"2026년 어버이날 선물 트렌드. 건강식품부터 체험형 선물까지 가성비 랭킹.",traffic:"600K+",views:"3M views",relatedQueries:["어버이날","효도선물"],category:"시즌",fetchedAt:new Date().toISOString()},{id:"d14",title:"일본 벚꽃 명소 2026 업데이트",source:"AI",description:"2026년 일본 벚꽃 개화 시기 확정. 새로운 숨은 명소와 가성비 여행 루트 공개.",traffic:"400K+",views:"2M views",relatedQueries:["일본여행","벚꽃명소"],category:"글로벌",fetchedAt:new Date().toISOString()},{id:"d15",title:"마음이 힘들 때 읽는 법구경",source:"AI",description:"불교 경전 법구경 속 지혜의 말씀. 현대인의 번아웃을 치유하는 2600년 된 처방전.",traffic:"200K+",views:"1.5M views",relatedQueries:["명상","마음치유"],category:"지혜",fetchedAt:new Date().toISOString()},{id:"d16",title:"2026 연애 트렌드 대반전",source:"AI",description:'Z세대의 새로운 연애 문화 "슬로우 데이팅"이 전 세계적 트렌드. 빠른 만남보다 천천히 알아가는 관계 선호.',traffic:"700K+",views:"8M views",relatedQueries:["슬로우데이팅","연애트렌드"],category:"연애",fetchedAt:new Date().toISOString()},{id:"d17",title:"커플 심리테스트 1억뷰 돌파",source:"AI",description:"틱톡에서 유행하는 커플 궁합 심리테스트가 1억 뷰 돌파. 연인 관계 진단 콘텐츠 폭발.",traffic:"500K+",views:"100M views",relatedQueries:["커플테스트","연애심리"],category:"연애",fetchedAt:new Date().toISOString()}]}async function w(e,t,r=3){let n=new Date().toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"long"}),a=`${new Date().getFullYear()}년 ${new Date().getMonth()+1}월`,i=m(await p(`당신은 한국 SNS 마케팅 전문 저널리스트입니다.
오늘 날짜: ${n}

**절대 규칙 - 반드시 준수:**

1. **최신성 필수**: ${a} 이내의 뉴스만 사용. 3개월 이상 오래된 자료 절대 금지.
2. **2차 검증**: 웹 검색을 **최소 2라운드** 수행 (1차 수집 → 2차 교차검증)
3. **날짜 명시**: 각 팩트는 뉴스 발행일을 확인 후 인용
4. **구체성**: 숫자, 날짜, 법조항, 인명, 금액 등 검증 가능한 팩트만

**작업 순서 (엄격 준수):**

[1라운드 검색]
- "토픽명 ${a}" 검색
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
1. "${e.title} ${a}" 검색
2. "${e.title} 최신 뉴스 2026" 검색
3. "${e.title} 발표 ${new Date().getFullYear()}" 검색

[2라운드 - 교차 검증]
1라운드에서 찾은 가장 중요한 팩트 3-5개를 다른 키워드로 재검색:
4. 팩트별 날짜 확인 (${a} 이내인지 검증)
5. 다른 매체에서 동일 팩트 확인
6. 숫자/금액/날짜 정확성 재확인

[3단계 - 대본 ${r}개 작성]

**각 대본 규칙:**
- **팩트는 반드시 ${a} 이내 뉴스에서만 추출** (오래된 자료 절대 금지)
- headline: 최신 뉴스의 핵심 (15자 이내)
- subheadline: 날짜 또는 구체 수치 포함 (30자 이내)
- bodyPoints: 5개, **각각 ${a} 뉴스 팩트 + 숫자 포함** (각 40자 이내)
  - 예시 형식: "${a} 발표: [구체적 수치/내용]"
- callToAction
- targetAudience

**금지 사항:**
- 3개월 이상 오래된 자료 인용 (절대)
- 검증 안 된 추측 정보
- 숫자 없는 일반론

**최종 출력:** JSON 배열만 (설명 금지, 코드블록 금지)

[{"headline":"","subheadline":"","bodyPoints":["","","","",""],"callToAction":"","targetAudience":""}]`,{temp:.3,max:16e3,webSearch:!0}));return Array.isArray(i)?i:[i]}async function v(e,t=8){let r=m(await p(`SNS 콘텐츠 작가. 초보자도 이해하기 쉽게 친절하게 작성. 한국어 맞춤법 완벽. JSON만 반환.

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
]`,{temp:.6,max:6e3}));return Array.isArray(r)?r:[r]}async function j(e,t="instagram"){if(!h())return e.map(()=>"");let r={instagram:"정사각형 1:1",tiktok:"세로 9:16",facebook:"가로 16:9"},n=Array(e.length).fill("");for(let a=0;a<e.length;a+=2){let i=e.slice(a,a+2).map((i,o)=>{let l=String(i.title||""),s=String(i.subtitle||""),c=String(i.body||""),d=a+o===0,u=a+o===e.length-1;return g(`${d?`스크롤 멈추는 한국 SNS 메인 이미지.
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

출력 전 검증: 이미지 내 한국어가 "${l}" 및 "${s}"와 정확히 일치하는지 확인.`).then(e=>{n[a+o]=e||""}).catch(()=>{n[a+o]=""})});await Promise.all(i),a+2<e.length&&await new Promise(e=>setTimeout(e,3e3))}return n}async function S(e){await l(e),localStorage.removeItem("hookflow_history")}e.s(["CATEGORIES",0,[{key:"all",label:"전체",emoji:"🔥"},{key:"음식",label:"음식/맛집",emoji:"🍽"},{key:"다이어트",label:"다이어트",emoji:"💪"},{key:"건강",label:"건강/의약",emoji:"🏥"},{key:"식단",label:"식단/영양",emoji:"🥗"},{key:"쇼핑",label:"쇼핑트렌드",emoji:"🛍"},{key:"화장품",label:"화장품/뷰티",emoji:"💄"},{key:"의류",label:"의류/패션",emoji:"👗"},{key:"인플루언서",label:"인플루언서",emoji:"📱"},{key:"셀럽",label:"연예인/셀럽",emoji:"⭐"},{key:"테크",label:"IT/테크",emoji:"💻"},{key:"재테크",label:"재테크/부업",emoji:"💰"},{key:"시즌",label:"시즌/이벤트",emoji:"📅"},{key:"글로벌",label:"글로벌/나라별",emoji:"🌍"},{key:"지혜",label:"지혜/철학/종교",emoji:"🕊"},{key:"연애",label:"연애/관계/성",emoji:"💕"}],"fetchTrends",0,y,"generateCarouselSlides",0,v,"generateHooks",0,w,"generateSlideImages",0,j,"getActiveProvider",0,f,"getApiKey",0,e=>u(`${e}_key`),"hasGeminiKey",0,h,"saveToHistory",0,S,"setApiKey",0,(e,t)=>{var r;return r=`${e}_key`,void localStorage.setItem(`hookflow_${r}`,t)}],15970);let N=[{href:"/",label:"트렌드",icon:"📊"},{href:"/generate",label:"생성",icon:"🚀"},{href:"/custom",label:"커스텀",icon:"✏"},{href:"/history",label:"히스토리",icon:"📋"},{href:"/settings",label:"설정",icon:"⚙"}];e.s(["default",0,function(){let e=(0,n.usePathname)(),[i,o]=(0,a.useState)({claude:!1,nano:!1});return(0,a.useEffect)(()=>{o({claude:"none"!==f(),nano:h()})},[]),(0,t.jsx)("nav",{className:"sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-xl",children:(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"flex items-center justify-between h-16",children:[(0,t.jsxs)(r.default,{href:"/",className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold text-sm",children:"HF"}),(0,t.jsxs)("span",{className:"text-lg font-bold",children:[(0,t.jsx)("span",{className:"gradient-text",children:"HookFlow"})," ",(0,t.jsx)("span",{className:"text-foreground/60",children:"AI"})]})]}),(0,t.jsx)("div",{className:"flex items-center gap-1",children:N.map(n=>(0,t.jsxs)(r.default,{href:n.href,className:`px-3 py-2 rounded-lg text-sm font-medium transition-all ${e===n.href?"bg-accent/15 text-accent":"text-foreground/60 hover:text-foreground hover:bg-card-bg"}`,children:[(0,t.jsx)("span",{className:"mr-1",children:n.icon}),n.label]},n.href))}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${i.claude?"bg-success":"bg-danger"}`}),(0,t.jsx)("span",{className:"text-foreground/50",children:i.claude?"Claude":"미연결"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]",children:[(0,t.jsx)("div",{className:`w-2 h-2 rounded-full ${i.nano?"bg-purple-400":"bg-foreground/20"}`}),(0,t.jsx)("span",{className:"text-foreground/50",children:i.nano?"NanoBanana":"이미지 꺼짐"})]})]})]})})})}],32710)},80470,e=>{"use strict";var t=e.i(27707),r=e.i(39804),n=e.i(32710),a=e.i(44453),a=a,i=a,o=a;e.s(["default",0,function(){let[e,l]=(0,r.useState)([]),[s,c]=(0,r.useState)(null),[d,u]=(0,r.useState)(!0);async function f(){u(!0),l(await (0,a.getHistoryDB)()),u(!1)}async function h(e){confirm("삭제하시겠습니까?")&&(await (0,i.deleteHistoryDB)(e),f(),s?.id===e&&c(null))}async function p(){confirm("모든 기록을 삭제하시겠습니까?")&&(await (0,o.clearHistoryDB)(),l([]),c(null))}function g(e,t,r){if(!e)return;let n=document.createElement("a");n.href=e,n.download=`${r.slice(0,20)}-${t+1}.png`,n.click()}async function m(e){for(let t=0;t<e.images.length;t++)e.images[t]&&(g(e.images[t],t,e.headline),await new Promise(e=>setTimeout(e,500)))}return(0,r.useEffect)(()=>{f()},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.default,{}),(0,t.jsxs)("main",{className:"flex-1 max-w-7xl mx-auto w-full px-4 py-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"text-2xl font-bold",children:(0,t.jsx)("span",{className:"gradient-text",children:"작업 히스토리"})}),(0,t.jsx)("p",{className:"text-foreground/40 text-sm mt-1",children:"생성한 모든 콘텐츠 기록 (이미지 포함)"})]}),e.length>0&&(0,t.jsx)("button",{onClick:p,className:"text-xs text-danger/50 hover:text-danger px-3 py-1.5 rounded-lg border border-danger/20",children:"전체 삭제"})]}),d?(0,t.jsxs)("div",{className:"text-center py-20 text-foreground/30",children:[(0,t.jsx)("div",{className:"w-8 h-8 mx-auto rounded-full border-[3px] border-accent/30 border-t-accent animate-spin mb-4"}),(0,t.jsx)("p",{children:"로딩 중..."})]}):0===e.length?(0,t.jsxs)("div",{className:"text-center py-20 text-foreground/30",children:[(0,t.jsx)("div",{className:"text-4xl mb-4",children:"📋"}),(0,t.jsx)("p",{children:"아직 작업 기록이 없습니다."}),(0,t.jsx)("p",{className:"text-xs mt-1",children:"콘텐츠를 생성하면 이미지와 함께 자동 저장됩니다."})]}):(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[(0,t.jsxs)("div",{className:"space-y-3 lg:col-span-1",children:[(0,t.jsxs)("div",{className:"text-sm text-foreground/50 mb-2",children:[e.length,"개 작업"]}),e.map(e=>(0,t.jsxs)("button",{onClick:()=>c(e),className:`w-full text-left p-4 rounded-xl border transition-all ${s?.id===e.id?"border-accent bg-accent/5":"border-card-border bg-card-bg hover:border-accent/30"}`,children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsx)("span",{className:"text-xs text-foreground/30",children:new Date(e.createdAt).toLocaleDateString("ko-KR",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}),(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)("span",{className:"px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px]",children:e.platform}),(0,t.jsxs)("span",{className:"text-[10px] text-foreground/30",children:[e.slideCount,"장"]})]})]}),(0,t.jsx)("h3",{className:"font-bold text-sm mb-1",children:e.headline}),(0,t.jsx)("p",{className:"text-xs text-foreground/40 mb-2",children:e.topic}),(0,t.jsxs)("div",{className:"flex gap-1",children:[e.images.slice(0,5).map((e,r)=>e?(0,t.jsx)("div",{className:"w-10 h-10 rounded overflow-hidden border border-card-border",children:(0,t.jsx)("img",{src:e,alt:"",className:"w-full h-full object-cover"})},r):null),e.images.length>5&&(0,t.jsxs)("div",{className:"w-10 h-10 rounded bg-card-border flex items-center justify-center text-[10px] text-foreground/30",children:["+",e.images.length-5]})]})]},e.id))]}),(0,t.jsx)("div",{className:"lg:col-span-2",children:s?(0,t.jsxs)("div",{className:"space-y-4 sticky top-20",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("h2",{className:"font-bold text-lg",children:s.headline}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{onClick:()=>m(s),className:"text-xs text-accent hover:text-accent/80 px-3 py-1.5 rounded-lg border border-accent/20",children:"전체 다운로드"}),(0,t.jsx)("button",{onClick:()=>h(s.id),className:"text-xs text-danger/50 hover:text-danger px-3 py-1.5 rounded-lg border border-danger/20",children:"삭제"})]})]}),(0,t.jsxs)("div",{className:"flex gap-2 text-xs",children:[(0,t.jsx)("span",{className:"px-2 py-1 rounded-full bg-accent/10 text-accent",children:s.platform}),(0,t.jsxs)("span",{className:"px-2 py-1 rounded-full bg-card-bg border border-card-border text-foreground/50",children:[s.slideCount,"장"]}),(0,t.jsx)("span",{className:"px-2 py-1 rounded-full bg-card-bg border border-card-border text-foreground/50 truncate max-w-[200px]",children:s.topic})]}),(0,t.jsx)("div",{className:`grid gap-3 ${(s.platform,"grid-cols-3")}`,children:s.images.map((e,r)=>(0,t.jsxs)("div",{className:"group relative",children:[(0,t.jsx)("div",{className:`rounded-lg overflow-hidden border border-card-border bg-card-bg ${"tiktok"===s.platform?"aspect-[9/16]":"facebook"===s.platform?"aspect-[16/9]":"aspect-square"}`,children:e?(0,t.jsx)("img",{src:e,alt:`${r+1}`,className:"w-full h-full object-cover"}):(0,t.jsx)("div",{className:"w-full h-full flex items-center justify-center text-foreground/30 text-xs",children:"이미지 없음"})}),(0,t.jsx)("div",{className:"absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-bold",children:0===r?"메인":r+1}),e&&(0,t.jsx)("button",{onClick:()=>g(e,r,s.headline),className:"absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity",children:"다운로드"})]},r))}),(0,t.jsxs)("details",{className:"rounded-xl bg-card-bg border border-card-border",children:[(0,t.jsxs)("summary",{className:"p-4 text-sm font-bold text-foreground/70 cursor-pointer",children:["대본 (",s.scripts.length,"컷)"]}),(0,t.jsx)("div",{className:"px-4 pb-4 space-y-2",children:s.scripts.map((e,r)=>(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("span",{className:`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${0===r?"bg-accent text-white":"bg-card-border text-foreground/50"}`,children:r+1}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-sm font-medium",children:e.title}),(0,t.jsx)("div",{className:"text-xs text-foreground/40",children:e.body})]})]},r))})]}),(0,t.jsx)("div",{className:"text-xs text-foreground/20",children:new Date(s.createdAt).toLocaleString("ko-KR")})]}):(0,t.jsx)("div",{className:"flex items-center justify-center text-foreground/30 text-sm h-40",children:"왼쪽에서 작업을 선택하세요"})})]})]})]})}],80470)}]);