# Maxgift — 电商独立站

一个可以直接上线的高端礼品电商前端：首页、商品列表、商品详情、购物袋抽屉、结算页。

技术栈：**Next.js 16（App Router + Turbopack）· React 19 · TypeScript · Tailwind CSS v4**

---

## 本地运行

项目里已经带了一套便携工具链（Git / Node / pnpm），先加载环境变量：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
. .\.tools\env.ps1      # 在 my-site 目录下执行；在上一级执行也用这个路径
```

然后：

```powershell
pnpm install     # 首次
pnpm dev         # http://localhost:3000
```

生产构建：

```powershell
pnpm build
pnpm start
```

> 注意：`next dev` / `next build` 会 fork 子进程，DSH 的默认沙箱禁止子进程使用命名管道，
> 会报 `spawn EPERM`。在本项目里跑这两条命令需要临时放宽权限，或直接在你自己的终端里跑。

---

## 目录结构

```
my-site/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx          根布局：字体、SEO、购物车 Provider、页头页脚
│  │  ├─ page.tsx            首页
│  │  ├─ globals.css         设计 token（配色、字体、动效）+ 自定义样式
│  │  ├─ shop/
│  │  │  ├─ page.tsx         列表页（服务端，读 ?c= 分类）
│  │  │  └─ ShopClient.tsx   筛选 + 排序（客户端）
│  │  ├─ product/[slug]/
│  │  │  └─ page.tsx         详情页（静态生成 + SEO metadata）
│  │  └─ checkout/page.tsx   结算页（演示，不收款）
│  ├─ components/
│  │  ├─ cart.tsx            购物车 Context + localStorage + 抽屉 + Toast
│  │  ├─ Header.tsx          吸顶导航、跑马灯、移动端菜单
│  │  ├─ ProductCard.tsx     商品卡（悬停 Quick add）
│  │  ├─ ProductDetail.tsx   图库、规格、加购、手风琴
│  │  ├─ ProductArt.tsx      8 个手绘 SVG 商品插画
│  │  ├─ Reveal.tsx          滚动进场动画
│  │  └─ Newsletter.tsx      订阅表单（含校验）
│  └─ lib/products.ts        商品与分类数据（唯一内容源）
├─ postcss.config.mjs        Tailwind v4 的 PostCSS 插件
└─ next.config.ts
```

---

## 设计语言

| 项 | 取值 |
|---|---|
| 底色 `paper` | `#f7f2e8` 暖米白 |
| 卡片色 `cream` | `#fcfaf5` |
| 正文 `ink` | `#16130f` 近黑 |
| 强调 `clay` | `#b0502c` 陶土红 |
| 辅助 `sage` | `#6d7b60` 鼠尾草绿 |
| 分割线 `line` | `#ddd3c0` |
| 标题字体 | Fraunces（衬线，带 SOFT/WONK 轴） |
| 正文字体 | Inter |
| 圆角 | 2–3px，克制 |
| 动效 | `cubic-bezier(0.22,1,0.36,1)`，0.5–0.9s |

配色和字体都在 `src/app/globals.css` 的 `@theme` 里，改一处全站生效。

---

## 换成你自己的内容

**所有商品都在 [`src/lib/products.ts`](src/lib/products.ts)**，改这个文件就能换掉全站内容：

| 字段 | 说明 |
|---|---|
| `slug` | URL，`/product/<slug>`，同时是购物车去重键 |
| `name` / `tagline` / `description` | 商品名、一句话卖点、详情描述 |
| `price` / `compareAt` | 现价、划线原价（可选） |
| `category` | `gift-sets` / `home-scent` / `kitchen` / `desk` |
| `details[]` | 详情页手风琴里的条目 |
| `materials` / `colorway` | 材质、颜色名 |
| `tint` / `ink` | 商品卡背景色、插画墨色（两个十六进制值） |
| `art` | 插画类型：`box` `candle` `diffuser` `throw` `kettle` `cup` `lamp` `journal` |
| `badge` | `Bestseller` / `New` / `Limited` |

### 换成真实商品图

现在用的是手绘 SVG 插画（`ProductArt.tsx`），不依赖任何外部图片。要换成实拍图：

1. 把图片放进 `public/products/`
2. 在 `ProductCard.tsx` 和 `ProductDetail.tsx` 里把 `<ProductArt />` 换成 `next/image` 的 `<Image />`
3. 给 `Product` 类型加一个 `image: string` 字段

---

## 交互清单

- 吸顶导航滚动后变毛玻璃，顶部信息跑马灯
- 商品卡悬停：插画上浮放大 + Quick add 滑出 + Toast 提示
- 购物袋抽屉：右侧滑入、数量步进、免运费进度条、本地持久化
- 列表页：分类筛选 + 排序（价格/评分），筛选条吸顶
- 详情页：三视图切换、数量步进、加购、手风琴展开
- 全站滚动进场动画，`prefers-reduced-motion` 自动降级

---

## 上线到 Vercel

1. 把代码推到 GitHub（见下方命令）
2. 打开 https://vercel.com/new ，选这个仓库
3. 框架自动识别为 Next.js，**不需要填环境变量**
4. 点 Deploy，之后每次 `git push` 自动重新部署

---

## 推到 GitHub

```powershell
git remote add origin git@github.com:<你的用户名>/maxgift.git
git push -u origin main
```

首次使用需要先把公钥加到 GitHub：Settings → SSH and GPG keys → New SSH key。

---

## 已知的环境限制（这台机器）

- `winget` 在沙箱里不可用（命名管道受限），Git 是用便携版 MinGit 装的
- PowerShell 的 HTTPS 请求会失败（.NET TLS 握手被挡），下载要走 Node
- `pnpm` 的缓存/存储目录指向了工作区内，见根目录 `.npmrc`
- pnpm 在 Windows 上的符号链接会栈溢出，所以用了 `nodeLinker: hoisted`
- `@tailwindcss/turbopack` 这个 loader 会吞掉 globals.css 里的自定义规则，已换成
  `@tailwindcss/postcss` + `postcss.config.mjs`
