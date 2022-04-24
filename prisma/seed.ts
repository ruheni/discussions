import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const communitiesData: Prisma.CommunityCreateInput[] = [
  {
    name: "databases",
    discussions: {
      create: [
        {
          title: "What is SeQueL?",
          content: "Explain SQL to me like I'm 5. ¯\\_(ツ)_/¯ ",
          author: {
            create: {
              username: "author_jnr",
              email: "authur@jnr.com",
            },
          },
        },
      ],
    },
  },
  {
    name: "serverless",
    discussions: {
      create: [
        {
          title: "Seems serverless databases are the new hotness, eiy?",
          content:
            "How to serverless databases work and what provider would you recommend?",
          author: {
            create: {
              username: "raccoon",
              email: "raccoon@idea.biz",
            },
          },
        },
      ],
    },
  },
  {
    name: "k8s",
    discussions: {
      create: [
        {
          title:
            "How can I distribute my MySQL database using Vitess in production?",
          content:
            "Can someone explain to me the different configurations I need to be aware of when using Vitess?",
          author: {
            create: {
              username: "rachel_stone",
              email: "rachel@stone.io",
            },
          },
        },
      ],
    },
  },
  { name: "programmers-are-human-too" },
  { name: "javascript-memes" },
  { name: "JavaScript" },
  { name: "TypeScript" },
];

async function seed() {
  console.log("Seeding...");

  for (const community of communitiesData) {
    await prisma.community.create({
      data: community,
    });
  }
  console.log("... Done");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
