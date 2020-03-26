import express from 'express';
import bodyParser from 'body-parser';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const client = redis.createClient();
 
client.on("error", (error) => {
  console.error(error);
});

const clientGet = promisify(client.get).bind(client);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/', async(req, res) => {
  if (req.body && res.body.mode && res.body.key) {
    if (req.body.mode === 'set') {
      client.set(req.body.key, req.body.value, redis.print);
      res.status = 204;
      res.text('');
    }
    else {
      res.text(await clientGet(req.body.key, redis.print));
    }
  }
});
