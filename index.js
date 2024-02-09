import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, db } from "./config.js";
import bookModel from "./models/model.js";
const app = express();
app.use(cors());
app.use(express.json());

//MongoDb connection

mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
//Route for POST request
app.post("/create", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.year) {
      console.log("enter all required fields ");
      return res.json("enter all")
    }
    const book = await bookModel
      .create(req.body)
      .then((book) => res.json(book));
  } catch {
    (err) => console.log(err);
  }
});
//Route for get all records in db
app.get("/books", async (req, res) => {
  try {
    const book = await bookModel.find({}).then((book) => res.json(book));
  } catch {
    (err) => console.log(err);
  }
});
//Route for get individual records in db -primary key:id
app.get("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await bookModel
      .findById({ _id: id })
      .then((book) => res.json(book));
  } catch {
    (err) => console.log(err);
  }
});
//Route for updating records in db 
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.year) {
      console.log("enter all required fields ");
      return res.json("enter all")
    }
    const id = req.params.id;
    const book = await bookModel
      .findByIdAndUpdate({ _id: id }, req.body)
      .then((book) => res.json(book));
  } catch {
    (err) => console.log(err);
  }
});
//Route for delete records in db
app.delete("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await bookModel
      .findByIdAndDelete({ _id: id })
      .then((book) => res.json(book));
  } catch {
    (err) => console.log(err);
  }
});
app.listen(PORT, () => {
  console.log(`App is running on port:${PORT}`);
});
