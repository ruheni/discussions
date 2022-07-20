import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getDiscussion } from "~/services/discussion.server";
import { format } from "timeago.js";
import { markdownToHtml } from "~/lib/md";

export const loader = async ({ params }: LoaderArgs) => {
  if (typeof params.discussionId === "undefined") {
    throw new Response("Bad Request", { status: 500 });
  }

  const discussion = await getDiscussion({ id: params.discussionId });

  if (!discussion) throw new Response("Discussion Not Found", { status: 404 });

  return json({
    discussion: {
      ...discussion,
      content: markdownToHtml(discussion.content),
    },
  });
};

export default function DiscussionPage() {
  const { discussion } = useLoaderData<typeof loader>();
  return (
    <main className="page-container p-6 sm:m-2 sm:mx-auto">
      {discussion && (
        <div className="prose-container">
          <h1 className="font-bold text-3xl leading-tight">
            {discussion.title}
          </h1>

          <div className="text-md text-gray-600">
            <strong>
              <Link to={`#`}>{discussion.author.username}</Link>
            </strong>{" "}
            asked in{" "}
            <strong>
              <Link to={`#`}>#{discussion.community?.name}</Link>
            </strong>{" "}
            {format(discussion.createdAt)}
          </div>

          <div>
            <div className="flex -space-x-2">
              {/* <Link to={`/user/${discussion.author.id}`}>
                {discussion.author.avatar}
              </Link> */}
              {/* <Avatar
                name={discussion.author.username}
                size={"sm"}
                // @ts-ignore
                src={discussion.author.imageUrl}
              /> */}
              {/* <p>
                <Link to={``} className="font-bold">
                  {discussion.author.username}
                </Link>{" "} asked
              </p> */}
            </div>

            <p dangerouslySetInnerHTML={{ __html: discussion.content }} />
          </div>
        </div>
      )}
    </main>
  );
}
