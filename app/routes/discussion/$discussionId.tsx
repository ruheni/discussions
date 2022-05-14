import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getDiscussion } from "~/services/discussion.server";
import { format } from "timeago.js";

type LoaderData = {
  discussion: Awaited<ReturnType<typeof getDiscussion>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (typeof params.discussionId !== "undefined") {
    const discussion = await getDiscussion({ id: params.discussionId });

    if (!discussion)
      throw new Response("Discussion Not Found", { status: 404 });

    return json({ discussion });
  }
};

export default function DiscussionPage() {
  const { discussion } = useLoaderData<LoaderData>();
  return (
    <div className="mx-auto mt-4 mb-4 max-w-screen-md py-6 rounded-lg bg-white text-gray-700">
      {discussion && (
        <div className="prose prose-slate prose-headings:font-bold prose-blockquote:border prose-blockquote:border-black prose-blockquote:p-8 prose-blockquote:text-xl prose-blockquote:rounded-lg prose-blockquote:leading-10 prose-p:leading-loose prose-lead:leading-relaxed marker:prose-li:text-black prose-li:text-black prose-li:font-medium prose-a:text-pink-600 prose-a:decoration-none prose-a:font-medium hover:prose-a:text-pink-400 prose-img:border prose-img:border-black prose-img:p-4 prose-img:rounded-lg prose-img:bg-pink-100 prose-pre:bg-black prose-pre:text-white prose-pre:text-base prose-pre:leading-loose">
          <h1 className="font-bold text-3xl leading-tight">
            {discussion.title}
          </h1>

          <div className="text-md text-gray-600">
            <strong>
              <Link to={``}>{discussion.author.username}</Link>
            </strong>{" "}
            asked in{" "}
            <strong>
              <Link to={``}>#{discussion.community?.name}</Link>
            </strong>{" "}
            {format(discussion.createdAt)}
          </div>

          <div>
            <div className="">
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
    </div>
  );
}
