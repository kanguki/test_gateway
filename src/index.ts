//gateway
import * as express from 'express';
import * as http from 'http';
import {Log} from './utils/log';
import router from './router';
import {getKafkaConsumer, getKafkaProducer, prepareKafka} from "./kafka";
import config from "./config";

const log: Log = new Log();
const app: express.Application = express();
const httpServer: http.Server = http.createServer(app);
const kafkaProducer = getKafkaProducer();
const kafkaConsumer = getKafkaConsumer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
});

app.use(router);
prepareKafka();

io.on('connection', (socket: any) => {

  log.info('A new socket connected');
  socket.on(config.socket.topicOn, (data: any, err: any) => {
    if(err) socket.emit(config.socket.topicEmit,`error`);
    kafkaProducer.produce(config.kafka.producer.defaultTopic,null,Buffer.from(data),"some_random_key",Date.now(),(err,offset)=>{
      if(err) console.log(err)
    })
  });
  kafkaConsumer.on('data', function(data: any) {
    try {
      log.emphasize(`Receive data from producer`);
      for (const key of Object.keys(JSON.parse(data.value))) {
        console.log(`${key}: ${JSON.parse(data.value)[key]}`)
      }
      socket.emit(config.socket.topicEmit,`success`);
    } catch (err) {
      log.warn('data is not an object.');
      log.emphasize('original data: ', data.value.toString())
    }
  });

  socket.on('disconnect', () => log.info('socket left'));
});

httpServer.listen(3000, () => log.info('Up on 3000'));

















// socket.on('trua', (data: any) => log.package(`${data} from trua`));
// socket.on('chieu', (data: any) => log.package(`${data} from chieu`));
// socket.on('toi', (data: any) => log.package(`${data} from toi`));