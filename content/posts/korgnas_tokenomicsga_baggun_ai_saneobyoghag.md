---
title: "Tokenomics가 바꾼 AI 산업역학"
date: 2025-12-26
summary: "Google(TPU) Leads for Now, but Nvidia(GPU) Will Catch Up"
tags: [AI, 테크]
cover: "/images/korgnas_tokenomicsga_baggun_ai_saneobyoghag_cover.jpg"
---

Netflix, Amazon, Meta, Google 등 인터넷 시대의 위대한 기업들은 좋은 제품 → 사용자 확보 → 데이터 생성 → 제품 개선으로 이어지는 강력한 Flywheel[^1]을 구축해서 시장을 지배했습니다. 그러면 AI 시대에선 어떻게 시장을 지배할 수 있을까요?

Foundation Model 경쟁 시기였던 2023년과 2024년에는 경쟁사보다 최대한 큰 모델을 사전 훈련하고 배포하기 급급했습니다. 그렇지만 바로 다음 모델이 나오는 순간, 이전 모델은 별로 쓸모가 없어졌습니다. 모델에 피드백을 줄 방법이 없었기 때문이죠. 그럼에도 Big Tech들은 죄수의 딜레마 상태에 빠져 LLM을 끊임없이 개발할 수 밖에 없었습니다. ~~(당시 LLM은 세상에서 가장 비싼 감가상각 자산이라는 평도 많았습니다.)~~

그리고 추론이라는 방법이 등장하게 됐고, 이때부터 AI 산업역학은 Tokenomics로 변화하기 시작합니다. 사람들이 특정 답변(Token)에 대해 일관적으로 긍정적이거나 부정적인 반응을 나타내면, 이를 모델에 반영하고 개선할 수 있기 때문이죠. ~~(이를 검증된 보상 기반 강화학습, RLVR 라고 해요.)~~ 이제 Frontier Model 연구소도 OpenAI / Anthropic / xAI / Gemini 4개 정도로 좁혀져서[^2], 추론을 잘 활용해서 Flywheel만 돌리면 금방 앞서나갈 것이라 생각할 수 있겠지만, 이게 또 어려운 일 입니다.

AI 모델이 이미 LLM으로 아주 커졌기 때문에 개선을 하기 위해선 GPU Cluster를 1K → 100K 단위로 돌려야하고, 이는 실험 비용의 증가로 이어지기 때문입니다. 클라우드를 다뤄봤던 업체들이 이걸 잘하겠지 생각하지만, 의외로 클라우드는 비용 최적화의 영역이라, 성능 및 높은 활용률 유지는 또 다른 영역입니다. 이렇게 훈련과 추론에 필요한 Token 비용이 계속 증가하면, Frontier Model 연구소들은 이를 낮춰줄 수 있는 회사에 의존할 수 밖에 없습니다.

여기서 AI Tokenomics의 주도권은 LLM을 만드는 S/W 회사에서 가속기를 만드는 H/W 회사로 넘어가게 되는데요. 현재로썬 Token 당 비용을 낮춰줄 수 있는 회사는 Nvidia와 Google 밖에 없는 것 같습니다. Google은 심지어 Frontier Model인 Gemini와 고객 Lock-in 효과가 강한 서비스(검색/Youtube/Mail)도 여러 개 갖고 있죠. Nvidia의 Hopper → Blackwell 전환이 지연되며 다른 Frontier Model 연구소가 주춤하는 사이, Google은 Frontier Model Gemini를 최신 TPU v6/v7 로 훈련해서 일시적 우위를 점했습니다. ~~(써보시면 이미지 전환이나 기본 성능이 진짜 좋습니다.)~~

Nvidia의 GPU는 세대를 거듭하면서 현재 Hopper에서 Blackwell로 전환 중인데요. 사실 이번 전환 과정에선 꽤나 바꿔야되는 게 많았습니다. 냉각 방식이 공랭식 → 액체냉각으로 변경되었고, 단순 Rack 무게는 1K → 3K 파운드로, 전력 소비는 30kW → 130kW로 증가했습니다. 비유를 하자면 새로운 iPhone을 사기위해 집 전체를 풀 인테리어 한 것과 같구요(시스템 에어컨, 바닥, 전기까지 다 새로 한 느낌이랄까요). 아마 Blackwell과 차세대 Rubin 기반 GPU Cluster로 전환이 되면, Nvidia는 다시 Token당 최저 비용 생산자 지위를 탈환할 것 같네요.

Nvidia와 Google은 앞으로도 이렇게 엎치락 뒤치락 하겠지만, 제 생각엔 아마도 Google에게 좀 더 힘든 경쟁이 될 것 같습니다. 왜냐면 Google은 Nvidia나 Apple 처럼 TSMC를 직접 관리하지 않고, 설계(ASIC)만 직접하고 제조 관리(Back End)는 Broadcom에게 위임하기 때문입니다.

Broadcom의 Gross Margin은 약 50%에 달하는데, 사실 상 Google이 Broadcom에게 이 마진을 제공하는 셈이라, 수직 계열화로 공급망을 운영 중인 Nvidia 대비 핸디캡이 있습니다. ~~(Nvidia는 공급망을 수직계열화해서 부품 회사들에게 아주아주 강력한 압박을 통해 마진을 쥐어짜냅니다.)~~

뿐만 아니라 전력 제약이 계속되는 한, Computing 인프라는 가격보다 Watt당 Token 효율이 압도적으로 중요한데요. 이렇게되면 가격과 무관하게 최고 성능 제품이 시장을 주도하고 가격 결정권도 가질 가능성이 높습니다. Nvidia는 1년 주기로 새로운 GPU를 출시하고 있습니다. Google/Broadcom 연합이 서로 마찰 없이 경쟁력을 계속 유지하면서, 개발 주기를 더욱 빠르게 해낼 수 있을지도 관전 포인트겠네요. ~~(제 생각엔 Nvidia와 생산 경쟁하는 건 쉽지 않을 것 같습니다.)~~

[GPUs, TPUs, & The Economics of AI Explained | Gavin Baker Interview](https://www.youtube.com/watch?v=cmUo4841KQw)

---

[^1]: Flywheel은 기계에 들어가는 무거운 회전바퀴를 의미합니다. 처음 돌릴 땐 힘이 많이들지만 한번 돌리면 관성 때문에 힘을 조금만 줘도 계속 돌아가게 되는데요. 비즈니스에선 고객·제품·비용·규모가 서로를 밀어주며 시간이 갈수록 성장 속도가 빨라지는 구조를 의미합니다. 알기 쉬운 예로는 아마존 온라인 리테일이 있습니다.

![Flywheel 설명 이미지](/images/korgnas_korgnas_tokenomicsga_baggun_ai_saneobyoghag_img1.jpg)

[^2]: OpenAI 1.35T Tokens, Google 8~900B Tokens, Anthropic 700B (2025년 기준 추론 토큰 규모 추정치)
