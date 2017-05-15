
import crypto from 'crypto';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import multer from 'multer';
import mime from 'mime';
import identity from 'identity-function';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import HTTPError from './errors/HTTPError';
import Error404 from './errors/404';
import Error500 from './errors/500';
import ErrorValidation from './errors/Validation';

import { default as PostComponent } from '../client/components/Post';
import PostModel from './models/Post';
import MediaModel from './models/Media';
import BlockModel from './models/Block';
import BlockMediaModel from './models/BlockMedia';
import sidephoto_quoteModel from './models/blocks/sidephoto_quote';



/** LET THE APP BEGIN **/

const app = express();

/*******************
 * CONFIGURATION **/

/* Template engine */
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

/*****************
 * MIDDLEWARES **/

/* Req parsers */
app.use(bodyParser.json());

/* Static files */
app.use(express.static(__dirname + '/../../public'));

/* Upload */
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  },
});
// const storage = multer.memoryStorage();
const upload = multer({ storage });

/* Validation */
app.use(expressValidator());

/************
 * ROUTES **/

/* Homepage */
app.get('/', (req, res) => {
  res.render('home');
});

/* Post */
app.get('/post/:id', (req, res, next) => {
  PostModel.query()
    .first()
    .where('id', req.params.id)
    .eager('blocks.medias')
    .then(post => {
      if (!post) {
        return next(new Error404('Impossible de trouver ce post !'));
      }
      const postMarkup = ReactDOMServer.renderToString(
        <PostComponent post={post} />
      );

      res.render('post', {
        postMarkup,
        postData: JSON.stringify(post),
      });
    })
    .catch(next);
});

/* Blocks */
app.route('/blocks')
  .post((req, res, next) => {
    const BlockModel = require('./models/blocks/' + req.body.type).default;

    BlockModel.query()
      .insertAndFetch(req.body)
      .then(block => res.json(block))
      .catch(next);
  });

app.route('/blocks/:id')
  .put((req, res, next) => {
    const { key, type, post_id, data } = req.body;
    const newValues = { key, type, post_id, data };

    BlockModel.query()
      .patchAndFetchById(req.params.id, newValues)
      .then(block => res.json(block))
      .catch(next);
  });


app.route('/blocks/:id/medias')
  .post(
    // Fetch block being updated
    (req, res, next) => {
      BlockModel.query()
        .where('id', req.params.id)
        .first()
        .then(block => {
          if (!block) {
            return next(new Error404('This block doesn\'t exist.'));
          }
          req.block = block;
          req.blockModel = require('./models/blocks/' + block.type).default;
          next();
        });
    },

    // Handle multipart form
    (req, res, next) => {
      return multer({
        storage,
      }).any()(req, res, next);
    },

    // Upload and link medias
    (req, res, next) => {
      Promise.all((req.files || []).map(file => req.blockModel.mediasStrategies[file.fieldname](req.block, file)))
        .then(() => req.block.$relatedQuery('medias').then((medias) => res.json(medias)))
        .catch(next);
    },
  );


// Error handler

app.use((err, req, res, next) => {
  console.error(err);

  const monadError = err instanceof HTTPError
    ? err
    : new Error500('Oops ! Something wrong happened.');

  res.status(monadError.status).json(monadError.toJSON());
});

// App start

app.listen(8080, (err) => {
  if (err) {
    console.log('Wasn\'t able to start the server, because :');
    console.error(err);
    return;
  }
  const now = new Date();
  const timeString = `[${now.getHours()}h ${now.getMinutes()}m ${now.getSeconds()}s]`;
  console.log(`${timeString} Server started and listening on http://localhost:8080/`);
});