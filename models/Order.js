var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = {

  cname: {
    type: String,
    default: '',
    trim: true,
    required: 'Name required'
  },
  cphone: {
    type: Number,
    default: '',
    trim: true,
    required: 'Phone number required'
  },


  pname: {
    type: String,
    default: '',
    trim: true,
    required: 'Product name required'
  },

  price: {
    type: Number,
    default: '',
    required: 'Price required'
  },

  quantity: {
    type: Number,
    default: '',
    required: 'Quantity required'
  },
   cnumber: {
    type: Number,
    default: '',
    required: 'Quantity required'
  },

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  created: {
    type: Date,
    default: Date.now
  }
}

var Order = mongoose.model('Order', OrderSchema, 'orders');
module.exports = Order;
