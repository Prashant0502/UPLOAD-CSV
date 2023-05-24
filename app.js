var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var csvModel = require('./models/csv');
var csv = require('csvtojson');
var bodyParser = require('body-parser');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

var uploads = multer({ storage: storage });

//connect to the database
mongoose.connect('mongodb+srv://Prashant:Prashant@cluster1.eueupv5.mongodb.net/test',{ useNewUrlParser: true })
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.log(err))

//app init
var app = express();

//set template engine
app.set('view engine', 'ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));

//static folder
app.use(express.static(path.resolve(__dirname, 'public')));

//default pageload
app.get('/', (req, res) => {
  csvModel.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data != '') {
        res.render('demo', { data: data });
      } else {
        res.render('demo', { data: '' });
      }
    }
  });
});

var temp;

app.post('/', uploads.single('csv'), (req, res) => {
  //convert csv file to json Array   
  csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      console.log(jsonObj);
      for (var x = 0; x < jsonObj; x++) {
        
      }
      csvModel.insertMany(jsonObj, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
    });
});

// port assign
var port = process.env.PORT || 8001;
app.listen(port, () => console.log('server run at port no.' + port));