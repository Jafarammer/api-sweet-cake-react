const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const port = process.env.PORT;
// routers
const userRouter = require("./routers/users/userRoutes");
// end routers

const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// routes users
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
