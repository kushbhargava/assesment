const express = require('express');
const morgan = require('morgan');
const config = require('config');
const cart = require('./routes/cart');
const app = express();

console.log(`Server name : ${config.get('name')}`);
console.log(`Mail host : ${config.get('mail.host')}`);

app.use(express.json());
app.use('/api/cart', cart);

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.listen(3000, () => console.log('Server started at port 3000...'));

