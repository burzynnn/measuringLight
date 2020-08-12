import Measurement from "../models/measurement.model";

export default class MeasurementControllers {
    static getFiveEachMeasurements = async (req, res, next) => {
        try {
            const queries = {};
            for (let i = 1; i < 23; i++) {
                queries[i] = await Measurement.findExactMeasurements(i, 5);
            }
            res.render("sensors.pug", {title: "measuringLight", css: "/css/sensors.css", queries});
        } catch (err) {
            next(err);
        }
    }
}
