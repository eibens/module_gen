# eibens/module_gen

Utilities for generating generic TypeScript modules for
[Deno](https://deno.land).

<!-- badges -->

[![License](https://img.shields.io/github/license/eibens/module_gen?color=informational)](LICENSE)
[![Repository](https://img.shields.io/github/v/tag/eibens/module_gen?label&logo=github)](https://github.com/eibens/module_gen)
[![ci](https://github.com/eibens/module_gen/actions/workflows/ci.yml/badge.svg)](https://github.com/eibens/module_gen/actions/workflows/ci.yml)

<!-- /badges -->

## Usage

Assume a project has a `utils` folder with a bunch of directories and top-level
TypeScript files.

```txt
- utils
  - hello
    - mod.ts
  - world
    - mod.ts
  - foo.ts
  - bar.ts
```

The provided functions can scan the `utils` directory for sub-directories and
for top-level TypeScript files and generate a new `utils/mod.ts` module.

```ts
import { exportAllFromFiles, write } from "./mod.ts";

await write(
  import.meta.resolve("./utils/mod.ts"),
  exportAllAsNameFromDirs(import.meta.resolve("./utils")),
  exportAllFromFiles(import.meta.resolve("./utils")),
);
```

After running the code above, the `utils/mod.ts` module will contain exports for
all module files.

```ts
// Generated code. Do not edit.
export * as hello from "./hello/mod.ts";
export * as world from "./world/mod.ts";
export * from "./bar.ts";
export * from "./foo.ts";
```

Take a look into the [example](example) folder to see this in action.

## Future Work

This is still an early prototype. It does not support file patterns, custom
extensions, reliable detection of modules, and probably a lot of other common
options and features.
