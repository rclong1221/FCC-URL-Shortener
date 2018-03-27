const URLShortener = require('../controllers/urlShortener.controller.js')

var urlShortenerRoutes = function (app) {
  app.get("/", function (req, res) {
    res.send("Home page")
  })

  // Create a new shortened URL
  app.get('/new/:urlToShorten(*)', function(req, res){
    URLShortener.originalToShort(req, res)
  });
  app.get('/:urlToForward', function(req, res){
    URLShortener.shortToOriginal(req, res)
  });
}

module.exports = urlShortenerRoutes
