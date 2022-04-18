import { prisma } from "~/db.server";

export async function getDiscussions() {
  return prisma.discussion.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      author: {
        select: {
          username: true,
          id: true,
          imageUrl: true,
        }
      },
      community: true,
    }
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
        }
      },
      community: true,
    }
  })
}

export async function createDiscussion() { }

export async function updateDiscussion() { }

export async function deleteDiscussion(id: bigint) { }
