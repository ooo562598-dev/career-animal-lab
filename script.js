const cats = {
  orange: {
    name: "橘猫热烈派", emoji: "🐈", mood: "MOOD: 热闹发动机", color: "#ff9d42",
    subtitle: "能量条常驻 85%，快乐要大声说出来。",
    description: "你像一只踩着饭点准时出现的橘猫：哪里有香气、笑声和新鲜事，哪里就有你。你把生活过得有点嘈杂，但这份热烈也会把周围人的电量一起充满。",
    tips: ["给自己留一段‘不营业’时间，快乐也需要后台加载。", "发现一家好吃的店？大胆发群里，你的分享欲值得被接住。"]
  },
  ragdoll: {
    name: "布偶猫松弛派", emoji: "🐱", mood: "MOOD: 软着陆", color: "#9bd6b1",
    subtitle: "看起来很好抱，内核其实很有主意。",
    description: "你是一只自带柔光滤镜的布偶猫。你不爱硬碰硬，更擅长用温和的方式把一团乱麻理顺。别人觉得你‘随和’，但熟悉的人知道：你只是把边界藏在了温柔里。",
    tips: ["下次想拒绝时，先把‘没关系’换成‘这次不太行’。", "适合给周末安排一件纯粹让你开心的小事，比如窝着看一部老电影。"]
  },
  tuxedo: {
    name: "燕尾服猫酷盖", emoji: "🐈‍⬛", mood: "MOOD: 表面冷静", color: "#77c8dc",
    subtitle: "话可以不多，关键时刻绝不掉线。",
    description: "你像一只穿好小西装的燕尾服猫：初见有点‘请保持一米距离’，熟了以后却会默默把最好的那块鱼留给人。你的在意不是弹幕，是藏在行动里的置顶评论。",
    tips: ["偶尔把‘我知道’换成‘谢谢你’，效果会意外地好。", "找一个靠谱的人练习说废话，关系有时就是这么聊熟的。"]
  },
  tabby: {
    name: "狸花猫行动派", emoji: "🐅", mood: "MOOD: 主线任务中", color: "#ff6f61",
    subtitle: "脑内有地图，脚下有风，闲不太住。",
    description: "你是很会在人类世界闯关的狸花猫。你对‘怎么把事情弄成’有天生的雷达，遇到问题先上手、边做边修。偶尔显得有点急，但你的靠谱常常让人忍不住想跟着你走。",
    tips: ["把‘我来’留一半给别人，团队不是单猫拉雪橇。", "完成一件事后先庆祝五分钟，再奔向下一关也不迟。"]
  },
  siamese: {
    name: "暹罗猫脑洞派", emoji: "😺", mood: "MOOD: 脑内直播中", color: "#b69adf",
    subtitle: "灵感接收器灵敏，世界最好玩。",
    description: "你是一只眼睛亮亮的暹罗猫。你的脑袋像开着二十个标签页，能从一片云联想到旅行计划，也能把平凡日子讲成连续剧。你不是想太多，是世界在你这里有很多隐藏剧情。",
    tips: ["灵感来了先记一句，别全靠大脑暂存——它今天也很忙。", "给一个天马行空的计划设定 20 分钟试运行，可能真能孵出好玩意。"]
  }
};

const questions = [
  ["周末突然空出半天，你先干嘛？", ["出门晃晃，看看人类都在干啥", "把自己折进沙发和毯子里", "处理那件拖了三天的小事", "给朋友发：出来喝一杯？"]],
  ["朋友说‘我有件事想跟你聊’，你的第一反应？", ["已切换认真听讲模式", "先脑补十种剧情走向", "立刻问：要不要我过来？", "回一句：说，我在呢"]],
  ["你点外卖时的灵魂拷问是？", ["这家有没有没吃过的新品？", "哪家最稳、最快、不踩雷？", "我要吃那个评论区都在尖叫的", "能不能点到大家一起吃的？"]],
  ["一个群聊突然 99+，你通常？", ["从头翻到尾，不能错过梗", "先看有没有@我", "打开又关掉，晚点再说", "直接发一个表情包宣布已阅"]],
  ["做旅行攻略时，你是？", ["列路线、算时间、备 Plan B", "只确定第一站，剩下随缘走", "先收藏一百家宝藏店", "主要期待和谁一起去"]],
  ["下雨天忘带伞，你会？", ["冲！就当拍青春片", "打车，鞋子不能受这个委屈", "找最近的屋檐研究路线", "问问附近有没有人能顺路捞我"]],
  ["突然被夸奖时，你的反应？", ["表面：还好；心里：截图收藏", "马上夸回去，大家一起发光", "谢谢！具体是哪里呀？", "害羞但会记很久"]],
  ["逛超市时最容易被什么带走？", ["包装奇怪但看起来很好玩的东西", "打折的囤货大礼包", "一眼相中的小摆件", "朋友说‘这个你会喜欢’的东西"]],
  ["如果一件事临时变卦了？", ["先快速想替代方案", "没事，换个玩法也行", "我需要缓冲五分钟", "拉个人一起吐槽两句再说"]],
  ["你在朋友局里的常驻角色？", ["带头提议下一摊的人", "安静听着但句句有用的人", "负责确认大家安全回家的人", "突然抛出冷门知识的人"]],
  ["早上闹钟响了，你和它？", ["按掉，马上坐起来干活", "再见五分钟，真的最后五分钟", "起床先放首让人清醒的歌", "会检查朋友有没有也在痛苦起床"]],
  ["看到一只陌生小猫，你会？", ["蹲下观察，不能贸然打扰", "立刻：咪咪咪咪咪！", "拍照发给朋友并配十个感叹号", "研究它的花色和可能的故事"]],
  ["工作/学习卡住时，你倾向于？", ["先做最简单的一步破局", "换个任务，灵感晚点再来", "找人聊聊，越说越清楚", "默默啃到弄明白为止"]],
  ["有人临时约你，你会先看？", ["我现在的电量够不够", "去哪、吃什么、有没有新鲜感", "时间表能不能塞进去", "都有谁，会不会尴尬"]],
  ["你最常用的表情包类型？", ["小动物发疯", "面无表情但字很狠", "‘收到’‘好的’这种实用派", "搞怪截图和抽象梗"]],
  ["得到一笔意外小钱，你会？", ["请朋友吃点好的", "买一直舍不得买的快乐小物", "存起来，安全感+1", "用来试试一个新体验"]],
  ["排队排很久时，你会？", ["观察周围人，给自己找乐子", "确认值得就耐心等", "去问工作人员大概还要多久", "找人聊天，时间会快点"]],
  ["你的桌面/房间更像？", ["有点乱但我知道东西在哪", "整齐分区，看着就舒服", "有一堆收藏和灵感碎片", "舒服就好，常有人来坐"]],
  ["面对一道没吃过的菜，你？", ["先来一口，人生需要盲盒", "看评价/问店员再决定", "朋友点了我就蹭一口", "拍张照研究一下它怎么做的"]],
  ["朋友难过时，你更可能？", ["陪他骂两句，先站同一边", "安静陪着，等他想说", "问：我能具体做点什么？", "讲个离谱故事，试着逗笑他"]],
  ["看剧看到大结局时？", ["一口气看到完，不接受暂停", "会舍不得，慢慢看", "看完立刻搜解析和彩蛋", "拉人一起看，边看边喊"]],
  ["要给自己取一个网名，你选？", ["有点古怪、有记忆点的", "简洁好记、不折腾", "可爱又带一点自己的梗", "酷一点，最好像个代号"]],
  ["碰上陌生人搭话，你？", ["礼貌但保持距离", "看聊得来就多说两句", "先判断有没有实际需要帮忙", "会好奇他为什么突然找我"]],
  ["今天状态一般，但有重要安排？", ["硬着头皮也能完成", "先把期待调低，慢慢过", "找点仪式感给自己打气", "告诉亲近的人：我今天有点蔫"]],
  ["购物车里放很久的东西，最后通常？", ["想清楚有用就买", "等活动，能省一点是一点", "某天情绪到了就下单", "发给朋友问：你觉得怎么样？"]],
  ["如果能瞬移，你最想？", ["去一个从没去过的地方看看", "回到自己的小窝", "直接到目的地省掉路程", "去朋友身边给个惊喜"]],
  ["被误解时，你通常？", ["马上解释，不能让剧情跑偏", "算了，懂的人自然懂", "组织好语言再正式说明", "会有点闷，但希望对方主动来问"]],
  ["你的充电方式更像？", ["和喜欢的人热热闹闹吃饭", "独处、发呆、什么也不干", "完成一个小目标的成就感", "吸收新的音乐、展览或故事"]],
  ["别人最可能因为什么来找你？", ["‘你快来，气氛靠你了’", "‘这事想听听你的想法’", "‘救命，帮我理一下’", "‘我发现个怪东西，想和你聊’"]],
  ["请凭直觉选一句猫言猫语：", ["‘走啊，出去晒晒太阳。’", "‘先靠一会儿，世界晚点再说。’", "‘别急，我已经想到办法了。’", "‘你看这朵云，像不像一条鱼？’"]]
];

// 每个题目的四个选项分别偏向：橘猫、布偶、狸花、暹罗；
// 少量题目按位置映射到燕尾服猫，避免结果一边倒。
const optionMaps = [
  ["siamese","ragdoll","tabby","orange"], ["tuxedo","siamese","tabby","ragdoll"], ["siamese","tabby","orange","ragdoll"], ["siamese","tabby","tuxedo","orange"], ["tabby","ragdoll","siamese","orange"], ["orange","tuxedo","tabby","ragdoll"], ["tuxedo","orange","tabby","ragdoll"], ["siamese","tabby","orange","ragdoll"], ["tabby","orange","tuxedo","ragdoll"], ["orange","tuxedo","tabby","siamese"],
  ["tabby","ragdoll","orange","tuxedo"], ["tuxedo","orange","siamese","tabby"], ["tabby","siamese","orange","tuxedo"], ["ragdoll","siamese","tabby","orange"], ["orange","tuxedo","tabby","siamese"], ["orange","siamese","tabby","ragdoll"], ["siamese","tuxedo","tabby","orange"], ["siamese","tabby","orange","ragdoll"], ["siamese","tabby","orange","tuxedo"], ["orange","ragdoll","tabby","siamese"],
  ["tabby","ragdoll","siamese","orange"], ["siamese","tabby","orange","tuxedo"], ["tuxedo","orange","tabby","siamese"], ["tabby","ragdoll","orange","tuxedo"], ["tabby","tuxedo","orange","ragdoll"], ["siamese","ragdoll","tabby","orange"], ["orange","tuxedo","tabby","ragdoll"], ["orange","ragdoll","tabby","siamese"], ["orange","tuxedo","tabby","siamese"], ["orange","ragdoll","tabby","siamese"]
];

const state = { current: 0, answers: Array(questions.length).fill(null) };
const els = {
  intro: document.querySelector("#intro-view"), quiz: document.querySelector("#quiz-view"), result: document.querySelector("#result-view"),
  start: document.querySelector("#start-button"), back: document.querySelector("#back-button"), progress: document.querySelector("#progress-value"),
  count: document.querySelector("#question-count"), progressText: document.querySelector("#progress-text"), number: document.querySelector("#question-number"),
  title: document.querySelector("#question-title"), options: document.querySelector("#options"),
  resultBadge: document.querySelector("#result-badge"), resultCat: document.querySelector("#result-cat"), resultTitle: document.querySelector("#result-title"),
  resultSubtitle: document.querySelector("#result-subtitle"), resultDescription: document.querySelector("#result-description"), resultTips: document.querySelector("#result-tips"), mixBars: document.querySelector("#mix-bars"),
  restart: document.querySelector("#restart-button"), share: document.querySelector("#share-button"), shareStatus: document.querySelector("#share-status")
};

function showView(view) {
  [els.intro, els.quiz, els.result].forEach(item => item.classList.remove("is-active"));
  view.classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function progressLabel(position) {
  if (position < 7) return "刚进猫门";
  if (position < 15) return "猫毛已沾身";
  if (position < 23) return "猫感逐渐明显";
  if (position < 29) return "快揭晓啦";
  return "正在生成猫塑报告";
}

function renderQuestion() {
  const [title, options] = questions[state.current];
  const answered = state.answers[state.current];
  const position = state.current + 1;
  els.count.textContent = `${String(position).padStart(2, "0")} / ${questions.length}`;
  els.progress.style.width = `${(position / questions.length) * 100}%`;
  els.progressText.textContent = progressLabel(state.current);
  els.number.textContent = `Q${String(position).padStart(2, "0")}`;
  els.title.textContent = title;
  els.back.disabled = state.current === 0;
  els.options.innerHTML = "";
  options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = `option${answered === index ? " selected" : ""}`;
    button.type = "button";
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(answered === index));
    button.innerHTML = `<span class="option-letter">${"ABCD"[index]}</span><span class="option-text"></span>`;
    button.querySelector(".option-text").textContent = option;
    button.addEventListener("click", () => chooseOption(index));
    els.options.appendChild(button);
  });
}

function chooseOption(choice) {
  state.answers[state.current] = choice;
  renderQuestion();
  window.setTimeout(() => {
    if (state.answers[state.current] !== choice) return;
    if (state.current < questions.length - 1) {
      state.current += 1;
      renderQuestion();
    } else {
      renderResult();
    }
  }, 230);
}

function calculateResult() {
  const scores = Object.fromEntries(Object.keys(cats).map(key => [key, 0]));
  state.answers.forEach((answer, questionIndex) => {
    if (answer !== null) scores[optionMaps[questionIndex][answer]] += 1;
  });
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return { winner: sorted[0][0], scores, max: sorted[0][1] };
}

function renderResult() {
  const { winner, scores, max } = calculateResult();
  const cat = cats[winner];
  els.resultBadge.textContent = cat.mood;
  els.resultBadge.style.background = cat.color;
  els.resultCat.textContent = cat.emoji;
  els.resultCat.style.background = cat.color;
  els.resultTitle.textContent = cat.name;
  els.resultSubtitle.textContent = cat.subtitle;
  els.resultDescription.textContent = cat.description;
  els.resultTips.innerHTML = cat.tips.map(tip => `<li>${tip}</li>`).join("");
  const total = questions.length;
  els.mixBars.innerHTML = Object.entries(cats).map(([key, item]) => {
    const percent = Math.max(5, Math.round((scores[key] / total) * 100));
    const isWinner = key === winner ? " ★" : "";
    return `<div class="mix-row"><span>${item.name.replace("派", "")}${isWinner}</span><div class="mix-track"><div class="mix-fill" style="width:${percent}%;background:${item.color}"></div></div><b>${scores[key]}格</b></div>`;
  }).join("");
  els.share.dataset.result = `${cat.name}｜${cat.subtitle}`;
  showView(els.result);
}

els.start.addEventListener("click", () => { showView(els.quiz); renderQuestion(); });
els.back.addEventListener("click", () => { if (state.current > 0) { state.current -= 1; renderQuestion(); } });
els.restart.addEventListener("click", () => { state.current = 0; state.answers.fill(null); els.shareStatus.textContent = ""; showView(els.intro); });
els.share.addEventListener("click", async () => {
  const text = `我的猫塑报告：${els.share.dataset.result}\n30 道日常题测出我的猫咪出厂设置。\n#猫塑研究所 #今日份猫塑报告`;
  try {
    await navigator.clipboard.writeText(text);
    els.shareStatus.textContent = "已复制，快去把这只猫炫耀给朋友看！";
  } catch {
    els.shareStatus.textContent = "复制失败了，手动截图也很有排面。";
  }
});
