module.exports = function(app){

 var products = require('./../controllers/products.server.controller.js');
 var orders = require('./../controllers/products.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

//API routes
 app.route('/api/products')
	.get(products.list)
	.post(users.requiresLogin, products.create);
	
	app.route('/api/orders')
.get(orders.olist)
.post(users.requiresLogin, orders.create);
	


	
  app.route('/api/products/:productId')
	.get(products.read)
  .delete(users.requiresLogin, products.delete);



	app.route('/api/products/edit/:productId')
	.get(products.read)
	.put(users.requiresLogin, products.update);




//Routes to render views
  app.route('/products/new').get(products.new);
  app.route('/orders/new').get(products.newo);
  app.route('/orders/all').get(products.allp);
  app.route('/products/viewer').get(products.alll);
  app.route('/products/all').get(products.all);
  app.route('/products/:productId').get(products.view);
  app.route('/products/add/:productId').get(products.view2);
  app.route('/products/order/:orderId').get(orders.view3);
  app.route('/products/:productId').get(products.delete);
  app.route('/products/all/:brand').get(products.brand);
  app.route('/products/viewer/:brand').get(products.brand);
  app.route('/products/edit/:productId').get(products.edit);
  

  
  app.param('productId', products.productByID);
  app.param('orderId', orders.orderByID);


}
