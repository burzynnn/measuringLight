import winston from "winston";

import envConfig from "../config/env.config";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "HH:mm:ss | DD-MM-YYYY" }),
        winston.format.printf(({
            level, message, label, timestamp,
        }) => `[${timestamp}] [${label}] - ${level}: \`${message}\``),
    ),
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.Console(),
    ],
});

if (envConfig.server.mode === "production") {
    logger.add(new winston.transports.File({ filename: "error.log", level: "error" }), new winston.transports.File({ filename: "combined.log" }));
}

export default logger;
