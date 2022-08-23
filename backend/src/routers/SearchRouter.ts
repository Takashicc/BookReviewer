import express, { Request } from "express";
import { findBooksByTitle } from "../api/RakutenApi";

const router = express.Router();

interface SearchRequest extends Request {
  query: {
    q: string | undefined;
  };
}

router.get("/search", async (req: SearchRequest, res, next) => {
  try {
    const query = req.query.q;
    const bookInfos = await findBooksByTitle(query);
    res.status(200).json(bookInfos);
  } catch (e) {
    next(e);
  }
});

export default router;
