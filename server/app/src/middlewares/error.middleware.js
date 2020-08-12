import logger from "../utils/logger.util";

export default class ErrorMiddlewares {
    static notFoundErrorHandler = (req, res) => res.status(404).send(`<h1>Page not found!</h1><br><a href="/">Try going back to main page.</a>`);

    static runtimeErrorHandler = (err, req, res) => {
        res.status(500).send(`<h1>Error happened during your visit</h1><br><p>${err.message}</p>`);
        logger.error(err);
    }
}
