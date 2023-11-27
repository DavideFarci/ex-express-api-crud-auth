const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { slugControl } = require("../Utilities/functions");

async function store(req, res) {
  const data = req.body;

  const list = await prisma.category.findMany();
  const newCategory = await prisma.category.create({
    data: {
      name: data.name,
      slug: slugControl(data.name, list),
    },
  });

  return res.json(newCategory);
}

module.exports = {
  store,
};
