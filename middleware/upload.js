const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination(request, file, callback){
    callback(null, 'uploads/')
  },
  filename(request, file, callback){
    callback(null, '')
  }
})

module.exports = multer({

})