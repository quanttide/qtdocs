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
- [ ] 评估并上线 `quanttide-intention-of-human-resources`；
- [ ] 评估并上线 `quanttide-intention-of-data-engineering`；
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

1. `quanttide-intention-of-payment-engineering`
2. `quanttide-intention-of-human-resources`
3. `quanttide-intention-of-data-engineering`

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

1. 盘点 `quanttide-intention-of-human-resources`；
2. 判断是否已经具备独立上线条件；
3. 如果具备条件，准备并验证它的 OSS 部署 workflow；
4. 上线成功后更新 `public/apps.json` 和本文件的发布记录；
5. 再按相同流程处理 data-engineering。
