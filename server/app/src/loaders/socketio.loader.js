import socketio from "socket.io";

import config from "../config/env.config";
import logger from "../utils/logger.util";
import httpServer from "./express.loader";
import createExcelFile from "../utils/createExcelFile.util";
import mailTransporter from "./nodemailer.loader";

const io = socketio(httpServer);

io.on("connection", (socket) => {
    logger.info("Established realtime connection with client.", { label: "socket.io" });
    socket.on("send-mail", (data) => {
        createExcelFile(data.class, data.weather, data.side, data.results);
        const mailConfiguration = {
            from: {
                name: "measuringLight",
                address: config.nodemailer.account,
            },
            to: config.nodemailer.receiver,
            subject: "Pomiar światła",
            text: "Sprawdź załącznik",
            attachments: [{ path: "worksheet.xlsx" }],
        };
        mailTransporter.sendMail(mailConfiguration, (err, info) => {
            if (err) {
                logger.error(`Failed to send a email: ${err}.`, { label: "nodemailer" });
                io.emit("email-confirmation", "Failed to send a email.");
            } else {
                logger.info("Email sent successfully.", { label: "nodemailer" });
                io.emit("email-confirmation", "Email sent successfully.");
            }
        });
    });
});

export default io;
