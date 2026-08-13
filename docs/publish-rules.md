# 量潮文档中心发布规则

> 任何文档仓库上线到 qtdocs-site 的规范。批量上线时遵循此规则。

---

## 一、架构

```
各文档仓库（内容源）
    ↓ GitHub Actions（push main / Release 触发）
MyST 构建（BASE_URL=/<slug>/）
    ↓ ossutil 上传
OSS 桶 qtdocs-site（SupportSubDir=true）
    ├── /<app-slug>/index.html   # 各应用固定目录
    └── /index.html              # 统一首页（apps.json 导航）
    ↓ CDN（docs.quanttide.com，泛域名 SSL）
用户访问
```

## 二、发布规则

| 规则 | 要求 |
|------|------|
| 桶名 | `qtdocs-site`（唯一部署桶） |
| 路径 | `/<app-slug>/`（小写连字符，无中文） |
| index.html | 每个应用必须有 |
| BASE_URL | MyST 构建必须设 `BASE_URL=/<slug>/`（否则资源绝对路径 404） |
| 清理 | 上传前 `ossutil rm` 旧目录（防残留） |
| 缓存 | `Cache-Control: public,max-age=300`（发布后 5 分钟自然过期） |
| 记录 | 每次发布记录版本、时间、负责人 |

## 三、上线步骤（新仓库）

1. **确认构建方式**：仓库根有 `myst.yml` → MyST 项目，可直接构建
2. **复制 workflow**：从已上线仓库复制 `.github/workflows/deploy-oss.yml`，改两处：
   - `BASE_URL: /<slug>/`
   - `ossutil cp ./_build/html/ oss://qtdocs-site/<slug>/`
3. **配置 Secrets**（仓库 Settings → Secrets and variables → Actions）：
   - `ALIYUN_ACCESS_KEY_ID`
   - `ALIYUN_ACCESS_KEY_SECRET`
4. **推送触发 CI**：push main 自动构建部署
5. **更新首页**：qtdocs 仓库 `public/apps.json` 加条目（slug/name/description）
6. **验证**：`https://docs.quanttide.com/<slug>/` 返回 200

## 四、Workflow 模板

```yaml
name: MyST Deploy to OSS (qtdocs-site)

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  BASE_URL: /<slug>

jobs:
  deploy-oss:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18.x
      - name: Install MyST Markdown
        run: npm install -g mystmd
      - name: Build HTML Assets (OSS base url)
        run: myst build --html
      - uses: manyuanrong/setup-ossutil@v3.0
        with:
          endpoint: oss-cn-hangzhou.aliyuncs.com
          access-key-id: ${{ secrets.ALIYUN_ACCESS_KEY_ID }}
          access-key-secret: ${{ secrets.ALIYUN_ACCESS_KEY_SECRET }}
      - name: Upload to OSS
        run: |
          ossutil rm oss://qtdocs-site/<slug>/ -r -f || true
          ossutil cp ./_build/html/ oss://qtdocs-site/<slug>/ -r -f --meta=Cache-Control:public,max-age=300
```

## 五、已上线清单

| slug | 文档 | 备注 |
|------|------|------|
| quanttide-tech | 量潮科技第二大脑 | 主文档 |
| quanttide-intention-of-business-entity | 量潮科技工作意图 | 考核用 |
| quanttide-intention-of-payment-engineering | 量潮支付工程意图 | 支付工程意图 |

## 六、常见问题

| 问题 | 解决 |
|------|------|
| 页面空白 | 检查 BASE_URL 是否设置（资源 404）；检查 SupportSubDir |
| 子目录访问回退首页 | OSS 静态托管 SupportSubDir 必须为 true |
| 发布后 CDN 不更新 | 重新部署（ETag 变化）或等 5 分钟 TTL |
| workflow 报 setup-ossutil 错误 | 版本必须 `@v3.0`（精确 tag） |
