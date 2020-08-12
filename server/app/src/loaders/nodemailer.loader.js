import nodemailer from "nodemailer";
import config from "../config/env.config";

export default nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.nodemailer.account,
        pass: config.nodemailer.password,
    },
});
