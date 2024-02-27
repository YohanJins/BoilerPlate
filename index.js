const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const config = require('./config/key');
const {User} = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//aplication/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, 
).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))
//{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}  :: The newer version of MongoDB Node.js since 4.0.0 need them no longer



app.get('/', (req, res) => {
  res.send('Hello World! I am Yohan!')
})

app.post('/register', async (req, res) => {
  const user = new User(req.body);

  try {
    // Save user to the database
    await user.save();
    res.status(200).json({ success: true });
  } catch (err) {
    // Handle errors
    res.json({ success: false, err });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})