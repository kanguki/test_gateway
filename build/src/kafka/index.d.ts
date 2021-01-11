import { HighLevelProducer, KafkaConsumer } from 'node-rdkafka';
export declare const prepareKafka: () => void;
export declare const getKafkaProducer: () => HighLevelProducer;
export declare const getKafkaConsumer: () => KafkaConsumer;
