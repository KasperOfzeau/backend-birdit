/* http://localhost:3000/ */

const express = require('express')
const multer  = require('multer')
const port = 3000;

const app = express()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage })

//Add headers before the routes are defined
app.use('/', function (req, res, next) {
  // Website(s) to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // Pass to next layer
  next();
});

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.get('/uploads/:fileid', (req, res) => {
  const { fileid } = req.params;
  res.sendFile(__dirname + /uploads/ + fileid); 
});

app.post('/image', upload.single('image'), function (req, res, next) {
  console.log(JSON.stringify(req.file))

  let response = "Files uploaded successfully.";
  return res.send(response)
})

app.listen(port,() => console.log(`Server running on port ${port}!`))