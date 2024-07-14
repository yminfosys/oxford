var express = require('express');
var router = express.Router();

var dbCon = require('../module/db/con');
var db=require('../module/db/bdModule')
var auto_incriment=require('../module/db/autoIncriment');

var smsotp=require('../module/smsotp');

var dotenv=require('dotenv').config();

const moment=require('moment');

const bcrypt = require('bcrypt');
const { ExplainVerbosity } = require('mongodb');
const saltRounds = 10;

///////File upload////////
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3-transform')
const sharp = require('sharp');


const {S3_ENDPOINT, BUCKET_NAME}=process.env;

//console.log(S3_ENDPOINT, BUCKET_NAME);
var spaceEndpoint= new aws.Endpoint(S3_ENDPOINT)

var s3 = new aws.S3({ 
    endpoint:spaceEndpoint
})
//var storage = multer.memoryStorage()
var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: BUCKET_NAME,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      shouldTransform: function (req, file, cb) {
        cb(null, /^image/i.test(file.mimetype))
      },
      transforms: [ {
        id: 'image',
        key: function (req, file, cb) {
          cb(null, Date.now().toString() + "-" + file.originalname)
        },
        transform: function (req, file, cb) {
          cb(null, sharp().resize(1200, 800,{ fit: sharp.fit.inside }))
        }
      }]
    })
  })

  var cpUpload = upload.fields([
    { name: 'fundDepositScrn', maxCount: 1 },
    { name: 'filekycId', maxCount: 1 },
    { name: 'fileSelfe', maxCount: 1 },
    { name: 'filekycVideo', maxCount: 1 },
    { name: 'file5', maxCount: 1 },
    { name: 'file6', maxCount: 1 }
])





// var cpUpload = function(){
//   var ii=0
// }

/* GET users listing. */

router.get('/test', async function(req, res, next) {
  try {
    res.render('user/test')
  }catch (error) {
    console.log(error);
    return error;
  }
  
});

// router.get('/test', async function(req, res, next) {
// res.send("jhdfjghjd")
// });


router.get('/', async function(req, res, next) {
  try {
    var allredylogin=req.cookies.userID
    res.render('user/user',{allredylogin:allredylogin})
  }catch (error) {
    console.log(error);
    return error;
  }
  
});





router.post('/checkExistuser', async function(req, res, next) {
  try {
  await dbCon.connectDB();
  const user= await db.user.findOne({$or: [{mobile:req.body.mobileNo},{email:req.body.email}]});
  await dbCon.closeDB();
  //console.log("check done")
  res.json(user)
} catch (error) {
  console.log(error);
  return error;
}

});








//db.cashwalletusers.findOneAndUpdate({mobile:'8509239522'},{$set:{userName:'Sukanta Sardar'}})

//{ "_id" : ObjectId("6673b97ffa820251f5d846b2"), "userName" : "CHONDON CHOKROBORTTY", "userID" : 9, "accountNumber" : "1718860159792", "multyCurrencyPermition" : "No", "password" : "$2b$10$8I7LxDi1b9NmiyOsboBiZ.CBjinKDODHd8geZd1gBSO1lRnYz538S", "email" : "chondon36@gmail.com", "mobile" : "9064104132", "varyficatinStatus" : "inReview", "country" : "India", "countryCode" : "+91", "currency" : "INR", "currencySymbol" : "₹", "accountBalance" : "0", "usdtBalance" : "0", "regdate" : ISODate("2024-06-20T05:09:19.800Z"), "__v" : 0 }




module.exports = router;
