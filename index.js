const express = require("express");
// const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const cors = require("cors");
const port = process.env.PORT;
// routers
const userRouter = require("./routers/users/userRoutes");
const findUserRouter = require("./routers/users/findUserRoutes");
const authRouter = require("./routers/users/auth/authRoutes");
// end routers

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(helmet());
// set cors
const corsOptions = {
  origins: [
    // "https://sweet-cake-react.web.app",
    // "https://sweet-cake-responsive.vercel.app",
    "http://localhost:8000/",
  ],
};
app.use(cors(corsOptions));

// routes users
app.use("/", userRouter);
app.use("/find", findUserRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
