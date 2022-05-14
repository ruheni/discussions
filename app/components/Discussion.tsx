import { Link } from "@remix-run/react";
import { format } from "timeago.js";
import type { getDiscussion } from "~/services/discussion.server";

type Props = Exclude<
  Awaited<PromiseLike<ReturnType<typeof getDiscussion>>>,
  null
>;

export default function Discussion(props: Props) {
  return (
    <div className="p-2 w-9/10">
      <h3 className="text-2xl">
        <Link
          className="mt-1 font-semibold leading-tight truncate"
          to={`/discussion/${props.id}`}
        >
          {props?.title}
        </Link>
      </h3>

      <div className="text-gray-600 text-sm">
        {props.author.username} asked {format(props.createdAt)}
      </div>

      <div className="text-sm">
        <Link to={``}>#{props.community?.name}</Link>
      </div>
    </div>
  );
}
