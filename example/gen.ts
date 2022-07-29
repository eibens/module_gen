/** LOCALS **/

import { exportAllAsNameFromDirs, exportAllFromFiles, write } from "../mod.ts";

if (import.meta.main) {
  await write(
    "example/utils/mod.ts",
    exportAllAsNameFromDirs("example/utils"),
    exportAllFromFiles("example/utils"),
  );
}
