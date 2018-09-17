const express = require('express');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:start');
const cart = require('./routes/cart');
const app = express();

debug(`Server name : ${config.get('name')}`);
debug(`Mail host : ${config.get('mail.host')}`);

app.use(express.json());
app.use('/api/cart', cart);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan running on development!!!');
}

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started at port ${port}...`));

