# 创业动物研究所

在原版“猫塑研究所”上改版的纯前端趣味职业兴趣探索网站。保留原版三视图、CSS首页猫、纸张漫画风格、答题过渡、重新测试和复制报告。新增30道中文情境题、RIASEC六种动物、48个职业方向、响应式职业星图与SVG职业工作场景。

**当前为本地开发审阅版本，尚未完成改编版测量验证。没有推送或替换线上站点。** O*NET Tools Developer License 要求内容改编产品在推出前完成适合目标受众和用途的验证研究；功能测试不能替代该研究。详见 [来源记录](SOURCES.md) 和 [改编与免责声明](modifications.html)。

## 运行

可直接用现代浏览器打开 `index.html`。也可在此目录执行：

```powershell
python -m http.server 5173 --bind 127.0.0.1
```

然后访问 `http://127.0.0.1:5173/`。不需要 npm install、构建、账号、数据库或API密钥。页面不请求外部字体或图片；外部来源仅在主动点击时打开。

## 文件

- `index.html` / `styles.css` / `script.js`：原站三个核心文件，直接修改扩展。
- `data.js`：30题、原始编号、核心含义、六维动物与48职业来源配置。
- `illustrations.js`：四猫、小熊猫、海狸、服装及职业场景SVG图层。
- `modifications.html`：前台可访问的来源、改编、许可、隐私和验证说明。
- `docs/题目与职业对照.md`：逐题映射、职业参考SOC与兴趣代码。
- `docs/改版说明.md`：原项目检查、复用范围、视觉约束和状态处理。
- `qa/check.cjs` / `qa/browser.cjs`：可复跑的数据/计分检查与本地Chrome交互、布局验证。

## 计分

每题五级兴趣选择，内部1至5分；每维5题等权合计。最高维度为主型候选；并列依次比较“非常喜欢”次数、“比较喜欢”次数，最后依固定 R-I-A-S-E-C 顺序确定默认展示。所有同最高总分兴趣明确标注；探索区开放前三项及第三名的所有同分维度。

职业池依据参考兴趣代码人工选取，**不是官方职业匹配算法**。若某类型只是该职业的次要兴趣，前台会明示。职业卡的中文方向、介绍和入门练习为本站改编；不是岗位录用资格或中国执业标准说明。

## 检查

```powershell
node --check data.js
node --check illustrations.js
node --check script.js
node qa/check.cjs
# 先启动上述静态服务；浏览器脚本使用本机已安装的Google Chrome：
node qa/browser.cjs
```

浏览器检查使用Windows隐藏无头Chrome及独立临时用户目录；不操作用户常用浏览器。输出在 `qa/screenshots/`、`qa/browser-results.json`，不属于发布文件。静态文件即可部署，无构建产物依赖。

## GitHub Pages

本仓库保留原 `origin`，改动尚未推送。完成题目验证与发布审核后，可提交这些文件到原仓库 `main` 分支，继续使用原 Pages 的“Deploy from a branch / main / root”设置。全部资源路径相对，不依赖域名根路径，兼容 `/my-fist-test/` 子路径。无需更换部署平台或新增工作流。

发布最小文件：`index.html`、`styles.css`、`script.js`、`data.js`、`illustrations.js`、`favicon.svg`、`modifications.html`、`.nojekyll`。建议同时保留README、SOURCES及docs便于核查。发布包只包含站点及说明，不含 `.git`、浏览器资料或QA截图。

## 必要通知

本测试参考霍兰德 RIASEC 职业兴趣理论及 O*NET® Interest Profiler 的测量框架，题目经趣味化改编，仅供职业兴趣探索，不属于官方标准化测评。六种动物名称和人物设定为原创视觉包装，并非霍兰德理论原有称呼。

This application includes information from the [O*NET Career Exploration Tools](https://www.onetcenter.org/tools.html) by the U.S. Department of Labor, Employment and Training Administration (USDOL/ETA). Used under the [O*NET Tools Developer License](https://www.onetcenter.org/license_toolsdev.html). O*NET® is a trademark of USDOL/ETA. 创业动物研究所 has modified all or some of this information. USDOL/ETA has not approved, endorsed, or tested these modifications.

创业动物研究所 has modified a portion of the O*NET® Career Exploration Tools. The U.S. Department of Labor, Employment and Training Administration (USDOL/ETA) has not approved, endorsed, or tested these modifications. As such, USDOL/ETA will not be liable to any third party or end-user for any damages arising out of or from the use or misuse of the modified O*NET Career Exploration Tools or any products incorporating or containing the modified O*NET Career Exploration Tools.

职业兴趣代码信息来自美国劳工部 USDOL/ETA 的 [O*NET 31.0 Database](https://www.onetcenter.org/database.html)，按 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 使用。中文职业名称、说明、学习建议和人工匹配经过改编，USDOL/ETA 未批准、背书或测试这些改动。原始工具及资料按原许可现状条款提供，不作相关保证。
