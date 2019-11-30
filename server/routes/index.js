import express from "express";

const index = express.Router();

index.get("/", (req, res) => {
  res.render("Index");
});

export default index;
