import httpServer from "./loaders/express.loader";
import dbConnection from "./loaders/mongoose.loader";
import ioServer from "./loaders/socketio.loader";
import mqttClient from "./loaders/mqtt.loader";

httpServer;
dbConnection;
ioServer;
mqttClient;
