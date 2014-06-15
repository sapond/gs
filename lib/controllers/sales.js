'use strict';
var mongoose = require('mongoose'),
    Sale = mongoose.model('Sale'),
    passport = require('passport');

exports.index = function (req, res, next) {
   Sale.find(function(err, sales) {
       console.log('find', err, sales);
        if (err) return res.json(400, err);
        return res.json(sales);
    });
};

/**
 * Create user
 */
exports.create = function (req, res, next) {
    console.log('1', req.body);
  var newSale = new Sale(req.body);
    console.log(newSale);

  newSale.save(function(err) {
    if (err) return res.json(400, err);
    return res.json({foo:1});
  });
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var saleId = req.params.id;

  Sale.findById(saleId, function (err, sale) {
    if (err) return next(err);
    if (!sale) return res.send(404);

    return res.send(sale);
  });
};

/**
 * Change password
 */
//exports.changePassword = function(req, res, next) {
  //var userId = req.user._id;
  //var oldPass = String(req.body.oldPassword);
  //var newPass = String(req.body.newPassword);

  //User.findById(userId, function (err, user) {
    //if(user.authenticate(oldPass)) {
      //user.password = newPass;
      //user.save(function(err) {
        //if (err) return res.send(400);

        //res.send(200);
      //});
    //} else {
      //res.send(403);
    //}
  //});
//};

/**
 * Get current user
 */
//exports.me = function(req, res) {
  //res.json(req.user || null);
//};
