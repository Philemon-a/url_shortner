const express = require('express');
const {redirectUrl, generateShortUrl} = require('../controllers/url.controllers');

const router = express.Router();

router.post('/shorten', generateShortUrl);
router.get('/:urlId', redirectUrl);



