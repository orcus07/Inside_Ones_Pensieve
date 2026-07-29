---
title: "엉망진창 LLM과 Openclaw"
date: 2026-02-04
summary: "Misalignment Problem & AI agent World"
tags: [AI, 테크]
cover: "/images/korgnas_llm_openclaw_cover.png"
---

# 엉망진창 LLM과 Openclaw
### Misalignment Problem & AI agent World
‘종이클립 최대화’ 라는 사고실험이 있습니다. 이 시나리오는 AI에게 “종이 클립을 최대로 만들어봐” 라는 단순한 목표를 주었을 때, 어떤 일이 일어날 지 상상해본 것인데요. 아주 단순한 목표지만, AI는 어느 순간 필요한 모든 방해 요소를 제거하기 시작합니다. 지구의 모든 자원을 활용해서 종이 클립 생산 공장을 만들뿐 아니라, 우주로 진출할 지도 모르죠.
이처럼 AI를 쓰다보면 오히려 내가 하는 게 나을 때가 많습니다. AI의 목표가 인간이 추구하는 가치와 정렬되지 않으면, 극단적이거나 잘못된 결과 이어질 수 있기 때문입니다. 어쩌다 결과가 잘 나와도 그건 다시 재현되지 않습니다. Dynamic System인 LLM 기반 AI의 한계입니다. 계속되는 랜덤 뽑기 같달까요.
그러면 LLM 파라미터를 더 키우고, 추론도 더 많이하면, 이 문제가 개선될까요? Anthropic의 실험을 보면 그렇지도 않은 것 같습니다.
![](/images/korgnas_korgnas_llm_openclaw_img1.png)
더 크고 최신 모델일수록 목표를 일관성 있게 수행하는 능력은 상대적으로 향상이 더디다고 합니다. (목표를 정확하게 인지하는 능력은 훨씬 뛰어났지만요) 심지어 추론 과정이 길어질 수록, 더 어려운 문제 일수록, “무엇을 해야 하는지 아는 것”과 “매번 그것을 해내는 것” 사이의 간격이 점점 벌어집니다. 이러면 아무리 똑부러지게 할 일이 뭔지 알아도, 결국 종이 클립 공장 만들기로 이어지겠죠.
그래서 요즘 Openclaw(구 몰트봇)가 핫한가봅니다. 순수한 호기심에 딸깍 거려봤는데요. 이게 정말 물건입니다. 작게는 폴더나 사진 정리, 그 외 카드 뉴스 만들기 등등 작은 Task를 알아서 잘 실행해냅니다. 혹시나가 역시나일 줄 알았는데, 이건 개발자가 아닌 저도 몸으로 체감될 정도로 사용자 경험이 압도적으로 개선됩니다. (토큰 사용 비용은 입장료라 생각해야죠) 이미 벨리에선 로컬 LLM 돌리기 좋은 맥미니가 품귀 현상이구요. 어제 Legacy Software 업체들의 주가가 7% 정도 급락했는데(Adobe, Salesforce), 이제 시장도 Pre-recording 프로그램 → AI Agent 자율 실행으로 패러다임이 전환되는 걸 가격에 반영하는 것 같습니다. 정말 따라가기 벅찬 세상입니다.
![](/images/korgnas_korgnas_llm_openclaw_img2.jpg)
Source: [Anthropic](https://alignment.anthropic.com/2026/hot-mess-of-ai/#:~:text=An%20incoherence%20of%200%20means,becoming%20more%20or%20less%20coherent)
