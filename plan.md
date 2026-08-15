# 文档中心后续执行计划

> 本文件是 qtdocs 文档中心的长期执行计划和操作清单。后续新增或上线文档时，按本文件执行，并在完成后更新状态和发布记录。

## 一、项目目标

持续建设 `docs.quanttide.com` 文档中心：

- 为各文档仓库提供统一访问入口；
- 将各文档站点按固定 slug 发布到阿里云 OSS；
- 用 GitHub Actions 自动完成构建和部署；
- 降低团队查找文档和维护发布流程的成本。

当前架构：

```text
文档仓库
  -> GitHub Actions
  -> MyST 构建 HTML
  -> OSS qtdocs-site/<slug>/
  -> CDN docs.quanttide.com/<slug>/

qtdocs 仓库
  -> React + Vite 构建统一首页
  -> 读取 public/apps.json
  -> 部署到 OSS 根目录
```

## 二、当前状态

### 已完成

- [x] `qtdocs` 统一首页已建立；
- [x] `qtdocs-site` OSS 桶和静态托管已配置；
- [x] `docs.quanttide.com` 域名、CDN 和 SSL 已配置；
- [x] `quanttide-tech` 已上线；
- [x] `quanttide-intention-of-business-entity` 已上线；
- [x] 文档发布规则已整理到 `docs/publish-rules.md`；
- [x] 首页已通过 `public/apps.json` 管理文档入口。
- [x] 将云计算手册迁入 `quanttide-handbook/engineering/cloud-computing/`。
- [x] 将团队协作手册迁入 `quanttide-handbook/management/collaboration/`。
- [x] 将 Flutter 手册迁入 `quanttide-handbook/languages-frameworks-tools/flutter/`。
- [x] 将财务管理手册迁入 `quanttide-handbook/management/finance/`。

### 待完成

- [x] 独立评估并上线 `quanttide-intention-of-payment-engineering`；
- [x] 独立上线 `quanttide-intention-of-human-resources`；
- [x] 独立上线 `quanttide-intention-of-data-engineering`；
- [x] 独立上线 `quanttide-handbook` 总入口；
- [x] 独立上线 `quanttide-handbook/engineering/devops/`；
- [x] 云计算手册及其之前的子手册已迁入 `quanttide-handbook`；
- [ ] 继续盘点第二大脑下属的其他文档仓库；
- [x] 按五个一级目录规划并上线 `quanttide-handbook` 一级目录页；
- [x] 子手册上线后更新 `quanttide-handbook` 总入口对应链接；
- [x] 每次新增站点后更新 `public/apps.json`；
- [x] 每次上线后补充发布记录。

## 三、执行优先级

按以下顺序推进：

1. 先处理内容相对完整、能够独立访问的 intention 文档；
2. `quanttide-handbook` 总入口和五个一级目录页已独立上线，下一步优先处理内容成熟的子手册；
3. 子手册按内容成熟度逐个处理，成熟一个上线一个，并逐步替换总入口中的对应链接；
4. 内容仍是空骨架的仓库暂不发布，只做内容跟踪。

原则：先完整跑通一个仓库，再批量复制流程。

### 章程类文档特别规则

意图（intention）文档默认作为独立文档站点发布，不自动纳入
`quanttide-bylaw-of-business-entity` 等正式章程站点。

独立发布时保留 intention 文档自身的结构、标题层级和表达方式，
不套用正式章程格式，不强制使用“第X章”或“第X条”等条款编号。

只有负责人明确确认目标站点、目录和页面用途后，才可以将 intention
文档或其整理结果纳入正式章程站点。已经存在的章程页面属于历史派生内容，
不替代对应 intention 文档的独立上线。

只有明确制作章程类派生文档时，才遵循以下章程格式：

- 一级标题使用 `# 量潮科技<业务域><章程类型>章程`；
- 二级标题使用 `## 第X章 <章节名>`；
- 条款标题使用 `**第X条 条款名称**`，条号全文连续编号；
- 条款内并列内容优先使用 `（一）`、`（二）` 等中文编号；
- 正文避免使用“为什么做”“要什么”“下一步”“当前阶段”等提纲式或阶段性表达；
- 临时计划、历史演化和反直觉观察应抽象为长期稳定的定位、原则、边界或管理要求。

发布前必须先向负责人确认发布位置，包括目标站点、目录、TOC 分组、访问路径或 slug。未确认发布目录前，不接入线上目录、不推送触发部署。

### 工作手册特别规则

`quanttide-handbook` 是量潮工作手册总入口，已独立发布到
`https://docs.quanttide.com/quanttide-handbook/`。五个一级目录页也已上线。后续子手册原则上放在该总入口命名空间下，
不在 `docs.quanttide.com` 首页把 33 个子手册全部做成并列入口。

子手册目录按 `quanttide-handbook/_toc.yml` 的 5 个一级导航组织：

```text
量潮工作手册
├─ 业务
│  ├─ 企业服务手册
│  └─ 客户端服务手册
├─ 研发
│  ├─ 开发者工具手册
│  ├─ DevOps手册
│  ├─ 网络应用手册
│  ├─ 数据工程手册
│  ├─ 云计算手册
│  ├─ 数据分析手册
│  ├─ 生成式人工智能手册
│  └─ 数字身份手册
├─ 管理
│  ├─ 团队管理手册
│  ├─ 产品研发手册
│  ├─ 团队协作手册
│  ├─ 项目管理手册
│  ├─ 数字资产管理手册
│  ├─ 文档管理手册
│  ├─ 客户支持手册
│  ├─ 财务管理手册
│  ├─ 法务管理手册
│  ├─ 开源管理手册
│  ├─ 公共关系手册
│  ├─ 创赛管理手册
│  └─ 新媒体管理手册
├─ 语言、框架和工具
│  ├─ C语言手册
│  ├─ Django手册
│  ├─ Docker手册
│  ├─ FastAPI手册
│  ├─ FigJam手册
│  ├─ Figma手册
│  ├─ Flutter手册
│  ├─ OpenAPI手册
│  └─ Python手册
└─ 学科/行业
   └─ 高等教育手册
```

建议线上路径按一级目录分层，具体 slug 可在发布前确认：

- 业务：`/quanttide-handbook/business/`
- 研发：`/quanttide-handbook/engineering/`
- 管理：`/quanttide-handbook/management/`
- 语言、框架和工具：`/quanttide-handbook/languages-frameworks-tools/`
- 学科/行业：`/quanttide-handbook/disciplines-industries/`

工作手册写作参考
`https://quanttide.github.io/quanttide-handbook-of-business-entity/qtdata/connect/email/`，
但不机械照搬该页面结构。核心标准是：工作手册要写成能照着办的文档，不写成章程，
也不写成空泛说明。

不同类型手册可按内容调整结构：

- 流程类内容：优先写适用范围、原则、角色、流程总览、阶段、节点、模板、期望响应和留痕规则；
- 工具类或技术类内容：优先写使用场景、前置条件、配置步骤、操作步骤、验证方式和常见问题；
- 管理类内容：优先写适用范围、职责分工、工作流程、检查清单、归档规则和例外处理；
- 总入口页面：保持目录导航清爽，不强行加入流程图、模板或长篇说明。

工作手册不使用章程类“第X章”“第X条”格式。标题层级应服务于执行场景：
最大标题写具体手册或流程名称，二级标题组织角色、阶段、场景或规则，三级标题用于具体动作节点或操作步骤。

## 四、单个文档仓库上线流程

### 阶段 1：盘点仓库

记录以下信息：

- 仓库名称；
- 文档类型：MyST、Jupyter Book、纯 Markdown 或其他；
- 是否存在 `myst.yml`、`_toc.yml` 或其他构建配置；
- 是否有可作为首页的文档；
- 内容是否已经达到可公开访问的最低标准；
- 是否依赖其他尚未上线的文档；
- 计划使用的 slug；
- 负责人和预计上线时间。

检查结果分为：

- `可上线`：直接进入部署准备；
- `需补内容`：先补文档内容，再重新评估；
- `暂缓`：依赖其他文档或当前没有独立价值。

### 阶段 2：确定发布信息

每个文档站点必须确定：

```text
slug：小写、连字符分隔、无中文
访问地址：https://docs.quanttide.com/<slug>/
OSS 路径：oss://qtdocs-site/<slug>/
首页名称：面向用户的中文名称
简介：一句话说明文档用途
```

slug 一旦发布，原则上不再修改，避免旧链接失效。

发布位置必须由负责人确认后再执行。若文档不是独立发布到 `docs.quanttide.com/<slug>/`，而是接入某个既有站点，应明确：

- 目标仓库；
- 目标目录；
- TOC 分组；
- 页面文件名；
- 线上访问路径。

若子手册接入 `quanttide-handbook`，还应明确：

- 所属一级目录：业务、研发、管理、语言/框架/工具、学科/行业；
- 子手册短路径，例如 `devops`、`data-engineering`、`product-development`；
- 线上访问路径，例如 `https://docs.quanttide.com/quanttide-handbook/engineering/devops/`；
- 总入口中对应链接是否同步替换为新地址。

### 阶段 3：准备部署 CI

在目标文档仓库中新增或检查：

```text
.github/workflows/deploy-oss.yml
```

部署流程必须包含：

1. checkout 仓库；
2. 安装 Node.js；
3. 安装并执行 MyST 或项目对应的构建工具；
4. 设置正确的 `BASE_URL`；
5. 使用 `manyuanrong/setup-ossutil@v3.0`；
6. 上传前清理对应 OSS 子目录；
7. 将构建结果上传到 `qtdocs-site/<slug>/`；
8. 配置合理的缓存时间。

MyST 项目重点确认：

```yaml
env:
  BASE_URL: /<slug>
```

上传前清理旧目录：

```bash
ossutil rm oss://qtdocs-site/<slug>/ -r -f || true
```

上传构建结果：

```bash
ossutil cp ./_build/html/ oss://qtdocs-site/<slug>/ -r -f --meta=Cache-Control:public,max-age=300
```

### 阶段 4：配置权限和触发发布

在目标文档仓库配置 GitHub Actions Secrets：

```text
ALIYUN_ACCESS_KEY_ID
ALIYUN_ACCESS_KEY_SECRET
```

然后：

1. 推送 workflow 到 `main`；
2. 观察 GitHub Actions；
3. 确认构建成功；
4. 确认 OSS 上传成功；
5. 记录失败日志和修复方式。

### 阶段 5：线上验收

访问：

```text
https://docs.quanttide.com/<slug>/
```

至少检查：

- [ ] URL 返回正常；
- [ ] `/` 子目录能够正确打开；
- [ ] 页面不是空白页；
- [ ] CSS、JavaScript、图片和字体等资源没有 404；
- [ ] 页面内部链接可以正常跳转；
- [ ] 刷新深层页面不会回退到统一首页；
- [ ] 手机和桌面浏览器下基本可用；
- [ ] CDN 没有持续返回旧版本。

出现问题时优先检查：

1. MyST 的 `BASE_URL`；
2. OSS 静态托管的 `SupportSubDir=true`；
3. OSS 上传目录是否正确；
4. `setup-ossutil` 是否使用精确版本 `@v3.0`；
5. CDN 缓存是否尚未过期。

### 阶段 6：更新统一首页

在 `public/apps.json` 中增加站点信息：

```json
{
  "slug": "example-docs",
  "name": "示例文档",
  "description": "一句话说明文档内容"
}
```

然后在 qtdocs 仓库中：

1. 检查 JSON 格式；
2. 提交并推送到 `main`；
3. 确认首页部署 workflow 成功；
4. 访问 `https://docs.quanttide.com`；
5. 点击新入口确认可以打开。

## 五、当前仓库的工作顺序

### 第 1 步：逐个评估 intention 系列

建议顺序：

1. `quanttide-intention-of-payment-engineering`（独立站点，已上线）
2. `quanttide-intention-of-human-resources`（独立站点，已上线）
3. `quanttide-intention-of-data-engineering`（独立站点，已上线）

每个仓库先判断内容是否已经脱离“骨架状态”。如果只有少量占位 Markdown，则先补内容，不直接上线。

### 第 2 步：规划 handbook 子手册

`quanttide-handbook` 总入口和五个一级目录页已经上线，不再重新判断是否需要单独发布。下一步围绕总入口下的
5 个一级目录逐个处理子手册：

1. 业务；
2. 研发；
3. 管理；
4. 语言、框架和工具；
5. 学科/行业。

处理原则：

- 子手册尽量放在 `https://docs.quanttide.com/quanttide-handbook/` 命名空间下；
- 每个子手册发布前先确认所属一级目录、短路径和线上 URL；
- 内容成熟的先上线，内容不完整的先标记状态，不硬凑成完整手册；
- `qtdocs` 首页保持总入口，不把 33 个子手册全部平铺到首页。

建议优先检查内容相对完整的子手册。团队协作手册和 Flutter 手册均已上线，首轮已完成，后续进入第二批。

第二批检查已有部分内容的子手册：

- 财务管理手册（已上线）；
- 创赛管理手册；
- 数字资产管理手册；
- 团队管理手册；
- 项目管理手册；
- Django 手册；
- Figma 手册。

目录或骨架型子手册先暂缓直接发布，除非负责人确认只作为导航页上线。

### 第 3 步：逐个上线 handbook 子手册

每个子手册按以下顺序处理：

1. 盘点内容成熟度；
2. 按工作手册写作准则整理或补齐首页；
3. 确认所属一级目录和线上路径；
4. 配置构建和 OSS 发布路径；
5. 发布并验收；
6. 回到 `quanttide-handbook` 总入口更新对应链接。

如果子手册来自独立仓库，仍保留独立仓库维护方式，只把构建产物发布到
`quanttide-handbook` 对应子路径下。

### 第 4 步：维护 handbook 总入口

总入口的职责是提供五个一级目录和 33 个子手册的导航。后续维护时重点确认：

- 五个一级目录完整；
- 子手册链接逐步替换为 `docs.quanttide.com/quanttide-handbook/...` 下的新地址；
- 已上线、待完善、暂缓发布的状态清楚；
- 总入口不写成长篇说明，不替代具体子手册内容。

## 六、发布记录

每次发布完成后补充一条记录：

```text
日期：
仓库：
slug：
版本或 commit：
发布地址：
负责人：
结果：
备注：
```

发布前确认：

- [ ] 负责人已确认发布目录或站点位置；
- [ ] 内容负责人确认可以公开；
- [ ] slug 已确定；
- [ ] 构建配置已确认；
- [ ] workflow 已配置；
- [ ] Secrets 已配置；
- [ ] OSS 路径正确；
- [ ] 首页入口信息已准备。

发布后确认：

- [ ] GitHub Actions 成功；
- [ ] 线上页面可访问；
- [ ] 静态资源正常；
- [ ] 深层链接正常；
- [ ] 首页入口已更新；
- [ ] 发布记录已补充。

### 2026-08-13

仓库：`quanttide/quanttide-intention-of-payment-engineering`
slug：`quanttide-intention-of-payment-engineering`
版本或 commit：`a88923c`
发布地址：https://docs.quanttide.com/quanttide-intention-of-payment-engineering/
负责人：`ztzzh`
结果：GitHub Actions 构建和 OSS 上传成功，线上验收通过。
备注：`BASE_URL` 使用 `/quanttide-intention-of-payment-engineering`；首页、CSS、JavaScript、`index.json` 和 favicon 均已验证返回正常。

仓库：`quanttide/quanttide-bylaw-of-business-entity`
发布位置：人力资源目录，`human/training.md`
版本或 commit：`abc4458`
发布地址：https://quanttide.github.io/quanttide-bylaw-of-business-entity/human/training/
负责人：`ztzzh`
结果：GitHub Actions 构建和 GitHub Pages 部署成功，线上验收通过。
备注：历史派生页面，将 `quanttide-intention-of-human-resources` 的培训意图整理为《量潮科技培训工作章程》；不替代 intention 文档独立上线。

仓库：`quanttide/quanttide-bylaw-of-business-entity`
发布位置：商务管理目录，`business/payment-engineering.md`
版本或 commit：`6bbe851`
发布地址：https://quanttide.github.io/quanttide-bylaw-of-business-entity/business/payment-engineering/
负责人：`ztzzh`
结果：GitHub Actions 构建和 GitHub Pages 部署成功，线上验收通过。
备注：历史派生页面，将支付工程意图整理为《量潮科技支付工程章程》；不替代独立 intention 站点。

仓库：`quanttide/quanttide-bylaw-of-business-entity`
发布位置：量潮云目录，`qtcloud/metering.md`
版本或 commit：`8f5833a`
发布地址：https://quanttide.github.io/quanttide-bylaw-of-business-entity/qtcloud/metering/
负责人：`ztzzh`
结果：GitHub Actions 构建和 GitHub Pages 部署成功，线上验收通过。
备注：历史派生页面，将 `quanttide-intention-of-data-engineering` 的商业模式整理为《量潮云计量计费章程》；不替代 intention 文档独立上线。

### 2026-08-14

仓库：`quanttide/quanttide-intention-of-human-resources`
slug：`quanttide-intention-of-human-resources`
版本或 commit：`5ff0556`
发布地址：https://docs.quanttide.com/quanttide-intention-of-human-resources/
负责人：`ztzzh`
结果：GitHub Actions 构建和 OSS 上传成功，线上验收通过。
备注：独立发布 MyST 文档站；首页、培训模块页面和 `BASE_URL` 均已验证正常。

仓库：`quanttide/quanttide-intention-of-data-engineering`
slug：`quanttide-intention-of-data-engineering`
版本或 commit：`e9a7d71`
发布地址：https://docs.quanttide.com/quanttide-intention-of-data-engineering/
负责人：`ztzzh`
结果：GitHub Actions 构建和 OSS 上传成功，线上验收通过。
备注：独立发布 MyST 文档站；首页、量潮数据云商业模式页面和 `BASE_URL` 均已验证正常。

仓库：`quanttide/quanttide-handbook`
slug：`quanttide-handbook`
版本或 commit：`3a1a040`
发布地址：https://docs.quanttide.com/quanttide-handbook/
负责人：`ztzzh`
结果：GitHub Actions 构建和 OSS 上传成功，线上验收通过。
备注：仅发布量潮工作手册总导航入口；页面展示 `_toc.yml` 中 5 个一级目录和 33 个子手册链接，未修改子手册仓库、`_toc.yml` 或子模块引用。

仓库：`quanttide/quanttide-handbook`
slug：`quanttide-handbook`
版本或 commit：`79bd7eb`、`7546d84`
发布地址：
- https://docs.quanttide.com/quanttide-handbook/
- https://docs.quanttide.com/quanttide-handbook/business/
- https://docs.quanttide.com/quanttide-handbook/engineering/
- https://docs.quanttide.com/quanttide-handbook/management/
- https://docs.quanttide.com/quanttide-handbook/languages-frameworks-tools/
- https://docs.quanttide.com/quanttide-handbook/disciplines-industries/
负责人：`ztzzh`
结果：GitHub Actions 构建和 OSS 上传成功，线上验收通过。
备注：新增五个一级目录页：业务、研发、管理、语言/框架/工具、学科/行业；总入口改为一级目录导航，33 个子手册链接保留在对应目录页中，暂未迁移子手册本体。

仓库：`quanttide/quanttide-handbook-of-devops`
slug：`quanttide-handbook-of-devops`
版本或 commit：`ab4b727`
后续修复：`07df5c9`
发布地址：https://docs.quanttide.com/quanttide-handbook/engineering/devops/
负责人：`ztzzh`
结果：GitHub Actions 构建和 OSS 上传成功，线上验收通过。
备注：首个子手册已迁移到 `quanttide-handbook` 命名空间下；研发目录页已同步更新到新地址。总入口 workflow 已修正为不清空 `quanttide-handbook/` 前缀，避免误删子手册。

仓库：`quanttide/quanttide-handbook-of-cloud-computing`
slug：`quanttide-handbook-of-cloud-computing`
版本或 commit：`858b3f0`
发布地址：https://quanttide.github.io/quanttide-handbook-of-cloud-computing/
负责人：`ztzzh`
结果：GitHub Actions 构建和 GitHub Pages 部署成功，线上验收通过。
备注：旧的独立站点发布记录；当前主入口已迁入 `quanttide-handbook/engineering/cloud-computing/`，不再作为主导航入口。

仓库：`quanttide/quanttide-handbook`
slug：`quanttide-handbook`
版本或 commit：`bac3428`
发布地址：https://docs.quanttide.com/quanttide-handbook/engineering/cloud-computing/
负责人：`ztzzh`
结果：GitHub Actions 构建和 OSS 上传成功，线上验收通过。
备注：云计算手册已并入研发目录本地页；`engineering/` 目录页不再使用外链跳转样式。

仓库：`quanttide/quanttide-handbook`
slug：`quanttide-handbook`
版本或 commit：`f9c9bce`
发布地址：https://docs.quanttide.com/quanttide-handbook/management/collaboration/
负责人：`ztzzh`
结果：GitHub Actions 构建和 OSS 上传成功，线上验收通过。
备注：团队协作手册已并入管理目录本地页；`management/` 目录页不再使用外链跳转样式。

仓库：`quanttide/quanttide-handbook`
slug：`quanttide-handbook`
版本或 commit：`23e64a8`
发布地址：https://docs.quanttide.com/quanttide-handbook/languages-frameworks-tools/flutter/
负责人：`ztzzh`
结果：GitHub Actions 构建和 OSS 上传成功，线上验收通过。
备注：Flutter 手册已并入语言、框架和工具目录本地页；`languages-frameworks-tools/` 目录页不再使用外链跳转样式。

### 2026-08-15

仓库：`quanttide/quanttide-handbook`
slug：`quanttide-handbook`
版本或 commit：`4c620f5`
发布地址：https://docs.quanttide.com/quanttide-handbook/management/finance/
负责人：`ztzzh`
结果：GitHub Actions 构建和 OSS 上传成功，线上验收通过。
备注：财务管理手册已并入管理目录本地页；`management/` 目录页不再使用 `quanttide-handbook-of-finance` 外链跳转样式。

## 七、固定规则和已知坑

以下规则不能随意改动：

- OSS 统一部署桶：`qtdocs-site`；
- 文档路径格式：`/<app-slug>/`；
- slug 使用小写连字符，不使用中文；
- 每个应用必须有自己的 `index.html`；
- MyST 构建必须设置对应 `BASE_URL`；
- 上传前清理旧 OSS 子目录；
- 缓存建议设置为 `public,max-age=300`；
- `manyuanrong/setup-ossutil` 使用精确版本 `@v3.0`；
- OSS 静态网站托管必须开启 `SupportSubDir=true`；
- 发布后 CDN 可能仍缓存旧响应，必要时重新部署或等待 TTL 过期。
- 正式章程文档发布前必须先确认放置目录，并按章程格式整理为负责人审核过的草稿。
- 工作手册发布前必须先确认放到 `quanttide-handbook` 下哪个一级目录和子路径。
- 工作手册写作以“能照着办”为标准，参考成熟样文，但不机械套用固定结构。
- 工作手册不使用章程类“第X章”“第X条”格式。
- 以后所有要在 `quanttide-handbook` 下上线的内容，都先按“确认目录 -> 对齐手册格式 -> 去掉外链跳转 -> 本地构建验证 -> 提交推送 -> 补发布记录”这套流程走。
- `quanttide-handbook` 总入口部署不得递归清空整个前缀，否则会误删已上线的子手册。

## 八、完成标准

当以下条件全部满足时，认为本阶段完成：

- intention 系列中可上线的文档已经上线；
- 每个已上线文档都有稳定访问地址；
- 统一首页列出所有已上线文档；
- 新文档仓库可以按本计划独立完成发布；
- 发布规则和踩坑记录已经同步；
- 没有把内容仍为空壳的仓库误标为已上线。

## 九、下一次开始时先做什么

下一次继续工作时，先执行：

1. 从 `quanttide-handbook` 子手册继续，优先检查创赛管理手册、数字资产管理手册、团队管理手册、项目管理手册、Django 手册和 Figma 手册；
2. 首轮内容已完成，DevOps、数据工程、产品研发、生成式人工智能、Python、云计算、团队协作和 Flutter 手册后续不再作为首轮对象；
3. 判断目标子手册是否具备上线条件，内容不足时先标记为待完善；
4. 发布前先确认所属一级目录、子路径、TOC 分组和访问地址；
5. 按工作手册写作准则整理内容，做到可执行、可检查、可留痕；
6. 上线成功后更新 `quanttide-handbook` 总入口链接，并补充本文件的发布记录。
