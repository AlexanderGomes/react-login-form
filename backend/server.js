const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 6000;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/goals', require('./routes/goalRoutes'));


app.listen(4000, async () => {
  await connectDB();
  console.log(`server on ${port}`);
});
