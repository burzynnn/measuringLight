import {
    createLogger, format, transports, config,
} from "winston";

import envConfig from "../config/env.config";

const logger = createLogger({
    levels: config.syslog.levels,
    format: format.combine(
        format.colorize,
        format.timestamp({ format: "HH:mm:ss | DD-MM-YYYY" }),
        format.printf((info) => `[${info.timestamp}] - ${info.level}: ${info.message}`),
    ),
    transports: [
        new transports.Console({ level: "silly" }),
    ],
});

if (envConfig.server.mode !== "development") {
    logger.add(new transports.File({ filename: "error.log", level: "error" }), new transports.File({ filename: "combined.log" }));
}

export default logger;
