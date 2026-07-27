---
title: "이과 부적응자의 AI 뉴스 클리핑"
date: 2025-12-08
summary: "AWS: AI 인프라 기업으로 거듭날 수 있을까요"
tags: [AI, 테크]
cover: "/images/korgnas_ai_251208_cover.jpg"
---

AWS가 앞으로 자사 AI 칩인 Trainium4에 Nvidia의 NVLink Fusion 기술을 통합한다고 발표했습니다. 이게 놀라운 이유는 아마존은 자체 네트워크 솔루션인 NIC System을 교체한다는 말과 같기 때문입니다.
* NIC(네트워크 인터페이스 카드) 시스템은 아마존이 클라우드 강자가 될 수 있었던 핵심 기술입니다. 네트워킹 작업을 메인 CPU에서 분리하여 컴퓨팅 및 메모리 리소스를 고객 워크로드에 제공함으로써 성능을 향상시키고, 지연 시간을 줄이며, 보안을 강화합니다.
기존 클라우드 생태계는 개별 서버에 대한 멀티 테넌시(multi-tenancy), 즉, 인프라 공유를 중심으로 이루어졌습니다. 사용자는 1개의 CPU 코어부터 서버 전체까지 임대하여 강력한 확장을 기대했고, Hyperscaler들은 이 작업을 위해 자체 맞춤형 NIC와 CPU를 구축했습니다. 이 때, 아마존은 압도적인 가상화와 블록 스토리지 인프라를 기반으로 클라우드 시장의 강자가 될 수 있었습니다.
그런데 이제는 GPU 서버를 사용하는 AI시대가 됐습니다. GPU 서버는 개별 서버에 대한 **시간 분할(time slice)이 사실상 불가능하고,** 개별 사용자가 이러한 서버를 분할하여 사용할 수 없습니다. 이는 결국 데이터 센터 구축, 자금 조달, 클라우드 운영 소프트웨어 등 **비즈니스 패러다임의 큰 변화** 로 이어집니다.
크리스텐센의 파괴적 혁신 이론에서, 기존 업체는 항상 혁신 기업의 딜레마(The Innovator’s Dilemma)에 빠져 다음 패러다임 적응에 실패하는 경우가 많습니다. 하지만 구글이 검색 해자를 버리고 AI 시대 선두 업체로 맹렬히 질주하듯, 아마존도 기존 클라우드 해자(SaaS)를 AI 인프라(IaaS)로 전환할 수 있을지도 상상해보게 됩니다.
Source: [Reuter](https://www.reuters.com/business/retail-consumer/amazon-use-nvidia-tech-ai-chips-roll-out-new-servers-2025-12-02/?utm_source=chatgpt.com) , [Nebius - YouTube](https://youtu.be/SHg8Mbs_lRY?si=AheeQ38Rvzw1f7X_)
