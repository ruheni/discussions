import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { getDiscussion } from "~/services/discussion.server"

export const loader: LoaderFunction = async ({ params }) => {
  if (typeof params.discussionId !== "undefined") {
    const discussion = await getDiscussion({ id: params.discussionId })

    if (!discussion) throw new Response("Discussion Not Found", { status: 404 })

    return json({ discussion })
  }
}

export default function Discussion() {
  return (
    <>
      Yaaay, I was loaded
    </>
  )
}