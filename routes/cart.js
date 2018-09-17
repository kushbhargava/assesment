const express = require('express');
const Joi = require('joi');
const debug = require('debug')('app:cart');
const router = express.Router();

const carts = [
    {
        id: 1, name: 'cart1', items: [
            { itemId: 11, itemName: 'phenol' },
            { itemId: 12, itemName: 'water' },
            { itemId: 13, itemName: 'acid' }]
    },
    {
        id: 2, name: 'cart2', items: [
            { itemId: 21, itemName: 'pen' },
            { itemId: 22, itemName: 'book' },
            { itemId: 23, itemName: 'bottle' }]
    },
    {
        id: 3, name: 'cart2', items: [
            { itemId: 31, itemName: 'table' },
            { itemId: 32, itemName: 'chair' },
            { itemId: 33, itemName: 'bed' }]
    }
];

const promos = [
    { id: 1, title: 'NEWYEAR', carts: [1, 3] },
    { id: 2, title: 'DIWALI', carts: [2, 3] },
    { id: 3, title: 'CHRISTMUS', carts: [3] },
];

router.get('/', (req, res) => {
    debug('Getting all the carts!!');
    res.send(carts);
});

router.get('/:id', (req, res) => {
    debug('Getting cart items!!');
    const cartItem = carts.find(c => c.id === parseInt(req.params.id));
    if (!cartItem) return res.status(404).send('Cart could not be found!!!');
    res.send(cartItem);
});

router.post('/', (req, res) => {
    const { error } = validateItem(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const cartItem = {
        id: carts.length + 1,
        name: req.body.name
    };
    carts.push(cartItem);
    debug('Adding new cart:', cartItem);
    res.send(cartItem);
});

router.put('/addToCart/:id', (req, res) => {
    const { error } = validateItem(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const cart = carts.find(c => c.id === parseInt(req.params.id));
    if (!cart) return res.status(404).send('Cart not found!!');

    const cartItem = {
        itemId: cart.items.length + 1,
        itemName: req.body.itemName
    };

    cart.items.push(cartItem);

    debug('Adding new item to cart:', cart);

    res.send(cart);
});

router.get('/mergeCart/:cartId1/:cartId2', (req, res) => {

    const cart1 = carts.find(c => c.id === parseInt(req.params.cartId1));
    if (!cart1) return res.status(404).send('Cart1 not found!!');

    const cart2 = carts.find(c => c.id === parseInt(req.params.cartId2));
    if (!cart2) return res.status(404).send('Cart2 not found!!');

    const final = cart1.items.concat(cart2.items);
    
    debug('Merged two cart items:', final);

    res.send(final);
});

router.delete('/removeItemfromCart/:itemId/:id', (req, res) => {

    const cart = carts.find(c => c.id === parseInt(req.params.id));
    if (!cart) return res.status(404).send('Cart not found!!');

    const item = cart.items.find(c => c.itemId === parseInt(req.params.itemId));
    if (!item) return res.status(404).send('Item is not present in the cart!!');

    const index = cart.items.indexOf(item);
    cart.items.splice(index, 1);
    
    debug('Removing item from cart:', item);

    res.send(item);
});

router.put('/addToPromo/:cartId/:promoId', (req, res) => {

    const cart = carts.find(c => c.id === parseInt(req.params.cartId));
    if (!cart) return res.status(404).send('Cart not found!!');

    const promo = promos.find(c => c.id === parseInt(req.params.promoId));
    if (!promo) return res.status(404).send('Promocard is not present!!');

    promo.carts.push(cart.id);

    res.send(promo);
});

function validateItem(cartItem) {
    const schema = {
        itemName: Joi.string().min(4).required()
    };
    debug('Validating item schema!!');
    return Joi.validate(cartItem, schema);
}

module.exports = router;