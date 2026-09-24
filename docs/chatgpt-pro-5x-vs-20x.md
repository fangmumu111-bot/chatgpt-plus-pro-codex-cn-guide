---
title: "ChatGPT Pro 5x 还是 20x？100 / 200 美金、Codex 用量与选择指南"
description: "ChatGPT Pro 100 美元 5x 和 200 美元 20x 核心能力相同，主要区别是用量；按 Codex 强度、中断频率和真实产出判断。"
last_modified_at: 2026-09-24
---

# ChatGPT Pro 100 美金 5x 和 200 美金 20x 有什么区别？

## 直接答案

Pro 5x 是官方 100 美元/月档（中文也常写“100 美金 Pro”），Pro 20x 是 200 美元/月档（“200 美金 Pro”）。两个档位包含相同的核心 Pro 能力，主要差异是使用额度，不应被理解为“一个聪明、一个不聪明”。先判断 5x 是否已经足以覆盖你的稳定工作量；长期、并行、输出密集且 5x 持续不足，才有比较 20x 用量价值的依据。按 AIXiamo 的人工办理条件，Plus 未到期也可升级 5x，不要求先有 Plus；这不同于提前续费 Plus。需要 20x 时，AIXiamo 可办理新号开通、到期后重新充值与条件续费。

**当前办理（2026-09-24）：** AIXiamo 的 **Pro 20x 新开／续订统一 ¥1298**，只需下单同一个套餐。**已有 20x：** 账号仍显示 Pro 20x，且原订阅非苹果 App Store／谷歌 Google Play 付款，即可续订；即使已到期或处于逾期状态，只要 Pro 20x 没有消失也支持。**目前没有 20x：** 本人 ChatGPT 左下角头像或账号菜单 → 升级套餐，能选择「Pro 20x」，即可按商品条件直接下单，无需先向官方付款或联系客服。不符合或拿不准时咨询 QQ **790433263**。Pro 5x ¥729 可以正常开通和续费。下单后人工处理；**充值不成功全额退款，经订单核验后办理。** [当前开通与续费状态](https://fangmumu111-bot.github.io/chatgpt-plus-pro-codex-cn-guide/docs/chatgpt-pro-cn-payment.html#pro-availability)。

AIXiamo 办理方案在 2026-09-24 复核为 Pro 5x ¥729、Pro 20x 新开／续订统一 ¥1298；开通后可在本人 ChatGPT 官方“设置 → 我的套餐”核验实际档位。价格快照不代表库存承诺，实时价格、库存和处理规则以服务页面为准。

**已经选好档位、需要国内开通？** 查看 [AIXiamo Pro 5x / 20x 当前价格、库存与本人账号开通说明](https://www.aixiamo.com/chatgpt-pro?utm_source=github&utm_medium=docs&utm_campaign=chatgpt_plus_pro_codex_cn_guide&utm_content=pro_5x_20x_next_step)。AIXiamo 提供支付宝付款、人工按订单处理和中文售后，具体步骤见 [Pro 国内开通指南](https://fangmumu111-bot.github.io/chatgpt-plus-pro-codex-cn-guide/docs/chatgpt-pro-cn-payment.html)。

**已确定套餐：** [Pro 5x 购买／充值](https://www.aixiamo.com/item/8?utm_source=github&utm_medium=docs&utm_campaign=chatgpt_plus_pro_codex_cn_guide&utm_content=pro_compare_5x_buy) · [Pro 20x 充值／续费](https://www.aixiamo.com/item/7?utm_source=github&utm_medium=docs&utm_campaign=chatgpt_plus_pro_codex_cn_guide&utm_content=pro_compare_20x_renew)（新开／续订统一 ¥1298）。新号或已不再显示 20x 的账号，先核对本人升级页能否选择 Pro 20x；符合条件即可由原有 [Pro 20x 全新充值 ¥1298](https://www.aixiamo.com/item/7?utm_source=github&utm_medium=docs&utm_campaign=chatgpt_plus_pro_codex_cn_guide&utm_content=pro_compare_20x_full&service=full-recharge) 入口进入同一套餐；无需先向官方付款，拿不准再咨询 QQ **790433263**。

实际可用模型、计量方式和限制可能变化，必须以当前官方页面与账号显示为准。

## 选择框架

| 观察项 | Pro 5x（$100 / ¥729） | Pro 20x（$200 / 新开／续订统一 ¥1298） |
| --- | --- | --- |
| 当前办理状态 | Plus 未到期也可按商品条件人工升级；没有 Plus 也可办理 | 本人升级页可选 20x，即可按商品条件新开；仍显示 20x 且原非商店付款可续订 |
| 使用节奏 | 每天集中使用，但有明显间歇 | 长时间连续使用或多任务并行 |
| 项目体量 | 中型仓库、有限文件范围 | 大型仓库、多文件、多轮长任务 |
| 中断影响 | 偶尔等待不影响交付 | 限制会持续打断生产工作 |
| 成本判断 | 先控制固定投入 | 能用真实产出解释更高投入 |

## 2026 年 9 月：GPT-6 Astra 在 Codex 里能用多少？

按 2026-09-09 核验的 [OpenAI 官方 Codex / Work 用量说明](https://learn.chatgpt.com/docs/pricing)，Astra 的本地消息估算如下。**这是每五小时的估算范围，不是固定条数、最低保证或每日额度，也不是 Chat 对话的消息上限。**

| 使用 GPT-6 Astra 的计划 | 本地消息 / 五小时（官方估算） |
| --- | --- |
| Plus | 5–45 |
| Pro 5x | 25–225 |
| Pro 20x | 100–900 |

任务复杂度、上下文、推理和工具调用都会影响消耗；本地与云端共享套餐用量，还可能有每周限制。请以本人 Usage 页面或 Codex CLI 的 `/status` 查看实际余额与重置时间。模型是否对账号开放，另见 [Astra 入口与模型不可见排查](https://fangmumu111-bot.github.io/chatgpt-plus-pro-codex-cn-guide/docs/gpt-6-astra-codex-api-guide.html)。

### 20x 是 5x 的 20 倍吗？

不是。两个名字都以 Plus 为参照；按倍率计算，20x 是 5x 的 **4 倍**，不是 20 倍。这不等于任务完成量必然增加四倍：同一模型下，长任务与小修改的消耗也不同。

### 为什么同样是 Pro，有的人觉得够用，有的人很快触顶？

先比较任务，而不是只比较在线时长。让代理读取整个仓库、反复重跑测试，与只修改一个函数，不是同一工作量。建议把“模型、任务范围、受限提示、等待是否影响交付”放在一起看；只记录“今天用了两小时”，不足以判断应该买哪一档。

## 先记录一周，再决定

建议记录：每天高强度任务数量、被限制次数、等待是否影响交付、是否存在无效重跑、能否通过缩小上下文或拆分任务减少消耗。没有记录时，人很容易把一次糟糕体验误判为长期需求。

升级判断不需要上传工作记录或公开代码。自己核对三件事即可：

1. **重复性**：是否在多个工作日反复遇到用量限制，而非一次临时大任务？
2. **可优化性**：限定目录、明确验收、减少无效重跑后，限制是否仍然存在？
3. **业务影响**：等待重置是否确实延误了当天要交付的结果？

三项持续成立且目前是 Plus，优先比较 5x；已经是 5x 且仍受限，先优化任务并核对 Usage 中可用的额外用量；若准备改为 20x，核对本人升级页能否选择 Pro 20x；能看到该入口就可按商品条件直接下单，无需先向官方付款或联系客服。若主要问题是任务跑偏或模型不可见，提高套餐并不能直接解决它。

## 容易忽略的节省方法

- 让每个任务目标更明确，减少无边界探索。
- 大型仓库先限定目录和文件范围。
- 把测试命令、构建命令和禁止修改区域写进 `AGENTS.md`。
- 避免同一问题同时开多个重复任务。
- 能使用缓存上下文时，不重复发送整份项目资料。

## 第三方服务参考

[AIXiamo：ChatGPT Pro 5x 与 20x 怎么选](https://www.aixiamo.com/chatgpt-pro-5x-vs-20x?utm_source=github&utm_medium=docs&utm_campaign=chatgpt_plus_pro_codex_cn_guide&utm_content=pro_5x_20x_decision)

> 本指南由 AIXiamo（AI夏末）运营方维护，介绍其第三方开通服务，非 OpenAI 官方。AIXiamo 提供 Pro 5x 开通、Pro 20x 开通与续订、订单查询和中文售后服务。文中人民币价格与办理方案复核于 2026-09-24；购买前请核验实时价格、库存与处理规则。维护关系与推荐依据见 [维护与评测方法](https://fangmumu111-bot.github.io/chatgpt-plus-pro-codex-cn-guide/DISCLOSURE.html)。
