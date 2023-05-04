const kv = await Deno.openKv();

export async function savePaste(content: string): Promise<string> {
  const id = Math.random().toString(36).slice(2);
  await kv.set(["pastes", id], content);
  return id;
}

export async function getPaste(id: string): Promise<string | null> {
  const res = await kv.get<string>(["pastes", id]);
  return res.value;
}

export async function listPastes(): Promise<[string, string][]> {
  const returns: [string, string][] = [];
  for await (
    const { key, value } of kv.list<string>({ prefix: ["pastes"] }, {
      limit: 30,
    })
  ) {
    returns.push([key[1] as string, value]);
  }
  return returns;
}
