const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true , useUnifiedTopology: true});


// mongoClient.connect(function(err, client){
//
//   const db = client.db("usersdb");
//   const collection = db.collection("users");
//   let user = {name: "John", age: 15};
//
//   if(err) return console.log(err);
//
//   collection.find({name: "Tom"}).toArray(function(err, results){
//
//     console.log(results);
//     client.close();
//   });

  // collection.insertOne(user, function(err, result){
  //
  //   if(err){
  //     return console.log(err);
  //   }
  //   console.log(result.ops);
  //   client.close();
  // });
// });

module.exports = mongoClient;
