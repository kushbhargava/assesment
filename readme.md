API urls:-

getCart(cart) (get)- http://localhost:3000/api/cart
addTocart(cart) (put)-  http://localhost:3000/api/cart/addToCart/{cartId}
    {
	    "itemName":"Phenol"
    }
removeItemfromCart(itemid,cartid) (delete)-  http://localhost:3000/api/cart/removeItemfromCart/{itemId}/{cartId}
mergecart(cart1,cart2) (get)- http://localhost:9000/api/cart/mergeCart/{cart1}/{cart2}
addToPromo(cart,promocode) (put)- http://localhost:3000/api/cart/addToPromo/{cartId}/{promoId}


Starting the application:-
PORT=9000 DEBUG=app:* nodemon index.js