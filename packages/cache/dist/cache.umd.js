(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('express'), require('body-parser'), require('redis'), require('@choco/express-common')) :
  typeof define === 'function' && define.amd ? define(['express', 'body-parser', 'redis', '@choco/express-common'], factory) :
  (global = global || self, factory(global.express, global.bodyParser, global.redis, global.common));
}(this, (function (express, bodyParser, redis, common) { 'use strict';

  express = express && Object.prototype.hasOwnProperty.call(express, 'default') ? express['default'] : express;
  bodyParser = bodyParser && Object.prototype.hasOwnProperty.call(bodyParser, 'default') ? bodyParser['default'] : bodyParser;
  redis = redis && Object.prototype.hasOwnProperty.call(redis, 'default') ? redis['default'] : redis;
  common = common && Object.prototype.hasOwnProperty.call(common, 'default') ? common['default'] : common;

  const app = express();
  const client = redis.createClient();
  common(app);
  client.on("error", error => {
    console.error(error);
  });

  function clientGet(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, value) => {
        if (err) reject(err);
        resolve(value);
      });
    });
  } // const clientGet = promisify(client.get).bind(client)


  app.use(bodyParser.json()); // for parsing application/json

  app.use(bodyParser.urlencoded({
    extended: true
  })); // for parsing application/x-www-form-urlencoded

  app.post('/', async (req, res) => {
    if (req.body) {
      try {
        const {
          mode,
          key,
          value
        } = req.body;

        if (mode && key && value) {
          if (mode === 'set') {
            client.set(req.body.key, req.body.value, redis.print);
            res.statusCode = 204;
            res.send();
          } else {
            res.send((await clientGet(req.body.key)));
          }
        }
      } catch (e) {
        res.statusCode = 500;
        res.json(JSON.stringify(e));
      }
    } else {
      res.statusCode = 500;
      res.send('');
    }
  });
  app.listen(6000);

})));
//# sourceMappingURL=cache.umd.js.map
