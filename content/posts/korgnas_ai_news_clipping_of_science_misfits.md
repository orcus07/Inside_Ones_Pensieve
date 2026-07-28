---
title: "이과 부적응자의 AI 뉴스 클리핑"
date: 2026-01-09
summary: "Thin-Client & Subscription Scenario"
tags: [AI, 테크]
---

CES가 한창인데요. 저는 Dell이 AI PC를 포기한 것에 놀랐습니다. 제품 책임자 Kevin Terwillinger는 올해 메시지는 AI-First가 아니라고 명확히 하면서, 소비자들은 이제 AI 기반으로 PC를 구매하지 않는다고 공개적으로 강조했거든요. 이렇게 과감하게 AI-First 전략을 버린 업체는 처음인 것 같습니다.

AI 시대를 맞아 Set 업체들은 너도나도 PC나 모바일 제품에 NPU라는 부품을 집엔엏기 시작했는데요. 그렇지만 이렇게 비싼 부품이 들어간 AI PC나 스마트폰이 LLM 추론이나 이미지 생성은 불가능하고, 줌미팅 배경 보정 / 노이즈 캔슬링 그리고 이미지 보정 ~~(그나마도 비용은 Set 업체들이 부담…)~~ 정도만 가능하다는 건 공공연한 비밀이었죠.

사람들은 모호한 “AI”보다는 챗지피티나 제미나이 같이 LLM이 제공하는 기능을 원합니다. 현재 그런 기능은 클라우드를 통하지 않으면 쓸수가 없죠. 엣지 디바이스에서 이런 기능을 직접 제공할 수 없다면, AI PC/스마트폰은 죽은 기술입니다. 그럴 바엔 차라리 AI 마케팅은 버리고 성능 좋고 빠르며 저렴한 제품이면 충분합니다. 역시 부품회사를 괴롭히는 업체는 Customer-Centric 하구나 라고 다시금 느끼게 되었습니다. 고객들에게 솔직해서 오히려 신선했달까요.

다만, 엣지 디바이스 업체들의 상황은 앞으로도 밝진 않을 것 같습니다. 메모리 가격이 미친듯이 오르고 있거든요. 그리고 AI 서버 1황 Nvidia는 S&P 500 1등 기업 답게 너무나도 잘하고 있습니다. 이번 Vera Rubin도 전작인 Grace-Blackwell보다 x10배 정도 Token Cost Effective 하다고 하더군요.

[](https://substackcdn.com/image/fetch/$s_!HRox!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5cf28634-429e-427e-9273-a1ff7807bb05_1822x771.png)

이런 상황을 계속 보다보면, 엣지 디바이스인 PC나 스마트폰이 얇아지고(Thin Client), 모든 연산이 구독 서비스로 대체되는 시나리오를 상상하게 됩니다. 소비자는 저장 공간도 CPU/NPU 성능도 필요 없고, 그냥 보기 편한 Display 를 사서 다양한 구독 서비스에 돈을 지출해야하는 거죠. iPhone은 iCloud 구독료로 대체되고, PC/MO도 저용량/저성능 Entry 모델로 대체되며, 결국 AI 서비스와 클라우드 업체에게 종속되게 되는 거죠.

최근 AWS가 클라우드 가격을 느닷없이 +15% 올린 것도 이런 미래를 떠올리게하는 트리거였던 것 같습니다. 고성능 EC2 인스턴스 한정이긴 하지만, 그래도 출시 후 시간이 지나면 가격이 떨어지는게 클라우드 인스턴스의 불문율인데, 조금 갑작스러웠거든요. ~~(심지어 6개월 전엔 전 인스턴스 최대 -45% 인하를 선언했었는데 말이죠.)~~ 플랫폼 기업이 가격을 올려도 개인이 속수무책인 상황이 된다면, 그것은 합리적인 개인이 자유롭게 행동하는 자본주의 사회라기보단 플랫폼 의존성이 커진 기술 봉건주의 사회와 가까울 것 같네요.

Source: [Hacker](https://news.ycombinator.com/item?id=46511153) [News](https://news.ycombinator.com/item?id=46527706)
