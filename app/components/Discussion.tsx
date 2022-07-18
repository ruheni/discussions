import React from "react";
import { Link } from "@remix-run/react";
import { format } from "timeago.js";

type Props = {
  id: number;
  title: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    imageUrl: string | null;
  };
  community: {
    name: string;
  } | null;
};

const DiscussionItem: React.FC<Props> = (props) => {
  return (
    <div className="p-4">
      <h3 className="sm:text-xl">
        <Link
          className="mt-1 font-bold leading-tight truncate"
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
};

export default DiscussionItem;
