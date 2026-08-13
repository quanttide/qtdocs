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

### 待完成

- [x] 评估并上线 `quanttide-intention-of-payment-engineering`；
- [x] 评估并上线 `quanttide-intention-of-human-resources`；
- [x] 评估并上线 `quanttide-intention-of-data-engineering`；
- [ ] 继续盘点第二大脑下属的其他文档仓库；
- [ ] 等子手册上线后，评估并处理 `quanttide-handbook`；
- [x] 每次新增站点后更新 `public/apps.json`；
- [x] 每次上线后补充发布记录。

## 三、执行优先级

按以下顺序推进：

1. 先处理内容相对完整、能够独立访问的 intention 文档；
2. 再处理内容已经稳定的第二大脑子文档；
3. `quanttide-handbook` 放在子手册上线之后；
4. 内容仍是空骨架的仓库暂不发布，只做内容跟踪。

原则：先完整跑通一个仓库，再批量复制流程。

### 章程类文档特别规则

当 intention 文档、日志提炼内容或其他资料需要纳入 `quanttide-bylaw-of-business-entity` 等正式章程站点时，先按现有章程格式整理为草稿，并交由负责人审核后再发布。

章程格式统一遵循：

- 一级标题使用 `# 量潮科技<业务域><章程类型>章程`；
- 二级标题使用 `## 第X章 <章节名>`；
- 条款标题使用 `**第X条 条款名称**`，条号全文连续编号；
- 条款内并列内容优先使用 `（一）`、`（二）` 等中文编号；
- 正文避免使用“为什么做”“要什么”“下一步”“当前阶段”等提纲式或阶段性表达；
- 临时计划、历史演化和反直觉观察应抽象为长期稳定的定位、原则、边界或管理要求。

发布前必须先向负责人确认发布位置，包括目标站点、目录、TOC 分组、访问路径或 slug。未确认发布目录前，不接入线上目录、不推送触发部署。

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

1. `quanttide-intention-of-payment-engineering`（已提交）
2. `quanttide-intention-of-human-resources`（已提交）
3. `quanttide-intention-of-data-engineering`（已提交）

每个仓库先判断内容是否已经脱离“骨架状态”。如果只有少量占位 Markdown，则先补内容，不直接上线。

### 第 2 步：选一个仓库完成端到端上线

选择内容最完整的仓库，完成：

- 构建确认；
- workflow 配置；
- Secrets 配置；
- OSS 发布；
- 线上验收；
- 首页入口更新。

### 第 3 步：复制已验证流程

第一个仓库上线成功后，复用相同 workflow 和检查表，逐个处理其他仓库。每次只修改：

- 仓库对应的 `slug`；
- `BASE_URL`；
- OSS 上传路径；
- 首页名称和简介。

### 第 4 步：处理 handbook

等子手册完成并上线后，再重新评估 `quanttide-handbook`：

- 如果它只是外部链接聚合页，确认是否仍需要单独发布；
- 如果它承担统一目录职责，给它确定独立 slug；
- 确认所有内部链接指向已经上线的文档地址；
- 再按本计划执行部署和首页接入。

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
备注：将 `quanttide-intention-of-human-resources` 的培训意图整理为《量潮科技培训工作章程》，按 7 章 29 条章程格式接入人力资源目录。

仓库：`quanttide/quanttide-bylaw-of-business-entity`
发布位置：商务管理目录，`business/payment-engineering.md`
版本或 commit：`6bbe851`
发布地址：https://quanttide.github.io/quanttide-bylaw-of-business-entity/business/payment-engineering/
负责人：`ztzzh`
结果：GitHub Actions 构建和 GitHub Pages 部署成功，线上验收通过。
备注：将支付工程意图整理为《量潮科技支付工程章程》，按 6 章 21 条章程格式接入商务管理目录。

仓库：`quanttide/quanttide-bylaw-of-business-entity`
发布位置：量潮云目录，`qtcloud/metering.md`
版本或 commit：`8f5833a`
发布地址：https://quanttide.github.io/quanttide-bylaw-of-business-entity/qtcloud/metering/
负责人：`ztzzh`
结果：GitHub Actions 构建和 GitHub Pages 部署成功，线上验收通过。
备注：将 `quanttide-intention-of-data-engineering` 的商业模式整理为《量潮云计量计费章程》，按 7 章 31 条章程格式接入量潮云目录，并置于销售管理章程之前；补充按量执行与订阅、套餐等销售形态的边界，以及与《量潮科技支付工程章程》的账务衔接。

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

1. 继续盘点第二大脑下属的其他文档仓库；
2. 判断各仓库是否已经具备独立上线或接入既有站点的条件；
3. 发布前先确认目标站点、目录、TOC 分组和访问路径；
4. 上线成功后更新 `public/apps.json` 或目标站点目录，并补充本文件的发布记录；
5. 等子手册上线后，重新评估并处理 `quanttide-handbook`。
