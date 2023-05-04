import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { listPastes, savePaste } from "../utils/db.ts";

export const handler: Handlers<[string, string][]> = {
  async GET(_, ctx) {
    const pastes = await listPastes();
    return ctx.render(pastes);
  },
  async POST(req) {
    const form = await req.formData();

    const content = form.get("content");
    if (typeof content !== "string" || content.length === 0) {
      return new Response("Invalid content", { status: 400 });
    }

    const id = await savePaste(content);

    return new Response("", {
      status: 302,
      headers: {
        Location: `/${id}`,
      },
    });
  },
};

export default function Home(props: PageProps<[string, string][]>) {
  return (
    <>
      <Head>
        <title>Denopaste</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-xl">Denopaste</h1>
        <form action="/" method="post" class="flex flex-col">
          <textarea name="content" class="border mt-4"></textarea>
          <button type="submit" class="bg-gray-200">Submit</button>
        </form>
        <ul class="list-disc ml-7">
          {props.data.map(([id, content]) => (
            <li>
              {content} <a href={`/${id}`}>Link</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
