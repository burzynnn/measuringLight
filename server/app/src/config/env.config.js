const env = {
    server: {
        mode: process.env.NODE_ENV,
        port: parseInt(process.env.SRV_PORT, 10),
    },
    database: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PWD,
        name: process.env.MONGO_DB,
    },
    broker: {
        address: process.env.BROKER_ADDR,
    },
    nodemailer: {
        account: process.env.NODEMAILER_ACC,
        password: process.env.NODEMAILER_PWD,
        receiver: process.env.NODEMAILER_REC,
    },
};

Object.keys(env).forEach((category) => {
    Object.keys(env[category]).forEach((secret) => {
        if (env[category][secret] === undefined) {
            throw new Error(`Value of ${category}:${secret} not set.`);
        }
    });
});

export default env;
