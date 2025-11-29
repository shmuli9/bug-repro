# Bug Repro

For issue: [11454](https://github.com/cloudflare/workers-sdk/issues/11454)

To repro:

```shell
pnpm i
pnpm run typecheck
```

To fix, modify ./packages/types/src/worker-configuration.d.ts:

```ts
declare namespace Cloudflare {
-   interface GlobalProps {
-     mainModule: typeof import("../../../apps/web/workers/app");
-   }
+  // interface GlobalProps {
+  //   mainModule: typeof import("../../../apps/web/workers/app");
+  // }
  interface Env {
    VALUE_FROM_CLOUDFLARE: string;
  }
}
```
