import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPaste } from "../utils/db.ts";

export const handler: Handlers<string> = {
  async GET(_, ctx) {
    const id = ctx.params.id;
    const content = await getPaste(id);
    if (content === null) {
      return ctx.renderNotFound();
    }
    return ctx.render(content);
  },
};

export default function Home(props: PageProps<string>) {
  return (
    <>
      <Head>
        <title>Denopaste</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-xl">Denopaste</h1>
        <div>{props.data}</div>
      </div>
    </>
  );
}
