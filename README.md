# 🎮 Games Hub

一个可复用的在线小游戏门户模板。网站负责品牌、搜索、分类、SEO、游戏详情和广告位布局；每个小游戏可以是 `public` 下的独立 HTML/CSS/JavaScript 应用，也可以通过外部 HTTPS 地址使用 iframe 嵌入。

模板参考了 [CrazyGames](https://www.crazygames.com)、[Pokerogue](https://pokerogue.io/) 和 [That's Not My Neighbor](https://thatsnotmyneighbor.org/) 这类在线游戏站的常见结构，适合继续添加 HTML5 游戏、模拟器页面或允许 iframe 嵌入的外部游戏。

## 功能概览

- 顶部品牌导航和全局游戏搜索
- 首页 Hero 区直接运行精选游戏 iframe
- 左侧 New Games、Hot Games 和分类导航
- 桌面端左右两侧广告位占位
- New Games、Popular Games、All Games 区块
- `/category/[category]` 静态分类页
- `/game/[slug]` 游戏详情页
- 详情页玩法说明和更多游戏
- 详情页分类内链、Breadcrumb、FAQ、特点和操作说明
- 本地游戏文件或外部 `iframeUrl`
- 游戏封面图、分类、New/Popular 标记
- 首页、详情页和分类页 SEO Metadata
- `WebSite`、`VideoGame`、`ItemList` 和 `BreadcrumbList` 结构化数据
- About、Contact、Terms、Privacy、Copyright 信任页面
- 自动生成 `sitemap.xml` 和 `robots.txt`
- Next.js 静态导出，适合部署到 Cloudflare Pages
- Tailwind CSS v4 和 TypeScript

## 技术栈

- Framework: [Next.js 16](https://nextjs.org)，App Router
- Language: [TypeScript](https://www.typescriptlang.org)
- UI: React 19
- Styling: [Tailwind CSS v4](https://tailwindcss.com)
- Package manager: pnpm 11
- Deployment: Cloudflare Pages static export
- Game runtime: 每个游戏可以使用 Vanilla HTML/CSS/JavaScript

## 开始使用

### 环境要求

- Node.js 20.9 或更高版本
- pnpm 11 或兼容版本

检查版本：

```bash
node --version
pnpm --version
```

### 安装依赖

在项目根目录执行：

```bash
pnpm install
```

项目使用 `pnpm-lock.yaml` 锁定依赖版本。请继续使用 pnpm，不要生成或提交 `package-lock.json`、`yarn.lock` 等其他锁文件。

### 启动开发环境

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000)。如果 3000 端口已经被占用，可以指定其他端口：

```bash
pnpm dev -- --port 3001
```

### 验证项目

```bash
# 运行模板契约和游戏目录测试
pnpm test

# 检查 TypeScript
pnpm exec tsc --noEmit

# 生成 Cloudflare Pages 静态文件
pnpm build

# 本地预览 out/ 目录
pnpm preview
```

`pnpm build` 成功后会生成 `out/` 目录。这个目录就是 Cloudflare Pages 的部署产物。

## 项目结构

```text
GAMES-HUB/
├── app/
│   ├── layout.tsx                  # 全局 Metadata、导航和页脚
│   ├── page.tsx                    # 首页门户布局
│   ├── globals.css                 # 全局颜色、布局和响应式样式
│   ├── about/page.tsx              # 网站介绍
│   ├── contact/page.tsx            # 联系方式说明
│   ├── terms/page.tsx              # 使用条款
│   ├── privacy/page.tsx            # 隐私说明
│   ├── copyright/page.tsx          # 版权和移除请求
│   ├── category/[category]/
│   │   └── page.tsx                # 静态分类页
│   ├── game/[slug]/
│   │   └── page.tsx                # 游戏详情、玩法说明和更多游戏
│   ├── robots.ts                    # robots.txt
│   └── sitemap.ts                  # sitemap.xml
├── components/
│   ├── SiteHeader.tsx              # 品牌和顶部搜索
│   ├── CategorySidebar.tsx         # 首页左侧分类导航
│   ├── FeaturedGame.tsx             # Hero 精选游戏和 iframe
│   ├── AdSlot.tsx                  # 广告位占位组件
│   ├── GamePlayer.tsx              # iframe 播放器和全屏按钮
│   ├── GameCard.tsx                # 游戏封面卡片
│   ├── GameBrowser.tsx             # All Games 搜索和分类过滤
│   └── GameSection.tsx             # New/Popular 游戏区块
│   ├── Breadcrumbs.tsx              # 可爬取面包屑导航
│   ├── GameGuide.tsx                # 玩法、特点、操作和 FAQ
│   ├── InfoPage.tsx                 # 信任页面通用布局
│   └── JsonLd.tsx                   # JSON-LD 输出
├── lib/
│   ├── games.ts                    # 游戏注册表、SEO 内容和分类工具函数
│   ├── seo.ts                      # 结构化数据生成函数
│   └── site.ts                     # Site URL and brand metadata
├── public/
│   └── games/
│       ├── quoridor/               # 示例独立 HTML 游戏
│       ├── color-tap/              # 示例反应小游戏
│       └── number-rush/            # 示例数字益智小游戏
├── tests/                          # 模板契约和游戏目录测试
├── .env.example                    # 环境变量示例
├── next.config.ts                  # output: export
├── package.json                    # pnpm scripts 和依赖
├── pnpm-lock.yaml                  # pnpm 锁文件
└── pnpm-workspace.yaml             # pnpm 构建许可配置
```

## 添加一个本地小游戏

### 1. 创建游戏目录

将游戏的静态文件放到：

```text
public/games/<slug>/
├── index.html
├── style.css
└── js/
    └── game.js
```

例如：

```text
public/games/space-runner/index.html
public/games/space-runner/style.css
public/games/space-runner/js/game.js
public/games/space-runner/cover.svg
```

游戏入口必须是 `index.html`。HTML 中引用 CSS、JavaScript 和图片时，优先使用相对路径：

```html
<link rel="stylesheet" href="style.css">
<script src="js/game.js"></script>
```

### 2. 准备封面图

将封面放在游戏目录中，例如：

```text
public/games/space-runner/cover.svg
```

在游戏注册表中使用公开 URL 路径：

```ts
thumbnail: "/games/space-runner/cover.svg",
```

注意：这里不写 `/public`。`public` 目录中的文件会直接从网站根路径提供。

### 3. 在 `lib/games.ts` 注册游戏

添加一个 `Game` 对象：

```ts
{
  slug: "space-runner",
  title: "Space Runner",
  tagline: "Dodge asteroids and keep your ship alive.",
  description:
    "A quick browser arcade game about steering through an endless asteroid field.",
  howToPlay: [
    "Use the arrow keys or WASD to move your ship.",
    "Avoid asteroids and collect energy cells.",
    "Survive as long as possible to increase your score.",
  ],
  icon: "🚀",
  thumbnail: "/games/space-runner/cover.svg",
  categories: ["Action", "Arcade"],
  iframeUrl: "/games/space-runner/index.html",
  isNew: true,
  isPopular: false,
},
```

保存后，游戏会自动出现在：

- 首页 Hero 或游戏区块
- New Games（`isNew: true`）
- Popular Games（`isPopular: true`）
- All Games
- 对应分类页
- `/game/space-runner/` 详情页
- 其他详情页的 More games 区块
- `sitemap.xml`

模板自带的 `Quoridor`、`Color Tap` 和 `Number Rush` 只用于演示完整的首页、分类页、详情页和相关推荐内链。你可以直接删除它们，或者替换成自己的游戏记录和 `public/games/<slug>/` 文件夹。

### 4. 字段说明

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `slug` | 是 | URL 标识，只使用小写字母、数字和短横线，例如 `space-runner` |
| `title` | 是 | 游戏名称 |
| `tagline` | 是 | 卡片上显示的简短描述 |
| `description` | 是 | 详情页和 SEO 使用的完整描述 |
| `howToPlay` | 是 | 详情页玩法说明，每个数组元素是一条步骤 |
| `features` | 是 | 游戏特点列表，用于详情页内容 |
| `controls` | 是 | 键盘、鼠标或触屏操作说明 |
| `faq` | 是 | 详情页常见问题和答案 |
| `icon` | 是 | 没有封面图时使用的 emoji 或短字符串 |
| `thumbnail` | 否 | 封面图 URL，通常指向 `/public` 下的文件 |
| `categories` | 是 | 一个或多个已有分类 |
| `iframeUrl` | 是 | 本地游戏路径或外部 HTTPS 地址 |
| `isNew` | 否 | `true` 时进入 New Games 区块并显示 New 标记 |
| `isPopular` | 否 | `true` 时进入 Popular Games，并可成为首页精选游戏 |
| `publishedAt` | 是 | `YYYY-MM-DD` 格式的首次发布日期，用于 JSON-LD |
| `updatedAt` | 是 | `YYYY-MM-DD` 格式的最后更新时间，用于 JSON-LD 和 sitemap |

### 5. 本地 iframe 和外部 iframe

本地游戏：

```ts
iframeUrl: "/games/space-runner/index.html",
```

外部游戏：

```ts
iframeUrl: "https://example.com/game/index.html",
```

外部站点必须允许被 iframe 嵌入。如果对方返回了 `X-Frame-Options: DENY`、`SAMEORIGIN`，或者 CSP 的 `frame-ancestors` 不允许当前域名，浏览器会阻止游戏显示。这属于对方服务器的嵌入策略，模板无法绕过。

## 添加新游戏分类

分类定义在 `lib/games.ts`：

```ts
export type Category =
  | "Board"
  | "Strategy"
  | "Puzzle"
  | "Action"
  | "Arcade";

export const categories: Category[] = [
  "Board",
  "Strategy",
  "Puzzle",
  "Action",
  "Arcade",
];
```

添加分类时需要同时修改这两个位置。例如添加 `Sports`：

```ts
export type Category =
  | "Board"
  | "Strategy"
  | "Puzzle"
  | "Action"
  | "Arcade"
  | "Sports";

export const categories: Category[] = [
  "Board",
  "Strategy",
  "Puzzle",
  "Action",
  "Arcade",
  "Sports",
];
```

分类侧栏、分类静态页、分类页 Metadata 和 sitemap 会根据 `categories` 自动生成。然后在游戏数据中使用：

```ts
categories: ["Sports"],
```

## 页面和数据关系

```text
lib/games.ts
      │
      ├── 首页 /
      │   ├── FeaturedGame + iframeUrl
      │   ├── CategorySidebar
      │   ├── New Games
      │   ├── Popular Games
      │   └── All Games + 搜索过滤
      │
      ├── 分类页 /category/[category]
      │   ├── 过滤出对应 categories 的游戏
      │   ├── 分类介绍和相关分类内链
      │   └── ItemList + BreadcrumbList
      │
      ├── 详情页 /game/[slug]
      │   ├── GamePlayer
      │   ├── description + 分类内链
      │   ├── howToPlay + features + controls + FAQ
      │   ├── VideoGame + BreadcrumbList
      │   └── getRelatedGames
      │
      ├── 信任页面
      │   ├── /about
      │   ├── /contact
      │   ├── /terms
      │   ├── /privacy
      │   └── /copyright
      │
      └── sitemap.xml
          ├── 首页
          ├── 分类页
          └── 游戏详情页
```

## SEO 配置

### 设置站点 URL

复制环境变量模板：

```bash
cp .env.example .env.local
```

修改 `.env.local`：

```env
NEXT_PUBLIC_SITE_URL=https://games.example.com
```

`NEXT_PUBLIC_SITE_URL` 用于生成：

- canonical URL
- Open Graph URL
- `sitemap.xml`
- `robots.txt`

### 设置网站名称

编辑 `lib/site.ts`：

```ts
export const siteName = "Games Hub";
```

全局标题、详情页标题模板和社交分享信息会使用这个名称。

### 游戏 SEO

详情页会根据 `title`、`description`、`categories`、`thumbnail`、日期和玩法内容自动生成页面 Metadata、`VideoGame` JSON-LD 和 Breadcrumb。分类页会生成 `ItemList` JSON-LD。每个游戏至少应填写清晰的：

- `title`
- `description`
- `thumbnail`
- `categories`
- `features`
- `controls`
- `faq`
- `publishedAt`
- `updatedAt`

封面图也会用作 Open Graph 和 Twitter 分享图片。

### 生产环境 URL

部署到 Cloudflare Pages 前必须配置真实站点地址：

```env
NEXT_PUBLIC_SITE_URL=https://games.example.com
```

这个变量会用于 canonical、Open Graph、JSON-LD、sitemap 和 robots。如果没有配置，开发环境会回退到 `http://localhost:3000`，不要把这个回退值用于生产部署。

### 信任页面

模板包含以下可直接修改的基础页面：

- `/about/`
- `/contact/`
- `/terms/`
- `/privacy/`
- `/copyright/`

这些页面是结构模板，发布前应替换为你的真实联系方式、隐私工具、广告说明和版权处理规则。

## 修改广告位

当前广告位是两侧的视觉占位组件，文件为 `components/AdSlot.tsx`：

```tsx
<aside className="ad-slot" aria-label="Advertisement">
  <span>Advertisement</span>
</aside>
```

接入广告平台时，可以在这个组件内部替换为广告脚本或广告容器。首页结构和广告位置不需要改变。

桌面端广告位在宽度达到 1280px 时显示，移动端会自动隐藏，避免挤压游戏区域。

## 修改品牌和首页样式

- 全局颜色、字体、断点和门户布局：`app/globals.css`
- 顶部品牌和搜索：`components/SiteHeader.tsx`
- 左侧分类导航：`components/CategorySidebar.tsx`
- Hero 游戏区域：`components/FeaturedGame.tsx`
- 卡片样式：`components/GameCard.tsx`
- 游戏详情内容：`app/game/[slug]/page.tsx`

推荐优先修改 CSS 变量：

```css
@theme {
  --color-bg: #fbf8f2;
  --color-panel: #fffdf9;
  --color-brand: #c9484b;
  --color-brand-2: #e9b568;
}
```

## Cloudflare Pages 部署

项目使用 Next.js static export：

```ts
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};
```

在 Cloudflare Pages 创建项目时填写：

| 设置项 | 值 |
| --- | --- |
| Framework preset | Next.js 或 None |
| Build command | `pnpm build` |
| Build output directory | `out` |
| Production environment variable | `NEXT_PUBLIC_SITE_URL=https://你的域名` |

如果构建环境没有自动识别 pnpm，请在部署环境中启用 pnpm 11，或使用项目 `package.json` 中的 `packageManager` 字段作为版本依据。

静态导出适合当前这种“游戏目录 + 元数据注册表”的结构。不要在页面中依赖运行时数据库、Next.js 服务端 API 或需要服务器持续运行的功能；这些能力不属于当前 Cloudflare Pages 静态模板范围。

## 常见问题

### 游戏 iframe 是空白

按以下顺序检查：

1. `iframeUrl` 是否正确。
2. 本地游戏入口是否真的叫 `index.html`。
3. 外部站点是否允许 iframe 嵌入。
4. 游戏资源中的 CSS、JS、图片是否使用正确的相对路径。
5. 浏览器开发者工具中是否有 CSP 或 `X-Frame-Options` 错误。

### 封面图 404

文件应该放在 `public/games/<slug>/`，代码中应该写：

```ts
thumbnail: "/games/<slug>/cover.svg",
```

不要写成：

```ts
thumbnail: "/public/games/<slug>/cover.svg",
```

### 分类页没有游戏

这是正常的空状态。分类页会显示分类标题、数量、说明和返回按钮。将游戏的 `categories` 设置为该分类后，游戏卡片会自动出现。

### 首页精选游戏不是我想要的游戏

首页会优先选择注册表中第一款 `isPopular: true` 的游戏；如果没有 Popular 游戏，则使用第一款注册的游戏。调整 `isPopular` 标记或 `games` 数组顺序即可。

### 详情页的 More games 为空

当前游戏会被排除。只要注册第二款游戏，详情页就会优先展示和当前游戏共享分类的游戏。

### 修改了代码但页面没有更新

重启开发服务器并清理构建产物：

```bash
pnpm dev
pnpm build
```

确认浏览器访问的是当前项目的 `localhost` 端口，而不是旧的预览标签页。

## 许可证

项目原始许可证为 [MIT](LICENSE)。添加到此模板中的游戏、图片、字体和第三方 iframe 内容，需要由使用者自行确认版权和授权范围。
