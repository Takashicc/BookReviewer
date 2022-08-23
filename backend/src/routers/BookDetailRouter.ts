import express from "express";
import { findBookByISBN } from "../api/RakutenApi";

const router = express.Router();

router.get("/books/:isbn", async (req, res, next) => {
  try {
    const isbn = req.params.isbn;
    const bookInfo = await findBookByISBN(isbn);
    res.status(200).json(bookInfo);
  } catch (e) {
    next(e);
  }
});

export default router;
