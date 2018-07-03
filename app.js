var path = require('path')

var express = require('express')
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload')
var sizeOf = require('image-size')

var tools = require('./public/tools')

var app = express()

app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/upload', function (req, res) {
  if (!(req.files.upf instanceof Array)) {
    req.files.upf = [req.files.upf]
  }
  var files = req.files.upf.map(a => {
    let size = sizeOf(a.data)
    return {width: size.width, height: size.height, size: a.data.length}
  })
  try {
    tools.checkImage(files)
    res.send('ok')
  } catch (e) {
    res.send(`error:${e.message}`)
  }
})
app.listen(process.env.PORT || 3000)
