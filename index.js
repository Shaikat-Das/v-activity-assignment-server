const express = require('express')
const app = express()
const port = 5000
// database name: volunteerDb and collection name: registration
// userName: adminUser2 and the password: "6gIkhvwj7JfGNmhT"............

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://adminUser2:6gIkhvwj7JfGNmhT@cluster0.12mko.mongodb.net/volunteerDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("volunteerDb").collection("registration");
  console.log("db connected")

  app.post('/addRegistration', (req, res) => {
      const newRegistration = req.body;
      collection.insertOne(newRegistration)
      .then(result => {
          res.send(result.insertedCount >0);
      })
      console.log(newRegistration);
  })
     
  app.get('/collection', (req, res) => {
    collection.find({})
    .toArray((err, documents) => {
      res.send(documents)
    })




});





})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})