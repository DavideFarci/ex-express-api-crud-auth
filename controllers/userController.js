const { log } = require("console");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");

// REGISTER
async function register(req, res) {
  const sanitizedData = matchedData(req);
  sanitizedData.password = await bcrypt.hash(sanitizedData.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...sanitizedData,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      role: true,
    },
  });

  res.json({ newUser });
}

// LOGIN
async function login(req, res) {
  res.send("login");
}

module.exports = {
  register,
  login,
};
