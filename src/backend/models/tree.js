import mongoose from "mongoose";

mongoose.models = {};

var Tree = mongoose.model(
  "Tree",
  new mongoose.Schema({
    userName: {
      type: String,
    },
    type: {
      type: String,
    },
    address: {
      type: String,
    },
    days: {
      type: [String],
    },
    hours: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    open: {
      type: Boolean,
    }
  })
);

export default Tree;
