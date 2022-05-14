import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { getDiscussions } from "~/services/discussion.server";
import { json } from "@remix-run/node";
import Discussion from "~/components/Discussion";

type LoaderData = {
  discussions: Awaited<ReturnType<typeof getDiscussions>>;
};

export const loader: LoaderFunction = async () => {
  const discussions = await getDiscussions();
  return json({
    discussions,
  });
};

export default function Index() {
  const { discussions } = useLoaderData<LoaderData>();

  return (
    <div className="mx-auto mt-4 mb-4 max-w-screen-sm py-6 rounded-lg bg-white text-gray-700">
      {discussions.length === 0 ? (
        <p>No discussions here</p>
      ) : (
        discussions.map((discussion) => (
          <Discussion key={discussion.id} {...discussion} />
        ))
      )}
    </div>
  );
}
