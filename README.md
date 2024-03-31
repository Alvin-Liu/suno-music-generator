# Suno Music Generator

Suno Music Generator by [sunomusic.fun](https://sunomusic.fun)

## Live Demo

[https://sunomusic.fun](https://sunomusic.fun)

## Quick Start

1. obtain the cookie of your app.suno.ai account

Locate the request that contains the keyword "client?_clerk_js_version". Navigate to the Cookie section, hover your mouse over it, and copy the value of the Cookie.

2. clone project

```shell
git clone https://github.com/suno-music-generator.git
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

## Other Things

You can contact me via the following Twitter link: https://twitter.com/Alvin_Liu_9527. As a newcomer, I sincerely ask for your attention and follow.

If this project is helpful to you, please consider buying me a coffee. 

<a href="https://www.buymeacoffee.com/vnorange" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="40" width="174"></a>
