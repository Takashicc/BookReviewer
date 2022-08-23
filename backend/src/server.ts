import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import log4js from "./config/log4js";
import router from "./routers";
import { errorHandler } from "./Error/ErrorHandler";
import path from "path";

const logger = log4js.getLogger();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../../frontend")));

app.use("/api/v1", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
  next();
});

app.get("/*", (req, res) => {
  console.log("request come");
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.debug(`Server listening on port ${PORT}...`);
});
