const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./db");
const { DestinationRoutes } = require("./routes");

app.get("/", (req, res) => {
  db.collection("destinations")
    .find()
    .toArray()
    .then((results) => res.send(results))
    .catch((e) => console.error("We have an error: ", e));
});

app.use("/api", DestinationRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Listening on PORT ${process.env.PORT}`)
);
