import connectDB from "../../../backend/mongodb";
import Tree from "../../../backend/models/tree";

const handler = async (req, res) => {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const tree = await Tree.find({ _id: id });
      res.json(tree);
    } catch (e) {
      res.status(400).send(e);
    }
  }
};

export default connectDB(handler);