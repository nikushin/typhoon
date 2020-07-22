const mongoClient = require("./db");
const io = require('socket.io')(8080, {transports: ['polling', 'websocket']} );

mongoClient.connect(function (err, client) {
  const db = client.db("usersdb");
  const collection = db.collection("users");

  if (err) return console.log(err);

  io.on('connect', socket => {
    console.log('io connect');

    socket.on('msg', (data) => {
      console.log(data);
      collection.findOneAndUpdate(
        {name: data[0]}, // критерий выборки
        { $set: {value: data[1]}}, // параметр обновления
        function(err, result){
          // console.log(result);
        });
    });

    collection.find({name: "temp_set_point"}).toArray(function(err, results){
      if (err) return console.log('ошибка', err);
      console.log(results[0]['value']);
      socket.emit("init", ["temp_set_point", results[0]['value']]);
    });

  });
});
