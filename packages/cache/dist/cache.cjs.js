'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var bodyParser = _interopDefault(require('body-parser'));
var redis = _interopDefault(require('redis'));
require('util');
var common = _interopDefault(require('@services/express-common'));

const app = express();
const client = redis.createClient();

common(app);

client.on("error", (error) => {
  console.error(error);
});

function clientGet(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) reject(err);
      resolve(value);
    });
  })
}

// const clientGet = promisify(client.get).bind(client)

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/', async(req, res) => {
  if (req.body) {
    try {
      const { mode, key, value } = req.body;
      if (mode && key && value) {
        if (mode === 'set') {
          client.set(req.body.key, req.body.value, redis.print);
          res.statusCode = 204;
          res.send();
        }
        else {
          res.send(await clientGet(req.body.key));
        }
      }
    }
    catch(e) {
      res.statusCode = 500;
      res.json(JSON.stringify(e));
    }
  }
  else {
    res.statusCode = 500;
    res.send('');
  }
});

app.listen(6000);
