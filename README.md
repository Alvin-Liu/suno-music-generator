<p align="center">
  <img alt="Suno Music Generator" src="https://github.com/Alvin-Liu/suno-music-generator/blob/master/public/logo.png" width="200" style="margin-bottom: 10px;">
</p>

# Suno Music Generator

[English](./README_EN.md) | [简体中文](./README.md)

这是一个基于 NextJS 开发的非官方 [suno.ai](https://www.suno.ai) 音乐生成网站。可以通过用户输入的 prompt 在一分钟左右的时间生成你想要的歌曲。

## Live Demo

最新版本：[https://sunomusic.fun](https://sunomusic.fun)
v1 版本：[https://v1.sunomusic.fun](https://v1.sunomusic.fun) 

开源版本对应 v1 版本，最新版本正在优化中，详情可加微信了解：chengzisangeban。

## 工作原理

通过 JavaScript 逆向工程解析 suno.ai 生成歌曲的 API，并使用 [Lemon Squeezy](https://www.lemonsqueezy.com/) 进行支付。同时，项目内置了 token 更新和保活功能，无需担心 token 过期。

## 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Alvin-Liu/suno-music-generator)

## 快速开始

1. 获取 app.suno.ai 账户的 cookie 

找到包含关键词 "client?_clerk_js_version" 的请求。找到请求的 Cookie 部分，并复制 Cookie 的值

2. 克隆项目

```shell
git clone https://github.com/Alvin-Liu/suno-music-generator.git
```

3. 安装依赖

```shell
cd suno-music-generator
pnpm install
```

4. 初始化数据库

使用本地数据库： [local postgres](https://wiki.postgresql.org/wiki/Homebrew)
或者使用在线数据库： [vercel-postgres](https://vercel.com/docs/storage/vercel-postgres)

在 `data/install.sql` 文件中复制创建数据库用到的 sql

5. 设置环境变量

在项目跟目录添加 `.env.local` 文件，填入如下配置：

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

SUNO_COOKIE=""

LEMON_SQUEEZY_HOST=https://api.lemonsqueezy.com/v1
LEMON_SQUEEZY_API_KEY=
LEMON_SQUEEZY_STORE_ID=
LEMON_SQUEEZY_PRODUCT_ID=
LEMON_SQUEEZY_MEMBERSHIP_MONTHLY_VARIANT_ID=
LEMON_SQUEEZY_MEMBERSHIP_SINGLE_TIME_VARIANT_ID=
LEMONS_SQUEEZY_SIGNATURE_SECRET=

POSTGRES_URL=
```

SUNO_COOKIE 是你第一步获取的 cookie 值

6. 本地开发

```shell
pnpm dev
```

打开预览：`http://localhost:3000` 

## 致谢

- [Suno AI](https://www.suno.ai)
- [nextjs](https://nextjs.org/docs)
- [clerk](https://clerk.com/docs/quickstarts/nextjs)
- [node-postgres](https://node-postgres.com/)
- [tailwindcss](https://tailwindcss.com/)
- [Lemon Squeezy](https://www.lemonsqueezy.com/)
- [aiwallpaper](https://github.com/all-in-aigc/aiwallpaper)

## 其他

你可以通过以下 Twitter 链接与我联系：
[https://twitter.com/alvinliux](https://twitter.com/alvinliux) 。作为 Twitter 新人，我非常真诚地请求你的关注和支持。

如果此项目对你有所帮助，请考虑请我喝杯咖啡

<a href="https://www.buymeacoffee.com/vnorange" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="40" width="174"></a>
