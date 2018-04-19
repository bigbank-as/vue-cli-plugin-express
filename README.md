# vue-cli Express plugin

## Features

- Logging (winston & morgan)
- `helmet` for security headers
- `helmet-csp` for [Content-Security Policies](https://developer.mozilla.org/en-US/docs/Glossary/CSP)
- Session store (`redis` or file-based)

Every feature is opt-in.

## Environment variables

| Variable | Default |
|----------|---------|
| NODE_ENV | |
| PORT     | 4000    |
| FORMATTED_UPLOAD_LIMIT | '20MB' |
| COOKIE_SECRET | 'c00k1es3cr3t' |
| SESSION_TIMEOUT | 3 * 60 * 1000 |
| EXPIRATION_PROMPT_TIMEOUT | 30 * 1000 |

TODO:
- Add a prompt for every feature
- Add a prompt for what to use as Express session store (file vs redis for example)
- Remove inlining of webpack manifest chunk (see [this issue](https://github.com/vuejs/vue-cli/issues/1074#issuecomment-378744354))
- Create logger helper repo/package and import+use in Express (winston & morgan)
