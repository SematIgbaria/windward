const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const fleetsRouter = require("./backend/routes/fleetsRouter");


app.use(express.static("client/build"));
app.use(cors());
app.use(bodyParser.json());
app.use("/", fleetsRouter);


const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`\x1b[36m🚢 listen on port: ${port}\x1b[0m`);
});