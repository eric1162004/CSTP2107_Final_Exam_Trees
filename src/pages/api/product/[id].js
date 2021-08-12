import connectDB from "../../../backend/mongodb";
import Product from "../../../backend/models/product";

const handler = async (req, res) => {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const product = await Product.find({ _id: id });
      res.json(product);
    } catch (e) {
      res.status(400).send(e);
    }
  }
};

export default connectDB(handler);