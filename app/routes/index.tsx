import { Link, useLoaderData } from "@remix-run/react";
import { getDiscussions } from "~/services/discussion.server";
import { json } from "@remix-run/node";
import DiscussionItem from "~/components/Discussion";

export const loader = async () => {
  const discussions = await getDiscussions();
  return json({ discussions });
};

const Index = () => {
  const { discussions } = useLoaderData<typeof loader>();

  return (
    <main className="m-2">
      <div className="page-container">

        {discussions.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 divide-y m-4">
            {discussions.map((discussion) => (
              <DiscussionItem key={discussion.id} {...discussion} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export const EmptyState = () => (
  <div className="relative p-8 text-center border border-gray-200 rounded-lg">
    <h2 className="text-2xl font-medium">There's nothing here...</h2>

    <p className="mt-4 text-sm text-gray-500">
      Created discussions will appear here, try creating one!
    </p>

    <Link
      to="/discussion/new"
      className="inline-flex items-center px-5 py-3 mt-8 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500"
    >
      Start a discussion
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="flex-shrink-0 w-4 h-4 ml-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </Link>
  </div>
);

export default Index;
