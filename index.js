const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://yohanjin0925:Akwldrk33!@boilerplate.gv05qhz.mongodb.net/?retryWrites=true&w=majority&appName=BoilerPlate', ).then(() => console.log('MongoDB Connected...'))
//{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}  :: The newer version of MongoDB Node.js since 4.0.0 need them no longer

.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})