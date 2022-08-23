import express from "express";
import SearchRouter from "./SearchRouter";

const router = express.Router();
router.use(SearchRouter);

export default router;
