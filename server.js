const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const fs = require('fs');

require('dotenv').config();

// app
const app = express();
console.log('db', process.env.DATABASE);

// db

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('DB Connect'))
  .catch((err) => console.log('DB connection err:', err));

// middleware
app.use(morgan('dev'));
// app.use(bodyParser.json({ limited: "10mb" }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));
// app.use(express.bodyParser({ limit: "10mb" }));
app.use(cors());

// route middleware
fs.readdirSync('./routes').map((r) =>
  // console.log("./routes/"+r);
  app.use('/api', require('./routes/' + r))
);

//Port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on ${port}`));
