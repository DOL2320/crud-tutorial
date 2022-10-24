const express = require("express");
const {
  createDestination,
  getDestinations,
  getDestination,
  updateDestination,
  deleteDestination,
} = require("./../controllers/destination-ctrl");
const router = express.Router();
// const { Destination } = "./../models";
// const { createDestination } = "../controllers";

router.post("/destination/create", createDestination);
router.get("/destinations", getDestinations);
router.get("/destination/:id", getDestination);
router.put("/destination/update/:id", updateDestination);
router.delete("/destination/delete/:id", deleteDestination);

module.exports = router;
