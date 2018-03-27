const validUrl = require('valid-url')

const URL = require("../models/urlShortener.model.js")

class URLShortener {
  static shortToOriginal(req, res) {
    var urlToForward = req.params.urlToForward
    URL.findOne({ 'shorterUrl': urlToForward }, function(err, data){
      if (err) res.send('Error reading database')
      var reg = new RegExp("^(http||https)://", "i")

      if (data && reg.test(data.originalUrl)) res.redirect(301, data.originalUrl)
      else if (data) res.redirect(301, `http://${data.originalUrl}`)
    })
  }
  static originalToShort(req, res) {
    var urlToShorten = req.params.urlToShorten
    if (validUrl.isUri(urlToShorten)){
      URL.findOne({ 'originalUrl': urlToShorten }, function(err, data){
        if (err) res.send('Error reading database')

        if (data) {
          let d = {
            "originalUrl": data["originalUrl"],
            "shorterUrl": data["shorterUrl"]
          }
          res.json(d)
        }
        else {
          var short = Math.floor(Math.random() * 10000).toString()
          var data = new URL ({
            originalUrl: urlToShorten,
            shorterUrl: short
          })
          data.save(function (err) {
            if (err) res.send('Error saving to database')
          })
          let d = {
            "originalUrl": data["originalUrl"],
            "shorterUrl": data["shorterUrl"]
          }
          res.json(d)
        }
      })
    } else res.json({ error: 'Invalid URL' })
  }
}

// Export URLShortener
module.exports = URLShortener
