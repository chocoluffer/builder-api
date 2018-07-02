const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();


app.use(cors());

app.use("/", routes);

require("dotenv").config();

const port = process.env.PORT || 1337;
const httpServer = require("http").createServer(app);
httpServer.listen(port, function() {
	console.log("running on port " + port + ".");
});
