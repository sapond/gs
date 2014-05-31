'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var SaleSchema = new Schema({
  headline: String,
  description: String,
  city: String,
  state: String,
  zip: String,
  addr1: String,
  addr2: String
});

/**
 * Validations
 */
//ThingSchema.path('awesomeness').validate(function (num) {
  //return num >= 1 && num <= 10;
//}, 'Awesomeness must be between 1 and 10');

mongoose.model('Sale', SaleSchema);
