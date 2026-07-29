---
title: "The Messy World of LLMs and Openclaw"
date: 2026-02-04
summary: "The Misalignment Problem and the World of AI Agents"
tags: [AI, Tech]
---


There's a thought experiment called 'paperclip maximization.' This scenario imagines what would happen if you gave an AI a simple goal: "Maximize paperclips." Even with such a straightforward objective, the AI would eventually start eliminating all obstacles. It wouldn't just use all of Earth's resources to build paperclip factories; it might even expand into space.

That's why, when using AI, it often feels like I'd be better off doing it myself. If an AI's goals aren't aligned with human values, it can lead to extreme or incorrect outcomes. Even if you get a good result by chance, it's not reproducible. This is a limitation of LLM-based AI, which is a dynamic system. It's like a continuous random draw, you could say.

So, if we increase LLM parameters and do more inference, will this problem improve? According to Anthropic's experiments, it doesn't seem so.

![](/images/korgnas_korgnas_llm_openclaw_img1.png)

They say that for larger and newer models, the ability to consistently achieve a goal improves relatively slowly. (Though their ability to accurately understand the goal was much superior.) Furthermore, as the inference process gets longer and the problem becomes more difficult, the gap between "knowing what to do" and "actually doing it every time" widens. If that's the case, no matter how clearly it understands its task, it'll eventually lead to building a paperclip factory.

That's probably why Openclaw (formerly Maltbot) is so hot these days. I tried it out of pure curiosity, and it's truly something special. It handles small tasks like organizing folders or photos, and even creating card news, all on its own. I expected it to be a disappointment, but the user experience is overwhelmingly improved, even for a non-developer like me. (You just have to think of the token usage cost as an admission fee.) Mac Minis, which are great for running local LLMs, are already experiencing shortages in Silicon Valley. Yesterday, the stock prices of legacy software companies (Adobe, Salesforce) plummeted by about 7%, and it seems the market is now reflecting a paradigm shift from pre-recorded programs to autonomous AI agents. It's truly a world that's hard to keep up with.

![](/images/korgnas_korgnas_llm_openclaw_img2.jpg)

Source: [Anthropic](https://alignment.anthropic.com/2026/hot-mess-of-ai/#:~:text=An%20incoherence%20of%200%20means,becoming%20more%20or%20less%20coherent)
