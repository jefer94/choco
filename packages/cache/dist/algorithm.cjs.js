'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var bodyParser = _interopDefault(require('body-parser'));
var redis = _interopDefault(require('redis'));
var util = require('util');

const app = express();
const client = redis.createClient();
 
client.on("error", (error) => {
  console.error(error);
});

const clientGet = util.promisify(client.get).bind(client);

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
