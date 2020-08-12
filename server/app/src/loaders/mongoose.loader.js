import mongoose from "mongoose";

import config from "../config/env.config";
import logger from "../utils/logger.util";

const dbConnectionURI = `mongodb://${config.database.user}:${config.database.password}@database:27017/${config.database.name}`;

const dbConnection = mongoose.connect(dbConnectionURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
});

mongoose.connection.on("connected", () => logger.info("Established connection with database.", { label: "mongodb" }));
mongoose.connection.on("disconnected", () => logger.info("Successfully disconnected from database.", { label: "mongodb" }));
mongoose.connection.on("reconnected", () => logger.warn("Reconnected to database. (Check for any connection issues)", { label: "mongodb" }));
mongoose.connection.on("error", (err) => {
    logger.error(`An error happened while using database: ${err}.`, { label: "mongodb" });
    throw new Error(err);
});

export default dbConnection;
