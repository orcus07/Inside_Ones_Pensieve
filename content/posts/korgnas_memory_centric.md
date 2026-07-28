---
title: "돌아돌아 메모리 Centric"
date: 2026-03-18
summary: "메모리가 유니버스의 중심이 될 줄이야"
tags: [AI, 테크]
cover: "/images/korgnas_memory_centric_cover.jpg"
---

사용자 경험은 새로운 패러다임 출현에 맞춰 특정 행동 패턴으로 고착화된다. PC의GUI, Mobile의 Multi-Touch 처럼 ~~( 둘다 애플에서 나왔다니 새삼 위대한 기업이라는 생각이 든다 )~~ . 그리고 그 행동 패턴을 OS로 구현해내면, 사용자는 그곳에 자연스럽게 종속되고, 시장은 확대된다. 그래서 보통 이 사용자 행동 패턴을 OS로 선점한 기업이 비즈니스 주도권을 잡았다. 아래 IT 패러다임 별 성장 곡선 ~~(24년 작성)~~ 을 보면, 그것을 해낸 MSFT Window 나 Apple의 iPhone은 위대한 제품이 되었고, 오랫동안 시장을 지배했다.

![](/images/korgnas_korgnas_memory_centric_img1.jpg)

한편, AI 패러다임 시대의 User Interface는 LLM 기술로 시작하여, 자연어를 입력받는 챗봇 형태로 형성됐다. 다른 게 더 나올까 기대도 되었지만, 결국 챗봇 형태로 수렴하는 모양새다. 아래 Flow Chart를 작성하던 24년엔 Copilot 이나 Apple Intelligence 가 AI Agent Platform 역할을 할 수 있을 것으로 생각했다. 각각 Enterprise/Consumer Software에 또렷한 강점이 있던 회사고, 장점들을 잘 녹여서 사용자가 잘 사용하는 플랫폼으로 만드는 게 어렵지 않을 것 같았다. 그렇지만, 결과로만 놓고 보았을 때, 두 업체 모두 기존 SaaS 모델의 공식을 벗어나지 못했고, 주류 시장과 바깥에 있던 1인 개발자가 개발한 Openclaw라는 새로운 플랫폼 등장을 허용하게 되었다. ~~(‘혁신 기업의 딜레마’라는 클레이 크리스텐슨의 오래된 파괴적 혁신이론은 여전히 유효한가보다)~~

![](/images/korgnas_korgnas_memory_centric_img2.jpg)

아래의 Openclaw의 Workflow를 자세히보면, 사용자는 여전히 플랫폼과 자연어로 대화하며 고착화되지만, 플랫폼은 AI Agent or Sub-Agent와 소통하는 형식으로 Software 계층이 하나 더 형성된다. 즉, 사용자가 Agent 플랫폼에게 맥락을 전달하고, LLM 플랫폼은 각 맥락에 맞게 특화된 Sub-agent 들에게 일을 전달하는 형식인 것이다. 사용자 입장에서는 내가 직접 Software나 App을 만지는게 아니라, 그냥 자연어로만 얘기하면 일은 모두 Back-end에서 돌아가는 형식인 것이다. 이렇게 되면 기존 SaaS Software 나 App들의 접점은 사용자에서 Agent 플랫폼 즉, Openclaw로 이동하게 된다. User에겐 결과만 가면 되고, 보이지 않는 Back-end에서 Frontier Model 끼리 API에 선택될 수 있게끔 성능 경쟁을 하고, On-device 에선 어떤 Device가 Orchestration에 적합할지 경쟁하는 구도가 형성되는 것이다. 기존과 다른 게임의 법칙이 생기게 되는 것이고, 자연스럽게 SaaSpocalyse 나 Software의 종말도 합리적인 시나리오가 된다. ~~(Open AI는 오히려 패러다임 초기 폭발적으로 증가한 ChatGPT User를 경쟁 우위로 전환하지 못했고, Free Tier User에 고착된 것 같다. 오히려 돈이 되는 Enterprise 고객을 누가 주도할지 Anthropic과 Frontier Model 경쟁력을 다투는 치킨게임에 빠졌다.)~~

![](/images/korgnas_korgnas_memory_centric_img3.jpg)

그러면 이 Openclaw 같은 플랫폼 확산으로 인해 AI 시대를 누가 선점할까를 생각해 보면, 기존 IT 패러다임의 공식과 조금 달라지는 것 같다. PC와 모바일 시대에서 경쟁의 본질은 네트워크 효과였다. 사용자를 얼마나 빨리 확보할 것인가가 가장 중요했고 그것을 위해선 초기 손해를 기꺼이 감수했다. 그렇지만 이번 패러다임은 오히려 User 보다 하드웨어/Device를 누가 빠르게 선점하고 통제할 것인가로 이동하는 것 같다. 상술했듯이 Cloud API 경쟁에서는 Token을 얼마나 싼값에 제공하느냐 싸움이고, On-device 경쟁 측면에서는 AI Agent에 적합한 기기를 얼마나 합리적으로 공급할 것이냐의 싸움이기 때문이다.

이런 관점에선 Google과 Apple이 조금 앞서있는 것 같다. Google은 자체 가속기인 TPU 기반 Token 비용 최적화로 API 비용이 가장 낮게 운영하고 있고, Apple은 자체 Chip 설계로 Device가 AI Agent에 적합하고 공급망 협상력을 기반으로 PC/Smartphone 가격을 유일하게 동결하고 있기 때문이다. 놀랍게도 사실 이 모든 시나리오의 Swing-Factor는 수동적으로 동작하는 메모리다. 메모리가 싸면 On-device 중심 시나리오로 Ecosystem이 형성 되겠지만, 향후 몇 년간은 Shortage가 예상되어서 당분간은 Cloud 중심 시나리오가 될 것 같다.

![](/images/korgnas_korgnas_memory_centric_img4.jpg)

Openclaw는 이제 Nvidia GTC 2026 PT에도 등장하며, 존재감을 과시하고 있다. 현재 Openclaw의 유일한 단점은 보안 요소인데, Nvidia는 Openclaw의 창업자와 발빠르게 보안을 강화하여 “Nemoclaw”라는 기업용 오픈소스 플랫폼을 이번 GTC에서 선보였다. 뿐만 아니라 서버 신제품인 Vera-Rubin Ultra & LPU가 고성능 Token Throughput에 특히 효과적임을 강조했다. 이제 과금 측면에선 사용자가 주는 Task들을 LLM OS가 알아서 Orchestration 하고 Pay-as-yougo로 결제하면 되니깐, 더 비싼 추론 Token을 API로 효과적으로 고객들에게 널리 제공할 수 있는 인프라 Solution만 있으면 Revenue로 이어지기 때문이다. 높은 추론 성능을 가진 인프라를 고객에게 비싸게 팔면서, 그것이 곧 고객 Revenue로 이어질거라는 프레임으로 묶는 것도 참 영리하다. ~~(Nvidia 자체 개발한 LLM인 emotron도 Open Source임을 강조하며 Bundle로 섞은 것도 영리하다)~~ 당분간 유효할 클라우드 시나리오에서도 Nvidia는 여전히 강력하다.

![](/images/korgnas_korgnas_memory_centric_img5.jpg)

#### Discussion about this post

Comments Restacks

Top Latest

No posts
