const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const config = require('./config/key');
const {auth} = require('./middleware/auth');
const {User} = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//aplication/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, 
).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))
//{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}  :: The newer version of MongoDB Node.js since 4.0.0 need them no longer



app.get('/', (req, res) => {
  res.send('Hello World! I am Yohan!')
});

app.get('/api/hello', (req, res) => {
  res.send("Hello~~~");
});

app.post('/api/users/register', async (req, res) => {
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

app.post('/api/users/login', async (req, res) => {
  try {
    // Find Email from the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "No corresponding User for the Email"
      });
    }
    // If the Email is found, verify the password
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({ loginSuccess: false, message: "Wrong password" });
    }
    // Generate a Token if the password is verified
    const userWithToken = await user.generateToken();
    // Save token to cookie
    res.cookie("x_auth", userWithToken.token)
       .status(200)
       .json({ loginSuccess: true, userId: userWithToken._id });
  } catch (err) {
    res.status(400).send(err);
  }
});


app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role ===0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, {token: ""})
  .then(() => {
      return res.status(200).json({
          logoutSuccess: true
      });
  })
  .catch((err) => {
      return res.status(400).json({
          logoutSuccess: false,
          message: err.message
      });
  })
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})