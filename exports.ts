/** HELPERS **/

async function readDirNames(path: string) {
  const names: string[] = [];
  for await (const entry of Deno.readDir(path)) {
    if (!entry.isDirectory) continue;
    names.push(entry.name);
  }
  return names.sort((a, b) => a.localeCompare(b));
}

async function readFileNames(path: string) {
  const names: string[] = [];
  for await (const entry of Deno.readDir(path)) {
    if (entry.isDirectory) continue;
    if (!entry.name.endsWith(".ts")) continue;
    if (entry.name === "mod.ts") continue;
    names.push(entry.name);
  }
  return names.sort((a, b) => a.localeCompare(b));
}

/** MAIN **/

export async function* exportAllFromFiles(path: string) {
  for (const name of await readFileNames(path)) {
    yield `export * from "./${name}";\n`;
  }
}

export async function* exportAllAsNameFromDirs(path: string, ext = "ts") {
  for (const name of await readDirNames(path)) {
    yield `export * as ${name} from "./${name}/mod.${ext}";\n`;
  }
}

export async function* exportDefaultAsNameFromDirs(path: string, ext = "ts") {
  for (const name of await readDirNames(path)) {
    yield `export { default as ${name} } from "./${name}/mod.${ext}";\n`;
  }
}
