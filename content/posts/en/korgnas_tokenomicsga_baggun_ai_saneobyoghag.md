---
title: "Tokenomics Reshaping AI Industry Dynamics"
date: 2025-12-26
summary: "Google(TPU) Leads for Now, but Nvidia(GPU) Will Catch Up"
tags: [AI, Tech]
cover: "/images/korgnas_tokenomicsga_baggun_ai_saneobyoghag_cover.jpg"
---

Great companies of the internet era, like Netflix, Amazon, Meta, and Google, dominated the market by building powerful flywheels 1: good products leading to user acquisition, generating data, and then improving products. So, how can companies dominate the market in the AI era?

During the foundation model competition in 2023 and 2024, companies rushed to pre-train and deploy models as large as possible, trying to outdo their competitors. However, the moment the next model came out, the previous one became pretty useless. That's because there was no way to give feedback to the models. Despite this, Big Tech companies were caught in a prisoner's dilemma, forced to continuously develop LLMs. ~~(At the time, many said LLMs were the most expensive depreciating assets in the world.)~~

Then, the method of inference emerged, and from this point, the AI industry dynamics began to shift with Tokenomics. This is because if people consistently show positive or negative reactions to specific answers (Tokens), this can be reflected in the model and used for improvement. ~~(This is called Reinforcement Learning from Verified Rewards, or RLVR.)~~ Now, the number of Frontier Model research labs has narrowed down to about four—OpenAI, Anthropic, xAI, and Gemini 2. You might think that if they just utilize inference well and spin the flywheel, they'll quickly get ahead, but it's still a difficult task.

Because AI models have already become very large with LLMs, improving them requires running GPU clusters from 1K to 100K units, which leads to increased experimentation costs. You might think that companies experienced with cloud computing would handle this well, but surprisingly, cloud is an area of cost optimization, and maintaining performance and high utilization is another domain entirely. If the token costs required for training and inference continue to rise like this, Frontier Model research labs will have no choice but to rely on companies that can lower these costs.

Here, the leadership in AI Tokenomics shifts from S/W companies that create LLMs to H/W companies that create accelerators. Currently, it seems only Nvidia and Google can lower the cost per token. Google even has its own Frontier Model, Gemini 3, and several services with strong customer lock-in effects (Search, YouTube, Mail). While other Frontier Model research labs hesitated due to delays in Nvidia's Hopper to Blackwell transition, Google gained a temporary advantage by training its Frontier Model Gemini on the latest TPU v6/v7. ~~(If you try it, the image conversion and basic performance are really good.)~~

Nvidia's GPUs are transitioning from Hopper to Blackwell across generations. In fact, this transition process required quite a few changes. The cooling method changed from air cooling to liquid cooling, the rack weight alone increased from 1K to 3K pounds, and power consumption increased from 30kW to 130kW. To draw a comparison, it's like doing a full home renovation just to buy a new iPhone (like redoing the system air conditioning, flooring, and electrical). It seems that once the transition to Blackwell and the next-generation Rubin-based GPU Cluster is complete, Nvidia will likely reclaim its position as the lowest-cost producer per token.

Nvidia and Google will continue to go back and forth like this, but I think it will be a tougher competition for Google. This is because Google doesn't directly manage TSMC like Nvidia or Apple; it only handles the design (ASIC) and delegates manufacturing management (Back End) to Broadcom.

Broadcom's Gross Margin is about 50%, which essentially means Google is providing this margin to Broadcom. This creates a handicap compared to Nvidia, which operates its supply chain with vertical integration ~~(Nvidia vertically integrates its supply chain, putting immense pressure on component companies to squeeze out margins.)~~

Furthermore, as long as power constraints continue, Watt-per-token efficiency will be overwhelmingly more important than price for computing infrastructure. In this scenario, the highest-performing products, regardless of price, are likely to dominate the market and hold pricing power. Nvidia releases new GPUs annually. It will be interesting to see if the Google/Broadcom alliance can maintain competitiveness without friction and accelerate their development cycle. ~~(I don't think competing with Nvidia in production will be easy.)~~

[GPUs, TPUs, & The Economics of AI Explained | Gavin Baker Interview](https://www.youtube.com/watch?v=cmUo4841KQw)

---

[^1]: Flywheel refers to a heavy rotating wheel in machinery. It takes a lot of force to start spinning, but once it's moving, inertia keeps it going with minimal effort. In business, it describes a structure where customers, products, costs, and scale reinforce each other, accelerating growth over time. Amazon's online retail is a well-known example.

![Flywheel explanation image](/images/korgnas_korgnas_tokenomicsga_baggun_ai_saneobyoghag_img1.jpg)

[^2]: OpenAI 1.35T Tokens, Google 8~900B Tokens, Anthropic 700B
