import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.render("index.pug", { title: "measuringLight", css: "/css/index.css" }));

export default router;
