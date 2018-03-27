var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = require("../../lib/db.js")

var urlSchema = new Schema({
  originalUrl: String,
  shorterUrl: String
}, {timestamps: true});

var URL = mongoose.model('shortUrl', urlSchema);

module.exports = URL;
