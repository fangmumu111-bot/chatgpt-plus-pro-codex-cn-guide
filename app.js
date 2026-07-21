(() => {
  "use strict";

  const CONTENT_VERSION = "2026-07-21";
  const STORAGE_KEY = "aixiamo-ai-choice-map-v1";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const QUESTIONS = {
    entry: {
      id: "entry",
      prompt: "你主要在哪里使用？",
      options: [
        { id: "chatgpt", label: "ChatGPT 网页或 App" },
        { id: "codex_chatgpt", label: "Codex，用 ChatGPT 账号登录" },
        { id: "api", label: "程序、脚本、服务器或 API key" },
        { id: "both", label: "网页端和程序调用都需要" },
        { id: "unsure", label: "我不确定" }
      ]
    },
    scope: {
      id: "scope",
      prompt: "主要由谁使用？",
      options: [
        { id: "single", label: "我自己使用" },
        { id: "team", label: "多人或团队使用" }
      ]
    },
    limits: {
      id: "limits",
      prompt: "当前计划对工作有什么影响？",
      options: [
        { id: "enough", label: "基本满足，没有明显中断" },
        { id: "occasional", label: "偶尔遇到限制，但不影响交付" },
        { id: "persistent", label: "经常中断，已经影响真实工作" },
        { id: "unclear", label: "不确定是不是额度问题" }
      ]
    },
    intensity: {
      id: "intensity",
      prompt: "持续受限时，你主要做什么？",
      options: [
        { id: "regular", label: "聊天、写作、学习或中等任务" },
        { id: "heavy", label: "高频多文件、长任务或深度研究" }
      ]
    }
  };

  const REPO_BASE = "https://github.com/fangmumu111-bot/chatgpt-plus-pro-codex-cn-guide/blob/main";

  const RESULTS = {
    keep: {
      title: "先保持当前计划",
      summary: "你的当前入口和计划基本满足需求。升级不会自动改善提示词、客户端、环境或工作流。",
      reasons: ["没有持续影响真实工作的限制", "当前需求尚未形成稳定的更高用量"],
      changes: ["限制开始高频出现", "长任务或多文件工作持续被打断"],
      verify: ["记录一周使用和中断", "确认当前登录账号与模型"],
      links: [
        { label: "查看 Plus / Pro 判断依据", url: `${REPO_BASE}/docs/chatgpt-plus-vs-pro.md`, external: false }
      ]
    },
    observe: {
      title: "先观察，不急于升级",
      summary: "目前更像偶发峰值。先记录一周真实使用，再判断额外用量是否能换来稳定产出。",
      reasons: ["限制没有持续影响交付", "一次高峰不足以代表长期需求"],
      changes: ["等待反复打断交付", "优化任务范围后仍持续不足"],
      verify: ["记录受限频率和重置时间", "减少重复任务与无边界上下文"],
      links: [
        { label: "查看 Codex 额度排查", url: `${REPO_BASE}/docs/codex-quota-usage.md`, external: false }
      ]
    },
    plus_first: {
      title: "优先比较 Plus",
      summary: "你的主要入口是 ChatGPT 或 ChatGPT 账号登录的 Codex，工作强度尚未证明需要最高用量档。",
      reasons: ["主要需求发生在 ChatGPT 账号内", "先从能覆盖主要任务的路径开始更容易评估"],
      changes: ["高频多文件或长任务持续中断", "用量记录显示当前档位长期不足"],
      verify: ["当前官方账号显示的计划与模型", "实时付款方式、订单查询和售后边界"],
      links: [
        { label: "查看 Plus / Pro 完整对照", url: `${REPO_BASE}/docs/chatgpt-plus-vs-pro.md`, external: false },
        {
          label: "打开 AIXiamo 中文延伸说明",
          url: "https://www.aixiamo.com/chatgpt-plus-domestic-recharge?utm_source=github&utm_medium=pages&utm_campaign=chatgpt_plus_pro_codex_cn_guide&utm_content=plus_first_result",
          external: true
        }
      ]
    },
    pro_compare: {
      title: "认真比较 Pro",
      summary: "你是单人高频使用，而且限制已经持续影响多文件、长任务或深度研究。此时更高用量才有明确判断依据。",
      reasons: ["限制持续影响真实工作", "任务强度高，且主要由单人使用"],
      changes: ["实际问题来自客户端、权限或环境", "优化任务范围后中断明显减少"],
      verify: ["连续一周的受限次数和交付影响", "5x 与 20x 的当前官方规则和实时状态"],
      links: [
        { label: "查看 Pro 5x / 20x 对照", url: `${REPO_BASE}/docs/chatgpt-pro-5x-vs-20x.md`, external: false },
        {
          label: "打开 AIXiamo Pro 延伸说明",
          url: "https://www.aixiamo.com/chatgpt-pro-5x-vs-20x?utm_source=github&utm_medium=pages&utm_campaign=chatgpt_plus_pro_codex_cn_guide&utm_content=pro_compare_result",
          external: true
        }
      ]
    },
    api: {
      title: "走 API 路径",
      summary: "你的需求发生在程序、脚本、服务器或 API key。API Platform 与 ChatGPT 会员是独立产品和账单。",
      reasons: ["需要程序化或服务器端调用", "需要独立控制模型、用量和调用记录"],
      changes: ["同时开始高频使用 ChatGPT/Codex 界面", "需求从自动化转为个人交互工作"],
      verify: ["API 账户的当前计费和模型范围", "密钥管理、预算与调用日志"],
      links: [
        { label: "查看会员与 API 的区别", url: `${REPO_BASE}/docs/codex-membership-vs-api.md`, external: false }
      ]
    },
    hybrid: {
      title: "会员与 API 分开评估",
      summary: "网页端个人工作与程序化调用同时存在。两套入口、用量和账单应分别核算。",
      reasons: ["ChatGPT/Codex 界面和程序调用都有真实需求", "任意一边都不能自动覆盖另一边"],
      changes: ["其中一条路径停止使用", "团队协作需要改看组织方案"],
      verify: ["哪些任务放在交互界面", "哪些任务由脚本或服务器执行"],
      links: [
        { label: "查看 Codex 会员与 API 地图", url: `${REPO_BASE}/docs/codex-membership-vs-api.md`, external: false },
        {
          label: "打开 AIXiamo Codex 延伸说明",
          url: "https://www.aixiamo.com/articles/codex-and-gpt-membership-relation-2026?utm_source=github&utm_medium=pages&utm_campaign=chatgpt_plus_pro_codex_cn_guide&utm_content=hybrid_result",
          external: true
        }
      ]
    },
    diagnose: {
      title: "先排查，再购买",
      summary: "目前还不能确认问题来自计划或额度。先查登录方式、客户端、模型、权限和账单，避免重复付款。",
      reasons: ["使用入口或问题来源不明确", "错误升级可能无法解决实际问题"],
      changes: ["确认使用 ChatGPT 账号登录且持续受限", "确认需要 API key 和程序化调用"],
      verify: ["当前登录账号与登录方式", "客户端版本、模型、权限、账单和订单状态"],
      links: [
        { label: "查看 Codex 额度排查", url: `${REPO_BASE}/docs/codex-quota-usage.md`, external: false },
        {
          label: "打开 AIXiamo 中文排查说明",
          url: "https://www.aixiamo.com/articles/codex-quota-not-enough-plus-pro-api-2026?utm_source=github&utm_medium=pages&utm_campaign=chatgpt_plus_pro_codex_cn_guide&utm_content=diagnose_result",
          external: true
        }
      ]
    },
    organization: {
      title: "先查看组织方案",
      summary: "多人或团队使用不应套用个人 Plus / Pro 的共享思路。先核对组织计划、权限、数据和席位管理。",
      reasons: ["使用范围已经超过单人", "个人计划不等于多人共享席位"],
      changes: ["确认只有一个人使用", "团队需求缩小为独立个人任务"],
      verify: ["席位、权限和管理员需求", "数据控制、审计与账单归属"],
      links: [
        { label: "查看官方来源清单", url: `${REPO_BASE}/SOURCES.md`, external: false }
      ]
    }
  };

  const state = {
    schemaVersion: 1,
    contentVersion: CONTENT_VERSION,
    index: 0,
    answers: {},
    resultId: null
  };

  const form = document.querySelector("#decision-form");
  const questionSlot = document.querySelector("#question-slot");
  const prevButton = document.querySelector("#prev-button");
  const nextButton = document.querySelector("#next-button");
  const errorNode = document.querySelector("#tool-error");
  const progressText = document.querySelector("#progress-text");
  const progressBar = document.querySelector("#progress-bar");
  const resultPanel = document.querySelector("#result-panel");
  const resultTitle = document.querySelector("#result-title");
  const resultSummary = document.querySelector("#result-summary");
  const resultGroups = document.querySelector("#result-groups");
  const resultLinks = document.querySelector("#result-links");
  const resultLive = document.querySelector("#result-live");
  const resetButton = document.querySelector("#reset-button");

  function questionSequence() {
    const sequence = ["entry"];
    const { entry, scope, limits } = state.answers;

    if (!entry || entry === "unsure") return sequence;
    sequence.push("scope");
    if (!scope || scope === "team") return sequence;
    if (entry === "api" || entry === "both") return sequence;
    sequence.push("limits");
    if (limits === "persistent") sequence.push("intensity");
    return sequence;
  }

  function currentQuestionId() {
    const sequence = questionSequence();
    state.index = Math.min(state.index, sequence.length - 1);
    return sequence[state.index];
  }

  function isLastQuestion() {
    return state.index === questionSequence().length - 1;
  }

  function saveState() {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          schemaVersion: state.schemaVersion,
          contentVersion: state.contentVersion,
          index: state.index,
          answers: state.answers
        })
      );
    } catch {
      // The tool remains fully functional when storage is unavailable.
    }
  }

  function restoreState() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
      if (
        saved &&
        saved.schemaVersion === state.schemaVersion &&
        saved.contentVersion === CONTENT_VERSION &&
        saved.answers &&
        typeof saved.answers === "object"
      ) {
        state.answers = saved.answers;
        state.index = Number.isInteger(saved.index) ? Math.max(0, saved.index) : 0;
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }

  function clearDownstream(questionId) {
    const order = ["entry", "scope", "limits", "intensity"];
    const start = order.indexOf(questionId);
    order.slice(start + 1).forEach((id) => delete state.answers[id]);
  }

  function renderQuestion() {
    const sequence = questionSequence();
    const questionId = currentQuestionId();
    const question = QUESTIONS[questionId];
    const selected = state.answers[questionId] || "";
    const progress = (state.index + 1) / Math.max(sequence.length, 4);

    progressText.textContent = `第 ${state.index + 1} 步，预计最多 4 步`;
    progressBar.style.setProperty("--progress-scale", String(progress));
    prevButton.disabled = state.index === 0;
    nextButton.textContent = isLastQuestion() ? "生成建议" : "下一步";
    errorNode.textContent = "";

    const options = question.options
      .map(
        (option) => `
          <label class="option">
            <input type="radio" name="${question.id}" value="${option.id}" ${selected === option.id ? "checked" : ""} />
            <span class="option__label">${option.label}</span>
            <span class="option__check" aria-hidden="true">✓</span>
          </label>`
      )
      .join("");

    questionSlot.innerHTML = `
      <fieldset class="question" aria-describedby="tool-error">
        <legend>${question.prompt}</legend>
        <div class="options">${options}</div>
      </fieldset>`;

    questionSlot.querySelectorAll("input[type='radio']").forEach((input) => {
      input.addEventListener("change", () => {
        if (state.answers[questionId] !== input.value) clearDownstream(questionId);
        state.answers[questionId] = input.value;
        saveState();
        errorNode.textContent = "";
        nextButton.textContent = isLastQuestion() ? "生成建议" : "下一步";
      });
    });
  }

  function computeResult() {
    const { entry, scope, limits, intensity } = state.answers;
    if (scope === "team") return "organization";
    if (entry === "both") return "hybrid";
    if (entry === "api") return "api";
    if (entry === "unsure" || limits === "unclear") return "diagnose";
    if (limits === "enough") return "keep";
    if (limits === "occasional") return "observe";
    if (limits === "persistent" && intensity === "heavy") return "pro_compare";
    return "plus_first";
  }

  function groupMarkup(title, items) {
    return `
      <section class="result__group">
        <h3>${title}</h3>
        <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </section>`;
  }

  function showResult() {
    const resultId = computeResult();
    const result = RESULTS[resultId];
    state.resultId = resultId;

    resultTitle.textContent = result.title;
    resultSummary.textContent = result.summary;
    resultGroups.innerHTML = [
      groupMarkup("为什么得到这个结果", result.reasons),
      groupMarkup("什么情况会改变结果", result.changes),
      groupMarkup("今天先核验什么", result.verify)
    ].join("");
    resultLinks.innerHTML = result.links
      .map(
        (link) =>
          `<a class="result__link" href="${link.url}" ${link.external ? 'rel="sponsored noopener"' : 'rel="noopener"'}>${link.label} →</a>`
      )
      .join("");

    form.hidden = true;
    resultPanel.hidden = false;
    resultLive.textContent = "已生成建议";
    resultTitle.focus({ preventScroll: true });
    resultPanel.scrollIntoView({
      block: "nearest",
      behavior: prefersReducedMotion.matches ? "auto" : "smooth"
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const questionId = currentQuestionId();
    const selected = questionSlot.querySelector("input[type='radio']:checked");

    if (!selected) {
      errorNode.textContent = "请选择一个最接近的情况，再继续。";
      questionSlot.querySelector("fieldset").focus?.({ preventScroll: true });
      questionSlot.querySelector("input[type='radio']")?.focus({ preventScroll: true });
      return;
    }

    state.answers[questionId] = selected.value;
    saveState();

    if (isLastQuestion()) {
      showResult();
      return;
    }

    state.index += 1;
    renderQuestion();
    questionSlot.querySelector("legend")?.scrollIntoView({ block: "nearest" });
  });

  prevButton.addEventListener("click", () => {
    if (state.index === 0) return;
    state.index -= 1;
    saveState();
    renderQuestion();
  });

  resetButton.addEventListener("click", () => {
    state.index = 0;
    state.answers = {};
    state.resultId = null;
    sessionStorage.removeItem(STORAGE_KEY);
    resultPanel.hidden = true;
    form.hidden = false;
    renderQuestion();
    questionSlot.querySelector("legend")?.scrollIntoView({ block: "nearest" });
    questionSlot.querySelector("input[type='radio']")?.focus({ preventScroll: true });
  });

  const commandItems = [
    { label: "开始 4 步判断", meta: "工具", url: "#decision-tool", terms: "选择 判断 会员" },
    { label: "Plus 与 Pro 快速对照", meta: "页面", url: "#quick-map", terms: "plus pro 选择" },
    { label: "国内怎么开通 ChatGPT Plus", meta: "指南", url: `${REPO_BASE}/docs/chatgpt-plus-cn-payment.md`, terms: "国内 充值 支付 没有海外卡" },
    { label: "ChatGPT Plus 和 Pro 怎么选", meta: "指南", url: `${REPO_BASE}/docs/chatgpt-plus-vs-pro.md`, terms: "会员 套餐" },
    { label: "ChatGPT Pro 5x 与 20x", meta: "指南", url: `${REPO_BASE}/docs/chatgpt-pro-5x-vs-20x.md`, terms: "pro 额度" },
    { label: "Codex 会员与 API 的关系", meta: "指南", url: `${REPO_BASE}/docs/codex-membership-vs-api.md`, terms: "codex api key plus pro" },
    { label: "Codex 额度不足怎么排查", meta: "指南", url: `${REPO_BASE}/docs/codex-quota-usage.md`, terms: "限额 用完 不够" },
    { label: "官方事实与核对日期", meta: "来源", url: `${REPO_BASE}/SOURCES.md`, terms: "openai 官方 来源" },
    { label: "维护与商业关系披露", meta: "披露", url: `${REPO_BASE}/DISCLOSURE.md`, terms: "aixiamo utm 商业" }
  ];

  const searchTrigger = document.querySelector("#search-trigger");
  const commandDialog = document.querySelector("#command-dialog");
  const commandInput = document.querySelector("#command-input");
  const commandResults = document.querySelector("#command-results");
  const commandLive = document.querySelector("#command-live");
  let filteredItems = [...commandItems];
  let activeCommandIndex = 0;
  let commandOpener = searchTrigger;

  function renderCommands() {
    if (!filteredItems.length) {
      commandResults.innerHTML = '<p class="command__empty">没有匹配结果。试试“Plus”“Codex”或“API”。</p>';
      commandLive.textContent = "没有匹配结果";
      commandInput.removeAttribute("aria-activedescendant");
      return;
    }

    activeCommandIndex = Math.min(activeCommandIndex, filteredItems.length - 1);
    commandResults.innerHTML = filteredItems
      .map(
        (item, index) => `
          <button
            class="command__item"
            id="command-item-${index}"
            type="button"
            role="option"
            aria-selected="${index === activeCommandIndex}"
            data-command-index="${index}"
          >
            <span>${item.label}</span>
            <span>${item.meta}</span>
          </button>`
      )
      .join("");

    commandInput.setAttribute("aria-activedescendant", `command-item-${activeCommandIndex}`);
    commandLive.textContent = `${filteredItems.length} 个结果`;

    commandResults.querySelectorAll(".command__item").forEach((button) => {
      button.addEventListener("mouseenter", () => {
        const nextIndex = Number(button.dataset.commandIndex);
        if (nextIndex === activeCommandIndex) return;
        activeCommandIndex = nextIndex;
        commandResults.querySelectorAll(".command__item").forEach((item, index) => {
          item.setAttribute("aria-selected", String(index === activeCommandIndex));
        });
        commandInput.setAttribute("aria-activedescendant", `command-item-${activeCommandIndex}`);
      });
      button.addEventListener("click", () => openCommand(activeCommandIndex));
    });
  }

  function openPalette(opener = searchTrigger) {
    commandOpener = opener;
    filteredItems = [...commandItems];
    activeCommandIndex = 0;
    commandInput.value = "";
    renderCommands();
    document.body.classList.add("dialog-open");
    document.querySelector("main").inert = true;
    document.querySelector("header").inert = true;
    document.querySelector("footer").inert = true;
    commandDialog.showModal();
    searchTrigger.setAttribute("aria-expanded", "true");
    commandInput.focus();
  }

  function closePalette() {
    if (!commandDialog.open) return;
    commandDialog.close();
  }

  function openCommand(index) {
    const item = filteredItems[index];
    if (!item) return;
    closePalette();
    window.location.href = item.url;
  }

  searchTrigger.addEventListener("click", () => openPalette(searchTrigger));

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (commandDialog.open) closePalette();
      else openPalette(document.activeElement);
    }
  });

  commandInput.addEventListener("input", () => {
    const query = commandInput.value.trim().toLocaleLowerCase("zh-CN");
    filteredItems = commandItems.filter((item) =>
      `${item.label} ${item.meta} ${item.terms}`.toLocaleLowerCase("zh-CN").includes(query)
    );
    activeCommandIndex = 0;
    renderCommands();
  });

  commandInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
      return;
    }
    if (!filteredItems.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeCommandIndex = (activeCommandIndex + 1) % filteredItems.length;
      renderCommands();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeCommandIndex = (activeCommandIndex - 1 + filteredItems.length) % filteredItems.length;
      renderCommands();
    } else if (event.key === "Enter") {
      event.preventDefault();
      openCommand(activeCommandIndex);
    }
  });

  commandDialog.addEventListener("click", (event) => {
    if (event.target === commandDialog) closePalette();
  });

  commandDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closePalette();
  });

  commandDialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    document.querySelector("main").inert = false;
    document.querySelector("header").inert = false;
    document.querySelector("footer").inert = false;
    searchTrigger.setAttribute("aria-expanded", "false");
    commandOpener?.focus?.({ preventScroll: true });
  });

  restoreState();
  renderQuestion();
})();
