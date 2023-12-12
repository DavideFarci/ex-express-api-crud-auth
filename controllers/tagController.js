const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { slugControl } = require("../Utilities/functions");

async function index(req, res) {
  const tags = await prisma.tag.findMany();

  return res.json(tags);
}

async function store(req, res) {
  const data = req.body;

  const list = await prisma.tag.findMany();
  const newTag = await prisma.tag.create({
    data: {
      name: data.name,
      slug: slugControl(data.name, list),
    },
  });

  return res.json(newTag);
}

module.exports = {
  index,
  store,
};
