const express = require('express');
const app = express();
const connectDB = require('./config/db');
const router = require('./routes/url.routes');



const PORT = 4444;
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(router);


connectDB = connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

