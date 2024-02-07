const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/url.routes');

const PORT = 4444;
const app = express();
app.use(express.json());


connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(routes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

