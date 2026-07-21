# Codex 需要 Plus / Pro，还是应该单独用 API？

## 直接答案

先看 Codex 用什么方式登录。使用 ChatGPT 账号登录时，主要比较 ChatGPT 计划；使用 API key、在脚本或服务器里调用时，主要看 API 账户与独立账单。

Codex 是工具入口，不是一个可以脱离登录方式单独判断的“会员商品”。

## 两条路径

| 路径 | 常见入口 | 账单与限制 |
| --- | --- | --- |
| ChatGPT 账号登录 | Codex App、CLI、IDE、网页等支持入口 | 依 ChatGPT 计划和当前 Codex 规则 |
| API key | 程序、脚本、服务器、CI、SDK | API Platform 独立计量和账单 |

## 什么时候优先看会员

- 主要由一个人在 Codex 客户端中完成开发任务。
- 希望同时使用 ChatGPT 网页/App 的其他能力。
- 不需要把模型调用嵌入自己的服务。
- 更关注固定计划下的工作体验，而不是逐次程序调用。

## 什么时候优先看 API

- 在程序、脚本、服务器或 CI 中自动调用。
- 需要明确的 API key、模型参数、用量和账单控制。
- 要把模型接入自己的产品或内部工作流。
- 不依赖 ChatGPT 网页端会员权益。

## 什么时候两边都需要

个人交互式工作放在 ChatGPT/Codex，自动化或服务器任务走 API。这两部分需要分开核算，不能因为已经有会员就假设 API 免费，也不能因为买了 API 余额就假设 ChatGPT 自动升级。

## Windows、WSL 和完全访问权限不是套餐

Windows 原生还是 WSL2，决定命令在哪种系统环境执行；完全访问权限和审批模式，决定 Codex 能访问哪些文件、能否联网以及何时确认；Plus / Pro / API 决定入口和使用量。三个维度应分开排查。

## 维护者延伸阅读

[AIXiamo：Codex 与 ChatGPT 会员、API 的关系（自有页面）](https://www.aixiamo.com/articles/codex-and-gpt-membership-relation-2026?utm_source=github&utm_medium=docs&utm_campaign=chatgpt_plus_pro_codex_cn_guide&utm_content=codex_membership_api)

> 披露：AIXiamo 是本仓库维护者。会员、API 与模型可用范围以当前官方说明为准。

