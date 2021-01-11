"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//gateway
const express = require("express");
const http = require("http");
const log_1 = require("./utils/log");
const router_1 = require("./router");
const kafka_1 = require("./kafka");
const config_1 = require("./config");
const log = new log_1.Log();
const app = express();
const httpServer = http.createServer(app);
const kafkaProducer = kafka_1.getKafkaProducer();
const kafkaConsumer = kafka_1.getKafkaConsumer();
const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
    },
});
app.use(router_1.default);
kafka_1.prepareKafka();
io.on('connection', (socket) => {
    log.info('A new socket connected');
    socket.on(config_1.default.socket.topicOn, (data, err) => {
        if (err)
            socket.emit(config_1.default.socket.topicEmit, `error`);
        kafkaProducer.produce(config_1.default.kafka.producer.defaultTopic, null, Buffer.from(data), "some_random_key", Date.now(), (err, offset) => {
            if (err)
                console.log(err);
        });
    });
    kafkaConsumer.on('data', function (data) {
        try {
            log.emphasize(`Receive data from producer`);
            for (const key of Object.keys(JSON.parse(data.value))) {
                console.log(`${key}: ${JSON.parse(data.value)[key]}`);
            }
            socket.emit(config_1.default.socket.topicEmit, `success`);
        }
        catch (err) {
            log.warn('data is not an object.');
            log.emphasize('original data: ', data.value.toString());
        }
    });
    socket.on('disconnect', () => log.info('socket left'));
});
httpServer.listen(3000, () => log.info('Up on 3000'));
// socket.on('trua', (data: any) => log.package(`${data} from trua`));
// socket.on('chieu', (data: any) => log.package(`${data} from chieu`));
// socket.on('toi', (data: any) => log.package(`${data} from toi`));
//# sourceMappingURL=index.js.map