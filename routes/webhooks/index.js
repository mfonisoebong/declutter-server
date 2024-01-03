const express= require('express');

const {recieveWebhook}= require('./controllers')
const webhooksRouter = express.Router();


webhooksRouter.post('/', express.raw({type: 'application/json'}),recieveWebhook)

module.exports = {
  webhooksRouter,
};
