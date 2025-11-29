# Bug Repro Setup Notes

## Project Structure

This is a TurboRepo monorepo for reproducing a bug with React Router v7 on Cloudflare.

```
bug-repro/
├── apps/
│   └── web/              # React Router v7 app for Cloudflare
└── packages/
    └── lib/              # Shared TypeScript types library
```

## Components

### 1. React Router v7 App (`apps/web/`)

**Stack:**
- React Router v7 (v7.9.2)
- React 19.1.1
- Cloudflare Workers runtime (@react-router/cloudflare)
- Vite for bundling
- Tailwind CSS v4
- TypeScript

**Key Files:**
- `react-router.config.ts` - RRv7 config (SSR enabled, ESM server format, neutral platform)
- `wrangler.toml` - Cloudflare Workers config
- `vite.config.ts` - Vite bundler config
- `package.json` - Dependencies and scripts

**Scripts:**
- `pnpm dev` - Start dev server
- `pnpm build` - Build for production
- `pnpm deploy` - Build and deploy to Cloudflare
- `pnpm typecheck` - Type checking

**Cloudflare Config:**
- Worker name: `bug-repro-web` (dev), `bug-repro-web-prod` (production)
- Compatibility: Node.js compat enabled
- Entry: `./build/server/index.js`

### 2. Shared Types Library (`packages/lib/`)

**Purpose:** Export shared TypeScript types and utilities

**Exports:**
- `User` interface (id, name, email)
- `createUser()` - User factory function
- `formatUserName()` - User display formatter
- `validateEmail()` - Email validation

**Build:**
- TypeScript compilation to ESM
- Output: `dist/index.js` and `dist/index.d.ts`
- Scripts: `pnpm build`, `pnpm dev` (watch mode), `pnpm typecheck`

## TurboRepo Configuration

**Workspace Manager:** pnpm v9.0.0

**Workspaces:** Defined in `pnpm-workspace.yaml`
- `apps/*`
- `packages/*`

**Turbo Tasks:**
- `build` - Builds all packages with dependencies
- `dev` - Runs dev servers (persistent, no cache)
- `lint` - Linting
- `typecheck` - Type checking

## Dependencies

**Root:**
- turbo: ^2.6.1
- typescript: 5.9.2
- prettier: ^3.6.2

**apps/web depends on:**
- `@bug-repro/lib` (workspace dependency)
- React Router v7 packages
- Cloudflare adapter
- Vite + TypeScript + Tailwind

**packages/lib depends on:**
- TypeScript compiler
- `@repo/typescript-config` (workspace TypeScript config)

## Quick Start

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Build all packages:
   ```bash
   pnpm build
   ```

3. Run dev server:
   ```bash
   pnpm dev
   ```

4. Deploy to Cloudflare:
   ```bash
   cd apps/web
   pnpm deploy
   ```

## Current State

✅ TurboRepo monorepo set up
✅ React Router v7 app configured
✅ Cloudflare Workers integration ready
✅ Shared TypeScript library created
✅ Package dependencies linked via workspace protocol
✅ Build pipeline configured

## Next Steps

- [ ] Identify and reproduce the specific bug
- [ ] Add minimal reproduction case
- [ ] Document expected vs actual behavior
- [ ] Test deployment to Cloudflare

## Notes

- Using React 19 (latest)
- RRv7 configured with SSR enabled
- Cloudflare Workers using Node.js compatibility mode
- All packages use ESM modules
- TypeScript strict mode enabled
