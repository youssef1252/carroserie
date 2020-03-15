import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';
import config from './config';
import routes from './routes/route';

const app = express();
app.use(cors());

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/carrosserie', {useNewUrlParser: true});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Run Good`)
);

app.listen(config.port, () =>
    console.log(`your server is running on port ${config.port}`)
);
