const validUrl = require('valid-url');

var URL = require("../models/urlShortener.model.js");

class URLShortener {
  static shortToOriginal(req, res) {
    var urlToForward = req.params.urlToForward;
    URL.findOne({ 'shorterUrl': urlToForward }, function(err, data){
      if (err) return res.send('Error reading database');
      var reg = new RegExp("^(http||https)://", "i");

      if (reg.test(data.originalUrl)) return res.redirect(301, data.originalUrl)
      else return res.redirect(301, `http://${data.originalUrl}`)
    });
  }
  static originalToShort(req, res) {
    var urlToShorten = req.params.urlToShorten;
    if (validUrl.isUri(urlToShorten)){

      URL.findOne({ 'originalUrl': urlToShorten }, function(err, data){
        if (err) return res.send('Error reading database');

        if (data) {
          let d = {
            "originalUrl": data.originalUrl,
            "shorterUrl": data.shorterUrl
          }
          return res.json(d);
        }
        else {
          var short = Math.floor(Math.random() * 10000).toString();
          var data = new URL ({
            originalUrl: urlToShorten,
            shorterUrl: short
          });
          data.save(function (err) {
            if (err) return res.send('Error saving to database');
          });
          let d = {
            "originalUrl": data.originalUrl,
            "shorterUrl": data.shorterUrl
          }
          return res.json(d);
        }
      });
    } else return res.json({ error: 'Invalid URL' });
  }
}

// Export URLShortener
module.exports = URLShortener
