import { prisma } from "~/db.server";

export async function getDiscussions() {
  return prisma.discussion.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      author: {
        select: {
          username: true,
          id: true,
          imageUrl: true,
        },
      },
      community: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getDiscussion({ id }: { id: string }) {
  return prisma.discussion.findUnique({
    where: { id: Number(id) },
    include: {
      author: {
        select: {
          username: true,
          id: true,
          imageUrl: true,
        },
      },
      community: true,
    },
  });
}

export async function createDiscussion() {}

export async function updateDiscussion() {}

export async function deleteDiscussion(id: bigint) {}
