# 理论、来源与验证记录

核对日期：2026-10-25。实现及题目改编方：创业动物研究所。

## 核对资料

1. [Interest Profiler 官方介绍](https://www.onetcenter.org/IP.html)：六种职业兴趣；Mini-IP 为30题，关注喜欢的工作活动，并非能力测验。
2. [30题接口文档](https://services.onetcenter.org/reference/mnm/ip/ip_questions_30)：题目带原始 index、area 和 text；五级兴趣回答。接口需要凭证，本项目不接入在线 API。文档示例只列前两道，故完整30题另以开发报告核对。
3. [Rounds 等，2016年 Mini-IP 开发报告](https://www.onetcenter.org/reports/Mini-IP.html)及 [PDF](https://www.onetcenter.org/dl_files/Mini-IP.pdf)：附录 A 位于 PDF 第18–19页（纸面标号19–20），列出全部30题与维度。本项目按附录的30题建议顺序编码，非60题量表内部序号。
4. [工具许可选择](https://www.onetcenter.org/license_tools.html)及 [Tools Developer License](https://www.onetcenter.org/license_toolsdev.html)：修改题目采用开发者许可，不能使用禁止演绎的 CC BY-ND 作为改编授权。
5. [O*NET OnLine 六类职业兴趣](https://www.onetonline.org/explore/interests/)：逐类核对入选职业的 SOC 与兴趣代码。职业代码数据按 [O*NET 31.0 Database Content License](https://www.onetcenter.org/license_db.html) / [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 标明来源。职业简介和练习建议为本项目撰写，不复刻官方岗位职责。

分类核对页：[R](https://www.onetonline.org/explore/interests/Realistic/)、[I](https://www.onetonline.org/explore/interests/Investigative/)、[A](https://www.onetonline.org/explore/interests/Artistic/)、[S](https://www.onetonline.org/explore/interests/Social/)、[E](https://www.onetonline.org/explore/interests/Enterprising/)、[C](https://www.onetonline.org/explore/interests/Conventional/)。职业可同时具有多个兴趣。商业分析、市场研究等方向包含 I，但官方表的首位兴趣可能是 C 或 E；前台职业卡明确标注，不把它们冒称为纯研究型。

## 核心含义与动物包装

| 维度 | 保留的核心兴趣 | 原创包装 |
| --- | --- | --- |
| R 现实型 | 操作工具、机械、材料，制作与维修等具体活动 | 小熊猫 / 实践探索家 |
| I 研究型 | 观察、实验、分析、研究现象与解决知识问题 | 调研猫 / 洞察研究家 |
| A 艺术型 | 写作、音乐、影像、绘画等原创表达活动 | 创意猫 / 灵感创想家 |
| S 社会型 | 帮助、教导、照顾、支持他人的活动 | 协作猫 / 温暖沟通家 |
| E 企业型 | 管理、经营、说服、推介与商业协商 | 领航猫 / 机会开拓家 |
| C 常规型 | 按规则处理、计算、记录、分类和核对信息 | 海狸 / 秩序规划家 |

动物名称和项目角色不是理论本身。未再混入 EntreComp 分数，也未沿用旧站五猫选项映射。题目不要求被试具备相关资质或已经有能力完成活动，而是想象有机会参与后的喜欢程度。

逐题及48个职业的配置对照见 [题目与职业对照](docs/题目与职业对照.md)，原始信息保存在 `data.js` 的 sourceIndex、type、core，情境题保存在 text。

## 必须明确的改编与限制

- 改为中文校园语境；情境化、内容措辞与某些活动对象发生变化。
- 保留五级选择，但中间项依用户要求标为“一般”，不同于官方 Unsure。这也是需验证的改动。
- 每类5题等权求和，分值仅内部使用；并列按最高回答次数和固定顺序排序，但相同总分仍在结果中标为并列。
- 职业池由开发方人工筛选，不实现官方完整职业匹配、Job Zone 或数据库算法。
- 没有中国大学生样本验证结果；不能引用原版的信效度声称本改编版已验证。
- 代码功能测试和浏览器检查不构成心理测量验证。

## 正式推出前的验证工作

开发者许可第3(b)(2)节要求修改内容的产品在推出前完成验证研究。开发者还需要按第3(b)(3)节提供显著的改编通知及免责声明。声明仅供娱乐不能代替验证研究。

当前交付为本地可运行的开发审阅版本。正式推出前，由适格研究负责人设计并执行符合目标受众与用途的验证研究：专家逐题内容评审、大学生认知访谈、试测和项目分析、六维结构与可靠性、结果解释及群体公平性评估等。研究样本、伦理安排、判据和结论须真实记录，不能凭开发测试补写“验证通过”。本项目不提供假数据或预设合格结论。

## 许可通知

This application includes information from the [O*NET Career Exploration Tools](https://www.onetcenter.org/tools.html) by the U.S. Department of Labor, Employment and Training Administration (USDOL/ETA). Used under the [O*NET Tools Developer License](https://www.onetcenter.org/license_toolsdev.html). O*NET® is a trademark of USDOL/ETA. 创业动物研究所 has modified all or some of this information. USDOL/ETA has not approved, endorsed, or tested these modifications.

创业动物研究所 has modified a portion of the O*NET® Career Exploration Tools. The U.S. Department of Labor, Employment and Training Administration (USDOL/ETA) has not approved, endorsed, or tested these modifications. As such, USDOL/ETA will not be liable to any third party or end-user for any damages arising out of or from the use or misuse of the modified O*NET Career Exploration Tools or any products incorporating or containing the modified O*NET Career Exploration Tools.

职业兴趣代码包含来自 USDOL/ETA 的 [O*NET 31.0 Database](https://www.onetcenter.org/database.html) 的信息，按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 使用；中文职位名称、解释、学习建议和匹配为改编。O*NET® 是 USDOL/ETA 的商标。USDOL/ETA 未批准、背书或测试这些改动。资料按许可的现状条款提供。
