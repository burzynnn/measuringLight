import express from "express";
import { createServer } from "http";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import path from "path";

import config from "../config/env.config";

import indexRouter from "../routes/index.router";
import measurementRouter from "../routes/measurement.router";

import ErrorMiddlewares from "../middlewares/error.middleware";

import logger from "../utils/logger.util";

const app = express();
const serverPort = config.server.port;

app.disable("x-powered-by");
app.use(helmet());
if (config.server.mode === "production") {
    app.use(rateLimiter({
        windowMs: 30 * 60 * 1000,
        max: 50,
    }));
}
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public", "views"));
app.set("view engine", "pug");

app.use("/", indexRouter);
app.use("/measurement", measurementRouter);

app.get("*", ErrorMiddlewares.notFoundErrorHandler);
app.get(ErrorMiddlewares.runtimeErrorHandler);

const server = createServer(app).listen(serverPort, () => logger.info(`HTTP server started on port ${serverPort}.`, { label: "express" }));

export default server;
