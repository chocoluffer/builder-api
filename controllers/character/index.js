var MongoClient = require("mongodb").MongoClient;
var Q = require("q");
require("dotenv").config();

// const getEyeColor = (userColor) => {
//   var colorOutside = '';
//   MongoClient.connect(process.env.MONGO_URI, function (err, db) {
//     var colorClient = '';
//     db.collection('EyeColor', function (err, collection) {
//       // const length = collection.count(); // returning NaN
//       var eyeGen = Math.floor(Math.random() * Math.floor(6));
//       var eyeColor = '';
//       // console.log(eyeGen)
//       collection.find({ index: eyeGen }).limit(1).next(function(err, doc) {

//         // console.log('eye color doc')
//         // console.log(doc)
//         // console.log('-------')
//         if(doc == null){
//           res.status(401).send('Error retreiving eye color');
//           return;
//         }

//         eyeColor = doc.color;
//         colorClient = doc.color;
//         colorOutside = doc.color;
//         // console.log('inside find')
//         // console.log(eyeColor);
//       });

//       console.log('outside the find');
//       console.log(eyeColor)
//     });
//     console.log('in the client')
//     console.log(colorClient)
//   });
//   console.log('top layor')
//   console.log(colorOutside)
// }

const buildCharacter = (req, res) => {
  console.log("inside lemons", req.query, "- - - - - ", req.body);
  // req.query would be ?facts='obviously'
  // req.body is post

  // res.send({things: true});
  function getQ() {
    var deferred = Q.defer();
    MongoClient.connect(process.env.MONGO_URI, function (err, db) {
      // var generated = {
      //   eyeColor: getEyeColor(),
      //   hairColor: ''
      // };

      db.collection('EyeColor', function (err, collection) {
        // const length = collection.count(); // returning NaN
        var eyeGen = Math.floor(Math.random() * Math.floor(6));
        // console.log(eyeGen)
        collection.find({ index: eyeGen }).limit(1).next(function(err, doc){

          console.log('eye color doc')
          console.log(doc)
          console.log('-------')
          if(doc == null){
            res.status(401).send('Error retreiving eye color');
            return;
          }

          // generated.eyeColor = doc.color;
          // console.log(generated)
          deferred.resolve({eyeColor: doc.color})
        });
      });

      db.collection('HairColor', function (err, collection) {
        // const length = collection.count(); // returning NaN
        var hairGen = Math.floor(Math.random() * Math.floor(17));
        // console.log(eyeGen)
        collection.find({ index: hairGen }).limit(1).next(function(err, doc){

          console.log('hair color doc')
          console.log(doc)
          console.log('-------')
          if(doc == null){
            res.status(401).send('Error retreiving hair color');
            return;
          }

          // generated.hairColor = doc.color;
          deferred.resolve({hairColor: doc.color})
        });
      });
      // deferred.resolve(generated);

    });
    return deferred.promise;
  }

  Q.fcall(getQ)
  .then(function (data) {
    res.status(200).send(data);
  })
  .catch(function (error) {
    res.status(error.status).send(error.text);
  })
  .done();
};

module.exports = {
  buildCharacter
};