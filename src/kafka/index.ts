import {HighLevelProducer, KafkaConsumer} from 'node-rdkafka'
import {log} from "../utils/log";
import config from "../config";
const kafkaProducer: HighLevelProducer = new HighLevelProducer({
  "client.id": config.kafka.producer.id,
  'metadata.broker.list': config.kafka.producer.brokerList,
  "enable.idempotence": config.kafka.producer.enableIndempotence,
  "dr_cb": config.kafka.producer.dr_cb
});
const kafkaConsumer: KafkaConsumer = new KafkaConsumer(
  {
    "group.id": config.kafka.consumer.groupId,
    'metadata.broker.list': config.kafka.consumer.brokerList
  },
  {});
export const prepareKafka:()=>void = ()=> {
  kafkaProducer.connect();
  kafkaConsumer.connect();
  kafkaProducer.on('ready',()=>log.info(`Producer is ready`))
  kafkaProducer.setPollInterval(100);
  // kafkaProducer.on('delivery-report', function(err, report) {
  //   log.emphasize(`topic ${report.topic}`);  // Report of delivery statistics here
  // });
  kafkaProducer.on('disconnected',()=>log.warn(`Kafka Producer disconnected`));

  kafkaConsumer
    .on('ready', ()=> {
      log.info(`Consumer is ready`);
      kafkaConsumer.subscribe(config.kafka.consumer.topics);
      kafkaConsumer.consume();
    });

};
export const getKafkaProducer = ():HighLevelProducer => {
  return kafkaProducer;
};
export const getKafkaConsumer = ():KafkaConsumer=> {
  return kafkaConsumer;
};