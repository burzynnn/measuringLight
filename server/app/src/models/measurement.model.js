import {Schema, model} from "mongoose";

export default class Measurement {
    static Schema = new Schema({
        device_name: {
            type: Number,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        }
    }, {timestamps: true});

    static model = model("measurements", this.Schema);

    static findExactMeasurements = async (deviceName, limit) => await this.model.find({device_name: deviceName}).sort({_id: -1}).limit(limit);

    static createNewMeasurement = async (measurementToSave) => await measurementToSave.save();

    static saveIncomingMessage = async (topic, message) => {
        const parsedMessage = JSON.parse(message.toString("utf8"));
        parsedMessage.value = Number(parsedMessage.value).toFixed(2);
        if (parsedMessage.value !== "-1.00") {
            const measurementToSave = new Measurement.model({
                device_name: parsedMessage.deviceName,
                value: parsedMessage.value,
            });
            return await this.createNewMeasurement(measurementToSave);
        }
    }
}