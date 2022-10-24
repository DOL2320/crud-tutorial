const destination = require("../models/destination");
const { Destination } = require("./../models");

const createDestination = (req, res) => {
  // capture payload
  const payload = req.body;
  // check if payload has data
  if (!payload) {
    // if bad request send a status code and a json message
    return res.status(400).json({
      // success - false
      Success: false,
      // error - pass a message
      Error: "Request body must contain data",
    });
  }
  // create a new instance
  const destination = new Destination(payload);
  // check if instance was created
  if (!destination) {
    return res.status(400).json({
      Success: false,
      Error: "Error",
    });
  }
  destination
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: destination._id,
        message: "Destination created",
      });
    })
    .catch((e) => {
      return res.status(400).json({
        e,
        Message: "Destination not created",
      });
    });
};

const getDestinations = async (req, res) => {
  await Destination.find({}, (error, destinations) => {
    if (error) {
      return res.status(400).json({
        error,
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      data: destinations,
    });
  })
    .clone()
    .catch((err) => console.log(err));
};

const getDestination = async (req, res) => {
  const data = await Destination.findById(req.params.id);
  return res.status(200).json({
    success: true,
    data,
  });
};

const updateDestination = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: "Please enter desired update",
      success: false,
    });
  }
  Destination.findByIdAndUpdate(id, req.body, (error) => {
    if (error) {
      return res.status(400).json({
        error,
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      id: id,
    });
  });
};

const deleteDestination = async (req, res) => {
  const data = await Destination.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    data,
  });
};

module.exports = {
  createDestination,
  getDestinations,
  getDestination,
  updateDestination,
  deleteDestination,
};
