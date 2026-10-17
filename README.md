# Maxgift — 定制环保袋制造商官网

深圳包装制造商的英文企业站：8 条产品线、真实规格参数、工厂实拍、客户证言、询盘表单。

技术栈：**Next.js 16（App Router + Turbopack）· React 19 · TypeScript · Tailwind CSS v4**

线上仓库：https://github.com/smileit/maxgiftdsh

---

## 本地运行

项目带了一套便携工具链（Git / Node / pnpm），先加载环境：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
. .\.tools\env.ps1
```

然后：

```powershell
pnpm install
pnpm dev         # http://localhost:3000
```

生产构建：

```powershell
pnpm build
pnpm start
```

> `next dev` / `next build` 会 fork 子进程，DSH 默认沙箱禁止子进程使用命名管道，会报
> `spawn EPERM`。在本项目里跑这两条命令需要临时放宽权限，或在你自己的终端里跑。

---

## 页面

| 路由 | 内容 |
|---|---|
| `/` | 首页：全屏 banner、品牌介绍、8 条产品线、四项能力、工厂、材质故事、客户类型、证言、询盘 CTA |
| `/products` | 产品列表，按材质筛选（Non-woven / Woven / Insulated / Natural / Specialty） |
| `/products/[slug]` | 产品详情：多图切换、完整规格表、介绍、询盘 CTA、相关产品 |
| `/contact` | 询盘页：表单（姓名/公司/邮箱/数量/产品线/需求）+ 联系方式 + 工厂图 |

---

## 目录结构

```
my-site/
├─ public/img/               从原站迁过来的真实素材（产品实拍、厂房、图标）
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx          根布局：字体、SEO、页头页脚
│  │  ├─ page.tsx            首页
│  │  ├─ globals.css         设计 token + 自定义样式
│  │  ├─ products/
│  │  │  ├─ page.tsx         列表页（服务端，读 ?family=）
│  │  │  ├─ ProductsClient.tsx  材质筛选（客户端）
│  │  │  └─ [slug]/page.tsx  详情页（静态生成 + SEO）
│  │  └─ contact/page.tsx    询盘页
│  ├─ components/
│  │  ├─ Header.tsx          吸顶导航 + 跑马灯 + 移动端菜单
│  │  ├─ Footer.tsx          地址/电话/邮箱 + 产品与材质导航
│  │  ├─ ProductCard.tsx     产品卡（悬停缩放 + View specs）
│  │  ├─ ProductGallery.tsx  详情页图库
│  │  ├─ InquiryForm.tsx     询盘表单（校验 + 生成邮件草稿）
│  │  └─ Reveal.tsx          滚动进场动画
│  └─ lib/catalog.ts         产品数据 + 公司信息（唯一内容源）
├─ postcss.config.mjs        Tailwind v4 PostCSS 插件
└─ next.config.ts
```

---

## 改成别的内容

全部集中在 [`src/lib/catalog.ts`](src/lib/catalog.ts)：

| 字段 | 说明 |
|---|---|
| `company` | 邮箱、电话、地址、贸易条款 |
| `families` | 材质分类（筛选用） |
| `products[].slug` | URL：`/products/<slug>` |
| `products[].title` / `blurb` | 品名、一句话卖点 |
| `products[].code` | 型号，如 `NWB-B24001` |
| `products[].images` | `/img/xxx.jpg`，第一张作封面 |
| `products[].intro` | 详情页正文段落数组 |
| `products[].specs` | 规格表（标签/值数组，顺序即展示顺序） |
| `products[].featured` | 是否进 `featured` 集合 |

### 换产品图

把图片放进 `public/img/`，在 `images` 里写 `/img/文件名.jpg` 即可。`next/image` 会自动压缩成合适尺寸（实测 89 KB 原图 → 38 KB 优化版）。

---

## 设计

| 项 | 取值 |
|---|---|
| 底色 `paper` | `#f6f3ec` |
| 深色 `ink` | `#14201a` 墨绿黑 |
| 主色 `moss` | `#2f5d43` |
| 强调 `kraft` | `#b9863f` 牛皮纸色 |
| 辅助 `sage` | `#7d8f72` |
| 标题 | Fraunces（衬线） |
| 正文 | Inter |
| 动效 | `cubic-bezier(0.22,1,0.36,1)` · 0.5–0.9s |

配色改 `src/app/globals.css` 的 `@theme`，一处生效全站。

---

## 交互

- 首页 banner 全屏 + 渐变遮罩，内容底部对齐
- 顶部信息跑马灯，导航滚动后切毛玻璃
- 产品卡悬停：图片缓慢放大 + "View specs" 从底部滑出
- 列表页材质筛选条吸顶
- 详情页多图切换（6 张缩略图）、规格表、相关产品
- 询盘表单：必填校验、邮箱格式校验、提交后生成邮件草稿（`mailto:`）并给出成功态
- 全站滚动进场动画，`prefers-reduced-motion` 自动关闭

---

## 部署到 Vercel

1. https://vercel.com/new → 选 `smileit/maxgiftdsh`
2. 自动识别 Next.js，**无需环境变量**
3. Deploy，之后每次 `git push` 自动重新部署

---

## 已知环境限制

- `winget` 在沙箱里不可用（命名管道受限），Git 用便携版 MinGit
- PowerShell 的 HTTPS 请求会失败（.NET TLS 握手被挡），下载走 Node
- pnpm 缓存在工作区内（根目录 `.npmrc`），并用 `nodeLinker: hoisted` 规避 Windows 符号链接栈溢出
- `@tailwindcss/turbopack` 会吞掉 globals.css 自定义规则，已换成 `@tailwindcss/postcss`
- `git push` 需要放宽权限，否则子进程管道失败
