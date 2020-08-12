import mqtt from "mqtt";

import config from "../config/env.config";
import logger from "../utils/logger.util";
import Measurement from "../models/measurement.model";
import io from "./socketio.loader";

const mqttClient = mqtt.connect(config.broker.address);

mqttClient.on("connect", () => {
    logger.info("Established connection with message broker.", { label: "mqtt" });
    mqttClient.subscribe("lux");
});

mqttClient.on("message", async (topic, message) => {
    const savedMeasurement = await Measurement.saveIncomingMessage(topic, message);
    io.emit("lux", savedMeasurement);
});

export default mqttClient;
