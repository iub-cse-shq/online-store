var mongoose = require('mongoose');
var Product = require('./../models/Product.js');
var Order= require('./../models/Order.js');

var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.list = function(req, res) {
  Product.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");

      res.status(200).send(data);
    }
  });
};

module.exports.olist = function(req, res) {
  Order.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");

      res.status(200).send(data);
    }
  });
};


exports.newo = function(req, res) {
	res.render('./../public/views/product/v.ejs', {
		user: req.user || null,
		request: req
	});
};

exports.new = function(req, res) {
	res.render('./../public/views/product/create.ejs', {
		user: req.user || null,
		request: req
	});
};



exports.edit = function(req, res) {
	res.render('./../public/views/product/edit.ejs', {
		user: req.user || null,
		request: req
	});
};

exports.view = function(req, res) {
	res.render('./../public/views/product/v.ejs', {
		user: req.user || null,
		request: req
	});
};

exports.view2 = function(req, res) {
	res.render('./../public/views/product/view.ejs', {
		user: req.user || null,
		request: req
	});
};

exports.view3 = function(req, res) {
	res.render('./../public/views/order/oview.ejs', {
		user: req.user || null,
		request: req
	});
};




exports.allp = function(req, res) {
  Order.find(function(err, data) {
    if (err) {
      return res.status(400).send({

          message: errorHandler.getErrorMessage(err)
        });
    } else {
      console.log("api called");
      console.log(data);

      res.render('./../public/views/order/olist.ejs', {
    		user: req.user || null,
    		request: req,
        orders: data
    	});
    	
    	
    	
    }
  });

};




exports.all = function(req, res) {
  Product.find(function(err, data) {
    if (err) {
      return res.status(400).send({

          message: errorHandler.getErrorMessage(err)
        });
    } else {
      console.log("api called");
      console.log(data);

      res.render('./../public/views/product/plist.ejs', {
    		user: req.user || null,
    		request: req,
        products: data
    	});
    	
    	
    	
    }
  });

};
exports.alll = function(req, res) {
  Product.find(function(err, data) {
    if (err) {
      return res.status(400).send({

          message: errorHandler.getErrorMessage(err)
        });
    } else {
      console.log("api called");
      console.log(data);

      res.render('./../public/views/product/viewer.ejs', {
    		user: req.user || null,
    		request: req,
        products: data
    	});
    	
    	
    	
    }
  });

};





exports.brand = function(req, res) {
  console.log(req.params.brand);
  Product.find({"brand":req.params.brand}, function(err, data) {
    if (err) {
      return res.status(400).send({

          message: errorHandler.getErrorMessage(err)
        });
    } else {
      console.log("api called");
      console.log(data);

      res.render('./../public/views/product/viewer.ejs', {
    		user: req.user || null,
    		request: req,
        products: data
    	});
    }
  });

};

module.exports.create = function(req, res) {
  console.log(req.user);
  var product = new Product(req.body);
  product.user = req.user;
  product.save(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.create = function(req, res) {
  console.log(req.user);
  var order = new Order(req.body);
  order.user = req.user;
  order.save(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};



module.exports.read = function(req, res) {
  res.json(req.product);
};
module.exports.read = function(req, res) {
  res.json(req.order);
};

exports.delete = function(req, res) {
	var product = req.product;
	product.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(product);
		}
	});
};


module.exports.update = function(req, res) {
  var product = req.product;

  	product = _.extend(product, req.body);

  	product.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json(product);
  		}
  	});
};

exports.productByID = function(req, res, next, id) {
	Product.findById(id).populate('user', 'email').exec(function(err, product) {
		if (err) return next(err);
		if (!product) return next(new Error('Failed to load product ' + id));
		req.product = product;
		next();
	});
};

exports.orderByID = function(req, res, next, id) {
	Order.findById(id).populate('user', 'email').exec(function(err,order) {
		if (err) return next(err);
		if (!order) return next(new Error('Failed to load product ' + id));
		req.order =order;
		next();
	});
};



