import express from "express";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(rateLimiter({
    windowMs: 30 * 60 * 1000,
    max: 50,
}));
app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.send(`<h1>Hello!!!</h1>`);
});

app.listen(3000);

export default app;
