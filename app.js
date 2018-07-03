var path = require('path')

var express = require('express')
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload')
var sizeOf = require('image-size')

var app = express()

app.use(fileUpload({
  limits: {
    files: 3,
    fileSize: 3 * 1024
  }
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/upload', function (req, res) {
  if (!(req.files.upf instanceof Array)) {
    req.files.upf = [req.files.upf]
  }
  if (req.files.upf.length <= 3) {
    if (req.files.upf.every(a => a.truncated === false)) {
      if (req.files.upf.every(a => {
        let size = sizeOf(a.data)
        return size.width <= 30 && size.height <= 30
      })) {
        res.send('通過')
      } else {
        res.send('尺寸超過30x30像素')
      }
    } else {
      res.send('檔案超過3kb')
    }
  } else {
    res.send('超過3張照片')
  }
})
app.listen(process.env.PORT || 3000)
