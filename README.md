# Maxgift Pro — 外贸独立站（定制环保袋）

深圳包装厂面向海外买家的英文站：首页 + 产品列表 + 产品详情 + 询盘页。
内容取自参考仓库 `smileit/maxgift`（旧 CRA 站），本仓库是重新设计与实现。

- 技术栈：**Next.js 16（App Router）· React 19 · TypeScript · Tailwind v4 + 自建设计系统**
- 线上仓库：https://github.com/smileit/maxgiftdsh

---

## 本地运行

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
. .\.tools\env.ps1          # 加载便携工具链（node / pnpm / git）

cd my-site
pnpm install
pnpm dev                    # http://localhost:3000
```

生产构建：

```powershell
pnpm build
pnpm start -p 3100          # 本地预览生产版本
```

> 注意：本项目在 DSH 默认文件沙箱下，`next dev` / `next build` 会因命名管道限制报 `spawn EPERM`，
> 需要放宽到 full access 才能跑。生产构建的交互（滚动、筛选、表单）必须用 `next start` 验证，
> dev server 在本机环境下 HMR socket 不可用会导致水合失败。

---

## 页面

| 路由 | 内容 |
|---|---|
| `/` | Hero、信任条、五大材质、8 条产品线、能力、流程 5 步 + 定制项、工厂、客户评价、FAQ、询盘表单 |
| `/products` | 产品列表，按材质筛选（客户端，页面静态） |
| `/products/[slug]` | 详情：图库 + 缩略图、关键参数、正文、规格表、定制/打样/物流手风琴、相关产品 |
| `/contact` | 询盘页：联系方式 + 表单；支持 `/contact?product=slug` 自动预填产品 |

全部页面静态预渲染（`○` / 部分预渲染 `◐`），无数据库依赖。

---

## 设计系统

| 项 | 取值 |
|---|---|
| 底色 `paper` | `#fbfaf7` |
| 正文 `ink` | `#0d1512` |
| 主色 `forest` | `#0f4a33`（来自 logo 的绿色系） |
| 深色 `forest-deep` | `#0a3021` |
| 强调 `accent` | `#c2663c` 赤陶 |
| 标题字体 | Archivo（700/800，紧凑字距） |
| 正文字体 | Inter |
| 圆角 | 2px，工业感 |

字体自托管在 `public/fonts/`，不依赖 Google Fonts CDN。

---

## 改成你自己的内容

**所有文案和产品数据集中在 [`src/lib/catalog.ts`](src/lib/catalog.ts)：**

| 导出 | 用途 |
|---|---|
| `company` | 邮箱、电话、地址、贸易条款 |
| `families` | 材质分类（筛选用） |
| `products` | 8 条产品线：slug / 标题 / 型号 / 材质 / 图片 / 正文 / 规格表 |
| `customisation` | 定制项（尺寸、颜色、印刷、手柄、包装） |
| `processSteps` | 流程 5 步 |
| `faqs` | 常见问题 |
| `quotes` | 客户评价 |
| `trustPoints` | 首页信任条 |

产品结构：

```ts
{
  slug: "non-woven-bag",
  title: "Non Woven Bag",
  code: "NWB-B24001",
  family: "non-woven",
  blurb: "Foldable and tote styles, printed edge to edge",
  images: ["/img/nwb001.jpg", ...],   // public/img 下，第一张作封面
  intro: ["第一段", "第二段"],
  specs: [{ label: "Material", value: "Non woven" }, ...],
  featured: true,
}
```

规格参数逐条照搬自参考站 `product-detail/data.js`，未改写。

---

## 目录结构

```
my-site/
├─ public/
│  ├─ img/                 产品实拍、工厂图、图标（来自参考站）
│  └─ fonts/               archivo.woff2 / inter.woff2
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx        根布局 + SEO
│  │  ├─ page.tsx          首页
│  │  ├─ globals.css       设计系统 + 全部样式
│  │  ├─ products/         列表页 + 详情页
│  │  └─ contact/          询盘页
│  ├─ components/          Header / Footer / ProductCard / ProductGallery / InquiryForm / Reveal
│  └─ lib/catalog.ts       全站内容
└─ next.config.ts
```

---

## 部署

Vercel：导入仓库即可，框架自动识别，无需环境变量。
纯静态产物也可直接放 Netlify / Cloudflare Pages / 任意对象存储。

---

## 换真实素材时注意

- 产品图现在混用了不同背景（白底、灰底、场景照），统一成同一种拍摄风格观感会再上一个档次
- `c1/c2/c3.png`（客户场景）是旧图库照片，换成真实客户/出货照更有说服力
- 首页 Hero 用的是 `nwb002.jpg`，换一张最能代表产品的图即可