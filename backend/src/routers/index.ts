import express from "express";
import SearchRouter from "./SearchRouter";
import BookDetailRouter from "./BookDetailRouter";

const router = express.Router();
router.use(SearchRouter);
router.use(BookDetailRouter);

export default router;
