<p align="center">
  <img alt="Suno Music Generator" src="https://github.com/Alvin-Liu/suno-music-generator/blob/master/public/logo.png" width="200" style="margin-bottom: 10px;">
</p>

# Suno Music Generator

[English](./README_EN.md) | [简体中文](./README.md)

This is an unofficial music generation website developed based on NextJS for [suno.ai](https://www.suno.ai). It can generate the desired song within approximately one minute based on the prompt entered by the user.

The project utilizes JavaScript reverse engineering to analyze the API used by suno.ai to generate songs. Payments are processed through Lemon Squeezy. Additionally, the project incorporates token renewal and maintenance functionality to eliminate the need for concerns about token expiration.

## Live Demo

The latest version：[https://sunomusic.fun](https://sunomusic.fun)
v1 version：[https://v1.sunomusic.fun](https://v1.sunomusic.fun) 

The open source version corresponds to the v1 version. The latest version is being optimized. Please contact us via email for details. My email is: alvin.liu.lm@gmail.com

## One-click Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Alvin-Liu/suno-music-generator)

## Quick Start

1. obtain the cookie of your app.suno.ai account

Locate the request that contains the keyword "client?_clerk_js_version". Navigate to the Cookie section, hover your mouse over it, and copy the value of the Cookie.

2. clone project

```shell
git clone https://github.com/Alvin-Liu/suno-music-generator.git
```

3. install dependencies

```shell
cd suno-music-generator
pnpm install
```

4. init database

create your database use [local postgres](https://wiki.postgresql.org/wiki/Homebrew) or [vercel-postgres](https://vercel.com/docs/storage/vercel-postgres)

create tables from sql at `data/install.sql`

5. set environmental values

put `.env.local` under `suno-music-generator` root dir with values list below

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

SUNO_COOKIE is the cookie value you obtained in the first step

6. local development

```shell
pnpm dev
```

open `http://localhost:3000` for preview

## Credit to

- [Suno AI](https://www.suno.ai)
- [nextjs](https://nextjs.org/docs)
- [clerk](https://clerk.com/docs/quickstarts/nextjs)
- [node-postgres](https://node-postgres.com/)
- [tailwindcss](https://tailwindcss.com/)
- [Lemon Squeezy](https://www.lemonsqueezy.com/)
- [aiwallpaper](https://github.com/all-in-aigc/aiwallpaper)

## Other Things

You can contact me via the following Twitter link: [https://twitter.com/alvinliux](https://twitter.com/alvinliux). As a newcomer, I sincerely ask for your attention and follow.

If this project is helpful to you, please consider buying me a coffee. 

<a href="https://www.buymeacoffee.com/vnorange" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="40" width="174"></a>
