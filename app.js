const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./db");
const { DestinationRoutes } = require("./routes");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  db.collection("destinations")
    .find()
    .toArray()
    .then((results) => res.render("index.ejs", { desitnations: results }))
    .catch((e) => console.error("We have an error: ", e));
});

app.use("/api", DestinationRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Listening on PORT ${process.env.PORT}`)
);