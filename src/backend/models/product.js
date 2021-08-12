import mongoose from "mongoose";

mongoose.models = {};

var Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    }
  })
);

export default Product;
