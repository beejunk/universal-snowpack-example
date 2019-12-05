import express from "express";

const index = express.Router();

index.get("/", (req, res) => {
  // Mock out some data that might be fetched server-side.
  const exampleServerData = {
    toDos: [1, 2, 3, 4],
    toDosById: {
      1: { text: "Groceries" },
      2: { text: "Garbage" },
      3: { text: "Dishes" },
      4: { text: "Mop" }
    }
  };

  res.render("Index", { pageProps: exampleServerData });
});

export default index;
