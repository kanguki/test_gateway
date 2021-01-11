"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKafkaConsumer = exports.getKafkaProducer = exports.prepareKafka = void 0;
const node_rdkafka_1 = require("node-rdkafka");
const log_1 = require("../utils/log");
const config_1 = require("../config");
const kafkaProducer = new node_rdkafka_1.HighLevelProducer({
    "client.id": config_1.default.kafka.producer.id,
    'metadata.broker.list': config_1.default.kafka.producer.brokerList,
    "enable.idempotence": config_1.default.kafka.producer.enableIndempotence,
    "dr_cb": config_1.default.kafka.producer.dr_cb
});
const kafkaConsumer = new node_rdkafka_1.KafkaConsumer({
    "group.id": config_1.default.kafka.consumer.groupId,
    'metadata.broker.list': config_1.default.kafka.consumer.brokerList
}, {});
const prepareKafka = () => {
    kafkaProducer.connect();
    kafkaConsumer.connect();
    kafkaProducer.on('ready', () => log_1.log.info(`Producer is ready`));
    kafkaProducer.setPollInterval(100);
    // kafkaProducer.on('delivery-report', function(err, report) {
    //   log.emphasize(`topic ${report.topic}`);  // Report of delivery statistics here
    // });
    kafkaProducer.on('disconnected', () => log_1.log.warn(`Kafka Producer disconnected`));
    kafkaConsumer
        .on('ready', () => {
        log_1.log.info(`Consumer is ready`);
        kafkaConsumer.subscribe(config_1.default.kafka.consumer.topics);
        kafkaConsumer.consume();
    });
};
exports.prepareKafka = prepareKafka;
const getKafkaProducer = () => {
    return kafkaProducer;
};
exports.getKafkaProducer = getKafkaProducer;
const getKafkaConsumer = () => {
    return kafkaConsumer;
};
exports.getKafkaConsumer = getKafkaConsumer;
//# sourceMappingURL=index.js.map