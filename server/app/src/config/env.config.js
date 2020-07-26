import dotenv from "dotenv";

const foundEnv = dotenv.config();
if (foundEnv.error) {
    throw new Error("No '.env' file found.");
}

export default {
    server: {
        mode: process.env.NODE_ENV.trim() || "development",
    },
};
