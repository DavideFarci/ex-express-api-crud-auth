const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
const postsRouter = require("./routers/postsRouter");
const tagsRouter = require("./routers/tagsRouter");
const usersRouter = require("./routers/usersRouter");
const categoryRouter = require("./routers/categoryRouter");
const routeNotFoundMiddlware = require("./middlwares/routeNotFound");

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

// Rotte per l'entità post
app.use("/posts", postsRouter);
// Rotte per l'entità tags
app.use("/tags", tagsRouter);
// Rotte per l'entità category
app.use("/categories", categoryRouter);
// Rotte per gli user (non specifichiamo un percorso per rendere più pulito l'url)
app.use("", usersRouter);

// Errore 404 - Pagina non trovata
app.use(routeNotFoundMiddlware);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port http://localhost:" + process.env.PORT);
});
