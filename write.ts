/** HELPERS **/

async function* genFile(generators: AsyncIterable<string>[]) {
  yield* `// Generated code. Do not edit.\n`;
  for (const gen of generators) {
    for await (const line of gen) {
      yield line;
    }
  }
}

/** MAIN **/

export async function write(
  file: string,
  ...generators: AsyncIterable<string>[]
) {
  const lines: string[] = [];
  for await (const line of genFile(generators)) {
    lines.push(line);
  }
  await Deno.writeTextFile(
    file,
    lines.join(""),
  );
}
