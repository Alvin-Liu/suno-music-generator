<p align="center">
  <img alt="Suno Music Generator" src="https://github.com/Alvin-Liu/suno-music-generator/blob/master/public/logo.png" width="200" style="margin-bottom: 10px;">
</p>

# Suno Music Generator

[English](./README.md) | [简体中文](./README_CN.md)

This is an unofficial development based on NextJS [suno.ai](https://www.suno.ai) Music generation website. A song, lyrics, etc. can be generated through the prompt input by the user. At the same time, it has built-in token update and preservation functions, so there is no need to worry about token expiration.

## Live Demo

[https://sunomusic.fun](https://sunomusic.fun)

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

4. set environmental values

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

5. local development

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

## Other Things

You can contact me via the following Twitter link: https://twitter.com/Alvin_Liu_9527. As a newcomer, I sincerely ask for your attention and follow.

If this project is helpful to you, please consider buying me a coffee. 

<a href="https://www.buymeacoffee.com/vnorange" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="40" width="174"></a>
