var MongoClient = require("mongodb").MongoClient;
var Q = require("q");
require("dotenv").config();

const getEyeColor = (status) => {
  var deferred = Q.defer();

  if (status && status.eyeColor) {
    res.status(201).send('Eye color provided');
    return;
  }
  
  MongoClient.connect(process.env.MONGO_URI, function (err, db) {
    db.collection('EyeColor', function (err, collection) {
      // const length = collection.count(); // returning NaN
      var eyeGen = Math.floor(Math.random() * Math.floor(6));

      collection.find({ index: eyeGen }).limit(1).next(function (err, doc) {

        if (doc == null) {
          res.status(401).send('Error retreiving eye color');
          return;
        }

        deferred.resolve({eyeColor: doc.color})
      });
    });
  });
  return deferred.promise;
}

const getHairColor = (status) => {
  var deferred = Q.defer();

  if (status && status.hairColor) {
    res.status(201).send('Hair color provided');
    return;
  }
  
  MongoClient.connect(process.env.MONGO_URI, function (err, db) {
    db.collection('HairColor', function (err, collection) {
      // const length = collection.count(); // returning NaN
      var hairGen = Math.floor(Math.random() * Math.floor(17));

      collection.find({ index: hairGen }).limit(1).next(function (err, doc) {

        if (doc == null) {
          res.status(401).send('Error retreiving eye color');
          return;
        }

        deferred.resolve({hairColor: doc.color})
      });
    });
  });
  return deferred.promise;
}

const buildCharacter = (req, res) => {
  console.log("inside builder", req.query, "- - - - - ", req.body);
  // req.query would be ?facts='obviously'
  // req.body is post
  // res.send({things: true}); - simple

  // Create status object based on user inputs
  // FNs expect object.getterName to be declared if an input was provided
  Q.all([
    getEyeColor(null),
    getHairColor(null)
  ]).then(function(status) {
    console.log(status);
    res.status(200).send(status);
  })
  .done(); // not sure what this does
};

module.exports = {
  buildCharacter
};