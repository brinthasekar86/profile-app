const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const dataRoute = require("./routes/data");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors({ origin: "https://userprofile27.herokuapp.com", credentials: true }));

//app.use(cors({ origin: "http://localhost:3000", credentials: true }));


mongoose
  .connect(process.env.MONGODB_URI || 'mongodb+srv://brintha:stella56$@cluster0.ruicr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
app.use("/profile", dataRoute);
// ADD THIS LINE
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../build'));
}
app.use("/", (req, res) => res.send("we are on home"));
app.listen(port,console.log(`server running on port ${port}`));
