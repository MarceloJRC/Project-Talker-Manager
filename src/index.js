const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/error.middleware');
const emailValidation = require('./middlewares/error.emailValidation');
const passwordValidation = require('./middlewares/error.passwordValidation');
const talkerRoute = require('./routes/talkerRoute');
const loginRoute = require('./routes/loginRoute');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.use('/talker', talkerRoute);
app.use('/login', loginRoute);

app.use(emailValidation);
app.use(passwordValidation);
app.use(errorMiddleware);