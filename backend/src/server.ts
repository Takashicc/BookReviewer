import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import log4js from "./config/log4js";
import router from "./routers";
import { errorHandler } from "./Error/ErrorHandler";

const logger = log4js.getLogger();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
  next();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.debug(`Server listening on port ${PORT}...`);
});
