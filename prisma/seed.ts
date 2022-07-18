import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const sqlContent =
  "# Selecting and summarizing columns \n ## Selecting Columns: SELECT, SELECT DISTINCT \n- SELECT (single) \n - SELECT (multiple) \n- SELECT DISTINCT \n #### EXERCISE: SINGLE COLUMN SELECT\n Get the title of every film.\n ```sql\n SELECT ___\n FROM films;\n ``` \n ```sql\n SELECT title\n FROM films;\n ```";

const communitiesData: Prisma.CommunityCreateInput[] = [
  {
    name: "databases",
    discussions: {
      create: [
        {
          title: "What is SeQueL?",
          content: sqlContent,
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

  await prisma.$transaction(
    communitiesData.map((community) =>
      prisma.community.create({
        data: community,
      })
    )
  );

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
