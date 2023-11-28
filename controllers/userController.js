const { log, error } = require("console");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jsonwebToken = require("jsonwebtoken");
const PrismaExeption = require("../exeptions/prismaExeption");

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

  const token = jsonwebToken.sign(newUser, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ newUser, token });
}

// LOGIN
async function login(req, res) {
  // recuperare i dati inseriti dall'utente
  const { email, password } = req.body;

  //controllare che ci sia un utente con quell'email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    // next(new PrismaExeption("Utente non trovato"));
    throw new Error("Utente non trovato");
  }

  // controllare che la password sia corretta
  const passMatch = await bcrypt.compare(password, user.password);

  if (!passMatch) {
    // next(new PrismaClient("Password errata"));
    throw new Error("Password errata");
  }

  // generare il token JWT
  const token = jsonwebToken.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Rimuovere la password dai dati dell'utente
  delete user.password;
  // restutuire il token e i dati dell'utente
  res.json({ user, token });
}

module.exports = {
  register,
  login,
};
