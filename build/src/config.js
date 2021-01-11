"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    kafka: {
        producer: {
            id: process.env.kafkaProducerId || "gateway",
            brokerList: process.env.kafkaProducerBrokerList || 'localhost:9092',
            enableIndempotence: true,
            dr_cb: true,
            defaultTopic: "first"
        },
        consumer: {
            groupId: "gateway",
            brokerList: process.env.kafkaConsumerBrokerList || 'localhost:9092',
            topics: ["first", "second"]
        }
    },
    socket: {
        topicOn: 'sang',
        topicEmit: 'sang'
    }
};
exports.default = config;
//# sourceMappingURL=config.js.map