'use strict';
var geocoderProvider = 'google';
var httpAdapter = 'http';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);

var SaleSchema = new Schema({
  headline: String,
  description: String,
  city: String,
  state: String,
  zip: String,
  address1: String,
  address2: String,
  lat: String,
  lng: String
});

SaleSchema.virtual('fullAddress').get(function() {
    return [this.address1, this.city, this.zip || this.state].join(', ');
});

SaleSchema.pre('save', function(next) {
    console.log('save', arguments, this);
    var sale;
    /** @namespace sale.fullAddress */
    sale = this;
    console.log('sale', sale.get('fullAddress'));
    geocoder.geocode(sale.get('fullAddress'), function ( err, data ) {
        console.log(data);
        if(!err && data && data.length){
            sale.lat = data[0].latitude;
            sale.lng = data[0].longitude;
        }
        next();
    });
});

/**
 * Validations
 */
//ThingSchema.path('awesomeness').validate(function (num) {
  //return num >= 1 && num <= 10;
//}, 'Awesomeness must be between 1 and 10');

mongoose.model('Sale', SaleSchema);
